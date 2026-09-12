# Sass-to-CSS-Migration

## Ausgangszustand

Die Website erzeugte `/assets/css/main.css` aus `assets/css/main.scss` und 179 SCSS-Dateien unter `_sass/`. Jekylls Sass-Converter kompilierte dabei drei Bereiche:

- ausgewählte Bootstrap-Quellen für Container, Grid und Utilities
- Font Awesome Free 6.1.1
- Zerostatic-, Theme-, Seiten- und Projekt-Styles

Die eigenen Styles nutzten vor allem verschachtelte Selektoren, die Bootstrap-Mixins `media-breakpoint-up` und `media-breakpoint-down`, direkte Sass-Variablen sowie wenige vorberechnete Abstände. Nur `knotenwerk.scss` enthielt zwei lokale Mixins. Projektweite `@extend`- oder Placeholder-Abhängigkeiten gab es nicht.

Vor der Migration wurde die von Jekyll aus Sass erzeugte, noch nicht durch PurgeCSS reduzierte `main.css` als funktionale Referenz gesichert. Ein automatischer Vergleich bestätigte anschließend 17.211 geordnete Deklarationen gegen diese Sass-Baseline.

## Neue CSS-Architektur

`assets/css/main.css` ist jetzt ein Jekyll- und Liquid-fähiger nativer CSS-Einstiegspunkt. Er definiert die Design Tokens und fügt die modularen Dateien aus `assets/css/_native/` mit `include_relative` beim normalen Jekyll-Build zusammen. Im Browser wird weiterhin genau ein Stylesheet unter der bisherigen URL `/assets/css/main.css` geladen.

```text
assets/css/
├── main.css
└── _native/
    ├── vendor/
    │   ├── bootstrap.css
    │   └── fontawesome.css
    ├── framework/
    │   ├── root.css
    │   ├── zerostatic/
    │   └── selfmade/
    └── theme/
        ├── cards/
        ├── components/
        └── pages/
```

Das Verzeichnis beginnt mit einem Unterstrich und wird deshalb nicht als zusätzliche öffentliche Asset-Struktur ausgegeben. Die Dateien bleiben als wartbare Module erhalten, während Jekyll daraus eine zusammenhängende `main.css` erzeugt. Es gibt keine zusätzlichen render-blockierenden Stylesheets.

Die früher vorhandenen, aber nicht importierten Module `consulting.scss` und `contacts.scss` wurden ebenfalls nach `assets/css/_native/framework/selfmade/` übertragen. Sie bleiben wie zuvor vom öffentlichen Stylesheet ausgeschlossen, damit die Migration kein bisher inaktives Styling aktiviert.

## Design Tokens

Die über `_config.yml` gepflegten Farben und Schriften werden weiterhin beim Jekyll-Build durch Liquid eingesetzt. `assets/css/main.css` stellt dafür getrennte `--color-light-*`- und `--color-dark-*`-Paletten sowie die bereits verwendeten semantischen `--color-*`-Variablen bereit. Die gemeinsame Website-Shell verwendet wie vor der Migration die dunkle Palette; Seiten mit eigenen Farbsystemen, etwa SQLite Hub, behalten ihre lokalen Custom Properties.

Die Font-Familien liegen in `--font-heading`, `--font-base`, `--font-monospace` und `--font-logo`. Bestehende Werte für Radius, Card-Padding und große Absatzschrift wurden ebenfalls als Custom Properties übernommen. Breakpoints bleiben als feste Media-Query-Grenzen erhalten, weil CSS Custom Properties in Media-Query-Bedingungen nicht ausgewertet werden.

## Ersetzte Sass-Funktionen

- Sass-Farb- und Font-Variablen wurden durch Liquid-gespeiste CSS Custom Properties ersetzt.
- Die aktiven hellen und dunklen Farbwerte aus `_config.yml` liegen als zentrale Palette-Tokens vor. Die bisher aktive dunkle Shell bleibt unverändert.
- Font-Familien verwenden `--font-heading`, `--font-base`, `--font-monospace` und `--font-logo`.
- Wiederkehrende bestehende Werte für Radius, Card-Padding und große Absatzschrift sind ebenfalls Tokens.
- Sass-Verschachtelung wurde in normale native Selektoren aufgelöst.
- Bootstrap-Breakpoint-Mixins wurden zu statischen Media Queries mit den bisherigen Breakpoints 576, 768, 992 und 1360 Pixeln.
- Die lokalen Knotenwerk-Mixins wurden in die jeweiligen Deklarationen aufgelöst.
- Sass-Berechnungen und Maps wurden einmalig in ihre bisherigen CSS-Ergebnisse überführt.

## Bootstrap

