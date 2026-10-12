# Designkorrekturen nach der OJ-Migration

Stand: 12. Oktober 2026. Die jüngste Nutzerpräzisierung hat Vorrang vor früheren Korrekturstufen: **Product Lab und alle nicht ausdrücklich ausgenommenen Seiten verwenden OJ. Ausschließlich acht Landingpages behalten ihr ursprüngliches Design: SQLite Hub, BulkPixel, PineFetch, OpenEmperor, NO-BULLSHIT-RSS, SkipTheVoice, Billly und ItWorksBut.** KnotenWerk und RedactionResearch verwenden ebenfalls OJ.

Die aktuelle Architektur wird unten beschrieben. Die früher tatsächlich ausgeführten Prüfungen bleiben als historische Nachweise erhalten; eine abschließende Prüfung dieser präzisierten Aufteilung steht noch aus.

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

Die abschließenden Produktions-, Paritäts-, Browser- und Watch-Ergebnisse für **acht Ausnahmen plus vollständig OJ-basiertes Product Lab, KnotenWerk und RedactionResearch** werden nach ihrer tatsächlichen Durchführung ergänzt. Die folgenden Zahlen und Artefakte belegen frühere abgeschlossene Stufen und bestätigen noch nicht die aktuelle Aufteilung.

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
