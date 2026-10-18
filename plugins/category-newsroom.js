import { categoriesOf, categorySlug, chronologicalPosts, externalPublications, postUrl, presentPost } from './blog-newsroom.js';

export const categoryPath = (name, page = 1) => `/category/${categorySlug(name)}/${page > 1 ? `page/${page}/` : ''}`;
const fields = item => item?.data || item || {};
const matches = (item, category) => categoriesOf(item).some(name => categorySlug(name) === categorySlug(category));
const dated = item => ({ ...item, date: item.date && Number.isFinite(new Date(item.date).valueOf()) ? item.date : null });
const newest = (left, right) => (new Date(right.date || 0) - new Date(left.date || 0)) || left.url.localeCompare(right.url);
const unique = items => {
  const seen = new Set();
  return items.filter(item => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
};
const research = item => fields(item).editorial_type === 'investigation' || categoriesOf(item).some(name => categorySlug(name) === 'recherche');

export function categoryNames(posts, data) {
  const configured = Object.keys(data.blog?.categories?.categories || {});
  const names = new Map(configured.map(name => [categorySlug(name), name]));
  for (const post of chronologicalPosts(posts)) {
    for (const name of categoriesOf(post)) if (!names.has(categorySlug(name))) names.set(categorySlug(name), name.trim());
  }
  return [...names.values()].sort((left, right) => left.localeCompare(right, 'de'));
}

export function categoryContent(category, posts, data) {
  const metadata = data.blog?.categories?.categories?.[category] || {};
  const articles = chronologicalPosts(posts).filter(post => matches(post, category));
  const external = unique(externalPublications(data.publications).filter(post => matches(post, category)).map(dated));
  const source = metadata.video_collection ? data.videos?.[metadata.video_collection] : data.videos?.youtube_longform;
  const videos = unique((source || []).filter(video => video.published !== false && /^https?:\/\//.test(video.link || '') && (metadata.video_collection || matches(video, category)))
    .map(video => dated({ ...video, url: video.link })).sort(newest));
  return { metadata, articles, external, videos };
}

export function buildCategoryArchives(posts, data) {
  return categoryNames(posts, data).flatMap(category => {
    const { metadata, articles, external, videos } = categoryContent(category, posts, data);
    // Category curation is explicit and independent of the global blog feature.
    const curated = [...new Set(metadata.newsroom?.featured_urls || [])]
      .map(url => articles.find(post => postUrl(post) === url)).filter(Boolean).slice(0, 4);
    const ordered = [...curated, ...articles.filter(post => !curated.includes(post))];
    const kind = articles.length ? 'articles' : videos.length ? 'videos' : external.length ? 'external' : 'empty';
    const entries = kind === 'articles' ? ordered.map(postUrl) : (kind === 'videos' ? videos : external).map(item => item.url);
    const totalPages = Math.max(1, Math.ceil(entries.length / 24));
    return Array.from({ length: totalPages }, (_, pageIndex) => ({
      category, kind, page: pageIndex + 1, total: entries.length, totalPages,
      urls: entries.slice(pageIndex * 24, (pageIndex + 1) * 24),
    }));
  });
}

export function buildCategoryNewsroom(data) {
  const archive = data.categoryArchive;
  const { metadata, articles, external, videos } = categoryContent(archive.category, data.collections.posts, data);
  const sections = data.blog?.newsroom?.sections || [];
  const visibleUrls = new Set(archive.urls);
  const lookup = new Map(articles.map(post => [postUrl(post), post]));
  const current = archive.kind === 'articles' ? archive.urls.map(url => presentPost(lookup.get(url), sections)) : [];
  const featured = archive.page === 1 ? current.slice(0, 4) : [];
  const investigations = articles.filter(post => research(post) && !visibleUrls.has(postUrl(post))).slice(0, 3).map(post => presentPost(post, sections));
  const known = new Map(categoryNames(data.collections.posts, data).map(name => [categorySlug(name), name]));
  const cooccurrences = new Map();
  for (const post of articles) for (const name of categoriesOf(post)) cooccurrences.set(name, (cooccurrences.get(name) || 0) + 1);
  const relatedNames = metadata.related_categories || [...cooccurrences].sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], 'de')).map(([name]) => name);
  const related = [...new Set(relatedNames.map(categorySlug))].filter(slug => known.has(slug) && slug !== categorySlug(archive.category)).slice(0, 6)
    .map(slug => ({ name: known.get(slug), url: categoryPath(known.get(slug)) }));
  const cluster = metadata.cluster?.enabled ? metadata.cluster : null;
  const clusterNavigation = (cluster?.navigation || []).filter(item => item.section
    ? articles.some(post => fields(post).cluster?.[archive.category]?.section === item.section)
    : item.href === '#category-cluster');
  const pageOne = archive.page === 1;
  const base = categoryPath(archive.category);
  const supplementaryLink = anchor => pageOne ? anchor : `${base}${anchor}`;
  const navigation = [];
  if (archive.total) navigation.push({ label: archive.kind === 'videos' ? 'Videos' : 'Alle Artikel', href: '#blogposts' });
  if (cluster) navigation.push(...clusterNavigation.map(item => ({ label: item.label, href: supplementaryLink(item.href) })));
  if (external.length && archive.kind !== 'external') navigation.push({ label: 'Externe Artikel', href: supplementaryLink('#external-articles') });
  if (archive.category === 'gaming' && external.some(item => item.publisher_key === 'ign')) navigation.push({ label: 'IGN', href: supplementaryLink('#ign-articles') });
  if (videos.length && archive.kind !== 'videos') navigation.push({ label: 'YouTube Videos', href: supplementaryLink('#videos') });
  if (related.length) navigation.push({ label: 'Weitere Themen', href: '#verwandte-themen' });
  // Optional editorial navigation links may only refer to generated taxonomy pages.
  for (const item of metadata.newsroom?.navigation || []) {
    const name = known.get(categorySlug(item.category));
    if (name && name !== archive.category) navigation.push({ label: item.label || name, href: categoryPath(name) });
  }
  const displayName = metadata.stylised_name || archive.category;
  const title = metadata.meta_title || `${displayName} | Oliver Jessner`;
  const itemLabel = archive.kind === 'videos' ? 'Videos' : 'Artikel';
  const countLabel = `${archive.total} ${itemLabel} · Seite ${archive.page} von ${archive.totalPages}`;
  const activeSection = sections.find(section => section.categories.some(name => categorySlug(name) === categorySlug(archive.category)));
  const hasSidebar = investigations.length || (external.length && archive.kind !== 'external') || related.length;
  const model = {
    category: archive.category, slug: categorySlug(archive.category), base, displayName,
    description: metadata.description || metadata.meta_description || '',
    seoDescription: metadata.meta_description || metadata.description || '',
    title: archive.page > 1 ? `${title.replace(/\s*\|\s*Oliver Jessner$/, '')} – Seite ${archive.page} | Oliver Jessner` : title,
    eyebrow: metadata.newsroom?.eyebrow || `Ressort${activeSection ? ` · ${activeSection.label}` : ''}`,
    kind: archive.kind, itemLabel, countLabel, navigation, related, hasSidebar: Boolean(hasSidebar),
    featured, feed: current.slice(featured.length), current, investigations,
    external: external.slice(0, 5), allExternal: external,
    ign: archive.category === 'gaming' ? external.filter(item => item.publisher_key === 'ign') : [],
    otherExternal: archive.category === 'gaming' ? external.filter(item => item.publisher_key !== 'ign') : external,
    videos: archive.kind === 'videos' ? videos.filter(video => visibleUrls.has(video.url)) : videos,
    primaryExternal: archive.kind === 'external' ? external.filter(item => visibleUrls.has(item.url)) : [],
    cluster, clusterPosts: articles.map(post => presentPost(post, sections)),
    researchMetrics: Boolean(metadata.research_metrics), videoCollection: metadata.video_collection,
    pageOne, empty: archive.kind === 'empty', metadata,
  };
  model.paginator = {
    page: archive.page, total_pages: archive.totalPages, total_posts: archive.total,
    previous_page: archive.page > 1 ? archive.page - 1 : null,
    previous_page_path: archive.page > 1 ? categoryPath(archive.category, archive.page - 1) : null,
    next_page: archive.page < archive.totalPages ? archive.page + 1 : null,
    next_page_path: archive.page < archive.totalPages ? categoryPath(archive.category, archive.page + 1) : null,
  };
  return model;
}

