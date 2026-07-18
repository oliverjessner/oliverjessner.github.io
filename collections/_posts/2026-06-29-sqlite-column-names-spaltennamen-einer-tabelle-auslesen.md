---
layout: post
title: 'SQLite column names – Spaltennamen einer Tabelle auslesen'
date: 2026-06-29 09:20:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - sqlite
    - terminal
description: 'SQLite Spaltennamen auslesen: Mit PRAGMA table_info, table_xinfo und pragma_table_info bekommst du Namen, Typen und Schema-Details.'
thumbnail: '/assets/images/gen/blog/sqlite-column-names-spaltennamen-einer-tabelle-auslesen/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-column-names-spaltennamen-einer-tabelle-auslesen/header.webp'
image_width: 1200
image_height: 675
faq:
    - question: 'Wie bekomme ich Spaltennamen aus einer SQLite-Tabelle?'
      answer: 'Nutze `PRAGMA table_info(table_name)` und lies im Ergebnis die Spalte `name` aus.'
    - question: 'Wie bekomme ich nur die Spaltennamen ohne weitere Informationen?'
      answer: 'Nutze `SELECT name FROM pragma_table_info("table_name") ORDER BY cid`.'
    - question: 'Was ist der Unterschied zwischen table_info und table_xinfo?'
      answer: '`table_xinfo` zeigt zusätzliche Spalteninformationen, etwa für versteckte oder generierte Spalten.'
    - question: 'Wie frage ich Spalten in einer ATTACH-Datenbank ab?'
      answer: 'Verwende den Schema-Namen der angehängten Datenbank, zum Beispiel `PRAGMA archive.table_info(users)`.'
socialmedia:
    - 'SQLite column names: Mit `PRAGMA table_info(users)` bekommst du Namen, Typen, Defaults und Primärschlüsselinfos einer Tabelle.'
    - 'Nur Spaltennamen aus SQLite auslesen? `SELECT name FROM pragma_table_info("users") ORDER BY cid` ist oft die praktischste Form.'
    - 'Neue SQLite-Q&A: Spaltennamen einer Tabelle auslesen, `table_info` verstehen und bei Bedarf `table_xinfo` nutzen.'
---

Spaltennamen einer SQLite-Tabelle liest du am einfachsten mit `PRAGMA table_info` aus. Wenn du nur die Namen brauchst, kannst du `pragma_table_info` wie eine Tabellenfunktion verwenden und gezielt die Spalte `name` abfragen.

## Spaltennamen mit PRAGMA table_info auslesen

Für normale Tabellen reicht in SQLite meistens `PRAGMA table_info(table_name)`. Die Abfrage liefert nicht nur die Spaltennamen, sondern auch weitere Metadaten wie Datentyp, Nullbarkeit, Default-Wert und Primärschlüsselposition.

Die kurze Regel lautet: Für einen schnellen Überblick nutzt du `PRAGMA table_info`. Wenn du nur die Spaltennamen brauchst, fragst du `name` aus `pragma_table_info` ab. Für vollständigere Strukturinformationen gibt es zusätzlich `PRAGMA table_xinfo`.

