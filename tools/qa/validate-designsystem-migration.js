import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { parseDocument } from "htmlparser2";
import { compareArticleCode } from "./article-code-parity.js";

const referenceRoot = process.argv[2] && path.resolve(process.argv[2]);
const candidateRoot = path.resolve(process.argv[3] || "_site");
if (!referenceRoot || !fs.existsSync(referenceRoot) || !fs.existsSync(candidateRoot)) {
  console.error("Usage: node tools/qa/validate-designsystem-migration.js <reference-build> [candidate-build]");
  process.exit(2);
}
const failures = [];
// The owner explicitly restored only these eight product landing pages to their
// original independent designs. All content/SEO/assets checks still apply;
// only the shared OJ presentation contract differs for this closed list.
const originalProductPages = new Set([
  "billly/index.html", "bulkpixel/index.html", "itworksbut/index.html",
  "no-bullshit-rss/index.html", "openemperor/index.html",
  "pinefetch/index.html", "skipthevoice/index.html",
  "sqlite-hub/index.html",
]);
const normalize = value => String(value ?? "").replace(/\s+/g, " ").trim();
const hasClass = (node, name) => node.attribs?.class?.split(/\s+/).includes(name);
function all(node, predicate) {
  const result = [];
  if (predicate(node)) result.push(node);
  for (const child of node.children || []) result.push(...all(child, predicate));
  return result;
}
function text(node, includeScripts = false) {
  if (node.type === "text") return node.data;
  if (!includeScripts && ["script", "style"].includes(node.name)) return "";
  return (node.children || []).map(child => text(child, includeScripts)).join("");
}
const textBlocks = new Set(["address", "article", "aside", "blockquote", "dd", "details", "div", "dl", "dt", "figcaption", "figure", "h1", "h2", "h3", "h4", "h5", "h6", "li", "main", "ol", "p", "pre", "section", "table", "tbody", "td", "th", "thead", "tr", "ul"]);
function editorialText(node) {
  if (node.type === "text") return node.data;
  if (["script", "style"].includes(node.name)) return "";
  if (node.name === "br") return " ";
  const content = (node.children || []).map(editorialText).join("");
  // HTML minification removes inter-tag whitespace. Separate actual text
  // blocks, while retaining meaningful adjacency inside links and emphasis.
  return textBlocks.has(node.name) ? ` ${content} ` : content;
}
function sorted(value) {
  if (Array.isArray(value)) return value.map(sorted);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map(key => [key, sorted(value[key])]));
  return value;
}
const same = (left, right) => JSON.stringify(sorted(left)) === JSON.stringify(sorted(right));
function files(root, extension = "") {
  const result = [];
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(filename);
      else if (entry.isFile() && entry.name.endsWith(extension)) result.push(path.relative(root, filename));
    }
  }
  walk(root);
  return result.sort();
}
function publicTarget(url, sourceFile) {
  if (!url || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url)) return null;
  let pathname;
  try { pathname = decodeURIComponent(url.split(/[?#]/, 1)[0]); } catch { return null; }
  const resolved = pathname.startsWith("/")
    ? path.resolve(candidateRoot, `.${pathname}`)
    : path.resolve(candidateRoot, path.dirname(sourceFile), pathname);
  if (resolved !== candidateRoot && !resolved.startsWith(`${candidateRoot}${path.sep}`)) return null;
  return resolved;
}
function inventory(tree) {
  const nodes = all(tree, node => Boolean(node.name));
  const metadata = nodes.filter(node => node.name === "meta").map(node => node.attribs).sort((a, b) => JSON.stringify(sorted(a)).localeCompare(JSON.stringify(sorted(b))));
  const links = nodes.filter(node => node.name === "link");
  const schemas = nodes.filter(node => node.name === "script" && node.attribs.type === "application/ld+json").map(node => JSON.parse(text(node, true)));
  const content = nodes.find(node => hasClass(node, "content"));
  return {
    nodes, metadata, schemas, content,
    language: nodes.find(node => node.name === "html")?.attribs.lang,
    icons: links.filter(node => /(?:^|\s)(?:icon|apple-touch-icon)(?:\s|$)/.test(node.attribs.rel || "")).map(node => node.attribs).sort((a, b) => JSON.stringify(sorted(a)).localeCompare(JSON.stringify(sorted(b)))),
    styles: links.filter(node => node.attribs.rel === "stylesheet").map(node => node.attribs.href),
    analytics: nodes.filter(node => node.name === "script" && /(?:googletagmanager\.com|google-analytics\.com|pagead2\.googlesyndication\.com)/.test(node.attribs.src || "")).map(node => node.attribs.src).sort(),
    pagefind: nodes.flatMap(node => Object.entries(node.attribs || {}).filter(([name]) => /^data-pagefind-(?:body|meta|filter)$/.test(name)).map(([name, value]) => [name, value])).sort(),
  };
}
function compareSchemas(left, right, file) {
  if (left.length !== right.length) {
    failures.push(`${file}: JSON-LD block count changed`);
    return;
  }
  for (let index = 0; index < left.length; index++) {
    if (!same(left[index], right[index])) {
      const keys = new Set([...Object.keys(left[index]), ...Object.keys(right[index])]);
      const changed = [...keys].filter(key => !same(left[index][key], right[index][key]));
      failures.push(`${file}: JSON-LD block ${index + 1} changed (${changed.join(", ")})`);
    }
  }
}

const referenceFiles = files(referenceRoot, ".html");
const candidateFiles = files(candidateRoot, ".html");
if (!same(referenceFiles, candidateFiles)) failures.push("Public HTML paths differ from the reference build");
let editorialPages = 0;
let preservedMediaReferences = 0;
let stylesheetDocuments = 0;
let originalProductDocuments = 0;
const checkedStylesheets = new Set();
for (const file of referenceFiles) {
  const candidatePath = path.join(candidateRoot, file);
  if (!fs.existsSync(candidatePath)) continue;
  try {
    const reference = inventory(parseDocument(fs.readFileSync(path.join(referenceRoot, file), "utf8")));
    const candidate = inventory(parseDocument(fs.readFileSync(candidatePath, "utf8")));
    if (!same(reference.metadata, candidate.metadata)) failures.push(`${file}: metadata (including Open Graph, Twitter, robots and ad conditions) changed`);
    if (reference.language !== candidate.language) failures.push(`${file}: document language changed`);
    if (!same(reference.icons, candidate.icons)) failures.push(`${file}: favicon or apple-touch-icon changed`);
    if (!same(reference.analytics, candidate.analytics)) failures.push(`${file}: analytics/advertising script conditions changed`);
    if (!same(reference.pagefind, candidate.pagefind)) failures.push(`${file}: Pagefind indexing metadata/body hooks changed`);

    const stylesheet = candidate.styles.filter(url => url?.split(/[?#]/, 1)[0].endsWith("/assets/vendor/oj-designsystem/styles.css"));
    const originalProduct = originalProductPages.has(file);
    if (originalProduct) {
      originalProductDocuments++;
      if (stylesheet.length !== 0) failures.push(`${file}: original product design must not load the OJ UI stylesheet`);
      for (const expected of ["side-projects-legacy.css", "legacy-product-fonts.css"]) {
        const matches = candidate.styles.filter(url => url?.split(/[?#]/, 1)[0].endsWith(`/assets/css/${expected}`));
        if (matches.length !== 1) failures.push(`${file}: expected one isolated ${expected}, found ${matches.length}`);
      }
      if (candidate.styles.some(url => url?.split(/[?#]/, 1)[0].endsWith("/assets/css/main.css"))) failures.push(`${file}: shared website CSS leaked into the original product design`);
    } else if (stylesheet.length !== 1) failures.push(`${file}: expected one oj-designsystem stylesheet, found ${stylesheet.length}`);
    else {
      stylesheetDocuments++;
      const index = candidate.styles.indexOf(stylesheet[0]);
      if (index !== 0) failures.push(`${file}: website stylesheet loads before oj-designsystem`);
    }
    if (!originalProduct && !candidate.nodes.some(node => hasClass(node, "oj-site"))) failures.push(`${file}: oj-site root missing`);
    if (!originalProduct) {
      const legacyStyles = candidate.styles.filter(url => /\/assets\/css\/(?:side-projects-legacy|product-hub-legacy|legacy-product-fonts)\.css(?:[?#]|$)/.test(url || ""));
      if (legacyStyles.length || candidate.nodes.some(node => hasClass(node, "legacy-product-hub"))) failures.push(`${file}: legacy product styles leaked into an OJ page`);
    }
    const fontResources = candidate.nodes.filter(node => /(?:fonts\.googleapis\.com|fonts\.gstatic\.com|use\.fontawesome\.com|kit\.fontawesome\.com)/i.test(`${node.attribs?.href || ""} ${node.attribs?.src || ""}`));
    if (fontResources.length) failures.push(`${file}: external font/icon request remains`);
    for (const url of candidate.styles) {
      const target = publicTarget(url, file);
      if (!target || checkedStylesheets.has(target)) continue;
      checkedStylesheets.add(target);
      const css = fs.readFileSync(target, "utf8");
      if (/(?:fonts\.googleapis\.com|fonts\.gstatic\.com|use\.fontawesome\.com|kit\.fontawesome\.com)/i.test(css) ||
          /url\(["']?(?:https?:)?\/\/[^)\s"']+\.(?:woff2?|ttf|otf)(?:[?#][^)"']*)?["']?\)/i.test(css)) {
        failures.push(`${path.relative(candidateRoot, target)}: external font/icon CSS request remains`);
      }
    }

    compareSchemas(reference.schemas, candidate.schemas, file);
    if (reference.content) {
      editorialPages++;
      if (!candidate.content || (!originalProduct && !hasClass(candidate.content, "oj-prose"))) failures.push(`${file}: editorial .content/oj-prose wrapper missing`);
      else {
        const normalizedEditorialText = node => normalize(editorialText(node).replace(/\[[ xX]\]\s*/g, " "));
        if (normalizedEditorialText(reference.content) !== normalizedEditorialText(candidate.content)) failures.push(`${file}: editorial article text changed`);
        const originalIds = all(reference.content, node => Boolean(node.attribs?.id)).map(node => node.attribs.id);
        const currentIds = new Set(all(candidate.content, node => Boolean(node.attribs?.id)).map(node => node.attribs.id));
        for (const id of originalIds) if (!currentIds.has(id)) failures.push(`${file}: existing editorial anchor #${id} removed`);
        const originalLinks = all(reference.content, node => node.name === "a" && Boolean(node.attribs.href)).map(node => node.attribs.href);
        const currentLinks = new Set(all(candidate.content, node => node.name === "a" && Boolean(node.attribs.href)).map(node => node.attribs.href));
        for (const url of originalLinks) if (!currentLinks.has(url)) failures.push(`${file}: editorial link ${url} removed`);
        for (const error of compareArticleCode(reference.content, candidate.content, file)) failures.push(`${file}: ${error}`);
        const contentMedia = node => all(node, child => ["img", "video", "audio", "source", "iframe"].includes(child.name) && Boolean(child.attribs.src)).map(child => `${child.name}:${child.attribs.src}`);
        const currentMedia = new Set(contentMedia(candidate.content));
        for (const media of contentMedia(reference.content)) if (!currentMedia.has(media)) failures.push(`${file}: editorial image/embed removed: ${media}`);
      }
    }
    for (const node of reference.nodes.filter(node => ["img", "video", "audio", "source", "a"].includes(node.name))) {
      const url = node.name === "a" ? node.attribs.href : node.attribs.src;
      if (node.name === "a" && !/\.(?:dmg|zip|mov|mp4|pdf|webp|png|jpe?g|gif)(?:[?#]|$)/i.test(url || "")) continue;
      const target = publicTarget(url, file);
      if (!target) continue;
      preservedMediaReferences++;
      if (!fs.existsSync(target)) failures.push(`${file}: original public media/download asset removed: ${url}`);
    }
  } catch (error) {
    failures.push(`${file}: ${error.message}`);
  }
}

for (const file of ["robots.txt", "llms.txt", "ai.txt", "ads.txt", "_redirects", "ac1f6a81-0f56-4177-9c15-38db96491f03.txt", "feed.xml", "sitemap.xml", "news-sitemap.xml"]) {
  const referencePath = path.join(referenceRoot, file);
  const candidatePath = path.join(candidateRoot, file);
  if (!fs.existsSync(referencePath)) continue;
  if (!fs.existsSync(candidatePath)) { failures.push(`Preserved root file missing: ${file}`); continue; }
  const canonical = value => normalize(file === "feed.xml" ? value.replace(/<lastBuildDate>[\s\S]*?<\/lastBuildDate>/, "<lastBuildDate/>") : value);
  if (canonical(fs.readFileSync(referencePath, "utf8")) !== canonical(fs.readFileSync(candidatePath, "utf8"))) failures.push(`${file}: preserved root/feed/sitemap data changed`);
}
const vendorRoot = path.join(candidateRoot, "assets/vendor/oj-designsystem");
try {
  const manifest = JSON.parse(fs.readFileSync(path.join(vendorRoot, "distribution.json"), "utf8"));
  for (const [file, checksum] of Object.entries(manifest.files)) {
    const bytes = fs.readFileSync(path.join(vendorRoot, file));
    if (createHash("sha256").update(bytes).digest("hex") !== checksum) failures.push(`Designsystem distribution modified after sync: ${file}`);
  }
} catch (error) { failures.push(`Complete licensed designsystem distribution missing: ${error.message}`); }

for (const file of originalProductPages) if (!candidateFiles.includes(file)) failures.push(`Required original product landing page missing: ${file}`);
console.log(`[migration-qa] ${referenceFiles.length} public HTML paths; ${stylesheetDocuments} designsystem documents; ${originalProductDocuments} original product designs; ${editorialPages} editorial wrappers; ${preservedMediaReferences} original media/download references.`);
if (failures.length) {
  for (const failure of failures.slice(0, 100)) console.error(`  - ${failure}`);
  console.error(`[migration-qa] FAIL: ${failures.length} invariants.`);
  process.exit(1);
}
console.log("[migration-qa] PASS: metadata, JSON-LD, dates, language, favicons, indexing hooks, ads/analytics, article content/links, root files and unchanged local designsystem assets.");
