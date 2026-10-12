# Designkorrekturen nach der OJ-Migration

Stand: 12. Oktober 2026. Die jüngste Nutzerpräzisierung hat Vorrang vor früheren Korrekturstufen: **Product Lab und alle nicht ausdrücklich ausgenommenen Seiten verwenden OJ. Ausschließlich acht Landingpages behalten ihr ursprüngliches Design: SQLite Hub, BulkPixel, PineFetch, OpenEmperor, NO-BULLSHIT-RSS, SkipTheVoice, Billly und ItWorksBut.** KnotenWerk und RedactionResearch verwenden ebenfalls OJ.

Die aktuelle Architektur verwendet das veröffentlichte, exakt gepinnte `oj-designsystem` `0.2.0`. Produktionsbuild, URL-/SEO-Parität, vollständige Invariantenprüfungen und aktuelle Browserprüfungen dieser Aufteilung sind bestanden. Die früher tatsächlich ausgeführten Prüfungen bleiben historische Nachweise. Den vorherigen Stand hat der Nutzer bereits als `c77868a8` committed; der Agent hat nicht committed oder gepusht.

## Umsetzung

1. Links der gemeinsamen Website-Footer sind weiß; Hover und Tastaturfokus verwenden den Website-Akzent `#ff4a4a`.
2. Genau acht freigegebene Produkt-Landingpages verwenden ihr ursprüngliches Markup, ihre Farben, Typografie und eigenen Komponenten aus Website-Commit `084a4ddf92e0b04594230dfaed7f4f29fd55a734`: SQLite Hub, BulkPixel, PineFetch, OpenEmperor, NO-BULLSHIT-RSS, SkipTheVoice, Billly und ItWorksBut. Originalbilder, Videos, Features, Downloads, Anker und JavaScript-Funktionen bleiben erhalten. **Product Lab verwendet vollständig OJ**, einschließlich Inhaltsdarstellung, Projektkarten und Filtern. KnotenWerk, RedactionResearch und LinkHub verwenden OJ.
3. `.blog-section-heading.site-text-center` und die enthaltene H2 haben volle Containerbreite ohne begrenzende Maximalbreite.
4. „Woran ich arbeite“ verwendet zwei übersichtliche OJ-Projektkarten mit 16px Beschreibungstext, getrennten Titeln und klarer CTA. Der Kartentext ist nicht unterstrichen; die einzelne CTA ist als Link erkennbar.
5. Die Recherche-Kennzahlen skalieren auf 44–88px; Labels sind mindestens 15px groß. Das vorhandene Zählen, die reservierte Zahlbreite und zugängliche Alternativtexte bleiben erhalten.
6. Golem und IT Finanzmagazin verwenden genau `filter: grayscale(1) invert(1)` ohne zusätzliche Helligkeit. `screen` hält opake Rasterhintergründe frei.
7. Die dynamiq.-Kontaktsektion verwendet ein eigenes Theme mit dem bestätigten Purple Deep `#7d34c5`, Paper `#f4f0e9` und Lilac `#d9b8f5`, einer großen Überschrift und deutlich erkennbarem CTA. Der gemeinsame Website-Akzent bleibt rot.
8. Autorenprofile in den Publikationen stehen in einem responsiven Linkkartenraster neben einer eigenständigen Einführung; Ziele, Texte und Publikationsfilter bleiben erhalten.

## Aktuelle Aufteilung und CSS-Einbindung

| Darstellung | Seiten |
| --- | --- |
| Ursprüngliches Produktdesign | SQLite Hub `/sqlite-hub/`, BulkPixel `/bulkpixel/`, PineFetch `/pinefetch/`, OpenEmperor `/openemperor/`, NO-BULLSHIT-RSS `/no-bullshit-rss/`, SkipTheVoice `/skipthevoice/`, Billly `/billly/`, ItWorksBut `/itworksbut/` |
| OJ einschließlich aller Inhalte | Product Lab `/product-lab/`, KnotenWerk `/knotenwerk/`, RedactionResearch `/redaction-research/`, LinkHub und sämtliche weiteren Website-Seiten |

