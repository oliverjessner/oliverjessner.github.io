---
layout: post
title: 'SQLite CREATE TABLE IF NOT EXISTS – Tabelle nur bei Bedarf anlegen'
date: 2026-06-29 09:20:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - sqlite
    - terminal
description: 'SQLite CREATE TABLE IF NOT EXISTS richtig nutzen: Tabelle nur anlegen, wenn sie fehlt, Schema-Drift vermeiden und Migrationen sauber planen.'
thumbnail: '/assets/images/gen/blog/sqlite-create-table-if-not-exists-tabelle-nur-bei-bedarf-anlegen/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-create-table-if-not-exists-tabelle-nur-bei-bedarf-anlegen/header.webp'
image_width: 1200
image_height: 675
faq:
    - question: 'Wie lege ich eine SQLite-Tabelle nur an, wenn sie noch nicht existiert?'
      answer: 'Verwende `CREATE TABLE IF NOT EXISTS table_name (...)`.'
    - question: 'Vergleicht SQLite dabei das vorhandene Schema?'
      answer: 'Nein. SQLite prüft nur, ob ein Objekt mit diesem Namen existiert. Spalten, Constraints, Defaults oder Indexe werden nicht mit deiner neuen Definition verglichen.'
    - question: 'Ist CREATE TABLE IF NOT EXISTS eine Migration?'
      answer: 'Nein. Es ist praktisch für den Startzustand, ersetzt aber keine nachvollziehbaren Schema-Migrationen.'
    - question: 'Wie verwalte ich spätere Schema-Änderungen?'
      answer: 'Nutze Migrationen, zum Beispiel mit `PRAGMA user_version` oder einer eigenen Migrationstabelle.'
socialmedia:
    - '`CREATE TABLE IF NOT EXISTS` ist praktisch, aber kein Migrationssystem. SQLite prüft dabei nicht, ob das bestehende Schema korrekt ist.'
    - 'SQLite-Tabelle nur bei Bedarf anlegen? Ja: `CREATE TABLE IF NOT EXISTS`. Für spätere Änderungen brauchst du trotzdem Migrationen.'
    - 'Neue SQLite-Q&A: Wann `IF NOT EXISTS` reicht und warum es Schema-Drift nicht automatisch verhindert.'
---

Mit `CREATE TABLE IF NOT EXISTS` kannst du in SQLite eine Tabelle nur dann anlegen, wenn sie noch nicht existiert. Das ist praktisch für lokale Apps, Tests, CLIs und kleine Tools. Wichtig ist aber: SQLite prüft dabei nicht, ob eine bestehende Tabelle wirklich dem Schema entspricht, das du gerade definierst.

## SQLite Tabelle nur anlegen, wenn sie fehlt

Die kurze Regel lautet: `CREATE TABLE IF NOT EXISTS` verhindert einen Fehler, wenn eine Tabelle bereits vorhanden ist. Es ist aber keine Schema-Prüfung und kein Migrationssystem.

Wenn eine Tabelle mit diesem Namen bereits existiert, führt SQLite die `CREATE TABLE`-Anweisung nicht erneut aus. Ob die vorhandene Tabelle dieselben Spalten, Constraints, Defaults oder Indexe hat, wird dabei nicht geprüft.

Der Beitrag gehört zur SQLite-Serie [SQLite Fragen und Antworten](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/). Sie sammelt kurze Lösungen für typische Fragen aus [software-development](https://oliverjessner.at/category/software-development/).

## Beispiel: CREATE TABLE IF NOT EXISTS

Eine einfache Tabelle kannst du so nur bei Bedarf anlegen:

```sql
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    display_name TEXT,
    created_at TEXT NOT NULL
);
```

Beim ersten Start wird die Tabelle erstellt. Beim nächsten Start bricht SQLite nicht mit einem Fehler ab, sondern lässt die vorhandene Tabelle bestehen.

Das ist besonders nützlich für:

- lokale Anwendungen
- kleine CLI-Tools
- Tests
- Prototypen
- eingebettete Datenbanken
- einfache Setup-Skripte

## Was IF NOT EXISTS wirklich prüft

`IF NOT EXISTS` prüft im Kern nur, ob bereits ein Objekt mit diesem Namen existiert. Es bedeutet nicht, dass SQLite deine neue Definition mit dem bestehenden Schema vergleicht.

Angenommen, deine Anwendung erwartet heute diese Tabelle:

```sql
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    display_name TEXT,
    created_at TEXT NOT NULL
);
```

Eine ältere Version der Datenbank könnte aber noch so aussehen:

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL
);
```

Wenn `users` bereits existiert, wird SQLite die Tabelle nicht automatisch erweitern. Die Spalten `display_name` und `created_at` werden nicht ergänzt. Genau hier entsteht Schema-Drift.

## Warum CREATE TABLE IF NOT EXISTS keine Migration ersetzt

`CREATE TABLE IF NOT EXISTS` eignet sich gut für den ersten Startzustand. Sobald sich dein Schema später ändert, brauchst du aber Migrationen.

Eine Migration beschreibt bewusst, wie eine bestehende Datenbank von Version A auf Version B gebracht wird. Zum Beispiel:

```sql
ALTER TABLE users
ADD COLUMN display_name TEXT;
```

Oder bei komplexeren Änderungen:

```sql
BEGIN;

CREATE TABLE users_new (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    display_name TEXT,
    created_at TEXT NOT NULL
);

INSERT INTO users_new (id, email, display_name, created_at)
SELECT id, email, NULL, datetime('now')
FROM users;

DROP TABLE users;
ALTER TABLE users_new RENAME TO users;

