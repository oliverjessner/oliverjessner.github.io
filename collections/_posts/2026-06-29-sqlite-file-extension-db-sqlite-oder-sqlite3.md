---
layout: post
title: 'SQLite file extension – .db, .sqlite oder .sqlite3?'
date: 2026-06-29 09:20:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - sqlite
    - terminal
description: 'SQLite Dateiendung erklärt: .db, .sqlite oder .sqlite3 nutzen, WAL- und SHM-Dateien verstehen und klare Projektnamen wählen.'
thumbnail: '/assets/images/gen/blog/sqlite-file-extension-db-sqlite-oder-sqlite3/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-file-extension-db-sqlite-oder-sqlite3/header.webp'
image_width: 1200
image_height: 675
faq:
    - question: 'Ist .db oder .sqlite besser für SQLite?'
      answer: 'Beides kann funktionieren. `.sqlite` oder `.sqlite3` ist eindeutiger, `.db` ist kürzer und allgemeiner.'
    - question: 'Braucht SQLite eine bestimmte Dateiendung?'
      answer: 'Nein. SQLite erkennt das Datenbankformat nicht über die Dateiendung. Die Endung ist nur Teil des Dateinamens.'
    - question: 'Was ist der Unterschied zwischen .sqlite und .sqlite3?'
      answer: 'Beide Endungen werden häufig für SQLite-Datenbanken verwendet. `.sqlite3` macht sichtbarer, dass es sich um SQLite 3 handelt, `.sqlite` ist etwas kürzer.'
    - question: 'Was sind .sqlite-wal und .sqlite-shm Dateien?'
      answer: 'Diese Dateien können im WAL-Modus entstehen und gehören zur laufenden SQLite-Datenbank. Sie sollten nicht reflexartig gelöscht werden.'
socialmedia:
    - 'SQLite ist die Dateiendung egal. Menschen und Tools profitieren trotzdem von klaren Namen wie `.sqlite` oder `.sqlite3`.'
    - '.db, .sqlite oder .sqlite3? Technisch kann alles funktionieren. Wichtiger ist eine konsequente Projektnorm.'
    - 'Neue SQLite-Q&A: Welche Dateiendung für SQLite sinnvoll ist und warum WAL- und SHM-Dateien neben der Datenbank auftauchen können.'
---

SQLite braucht keine bestimmte Dateiendung. Eine SQLite-Datenbank wird nicht an `.db`, `.sqlite` oder `.sqlite3` erkannt, sondern am Dateiformat selbst. Trotzdem ist die Endung im Alltag wichtig, weil Menschen, Skripte, Backups und Tools dadurch schneller verstehen, was in der Datei steckt.

## Welche Dateiendung für SQLite sinnvoll ist

Technisch kann eine SQLite-Datenbank fast jede Dateiendung haben. Diese drei Varianten sind besonders üblich:

```text id="jvy91k"
app.db
app.sqlite
app.sqlite3
```

Die kurze Regel lautet: SQLite selbst ist die Endung egal. Für Projekte ist aber eine klare Konvention sinnvoll. Wenn du möglichst eindeutig sein willst, nimm `.sqlite` oder `.sqlite3`. Wenn du kurze, allgemeine Datenbanknamen bevorzugst, ist `.db` ebenfalls möglich.

