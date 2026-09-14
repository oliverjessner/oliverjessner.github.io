import { MAX_NEWS_ARTICLES, renderNewsUrlset, selectNewsArticles } from "../plugins/news-sitemap.js";

export default class NewsSitemapShards {
  data() {
    return {
      pagination: {
        data: "collections.posts",
        size: MAX_NEWS_ARTICLES,
        alias: "newsSitemapArticles",
        before(items, data) {
          return selectNewsArticles(items, data.site?.time || new Date());
        },
      },
      layout: null,
      sitemap: false,
      permalink(data) {
        if (data.pagination.pages.length <= 1) return false;
        return `/news-sitemap-${data.pagination.pageNumber + 1}.xml`;
      },
    };
  }

  render(data) {
    return renderNewsUrlset(data.newsSitemapArticles, data.site);
  }
}
