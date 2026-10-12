# oj-designsystem in oliverjessner.at

## Distribution and provenance

The website uses the **published npm package `oj-designsystem` at exactly version `0.2.0`**, rather than a neighboring checkout or an unversioned copy. `package.json` and `package-lock.json` pin that version and the registry artifact's integrity:

- Registry artifact: `https://registry.npmjs.org/oj-designsystem/-/oj-designsystem-0.2.0.tgz`
- Integrity: `sha512-syUvdr1M5w12ZLil7bAoHshI9RCAGN/oPj89/CQiGiU44RVQ7K3jWIHpdrHNq4XsjTmgoiJ8ujbFPJkjRHt4gg==`
- Published on 12 October 2026 at 08:06 UTC, verified with `npm view oj-designsystem@0.2.0 version dist gitHead time --json`.
- Registry `gitHead`: `ead7006ef42130305c437584d7257bb92c84510b`. The current contracts were inspected in the installed published package, including its distribution, type declarations and component/theme/JavaScript documentation. No neighboring source checkout is required.

The actual package exports were checked, including the ESM entry, CSS bundles, asset paths, local font URLs and licensing files. Public ESM exports are `initOJ`, `initTabs`, `initDropdowns`, `initTooltips`, `initCountUps`, `initVideoPreviews`, `initDialogs`, `openDialog`, `closeDialog`, `confirmDialog` and `toast`. The CSS subpath exports and existing ESM exports are retained from `0.1.0`. The two new initializers are also included in `initOJ`; the website currently keeps its existing controllers and does not invoke that combined initializer.

Version `0.2.0` adds website composition, bullet-list, big-number and video-card components. Its radius tokens change from 6 to 8px (`--oj-radius-md`) and from 10 to 14px (`--oj-radius-lg`), so existing OJ controls/cards follow the release's rounder shapes. All 21 distributed font/icon binaries and all original licensing files are byte-identical to `0.1.0`, and every CSS asset URL resolves locally. The legacy Comfortaa provenance still records its original acquisition through `0.1.0`; those exact bytes continue to be reused. Upstream `QUALITY.md` remains a historical `0.1.0` record and the additions are still under `Unreleased` in `CHANGELOG.md`; neither replaces the current registry or website checks.

`tools/build/sync-designsystem.js` copies the **entire unchanged `dist/`** into `assets/vendor/oj-designsystem/`, preserving the relative font/icon paths, type declarations and original asset licenses. It adds the package's `LICENSE`, `THIRD-PARTY-NOTICES.md` and a generated `distribution.json` with registry provenance and SHA-256 hashes. These files are generated from the locked installed package; do not edit them manually.

The script verifies that the dependency declaration, lockfile and installed package use the same exact version. A wildcard such as `*` deliberately fails this check; the current release is pinned as `0.2.0` in both npm files. The guard has no hardcoded `0.1.0` requirement. Missing styles, ESM files, licenses or CSS-referenced assets fail the build. It writes only files whose bytes changed, removes stale distribution files and preserves timestamps when the contents are unchanged. This prevents the Eleventy watcher from continuously rebuilding its own generated assets.

## Node and installation

The design system requires Node **22.12.0 or newer**. `.nvmrc` and Netlify select **Node 24**, while `package.json` declares the compatible minimum. The website's Storybook is built separately from a pinned source archive; its build dependencies stay in an ignored cache, outside the website's npm dependency graph.

```sh
nvm use
npm ci
npm run build:vendor
```

A fresh clone needs only the website repository and its npm lockfile. The first website build also downloads the pinned Storybook source and installs its locked build dependencies. No local sibling repository or locally packed tarball is required.

## Storybook at `/designsystem/`

The page embeds the original static Storybook, with a separate full-window view at `/designsystem/storybook/`. The iframe isolates the examples from the website's CSS. The page uses native OJ controls and is linked in the footer.

`tools/build/storybook-source.json` pins version `0.2.0`, repository revision `5c5abe088f458ed90a39f8629a590e17486785c8` and the archive's SHA-256 checksum. `tools/build/build-storybook.js` verifies that the source and website use the same package version, runs upstream `npm ci` and `npm run build-storybook`, and caches a successful build in `.cache/oj-storybook/`. Eleventy builds it before rendering and copies only `storybook-static/` into the published output. It works with `npm run build`, `npm run dev` and direct Eleventy calls; `npm run build:storybook` prepares the cache separately. A warm build reuses the cache without network access. Generated source, dependencies and app output are not committed.

