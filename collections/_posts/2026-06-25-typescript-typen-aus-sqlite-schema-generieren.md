---
layout: post
title: 'TypeScript-Typen aus SQLite-Schema generieren'
date: 2026-06-25 10:30:48 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - in-eigener-sache
    - web-development
    - sqlite-hub
description: 'SQLite Hub erzeugt aus einem SQLite-Schema TypeScript-, Kotlin-, Swift- und Rust-Typen lokal per Oberfläche oder CLI'
thumbnail: '/assets/images/gen/blog/typescript-typen-aus-sqlite-schema-generieren/header_thumbnail.webp'
image: '/assets/images/gen/blog/typescript-typen-aus-sqlite-schema-generieren/header.webp'
faq:
    - question: 'Wie kann ich TypeScript-Typen aus einem SQLite-Schema generieren?'
      answer: 'SQLite Hub liest die Tabellenstruktur einer lokalen SQLite-Datenbank und erzeugt daraus TypeScript-Interfaces. Dabei werden Spaltentypen, NULL-Werte und Namenskonventionen berücksichtigt.'
    - question: 'Welche Programmiersprachen unterstützt der Typgenerator von SQLite Hub?'
      answer: 'SQLite Hub kann aus einem SQLite-Schema Typdefinitionen für TypeScript, Kotlin, Swift und Rust generieren.'
    - question: 'Kann ich SQLite-Typen auch über die CLI generieren?'
      answer: 'Ja. Über die SQLite-Hub-CLI lassen sich Tabelle, Zielsprache, Benennung und Ausgabeformat festlegen. Der generierte Code kann im Terminal erscheinen oder direkt in eine Datei geschrieben werden.'
socialmedia:
    - 'TypeScript-Typen aus einem SQLite-Schema generieren: SQLite Hub übersetzt Tabellen lokal in TypeScript, Kotlin, Swift oder Rust. Im Beitrag zeige ich die Oberfläche, CLI und Grenzen der Funktion.'
    - 'SQLite-Schema statt doppelter Modellpflege: SQLite Hub erzeugt daraus Interfaces, Structs und Datenklassen für TypeScript, Rust, Kotlin und Swift.'
    - 'Mit SQLite Hub lassen sich Anwendungstypen direkt aus einer SQLite-Tabelle generieren. Das funktioniert lokal über die Oberfläche oder automatisiert über die CLI.'
---

TypeScript-Typen aus einem SQLite-Schema lassen sich mit SQLite Hub direkt aus der Tabellenstruktur generieren. Neben TypeScript unterstützt der lokale Datenbankmanager auch Kotlin, Swift und Rust.

## Warum TypeScript-Typen aus einem SQLite-Schema generieren?

Eine SQLite-Datenbank enthält bereits viele Informationen, die eine Anwendung über ihre Daten wissen muss. Das Schema beschreibt Tabellen, Spalten, Datentypen, Primärschlüssel, Standardwerte und Nullbarkeit.

Im Anwendungscode werden dieselben Strukturen dennoch häufig ein zweites Mal definiert. Für eine Tabelle entsteht ein TypeScript-Interface, eine Kotlin-Datenklasse, ein Swift-Struct oder ein Rust-Struct. Ändert sich das Schema, müssen diese Definitionen ebenfalls angepasst werden.

Diese doppelte Pflege kostet Zeit und kann zu Abweichungen führen. Eine neue Spalte wird in der Datenbank ergänzt, fehlt aber im Interface. Eine bisher verpflichtende Spalte erlaubt plötzlich `NULL`, während der Anwendungscode weiterhin von einem vorhandenen Wert ausgeht.

