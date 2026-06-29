---
layout: post
title: 'SQLite concurrency – Schreibkonflikte und database is locked vermeiden'
date: 2026-06-29 09:20:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - sqlite
    - terminal
description: 'SQLite concurrency richtig verstehen: database is locked vermeiden, WAL nutzen, busy_timeout setzen und Schreibtransaktionen kurz halten.'
thumbnail: '/assets/images/gen/blog/sqlite-concurrency-schreibkonflikte-vermeiden/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-concurrency-schreibkonflikte-vermeiden/header.webp'
faq:
    - question: 'Wie vermeide ich SQLite concurrency problems?'
      answer: 'Halte Schreibtransaktionen kurz, aktiviere WAL für passende Workloads, setze einen Busy-Timeout und vermeide lange offene Schreibvorgänge.'
    - question: 'Kann SQLite mehrere gleichzeitige Schreiber verarbeiten?'
      answer: 'SQLite kann mehrere Leser gleichzeitig bedienen, erlaubt aber grundsätzlich nur einen aktiven Schreiber zur gleichen Zeit.'
    - question: 'Hilft WAL gegen database is locked?'
      answer: 'WAL hilft bei vielen Lese- und Schreibmustern, ersetzt aber keine kurzen Transaktionen, keinen Busy-Timeout und keine saubere Fehlerbehandlung.'
    - question: 'Was macht PRAGMA busy_timeout in SQLite?'
      answer: '`busy_timeout` gibt SQLite Zeit, auf eine freie Sperre zu warten, bevor ein Fehler wie `database is locked` zurückgegeben wird.'
socialmedia:
    - 'SQLite concurrency: Viele Probleme entstehen nicht durch SQLite selbst, sondern durch lange Schreibtransaktionen. WAL, busy_timeout und kurze Writes helfen.'
    - 'SQLite kann viele Leser bedienen, aber nur einen Schreiber gleichzeitig. Wer das akzeptiert, baut deutlich robustere lokale Datenbank-Workflows.'
    - 'Neue SQLite-Q&A: database is locked vermeiden, WAL sinnvoll nutzen und Schreibtransaktionen kurz halten.'
---

SQLite kann mehrere Leser gleichzeitig gut bedienen, aber Schreibzugriffe müssen bewusst koordiniert werden. Viele Concurrency-Probleme entstehen nicht, weil SQLite ungeeignet wäre, sondern weil Transaktionen zu lange offen bleiben, Schreibzugriffe ungünstig gebündelt werden oder die Datenbankdatei an einem problematischen Speicherort liegt.

## SQLite Concurrency richtig verstehen

Wenn du in SQLite Fehler wie `database is locked` siehst, liegt das häufig an gleichzeitigen Schreibzugriffen oder zu langen Transaktionen. Die wichtigste Regel lautet: SQLite erlaubt viele gleichzeitige Leser, aber grundsätzlich nur einen aktiven Schreiber zur gleichen Zeit.

Für viele lokale Anwendungen, Desktop-Tools, CLIs, kleine Web-Apps und interne Admin-Oberflächen ist das völlig ausreichend. Wichtig ist nur, dass du SQLite nicht wie eine klassische Client-Server-Datenbank behandelst, sondern Schreibzugriffe kurz und kontrolliert hältst.

