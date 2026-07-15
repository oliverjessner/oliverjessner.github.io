---
layout: post
title: 'SQLite export CSV – Query-Ergebnis als CSV speichern'
date: 2026-06-29 09:20:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - sqlite
    - terminal
description: 'SQLite CSV Export: Query-Ergebnis mit .headers on, .mode csv, .once oder sqlite3 -csv als CSV-Datei speichern.'
thumbnail: '/assets/images/gen/blog/sqlite-export-csv-query-ergebnis-als-csv-speichern/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-export-csv-query-ergebnis-als-csv-speichern/header.webp'
image_width: 1200
image_height: 675
faq:
    - question: 'Wie speichere ich ein SQLite-Query-Ergebnis als CSV?'
      answer: 'In der SQLite-CLI setzt du `.headers on`, `.mode csv`, `.once file.csv` und führst danach dein SELECT aus.'
    - question: 'Wie exportiere ich SQLite direkt aus dem Terminal als CSV?'
      answer: 'Du kannst `sqlite3 -header -csv database.sqlite "SELECT ..."` nutzen und die Ausgabe mit `>` in eine CSV-Datei schreiben.'
    - question: 'Warum sollte ich SELECT * beim CSV-Export vermeiden?'
      answer: 'Weil sich Spaltenreihenfolge und Spaltenanzahl bei Schema-Änderungen ändern können. Für stabile Exporte solltest du die Spalten explizit nennen.'
    - question: 'Sind .mode und .once SQL-Befehle?'
      answer: 'Nein. Das sind Kommandos der SQLite-CLI und funktionieren nicht in normalen SQL-APIs deiner Programmiersprache.'
socialmedia:
    - 'SQLite CSV Export: `.headers on`, `.mode csv`, `.once users.csv` und danach das SELECT. Kurz, reproduzierbar und gut für kleine Workflows.'
    - 'CSV aus SQLite exportieren ist einfach. Für stabile Exporte solltest du Spalten explizit wählen und nicht auf `SELECT *` bauen.'
    - 'Neue SQLite-Q&A: Query-Ergebnis als CSV speichern und warum SQLite-CLI-Kommandos keine normalen SQL-Statements sind.'
---

Mit der SQLite-CLI kannst du das Ergebnis einer SQL-Abfrage direkt als CSV-Datei speichern. Entscheidend sind drei Dinge: Header einschalten, CSV als Ausgabeformat wählen und den Zielpfad für die nächste Ausgabe setzen.

## SQLite Query-Ergebnis als CSV exportieren

Der einfachste Weg für einen SQLite CSV Export führt über die SQLite-CLI. Du setzt zuerst `.headers on`, danach `.mode csv` und leitest die nächste Ausgabe mit `.once` in eine Datei um.

Die kurze Regel lautet:

```text
.headers on
.mode csv
.once users.csv
SELECT id, email, created_at FROM users ORDER BY id;
```

Wichtig ist: `.headers`, `.mode` und `.once` sind keine normalen SQL-Befehle. Es sind Kommandos der SQLite-CLI. In SQL-APIs deiner Programmiersprache funktionieren sie deshalb nicht.

