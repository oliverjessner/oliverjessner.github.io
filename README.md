[![Netlify Status](https://api.netlify.com/api/v1/badges/bb9bfc1c-06c4-499e-be2a-4f1b319cfc72/deploy-status)](https://app.netlify.com/projects/oliverjessner/deploys)

# oliverjessner.at

Die Website wird mit Eleventy 3 und einer vollständig Node-basierten Build-Pipeline erzeugt. Liquid-Templates, bestehendes HTML/CSS/JavaScript und die öffentlichen URLs der früheren Website bleiben kompatibel; Ruby ist nicht erforderlich.

## Requirements

- Node.js 22.12.0 oder neuer; `.nvmrc` und Netlify verwenden Node.js 24
- npm

Das Daten-Update `npm run update:side-projects` verwendet die Fetchary-Library und benoetigt Node.js 26 oder neuer. Die Website-Builds verwenden weiterhin die oben genannte Node-Version.

## Installation

```bash
npm ci
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

1. Der vollständige, exakt gepinnte `oj-designsystem`-Paketinhalt wird nach `assets/vendor/oj-designsystem/` abgeglichen; Eleventy rendert anschließend Seiten, Posts, Kategorien, Pagination, Feed und Sitemaps.
2. `tools/build/build-css.js` assembliert die zwei Liquid-CSS-Entrypoints `main.css` und `side-projects-legacy.css`; lokale Font-Definitionen werden unverändert ausgeliefert.
3. Sharp erzeugt responsive Bildvarianten; das HTML erhält Lade- und LCP-Attribute.
4. PurgeCSS entfernt nicht verwendete Produktionsregeln.
5. Pagefind erzeugt den Suchindex.
6. Die QA prüft Root-Dateien, interne Links, lokale Assets, JSON-LD, RSS und Sitemaps.

Zusätzliche Kommandos:

```bash
npm run build:vendor
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
npm run qa:migration -- /pfad/zum/referenz-build _site
```

Verglichen werden alle HTML-Pfade, Seitentitel, Meta-Descriptions, Canonicals und die URLs der normalen Sitemap.

## Designsystem

Die gemeinsamen UI-Komponenten, Typografie, lokalen Fonts und Icons stammen aus dem veröffentlichten Paket `oj-designsystem`, exakt Version `0.2.0`. Vor jedem Eleventy-Build und Watch-Rebuild wird die vollständige Distribution einschließlich Lizenzen abgeglichen. Unveränderte Assets werden nicht erneut geschrieben. Der Website-Build benötigt dafür keinen neuen Bundler.

Herkunft, öffentliche APIs, Node-Anforderungen und der Update-Ablauf stehen in [tools/docs/oj-designsystem.md](tools/docs/oj-designsystem.md).

Die interaktive 3D-Tastatur im Startseiten-Header wird zentral in `assets/js/mechanicalKeyboard.js` konfiguriert. Aufbau, Wiederverwendung und Bedienung stehen in [tools/docs/mechanical-keyboard.md](tools/docs/mechanical-keyboard.md).

Der [OJ-Migrationsbericht](docs/oj-migration-report.md) enthält Komponentenmapping, entfernte Alt-Grundlagen, Build-/Paritäts-/Browserergebnisse und passende Vorher-/Nachher-Screenshots.

Der [Bericht zu den nativen OJ-Website-Komponenten](docs/oj-native-website-components.md) dokumentiert die direkte Nutzung von Hero, Intro, Split/CTA, Steps, Listen, Kennzahlen und Video Cards sowie die entfernten CSS-Nachbauten und aktuellen Prüfungen.

Die aktuelle Nutzerpräzisierung erlaubt sieben ursprüngliche Produktdesigns: **SQLite Hub, BulkPixel, PineFetch, OpenEmperor, NO-BULLSHIT-RSS, SkipTheVoice und ItWorksBut**. Nur diese Seiten verwenden die isolierte `side-projects-legacy.css` und lokale Originalfonts. **Product Lab und Pitchary verwenden vollständig OJ**, ebenso KnotenWerk, RedactionResearch, LinkHub und alle übrigen Website-Seiten. Der frühere `product-hub-legacy.css`-Ladepfad entfällt.

Die [aktuellen Designkorrekturen](docs/oj-design-corrections.md) dokumentieren diese Aufteilung sowie Footer-, Startseiten-, Kennzahlen- und Publikationssektionen. Die bisherigen Produktionsbuilds und URL-/SEO-/Invariantenprüfungen mit `0.2.0` sind historische Nachweise. Die aktuelle Liste enthält sieben Ausnahmen; Pitchary verwendet das gemeinsame OJ-Layout. Ältere Prüfartefakte bleiben historische Nachweise.

## Content erstellen

Blogposts liegen in `collections/_posts/`. Verwendet werden weiterhin Markdown, YAML-Frontmatter und Liquid. Standardwerte, URL-Erzeugung und `published: false` werden zentral in `collections/_posts/_posts.11tydata.js` abgebildet.

Einen neuen Artikel erzeugen und automatisch veröffentlichen:

```bash
npm run blog:new
```

Der gesamte Ablauf läuft über `scripts/blogposts/blog.mjs` in Node.js: Artikelauswahl mit **NO-BULLSHIT-RSS**, Artikel und Bild mit der angemeldeten **Codex CLI**, beide WebP-Dateien mit **BulkPixel**, Dateiname und Bildmaße, Linkhub, Commit, Push, Prüfung der veröffentlichten URL und IndexNow. Das Bild bleibt zusätzlich unter `~/Downloads/header.png`; ein vorhandener Header wird gesichert. Der bisherige separate Befehl `blog:publish` entfällt.

Eine eigene Quell-URL verwenden und das RSS-Menü vollständig überspringen:

```bash
npm run blog:new -- --custom "https://example.com/artikel"
```

Ohne `--custom` bleibt die interaktive Auswahl von `no-bullshit-rss` erhalten. Die bestehende macOS-App-Datenbank wird explizit übergeben; `DB_PATH` kann eine andere bestehende Datenbank auswählen. Eine fehlgeschlagene Auswahl bricht ab. `bulkpixel` wird in beiden Modi für die Bildkonvertierung verwendet.

Ein fehlgeschlagener Lauf bleibt mit Artikel, Bild und Fortschritt unter `.cache/blog/` gespeichert. Der Fehler zeigt den passenden `--resume`-Befehl. Bereits abgeschlossene Generierungs-, Commit- und Push-Schritte werden dabei übersprungen. Fremde lokale Änderungen werden nicht in den Blog-Commit aufgenommen. Voraussetzungen, Umgebungsvariablen und Fehlerbehandlung stehen in [docs/blog-workflow.md](docs/blog-workflow.md).

Wichtige Frontmatter-Felder sind `title`, `description`, `date`, `layout`, `categories`, `authors`, `thumbnail`, `image`, `published`, `canonical_url`, `meta_title`, `meta_description`, `meta_robots`, `last_modified_at`, `news`, `pinned` und `ads`.

`og_image` und `og_image_alt` überschreiben das Vorschaubild und dessen Alternativtext für Open Graph und Twitter. Ohne diese Angaben werden weiterhin `image` und `image_alt` verwendet. So kann eine Seite ein eigenes Social-Vorschaubild erhalten und ihr sichtbares Hero-Bild behalten.

`featured: true` wählt einen Artikel als Aufmacher auf der ersten Blog-Archivseite aus. Bei mehreren markierten Artikeln gewinnt der neueste; ohne Markierung ist es der neueste veröffentlichte Artikel. Drei weitere aktuelle Artikel stehen daneben. Jeder Artikel belegt genau einen der 24 Plätze pro Archivseite und erscheint insgesamt einmal im paginierten Archiv. Der übrige Nachrichtenfeed bleibt chronologisch. `pinned` bleibt als bestehendes Metadatum erhalten, beeinflusst die Reihenfolge des Nachrichtenarchivs aber nicht mehr.

Das optionale Feld `editorial_type` unterstützt `news`, `analysis`, `investigation`, `opinion` und `tutorial`. Eigene Recherchen werden über `investigation` oder die bestehende Kategorie `recherche` erkannt. Alte Artikel benötigen keine neuen Felder. Ressorts und Fokus-Themen der Blog-Übersicht stehen in `_data/blog/newsroom.json`; vorhandene Kategorie-URLs und Schlagwörter bleiben erhalten. Architektur, Browserprüfungen und die Checkliste für Screenreader stehen in [docs/blog-newsroom.md](docs/blog-newsroom.md).

`ads: false` deaktiviert AdSense inklusive Auto- und Vignettenanzeigen sowie den Abschnitt „Werben auf oliverjessner.at“ im Artikel. Ohne `ads` oder mit `ads: true` bleibt Werbung aktiviert. Neue Artikel erhalten standardmäßig `ads: true`.

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

## KI-Dateien

- `/llms.txt`: kuratierte Übersicht der Website mit Personenprofil, Journalismus, Blog, Softwareprojekten und Kontaktwegen. Aufbau nach dem [llms.txt-Vorschlag](https://llmstxt.org/).
- `/ai.txt`: Quellen-, Zitier- und Nutzungshinweise im Markdown-Format des [ai.txt-Vorschlags](https://www.ai-visibility.org.uk/specifications/ai-txt/). Erteilt keine zusätzliche Trainingslizenz; bestehende Rechte und Projektlizenzen gelten weiter.

Beide Dateien liegen als UTF-8-Text im Repository-Root und werden unverändert nach `_site/` kopiert. Netlify setzt `text/plain; charset=utf-8` und einen `Link`-Header; das HTML verweist zusätzlich auf `llms.txt`. Die Build-QA prüft, dass beide Dateien vorhanden sind.

Die Linkauswahl und Hinweise bei Änderungen an Profil, Angeboten, Projektseiten oder Nutzungsbedingungen aktualisieren; `Last Updated` in `ai.txt` bezeichnet die letzte inhaltliche Änderung. Neue Blogartikel werden über Ticker, RSS und Sitemaps erschlossen. `ai.txt` hat mehrere konkurrierende Formatvorschläge und bietet keine technische Durchsetzung. Beide Dateien ergänzen die vorhandene `robots.txt`.

Die Kategoriearchive nutzen dasselbe Newsroom-Layout wie `/blog/`, einschließlich statischer Pagination mit 24 Plätzen, optionaler eigener Aufmacherauswahl und den bestehenden Video-, IGN-, Git- und Recherchebereichen. Konfiguration und Prüfungen stehen in [docs/category-newsroom.md](docs/category-newsroom.md).

## Deployment

Netlify führt laut `netlify.toml` `npm run build` aus und veröffentlicht `_site/`. `ELEVENTY_ENV=production` aktiviert produktionsabhängige Integrationen wie Google Analytics. `_redirects`, `ads.txt` und die Domain-Verifizierungsdatei werden unverändert in das Build-Ergebnis übernommen.

Die OJ-Migration und die zugehörigen Prüfungen stehen im [OJ-Migrationsbericht](docs/oj-migration-report.md).
