---
layout: post
title: 'SQLite case insensitive compare – Texte ohne Großschreibung vergleichen'
date: 2026-06-29 09:20:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - sqlite
    - terminal
description: 'SQLite case-insensitive vergleichen: COLLATE NOCASE für Strings nutzen, Indexe richtig anlegen und Unicode-Grenzen bei Umlauten beachten.'
thumbnail: '/assets/images/gen/blog/sqlite-case-insensitive-compare-texte-ohne-grossschreibung-vergleichen/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-case-insensitive-compare-texte-ohne-grossschreibung-vergleichen/header.webp'
faq:
    - question: 'Wie vergleiche ich Strings in SQLite case-insensitive?'
      answer: 'Nutze `COLLATE NOCASE`, entweder direkt im Vergleich, in der Spaltendefinition oder im passenden Index.'
    - question: 'Wie ignoriere ich Groß- und Kleinschreibung in SQLite?'
      answer: 'Für einfache Textvergleiche kannst du `WHERE spalte = ? COLLATE NOCASE` verwenden.'
    - question: 'Funktioniert COLLATE NOCASE für alle Unicode-Zeichen?'
      answer: 'Nein. Die eingebaute NOCASE-Collation ist vor allem für ASCII-nahe Werte geeignet. Für vollständige Unicode-Regeln brauchst du eine eigene Normalisierung oder passende Erweiterungen.'
    - question: 'Brauche ich einen speziellen Index für NOCASE?'
      answer: 'Wenn eine case-insensitive Abfrage einen Index nutzen soll, sollte der Index dieselbe Collation enthalten, etwa `CREATE INDEX ... ON users(name COLLATE NOCASE)`.'
socialmedia:
    - 'SQLite case insensitive compare: `COLLATE NOCASE` ist die kurze Antwort. Für Unicode und Indexe muss man aber genauer planen.'
    - 'Case-insensitive SQLite-Suche ist einfach, solange es um technische Werte geht. Bei Namen, Umlauten und Unicode reicht NOCASE nicht immer.'
    - 'Neue SQLite-Q&A: Strings ohne Großschreibung vergleichen und warum der passende Index zur Collation gehören sollte.'
---

Case-insensitive Vergleiche sind in SQLite mit `COLLATE NOCASE` schnell eingerichtet. Damit kannst du Texte vergleichen, ohne zwischen Groß- und Kleinschreibung zu unterscheiden. Für technische Werte wie E-Mail-Adressen, Slugs oder einfache Codes reicht das oft aus. Bei Umlauten, Namen und vollständigen Unicode-Regeln solltest du aber genauer planen.

## SQLite Texte ohne Groß- und Kleinschreibung vergleichen

Wenn du in SQLite Strings case-insensitive vergleichen möchtest, ist `COLLATE NOCASE` meist der erste Ansatz. Du kannst die Collation direkt in der Abfrage verwenden, in der Spaltendefinition festlegen oder einen passenden Index dafür anlegen.

Die kurze Regel lautet: Für einfache ASCII-nahe Vergleiche funktioniert `COLLATE NOCASE` gut. Für komplexe Sprachlogik, Umlaute und internationale Namen ist es nicht automatisch ausreichend.

