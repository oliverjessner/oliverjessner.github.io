---
layout: post
title: 'SQLite REST API: Queries ausführen und Daten exportieren'
date: 2026-06-25 10:08:23 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - in-eigener-sache
    - terminal
    - sqlite-hub
description: 'SQLite per REST API lokal abfragen, SQL-Queries ausführen, gespeicherte Abfragen nutzen und Ergebnisse als CSV oder JSON exportieren'
thumbnail: '/assets/images/gen/blog/sqlite-rest-api-queries-ausfuehren-und-daten-exportieren/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-rest-api-queries-ausfuehren-und-daten-exportieren/header.webp'
faq:
    - question: 'Hat SQLite eine REST API?'
      answer: 'SQLite selbst enthält keine REST API und keinen HTTP-Server. SQLite Hub ergänzt lokale SQLite-Datenbanken um eine versionierte JSON-API, die über HTTP angesprochen wird.'
    - question: 'Wie kann ich eine SQLite-Query über eine API ausführen?'
      answer: 'In SQLite Hub wird die SQL-Query zusammen mit der Datenbank-ID an POST /api/v1/query gesendet. Die Authentifizierung erfolgt über ein datenbankspezifisches Bearer-Token.'
    - question: 'Wie kann ich SQLite-Ergebnisse per API als CSV oder JSON exportieren?'
      answer: 'Gespeicherte Queries können über den Export-Endpunkt von SQLite Hub als CSV, TSV, JSON oder Markdown heruntergeladen werden.'
socialmedia:
    - 'SQLite selbst hat keine REST API. SQLite Hub ergänzt lokale Datenbanken um eine JSON-API für SQL-Queries, gespeicherte Abfragen und Exporte als CSV, TSV, JSON oder Markdown. So funktioniert der lokale Workflow mit curl.'
    - 'Eine SQL-Query im Editor entwickeln und anschließend per API ausführen: Ich zeige, wie SQLite Hub Bearer-Tokens, gespeicherte Queries und lokale Exporte verbindet, ohne die Datenbank in eine Cloud zu verschieben.'
    - 'SQLite-Daten per API abrufen und als CSV oder JSON exportieren: Dieser Guide zeigt den Schnellstart mit SQLite Hub, curl und Node.js sowie die wichtigsten Endpunkte und Sicherheitsgrenzen.'
---

SQLite selbst bringt keine REST API mit. SQLite Hub ergänzt lokale Datenbanken um eine JSON-API, über die sich SQL-Queries ausführen und Ergebnisse als CSV oder JSON exportieren lassen.

## Hat SQLite eine REST API?

SQLite ist eine eingebettete Datenbank-Engine. Anwendungen öffnen eine Datenbankdatei direkt über eine Programmbibliothek oder greifen mit dem Kommandozeilenprogramm `sqlite3` darauf zu.

Ein HTTP-Server oder eine REST API gehört nicht zum Funktionsumfang von SQLite. Wer eine SQLite-Datenbank über HTTP abfragen möchte, benötigt deshalb eine zusätzliche Anwendung zwischen der Datenbankdatei und dem aufrufenden Programm.

