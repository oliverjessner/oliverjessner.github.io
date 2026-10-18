import assert from 'node:assert/strict';
import fs from 'node:fs';
import yaml from 'js-yaml';
import { buildPublicationsPage } from '../../plugins/publications-page.js';

const frontmatter = file => yaml.load(fs.readFileSync(file, 'utf8').match(/^---\s*\n([\s\S]*?)\n---/)[1]);
const publications = Object.fromEntries(fs.readdirSync('_data/publications').filter(file => file.endsWith('.json')).map(file => [
  file.replace(/\.json$/, ''), JSON.parse(fs.readFileSync(`_data/publications/${file}`, 'utf8')),
]));
const page = frontmatter('pages/publications.md');
const input = { ...page, publications };
const original = structuredClone(input);
const model = buildPublicationsPage(input);
const sourceRecords = Object.entries(publications).filter(([source]) => source !== 'publications').flatMap(([source, records]) => records.map(record => ({ source, record })));

assert.deepEqual(input, original, 'Presentation must not mutate source JSON or editorial configuration');
assert.equal(model.archive.length, sourceRecords.length, 'Every article in every dataset is present, including sources missing from the old registry');
assert.equal(new Set(model.archive.map(article => article.url)).size, sourceRecords.length, 'The real archive has no repeated destinations');
assert.deepEqual(new Set(model.archive.map(article => article.url)), new Set(sourceRecords.map(({ record }) => record.link)));
for (const { source, record } of sourceRecords) {
  const article = model.archive.find(article => article.url === record.link);
  assert.ok(article, `Missing article: ${source}/${record.slug}`);
  assert.equal(article.publisher_key, source);
  for (const field of ['title', 'slug', 'description', 'date', 'image', 'thumbnail']) assert.equal(article[field], record[field], `${field} remains the original publication metadata`);
  assert.ok(article.category_labels.length <= 2);
  assert.equal(new Set(article.category_labels.map(label => label.toLowerCase())).size, article.category_labels.length);
  for (const field of ['image', 'thumbnail']) {
    assert.ok(article[field].startsWith('/assets/'), `${field} must use the existing local article asset`);
    assert.ok(fs.existsSync(`.${article[field]}`), `${field} exists for ${record.slug}`);
  }
}
assert.deepEqual(model.archive.map(article => article.date), sourceRecords.map(({ record }) => record.date).sort().reverse(), 'The archive sorts globally by the original publication date');
assert.equal(model.counts.online, sourceRecords.length);
assert.equal(model.counts.outlets, new Set(sourceRecords.map(({ source }) => source)).size);
assert.equal(model.publishers.reduce((total, publisher) => total + publisher.count, 0), model.counts.online);
for (const publisher of model.publishers) {
  assert.equal(publisher.count, sourceRecords.filter(({ source }) => source === publisher.key).length);
  if (publisher.logo) assert.ok(fs.existsSync(`.${publisher.logo}`), `Publisher logo exists: ${publisher.logo}`);
}
assert.equal(model.publishers.find(publisher => publisher.key === 'meinbezirk').title, 'MeinBezirk', 'Unregistered MeinBezirk publication retains its actual source identity');
assert.equal(model.print.count, page.print_publication_count);
assert.equal(model.counts.print, page.print_publication_count);
assert.deepEqual(model.print.records, [], 'A front matter print count does not create fabricated print articles');
assert.equal(model.print.has_records, false);
assert.equal(model.excluded.length, 0, 'No current publication is silently dropped');

const synthetic = {
  publications: {
    publications: [{ key: 'a', title: 'Canonical Publisher', logo: '/existing-logo.webp' }, { key: 'empty', title: 'Empty' }],
    a: [
      { title: 'Original', slug: 'new', link: 'https://EXAMPLE.com:443/latest', date: '2026-10-18', categories: [' KI ', 'ki', '', null, 'Privacy', 'Wirtschaft'] },
      { title: 'Old duplicate', slug: 'duplicate', link: 'https://example.com/latest#section', date: '2025-01-01' },
      { title: 'Undated', slug: 'undated', link: 'https://example.com/undated', date: 'not-a-date' },
      { title: 'Impossible date', slug: 'bad-day', link: 'https://example.com/bad-day', date: '2026-02-30' },
      { title: 'Different article', slug: 'same-slug', link: 'https://example.com/older', date: '2026-10-17T10:00:00Z' },
      { title: 'Draft', slug: 'draft', link: 'https://example.com/draft', published: false },
      { title: 'Script URL', slug: 'script', link: 'javascript:alert(1)' },
      { title: 'Broken URL', slug: 'broken', link: 'https://' },
      { title: 'Credentials', slug: 'credentials', link: 'https://user:secret@example.com/private' },
      { title: 'Missing URL', slug: 'no-url' },
    ],
    missingFromRegistry: [{ title: 'Real additional source', slug: 'same-slug', publisher: 'Actual Publisher', link: 'https://actual.example/story', date: '2026-10-19' }],
    empty: [],
  },
  print_publication_count: 2,
};
const syntheticOriginal = structuredClone(synthetic);
const result = buildPublicationsPage(synthetic);
assert.deepEqual(synthetic, syntheticOriginal);
assert.equal(result.archive.length, 5, 'Invalid destinations and drafts are excluded; URL variants are deduplicated');
assert.equal(result.archive[0].title, 'Real additional source');
assert.equal(result.archive[1].title, 'Original');
assert.equal(result.archive[1].url, 'https://EXAMPLE.com:443/latest', 'Dedupe preserves the original article URL verbatim');
assert.equal(result.archive[1].publisher, 'Canonical Publisher');
assert.deepEqual(result.archive[1].category_labels, ['KI', 'Privacy']);
assert.deepEqual(result.archive.slice(-2).map(article => article.date), [null, null], 'Malformed dates remain undated instead of rolling into another date');
assert.ok(result.archive.slice(-2).every(article => article.date_iso === ''));
assert.equal(result.publishers.find(publisher => publisher.key === 'missingFromRegistry').title, 'Actual Publisher');
assert.equal(result.publishers.length, 2, 'Empty outlets are not counted as publishing outlets');
assert.deepEqual(result.years, ['2026']);
assert.equal(result.excluded.length, 5);
assert.deepEqual(result.print.records, []);
for (const value of [-1, 1.5, 'two', '', null, Infinity, '2 articles', undefined]) assert.equal(buildPublicationsPage({ print_publication_count: value }).counts.print, 0);
assert.equal(buildPublicationsPage({ print_publication_count: '2' }).counts.print, 2);
assert.deepEqual(buildPublicationsPage().archive, []);
assert.deepEqual(buildPublicationsPage().counts, { online: 0, outlets: 0, print: 0 });
assert.deepEqual(Object.keys(model).sort(), ['archive', 'publishers', 'counts', 'print', 'years', 'excluded'].sort(), 'The model contains only the archive presentation and evidence summary');
console.log('[publications-page-test] PASS: complete real datasets, exact metadata/assets, global chronology, publisher counts, deduplicated destinations/categories, malformed data, immutability and evidence-only print summary.');