- `main.css`: gemeinsame Website-Komposition nach der unveränderten OJ-Distribution, einschließlich Product Lab, KnotenWerk und RedactionResearch.
- `side-projects-legacy.css`: ursprüngliche CSS-Basis ausschließlich für die acht genannten Ausnahmen; Originalmodule bleiben in `legacy-products-source/` isoliert. Die jeweils freigegebenen Produktmodule erhalten ihre eigenen Farben und Komponenten.
- `legacy-product-fonts.css`: lokale Originalfonts für diese acht Seiten. Lato, Fira Mono, Inter und Cormorant Garamond haben eigene WOFF2-Dateien, OFL-Lizenzen und Herkunftsmanifest in `assets/fonts/side-projects/`; Comfortaa referenziert vorhandene lokale OJ-Fontdateien.
- `tools/build/build-css.js` assembliert **zwei Liquid-CSS-Entrypoints**: `main.css` und `side-projects-legacy.css`, auch bei Dev-/Watch-Builds. Die eigenständigen lokalen Font-Definitionen sind kein weiterer Liquid-Entrypoint. Passthrough überschreibt keine zusammengestellte Entrypoint-Datei mit rohen Liquid-Includes. Nur `main.css` wird gepurgt.
- Der frühere `product-hub-legacy.css`-Ladepfad und `.legacy-product-hub`-Wrapper gehören nicht zur aktuellen Architektur. Product Lab lädt ausschließlich die gemeinsame OJ-Darstellung.
- Die additive Migrations-QA berücksichtigt nur diese acht geschlossenen Ausnahmepfade. Alle anderen Seiten müssen die OJ-Grundlage verwenden; URL-, Inhalts-, Metadaten-, JSON-LD-, Medien-, Font- und Funktionsprüfungen gelten weiterhin für jede Seite.

## Prüfstatus nach der Scope-Präzisierung

Die aktuelle Prüfung verwendet `oj-designsystem` `0.2.0` und eine externe Produktionsreferenz mit den inzwischen vom Nutzer geänderten Product-Lab-Daten. Das ursprüngliche Produkt-CSS und sämtliche lokalen Originalfonts bleiben unverändert. Herkunft und Referenz sind in [product-scope-reference.json](oj-migration/evidence/product-scope-reference.json) dokumentiert.

| Aktuelle Prüfung | Ergebnis |
| --- | --- |
| `ELEVENTY_ENV=production npm run build` einschließlich bestehender QA und Renderer-/Copy-/Code-Fixtures | bestanden: 693 HTML-Dateien, 65.932 lokale Verweise, 1.034 JSON-LD-Blöcke, null defekte Verweise; Pagefind 665 Seiten und 38.499 Wörter |
| `qa:parity` | 693 HTML-Pfade und 607 Sitemap-URLs unverändert; null Metadatenabweichungen |
| `qa:migration` | bestanden: 685 OJ-Dokumente und genau acht Originalprodukt-Dokumente; 518 redaktionelle Wrapper und 10.511 Originalmedien-/Download-Verweise; vollständige Inhalts-, SEO-, Font- und Root-Datei-Invarianten erhalten |
| Originaldesign-Isolation | `side-projects-legacy.css` bytegleich zur Referenz, SHA-256 `1078515393a5d03f52d833d3e238b7a228c5cf96bf6b96da64fc7533cce4db15`; lokale Fontdateien unverändert |
| Nutzer-Devserver Port 8080 | Product Lab HTTP 200; nur OJ-Distribution und `main.css`, kein Legacy-Wrapper; Vendor-Manifest `0.2.0` |
| Product Lab, KnotenWerk und RedactionResearch bei 390/768/1440 Pixel | 9/9 Ansichten und 9/9 Interaktionsgruppen bestanden: Filter/URL-Zustand, native Bedienelemente, Galerie/Fokus, Desktopdrag, Clipboard und FAQ; keine äußeren Überläufe oder lokalen Asset-/JavaScript-Fehler |
| Geschlossene Originaldesign-Ausnahmen | 8/8 Einbindungen bestätigt; Original-CSS, Font-CSS und alle 24 referenzierten Fontdateien bytegleich zur Referenz |
| Home, Blog und Publikationsprofile sowie ergänzende Platform-Sektionen bei denselben Breiten | 9/9 gemeinsame Ansichten und 3/3 Platform-Prüfungen bestanden; Footer weiß mit rotem Hover/Fokus, Blog-Heading/H2 volle Breite, sechs Profile/Filter mit Tastaturbedienung, dynamiq. violett, Research-Zahlen 44–83,52px und Labels 15–17,28px |

Tatsächliche Prüfprotokolle: [Produktionsbuild](oj-migration/evidence/product-scope-production-build.log), [Parität](oj-migration/evidence/product-scope-parity.log), [Invarianten](oj-migration/evidence/product-scope-invariants.log), [Isolation](oj-migration/evidence/product-scope-isolation.json), [Produktansichten](oj-migration/evidence/product-scope-qa.json), [Produktinteraktionen](oj-migration/evidence/product-scope-interactions.json), [gemeinsame Website-Sektionen](oj-migration/evidence/product-scope-shared-qa.json). Aktuelle Aufnahmen: [Product Lab mobil](oj-migration/screenshots/product-scope-product-lab-390.png), [Desktop](oj-migration/screenshots/product-scope-product-lab-1440.png). Die früheren Watch-Prüfungen dokumentieren den weiterhin verwendeten Mechanismus; ein neuer Watch-Test wird nicht behauptet.

