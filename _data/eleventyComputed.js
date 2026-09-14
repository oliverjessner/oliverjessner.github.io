import fs from "node:fs";
import path from "node:path";

function canonicalCategories(data) {
  return Object.keys(data.blog?.categories?.categories || {});
}

function normalizeCategories(categories, data) {
  const canonical = canonicalCategories(data);
  return (Array.isArray(categories) ? categories : categories ? [categories] : []).map((category) => {
    const match = canonical.find((name) => name.toLowerCase() === String(category).toLowerCase());
    return match || category;
  });
}

function outputUrl(item) {
  if (typeof item?.data?.permalink === "string") {
    const permalink = item.data.permalink;
    if (permalink.endsWith("/") || /\.[a-z\d]+$/i.test(permalink)) return permalink;
    return `${permalink}.html`;
  }
  if (item?.inputPath?.startsWith("./collections/_posts/")) {
    const stem = path.basename(item.inputPath).replace(/\.md$/, "");
    return `/blog/${stem}/`;
  }
  return item?.url;
}

function publicItem(item, data) {
  if (!item) return item;
  return {
    ...item.data,
    categories: normalizeCategories(item.data?.categories, data),
    content: "",
    excerpt: item.data?.description || item.data?.excerpt || "",
    date: item.date || item.data?.date,
    url: outputUrl(item),
    inputPath: item.inputPath,
  };
}

function staticFiles() {
  const files = [];
  const walk = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name === ".DS_Store") continue;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(absolute);
      else {
        const relative = `/${path.relative(process.cwd(), absolute).split(path.sep).join("/")}`;
        files.push({
          path: relative,
          name: entry.name,
          extname: path.extname(entry.name),
          modified_time: fs.statSync(absolute).mtime,
        });
      }
    }
  };
  walk(path.join(process.cwd(), "assets"));
  return files;
}

const STATIC_FILES = staticFiles();

function pageFrontmatterKeys() {
  const keys = new Set();
  const roots = ["collections", "pages", "blog"];
  const visit = (entryPath) => {
    for (const entry of fs.readdirSync(entryPath, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const absolute = path.join(entryPath, entry.name);
      if (entry.isDirectory()) visit(absolute);
      else if (/\.(?:md|html|xml|liquid)$/.test(entry.name)) {
        const source = fs.readFileSync(absolute, "utf8");
        const match = source.match(/^---\s*\n([\s\S]*?)\n---/);
        if (!match) continue;
        for (const line of match[1].split("\n")) {
          const key = line.match(/^([A-Za-z_][\w-]*):/)?.[1];
          if (key) keys.add(key);
        }
      }
    }
  };
  for (const root of roots) visit(path.join(process.cwd(), root));
  for (const rootFile of ["404.html", "feed.xml", "sitemap.xml"]) {
    const source = fs.readFileSync(path.join(process.cwd(), rootFile), "utf8");
    const match = source.match(/^---\s*\n([\s\S]*?)\n---/);
    if (match) for (const line of match[1].split("\n")) {
      const key = line.match(/^([A-Za-z_][\w-]*):/)?.[1];
      if (key) keys.add(key);
    }
  }
  return [...keys];
}

const pageComputed = {};
const reservedPageKeys = new Set(["date", "inputPath", "fileSlug", "filePathStem", "outputFileExtension", "templateSyntax", "url", "outputPath"]);
for (const key of pageFrontmatterKeys()) {
  if (reservedPageKeys.has(key)) continue;
  pageComputed[key] = key === "categories"
    ? (data) => normalizeCategories(data.categories, data)
    : (data) => data[key];
}

export default {
  page: pageComputed,
  site(data) {
    // Eleventy keeps `published: false` items in collections even when their
    // permalink is false. Jekyll excludes them from site.posts entirely.
    const posts = (data.collections?.posts || [])
      .filter((item) => item.data?.published !== false)
      .map((item) => publicItem(item, data))
      .reverse();
    const pages = (data.collections?.all || [])
      .filter((item) => !item.inputPath?.startsWith("./collections/_posts/"))
      .map((item) => publicItem(item, data));
    const categories = {};
    for (const post of posts) {
      for (const category of post.categories || []) {
        (categories[category] ||= []).push(post);
      }
    }
    return {
      ...data.site,
      environment: process.env.ELEVENTY_ENV || process.env.NODE_ENV || "development",
      time: new Date(),
      data: {
        blog: data.blog,
        data: data.data,
        menu: data.menu,
        publications: data.publications,
        videos: data.videos,
        platform_intelligence: data["platform-intelligence"],
        "platform-intelligence": data["platform-intelligence"],
      },
      posts,
      pages,
      html_pages: pages.filter((page) => typeof page.url === "string" && (page.url.endsWith("/") || page.url.endsWith(".html"))),
      categories,
      static_files: STATIC_FILES,
      collections: [{ label: "posts", output: true, docs: posts }],
    };
  },
};
