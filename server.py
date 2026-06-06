#!/usr/bin/env python3
"""Chinese Quest local backend.

This server intentionally uses only the Python standard library. It serves the
static app and stores private learner profiles in a separate SQLite database so
course-data rebuilds never overwrite user data.
"""

from __future__ import annotations

import base64
import hashlib
import hmac
import json
import mimetypes
import os
import re
import secrets
import sqlite3
import sys
import time
from datetime import datetime, timezone
from http import cookies
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib import error as urlerror
from urllib import request as urlrequest
from urllib.parse import unquote, urlparse


ROOT = Path(__file__).resolve().parent


def load_local_env() -> None:
  for name in (".env", ".env.local"):
    path = ROOT / name
    if not path.exists():
      continue
    for raw_line in path.read_text(encoding="utf-8").splitlines():
      line = raw_line.strip()
      if not line or line.startswith("#") or "=" not in line:
        continue
      key, value = line.split("=", 1)
      key = key.strip()
      value = value.strip().strip('"').strip("'")
      if key and key not in os.environ:
        os.environ[key] = value


load_local_env()

DEFAULT_DB_PATH = ROOT / "data" / "user-data.sqlite"
USER_DB_PATH = Path(os.environ.get("CHINESE_QUEST_USER_DB", DEFAULT_DB_PATH)).expanduser()
SESSION_COOKIE = "cq_session"
SESSION_SECONDS = 60 * 60 * 24 * 30
PIN_ITERATIONS = 210_000
MAX_JSON_BYTES = 2 * 1024 * 1024
SCHEMA_VERSION = 1
GUEST_USER_ID = "guest"
GUEST_USERNAME = "guest"
DEFAULT_OPENAI_MODEL = "gpt-5.4-mini"
OPENAI_MODEL = os.environ.get("OPENAI_MODEL", DEFAULT_OPENAI_MODEL)
OPENAI_RESPONSES_URL = os.environ.get("OPENAI_RESPONSES_URL", "https://api.openai.com/v1/responses")
OPENAI_TIMEOUT_SECONDS = 45
AI_TEACHER_MAX_KNOWN_CHARS = 500
AI_TEACHER_MAX_KNOWN_WORDS = 120
AI_TEACHER_MAX_NEW_WORDS = 5
AI_TEACHER_MAX_CHINESE_CHARS = 100
CHINESE_CHAR_RE = re.compile(r"[\u3400-\u9fff\uf900-\ufaff]")


def utc_now() -> str:
  return datetime.now(timezone.utc).isoformat(timespec="seconds")


def json_dumps(value: object) -> str:
  return json.dumps(value, ensure_ascii=False, separators=(",", ":"))


def connect_db() -> sqlite3.Connection:
  USER_DB_PATH.parent.mkdir(parents=True, exist_ok=True)
  conn = sqlite3.connect(USER_DB_PATH)
  conn.row_factory = sqlite3.Row
  conn.execute("PRAGMA foreign_keys = ON")
  conn.execute("PRAGMA journal_mode = WAL")
  return conn


def init_db() -> None:
  with connect_db() as conn:
    conn.executescript(
      """
      CREATE TABLE IF NOT EXISTS metadata (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        username_norm TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL,
        child_name TEXT NOT NULL,
        child_age INTEGER,
        child_interests TEXT NOT NULL,
        avatar TEXT NOT NULL,
        pin_salt TEXT NOT NULL,
        pin_hash TEXT NOT NULL,
        pin_iterations INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS profiles (
        user_id TEXT PRIMARY KEY,
        state_json TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS growth_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        event_type TEXT NOT NULL,
        payload_json TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS sessions (
        token_hash TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        created_at TEXT NOT NULL,
        expires_at INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_growth_logs_user_created
        ON growth_logs (user_id, created_at DESC);

      CREATE INDEX IF NOT EXISTS idx_sessions_user
        ON sessions (user_id);
      """
    )
    conn.execute(
      """
      INSERT INTO metadata (key, value)
      VALUES ('schema_version', ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value
      """,
      (str(SCHEMA_VERSION),),
    )
    ensure_guest_user(conn)


