Überarbeite `https://oliverjessner.at/werben/` gezielt in vier Bereichen:

1. KPI-/Audience-Bereich
2. Pricing Cards
3. Social Proof
4. Themen-/Fit-Bereich

Ziel:
Die Seite soll hochwertiger, klarer und stärker wie eine professionelle Media-/Advertise-Landingpage wirken. Sie soll sich visuell stärker an `https://oliverjessner.at/platform-intelligence/` orientieren, ohne deren Layout einfach zu kopieren.

Wichtig:
Bestehendes Designsystem, Farben, Typografie, Spacing, Komponenten und vorhandene Patterns des Projekts bevorzugen. Keine unnötigen globalen Refactorings und keine neuen Dependencies.

## 1. KPI-/Audience-Bereich

Aktuell werden sinngemäß diese Werte dargestellt:

- rund 10.000
- DACH
- Tech

Ändere sie zu:

### KPI 1

`~10.000`

Label:

`Website-Views / Monat`

### KPI 2

`DACH`

Label:

`Kernmarkt`

### KPI 3

`100 % Tech`

Label:

`Thematischer Fokus`

### Counter-Animation

Die Zahl `~10.000` soll denselben bzw. einen möglichst konsistenten Counter-Effekt verwenden wie die animierten Kennzahlen auf:

`https://oliverjessner.at/platform-intelligence/`

Prüfe zuerst im bestehenden Code, wie diese Animation dort implementiert ist, und verwende vorhandene Komponenten, Klassen oder JavaScript-Logik nach Möglichkeit wieder.

Anforderungen:

- Counter startet beim Eintritt des KPI-Bereichs in den Viewport.
- Animation läuft nur einmal.
- Dauer ungefähr 700–1000 ms.
- Zielwert ist `10.000`.
- Finale Darstellung: `~10.000`.
- Deutsche Tausenderdarstellung verwenden.
- `prefers-reduced-motion` respektieren.
- Bei deaktivierten Animationen direkt `~10.000` anzeigen.
- Kein zusätzliches Framework und keine externe Library installieren.
- `DACH` und `100 % Tech` nicht animieren.
- Keine Layout Shifts verursachen.

### KPI-Design

Die drei Kennzahlen sollen klar als KPI-Stats wahrgenommen werden:

- Werte deutlich größer als Labels.
- Stärkere visuelle Hierarchie.
- Einheitliche vertikale Ausrichtung.
- Genügend Abstand zwischen Wert und Label.
- Drei gleichwertige Spalten auf Desktop.
- Saubere responsive Darstellung.
- Bestehende Farben und Spacing-Tokens verwenden.
- Keine unnötigen Schatten oder Effekte.

Ungefähr gewünschte Struktur:

```text
~10.000              DACH               100 % Tech
Website-Views        Kernmarkt          Thematischer Fokus
/ Monat
```

## 2. Pricing Cards stärker differenzieren

Die drei Pakete sollen nicht mehr wie drei nahezu identische Content-Blöcke wirken.

Ziel:
Eine klare Pricing-Hierarchie mit drei unterschiedlichen visuellen Gewichtungen.

### Paket 1

`Sponsored Article – Ready`

Preis:

`400 €`

Zusatz:

`netto`

Interne visuelle Kategorie:

`READY`

Design:

- bewusst zurückhaltend
- Standard-Card
- sauberer Border
- keine starke Hervorhebung
- soll als günstiger Einstieg wahrgenommen werden

### Paket 2

`Sponsored Article – Written by Oliver`

Preis:

`1.000 €`

Zusatz:

`netto`

Interne visuelle Kategorie:

`WRITTEN BY OLIVER`

Dieses Angebot ist das Hauptangebot und soll visuell am stärksten hervorgehoben werden.

Design:

- klar hervorgehobene Card
- Badge mit Text `Empfohlen`
- subtil stärkerer Border bzw. Accent
- darf minimal größer oder visuell prominenter als die anderen beiden sein
- keine aggressive SaaS-Pricing-Optik
- hochwertig und editorial

Besonders wichtig:

`1.000 €` muss typografisch dominant sein.

`netto` deutlich kleiner und sekundär darstellen.

Nicht beispielsweise:

```text
1.000 € netto
```

alles in gleicher Größe.

Sondern eher:

```text
1.000 €
netto
```

bzw. `netto` als kleine Inline-/Secondary-Information.

### Paket 3

`Exclusive Ad Takeover`

Preis:

`2.000 €`

Zusatz:

`netto / 30 Tage`

Interne visuelle Kategorie:

`EXCLUSIVE`

Design:

- hochwertiger und exklusiver als Card 1
- dunklerer oder kontrastreicher Stil ist erlaubt, sofern das bestehende Designsystem dafür geeignete Farben besitzt
- nicht aggressiv oder flashy
- eher Premium-/Editorial-Charakter
- klar von `READY` unterscheidbar

### Pricing allgemein

- Alle drei Cards sollen weiterhin als zusammengehörige Gruppe funktionieren.
- Gleiche Grundstruktur.
- Gleiche Card-Höhen soweit sinnvoll.
- Preise visuell stärker hervorheben.
- Inhalte und bestehende Leistungsbeschreibungen beibehalten.
- Keine inhaltlichen Leistungen erfinden.
- Buttons bzw. CTAs konsistent halten.
- Responsive Darstellung prüfen.
- Auf Mobile die Reihenfolge beibehalten.
- `Written by Oliver` soll auch mobil klar als empfohlen erkennbar bleiben.

