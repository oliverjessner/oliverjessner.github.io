---
layout: post
title: 'SQLite CLI automatisieren: Queries ausführen und exportieren'
date: 2026-06-25 09:56:59 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - software-development
    - in-eigener-sache
description: 'Mit SQLite Hub SQL-Queries per CLI ausführen, gespeicherte Abfragen wiederverwenden und Ergebnisse als CSV, TSV, JSON oder Markdown exportieren'
thumbnail: '/assets/images/gen/blog/sqlite-cli-automatisieren-queries-ausfuehren-und-exportieren/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-cli-automatisieren-queries-ausfuehren-und-exportieren/header.webp'
faq:
    - question: 'Wie kann ich eine SQLite-Query über die CLI ausführen?'
      answer: 'Mit SQLite Hub wird eine SQL-Abfrage über --query ausgeführt. Dazu wird die gewünschte Datenbank mit --database ausgewählt und das SQL direkt im Terminal übergeben.'
    - question: 'Wie exportiere ich SQLite-Ergebnisse als CSV oder JSON?'
      answer: 'Gespeicherte Queries lassen sich mit --export und --format als CSV, TSV, JSON oder Markdown exportieren. Die Datei wird im aktuellen Arbeitsverzeichnis gespeichert.'
    - question: 'Ersetzt die SQLite-Hub-CLI das Programm sqlite3?'
      answer: 'Nein. sqlite3 eignet sich für den direkten Zugriff auf SQLite-Dateien. SQLite Hub ergänzt diesen Workflow um gespeicherte Queries, Notizen, eine Query History und Exporte aus der grafischen Oberfläche.'
socialmedia:
    - 'SQLite-Queries im Terminal ausführen, gespeicherte Abfragen wiederverwenden und Ergebnisse als CSV, TSV, JSON oder Markdown exportieren: Ich zeige, wie sich wiederkehrende SQLite-Aufgaben mit der CLI von SQLite Hub automatisieren lassen.'
    - 'Eine SQL-Query im Editor entwickeln und später per CLI erneut ausführen: Genau dafür habe ich SQLite Hub gebaut. Der Beitrag zeigt Installation, Query History, Exporte und ein vollständiges Bash-Skript.'
    - 'Warum nicht einfach sqlite3 verwenden? Die CLI von SQLite Hub verbindet den grafischen SQL-Editor mit Shell-Skripten, gespeicherten Queries und reproduzierbaren Exporten lokaler SQLite-Datenbanken.'
---

Mit der SQLite-Hub-CLI lassen sich SQL-Queries im Terminal ausführen, gespeicherte Abfragen wiederverwenden und Ergebnisse als CSV, TSV, JSON oder Markdown exportieren.

## SQLite CLI für wiederkehrende Abfragen und Exporte

Viele Arbeiten mit einer SQLite-Datenbank beginnen in einer grafischen Oberfläche. Ich öffne eine Datei, prüfe Tabellen und Beziehungen, schreibe eine SQL-Query und kontrolliere das Ergebnis. Wird dieselbe Abfrage regelmäßig benötigt, ist dieser manuelle Ablauf jedoch unnötig aufwendig.

