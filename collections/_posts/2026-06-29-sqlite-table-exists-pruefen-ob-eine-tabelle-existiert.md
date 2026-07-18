---
layout: post
title: 'SQLite table exists – prüfen, ob eine Tabelle existiert'
date: 2026-06-29 09:20:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - sqlite
    - terminal
description: 'SQLite table exists prüfen: Mit sqlite_schema, main.sqlite_schema und sqlite_temp_schema sicher erkennen, ob eine Tabelle existiert.'
thumbnail: '/assets/images/gen/blog/sqlite-table-exists-pruefen-ob-eine-tabelle-existiert/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-table-exists-pruefen-ob-eine-tabelle-existiert/header.webp'
image_width: 1200
image_height: 675
faq:
    - question: 'Wie prüfe ich in SQLite, ob eine Tabelle existiert?'
      answer: 'Nutze `SELECT EXISTS` auf `sqlite_schema` und filtere auf `type = "table"` sowie den gewünschten Tabellennamen.'
    - question: 'Warum muss ich in sqlite_schema auf type = "table" filtern?'
      answer: '`sqlite_schema` enthält nicht nur Tabellen, sondern auch Views, Indexe und Trigger. Der Filter verhindert falsche Treffer.'
    - question: 'Prüft CREATE TABLE IF NOT EXISTS auch die Spalten?'
      answer: 'Nein. SQLite legt die Tabelle nur an, wenn der Name noch nicht existiert. Das vorhandene Schema wird nicht mit deiner CREATE-Anweisung verglichen.'
    - question: 'Wo finde ich TEMP-Tabellen in SQLite?'
      answer: 'TEMP-Tabellen stehen im temporären Schema. Dafür kannst du `sqlite_temp_schema` abfragen.'
socialmedia:
    - 'SQLite table exists: Die saubere Prüfung läuft über `sqlite_schema`, `type = "table"` und den konkreten Namen. Wichtig ist das richtige Schema.'
    - '`CREATE TABLE IF NOT EXISTS` ersetzt keine Migration. Es prüft in SQLite nicht, ob die vorhandene Tabelle wirklich die erwarteten Spalten hat.'
    - 'Neue SQLite-Q&A: Wie prüfe ich, ob eine Tabelle existiert? Kurzantwort: `SELECT EXISTS` auf `sqlite_schema`, aber mit Blick auf Schema und TEMP-Tabellen.'
---

Ob eine Tabelle in SQLite existiert, prüfst du am zuverlässigsten über das interne Schema. Für normale Tabellen fragst du `sqlite_schema` oder `main.sqlite_schema` ab. Für temporäre Tabellen gibt es `sqlite_temp_schema`. Wichtig ist dabei, nicht nur nach dem Namen zu suchen, sondern auch auf den Objekttyp `table` zu filtern.

## SQLite Tabelle existiert prüfen

Die typische Abfrage nutzt `SELECT EXISTS` auf `sqlite_schema`:

```sql
SELECT EXISTS (
    SELECT 1
    FROM sqlite_schema
    WHERE type = 'table'
      AND name = 'users'
) AS table_exists;
```

Das Ergebnis ist `1`, wenn die Tabelle existiert, und `0`, wenn sie nicht existiert.

Die kurze Regel lautet: Für permanente Tabellen prüfst du `sqlite_schema` mit `type = 'table'` und dem konkreten Tabellennamen. Wenn du gezielt die Hauptdatenbank meinst, kannst du auch `main.sqlite_schema` verwenden.

