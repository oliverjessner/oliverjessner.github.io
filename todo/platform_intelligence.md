Du arbeitest im Repository von **oliverjessner.at**.

Ziel ist eine gezielte Design-Überarbeitung der Seite:

https://oliverjessner.at/platform-intelligence/

## Aufgabe

Überarbeite **ausschließlich die Case-Study-Sektion** der Platform-Intelligence-Landingpage.

Die bisherigen Case Studies sollen visuell stärker wie **Evidence Cards / Research Cards** wirken und weniger wie normale Content-Cards.

Die zentrale Designidee:

> Nicht die Beschreibung der Case Study soll visuell dominieren, sondern die Daten und Ergebnisse.

Die Cards sollen vermitteln:

**großer Datensatz → Analyse → konkrete Erkenntnis**

## Designrichtung

Orientiere dich visuell eher an:

- Data Intelligence
- Research Labs
- hochwertigen Tech-Magazinen
- Bloomberg-/Financial-Times-artiger Informationshierarchie
- modernen Consulting-/Strategy-Seiten

Nicht an:

- typischen SaaS-Feature-Cards
- bunten Dashboards
- Glassmorphism
- starken Gradients
- generischen KI-Landingpages
- übermäßig vielen Icons

Die bestehende Designsprache von oliverjessner.at muss erhalten bleiben.

## Neue Informationshierarchie

Jede Case Study soll ungefähr nach diesem Prinzip aufgebaut sein:

```text
STEAM AI CENSUS

2.803
analysierte Spiele

41,7 %
mit AI Disclosure

Kurze Beschreibung der Untersuchung.

Scraping   Classification   Validation

Case Study ansehen →
```

Die große Zahl bzw. das wichtigste Ergebnis ist das dominante Element.

## Wichtige Kennzahlen

Nutze die bereits auf der Seite vorhandenen Daten und Inhalte.

Beispiele für Kennzahlen, die visuell hervorgehoben werden können:

- Steam AI Census: 2.803 analysierte Spiele
- AI Disclosure: 41,7 %
- FragDenStaat: ca. 5.000 analysierte PDFs
- AfD TikTok: 357 analysierte Videos
- WhatsApp Channels: 5.727 analysierte Inhalte

Keine neuen Zahlen erfinden.

Wenn bei einer Case Study mehrere Kennzahlen vorhanden sind, wähle:

1. eine dominante Hauptkennzahl
2. optional eine kleinere sekundäre Kennzahl

## Layout

Desktop:

- grundsätzlich 2-spaltiges Grid
- Cards dürfen unterschiedliche visuelle Gewichtung besitzen
- eine besonders starke Case Study darf als `featured` über zwei Spalten laufen
- dennoch soll das Grid ruhig und strukturiert bleiben

Tablet:

- wenn sinnvoll weiterhin zwei Spalten
- ansonsten früh genug auf eine Spalte wechseln

Mobile:

- eine Spalte
- keine horizontalen Overflows
- Kennzahlen müssen weiterhin klar dominieren
- ausreichende Abstände
- gute Touch-Ziele

## Card-Aufbau

Jede Card sollte möglichst folgende Ebenen besitzen:

1. kleines Label / Kategorie
2. Titel
3. dominante Kennzahl
4. kurze Erklärung der Kennzahl
5. optional sekundäre Kennzahl
6. kurze Beschreibung der Recherche
7. Methoden-Tags
8. Link / CTA

Die Beschreibung soll nicht den Großteil der Karte einnehmen.

## Methoden-Tags

Die aktuellen Methoden-Tags nehmen teilweise zu viel Raum ein.

Ändere das Verhalten:

- maximal 3 sichtbare Tags
- wenn weitere Methoden vorhanden sind, zeige beispielsweise:

`+4 Methoden`

Alternativ darf eine ähnlich reduzierte Darstellung gewählt werden, sofern sie zur bestehenden Designsprache passt.

Die Tags sollen sekundär sein und nicht mit den Kennzahlen konkurrieren.

## Typografie

Die Zahlen sind das stärkste visuelle Element.

Nutze deshalb eine deutliche typografische Hierarchie:

- kleine Kategorie
- normaler Card-Titel
- sehr große Kennzahl
- kleine erklärende Caption
- kompakter Beschreibungstext
- dezente Metadaten

Die Zahl darf deutlich größer als der Titel sein.

Beispiel:

```text
2.803
SPIELE ANALYSIERT
```

