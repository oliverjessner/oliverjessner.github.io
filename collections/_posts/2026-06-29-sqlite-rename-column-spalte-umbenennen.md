---
layout: post
title: 'SQLite RENAME COLUMN – Spalte umbenennen'
date: 2026-06-29 09:20:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - sqlite
    - terminal
description: 'SQLite Spalte umbenennen: ALTER TABLE RENAME COLUMN nutzen, Views, Trigger, sqlite_schema und Anwendungscode vor der Migration prüfen.'
thumbnail: '/assets/images/gen/blog/sqlite-rename-column-spalte-umbenennen/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-rename-column-spalte-umbenennen/header.webp'
image_width: 1200
image_height: 675
faq:
    - question: 'Wie benenne ich eine SQLite-Spalte um?'
      answer: 'Nutze `ALTER TABLE table_name RENAME COLUMN old_name TO new_name`.'
    - question: 'Werden Views und Trigger automatisch angepasst?'
      answer: 'SQLite kann viele Schema-Referenzen aktualisieren, aber du solltest Views, Trigger und gespeicherte Queries trotzdem vor und nach der Änderung prüfen.'
    - question: 'Wie finde ich alte Spaltennamen im SQLite-Schema?'
      answer: 'Du kannst `sqlite_schema` abfragen, zum Beispiel mit `SELECT type, name, sql FROM sqlite_schema WHERE sql LIKE "%old_name%"`.'
    - question: 'Muss ich Anwendungscode nach einer Spaltenumbenennung ändern?'
      answer: 'Ja, wenn der alte Spaltenname dort verwendet wird. SQLite kann externen Code, Exporte, Tests oder gespeicherte SQL-Strings nicht automatisch anpassen.'
socialmedia:
    - 'SQLite RENAME COLUMN: Das Statement ist kurz, aber die Migration endet nicht in der Datenbank. Anwendungscode und gespeicherte Queries müssen mitziehen.'
    - 'Eine SQLite-Spalte umbenennen geht mit `ALTER TABLE ... RENAME COLUMN`. Vorher lohnt die Suche nach alten Namen in Views, Triggern und Code.'
    - 'Neue SQLite-Q&A: Spalte umbenennen, Abhängigkeiten prüfen und warum ein einfacher Rename trotzdem Tests braucht.'
---

Eine Spalte lässt sich in SQLite mit `ALTER TABLE ... RENAME COLUMN` direkt umbenennen. Das SQL-Statement ist kurz, aber die Änderung betrifft oft mehr als nur die Tabelle selbst. Vor einer Umbenennung solltest du prüfen, welche Views, Trigger, gespeicherten Queries, Exporte und Stellen im Anwendungscode noch den alten Spaltennamen verwenden.

## SQLite Spalte mit RENAME COLUMN umbenennen

Die direkte Syntax zum Umbenennen einer Spalte lautet:

```sql
ALTER TABLE users
RENAME COLUMN full_name TO display_name;
```

Damit wird in der Tabelle `users` die Spalte `full_name` in `display_name` umbenannt.

Die kurze Regel lautet: `ALTER TABLE ... RENAME COLUMN ... TO ...` ändert den Spaltennamen in SQLite. Danach musst du aber alle abhängigen SQL-Stellen und den Anwendungscode prüfen, weil SQLite nur das Datenbankschema kennt und keinen externen Code anpassen kann.