def ensure_guest_user(conn: sqlite3.Connection) -> None:
  now = utc_now()
  row = conn.execute("SELECT id FROM users WHERE username_norm = ?", (GUEST_USERNAME,)).fetchone()
  if row:
    guest_id = row["id"]
  else:
    guest_id = GUEST_USER_ID
    conn.execute(
      """
      INSERT INTO users (
        id, username, username_norm, email, child_name, child_age, child_interests,
        avatar, pin_salt, pin_hash, pin_iterations, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      """,
      (
        guest_id,
        "Guest",
        GUEST_USERNAME,
        "guest@local",
        "Guest",
        None,
        "Chinese reading practice",
        "🐼",
        "",
        "",
        0,
        now,
        now,
      ),
    )
  conn.execute(
    """
    INSERT INTO profiles (user_id, state_json, created_at, updated_at)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(user_id) DO NOTHING
    """,
    (guest_id, json_dumps({}), now, now),
  )


def parse_json_body(handler: SimpleHTTPRequestHandler) -> dict:
  length = int(handler.headers.get("Content-Length", "0") or "0")
  if length <= 0:
    return {}
  if length > MAX_JSON_BYTES:
    raise ValueError("Request body is too large.")
  raw = handler.rfile.read(length)
  try:
    parsed = json.loads(raw.decode("utf-8"))
  except json.JSONDecodeError as exc:
    raise ValueError("Invalid JSON.") from exc
  if not isinstance(parsed, dict):
    raise ValueError("JSON body must be an object.")
  return parsed


def clean_text(value: object, max_length: int = 240) -> str:
  return re.sub(r"\s+", " ", str(value or "")).strip()[:max_length]


def clean_multiline(value: object, max_length: int = 500) -> str:
  return re.sub(r"\s+", " ", str(value or "")).strip()[:max_length]


def is_single_chinese_character(value: str) -> bool:
  return bool(re.fullmatch(r"[\u3400-\u9fff\uf900-\ufaff]", value or ""))


def chinese_character_count(value: str) -> int:
  return len(CHINESE_CHAR_RE.findall(value or ""))


def truncate_chinese_text(value: str, max_chinese_chars: int = AI_TEACHER_MAX_CHINESE_CHARS) -> str:
  text = clean_multiline(value, 240)
  count = 0
  output: list[str] = []
  for char in text:
    if CHINESE_CHAR_RE.fullmatch(char):
      if count >= max_chinese_chars:
        break
      count += 1
    output.append(char)
  return "".join(output).strip()


def clean_string_list(value: object, max_items: int, max_length: int = 24) -> list[str]:
  if not isinstance(value, list):
    return []
  items: list[str] = []
  seen: set[str] = set()
  for raw in value:
    item = clean_text(raw, max_length)
    if not item or item in seen:
      continue
    seen.add(item)
    items.append(item)
    if len(items) >= max_items:
      break
  return items


def normalize_username(value: object) -> str:
  return clean_text(value, 32).lower()


def validate_username(username: str) -> str | None:
  if not 3 <= len(username) <= 32:
    return "Username must be 3-32 characters."
  if not re.fullmatch(r"[\w.\-\u3400-\u9fff]+", username, flags=re.UNICODE):
    return "Username can only use letters, numbers, Chinese characters, _, - or ."
  return None


def validate_pin(pin: str) -> str | None:
  if not re.fullmatch(r"\d{4}", pin):
    return "Password must be exactly 4 digits."
  return None


def validate_email(email: str) -> str | None:
  if len(email) > 254 or not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email):
    return "Enter a valid email address."
  return None


def hash_pin(pin: str, salt: bytes | None = None, iterations: int = PIN_ITERATIONS) -> tuple[str, str, int]:
  salt = salt or secrets.token_bytes(16)
  digest = hashlib.pbkdf2_hmac("sha256", pin.encode("utf-8"), salt, iterations)
  return base64.b64encode(salt).decode("ascii"), base64.b64encode(digest).decode("ascii"), iterations


def verify_pin(pin: str, salt_text: str, hash_text: str, iterations: int) -> bool:
  salt = base64.b64decode(salt_text.encode("ascii"))
  _, digest, _ = hash_pin(pin, salt, iterations)
  return hmac.compare_digest(digest, hash_text)