## Historische Prüfungen der vorherigen Korrekturstufe

| Prüfung | Ergebnis |
| --- | --- |
| `ELEVENTY_ENV=production npm run build` | bestanden: 693 HTML-Dateien, 65.946 lokale Verweise, 1.034 JSON-LD-Blöcke, null defekte Verweise |
| Bestehende QA und Renderer-/Copy-/Code-Paritätsfixtures | bestanden |
| `qa:parity` gegen den gesicherten Originalbuild | 693 HTML-Pfade und 607 Sitemap-URLs unverändert; null Metadatenabweichungen |
| `qa:migration` | 683 OJ-Dokumente und zehn Originalprodukt-Dokumente; 518 redaktionelle Wrapper und 10.519 Originalmedien-/Download-Verweise erhalten; vollständige Inhalte, SEO, Sprachen, Favicons, Pagefind-Hooks, Ads-/Analytics-Bedingungen und Root-Dateien geprüft |
| Footer, Home-Karten, Kennzahlen, Rasterlogos, dynamiq. bei 390/768/1440 Pixel | 6/6 Ansichten bestanden; weiße Footer-Links, Akzent bei Hover/Fokus, klare Karten, größere Kennzahlen und tatsächlicher violetter Brandhintergrund |
| Home, Blog und Publikationsprofile bei denselben Breiten | 9/9 Ansichten bestanden; Blog-Heading/H2 mit 350/728/1112px Containerbreite, korrekte Links/Tab-Reihenfolge/Fokus sowie sechs Publikationsfilterzustände einschließlich Enter/Space |
| Zehn Produkt-Landingpages und Product Lab bei denselben Breiten | 33/33 Ansichten bestanden; Originalfarben, Schriftarten/-größen, Radien, Abstände und Hero-/CTA-Geometrie gegen die Referenz mit gleichen Originalfonts bestätigt; keine äußeren Überläufe oder lokalen Asset-/JavaScript-Fehler |
| Produktinteraktionen und Medien | 42/42 Prüfungen plus 14/14 zusätzliche Drag-/Lightbox-/Copy-/Downloadziel-Prüfungen bestanden; OpenEmperor spielt seinen Clip endlos, stumm, inline und ohne Controls |
| Dev/Watch in einer bytegleichen temporären Spiegelkopie | Start und zwei echte CSS-Watch-Rebuilds bestanden; drei CSS-Entrypoints HTTP 200 und vollständig kompiliert, Probe sichtbar und wieder entfernt, Pagefind jeweils 665 Seiten, keine Vendor-Schleife; Root-Quellen und Produktionsoutput unverändert |

Die damaligen Browserkontrollen liefen in Chromium gegen den vollständig gebauten lokalen Output. Beim kontrollierten Originalvergleich wurden dessen externe Font-Anfragen im isolierten Browserkontext durch dieselben lokal ausgelieferten Originalfonts ersetzt. Der gesicherte Referenzbuild wurde nicht geändert.

Prüfberichte und tatsächliche Logs:

- [Produktionsbuild](oj-migration/evidence/corrections-production-build.log), [URL-/SEO-Parität](oj-migration/evidence/corrections-parity.log), [vollständige Invarianten](oj-migration/evidence/corrections-migration.log)
- [Footer, Kennzahlen und dynamiq.](oj-migration/evidence/oj-design-corrections-qa.json)
- [Blog, Home und Profile](oj-migration/evidence/corrections-sections-qa.md)
- [Originale Produktdesigns](oj-migration/evidence/corrections-products-qa.json)
- [Produktinteraktionen und Medien](oj-migration/evidence/corrections-products-interactions.json), [zusätzliche Produktprüfungen](oj-migration/evidence/corrections-products-extra-interactions.json)
- [Dev-/Watch-Prüfbericht](oj-migration/evidence/corrections-dev-watch.md), [tatsächlicher Log](oj-migration/evidence/corrections-dev-watch.log)

Historische Aufnahmen der vorherigen Korrekturstufe:

- [Startseitenkarten](oj-migration/screenshots/corrections-home-cards-1440.png)
- [Autorenprofile](oj-migration/screenshots/corrections-publications-1440.png)
- [Große Kennzahlen auf Mobile](oj-migration/screenshots/corrections-metrics-390.png)
- [dynamiq. Desktop](oj-migration/screenshots/corrections-dynamiq-1440.png), [Mobile](oj-migration/screenshots/corrections-dynamiq-390.png)
- Wiederhergestellte Produktdesigns: [PineFetch](oj-migration/screenshots/corrections-product-pinefetch-1440.png), [SQLite Hub](oj-migration/screenshots/corrections-product-sqlite-hub-1440.png), [OpenEmperor](oj-migration/screenshots/corrections-product-openemperor-1440.png)
