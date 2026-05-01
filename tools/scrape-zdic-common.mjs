import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const DATA_PATH = fileURLToPath(new URL("../data.js", import.meta.url));
const DB_PATH = fileURLToPath(new URL("../data/chinese-study.sqlite", import.meta.url));
const DEFAULT_COUNT = 800;
const REQUEST_DELAY_MS = 320;
const ZDIC_LICENSE = "CC0-1.0";
const ZDIC_SOURCE_NAME = "汉典";

function argValue(name, fallback = "") {
  const prefix = `${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

const targetCount = Math.max(1, Number(argValue("--count", DEFAULT_COUNT)) || DEFAULT_COUNT);
const refresh = process.argv.includes("--refresh");
const explicitCharText = argValue("--chars", "");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function parseDataJs(text) {
  const match = text.match(/window\.CHINESE_STUDY_DATA = (.*);\s*$/s);
  assert(match, "data.js payload not found");
  return JSON.parse(match[1]);
}

function sqlValue(value) {
  if (value === null || value === undefined) return "NULL";
  return `'${String(value).replace(/'/g, "''")}'`;
}

function runSql(statements) {
  execFileSync("sqlite3", [DB_PATH], {
    input: Array.isArray(statements) ? statements.join("\n") : statements,
    maxBuffer: 80 * 1024 * 1024,
  });
}

function sqliteJson(query) {
  const output = execFileSync("sqlite3", ["-json", DB_PATH, query], {
    encoding: "utf8",
    maxBuffer: 80 * 1024 * 1024,
  }).trim();
  return output ? JSON.parse(output) : [];
}

function ensureZdicTable() {
  runSql([
    "CREATE TABLE IF NOT EXISTS character_zdic (char TEXT PRIMARY KEY NOT NULL, fetched_at TEXT NOT NULL, source_name TEXT NOT NULL, license TEXT NOT NULL, payload_json TEXT NOT NULL);",
  ]);
}

function decodeHtmlEntities(value = "") {
  const named = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
    middot: "·",
    ldquo: "“",
    rdquo: "”",
    lsquo: "‘",
    rsquo: "’",
    hellip: "…",
    mdash: "—",
    ndash: "–",
  };
  return String(value).replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity) => {
    if (entity[0] === "#") {
      const isHex = entity[1]?.toLowerCase() === "x";
      const codePoint = Number.parseInt(entity.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
    }
    return Object.hasOwn(named, entity) ? named[entity] : match;
  });
}

function stripNoise(html = "") {
  return String(html)
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<ins\b[\s\S]*?<\/ins>/gi, "")
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, "")
    .replace(/<div class="div copyright"[\s\S]*?<\/div>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
}

function htmlToText(html = "") {
  return decodeHtmlEntities(
    stripNoise(html)
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|li|div|h[1-6]|tr|ol|ul|table|section)>/gi, "\n")
      .replace(/<[^>]+>/g, "")
  )
    .replace(/\u00a0/g, " ")
    .replace(/[ \t\f\v]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/【漢典】/g, "")
    .trim();
}

function cleanInlineText(value = "") {
  return htmlToText(value).replace(/\s+/g, " ").trim();
}

