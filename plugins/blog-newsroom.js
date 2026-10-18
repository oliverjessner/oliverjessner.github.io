// Archive order is independent of pinned marketing posts. An explicit feature
// occupies one archive slot; removing it from the remaining stream avoids gaps
// and duplicates even when it originally belonged to a later archive page.
const fields = item => item?.data || item || {};
const timestamp = item => {
  const value = new Date(item?.date || fields(item).date).valueOf();
  return Number.isFinite(value) ? value : 0;
};
export function postUrl(item) {
  const permalink = fields(item).permalink;
  if (typeof permalink === 'string') return permalink.replace(/\/index\.html$/, '/');
  if (item?.url) return item.url.replace(/\/index\.html$/, '/');
  const file = item?.inputPath?.split('/').pop()?.replace(/\.md$/, '');
  return file ? `/blog/${file}/` : '';
}
export function chronologicalPosts(items) {
  return [...(items || [])].filter(item => fields(item).published !== false && postUrl(item))
    .sort((left, right) => timestamp(right) - timestamp(left) || postUrl(left).localeCompare(postUrl(right)));
}
export function archivePosts(items) {
  const ordered = chronologicalPosts(items);
  const feature = ordered.find(item => fields(item).featured === true);
  return feature ? [feature, ...ordered.filter(item => item !== feature)] : ordered;
}
export const categorySlug = value => String(value).toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
export const categoriesOf = item => {
  const categories = fields(item).categories;
  return (Array.isArray(categories) ? categories : [categories]).filter(value => typeof value === 'string' && value.trim());
};
export function presentPost(item, sections = []) {
  const data = fields(item);
  const categories = categoriesOf(item);
  const research = data.editorial_type === 'investigation' || categories.some(category => category.toLowerCase() === 'recherche');
  const section = categories.map(category => sections.find(section => section.categories.some(name => name.toLowerCase() === category.toLowerCase()))).find(Boolean);
  const typeLabels = { news: 'Nachricht', analysis: 'Analyse', opinion: 'Meinung', tutorial: 'Anleitung' };
  const date = item?.date || data.date;
  const seenCategories = new Set();
  const categoryLinks = categories.filter(category => {
    const key = category.trim().toLowerCase();
    if (seenCategories.has(key)) return false;
    seenCategories.add(key);
    return true;
  }).slice(0, 3).map(category => ({ name: category.trim(), url: `/category/${categorySlug(category)}/` }));
  return {
    ...data,
    url: postUrl(item),
    date: date && Number.isFinite(new Date(date).valueOf()) ? date : null,
    section_label: research ? 'Recherche' : section?.label || 'Gesellschaft & Digitales',
    type_label: typeLabels[data.editorial_type] || '',
    category_links: categoryLinks,
    description: data.description || data.excerpt || '',
    thumbnail: data.thumbnail || data.image || data.cover || '',
    image: data.image || data.thumbnail || data.cover || '',
  };
}
export function buildNewsroom(data) {
  const settings = data.blog?.newsroom || { sections: [], focus: [] };
  const archive = chronologicalPosts(data.collections?.posts);
  const current = (data.eleventyPagePosts || []).map(item => presentPost(item, settings.sections));
  const featured = data.pagination?.pageNumber === 0 ? current.slice(0, 4) : [];
  const visible = new Set(current.map(item => item.url));
  const investigations = archive.filter(item => !visible.has(postUrl(item)) && (fields(item).editorial_type === 'investigation' || categoriesOf(item).some(category => category.toLowerCase() === 'recherche')))
    .slice(0, 3).map(item => presentPost(item, settings.sections));
  const publications = data.publications || {};
  const external = externalPublications(publications);
  const seenExternal = new Set();
  const uniqueExternal = external.filter(item => {
    if (seenExternal.has(item.url)) return false;
    seenExternal.add(item.url);
    return true;
  }).slice(0, 5).map(item => ({ ...item, date: item.date && Number.isFinite(new Date(item.date).valueOf()) ? item.date : null }));
  const categorySettings = data.blog?.categories?.categories || {};
  const categoryNames = new Map(Object.keys(categorySettings).map(name => [name.toLowerCase(), name]));
  // Category pages exist for configured topics and published post categories.
  // External-only classification labels do not necessarily have a destination.
  for (const item of archive) {
    for (const name of categoriesOf(item)) {
      if (!categoryNames.has(name.trim().toLowerCase())) categoryNames.set(name.trim().toLowerCase(), name.trim());
    }
  }
  const counts = new Map([...categoryNames.values()].map(name => [name, 0]));
  for (const item of [...archive, ...external]) {
    for (const category of new Set(categoriesOf(item).map(name => name.trim().toLowerCase()))) {
      const name = categoryNames.get(category);
      if (!name) continue;
      counts.set(name, (counts.get(name) || 0) + 1);
    }
  }
  for (const [name, category] of Object.entries(categorySettings)) {
    if (category.video_collection) {
      counts.set(name, (data.videos?.[category.video_collection] || []).filter(video => video.published !== false).length);
    }
  }
  const topics = [...counts].map(([name, count]) => ({ name: categorySettings[name]?.video_collection ? categorySettings[name].stylised_name || name : name, count, url: `/category/${categorySlug(name)}/` }));
  topics.push({ name: '31 Tage Ticker', url: '/ticker/', count: null });
  topics.sort((left, right) => left.name.localeCompare(right.name, 'de'));
  return { featured, feed: current.slice(featured.length), investigations, external: uniqueExternal, topics, sections: settings.sections, focus: settings.focus };
}

export function externalPublications(publications = {}) {
  return (publications.publications || []).flatMap(publisher => (publications[publisher.key] || [])
    .filter(item => item.published !== false && /^https?:\/\//.test(item.link || ''))
    .map(item => ({ ...item, url: item.link, publisher: publisher.title, publisher_key: publisher.key })))
    .sort((left, right) => timestamp(right) - timestamp(left) || left.url.localeCompare(right.url));
}