Deshalb habe ich in [SQLite Hub](https://oliverjessner.at/sqlite-hub/) einen Typgenerator eingebaut. Er liest das Schema einer ausgewählten SQLite-Tabelle und übersetzt es in eine passende Typdefinition für TypeScript, Kotlin, Swift oder Rust.

![SQLite Hub generiert TypeScript-Typen aus dem Schema einer SQLite-Datenbank](/assets/images/side_projects/slqlite_hub/mockups/structure_2_generate_types_modal_1200.webp)

Die Datenbank bleibt dabei die zentrale Quelle. SQLite Hub führt keine zusätzliche Modelldatei ein und setzt kein ORM voraus.

## SQLite-Schema in Anwendungstypen übersetzen

Als Beispiel dient eine einfache Tabelle für Benutzerkonten:

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL,
    display_name TEXT,
    active INTEGER NOT NULL DEFAULT 1,
    created_at INTEGER NOT NULL
);
```

Aus dem Schema lassen sich mehrere Eigenschaften ableiten:

- `id` ist ein ganzzahliger Primärschlüssel.
- `email` darf nicht `NULL` sein.
- `display_name` kann `NULL` enthalten.
- `active` ist als Integer gespeichert und besitzt einen Standardwert.
- `created_at` wird ebenfalls als Integer gespeichert.

Für TypeScript kann SQLite Hub daraus eine Definition wie diese erzeugen:

```typescript
export interface User {
    id: number;
    email: string;
    displayName: string | null;
    active: number;
    createdAt: number;
}
```

Damit muss die Tabellenstruktur nicht vollständig von Hand in den Anwendungscode übertragen werden. Die genaue Ausgabe hängt von den gewählten Einstellungen ab. Unter anderem lässt sich festlegen, wie Spaltennamen umgewandelt und nullable Werte dargestellt werden.

## TypeScript-Typen mit SQLite Hub generieren

In der grafischen Oberfläche von SQLite Hub befindet sich die Typgenerierung im Structure-Bereich. Dort kann ich entweder eine einzelne Tabelle auswählen oder für alle Tabellen der Datenbank separate Typdefinitionen erzeugen.

SQLite Hub analysiert anschließend das aktuell vorhandene Tabellenschema. Eine zusätzliche Konfiguration oder Modelldatei ist dafür nicht erforderlich.

Das war mir bei der Entwicklung wichtig. Wer gerade eine Tabelle, ihre Spalten oder ihre DDL-Anweisung untersucht, soll an derselben Stelle auch die passende Typdefinition erzeugen können.

Die Funktion arbeitet vollständig lokal. Die SQLite-Datei wird nicht an einen externen Dienst übertragen. Auch die generierten Typen entstehen auf dem eigenen Rechner.

## SQLite-Datentypen und ihre Anwendungstypen

SQLite verwendet fünf grundlegende Speicherklassen:

| SQLite-Speicherklasse | TypeScript | Kotlin       | Swift          | Rust        |
| --------------------- | ---------- | ------------ | -------------- | ----------- |
| `INTEGER`             | `number`   | `Long`       | `Int64`        | `i64`       |
| `REAL`                | `number`   | `Double`     | `Double`       | `f64`       |
| `TEXT`                | `string`   | `String`     | `String`       | `String`    |
| `BLOB`                | Binärtyp   | `ByteArray`  | `Data`         | `Vec<u8>`   |
| `NULL`                | `null`     | nullable Typ | optionaler Typ | `Option<T>` |

Die konkrete Zuordnung kann vom Schema und von den gewählten Generatoroptionen abhängen. Besonders bei Datumswerten, booleschen Werten und JSON-Inhalten gibt SQLite nicht automatisch vor, wie eine Anwendung die Daten interpretieren soll.

Ein Datum kann beispielsweise als `TEXT`, `INTEGER` oder `REAL` gespeichert sein. Ein boolescher Zustand liegt häufig als `INTEGER` mit den Werten `0` und `1` vor.

Der Typgenerator beschreibt deshalb in erster Linie das deklarierte Datenbankschema. Fachliche Bedeutungen, die nicht im Schema stehen, kann er nicht zuverlässig erraten.

## Kotlin-, Swift- und Rust-Typen aus SQLite erzeugen

SQLite Hub ist nicht auf TypeScript beschränkt. Aus demselben Schema lassen sich Typdefinitionen für Kotlin, Swift und Rust generieren.

Eine nullable Textspalte sieht in den vier Sprachen unterschiedlich aus:

```typescript
displayName: string | null;
```

```kotlin
val displayName: String?
```

```swift
let displayName: String?
```

```rust
display_name: Option<String>,
```

Die Ausgaben sollen nicht lediglich dieselbe Struktur mit einer anderen Syntax wiederholen. Stattdessen orientiert sich SQLite Hub an den Konventionen des jeweiligen Typsystems.

TypeScript verwendet beispielsweise Union Types, während Rust optionale Werte mit `Option<T>` ausdrückt. Kotlin und Swift kennzeichnen nullable Eigenschaften jeweils mit `?`.

Das ist besonders hilfreich, wenn dieselbe SQLite-Datenbank in mehreren Anwendungen verwendet wird. Eine Datenbank kann beispielsweise von einer TypeScript-Anwendung verwaltet und zusätzlich von einer Android-App in Kotlin oder einer iOS-App in Swift gelesen werden.

Statt mehrere Modelle unabhängig voneinander zu pflegen, lassen sich alle Typen aus derselben Tabellenstruktur ableiten.

## SQLite-Typen über die CLI generieren

Neben der grafischen Oberfläche unterstützt SQLite Hub die Typgenerierung über die Kommandozeile. Dadurch lässt sich die Funktion in Skripte, Entwicklungsabläufe und Build-Prozesse einbinden.

Ein TypeScript-Typ für die Tabelle `users` kann mit folgendem Befehl erzeugt werden:

```bash
sqlite-hub --database:"trump live interviews" --table:companies --types:typescript
```

Für Kotlin, Swift und Rust wird lediglich die Zielsprache geändert:

```bash
sqlite-hub --database:"trump live interviews" --table:companies --types:kotlin
sqlite-hub --database:"trump live interviews" --table:companies --types:swift
sqlite-hub --database:"trump live interviews" --table:companies --types:rust
```

Für TypeScript, Kotlin und Rust stehen zusätzlich kurze Aliase zur Verfügung:

```bash
sqlite-hub --database:"trump live interviews" --table:companies --types:ts
sqlite-hub --database:"trump live interviews" --table:companies --types:kt
sqlite-hub --database:"trump live interviews" --table:companies --types:rs
```

Ohne eine zusätzliche Ausgabeoption schreibt die CLI den generierten Quellcode nach `stdout`. Dadurch kann das Ergebnis mit einer klassischen Shell-Weiterleitung in eine Datei geschrieben werden:

```bash
sqlite-hub --database:"trump live interviews" --table:companies --types:typescript > User.ts
```

Alternativ übernimmt SQLite Hub das Schreiben der Datei:

```bash
sqlite-hub \
    --database:"trump live interviews" \
    --table:companies \
    --types:typescript \
    --output:User.ts