def token_hash(token: str) -> str:
  return hashlib.sha256(token.encode("utf-8")).hexdigest()


def public_user(row: sqlite3.Row) -> dict:
  return {
    "id": row["id"],
    "username": row["username"],
    "email": row["email"],
    "name": row["child_name"],
    "mark": row["avatar"],
    "childAge": row["child_age"],
    "childInterests": row["child_interests"],
    "createdAt": row["created_at"],
    "updatedAt": row["updated_at"],
  }


def parse_state(row: sqlite3.Row | None) -> dict:
  if not row:
    return {}
  try:
    state = json.loads(row["state_json"])
    return state if isinstance(state, dict) else {}
  except json.JSONDecodeError:
    return {}


def log_growth(conn: sqlite3.Connection, user_id: str, event_type: str, payload: object) -> None:
  conn.execute(
    """
    INSERT INTO growth_logs (user_id, event_type, payload_json, created_at)
    VALUES (?, ?, ?, ?)
    """,
    (user_id, clean_text(event_type, 80) or "profile_update", json_dumps(payload if isinstance(payload, dict) else {}), utc_now()),
  )


def recent_growth_logs(conn: sqlite3.Connection, user_id: str, limit: int = 80) -> list[dict]:
  rows = conn.execute(
    """
    SELECT id, event_type, payload_json, created_at
    FROM growth_logs
    WHERE user_id = ?
    ORDER BY id DESC
    LIMIT ?
    """,
    (user_id, limit),
  ).fetchall()
  logs: list[dict] = []
  for row in rows:
    try:
      payload = json.loads(row["payload_json"])
    except json.JSONDecodeError:
      payload = {}
    logs.append(
      {
        "id": row["id"],
        "eventType": row["event_type"],
        "payload": payload if isinstance(payload, dict) else {},
        "createdAt": row["created_at"],
      }
    )
  return logs


class OpenAIRequestError(Exception):
  def __init__(self, status: int, message: str) -> None:
    super().__init__(message)
    self.status = status
    self.message = message


AI_TEACHER_RESPONSE_SCHEMA = {
  "type": "object",
  "additionalProperties": False,
  "required": ["title", "text", "characters", "newVocabulary", "usedKnownCharacters"],
  "properties": {
    "title": {"type": "string", "maxLength": 24},
    "text": {"type": "string", "maxLength": 180},
    "characters": {
      "type": "array",
      "maxItems": 100,
      "items": {
        "type": "object",
        "additionalProperties": False,
        "required": ["char", "pinyin"],
        "properties": {
          "char": {"type": "string", "maxLength": 1},
          "pinyin": {"type": "string", "maxLength": 32},
        },
      },
    },
    "newVocabulary": {
      "type": "array",
      "maxItems": AI_TEACHER_MAX_NEW_WORDS,
      "items": {
        "type": "object",
        "additionalProperties": False,
        "required": ["word", "pinyin", "meaningZh", "meaningEn"],
        "properties": {
          "word": {"type": "string", "maxLength": 12},
          "pinyin": {"type": "string", "maxLength": 80},
          "meaningZh": {"type": "string", "maxLength": 80},
          "meaningEn": {"type": "string", "maxLength": 100},
        },
      },
    },
    "usedKnownCharacters": {
      "type": "array",
      "maxItems": 80,
      "items": {"type": "string", "maxLength": 1},
    },
  },
}


def openai_api_key() -> str:
  return os.environ.get("OPENAI_API_KEY", "").strip()


def clean_ai_known_words(value: object) -> list[dict]:
  if not isinstance(value, list):
    return []
  words: list[dict] = []
  seen: set[str] = set()
  for raw in value:
    if isinstance(raw, dict):
      word = clean_text(raw.get("word"), 12)
      pinyin = clean_text(raw.get("pinyin"), 80)
      meaning = clean_text(raw.get("meaning") or raw.get("meaningEn") or raw.get("meaningZh"), 100)
    else:
      word = clean_text(raw, 12)
      pinyin = ""
      meaning = ""
    if not word or word in seen or not CHINESE_CHAR_RE.search(word):
      continue
    seen.add(word)
    words.append({"word": word, "pinyin": pinyin, "meaning": meaning})
    if len(words) >= AI_TEACHER_MAX_KNOWN_WORDS:
      break
  return words


