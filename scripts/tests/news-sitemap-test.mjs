import assert from "node:assert/strict";
import {
  MAX_NEWS_ARTICLES,
  NEWS_WINDOW_MS,
  renderNewsIndex,
  renderNewsUrlset,
  selectNewsArticles,
} from "../../plugins/news-sitemap.js";

const now = new Date("2026-09-09T13:00:00Z");
const site = {
  url: "https://example.com",
  baseurl: "/journal",
  title: "Fallback",
  timezone: "Europe/Vienna",
  news_sitemap: { name: "Oliver & Redaktion", language: "de" },
};

function post(slug, age, data = {}) {
  return {
    url: `/blog/${slug}/`,
    date: new Date(now.valueOf() - age),
    data: { news: true, title: "KI &amp; <em>Technik</em>", ...data },
  };
}

const selected = selectNewsArticles([
  post("recent", 60 * 60 * 1000),
  post("boundary", NEWS_WINDOW_MS),
  post("old", NEWS_WINDOW_MS + 1),
  post("future", -1),
  post("not-news", 0, { news: false }),
  post("string-news", 0, { news: "true" }),
  post("unpublished", 0, { published: false }),
  post("excluded", 0, { sitemap: false }),
  post("noindex", 0, { meta_robots: "noindex, follow" }),
  post("empty", 0, { title: " " }),
], now);

assert.deepEqual(selected.map((item) => item.url), ["/blog/recent/", "/blog/boundary/"]);

const xml = renderNewsUrlset(selected, site);
assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
assert.match(xml, /https:\/\/example\.com\/journal\/blog\/recent\//);
assert.match(xml, /<news:name>Oliver &amp; Redaktion<\/news:name>/);
assert.match(xml, /<news:title>KI &amp; Technik<\/news:title>/);
assert.match(xml, /<news:publication_date>2026-09-09T14:00:00\+02:00<\/news:publication_date>/);

const thousand = Array.from({ length: MAX_NEWS_ARTICLES }, (_, index) => post(`item-${index}`, index));
assert.equal(selectNewsArticles(thousand, now).length, 1000);
const index = renderNewsIndex(2, site);
assert.match(index, /<sitemapindex/);
assert.match(index, /https:\/\/example\.com\/journal\/news-sitemap-1\.xml/);
assert.match(index, /https:\/\/example\.com\/journal\/news-sitemap-2\.xml/);

assert.throws(
  () => renderNewsUrlset([], { ...site, news_sitemap: { name: "Oliver", language: "de-DE" } }),
  /ISO 639/,
);

console.log("[news-sitemap-test] PASS: filtering, 48-hour boundary, XML escaping, timezone, and 1000-entry sharding.");