Genau dafür habe ich die CLI von [SQLite Hub](https://oliverjessner.at/sqlite-hub/) entwickelt. Sie verbindet den grafischen SQL-Editor mit wiederholbaren Abläufen im [Terminal](https://oliverjessner.at/terminal/).

Eine Query kann zunächst in der Oberfläche entwickelt, getestet und gespeichert werden. Anschließend lässt sie sich über die Kommandozeile erneut ausführen oder in ein offenes Dateiformat exportieren. Die SQLite-Datenbank bleibt dabei lokal auf dem eigenen Rechner.

Damit eignet sich SQLite Hub unter anderem für folgende Aufgaben:

- SQL-Queries direkt im Terminal ausführen
- gespeicherte Queries wiederverwenden
- Abfrageergebnisse als CSV, TSV, JSON oder Markdown exportieren
- Datenbankinformationen in Shell-Skripten abrufen
- wiederkehrende SQLite-Exporte automatisieren
- Abfragen zwischen grafischer Oberfläche und CLI teilen

Die CLI soll den SQL-Editor nicht ersetzen. Sie ergänzt ihn um einen reproduzierbaren Zugang für Skripte, lokale Workflows und regelmäßige Exporte.

## SQLite Hub CLI installieren

SQLite Hub lässt sich unter macOS und Linux über Homebrew installieren:

```bash
brew tap oliverjessner/tap
brew install sqlite-hub
```

Alternativ steht SQLite Hub als globales npm-Paket zur Verfügung:

```bash
npm install -g sqlite-hub
```

Nach der Installation startet der folgende Befehl SQLite Hub auf dem Standardport 4173:

```bash
sqlite-hub
```

Mit `--open` wird die Anwendung zusätzlich im Browser geöffnet:

```bash
sqlite-hub --open
```

Informationen zur installierten Version, zur lokalen URL und zum verwendeten Port zeigt die Option `--info`:

```bash
sqlite-hub --info
```

Die CLI ist Bestandteil derselben Installation wie die grafische Oberfläche. Es muss kein separates Kommandozeilenwerkzeug eingerichtet werden.

## SQLite-Datenbanken über die CLI auflisten

SQLite Hub arbeitet mit Datenbanken, die zuvor in der Anwendung geöffnet wurden. Alle bekannten Datenbankverbindungen lassen sich über folgenden Befehl anzeigen:

```bash
sqlite-hub --database
```

Die Kurzform lautet:

```bash
sqlite-hub -d
```

Die Ausgabe enthält unter anderem:

- Name der Verbindung
- Pfad zur SQLite-Datei
- Dateigröße
- Zeitpunkt des letzten Öffnens
- Schreibschutzstatus

Eine bestimmte SQLite-Datenbank kann anschließend über ihren Namen oder ihre interne ID angesprochen werden. In den folgenden Beispielen verwende ich eine Verbindung mit dem Namen `Store`.

Den vollständigen Dateipfad zeigt `--path`:

```bash
sqlite-hub --database:Store --path
```

Die Dateigröße lässt sich mit `--size` abrufen:

```bash
sqlite-hub --database:Store --size
```

Alle Tabellen der ausgewählten Datenbank listet die CLI mit `--tables` auf:

```bash
sqlite-hub --database:Store --tables
```

Eine einzelne Tabelle lässt sich genauer untersuchen:

```bash
sqlite-hub --database:Store --table:orders
```

SQLite Hub zeigt dabei Informationen zu Spalten, Primärschlüsseln, Fremdschlüsseln, Indizes, Zeilenanzahl und der Strategie zur Identifikation einzelner Datensätze.

Das ist hilfreich, wenn ein Skript mit einer unbekannten oder veränderten Datenbank arbeiten soll. Vor der eigentlichen Abfrage kann geprüft werden, ob die erwarteten Tabellen und Spalten vorhanden sind.

## SQLite-Query direkt im Terminal ausführen

Eine SQL-Query wird über die Option `--query` ausgeführt:

```bash
sqlite-hub --database:Store --query:"SELECT id, customer_id, total FROM orders ORDER BY id DESC LIMIT 10"
```

Die CLI gibt nicht nur die gefundenen Datensätze zurück. Sie zeigt zusätzlich Metadaten wie:

- Anzahl der ausgeführten SQL-Statements
- zurückgegebene Spalten
- Anzahl der Ergebniszeilen
- Ausführungszeit

Die CLI verwendet denselben Ausführungspfad wie der SQL-Editor in der grafischen Oberfläche. Abfragen aus beiden Bereichen werden deshalb nicht getrennt voneinander verwaltet.

Über die CLI ausgeführte SQL-Queries erscheinen in der Query History der ausgewählten Datenbank.

Soll eine Abfrage zusätzlich einen festen Namen erhalten und als gespeicherte Query markiert werden, lässt sich `--store` verwenden:

```bash
sqlite-hub \
  --database:Store \
  --query:"SELECT id, customer_id, total FROM orders ORDER BY id DESC LIMIT 10" \
  --store:"Letzte Bestellungen"
```

Damit kann ich eine SQLite-Query direkt im Terminal ausführen und gleichzeitig für spätere Aufrufe speichern.

Ist die Datenbank in SQLite Hub als schreibgeschützt markiert, lehnt die CLI verändernde SQL-Statements ab. Für reine Analyse- und Exportprozesse bietet dieser Modus eine zusätzliche Absicherung.

## Gespeicherte SQLite-Queries auflisten

Umfangreichere Abfragen entwickle ich meist im grafischen SQL-Editor. Dort kann ich den SQL-Code formatieren, Ergebnisse kontrollieren, Ausführungsdetails ansehen und die Query unter einem verständlichen Namen speichern.

Alle gespeicherten Queries einer Datenbank lassen sich anschließend im Terminal auflisten:

```bash
sqlite-hub --database:Store --queries
```

Damit entsteht eine Übersicht über die Abfragen, die für diese SQLite-Datenbank bereits vorbereitet wurden.

Eine gespeicherte Query kann anschließend über ihren Namen ausgeführt werden:

```bash
sqlite-hub --database:Store --execute:"Monatlicher Umsatz"
```

SQLite Hub sucht den Titel in der Query History, führt den hinterlegten SQL-Code aus und gibt das Ergebnis zusammen mit den Ausführungsinformationen zurück.

Der gespeicherte SQL-Code lässt sich auch anzeigen, ohne die Query auszuführen:

```bash
sqlite-hub --database:Store --saved-query:"Monatlicher Umsatz"
```

Falls im SQL-Editor Notizen hinterlegt wurden, können diese ebenfalls über die CLI abgerufen werden:

```bash
sqlite-hub --database:Store --notes:"Monatlicher Umsatz"
```

Dadurch bleibt der Kontext einer Abfrage auch außerhalb der grafischen Oberfläche verfügbar. Das ist besonders nützlich, wenn eine Query später in ein Skript oder einen wiederkehrenden Export eingebunden wird.

## SQLite-Ergebnisse als CSV, TSV, JSON oder Markdown exportieren

Gespeicherte SQLite-Queries lassen sich direkt über die CLI exportieren. Aktuell unterstützt die Kommandozeile vier Formate:

| Format   | Geeignet für                                                          |
| -------- | --------------------------------------------------------------------- |
| CSV      | Tabellenkalkulationen, Datenimporte und allgemeine Weiterverarbeitung |
| TSV      | Daten mit vielen Kommas oder tabellarische Unix-Workflows             |
| JSON     | Skripte, Webanwendungen und strukturierte Verarbeitung                |
| Markdown | Dokumentationen, README-Dateien und Blogposts                         |

Der Export wird mit `--export` gestartet. Über `--format` wird das gewünschte Ausgabeformat ausgewählt.

### SQLite als CSV exportieren

Ein CSV-Export eignet sich für Tabellenkalkulationen, andere Datenbanken und viele Analysewerkzeuge:

```bash
sqlite-hub \
  --database:Store \
  --export:"Monatlicher Umsatz" \
  --format:csv
```

SQLite Hub führt die gespeicherte Query aus und schreibt das vollständige Ergebnis als CSV-Datei in das aktuelle Arbeitsverzeichnis.

### SQLite als TSV exportieren

TSV verwendet Tabulatoren statt Kommas als Trennzeichen:

```bash
sqlite-hub \
  --database:Store \
  --export:"Monatlicher Umsatz" \
  --format:tsv
```

Das Format kann sinnvoll sein, wenn Textfelder viele Kommas enthalten oder die Datei mit klassischen Kommandozeilenwerkzeugen weiterverarbeitet wird.

### SQLite als JSON exportieren

Für Skripte und Anwendungen eignet sich häufig JSON:

```bash
sqlite-hub \
  --database:Store \
  --export:"Monatlicher Umsatz" \
  --format:json
```

Der JSON-Export kann anschließend beispielsweise mit Node.js, Python oder `jq` verarbeitet werden.

### SQLite als Markdown exportieren

Soll das Ergebnis in eine Dokumentation, ein Repository oder einen Blogpost übernommen werden, kann Markdown praktischer sein:

```bash
sqlite-hub \
  --database:Store \
  --export:"Monatlicher Umsatz" \
  --format:md
```

Die Ergebniszeilen werden dabei als Markdown-Tabelle ausgegeben.

In der grafischen Oberfläche unterstützt SQLite Hub zusätzlich Parquet. Der Export gespeicherter Queries über die aktuelle CLI konzentriert sich auf CSV, TSV, JSON und Markdown.

## SQLite-Export mit einem Bash-Skript automatisieren

Da SQLite Hub die Exportdatei im aktuellen Arbeitsverzeichnis speichert, lässt sich das Zielverzeichnis einfach über ein Shell-Skript festlegen.

Das folgende Beispiel erstellt für jeden Tag einen eigenen Ordner und exportiert die gespeicherte Query `Monatlicher Umsatz` als CSV-Datei:

```bash
#!/usr/bin/env bash

set -euo pipefail

DATABASE="Store"
QUERY="Monatlicher Umsatz"
OUTPUT_DIR="$HOME/sqlite-hub-exports/$(date +%F)"

mkdir -p "$OUTPUT_DIR"

(
  cd "$OUTPUT_DIR"

  sqlite-hub \
    --database:"$DATABASE" \
    --export:"$QUERY" \
    --format:csv
)

echo "Export abgeschlossen: $OUTPUT_DIR"
```

Das Skript kann beispielsweise unter dem Namen `export-revenue.sh` gespeichert werden.

Anschließend wird die Datei ausführbar gemacht:

```bash
chmod +x export-revenue.sh
```

Danach lässt sich der SQLite-Export manuell starten:

```bash
./export-revenue.sh
```

Durch `set -euo pipefail` wird das Skript beendet, sobald ein Befehl fehlschlägt, eine nicht gesetzte Variable verwendet wird oder ein Fehler innerhalb einer Pipeline auftritt.

Das verhindert zwar nicht jede mögliche Fehlerquelle, macht fehlgeschlagene Exporte aber leichter erkennbar.

## SQLite-Export regelmäßig mit cron starten

Das Bash-Skript kann über einen Scheduler regelmäßig ausgeführt werden. Unter Linux und vielen Unix-Systemen eignet sich dafür beispielsweise `cron`.

Ein täglicher Export um 7 Uhr könnte so aussehen:

```cron
0 7 * * * /Users/oliver/scripts/export-revenue.sh >> /Users/oliver/logs/sqlite-export.log 2>&1
```

Der Pfad muss an das eigene System angepasst werden.

Bei geplanten Jobs sollte nicht davon ausgegangen werden, dass dieselben Umgebungsvariablen wie in einem interaktiven Terminal verfügbar sind. Kann der Befehl `sqlite-hub` nicht gefunden werden, sollte im Skript der vollständige Pfad verwendet werden.

Dieser lässt sich im Terminal ermitteln:

```bash
which sqlite-hub
```

Unter [macOS](https://oliverjessner.at/macos/) kann alternativ `launchd` verwendet werden. Für einfache Tests und manuell ausgelöste Exporte genügt zunächst das Shell-Skript.

Ich würde einen automatisierten SQLite-Export immer zuerst mehrfach manuell ausführen. Erst wenn Query, Dateiname, Zielordner und Fehlerbehandlung zuverlässig funktionieren, sollte der Prozess zeitgesteuert gestartet werden.

## SQLite-Queries für stabile Exporte vorbereiten

Eine Query, die im SQL-Editor ein plausibles Ergebnis liefert, ist nicht automatisch für einen langfristig automatisierten Export geeignet.

Einige Details helfen dabei, die Ausgabe stabil und nachvollziehbar zu halten.

### Explizite Spalten statt SELECT \*

Statt alle verfügbaren Spalten mit `SELECT *` abzurufen, verwende ich für automatisierte Exporte nach Möglichkeit eine feste Spaltenliste:

```sql
SELECT
  id,
  customer_id,
  total,
  created_at
FROM orders
ORDER BY created_at DESC;
```

Wird der Tabelle später eine neue Spalte hinzugefügt, verändert sich dadurch nicht automatisch die Struktur der Exportdatei.

Das ist besonders wichtig, wenn nachgelagerte Skripte eine feste Reihenfolge oder bestimmte Spaltennamen erwarten.

### Ergebnisse eindeutig sortieren

Ohne `ORDER BY` garantiert SQLite keine bestimmte Reihenfolge der Ergebniszeilen.

Für wiederkehrende Exporte sollte die gewünschte Sortierung deshalb Bestandteil der SQL-Query sein:

```sql
SELECT
  id,
  customer_id,
  total
FROM orders
ORDER BY created_at DESC, id DESC;
```

Die zusätzliche Sortierung nach `id` sorgt auch dann für eine eindeutige Reihenfolge, wenn mehrere Datensätze denselben Zeitstempel besitzen.

### Gespeicherte Queries eindeutig benennen

Die CLI ruft gespeicherte Queries über ihren Titel auf. Der Name sollte deshalb stabil, eindeutig und verständlich sein.

Ein Titel wie `Monatlicher Umsatz` ist für ein Skript geeigneter als `Test`, `Query 1` oder `Neue Abfrage`.

Wird der Titel später im SQL-Editor geändert, muss auch der entsprechende CLI-Befehl oder das Shell-Skript angepasst werden.

### Abhängigkeiten vom Datenbankschema beachten

Eine gespeicherte Query kann von Tabellen, Spalten, Views oder bestimmten Datentypen abhängen.

Nach einer Schemaänderung sollte deshalb geprüft werden, ob automatisierte Abfragen weiterhin funktionieren und dieselbe inhaltliche Bedeutung besitzen.

Ein erfolgreich ausgeführter Export ist nicht automatisch ein korrekter Export. Wurde beispielsweise eine Spalte umbenannt oder die Bedeutung eines Statuswertes verändert, kann die Datei formal gültig sein und trotzdem falsche Schlussfolgerungen ermöglichen.

## Warum nicht direkt sqlite3 verwenden?

SQLite bringt mit `sqlite3` bereits ein leistungsfähiges Kommandozeilenprogramm mit. Für direkte Abfragen, Migrationen, Importe und Exporte ist dieses Werkzeug oft vollkommen ausreichend.

Die CLI von SQLite Hub verfolgt einen ergänzenden Ansatz.

Ihr Vorteil liegt vor allem in der Verbindung mit der grafischen Oberfläche. Eine Query kann im SQL-Editor entwickelt, geprüft, benannt und dokumentiert werden. Dieselbe Abfrage lässt sich anschließend über die CLI ausführen, ohne den SQL-Code erneut in ein Shell-Skript kopieren zu müssen.

SQLite Hub ergänzt den direkten Datenbankzugriff unter anderem um:

- eine gemeinsame Query History für Oberfläche und CLI
- gespeicherte Queries mit stabilen Namen
- Notizen zu einzelnen Abfragen
- eine Liste bekannter SQLite-Datenbanken
- Exporte anhand gespeicherter Queries
- denselben Ausführungspfad in GUI und CLI

Wer ausschließlich einzelne SQL-Befehle in einer Datei ausführen möchte, kann weiterhin direkt mit `sqlite3` arbeiten.

Wer grafische Analyse, gespeicherte Abfragen und Automatisierung verbinden möchte, erhält mit SQLite Hub einen gemeinsamen Workflow.

## Wann die lokale API besser geeignet ist

Die CLI eignet sich besonders für Shell-Skripte, manuelle Terminal-Workflows und dateibasierte Exporte.

SQLite Hub enthält zusätzlich eine lokale und versionierte JSON-API. Diese ist sinnvoll, wenn eine Anwendung Ergebnisse direkt als strukturierte Antwort verarbeiten soll.

Typische Anwendungsfälle sind:

- Integration in eigene Entwicklerwerkzeuge
- Verarbeitung von Ergebnissen ohne temporäre Exportdatei
- Zugriff aus Node.js, Python oder einer anderen Anwendung
- wiederkehrende Abfragen innerhalb eines lokalen Dienstes

Ich betrachte grafische Oberfläche, CLI und API deshalb nicht als konkurrierende Zugänge.

Die Oberfläche hilft beim Verstehen, Entwickeln und Prüfen. Die CLI eignet sich für wiederholbare Befehle und dateibasierte Exporte. Die API stellt lokale SQLite-Daten für eigene Anwendungen und Werkzeuge bereit.

## Fazit

Die SQLite-Hub-CLI ist aus einem praktischen Bedarf entstanden: Eine SQL-Query soll nicht bei jedem Export erneut geöffnet, kopiert und manuell ausgeführt werden müssen.

Ich kann eine Abfrage im SQL-Editor entwickeln, ihr einen eindeutigen Namen geben, Notizen hinterlegen und sie später im Terminal erneut ausführen.

Die Ergebnisse lassen sich als CSV, TSV, JSON oder Markdown exportieren und über ein Bash-Skript in wiederkehrende lokale Prozesse einbinden.

SQLite Hub bleibt dabei ein Werkzeug für lokale SQLite-Dateien. Die Datenbank muss nicht hochgeladen oder in ein proprietäres Format übertragen werden.

Die CLI macht aus einer interaktiven SQL-Query einen nachvollziehbaren und wiederholbaren Arbeitsschritt, ohne den direkten Zugriff auf die zugrunde liegende SQLite-Datei aufzugeben.