```

Eine bereits vorhandene Datei wird nicht automatisch überschrieben. Soll das ausdrücklich passieren, kann `--force` ergänzt werden:

```bash
sqlite-hub \
    --database:"trump live interviews" \
    --table:companies \
    --types:typescript \
    --output:User.ts
    --force
```

Damit eignet sich die Funktion sowohl für einen einzelnen Export als auch für wiederholbare Abläufe in der [Webentwicklung](https://oliverjessner.at/category/web-development/).

## Namenskonventionen für generierte Typen festlegen

Datenbanken und Programmiersprachen verwenden häufig unterschiedliche Namenskonventionen.

In SQLite-Schemas sind Spaltennamen wie `display_name` und `created_at` verbreitet. In TypeScript, Kotlin und Swift wird dagegen meist `camelCase` verwendet. Rust orientiert sich üblicherweise an `snake_case`.

SQLite Hub unterstützt mehrere Strategien:

```bash
--naming:preserve
--naming:camel
--naming:pascal
--naming:snake
```

Mit `preserve` bleiben die Namen aus dem SQLite-Schema unverändert.

Die übrigen Einstellungen wandeln sie in die gewünschte Schreibweise um:

| Schema         | `camel`       | `pascal`      | `snake`        |
| -------------- | ------------- | ------------- | -------------- |
| `display_name` | `displayName` | `DisplayName` | `display_name` |
| `created_at`   | `createdAt`   | `CreatedAt`   | `created_at`   |

## NULL-Werte korrekt abbilden

Nullbarkeit ist ein wichtiger Unterschied zwischen Datenbankschema und Anwendungscode.

Eine SQLite-Spalte ohne `NOT NULL` kann den Wert `NULL` enthalten. Im erzeugten TypeScript-Typ kann daraus beispielsweise `string | null` werden.

SQLite Hub unterstützt unterschiedliche Darstellungen:

```bash
--nullable:native
--nullable:optional
```

Bei einer nativen Darstellung wird ein möglicher Datenbankwert direkt im Typ abgebildet:

```typescript
displayName: string | null;
```

Eine optionale Eigenschaft beschreibt dagegen, dass das Feld im Objekt fehlen kann:

```typescript
displayName?: string;
```

Beides ist semantisch nicht identisch. Ein vorhandenes Feld mit dem Wert `null` unterscheidet sich von einem Feld, das überhaupt nicht vorhanden ist.

Welche Variante sinnvoll ist, hängt davon ab, wie die Daten gelesen, serialisiert und innerhalb der Anwendung weitergegeben werden. Der Generator nimmt diese Entscheidung daher nicht vollständig ab, sondern stellt passende Optionen bereit.

Solche Unterschiede wirken klein, sind im [Software Engineering](https://oliverjessner.at/category/software-engineering/) aber relevant. Sie bestimmen, welche Zustände das Typsystem erlaubt und welche Fälle im Code behandelt werden müssen.

## Kommentare und Standardwerte übernehmen

Neben Spaltennamen und Datentypen kann SQLite Hub weitere Schema-Informationen in die generierte Ausgabe aufnehmen.

Mit `--comments` werden vorhandene Kommentare berücksichtigt. Standardwerte lassen sich mit `--defaults-as-comments` dokumentieren:

```bash
sqlite-hub \
    --database:Unit-00 \
    --table:users \
    --types:typescript \
    --comments \
    --defaults-as-comments