Der Beitrag gehört zur SQLite-Serie [SQLite Fragen und Antworten](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/). Sie sammelt kurze Lösungen für typische Fragen aus [software-development](https://oliverjessner.at/category/software-development/).

## Beispiel: CSV aus der SQLite-CLI speichern

Ein kompakter Export aus der SQLite-CLI sieht so aus:

```text
sqlite> .headers on
sqlite> .mode csv
sqlite> .once users.csv
sqlite> SELECT id, email, created_at FROM users ORDER BY id;
```

Danach liegt das Ergebnis der Abfrage in `users.csv`.

Die erste Zeile enthält durch `.headers on` die Spaltennamen. Durch `.mode csv` werden die Werte als CSV formatiert. `.once users.csv` sorgt dafür, dass nur die nächste Ausgabe in diese Datei geschrieben wird.

## SQLite CSV Export direkt aus dem Terminal

Für wiederholbare Workflows ist ein Terminal-Befehl oft praktischer als eine manuelle SQLite-Session.

```bash
sqlite3 -header -csv database.sqlite "SELECT id, email, created_at FROM users ORDER BY id;" > users.csv
```

Das ist besonders nützlich für kleine Skripte, Cronjobs, lokale Exporte oder schnelle Datenprüfungen.

Wenn deine Abfrage länger ist, kannst du auch ein Here-Document verwenden:

```bash
sqlite3 database.sqlite <<'SQL'
.headers on
.mode csv
.once users.csv
SELECT
    id,
    email,
    created_at
FROM users
ORDER BY id;
SQL
```

Diese Variante bleibt gut lesbar, wenn das SELECT mehrere Zeilen hat.

## Was .headers, .mode und .once machen

Die drei wichtigsten CLI-Kommandos für den SQLite CSV Export sind:

```text
.headers on   Spaltennamen in der ersten Zeile ausgeben
.mode csv     Ausgabe als CSV formatieren
.once file    nur die nächste Ausgabe in eine Datei schreiben
```

Gerade `.once` ist praktisch, weil danach die Ausgabe wieder normal in der CLI erscheint. Wenn du stattdessen dauerhaft in eine Datei schreiben möchtest, gibt es auch `.output`.

```text
.output users.csv
SELECT id, email, created_at FROM users ORDER BY id;
.output stdout
```

Für einzelne Exporte ist `.once` meistens sicherer, weil du nicht versehentlich weitere Ausgaben in dieselbe Datei schreibst.

## SELECT \* beim CSV-Export vermeiden

Für schnelle Tests ist `SELECT *` bequem. Für stabile CSV-Exporte ist es aber keine gute Grundlage.

```sql
SELECT *
FROM users;
```

Das Problem: Wenn sich deine Tabelle später ändert, ändern sich auch Spaltenanzahl oder Spaltenreihenfolge. Dadurch können nachgelagerte Tools, Imports oder Auswertungen brechen.

Besser ist ein explizites SELECT:

```sql
SELECT
    id,
    email,
    created_at
FROM users
ORDER BY id;
```

So bleibt dein CSV-Export stabil, auch wenn später weitere Spalten zur Tabelle hinzukommen.

## CSV mit WHERE und ORDER BY exportieren

Meist willst du nicht die ganze Tabelle exportieren, sondern ein gezieltes Query-Ergebnis.

```text
sqlite> .headers on
sqlite> .mode csv
sqlite> .once active_users.csv
sqlite> SELECT id, email, created_at
   ...> FROM users
   ...> WHERE active = 1
   ...> ORDER BY created_at DESC;
```

Damit exportierst du nur aktive Nutzer und legst gleichzeitig eine stabile Reihenfolge fest.

Das ist wichtig, wenn die CSV-Datei später verglichen, versioniert oder weiterverarbeitet wird.

## CSV-Datei mit Semikolon statt Komma

CSV bedeutet in der Praxis nicht immer dasselbe Format. Manche deutschsprachigen Excel-Workflows erwarten eher ein Semikolon als Trennzeichen.

In der SQLite-CLI kannst du dafür den Separator setzen:

```text
sqlite> .headers on
sqlite> .mode list
sqlite> .separator ;
sqlite> .once users.csv
sqlite> SELECT id, email, created_at FROM users ORDER BY id;
```

Das ist technisch kein klassischer Komma-CSV-Export mehr, kann aber für bestimmte Excel-Workflows praktischer sein.

Wenn du echte CSV-Regeln mit korrektem Quoting brauchst, ist `.mode csv` die sauberere Standardwahl.

## Punkt-Kommandos sind keine SQL-Statements

Ein häufiger Fehler entsteht, wenn `.mode csv` oder `.once users.csv` in Anwendungscode ausgeführt werden soll.

Das funktioniert nicht:

```sql
.mode csv
.once users.csv
SELECT id, email FROM users;
```

Diese Punkt-Kommandos gehören zur SQLite-CLI. Wenn du SQLite aus Node.js, Python, PHP, Go oder einer anderen Sprache verwendest, musst du das Query-Ergebnis im Anwendungscode lesen und dort als CSV schreiben.

Die SQL-Abfrage bleibt dann nur:

```sql
SELECT id, email, created_at
FROM users
ORDER BY id;
```

Der CSV-Export passiert außerhalb von SQLite.

## CSV aus Anwendungscode exportieren

Wenn du SQLite in einer Anwendung nutzt, ist der saubere Ablauf meistens:

```text
SELECT ausführen
Rows lesen
Spaltennamen bestimmen
CSV mit einer Bibliothek schreiben
Datei speichern
```

Das ist mehr Arbeit als in der CLI, gibt dir aber Kontrolle über Encoding, Trennzeichen, Datumsformate, Null-Werte und Dateinamen.

Für einfache Terminal-Workflows ist die SQLite-CLI schneller. Für Produktfunktionen ist ein Export im Anwendungscode meist robuster.

## Typische Stolperstellen beim SQLite CSV Export

Beim Export von SQLite nach CSV passieren häufig dieselben Fehler:

- `SELECT *` wird verwendet, obwohl der Export stabil bleiben soll.
- `.mode csv` wird in Anwendungscode genutzt, obwohl es ein CLI-Kommando ist.
- `.headers on` wird vergessen und die CSV-Datei enthält keine Spaltennamen.
- `.output` wird gesetzt und danach nicht wieder zurückgestellt.
- Datumswerte, Zahlen und leere Felder werden beim späteren Import falsch interpretiert.
- Der Zielpfad liegt nicht dort, wo man ihn erwartet.
- CSV wird als perfektes Datentypformat behandelt, obwohl es nur Text speichert.

Für [terminal](https://oliverjessner.at/category/terminal/)-Workflows und [software-development](https://oliverjessner.at/category/software-development/) ist CSV trotzdem praktisch, weil viele Tools das Format lesen können, ohne die SQLite-Datei selbst zu kennen.

## SQLite einfacher verwalten mit SQLite Hub

Wenn du auf der Suche nach einem kostenlosen SQLite Manager bist, habe ich mit [SQLite Hub](https://oliverjessner.at/sqlite-hub) ein quelloffenes SQLite Management System für lokale Datenbanken gebaut. Das Tool hilft dir dabei, SQLite-Datenbanken komfortabler zu durchsuchen, Tabellen zu bearbeiten, SQL-Abfragen auszuführen und deine Datenbank direkt neben dem Projekt besser zu dokumentieren. SQLite Hub ist Open Source und richtet sich an Entwickler, Solodevs und alle, die SQLite nicht nur im Terminal, sondern mit einer klaren Oberfläche nutzen möchten.

## Verwandte SQLite-Fragen

- [SQLite column names: Spaltennamen einer Tabelle auslesen](/blog/2026-06-28-sqlite-column-names-spaltennamen-einer-tabelle-auslesen/)
- [SQLite file extension: .db, .sqlite oder .sqlite3?](/blog/2026-06-28-sqlite-file-extension-db-sqlite-oder-sqlite3/)
- [SQLite DESCRIBE: Tabellenstruktur wie in MySQL anzeigen](/blog/2026-06-28-sqlite-describe-tabellenstruktur-wie-in-mysql-anzeigen/)
- [Zur Übersicht der SQLite-Serie](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/)

## Fazit

CSV-Exporte aus SQLite sind mit der CLI schnell erledigt. Für einfache Exporte reichen `.headers on`, `.mode csv`, `.once users.csv` und ein sauberes `SELECT`.

Für verlässliche Abläufe solltest du die Spalten explizit nennen, eine stabile Sortierung setzen und dir bewusst machen, dass Punkt-Kommandos wie `.mode` und `.once` nur in der SQLite-CLI funktionieren.
