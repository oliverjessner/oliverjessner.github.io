# Redaktionelle Blog-Übersicht

Die Übersicht unter `/blog/` verwendet die bestehende Eleventy-/Liquid-Pipeline. Die Website war bereits von Jekyll migriert; ein zweiter Generator oder ein Frontend-Framework wurde nicht eingeführt.

## Aufbau und geänderte Dateien

| Bereich | Dateien | Aufgabe |
| --- | --- | --- |
| Datenmodell | `plugins/blog-newsroom.js`, `blog/blog.11tydata.js` | Aufmacher auswählen, Archiv aufteilen, Metadaten aufbereiten und Sidebar befüllen |
| Redaktionelle Auswahl | `_data/blog/newsroom.json` | Leserorientierte Ressorts und Fokus-Themen mit bestehenden Kategorie-URLs |
| Layout | `_layouts/blog.html`, `blog/index.html`, `_includes/blog/` | Kompakter Kopf, Aufmacher, Nachrichtenzeilen, Sidebar, Themenübersicht und Pagination |
| Gestaltung | `assets/css/_native/theme/components/newsroom.css` | Gemeinsame, auf `.page-newsroom` begrenzte Gestaltung von Blog- und Kategoriearchiven; siehe [Ressortseiten](category-newsroom.md) |
| Gemeinsame Bedienung | `assets/js/pagefind-search.js`, `assets/js/hamburger.js` | Zugängliche Suchbilder, Escape, Fokus-Rückgabe und übereinander geöffnete Dialoge |
| Kleine Bild- und Icon-Dateien | `scripts/responsive-images.js`, `_includes/blog/icon.html`, gemeinsame Header-/Menü-/Such-/Social-Includes | Zusätzliche Thumbnail-Größen; ausschließlich im Blog lokale SVGs und beschriftete Social-Links anstelle großer Icon-Schriften |
| Prüfungen | `scripts/tests/blog-newsroom-test.mjs`, `scripts/tests/browser/blog-newsroom.spec.mjs`, `tools/qa/validate-blog-newsroom.js` | Auswahlregeln, vollständiges Archiv, Semantik, echte Suche und Browser-/axe-Prüfungen |
| Testumgebung | `playwright.config.mjs`, `tools/qa/serve-built-site.js`, `package.json`, `package-lock.json`, `.gitignore` | Kleine Testumgebung für die gebaute Website; Playwright und axe sind reine Entwicklungsabhängigkeiten |

Der globale Markenauftritt und seine Navigation bleiben verfügbar. Die Blog-Übersicht verwendet jetzt das vorhandene dunkle OJ-Theme einschließlich Comfortaa und der nativen Farb-, Fokus-, Abstands- und Radius-Tokens. Suche und Pagination verwenden `oj-button`, die Ressortnavigation `oj-nav`/`oj-nav-link`, Kategorien `oj-tag`/`oj-cluster` und die Recherchebox `oj-panel`. Es gibt keine separate Blog-Farbpalette mehr. Das redaktionelle Raster bleibt erhalten. Die Übersicht nutzt die verfügbare Breite bis maximal `100rem` (1.600 Pixel bei Standardschriftgröße); globale Kopf- und Fußbereiche derselben Seite folgen dieser Breite. Die Anpassung ist auf die Archivseiten begrenzt.

Desktop: ein großer Aufmacher, drei kleinere Nachrichten und eine 300 Pixel breite Sidebar. Der Feed nutzt horizontale Zeilen mit ungefähr 156 × 92 Pixel großen Vorschaubildern, vollständigen Überschriften, Ressort, Datum und kurzem Beschreibungstext. Auf kleinen Ansichten stehen die Nebenmeldungen unter dem Aufmacher; die Sidebar folgt dem vollständigen Hauptinhalt. Alle Überschriften dürfen umbrechen. Die vollständige Themenliste ist am Seitenende immer sichtbar. Sie enthält auch die bestehenden YouTube-Video- und Shorts-Kategorien mit ihren tatsächlichen Videoanzahlen sowie den 31-Tage-Ticker. Der Kontaktblock wurde entfernt.

