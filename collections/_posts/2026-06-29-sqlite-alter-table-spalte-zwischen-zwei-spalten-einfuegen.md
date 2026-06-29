---
layout: post
title: 'SQLite ALTER TABLE – Spalte zwischen zwei Spalten einfügen'
date: 2026-06-29 09:20:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - sqlite
    - terminal
description: 'SQLite kann per ALTER TABLE ADD COLUMN keine Spalte zwischen zwei bestehende Spalten einfügen. So löst du es mit SELECT oder einer Migration.'
thumbnail: '/assets/images/gen/blog/sqlite-alter-table-spalte-zwischen-zwei-spalten-einfuegen/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-alter-table-spalte-zwischen-zwei-spalten-einfuegen/header.webp'
faq:
    - question: 'Kann SQLite eine Spalte zwischen zwei bestehenden Spalten einfügen?'
      answer: 'Nein. `ALTER TABLE ADD COLUMN` hängt die neue Spalte immer am Ende der Tabelle an.'
    - question: 'Wie ändere ich die Spaltenreihenfolge in SQLite?'
      answer: 'Du musst eine neue Tabelle mit der gewünschten Struktur erstellen, die Daten kopieren, die alte Tabelle ersetzen und abhängige Objekte wie Indexe, Trigger und Constraints prüfen.'
    - question: 'Ist die Spaltenreihenfolge in SQLite wichtig?'
      answer: 'Für normale SQL-Abfragen nicht. Wichtig wird sie vor allem bei `SELECT *`, Exporten oder Tools, die die Reihenfolge sichtbar machen.'
    - question: 'Was ist die bessere Alternative zur Änderung der Spaltenreihenfolge?'
      answer: 'Meist ist ein explizites `SELECT` mit der gewünschten Spaltenreihenfolge besser als eine Tabellenmigration.'
socialmedia:
    - 'SQLite ALTER TABLE kann Spalten hinzufügen, aber nicht zwischen zwei bestehende Spalten setzen. Meist ist ein explizites SELECT die bessere Lösung.'
    - 'Spaltenreihenfolge in SQLite ändern? Technisch geht das nur über eine neue Tabelle und Datenmigration. Oft ist das gar nicht nötig.'
    - 'Neue SQLite-Q&A: Warum ADD COLUMN immer hinten anhängt und wann eine Migration für Spaltenreihenfolge wirklich sinnvoll ist.'
---

SQLite kann mit `ALTER TABLE ADD COLUMN` eine neue Spalte hinzufügen, aber nicht zwischen zwei bestehende Spalten einfügen. Die neue Spalte wird immer am Ende der Tabelle angehängt. Wenn du eine bestimmte Spaltenreihenfolge brauchst, ist meistens ein explizites `SELECT` die bessere Lösung. Nur wenn die physische Reihenfolge der Tabelle wirklich geändert werden muss, brauchst du eine Migration über eine neue Tabelle.

## Warum SQLite ADD COLUMN neue Spalten nur hinten anhängt

Die neue Spalte landet immer am Ende der Tabelle. Das ist kein Fehler in deiner SQL-Abfrage, sondern das vorgesehene Verhalten von SQLite.

Der Beitrag gehört zur SQLite-Serie [SQLite Fragen und Antworten](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/). Sie sammelt kurze Lösungen für typische Fragen aus [software-development](https://oliverjessner.at/category/software-development/).

## Beispiel: Neue Spalte hinzufügen

Angenommen, du hast eine Tabelle `users` mit dieser Struktur:

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL,
    created_at TEXT NOT NULL
);
```

Wenn du nun eine neue Spalte hinzufügen möchtest, geht das mit `ALTER TABLE ADD COLUMN`:

```sql
ALTER TABLE users
ADD COLUMN display_name TEXT;
```

Die Spalte `display_name` wird dadurch aber nicht zwischen `email` und `created_at` eingefügt. SQLite hängt sie hinten an.

Die Tabelle sieht danach logisch so aus:

```text
id | email | created_at | display_name
```

Eine Syntax wie diese gibt es in SQLite nicht:

```sql
ALTER TABLE users
ADD COLUMN display_name TEXT AFTER email;
```

Diese Schreibweise kennt man aus anderen Datenbanksystemen, SQLite unterstützt sie aber nicht.

## Bessere Lösung: Spalten im SELECT sortieren

In den meisten Fällen musst du die physische Spaltenreihenfolge gar nicht ändern. Wenn es nur um die Anzeige, einen Export oder eine bestimmte Ausgabe geht, solltest du die Spalten explizit in der gewünschten Reihenfolge abfragen.

```sql
SELECT
    id,
    email,
    display_name,
    created_at