Der Beitrag gehört zur SQLite-Serie [SQLite Fragen und Antworten](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/). Sie sammelt kurze Lösungen für typische Fragen aus [software-development](https://oliverjessner.at/category/software-development/).

## Beispiel: Vergleich mit COLLATE NOCASE

Für einen einfachen case-insensitive Vergleich kannst du `COLLATE NOCASE` direkt in der `WHERE`-Bedingung verwenden:

```sql
SELECT *
FROM users
WHERE email = 'ANA@example.com' COLLATE NOCASE;
```

Damit findet SQLite auch einen Eintrag wie:

```text
ana@example.com
```

Für technische Werte wie E-Mail-Adressen, Slugs oder einfache Kennungen ist das oft genau die Lösung, die du brauchst.

## COLLATE NOCASE direkt in der Spalte definieren

Wenn eine Spalte grundsätzlich ohne Beachtung von Groß- und Kleinschreibung verglichen werden soll, kannst du die Collation direkt in der Tabellendefinition setzen:

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL COLLATE NOCASE UNIQUE
);
```

Das ist besonders praktisch bei E-Mail-Adressen. Durch `COLLATE NOCASE UNIQUE` behandelt SQLite diese Werte bei der Eindeutigkeit case-insensitive.

Dadurch können diese beiden Werte nicht parallel in derselben Spalte gespeichert werden:

```text
ana@example.com
ANA@example.com
```

Für Logins, technische Schlüssel oder Slugs kann das sinnvoll sein, weil Nutzer oft nicht erwarten, dass Groß- und Kleinschreibung dort zwei unterschiedliche Werte erzeugt.

## Index für case-insensitive Suche anlegen

Wenn du regelmäßig case-insensitive suchst, solltest du auch den Index passend zur Collation anlegen:

```sql
CREATE INDEX idx_users_display_name_nocase
ON users(display_name COLLATE NOCASE);
```

Die Abfrage sollte dieselbe Collation verwenden:

```sql
SELECT *
FROM users
WHERE display_name = 'ana' COLLATE NOCASE;
```

Wichtig ist: Ein normaler Index auf `display_name` ist nicht automatisch dasselbe wie ein Index auf `display_name COLLATE NOCASE`. Wenn die Abfrage und der Index unterschiedliche Collations verwenden, kann SQLite den Index unter Umständen nicht so nutzen, wie du es erwartest.

## Warum LOWER nicht immer die beste Lösung ist

Eine Alternative sieht oft so aus:

```sql
SELECT *
FROM users
WHERE LOWER(display_name) = LOWER('Ana');
```

Das kann funktionieren, ist aber nicht immer die beste Lösung. Der Ausdruck ist weniger klar als `COLLATE NOCASE` und kann die Indexnutzung erschweren, wenn du nicht gezielt einen passenden Ausdrucksindex anlegst.

Für einfache case-insensitive Vergleiche ist diese Form meistens lesbarer:

```sql
SELECT *
FROM users
WHERE display_name = 'Ana' COLLATE NOCASE;
```

Wenn Performance wichtig ist, solltest du die Abfrage mit einem passenden Index kombinieren.

## Grenzen bei Unicode und Umlauten

`COLLATE NOCASE` ist praktisch, aber nicht dasselbe wie vollständige Unicode-Normalisierung. Die eingebaute NOCASE-Collation ist vor allem für ASCII-nahe Werte gedacht.

Das ist wichtig bei Werten wie:

```text
Müller
müller
Ärger
ärger
Straße
STRASSE
```

Solche Fälle können je nach Erwartung problematisch sein, weil echte Sprachlogik mehr braucht als einfache Groß- und Kleinschreibung. Für internationale Namen, mehrsprachige Suche oder nutzernahe Volltextsuche solltest du deshalb bewusst normalisieren oder eine passende Erweiterung einsetzen.

Für [software-development](https://oliverjessner.at/category/software-development/) ist der praktische Rat: technische Vergleichswerte normalisieren, menschliche Namen vorsichtig behandeln und Unicode-Anforderungen nicht unterschätzen.

## Technische Werte vor dem Speichern normalisieren

Bei technischen Werten ist es oft sinnvoll, die Daten bereits vor dem Speichern zu normalisieren. Eine E-Mail-Adresse kannst du zum Beispiel im Anwendungscode konsistent kleinschreiben, bevor sie in SQLite landet.

Beispiel in TypeScript:

```ts
const email = inputEmail.trim().toLowerCase();
```

Dann speicherst du einen stabilen Wert und kannst trotzdem zusätzlich `COLLATE NOCASE` oder einen passenden `UNIQUE` Constraint nutzen.

Diese Strategie eignet sich besonders für:

- E-Mail-Adressen
- Slugs
- Tags
- technische Namen
- einfache Suchschlüssel

Bei echten Personennamen solltest du vorsichtiger sein. Dort kann aggressive Normalisierung schnell fachlich falsch wirken.

## Häufige Stolperstellen bei SQLite case-insensitive compare

Bei case-insensitive Vergleichen in SQLite passieren häufig diese Fehler:

- `COLLATE NOCASE` wird in der Abfrage genutzt, aber der Index hat keine passende Collation.
- Technische Werte wie E-Mail-Adressen werden nicht normalisiert.
- Namen und Umlaute werden behandelt, als wären sie einfache ASCII-Werte.
- `LOWER(spalte) = LOWER(?)` wird verwendet, ohne über Indexnutzung nachzudenken.
- `UNIQUE` wird gesetzt, aber nicht mit der gewünschten Collation kombiniert.
- Unicode-Anforderungen werden erst bemerkt, wenn echte Nutzerdaten auftauchen.

## Case-insensitive SQL-Abfragen in SQLite Hub testen

Gerade bei `COLLATE NOCASE`, `LOWER()` und passenden Indexen lohnt es sich, Abfragen direkt auszuprobieren. In [SQLite Hub](https://oliverjessner.at/sqlite-hub) kannst du lokale SQLite-Datenbanken öffnen und solche SQL-Abfragen in einem praktischen SQL Editor testen, ohne ständig zwischen Terminal, Anwendungscode und Datenbankdatei zu wechseln.

Das hilft besonders bei case-insensitive Vergleichen: Du kannst schnell prüfen, ob `WHERE email = 'ANA@example.com' COLLATE NOCASE` die erwarteten Treffer liefert, ob ein `UNIQUE` Constraint mit `COLLATE NOCASE` greift und ob deine Daten bei E-Mail-Adressen, Slugs oder Tags wirklich konsistent gespeichert sind. Gleichzeitig bleibt sichtbar, wie die Tabelle aufgebaut ist und ob ein passender Index für die jeweilige Abfrage vorhanden ist.

## Verwandte SQLite-Fragen

- [SQLite boolean: boolesche Werte sauber speichern](/blog/2026-06-28-sqlite-boolean-boolesche-werte-sauber-speichern/)
- [SQLite UNIQUE Constraint: eindeutige Werte in Tabellen erzwingen](/blog/2026-06-28-sqlite-unique-constraint-eindeutige-werte-in-tabellen-erzwingen/)
- [SQLite column names: Spaltennamen einer Tabelle auslesen](/blog/2026-06-28-sqlite-column-names-spaltennamen-einer-tabelle-auslesen/)
- [Zur Übersicht der SQLite-Serie](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/)

## Fazit

Case-insensitive Vergleiche in SQLite sind mit `COLLATE NOCASE` einfach, solange die Anforderungen einfach bleiben. Für E-Mail-Adressen, Slugs und technische Schlüssel ist das oft ausreichend.

Sobald echte Sprachlogik, Umlaute oder internationale Namen relevant werden, solltest du die Normalisierung bewusst entwerfen. Für performante Abfragen gehört außerdem ein passender Index mit derselben Collation dazu.