Für diesen Anwendungsfall habe ich in [SQLite Hub](https://oliverjessner.at/sqlite-hub/) eine lokale, versionierte JSON-API eingebaut. Sie ist unter `/api/v1` erreichbar und kann mit Werkzeugen wie `curl`, JavaScript `fetch` oder anderen HTTP-Clients verwendet werden.

Die API ermöglicht unter anderem:

- SQL-Queries aus eigenen Skripten auszuführen
- gespeicherte Queries erneut aufzurufen
- Tabellen und Datenbankstrukturen abzufragen
- Ergebnisse direkt als JSON zu verarbeiten
- Query-Ergebnisse als CSV, TSV, JSON oder Markdown zu exportieren
- gespeicherte Notizen und Dokumente abzurufen
- Anwendungstypen aus SQLite-Tabellen zu generieren

Die SQLite-Datei bleibt dabei auf dem eigenen Rechner. SQLite Hub verwandelt sie nicht in eine gehostete Datenbank und überträgt sie nicht automatisch an einen externen Dienst.

Die REST API ist einer von mehreren Zugängen zu SQLite Hub. Den gesamten Zusammenhang zwischen grafischer Oberfläche, SQL-Editor, CLI, Backups und Exporten beschreibe ich im Überblick über [SQLite Hub als SQLite Database Manager](/blog/2026-06-25-warum-sqlite-hub-fuer-mich-der-beste-sqlite-database-manager-ist/).

## SQLite REST API mit SQLite Hub in wenigen Schritten

Für einen ersten API-Aufruf sind vier Schritte erforderlich:

1. SQLite Hub installieren und starten
2. eine SQLite-Datenbank in SQLite Hub öffnen
3. ein API-Token für diese Datenbank erstellen
4. die Datenbank-ID und das Token in der HTTP-Anfrage verwenden

SQLite Hub kann unter macOS und Linux über Homebrew installiert werden:

```bash
brew tap oliverjessner/tap
brew install sqlite-hub
```

Alternativ steht das Programm als globales npm-Paket zur Verfügung:

```bash
npm install -g sqlite-hub
```

Anschließend lässt sich SQLite Hub starten:

```bash
sqlite-hub --open
```

Die Option `--open` startet den lokalen Server und öffnet zusätzlich die grafische Oberfläche im Browser.

Standardmäßig ist die API unter folgender Basis-URL erreichbar:

```text
http://127.0.0.1:4173/api/v1
```

Mit diesem Aufruf lässt sich prüfen, ob die lokale API verfügbar ist:

```bash
curl http://127.0.0.1:4173/api/v1/info
```

Der Endpunkt liefert allgemeine Informationen zur laufenden SQLite-Hub-Instanz. Dazu gehören die installierte Version, die SQLite-Runtime, die lokale URL und der Update-Status.

Für diesen Statusaufruf wird noch kein API-Token benötigt.

## API-Token und Datenbank-ID erstellen

Alle datenbankbezogenen Endpunkte sind geschützt. Für den Zugriff muss in SQLite Hub ein Token für die konkrete Datenbank erstellt werden.

Die Verwaltung befindet sich innerhalb der geöffneten Datenbank unter:

```text
Settings > API Tokens
```

In diesem Bereich zeigt SQLite Hub auch die Datenbank-ID an. Sie wird in den meisten API-URLs als `DATABASE_ID` eingesetzt.

Ein erstelltes Token beginnt mit dem Präfix `shub_` und wird nur einmal vollständig angezeigt. SQLite Hub speichert anschließend nicht das ursprüngliche Token, sondern dessen SHA-256-Hash sowie zusätzliche Metadaten.

Das Token wird als Bearer-Token im HTTP-Header übertragen:

```bash
curl \
  -H "Authorization: Bearer shub_DEIN_TOKEN" \
  http://127.0.0.1:4173/api/v1/databases/DATABASE_ID
```

Ein Token ist immer an die Datenbank gebunden, für die es erstellt wurde. Es kann nicht ohne Weiteres für eine andere in SQLite Hub geöffnete Datenbank verwendet werden.

Fehlt das Token, wurde es gelöscht oder gehört es zu einer anderen Datenbank, antwortet die API mit dem HTTP-Status `401`.

## SQLite Query über die API ausführen

Direkte SQL-Abfragen werden an den Endpunkt `POST /api/v1/query` gesendet.

Die Anfrage enthält mindestens zwei Werte:

- `databaseId` mit der ID der geöffneten Datenbank
- `sql` mit der auszuführenden SQL-Query

Ein vollständiger Aufruf mit `curl` sieht so aus:

```bash
curl \
  -X POST \
  -H "Authorization: Bearer shub_DEIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "databaseId": "DATABASE_ID",
    "sql": "SELECT id, customer_id, total FROM orders ORDER BY id DESC LIMIT 10"
  }' \
  http://127.0.0.1:4173/api/v1/query
```

SQLite Hub führt die Query über denselben Ausführungspfad aus, den auch der grafische SQL-Editor verwendet. Der Aufruf erscheint dadurch in der Query History der ausgewählten Datenbank.

Das ist für meinen Workflow wichtig. Abfragen aus der API sollen nicht unsichtbar neben der grafischen Oberfläche existieren. Ich möchte später nachvollziehen können, welche Queries ausgeführt wurden und wie lange ihre Ausführung gedauert hat.

Eine Query kann zusätzlich benannt und als gespeicherte Abfrage markiert werden:

```bash
curl \
  -X POST \
  -H "Authorization: Bearer shub_DEIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "databaseId": "DATABASE_ID",
    "sql": "SELECT customer_id, SUM(total) AS revenue FROM orders GROUP BY customer_id",
    "name": "Umsatz pro Kunde"
  }' \
  http://127.0.0.1:4173/api/v1/query
```

Der Name erleichtert das spätere Wiederfinden im SQL-Editor. Gleichzeitig kann die gespeicherte Query anschließend über einen eigenen Endpunkt erneut ausgeführt werden.

## Aufbau einer erfolgreichen JSON-Antwort

Erfolgreiche Antworten der SQLite-Hub-API verwenden ein gemeinsames Grundformat:

```json
{
    "success": true,
    "message": "",
    "data": {},
    "metadata": {},
    "warnings": []
}
```

Die eigentlichen Ergebnisse befinden sich unter `data`.

Zusätzliche Angaben zur Ausführung stehen unter `metadata`. Dort können beispielsweise Informationen zu Spalten, Zeilen oder der Ausführung enthalten sein.

Mögliche Hinweise werden im Array `warnings` zurückgegeben.

Fehler verwenden grundsätzlich dieselbe Struktur, setzen `success` jedoch auf `false`. Das zusätzliche `error`-Objekt enthält unter anderem einen Fehlercode, eine Beschreibung und gegebenenfalls einen SQLite-Fehlercode.

Eine Integration sollte deshalb immer mehrere Werte prüfen:

```javascript
if (!response.ok || payload.success !== true) {
    throw new Error(payload.error?.message ?? `SQLite Hub antwortete mit HTTP ${response.status}.`);
}
```

Ein HTTP-Aufruf kann technisch abgeschlossen sein, obwohl die angeforderte SQL-Operation nicht erfolgreich war. Nur den HTTP-Status zu prüfen, reicht deshalb nicht in jedem Fall aus.

## Tabellen einer SQLite-Datenbank per API abfragen

Bevor eine Anwendung Queries erzeugt oder gespeicherte Abfragen verwendet, kann sie die verfügbaren Tabellen abrufen.

Der entsprechende Endpunkt lautet:

```text
GET /api/v1/databases/:databaseId/tables
```

Ein Aufruf mit `curl`:

```bash
curl \
  -H "Authorization: Bearer shub_DEIN_TOKEN" \
  http://127.0.0.1:4173/api/v1/databases/DATABASE_ID/tables
```

Für eine einzelne Tabelle steht ein weiterer Endpunkt zur Verfügung:

```bash
curl \
  -H "Authorization: Bearer shub_DEIN_TOKEN" \
  http://127.0.0.1:4173/api/v1/databases/DATABASE_ID/tables/orders
```

Über diesen Aufruf lassen sich Metadaten zur Tabelle abrufen.

Alle dynamischen Werte innerhalb eines URL-Pfads müssen URL-kodiert werden. Das betrifft Datenbank-IDs, Tabellennamen, Query-Namen und Dokumentnamen.

In JavaScript übernimmt das `encodeURIComponent()`:

```javascript
const tableName = encodeURIComponent('order items');
const queryName = encodeURIComponent('Monatlicher Umsatz');
```

Das ist besonders wichtig, sobald Namen Leerzeichen, Umlaute oder andere Sonderzeichen enthalten.

## Gespeicherte SQLite Queries per API ausführen

Längere oder fachlich wichtige Abfragen entwickle ich bevorzugt im SQL-Editor von SQLite Hub. Dort kann ich die Query formatieren, testen, speichern und mit Notizen versehen.

Alle gespeicherten Queries einer Datenbank lassen sich über diesen Endpunkt abrufen:

```bash
curl \
  -H "Authorization: Bearer shub_DEIN_TOKEN" \
  http://127.0.0.1:4173/api/v1/databases/DATABASE_ID/queries
```

Eine einzelne Query wird über ihren Namen angesprochen:

```bash
curl \
  -H "Authorization: Bearer shub_DEIN_TOKEN" \
  http://127.0.0.1:4173/api/v1/databases/DATABASE_ID/queries/Monatlicher%20Umsatz
```

Soll die gespeicherte Query ausgeführt werden, wird eine POST-Anfrage an den zugehörigen Execute-Endpunkt gesendet:

```bash
curl \
  -X POST \
  -H "Authorization: Bearer shub_DEIN_TOKEN" \
  http://127.0.0.1:4173/api/v1/databases/DATABASE_ID/queries/Monatlicher%20Umsatz/execute
```

Dieser Ablauf trennt den SQL-Code von der aufrufenden Anwendung.

Die Query bleibt in SQLite Hub gespeichert und kann dort weiterentwickelt oder dokumentiert werden. Das Skript kennt lediglich den stabilen Namen der Abfrage und verarbeitet die zurückgegebenen Daten.

Für wiederkehrende Auswertungen ist das aus meiner Sicht übersichtlicher, als denselben SQL-Code gleichzeitig in einem Skript, einer Anwendung und einem Datenbankwerkzeug zu pflegen.

Längere oder fachlich wichtige Abfragen entwickle ich bevorzugt im [SQL-Editor von SQLite Hub](/blog/2026-06-25-sqlite-abfragen-komfortabler-schreiben-was-ein-guter-sql-editor-koennen-muss/). Dort kann ich die Query formatieren, testen, speichern und mit Notizen versehen.

## Notizen zu gespeicherten Queries abrufen

Zu gespeicherten Queries können in SQLite Hub Notizen hinterlegt werden.

Diese Notizen stehen ebenfalls über die API zur Verfügung:

```bash
curl \
  -H "Authorization: Bearer shub_DEIN_TOKEN" \
  http://127.0.0.1:4173/api/v1/databases/DATABASE_ID/queries/Monatlicher%20Umsatz/notes
```

Darin kann beispielsweise dokumentiert werden:

- welche fachliche Frage die Query beantwortet
- welche Tabellen und Spalten vorausgesetzt werden
- wie Statuswerte zu interpretieren sind
- welcher Zeitraum ausgewertet wird
- welche Anwendung die Query verwendet

In der praktischen [Softwareentwicklung](https://oliverjessner.at/category/software-development/) ist dieser Kontext häufig ebenso relevant wie die technische Abfrage.

Eine Query kann korrekt ausgeführt werden und dennoch falsch eingesetzt werden, wenn ihre fachliche Bedeutung nicht dokumentiert ist.

## SQLite Daten als CSV oder JSON exportieren

Query-Ergebnisse können über die SQLite-Hub-API direkt in mehrere Dateiformate exportiert werden.

Unterstützt werden:

| Format   | Parameter | Typische Verwendung                              |
| -------- | --------- | ------------------------------------------------ |
| CSV      | `csv`     | Tabellenkalkulationen, Datenanalysen und Importe |
| TSV      | `tsv`     | Tabellarische Daten mit vielen Kommas            |
| JSON     | `json`    | Anwendungen, Skripte und Datenpipelines          |
| Markdown | `md`      | Dokumentationen, Berichte und Repositories       |

Der Export basiert auf einer gespeicherten Query. Dadurch ist klar definiert, welche Daten und Spalten exportiert werden.

### SQLite Query als CSV exportieren

Ein CSV-Export wird mit `format=csv` angefordert:

```bash
curl \
  -H "Authorization: Bearer shub_DEIN_TOKEN" \
  -o monatlicher-umsatz.csv \
  "http://127.0.0.1:4173/api/v1/databases/DATABASE_ID/queries/Monatlicher%20Umsatz/export?format=csv"
```

Die Option `-o` schreibt die Antwort direkt in die angegebene Datei.

### SQLite Query als JSON exportieren

Für JSON wird der Formatparameter geändert:

```bash
curl \
  -H "Authorization: Bearer shub_DEIN_TOKEN" \
  -o monatlicher-umsatz.json \
  "http://127.0.0.1:4173/api/v1/databases/DATABASE_ID/queries/Monatlicher%20Umsatz/export?format=json"
```

### SQLite Query als Markdown exportieren

Auch Markdown-Tabellen können direkt erzeugt werden:

```bash
curl \
  -H "Authorization: Bearer shub_DEIN_TOKEN" \
  -o monatlicher-umsatz.md \
  "http://127.0.0.1:4173/api/v1/databases/DATABASE_ID/queries/Monatlicher%20Umsatz/export?format=md"
```

Das eignet sich beispielsweise für technische Dokumentationen oder Berichte, die in einem Git-Repository gespeichert werden.

Die grafische Oberfläche von SQLite Hub unterstützt zusätzlich Parquet. Der API-Endpunkt für gespeicherte Queries konzentriert sich aktuell auf CSV, TSV, JSON und Markdown.

## SQLite REST API mit Node.js verwenden

Für eine Anwendung ist nicht immer ein Dateiexport notwendig. Häufig soll das Ergebnis direkt als JSON eingelesen und weiterverarbeitet werden.

Das folgende Node.js-Beispiel führt eine gespeicherte Query aus:

```javascript
const baseUrl = 'http://127.0.0.1:4173/api/v1';
const databaseId = process.env.SQLITE_HUB_DATABASE_ID;
const apiToken = process.env.SQLITE_HUB_API_TOKEN;
const queryName = 'Monatlicher Umsatz';

if (!databaseId || !apiToken) {
    throw new Error('SQLITE_HUB_DATABASE_ID und SQLITE_HUB_API_TOKEN müssen gesetzt sein.');
}

const url =
    `${baseUrl}/databases/${encodeURIComponent(databaseId)}` + `/queries/${encodeURIComponent(queryName)}/execute`;

const response = await fetch(url, {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${apiToken}`,
        Accept: 'application/json',
    },
});

