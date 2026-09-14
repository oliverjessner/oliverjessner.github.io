import { MAX_NEWS_ARTICLES, renderNewsIndex, renderNewsUrlset, selectNewsArticles } from "../plugins/news-sitemap.js";

export default class NewsSitemap {
  data() {
    return { permalink: "/news-sitemap.xml", layout: null, sitemap: false };
  }

  render(data) {
    const articles = selectNewsArticles(data.collections.posts, data.site.time);
    if (articles.length <= MAX_NEWS_ARTICLES) return renderNewsUrlset(articles, data.site);
    return renderNewsIndex(Math.ceil(articles.length / MAX_NEWS_ARTICLES), data.site);
  }
}