Der Beitrag gehört zur SQLite-Serie [SQLite Fragen und Antworten](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/). Sie sammelt kurze Lösungen für typische Fragen aus [software-development](https://oliverjessner.at/category/software-development/).

## Warum SQLite nur einen Schreiber gleichzeitig zulässt

SQLite arbeitet direkt mit einer Datenbankdatei. Dadurch ist es sehr einfach zu betreiben, braucht keinen eigenen Server und eignet sich hervorragend für lokale Anwendungen. Der Preis dafür ist: Schreibzugriffe auf diese Datei müssen sauber gesperrt werden.

Lesende Zugriffe sind meist unproblematisch. Kritisch wird es, wenn mehrere Prozesse oder Threads gleichzeitig schreiben wollen. Dann kann SQLite nicht einfach mehrere Schreibvorgänge parallel in dieselbe Datei schreiben lassen.

Das bedeutet nicht, dass SQLite schlecht mit Concurrency umgehen kann. Es bedeutet nur, dass du dein Schreibmuster passend entwerfen musst.

## WAL aktivieren

Ein guter Startpunkt für viele Anwendungen ist der WAL-Modus:

```sql
PRAGMA journal_mode = WAL;
```

WAL steht für Write-Ahead Logging. In vielen Workloads können Leser und Schreiber dadurch besser nebeneinander arbeiten. Besonders bei Anwendungen, die häufig lesen und gelegentlich schreiben, kann WAL deutlich helfen.

Wichtig ist aber: WAL hebt die Grundregel nicht auf. Auch mit WAL gibt es nicht mehrere gleichzeitige aktive Schreiber. WAL verbessert viele Lese- und Schreibmuster, ersetzt aber kein sauberes Transaktionsdesign.

## Busy-Timeout setzen

Wenn eine Datenbank gerade gesperrt ist, soll SQLite nicht immer sofort mit `database is locked` abbrechen. Mit `busy_timeout` gibst du SQLite Zeit, auf eine freie Sperre zu warten.

```sql
PRAGMA busy_timeout = 5000;
```

Dieser Wert bedeutet: SQLite wartet bis zu 5000 Millisekunden, bevor ein Busy-Fehler zurückgegeben wird.

Das ist oft sinnvoll, weil kurze Schreibvorgänge meist schnell wieder fertig sind. `busy_timeout` ist aber kein Ersatz für gutes Design. Wenn Transaktionen dauerhaft zu lange offen bleiben, verschiebt der Timeout das Problem nur.

## Schreibtransaktionen kurz halten

Die wichtigste Regel bei SQLite Concurrency ist einfach: Öffne eine Schreibtransaktion so spät wie möglich und schließe sie so früh wie möglich.

Schlecht ist dieses Muster:

```text
Transaktion öffnen
Daten vorbereiten
API aufrufen
Dateien lesen
mehrere Berechnungen durchführen
Daten schreiben
Transaktion schließen
```

Besser ist dieses Muster:

```text
Daten vorbereiten
API aufrufen
Dateien lesen
Berechnungen durchführen
Transaktion öffnen
Daten schreiben
Transaktion schließen
```

Die Transaktion sollte nur den eigentlichen Schreibvorgang umfassen. Alles, was vorher berechnet, geladen oder vorbereitet werden kann, sollte außerhalb der Transaktion passieren.

## Beispiel: Kurzer Schreibvorgang mit BEGIN IMMEDIATE

Ein kontrollierter Schreibvorgang kann so aussehen:

```sql
BEGIN IMMEDIATE;

UPDATE jobs
SET status = 'done'
WHERE id = 42;

COMMIT;
```

`BEGIN IMMEDIATE` versucht früh eine Schreibsperre zu bekommen. Das kann sinnvoll sein, wenn du vermeiden möchtest, dass eine Transaktion erst später beim Schreiben scheitert.

Für einfache Anwendungen reicht oft auch eine normale Transaktion. Wichtig ist weniger die konkrete Variante, sondern dass die Transaktion kurz bleibt und Fehler sauber behandelt werden.

## Typisches Setup für lokale Anwendungen

Für viele lokale SQLite-Anwendungen ist dieses Setup ein guter Ausgangspunkt:

```sql
PRAGMA journal_mode = WAL;
PRAGMA busy_timeout = 5000;
```

Dazu kommt im Anwendungscode:

- Schreibtransaktionen kurz halten
- Schreibvorgänge bewusst bündeln
- Fehler wie `database is locked` sauber behandeln
- keine langen offenen Verbindungen mit aktiven Transaktionen halten
- Datenbankdateien lokal speichern
- keine SQLite-Dateien in problematischen Sync- oder Netzlaufwerken aktiv beschreiben

Das ist keine Garantie gegen jedes Locking-Problem, aber eine solide Grundlage.

## Warum lange Transaktionen problematisch sind

Lange Transaktionen sind eine der häufigsten Ursachen für Concurrency-Probleme in SQLite. Eine Transaktion bleibt oft länger offen als gedacht, zum Beispiel weil Anwendungscode innerhalb der Transaktion noch weitere Arbeit erledigt.

Problematisch sind unter anderem:

- langsame API-Calls innerhalb einer Transaktion
- Dateizugriffe innerhalb einer Transaktion
- große Imports ohne sinnvolle Bündelung
- UI-Interaktionen während offener Transaktion
- vergessene Commits oder Rollbacks
- lange laufende Hintergrundjobs

Für [software-development](https://oliverjessner.at/category/software-development/) ist die wichtigste Gewohnheit: erst vorbereiten, dann schreiben, dann sofort committen.

## database is locked richtig einordnen

Der Fehler `database is locked` bedeutet nicht automatisch, dass die Datenbank kaputt ist. Meist sagt SQLite nur: Ein anderer Zugriff hält gerade eine Sperre, die für deine Operation benötigt wird.

Typische Ursachen sind:

- Ein anderer Prozess schreibt gerade.
- Eine Transaktion wurde geöffnet und nicht beendet.
- Ein Import hält die Datenbank lange blockiert.
- Ein Tool hat die Datenbank geöffnet und schreibt selbst.
- Die Datei liegt in einem Cloud-Sync-Ordner.
- Die Datei liegt auf einem Netzlaufwerk.
- Mehrere Worker schreiben unkoordiniert in dieselbe Datenbank.

Die Lösung ist nicht immer "mehr Timeout". Oft ist die bessere Lösung, das Schreibmuster zu ändern.

## Schreibzugriffe bündeln oder serialisieren

Wenn mehrere Teile deiner Anwendung schreiben wollen, kann es sinnvoll sein, Schreibzugriffe bewusst zu bündeln oder über eine zentrale Schreiblogik laufen zu lassen.

Statt überall im Code direkt in SQLite zu schreiben, kannst du zum Beispiel:

- eine zentrale Write-Queue verwenden
- Jobs nacheinander abarbeiten
- kleine Änderungen in einer kurzen Transaktion bündeln
- Hintergrundimporte getrennt von interaktiven Writes planen
- Schreibzugriffe in einem Prozess koordinieren

Das ist besonders hilfreich, wenn mehrere Worker, CLI-Befehle oder Hintergrundtasks dieselbe SQLite-Datei verwenden.

## Netzlaufwerke und Cloud-Sync vermeiden

SQLite funktioniert am zuverlässigsten mit lokalen Dateien. Netzlaufwerke, geteilte Ordner und synchronisierte Cloud-Ordner können problematisch sein, weil Dateisperren dort nicht immer so funktionieren, wie SQLite es erwartet.

Für produktive Schreibzugriffe solltest du SQLite-Dateien nicht aktiv in Ordnern verwenden, die gleichzeitig von Cloud-Sync-Tools oder Netzwerksystemen verarbeitet werden.

Besser ist:

```text
lokale Datenbankdatei verwenden
regelmäßig kontrolliert sichern
Backups getrennt synchronisieren
```

Das reduziert Locking-Probleme und schützt gleichzeitig vor beschädigten Arbeitsdateien.

## Häufige Stolperstellen bei SQLite Concurrency

Bei SQLite Concurrency tauchen häufig dieselben Fehler auf:

- Schreibtransaktionen bleiben zu lange offen.
- `busy_timeout` wird nicht gesetzt.
- WAL wird nicht geprüft, obwohl viele Lesezugriffe parallel laufen.
- Mehrere Prozesse schreiben unkoordiniert in dieselbe Datei.
- Große Imports blockieren interaktive Nutzung.
- SQLite-Dateien liegen in Cloud-Sync-Ordnern oder auf Netzlaufwerken.
- Fehler wie `database is locked` werden nicht sauber behandelt.
- Anwendungscode öffnet Transaktionen zu früh.

## SQLite einfacher verwalten mit SQLite Hub

Wenn du auf der Suche nach einem kostenlosen SQLite Manager bist, habe ich mit [SQLite Hub](https://oliverjessner.at/sqlite-hub) ein quelloffenes SQLite Management System für lokale Datenbanken gebaut. Das Tool hilft dir dabei, SQLite-Datenbanken komfortabler zu durchsuchen, Tabellen zu bearbeiten, SQL-Abfragen auszuführen und deine Datenbank direkt neben dem Projekt besser zu dokumentieren. SQLite Hub ist Open Source und richtet sich an Entwickler, Solodevs und alle, die SQLite nicht nur im Terminal, sondern mit einer klaren Oberfläche nutzen möchten.

## Verwandte SQLite-Fragen

- [SQLite database is locked: Datenbank entsperren und Ursachen finden](/blog/2026-06-28-sqlite-database-is-locked-datenbank-entsperren-und-ursachen-finden/)
- [SQLite UPSERT: INSERT ON CONFLICT statt INSERT OR REPLACE](/blog/2026-06-28-sqlite-upsert-insert-on-conflict-statt-insert-or-replace/)
- [SQLite Transaktionen: BEGIN, COMMIT und ROLLBACK richtig nutzen](/blog/2026-06-28-sqlite-transaktionen-begin-commit-rollback-richtig-nutzen/)
- [Zur Übersicht der SQLite-Serie](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/)

## Fazit

SQLite Concurrency funktioniert gut, wenn du die Grundregel akzeptierst: Viele Leser sind möglich, aber nur ein Schreiber gleichzeitig. Die meisten Probleme entstehen durch lange Transaktionen, unkoordinierte Schreibzugriffe oder ungünstige Speicherorte.

Mit WAL, `busy_timeout`, kurzen Schreibtransaktionen und bewusst geplantem Write-Design wird der Alltag mit SQLite deutlich robuster.
