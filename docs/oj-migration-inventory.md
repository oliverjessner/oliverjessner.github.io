# Website presentation migration inventory

This inventory describes the Eleventy 3 website checkout used for the OJ migration. Older Jekyll names refer to template compatibility, not a second build system. The package integration, pinned origin and update procedure are documented separately in the integration documentation.

The latest user clarification allows exactly eight original product designs: SQLite Hub, BulkPixel, PineFetch, OpenEmperor, NO-BULLSHIT-RSS, SkipTheVoice, Billly and ItWorksBut. Product Lab is completely OJ, including its content/cards/filters; KnotenWerk, RedactionResearch, LinkHub and every other page also use OJ. The two assembled CSS entrypoints are `main.css` and `side-projects-legacy.css`; the former Product Lab legacy stylesheet/loading path is removed. The component mapping below applies to the OJ pages. Legacy UI foundations remain isolated to the eight named exceptions.

Current-scope final verification is pending. Earlier counts and browser results below are historical evidence, not new verification of this clarified architecture.

## Current asset scopes and layout routing

`_layouts/default.html` supplies the OJ shell for ordinary inherited layouts, including Product Lab and KnotenWerk. Complete independent OJ documents, including RedactionResearch, include the same OJ stylesheet and shared `main.css` once themselves. The legacy product shell/independent legacy documents are reserved for the eight explicitly named original designs; KnotenWerk and RedactionResearch are not part of that scope.

Only `main.css` and `side-projects-legacy.css` are assembled as Liquid stylesheets. Shared OJ pages do not load the legacy stylesheet or original-product font definitions. The eight original designs use the separate legacy styles and self-hosted original fonts. Product Lab has neither a scoped legacy wrapper nor a `product-hub-legacy.css` loading path.

## Original-checkout layout inventory and shared structures

The original checkout had 36 layouts. Twenty-six inherit `_layouts/default.html`: about, author-profile, authors, basic, basic-2, blog, category, companion, games/duckdeep, gewinnspiel, home, impressum, interviews-stimmen, journalismus, kontakt, platform-intelligence, podcast-gast, post, publications, search, social-media-marketing, werben, and side_projects/hub, knotenwerk, nobullshitrss, pinefetch.

Ten own a complete HTML document: default, linkhub, search_document, and side_projects/billly, bulkpixel, itworksbut, openemperor, redactionresearch, skipthevoice, sqlite_hub. `search_document` provides hidden external-article indexing pages. These documents need their own common asset include; they do not inherit the main shell.

Shared article cards serve blog, category, related articles, teasers, external journalism and podcast pages. Companion uses the older card-post include, now backed by the same OJ primitives. Video cards share these primitives. Product Lab has internal and external project-card includes. Header, footer, search, categories, author metadata, buttons, pagination, FAQ and copy snippets are shared includes.

## Component mapping

| Website role | Verified OJ component |
| --- | --- |
| Common shell and content width | `oj-site`, dark theme, `oj-site-header`, `oj-site-footer`, `oj-container` |
| Editorial body and code | `oj-prose`, `oj-code-block`; keep `.content` |
| Reusable article/video cards | `oj-card oj-article-card`, `oj-card-media/body/title/meta/actions` |
| Portfolio cards | `oj-card oj-project-card` with shared card primitives |
| Service, proof and supporting surfaces | `oj-panel` |
| Navigation destinations and CTA links | `oj-link`, `oj-button` with primary/secondary/ghost variants |
| Icon actions | `oj-icon-button` |
| Categories and badges | `oj-tag`, `oj-badge`, `oj-badge-accent` |
| Dates and author information | `oj-byline`, `oj-card-meta` |
| Forms | `oj-field`, `oj-label`, `oj-input`, `oj-textarea`, `oj-checkbox` |
| Supporting notices | `oj-callout oj-callout-note` |
| Native FAQ disclosures | `oj-accordion`, `oj-accordion-body` |
| Pagination and section navigation | `oj-pagination`, `oj-nav`, `oj-nav-link` |
| Copy feedback | `oj-inline-message`, semantic `data-oj-kind`, existing live status |
| Research metrics | `oj-metric`, `oj-metric-label`, `oj-metric-value` |

Outside the eight explicit original-product exceptions, Bootstrap layout names in real templates are replaced by `oj-container` and consumer-owned `site-row`, `site-col-*` and `site-*` composition utilities. Page-level HTML in `pages/ticker.md` and `404.html` is migrated as well. The `container` class inside the scroll-snapping post is an editorial fenced-code example and remains unchanged. Product branding, illustrations, screenshots, media composition and application data remain website-owned.

## DOM contracts

