export default {
  pagination: {
    data: "collections.posts",
    size: 24,
    alias: "eleventyPagePosts",
    reverse: true,
    before(items) {
      return items.filter((item) => item.data?.published !== false);
    },
  },
  permalink(data) {
    return data.pagination.pageNumber === 0
      ? "/blog/index.html"
      : `/blog/page/${data.pagination.pageNumber + 1}/index.html`;
  },
  eleventyComputed: {
    paginator(data) {
      const page = data.pagination.pageNumber + 1;
      const totalPages = data.pagination.pages.length;
      const posts = (data.eleventyPagePosts || []).map((item) => ({
        ...item.data,
        content: "",
        excerpt: item.data.description || item.data.excerpt || "",
        date: item.date || item.data.date,
        url: typeof item.data.permalink === "string"
          ? item.data.permalink
          : `/blog/${item.inputPath.split("/").pop().replace(/\.md$/, "")}/`,
      }));
      return {
        page,
        per_page: 24,
        total_pages: totalPages,
        total_posts: data.pagination.pages.reduce((total, items) => total + items.length, 0),
        posts,
        previous_page: page > 1 ? page - 1 : null,
        previous_page_path: page === 2 ? "/blog/" : page > 2 ? `/blog/page/${page - 1}/` : null,
        next_page: page < totalPages ? page + 1 : null,
        next_page_path: page < totalPages ? `/blog/page/${page + 1}/` : null,
      };
    },
  },
};
