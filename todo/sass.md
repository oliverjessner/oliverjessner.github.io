# Aufgabe: Sass vollständig auf natives CSS migrieren

Arbeite im Repository:

`oliverjessner/oliverjessner.github.io`

Ziel ist, die Website vollständig von Sass/SCSS auf modernes natives CSS zu migrieren.

Die Migration darf **keine visuelle Neugestaltung** sein.

Das bestehende Design, Layout, Spacing, Typografie, Responsive-Verhalten, Dark Mode und sämtliche Komponenten sollen sich nach der Migration möglichst identisch verhalten.

## Hauptziel

Der aktuelle Build verwendet:

- `assets/css/main.scss`
- `_sass/`
- Jekyll Sass
- Bootstrap-Sass-Quellen
- eigene SCSS-Komponenten
- Theme-SCSS
- Font-Awesome-SCSS

Nach der Migration soll die Website möglichst nur noch auf:

- Jekyll
- Liquid
- modernem nativen CSS
- CSS Custom Properties
- CSS Nesting
- bestehendem PurgeCSS

basieren.

Sass soll anschließend nicht mehr benötigt werden.

## Ganz wichtige Regeln

1. **Kein Redesign.**
2. Keine unnötigen Änderungen am HTML.
3. Keine Umbenennung bestehender CSS-Klassen, außer sie ist technisch zwingend notwendig.
4. Bestehende URLs und Permalinks dürfen nicht verändert werden.
5. JavaScript-Verhalten darf nicht verändert werden.
6. SEO-Markup darf nicht verändert werden.
7. Liquid-Templates dürfen nur angepasst werden, wenn es für die CSS-Migration notwendig ist.
8. Keine Migration zu Tailwind, Less, Stylus oder einem anderen CSS-Preprocessor.
9. Keine neue Frontend-Framework-Abhängigkeit einführen.
10. Moderne Browser dürfen vorausgesetzt werden.
11. CSS Nesting darf nativ verwendet werden.
12. CSS Custom Properties sollen Sass-Variablen ersetzen.
13. Die bestehende öffentliche Stylesheet-URL muss nach Möglichkeit erhalten bleiben:

`/assets/css/main.css`

## Phase 1: Bestehende Architektur analysieren

Bevor Änderungen vorgenommen werden, untersuche vollständig:

- `assets/css/main.scss`
- `_sass/style.scss`
- `_sass/framework/`
- `_sass/theme/`
- alle Dateien unter `_sass/framework/selfmade/`
- Bootstrap-Sass-Abhängigkeiten
- Font-Awesome-Sass-Abhängigkeiten
- `_config.yml`
- `Gemfile`
- `Gemfile.lock`
- `purgecss.config.cjs`
- alle Layouts und Includes, die `/assets/css/main.css` referenzieren

Erstelle intern eine Übersicht darüber, welche Sass-Features tatsächlich genutzt werden.

Insbesondere suchen nach:

- `$variables`
- Maps
- `@mixin`
- `@include`
- `@extend`
- `@each`
- `@for`
- `@if`
- Sass-Funktionen
- `map-get`
- `map-merge`
- `darken`
- `lighten`
- `rgba`
- String Interpolation `#{}`
- verschachtelten Selektoren
- mathematischen Sass-Ausdrücken
- Bootstrap Utility Generation

Unterscheide dabei klar zwischen:

1. Bootstrap/Vendor-Sass
2. Zerostatic/Theme-Sass
3. selbst geschriebenem SCSS

## Phase 2: CSS-Baseline sichern

Vor der Migration:

1. Website mit dem bestehenden Sass-System bauen.
2. Das daraus erzeugte:

`_site/assets/css/main.css`

als Referenz für die Migration verwenden.

Diese Datei ist die funktionale CSS-Baseline.

Nicht einfach diese kompilierte Datei als neue dauerhafte `main.css` verwenden.

Sie dient nur dazu, sicherzustellen, dass bei der Migration keine Styles verloren gehen.

## Phase 3: Design Tokens auf CSS Custom Properties migrieren

Die aktuell in `assets/css/main.scss` vorhandenen Farben und Fonts werden teilweise über Liquid aus `_config.yml` geladen.

Dieses Verhalten soll erhalten bleiben.

Beispiel:

