import { archivePosts, buildNewsroom, chronologicalPosts, presentPost } from '../plugins/blog-newsroom.js';

export default {
  pagination: {
    data: "collections.posts",
    size: 24,
    alias: "eleventyPagePosts",
    before(items) {
      return archivePosts(items);
    },
  },
  permalink(data) {
    return data.pagination.pageNumber === 0
      ? "/blog/index.html"
      : `/blog/page/${data.pagination.pageNumber + 1}/index.html`;
  },
  eleventyComputed: {
    newsroom: buildNewsroom,
    paginator(data) {
      const page = data.pagination.pageNumber + 1;
      const totalPages = data.pagination.pages.length;
      // Schema.org's descending ItemList stays chronological even when a
      // separately presented feature is older than the rest of this page.
      const posts = chronologicalPosts(data.eleventyPagePosts).map(item => presentPost(item, data.blog?.newsroom?.sections));
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
