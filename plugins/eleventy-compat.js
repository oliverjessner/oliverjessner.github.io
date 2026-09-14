import fs from "node:fs";
import path from "node:path";
import markdownIt from "markdown-it";

const SITE_URL = "https://oliverjessner.at";
const markdown = markdownIt({ html: true, linkify: false, typographer: false });

function asDate(value) {
  if (value instanceof Date) return value;
  if (value === undefined || value === null || value === "") return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf()) ? null : parsed;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function xmlDate(value) {
  const date = asDate(value);
  if (!date) return "";
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const offset = `${sign}${pad(Math.floor(Math.abs(offsetMinutes) / 60))}:${pad(Math.abs(offsetMinutes) % 60)}`;
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${offset}`;
}

function rfc822Date(value) {
  const date = asDate(value);
  return date ? date.toUTCString() : "";
}

function longDate(value) {
  const date = asDate(value);
  if (!date) return "";
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${pad(date.getDate())} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function absoluteUrl(value, siteUrl = SITE_URL) {
  if (!value) return siteUrl;
  try {
    return new URL(String(value), `${siteUrl.replace(/\/$/, "")}/`).href;
  } catch {
    return String(value);
  }
}

function relativeUrl(value, baseurl = "") {
  const input = String(value ?? "");
  if (!input || /^[a-z][a-z\d+.-]*:/i.test(input) || input.startsWith("//")) return input;
  const normalizedBase = String(baseurl || "").replace(/^\/+|\/+$/g, "");
  const normalizedPath = input.startsWith("/") ? input : `/${input}`;
  return normalizedBase ? `/${normalizedBase}${normalizedPath}` : normalizedPath;
}

function stripHtml(value) {
  return String(value ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function readingTime(value) {
  const words = stripHtml(value).match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu)?.length || 0;
  return Math.max(1, Math.ceil(words / 200));
}

function normalizeTopic(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function categorySlug(value) {
  return String(value ?? "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

function relatedYoutubeShort(post, shorts) {
  const categories = Array.isArray(post?.categories) ? post.categories : [];
  const title = ` ${normalizeTopic(post?.title)} `;
  const titleWords = [...new Set(normalizeTopic(post?.title).split(" ").filter((word) => word.length > 3))];
  const categoryTopics = categories.map(normalizeTopic);

  return (Array.isArray(shorts) ? shorts : [])
    .filter((short) => (short?.related_topics || []).some((topic) => {
      const normalized = normalizeTopic(topic);
      return normalized && (categoryTopics.includes(normalized) || title.includes(` ${normalized} `));
    }))
    .sort((left, right) => {
      const score = (short) => [
        titleWords.filter((word) => normalizeTopic(short?.title).split(" ").includes(word)).length,
        categories.filter((category) => (short?.categories || []).includes(category)).length,
        String(short?.date || ""),
      ];
      const a = score(left);
      const b = score(right);
      return b[0] - a[0] || b[1] - a[1] || b[2].localeCompare(a[2]);
    })[0] || null;
}

function readImageDimensions(input) {
  if (!input || /^https?:\/\//i.test(String(input))) return null;
  const relativePath = String(input).replace(/^\/+/, "");
  const root = process.cwd();
  const filePath = path.resolve(root, relativePath);
  if (!filePath.startsWith(`${root}${path.sep}`) || !fs.existsSync(filePath)) return null;

  try {
    const data = fs.readFileSync(filePath);
    if (data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
      return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
    }
    if (["GIF87a", "GIF89a"].includes(data.toString("ascii", 0, 6))) {
      return { width: data.readUInt16LE(6), height: data.readUInt16LE(8) };
    }
    if (data[0] === 0xff && data[1] === 0xd8) {
      const sof = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
      let offset = 2;
      while (offset + 8 < data.length) {
        while (offset < data.length && data[offset] !== 0xff) offset++;
        while (offset < data.length && data[offset] === 0xff) offset++;
        const marker = data[offset++];
        if (marker === undefined || marker === 0xd8 || marker === 0xd9) continue;
        const length = data.readUInt16BE(offset);
        if (sof.has(marker)) {
          return { width: data.readUInt16BE(offset + 5), height: data.readUInt16BE(offset + 3) };
        }
        if (length < 2) return null;
        offset += length;
      }
    }
    if (data.toString("ascii", 0, 4) === "RIFF" && data.toString("ascii", 8, 12) === "WEBP") {
      let offset = 12;
      while (offset + 8 <= data.length) {
        const type = data.toString("ascii", offset, offset + 4);
        const size = data.readUInt32LE(offset + 4);
        const chunk = offset + 8;
        if (type === "VP8X" && size >= 10) {
          return {
            width: 1 + data.readUIntLE(chunk + 4, 3),
            height: 1 + data.readUIntLE(chunk + 7, 3),
          };
        }
        if (type === "VP8 " && size >= 10 && data.subarray(chunk + 3, chunk + 6).equals(Buffer.from([0x9d, 0x01, 0x2a]))) {
          return { width: data.readUInt16LE(chunk + 6) & 0x3fff, height: data.readUInt16LE(chunk + 8) & 0x3fff };
        }
        if (type === "VP8L" && size >= 5 && data[chunk] === 0x2f) {
          const b1 = data[chunk + 1], b2 = data[chunk + 2], b3 = data[chunk + 3], b4 = data[chunk + 4];
          return { width: 1 + b1 + ((b2 & 0x3f) << 8), height: 1 + (b2 >> 6) + (b3 << 2) + ((b4 & 0x0f) << 10) };
        }
        offset += 8 + size + (size % 2);
      }
    }
  } catch {
    return null;
  }
  return null;
}

export function minifyHtml(input) {
  const protectedBlocks = [];
  let html = String(input).replace(/<(script|style|pre|textarea)\b[\s\S]*?<\/\1>/gi, (block) => {
    const marker = `___ELEVENTY_PROTECTED_${protectedBlocks.length}___`;
    protectedBlocks.push(block);
    return marker;
  });
  html = html
    .replace(/<!--(?!\[if)[\s\S]*?-->/gi, "")
    .replace(/>\s+</g, "><")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
  return html.replace(/___ELEVENTY_PROTECTED_(\d+)___/g, (_, index) => protectedBlocks[Number(index)]);
}

export function configureCompatibility(eleventyConfig) {
  eleventyConfig.addFilter("absolute_url", absoluteUrl);
  eleventyConfig.addFilter("relative_url", relativeUrl);
  eleventyConfig.addFilter("date_to_xmlschema", xmlDate);
  eleventyConfig.addFilter("date_to_rfc822", rfc822Date);
  eleventyConfig.addFilter("date_to_long_string", longDate);
  // Jekyll serializes a missing Liquid value as JSON null. JSON.stringify
  // would otherwise return undefined and leave invalid `"key": ,` output.
  eleventyConfig.addFilter("jsonify", (value) => JSON.stringify(value ?? null));
  eleventyConfig.addFilter("normalize_whitespace", (value) => String(value ?? "").replace(/\s+/g, " ").trim());
  eleventyConfig.addFilter("reading_time", readingTime);
  eleventyConfig.addFilter("image_dimensions", readImageDimensions);
  eleventyConfig.addFilter("related_youtube_short", relatedYoutubeShort);
  eleventyConfig.addFilter("markdownify", (value) => markdown.render(String(value ?? "")));
  eleventyConfig.addFilter("category_slug", categorySlug);
}
