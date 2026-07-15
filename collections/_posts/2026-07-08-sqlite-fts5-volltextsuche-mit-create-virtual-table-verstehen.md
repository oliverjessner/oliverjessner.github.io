---
layout: post
title: 'SQLite FTS5: Volltextsuche mit CREATE VIRTUAL TABLE verstehen'
date: 2026-07-08 21:33:07 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - sqlite
    - terminal
description: 'SQLite FTS5 macht Volltextsuche direkt in der Datenbank möglich und erklärt nebenbei, warum plötzlich mehrere Shadow Tables auftauchen'
thumbnail: '/assets/images/gen/blog/sqlite-fts5-volltextsuche-mit-create-virtual-table-verstehen/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-fts5-volltextsuche-mit-create-virtual-table-verstehen/header.webp'
image_width: 1280
image_height: 853
faq:
    - question: 'Was ist FTS5 in SQLite?'
      answer: 'FTS5 ist ein Virtual-Table-Modul für Volltextsuche. Es zerlegt Texte in Tokens und verwaltet einen speziellen Suchindex für schnelle Textabfragen.'
    - question: 'Warum erstellt FTS5 mehrere zusätzliche Tabellen?'
      answer: 'FTS5 speichert Indexdaten, Inhalte, Dokumentgrößen und Konfiguration in sogenannten Shadow Tables wie notes_data, notes_idx oder notes_content.'
    - question: 'Wann sollte ich FTS5 statt LIKE verwenden?'
      answer: 'FTS5 eignet sich für Volltextsuche in größeren Textbeständen, wenn Wörter, Phrasen, Präfixe oder nach Relevanz sortierte Treffer gesucht werden sollen.'
socialmedia:
    - 'SQLite kann Volltextsuche direkt in der Datenbank. Ein Blick auf FTS5, CREATE VIRTUAL TABLE und die Frage, warum plötzlich notes_data, notes_idx und weitere Tabellen auftauchen.'
    - 'Was macht CREATE VIRTUAL TABLE notes USING fts5(title, body) eigentlich? Ich erkläre FTS5, MATCH, Tokenisierung, Relevanz und die automatisch erzeugten Shadow Tables.'
    - 'LIKE ist nicht immer die richtige Lösung für Textsuche. SQLite bringt mit FTS5 eine echte Volltextsuche mit. So funktioniert sie und deshalb entstehen mehrere interne Tabellen.'
---

SQLite kann mehr als relationale Tabellen und einfache `LIKE`-Abfragen. Mit FTS5 lässt sich eine lokale Volltextsuche aufbauen. Dabei entstehen neben einer Virtual Table mehrere Shadow Tables. Was passiert dort eigentlich?

## Was ist SQLite FTS5?

FTS5 steht für "Full Text Search 5" und ist ein Modul für Volltextsuche in SQLite. Es ist für Fälle gedacht, in denen größere Mengen Text nicht nur gespeichert, sondern effizient durchsucht werden sollen.

Ein typisches Beispiel sieht so aus:

```sql
CREATE VIRTUAL TABLE notes USING fts5(title, body);
```

Auf den ersten Blick erinnert das an ein normales `CREATE TABLE`. Der entscheidende Unterschied steckt jedoch in `VIRTUAL` und `USING fts5`.

`notes` ist keine gewöhnliche SQLite-Tabelle. Sie wird durch das FTS5-Modul bereitgestellt und verhält sich gegenüber SQL-Abfragen in vielen Situationen wie eine Tabelle. Intern übernimmt aber FTS5 die Speicherung und Suche.

