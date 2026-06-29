---
layout: post
title: 'SQLite primary key on multiple columns – zusammengesetzter Primärschlüssel'
date: 2026-06-29 09:20:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - sqlite
    - terminal
description: 'SQLite Primary Key über mehrere Spalten definieren: zusammengesetzter Primärschlüssel, NOT NULL, Foreign Keys, Indexe und WITHOUT ROWID erklärt.'
thumbnail: '/assets/images/gen/blog/sqlite-primary-key-on-multiple-columns-zusammengesetzter-primaerschluessel/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-primary-key-on-multiple-columns-zusammengesetzter-primaerschluessel/header.webp'
faq:
    - question: 'Wie erstelle ich in SQLite einen Primary Key über mehrere Spalten?'
      answer: 'Lege den Primärschlüssel als Tabellenconstraint an, zum Beispiel `PRIMARY KEY (tenant_id, external_id)`.'
    - question: 'Was ist ein zusammengesetzter Primärschlüssel in SQLite?'
      answer: 'Ein zusammengesetzter Primärschlüssel besteht aus mehreren Spalten. Nicht eine einzelne Spalte, sondern die Kombination dieser Spalten muss eindeutig sein.'
    - question: 'Sollte ich die Spalten eines zusammengesetzten Primary Keys als NOT NULL definieren?'
      answer: 'Ja. In SQLite solltest du die Spalten explizit als `NOT NULL` definieren, damit die Regel im Schema eindeutig ist.'
    - question: 'Kann ein zusammengesetzter Primary Key in SQLite WITHOUT ROWID nutzen?'
      answer: 'Ja. `WITHOUT ROWID` kann bei zusammengesetzten Primärschlüsseln sinnvoll sein, sollte aber zum Datenmodell und zu den Abfragen passen.'
    - question: 'Brauche ich zusätzlich einen UNIQUE Index?'
      answer: 'Nicht für dieselbe Spaltenkombination. Der Primärschlüssel erzwingt bereits Eindeutigkeit für diese Kombination.'
socialmedia:
    - 'SQLite primary key on multiple columns: Der Schlüssel wird als Tabellenconstraint definiert, etwa `PRIMARY KEY (tenant_id, external_id)`.'
    - 'Zusammengesetzte Primärschlüssel in SQLite sind kein Sondertrick. Wichtig sind Tabellenconstraint, NOT NULL, Fremdschlüssel-Reihenfolge und passende Indexe.'
    - 'Neue SQLite-Q&A: Wann ist ein Primary Key über mehrere Spalten sinnvoll und wann lohnt ein Blick auf `WITHOUT ROWID`?'
---

Ein Primary Key kann in SQLite aus mehreren Spalten bestehen. Dann ist nicht eine einzelne Spalte eindeutig, sondern die Kombination dieser Spalten. Das ist nützlich, wenn die fachliche Identität eines Datensatzes nicht durch eine künstliche ID, sondern durch mehrere Werte beschrieben wird.

## Zusammengesetzten Primary Key in SQLite definieren

Ein Primary Key über mehrere Spalten wird in SQLite als Tabellenconstraint definiert. Du schreibst `PRIMARY KEY` also nicht direkt an eine einzelne Spalte, sondern am Ende der Tabellendefinition.

```sql
CREATE TABLE customer_accounts (
    tenant_id INTEGER NOT NULL,
    external_id TEXT NOT NULL,
    display_name TEXT NOT NULL,
    created_at TEXT NOT NULL,
    PRIMARY KEY (tenant_id, external_id)
);
```

In diesem Beispiel ist `external_id` nicht global eindeutig. Sie ist nur zusammen mit `tenant_id` eindeutig. Derselbe externe Schlüssel kann also bei unterschiedlichen Mandanten vorkommen, aber nicht doppelt innerhalb desselben Mandanten.