Storybook's two app documents are excluded from Pagefind and search-engine indexing. The wrapper page is included in the sitemap. `source.json` inside the static app records its pinned provenance. Updating the design-system dependency also requires reviewing and updating the source pin; deleting `.cache/oj-storybook/` forces a fresh source build.

The existing lockfile had recorded the website's root version as `1.11.0` while `package.json` declared `1.0.0`. Adding the dependency reconciled the lockfile with the existing `package.json`; it does not change any public URL or website content.

## Static loading and watch builds

Each shared website HTML document loads `/assets/vendor/oj-designsystem/styles.css` once using Liquid's `relative_url` filter, followed by the website stylesheet. `styles.css` already contains the local Comfortaa and JetBrains Mono font declarations plus Font Awesome; do not add separate `fonts.css`, `fontawesome.css` or external font/icon requests.

The latest explicit scope permits **exactly eight independent original product designs**: SQLite Hub (`/sqlite-hub/`), BulkPixel (`/bulkpixel/`), PineFetch (`/pinefetch/`), OpenEmperor (`/openemperor/`), NO-BULLSHIT-RSS (`/no-bullshit-rss/`), SkipTheVoice (`/skipthevoice/`), Billly (`/billly/`) and ItWorksBut (`/itworksbut/`). Only those documents load `legacy-product-fonts.css` and `side-projects-legacy.css` instead of the OJ UI and shared website CSS. **Product Lab is entirely OJ**, including its portfolio content, cards and filters. KnotenWerk, RedactionResearch, LinkHub and every other website page also use OJ.

There are **two assembled Liquid CSS entrypoints**: `main.css` and `side-projects-legacy.css`. The former `product-hub-legacy.css` loading path and legacy Product Lab content wrapper are removed from the current architecture. The local font-definition stylesheet is served directly, not assembled as another Liquid entrypoint. Only shared `main.css` is purged. Original product fonts are self-hosted with licenses and provenance, isolated to the eight permitted original designs. See [the current design corrections](../../docs/oj-design-corrections.md).

The website root uses `oj-site` and the documented dark theme. The shared website accent is `--oj-accent: #ff4a4a`, declared after the library stylesheet. Hover, active, border, readable accent text and button foreground colors derive from that token. Shared controls and editorial components use the documented `oj-*` classes and `--oj-*` tokens. Site CSS owns page composition and product-specific illustrations rather than a second generic UI library.

CSS components need no JavaScript initialization. Existing website controllers continue to own navigation, search, copy feedback, checklists, filters and media viewers. If a library behavior is needed, import its named API from the local browser URL `/assets/vendor/oj-designsystem/index.js` with `type="module"`; bare npm imports are not resolvable in this static browser context. Initialize only the required scope and retain the original cleanup function when replacing dynamically mounted components.

### Native website components

The shared website now uses the actual `0.2.0` Hero/Display, Section Intro/Lead, Split/CTA, Steps, Bullet List, Big Numbers and Video Card contracts wherever the existing content fits. Parallel hero, introduction, list-marker, step and metric implementations have been removed. Remaining consumer CSS handles domain layouts, brand/media composition, prices, publication data and controller states.

`/assets/js/oj-website-components.js` imports only the named `initCountUps` and `initVideoPreviews` APIs from the local unchanged distribution. The former `research-metrics.js` controller is removed. Native playback/links remain available for existing media; linked YouTube posters use the native Video Card media slot without invented video sources or additional media requests.

Ordinary Markdown and directly authored HTML text lists receive `oj-bullet-list` centrally. Checklists, navigation lists and literal code examples retain their own semantics and controller contracts. Editorial text, existing links, IDs, metadata and schema are preserved.

The vendor distribution and the closed list of eight original product-design exceptions remain unchanged. Current implementation and executed checks are recorded in [Native OJ website components](../../docs/oj-native-website-components.md). The marketing browser report covers 18 views, 18 interaction groups and four visually inspected example screenshots; earlier migration results below remain historical records.

Asset synchronization runs before Eleventy:

- `npm run build` cleans `_site/`, then `build:site` synchronizes assets before rendering and passthrough copying.
- `npm run dev` synchronizes before starting the server.
- `eleventy.before` also synchronizes before every subsequent build, including watch rebuilds and direct Eleventy invocations.
- The existing development post-processing assembles local CSS and refreshes Pagefind after a watch build.

