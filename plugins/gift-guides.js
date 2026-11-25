// Gift-guide identity is editorial data, independent of the source filename,
// publication date, title, and the year in which the site is built.
export const isGiftGuide = data => data?.contentType === 'gift-guide';
const fields = item => item?.data || item || {};
const normalizePath = value => value.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';

export function giftGuideUrl(data) {
  if (!isGiftGuide(data)) return null;
  const slug = data.slug;
  if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
    || /(?:^|-)(?:19|20)\d{2}(?:-|$)/.test(slug)) {
    throw new Error(`Gift guide requires a timeless lowercase slug: ${JSON.stringify(slug)}`);
  }
  return `/geschenke/${slug}/`;
}

export function legacyPostUrl(inputPath) {
  const file = inputPath?.split('/').pop();
  if (!file?.endsWith('.md')) throw new Error(`Missing Markdown source path for gift guide: ${inputPath}`);
  return `/blog/${file.slice(0, -3)}/`;
}

function redirectPath(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')
    || /[\s?#\\*!:]/.test(value) || value.includes('//')) {
    throw new Error(`redirectFrom must contain local URL paths without queries or fragments: ${value}`);
  }
  let decoded;
  try { decoded = decodeURIComponent(value); } catch { throw new Error(`Invalid redirectFrom encoding: ${value}`); }
  if (decoded.split('/').some(part => part === '.' || part === '..') || /[\s?#\\*!:]/.test(decoded)) {
    throw new Error(`Unsafe redirectFrom path: ${value}`);
  }
  return value;
}

export function giftGuideRedirects(items) {
  const published = (items || []).filter(item => fields(item).published !== false);
  const guides = published.filter(item => isGiftGuide(fields(item)));
  const destinations = new Set(['/', '/blog', '/geschenke']);
  for (const item of published.filter(item => !isGiftGuide(fields(item)))) {
    const data = fields(item);
    const permalink = typeof data.permalink === 'string' ? data.permalink : item.url;
    const url = permalink || legacyPostUrl(item.inputPath || data.page?.inputPath);
    destinations.add(normalizePath(url));
  }
  for (const item of guides) {
    const data = fields(item);
    const url = giftGuideUrl(data);
    const key = normalizePath(url);
    if (destinations.has(key)) throw new Error(`Duplicate gift-guide slug: ${data.slug}`);
    destinations.add(key);
    const robots = String(data.meta_robots || '').toLowerCase().split(/[\s,]+/);
    if (data.sitemap === false || robots.includes('noindex') || robots.includes('none')) {
      throw new Error(`Published gift guide must be indexable and included in the sitemap: ${url}`);
    }
    if (typeof data.permalink === 'string' && normalizePath(data.permalink) !== key) {
      throw new Error(`Gift-guide permalink conflicts with its slug: ${url}`);
    }
    if (data.canonical_url && ![url, `https://oliverjessner.at${url}`].includes(data.canonical_url)) {
      throw new Error(`Gift-guide canonical must be self-referencing: ${url}`);
    }
  }

  const redirects = new Map();
  for (const item of guides) {
    const data = fields(item);
    const to = giftGuideUrl(data);
    if (data.redirectFrom !== undefined && !Array.isArray(data.redirectFrom)) {
      throw new Error(`redirectFrom must be an array: ${to}`);
    }
    const aliases = [legacyPostUrl(item.inputPath || data.page?.inputPath), ...(data.redirectFrom || [])];
    for (const alias of aliases) {
      const source = redirectPath(alias);
      if (destinations.has(normalizePath(source))) {
        throw new Error(`Gift-guide redirect would shadow a canonical page or create a loop: ${source}`);
      }
      // Netlify matches paths with and without a trailing slash. Explicit
      // index.html links also redirect directly, without an intermediate hop.
      const sources = /\.[a-z\d]+$/i.test(source) && !source.endsWith('/index.html')
        ? [source]
        : [`${normalizePath(source)}/`, `${normalizePath(source)}/index.html`];
      for (const from of sources) {
        if (redirects.has(from) && redirects.get(from).to !== to) {
          throw new Error(`Conflicting gift-guide redirect: ${from}`);
        }
        redirects.set(from, { from, to, status: 301, force: true });
      }
    }
  }
  return [...redirects.values()].sort((left, right) => left.from.localeCompare(right.from));
}

export function buildGiftGuideRedirects(items, existingRules = '') {
  const redirects = giftGuideRedirects(items);
  const aliasTargets = new Map(redirects.map(rule => [normalizePath(rule.from), rule.to]));
  const destinations = new Set(redirects.map(rule => normalizePath(rule.to)));
  const localPath = value => {
    if (value?.startsWith('/')) return value;
    try {
      const url = new URL(value);
      return url.origin === 'https://oliverjessner.at' && !url.search && !url.hash ? url.pathname : null;
    } catch { return null; }
  };
  const preserved = existingRules.split('\n').flatMap(line => {
    if (!line.trim() || line.trim().startsWith('#')) return [line];
    const parts = line.trim().split(/\s+/);
    const source = localPath(parts[0]);
    if (source && destinations.has(normalizePath(source))) {
      throw new Error(`Existing redirect shadows a gift-guide destination: ${parts[0]}`);
    }
    if (source && aliasTargets.has(normalizePath(source))) return [];
    const target = localPath(parts[1]);
    const direct = target && aliasTargets.get(normalizePath(target));
    // Existing compatibility rules must not redirect through a migrated URL.
    if (direct) { parts[1] = direct; return [parts.join(' ')]; }
    return [line];
  }).join('\n').trimEnd();
  return [
    '# Generated from gift-guide content. Query strings are forwarded by Netlify.',
    ...redirects.map(rule => `${rule.from} ${rule.to} 301!`),
    '',
    preserved,
    '',
  ].join('\n');
}
