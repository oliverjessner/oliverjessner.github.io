---
layout: post
title: 'SQLite insert multiple rows – mehrere Zeilen mit INSERT einfügen'
date: 2026-06-29 09:20:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - sqlite
    - terminal
description: 'SQLite insert multiple rows: Mehrere Zeilen mit einem INSERT einfügen, Parameter nutzen, Transaktionen verwenden und Konflikte sauber behandeln.'
thumbnail: '/assets/images/gen/blog/sqlite-insert-multiple-rows-mehrere-zeilen-in-einem-statement/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-insert-multiple-rows-mehrere-zeilen-in-einem-statement/header.webp'
faq:
    - question: 'Wie füge ich mehrere Zeilen in SQLite mit einem Statement ein?'
      answer: 'Nutze `INSERT INTO table (spalten) VALUES (...), (...), (...)`.'
    - question: 'Ist ein einzelnes großes INSERT immer die beste Lösung?'
      answer: 'Nein. Für größere Datenmengen sind wiederholte parametrisierte Inserts innerhalb einer Transaktion oft besser wartbar und kontrollierbarer.'
    - question: 'Kann ich mehrere Inserts in einer Transaktion ausführen?'
      answer: 'Ja. Eine explizite Transaktion ist häufig schneller und robuster als viele einzelne Autocommit-Inserts.'
    - question: 'Wie verhindere ich Duplikate beim Einfügen mehrerer Zeilen?'
      answer: 'Nutze passende UNIQUE Constraints und kombiniere dein INSERT bei Bedarf mit `ON CONFLICT DO NOTHING` oder `ON CONFLICT DO UPDATE`.'
socialmedia:
    - 'SQLite insert multiple rows: `INSERT INTO ... VALUES (...), (...), (...)` ist die kurze Antwort. Für größere Imports zählt aber die Transaktion.'
    - 'Mehrere SQLite-Zeilen auf einmal einfügen ist einfach. Trotzdem bleiben Parameterbindung, Konfliktregeln und Transaktionen die wichtigeren Details.'
    - 'Neue SQLite-Q&A: Mehrere Zeilen mit einem Statement einfügen und warum ein riesiges INSERT nicht immer die beste Lösung ist.'
---

SQLite kann mehrere Datensätze mit einem einzigen `INSERT`-Statement einfügen. Für kleine, feste Listen ist `INSERT INTO ... VALUES (...), (...), (...)` sehr praktisch. Für größere Datenimporte sind aber Transaktionen, Parameterbindung und saubere Konfliktregeln oft wichtiger als ein möglichst langes SQL-Statement.

## Mehrere Zeilen mit einem SQLite INSERT einfügen

Die direkte Schreibweise für mehrere Zeilen in SQLite ist ein `INSERT` mit mehreren `VALUES`-Blöcken:

```sql
INSERT INTO tags (slug, label)
VALUES
    ('sqlite', 'SQLite'),
    ('sql', 'SQL'),
    ('database', 'Database');
```

Damit werden drei Datensätze mit einem Statement eingefügt. Das ist gut lesbar, wenn die Liste klein und überschaubar bleibt.

