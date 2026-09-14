# Jekyll → Eleventy Migration

## Status

Migration erfolgreich.

Die Website wird vollständig mit Node.js und Eleventy 3 gebaut. Ruby und Jekyll sind weder lokal noch auf Netlify für den Website-Build erforderlich. Die vorhandenen Liquid-Templates, Inhalte, Browser-Assets und öffentlichen URLs wurden weitgehend unverändert übernommen.

## Funktions-Mapping

| Jekyll-Funktion | Frühere Verwendung | 11ty-Ersatz |
| --- | --- | --- |
| `_config.yml` | Website-Konfiguration, Defaults, Collections | `eleventy.config.js`, `_data/site.json`, Directory Data |
| Post-Collection | `collections/_posts`, `/blog/:path/` | Eleventy-Collection und `_posts.11tydata.js` |
| Page-Defaults | Permalinks unter `pages/` | `pages/pages.11tydata.js` |
| `site.*` / `page.*` | Liquid-Kompatibilität | `_data/eleventyComputed.js` |
| Layouts und Includes | Liquid, verschachtelte Includes | Eleventy Liquid mit bestehenden `_layouts/` und `_includes/` |
| Rouge | Syntax-Highlighting | `@11ty/eleventy-plugin-syntaxhighlight` |
| `jekyll-paginate` | 24 Beiträge je Blogseite | Eleventy Pagination in `blog/blog.11tydata.js` |
| Kategorien-Generator | `/category/<slug>/` | `generated/categories.11ty.js` |
| Search-Dokumente | Pagefind-Dokumentseiten | `_data/searchDocuments.js` und `generated/search-documents.11ty.js` |
| HTML-Minifizierung | Jekyll Transform | Eleventy Transform in `plugins/eleventy-compat.js` |
| CSS-Liquid | `include_relative` in `main.css` | `tools/build/build-css.js` |
| Google-News-Sitemap | Jekyll Generator | `plugins/news-sitemap.js` und Templates unter `generated/` |
| `jekyll-reading-time` | Lesedauer | JavaScript-Liquid-Filter `reading_time` |

## Migrierte Funktionen

- Startseite, normale Seiten, Spezialseiten und 404-Seite
- vollständige Blog-Collection mit Jekyll-kompatiblen Slugs und Permalinks
- `published: false` ohne Ausgabe, Pagination oder indirekte Related-Links
- Blog-Pagination mit 24 Artikeln und unveränderten `/blog/page/<n>/`-URLs
- automatisch generierte Kategorien einschließlich kuratierter Cluster
- Autorenübersicht und Autorenprofil
- Navigation, verschachtelte Includes und globale Datenzugriffe
- Related Content, Companion Content und verwandte YouTube Shorts
- RSS 2.0 unter `/feed.xml`
- normale Sitemap unter `/sitemap.xml`
- Google-News-Sitemap unter `/news-sitemap.xml`
- Pagefind-Suchdokumente und Suchindex
- Bilddimensionen, responsive Varianten und Loading-/LCP-Postprocessing
- HTML-Minifizierung, bestehende CSS-Assemblierung und PurgeCSS
- strukturierte Daten, Canonicals, OpenGraph, Twitter Cards und Robots-Metadaten
- Netlify-Redirects, `ads.txt`, Verifizierungsdatei und produktionsabhängige Analytics
- IndexNow liest die Domainkonfiguration aus `_data/site.json`

## Jekyll Plugins

### `categories.rb`

**Funktion:** Automatische Kategorie-Seiten und `ads`-Konfiguration.  
**11ty-Ersatz:** `generated/categories.11ty.js` mit Eleventy Pagination.  
**Status:** Migriert.

### `category_names.rb`

**Funktion:** Vereinheitlichung der Schreibweise von Kategorien.  
**11ty-Ersatz:** zentrale Normalisierung in `_data/eleventyComputed.js`.  
**Status:** Migriert.

### `image_dimensions.rb`

**Funktion:** Ermittlung lokaler Bildabmessungen für SEO und Schema.  
**11ty-Ersatz:** `image_dimensions`-Filter in `plugins/eleventy-compat.js`.  
**Status:** Migriert.

### `minify_html.rb`

**Funktion:** HTML-Minifizierung nach dem Rendern.  
**11ty-Ersatz:** Eleventy Transform `minify-html`.  
**Status:** Migriert.

### `news_sitemap.rb`

**Funktion:** Google-News-Sitemap mit Opt-in, 48-Stunden-Fenster, Ausschlüssen und 1.000-Einträge-Sharding.  
**11ty-Ersatz:** `plugins/news-sitemap.js`, `generated/news-sitemap.11ty.js` und `generated/news-sitemap-shards.11ty.js`.  
**Status:** Migriert und mit Node-Test abgedeckt.

