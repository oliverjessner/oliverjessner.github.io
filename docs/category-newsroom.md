# Ressortseiten im Newsroom-Layout

Die Kategoriearchive verwenden dieselbe redaktionelle Gestaltung wie `/blog/`: dunkles OJ-Theme, Comfortaa, maximal `100rem`, einen Aufmacher mit bis zu drei Nebenmeldungen, kompakte Nachrichtenzeilen und eine 300 Pixel breite Sidebar. Auf schmalen Ansichten folgt die Sidebar dem Hauptinhalt.

## Aufbau

- `generated/categories.11ty.js` erzeugt mit Eleventys statischer Pagination sämtliche Kategorie-/Seiten-Kombinationen. Jeder Datensatz enthält höchstens 24 Archivplätze und ergibt eine echte HTML-Datei. Die bestehenden ersten Kategorie-URLs bleiben erhalten; Folgeseiten liegen unter `/category/<slug>/page/2/` usw.
- `plugins/category-newsroom.js` filtert veröffentlichte Beiträge anhand ihrer bestehenden Taxonomie, wählt Aufmacher aus und bereitet Navigation, externe Veröffentlichungen, Videos, Sidebar und strukturierte Daten auf. URL-/Artikelaufbereitung und Herausgeberdaten kommen aus dem gemeinsamen `plugins/blog-newsroom.js`.
- `_layouts/category.html` und `_includes/category/` setzen die Seite zusammen. Aufmacher, Nachrichtenzeilen, Metadaten, externe Artikel und Pagination verwenden die bestehenden Includes aus `_includes/blog/`.
- `assets/css/_native/theme/components/newsroom.css` enthält die bisherigen gemeinsamen Blog-Regeln. Beide Archivtypen tragen `page-newsroom`. Die zusätzliche Kategorieklasse `page-category-newsroom` und `page-category.css` behandeln ausschließlich Breadcrumbs und Spezialbereiche. Es gibt keine zweite Farbpalette oder kopierte Newsroom-Stylesheets.
- Die gemeinsamen Header-/Menü-/Such-/Social-Includes nutzen auch auf Kategoriearchiven die kleinen lokalen SVGs beziehungsweise beschrifteten Links. Andere Seitentypen behalten ihre bestehende Darstellung.

## Redaktionelle Konfiguration

Die bestehenden Metadaten bleiben in `_data/blog/categories.json`. Alte Kategorien benötigen keine neuen Felder. Für KI wurden Anzeigename, SEO-Titel und Meta-Description auf Nachrichten, Analysen und Recherchen ausgerichtet.

Optional kann ein Kategorieeintrag ergänzt werden:

```json
{
  "newsroom": {
    "eyebrow": "Ressort · Technologie",
    "featured_urls": [],
    "navigation": [{ "category": "openai", "label": "OpenAI" }]
  },
  "related_categories": ["openai", "anthropic", "privacy", "Wirtschaft"]
}
```

`featured_urls` akzeptiert bis zu vier vorhandene Artikel-URLs, die zur aktiven Kategorie gehören. Die konfigurierte Reihenfolge bestimmt die hervorgehobenen Plätze. Unbekannte URLs, Entwürfe, fremde Kategorien und Wiederholungen werden ignoriert. Ohne Auswahl stehen die neuesten relevanten Artikel zuerst; das globale Blog-Feld `featured` beeinflusst das Ressort nicht.

Die Auswahl erfolgt vor der Aufteilung in 24 Plätze. Ein vorgezogener Artikel wird aus dem restlichen Strom entfernt und erscheint im paginierten Artikelarchiv genau einmal. Aufmacher gibt es nur auf Seite 1; der übrige Feed bleibt chronologisch. Bei weniger als vier Artikeln schrumpft der Aufmacherbereich entsprechend.

`newsroom.navigation` verweist ausschließlich auf tatsächlich erzeugte Kategorien. Die Standardnavigation führt zu vorhandenen Inhaltsbereichen, beispielsweise Artikeln, externen Veröffentlichungen oder Git-Clustern. Auf Folgeseiten verweisen Links zu Spezialbereichen auf die erste Seite mit dem richtigen Fragment.

`related_categories` wird weiterhin verwendet und auf vorhandene Ziele geprüft. Ohne explizite Liste werden bis zu sechs Themen aus den häufigsten gemeinsamen Artikelkategorien abgeleitet. Der Link zu `/blog/#kategorien` erhält den Zugang zur vollständigen Taxonomie.

## Spezialbereiche und Auffindbarkeit