Der Beitrag gehört zur SQLite-Serie [SQLite Fragen und Antworten](/blog/2026-06-29-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/). Sie sammelt kurze Lösungen für typische Fragen aus [software-development](https://oliverjessner.at/category/software-development/).

## Beispiel: Alle Spalteninformationen anzeigen

Für eine Tabelle `users` bekommst du die Spaltenmetadaten so:

```sql
PRAGMA table_info(users);
```

SQLite liefert dabei typischerweise Informationen wie:

```text
cid | name | type | notnull | dflt_value | pk
```

Die wichtigste Spalte ist in diesem Fall `name`. Dort steht der eigentliche Spaltenname.

## Nur die Spaltennamen auslesen

Wenn du wirklich nur die Spaltennamen einer SQLite-Tabelle brauchst, ist diese Form oft praktischer:

```sql
SELECT name
FROM pragma_table_info('users')
ORDER BY cid;
```

`cid` beschreibt die Position der Spalte innerhalb der Tabelle. Mit `ORDER BY cid` bekommst du die Spaltennamen in der Reihenfolge, in der sie in der Tabelle definiert wurden.

Das ist nützlich für Exporte, Generatoren, kleine Admin-Tools oder Skripte, die eine SQLite-Tabelle dynamisch auslesen sollen.

## Was PRAGMA table_info liefert

`PRAGMA table_info(users)` gibt mehrere Informationen pro Spalte zurück:

- `cid`: Position der Spalte
- `name`: Name der Spalte
- `type`: deklarierter Datentyp
- `notnull`: Angabe, ob `NOT NULL` gesetzt ist
- `dflt_value`: Default-Wert der Spalte
- `pk`: Position innerhalb des Primary Keys

Gerade wenn du eine fremde SQLite-Datenbank analysierst, ist diese Ausgabe oft hilfreicher als nur eine reine Liste der Spaltennamen.

## table_xinfo für generierte und versteckte Spalten

Für normale Tabellen reicht `table_info` fast immer. Wenn du aber generierte oder versteckte Spalten sehen möchtest, solltest du `table_xinfo` verwenden:

```sql
PRAGMA table_xinfo(users);
```

`table_xinfo` liefert zusätzliche Informationen, die `table_info` nicht immer zeigt. Das ist besonders relevant, wenn du mit komplexeren Tabellenstrukturen, virtuellen Tabellen oder generierten Spalten arbeitest.

Für einfache Datenbank-Inspektion genügt `table_info`. Für Tools, Generatoren oder Schema-Analyse ist `table_xinfo` oft die robustere Wahl.

## Spaltennamen aus einer ATTACH-Datenbank auslesen

Wenn du eine zweite SQLite-Datenbank mit `ATTACH` eingebunden hast, verwendest du den Schema-Namen der angehängten Datenbank.

Beispiel:

```sql
ATTACH DATABASE 'archive.db' AS archive;
```

Die Spalten der Tabelle `users` in dieser angehängten Datenbank fragst du dann so ab:

```sql
PRAGMA archive.table_info(users);
```

Der Name `archive` ist dabei der Alias, den du beim `ATTACH` vergeben hast. Er wird zum Schema-Namen der angehängten Datenbank.

## Spaltennamen für Views auslesen

Auch Views können mit `PRAGMA table_info` abgefragt werden:

```sql
PRAGMA table_info(active_users);
```

Dabei bekommst du die Spalten, die sich aus der View-Definition ergeben. Wichtig ist aber: Eine View ist keine physische Tabelle. Die Spalten stammen aus dem zugrunde liegenden `SELECT`.

Das ist vor allem dann relevant, wenn du ein Tool baust, das Tabellen und Views gemeinsam anzeigen oder dokumentieren soll.

## Sicherheit bei dynamischen Tabellennamen

Ein häufiger Fehler entsteht, wenn Tabellennamen aus Benutzereingaben direkt in SQL übernommen werden. Der Tabellenname in `PRAGMA table_info(users)` ist kein normaler SQL-Parameter wie ein Wert in einer `WHERE`-Bedingung.

Wenn du den Tabellennamen dynamisch setzt, solltest du ihn aus einer erlaubten Liste wählen oder vorher gegen die vorhandenen Tabellen prüfen.

Zum Beispiel kannst du Tabellen aus `sqlite_schema` laden:

```sql
SELECT name
FROM sqlite_schema
WHERE type = 'table'
ORDER BY name;
```

Danach verwendest du nur Tabellennamen, die wirklich existieren und in deinem Tool erlaubt sind.

## Typische Einsatzfälle

Spaltennamen aus SQLite auszulesen ist in vielen Situationen praktisch:

- Exportfunktionen für CSV, JSON oder Markdown
- dynamische Tabellenansichten
- einfache Admin-Oberflächen
- TypeScript-Typgeneratoren
- Datenbank-Dokumentation
- Schema-Checks in Tests
- Migrationstools
- Analyse fremder SQLite-Dateien

Für [software-development](https://oliverjessner.at/category/software-development/) ist diese Abfrage besonders nützlich, wenn du nicht nur feste SQL-Abfragen schreibst, sondern SQLite-Datenbanken automatisch analysieren oder anzeigen möchtest.

## Häufige Stolperstellen bei SQLite column names

Beim Auslesen von SQLite-Spaltennamen tauchen häufig dieselben Probleme auf:

- `PRAGMA table_info` zeigt nicht alle Details, wenn generierte oder versteckte Spalten im Spiel sind.
- Ohne `ORDER BY cid` kann eine reine Select-Abfrage die gewünschte Spaltenreihenfolge verlieren.
- Dynamische Tabellennamen sollten nicht ungeprüft aus Benutzereingaben kommen.
- Views lassen sich abfragen, sind aber keine physischen Tabellen.
- Bei `ATTACH` muss der richtige Schema-Name verwendet werden.
- Für vollständige Schema-Analyse ist `table_xinfo` oft besser als `table_info`.

## SQLite einfacher verwalten mit SQLite Hub

Wenn du auf der Suche nach einem kostenlosen SQLite Manager bist, habe ich mit [SQLite Hub](https://oliverjessner.at/sqlite-hub) ein quelloffenes SQLite Management System für lokale Datenbanken gebaut. Das Tool hilft dir dabei, SQLite-Datenbanken komfortabler zu durchsuchen, Tabellenstrukturen zu prüfen, SQL-Abfragen auszuführen und deine Datenbank direkt neben dem Projekt besser zu dokumentieren. SQLite Hub ist Open Source und richtet sich an Entwickler, Solodevs und alle, die SQLite nicht nur im Terminal, sondern mit einer klaren Oberfläche nutzen möchten.

## Verwandte SQLite-Fragen

- [SQLite DESCRIBE: Tabellenstruktur wie in MySQL anzeigen](/blog/2026-06-29-sqlite-describe-tabellenstruktur-wie-in-mysql-anzeigen/)
- [SQLite ATTACH: Tabellen einer angehängten Datenbank auflisten](/blog/2026-06-29-sqlite-attach-tabellen-einer-angehaengten-datenbank-auflisten/)
- [SQLite ALTER TABLE: Spalte zwischen zwei Spalten einfügen](/blog/2026-06-29-sqlite-alter-table-spalte-zwischen-zwei-spalten-einfuegen/)
- [Zur Übersicht der SQLite-Serie](/blog/2026-06-29-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/)

## Fazit

Für normale Tabellen ist `PRAGMA table_info` der einfachste Weg, um Spaltennamen und Spaltenmetadaten aus SQLite auszulesen. Wenn du nur die Namen brauchst, ist `SELECT name FROM pragma_table_info('users') ORDER BY cid` besonders praktisch.

Wenn du vollständige Strukturinformationen brauchst, etwa für generierte oder versteckte Spalten, solltest du zusätzlich `PRAGMA table_xinfo` verwenden.