## 3. Social Proof direkt nach Audience

Zwischen KPI-/Audience-Bereich und Pricing-Bereich soll ein dezenter Social-Proof-Bereich eingefügt werden.

Text:

`Journalistische Arbeit u. a. für`

Darunter:

`Golem · t3n · DIE ZEIT · IGN`

Ziel:
Vertrauen aufbauen, bevor die Preise gezeigt werden.

Design:

- zurückhaltend
- kein großer Logo-Wall-Look
- keine riesigen Logos
- eher typografische Darstellung
- leicht entsättigte bzw. sekundäre Textfarbe
- hochwertig und editorial
- genügend Whitespace
- nicht wie ein Sponsor-Banner gestalten

Die Publikationsnamen dürfen typografisch etwas stärker als das Intro-Label sein.

Beispielhafte visuelle Hierarchie:

```text
Journalistische Arbeit u. a. für

Golem   ·   t3n   ·   DIE ZEIT   ·   IGN
```

Bestehende Fonts verwenden.

Falls auf der Website bereits ein geeignetes Social-Proof-/Publication-Pattern existiert, dieses wiederverwenden.

Keine externen Logos oder Assets neu herunterladen.

Danach folgt wie bisher der Bereich:

`Drei Möglichkeiten für eine Zusammenarbeit`

## 4. "Was zu oliverjessner.at passt" grafischer gestalten

Der Bereich mit passenden Themen soll nicht mehr primär wie eine einfache Liste aussehen.

Stattdessen sollen die Themen als kleine Topic-Chips bzw. Tags dargestellt werden.

Verwende:

- `AI`
- `Developer Tools`
- `SaaS`
- `Hardware`
- `Platforms`
- `B2B Tech`

Design der Chips:

- kompakt
- klar lesbar
- subtiler Border oder Hintergrund
- bestehende Farben des Projekts verwenden
- kein bunter Tag-Cloud-Look
- eher technisch/editorial
- konsistente Höhe und Padding
- vernünftiges Wrapping auf kleineren Screens
- Hover-Effekt nur, wenn der Rest des Designs ähnliche Interaktionen nutzt
- keine Klickbarkeit vortäuschen, wenn die Elemente keine Links sind

Die Sektion soll insgesamt etwas grafischer und lockerer wirken, ohne visuell laut zu werden.

## Gestalterische Leitlinie

Die gesamte Seite soll nach der Überarbeitung stärker nach einer hochwertigen Tech-/Media-Landingpage aussehen.

Orientierung:

- ruhig
- viel Whitespace
- klare Typografie
- starke Zahlen
- feine Borders
- wenige, bewusst gesetzte Akzente
- keine generische SaaS-Template-Ästhetik
- keine starken Gradients, Glow-Effekte oder übertriebenen Schatten
- kein unnötiges Animation Overload

Die Änderungen sollen sich natürlich in `oliverjessner.at` einfügen.

## Scope

Bearbeite nur:

- Audience/KPI
- Social Proof
- Pricing Cards
- Themen-/Fit-Bereich

Nicht verändern:

- Navigation
- Hero-Inhalte
- FAQ
- Footer
- rechtliche Inhalte
- globale Typografie
- andere Seiten

Ausnahme:
Wenn bestehende Styles oder Funktionen sinnvoll wiederverwendbar gemacht werden müssen, darf eine kleine gemeinsame Utility oder Component extrahiert werden.

Keine großflächigen Refactorings.

## Accessibility

Sicherstellen:

- ausreichender Kontrast
- sinnvolle semantische HTML-Struktur
- keine Information ausschließlich durch Farbe kommunizieren
- `prefers-reduced-motion` berücksichtigen
- sinnvolle Heading-Hierarchie beibehalten
- keine unnötigen ARIA-Attribute hinzufügen

## Responsive prüfen

Nach Umsetzung explizit kontrollieren:

- Desktop
- Tablet
- Mobile
- sehr schmale Mobile-Viewport-Breite

Besonders prüfen:

- KPI-Wrapping
- `100 % Tech`
- Social-Proof-Zeile
- Pricing-Card-Höhen
- Badge `Empfohlen`
- Topic-Chips
- lange Preis-/Netto-Darstellung

## Technische Vorgaben

- Bestehende CSS-/Design-Tokens wiederverwenden.
- Keine neue CSS-Library.
- Keine neue JS-Library.
- Bestehenden Counter von `/platform-intelligence/` möglichst wiederverwenden.
- Keine duplizierte Counter-Implementierung, wenn bereits eine geeignete vorhanden ist.
- Bestehende Komponenten bevorzugen.
- Keine unnötigen Inline-Styles.
- Keine Magic Numbers, wenn bereits Spacing-/Typography-Variablen existieren.

## Abschluss

Nach der Umsetzung kurz berichten:

1. Welche Dateien geändert wurden.
2. Welche bestehenden Komponenten oder Styles wiederverwendet wurden.
3. Wie der Counter umgesetzt bzw. wiederverwendet wurde.
4. Welche neuen Klassen oder Komponenten hinzugekommen sind.
5. Ob responsive oder Accessibility-Probleme gefunden und behoben wurden.
6. Keine weiteren Änderungen außerhalb des definierten Scopes durchführen.