Der Beitrag gehört zur SQLite-Serie [SQLite Fragen und Antworten](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/). Sie sammelt kurze Lösungen für typische Fragen aus [software-development](https://oliverjessner.at/category/software-development/).

## Beispiel: SQLite-Datei öffnen

Alle drei Dateinamen können gültige SQLite-Datenbanken sein:

```text id="2bpc37"
app.sqlite
app.sqlite3
app.db
```

Du kannst sie mit der SQLite-CLI öffnen oder prüfen:

```bash id="21xati"
sqlite3 app.sqlite 'PRAGMA integrity_check;'
```

Wenn die Datei existiert und ein gültiges SQLite-Format enthält, ist die Endung für SQLite nicht entscheidend.

## .db, .sqlite oder .sqlite3?

Die Wahl hängt vor allem davon ab, wie eindeutig du die Datei benennen möchtest.

```text id="g4o8yh"
.db       kurz, aber sehr allgemein
.sqlite   klar als SQLite-Datei erkennbar
.sqlite3  klar als SQLite-3-Datenbank erkennbar
```

`.db` ist kompakt, kann aber auch für andere Datenbankformate stehen. `.sqlite` ist lesbarer, wenn Menschen direkt erkennen sollen, dass es sich um SQLite handelt. `.sqlite3` ist besonders eindeutig, wirkt aber etwas technischer.

Für viele Projekte ist `.sqlite` ein guter Standard, weil die Endung kurz und trotzdem eindeutig ist.

## SQLite erkennt das Format nicht über die Endung

SQLite entscheidet nicht anhand der Dateiendung, ob eine Datei geöffnet werden kann. Die Endung ist nur Teil des Dateinamens.

Du könntest eine SQLite-Datenbank theoretisch auch so nennen:

```text id="4pbgnl"
database.data
cache.local
my-app-store
```

Das kann funktionieren, ist aber für Menschen und Tools weniger klar. Im Alltag ist eine eindeutige Dateiendung deshalb trotzdem sinnvoll.

## Warum eine klare Endung trotzdem wichtig ist

Auch wenn SQLite die Endung technisch nicht braucht, hilft sie in vielen Situationen:

- Dateidialoge können nach bestimmten Endungen filtern.
- Backups sind leichter zu erkennen.
- Gitignore-Regeln werden verständlicher.
- Skripte können Dateien gezielter finden.
- Dokumentation wird klarer.
- Teammitglieder verstehen schneller, welche Datei die Datenbank ist.
- SQLite-Tools erkennen Dateien oft leichter über bekannte Endungen.

Für [software-development](https://oliverjessner.at/category/software-development/) ist weniger die perfekte Endung entscheidend, sondern eine konsequente Projektnorm.

## Empfehlung für Projekte

Für neue Projekte würde ich eine dieser Varianten wählen:

```text id="2hwl6c"
app.sqlite
project.sqlite
database.sqlite
```

Wenn du explizit zeigen möchtest, dass es sich um SQLite 3 handelt, ist auch diese Variante sauber:

```text id="zfz3fi"
app.sqlite3
```

Für sehr kleine Tools, interne Skripte oder ältere Konventionen ist `.db` ebenfalls okay:

```text id="zq2hge"
app.db
```

Wichtig ist nur, dass du nicht innerhalb desselben Projekts zwischen mehreren Endungen wechselst.

## WAL- und SHM-Dateien verstehen

Neben der eigentlichen SQLite-Datei können zusätzliche Dateien entstehen, zum Beispiel:

```text id="9gjd83"
app.sqlite-wal
app.sqlite-shm
```

Diese Dateien entstehen typischerweise im WAL-Modus. WAL steht für Write-Ahead Logging. Die Dateien gehören zur laufenden SQLite-Datenbank und sind nicht automatisch Müll.

Wenn deine Hauptdatei so heißt:

```text id="vf98fj"
app.sqlite
```

können daneben diese Dateien liegen:

```text id="wrfol4"
app.sqlite-wal
app.sqlite-shm
```

Diese Dateien solltest du nicht reflexartig löschen. Sie sind Teil des SQLite-Betriebs und können für Konsistenz und laufende Schreibvorgänge wichtig sein.

## Was ist mit .db-journal?

Je nach Journal-Modus kann auch eine Journal-Datei entstehen:

```text id="osqkhc"
app.db-journal
```

Auch diese Datei gehört zum SQLite-Konsistenzmodell. Wenn sie auftaucht, heißt das nicht automatisch, dass etwas kaputt ist.

Besser ist:

```text id="5nx6wr"
Anwendung sauber beenden
offene Prozesse prüfen
Datenbankverbindungen schließen
Backup erstellen
SQLite selbst aufräumen lassen
```

Manuelles Löschen solcher Dateien sollte nicht die erste Reaktion sein.

## Dateiendung schützt nicht vor falschem Inhalt

Eine Datei mit `.sqlite` ist nicht automatisch eine gültige SQLite-Datenbank. Die Endung kann falsch sein, die Datei kann beschädigt sein oder ein anderes Format enthalten.

Prüfen kannst du eine Datenbank zum Beispiel so:

```bash id="ez4p1v"
sqlite3 app.sqlite 'PRAGMA integrity_check;'
```

Wenn SQLite die Datei nicht öffnen kann oder `integrity_check` Fehler meldet, hilft die schönste Endung nicht. Die Endung beschreibt nur die Absicht, nicht den tatsächlichen Inhalt.

## Gitignore und Backups

Bei SQLite-Dateien solltest du bewusst entscheiden, was ins Repository gehört und was nicht.

Für eine lokale Entwicklungsdatenbank kann ein `.gitignore` zum Beispiel so aussehen:

```gitignore id="kui3ku"
*.sqlite
*.sqlite3
*.db
*.sqlite-wal
*.sqlite-shm
*.db-wal
*.db-shm
```

Das ist sinnvoll, wenn die Datenbank nur lokale Entwicklungsdaten enthält.

Wenn du aber eine Beispiel-Datenbank, Test-Fixtures oder eine bewusst versionierte SQLite-Datei hast, solltest du sie gezielt einchecken und nicht pauschal ignorieren.

## Häufige Stolperstellen bei SQLite file extensions

Bei SQLite-Dateiendungen passieren häufig dieselben Fehler:

- Es wird angenommen, dass SQLite eine bestimmte Endung verlangt.
- `.db` wird verwendet, obwohl im Team niemand erkennt, dass es SQLite ist.
- Innerhalb eines Projekts werden `.db`, `.sqlite` und `.sqlite3` gemischt.
- WAL- und SHM-Dateien werden gelöscht, ohne den SQLite-Modus zu verstehen.
- Gitignore-Regeln erfassen die Hauptdatei, aber nicht die Neben-Dateien.
- Eine Datei wird wegen der Endung für gültig gehalten, obwohl das Format beschädigt ist.
- Backups bekommen uneindeutige Namen wie `backup.db`, ohne Datum oder Kontext.

## SQLite einfacher verwalten mit SQLite Hub

Wenn du auf der Suche nach einem kostenlosen SQLite Manager bist, habe ich mit [SQLite Hub](https://oliverjessner.at/sqlite-hub) ein quelloffenes SQLite Management System für lokale Datenbanken gebaut. Das Tool hilft dir dabei, SQLite-Datenbanken komfortabler zu durchsuchen, Tabellenstrukturen zu prüfen, SQL-Abfragen auszuführen und deine Datenbank direkt neben dem Projekt besser zu dokumentieren. SQLite Hub ist Open Source und richtet sich an Entwickler, Solodevs und alle, die SQLite nicht nur im Terminal, sondern mit einer klaren Oberfläche nutzen möchten.

## Verwandte SQLite-Fragen

- [SQLite database is locked: Datenbank entsperren und Ursachen finden](/blog/2026-06-28-sqlite-database-is-locked-datenbank-entsperren-und-ursachen-finden/)
- [SQLite ATTACH: Tabellen einer angehängten Datenbank auflisten](/blog/2026-06-28-sqlite-attach-tabellen-einer-angehaengten-datenbank-auflisten/)
- [SQLite Backup: Datenbank sicher kopieren und wiederherstellen](/blog/2026-06-28-sqlite-backup-datenbank-sicher-kopieren-und-wiederherstellen/)
- [Zur Übersicht der SQLite-Serie](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/)

## Fazit

SQLite braucht keine bestimmte Dateiendung. `.db`, `.sqlite` und `.sqlite3` können alle funktionieren, solange die Datei ein gültiges SQLite-Format enthält.

Für neue Projekte ist `.sqlite` oft die klarste Wahl. Noch wichtiger als die konkrete Endung ist aber, dass du im Projekt konsequent bleibst und WAL-, SHM- sowie Journal-Dateien als Teil des SQLite-Betriebs verstehst.