```css
---
---

:root {
  --color-primary: {{ site.colors.primary | default: '#FF4A4A' }};
  --color-primary-2: {{ site.colors.primary_2 | default: '#efc0cc' }};
  --color-primary-text: {{ site.colors.primary_text | default: '#f9fafb' }};

  --color-base-bg: {{ site.colors.background | default: '#ffffff' }};
  --color-base-bg-2: {{ site.colors.background_2 | default: '#f9fafb' }};
  --color-base-bg-3: {{ site.colors.background_3 | default: '#f1f3f4' }};

  --color-base-text: {{ site.colors.text | default: '#111827' }};
  --color-base-text-2: {{ site.colors.text_2 | default: '#4b5563' }};

  --font-heading: {{ site.fonts.heading }}, -apple-system, serif;
  --font-base: {{ site.fonts.base }}, -apple-system, "Helvetica Neue", Arial, sans-serif;
}
```

Bestehende Dark-Mode-Werte ebenfalls als CSS Custom Properties abbilden.

Bestehende Semantik und Werte nicht unnötig verändern.

Wenn sinnvoll, zusätzliche zentrale Tokens definieren für:

- Containerbreiten
- Spacing
- Border Radius
- Shadows
- Typografie
- Breakpoints bzw. wiederkehrende Layoutwerte

Aber nur dann, wenn dadurch keine visuelle Änderung entsteht.

## Phase 4: Eigenes SCSS auf natives CSS migrieren

Migriere sämtliche selbst geschriebenen Styles aus:

`_sass/framework/selfmade/`

sowie:

`_sass/theme/`

auf natives CSS.

Bevorzuge:

### CSS Custom Properties

statt:

```scss
$primary
```

verwenden:

```css
var(--color-primary)
```

### Native CSS Nesting

Beispiel:

```css
.page {
    .wrapper {
        flex: 1;
    }
}
```

ist erlaubt.

### calc()

Sass-Berechnungen möglichst durch natives `calc()` ersetzen.

### color-mix()

Wo Sass nur zur Farbmanipulation verwendet wurde, kann gegebenenfalls modernes:

```css
color-mix()
```

verwendet werden.

Aber nur, wenn das resultierende Erscheinungsbild gleich bleibt.

Wenn exakte Farbwerte einfacher und sicherer sind, verwende diese.

## Phase 5: Bootstrap aus Sass entkoppeln

Bootstrap darf in dieser Migration zunächst bestehen bleiben.

ABER:

Bootstrap soll nicht mehr aus Sass-Quellen kompiliert werden.

Aktuell werden unter anderem verwendet:

- functions
- variables
- maps
- mixins
- utilities
- containers
- grid
- utilities API

Erzeuge für die tatsächlich benötigten Bootstrap-Funktionen ein statisches CSS-Vendor-Stylesheet.

Beispielsweise:

`assets/css/vendor/bootstrap.css`

oder:

`assets/css/vendor/bootstrap-grid.css`

Dabei muss das aktuell verwendete Bootstrap-Verhalten erhalten bleiben.

Keine zusätzlichen Bootstrap-Komponenten aufnehmen, die bisher nicht verwendet wurden.

Bootstrap in dieser Aufgabe **nicht vollständig neu implementieren**, falls dadurch unnötiges Risiko entsteht.

Das langfristige Entfernen von Bootstrap ist ausdrücklich **nicht Teil dieser Migration**.

## Phase 6: Font Awesome entkoppeln

Font Awesome wird aktuell ebenfalls über Sass eingebunden.

Portiere das auf eine statische CSS-Vendor-Datei oder die bereits vorhandenen Font-Awesome-CSS-Ressourcen.

Die bestehenden Fonts und Icons müssen weiterhin funktionieren.

Keine externe CDN-Abhängigkeit hinzufügen.

## Phase 7: Neue CSS-Struktur

Organisiere das CSS nachvollziehbar.

Eine mögliche Zielstruktur:

```text
assets/css/
├── main.css
├── base/
│   ├── reset.css
│   ├── typography.css
│   ├── layout.css
│   └── variables.css
├── components/
├── pages/
├── projects/
└── vendor/
    ├── bootstrap.css
    └── fontawesome.css
```

Die konkrete Struktur darf angepasst werden, wenn die bestehende Architektur eine sinnvollere Aufteilung nahelegt.

Wichtig:

Keine riesige monolithische CSS-Datei im Source erstellen, wenn sich die bestehenden Module sinnvoll erhalten lassen.

## Phase 8: CSS Loading

Die Website soll weiterhin primär:

`/assets/css/main.css`

laden.

Vermeide zusätzliche render-blocking Stylesheets, wenn es nicht notwendig ist.

Falls Source-Dateien mittels CSS `@import` zusammengeführt werden, stelle sicher, dass dies für die bestehende Deployment-Architektur sinnvoll ist.

Wenn ein sehr kleiner Build-Schritt ohne Sass die technisch bessere Lösung ist, darf dieser verwendet werden.

Aber:

- kein Sass
- kein neues komplexes Bundler-System
- kein Webpack
- kein Vite nur für CSS
- keine unnötige Node-Build-Pipeline

