---
layout: post
title: 'SQLite UPSERT – INSERT ON CONFLICT statt INSERT OR REPLACE'
date: 2026-06-29 09:20:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - sqlite
    - terminal
description: 'SQLite UPSERT richtig nutzen: INSERT ON CONFLICT DO UPDATE statt INSERT OR REPLACE. Mit Beispiel, excluded und typischen Stolperstellen.'
thumbnail: '/assets/images/gen/blog/sqlite-upsert-insert-on-conflict-statt-insert-or-replace/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-upsert-insert-on-conflict-statt-insert-or-replace/header.webp'
image_width: 1200
image_height: 675
faq:
    - question: 'Wie mache ich einen UPSERT in SQLite?'
      answer: 'Nutze `INSERT INTO ... ON CONFLICT(spalte) DO UPDATE SET ...`. Damit wird eine Zeile eingefügt oder bei einem Konflikt gezielt aktualisiert.'
    - question: 'Warum ist INSERT OR REPLACE kein normaler UPSERT?'
      answer: '`INSERT OR REPLACE` kann die alte Zeile löschen und eine neue Zeile einfügen. Das kann Fremdschlüssel, Trigger, Rowids und Zeitstempel beeinflussen.'
    - question: 'Was bedeutet excluded in SQLite UPSERT?'
      answer: '`excluded` enthält die Werte aus dem Insert-Versuch, die wegen des Konflikts nicht direkt eingefügt wurden.'
    - question: 'Wann nutze ich ON CONFLICT DO NOTHING?'
      answer: '`ON CONFLICT (...) DO NOTHING` ist sinnvoll, wenn bei einem Konflikt keine Aktualisierung passieren soll.'
socialmedia:
    - 'SQLite UPSERT: Meist willst du `INSERT ... ON CONFLICT (...) DO UPDATE`, nicht `INSERT OR REPLACE` mit möglichen Nebenwirkungen.'
    - '`INSERT OR REPLACE` klingt harmlos, kann in SQLite aber eine Zeile löschen und neu einfügen. Für UPSERTs ist `ON CONFLICT DO UPDATE` klarer.'
    - 'Neue SQLite-Q&A: UPSERT sauber schreiben, `excluded` verstehen und warum REPLACE nicht dasselbe ist wie UPDATE.'
---

Ein SQLite UPSERT bedeutet meistens: Eine Zeile einfügen und bei einem Konflikt gezielt aktualisieren. Dafür solltest du in SQLite `INSERT ... ON CONFLICT (...) DO UPDATE` nutzen. `INSERT OR REPLACE` klingt ähnlich, verhält sich aber anders und kann unerwartete Nebenwirkungen auslösen.

## Warum INSERT OR REPLACE kein normaler UPSERT ist

Viele suchen nach "SQLite UPSERT", "INSERT OR REPLACE vs ON CONFLICT" oder "SQLite INSERT ON CONFLICT DO UPDATE". Die kurze Antwort lautet: Für einen kontrollierten UPSERT ist `INSERT ... ON CONFLICT (...) DO UPDATE` meistens die bessere Wahl.

`INSERT OR REPLACE` ist in SQLite kein normales `UPDATE`. Bei einem Konflikt kann die bestehende Zeile gelöscht und danach eine neue Zeile eingefügt werden. Das ist wichtig, weil dadurch Fremdschlüssel, Trigger, Rowids und Zeitstempel anders betroffen sein können als bei einer gezielten Aktualisierung.