Der Beitrag gehört zur SQLite-Serie [SQLite Fragen und Antworten](/blog/2026-06-29-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/). Sie sammelt kurze Lösungen für typische Fragen aus [software-development](https://oliverjessner.at/category/software-development/).

## Beispiel: Tabelle in der Hauptdatenbank prüfen

Für die Hauptdatenbank kannst du die Prüfung explizit über `main.sqlite_schema` schreiben:

```sql
SELECT EXISTS (
    SELECT 1
    FROM main.sqlite_schema
    WHERE type = 'table'
      AND name = 'users'
) AS table_exists;
```

Das ist besonders sinnvoll, wenn du mit mehreren Datenbanken arbeitest oder später `ATTACH` verwendest. Dann ist direkt klar, welches Schema geprüft wird.

## Warum type = 'table' wichtig ist

`sqlite_schema` enthält nicht nur Tabellen. Dort stehen auch andere Datenbankobjekte:

- Tabellen
- Views
- Indexe
- Trigger

Wenn du nur nach dem Namen filterst, kann ein anderes Objekt mit gleichem oder ähnlichem Namen zu falschen Annahmen führen. Deshalb sollte die Prüfung für Tabellen immer den Typ einschränken:

```sql
WHERE type = 'table'
  AND name = 'users'
```

Wenn du stattdessen eine View prüfen möchtest, würdest du entsprechend `type = 'view'` verwenden.

## Tabelle oder View prüfen

Manchmal ist nicht wichtig, ob ein Objekt eine Tabelle oder eine View ist. Dann kannst du beide Typen zulassen:

```sql
SELECT EXISTS (
    SELECT 1
    FROM sqlite_schema
    WHERE type IN ('table', 'view')
      AND name = 'active_users'
) AS object_exists;
```

Für Migrationscode solltest du aber meistens präzise bleiben. Eine View mit gleichem Namen ist nicht dasselbe wie eine Tabelle.

## TEMP-Tabellen prüfen

Temporäre Tabellen liegen nicht im normalen Schema der Hauptdatenbank. Dafür gibt es `sqlite_temp_schema`.

```sql
SELECT EXISTS (
    SELECT 1
    FROM sqlite_temp_schema
    WHERE type = 'table'
      AND name = 'temp_users'
) AS temp_table_exists;
```

Das ist wichtig, wenn du in einer Session mit temporären Tabellen arbeitest. Eine TEMP-Tabelle kann existieren, ohne dass sie in `main.sqlite_schema` steht.

## Tabellen in einer ATTACH-Datenbank prüfen

Wenn du eine weitere SQLite-Datenbank mit `ATTACH` einbindest, bekommt sie einen eigenen Schema-Namen.

```sql
ATTACH DATABASE 'archive.db' AS archive;
```

Eine Tabelle in dieser angehängten Datenbank prüfst du dann so:

```sql
SELECT EXISTS (
    SELECT 1
    FROM archive.sqlite_schema
    WHERE type = 'table'
      AND name = 'users'
) AS table_exists;
```

Der Name `archive` ist der Alias aus `ATTACH`. Er wird in SQLite als Schema-Name der angehängten Datenbank verwendet.

## Alle Tabellen auflisten

Wenn du nicht nur eine bestimmte Tabelle prüfen möchtest, kannst du alle Tabellen auflisten:

```sql
SELECT name
FROM sqlite_schema
WHERE type = 'table'
ORDER BY name;
```

Systeminterne SQLite-Tabellen kannst du bei Bedarf ausblenden:

```sql
SELECT name
FROM sqlite_schema
WHERE type = 'table'
  AND name NOT LIKE 'sqlite_%'
ORDER BY name;
```

Das ist hilfreich für kleine Admin-Tools, Exporte, Dokumentation oder Schema-Checks.

## CREATE TABLE IF NOT EXISTS ist keine Schema-Prüfung

`CREATE TABLE IF NOT EXISTS` ist praktisch, aber es beantwortet eine andere Frage. Es prüft nur, ob ein Objekt mit diesem Namen bereits existiert. Es vergleicht nicht, ob die vorhandene Tabelle wirklich die erwarteten Spalten, Constraints oder Indexe besitzt.

```sql
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
);
```

Wenn `users` bereits existiert, wird diese Anweisung übersprungen. SQLite prüft dabei nicht, ob die bestehende Tabelle genau so aussieht.

Das bedeutet: `CREATE TABLE IF NOT EXISTS` ist gut für den Startzustand. Für spätere Schema-Änderungen brauchst du Migrationen.

## In Migrationen bewusst einsetzen

Eine Existenzprüfung ist vor allem in Setup- und Migrationscode nützlich. Du kannst damit kontrollieren, ob eine Tabelle schon vorhanden ist, bevor du bestimmte Schritte ausführst.

Trotzdem sollte die Prüfung nicht deine gesamte Migrationslogik ersetzen. In echten Anwendungen willst du meist wissen:

- Existiert die Tabelle?
- Hat sie die erwarteten Spalten?
- Sind die richtigen Constraints vorhanden?
- Gibt es die nötigen Indexe?
- Welche Schema-Version liegt vor?

Für die Schema-Version eignet sich in kleinen SQLite-Projekten zum Beispiel:

```sql
PRAGMA user_version;
```

Damit kannst du nachvollziehbar entscheiden, welche Migrationen noch ausgeführt werden müssen.

## Tabellennamen in Anwendungscode sicher behandeln

Werte in SQL-Abfragen kannst du normalerweise als Parameter binden. Tabellennamen funktionieren aber nicht wie normale Werte in einer `WHERE`-Bedingung.

Diese Abfrage ist für die Existenzprüfung gut:

```sql
SELECT EXISTS (
    SELECT 1
    FROM sqlite_schema
    WHERE type = 'table'
      AND name = ?
);
```

Hier wird der Tabellenname als Wert gegen die Spalte `name` geprüft. Das ist sauber.

Problematisch wird es, wenn du Tabellennamen dynamisch in SQL-Strukturen einbaust, zum Beispiel bei `SELECT * FROM ${tableName}`. Dann solltest du den Namen vorher aus einer erlaubten Liste wählen oder gegen `sqlite_schema` prüfen.

## Häufige Stolperstellen bei SQLite table exists

Beim Prüfen, ob eine SQLite-Tabelle existiert, passieren häufig dieselben Fehler:

- Es wird nur nach dem Namen gesucht, aber nicht nach `type = 'table'` gefiltert.
- `CREATE TABLE IF NOT EXISTS` wird mit einer vollständigen Schema-Prüfung verwechselt.
- TEMP-Tabellen werden in `sqlite_schema` gesucht, obwohl sie in `sqlite_temp_schema` stehen.
- Bei `ATTACH` wird das falsche Schema abgefragt.
- Views werden versehentlich wie Tabellen behandelt.
- Systemtabellen wie `sqlite_sequence` werden nicht bewusst ausgefiltert.
- Tabellennamen aus Benutzereingaben werden ungeprüft in SQL eingebaut.
- Die Existenzprüfung ersetzt eine eigentlich notwendige Migration.

Für [software-development](https://oliverjessner.at/category/software-development/) ist die wichtigste Regel: Eine Existenzprüfung sagt nur, ob ein Objekt vorhanden ist. Sie sagt noch nicht, ob das Schema fachlich korrekt ist.

## SQLite einfacher verwalten mit SQLite Hub

Wenn du auf der Suche nach einem kostenlosen SQLite Manager bist, habe ich mit [SQLite Hub](https://oliverjessner.at/sqlite-hub) ein quelloffenes SQLite Management System für lokale Datenbanken gebaut. Das Tool hilft dir dabei, SQLite-Datenbanken komfortabler zu durchsuchen, Tabellenstrukturen zu prüfen, SQL-Abfragen auszuführen und deine Datenbank direkt neben dem Projekt besser zu dokumentieren. SQLite Hub ist Open Source und richtet sich an Entwickler, Solodevs und alle, die SQLite nicht nur im Terminal, sondern mit einer klaren Oberfläche nutzen möchten.

## Verwandte SQLite-Fragen

- [SQLite CREATE TABLE IF NOT EXISTS: Tabelle nur bei Bedarf anlegen](/blog/2026-06-29-sqlite-create-table-if-not-exists-tabelle-nur-bei-bedarf-anlegen/)
- [SQLite ATTACH: Tabellen einer angehängten Datenbank auflisten](/blog/2026-06-29-sqlite-attach-tabellen-einer-angehaengten-datenbank-auflisten/)
- [SQLite DESCRIBE: Tabellenstruktur wie in MySQL anzeigen](/blog/2026-06-29-sqlite-describe-tabellenstruktur-wie-in-mysql-anzeigen/)
- [Zur Übersicht der SQLite-Serie](/blog/2026-06-29-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/)

## Fazit

Ob eine SQLite-Tabelle existiert, prüfst du sauber über `sqlite_schema`, `main.sqlite_schema` oder bei temporären Tabellen über `sqlite_temp_schema`. Wichtig sind der konkrete Tabellenname, der Filter `type = 'table'` und das richtige Schema.

Für robuste Anwendungen reicht diese Prüfung allein aber nicht aus. Danach brauchst du weiterhin saubere Migrationen, wenn sich Spalten, Constraints, Indexe oder andere Schema-Details ändern.