Genau dafür existiert in SQLite der Mechanismus der [Virtual Tables](https://www.sqlite.org/vtab.html). Ein Modul kann damit eine tabellenähnliche Schnittstelle anbieten, obwohl hinter dieser Schnittstelle eine spezielle Implementierung arbeitet.

FTS5 nutzt diesen Mechanismus für Volltextsuche.

## Warum reicht eine normale Textspalte nicht?

Nehmen wir eine gewöhnliche Tabelle:

```sql
CREATE TABLE notes (
    id INTEGER PRIMARY KEY,
    title TEXT,
    body TEXT
);
```

Eine einfache Suche könnte mit `LIKE` erfolgen:

```sql
SELECT *
FROM notes
WHERE body LIKE '%sqlite%';
```

Für kleine Datenmengen kann das völlig ausreichend sein. Die Abfrage beschreibt aber im Kern eine Mustersuche innerhalb des Textes. Besonders ein Suchmuster mit führendem `%` lässt sich nicht mit einem gewöhnlichen B-Tree-Index in eine klassische schnelle Lookup-Abfrage verwandeln.

FTS5 verfolgt einen anderen Ansatz. Der Text wird beim Einfügen analysiert und in durchsuchbare Einheiten zerlegt. Aus diesen Tokens entsteht ein spezieller Volltextindex.

Vereinfacht gesagt speichert FTS5 nicht nur:

```text
Dokument 1 -> "SQLite ist eine lokale Datenbank"
```

sondern baut eine Struktur auf, über die sich Begriffe gezielt Dokumenten zuordnen lassen:

```text
sqlite     -> Dokument 1
ist        -> Dokument 1
eine       -> Dokument 1
lokale     -> Dokument 1
datenbank  -> Dokument 1
```

In der Praxis ist die interne Struktur deutlich komplexer und kompakter. Das Grundprinzip erklärt aber, warum Volltextsuche anders funktioniert als eine normale Suche mit `LIKE`.

## Ein einfaches SQLite-FTS5-Beispiel

Die virtuelle Tabelle wird mit zwei durchsuchbaren Spalten angelegt:

```sql
CREATE VIRTUAL TABLE notes USING fts5(title, body);
```

Danach lassen sich Daten ähnlich wie in eine normale Tabelle einfügen:

```sql
INSERT INTO notes (title, body)
VALUES (
    'SQLite Volltextsuche',
    'FTS5 ermöglicht eine schnelle Volltextsuche direkt in SQLite.'
);
```

Ein zweiter Eintrag:

```sql
INSERT INTO notes (title, body)
VALUES (
    'Git Notizen',
    'Einige praktische Befehle für Branches, Commits und Rebase.'
);
```

Gesucht wird typischerweise mit `MATCH`:

```sql
SELECT *
FROM notes
WHERE notes MATCH 'sqlite';
```

FTS5 durchsucht dabei standardmäßig alle indexierten Spalten der virtuellen Tabelle.

In diesem Fall findet die Abfrage den ersten Eintrag, weil der Begriff "sqlite" im Titel und im Text vorkommt.

## Wie funktioniert FTS5 intern?

Der wichtigste Schritt ist die Tokenisierung.

Wenn Text in die FTS5-Tabelle geschrieben wird, zerlegt ein Tokenizer den Inhalt in einzelne Suchbegriffe. Der standardmäßige `unicode61`-Tokenizer behandelt zusammenhängende Zeichenfolgen aus Buchstaben und Zahlen als Tokens und arbeitet bei der Suche ohne Unterscheidung zwischen Groß- und Kleinschreibung.

Aus:

```text
SQLite ist eine lokale Datenbank.
```

werden vereinfacht Tokens wie:

```text
sqlite
ist
eine
lokale
datenbank
```

FTS5 speichert anschließend Informationen darüber, in welchen Datensätzen, Spalten und Positionen diese Tokens vorkommen.

Dadurch kann die Suchmaschine bei:

```sql
SELECT *
FROM notes
WHERE notes MATCH 'datenbank';
```

gezielt den Volltextindex verwenden, statt jeden vollständigen Textwert Zeichen für Zeichen durchsuchen zu müssen.

Die genaue Funktionsweise und die verfügbaren Optionen beschreibt die offizielle [FTS5-Dokumentation von SQLite](https://www.sqlite.org/fts5.html).

## Der Tokenizer bestimmt, was ein Suchbegriff ist

Die Tokenisierung ist wichtiger, als sie zunächst wirkt. Eine Volltextsuche sucht nicht automatisch nach beliebigen Zeichenfolgen.

Bei der Standardkonfiguration:

```sql
CREATE VIRTUAL TABLE notes USING fts5(title, body);
```

verwendet FTS5 standardmäßig den `unicode61`-Tokenizer.

SQLite bringt mehrere Tokenizer mit:

- `unicode61`
- `ascii`
- `porter`
- `trigram`

Der `porter`-Tokenizer kann für englische Texte interessant sein, weil er Wortstämme berücksichtigt. Der `trigram`-Tokenizer verfolgt einen anderen Ansatz und zerlegt Text in Sequenzen aus drei Zeichen. Damit werden allgemeinere Teilstring-Suchen möglich.

Eine Tabelle mit Trigram-Tokenizer könnte so aussehen:

```sql
CREATE VIRTUAL TABLE notes
USING fts5(
    title,
    body,
    tokenize = 'trigram'
);
```

Das sollte allerdings eine bewusste Entscheidung sein. Tokenizer verändern das Suchverhalten und können auch Auswirkungen auf Indexgröße und Suchlogik haben.

Für klassische Notizen, Dokumente oder Wissensdatenbanken ist die Standardkonfiguration oft ein vernünftiger Ausgangspunkt.

## SQLite FTS5 mit MATCH durchsuchen

Die einfachste Volltextabfrage lautet:

```sql
SELECT *
FROM notes
WHERE notes MATCH 'sqlite';
```

FTS5 kann aber deutlich mehr als einzelne Begriffe suchen.

### Nur in einer bestimmten Spalte suchen

Soll ausschließlich der Titel durchsucht werden:

```sql
SELECT *
FROM notes
WHERE title MATCH 'sqlite';
```

Alternativ lässt sich ein Spaltenfilter direkt in der FTS5-Abfrage verwenden:

```sql
SELECT *
FROM notes
WHERE notes MATCH 'title:sqlite';
```

Das ist beispielsweise bei Dokumentationen praktisch, wenn ein Treffer im Titel anders behandelt werden soll als ein Begriff tief im Fließtext.

### Nach einer Phrase suchen

Für zusammenhängende Begriffe lassen sich Phrasen verwenden:

```sql
SELECT *
FROM notes
WHERE notes MATCH '"lokale datenbank"';
```

Damit wird nicht einfach unabhängig nach "lokale" und "datenbank" gesucht. Die Phrase selbst ist relevant.

### Begriffe logisch kombinieren

FTS5 unterstützt boolesche Operatoren:

```sql
SELECT *
FROM notes
WHERE notes MATCH 'sqlite AND datenbank';
```

Oder:

```sql
SELECT *
FROM notes
WHERE notes MATCH 'sqlite OR duckdb';
```

Auch Ausschlüsse sind möglich:

```sql
SELECT *
FROM notes
WHERE notes MATCH 'sqlite NOT browser';
```

Gerade bei größeren Dokumentbeständen kann daraus eine deutlich flexiblere Suche entstehen als mit einer Sammlung verschachtelter `LIKE`-Bedingungen.

### Nach Präfixen suchen

FTS5 unterstützt Präfixabfragen:

```sql
SELECT *
FROM notes
WHERE notes MATCH 'daten*';
```

Je nach Inhalt können damit Tokens gefunden werden, die mit dem angegebenen Präfix beginnen.

Für häufige Präfixsuchen lassen sich beim Erstellen der Tabelle zusätzliche Prefix-Indexes konfigurieren:

```sql
CREATE VIRTUAL TABLE notes
USING fts5(
    title,
    body,
    prefix = '2 3 4'
);
```

Das kann solche Abfragen beschleunigen, benötigt aber zusätzlichen Speicherplatz für weitere Indexstrukturen.

## Treffer nach Relevanz sortieren

Eine Volltextsuche wird schnell unpraktisch, wenn alle Treffer gleich behandelt werden. FTS5 stellt deshalb eine Relevanzbewertung bereit.

Eine einfache Sortierung sieht so aus:

```sql
SELECT *
FROM notes
WHERE notes MATCH 'sqlite'
ORDER BY rank;
```

Alternativ lässt sich die eingebaute Funktion `bm25()` verwenden:

```sql
SELECT
    title,
    body,
    bm25(notes) AS score
FROM notes
WHERE notes MATCH 'sqlite'
ORDER BY score;
```

BM25 ist ein etabliertes Verfahren zur Bewertung von Suchtreffern. Vereinfacht berücksichtigt die Bewertung unter anderem, wie häufig ein Begriff in einem Dokument vorkommt und wie aussagekräftig dieser Begriff im Verhältnis zum gesamten Dokumentbestand ist.

FTS5 erlaubt außerdem unterschiedliche Gewichtungen für Spalten.

Bei:

```sql
CREATE VIRTUAL TABLE notes USING fts5(title, body);
```

könnte der Titel stärker gewichtet werden:

```sql
SELECT
    title,
    body,
    bm25(notes, 5.0, 1.0) AS score
FROM notes
WHERE notes MATCH 'sqlite'
ORDER BY score;
```

Das kann für eine Suchoberfläche sinnvoll sein, weil ein Begriff im Titel häufig relevanter ist als derselbe Begriff irgendwo in einem langen Text.

## Treffer mit highlight() und snippet() anzeigen

Für eine praktische Suche reicht die Trefferliste allein oft nicht. Nutzer möchten sehen, warum ein Dokument gefunden wurde.

FTS5 stellt dafür unter anderem `highlight()` bereit:

```sql
SELECT
    title,
    highlight(notes, 1, '<mark>', '</mark>') AS body
FROM notes
WHERE notes MATCH 'sqlite';
```

Die `1` verweist hier auf die zweite FTS5-Spalte, also `body`.

Passende Begriffe können dadurch im Ergebnis markiert werden.

Für kompakte Vorschauen gibt es `snippet()`:

```sql
SELECT
    title,
    snippet(
        notes,
        1,
        '<mark>',
        '</mark>',
        '...',
        20
    ) AS preview
FROM notes
WHERE notes MATCH 'sqlite';
```

Damit lässt sich eine Suchoberfläche bauen, die nur einen relevanten Ausschnitt aus einem längeren Text zeigt.

Solche Details sind ein gutes Beispiel dafür, warum FTS5 mehr ist als eine schnellere Variante von `LIKE`. Das Modul stellt Bausteine für eine tatsächliche Suchfunktion bereit.

## Warum erstellt FTS5 plötzlich fünf weitere Tabellen?

Nach diesem Befehl:

```sql
CREATE VIRTUAL TABLE notes USING fts5(title, body);
```

kann ein Blick in das SQLite-Schema zunächst überraschen.

Neben `notes` erscheinen bei der Standardkonfiguration typischerweise weitere Tabellen:

```text
notes_config
notes_content
notes_data
notes_docsize
notes_idx
```

Diese Tabellen sind kein Fehler und auch keine versehentlich erzeugten Duplikate. Es handelt sich um sogenannte Shadow Tables.

SQLite beschreibt Shadow Tables als reale Tabellen, die von bestimmten Virtual-Table-Modulen zur persistenten Speicherung verwendet werden. Bei FTS5 entstehen abhängig von der Konfiguration zwischen drei und fünf solcher Tabellen.

Wichtig ist die Unterscheidung:

```text
notes
```

ist die virtuelle FTS5-Tabelle.

Die Tabellen:

```text
notes_config
notes_content
notes_data
notes_docsize
notes_idx
```

sind reale interne Tabellen, über die FTS5 seine Daten verwaltet.

## Was speichert notes_data?

`notes_data` enthält den größten Teil der eigentlichen Volltextindex-Daten.

Vereinfacht ist das ein zentraler Bereich der internen Suchstruktur. Die Daten liegen nicht als bequem lesbare Liste aus Begriffen und Dokumenten vor, sondern kompakt in binärer Form.

Das Schema entspricht intern grundsätzlich einer Struktur dieser Art:

```sql
CREATE TABLE notes_data (
    id INTEGER PRIMARY KEY,
    block BLOB
);
```

Die BLOB-Daten gehören zur internen FTS5-Implementierung. Anwendungen sollten sie nicht selbst interpretieren oder verändern.

## Was speichert notes_idx?

`notes_idx` enthält weitere Informationen für den Volltextindex.

Die offizielle Dokumentation beschreibt diese Tabelle als den verbleibenden Teil der Indexdaten. Sie ist normalerweise wesentlich kleiner als `notes_data`.

Vereinfacht sieht die Struktur so aus:

```sql
CREATE TABLE notes_idx (
    segid,
    term,
    pgno,
    PRIMARY KEY(segid, term)
) WITHOUT ROWID;
```

FTS5 organisiert den Index intern in Segmentstrukturen. `notes_idx` unterstützt dabei den Zugriff auf Bereiche dieser internen Indexdaten.

Auch hier gilt: Die Tabelle gehört FTS5.

## Was speichert notes_content?

`notes_content` enthält bei einer normalen FTS5-Tabelle die tatsächlich eingefügten Inhalte.

Bei:

```sql
CREATE VIRTUAL TABLE notes USING fts5(title, body);
```

werden die Werte aus `title` und `body` intern in dieser Shadow Table gespeichert.

Vereinfacht:

```sql
CREATE TABLE notes_content (
    id INTEGER PRIMARY KEY,
    c0,
    c1
);
```

Dabei entspricht:

```text
c0 -> title
c1 -> body
```

Diese technischen Spaltennamen sind ein Implementierungsdetail.

Das erklärt auch einen Punkt, der bei FTS5 leicht übersehen wird: Eine normale, in sich geschlossene FTS5-Tabelle speichert nicht nur einen Suchindex. Sie hält standardmäßig auch die eingefügten Inhalte vor.

## Was speichert notes_docsize?

`notes_docsize` speichert Größeninformationen zu den Spalten einzelner Datensätze. Die Größen werden in Tokens erfasst.

Vereinfacht:

```sql
CREATE TABLE notes_docsize (
    id INTEGER PRIMARY KEY,
    sz BLOB
);
```

Diese Informationen können unter anderem für bestimmte Hilfsfunktionen und Relevanzberechnungen relevant sein.

Wird eine FTS5-Tabelle mit:

```sql
columnsize = 0
```

erstellt, ist diese Shadow Table nicht vorhanden.

## Was speichert notes_config?

`notes_config` enthält persistente Konfigurationsparameter der FTS5-Tabelle.

Vereinfacht:

```sql
CREATE TABLE notes_config (
    k PRIMARY KEY,
    v
) WITHOUT ROWID;
```

Auch diese Tabelle ist Teil der internen Verwaltung von FTS5.

## Warum sind es manchmal nur drei oder vier Shadow Tables?

FTS5 erstellt laut SQLite-Dokumentation abhängig von der Konfiguration zwischen drei und fünf reale Shadow Tables.

Die Standardvariante:

```sql
CREATE VIRTUAL TABLE notes USING fts5(title, body);
```

führt typischerweise zu allen fünf:

```text
notes_data
notes_idx
notes_config
notes_docsize
notes_content
```

Bestimmte Konfigurationen verändern das.

Eine Contentless- oder External-Content-FTS5-Tabelle besitzt beispielsweise keine eigene `_content`-Tabelle. Wird zusätzlich `columnsize = 0` verwendet, entfällt `_docsize`.

Deshalb ist die Anzahl der internen Tabellen nicht bei jeder FTS5-Konfiguration identisch.

## Warnhinweis: Shadow Tables nicht direkt bearbeiten

Die automatisch erzeugten Tabellen sind sichtbar und lassen sich deshalb leicht mit gewöhnlichen Anwendungstabellen verwechseln.

Sie sollten trotzdem nicht direkt verändert werden.

Also nicht:

```sql
DELETE FROM notes_data;
```

und auch nicht:

```sql
UPDATE notes_idx
SET term = 'test';
```

FTS5 erwartet, dass seine internen Strukturen konsistent bleiben. Direkte Änderungen können den Volltextindex beschädigen oder zu widersprüchlichen Ergebnissen führen.

Für Anwendungen, Datenbankbrowser und andere Werkzeuge aus dem Bereich [Software Engineering](https://oliverjessner.at/category/software-engineering/) ist diese Unterscheidung relevant. Eine Shadow Table ist technisch eine reale Tabelle, semantisch aber Teil der Implementierung einer Virtual Table.

## Hat eine FTS5 Virtual Table eine ID?

Eine FTS5-Tabelle kann nicht einfach wie eine normale Tabelle mit einer eigenen `PRIMARY KEY`-Definition erstellt werden.

Folgendes ist deshalb nicht die normale FTS5-Syntax:

```sql
CREATE VIRTUAL TABLE notes USING fts5(
    id INTEGER PRIMARY KEY,
    title,
    body
);
```

FTS5-Tabellen besitzen stattdessen ein implizites ganzzahliges Feld namens `rowid`.

Eine Abfrage kann es direkt auslesen:

```sql
SELECT
    rowid,
    title,
    body
FROM notes;
```

Beim Einfügen lässt sich eine `rowid` auch explizit setzen:

```sql
INSERT INTO notes (
    rowid,
    title,
    body
)
VALUES (
    42,
    'SQLite FTS5',
    'Eine Notiz über Volltextsuche.'
);
```

Danach:

```sql
SELECT *
FROM notes
WHERE rowid = 42;
```

Das ist besonders wichtig, wenn eine FTS5-Tabelle mit Datensätzen aus einer normalen Tabelle verknüpft werden soll.

## Normale Tabelle und FTS5-Index trennen

Nicht jede Anwendung sollte ihre eigentlichen Inhalte ausschließlich in einer FTS5-Tabelle speichern.

Eine häufig sinnvolle Architektur besteht aus einer normalen Tabelle:

```sql
CREATE TABLE notes (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TEXT NOT NULL
);
```

und einer separaten FTS5-Tabelle für die Suche:

```sql
CREATE VIRTUAL TABLE notes_fts
USING fts5(
    title,
    body,
    content = 'notes',
    content_rowid = 'id'
);
```

Das ist eine sogenannte External-Content-Konfiguration.

Der Vorteil liegt in einer klareren Trennung:

```text
notes     -> fachliche Daten
notes_fts -> Volltextindex
```

Allerdings entsteht dadurch eine zusätzliche Verantwortung. Änderungen an der normalen Tabelle und am FTS5-Index müssen konsistent gehalten werden. Typischerweise geschieht das über passende Trigger oder explizite Anwendungslogik.

Eine External-Content-Tabelle ist deshalb nicht automatisch die bessere Lösung. Sie ist eine Architekturentscheidung.

## Wann ist SQLite FTS5 sinnvoll?

FTS5 passt besonders gut zu Anwendungen, die viele längere Texte lokal durchsuchen müssen.

Typische Beispiele sind:

- Notiz-Apps
- Markdown-Sammlungen
- lokale Dokumentationen
- E-Mail-Archive
- Wissensdatenbanken
- Chatverläufe
- Support-Tickets
- Offline-Suchen
- Desktop-Anwendungen
- lokale Entwicklerwerkzeuge

Gerade SQLite-basierte Anwendungen können damit eine Suchfunktion anbieten, ohne zusätzlich einen externen Suchserver betreiben zu müssen.

## Wann reicht LIKE trotzdem aus?

FTS5 ist nicht automatisch für jede Textsuche die beste Wahl.

Eine einfache Abfrage wie:

```sql
SELECT *
FROM users
WHERE username LIKE 'oli%';
```

braucht nicht zwingend eine Volltextsuchmaschine.

Auch bei:

- wenigen Datensätzen
- kurzen Textfeldern
- exakten Filtern
- einfachen Präfixabfragen
- administrativen Suchmasken

kann eine normale SQL-Lösung verständlicher und ausreichend schnell sein.

FTS5 bringt zusätzliche Strukturen, Konfigurationsmöglichkeiten und Speicherbedarf mit. Es lohnt sich vor allem dann, wenn tatsächlich ein Volltextproblem gelöst werden soll.

## Virtual und Shadow Tables in SQLite Hub besser sichtbar machen

Weil mich bei anderen SQLite-Managern lange genervt hat, dass Virtual und Shadow Tables kaum visuell unterschieden werden, habe ich dafür auch ein Feature in SQLite Hub gebaut. Seit Version 2.1.0 kennzeichnet das Tool beide Tabellentypen direkt in der Oberfläche und behandelt Shadow Tables im Row Editor read-only. Mehr dazu im Beitrag [SQLite Hub 2.1.0: Virtual und Shadow Tables jetzt visuell sichtbar.](https://oliverjessner.at/blog/2026-07-08-sqlite-hub-2-1-0-virtual-und-shadow-tables-jetzt-visuell-sichtbar/)