Asset input exclusion uses `eleventyConfig.ignores.add("assets/**")`, rather than `assets/` in `.eleventyignore`: the latter also blocked the registered CSS/JavaScript watch targets in the reference checkout. The generated vendor directory is explicitly excluded from watch events. Passthrough copying excludes the two Liquid CSS entrypoint sources, so a rebuild cannot temporarily replace the assembled stylesheets with unresolved includes.

The historical development check, before the latest eight-page scope clarification, started `npm run dev -- --port=8788` and verified CSS and JavaScript edits followed by their exact restoration. All four watch builds completed, rebuilt local CSS and refreshed the same 665-page Pagefind index. The served stylesheet, script, local font and search module returned HTTP 200; changed markers appeared and disappeared as expected. No generated-vendor rebuild loop occurred. Both probe files were restored byte for byte, and the task-owned server was stopped afterward.

PurgeCSS handles only `_site/assets/css/main.css`. The unchanged design-system distribution is kept separate from purging, preserving dynamic component states and Font Awesome selectors.

## Updating

1. Read the new release's component contracts, theme and JavaScript migration notes. Check its Node requirement and actual published exports.
2. Install the chosen **exact** release:

   ```sh
   npm install --save-exact oj-designsystem@VERSION
   npm run build:vendor
   ```

3. Review `package.json`, `package-lock.json`, `assets/vendor/oj-designsystem/` and the provenance manifest together. Update this document's version and artifact information.
4. Capture a production reference outside the repository input and `_site/`. Use the same environment for reference and result:

   ```sh
   ELEVENTY_ENV=production npm run build
   npm run qa:parity -- /absolute/path/to/reference _site
   ```

5. Verify `npm run dev` and a watch rebuild, then review representative article, search and product pages on desktop/tablet/mobile. Exercise keyboard navigation, dialogs, search and copy controls after production purging.

No npm publication or design-system source changes are part of this website workflow.

## Editorial renderer and migration invariants

The reference build exposed two existing Markdown limitations: ordinary Markdown headings had no IDs even though the table of contents generated slug links, and Markdown task markers remained plain text rather than reaching the persisted-checklist controller. `configureEditorialMarkdown()` in `plugins/eleventy-compat.js` restores these centrally through Eleventy's `amendLibrary()` API. It retains the existing Markdown-it engine and syntax highlighter, uses the same slug function/options as Liquid, reserves explicit HTML IDs, and suffixes duplicate generated IDs. No article sources are rewritten.

Generated task checkboxes retain the established direct-child DOM contract, are enabled, use `oj-checkbox`, and have visible task text as their accessible name. Their original source marker is retained only in a `data-blog-task-marker` attribute. The `article_seo_html` filter reconstructs that source text solely for the existing articleBody, word-count and reading-time metadata calculations. This preserves the reference JSON-LD exactly while the displayed checklist works as intended; no hidden duplicate text is inserted.

Focused renderer checks run with both `npm test` and production QA. They cover manual/duplicate/German heading anchors, plain lists, tight/loose/nested tasks, links, escaping, code fences, tables, highlighting and the real 58-item marketing checklist, including unchanged text-derived SEO input.

In addition to the existing site and parity checks, run:

```sh
npm run qa:migration -- /absolute/path/to/reference _site
```

This additive check compares all HTML paths, metadata including Open Graph/Twitter/robots/ad conditions, complete JSON-LD, dates, language, favicons, Pagefind indexing hooks, analytics/advertising script conditions, existing editorial text/anchors/links, and original media/download asset availability. Shared website documents require one library stylesheet, the `oj-site` root and correct CSS loading order. The owner's closed list of eight original product documents requires their isolated original styles instead. Product Lab, KnotenWerk and RedactionResearch follow the normal OJ requirements and have no legacy-content exception. Every page still requires local fonts/icons and preserved content/SEO; the complete licensed OJ distribution must remain unchanged. Root text files, redirects, verification data, RSS and both sitemaps are compared; the RSS build timestamp is the only volatile value normalized. Existing QA is retained unchanged.

## Current executed checks — 0.2.0 and the eight-page scope

