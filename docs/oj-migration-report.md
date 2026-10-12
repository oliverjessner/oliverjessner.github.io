# OJ-Migration mit acht ausdrücklich freigegebenen Produkt-Ausnahmen

Stand: 12. Oktober 2026. Umsetzung auf `codex/oj-designsystem-migration`. Kein Commit, Push, Merge, Deploy oder npm-Publish wurde ausgeführt.

**Aktueller Scope nach der jüngsten Nutzerpräzisierung:** Ausschließlich SQLite Hub, BulkPixel, PineFetch, OpenEmperor, NO-BULLSHIT-RSS, SkipTheVoice, Billly und ItWorksBut behalten ihr ursprüngliches Produktdesign. **Product Lab verwendet vollständig OJ**, einschließlich Portfolio-Inhalten, Karten und Filtern. KnotenWerk, RedactionResearch, LinkHub und sämtliche übrigen Seiten verwenden ebenfalls OJ. Die [aktuellen Designkorrekturen](oj-design-corrections.md) beschreiben diese geschlossene Ausnahmeliste.

Die aktuelle CSS-Architektur besitzt zwei zusammengestellte Entrypoints: `main.css` für OJ-Seiten und `side-projects-legacy.css` ausschließlich für die acht Ausnahmen. Der `product-hub-legacy.css`-Ladepfad entfällt. Lokale Originalfonts werden nur für die freigegebenen Legacy-Seiten eingebunden. Die abschließenden Builds, Paritäts-, Browser- und Watch-Prüfungen dieser präzisierten Aufteilung stehen noch aus; die nachfolgenden tatsächlichen Gesamtprüfungen bleiben historische Nachweise früherer Stufen.

Beim ursprünglichen Migrationsabschluss verwendeten alle 36 Eleventy-/Liquid-Layouts die gemeinsame OJ-Grundlage. Die zehn vollständigen HTML-Dokumente luden den gemeinsamen Stylesheet-Include selbst; die übrigen 26 erbten ihn vom Default-Layout. Das galt auch für die versteckten externen Pagefind-Dokumente. Redaktionelle Quellen, Frontmatter, öffentliche URLs und Produktdaten bleiben erhalten.

## Einbindung und Komponenten

Verwendet wird das veröffentlichte npm-Paket **`oj-designsystem` exakt `0.1.0`**, mit Registry-Integrity im Lockfile. Die vollständige unveränderte Distribution einschließlich lokaler Comfortaa-/JetBrains-Mono-/Font-Awesome-Dateien und aller Lizenzen liegt in `assets/vendor/oj-designsystem/`. Der Abgleich prüft 33 Dateien und läuft vor jedem Eleventy-Build; unveränderte Dateien werden nicht neu geschrieben. Node 24 ist in `.nvmrc` und Netlify festgelegt, das Minimum ist 22.12.0.

Alle OJ-Seiten laden das Designsystem genau einmal, gefolgt von `main.css`; das gilt ausdrücklich auch für Product Lab, KnotenWerk und RedactionResearch. Die acht benannten Legacy-Seiten laden ihre isolierten Originalstyles und lokalen Originalfonts. Die gemeinsame Grundlage nutzt `oj-site`, das dokumentierte Dark Theme und den nachträglich gewünschten Akzent `--oj-accent: #ff4a4a`. Wiederverwendbare Buttons, Icon-Aktionen, Felder, Karten, Navigation, Header/Footer, Byline, Tags/Badges, Callouts, Pagination, Akkordeons, Codeblöcke und redaktionelle Inhalte stammen aus den tatsächlich geprüften OJ-Komponenten. Die Suche erzeugt auch ihre dynamischen Karten mit diesen Bausteinen. Der Suchdialog verwendet ein natives modales `dialog` mit OJ-Darstellung; bestehende Website-Controller steuern die Interaktionen.

- [Einbindung, Herkunft und Update-Ablauf](../tools/docs/oj-designsystem.md)
- [Layoutbestand, Komponentenmapping und DOM-Verträge](oj-migration-inventory.md)
- [Produktmigration und Produktprüfungen](oj-product-migration.md)

## Entfernte Grundlagen und verbleibendes CSS

Beim ursprünglichen vollständigen Migrationsabschluss wurden 42 alte CSS-/Font-Dateien entfernt: Bootstrap-Utilities, Zerostatic-Grundlagen, das alte globale Token-/Typografiesystem, eigene allgemeine Button-/Formular-/Karten-/Suchregeln und die zweite Font-Awesome-Distribution. Externe Font-Anfragen sind entfernt. Kein generiertes OJ-Vendor-Asset wurde manuell verändert oder mit PurgeCSS bearbeitet.