- Article `.content` directly wraps rendered Markdown. Image sliders inspect its direct child paragraphs; task lists also scope to this node. Preserve heading IDs, TOC destinations, `data-responsive-image="article"`, eager/high-priority hero images and all Pagefind metadata/body hooks. JSON-LD speakable selectors reference `.post-title h1`, `.post-description p`, `.content h2`.
- Carousel controllers generate `.post-image-slider__*`, `.is-active`, counters and navigation controls. Preserve cyclic button/arrow-key navigation and swipe behavior. Controls use OJ icon buttons without changing their application hooks.
- Checklist structure remains `ul.task-list > li.task-list-item > input.task-list-item-checkbox`. Runtime `blog-todo-*`/`is-complete` classes and localStorage key `blogTodoState:v1:<pathname>` remain. Item identity derives from section heading and item text.
- Copy snippets keep `data-copy-snippet`, `data-copy-button`, `data-copy-button-label`, `data-copy-source`, `data-copy-status`, label/message attributes and idle/success/error states. Their polite live status announces the outcome.
- Mobile navigation keeps `#toggle-menu-main-mobile`, its button, `#menu-main-mobile`, `.menu-main-mobile-center`, `#close-overlay`, `.hamburger`, open/is-active states and scroll lock. Preserve active destinations, Escape, focus containment and return.
- Search keeps `data-pagefind-search*`, `data-search-modal*`, loading/error states, query parameter synchronization, Pagefind external destinations, shortcut and focus handling. Dynamic result cards and excerpt marks also need OJ presentation.
- Publication filtering keeps `data-publication-filter*`, `data-publication-group`, `data-publication-status`, print count, `.publication-list__item`, `hidden` and `aria-pressed` behavior.
- Product controllers retain their data hooks: portfolio filters; PineFetch native screenshot dialog; SQLite carousel/copy/lightbox; Billly FAQ/carousel; RSS feed-view toggle; Knotenwerk dragging/lightbox; ItWorksBut terminal/copy. Linkhub retains weekday filtering via `.card` and `data-showonlyon`. DuckDeep remains a vendor custom element with its own shadow DOM.
- OpenEmperor's MP4 retains autoplay, loop, muted and playsinline, poster and captions, without controls.

## Baseline issues and verification scope

The reference checkout rendered Markdown headings without IDs although the TOC linked to generated IDs. Markdown task lists rendered literal `[ ]`, preventing the existing persistence controller from running. These are pre-existing renderer omissions; migration repairs their support centrally without rewriting posts.

Existing `qa:parity` compares HTML paths, titles, descriptions, canonicals and sitemap URL sets. Text-length differences are review warnings. Site QA checks local references, JSON-LD syntax, required root files, feeds and sitemap structure. These checks alone do not prove exact editorial/JSON-LD/Open Graph parity or browser behavior; representative browser checks are also required.

Representative articles:

- Code, table, images and TOC: `/blog/2026-06-25-sqlite-daten-visualisieren-von-der-sql-abfrage-zum-diagramm/`.
- Alternative technical article: `/blog/2026-06-25-typescript-typen-aus-sqlite-schema-generieren/`.
- Real persistent checklist: `/blog/2026-06-19-marketing-fuer-solodevs-101-wie-du-dein-produkt-sichtbar-machst/`.
- Table and image carousel: `/blog/2026-07-16-openai-codex-micro-preis-funktionen-und-kompatibilitaet/`.
- Large screenshot carousel: `/blog/2026-10-02-anbernic-rg-ds-plus-im-test-der-nintendo-dsi-ist-zurueck/`.

The data-dictionary article's table and checklist occur inside fenced examples; it is not an interaction test for those features.

The PR cleanup article exposed another existing renderer issue: blank lines and indentation in `copy-snippet.html` made Markdown insert paragraphs inside `pre/code`, and browser repair duplicated the copy-source element. The shared include now keeps its header in an uninterrupted raw HTML block and renders the flush-left `pre` as a separate raw block. The actual unchanged 1,604-character captured template, including all blank paragraphs, is copied exactly; named quote entities retain exact legacy `articleBody` serialization. Both live article JSON-LD blocks remain identical to the protected build. `scripts/tests/copy-snippet-test.mjs` covers actual Liquid→Markdown rendering, valid single-source structure, literal escaping/Markdown, indentation and minification. Browser success, clipboard rejection and timed reset pass at 390/768/1440 pixels without outer overflow or JavaScript errors. The malformed legacy `pre` lost ten blank lines; its strict whitespace check must reconstruct that one template from the unchanged source rather than waive general code-block parity.

## Historical secondary-page browser checks

The initial production output was checked in an isolated local Chrome/Playwright context at 390, 768 and 1440 pixels for `/about/`, `/kontakt/`, `/journalismus/uebersicht/`, `/journalismus/publications/`, `/platform-intelligence/`, `/werben/`, `/authors/` and `/404.html`.

All 24 combinations had document scroll width equal to viewport width, no JavaScript errors, no failed local asset requests or images, and no failures in sampled small-text contrast checks. Comfortaa and the required Font Awesome Free/Brands faces loaded locally. The 404 ticker intentionally clips its oversized moving track inside its own container.

Publication filters were exercised individually at every width. Each selection sets exactly one `aria-pressed="true"`, hides every unrelated group both semantically and visually, and updates the polite live status with the actual visible article count. Enter and Space also select/reset a filter. The unfiltered archive shows 62 online articles in five media, plus two print publications. Werben's three old prices retain `line-through`, and its TikTok, Twitter, Threads and Instagram distribution text remains present.

Kontakt contains mailto contact routes and no form fields: field-label/native-validation checks are not applicable, and nothing was submitted or sent. Platform Intelligence contains no copy buttons: clipboard success/failure checks are not applicable on that page.

Visual inspection identified omitted presentation classes in `404.html` and Liquid-generated Platform Intelligence case-grid columns; both were migrated without changing editorial content, frontmatter or JSON-LD. Parent grid gaps were added between contact panels, About career panels and Werben package panels. The production output after the 404, Platform Intelligence, contact and About fixes was retested across all 24 page/width combinations with the same successful results and no remaining legacy classes. After the final CSS build and purge, Werben was checked again at all three widths: its package grid has the intended 16-pixel gap, with no outer overflow, JavaScript/asset errors or sampled contrast failures.

Ignored browser evidence is stored in `.playwright-mcp/oj-secondary-qa.json` and `.playwright-mcp/oj-after-{slug}-{width}.png`, with additional section screenshots. The MCP browser profile was busy, so the same installed Playwright package launched a separate temporary headless Chrome instance for these checks.