- Externe Artikel werden aus den vorhandenen Herausgeber-JSON-Dateien nach aktiver Kategorie gefiltert, nach Datum sortiert und anhand der URL dedupliziert. Die Sidebar zeigt bis zu fünf aktuelle Einträge mit tatsächlichem Herausgeber. Die vollständige bisherige Auswahl bleibt auf Seite 1 erreichbar. Gaming erhält zusätzlich den bestehenden IGN-Bereich `#ign-articles`.
- Lange YouTube-Videos und Shorts behalten ihre bisherigen Kategorien, Links und OJ-Videokarten. Reine Videoarchive verwenden ebenfalls höchstens 24 Einträge je Seite. In normalen Artikelressorts bleiben passende Videos als ergänzender Bereich auf Seite 1 erhalten. Die bisherigen Ziele `#videos` und `#shorts` bleiben verfügbar.
- Git behält seine Schnellzugriffe, Abschnittszuordnungen und Fragmentziele. Recherchen behalten die vorhandenen Kennzahlen; `ads: false` bleibt wirksam.
- Ein Ressort mit ausschließlich externen Veröffentlichungen paginiert diese ebenfalls mit 24 Einträgen. Bestehende vollständig leere Kategorien behalten ihre erste URL mit `noindex, follow`; leere Folgeseiten werden nicht erzeugt. Leere Sidebar-Module entfallen.
- Jede Archivseite besitzt einen eigenen Canonical, Folgeseiten einen eindeutigen SEO-Titel. CollectionPage, BreadcrumbList und die ItemList beschreiben die tatsächlich sichtbaren primären Archiveinträge mit ihren echten Daten. Bildmetadaten und optionale Schema-Angaben bleiben konfigurierbar.
- Pagefind behält die Kategorie-Metadaten und das ursprüngliche Ziel. Folgeseiten werden nur aus dem lokalen Suchindex ausgeschlossen, bleiben für Suchmaschinen indexierbar. Die Sitemap behält ihre bisherigen Kategorie-Einstiegsseiten; die weiteren Archivseiten sind über native Pagination verlinkt.

## Prüfungen

```sh
npm test
npm run build
npm run qa
npm run test:browser
```

`category-newsroom-test.mjs` prüft Auswahl und Pagination auch mit kuratierten älteren Artikeln, Entwürfen, doppelten oder fremden URLs, 50 Videos, wenigen Artikeln und leeren Kategorien. `validate-category-newsroom.js` prüft zusätzlich sämtliche tatsächlich gebauten Archive gegen die unveränderten Artikel- und Veröffentlichungsquellen: Vollständigkeit, Reihenfolge, Metadaten, Schema, Links und Spezialbereiche.

Die Browserprüfungen umfassen 1920, 1440, 768, 390 und 320 CSS-Pixel, 200 Prozent Textgröße, Tastatur-/Such-/Menübedienung, JavaScript-Fallback, native Pagination und axe-Regeln für WCAG 2.2 AA und Best Practices. Der 320-Pixel-Viewport dient zusätzlich als Reflow-Äquivalent zu 400 Prozent Zoom bei 1280 Pixel Ausgangsbreite. Drittanbieter-Anfragen werden dabei blockiert.

Tatsächliche VoiceOver-/NVDA-Sitzungen sowie separate Safari-/Firefox-Läufe wurden nicht ausgeführt. Automatisierte Prüfungen belegen keine vollständige WCAG-Konformität. Die ergänzende Screenreader-Checkliste im [Blog-Bericht](blog-newsroom.md#grenzen-und-screenreader-checkliste) gilt auch für Breadcrumbs, Ressortnavigation und Kategorie-Pagination.

## Verifikation am 18. Oktober 2026

`npm test`, `npm run build`, `npm run qa` und `npm run test:browser` wurden ausgeführt. Die Abschlussprüfung nutzt einen isolierten Snapshot derselben Quellen, weil parallel laufende Dev-Server den normalen `_site/`-Ordner aktualisieren. Der Browser-Testserver unterstützt dafür `SITE_QA_DIRECTORY`, um eine bereits gebaute Ausgabe unabhängig vom laufenden Dev-Server zu prüfen.

- 60 Kategorien auf 114 statischen Seiten; 1.995 Artikelzuordnungen vollständig und jeweils einmal je Kategorie archiviert. KI umfasst 179 Artikel auf acht Seiten.
- 762 HTML-Dateien, 79.391 lokale Verweise und 1.166 JSON-LD-Blöcke geprüft; keine kaputten lokalen Verweise.
- 35 Browsertests bestanden, darunter 29 axe-Prüfungen ohne gemeldete Verstöße. Keine JavaScript-Seitenfehler in den geprüften Zuständen.
- Alle 527 Artikelquellen sind unverändert. Die bestehenden HTML-Ausgaben außerhalb der Kategorie- und Blog-Archivseiten sind bytegenau unverändert, einschließlich sämtlicher Artikelseiten.
- Die Desktop- und Mobile-Screenshots von `/blog/` sind pixelgenau identisch mit dem unmittelbar vor dem Umbau erstellten Produktionsbuild.

Visuell geprüfte Screenshots:

- [Blog Desktop](qa/category-newsroom/blog-desktop.png) und [Blog Mobile](qa/category-newsroom/blog-mobile.png)
- [KI Desktop](qa/category-newsroom/ki-desktop.png), [KI Mobile](qa/category-newsroom/ki-mobile.png), [Nachrichtenzeilen](qa/category-newsroom/ki-feed.png) und [Archivseite 2](qa/category-newsroom/ki-page-2.png)
- [Gaming](qa/category-newsroom/gaming-desktop.png), [YouTube Shorts](qa/category-newsroom/shorts-mobile.png) und [Git-Cluster](qa/category-newsroom/git-cluster.png)