FROM users;
```

Das ist robuster als `SELECT *`, weil deine Anwendung nicht von der internen Spaltenreihenfolge der Tabelle abhängt.

Gerade bei SQLite ist das meistens der bessere Weg. Die Datenbankstruktur bleibt einfach, und du kontrollierst die Reihenfolge dort, wo sie wirklich relevant ist: in der Abfrage.

## Wann eine Migration sinnvoll ist

Eine Migration ist nur dann sinnvoll, wenn die physische Reihenfolge der Spalten wirklich geändert werden muss. Das kann zum Beispiel relevant sein, wenn ein altes Tool, ein Exportprozess oder eine bestehende Dokumentation sehr stark von der sichtbaren Tabellenstruktur abhängt.

In diesem Fall erstellst du eine neue Tabelle mit der gewünschten Spaltenreihenfolge, kopierst die Daten hinein, löschst die alte Tabelle und benennst die neue Tabelle um.

```sql
BEGIN;

CREATE TABLE users_new (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL,
    display_name TEXT,
    created_at TEXT NOT NULL
);

INSERT INTO users_new (id, email, display_name, created_at)
SELECT
    id,
    email,
    NULL,
    created_at
FROM users;

DROP TABLE users;

ALTER TABLE users_new RENAME TO users;

COMMIT;
```

Damit steht `display_name` nun zwischen `email` und `created_at`. Technisch funktioniert das, aber es ist deutlich aufwendiger als ein normales `ADD COLUMN`.

## Häufige Stolperstellen bei SQLite Migrationen

Beim Neuaufbau einer Tabelle musst du mehr beachten als nur die Spalten selbst. Besonders wichtig sind:

- Indexe
- Trigger
- Foreign Keys
- CHECK Constraints
- UNIQUE Constraints
- Default-Werte
- Views, die auf die Tabelle zugreifen

Wenn du eine Tabelle per Migration neu aufbaust, solltest du vorher ein Backup erstellen und die Migration in einer Transaktion ausführen. Ein `DROP TABLE` ist schnell geschrieben, aber bei produktiven Datenbanken sollte dieser Schritt nie unüberlegt passieren.

Im Alltag ist es deshalb meist besser, Anwendungen robust gegen Spaltenreihenfolge zu bauen und die gewünschte Reihenfolge direkt im jeweiligen `SELECT` festzulegen.

## Warum SELECT \* hier problematisch ist

`SELECT *` ist bequem, aber bei stabilen Exporten, APIs oder Datenverarbeitungen oft keine gute Grundlage. Wenn sich die Tabellenstruktur ändert, ändert sich auch die Reihenfolge oder Anzahl der zurückgegebenen Spalten.

Besser ist es, die benötigten Spalten immer explizit zu nennen:

```sql
SELECT
    id,
    email,
    display_name,
    created_at
FROM users;
```

So bleibt deine Ausgabe stabil, auch wenn später weitere Spalten zur Tabelle hinzukommen.

## Spaltenreihenfolge in SQLite Hub prüfen

In [SQLite Hub](https://oliverjessner.at/sqlite-hub) kannst du lokale SQLite-Datenbanken öffnen und Tabellenstrukturen direkt prüfen. Das ist hilfreich, wenn du mit `ALTER TABLE ADD COLUMN` arbeitest und sehen möchtest, wo eine neue Spalte tatsächlich landet. Da SQLite neue Spalten immer hinten anhängt, kannst du in SQLite Hub auch schnell testen, ob ein explizites `SELECT` mit eigener Spaltenreihenfolge für deine Anzeige, deinen Export oder deine Dokumentation ausreicht.

Wenn eine echte Migration notwendig ist, hilft dir der Blick auf die Tabellenstruktur dabei, Spalten, Constraints, Default-Werte, Indexe und Trigger bewusster zu prüfen, bevor du eine Tabelle neu aufbaust.

## Verwandte SQLite-Fragen

- [SQLite DROP COLUMN: Spalte aus einer Tabelle löschen](/blog/2026-06-28-sqlite-drop-column-spalte-loeschen-oder-hinzufuegen/)
- [SQLite RENAME COLUMN: Spalte umbenennen](/blog/2026-06-28-sqlite-rename-column-spalte-umbenennen/)
- [Zur Übersicht der SQLite-Serie](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/)

## Fazit

SQLite fügt neue Spalten mit `ALTER TABLE ADD COLUMN` immer am Ende der Tabelle ein. Eine Spalte zwischen zwei bestehenden Spalten einzufügen, wird nicht direkt unterstützt.

Wenn die Reihenfolge nur für Anzeige, Export oder Lesbarkeit wichtig ist, ist ein explizites `SELECT` fast immer die bessere Lösung. Eine Migration über eine neue Tabelle lohnt sich nur dann, wenn die physische Spaltenreihenfolge wirklich geändert werden muss.