Website-CSS bleibt für Seitenkomposition, die `site-*`-Spalten-/Abstandsgeometrie, Inhaltskarussells, Suchergebnis-Anordnung, Syntaxfarben aus OJ-Tokens und Produktdarstellungen. In der aktuellen Aufteilung dürfen nur die acht Legacy-Ausnahmen ihre isolierte Originalbasis einschließlich ursprünglicher Layout- und Komponentenklassen verwenden. Alle anderen Seiten erhalten ihre gemeinsamen UI-Grundlagen aus OJ; Product Lab hat keinen Legacy-Inhaltswrapper. Die ursprünglichen Produktfonts und Font-Awesome-Dateien sind ausschließlich für diese Ausnahmen lokal wiederhergestellt. Produktlogos, Screenshots, Videos, Landschaften und App-Mockups bleiben eigene Medien. DuckDeep bleibt ein eingebettetes Spiel mit eigener Shadow-DOM-UI; die Website-Schale verwendet OJ. Diese fachlichen und gestalterischen Restfälle sind beabsichtigt.

Im damaligen Produktionsoutput nach Purging und Logo-Korrektur maß `main.css` 291.582 Bytes statt zuvor 776.933 Bytes. Die unveränderte OJ-Stylesheet-Datei dieses Pakets misst 137.557 Bytes; aktuelle Website-CSS-Messwerte folgen mit der Endprüfung.

## Bereits vorhandene Fehler und gezielte Reparaturen

- Markdown-Überschriften hatten keine IDs, obwohl das Inhaltsverzeichnis bereits Slug-Ziele erzeugte. Der zentrale Renderer erzeugt passende, eindeutige IDs und erhält explizite IDs. Alle 4.582 TOC-Verweise in 479 Artikeln lösen jetzt auf.
- Markdown-Checklisten blieben als `[ ]`-Text stehen. Der zentrale Renderer erzeugt die bestehende Checkbox-DOM-Struktur mit zugänglichen Namen, OJ-Darstellung und unverändertem Speichervertrag. Der reale 58-Punkte-Artikel wurde einschließlich Persistenz getestet. Textabhängige SEO-Berechnungen verwenden die ursprüngliche Marker-Darstellung; JSON-LD bleibt exakt erhalten.
- Die mehrzeilige PR-Kopiervorlage wurde innerhalb des eingerückten Includes erneut als Markdown geparst. Das gemeinsame Include erzeugt jetzt gültiges HTML und genau einen wörtlichen Copy-Text mit allen 1.604 Zeichen. Beide JSON-LD-Blöcke bleiben exakt erhalten. Die Paritätsprüfung rekonstruiert ausschließlich dieses bekannte fehlerhafte Referenz-Snippet gegen seinen unveränderten Source-Capture; gewöhnliche Codeblöcke bleiben inklusive Whitespace strikt geprüft. Positive und negative Fixtures sichern diese Begrenzung ab.
- `assets/` in `.eleventyignore` blockierte auch die registrierten CSS-/JS-Watchziele. Assets werden nun ausschließlich aus der Template-Suche ausgeschlossen; CSS und JavaScript lösen echte Watch-Builds aus. Die rohe Liquid-Datei `css/main.css` wird nicht mehr per Passthrough über das zusammengestellte Stylesheet kopiert.
- Der ursprüngliche Lockfile-Root nannte eine andere Website-Version als `package.json`; beide stimmen jetzt mit dem bestehenden `1.0.0` überein.

## Historische tatsächlich ausgeführte Prüfungen

Diese Ergebnisse gelten für den ursprünglichen Migrationsabschluss vor der jüngsten Acht-Ausnahmen-Präzisierung. Sie bestätigen nicht automatisch die jetzt vereinbarte Aufteilung. Zahlen, Logs und Screenshots bleiben als damalige Nachweise unverändert.

Der Referenzbuild wurde vor den Änderungen mit `ELEVENTY_ENV=production npm run build` erzeugt und extern unter `/tmp/oj-migration-reference.3qCmUZ` gesichert. Referenz und abschließender Vergleichsbuild liefen mit denselben Produktions-Einstellungen auf Node 26.10.0/npm 11.19.1. Ein zusätzlicher vollständiger Produktionsbuild lief erfolgreich auf dem vorgesehenen Node 24.21.0.