export function categoryStructuredData(model, url, site = {}) {
  const absolute = path => new URL(path, site.url || 'https://oliverjessner.at').href;
  const entries = model.kind === 'articles' ? model.current : model.kind === 'videos' ? model.videos : model.primaryExternal;
  const schema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': `${absolute(url)}#collectionpage`,
    url: absolute(url), name: model.title, description: model.seoDescription, inLanguage: site.lang || 'de',
    about: { '@type': model.metadata.schema_entity_type || 'Thing', name: model.metadata.schema_name || model.displayName },
    image: { '@type': 'ImageObject', url: absolute(model.metadata.schema_image || model.metadata.image || site.social_default_image || '/assets/images/og/default-social-image.webp') },
    isPartOf: { '@type': 'Blog', url: absolute('/blog/'), name: `${site.title || 'Oliver Jessner'} Blog` },
    mainEntity: {
      '@type': 'ItemList', numberOfItems: entries.length,
      itemListElement: entries.map((post, index) => ({
        '@type': 'ListItem', position: index + 1, url: absolute(post.url),
        ...(model.kind === 'articles' ? { item: {
          '@type': 'BlogPosting', '@id': `${absolute(post.url)}#blogposting`, url: absolute(post.url),
          headline: post.title, name: post.title, description: String(post.description || '').replace(/<[^>]+>/g, '').trim(),
          ...(post.date ? { datePublished: new Date(post.date).toISOString() } : {}),
        } } : { name: post.title }),
      })),
    },
  };
  return [schema, {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: absolute('/') },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: absolute('/blog/') },
      { '@type': 'ListItem', position: 3, name: model.displayName, item: absolute(model.base) },
      ...(model.pageOne ? [] : [{ '@type': 'ListItem', position: 4, name: `Seite ${model.paginator.page}`, item: absolute(url) }]),
    ],
  }];
}
