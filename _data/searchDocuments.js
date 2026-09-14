import fs from "node:fs";
import path from "node:path";

const SOURCES = [
  ["golem", "Golem.de"],
  ["ign", "IGN"],
  ["it-finanzmagazin", "IT Finanzmagazin"],
  ["gamestar", "GameStar"],
  ["meinbezirk", "MeinBezirk"],
];

function slug(value) {
  return String(value ?? "").toLowerCase().trim().replaceAll("_", "-").replace(/\s+/g, "-").replace(/[^\w-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

export default function () {
  const documents = [];
  for (const [key, source] of SOURCES) {
    const filePath = path.join(process.cwd(), "_data", "publications", `${key}.json`);
    const articles = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, "utf8")) : [];
    for (const [index, articleValue] of articles.entries()) {
      const article = articleValue || {};
      const title = String(article.title || "").trim();
      const baseSlug = slug(article.slug || title || `article-${index + 1}`);
      const id = slug(article.id);
      documents.push({
        key,
        source,
        slug: [id, baseSlug].filter(Boolean).join("-"),
        title: title || source,
        description: String(article.description || article.excerpt || "").trim(),
        target_url: String(article.url || article.link || "").trim(),
        date: String(article.date || "").trim(),
        image: String(article.thumbnail || article.image || "").trim(),
        categories: Array.isArray(article.categories) ? article.categories : article.category ? String(article.category).split(",").map((item) => item.trim()).filter(Boolean) : [],
      });
    }
  }
  return documents;
}