| Prüfung | Ergebnis |
| --- | --- |
| Frisches `npm ci` | erfolgreich; kein Nachbar-Checkout erforderlich |
| Vollständiger Produktionsbuild, Node 26 und Node 24 | bestanden |
| Bestehende QA plus neue Renderer-/Copy-/Paritätsfixtures | bestanden; 693 HTML-Dateien, 65.944 lokale Verweise, 1.034 JSON-LD-Blöcke, null defekte Verweise |
| `qa:parity` gegen den externen Referenzbuild | 693 HTML-Pfade und 607 Sitemap-URLs; null fehlende/zusätzliche Pfade oder Metadatenabweichungen |
| `qa:migration` gegen denselben Referenzbuild | alle 693 Dokumente, 518 redaktionelle Wrapper und 10.519 ursprüngliche Medien-/Download-Verweise geprüft; vollständige Metadaten/JSON-LD/Daten/Sprachen/Favicons/Pagefind-Hooks/Ads-/Analytics-Bedingungen sowie Root-Dateien erhalten |
| `npm run dev -- --port=8788` | gestartet; CSS- und JS-Änderungen samt Wiederherstellung lösen vier erfolgreiche Watch-Builds aus; lokale Styles/Script/Font/Pagefind HTTP 200; keine Vendor-Watchschleife |
| Primäre Seiten × 390/768/1440 Pixel | 18/18 bestanden: Startseite, Blog, Folgeseite, Kategorie, technischer Artikel und Suche |
| Weitere Inhaltsseiten × dieselben Breiten | 24/24 bestanden: About, Kontakt, Journalismus, Veröffentlichungen, Platform Intelligence, Werben, Autoren und 404 |
| Zwölf Produktseiten einschließlich Product Lab und LinkHub × dieselben Breiten | 36/36 bestanden |
| Primäre Interaktionen im abschließenden Produktionsoutput | 13/13 bestanden: Navigation, Fokus/Tab/Escape, beide Such-Shortcuts, Query-/URL-Synchronisation, interne/externe Ergebnisse, Clear, modaler Dialog, Checklistenpersistenz, Carousel-Buttons/Tastatur/TouchEvents und Copy-Erfolg/Fehler/Reset |
| Produktinteraktionen und Medien | 42/42 bestanden; zusätzlich 2/2 kontrollierte LinkHub-Wochentage und zwölf abschließende Produkt-Kompositionskontrollen |
| Kopiervorlage bei drei Breiten | 3/3 bestanden, tatsächlicher vollständiger Clipboard-Inhalt sowie Fehler und Reset |
| `git diff --check` | bestanden |

Browserkontrollen liefen in lokalen Chrome-/Playwright-Kontexten mit lokal geladenen Fonts/Icons. Die geprüften Dokumente haben keine äußeren horizontalen Überläufe, keine neuen lokalen Asset-/JavaScript-Fehler und lesbare Umbrüche; gesampelte Textkontraste wurden überprüft. Redaktioneller Inhalt verwendet 16px Comfortaa mit 28,8px Zeilenhöhe und ungefähr 68ch Lesebreite; Code verwendet JetBrains Mono. Tabellen und lange Codezeilen scrollen bei Bedarf innerhalb ihres Inhaltsbereichs. Sichtbare Tastaturfokuszustände und Fokus-Rückgabe wurden direkt geprüft.

Die primären Testkontexte beantworten Analytics-Beacons lokal mit HTTP 204, um externe Telemetrie während der Darstellungstests zu vermeiden. Analytics-/Werbebedingungen selbst werden streng gegen die Produktionsreferenz verglichen. Normale vom Browser abgebrochene Video-Metadatenanfragen sind separat protokolliert; Medienzustand und tatsächliche Wiedergabe wurden geprüft. OpenEmperor spielt seinen fünf Sekunden langen Clip tatsächlich weiter und beginnt wieder von vorne: autoplay, loop, muted und playsinline aktiv, controls inaktiv.

Kontakt hat aktuell kein Formular, Platform Intelligence keinen Copy-Button; diese seitenbezogenen Tests sind nicht anwendbar. Die vorhandenen Formular-Includes sind auf OJ migriert. Externe Release-Downloads, Social-Media-Plattformen und Produktverzeichnisse wurden als Dienste nicht durchgetestet; ihre bestehenden Ziele sind erhalten. Browserkontrollen beziehen sich auf Chromium. Für diese damalige Prüfstufe bestanden keine bekannten verbleibenden Blocker. Die abschließende Bewertung der aktuellen Aufteilung erfolgt erst nach erneuter Endprüfung.

