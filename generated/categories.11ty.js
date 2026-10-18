import { buildCategoryArchives, buildCategoryNewsroom, categoryPath, categoryStructuredData } from '../plugins/category-newsroom.js';

export default class CategoryPages {
  data() {
    return {
      pagination: {
        data: 'collections.posts', size: 1, alias: 'categoryArchive',
        before: buildCategoryArchives,
      },
      layout: 'category',
      eleventyComputed: {
        category: data => data.categoryArchive.category,
        newsroom: buildCategoryNewsroom,
        title: data => data.newsroom.displayName,
        meta_title: data => data.newsroom.title,
        meta_description: data => data.newsroom.seoDescription,
        meta_robots: data => data.newsroom.empty ? 'noindex, follow' : 'max-image-preview:large',
        ads: data => data.blog?.categories?.categories?.[data.categoryArchive.category]?.ads !== false,
        permalink: data => `${categoryPath(data.categoryArchive.category, data.categoryArchive.page)}index.html`,
        page: {
          category: data => data.categoryArchive.category,
          title: data => data.newsroom.displayName,
          meta_title: data => data.newsroom.title,
          meta_description: data => data.newsroom.seoDescription,
          meta_robots: data => data.newsroom.empty ? 'noindex, follow' : 'max-image-preview:large',
          pagefind_exclude: data => data.categoryArchive.page > 1 || data.newsroom.empty,
          ads: data => data.blog?.categories?.categories?.[data.categoryArchive.category]?.ads !== false,
        },
        category_schema: data => data.newsroom?.metadata
          ? categoryStructuredData(data.newsroom, categoryPath(data.categoryArchive.category, data.categoryArchive.page), data.site)
          : [],
      },
    };
  }

  render() { return ''; }
}
