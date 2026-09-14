import fs from "node:fs";
import path from "node:path";

const argumentsList = process.argv.slice(2);
const rootArgument = argumentsList.find((argument) => !argument.startsWith("--"));
const requirePostProcessing = !argumentsList.includes("--site-only");
const root = path.resolve(rootArgument || "_site");
if (!fs.existsSync(root)) throw new Error(`Build output not found: ${root}`);

const htmlFiles = [];
const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.name.endsWith(".html")) htmlFiles.push(fullPath);
  }
};
walk(root);

const redirectSources = new Set();
const redirectsPath = path.join(root, "_redirects");
if (fs.existsSync(redirectsPath)) {
  for (const line of fs.readFileSync(redirectsPath, "utf8").split("\n")) {
    let source = line.trim().split(/\s+/, 1)[0];
    if (/^https?:\/\//i.test(source)) {
      try { source = new URL(source).pathname; } catch { source = ""; }
    }
    if (source?.startsWith("/")) redirectSources.add(source);
  }
}

function localTarget(url, sourceFile) {
  if (!url || /^(?:[a-z][a-z\d+.-]*:|\/\/|#|data:)/i.test(url)) return null;
  let pathname;
  try { pathname = decodeURIComponent(url.split(/[?#]/, 1)[0]); } catch { return null; }
  if (!pathname) return null;
  const relative = pathname.startsWith("/")
    ? pathname.replace(/^\/+/, "")
    : path.relative(root, path.resolve(path.dirname(sourceFile), pathname));
  const target = path.resolve(root, relative);
  if (!target.startsWith(`${root}${path.sep}`) && target !== root) return null;
  return target;
}

function existsAsPublicTarget(target) {
  return fs.existsSync(target)
    || fs.existsSync(`${target}.html`)
    || fs.existsSync(path.join(target, "index.html"));
}

function isRedirectSource(url) {
  let pathname;
  try { pathname = decodeURIComponent(url.split(/[?#]/, 1)[0]); } catch { return false; }
  return redirectSources.has(pathname);
}

const broken = [];
let references = 0;
let structuredDataBlocks = 0;
for (const file of htmlFiles) {
  const rawHtml = fs.readFileSync(file, "utf8");
  if (/\b(?:href|src)=["']\/false(?:[?#/"'])/i.test(rawHtml)) {
    broken.push({ file: path.relative(root, file), url: "/false" });
  }
  for (const match of rawHtml.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    structuredDataBlocks += 1;
    try { JSON.parse(match[1]); } catch { broken.push({ file: path.relative(root, file), url: "invalid JSON-LD" }); }
  }
  const html = rawHtml
    .replace(/<pre\b[\s\S]*?<\/pre>/gi, "")
    .replace(/<code\b[\s\S]*?<\/code>/gi, "");
  const urls = [];
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) urls.push(match[1]);
  for (const match of html.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
    urls.push(...match[1].split(",").map((candidate) => candidate.trim().split(/\s+/, 1)[0]));
  }
  for (const url of urls) {
    const target = localTarget(url, file);
    if (!target) continue;
    references += 1;
    if (!existsAsPublicTarget(target) && !isRedirectSource(url)) {
      broken.push({ file: path.relative(root, file), url });
    }
  }
}

for (const required of ["index.html", "404.html", "feed.xml", "sitemap.xml", "news-sitemap.xml", "robots.txt", "ads.txt", "_redirects"]) {
  if (!fs.existsSync(path.join(root, required))) broken.push({ file: "(root)", url: required });
}

if (requirePostProcessing && !fs.existsSync(path.join(root, "pagefind", "pagefind.js"))) {
  broken.push({ file: "(root)", url: "pagefind/pagefind.js" });
}

for (const xmlFile of ["feed.xml", "sitemap.xml", "news-sitemap.xml"]) {
  const xml = fs.readFileSync(path.join(root, xmlFile), "utf8");
  if (!xml.startsWith("<?xml") || !/<(?:rss|urlset|sitemapindex)\b/.test(xml)) broken.push({ file: xmlFile, url: "invalid XML root" });
}

const feed = fs.readFileSync(path.join(root, "feed.xml"), "utf8");
const feedItems = [...feed.matchAll(/<item\b/g)].length;
if (!/<rss\b/.test(feed) || feedItems < 1 || feedItems > 20) broken.push({ file: "feed.xml", url: `unexpected item count: ${feedItems}` });

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemapLocations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
if (!sitemapLocations.length || new Set(sitemapLocations).size !== sitemapLocations.length || sitemapLocations.some((url) => !/^https:\/\//.test(url))) {
  broken.push({ file: "sitemap.xml", url: "missing, duplicate, or non-absolute loc" });
}

const news = fs.readFileSync(path.join(root, "news-sitemap.xml"), "utf8");
const newsEntries = [...news.matchAll(/<news:news\b/g)].length;
if (newsEntries > 1000) broken.push({ file: "news-sitemap.xml", url: `more than 1000 entries: ${newsEntries}` });
if (/<sitemapindex\b/.test(news)) {
  for (const match of news.matchAll(/<loc>[^<]*\/([^/]+)<\/loc>/g)) {
    if (!fs.existsSync(path.join(root, match[1]))) broken.push({ file: "news-sitemap.xml", url: `missing shard: ${match[1]}` });
  }
}

const robots = fs.readFileSync(path.join(root, "robots.txt"), "utf8");
for (const name of ["sitemap.xml", "news-sitemap.xml"]) {
  if (!robots.includes(`https://oliverjessner.at/${name}`)) broken.push({ file: "robots.txt", url: `missing ${name} reference` });
}

console.log(`[site-qa] ${htmlFiles.length} HTML files; ${references} local references; ${structuredDataBlocks} JSON-LD blocks; ${broken.length} broken.`);
if (broken.length) {
  for (const item of broken.slice(0, 100)) console.error(`  - ${item.file}: ${item.url}`);
  process.exit(1);
}
console.log("[site-qa] PASS: required root files, feeds, internal links, and local assets are present.");
