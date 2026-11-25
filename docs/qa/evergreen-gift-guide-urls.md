# Evergreen gift-guide URLs — implementation and validation

Validated locally on 2026-11-25, on `feature/evergreen-gift-guide-urls`.
Source/content baseline: `05d1289f`.

## Architecture

- Keep the four Markdown files in `collections/_posts/` and retain their original
  `date`, editorial text, titles, descriptions, FAQ, social copy, products and
  image references. Only routing frontmatter and nine internal link destinations
  change. All 39 affiliate links are protected by the source baseline and checked
  again in generated HTML.
- `contentType: gift-guide` opts into the new namespace. `slug` supplies the
  stable URL `/geschenke/<slug>/`; it is never derived from a title or the current
  year. Other posts and buying-guide content retain their existing routes.
- `plugins/gift-guides.js` is shared by directory permalinks, public collection
  data, archive/category presentation, Linkhub and prepared publication URLs.
  Invalid/year-bearing slugs, duplicates, conflicting aliases and canonical or
  indexing overrides fail validation.
- Continue using `date` for publication and optional, manually maintained
  `last_modified_at` for editorial updates. Existing JSON-LD `dateModified`,
  sitemap `lastmod` and visible update-date support are retained. Neither date nor
  the editorial year in a title is automatically advanced.
- `meta_title` already supports a separate HTML/OG/Twitter title; `title` remains
  the H1. The new real permalinks flow through canonical, OG, RSS, sitemap,
  Pagefind, archive/category links and structured data.
- `/geschenke/` uses existing OJ breadcrumbs and newsroom story rows. Its list
  and CollectionPage/ItemList schema are derived from published content.
  Gift-guide detail pages receive matching Home → Geschenke → article
  breadcrumbs. No future-budget or interest placeholder pages are created.
- `generated/gift-guide-redirects.11ty.js` merges handwritten `_redirects` with
  generated, forced 301 rules. The current filename-based old blog URL is
  automatic; `redirectFrom` records additional historical aliases. The old
  article HTML is no longer generated. Redirects always target the final
  evergreen URL, including compatibility rules that previously targeted an
  alias.

## Complete migration table

Each entry also covers the path without its trailing slash and its explicit
`index.html` form. Eight old addresses produce sixteen explicit Netlify rules;
Netlify normalizes the trailing-slash variant.

| Old URL | New URL |
| --- | --- |
| `/blog/2026-11-23-weihnachtsgeschenke-fuer-maenner-2026-unter-50euro/` | `/geschenke/maenner-unter-50-euro/` |
| `/blog/2026-11-24-weihnachtsgeschenke-fuer-maenner-2026-unter-50euro/` | `/geschenke/maenner-unter-50-euro/` |
| `/blog/2026-11-23-weihnachtsgeschenke-fuer-maenner-2026-unter-250euro/` | `/geschenke/maenner-unter-250-euro/` |
| `/blog/2026-11-24-weihnachtsgeschenke-fuer-maenner-2026-unter-250euro/` | `/geschenke/maenner-unter-250-euro/` |
| `/blog/2026-11-23-weihnachtsgeschenke-fuer-maenner-2026-unter-500euro/` | `/geschenke/maenner-unter-500-euro/` |
| `/blog/2026-11-24-weihnachtsgeschenke-fuer-maenner-2026-unter-500euro/` | `/geschenke/maenner-unter-500-euro/` |
| `/blog/2026-11-24-adhs-alltagshelfer-unter-30-euro/` | `/geschenke/adhs/` |
| `/blog/2026-11-24-weihnachtsgeschenke-adhs-2026-unter-30-euro/` | `/geschenke/adhs/` |

## Changed files

Routing and URL consumers:

- `plugins/gift-guides.js`
- `collections/_posts/_posts.11tydata.js`
- `_data/eleventyComputed.js`
- `plugins/blog-newsroom.js`
- `generated/gift-guide-redirects.11ty.js`
- `eleventy.config.js`
- `scripts/blogposts/blog.mjs`
- `scripts/linkhub/generate_linkhub-data.js`

