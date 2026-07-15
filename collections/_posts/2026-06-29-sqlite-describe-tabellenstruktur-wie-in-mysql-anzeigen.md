---
layout: post
title: 'SQLite DESCRIBE – Tabellenstruktur wie in MySQL anzeigen'
date: 2026-06-29 09:20:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - sqlite
    - terminal
description: 'SQLite DESCRIBE Ersatz: Tabellenstruktur mit PRAGMA table_info, .schema, sqlite_schema, Indexen und Foreign Keys anzeigen.'
thumbnail: '/assets/images/gen/blog/sqlite-describe-tabellenstruktur-wie-in-mysql-anzeigen/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-describe-tabellenstruktur-wie-in-mysql-anzeigen/header.webp'
image_width: 1200
image_height: 675
faq:
    - question: 'Gibt es DESCRIBE in SQLite?'
      answer: 'Nein. SQLite hat kein MySQL-kompatibles `DESCRIBE`. Nutze stattdessen `PRAGMA table_info`, `.schema` in der SQLite-CLI oder eine Abfrage auf `sqlite_schema`.'
    - question: 'Wie zeige ich die Tabellenstruktur in SQLite an?'
      answer: 'Für Spalteninformationen nutzt du `PRAGMA table_info(table_name)`. Für die vollständige CREATE TABLE-Anweisung kannst du `.schema table_name` in der SQLite-CLI verwenden.'
    - question: 'Wie sehe ich die CREATE TABLE-Anweisung in SQLite?'
      answer: 'In der SQLite-CLI geht das mit `.schema table_name`. Per SQL kannst du die Spalte `sql` aus `sqlite_schema` abfragen.'
    - question: 'Zeigt PRAGMA table_info auch Indexe und Foreign Keys?'
      answer: 'Nein. Für Indexe verwendest du `PRAGMA index_list` und `PRAGMA index_info`. Für Foreign Keys nutzt du `PRAGMA foreign_key_list`.'
socialmedia:
    - 'SQLite DESCRIBE? Gibt es nicht direkt wie in MySQL. Die praktische Antwort ist `PRAGMA table_info`, `.schema` und bei Bedarf Index- und Foreign-Key-PRAGMAs.'
    - 'Wer aus MySQL kommt, sucht oft nach DESCRIBE. In SQLite ist die Tabellenstruktur über PRAGMA-Abfragen, `.schema` und `sqlite_schema` sichtbar.'
    - 'Neue SQLite-Q&A: Tabellenstruktur anzeigen wie mit MySQL DESCRIBE, nur eben mit SQLite-Werkzeugen.'
---

SQLite kennt kein direktes `DESCRIBE` wie MySQL. Die Tabellenstruktur bekommst du stattdessen über `PRAGMA table_info`, über `.schema` in der SQLite-CLI oder über eine Abfrage auf `sqlite_schema`. Je nachdem, ob du Spalten, die CREATE TABLE-Anweisung, Indexe oder Foreign Keys sehen willst, nutzt du unterschiedliche Werkzeuge.

## Tabellenstruktur in SQLite anzeigen

Wenn du aus MySQL kommst, suchst du in SQLite vermutlich nach einem Ersatz für `DESCRIBE users`. In SQLite gibt es dieses SQL-Schlüsselwort nicht. Für Spalteninformationen nutzt du stattdessen:

```sql
PRAGMA table_info(users);
```

Für die vollständige CREATE TABLE-Anweisung verwendest du in der SQLite-CLI:

```text
sqlite> .schema users
```

Die kurze Regel lautet: `PRAGMA table_info` zeigt die Spaltenstruktur, `.schema` zeigt die DDL-Anweisung, und `sqlite_schema` erlaubt dir, Schema-Informationen per SQL abzufragen.