Bootstrap bleibt als Vendor-Verhalten erhalten, wird aber nicht mehr aus Sass kompiliert. `assets/css/_native/vendor/bootstrap.css` enthält nur die zuvor aktiven Container-, Grid- und Utility-Regeln einschließlich der projektspezifischen Spacing- und Background-Utilities. Zusätzliche Bootstrap-Komponenten wurden nicht aufgenommen und Bootstrap wurde nicht aktualisiert.

## Font Awesome

Font Awesome Free 6.1.1 liegt als statisches Vendor-CSS unter `assets/css/_native/vendor/fontawesome.css`. Die bestehenden lokalen Webfonts und relativen URLs unter `assets/fonts/font-awesome/webfonts` bleiben erhalten. Es wurde kein CDN ergänzt.

## Verbleibende Vendor-Abhängigkeiten

Im ausgelieferten Stylesheet bleiben nur die zuvor aktiven, statischen CSS-Regeln aus Bootstrap sowie Font Awesome Free 6.1.1 erhalten. Beide werden lokal eingebunden und benötigen weder Sass noch zusätzliche Browser-Requests. Jekyll selbst bringt weiterhin `jekyll-sass-converter` transitiv mit; das Projekt ruft ihn nicht mehr auf.

## Entfernte Dateien und Abhängigkeiten

- `assets/css/main.scss` wurde durch `assets/css/main.css` ersetzt.
- `_sass/` wurde vollständig entfernt.
- Die `sass:`-Konfiguration wurde aus `_config.yml` entfernt.
- Das Projekt hatte keine direkte Sass-Abhängigkeit in `Gemfile` oder `package.json`.

`jekyll-sass-converter` und `sass-embedded` bleiben als transitive Abhängigkeiten von Jekyll in `Gemfile.lock`. Sie werden von dieser Website nicht mehr für den Stylesheet-Build verwendet. Jekyll wurde dafür weder gepatcht noch geforkt.

## Build-Prozess

Vorher:

```text
Liquid in main.scss → Jekyll Sass → main.css → Bild-Pipeline → PurgeCSS → Pagefind
```

Nachher:

```text
Liquid + include_relative in main.css → Jekyll → main.css → Bild-Pipeline → PurgeCSS → Pagefind
```

Die vorhandenen Befehle bleiben gültig:

```sh
bundle exec jekyll build
npm run build
npm run purge
```

## Validierung

- Jekyll-Build ohne Sass-Warnungen
- deklarationsgenauer Vergleich von 17.211 geordneten CSS-Deklarationen gegen die Sass-Baseline
- Image-Loading-Prüfung für 609 HTML-Dateien, PurgeCSS mit bestehender Safelist und Pagefind-Index für 580 Seiten
- Font-Awesome-Fontdateien und Icon-Regeln
- Bootstrap Container, Grid und responsive Utilities
- Homepage `/` auf Desktop und Mobile
- aktueller Blogartikel `/blog/2026-09-12-khosla-ventures-eroeffnet-erstes-buero-in-new-york/` auf Desktop und Mobile
- Kategorie `/category/ki/` auf Desktop und Mobile
- `/platform-intelligence/` auf Desktop und Mobile
- `/sqlite-hub/` auf Desktop und Mobile
- Header, Navigation, Footer, Typografie, Farben, Karten, Buttons, Grid, Hover-Regeln und responsive Breakpoints

## Bekannte Unterschiede und Restrisiken

Es sind keine beabsichtigten visuellen Unterschiede vorhanden. Die eigenen Module bestehen aus standardkonformem, flachem CSS und setzen moderne CSS Custom Properties voraus. Die statischen Vendor-Dateien müssen nur dann neu erzeugt werden, wenn Bootstrap oder Font Awesome später bewusst aktualisiert werden. Änderungen an Farben und Fonts können weiterhin über `_config.yml` erfolgen. Die Breakpoint-Werte liegen jetzt direkt in den jeweiligen Media Queries; eine spätere Änderung dieser Werte muss deshalb an den betroffenen CSS-Modulen vorgenommen werden.

Der kombinierte Befehl `npm run build` erreicht den nativen Jekyll-Build, stoppt im aktuellen Worktree aber anschließend in `scripts/responsive-images.js`, weil fünf referenzierte SQLite-Hub-Mockups fehlen: `data_1_1200.webp`, `sql_editor_3_query_export_modal_1920.webp`, `documents_2_document_insert_table_modal_1200.webp`, `charts_4_edit_query_chart_modal_1920.webp` und `structure_2_generate_types_modal_1200.webp`. Dieser bestehende Asset-Fehler ist unabhängig vom CSS-System. Der Jekyll-Build, `image-loading.js`, PurgeCSS und Pagefind wurden deshalb zusätzlich einzeln erfolgreich geprüft.
