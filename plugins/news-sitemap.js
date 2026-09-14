const SITEMAP_NAMESPACE = "http://www.sitemaps.org/schemas/sitemap/0.9";
const NEWS_NAMESPACE = "http://www.google.com/schemas/sitemap-news/0.9";

export const MAX_NEWS_ARTICLES = 1000;
export const NEWS_WINDOW_MS = 48 * 60 * 60 * 1000;

function escapeXml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function decodeHtml(value) {
  const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return String(value ?? "").replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, code) => {
    if (code[0] !== "#") return named[code.toLowerCase()] ?? entity;
    const number = code[1].toLowerCase() === "x" ? Number.parseInt(code.slice(2), 16) : Number.parseInt(code.slice(1), 10);
    return Number.isFinite(number) ? String.fromCodePoint(number) : entity;
  });
}

function newsTitle(value) {
  return decodeHtml(String(value ?? "").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function zonedDate(value, timezone = "Europe/Vienna") {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.valueOf())) return "";
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZoneName: "longOffset",
  }).formatToParts(date).map((part) => [part.type, part.value]));
  const offset = parts.timeZoneName.replace("GMT", "") || "+00:00";
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}${offset}`;
}

function publication(site) {
  const config = site?.news_sitemap || {};
  const name = String(config.name || site?.title || "").trim();
  const language = String(config.language || "de").toLowerCase();
  if (!name || !/^(?:[a-z]{2,3}|zh-cn|zh-tw)$/.test(language)) {
    throw new Error("News sitemap requires a publication name and an ISO 639 language code.");
  }
  return { name, language };
}

function absolutePostUrl(item, site) {
  const base = `${String(site.url || "").replace(/\/$/, "")}${site.baseurl || ""}/`;
  return new URL(String(item.url || "").replace(/^\//, ""), base).href;
}

export function selectNewsArticles(items, nowValue = new Date()) {
  const now = nowValue instanceof Date ? nowValue : new Date(nowValue);
  const cutoff = new Date(now.valueOf() - NEWS_WINDOW_MS);
  return (items || [])
    .filter((item) => item.data?.news === true && item.data?.published !== false && item.data?.sitemap !== false)
    .filter((item) => !/\b(?:noindex|none)\b/i.test(String(item.data?.meta_robots || "")))
    .filter((item) => item.date instanceof Date && item.date >= cutoff && item.date <= now && newsTitle(item.data?.title))
    .sort((left, right) => right.date - left.date || String(right.url).localeCompare(String(left.url)));
}

export function renderNewsUrlset(articles, site) {
  const source = publication(site);
  const urls = articles.map((item) => {
    const date = zonedDate(item.date, site.timezone);
    return `<url><loc>${escapeXml(absolutePostUrl(item, site))}</loc><news:news><news:publication><news:name>${escapeXml(source.name)}</news:name><news:language>${escapeXml(source.language)}</news:language></news:publication><news:publication_date>${date}</news:publication_date><news:title>${escapeXml(newsTitle(item.data.title))}</news:title></news:news></url>`;
  }).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="${SITEMAP_NAMESPACE}" xmlns:news="${NEWS_NAMESPACE}">${urls}</urlset>`;
}

export function renderNewsIndex(count, site) {
  publication(site);
  const locations = Array.from({ length: count }, (_, index) => {
    const base = `${String(site.url || "").replace(/\/$/, "")}${site.baseurl || ""}/`;
    return `<sitemap><loc>${escapeXml(new URL(`news-sitemap-${index + 1}.xml`, base).href)}</loc></sitemap>`;
  }).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="${SITEMAP_NAMESPACE}">${locations}</sitemapindex>`;
}