oder

```text
41,7 %
AI DISCLOSURE
```

Aber keine aggressive Marketing-Typografie.

## Featured Case

Prüfe, welche Case Study sich als Haupt-Case am besten eignet.

Vermutlich:

**Steam AI Census**

Diese darf auf Desktop visuell stärker hervorgehoben werden, beispielsweise:

- doppelte Breite
- größere Kennzahl
- zwei nebeneinanderstehende Kennzahlen
- etwas mehr Padding

Keine große Hero-Sektion daraus machen.

## Visual Details

Erlaubt:

- dünne Borders
- dezente Hintergrundabstufungen
- kleine Monospace-Labels
- subtile Hover-Effekte
- klare Grid-Linien
- viel Negative Space
- leichte Unterschiede zwischen normaler und Featured Card

Vermeiden:

- starke Schatten
- starke Animationen
- große Farbflächen
- Neonfarben
- Verläufe
- 3D-Effekte
- unnötige Icons

## Hover

Falls Cards klickbar sind, füge einen sehr subtilen Hover-State hinzu.

Zum Beispiel:

- minimale Border-Veränderung
- minimale Hintergrundveränderung
- CTA-Pfeil bewegt sich wenige Pixel

Keine `transform: scale(...)`-Effekte.

Beachte `prefers-reduced-motion`.

## Wichtig

Ändere **nur die Case-Study-Sektion**.

Nicht verändern:

- Hero
- Navigation
- Einsatzfelder
- Methodik-Sektion
- Profil
- FAQ
- Footer
- globale Typografie
- globale Farbpalette

Globale Styles nur ändern, wenn es technisch unbedingt notwendig ist.

Neue Styles nach Möglichkeit lokal auf die Platform-Intelligence-Seite bzw. Case-Study-Komponenten begrenzen.

## Bestehende Architektur respektieren

Analysiere zuerst:

- vorhandenes HTML/Liquid
- vorhandene SCSS/CSS-Struktur
- bestehende Design Tokens / CSS Variables
- Breakpoints
- bestehende Card-Komponenten

Nutze vorhandene Variablen und Patterns, statt parallele Designsysteme einzuführen.

Keine unnötigen Dependencies hinzufügen.

Kein JavaScript hinzufügen, sofern es für diese Änderung nicht zwingend erforderlich ist.

## Inhalt

Bestehende Case-Study-Inhalte und Links müssen erhalten bleiben.

Du darfst:

- Informationen innerhalb einer Card neu anordnen
- lange Texte leicht kürzen, sofern keine inhaltliche Aussage verloren geht
- Kennzahlen aus bestehendem Content prominenter darstellen
- Labels vereinheitlichen

Du darfst nicht:

- neue Fakten erfinden
- Zahlen verändern
- Case Studies entfernen
- Links entfernen

## Accessibility

Beachte:

- ausreichenden Farbkontrast
- sinnvolle Heading-Struktur
- sichtbare Focus-States
- semantische Links
- keine Information ausschließlich durch Farbe
- `prefers-reduced-motion`

## Vorgehen

1. Finde die Implementierung von `/platform-intelligence/`.
2. Analysiere die aktuelle Case-Study-Struktur und ihre Styles.
3. Identifiziere die bestehenden Kennzahlen der einzelnen Cases.
4. Entwickle daraus das Evidence-Card-Layout.
5. Implementiere die Änderungen.
6. Prüfe Desktop, Tablet und Mobile.
7. Prüfe, dass keine anderen Seiten oder Sektionen unbeabsichtigt verändert wurden.

## Akzeptanzkriterien

Die Arbeit ist fertig, wenn:

- die Case Studies klar datengetriebener wirken
- die wichtigsten Kennzahlen sofort erfassbar sind
- das Grid hochwertiger und weniger wie Standard-Cards aussieht
- eine klare Informationshierarchie vorhanden ist
- maximal drei Methoden-Tags pro Card dominieren
- Mobile sauber funktioniert
- bestehende Inhalte und Links erhalten bleiben
- keine unnötigen Dependencies oder JavaScript eingeführt wurden
- andere Bereiche der Website visuell unverändert bleiben

Am Ende:

1. liste die geänderten Dateien auf
2. beschreibe kurz die Designentscheidung
3. nenne mögliche technische Risiken
4. führe vorhandene relevante Tests/Builds aus
5. ändere darüber hinaus nichts