Der Beitrag gehört zur SQLite-Serie [SQLite Fragen und Antworten](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/). Sie sammelt kurze Lösungen für typische Fragen aus [software-development](https://oliverjessner.at/category/software-development/).

## Beispiel: Spalten mit PRAGMA table_info anzeigen

Für eine Tabelle `users` bekommst du die wichtigsten Spalteninformationen so:

```sql
PRAGMA table_info(users);
```

SQLite liefert dabei typischerweise diese Informationen:

```text
cid | name | type | notnull | dflt_value | pk
```

Damit siehst du:

- die Reihenfolge der Spalten
- den Spaltennamen
- den deklarierten Datentyp
- ob `NOT NULL` gesetzt ist
- den Default-Wert
- ob die Spalte Teil des Primary Keys ist

Das ist der häufigste Ersatz für `DESCRIBE` aus MySQL.

## Nur die Spaltennamen auslesen

Wenn du nur die Spaltennamen brauchst, kannst du `pragma_table_info` wie eine Tabellenfunktion verwenden:

```sql
SELECT name
FROM pragma_table_info('users')
ORDER BY cid;
```

Das ist praktisch für Exporte, Generatoren, Admin-Tools oder kleine Skripte, die eine SQLite-Tabelle dynamisch analysieren sollen.

## CREATE TABLE-Anweisung mit .schema anzeigen

Wenn du nicht nur die Spalten, sondern die vollständige CREATE TABLE-Anweisung sehen möchtest, nutzt du in der SQLite-CLI `.schema`.

```text
sqlite> .schema users
```

Das kann zum Beispiel so aussehen:

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    display_name TEXT,
    created_at TEXT NOT NULL
);
```

Wichtig: `.schema` ist kein normales SQL. Es ist ein Punkt-Kommando der SQLite-CLI. In SQL-APIs deiner Programmiersprache funktioniert `.schema users` deshalb nicht.

## CREATE TABLE per SQL aus sqlite_schema lesen

Wenn du die CREATE TABLE-Anweisung per SQL auslesen möchtest, kannst du `sqlite_schema` abfragen:

```sql
SELECT sql
FROM sqlite_schema
WHERE type = 'table'
  AND name = 'users';
