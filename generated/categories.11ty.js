function slugifyCategory(value) {
  return String(value).toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

export default class CategoryPages {
  data() {
    return {
      pagination: {
        data: "collections.posts",
        size: 1,
        alias: "categoryPage",
        before(posts, data) {
          const configured = Object.keys(data.blog?.categories?.categories || {});
          const canonical = new Map(configured.map((name) => [name.toLowerCase(), name]));
          const names = new Map(configured.map((name) => [slugifyCategory(name), name]));
          for (const post of posts.filter((item) => item.data?.published !== false)) {
            const categories = post.data?.categories;
            for (const category of Array.isArray(categories) ? categories : [categories]) {
              if (typeof category !== "string" || !category.trim()) continue;
              const value = category.trim();
              const name = canonical.get(value.toLowerCase()) || value;
              if (!names.has(slugifyCategory(name))) names.set(slugifyCategory(name), name);
            }
          }
          return [...names.values()].sort((a, b) => a.localeCompare(b, "de"));
        },
      },
      layout: "category",
      eleventyComputed: {
        category: (data) => data.categoryPage,
        title: (data) => data.categoryPage,
        ads: (data) => data.blog?.categories?.categories?.[data.categoryPage]?.ads !== false,
        permalink: (data) => `/category/${slugifyCategory(data.categoryPage)}/index.html`,
        page: {
          category: (data) => data.categoryPage,
          title: (data) => data.categoryPage,
          ads: (data) => data.blog?.categories?.categories?.[data.categoryPage]?.ads !== false,
        },
      },
    };
  }

  render() {
    return "";
  }
}
