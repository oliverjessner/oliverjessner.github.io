---
layout: post
title: 'SQLite boolean – boolesche Werte sauber speichern'
date: 2026-06-29 09:20:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - sqlite
    - terminal
description: 'SQLite Boolean-Werte richtig speichern: 0 und 1 als INTEGER nutzen, CHECK Constraint setzen, DEFAULT wählen und NULL bewusst vermeiden.'
thumbnail: '/assets/images/gen/blog/sqlite-boolean-boolesche-werte-sauber-speichern/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-boolean-boolesche-werte-sauber-speichern/header.webp'
image_width: 1200
image_height: 675
faq:
    - question: 'Wie speichere ich Boolean-Werte in SQLite?'
      answer: 'Üblich ist eine INTEGER-Spalte mit `0` für false und `1` für true.'
    - question: 'Hat SQLite einen echten Boolean-Typ?'
      answer: 'SQLite hat keine eigene Boolean-Speicherklasse. Typnamen wie `BOOLEAN` werden nach SQLite-Typaffinität behandelt.'
    - question: 'Wie verhindere ich ungültige Boolean-Werte?'
      answer: 'Nutze einen CHECK-Constraint, etwa `CHECK (enabled IN (0, 1))`.'
    - question: 'Sollte eine SQLite Boolean-Spalte NULL erlauben?'
      answer: 'Meist nicht. Nutze `NOT NULL`, wenn es nur true oder false geben soll. `NULL` solltest du nur erlauben, wenn du bewusst einen unbekannten Zustand modellierst.'
socialmedia:
    - 'SQLite boolean: Am klarsten ist oft `INTEGER NOT NULL` mit `0`, `1` und `CHECK (enabled IN (0, 1))`.'
    - 'SQLite hat keine eigene Boolean-Speicherklasse. Wer Flags speichert, sollte die Regel im Schema sichtbar machen.'
    - 'Neue SQLite-Q&A: Boolean-Werte sauber speichern, Defaults setzen und `NULL` nicht versehentlich zum dritten Zustand machen.'
---

SQLite hat keine eigene Boolean-Speicherklasse. In der Praxis speicherst du boolesche Werte deshalb meist als Integer: `0` steht für false, `1` steht für true. Damit daraus kein beliebiger Zahlenwert wird, solltest du die Regel direkt im Schema sichtbar machen.

## Warum Boolean-Werte in SQLite meist als INTEGER gespeichert werden

Ein sauberer SQLite Boolean ist in vielen Fällen eine Spalte mit `INTEGER NOT NULL`, einem sinnvollen `DEFAULT` und einem `CHECK` Constraint. So stellst du sicher, dass nur `0` oder `1` gespeichert werden können.

```sql id="j4z7rk"
enabled INTEGER NOT NULL DEFAULT 0 CHECK (enabled IN (0, 1))
```

Diese Schreibweise ist klar, robust und für Anwendungscode leicht zu verstehen. `0` bedeutet false, `1` bedeutet true. Andere Werte werden durch den `CHECK` Constraint verhindert.

