---
layout: post
title: 'SQLite ATTACH – Tabellen einer angehängten Datenbank auflisten'
date: 2026-06-28 09:20:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - sqlite
    - terminal
description: 'So findest du Tabellen in einer per ATTACH eingebundenen SQLite-Datenbank mit sqlite_schema und PRAGMA database_list'
thumbnail: '/assets/images/gen/blog/sqlite-attach-tabellen-einer-angehaengten-datenbank-auflisten/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-attach-tabellen-einer-angehaengten-datenbank-auflisten/header.webp'
faq:
    - question: 'Wie liste ich Tabellen aus einer per ATTACH geöffneten SQLite-Datenbank?'
      answer: 'Frage den Schema-Namen der angehängten Datenbank ab, zum Beispiel `SELECT name FROM logs.sqlite_schema WHERE type = "table"`. Der Name `logs` kommt aus `ATTACH ... AS logs`.'
    - question: 'Wie finde ich den Alias einer angehängten SQLite-Datenbank?'
      answer: 'Mit `PRAGMA database_list` siehst du alle aktuell verbundenen Datenbanken und ihre Schema-Namen.'
    - question: 'Soll ich sqlite_master oder sqlite_schema verwenden?'
      answer: '`sqlite_master` ist weiterhin verbreitet. Für neue Beispiele ist `sqlite_schema` die klarere und aktuelle Bezeichnung.'
socialmedia:
    - 'SQLite ATTACH kurz erklärt: Tabellen aus einer angehängten Datenbank liest du über den Alias und `alias.sqlite_schema`, nicht über den Dateinamen.'
    - 'Wenn SQLite mit ATTACH mehrere Dateien öffnet, entscheidet der Schema-Alias. `PRAGMA database_list` zeigt dir, welche Namen gerade verfügbar sind.'
    - 'Neue SQLite-Q&A: Wie listet man Tabellen aus einer per ATTACH eingebundenen Datenbank? Die Antwort steckt in `sqlite_schema` und dem richtigen Alias.'
---

Mit ATTACH kann SQLite mehrere Datenbankdateien in einer Verbindung öffnen. Tabellen listest du dann über den Schema-Namen der angehängten Datei.

## SQLite ATTACH – Tabellen einer angehängten Datenbank auflisten

Viele suchen nach "SQLite ATTACH Tabellen anzeigen" oder "SQLite Tabellen einer angehängten Datenbank auflisten". Die kurze Antwort lautet: Nutze den Alias aus ATTACH und frage alias.sqlite_schema ab. Der Alias ist der Schema-Name der angehängten Datenbank.

Der Beitrag gehört zur SQLite-Serie [SQLite Fragen und Antworten](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/). Sie sammelt kurze Lösungen für typische Fragen aus [software-development](https://oliverjessner.at/category/software-development/).

## Beispiel

Wenn eine Datenbank als `logs` angehängt wurde, liest du die Tabellen so aus:

```sql
ATTACH DATABASE 'logs.sqlite' AS logs;

SELECT name
FROM logs.sqlite_schema
WHERE type = 'table'
  AND name NOT LIKE 'sqlite_%'
ORDER BY name;
```

```sql
PRAGMA database_list;
```

## Praxis-Hinweise

Der wichtige Punkt ist der Schema-Name. Bei der Hauptdatenbank ist das meistens `main`. Bei temporären Objekten ist es `temp`. Bei einer mit `ATTACH` geöffneten Datei verwendest du den selbst vergebenen Alias.

`sqlite_schema` enthält Tabellen, Views, Indexe und Trigger. Für reine Tabellen filterst du deshalb auf `type = "table"`. Interne SQLite-Tabellen wie `sqlite_sequence` blendest du meistens aus.

Diese Abfrage ist dann nützlich, wenn ein Script mehrere lokale Datenbanken zusammen auswertet oder eine fremde SQLite-Datei zuerst inspiziert werden soll.

## Häufige Stolperstellen

- Verwechsle den Dateinamen nicht mit dem Alias. Nach `AS logs` heißt das Schema `logs`, unabhängig vom Dateinamen.
- `sqlite_master` funktioniert in vielen Beispielen noch, `sqlite_schema` ist aber die modernere Bezeichnung.
- `ATTACH` gilt nur für die aktuelle SQLite-Verbindung. Eine zweite Verbindung kennt den Alias nicht automatisch.

## Verwandte SQLite-Fragen

- [SQLite table exists: prüfen, ob eine Tabelle existiert](/blog/2026-06-28-sqlite-table-exists-pruefen-ob-eine-tabelle-existiert/)
- [SQLite column names: Spaltennamen einer Tabelle auslesen](/blog/2026-06-28-sqlite-column-names-spaltennamen-einer-tabelle-auslesen/)
- [Zur Übersicht der SQLite-Serie](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/)

## Fazit

Für angehängte SQLite-Datenbanken ist der Alias der Schlüssel. Sobald er bekannt ist, funktioniert das Auflisten der Tabellen genauso kontrolliert wie bei der Hauptdatenbank.

### SQLite einfacher verwalten mit SQLite Hub

Wenn du auf der Suche nach einem kostenlosen SQLite Manager bist, habe ich mit [SQLite Hub](https://oliverjessner.at/sqlite-hub) ein quelloffenes SQLite Management System für lokale Datenbanken gebaut. Das Tool hilft dir dabei, SQLite-Datenbanken komfortabler zu durchsuchen, Tabellen zu bearbeiten, SQL-Abfragen auszuführen und deine Datenbank direkt neben dem Projekt besser zu dokumentieren. SQLite Hub ist Open Source und richtet sich an Entwickler, Solodevs und alle, die SQLite nicht nur im Terminal, sondern mit einer klaren Oberfläche nutzen möchten.