const payload = await response.json();

if (!response.ok || payload.success !== true) {
    const message = payload.error?.message ?? `SQLite Hub antwortete mit HTTP ${response.status}.`;

    throw new Error(message);
}

console.log(payload.data);
console.log(payload.metadata);
```

Datenbank-ID und API-Token werden über Umgebungsvariablen eingelesen:

```bash
export SQLITE_HUB_DATABASE_ID="DATABASE_ID"
export SQLITE_HUB_API_TOKEN="shub_DEIN_TOKEN"

node query-sqlite-hub.js
```

Das Token sollte nicht direkt im Quellcode stehen. Auch in Screenshots, Protokollen oder öffentlich zugänglichen Repositories hat es nichts verloren.

## Die wichtigsten Endpunkte der SQLite-Hub-API

Die folgenden Endpunkte decken den grundlegenden Workflow für Queries und Exporte ab:

| Methode | Endpunkt                                                   | Aufgabe                                        |
| ------- | ---------------------------------------------------------- | ---------------------------------------------- |
| GET     | `/api/v1/info`                                             | Version und Status der lokalen Instanz abrufen |
| POST    | `/api/v1/query`                                            | Eine direkte SQL-Query ausführen               |
| GET     | `/api/v1/databases/:databaseId`                            | Informationen zu einer Datenbank abrufen       |
| GET     | `/api/v1/databases/:databaseId/tables`                     | Tabellen auflisten                             |
| GET     | `/api/v1/databases/:databaseId/tables/:tableName`          | Eine Tabelle untersuchen                       |
| GET     | `/api/v1/databases/:databaseId/queries`                    | Gespeicherte Queries auflisten                 |
| GET     | `/api/v1/databases/:databaseId/queries/:queryName`         | Eine gespeicherte Query abrufen                |
| POST    | `/api/v1/databases/:databaseId/queries/:queryName/execute` | Eine gespeicherte Query ausführen              |
| GET     | `/api/v1/databases/:databaseId/queries/:queryName/notes`   | Query-Notizen abrufen                          |
| GET     | `/api/v1/databases/:databaseId/queries/:queryName/export`  | Query-Ergebnisse exportieren                   |

SQLite Hub bietet darüber hinaus Endpunkte für Dokumente, einzelne Datensätze und die Generierung von TypeScript-, Rust-, Kotlin- oder Swift-Typen.

Wie SQLite Hub aus den Tabellenmetadaten konkrete Anwendungstypen erzeugt, zeige ich im Guide [TypeScript-Typen aus einem SQLite-Schema generieren](/blog/2026-06-25-typescript-typen-aus-sqlite-schema-generieren/).

## Queries für eine stabile API vorbereiten

Eine Query kann im SQL-Editor ein korrektes Ergebnis liefern und trotzdem ungeeignet für eine längerfristige Integration sein.

Für wiederverwendbare API-Abfragen beachte ich deshalb einige Grundregeln.

### Benötigte Spalten explizit auswählen

Für dauerhaft verwendete Queries vermeide ich nach Möglichkeit `SELECT *`.

Stattdessen gebe ich die benötigten Spalten an:

```sql
SELECT
  id,
  customer_id,
  total,
  created_at
