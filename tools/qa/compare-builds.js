import fs from "node:fs";
import path from "node:path";

function files(root, extension) {
  const output = [];
  const walk = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      else if (!extension || entry.name.endsWith(extension)) output.push(path.relative(root, fullPath));
    }
  };
  walk(root);
  return output.sort();
}

function normalize(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function field(html, expression) {
  return normalize(html.match(expression)?.[1]);
}

function metadata(html) {
  return {
    title: field(html, /<title>([\s\S]*?)<\/title>/i),
    description: field(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)/i),
    canonical: field(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']*)/i),
  };
}

function htmlText(html) {
  return normalize(html
    .replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|amp|lt|gt|quot|#39);/g, " "));
}

function usage() {
  console.error("Usage: node tools/qa/compare-builds.js <jekyll-build> [eleventy-build]");
  process.exit(2);
}

const referenceRoot = process.argv[2] ? path.resolve(process.argv[2]) : null;
const candidateRoot = path.resolve(process.argv[3] || "_site");
if (!referenceRoot || !fs.existsSync(referenceRoot) || !fs.existsSync(candidateRoot)) usage();

const referenceFiles = files(referenceRoot, ".html");
const candidateFiles = files(candidateRoot, ".html");
const referenceSet = new Set(referenceFiles);
const candidateSet = new Set(candidateFiles);
const missing = referenceFiles.filter((file) => !candidateSet.has(file));
const extra = candidateFiles.filter((file) => !referenceSet.has(file));
const mismatches = [];
const contentWarnings = [];

function xmlLocations(root, filename) {
  const filePath = path.join(root, filename);
  if (!fs.existsSync(filePath)) return [];
  return [...fs.readFileSync(filePath, "utf8").matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]).sort();
}

for (const file of referenceFiles.filter((entry) => candidateSet.has(entry))) {
  const reference = fs.readFileSync(path.join(referenceRoot, file), "utf8");
  const candidate = fs.readFileSync(path.join(candidateRoot, file), "utf8");
  const left = metadata(reference);
  const right = metadata(candidate);
  for (const key of Object.keys(left)) {
    if (left[key] !== right[key]) mismatches.push({ file, field: key, reference: left[key], candidate: right[key] });
  }
  const leftText = htmlText(reference);
  const rightText = htmlText(candidate);
  const ratio = leftText.length ? rightText.length / leftText.length : 1;
  if (ratio < 0.75 || ratio > 1.25) contentWarnings.push({ file, ratio: ratio.toFixed(2) });
}

console.log(`[parity] HTML paths: ${referenceFiles.length} Jekyll / ${candidateFiles.length} Eleventy`);
console.log(`[parity] Missing: ${missing.length}; extra: ${extra.length}; metadata differences: ${mismatches.length}`);
const referenceSitemap = xmlLocations(referenceRoot, "sitemap.xml");
const candidateSitemap = xmlLocations(candidateRoot, "sitemap.xml");
const candidateSitemapSet = new Set(candidateSitemap);
const referenceSitemapSet = new Set(referenceSitemap);
const missingSitemapUrls = referenceSitemap.filter((url) => !candidateSitemapSet.has(url));
const extraSitemapUrls = candidateSitemap.filter((url) => !referenceSitemapSet.has(url));
console.log(`[parity] Sitemap URLs: ${referenceSitemap.length} Jekyll / ${candidateSitemap.length} Eleventy; ${missingSitemapUrls.length} missing; ${extraSitemapUrls.length} extra`);
if (missing.length) console.error("Missing paths:\n" + missing.map((file) => `  - ${file}`).join("\n"));
if (extra.length) console.error("Extra paths:\n" + extra.map((file) => `  - ${file}`).join("\n"));
if (mismatches.length) {
  console.error("Metadata differences:");
  for (const item of mismatches.slice(0, 50)) console.error(`  - ${item.file} [${item.field}]\n    Jekyll: ${item.reference}\n    11ty:   ${item.candidate}`);
}
if (missingSitemapUrls.length) console.error("Missing sitemap URLs:\n" + missingSitemapUrls.map((url) => `  - ${url}`).join("\n"));
if (extraSitemapUrls.length) console.error("Extra sitemap URLs:\n" + extraSitemapUrls.map((url) => `  - ${url}`).join("\n"));
if (contentWarnings.length) {
  console.warn(`[parity] ${contentWarnings.length} pages have a text-length ratio outside 0.75–1.25 (review aid, non-fatal).`);
  for (const item of contentWarnings.slice(0, 20)) console.warn(`  - ${item.file}: ${item.ratio}`);
}

if (missing.length || extra.length || mismatches.length || missingSitemapUrls.length || extraSitemapUrls.length) process.exit(1);
console.log("[parity] PASS: paths, titles, descriptions, canonicals, and sitemap URLs match.");