Der Beitrag gehört zur SQLite-Serie [SQLite Fragen und Antworten](/blog/2026-06-29-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/). Sie sammelt kurze Lösungen für typische Fragen aus [software-development](https://oliverjessner.at/category/software-development/).

## Beispiel: SQLite UPSERT mit ON CONFLICT DO UPDATE

Angenommen, du hast eine Tabelle `users`. Die Spalte `email` ist eindeutig, weil jede E-Mail-Adresse nur einmal vorkommen soll.

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);
```

Ein sauberer SQLite UPSERT sieht dann so aus:

```sql
INSERT INTO users (email, display_name, created_at, updated_at)
VALUES (
    'ana@example.com',
    'Ana',
    datetime('now'),
    datetime('now')
)
ON CONFLICT(email) DO UPDATE SET
    display_name = excluded.display_name,
    updated_at = excluded.updated_at;
```

Wenn es noch keine Zeile mit dieser E-Mail-Adresse gibt, wird eine neue Zeile eingefügt. Wenn die E-Mail-Adresse bereits existiert, wird die bestehende Zeile aktualisiert.

Wichtig ist dabei: `created_at` wird im Konfliktfall nicht aktualisiert. Nur `display_name` und `updated_at` werden geändert. Genau das ist einer der Vorteile von `ON CONFLICT DO UPDATE`: Du entscheidest explizit, welche Spalten bei einem Konflikt angepasst werden.

## Was bedeutet excluded in SQLite?

Der Ausdruck `excluded` verweist auf die Werte aus dem ursprünglichen Insert-Versuch.

In diesem Beispiel bedeutet:

```sql
display_name = excluded.display_name
```

SQLite nimmt den neuen Wert für `display_name`, der eigentlich eingefügt worden wäre, und schreibt ihn stattdessen in die bereits vorhandene Zeile.

Das ist besonders praktisch, wenn du Daten importierst, synchronisierst oder wiederholt denselben Datensatz mit neuen Werten schreiben möchtest.

## Warum INSERT OR REPLACE problematisch sein kann

`INSERT OR REPLACE` sieht auf den ersten Blick wie ein UPSERT aus:

```sql
INSERT OR REPLACE INTO users (id, email, display_name, created_at, updated_at)
VALUES (
    1,
    'ana@example.com',
    'Ana',
    datetime('now'),
    datetime('now')
);
```

Das Problem: `REPLACE` bedeutet in SQLite nicht einfach "aktualisiere die bestehende Zeile". Bei einem Konflikt kann SQLite die alte Zeile entfernen und eine neue Zeile einfügen.

Das kann unerwünschte Folgen haben:

- Eine bestehende `rowid` kann sich ändern.
- Foreign Keys können betroffen sein.
- Trigger können anders reagieren als bei einem `UPDATE`.
- `created_at` kann überschrieben werden.
- Beziehungen zu anderen Tabellen können unerwartet brechen.
- Audit- oder History-Logik kann falsche Signale bekommen.

Deshalb ist `INSERT OR REPLACE` nur dann sinnvoll, wenn dieses Verhalten wirklich gewollt ist. Für normale UPSERTs ist `ON CONFLICT DO UPDATE` meistens klarer und sicherer.

## Voraussetzung: PRIMARY KEY oder UNIQUE Constraint

Damit SQLite einen Konflikt erkennen kann, brauchst du einen `PRIMARY KEY` oder einen `UNIQUE` Constraint.

Dieses Beispiel funktioniert, weil `email` eindeutig ist:

```sql
email TEXT NOT NULL UNIQUE
```

Der UPSERT bezieht sich dann genau auf diese Spalte:

```sql
ON CONFLICT(email) DO UPDATE SET
    display_name = excluded.display_name,
    updated_at = excluded.updated_at;
```

Ohne passenden `PRIMARY KEY` oder `UNIQUE` Constraint weiß SQLite nicht, wann ein Konflikt vorliegt.

## UPSERT mit zusammengesetztem UNIQUE Constraint

Ein Konflikt muss nicht nur auf einer einzelnen Spalte basieren. Du kannst auch mehrere Spalten kombinieren.

```sql
CREATE TABLE user_settings (
    user_id INTEGER NOT NULL,
    setting_key TEXT NOT NULL,
    setting_value TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    UNIQUE(user_id, setting_key)
);
```

Der UPSERT bezieht sich dann auf beide Spalten:

```sql
INSERT INTO user_settings (user_id, setting_key, setting_value, updated_at)
VALUES (1, 'theme', 'dark', datetime('now'))
ON CONFLICT(user_id, setting_key) DO UPDATE SET
    setting_value = excluded.setting_value,
    updated_at = excluded.updated_at;