Content and existing design-system integration:

- `collections/_posts/2026-11-23-weihnachtsgeschenke-fuer-maenner-2026-unter-250euro.md`
- `collections/_posts/2026-11-23-weihnachtsgeschenke-fuer-maenner-2026-unter-500euro.md`
- `collections/_posts/2026-11-24-weihnachtsgeschenke-fuer-maenner-2026-unter-50euro.md`
- `collections/_posts/2026-11-24-weihnachtsgeschenke-adhs-2026-unter-30-euro.md`
- `pages/geschenke.md`
- `_layouts/gift-guides.html`
- `_layouts/post.html`

Tests, dependencies and documentation:

- `package.json`
- `package-lock.json`
- `scripts/tests/gift-guides-test.mjs`
- `scripts/tests/gift-guide-http-test.mjs`
- `scripts/tests/helpers/gift-guide-fixtures.mjs`
- `scripts/tests/fixtures/gift-guides-baseline.json`
- `scripts/tests/browser/gift-guides.spec.mjs`
- `tools/qa/validate-gift-guides.js`
- `scripts/tests/blog-workflow-test.mjs`
- `scripts/tests/browser/category-newsroom.spec.mjs`
- `docs/buying-guides.md`
- `docs/qa/evergreen-gift-guide-urls.md`

Two existing test-fixture issues were corrected while running the full suite:
the macOS temporary repository path now matches the workflow's realpath, and the
empty-category browser test uses the existing `quarter-review` category instead
of the removed `year-in-review` route. Production behavior for those features
was not changed.

## Validation results

The final production build and integration runs used Node `24.22.3`, matching
the Node 24 major configured in `netlify.toml`. They were invoked through
`npm exec --yes --package=node@24.22.3 -- ...`; no project runtime setting changed.

| Check | Result |
| --- | --- |
| `npm test` and targeted `npm run test:gift-guides` | Passed; existing unit suites plus dynamic routing, drafts, collisions, aliases, indexability and protected source data |
| `ELEVENTY_ENV=production npm run build` | Passed with Node 24, including all build QA and the new gift-guide QA |
| `npm run test:blog-workflow` | 108 passed |
| `npm run test:browser` | 74 passed, including 11 new gift-guide checks at 375/1440px, keyboard/native FAQ, no-JS navigation and scoped Axe checks |
| `npm run test:gift-guides:http` | Passed using official `@netlify/redirects` 4.1.5 over local HTTP: 5 direct canonical 200 responses and 96 direct 301/query/one-hop cases; follow, HEAD and normal-blog regression checks also passed |
| Complete generated-site QA | 897 HTML files, 95,776 local references, 1,430 valid JSON-LD blocks, zero broken references |
| Gift-guide-specific generated-site QA | Hub plus exactly four guides, one self canonical per page, current OG/schema/sitemap/feed/archive URLs, truthful dates, no legacy article output or stale internal guide links; 79,569 internal links inspected |
| Editorial/affiliate baseline | Four sources and all 39 product/affiliate records unchanged except permitted routing data and internal destinations |
| `git diff --check` | Passed |

Redirect tests cover slash/no-slash/index.html, repeated parameters, empty
values, UTF-8, encoded reserved characters and encoded percent signs. They assert
the actual HTTP 301 status and Location produced by Netlify's own redirect
engine, followed by a direct 200 with no intermediate redirect. They do not
request Amazon destinations or the production website.

## Hosting

No edit to `netlify.toml` is necessary: keep `npm run build` and publish `_site`.
The build-generated `_site/_redirects` is the server-side routing artifact.
The new redirects become active on the next Netlify deployment; no deployment
or push was performed as part of this local implementation.

Netlify's documented behavior forwards query parameters for 301 redirects and
matches trailing-slash variants. See the official
[redirect options](https://docs.netlify.com/manage/routing/redirects/redirect-options/)
and [publish-directory redirect-file contract](https://docs.netlify.com/manage/routing/redirects/overview/).
The local integration uses the official engine also used by Netlify's local
development tools; an actual deployed edge response was not claimed or tested.
