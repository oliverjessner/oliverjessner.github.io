import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Liquid } from "liquidjs";
import { parseDocument, DomUtils } from "htmlparser2";
import { configureCompatibility, relatedPosts } from "../../plugins/eleventy-compat.js";

const root = fileURLToPath(new URL("../../", import.meta.url));
const article = (slug, categories, date = "2026-10-01", extra = {}) => ({ url: `/blog/${slug}/`, title: slug, categories, date, ...extra });
const current = article("current", ["gaming", "gta6", "computer-stuff"]);
const broad = article("new-general-article", ["gaming", "computer-stuff"], "2026-10-18");
const older = article("older-gta6", ["gaming", "gta6"], "2025-01-01");
const newer = article("newer-gta6", ["gaming", "gta6"], "2026-09-01");
const closest = article("closest-gta6", ["gaming", "gta6", "computer-stuff"], "2024-01-01");
const archive = [
  current, broad, older, newer, closest,
  ...Array.from({ length: 20 }, (_, index) => article(`general-${index}`, ["gaming", "computer-stuff"], "2026-10-17")),
  article("unrelated", ["privacy"], "2026-10-18"),
  article("draft", ["gaming", "gta6", "computer-stuff"], "2026-10-18", { published: false }),
];
const urls = (posts) => posts.map((post) => post.url);
const original = structuredClone(archive);

assert.deepEqual(urls(relatedPosts(current, archive)), urls([closest, newer, older]), "Rare topics must beat newer general posts; extra matches must count");
assert.deepEqual(urls(relatedPosts(current, archive, 4)), urls([closest, newer, older, broad]), "Recency breaks equal relevance scores");
assert.deepEqual(archive, original, "Ranking must preserve source records and collection order");
assert.ok(!relatedPosts(current, archive, 100).some((post) => [current.url, "/blog/draft/", "/blog/unrelated/"].includes(post.url)));
assert.equal(relatedPosts(current, archive, 1).length, 1);
assert.deepEqual(relatedPosts(current, archive, 0), []);
assert.deepEqual(relatedPosts({}, archive), []);
assert.deepEqual(relatedPosts(current, null), []);
assert.deepEqual(relatedPosts(current, [null, {}, { categories: ["gta6"] }]), []);

const duplicates = archive.map((post) => ({ ...post, categories: [...post.categories, ...post.categories] }));
assert.deepEqual(urls(relatedPosts({ ...current, categories: [" GTA6 ", "gaming", "gta6", "computer-stuff"] }, duplicates)), urls([closest, newer, older]), "Case, whitespace and duplicate categories must not inflate scores");

const ties = [article("z", ["gta6"], null), article("a", ["gta6"], "invalid"), article("dated", ["gta6"], "2026-01-01")];
assert.deepEqual(urls(relatedPosts(current, ties)), urls([ties[2], ties[1], ties[0]]));
assert.deepEqual(urls(relatedPosts(current, [...ties].reverse())), urls([ties[2], ties[1], ties[0]]), "Missing/invalid dates and URL ties must have a deterministic order");

// Exercise the registered filter through the real Liquid section and card includes.
const liquid = new Liquid({ root: path.join(root, "_includes"), jekyllInclude: true, dynamicPartials: false, jsTruthy: true });
configureCompatibility({ amendLibrary() {}, addFilter: (name, filter) => liquid.registerFilter(name, filter) });
const layout = fs.readFileSync(path.join(root, "_layouts/post.html"), "utf8");
const section = layout.match(/{% if page.categories %}\s*{% assign related_posts = [\s\S]*?(?={% if page.marketing_cluster %})/)?.[0];
assert.ok(section, "The post layout must use the ranked collection in its related section");
const context = (posts) => ({ page: current, site: { posts, data: { blog: { categories: { categories: {} } }, videos: { youtube_shortform: [] } } } });
const html = liquid.parseAndRenderSync(section, context(archive));
const document = parseDocument(html);
const titles = DomUtils.findAll((node) => node.type === "tag" && node.name === "h3" && node.attribs.class === "oj-card-title", document.children);
assert.deepEqual(titles.map((node) => DomUtils.findOne((child) => child.name === "a", node.children).attribs.href), urls([closest, newer, older]));
assert.match(html, /id="related-posts-title"/);
assert.doesNotMatch(liquid.parseAndRenderSync(section, context([current])), /related-posts-title/);

console.log("[related-posts-test] PASS: rare-topic weighting, multiple matches, date/URL ties, exclusions, limits, normalized categories, immutability and actual Liquid cards.");