Der Beitrag gehört zur SQLite-Serie [SQLite Fragen und Antworten](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/). Sie sammelt kurze Lösungen für typische Fragen aus [software-development](https://oliverjessner.at/category/software-development/).

## Beispiel: Spalte umbenennen

Angenommen, deine Tabelle sieht so aus:

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
);
```

Du möchtest `full_name` in `display_name` umbenennen:

```sql
ALTER TABLE users
RENAME COLUMN full_name TO display_name;
```

Danach heißt die Spalte in der Tabelle `display_name`:

```sql
SELECT id, display_name, email, created_at
FROM users;
```

## Vorher nach alten Spaltennamen suchen

Bevor du eine Spalte umbenennst, solltest du prüfen, ob der alte Name in Views, Triggern, Indexen oder anderen Schema-Objekten vorkommt.

```sql
SELECT type, name, sql
FROM sqlite_schema
WHERE sql LIKE '%full_name%';
```

Diese Abfrage findet Datenbankobjekte, deren gespeicherte SQL-Definition den alten Spaltennamen enthält.

Das ist besonders hilfreich bei:

- Views
- Triggern
- Indexen
- Tabellendefinitionen
- gespeicherten Schema-Objekten

Wichtig: Diese Suche findet nur Inhalte im SQLite-Schema. Anwendungscode, Templates, Tests, Exportskripte oder Dokumentation liegen außerhalb der Datenbank und müssen separat geprüft werden.

## Views und Trigger nach der Umbenennung prüfen

SQLite kann viele Referenzen in Schema-Objekten beim Umbenennen aktualisieren. Trotzdem solltest du dich nicht blind darauf verlassen, dass danach alles fachlich korrekt ist.

Prüfe nach der Umbenennung erneut:

```sql
SELECT type, name, sql
FROM sqlite_schema
WHERE sql LIKE '%display_name%';
```

Und zusätzlich, ob der alte Name noch irgendwo im Schema auftaucht:

```sql
SELECT type, name, sql
FROM sqlite_schema
WHERE sql LIKE '%full_name%';
```

Wenn dort noch Treffer auftauchen, solltest du sie bewusst prüfen. Manchmal sind alte Namen noch in Triggerlogik, View-Definitionen oder Kommentaren innerhalb gespeicherter SQL-Statements relevant.

## Anwendungscode nicht vergessen

Eine Spaltenumbenennung ist fast immer auch eine Code-Änderung. SQLite kann nur Datenbankobjekte ändern, aber nicht deinen Anwendungscode.

Typische Stellen, die du prüfen solltest:

- SQL-Queries im Code
- ORM-Modelle
- TypeScript-Typen
- Tests
- CSV- oder JSON-Exporte
- Importskripte
- Dokumentation
- Dashboards
- gespeicherte Reports
- API-Responses
- Frontend-Komponenten

Wenn dein Code weiterhin `full_name` abfragt, wird die Datenbank nach der Umbenennung einen Fehler liefern. Deshalb gehört ein Rename immer in einen Migrations- und Testlauf.

## Migration mit Transaktion ausführen

Eine Spaltenumbenennung solltest du wie eine kleine Migration behandeln. Bei einfachen lokalen Projekten reicht oft ein kurzer Ablauf:

```sql
BEGIN;

ALTER TABLE users
RENAME COLUMN full_name TO display_name;

