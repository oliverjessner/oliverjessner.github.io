import assert from 'node:assert/strict';
import fs from 'node:fs';
import { Liquid } from 'liquidjs';
import { Parser } from 'htmlparser2';
import { configureCompatibility } from '../../plugins/eleventy-compat.js';

const liquid = new Liquid({ jsTruthy: true });
configureCompatibility({
  amendLibrary() {},
  addFilter: (name, filter) => liquid.registerFilter(name, filter),
});
const template = fs.readFileSync('_includes/framework/global/seo/meta.html', 'utf8');
const site = {
  title: 'Oliver & Redaktion', description: 'Website über Technik & Gesellschaft',
  social: {}, data: { blog: { categories: { categories: {
    git: { meta_title: 'Git & Werkzeuge', meta_description: 'Git erklärt: "Index" & Arbeitsbaum' },
  } } } },
};

async function render(page, extra = {}) {
  const html = await liquid.parseAndRender(template, { site, page, ...extra });
  const titles = [], meta = {}, canonicals = [];
  let inTitle = false;
  const parser = new Parser({
    onopentag(name, attributes) {
      if (name === 'title') { inTitle = true; titles.push(''); }
      if (name === 'meta') {
        // Quotes must never turn authored text into extra HTML attributes.
        assert.ok(Object.keys(attributes).every(key => ['name', 'property', 'content', 'value'].includes(key)), JSON.stringify(attributes));
        meta[attributes.name || attributes.property] = attributes.content;
      }
      if (name === 'link' && attributes.rel === 'canonical') canonicals.push(attributes.href);
    },
    ontext(value) { if (inTitle) titles[titles.length - 1] += value; },
    onclosetag(name) { if (name === 'title') inTitle = false; },
  });
  parser.end(html);
  return { titles, meta, canonicals, html };
}

const title = 'Browser "Europa" & <Alternativen>';
const description = 'Ein "Vergleich" mit <Grenzen> & nachvollziehbaren Kriterien.';
const escaped = await render({ title, description, url: '/blog/example/' });
assert.deepEqual(escaped.titles, [title]);
for (const name of ['og:title', 'twitter:title']) assert.equal(escaped.meta[name], title);
for (const name of ['description', 'og:description', 'twitter:description']) assert.equal(escaped.meta[name], description);
assert.deepEqual(escaped.canonicals, ['https://oliverjessner.at/blog/example/']);

const override = await render({ title: 'H1', description: 'Intro', meta_title: title, meta_description: description, canonical_url: '/linkhub', url: '/linkhub.html' });
assert.deepEqual(override.titles, [title]);
assert.equal(override.meta.description, description);
assert.deepEqual(override.canonicals, ['https://oliverjessner.at/linkhub']);
const category = await render({ category: 'git', url: '/category/git/' });
assert.deepEqual(category.titles, ['Git & Werkzeuge']);
assert.equal(category.meta.description, 'Git erklärt: "Index" & Arbeitsbaum');
const fallback = await render({ url: '/' });
assert.deepEqual(fallback.titles, [site.title]);
assert.equal(fallback.meta.description, site.description);
assert.equal(fallback.meta.robots, 'max-image-preview:large');
assert.equal((await render({ url: '/search/', meta_robots: 'noindex, follow' })).meta.robots, 'noindex, follow');
assert.equal((await render({ url: '/blog/page/2/' }, { paginator: { page: 2 } })).meta.robots, 'noindex, max-image-preview:large');
console.log('[seo-meta-test] PASS: real Liquid template, literal quotes/ampersands/markup, metadata precedence, canonical override and existing robots rules.');