FROM orders
ORDER BY created_at DESC, id DESC;
```

Wird der Tabelle später eine weitere Spalte hinzugefügt, verändert sich dadurch nicht automatisch die Struktur der API-Antwort.

### Ergebnisse eindeutig sortieren

Ohne `ORDER BY` ist keine feste Reihenfolge der Ergebniszeilen garantiert.

Für reproduzierbare Ergebnisse sollte die Sortierung deshalb Bestandteil der Query sein:

```sql
SELECT
  id,
  customer_id,
  total
FROM orders
ORDER BY created_at DESC, id DESC;
```

Die zweite Sortierung nach `id` sorgt für eine eindeutige Reihenfolge, wenn mehrere Datensätze denselben Zeitstempel besitzen.

### Verständliche Query-Namen verwenden

Der Name einer gespeicherten Query wird Teil der API-URL.

Ein Name wie `Monatlicher Umsatz` ist stabiler und verständlicher als `Test`, `Query 1` oder `Neue Abfrage`.

Wird der Name später geändert, müssen auch alle Anwendungen angepasst werden, die diese Query über die API aufrufen.

### Schemaänderungen berücksichtigen

Gespeicherte Queries können von Tabellen, Spalten, Views und bestimmten Statuswerten abhängen.

Nach einer Schemaänderung sollte deshalb nicht nur geprüft werden, ob die Query noch ausgeführt werden kann. Entscheidend ist auch, ob das Ergebnis weiterhin dieselbe fachliche Bedeutung besitzt.

Ein syntaktisch gültiges JSON-Ergebnis ist nicht automatisch inhaltlich korrekt.

## Schreibgeschützte SQLite-Datenbanken verwenden

Eine API vereinfacht den Zugriff auf die Datenbank. Damit steigt auch die Bedeutung klarer Zugriffsgrenzen.

Ist eine Datenbank in SQLite Hub als schreibgeschützt markiert, lehnt der Endpunkt für direkte SQL-Queries verändernde Anweisungen mit dem HTTP-Status `403` ab.

Für ein Skript, das Daten lediglich analysiert oder exportiert, ist ein Schreibzugriff normalerweise nicht erforderlich.

Ich verwende für solche Abläufe nach Möglichkeit:

- ein eigenes Token für die konkrete Integration
- eine schreibgeschützte Datenbankverbindung
- explizite `SELECT`-Abfragen
- eine begrenzte Auswahl benötigter Spalten
- eindeutig benannte und dokumentierte Queries

Der Schreibschutz ersetzt keine Prüfung des SQL-Codes. Er verhindert aber, dass eine für Auswertungen gedachte Integration versehentlich Datensätze oder Tabellenstrukturen verändert.

## Lokale API sicher verwenden

SQLite Hub bindet den Server standardmäßig an `127.0.0.1`. Die API ist damit für lokale Anwendungen und Entwicklerwerkzeuge vorgesehen.

Sie ist kein fertig konfigurierter öffentlicher Datenbankdienst.

Bei der Verwendung beachte ich deshalb folgende Punkte:

- Tokens nur für die benötigte Datenbank erstellen
- nicht mehr benötigte Tokens löschen
- Tokens über Umgebungsvariablen oder eine Secret-Verwaltung laden
- reine Analyseverbindungen schreibgeschützt öffnen
- Datenbank-IDs und Tokens nicht unnötig protokollieren
- dynamische URL-Werte immer kodieren
- HTTP-Status, `success`, Fehler und Warnungen auswerten
- exportierte Daten auf Vollständigkeit und Plausibilität prüfen

Ein gültiges Token bestätigt, dass der Aufrufer auf eine bestimmte Datenbank zugreifen darf. Es prüft nicht, ob eine Query fachlich sinnvoll ist.

## SQLite API, CLI oder direkter Datenbankzugriff?

SQLite Hub soll den direkten Zugriff auf SQLite-Dateien nicht grundsätzlich ersetzen.

Eine Anwendung, die ihre eigene Datenbank verwaltet, kann weiterhin eine SQLite-Bibliothek verwenden. Für viele Aufgaben bleibt auch das Programm `sqlite3` die einfachste Lösung.

Die lokale JSON-API ist besonders dann sinnvoll, wenn eine SQLite-Datenbank bereits in SQLite Hub verwaltet wird und dieselben gespeicherten Queries auch in anderen Werkzeugen verfügbar sein sollen.

| Zugang               | Geeignet für                                                |
| -------------------- | ----------------------------------------------------------- |
| Grafische Oberfläche | Daten untersuchen, Queries entwickeln und Ergebnisse prüfen |
| CLI                  | Shell-Skripte, geplante Abläufe und dateibasierte Exporte   |
| Lokale API           | Anwendungen, Entwicklerwerkzeuge und JSON-Verarbeitung      |
| SQLite-Bibliothek    | Direkter Datenbankzugriff innerhalb einer Anwendung         |
| `sqlite3`            | Klassische Abfragen und Exporte im Terminal                 |

Wie sich Queries ohne HTTP-Aufruf direkt aus dem [Terminal](https://oliverjessner.at/category/terminal/) automatisieren lassen, zeige ich im Artikel [SQLite CLI automatisieren: Queries ausführen und exportieren](https://oliverjessner.at/blog/2026-06-25-sqlite-cli-automatisieren-queries-ausfuehren-und-exportieren/).

CLI und API greifen dabei auf denselben Datenbankkontext und dieselben gespeicherten Queries zurück. Der passende Zugang hängt deshalb vor allem davon ab, wie das Ergebnis weiterverarbeitet werden soll.

## Fazit

SQLite besitzt selbst keine REST API. Als eingebettete Datenbank ist SQLite darauf ausgelegt, direkt von einer Anwendung oder über das Kommandozeilenprogramm geöffnet zu werden.

SQLite Hub ergänzt diesen Ansatz um eine lokale, versionierte JSON-API.

Damit kann ich eine Query im grafischen SQL-Editor entwickeln, testen, speichern und dokumentieren. Anschließend lässt sie sich aus eigenen Skripten oder Anwendungen per HTTP ausführen.

Die Ergebnisse können direkt als JSON verarbeitet oder als CSV, TSV, JSON und Markdown exportiert werden. Datenbankspezifische Tokens und der schreibgeschützte Modus schaffen dabei klare Zugriffsgrenzen.

Die SQLite-Datei bleibt weiterhin eine gewöhnliche lokale Datei. Sie wird nicht in ein proprietäres Projektformat umgewandelt und muss nicht auf eine externe Plattform hochgeladen werden.

Die API macht aus einer geprüften SQL-Query einen wiederverwendbaren Baustein für eigene Werkzeuge, ohne die Einfachheit und Portabilität von SQLite aufzugeben.

Die volle Dokumentation findest du auf [GitHub](https://github.com/oliverjessner/sqlite-hub/blob/main/docs/API.md).