function compactText(value = "", maxLength = 3000) {
  const text = cleanInlineText(value);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).replace(/[，。；、\s][^，。；、\s]*$/, "")}…`;
}

function extractBalancedDiv(html, openStart) {
  if (openStart < 0) return "";
  const tagPattern = /<\/?div\b[^>]*>/gi;
  tagPattern.lastIndex = openStart;
  let depth = 0;
  let match;
  while ((match = tagPattern.exec(html))) {
    if (match[0][1] === "/") {
      depth -= 1;
      if (depth === 0) return html.slice(openStart, tagPattern.lastIndex);
    } else {
      depth += 1;
    }
  }
  return "";
}

function sectionByType(html, type) {
  const marker = `data-type-block="${type}"`;
  const markerIndex = html.indexOf(marker);
  if (markerIndex < 0) return "";
  return extractBalancedDiv(html, html.lastIndexOf("<div", markerIndex));
}

function entryTitleHtml(html) {
  const marker = '<div class="entry_title">';
  const start = html.indexOf(marker);
  return extractBalancedDiv(html, start);
}

function extractCellValues(html, cellClass) {
  const values = [];
  const cellPattern = new RegExp(`<td class="${cellClass}"[\\s\\S]*?<\\/td>`, "g");
  const valuePattern = /<span class="z_d song">\s*([^<]+)/g;
  let cellMatch;
  while ((cellMatch = cellPattern.exec(html))) {
    let valueMatch;
    while ((valueMatch = valuePattern.exec(cellMatch[0]))) {
      const value = cleanInlineText(valueMatch[1]);
      if (value && !values.includes(value)) values.push(value);
    }
  }
  return values;
}

function extractFacts(html) {
  const title = entryTitleHtml(html);
  const titleText = cleanInlineText(title);
  const pinyin = extractCellValues(title, "z_py");
  const zhuyin = extractCellValues(title, "z_zy");
  const radicalMatch = titleText.match(/部首\s+(\S+)\s+部外\s+(\d+)\s+总笔画\s+(\d+)/);
  const unicodeMatch = titleText.match(/基本区\s+U\+([0-9A-F]+)/i) || titleText.match(/基本区\s+([0-9A-F]{4,6})/i);
  const structureMatch = title.match(/<td class="dsk_2_1">\s*([^<]*结构[^<]*)\s*<\/td>/);
  const strokeOrderMatch =
    title.match(/class="z_bis2"[\s\S]*?<p>\s*([^<]+)\s*<\/p>/) || titleText.match(/笔顺\s+([0-9A-Za-z]+)\s*(?:五笔|拼音|$)/);
  const codeMatch = titleText.match(/五笔\s+仓颉\s+郑码\s+四角\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)/);
  const variantsCell = title.match(/<td class="z_ytz2">([\s\S]*?)<\/td>/)?.[1] || "";
  const variants = extractAnchorTexts(variantsCell).filter((item) => item !== "异体字");

  return {
    pinyin,
    zhuyin,
    radical: radicalMatch?.[1] || "",
    outerStrokes: radicalMatch?.[2] ? Number(radicalMatch[2]) : null,
    totalStrokes: radicalMatch?.[3] ? Number(radicalMatch[3]) : null,
    unicode: unicodeMatch?.[1] ? `U+${unicodeMatch[1].toUpperCase()}` : "",
    structure: cleanInlineText(structureMatch?.[1] || ""),
    strokeOrder: cleanInlineText(strokeOrderMatch?.[1] || ""),
    codes: {
      wubi: codeMatch?.[1] || "",
      cangjie: codeMatch?.[2] || "",
      zhengma: codeMatch?.[3] || "",
      fourCorner: codeMatch?.[4] || "",
    },
    variants,
  };
}

function extractListItems(sectionHtml) {
  const items = [];
  const itemPattern = /<li\b[^>]*>([\s\S]*?)<\/li>/g;
  let match;
  while ((match = itemPattern.exec(sectionHtml))) {
    const text = cleanInlineText(match[1]);
    if (text && !items.includes(text)) items.push(text);
  }
  return items;
}

function extractAnchorTexts(sectionHtml) {
  const items = [];
  const anchorPattern = /<a\b[^>]*>([\s\S]*?)<\/a>/g;
  let match;
  while ((match = anchorPattern.exec(sectionHtml))) {
    const text = cleanInlineText(match[1]);
    if (text && !items.includes(text)) items.push(text);
  }
  return items;
}

function extractTranslations(sectionHtml) {
  const enbox = sectionHtml.match(/<div class="enbox">([\s\S]*?)<\/div>/)?.[1] || "";
  const translations = {};
  const paragraphPattern = /<p>\s*<span[^>]*>([^<]+)<\/span>\s*([\s\S]*?)<\/p>/g;
  let match;
  while ((match = paragraphPattern.exec(enbox))) {
    const label = cleanInlineText(match[1]);
    const text = cleanInlineText(match[2]);
    if (label && text) translations[label] = text;
  }
  return translations;
}

function extractCommonTerms(sectionHtml) {
  const termsBlock = sectionHtml.match(/<div class="cit type-xxjs">([\s\S]*?)<\/div>/)?.[1] || "";
  return extractAnchorTexts(termsBlock).slice(0, 16);
}

function parseZdicPage(char, html) {
  const facts = extractFacts(html);
  const basicSection = sectionByType(html, "基本解释");
  const detailSection = sectionByType(html, "详细解释");
  const mandarinSection = sectionByType(html, "國語辭典");
  const kangxiSection = sectionByType(html, "康熙字典");
  const phoneticsSection = sectionByType(html, "音韵方言");
  const glyphSection = sectionByType(html, "字源字形");
  const phoneticCategories = extractAnchorTexts(phoneticsSection).filter((item) => !["音韵方言"].includes(item));

  return {
    char,
    sourceName: ZDIC_SOURCE_NAME,
    license: ZDIC_LICENSE,
    fetchedAt: new Date().toISOString(),
    ...facts,
    basic: {
      definitions: extractListItems(basicSection).slice(0, 12),
      translations: extractTranslations(basicSection),
      text: compactText(basicSection, 1800),
    },
    detailed: {
      text: compactText(detailSection, 12000),
      commonTerms: extractCommonTerms(detailSection),
    },
    mandarin: {
      text: compactText(mandarinSection, 2600),
    },
    kangxi: {
      text: compactText(kangxiSection, 2600),
    },
    phonetics: {
      categories: phoneticCategories.slice(0, 18),
      text: compactText(phoneticsSection, 900),
    },
    glyph: {
      variants: facts.variants,
      text: compactText(glyphSection, 1200),
    },
  };
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchZdic(char) {
  const url = `https://www.zdic.net/hans/${encodeURIComponent(char)}`;
  let lastError = null;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const html = execFileSync(
        "curl",
        [
          "-L",
          "--silent",
          "--show-error",
          "--fail",
          "--compressed",
          "--http1.1",
          "--connect-timeout",
          "20",
          "--max-time",
          "45",
          "-H",
          "Accept-Language: zh-CN,zh;q=0.9,en;q=0.7",
          "-A",
          "Chinese Quest offline data builder; educational app data refresh",
          url,
        ],
        { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 }
      );
      return parseZdicPage(char, html);
    } catch (error) {
      lastError = error;
      if (attempt < 3) await sleep(900 * attempt);
    }
  }
  throw lastError;
}