COMMIT;
```

Bei echten Anwendungen sollte zusätzlich vorher ein Backup existieren. Außerdem solltest du sicherstellen, dass die Anwendungsversion, die den neuen Spaltennamen erwartet, gleichzeitig mit der Migration ausgerollt wird.

## Wann RENAME COLUMN problematisch werden kann

Das Umbenennen kann scheitern, wenn SQLite eine Referenz im Schema nicht eindeutig aktualisieren kann. Das kann zum Beispiel bei komplexen Views oder Triggern passieren.

Typische Problemfälle sind:

- mehrdeutige Spaltennamen in Views
- Trigger mit komplexen SQL-Ausdrücken
- alte Queries in gespeicherten Reports
- manuell erzeugte SQL-Strings
- Tools, die Spaltennamen hart erwarten
- Exporte, die feste Header verwenden

Wenn SQLite die Änderung ablehnt, ist das oft ein hilfreiches Signal. Dann solltest du zuerst die abhängigen Schema-Objekte prüfen und gegebenenfalls manuell anpassen.

## Alternative: Neue Spalte statt Rename

Nicht immer ist ein direkter Rename die beste Lösung. Manchmal ist es sicherer, eine neue Spalte anzulegen, Daten zu kopieren und den alten Namen für eine Übergangszeit bestehen zu lassen.

Das kann sinnvoll sein, wenn:

- mehrere Anwendungsversionen parallel laufen
- externe Tools auf die alte Spalte zugreifen
- Exporte stabile Spaltennamen erwarten
- du eine sanftere Migration brauchst
- Nutzer oder Integrationen Zeit für die Umstellung benötigen

Ein Übergang kann zum Beispiel so aussehen:

```sql
ALTER TABLE users
ADD COLUMN display_name TEXT;
```

Danach kopierst du die Daten:

```sql
UPDATE users
SET display_name = full_name
WHERE display_name IS NULL;
```

Das ist aufwendiger als `RENAME COLUMN`, kann aber bei produktiven Systemen kontrollierter sein.

## Spaltennamen nach der Änderung prüfen

Nach der Umbenennung kannst du die Tabellenstruktur prüfen:

```sql
PRAGMA table_info(users);
```

Oder nur die Spaltennamen auslesen:

```sql
SELECT name
FROM pragma_table_info('users')
ORDER BY cid;
```

So siehst du schnell, ob die neue Spalte korrekt im Schema angekommen ist.

## Häufige Stolperstellen bei SQLite RENAME COLUMN

Bei `RENAME COLUMN` passieren häufig dieselben Fehler:

- Der alte Spaltenname wird im Anwendungscode nicht ersetzt.
- Views und Trigger werden nicht geprüft.
- Gespeicherte SQL-Queries oder Reports verwenden weiterhin den alten Namen.
- Exporte oder Imports erwarten feste Spaltennamen.
- Tests laufen nur gegen frische Datenbanken, nicht gegen migrierte Datenbanken.
- Die Änderung wird ohne Backup ausgeführt.
- Es wird nicht nach alten Namen in `sqlite_schema` gesucht.
- Mehrere Anwendungsversionen greifen gleichzeitig auf unterschiedliche Spaltennamen zu.

Für [software-development](https://oliverjessner.at/category/software-development/) ist die wichtigste Regel: Eine Spalte umzubenennen ist technisch einfach, aber fachlich eine Schema-Migration.

## SQLite einfacher verwalten mit SQLite Hub

Wenn du auf der Suche nach einem kostenlosen SQLite Manager bist, habe ich mit [SQLite Hub](https://oliverjessner.at/sqlite-hub) ein quelloffenes SQLite Management System für lokale Datenbanken gebaut. Das Tool hilft dir dabei, SQLite-Datenbanken komfortabler zu durchsuchen, Tabellenstrukturen zu prüfen, SQL-Abfragen auszuführen und deine Datenbank direkt neben dem Projekt besser zu dokumentieren. SQLite Hub ist Open Source und richtet sich an Entwickler, Solodevs und alle, die SQLite nicht nur im Terminal, sondern mit einer klaren Oberfläche nutzen möchten.

## Verwandte SQLite-Fragen

- [SQLite DROP COLUMN: Spalte aus einer Tabelle löschen](/blog/2026-06-28-sqlite-drop-column-spalte-loeschen-oder-hinzufuegen/)
- [SQLite column names: Spaltennamen einer Tabelle auslesen](/blog/2026-06-28-sqlite-column-names-spaltennamen-einer-tabelle-auslesen/)
- [SQLite ALTER TABLE: Spalte zwischen zwei Spalten einfügen](/blog/2026-06-28-sqlite-alter-table-spalte-zwischen-zwei-spalten-einfuegen/)
- [Zur Übersicht der SQLite-Serie](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/)

## Fazit

`ALTER TABLE ... RENAME COLUMN` macht das Umbenennen einer SQLite-Spalte technisch einfach. Der eigentliche Aufwand liegt aber darin, alle abhängigen Stellen mitzunehmen.

Vor der Änderung solltest du nach alten Spaltennamen im Schema suchen, Views und Trigger prüfen, Anwendungscode anpassen und die Migration testen. Dann bleibt eine Spaltenumbenennung kontrollierbar statt zu einer versteckten Fehlerquelle zu werden.