Der Beitrag gehört zur SQLite-Serie [SQLite Fragen und Antworten](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/). Sie sammelt kurze Lösungen für typische Fragen aus [software-development](https://oliverjessner.at/category/software-development/).

## Beispiel: Tabelle anlegen und mehrere Zeilen einfügen

Angenommen, du hast eine Tabelle `tags`:

```sql
CREATE TABLE tags (
    id INTEGER PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL
);
```

Dann kannst du mehrere Zeilen so einfügen:

```sql
INSERT INTO tags (slug, label)
VALUES
    ('sqlite', 'SQLite'),
    ('sql', 'SQL'),
    ('database', 'Database');
```

SQLite legt dadurch drei neue Zeilen in der Tabelle an.

## Mehrere einzelne INSERTs in einer Transaktion

Ein einzelnes Multi-Row-INSERT ist nicht immer die beste Lösung. Gerade in Anwendungscode sind wiederholte parametrisierte Inserts innerhalb einer Transaktion oft besser wartbar.

```sql
BEGIN;

INSERT INTO tags (slug, label) VALUES ('sqlite', 'SQLite');
INSERT INTO tags (slug, label) VALUES ('sql', 'SQL');
INSERT INTO tags (slug, label) VALUES ('database', 'Database');

COMMIT;
```

Der wichtige Punkt ist hier die Transaktion. Ohne explizites `BEGIN` und `COMMIT` kann SQLite jeden Insert einzeln abschließen. Das ist bei vielen Datensätzen deutlich langsamer.

## Warum Transaktionen bei vielen Inserts wichtig sind

Wenn du viele Zeilen einfügst, solltest du sie nicht einzeln im Autocommit-Modus schreiben. Eine explizite Transaktion ist meist schneller und robuster.

Schlecht für größere Mengen:

```text
INSERT ausführen
Commit
INSERT ausführen
Commit
INSERT ausführen
Commit
```

Besser:

```text
BEGIN
viele INSERTs ausführen
COMMIT
```

So muss SQLite nicht für jede einzelne Zeile einen vollständigen Schreibvorgang abschließen. Für Imports, Seed-Daten oder Batch-Verarbeitung ist das fast immer der bessere Ansatz.

## Parameter statt SQL-Strings verwenden

In Anwendungscode solltest du Werte nicht direkt in SQL-Strings zusammenbauen. Das gilt auch dann, wenn du mehrere Zeilen einfügen möchtest.

Unsicher und schlecht wartbar wäre ein dynamisch zusammengeklebter SQL-String mit Nutzereingaben. Besser ist Parameterbindung.

Das SQL sieht dann sinngemäß so aus:

```sql
INSERT INTO tags (slug, label)
VALUES (?, ?);
```

Die Werte werden durch deine SQLite-Bibliothek gebunden. Das schützt vor SQL-Injection und vermeidet viele Fehler mit Sonderzeichen, Anführungszeichen oder NULL-Werten.

Für [software-development](https://oliverjessner.at/category/software-development/) ist das die wichtigste Regel: Auch bei mehreren Inserts bleiben Parameter die saubere Schnittstelle zwischen Anwendungscode und Datenbank.

## Multi-Row-INSERT mit Platzhaltern

Auch ein Multi-Row-INSERT kann mit Platzhaltern geschrieben werden:

```sql
INSERT INTO tags (slug, label)
VALUES
    (?, ?),
    (?, ?),
    (?, ?);
```

Das ist praktisch, wenn du eine kleine Anzahl von Zeilen in einem Statement einfügen möchtest und die Werte trotzdem sicher binden willst.

Bei sehr vielen Zeilen kann diese Form aber unübersichtlich werden. Außerdem gibt es Grenzen für die Anzahl der Parameter und die maximale Größe eines SQL-Statements. Deshalb ist eine Transaktion mit wiederholten parametrisierten Inserts oft die bessere Wahl.

## Duplikate mit ON CONFLICT behandeln

Wenn Werte eindeutig sein sollen, brauchst du einen `UNIQUE` Constraint:

```sql
CREATE TABLE tags (
    id INTEGER PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL
);
```

Wenn beim Einfügen Duplikate auftreten können, solltest du bewusst entscheiden, was passieren soll.

Wenn vorhandene Werte erhalten bleiben sollen:

```sql
INSERT INTO tags (slug, label)
VALUES
    ('sqlite', 'SQLite'),
    ('sql', 'SQL'),
    ('database', 'Database')
ON CONFLICT(slug) DO NOTHING;
```

Wenn vorhandene Werte aktualisiert werden sollen:

```sql
INSERT INTO tags (slug, label)
VALUES
    ('sqlite', 'SQLite'),
    ('sql', 'SQL'),
    ('database', 'Database')
ON CONFLICT(slug) DO UPDATE SET
    label = excluded.label;
```

Das ist sauberer, als Fehler still zu ignorieren oder später unklar zu reparieren.

## Mehrere Zeilen aus einer SELECT-Abfrage einfügen

Du kannst mehrere Zeilen auch aus einer bestehenden Tabelle oder Abfrage einfügen:

```sql
INSERT INTO archived_users (id, email, archived_at)
SELECT id, email, datetime('now')
FROM users
WHERE deleted = 1;
```

Das ist nützlich, wenn du Daten kopieren, archivieren oder aus einer bestehenden Tabelle ableiten möchtest.

Hier brauchst du keine `VALUES`-Liste. Das `SELECT` liefert die einzufügenden Zeilen.

## Grenzen großer INSERT-Statements

Ein einzelnes riesiges `INSERT` ist nicht automatisch besser. SQLite hat Grenzen für Parameteranzahl, SQL-Länge und Speicherverbrauch. Diese Grenzen hängen von Version und Build-Konfiguration ab.

Praktisch bedeutet das:

- Kleine feste Listen sind ideal für `VALUES (...), (...), (...)`.
- Größere Imports sind oft besser als Schleife mit Parametern innerhalb einer Transaktion.
- Sehr große SQL-Strings sind schwer zu debuggen.
- Parametergrenzen können schneller erreicht werden, als man denkt.
- Fehler in einem riesigen Statement sind oft mühsamer zu finden.

Für robuste Imports zählt deshalb weniger die Länge des Statements, sondern die Kombination aus Transaktion, Parametern, Batch-Größe und Fehlerbehandlung.

## Häufige Stolperstellen bei SQLite insert multiple rows

Beim Einfügen mehrerer Zeilen in SQLite passieren häufig dieselben Fehler:

- Es wird ein riesiges SQL-Statement gebaut, obwohl eine Transaktion besser wäre.
- Einzelne Inserts laufen ohne explizite Transaktion und werden dadurch langsam.
- Nutzereingaben werden direkt in SQL-Strings geschrieben.
- `SELECT *` wird für Insert-Select-Operationen genutzt, obwohl sich Spalten ändern können.
- Duplikate werden nicht mit `ON CONFLICT` behandelt.
- Parametergrenzen werden bei sehr großen Multi-Row-Inserts erreicht.
- Fehlerbehandlung und Rollback werden bei Imports vergessen.

## SQLite einfacher verwalten mit SQLite Hub

Wenn du auf der Suche nach einem kostenlosen SQLite Manager bist, habe ich mit [SQLite Hub](https://oliverjessner.at/sqlite-hub) ein quelloffenes SQLite Management System für lokale Datenbanken gebaut. Das Tool hilft dir dabei, SQLite-Datenbanken komfortabler zu durchsuchen, Tabellenstrukturen zu prüfen, SQL-Abfragen auszuführen und deine Datenbank direkt neben dem Projekt besser zu dokumentieren. SQLite Hub ist Open Source und richtet sich an Entwickler, Solodevs und alle, die SQLite nicht nur im Terminal, sondern mit einer klaren Oberfläche nutzen möchten.

## Verwandte SQLite-Fragen

- [SQLite UPSERT: INSERT ON CONFLICT statt INSERT OR REPLACE](/blog/2026-06-28-sqlite-upsert-insert-on-conflict-statt-insert-or-replace/)
- [SQLite concurrency: Schreibkonflikte und database is locked vermeiden](/blog/2026-06-28-sqlite-concurrency-schreibkonflikte-vermeiden/)
- [SQLite Transaktionen: BEGIN, COMMIT und ROLLBACK richtig nutzen](/blog/2026-06-28-sqlite-transaktionen-begin-commit-rollback-richtig-nutzen/)
- [Zur Übersicht der SQLite-Serie](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/)

## Fazit

Mehrere Zeilen in SQLite kannst du mit `INSERT INTO ... VALUES (...), (...), (...)` in einem Statement einfügen. Für kleine Listen ist das einfach und gut lesbar.

Für echte Datenimporte sind aber Transaktionen, Parameterbindung und klare Konfliktregeln wichtiger als ein möglichst großes einzelnes SQL-Statement.