```

Das ist nützlich, wenn du aus einer Anwendung heraus Schema-Informationen lesen möchtest und keine SQLite-CLI verwendest.

`sqlite_schema` enthält nicht nur Tabellen, sondern auch andere Datenbankobjekte wie Indexe, Views und Trigger.

## Indexe einer Tabelle anzeigen

`PRAGMA table_info` zeigt keine vollständigen Indexinformationen. Dafür gibt es eigene PRAGMA-Abfragen.

Alle Indexe einer Tabelle siehst du so:

```sql
PRAGMA index_list(users);
```

Details zu einem bestimmten Index bekommst du mit:

```sql
PRAGMA index_info(index_name);
```

Für ausführlichere Informationen kann auch `PRAGMA index_xinfo(index_name)` hilfreich sein.

Das ist wichtig, wenn du nicht nur die Spaltenstruktur, sondern auch Performance-relevante Teile des Schemas verstehen willst.

## Foreign Keys anzeigen

Auch Foreign Keys werden nicht vollständig über `PRAGMA table_info` sichtbar. Dafür nutzt du:

```sql
PRAGMA foreign_key_list(users);
```

Damit siehst du, welche Fremdschlüssel für die Tabelle definiert sind und auf welche Tabellen und Spalten sie verweisen.

Gerade bei bestehenden Datenbanken ist das wichtig, weil die reine Spaltenliste oft nicht reicht, um die Beziehungen zwischen Tabellen zu verstehen.

## Tabellenstruktur in einer ATTACH-Datenbank anzeigen

Wenn du eine zweite SQLite-Datenbank mit `ATTACH` eingebunden hast, gibst du den Schema-Namen mit an.

```sql
ATTACH DATABASE 'archive.db' AS archive;
```

Die Struktur der Tabelle `users` in dieser angehängten Datenbank fragst du so ab:

```sql
PRAGMA archive.table_info(users);
```

Der Name `archive` ist der Alias aus `ATTACH` und wird in SQLite als Schema-Name verwendet.

## table_xinfo für versteckte und generierte Spalten

Für normale Tabellen reicht `PRAGMA table_info` meistens aus. Wenn du aber versteckte oder generierte Spalten sehen möchtest, ist `PRAGMA table_xinfo` besser:

```sql
PRAGMA table_xinfo(users);
```

`table_xinfo` zeigt zusätzliche Informationen, die bei `table_info` nicht immer sichtbar sind. Das ist besonders relevant bei virtuellen Tabellen, generierten Spalten oder Tools, die SQLite-Schemas möglichst vollständig analysieren sollen.

## Welche Methode ist wann sinnvoll?

Für den Alltag kannst du dich an dieser Übersicht orientieren:

```text
Spalten anzeigen:              PRAGMA table_info(users)
Vollständigere Spalteninfos:   PRAGMA table_xinfo(users)
CREATE TABLE anzeigen:         .schema users
CREATE TABLE per SQL lesen:    SELECT sql FROM sqlite_schema ...
Indexe anzeigen:               PRAGMA index_list(users)
Index-Spalten anzeigen:        PRAGMA index_info(index_name)
Foreign Keys anzeigen:         PRAGMA foreign_key_list(users)
```

Für [software-development](https://oliverjessner.at/category/software-development/) ist diese Kombination meist aussagekräftiger als ein einzelnes `DESCRIBE`-Kommando. Du bekommst genau die Informationen, die du gerade brauchst.

## Häufige Stolperstellen bei SQLite DESCRIBE

Beim Anzeigen der Tabellenstruktur in SQLite passieren häufig dieselben Fehler:

- Es wird `DESCRIBE table_name` wie in MySQL versucht.
- `.schema` wird in einer SQL-API verwendet, obwohl es ein CLI-Kommando ist.
- `PRAGMA table_info` wird erwartet, obwohl Indexe oder Foreign Keys gesucht werden.
- `table_info` wird genutzt, obwohl generierte oder versteckte Spalten relevant sind.
- Bei `ATTACH` wird der Schema-Name vergessen.
- `sqlite_schema` wird nicht genutzt, obwohl die CREATE-Anweisung per SQL gebraucht wird.

## SQLite einfacher verwalten mit SQLite Hub

Wenn du auf der Suche nach einem kostenlosen SQLite Manager bist, habe ich mit [SQLite Hub](https://oliverjessner.at/sqlite-hub) ein quelloffenes SQLite Management System für lokale Datenbanken gebaut. Das Tool hilft dir dabei, SQLite-Datenbanken komfortabler zu durchsuchen, Tabellenstrukturen zu prüfen, SQL-Abfragen auszuführen und deine Datenbank direkt neben dem Projekt besser zu dokumentieren. SQLite Hub ist Open Source und richtet sich an Entwickler, Solodevs und alle, die SQLite nicht nur im Terminal, sondern mit einer klaren Oberfläche nutzen möchten.

## Verwandte SQLite-Fragen

- [SQLite column names: Spaltennamen einer Tabelle auslesen](/blog/2026-06-28-sqlite-column-names-spaltennamen-einer-tabelle-auslesen/)
- [SQLite table exists: prüfen, ob eine Tabelle existiert](/blog/2026-06-28-sqlite-table-exists-pruefen-ob-eine-tabelle-existiert/)
- [SQLite ATTACH: Tabellen einer angehängten Datenbank auflisten](/blog/2026-06-28-sqlite-attach-tabellen-einer-angehaengten-datenbank-auflisten/)
- [Zur Übersicht der SQLite-Serie](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/)

## Fazit

SQLite ersetzt MySQLs `DESCRIBE` nicht durch ein einzelnes SQL-Schlüsselwort. Stattdessen nutzt du je nach Ziel `PRAGMA table_info`, `PRAGMA table_xinfo`, `.schema`, `sqlite_schema` und weitere PRAGMA-Abfragen.

Für einfache Spalteninformationen reicht `PRAGMA table_info` fast immer. Wenn du die vollständige Tabellenstruktur verstehen willst, solltest du zusätzlich die CREATE-Anweisung, Indexe und Foreign Keys prüfen.
