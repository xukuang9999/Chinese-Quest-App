const HWXNET_ORIGIN = "https://zd.hwxnet.com";
const SEARCH_BASE = `${HWXNET_ORIGIN}/search/`;
const DEFAULT_CONCURRENCY = Number(process.env.HWXNET_CONCURRENCY || 6);
const DEFAULT_TIMEOUT_MS = Number(process.env.HWXNET_TIMEOUT_MS || 15000);
const DEFAULT_RETRIES = Number(process.env.HWXNET_RETRIES || 2);

export function hwxnetPageUrl(char) {
  const path = [...new TextEncoder().encode(char)]
    .map((byte) => `hwx${byte.toString(16).toUpperCase().padStart(2, "0")}`)
    .join("");
  return `${SEARCH_BASE}${path}.html`;
}

function codePointHex(char) {
  return char.codePointAt(0).toString(16).toUpperCase();
}

function decodeHtmlEntities(value = "") {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };
  return String(value).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    const key = entity.toLowerCase();
    if (key.startsWith("#x")) return String.fromCodePoint(Number.parseInt(key.slice(2), 16));
    if (key.startsWith("#")) return String.fromCodePoint(Number.parseInt(key.slice(1), 10));
    return named[key] ?? match;
  });
}

function cleanLine(value = "") {
  return decodeHtmlEntities(value)
    .replace(/\u00a0/g, " ")
    .replace(/\s+([,.;:，。；：、！？)）])/g, "$1")
    .replace(/([(（])\s+/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function htmlToLines(html = "") {
  const text = String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(?:p|div|h\d|li|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, "");
  return decodeHtmlEntities(text)
    .split(/\n+/)
    .map(cleanLine)
    .filter(Boolean);
}

function htmlToText(html = "") {
  return htmlToLines(html).join(" ");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sectionHtml(html, title) {
  const heading = new RegExp(`<h1>\\s*${escapeRegExp(title)}\\s*<\\/h1>`, "i").exec(html);
  if (!heading) return "";
  const rest = html.slice(heading.index + heading[0].length);
  const next = rest.search(/<div\s+class=["']sub_label["']/i);
  return next >= 0 ? rest.slice(0, next) : rest;
}

function cleanChineseDefinition(value = "") {
  return cleanLine(value)
    .replace(/^◎\s*/, "")
    .replace(/^●\s*/, "")
    .replace(/^[（(]?\d+[）)]\s*/, "")
    .replace(/\[[^\]]+\]\s*/g, "")
    .replace(/^[:：]\s*/, "")
    .trim();
}

function cleanEnglishGloss(value = "") {
  return cleanLine(value)
    .replace(/^◎\s*/, "")
    .replace(/[；]+/g, "; ")
    .replace(/\s*;\s*/g, "; ")
    .replace(/;+\s*$/g, "")
    .slice(0, 140)
    .trim();
}

function compactMeaningZh(definitions = [], words = []) {
  const definition =
    definitions.find(
      (line) => line && !/^姓[。.]?$/.test(line) && !/[《》]|甲骨|小篆|形声|会意|象形|从.+声/.test(line)
    ) || "";
  if (definition) {
    const firstSentence = definition.split(/(?<=。)/u).find(Boolean) || definition;
    const compact = firstSentence.length > 118 ? `${firstSentence.slice(0, 116)}…` : firstSentence;
    return /[。！？]$/.test(compact) ? compact : `${compact}。`;
  }
  return `常用汉字，常见于“${words[0]?.word || ""}、${words[1]?.word || ""}、${words[2]?.word || ""}”等词语。`;
}

function absoluteHwxnetUrl(src) {
  return new URL(src, HWXNET_ORIGIN).href;
}

function labelFromAlt(alt, char) {
  const cleaned = cleanLine(alt).replace(new RegExp(`^${escapeRegExp(char)}字的`), "");
  return cleaned || "字形";
}

function parseFontEvolution(html = "", char) {
  const evolutionHtml = sectionHtml(html, "字源演变");
  const items = [];
  const seen = new Set();
  const pattern = /<img\b([^>]*?)>/gi;
  let match;
  while ((match = pattern.exec(evolutionHtml))) {
    const attrs = match[1];
    const src = attrs.match(/\bsrc=["']([^"']+)["']/i)?.[1] || "";
    const alt = attrs.match(/\balt=["']([^"']*)["']/i)?.[1] || "";
    if (!src || !/fontimgs\//.test(src)) continue;
    const label = labelFromAlt(alt, char);
    const key = `${label}:${src}`;
    if (seen.has(key)) continue;
    seen.add(key);
    items.push({
      label,
      imageUrl: absoluteHwxnetUrl(src),
      alt: cleanLine(alt) || `${char}字的${label}`,
    });
  }

  if (items.length) return items;
  const hex = codePointHex(char);
  return [
    { label: "篆书", imageUrl: `${HWXNET_ORIGIN}/fontimgs/zs/${hex}.png`, alt: `${char}字的篆书` },
    { label: "隶书", imageUrl: `${HWXNET_ORIGIN}/fontimgs/ls/${hex}.png`, alt: `${char}字的隶书` },
    { label: "楷书", imageUrl: `${HWXNET_ORIGIN}/fontimgs/ks/${hex}.png`, alt: `${char}字的楷书` },
  ];
}

export function parseHwxnetPage(html = "", char, url = hwxnetPageUrl(char)) {
  const basicDefinitions = htmlToLines(sectionHtml(html, "基本字义解释"))
    .filter((line) => line.startsWith("◎"))
    .map(cleanChineseDefinition)
    .filter(Boolean);
  const english =
    htmlToLines(sectionHtml(html, "英文翻译"))
      .map(cleanEnglishGloss)
      .find((line) => /[A-Za-z]/.test(line)) || "";
  return {
    sourceUrl: url,
    basicDefinitions,
    english,
    fontEvolution: parseFontEvolution(html, char),
  };
}

async function fetchTextWithRetry(url, { retries = DEFAULT_RETRIES, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          "user-agent": "ChineseQuestDataUpdater/1.0",
        },
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.text();
    } catch (error) {
      lastError = error;
      if (attempt < retries) await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
    }
  }
  throw lastError;
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await mapper(items[current], current);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

export async function fetchHwxnetData(chars, options = {}) {
  const uniqueChars = [...new Set(chars)];
  const concurrency = Number(options.concurrency || DEFAULT_CONCURRENCY);
  const pairs = await mapLimit(uniqueChars, concurrency, async (char, index) => {
    const url = hwxnetPageUrl(char);
    try {
      const html = await fetchTextWithRetry(url, options);
      if (options.onProgress) options.onProgress({ char, index: index + 1, total: uniqueChars.length, ok: true });
      return [char, parseHwxnetPage(html, char, url)];
    } catch (error) {
      if (options.onProgress) {
        options.onProgress({ char, index: index + 1, total: uniqueChars.length, ok: false, error });
      }
      return [
        char,
        {
          sourceUrl: url,
          basicDefinitions: [],
          english: "",
          fontEvolution: [],
          error: error.message,
        },
      ];
    }
  });
  return new Map(pairs);
}

function mergeSourceTags(tags = [], hasHwxnet, hasEvolution) {
  const merged = new Set(tags.filter(Boolean));
  if (hasHwxnet) merged.add("online-xinhua");
  if (hasEvolution) merged.add("hwxnet-font-evolution");
  return [...merged];
}

export function applyHwxnetData(entry, data) {
  if (!data) return entry;
  const next = { ...entry };
  const hasDefinition = Array.isArray(data.basicDefinitions) && data.basicDefinitions.length > 0;
  if (hasDefinition) next.meaningZh = compactMeaningZh(data.basicDefinitions, entry.words || []);
  if (data.english) next.meaningEn = cleanEnglishGloss(data.english);
  if (Array.isArray(data.fontEvolution) && data.fontEvolution.length) {
    next.fontEvolution = data.fontEvolution.slice(0, 6);
  }
  if (data.sourceUrl) next.sourceUrl = data.sourceUrl;
  next.sourceTags = mergeSourceTags(next.sourceTags, hasDefinition || Boolean(data.english), Boolean(next.fontEvolution?.length));
  return next;
}

export async function enrichEntriesWithHwxnet(entries, options = {}) {
  const dataByChar = await fetchHwxnetData(
    entries.map((entry) => entry.char),
    options
  );
  let definitionCount = 0;
  let englishCount = 0;
  let evolutionCount = 0;
  let failedCount = 0;
  const enriched = entries.map((entry) => {
    const data = dataByChar.get(entry.char);
    if (data?.basicDefinitions?.length) definitionCount += 1;
    if (data?.english) englishCount += 1;
    if (data?.fontEvolution?.length) evolutionCount += 1;
    if (data?.error) failedCount += 1;
    return applyHwxnetData(entry, data);
  });
  return {
    entries: enriched,
    stats: {
      definitionCount,
      englishCount,
      evolutionCount,
      failedCount,
    },
  };
}