def ai_teacher_known_characters(profile_state: dict, body: dict) -> list[str]:
  known: list[str] = []
  for source in (
    profile_state.get("knownCharacters"),
    profile_state.get("learnedCharacters"),
    body.get("knownCharacters"),
    body.get("learnedCharacters"),
    body.get("recentCharacters"),
  ):
    for char in clean_string_list(source, AI_TEACHER_MAX_KNOWN_CHARS, 1):
      if is_single_chinese_character(char) and char not in known:
        known.append(char)
      if len(known) >= AI_TEACHER_MAX_KNOWN_CHARS:
        return known
  return known


def ai_teacher_prompt(user: sqlite3.Row, profile_state: dict, body: dict) -> str:
  known_characters = ai_teacher_known_characters(profile_state, body)
  known_words = clean_ai_known_words(body.get("knownWords"))
  recent_characters = clean_string_list(body.get("recentCharacters"), 24, 1)
  interests = clean_text(
    body.get("interests")
    or user["child_interests"]
    or profile_state.get("childInterests")
    or "",
    160,
  )
  age = clean_text(body.get("age") or user["child_age"] or "", 8)
  learner = clean_text(user["child_name"] or user["username"], 40)

  known_word_text = "、".join(
    f"{item['word']}({item['pinyin']})" if item["pinyin"] else item["word"]
    for item in known_words
  )
  known_character_text = " ".join(known_characters)
  recent_character_text = " ".join(char for char in recent_characters if is_single_chinese_character(char))

  return f"""
请为正在学中文的小学生生成一篇可朗读的简体中文小文章。

学生：{learner}
年龄：{age or "未知"}
兴趣：{interests or "日常生活、学校、家庭、朋友"}

学生已经会的字：
{known_character_text or "中 文 学 习 我 你 他 她 好 是 有 在 家 学 校 老 师 朋 友"}

学生已经会或接触过的词：
{known_word_text or "中文、学习、学校、老师、朋友、家人、今天、喜欢"}

最近学习的字：
{recent_character_text or "中 文 学 习 好"}

要求：
1. 文章正文必须少于或等于 {AI_TEACHER_MAX_CHINESE_CHARS} 个汉字，不用英文，不用 Markdown。
2. 尽可能使用学生会的字和词，至少大部分汉字应来自“学生已经会的字”。
3. 只加入少量新字词，newVocabulary 放 2 到 {AI_TEACHER_MAX_NEW_WORDS} 个。
4. 内容适合澳洲小学中文初学者，温和、自然、具体。
5. characters 必须列出正文中每一个不同汉字的汉语拼音，按第一次出现顺序排列。
6. usedKnownCharacters 只列出正文里确实使用到、且在“学生已经会的字”里的汉字。
""".strip()


def extract_openai_text(payload: dict) -> str:
  if isinstance(payload.get("output_text"), str):
    return payload["output_text"]
  output = payload.get("output")
  if isinstance(output, list):
    parts: list[str] = []
    for item in output:
      if not isinstance(item, dict):
        continue
      content = item.get("content")
      if not isinstance(content, list):
        continue
      for content_item in content:
        if isinstance(content_item, dict) and isinstance(content_item.get("text"), str):
          parts.append(content_item["text"])
    if parts:
      return "\n".join(parts)
  return ""


def parse_openai_json(text: str) -> dict:
  cleaned = text.strip()
  if cleaned.startswith("```"):
    cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
    cleaned = re.sub(r"\s*```$", "", cleaned).strip()
  try:
    parsed = json.loads(cleaned)
  except json.JSONDecodeError as exc:
    match = re.search(r"\{.*\}", cleaned, flags=re.DOTALL)
    if not match:
      raise OpenAIRequestError(502, "AI teacher returned invalid JSON.") from exc
    try:
      parsed = json.loads(match.group(0))
    except json.JSONDecodeError as nested_exc:
      raise OpenAIRequestError(502, "AI teacher returned invalid JSON.") from nested_exc
  if not isinstance(parsed, dict):
    raise OpenAIRequestError(502, "AI teacher returned invalid JSON.")
  return parsed