Bevorzuge maximale Einfachheit.

## Phase 9: Sass vollständig entfernen

Wenn die Migration erfolgreich ist:

- `assets/css/main.scss` entfernen
- `_sass/` entfernen, sofern dort keine noch benötigten Dateien liegen
- Sass-Konfiguration aus `_config.yml` entfernen
- direkte Sass-Abhängigkeiten entfernen

Prüfe dabei `Gemfile` und `Gemfile.lock`.

Wichtig:

Falls `jekyll-sass-converter` lediglich transitive Abhängigkeit von Jekyll ist, nicht versuchen, Jekyll selbst zu patchen oder zu forken.

Entscheidend ist:

Die Website darf selbst keinen Sass-Build mehr benötigen.

## Phase 10: PurgeCSS prüfen

Das bestehende:

`purgecss.config.cjs`

muss weiterhin funktionieren.

Insbesondere:

`_site/assets/css/main.css`

muss weiterhin erzeugt beziehungsweise verarbeitet werden.

Prüfe außerdem die Safelist und dynamisch gesetzte Klassen.

Keine Klassen entfernen, die JavaScript zur Laufzeit verwendet.

## Phase 11: Visuelle Regression prüfen

Nach der Migration die Website lokal bauen.

Vergleiche vor allem:

### Homepage

`/`

### Einen repräsentativen Blogartikel

Nur **einen** Blogartikel testen.

Wähle einen normalen, aktuellen Artikel mit typischen Elementen wie:

- Überschriften
- Fließtext
- Links
- Bilder
- Listen
- Code oder Zitate, falls vorhanden

Nicht dutzende Artikel einzeln prüfen.

### Category Page

Eine repräsentative:

`/category/.../`

### Eine komplexe Landingpage

Beispielsweise:

`/platform-intelligence/`

### Ein Side Project

Beispielsweise die SQLite-Hub-Seite.

Prüfe jeweils mindestens:

- Desktop
- Mobile
- Header
- Navigation
- Footer
- Containerbreiten
- Typography
- Farben
- Cards
- Buttons
- Grid
- Margins
- Padding
- Dark Mode
- Hover States
- Responsive Breakpoints

Wenn Screenshot- oder Browser-Automation verfügbar ist, nutze sie.

## Akzeptanzkriterien

Die Aufgabe ist erst abgeschlossen, wenn:

1. `jekyll build` erfolgreich läuft.
2. Sass nicht mehr als eigener Build-Schritt benötigt wird.
3. `_site/assets/css/main.css` korrekt erzeugt wird.
4. Bestehende Layouts weiterhin `/assets/css/main.css` verwenden können.
5. PurgeCSS weiterhin funktioniert.
6. Font Awesome funktioniert.
7. Bootstrap Grid/Utilities, soweit verwendet, funktionieren.
8. Dark Mode funktioniert.
9. Homepage funktioniert.
10. Ein Blogartikel funktioniert.
11. Eine Kategorie funktioniert.
12. Platform-Intelligence beziehungsweise eine vergleichbar komplexe Landingpage funktioniert.
13. Ein Side Project funktioniert.
14. Mobile Layout funktioniert.
15. Keine offensichtlichen visuellen Regressionen vorhanden sind.

## Nicht tun

Nicht:

- Tailwind einführen
- Bootstrap upgraden
- Bootstrap komplett entfernen
- HTML großflächig refactoren
- Klassen umbenennen
- Design modernisieren
- Komponenten neu gestalten
- Farben verändern
- Spacing vereinheitlichen, wenn dies das aktuelle Design sichtbar verändert
- Fonts austauschen
- JavaScript refactoren
- SEO-Markup ändern
- Inhalte verändern
- Blogartikel verändern
- nebenbei technische Schulden außerhalb des CSS-Systems beheben

Scope strikt auf:

**Sass → Native CSS**

begrenzen.

## Abschließende Dokumentation

Erstelle nach Abschluss:

`CSS-MIGRATION.md`

mit:

- Ausgangszustand
- neue CSS-Architektur
- welche Sass-Funktionen ersetzt wurden
- Umgang mit Bootstrap
- Umgang mit Font Awesome
- Design Tokens
- entfernte Dateien
- verbleibende Vendor-Abhängigkeiten
- Build-Prozess vorher/nachher
- getestete Seiten
- bekannte Unterschiede oder Restrisiken

Wenn während der Migration Probleme auftreten, bevorzuge immer die Lösung mit dem geringsten Risiko für bestehendes Verhalten.

Das wichtigste Ziel lautet:

**Gleiches Frontend, gleiche öffentliche CSS-URL, gleiche Funktionalität, aber kein Sass mehr.**