function loadCachedPayloads() {
  return new Map(
    sqliteJson("SELECT char, payload_json FROM character_zdic;").map((row) => {
      try {
        return [row.char, JSON.parse(row.payload_json)];
      } catch {
        return [row.char, null];
      }
    })
  );
}

function writeZdicPayloads(payloads, count) {
  const statements = [
    "BEGIN;",
    "CREATE TABLE IF NOT EXISTS character_zdic (char TEXT PRIMARY KEY NOT NULL, fetched_at TEXT NOT NULL, source_name TEXT NOT NULL, license TEXT NOT NULL, payload_json TEXT NOT NULL);",
  ];
  payloads.forEach((payload) => {
    statements.push(
      `INSERT OR REPLACE INTO character_zdic VALUES (${sqlValue(payload.char)}, ${sqlValue(payload.fetchedAt)}, ${sqlValue(
        ZDIC_SOURCE_NAME
      )}, ${sqlValue(ZDIC_LICENSE)}, ${sqlValue(JSON.stringify(payload))});`
    );
  });
  statements.push(
    `INSERT OR REPLACE INTO metadata VALUES ('zdic_character_count', ${sqlValue(count)});`,
    `INSERT OR REPLACE INTO metadata VALUES ('zdic_source_name', ${sqlValue(ZDIC_SOURCE_NAME)});`,
    `INSERT OR REPLACE INTO metadata VALUES ('zdic_license', ${sqlValue(ZDIC_LICENSE)});`,
    `INSERT OR REPLACE INTO metadata VALUES ('zdic_generated_at', ${sqlValue(new Date().toISOString())});`,
    "COMMIT;"
  );
  runSql(statements);
}

async function writeDataJs(data, payloadMap) {
  data.entries = data.entries.map((entry) => {
    const zdic = payloadMap.get(entry.char);
    if (!zdic) {
      const { zdic: _unused, ...rest } = entry;
      return rest;
    }
    return { ...entry, zdic };
  });
  data.zdicMetadata = {
    characterCount: payloadMap.size,
    sourceName: ZDIC_SOURCE_NAME,
    license: ZDIC_LICENSE,
    storage: "SQLite character_zdic table exported into this app data file",
  };

  const payload = `// Generated by tools/expand-course-data.mjs and enriched by tools/scrape-zdic-common.mjs. Do not edit by hand.
window.CHINESE_STUDY_DATA = ${JSON.stringify(data, null, 2)};
`;
  await writeFile(DATA_PATH, payload, "utf8");
}

const data = parseDataJs(await readFile(DATA_PATH, "utf8"));
const courseChars = data.entries.map((entry) => entry.char);
const explicitChars = [...explicitCharText].filter((char, index, items) => courseChars.includes(char) && items.indexOf(char) === index);
const chars = explicitChars.length ? explicitChars : courseChars.slice(0, targetCount);
const outputChars = explicitChars.length ? courseChars : chars;
ensureZdicTable();
const cached = loadCachedPayloads();
const payloadByChar = new Map([...cached].filter(([char, payload]) => outputChars.includes(char) && payload));

for (let index = 0; index < chars.length; index += 1) {
  const char = chars[index];
  const cachedPayload = cached.get(char);
  if (cachedPayload && !refresh) {
    payloadByChar.set(char, cachedPayload);
    console.log(`Using cached ${index + 1}/${chars.length}: ${char}`);
    continue;
  }

  const payload = await fetchZdic(char);
  assert(payload.basic.definitions.length || payload.basic.text, `${char} missing basic ZDIC data`);
  payloadByChar.set(char, payload);
  console.log(`Fetched ${index + 1}/${chars.length}: ${char}`);
  if (index < chars.length - 1) await sleep(REQUEST_DELAY_MS);
}

const payloads = outputChars.map((char) => payloadByChar.get(char)).filter(Boolean);
writeZdicPayloads(payloads, payloads.length);
await writeDataJs(data, new Map(payloads.map((payload) => [payload.char, payload])));

console.log(
  JSON.stringify(
    {
      ok: true,
      characters: payloads.length,
      first: payloads[0]?.char,
      last: payloads[payloads.length - 1]?.char,
      database: "character_zdic",
      dataFile: "data.js",
    },
    null,
    2
  )
);