```

Das ist typisch für Einstellungen, Zuordnungstabellen oder importierte Daten, bei denen nicht eine einzelne ID, sondern eine Kombination aus Spalten eindeutig sein soll.

## Wenn bei Konflikt nichts passieren soll

Nicht jeder Konflikt soll zu einem Update führen. Wenn du eine Zeile nur einfügen möchtest, falls sie noch nicht existiert, kannst du `DO NOTHING` verwenden.

```sql
INSERT INTO users (email, display_name, created_at, updated_at)
VALUES (
    'ana@example.com',
    'Ana',
    datetime('now'),
    datetime('now')
)
ON CONFLICT(email) DO NOTHING;
```

Das ist sinnvoll, wenn vorhandene Daten nicht überschrieben werden sollen.

## Häufige Stolperstellen bei SQLite UPSERT

Bei SQLite UPSERTs passieren häufig dieselben Fehler:

- `INSERT OR REPLACE` wird verwendet, obwohl eigentlich ein Update gemeint ist.
- Es fehlt ein `PRIMARY KEY` oder `UNIQUE` Constraint für die Konflikterkennung.
- `created_at` wird bei jedem UPSERT versehentlich überschrieben.
- Zu viele Spalten werden blind aktualisiert.
- `excluded` wird nicht verstanden und deshalb falsch eingesetzt.
- `ON CONFLICT DO NOTHING` wird verwendet, obwohl eigentlich ein Update nötig wäre.

Im [software-development](https://oliverjessner.at/category/software-development/)-Alltag ist `ON CONFLICT DO UPDATE` meistens besser lesbar, weil die Konfliktspalte und die Update-Regeln direkt im SQL-Statement stehen.

## SQLite einfacher verwalten mit SQLite Hub

Wenn du auf der Suche nach einem kostenlosen SQLite Manager bist, habe ich mit [SQLite Hub](https://oliverjessner.at/sqlite-hub) ein quelloffenes SQLite Management System für lokale Datenbanken gebaut. Das Tool hilft dir dabei, SQLite-Datenbanken komfortabler zu durchsuchen, Tabellenstrukturen zu prüfen, SQL-Abfragen auszuführen und deine Datenbank direkt neben dem Projekt besser zu dokumentieren. SQLite Hub ist Open Source und richtet sich an Entwickler, Solodevs und alle, die SQLite nicht nur im Terminal, sondern mit einer klaren Oberfläche nutzen möchten.

## Verwandte SQLite-Fragen

- [SQLite insert multiple rows: mehrere Zeilen in einem Statement](/blog/2026-06-29-sqlite-insert-multiple-rows-mehrere-zeilen-in-einem-statement/)
- [SQLite primary key on multiple columns: zusammengesetzter Primärschlüssel](/blog/2026-06-29-sqlite-primary-key-on-multiple-columns-zusammengesetzter-primaerschluessel/)
- [Zur Übersicht der SQLite-Serie](/blog/2026-06-29-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/)

## Fazit

SQLite UPSERTs solltest du in den meisten Fällen mit `INSERT ... ON CONFLICT (...) DO UPDATE` schreiben. Dadurch bleibt klar, welcher Konflikt behandelt wird und welche Spalten aktualisiert werden.

`INSERT OR REPLACE` ist dagegen kein normales Update. Es kann eine vorhandene Zeile löschen und neu einfügen. Genau deshalb solltest du es nur verwenden, wenn dieses Verhalten wirklich gewollt ist.