COMMIT;
```

Das ist mehr Aufwand als eine einfache `CREATE TABLE`-Anweisung, aber deutlich kontrollierter.

## Schema-Version mit PRAGMA user_version verwalten

Für kleine SQLite-Projekte ist `PRAGMA user_version` ein pragmatischer Weg, um die Schema-Version direkt in der Datenbank zu speichern.

Die aktuelle Version liest du so aus:

```sql
PRAGMA user_version;
```

Eine neue Version setzt du so:

```sql
PRAGMA user_version = 2;
```

Ein einfacher Ablauf kann dann so aussehen:

```text
user_version prüfen
fehlende Migrationen ausführen
user_version erhöhen
Anwendung starten
```

Für kleine Tools ist das oft ausreichend. Größere Projekte können stattdessen eine eigene Migrationstabelle verwenden.

## Eigene Migrationstabelle verwenden

Eine eigene Migrationstabelle kann zum Beispiel so aussehen:

```sql
CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    applied_at TEXT NOT NULL
);
```

Darin speicherst du, welche Migrationen bereits ausgeführt wurden. Das ist nützlich, wenn du Migrationen mit sprechenden Namen verwalten möchtest.

Beispiel:

```text
001_create_users
002_add_display_name_to_users
003_create_settings
```

Damit bleibt nachvollziehbar, welche Schema-Änderungen bereits auf eine Datenbank angewendet wurden.

## Prüfen, ob eine Tabelle existiert

Wenn du nicht direkt eine Tabelle anlegen, sondern nur prüfen möchtest, ob sie existiert, kannst du `sqlite_schema` abfragen:

```sql
SELECT name
FROM sqlite_schema
WHERE type = 'table'
  AND name = 'users';
```

Das ist hilfreich, wenn du ein Setup-Skript, ein Admin-Tool oder eine eigene Migrationslogik baust.

Für temporäre Tabellen gibt es zusätzlich `sqlite_temp_schema`.

## Typischer Einsatz beim Start einer lokalen App

Ein häufiger Ansatz ist:

```sql
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    display_name TEXT,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);
```

Das ist für den Initialzustand sauber. Danach sollte die Anwendung aber nicht einfach nur die `CREATE TABLE`-Statements aktualisieren und hoffen, dass bestehende Datenbanken automatisch angepasst werden.

Besser ist:

```text
Initiale Tabellen mit CREATE TABLE IF NOT EXISTS anlegen
Schema-Version prüfen
fehlende Migrationen ausführen
Anwendung starten
```

So bleibt klar, welche Datenbankstruktur erwartet wird.

## Häufige Stolperstellen bei CREATE TABLE IF NOT EXISTS

Bei `CREATE TABLE IF NOT EXISTS` passieren häufig dieselben Fehler:

- Es wird erwartet, dass SQLite ein bestehendes Schema automatisch aktualisiert.
- Neue Spalten werden nur in der `CREATE TABLE`-Anweisung ergänzt, aber nicht migriert.
- Constraints, Indexe und Default-Werte werden nicht für bestehende Tabellen nachgezogen.
- Eine vorhandene Tabelle mit gleichem Namen wird als ausreichend betrachtet, obwohl sie veraltet ist.
- Schema-Änderungen werden nicht versioniert.
- Tests starten mit frischen Datenbanken, während echte Nutzer alte Datenbanken haben.
- Views, Tabellen oder andere Objekte mit gleichem Namen werden nicht bewusst unterschieden.

Für [software-development](https://oliverjessner.at/category/software-development/) ist die wichtigste Regel: `IF NOT EXISTS` ist gut für den Startzustand. Für laufende Änderungen brauchst du Migrationen.

## SQLite einfacher verwalten mit SQLite Hub

Wenn du auf der Suche nach einem kostenlosen SQLite Manager bist, habe ich mit [SQLite Hub](https://oliverjessner.at/sqlite-hub) ein quelloffenes SQLite Management System für lokale Datenbanken gebaut. Das Tool hilft dir dabei, SQLite-Datenbanken komfortabler zu durchsuchen, Tabellenstrukturen zu prüfen, SQL-Abfragen auszuführen und deine Datenbank direkt neben dem Projekt besser zu dokumentieren. SQLite Hub ist Open Source und richtet sich an Entwickler, Solodevs und alle, die SQLite nicht nur im Terminal, sondern mit einer klaren Oberfläche nutzen möchten.

## Verwandte SQLite-Fragen

- [SQLite table exists: prüfen, ob eine Tabelle existiert](/blog/2026-06-28-sqlite-table-exists-pruefen-ob-eine-tabelle-existiert/)
- [SQLite ALTER TABLE: Spalte zwischen zwei Spalten einfügen](/blog/2026-06-28-sqlite-alter-table-spalte-zwischen-zwei-spalten-einfuegen/)
- [SQLite column names: Spaltennamen einer Tabelle auslesen](/blog/2026-06-28-sqlite-column-names-spaltennamen-einer-tabelle-auslesen/)
- [Zur Übersicht der SQLite-Serie](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/)

## Fazit

`CREATE TABLE IF NOT EXISTS` ist ein gutes Werkzeug, um eine SQLite-Tabelle nur bei Bedarf anzulegen. Es verhindert Fehler beim erneuten Start einer Anwendung und eignet sich gut für den Initialzustand.

Für spätere Schema-Änderungen reicht es aber nicht aus. Wenn sich Spalten, Constraints, Indexe oder Defaults ändern, brauchst du nachvollziehbare Migrationen, zum Beispiel mit `PRAGMA user_version` oder einer eigenen Migrationstabelle.