```

Das kann hilfreich sein, wenn die generierten Typen nicht nur vom Compiler verwendet werden, sondern auch als Dokumentation für Entwicklerinnen und Entwickler dienen.

Generierte und versteckte Spalten lassen sich bei Bedarf ebenfalls einbeziehen:

```bash
--include-generated
--include-hidden
```

Ob diese Spalten Teil des Anwendungstyps sein sollen, hängt vom jeweiligen Projekt ab. Nicht jede intern berechnete oder von SQLite verwaltete Spalte wird im restlichen Code benötigt.

## JSON-Spalten in TypeScript abbilden

SQLite besitzt keinen eigenständigen JSON-Speichertyp. JSON-Inhalte werden in der Regel als `TEXT` oder `BLOB` gespeichert und über die JSON-Funktionen von SQLite verarbeitet.

Für TypeScript lässt sich deshalb festlegen, wie erkannte JSON-Inhalte dargestellt werden sollen:

```bash
--json-type:unknown
--json-type:record
--json-type:json-value
```

`unknown` ist die vorsichtige Variante. Der Anwendungscode muss den Inhalt prüfen, bevor er darauf zugreift.

`record` eignet sich, wenn ein objektartiger JSON-Wert erwartet wird.

`json-value` kann verwendet werden, wenn das Projekt einen rekursiven Typ für gültige JSON-Werte besitzt.

Die Wahl hängt davon ab, wie stark die Anwendung den gespeicherten JSON-Inhalten vertraut. Daten aus externen oder veränderlichen Quellen sollten weiterhin zur Laufzeit validiert werden.

## Generierte Typen als JSON weiterverarbeiten

Die CLI kann das Ergebnis nicht nur als fertigen Quellcode ausgeben. Mit `--json` liefert SQLite Hub eine strukturierte Antwort:

```bash
sqlite-hub \
    --database:Unit-00 \
    --table:users \
    --types:typescript \
    --json