### `related_youtube_short.rb`

**Funktion:** Auswahl eines thematisch passenden YouTube Shorts.  
**11ty-Ersatz:** `related_youtube_short`-Filter in `plugins/eleventy-compat.js`.  
**Status:** Migriert.

### `search_documents.rb`

**Funktion:** Virtuelle Dokumente für externe Publikationen im Pagefind-Index.  
**11ty-Ersatz:** `_data/searchDocuments.js` und `generated/search-documents.11ty.js`.  
**Status:** Migriert.

## URLs

Der Referenzbuild wurde vor dem Entfernen von Jekyll erzeugt und gegen einen isolierten Eleventy-Produktionsbuild verglichen.

- HTML-Dateien vorher: **613**
- HTML-Dateien nachher: **613**
- fehlende HTML-Pfade: **0**
- zusätzliche HTML-Pfade: **0**
- Abweichungen bei Title, Description oder Canonical: **0**
- Sitemap-URLs vorher: **532**
- Sitemap-URLs nachher: **532**
- Sitemap-Abweichungen: **0**

Die Prüfung umfasst unter anderem `/`, `/blog/`, alle Post-URLs, `/blog/page/<n>/`, alle Kategorien, `/authors/`, Autorenprofile, normale Seiten, Spezialseiten und die 404-Seite.

## Build

Produktionskommando:

```bash
npm run build
```

Verifiziert mit Node.js 26 lokal und für Node.js 20+ konfiguriert. Netlify verwendet weiterhin `_site/` als Publish-Verzeichnis und setzt `ELEVENTY_ENV=production`.

Die frühere ungebundene Git-Ignore-Regel `build/` wurde auf `/build/` begrenzt. Dadurch werden die benötigten Dateien unter `tools/build/` versioniert und stehen im Netlify-Checkout zur Verfügung.

Der vollständige geprüfte Build erzeugte 613 HTML-Dateien, verarbeitete 617 Artikelbilder aus 612 eindeutigen Quellen und baute anschließend CSS, PurgeCSS und Pagefind. Pagefind indexierte 586 Seiten und 34.714 Wörter. Der npm-Sicherheitsaudit meldete nach den Patch-Updates **0 Schwachstellen**.

## QA

- **Interne Links und Assets:** 51.679 lokale Referenzen geprüft, 0 Fehler
- **SEO:** 613 Pfade sowie Title, Description und Canonical gegen Jekyll verglichen
- **Structured Data:** 884 JSON-LD-Blöcke erfolgreich geparst
- **RSS:** valides RSS 2.0, 20 veröffentlichte Beiträge, absolute URLs
- **Sitemap:** valides XML, 532 eindeutige absolute URLs, Parität zum Referenzbuild
- **Google News:** Opt-in, 48-Stunden-Grenze, Ausschlüsse, Zeitzone und Sharding getestet
- **Kategorien:** alle bisherigen Kategorie-URLs und Inhalte vorhanden
- **Autoren:** Übersicht und Profil-URLs vorhanden
- **Pagination:** erste Seite `/blog/`, Folgeseiten `/blog/page/<n>/`
- **Bilder:** responsive Varianten und Loading-Strategien ohne Fehler erzeugt
- **Pagefind:** 586 Dokumente indexiert; Suche im Entwicklungs- und Produktionsbuild vorhanden
- **Root-Dateien:** `robots.txt`, `ads.txt`, `_redirects` und Domain-Verifikation vorhanden
- **Development Server:** Homepage, Blog, Kategorie, Autoren, Suche und Feed lokal mit HTTP 200 geprüft

Verfügbare Prüfungen:

```bash
npm test
npm run qa
npm run qa:parity -- /pfad/zum/jekyll-build _site
```

## Entfernte Jekyll-Dateien

- `.ruby-version`
- `Gemfile`
- `Gemfile.lock`
- `_config.yml`
- `_plugins/categories.rb`
- `_plugins/category_names.rb`
- `_plugins/image_dimensions.rb`
- `_plugins/minify_html.rb`
- `_plugins/news_sitemap.rb`
- `_plugins/related_youtube_short.rb`
- `_plugins/search_documents.rb`
- die vier Ruby-basierten Tests unter `scripts/tests/`

Die relevanten Ruby-Testfälle wurden durch die Node-News-Sitemap-Tests, die generische Site-QA und den dauerhaften Build-Paritätscheck ersetzt.

## Noch offene Punkte

Keine bekannten offenen Migrationsprobleme.

Die Website kann später strukturell weiter refactored werden; solche Änderungen wurden bewusst nicht mit der Plattformmigration vermischt.
