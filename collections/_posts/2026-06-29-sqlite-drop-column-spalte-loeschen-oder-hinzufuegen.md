---
layout: post
title: 'SQLite DROP COLUMN – Spalte löschen oder hinzufügen'
date: 2026-06-29 09:20:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - sqlite
    - terminal
description: 'Spalten in SQLite hinzufügen oder löschen: ALTER TABLE ADD COLUMN, DROP COLUMN und wann eine Migration nötig wird'
thumbnail: '/assets/images/gen/blog/sqlite-drop-column-spalte-loeschen-oder-hinzufuegen/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-drop-column-spalte-loeschen-oder-hinzufuegen/header.webp'
image_width: 1200
image_height: 675
faq:
    - question: 'Wie füge ich in SQLite eine Spalte hinzu?'
      answer: 'Nutze `ALTER TABLE table_name ADD COLUMN column_name TYPE`.'
    - question: 'Wie lösche ich eine Spalte in SQLite?'
      answer: 'In modernen SQLite-Versionen geht das mit `ALTER TABLE table_name DROP COLUMN column_name`, sofern keine Abhängigkeiten blockieren.'
    - question: 'Was mache ich, wenn DROP COLUMN nicht funktioniert?'
      answer: 'Prüfe Indexe, Views, Trigger und Constraints oder baue die Tabelle kontrolliert neu auf.'
socialmedia:
    - 'SQLite Spalten ändern: `ADD COLUMN` ist einfach, `DROP COLUMN` hängt von Version und Schema-Abhängigkeiten ab.'
    - 'Eine SQLite-Spalte löschen kann an Indexen, Views, Triggern oder Constraints scheitern. Vorher lohnt ein Blick ins Schema.'
    - 'Neue SQLite-Q&A: Spalten hinzufügen oder löschen, ohne die Migration kleiner zu machen, als sie wirklich ist.'
---

SQLite kann Spalten per ALTER TABLE hinzufügen und in modernen Versionen auch löschen. Einschränkungen gibt es trotzdem.

## SQLite DROP COLUMN – Spalte löschen oder hinzufügen

Viele suchen nach "How to delete or add column in SQLITE?". Die kurze Antwort: Neue Spalten fügst du mit `ALTER TABLE ... ADD COLUMN` hinzu. Spalten löschst du mit `ALTER TABLE ... DROP COLUMN`, wenn deine SQLite-Version und das Schema es erlauben.

Der Beitrag gehört zur SQLite-Serie [SQLite Fragen und Antworten](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/). Sie sammelt kurze Lösungen für typische Fragen aus [software-development](https://oliverjessner.at/category/software-development/).

## Beispiel

Das Hinzufügen ist der häufigere und einfachere Fall:

```sql
ALTER TABLE users
ADD COLUMN display_name TEXT;
```

```sql
ALTER TABLE users
DROP COLUMN legacy_name;
```

## Praxis-Hinweise

`ADD COLUMN` hängt die neue Spalte am Ende der Tabelle an. Bestimmte Constraints oder Defaults sind je nach bestehender Tabelle eingeschränkt und sollten vor einer Migration getestet werden.

`DROP COLUMN` ist nur möglich, wenn die Spalte nicht von Constraints, Indexen, Triggern, Views oder anderen Schema-Objekten benötigt wird.

Im [software-development](https://oliverjessner.at/category/software-development/)-Alltag ist ein Backup vor strukturellen Änderungen sinnvoll. Schema-Migrationen wirken klein, können aber viele abhängige Objekte betreffen.

## Häufige Stolperstellen

- Wenn `DROP COLUMN` scheitert, liegt das oft an Indexen, Views, Triggern oder Constraints, die noch auf die Spalte verweisen.
- Bei älteren SQLite-Versionen kann es nötig sein, die Tabelle neu zu erstellen und Daten zu kopieren.
- Nach einer Änderung sollten Anwendungscode, Exporte und Tests gegen das neue Schema laufen.

## Verwandte SQLite-Fragen

- [SQLite ALTER TABLE: Spalte zwischen zwei Spalten einfügen](/blog/2026-06-28-sqlite-alter-table-spalte-zwischen-zwei-spalten-einfuegen/)
- [SQLite RENAME COLUMN: Spalte umbenennen](/blog/2026-06-28-sqlite-rename-column-spalte-umbenennen/)
- [Zur Übersicht der SQLite-Serie](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/)

## Fazit

Spalten hinzufügen ist in SQLite unkompliziert. Spalten löschen ist möglich, verlangt aber einen genaueren Blick auf Abhängigkeiten und Versionen.

### SQLite einfacher verwalten mit SQLite Hub

Wenn du auf der Suche nach einem kostenlosen SQLite Manager bist, habe ich mit [SQLite Hub](https://oliverjessner.at/sqlite-hub) ein quelloffenes SQLite Management System für lokale Datenbanken gebaut. Das Tool hilft dir dabei, SQLite-Datenbanken komfortabler zu durchsuchen, Tabellen zu bearbeiten, SQL-Abfragen auszuführen und deine Datenbank direkt neben dem Projekt besser zu dokumentieren. SQLite Hub ist Open Source und richtet sich an Entwickler, Solodevs und alle, die SQLite nicht nur im Terminal, sondern mit einer klaren Oberfläche nutzen möchten.