```

Diese Ausgabe eignet sich für eigene Skripte und Integrationen. Der generierte Code kann beispielsweise mit weiteren Metadaten kombiniert, in eine projektspezifische Ordnerstruktur geschrieben oder von einem anderen Werkzeug verarbeitet werden.

Damit bleibt die Typgenerierung nicht auf einen festgelegten Exportweg beschränkt. SQLite Hub stellt die aus dem Schema gewonnenen Informationen auch für automatisierte Workflows bereit.

## Warum generierte Typen keine Laufzeitvalidierung ersetzen

Ein generierter Typ beschreibt das deklarierte SQLite-Schema. Er beweist jedoch nicht, dass jeder gespeicherte Wert den Erwartungen der Anwendung entspricht.

SQLite verwendet außerhalb von `STRICT`-Tabellen ein flexibles Typsystem. Eine Spalte besitzt eine Typaffinität, erzwingt diesen Datentyp aber nicht in jeder Situation. Der tatsächliche Speicherwert kann von der Spaltendeklaration abweichen.

Details dazu beschreibt die [SQLite-Dokumentation zum Typsystem](https://www.sqlite.org/datatype3.html).

Das ist besonders bei älteren, importierten oder von mehreren Werkzeugen bearbeiteten Datenbanken relevant. Eine als `INTEGER` deklarierte Spalte kann Werte enthalten, die der Anwendungscode nicht erwartet.

Auch Datumswerte, JSON-Inhalte und boolesche Zustände benötigen häufig zusätzliche fachliche Regeln. Diese Informationen können nicht immer eindeutig aus dem Schema abgeleitet werden.

Der Typgenerator liefert deshalb eine Beschreibung der Schemaabsicht. Daten aus nicht kontrollierten Quellen sollten weiterhin geprüft werden.

## Wann sich der SQLite-Typgenerator besonders lohnt

Die Typgenerierung ist vor allem in vier Situationen hilfreich:

1. Eine bestehende SQLite-Datenbank soll in eine TypeScript-, Kotlin-, Swift- oder Rust-Anwendung eingebunden werden.
2. Nach Schemaänderungen sollen die Anwendungstypen schnell aktualisiert werden.
3. Mehrere Anwendungen oder Plattformen verwenden dieselbe SQLite-Datenbank.
4. Die Typgenerierung soll über die CLI automatisiert werden.

Der Generator ist dabei bewusst kein ORM. Er erzeugt keine eigene Abfrageschicht und verändert die Datenbank nicht.

SQLite Hub übersetzt lediglich die bereits vorhandene Tabellenstruktur in Typdefinitionen, die im Anwendungscode weiterverwendet werden können.

## SQLite-Schema nur einmal beschreiben

Mit dem Typgenerator möchte ich einen Arbeitsschritt vereinfachen, der in vielen Projekten noch manuell erledigt wird.

Das SQLite-Schema enthält bereits einen großen Teil der Informationen, die für TypeScript-Interfaces, Kotlin-Datenklassen, Swift-Structs oder Rust-Structs benötigt werden. SQLite Hub macht diese Informationen direkt nutzbar.

Die Typen lassen sich lokal in der Oberfläche generieren, über die CLI ausgeben oder direkt in Dateien schreiben. Optionen für Namenskonventionen, Nullbarkeit, Kommentare und besondere Spalten helfen dabei, die Ausgabe an das jeweilige Projekt anzupassen.

Generierter Code ersetzt keine fachlichen Entscheidungen und keine Laufzeitvalidierung. Er schafft aber einen konsistenten Ausgangspunkt und reduziert die Zahl der Stellen, an denen dieselbe Datenstruktur gepflegt werden muss.