Der Beitrag gehört zur SQLite-Serie [SQLite Fragen und Antworten](/blog/2026-06-29-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/). Sie sammelt kurze Lösungen für typische Fragen aus [software-development](https://oliverjessner.at/category/software-development/).

## Beispiel: Boolean-Spalte in SQLite anlegen

Eine klare Definition für ein Feature-Flag oder eine Einstellung sieht zum Beispiel so aus:

```sql
CREATE TABLE settings (
    id INTEGER PRIMARY KEY,
    key TEXT NOT NULL UNIQUE,
    enabled INTEGER NOT NULL DEFAULT 0 CHECK (enabled IN (0, 1))
);
```

Damit ist `enabled` immer gesetzt und darf nur zwei Werte enthalten:

```text
0 = false
1 = true
```

Datensätze mit ungültigen Werten wie `2`, `-1` oder `99` werden durch den `CHECK` Constraint verhindert.

## Boolean-Werte abfragen

Wenn du alle aktiven Einträge abfragen möchtest, filterst du auf `1`:

```sql
SELECT *
FROM settings
WHERE enabled = 1;
```

Für deaktivierte Einträge filterst du auf `0`:

```sql
SELECT *
FROM settings
WHERE enabled = 0;
```

Das ist einfach zu lesen und funktioniert gut mit Indexen, Filtern und Anwendungscode.

## Hat SQLite einen BOOLEAN-Typ?

SQLite akzeptiert zwar Typnamen wie `BOOLEAN`, hat aber keine eigene Boolean-Speicherklasse. SQLite arbeitet mit Speicherklassen wie `NULL`, `INTEGER`, `REAL`, `TEXT` und `BLOB`.

Du kannst also theoretisch schreiben:

```sql
CREATE TABLE settings (
    enabled BOOLEAN
);
```

Für die Praxis ist das aber oft weniger eindeutig als eine explizite Integer-Spalte mit Constraint:

```sql
enabled INTEGER NOT NULL DEFAULT 0 CHECK (enabled IN (0, 1))
```

Der Vorteil: Die Regel steht direkt im Schema. Wer die Tabelle später liest, sieht sofort, dass nur `0` und `1` erlaubt sind.

## DEFAULT bewusst setzen

Bei Boolean-Spalten solltest du den Default-Wert bewusst wählen. Für viele Flags ist `DEFAULT 0` sinnvoll, weil eine Funktion nicht automatisch aktiv sein soll.

```sql
enabled INTEGER NOT NULL DEFAULT 0 CHECK (enabled IN (0, 1))
```

Wenn ein Feature standardmäßig aktiv sein soll, kannst du auch `DEFAULT 1` verwenden:

```sql
is_visible INTEGER NOT NULL DEFAULT 1 CHECK (is_visible IN (0, 1))
```

Wichtig ist nicht, ob der Default `0` oder `1` ist. Wichtig ist, dass er fachlich passt und im Schema eindeutig festgelegt ist.

## NULL nicht versehentlich zum dritten Zustand machen

Eine häufige Stolperfalle ist `NULL`. Wenn du `NOT NULL` weglässt, kann deine Boolean-Spalte plötzlich drei Zustände haben:

```text
0    = false
1    = true
NULL = unbekannt oder nicht gesetzt
```

Das kann sinnvoll sein, wenn du diesen dritten Zustand wirklich brauchst. In den meisten Fällen willst du bei Boolean-Werten aber nur true oder false. Dann solltest du `NOT NULL` verwenden.

```sql
enabled INTEGER NOT NULL DEFAULT 0 CHECK (enabled IN (0, 1))
```

So bleibt die Logik eindeutig.

## Textwerte true und false vermeiden

Du könntest Boolean-Werte auch als Text speichern:

```sql
enabled TEXT CHECK (enabled IN ('true', 'false'))
```

Das ist möglich, aber in SQLite oft weniger praktisch. Integer-Werte sind kürzer, einfacher zu filtern und näher an dem, was viele Programmiersprachen oder ORMs intern erwarten.

Für klare Flags, Einstellungen und Statuswerte ist `0` und `1` meistens die bessere Wahl.

## Anwendungscode sauber übersetzen

Für [software-development](https://oliverjessner.at/category/software-development/) ist nicht nur das Datenbankschema wichtig, sondern auch die Schnittstelle zum Anwendungscode. Dort solltest du `0` und `1` konsequent in echte Boolean-Werte übersetzen.

Ein Beispiel in JavaScript oder TypeScript:

```ts
const enabled = row.enabled === 1;
```

Beim Schreiben in die Datenbank kannst du den Boolean-Wert wieder in `0` oder `1` übersetzen:

```ts
const enabledValue = enabled ? 1 : 0;
```

So bleibt deine Datenbank einfach und dein Anwendungscode arbeitet trotzdem mit echten Boolean-Werten.

## Häufige Stolperstellen bei SQLite Boolean

Bei Boolean-Werten in SQLite passieren häufig dieselben Fehler:

- Ohne `CHECK` Constraint können auch andere Integer-Werte gespeichert werden.
- Ohne `NOT NULL` entsteht versehentlich ein dritter Zustand.
- `BOOLEAN` wirkt eindeutig, ist in SQLite aber keine eigene Speicherklasse.
- Textwerte wie `true` und `false` sind möglich, aber oft weniger praktisch.
- Der Anwendungscode sollte `0` und `1` konsequent in echte Boolean-Werte übersetzen.
- Der Default-Wert sollte fachlich bewusst gewählt werden.

## SQLite Boolean-Werte in SQLite Hub prüfen

In [SQLite Hub](https://oliverjessner.at/sqlite-hub) kannst du solche Boolean-Spalten direkt in der Tabellenstruktur prüfen. Das ist praktisch, wenn du sehen möchtest, ob eine Spalte wirklich als `INTEGER NOT NULL` angelegt wurde, ob ein passender `DEFAULT` gesetzt ist und ob ein `CHECK` Constraint nur `0` und `1` erlaubt. Ich habe SQLite Hub genau für solche Alltagssituationen gebaut: lokale SQLite-Datenbanken öffnen, Strukturen verstehen, Daten prüfen und Dokumentation näher an die Datenbank bringen.

## Verwandte SQLite-Fragen

- [SQLite CREATE TABLE IF NOT EXISTS: Tabelle nur bei Bedarf anlegen](/blog/2026-06-29-sqlite-create-table-if-not-exists-tabelle-nur-bei-bedarf-anlegen/)
- [SQLite column names: Spaltennamen einer Tabelle auslesen](/blog/2026-06-29-sqlite-column-names-spaltennamen-einer-tabelle-auslesen/)
- [Zur Übersicht der SQLite-Serie](/blog/2026-06-29-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/)

## Fazit

Boolean-Werte in SQLite sind unkompliziert, wenn du sie bewusst modellierst. Am klarsten ist meistens eine `INTEGER` Spalte mit `0`, `1`, `NOT NULL`, einem passenden `DEFAULT` und einem `CHECK` Constraint.

So ist für Datenbank, Anwendungscode und spätere Wartung eindeutig sichtbar, welche Werte erlaubt sind und was sie bedeuten.
