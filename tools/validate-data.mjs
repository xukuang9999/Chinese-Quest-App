import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const DB_PATH = fileURLToPath(new URL("../data/chinese-study.sqlite", import.meta.url));
const DATA_PATH = fileURLToPath(new URL("../data.js", import.meta.url));

function sqliteJson(query) {
  const output = execFileSync("sqlite3", ["-json", DB_PATH, query], {
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  }).trim();
  return output ? JSON.parse(output) : [];
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const dataText = await readFile(DATA_PATH, "utf8");
const match = dataText.match(/window\.CHINESE_STUDY_DATA = (.*);\s*$/s);
assert(match, "data.js payload not found");
const data = JSON.parse(match[1]);
const disallowedTeachingWords = new Set(["亲朋", "朋辈", "努目", "宠儿", "猫头", "业绩"]);

const wordCount = sqliteJson("SELECT COUNT(*) AS count FROM words;")[0].count;
const dbCharacterCount = sqliteJson("SELECT COUNT(*) AS count FROM characters;")[0]?.count || 0;
const charWordCount = sqliteJson("SELECT COUNT(*) AS count FROM character_words;")[0].count;
const idiomCount = sqliteJson("SELECT COUNT(*) AS count FROM idioms;")[0]?.count || 0;
const metadata = Object.fromEntries(
  sqliteJson("SELECT key, value FROM metadata;").map((row) => [row.key, Number(row.value)])
);

const problems = [];
if (wordCount !== data.commonWordCount) {
  problems.push(`SQLite words expected ${data.commonWordCount}, got ${wordCount}`);
}
if (dbCharacterCount !== data.entries.length) {
  problems.push(`SQLite characters expected ${data.entries.length}, got ${dbCharacterCount}`);
}
if (charWordCount !== data.entries.length * 3) {
  problems.push(`SQLite character_words expected ${data.entries.length * 3}, got ${charWordCount}`);
}
if (data.entries.length !== 800) problems.push(`data.js entries expected 800, got ${data.entries.length}`);
if (data.lessonSize !== 5) problems.push(`data.js lessonSize expected 5, got ${data.lessonSize}`);
if (data.characterCount !== data.entries.length) {
  problems.push(`data.js characterCount expected ${data.entries.length}, got ${data.characterCount}`);
}
if (!Array.isArray(data.idioms) || data.idioms.length !== 200) {
  problems.push(`data.js idioms expected 200, got ${data.idioms?.length || 0}`);
}
if (idiomCount !== 200) problems.push(`SQLite idioms expected 200, got ${idiomCount}`);
if (data.commonWordCount !== wordCount) {
  problems.push(`data.js commonWordCount expected ${wordCount}, got ${data.commonWordCount}`);
}
if (metadata.character_count !== data.entries.length) {
  problems.push(`SQLite metadata character_count expected ${data.entries.length}, got ${metadata.character_count}`);
}
if (metadata.common_word_count !== wordCount) {
  problems.push(`SQLite metadata common_word_count expected ${wordCount}, got ${metadata.common_word_count}`);
}

const chars = new Set();

data.entries.forEach((entry) => {
  if (chars.has(entry.char)) problems.push(`duplicate char ${entry.char}`);
  chars.add(entry.char);
  if (!entry.pinyin) problems.push(`${entry.char} missing pinyin`);
  if (!entry.meaningZh || /(甲骨|小篆|会意|象形|形声|从.+声|搜索与)/.test(entry.meaningZh)) {
    problems.push(`${entry.char} suspicious meaningZh`);
  }
  if (!entry.meaningEn || /common Chinese character|Try it|sound of|flashcard/i.test(entry.meaningEn)) {
    problems.push(`${entry.char} suspicious meaningEn`);
  }
  if (!entry.sourceUrl || !entry.sourceUrl.startsWith("https://zd.hwxnet.com/search/")) {
    problems.push(`${entry.char} missing hwxnet sourceUrl`);
  }
  if (!Array.isArray(entry.fontEvolution) || entry.fontEvolution.length < 3) {
    problems.push(`${entry.char} missing fontEvolution`);
  } else {
    entry.fontEvolution.forEach((item) => {
      if (!item.label || !item.imageUrl || !item.imageUrl.startsWith("https://zd.hwxnet.com/fontimgs/")) {
        problems.push(`${entry.char} invalid fontEvolution item`);
      }
    });
  }
  if (!entry.words || entry.words.length !== 3) problems.push(`${entry.char} needs exactly 3 words`);
  (entry.words || []).forEach((word) => {
    if (!word.word.includes(entry.char)) problems.push(`${entry.char} word missing char: ${word.word}`);
    if (disallowedTeachingWords.has(word.word)) problems.push(`${entry.char} disallowed word: ${word.word}`);
    if (/flashcard|sound of/i.test(word.meaningEn) || word.word === `${entry.char}卡`) {
      problems.push(`${entry.char} placeholder word: ${word.word}`);
    }
  });
});

if (problems.length) {
  console.error(problems.slice(0, 80).join("\n"));
  throw new Error(`${problems.length} data validation problems`);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      entries: data.entries.length,
      sqliteWords: wordCount,
      characterWords: charWordCount,
      idioms: idiomCount,
    },
    null,
    2
  )
);
