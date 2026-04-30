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
const charWordCount = sqliteJson("SELECT COUNT(*) AS count FROM character_words;")[0].count;
const sentenceCount = sqliteJson("SELECT COUNT(*) AS count FROM character_sentences;")[0].count;
const idiomCount = sqliteJson("SELECT COUNT(*) AS count FROM idioms;")[0]?.count || 0;
const metadata = Object.fromEntries(
  sqliteJson("SELECT key, value FROM metadata;").map((row) => [row.key, Number(row.value)])
);

const problems = [];
if (wordCount !== data.commonWordCount) {
  problems.push(`SQLite words expected ${data.commonWordCount}, got ${wordCount}`);
}
if (charWordCount !== data.entries.length * 3) {
  problems.push(`SQLite character_words expected ${data.entries.length * 3}, got ${charWordCount}`);
}
if (sentenceCount !== data.entries.length * 3) {
  problems.push(`SQLite character_sentences expected ${data.entries.length * 3}, got ${sentenceCount}`);
}
if (data.entries.length !== 800) problems.push(`data.js entries expected 800, got ${data.entries.length}`);
if (data.lessonSize !== 5) problems.push(`data.js lessonSize expected 5, got ${data.lessonSize}`);
if (data.characterCount !== data.entries.length) {
  problems.push(`data.js characterCount expected ${data.entries.length}, got ${data.characterCount}`);
}
if (data.sentenceCount !== sentenceCount) {
  problems.push(`data.js sentenceCount expected ${sentenceCount}, got ${data.sentenceCount}`);
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
if (metadata.sentence_count !== sentenceCount) {
  problems.push(`SQLite metadata sentence_count expected ${sentenceCount}, got ${metadata.sentence_count}`);
}

const chars = new Set();
const sentenceZh = new Set();
const sentenceEn = new Set();
const weakSentenceZh =
  /^(课文里提到|今天的练习和|老师讲了|老师讲解|故事里出现了|老师讲到|这句话里有|故事里表现出|出门时，我们会看到|我会用|老师解释.*的意思|课文里有.*这个说法|老师在日历上指出|我们用.*安排学习|老师用图说明|请指出.*的位置|地图上标出了|上课时，我们用到|练习时，我们用到|故事里有人|今天的故事里有|这张图里有|课堂上，老师写下|我在课后复习|同学们一起读|老师用一个例子说明|老师给了我|我在本子上写|上课时，我读到|我在句子里用到了|老师请我读出|学习“.+”字时，我再读|请你先|公园里，我看见|操场上有一位(自我|我们|你们|他们|你的)|我认识这位(自我|我们)|数学题里有|完成任务后，我得到(努力|等级|认真|成长|全对)|中文课上，我们学习(纸张|同桌)|老师用图解释(早安|晚安|谢礼)|桌上放着(买菜|卖菜|爱吃|喝茶|喝奶|吃水果)|午饭时，我吃了(做饭|热水|茶水|卖菜)|我想尝一尝(吃水果|喝奶)|老师示范喝水这个动作|草地上有一只牛羊|老师用.+帮助我们学习|.+让我更想练习|运动后，我活动(努嘴|体力|头发)|画人像时，她先画(体力|头上|努嘴)|我会(会说|动作|运动|认识|给你)|我每天练习(会说|动作|运动|认识|看见|睡觉|穿过|眼看|给你|想要|能够|错过))/;
const weakSentenceEn =
  /^(The lesson text mentions|Today's practice is about|The teacher talks about|The teacher explains|The story shows|Today's story includes|This picture includes|In class, the teacher writes a word meaning|After class, I review a word meaning|The classmates read a word meaning|There is .* in the math question\.?$|There is (a |an )?(self|we|you all|they|your) on the playground\.?$|When going out, we can see|I can make a sentence|This sentence has|.*appears in the story\.?$|We use .* to plan study\.?$|The map marks|In class, we use|In class, I read|I write ".+" in my notebook|While learning|Please do ".+" first|I practise ".+" every day|I use ".+" in the sentence|The teacher gives me|The teacher uses .* to help us learn\.?$|The teacher uses a picture to explain (good morning|good night|thank-you gift)\.?$|I see (?!a |an |the |some )[a-z ]+ in the park\.?$)|is it is|okay\? to|^[\u3400-\u9fff]+[:：]|what the hell|onetime former|be on one's foot|I know this (self|we)\.?$|There is (an eat fruit|buy vegetables|sell vegetables|like to eat|drink tea|drink milk|cows and sheep) |At lunch, I eat (cook a meal|hot water|tea|sell vegetables)\.?$|I want to try (eat fruit|drink milk)\.?$|The teacher demonstrates the action drink water\.?$|On at the same time|I can (speak|action|sport|recognise it|give you)\.?$|I practise (speaking|actioning|sporting|recognising it|seeing|sleeping|passing through|watching|giving you|asking for it|being able to|missing) every day\.?$|After finishing the task, I receive (work hard|level|serious|grow up|all correct)\.?$|draws the (physical strength|on the head|purse one's lips)|move my (purse one's lips|physical strength|hair)|makes me want to practise more/i;
const dictionaryFragmentZh = /《|》|--|——|∶|\[[^\]]+\]|。--|曰|矣|焉|也。--/;

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
  if (!entry.words || entry.words.length !== 3) problems.push(`${entry.char} needs exactly 3 words`);
  if (!entry.sentences || entry.sentences.length !== 3) problems.push(`${entry.char} needs exactly 3 sentences`);
  (entry.words || []).forEach((word) => {
    if (!word.word.includes(entry.char)) problems.push(`${entry.char} word missing char: ${word.word}`);
    if (disallowedTeachingWords.has(word.word)) problems.push(`${entry.char} disallowed word: ${word.word}`);
    if (/flashcard|sound of/i.test(word.meaningEn) || word.word === `${entry.char}卡`) {
      problems.push(`${entry.char} placeholder word: ${word.word}`);
    }
  });
  (entry.sentences || []).forEach((sentence, index) => {
    const word = entry.words?.[index]?.word;
    if (!sentence.zh.includes(entry.char)) problems.push(`${entry.char} sentence missing char: ${sentence.zh}`);
    if (word && !sentence.zh.includes(word)) problems.push(`${entry.char} sentence missing word ${word}: ${sentence.zh}`);
    if (sentenceZh.has(sentence.zh)) problems.push(`${entry.char} duplicate Chinese sentence: ${sentence.zh}`);
    sentenceZh.add(sentence.zh);
    if (sentenceEn.has(sentence.en)) problems.push(`${entry.char} duplicate English sentence: ${sentence.en}`);
    sentenceEn.add(sentence.en);
    if (!/[。！？][”"]?$/.test(sentence.zh)) problems.push(`${entry.char} Chinese sentence lacks ending punctuation: ${sentence.zh}`);
    if (!/[.!?][”"]?$/.test(sentence.en)) problems.push(`${entry.char} English sentence lacks ending punctuation: ${sentence.en}`);
    if (dictionaryFragmentZh.test(sentence.zh)) problems.push(`${entry.char} dictionary fragment sentence: ${sentence.zh}`);
    if (/".*[\u3400-\u9fff].*"/.test(sentence.en)) {
      problems.push(`${entry.char} English sentence quotes Chinese text: ${sentence.en}`);
    }
    if (weakSentenceZh.test(sentence.zh) || weakSentenceEn.test(sentence.en)) {
      problems.push(`${entry.char} weak template sentence: ${sentence.zh} / ${sentence.en}`);
    }
    if (/^我会读“.+”这个词。$/.test(sentence.zh)) problems.push(`${entry.char} template sentence: ${sentence.zh}`);
    if (!sentence.en || /^Try it:/i.test(sentence.en)) problems.push(`${entry.char} bad sentence English`);
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
      sentences: sentenceCount,
      idioms: idiomCount,
    },
    null,
    2
  )
);