Die bestehende Sharp-Pipeline erzeugt für das neue Profil `news-thumbnail` zusätzlich 96, 156 und 312 Pixel breite Varianten. Nutzt ein Bild mehrere Profile, werden deren Größen zusammengeführt. Bestehende Artikelbilder behalten ihre bisherigen Größen und `sizes`-Angaben. Nur das Aufmacherbild lädt vorrangig und ohne Lazy Loading; alle anderen Nachrichtenbilder laden verzögert. Die erzeugten Dateien liegen ausschließlich im Build-Verzeichnis.

Die Sidebar beginnt mit eigenen Recherchen. Diese stammen aus der bestehenden Kategorie `recherche` oder dem optionalen Typ `investigation`. Externe Veröffentlichungen werden nach Datum aus allen vorhandenen Herausgeber-Datensätzen zusammengeführt und mit dem tatsächlichen Herausgeber sowie „Extern“ gekennzeichnet. Eine Zugriffsrangliste wird nicht behauptet.

## Archiv und optionale Metadaten

- `featured: true`: Der neueste ausdrücklich markierte veröffentlichte Artikel ist der Aufmacher. Ohne Markierung ist es der neueste veröffentlichte Artikel.
- Ein Aufmacher, der ursprünglich auf einer späteren Seite gelegen hätte, wird vor der Aufteilung einmalig in den ersten Archivplatz verschoben. Er wird aus dem verbleibenden Strom entfernt. Kein Artikel wird verloren oder mehrfach im paginierten Archiv ausgegeben.
- Drei weitere aktuelle Artikel ergänzen den Aufmacher. Die restlichen Einträge erscheinen nach Veröffentlichungsdatum. Folgeseiten bestehen vollständig aus chronologischen Nachrichtenzeilen.
- Pro Seite bleiben es 24 Archivplätze. Die vier hervorgehobenen Artikel werden auf Seite 1 nicht nochmals im Feed wiederholt. `pinned` bleibt im Content-Modell erhalten und beeinflusst diese Sortierung nicht.
- `editorial_type` unterstützt optional `news`, `analysis`, `investigation`, `opinion` und `tutorial`. Alte Artikel funktionieren ohne neue Felder.
- Die Schema.org-ItemList enthält weiterhin sämtliche Artikel der jeweiligen Seite und bleibt nach Datum sortiert. Bestehende individuelle Permalinks, auch außerhalb von `/blog/`, werden berücksichtigt.
- Vorhandene Kategorie-URLs und technische Schlagwörter bleiben erhalten. Externe Klassifizierungsbegriffe ohne tatsächlich erzeugte Kategorieseite werden nicht als erfundene Links angeboten.

Es wurden keine Artikel, Veröffentlichungsdaten, Kategorien oder externen Datensätze migriert. Die 526 veröffentlichten Artikel werden auf 22 Archivseiten jeweils genau einmal ausgegeben.

## Zugänglichkeit und progressive Erweiterung

Die Seite besitzt ein H1, geordnete Überschriften, native Artikel-/Listen-/Navigationsstrukturen und ISO-Zeitangaben. Zu jedem Artikel gibt es einen Überschriftenlink; dekorative Vorschaubilder bilden keine zusätzlichen, redundanten Linkziele. Aufmacher, Nebenmeldungen und Nachrichtenzeilen zeigen zusätzlich bis zu drei unterschiedliche Kategorien als native OJ-Tags mit bestehenden Kategorie-URLs. Die Tags sind eigene, klar benannte Ziele und umbrechen bei wenig Platz. Bei fehlenden Bildern oder Datumswerten werden keine Inhalte erfunden. Linktexte entsprechen ihren zugänglichen Namen. Die Themenliste und die drei zusätzlichen Formatziele sind auch ohne JavaScript sichtbar; alle drei Ziele wurden im Browser geöffnet und auf erfolgreiche Navigation geprüft. Überschriften werden nicht abgeschnitten; nur optionale Beschreibungstexte werden visuell begrenzt.

Ressorts, Suche, Pagination und die allgemeine Themenauswahl besitzen gut sichtbare Fokusrahmen und mindestens 44 Pixel hohe Zielbereiche. Die Kategorie-Tags innerhalb der Vorschauen sind mindestens 32 Pixel hoch und durch Abstände getrennt. Die Hauptnavigation ist nicht zusätzlich fixiert. Animationen werden bei `prefers-reduced-motion` deaktiviert.