def normalize_ai_story(raw: dict) -> dict:
  title = clean_text(raw.get("title"), 24) or "AI老师小文章"
  text = truncate_chinese_text(raw.get("text"))
  if not text or chinese_character_count(text) == 0:
    raise OpenAIRequestError(502, "AI teacher returned an empty article.")

  characters: list[dict] = []
  seen_chars: set[str] = set()
  if isinstance(raw.get("characters"), list):
    for item in raw["characters"]:
      if not isinstance(item, dict):
        continue
      char = clean_text(item.get("char"), 1)
      pinyin = clean_text(item.get("pinyin"), 32)
      if not is_single_chinese_character(char) or not pinyin or char in seen_chars:
        continue
      seen_chars.add(char)
      characters.append({"char": char, "pinyin": pinyin})

  new_vocabulary: list[dict] = []
  seen_words: set[str] = set()
  if isinstance(raw.get("newVocabulary"), list):
    for item in raw["newVocabulary"]:
      if not isinstance(item, dict):
        continue
      word = clean_text(item.get("word"), 12)
      if not word or word in seen_words or not CHINESE_CHAR_RE.search(word):
        continue
      seen_words.add(word)
      new_vocabulary.append(
        {
          "word": word,
          "pinyin": clean_text(item.get("pinyin"), 80),
          "meaningZh": clean_text(item.get("meaningZh"), 80),
          "meaningEn": clean_text(item.get("meaningEn"), 100),
        }
      )
      if len(new_vocabulary) >= AI_TEACHER_MAX_NEW_WORDS:
        break

  used_known_characters = [
    char
    for char in clean_string_list(raw.get("usedKnownCharacters"), 80, 1)
    if is_single_chinese_character(char)
  ]

  return {
    "title": title,
    "text": text,
    "characters": characters,
    "newVocabulary": new_vocabulary,
    "usedKnownCharacters": used_known_characters,
    "model": OPENAI_MODEL,
    "generatedAt": utc_now(),
    "chineseCharacterCount": chinese_character_count(text),
  }


def request_ai_teacher_story(user: sqlite3.Row, profile_state: dict, body: dict) -> dict:
  key = openai_api_key()
  if not key:
    raise OpenAIRequestError(503, "AI teacher is not configured. Set OPENAI_API_KEY on the server.")

  payload = {
    "model": OPENAI_MODEL,
    "input": [
      {
        "role": "system",
        "content": "You are a careful Mandarin teacher. Return only valid JSON matching the schema.",
      },
      {"role": "user", "content": ai_teacher_prompt(user, profile_state, body)},
    ],
    "text": {
      "format": {
        "type": "json_schema",
        "name": "ai_teacher_article",
        "strict": True,
        "schema": AI_TEACHER_RESPONSE_SCHEMA,
      }
    },
    "reasoning": {"effort": os.environ.get("OPENAI_REASONING_EFFORT", "low")},
    "max_output_tokens": 3000,
  }
  raw = json_dumps(payload).encode("utf-8")
  request = urlrequest.Request(
    OPENAI_RESPONSES_URL,
    data=raw,
    method="POST",
    headers={
      "Authorization": f"Bearer {key}",
      "Content-Type": "application/json",
    },
  )
  try:
    with urlrequest.urlopen(request, timeout=OPENAI_TIMEOUT_SECONDS) as response:
      response_payload = json.loads(response.read().decode("utf-8"))
  except urlerror.HTTPError as exc:
    message = "OpenAI request failed. Check OPENAI_API_KEY and OPENAI_MODEL."
    try:
      error_payload = json.loads(exc.read().decode("utf-8"))
      api_message = clean_text(error_payload.get("error", {}).get("message"), 240)
      if api_message:
        message = api_message
    except (json.JSONDecodeError, UnicodeDecodeError):
      pass
    raise OpenAIRequestError(502, message) from exc
  except urlerror.URLError as exc:
    raise OpenAIRequestError(502, "Could not reach the OpenAI API.") from exc
  except json.JSONDecodeError as exc:
    raise OpenAIRequestError(502, "OpenAI returned invalid JSON.") from exc

  if response_payload.get("status") == "incomplete":
    raise OpenAIRequestError(502, "AI teacher response was incomplete. Try generating again.")
  article_text = extract_openai_text(response_payload)
  if not article_text:
    raise OpenAIRequestError(502, "AI teacher returned an empty response.")
  return normalize_ai_story(parse_openai_json(article_text))