The latest comparison reference includes the owner's current Product Lab data and was created outside the repository input/output before the scope correction. Its session-specific location is recorded in [product-scope-reference.json](../../docs/oj-migration/evidence/product-scope-reference.json); the earlier original migration reference remains separate. The agent has not committed or pushed these changes. The owner had already committed the preceding migration as `c77868a850f9a02035aecc281734c886c7889e36`.

| Executed command/check | Observed result |
| --- | --- |
| Registry lookup, installed ESM import, type/CSS/asset comparison with `0.1.0` | Published `0.2.0` provenance verified; no existing public exports or OJ CSS classes removed; 21 font/icon binaries and original licenses unchanged; all CSS URLs resolve. |
| Locked vendor synchronization | Complete 33-file vendor directory; seven changed/generated files on upgrade, then zero files updated during the production build. |
| `ELEVENTY_ENV=production npm run build` | Passed including renderer/copy/code fixtures and site QA: 693 HTML files, 65,932 local references, 1,034 JSON-LD blocks, zero broken references; Pagefind indexed 665 pages and 38,499 words. |
| `npm run qa:parity -- /absolute/path/to/current-data-reference _site` | 693 HTML paths and 607 sitemap URLs matched; zero missing/extra paths or metadata differences. |
| `npm run qa:migration -- /absolute/path/to/current-data-reference _site` | Passed: 685 OJ documents, exactly eight original product documents, 518 editorial wrappers and 10,511 original media/download references; complete metadata/JSON-LD/content/root-file invariants preserved. |
| Original product-style isolation | Compiled `side-projects-legacy.css` is byte-identical to the current-data reference, SHA-256 `1078515393a5d03f52d833d3e238b7a228c5cf96bf6b96da64fc7533cce4db15`; original local font faces are unchanged. |
| Owner's running development server | `http://127.0.0.1:8080/product-lab/` returns HTTP 200 with OJ styles followed only by `main.css`, no legacy wrapper, and vendor manifest `0.2.0`. |
| Product Lab, KnotenWerk and RedactionResearch at 390/768/1440px | 9/9 views and 9/9 interaction groups passed, including filters/URL state, gallery/focus, desktop drag, clipboard and native FAQ; no external overflow or local asset/JavaScript errors. |
| Eight original product documents | 8/8 isolated stylesheet checks passed; original CSS, font CSS and all 24 referenced font files are byte-identical to the reference. |
| Shared website sections on `0.2.0` | 9/9 home/blog/publication views and 3/3 supplementary platform checks passed, including footer hover/focus, full-width blog headings, profile filters/keyboard, dynamiq. branding and 44–83.52px research values. |

Actual logs: [production build](../../docs/oj-migration/evidence/product-scope-production-build.log), [parity](../../docs/oj-migration/evidence/product-scope-parity.log), [invariants](../../docs/oj-migration/evidence/product-scope-invariants.log), [original-style isolation](../../docs/oj-migration/evidence/product-scope-isolation.json), [product views](../../docs/oj-migration/evidence/product-scope-qa.json), [product interactions](../../docs/oj-migration/evidence/product-scope-interactions.json), [shared website sections](../../docs/oj-migration/evidence/product-scope-shared-qa.json). [Product documentation](../../docs/oj-product-migration.md) links the actual current screenshots. The earlier watch test remains historical evidence of the same watch mechanism; no new watch test is claimed here.

## Historical executed migration checks — 0.1.0

These results document completed earlier migration/correction stages on `0.1.0`. They are retained as historical evidence rather than current release results. That initial published artifact used integrity `sha512-DtIBRz/ug0GnT3jC39/FMgrSWUFTWsWdTBB2GmxiEpawD/yK/IeXvfv3fX/ElR53SU74x8BZQxGrK+4Z6P7qPQ==`; source documentation and implementation were inspected at `719661a56cbbc1d533d05900b2364468f7e8f25b`. The registry then supplied no `gitHead`. The release was published on 7 October 2026 despite its older `QUALITY.md` publication note.

The reference build was created with `ELEVENTY_ENV=production` and archived outside Eleventy's input/output at `/tmp/oj-migration-reference.3qCmUZ`. That temporary path is session-specific. The result was built with the same production environment on Node 26.10.0/npm 11.19.1. An additional complete production build passed on Node 24.21.0, the declared Netlify/development version.