Die Suche verwendet weiterhin den echten lokalen Pagefind-Index und unterstützt sowohl Cmd+K als auch Ctrl+K. Ergebnisse und Fehler werden im vorhandenen Live-Status gemeldet. Escape schließt den Suchdialog auch bei gefülltem Eingabefeld. Der Fokus kehrt zum Auslöser beziehungsweise zu einem sichtbaren Ersatz zurück, wenn ein Ansichtswechsel den ursprünglichen Auslöser ausgeblendet hat. Im mobilen Menü ist der Hintergrund während des geöffneten Dialogs `inert`; ein darüber geöffneter Suchdialog behandelt Escape und Tab zuerst. Das Menü schließt bei Wechsel zur Desktop-Navigation.

Ohne JavaScript bleiben Nachrichten, Links, Pagination, RSS und Themenauswahl verfügbar. Die Suchverknüpfung führt dann zur bestehenden Suchseite; die Live-Volltextsuche selbst benötigt JavaScript. Auf schmalen Ansichten ergänzt eine ausschließlich ohne JavaScript sichtbare Hauptnavigation die globale Navigation.

## Reproduzierbare Prüfungen

```bash
npm ci
npx playwright install chromium
npm run build
npm run test:browser
```

`npm test` führt die bestehenden Tests einschließlich des neuen Datenmodell-/Template-Tests aus. `npm run qa` prüft zusätzlich das tatsächlich gerenderte Archiv und sämtliche lokalen Website-Verweise. Der Browser-Testserver liefert ausschließlich `_site/` auf `127.0.0.1:4192` aus. Textdateien werden wie beim bestehenden Netlify-Hosting mit Brotli übertragen; die bestehende Produktionskonfiguration und deren Cache-Regeln wurden nicht geändert.

Die Browserprüfungen verwenden den echten Pagefind-Index, die gebauten Stylesheets, lokalen Bilder und Schriftdateien. Drittanbieter-Anfragen werden im Test blockiert, damit keine Analytics- oder Anzeigenaufrufe ausgelöst werden. Die Ergebnisse beziehen sich auf den lokalen redaktionellen und navigierbaren Inhalt; eventuell extern eingefügte Anzeigen sind nicht eingeschlossen.

Geprüfte Fälle:

- 1440, 768, 390 und 320 CSS-Pixel mit heller und dunkler Systempräferenz. Das bestehende OJ-Theme der Website bleibt dabei dunkel; eine separate automatische Blog-Palette wird nicht mehr eingesetzt. Zusätzlich wurde die maximale Breite bei 1920 Pixeln geprüft.
- 320 Pixel als Reflow-Äquivalent zu 400 Prozent Zoom bei 1280 Pixel Ausgangsbreite; zusätzlich 200 Prozent Textvergrößerung, lange Überschriften und fehlende Vorschaubilder/Metadaten.
- Die geöffnete Suche mit 200 Prozent Textgröße, bedienbarem Eingabefeld und Ergebnissen ohne horizontales Überlaufen.
- Skip-Link, natürliche Tab-Reihenfolge durch Hauptinhalt und Sidebar, sichtbarer Fokus, Desktop-Untermenü, mobile Navigation, verschachtelte Suche und Fokus-Rückgabe nach einem Ansichtswechsel.
- Echte Suchergebnisse, angekündigte Fehler, Cmd/Ctrl+K, Escape und die Nutzung ohne JavaScript.
- Reduzierte Bewegung, dauerhaft sichtbare vollständige Themenliste, Pagination und Funktionsprüfungen auf Startseite, Product Lab und KI-Kategorie.
- axe mit WCAG 2 A/AA, WCAG 2.1 A/AA, WCAG 2.2 AA und Best-Practice-Regeln. In den geprüften Ansichten und Dialogzuständen wurden keine Verstöße gemeldet.

Der Vergleich mit dem vorherigen Build bestätigt unveränderte Seitentitel, Meta-Descriptions, Canonicals, Robots-/Open-Graph-Angaben für 704 HTML-Seiten sowie unveränderte 619 Sitemap-URLs und 20 RSS-Artikel einschließlich ihrer Titel, Ziele und Veröffentlichungsdaten. Der Archivvalidator prüft zusätzlich Vollständigkeit, Reihenfolge, Seitenübergänge, Überschriftenhierarchie, gültige Zeitangaben und fehlende verschachtelte Steuerelemente.