class ChineseQuestHandler(SimpleHTTPRequestHandler):
  server_version = "ChineseQuest/1.0"

  def log_message(self, format: str, *args: object) -> None:
    sys.stderr.write("%s - %s\n" % (self.address_string(), format % args))

  def do_OPTIONS(self) -> None:
    self.send_response(204)
    self.send_header("Allow", "GET, POST, PUT, OPTIONS")
    self.end_headers()

  def do_GET(self) -> None:
    path = urlparse(self.path).path
    if path.startswith("/api/"):
      self.handle_api_get(path)
      return
    self.serve_static(path)

  def do_POST(self) -> None:
    path = urlparse(self.path).path
    if not path.startswith("/api/"):
      self.json_response(404, {"error": "Not found."})
      return
    try:
      body = parse_json_body(self)
    except ValueError as exc:
      self.json_response(400, {"error": str(exc)})
      return
    self.handle_api_post(path, body)

  def do_PUT(self) -> None:
    path = urlparse(self.path).path
    if path != "/api/profile/state":
      self.json_response(404, {"error": "Not found."})
      return
    try:
      body = parse_json_body(self)
    except ValueError as exc:
      self.json_response(400, {"error": str(exc)})
      return
    self.save_profile_state(body)

  def serve_static(self, raw_path: str) -> None:
    rel = unquote(raw_path).lstrip("/") or "index.html"
    full_path = (ROOT / rel).resolve()
    try:
      full_path.relative_to(ROOT)
    except ValueError:
      self.send_error(404, "File not found")
      return
    if full_path.is_dir() or not full_path.exists():
      self.send_error(404, "File not found")
      return
    self.send_response(200)
    mime_type, _ = mimetypes.guess_type(str(full_path))
    self.send_header("Content-Type", mime_type or "application/octet-stream")
    if full_path.name == "index.html" or full_path.suffix in {".js", ".css"}:
      self.send_header("Cache-Control", "no-store")
    self.send_header("Content-Length", str(full_path.stat().st_size))
    self.end_headers()
    with full_path.open("rb") as file:
      self.wfile.write(file.read())

  def json_response(self, status: int, payload: dict, extra_headers: dict[str, str] | None = None) -> None:
    raw = json_dumps(payload).encode("utf-8")
    self.send_response(status)
    self.send_header("Content-Type", "application/json; charset=utf-8")
    self.send_header("Cache-Control", "no-store")
    self.send_header("Content-Length", str(len(raw)))
    for key, value in (extra_headers or {}).items():
      self.send_header(key, value)
    self.end_headers()
    self.wfile.write(raw)

  def cookie_token(self) -> str:
    jar = cookies.SimpleCookie(self.headers.get("Cookie", ""))
    morsel = jar.get(SESSION_COOKIE)
    return morsel.value if morsel else ""

  def session_context(self) -> tuple[sqlite3.Connection, sqlite3.Row, sqlite3.Row] | None:
    token = self.cookie_token()
    if not token:
      return None
    conn = connect_db()
    now = int(time.time())
    conn.execute("DELETE FROM sessions WHERE expires_at <= ?", (now,))
    row = conn.execute(
      """
      SELECT u.*
      FROM sessions s
      JOIN users u ON u.id = s.user_id
      WHERE s.token_hash = ? AND s.expires_at > ?
      """,
      (token_hash(token), now),
    ).fetchone()
    if not row:
      conn.close()
      return None
    profile = conn.execute("SELECT * FROM profiles WHERE user_id = ?", (row["id"],)).fetchone()
    return conn, row, profile

  def require_session(self) -> tuple[sqlite3.Connection, sqlite3.Row, sqlite3.Row] | None:
    context = self.session_context()
    if not context:
      self.json_response(401, {"error": "Please sign in first."})
      return None
    return context

  def set_session_cookie(self, token: str, max_age: int = SESSION_SECONDS) -> str:
    return f"{SESSION_COOKIE}={token}; Path=/; Max-Age={max_age}; HttpOnly; SameSite=Lax"

  def create_session(self, conn: sqlite3.Connection, user_id: str) -> str:
    token = secrets.token_urlsafe(32)
    now = int(time.time())
    conn.execute(
      """
      INSERT INTO sessions (token_hash, user_id, created_at, expires_at)
      VALUES (?, ?, ?, ?)
      """,
      (token_hash(token), user_id, utc_now(), now + SESSION_SECONDS),
    )
    return token

  def handle_api_get(self, path: str) -> None:
    if path == "/api/health":
      self.json_response(200, {"ok": True, "database": str(USER_DB_PATH)})
      return
    if path == "/api/session":
      context = self.require_session()
      if not context:
        return
      conn, user, profile = context
      with conn:
        self.json_response(
          200,
          {
            "user": public_user(user),
            "state": parse_state(profile),
            "growthLog": recent_growth_logs(conn, user["id"]),
          },
        )
      conn.close()
      return
    if path == "/api/profile/log":
      context = self.require_session()
      if not context:
        return
      conn, user, _profile = context
      with conn:
        self.json_response(200, {"growthLog": recent_growth_logs(conn, user["id"])})
      conn.close()
      return
    self.json_response(404, {"error": "Not found."})

  def handle_api_post(self, path: str, body: dict) -> None:
    if path == "/api/register":
      self.register(body)
      return
    if path == "/api/login":
      self.login(body)
      return
    if path == "/api/logout":
      token = self.cookie_token()
      if token:
        with connect_db() as conn:
          conn.execute("DELETE FROM sessions WHERE token_hash = ?", (token_hash(token),))
      self.json_response(200, {"ok": True}, {"Set-Cookie": self.set_session_cookie("", 0)})
      return
    if path == "/api/ai-teacher/story":
      self.generate_ai_teacher_story(body)
      return
    self.json_response(404, {"error": "Not found."})

  def register(self, body: dict) -> None:
    username = clean_text(body.get("username"), 32)
    pin = clean_text(body.get("pin"), 8)
    email = clean_text(body.get("email"), 254)
    child_name = clean_text(body.get("childName") or body.get("name"), 40)
    avatar = clean_text(body.get("avatar") or body.get("mark"), 12) or "🐼"
    interests = clean_text(body.get("interests") or body.get("childInterests"), 500)
    age_raw = body.get("age") if "age" in body else body.get("childAge")

    error = (
      validate_username(username)
      or validate_pin(pin)
      or validate_email(email)
      or (None if child_name else "Enter the child's name.")
    )
    if normalize_username(username) == GUEST_USERNAME:
      error = "The guest username is reserved."
    if error:
      self.json_response(400, {"error": error})
      return

    child_age = None
    if age_raw not in (None, ""):
      try:
        child_age = int(age_raw)
      except (TypeError, ValueError):
        self.json_response(400, {"error": "Age must be a number."})
        return
      if child_age < 0 or child_age > 120:
        self.json_response(400, {"error": "Age must be between 0 and 120."})
        return

    user_id = secrets.token_hex(16)
    now = utc_now()
    salt_text, hash_text, iterations = hash_pin(pin)
    initial_state = body.get("initialState")
    if not isinstance(initial_state, dict):
      initial_state = {}

    try:
      with connect_db() as conn:
        conn.execute(
          """
          INSERT INTO users (
            id, username, username_norm, email, child_name, child_age, child_interests,
            avatar, pin_salt, pin_hash, pin_iterations, created_at, updated_at
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          """,
          (
            user_id,
            username,
            normalize_username(username),
            email,
            child_name,
            child_age,
            interests,
            avatar,
            salt_text,
            hash_text,
            iterations,
            now,
            now,
          ),
        )
        conn.execute(
          """
          INSERT INTO profiles (user_id, state_json, created_at, updated_at)
          VALUES (?, ?, ?, ?)
          """,
          (user_id, json_dumps(initial_state), now, now),
        )
        log_growth(
          conn,
          user_id,
          "profile_created",
          {"username": username, "childName": child_name, "childAge": child_age, "avatar": avatar},
        )
        token = self.create_session(conn, user_id)
        user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
        self.json_response(
          201,
          {"user": public_user(user), "state": initial_state, "growthLog": recent_growth_logs(conn, user_id)},
          {"Set-Cookie": self.set_session_cookie(token)},
        )
    except sqlite3.IntegrityError:
      self.json_response(409, {"error": "That username is already registered."})

  def login(self, body: dict) -> None:
    username = clean_text(body.get("username"), 32)
    pin = clean_text(body.get("pin"), 8)
    username_norm = normalize_username(username)
    is_guest_login = username_norm == GUEST_USERNAME and not pin
    if validate_username(username) or (not is_guest_login and validate_pin(pin)):
      self.json_response(401, {"error": "Username or password is incorrect."})
      return

    with connect_db() as conn:
      user = conn.execute("SELECT * FROM users WHERE username_norm = ?", (username_norm,)).fetchone()
      if not user or (not is_guest_login and not verify_pin(pin, user["pin_salt"], user["pin_hash"], int(user["pin_iterations"]))):
        self.json_response(401, {"error": "Username or password is incorrect."})
        return
      token = self.create_session(conn, user["id"])
      profile = conn.execute("SELECT * FROM profiles WHERE user_id = ?", (user["id"],)).fetchone()
      log_growth(conn, user["id"], "signed_in", {})
      self.json_response(
        200,
        {"user": public_user(user), "state": parse_state(profile), "growthLog": recent_growth_logs(conn, user["id"])},
        {"Set-Cookie": self.set_session_cookie(token)},
      )

  def generate_ai_teacher_story(self, body: dict) -> None:
    context = self.require_session()
    if not context:
      return
    conn, user, profile = context
    profile_state = parse_state(profile)
    try:
      story = request_ai_teacher_story(user, profile_state, body)
    except OpenAIRequestError as exc:
      self.json_response(exc.status, {"error": exc.message})
      conn.close()
      return

    with conn:
      log_growth(
        conn,
        user["id"],
        "ai_teacher_story_generated",
        {
          "chineseCharacterCount": story["chineseCharacterCount"],
          "newVocabularyCount": len(story["newVocabulary"]),
          "model": story["model"],
        },
      )
      self.json_response(200, {"story": story})
    conn.close()

  def save_profile_state(self, body: dict) -> None:
    context = self.require_session()
    if not context:
      return
    conn, user, _profile = context
    state = body.get("state")
    if not isinstance(state, dict):
      self.json_response(400, {"error": "State must be an object."})
      conn.close()
      return
    state_json = json_dumps(state)
    if len(state_json.encode("utf-8")) > MAX_JSON_BYTES:
      self.json_response(400, {"error": "Profile state is too large."})
      conn.close()
      return

    growth_event = body.get("growthEvent")
    with conn:
      conn.execute(
        """
        UPDATE profiles
        SET state_json = ?, updated_at = ?
        WHERE user_id = ?
        """,
        (state_json, utc_now(), user["id"]),
      )
      if isinstance(growth_event, dict):
        event_type = clean_text(growth_event.get("eventType"), 80) or "profile_update"
        payload = growth_event.get("payload")
        log_growth(conn, user["id"], event_type, payload if isinstance(payload, dict) else {})
      self.json_response(200, {"ok": True})
    conn.close()


def main() -> None:
  init_db()
  host = os.environ.get("CHINESE_QUEST_HOST", "127.0.0.1")
  port = int(os.environ.get("PORT", "4173"))
  server = ThreadingHTTPServer((host, port), ChineseQuestHandler)
  print(f"Chinese Quest running at http://{host}:{port}")
  print(f"User database: {USER_DB_PATH}")
  try:
    server.serve_forever()
  except KeyboardInterrupt:
    print("\nStopped.")


if __name__ == "__main__":
  main()
