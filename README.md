[![Netlify Status](https://api.netlify.com/api/v1/badges/bb9bfc1c-06c4-499e-be2a-4f1b319cfc72/deploy-status)](https://app.netlify.com/projects/oliverjessner/deploys)

# oliverjessner.at

Die Website wird mit Eleventy 3 und einer vollständig Node-basierten Build-Pipeline erzeugt. Liquid-Templates, bestehendes HTML/CSS/JavaScript und die öffentlichen URLs der früheren Website bleiben kompatibel; Ruby ist nicht erforderlich.

## Requirements

- Node.js 20 oder neuer
- npm

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Eleventy startet den lokalen Entwicklungsserver und beobachtet Inhalte, Templates und Assets. Nach jedem Watch-Build werden das aus Liquid-Teildateien zusammengesetzte CSS und der Pagefind-Suchindex aktualisiert.

## Production Build

```bash
npm run build
```

Der Build leert `_site/` und führt diese Schritte aus:

1. Eleventy rendert Seiten, Posts, Kategorien, Pagination, Feed und Sitemaps.
2. `tools/build/build-css.js` assembliert das bestehende CSS.
3. Sharp erzeugt responsive Bildvarianten; das HTML erhält Lade- und LCP-Attribute.
4. PurgeCSS entfernt nicht verwendete Produktionsregeln.
5. Pagefind erzeugt den Suchindex.
6. Die QA prüft Root-Dateien, interne Links, lokale Assets, JSON-LD, RSS und Sitemaps.

Zusätzliche Kommandos:

```bash
npm run build:site
npm run build:css
npm run build:images
npm run build:search
npm run purge
npm run qa
npm test
```

Für den Vergleich mit einem archivierten Referenzbuild:

```bash
npm run qa:parity -- /pfad/zum/referenz-build _site
```

Verglichen werden alle HTML-Pfade, Seitentitel, Meta-Descriptions, Canonicals und die URLs der normalen Sitemap.

## Content erstellen

Blogposts liegen in `collections/_posts/`. Verwendet werden weiterhin Markdown, YAML-Frontmatter und Liquid. Standardwerte, URL-Erzeugung und `published: false` werden zentral in `collections/_posts/_posts.11tydata.js` abgebildet.

Einen neuen Artikel anlegen:

```bash
npm run blog:new
```

Nach dem Schreiben kann der bestehende Veröffentlichungsworkflow verwendet werden:

```bash
npm run blog:publish
```

Wichtige Frontmatter-Felder sind `title`, `description`, `date`, `layout`, `categories`, `authors`, `thumbnail`, `image`, `published`, `canonical_url`, `meta_title`, `meta_description`, `meta_robots`, `last_modified_at` und `news`.

`news: true` nimmt einen veröffentlichten Beitrag für 48 Stunden ab seinem ursprünglichen Veröffentlichungsdatum in `/news-sitemap.xml` auf. Die Sitemap enthält maximal 1.000 Artikel pro Datei und wird bei Bedarf in nummerierte Shards aufgeteilt. Konfiguration und Zeitzone stehen in `_data/site.json`.

## Projektstruktur

```text
eleventy.config.js          Eleventy-Konfiguration
collections/_posts/        Blogposts
pages/                      normale Seiten
blog/                       Blog-Index und Pagination
generated/                  generierte Kategorien, Suche und News-Sitemaps
_layouts/                   Liquid-Layouts
_includes/                  Liquid-Komponenten und Teiltemplates
_data/                      globale JSON-/JavaScript-Daten
assets/                     CSS, Browser-JavaScript, Bilder, Fonts und Vendor-Dateien
plugins/                    Eleventy-Filter und Build-Logik
scripts/                    Content-, Daten-, Bild- und Suchwerkzeuge
tools/build/                Produktions-Buildschritte
tools/qa/                   Build- und Paritätsprüfungen
_site/                      generierte Ausgabe
```

Die früheren `site.*`- und `page.*`-Zugriffe werden zentral durch `_data/eleventyComputed.js` bereitgestellt. Dadurch mussten die bestehenden Liquid-Templates nicht großflächig umgeschrieben werden.

## Daten

- `_data/blog/`: Autoren, Kategorien und Kategorie-Navigation
- `_data/data/`: Reichweite, Social- und Partnerdaten
- `_data/platform-intelligence/`: Analyse- und Research-Metriken
- `_data/publications/`: externe Veröffentlichungen
- `_data/videos/`: YouTube-Daten
- `_data/site.json`: globale Website- und Buildkonfiguration

## RSS, Sitemap und Suche

- `/feed.xml`: RSS 2.0 mit den 20 neuesten veröffentlichten Artikeln
- `/sitemap.xml`: vollständige, nicht paginierte Website-Sitemap
- `/news-sitemap.xml`: Google-News-Sitemap mit 48-Stunden-Fenster
- `/search/`: Pagefind-basierte Suche einschließlich externer Publikationsdokumente
- `/robots.txt`: verweist auf beide Sitemaps

## Deployment

Netlify führt laut `netlify.toml` `npm run build` aus und veröffentlicht `_site/`. `ELEVENTY_ENV=production` aktiviert produktionsabhängige Integrationen wie Google Analytics. `_redirects`, `ads.txt` und die Domain-Verifizierungsdatei werden unverändert in das Build-Ergebnis übernommen.

Der technische Migrationsnachweis steht in [11ty-migration.md](11ty-migration.md).