## Ergebnisse vom 18. Oktober 2026

- `npm run build`: erfolgreich, einschließlich aller sieben Node-Tests, Pagefind-Erstellung und Website-QA. 707 HTML-Dateien, 70.345 lokale Verweise, 1.056 JSON-LD-Blöcke und keine kaputten lokalen Verweise.
- `npm run test:browser`: 18 Tests bestanden; 14 axe-Prüfungen ohne gemeldete Verstöße. Keine JavaScript-Seitenfehler in den getesteten Zuständen.
- Lighthouse 13.5.0, lokaler Produktionsbuild in Chromium, kalter Cache, Brotli, unveränderte Standardprofile für Mobile beziehungsweise Desktop, bestehende Analytics-/Anzeigenanfragen blockiert:

| Profil | Performance | Accessibility | FCP | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile | 98 | 100 | 1,6 s | 2,3 s | 0,031 |
| Desktop | 100 | 100 | 0,4 s | 0,5 s | 0,015 |

Das sind lokale Labormessungen mit den genannten Bedingungen, keine Messungen des veröffentlichten Angebots oder realer Besuche. Lighthouse meldete in beiden Läufen keine Laufzeitwarnungen.

Die Nachrichtendichte wurde mit dem vorherigen Build verglichen: Bei 1.000 Pixel hoher Ansicht beginnen im Hauptinhalt auf Desktop (1.440 Pixel Breite) jetzt vier statt zwei Artikelüberschriften im sichtbaren Bereich. Mobil (390 Pixel) beginnt wie zuvor eine Überschrift im sichtbaren Bereich; die zusätzlichen Kategorie-Tags und das OJ-Schriftbild benötigen mehr Platz. Sidebar-Überschriften wurden dabei nicht mitgezählt. Der Vergleich zählt den Beginn einer Überschrift, nicht vollständig sichtbare Artikel.

Die finalen Ansichten wurden visuell geprüft: [Desktop](qa/blog-newsroom/desktop.png) und [Mobile](qa/blog-newsroom/mobile.png). Weitere Ansichten mit heller/dunkler Systempräferenz sowie Tablet-, Reflow- und Suchansichten entstehen unter dem ignorierten Verzeichnis `test-results/blog-newsroom/` bei jedem Browserlauf.

## Grenzen und Screenreader-Checkliste

Chromium wurde automatisiert und anhand von Screenshots geprüft. Tatsächliche VoiceOver-/NVDA-Sitzungen und separate Safari-/Firefox-Läufe wurden nicht ausgeführt. Die Zoomprüfung nutzt Textvergrößerung und einen äquivalenten CSS-Reflow-Viewport, nicht die Zoomoberfläche eines Browsers. Automatisierte Tests belegen keine vollständige WCAG-Konformität.

Vor einer ergänzenden VoiceOver-/NVDA-Abnahme:

- Mit dem Screenreader nach Landmarken und Überschriften navigieren: ein H1, danach nachvollziehbare Abschnitte; Sidebar nach den Nachrichten.
- Den ersten Skip-Link aktivieren und den Fokus im Hauptinhalt bestätigen.
- Desktop-Untermenü und mobile Hauptnavigation öffnen, in beide Richtungen tabben, mit Escape schließen und die Fokus-Rückgabe bestätigen.
- Suche über Auslöser und Cmd/Ctrl+K öffnen; Namen des Suchfelds, Ergebnis-/Fehlermeldungen, Escape und Fokus-Rückgabe anhören. Auch die Suche über einem geöffneten mobilen Menü prüfen.
- Artikeltitel vollständig als Link vorlesen lassen; dekorative Vorschaubilder sollen nicht zusätzlich angesagt werden. Die bis zu drei zusätzlichen Kategorie-Links müssen als eigene Ziele verständlich sein.
- In der Pagination aktuelle Seite und vorherige/nächste Seite prüfen. Alle Themen müssen ohne Aufklappen erreichbar sein, einschließlich YouTube-Videos, Shorts und Ticker.
- 200 Prozent Textvergrößerung und schmalen Reflow zusätzlich mit dem jeweiligen Browser und Betriebssystem ausprobieren.