`npm audit` meldet dieselben 15 betroffenen Pakete wie das ursprüngliche Lockfile (4 moderate, 11 high; null neue Befunde). Es wurden keine automatischen Dependency-Fixes vorgenommen.

## Prüfartefakte

Die folgenden sechs Vorher-/Nachher-Paare stammen aus dem geschützten Referenzbuild und dem ursprünglichen Migrationsabschluss vor den unten dokumentierten Logo-/Akzentkorrekturen. Viewport und Höhe stimmen jeweils überein.

| Ansicht | Vorher | Nachher |
| --- | --- | --- |
| Startseite 1440×1000 | [PNG](oj-migration/screenshots/before-home-1440.png) | [PNG](oj-migration/screenshots/after-home-1440.png) |
| Startseite 390×900 | [PNG](oj-migration/screenshots/before-home-390.png) | [PNG](oj-migration/screenshots/after-home-390.png) |
| Blog 1440×1000 | [PNG](oj-migration/screenshots/before-blog-1440.png) | [PNG](oj-migration/screenshots/after-blog-1440.png) |
| Artikel 1440×1000 | [PNG](oj-migration/screenshots/before-article-1440.png) | [PNG](oj-migration/screenshots/after-article-1440.png) |
| PineFetch 1440×1000 | [PNG](oj-migration/screenshots/before-pinefetch-1440.png) | [PNG](oj-migration/screenshots/after-pinefetch-1440.png) |
| OpenEmperor 1440×1000 | [PNG](oj-migration/screenshots/before-openemperor-1440.png) | [PNG](oj-migration/screenshots/after-openemperor-1440.png) |

Kompakte Browserberichte und Build-/Watch-/Paritätslogs liegen in [oj-migration/evidence/](oj-migration/evidence/). Weitere tatsächlich aufgenommene Screenshots und lokale Testskripte liegen im ignorierten `.playwright-mcp/`. `docs/` und `tools/` sind vom Eleventy-Input ausgeschlossen und erzeugen keine neuen öffentlichen URLs.

## Historische Nachprüfung: weiße Partnerlogos

Die Partnerlogos behalten auf allen fünf Seiten ihre weiße Darstellung. Die gemeinsame CSS-Regel färbt die Logoformen weiß; Golem und IT Finanzmagazin erhalten begrenzte Raster-Ausnahmen, damit ihre opaken hellen Pixel keine weißen Rechtecke erzeugen. Ein gezielter PurgeCSS-Ignore erhält ausschließlich diese beiden Asset-Selektoren. Originaldateien und Linkziele bleiben unverändert.

CSS-Build und Produktions-Purging bestanden. Alle fünf Seiten bei 390, 768 und 1440 Pixel wurden im Browser erneut geprüft: 15/15 bestanden, einschließlich geladener Logos, weißer Darstellung bei Hover/Fokus und fehlender äußerer Überläufe. Die bestehende Site-QA bestätigt weiterhin 693 HTML-Dateien und null defekte lokale Verweise.

- [Browser-Prüfbericht](oj-migration/evidence/oj-partner-logos-qa.json)
- [Partnersektion Desktop](oj-migration/screenshots/after-partners-1440.png)
- [Partnersektion Mobile](oj-migration/screenshots/after-partners-390.png)

## Historische Nachprüfung: Website-Akzent

Auf Wunsch wurde ausschließlich der zentrale Branding-Token in `assets/css/main.css` auf `--oj-accent: #ff4a4a` geändert. Er wird nach der unveränderten OJ-Distribution injiziert; Hover-, Active-, Border-, Text- und Button-Vordergrundfarben leitet das Designsystem daraus ab. Semantische Statusfarben und weiße Partnerlogos bleiben erhalten. Frühere Prüfarbelege behalten ihren damaligen violetten Akzent.

CSS-Build und Purging bestanden. Startseite, Product Lab, PineFetch und OpenEmperor wurden bei 390 und 1440 Pixel erneut im Browser geprüft: 8/8 bestanden, zentraler Akzent korrekt, kein äußerer Überlauf. Geprüfte Akzenttexte und primäre Buttons erreichen mindestens 4,5:1 Kontrast.

- [Browser-Prüfbericht](oj-migration/evidence/oj-accent-qa.json)
- [Startseite Desktop](oj-migration/screenshots/after-accent-home-1440.png)
- [Startseite Mobile](oj-migration/screenshots/after-accent-home-390.png)