Der Beitrag gehört zur SQLite-Serie [SQLite Fragen und Antworten](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/). Sie sammelt kurze Lösungen für typische Fragen aus [software-development](https://oliverjessner.at/category/software-development/).

## Warum der Primary Key auf Tabellenebene steht

Eine einzelne Spalte kannst du direkt so als Primary Key definieren:

```sql
id INTEGER PRIMARY KEY
```

Bei mehreren Spalten geht das nicht an einer einzelnen Spalte. Die Regel betrifft die Kombination, deshalb gehört sie auf Tabellenebene:

```sql
PRIMARY KEY (tenant_id, external_id)
```

Damit sagt das Schema: Die Kombination aus `tenant_id` und `external_id` darf nur einmal vorkommen.

## Beispiel: Kombination muss eindeutig sein

Diese beiden Zeilen sind erlaubt, weil `tenant_id` unterschiedlich ist:

```text
tenant_id | external_id
1         | A-100
2         | A-100
```

Diese beiden Zeilen wären nicht erlaubt, weil die Kombination identisch ist:

```text
tenant_id | external_id
1         | A-100
1         | A-100
```

Genau dafür ist ein zusammengesetzter Primärschlüssel gedacht.

## NOT NULL bewusst setzen

Bei Primary Keys über mehrere Spalten solltest du die beteiligten Spalten explizit als `NOT NULL` definieren:

```sql
tenant_id INTEGER NOT NULL,
external_id TEXT NOT NULL,
PRIMARY KEY (tenant_id, external_id)
```

Das macht die Absicht des Schemas klarer und verhindert unklare Datensätze. Gerade bei zusammengesetzten Schlüsseln willst du normalerweise nicht, dass ein Teil der Identität fehlt.

In SQLite ist dieser Punkt besonders wichtig, weil historische Eigenheiten bei normalen Rowid-Tabellen dazu führen können, dass Primary-Key-Spalten nicht immer so streng behandelt werden, wie man es aus anderen Datenbanken erwartet. Mit `NOT NULL` ist die Regel eindeutig sichtbar.

## WITHOUT ROWID bei zusammengesetzten Primärschlüsseln

Bei Tabellen mit zusammengesetztem Primary Key kann `WITHOUT ROWID` sinnvoll sein:

```sql
CREATE TABLE customer_accounts (
    tenant_id INTEGER NOT NULL,
    external_id TEXT NOT NULL,
    display_name TEXT NOT NULL,
    created_at TEXT NOT NULL,
    PRIMARY KEY (tenant_id, external_id)
) WITHOUT ROWID;
```

Normalerweise besitzt eine SQLite-Tabelle intern eine `rowid`. Bei `WITHOUT ROWID` organisiert SQLite die Tabelle direkter über den Primary Key. Das kann bei zusammengesetzten Primärschlüsseln gut zum Datenmodell passen.

Das ist aber keine automatische Empfehlung für jede Tabelle. `WITHOUT ROWID` sollte zu deinen Abfragen, deinen Foreign Keys und deinem Datenmodell passen.

## Wann WITHOUT ROWID sinnvoll sein kann

`WITHOUT ROWID` kann interessant sein, wenn:

- der zusammengesetzte Primary Key wirklich die fachliche Identität ist
- du häufig über genau diese Spaltenkombination suchst
- du keine separate künstliche Integer-ID brauchst
- die Tabelle eher über den zusammengesetzten Schlüssel referenziert wird
- du das Datenmodell bewusst schlank halten möchtest

Weniger passend ist `WITHOUT ROWID`, wenn du eigentlich überall mit einer einfachen `id` arbeitest oder später doch eine klassische Integer-ID als Hauptzugriff brauchst.

## Zusammengesetzter Primary Key und Foreign Keys

Wenn eine andere Tabelle auf einen zusammengesetzten Primary Key verweist, muss der Foreign Key dieselbe Spaltenanzahl und dieselbe Reihenfolge verwenden.

```sql
CREATE TABLE account_events (
    tenant_id INTEGER NOT NULL,
    external_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (tenant_id, external_id)
        REFERENCES customer_accounts (tenant_id, external_id)
);
```

Wichtig ist hier: `tenant_id` und `external_id` gehören zusammen. Ein Foreign Key auf nur eine der beiden Spalten würde nicht denselben Datensatz eindeutig beschreiben.

## Zusätzliche Indexe prüfen

Der Primary Key erzeugt bereits eine Eindeutigkeitsregel für die angegebene Kombination. Für dieselbe Spaltenkombination brauchst du also keinen zusätzlichen `UNIQUE` Index.

Trotzdem können zusätzliche Indexe sinnvoll sein, wenn du häufig anders filterst.

Diese Abfrage passt gut zur Reihenfolge des zusammengesetzten Schlüssels:

```sql
SELECT *
FROM customer_accounts
WHERE tenant_id = 1
  AND external_id = 'A-100';
```

Auch diese Abfrage kann von der linken Schlüsselspalte profitieren:

```sql
SELECT *
FROM customer_accounts
WHERE tenant_id = 1;
```

Wenn du aber häufig nur nach `external_id` suchst, kann ein zusätzlicher Index sinnvoll sein:

```sql
CREATE INDEX idx_customer_accounts_external_id
ON customer_accounts (external_id);
```

Die Reihenfolge der Spalten im Primary Key ist deshalb eine echte Designentscheidung.

## Zusammengesetzter Primary Key oder künstliche ID?

Nicht jede Tabelle mit zwei eindeutigen Spalten braucht automatisch einen zusammengesetzten Primary Key. Manchmal ist eine künstliche `id` plus `UNIQUE` Constraint praktischer.

Variante mit zusammengesetztem Primary Key:

```sql
CREATE TABLE customer_accounts (
    tenant_id INTEGER NOT NULL,
    external_id TEXT NOT NULL,
    display_name TEXT NOT NULL,
    PRIMARY KEY (tenant_id, external_id)
);
```

Variante mit künstlicher ID und zusätzlicher Eindeutigkeitsregel:

```sql
CREATE TABLE customer_accounts (
    id INTEGER PRIMARY KEY,
    tenant_id INTEGER NOT NULL,
    external_id TEXT NOT NULL,
    display_name TEXT NOT NULL,
    UNIQUE (tenant_id, external_id)
);
```

Die zweite Variante kann sinnvoll sein, wenn andere Tabellen lieber auf eine einfache `id` verweisen sollen. Die erste Variante ist klarer, wenn die Kombination selbst die natürliche Identität des Datensatzes ist.

## Wann ein zusammengesetzter Primary Key sinnvoll ist

Ein Primary Key über mehrere Spalten passt besonders gut bei:

- Mandantenmodellen mit `tenant_id` und externer ID
- Zuordnungstabellen
- Importdaten mit fachlicher Schlüssel-Kombination
- Übersetzungstabellen mit `locale` und `key`
- Einstellungen pro Nutzer und Schlüssel
- Tabellen, bei denen keine einzelne Spalte die Identität beschreibt

Beispiel für Einstellungen:

```sql
CREATE TABLE user_settings (
    user_id INTEGER NOT NULL,
    setting_key TEXT NOT NULL,
    setting_value TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (user_id, setting_key)
);
```

Hier ist die Kombination aus `user_id` und `setting_key` eindeutig.

## UPSERT mit zusammengesetztem Primary Key

Ein zusammengesetzter Primary Key lässt sich auch gut mit `ON CONFLICT` verwenden:

```sql
INSERT INTO user_settings (user_id, setting_key, setting_value, updated_at)
VALUES (1, 'theme', 'dark', datetime('now'))
ON CONFLICT(user_id, setting_key) DO UPDATE SET
    setting_value = excluded.setting_value,
    updated_at = excluded.updated_at;
```

Der Konflikt bezieht sich dabei auf dieselbe Spaltenkombination wie der Primary Key.

Das ist oft sauberer als erst zu prüfen, ob ein Datensatz existiert, und danach getrennt `INSERT` oder `UPDATE` auszuführen.

## Häufige Stolperstellen bei SQLite primary key on multiple columns

Bei zusammengesetzten Primärschlüsseln in SQLite passieren häufig dieselben Fehler:

- Der Primary Key wird fälschlich an eine einzelne Spalte geschrieben.
- Die beteiligten Spalten werden nicht explizit als `NOT NULL` definiert.
- Die Reihenfolge der Spalten im Primary Key wird nicht bewusst gewählt.
- Foreign Keys verwenden nicht dieselbe Spaltenanzahl oder Reihenfolge.
- Es wird zusätzlich ein identischer `UNIQUE` Index angelegt, obwohl der Primary Key bereits eindeutig ist.
- `WITHOUT ROWID` wird genutzt, ohne die Auswirkungen auf das Datenmodell zu prüfen.
- Es wird ein zusammengesetzter Schlüssel verwendet, obwohl eine einfache `id` plus `UNIQUE` Constraint praktischer wäre.
- Abfragen filtern häufig nur nach der zweiten Spalte, aber es fehlt ein passender zusätzlicher Index.

Für [software-development](https://oliverjessner.at/category/software-development/) ist die wichtigste Frage: Beschreibt die Kombination wirklich die Identität des Datensatzes? Wenn ja, ist ein zusammengesetzter Primary Key oft sinnvoll. Wenn nein, kann eine künstliche ID plus `UNIQUE` Constraint besser wartbar sein.

## SQLite einfacher verwalten mit SQLite Hub

Wenn du auf der Suche nach einem kostenlosen SQLite Manager bist, habe ich mit [SQLite Hub](https://oliverjessner.at/sqlite-hub) ein quelloffenes SQLite Management System für lokale Datenbanken gebaut. Das Tool hilft dir dabei, SQLite-Datenbanken komfortabler zu durchsuchen, Tabellenstrukturen zu prüfen, SQL-Abfragen auszuführen und deine Datenbank direkt neben dem Projekt besser zu dokumentieren. SQLite Hub ist Open Source und richtet sich an Entwickler, Solodevs und alle, die SQLite nicht nur im Terminal, sondern mit einer klaren Oberfläche nutzen möchten.

## Verwandte SQLite-Fragen

- [SQLite CREATE TABLE IF NOT EXISTS: Tabelle nur bei Bedarf anlegen](/blog/2026-06-28-sqlite-create-table-if-not-exists-tabelle-nur-bei-bedarf-anlegen/)
- [SQLite UPSERT: INSERT ON CONFLICT statt INSERT OR REPLACE](/blog/2026-06-28-sqlite-upsert-insert-on-conflict-statt-insert-or-replace/)
- [SQLite UNIQUE Constraint: eindeutige Werte in Tabellen erzwingen](/blog/2026-06-28-sqlite-unique-constraint-eindeutige-werte-in-tabellen-erzwingen/)
- [Zur Übersicht der SQLite-Serie](/blog/2026-06-28-sqlite-fragen-und-antworten-praktische-sql-snippets-fuer-den-alltag/)

## Fazit

Ein Primary Key über mehrere Spalten ist in SQLite normal möglich. Du definierst ihn als Tabellenconstraint mit `PRIMARY KEY (spalte_a, spalte_b)`.

Wichtig ist, dass die beteiligten Spalten explizit `NOT NULL` sind, die Reihenfolge zur Abfragepraxis passt und Foreign Keys dieselbe Spaltenkombination verwenden. `WITHOUT ROWID` kann bei solchen Tabellen sinnvoll sein, ist aber eine bewusste Designentscheidung.
