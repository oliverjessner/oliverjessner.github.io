// Publications stay in their source datasets. This module only prepares a
// presentation model; it never rewrites records or performs I/O.
const knownHosts = {
  'meinbezirk.at': 'MeinBezirk',
  'www.meinbezirk.at': 'MeinBezirk',
};
const cleanText = value => typeof value === 'string' ? value.trim() : '';
const referenceKey = reference => `${cleanText(reference?.source)}\u0000${cleanText(reference?.slug)}`;

function articleUrl(value) {
  if (typeof value !== 'string' || !/^https?:\/\//i.test(value) || value !== value.trim()) return null;
  try {
    const parsed = new URL(value);
    if (!['http:', 'https:'].includes(parsed.protocol) || !parsed.hostname || parsed.username || parsed.password) return null;
    // Fragments do not identify a different published article. URL normalizes
    // hostname casing and default ports, while the original destination is kept.
    parsed.hash = '';
    return { key: parsed.href, host: parsed.hostname, value };
  } catch {
    return null;
  }
}

function publicationDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value)) return null;
  const timestamp = new Date(value).valueOf();
  if (!Number.isFinite(timestamp)) return null;
  const day = value.slice(0, 10);
  // Date accepts out-of-range days such as 2026-02-30 by rolling into March.
  const utcDay = new Date(`${day}T00:00:00.000Z`);
  if (!Number.isFinite(utcDay.valueOf()) || utcDay.toISOString().slice(0, 10) !== day) return null;
  return { value, day, timestamp };
}

function categoryLabels(categories) {
  const seen = new Set();
  return (Array.isArray(categories) ? categories : [categories]).flatMap(value => {
    const label = cleanText(value).replace(/\s+/g, ' ');
    const key = label.normalize('NFKC').toLocaleLowerCase('de');
    if (!label || seen.has(key)) return [];
    seen.add(key);
    return [label];
  }).slice(0, 2);
}

function validPrintCount(value) {
  if (typeof value !== 'number' && typeof value !== 'string') return 0;
  if (typeof value === 'string' && !/^\d+$/.test(value)) return 0;
  const count = Number(value);
  return Number.isSafeInteger(count) && count >= 0 ? count : 0;
}

export function buildPublicationsPage(data = {}) {
  const sources = data.publications || {};
  const settings = data.publications_page || {};
  const registry = (Array.isArray(sources.publications) ? sources.publications : []).filter(publisher => cleanText(publisher?.key));
  const publisherSettings = settings.publisher_overrides || {};
  const publisherKeys = [...new Set([
    ...registry.map(publisher => publisher.key),
    ...Object.keys(sources).filter(key => key !== 'publications' && Array.isArray(sources[key])).sort(),
  ])];
  const publisherByKey = new Map(publisherKeys.map(key => {
    const registered = registry.find(publisher => publisher.key === key) || {};
    const override = publisherSettings[key] || {};
    const articles = Array.isArray(sources[key]) ? sources[key] : [];
    const first = articles.find(article => articleUrl(article?.link));
    const host = articleUrl(first?.link)?.host;
    const recordPublisher = articles.find(article => cleanText(article?.publisher))?.publisher;
    return [key, {
      key,
      title: cleanText(override.title) || cleanText(registered.title) || cleanText(recordPublisher) || knownHosts[host] || key,
      slug: cleanText(override.slug) || cleanText(registered.slug) || key,
      logo: cleanText(override.logo) || cleanText(registered.logo),
      count: 0,
    }];
  }));
  const candidates = [];
  const excluded = [];
  for (const key of publisherKeys) {
    const publisher = publisherByKey.get(key);
    for (const record of Array.isArray(sources[key]) ? sources[key] : []) {
      const reference = { source: key, slug: cleanText(record?.slug) };
      if (record?.published === false) {
        excluded.push({ ...reference, reason: 'unpublished' });
        continue;
      }
      const url = articleUrl(record?.link);
      if (!url) {
        excluded.push({ ...reference, reason: 'invalid_url' });
        continue;
      }
      const date = publicationDate(record.date);
      candidates.push({
        urlKey: url.key,
        timestamp: date?.timestamp ?? -Infinity,
        article: {
          ...record,
          url: url.value,
          publisher: publisher.title,
          publisher_key: key,
          publisher_slug: publisher.slug,
          date: date?.value || null,
          date_iso: date?.day || '',
          category_labels: categoryLabels(record.categories),
          image: cleanText(record.image) || cleanText(record.thumbnail),
          thumbnail: cleanText(record.thumbnail) || cleanText(record.image),
        },
      });
    }
  }
  candidates.sort((left, right) => right.timestamp - left.timestamp
    || left.urlKey.localeCompare(right.urlKey)
    || left.article.publisher_key.localeCompare(right.article.publisher_key)
    || cleanText(left.article.slug).localeCompare(cleanText(right.article.slug)));
  const unique = new Map();
  for (const candidate of candidates) {
    if (!unique.has(candidate.urlKey)) unique.set(candidate.urlKey, candidate.article);
  }
  const archive = [...unique.values()];
  const articleByReference = new Map();
  for (const candidate of candidates) {
    const key = referenceKey({ source: candidate.article.publisher_key, slug: candidate.article.slug });
    if (!articleByReference.has(key)) articleByReference.set(key, unique.get(candidate.urlKey));
  }
  for (const article of archive) publisherByKey.get(article.publisher_key).count += 1;
  const publishers = [...publisherByKey.values()].filter(publisher => publisher.count > 0);
  const researchCases = Array.isArray(data.journalism_data_cases) ? data.journalism_data_cases : [];
  const researchMethods = new Map(researchCases.map(reference => [referenceKey(reference), cleanText(reference?.method)]));
  const references = Array.isArray(settings.featured) ? settings.featured : researchCases;
  const featured = [];
  const unresolvedFeatured = [];
  const featuredUrls = new Set();
  for (const reference of references) {
    const key = referenceKey(reference);
    const article = articleByReference.get(key);
    if (!article || !cleanText(reference?.source) || !cleanText(reference?.slug)) {
      unresolvedFeatured.push({ source: reference?.source || '', slug: reference?.slug || '' });
      continue;
    }
    if (featuredUrls.has(article.url)) continue;
    featuredUrls.add(article.url);
    featured.push({ ...article, method: researchMethods.get(key) || '' });
  }
  const printCount = validPrintCount(data.print_publication_count);
  return {
    archive,
    featured,
    publishers,
    counts: { online: archive.length, outlets: publishers.length, print: printCount },
    // Only an informational count is evidenced in current front matter. A count
    // must never turn into invented print articles or online ItemList entries.
    print: { count: printCount, records: [], has_records: false },
    years: [...new Set(archive.map(article => article.date_iso.slice(0, 4)).filter(Boolean))].sort().reverse(),
    excluded,
    unresolved_featured: unresolvedFeatured,
  };
}