| Executed command/check | Observed result |
| --- | --- |
| Registry lookup and `npm pack oj-designsystem@0.1.0` outside the website | Published artifact, actual exports, every local CSS font/icon URL and complete original licensing files verified. |
| `npm run build:vendor` plus repeat-sync/stale-file fixture | Complete 33-file distribution; repeated sync wrote zero files and preserved all timestamps; stale fixture file removed. |
| `npm test` | Existing news-sitemap suite and focused editorial-renderer suite passed. |
| Final `npm run qa` | News-sitemap, editorial-renderer, copy-snippet and migration-code-parity suites plus the existing site validator passed. |
| `npx --yes --package node@24 node scripts/tests/editorial-markdown-test.mjs` | Editorial suite also passed on Node 24.21.0. |
| `npx --yes --package=node@24 -c 'ELEVENTY_ENV=production npm run build'` | Complete production pipeline passed on Node 24.21.0. |
| `ELEVENTY_ENV=production npm run build` | Team production build passed existing QA: 693 HTML files, zero broken references. |
| `npm run qa:parity -- /tmp/oj-migration-reference.3qCmUZ _site` | 693 HTML paths and 607 sitemap URLs matched; zero missing/extra paths or title/description/canonical differences. |
| `npm run qa:migration -- /tmp/oj-migration-reference.3qCmUZ _site` | All 693 documents load the designsystem once in the correct order; 518 editorial wrappers and 10,519 original media/download references checked. Exact metadata/JSON-LD/dates/indexing/ad conditions and root/feed data preserved. |
| Additive QA fixtures | Preserved reference fixture passed; changed JSON-LD dates/wordCount, social metadata, duplicate designsystem styles, removed editorial links and external CSS font imports were rejected. |
| Generated article TOC target audit | 4,582 table-of-contents links across 479 articles resolved to existing IDs; zero broken targets. |
| Public API source audit | No invented `oj-*` component classes or unknown referenced `--oj-*` tokens found. Font Awesome classes were checked against the shipped official CSS. |
| `git diff --check` | Passed. |

The editorial comparison accounts for HTML block boundaries rather than naively concatenating minified sibling list items. It additionally compares code-block text including whitespace, existing editorial anchors/links, and image/video/iframe source references. This handles the restored task-checkbox markup without weakening content or SEO checks.

Browser and watch-server checks are recorded separately by the migration owner; this section claims only the checks above.

Fresh installation also passed: the migration owner ran `npm ci` successfully (161 installed packages). npm reported 15 affected packages: 4 moderate and 11 high, with no critical findings.

A read-only audit compared the final lockfile with the original `HEAD:package-lock.json`, using the same current registry advisory data. Both audits reported **the same 15 affected packages**, with identical locked versions, ranges, dependency nodes and advisory IDs. The migration introduced no additional audit findings. The seven underlying advisories affect brace-expansion, braces, sharp, source-map-js and sprintf-js, with npm also reporting their affected dependency chains.

Commands executed for that comparison (the original package and lockfile were written only to an external temporary directory):

```sh
npm audit --json --package-lock-only
npm audit --json --package-lock-only --prefix /external/temporary/original-lockfile
```

Both audit commands returned status 1 because of those existing findings. No `npm audit fix`, dependency upgrade or automatic security remediation was performed; remediation of the existing build-tool graph remains separate from this UI migration.

A further pre-existing renderer defect affected the PR cleanup copy template: the protected reference rendered its escaped multi-paragraph `<pre><code>` as malformed paragraph children, losing ten blank lines from copied text (1,594 characters instead of the unchanged source capture's 1,604). The central include now emits one literal text source and preserves those original blank lines. Both article JSON-LD blocks remain exactly equal to the reference.

Code parity remains exact for all ordinary blocks. `tools/qa/article-code-parity.js` handles only the identified PR article's `pr_cleanup_request_template` capture when the reference has that malformed `data-copy-source` paragraph structure. It reconstructs the explicit paragraph separators and requires exact equality with the unchanged source capture; the candidate must contain one literal text node with exactly that source. There is no general whitespace exemption.

`node scripts/tests/migration-code-parity-test.mjs` passed positive and negative fixtures: the source-exact repair is accepted; removed blank lines, altered text/indentation, malformed repaired markup, a corrupted reference, unrelated articles, ordinary code whitespace changes and missing code blocks are rejected. The complete `qa:migration` check passed again for all 693 documents after this precise source comparison.
