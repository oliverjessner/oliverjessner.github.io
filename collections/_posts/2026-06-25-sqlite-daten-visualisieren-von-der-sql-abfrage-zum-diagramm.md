---
layout: post
title: 'SQLite-Daten visualisieren: Von der SQL-Abfrage zum Diagramm'
date: 2026-06-25 10:09:43 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - in-eigener-sache
    - UX
description: 'SQLite-Daten direkt aus SQL-Abfragen als Balken-, Linien-, Kreis- oder Streudiagramm visualisieren und als PNG exportieren'
thumbnail: '/assets/images/gen/blog/sqlite-daten-visualisieren-von-der-sql-abfrage-zum-diagramm/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-daten-visualisieren-von-der-sql-abfrage-zum-diagramm/header.webp'
faq:
    - question: 'Wie kann ich SQLite-Daten visualisieren?'
      answer: 'In SQLite Hub lässt sich eine SELECT-Abfrage speichern und anschließend als Balken-, Linien-, Kreis-, Donut- oder Streudiagramm darstellen.'
    - question: 'Muss ich meine SQLite-Daten für ein Diagramm exportieren?'
      answer: 'Nein. SQLite Hub erstellt Diagramme direkt aus den Ergebnissen lokaler SQL-Abfragen. Die SQLite-Datei muss dafür nicht in eine Cloud oder BI-Plattform hochgeladen werden.'
    - question: 'Kann ich SQLite-Diagramme als Bild speichern?'
      answer: 'Ja. Fertige Diagramme lassen sich in SQLite Hub als PNG-Datei exportieren und in Dokumentationen, Präsentationen oder Artikeln verwenden.'
socialmedia:
    - 'SQLite-Daten visualisieren, ohne sie zuerst nach Excel oder in eine BI-Plattform zu exportieren: SQLite Hub erstellt Diagramme direkt aus gespeicherten SQL-Abfragen.'
    - 'Von der SELECT-Abfrage zum PNG: Ich zeige, wie SQLite Hub lokale Daten als Balken-, Linien-, Kreis-, Donut- oder Streudiagramm darstellt.'
    - 'Ein Diagramm ist nur so gut wie die zugrunde liegende SQL-Abfrage. So verbindet SQLite Hub SQL-Editor, Query History, Charts und PNG-Export.'
---

SQLite-Daten visualisieren, ohne sie zuerst zu exportieren: SQLite Hub verwandelt gespeicherte SQL-Abfragen lokal in Diagramme und exportiert sie bei Bedarf als PNG.

## SQLite-Daten visualisieren, ohne das Werkzeug zu wechseln

SQLite eignet sich nicht nur als eingebettete Datenbank für Anwendungen. Entwickler nutzen SQLite-Dateien auch für Prototypen, lokale Analysen, Logdaten, Testdaten, Exporte und interne Werkzeuge.

Solange einzelne Datensätze geprüft werden, genügt meist eine Tabellenansicht. Sobald jedoch Werte verglichen, zeitliche Entwicklungen untersucht oder Verteilungen betrachtet werden sollen, ist ein Diagramm häufig leichter verständlich.

Der übliche Workflow sieht dann so aus: SQL-Abfrage ausführen, Ergebnis als CSV exportieren, die Datei in einer Tabellenkalkulation oder Business-Intelligence-Plattform öffnen und dort erneut aufbereiten. Für umfangreiche Reporting-Projekte kann dieser Weg sinnvoll sein. Bei einer lokalen SQLite-Datenbank und einer konkreten Auswertung erzeugt er jedoch zusätzliche Arbeit.

![SQLite Hub zeigt die Konfiguration eines Diagramms mit Achsen, Datenreihen, Beschriftungen und Darstellungsoptionen](/assets/images/side_projects/slqlite_hub/mockups/charts_1_1920.webp)

Genau deshalb habe ich die Chart-Funktion in [SQLite Hub](https://oliverjessner.at/sqlite-hub/) eingebaut. Sie soll keinen vollständigen BI-Stack ersetzen. Das Ziel ist ein kurzer, nachvollziehbarer Ablauf:

1. SQLite-Datenbank öffnen
2. SQL-Abfrage ausführen und Ergebnis prüfen
3. Abfrage speichern
4. Diagramm erstellen und als PNG exportieren

Die Daten bleiben dabei lokal. Es ist weder eine gehostete Datenbank noch ein separates Dashboard-System notwendig.

## So wird aus einer SQL-Abfrage ein Diagramm

Ausgangspunkt jeder Visualisierung in SQLite Hub ist eine SELECT-Abfrage. Die SQL-Abfrage bestimmt, welche Daten im Diagramm erscheinen, wie sie gruppiert werden und in welcher Reihenfolge SQLite Hub sie verarbeitet.

Eine monatliche Umsatzentwicklung könnte beispielsweise mit folgender Abfrage vorbereitet werden:

```sql
SELECT
    strftime('%Y-%m', created_at) AS month,
    ROUND(SUM(total_amount), 2) AS revenue
FROM orders
WHERE status = 'paid'
GROUP BY strftime('%Y-%m', created_at)
ORDER BY month;
```

Das Ergebnis besteht aus zwei relevanten Spalten:

- `month` enthält die Werte für die horizontale Achse
- `revenue` enthält die zu visualisierenden Umsätze

SQLite Hub zeigt das Resultat zunächst in der Ergebnistabelle des SQL-Editors. Dort lässt sich prüfen, ob die Monate chronologisch sortiert sind, unerwartete `NULL`-Werte vorkommen oder die Aggregation tatsächlich die gewünschte Aussage abbildet.

Erst danach wird die Abfrage als Grundlage für ein Diagramm verwendet.

Dieser Zwischenschritt ist bewusst vorgesehen. Ein optisch überzeugendes Diagramm kann eine fehlerhafte SQL-Abfrage nicht korrigieren. Für einen zuverlässigen Workflow in der [Softwareentwicklung](https://oliverjessner.at/category/software-development/) muss deshalb auch das tabellarische Ergebnis nachvollziehbar bleiben.

## Query History und gespeicherte Abfragen als Datenbasis

SQLite Hub führt für jede geöffnete Datenbank eine eigene Query History. Ausgeführte Abfragen lassen sich dort wieder öffnen, durchsuchen und erneut ausführen.

Wichtige SELECT-Abfragen können zusätzlich gespeichert, benannt und mit einer Notiz versehen werden. Diese gespeicherten Abfragen bilden die Grundlage für die Diagrammfunktion.

Das hat mehrere Vorteile:

- Die SQL-Logik hinter einem Diagramm bleibt sichtbar.
- Die Abfrage kann später erneut ausgeführt werden.
- Änderungen an der Datenaufbereitung erfolgen direkt im SQL.
- Dieselbe Abfrage lässt sich über GUI, CLI oder lokale API weiterverwenden.
- Diagramm und Datenquelle bleiben miteinander verbunden.

Ich wollte bewusst vermeiden, dass die Logik einer Visualisierung ausschließlich in einer grafischen Konfiguration steckt. Wer ein Diagramm später öffnet, soll weiterhin erkennen können, aus welcher SQL-Abfrage es entstanden ist.

Mehr über die grundsätzliche Idee hinter dem Tool beschreibe ich im Beitrag [SQLite Hub: Warum ich einen SQLite Editor gebaut habe](https://oliverjessner.at/blog/2026-06-19-sqlite-hub-warum-ich-einen-sqlite-editor-gebaut-habe/).

## Welche Diagrammtypen unterstützt SQLite Hub?

SQLite Hub kann gespeicherte Abfrageergebnisse als Balken-, Linien-, Kreis-, Donut- oder Streudiagramm darstellen. Welcher Diagrammtyp sinnvoll ist, hängt von der Struktur der Daten und der zu beantwortenden Frage ab.

| Diagrammtyp    | Geeignet für                      | Typisches Beispiel               |
| -------------- | --------------------------------- | -------------------------------- |
| Balkendiagramm | Vergleich einzelner Kategorien    | Bestellungen nach Status         |
| Liniendiagramm | Entwicklung über einen Zeitraum   | Umsatz pro Monat                 |
| Kreisdiagramm  | Anteile weniger Kategorien        | Verteilung nach Gerätetyp        |
| Donutdiagramm  | Anteile mit kompakter Darstellung | Tickets nach Priorität           |
| Streudiagramm  | Zusammenhang numerischer Werte    | Dateigröße und Verarbeitungszeit |

Die Auswahl eines Diagrammtyps ist keine rein gestalterische Entscheidung. Sie beeinflusst, welche Unterschiede sichtbar werden und wie leicht sich das Ergebnis interpretieren lässt.

## Balkendiagramme für Kategorien vergleichen

Balkendiagramme eignen sich besonders für direkte Vergleiche. Typische Anwendungsfälle sind Datensätze nach Status, Fehler nach Anwendungsversion oder Bestellungen nach Produktkategorie.

Eine passende SQLite-Abfrage könnte so aussehen:

```sql
SELECT
    status,
    COUNT(*) AS task_count
FROM tasks
GROUP BY status
ORDER BY task_count DESC;
```

Die Spalte `status` enthält die Kategorien. `task_count` liefert die numerischen Werte für die Balken.

Eine explizite Sortierung mit `ORDER BY` verbessert meist die Lesbarkeit. Ohne Sortierung kann SQLite ein fachlich korrektes Ergebnis liefern, dessen Reihenfolge im Diagramm jedoch wenig hilfreich ist.

## Liniendiagramme für Entwicklungen über die Zeit

Liniendiagramme sind für zeitliche Entwicklungen gedacht. Dazu zählen tägliche Nutzerzahlen, monatliche Umsätze, Speicherverbrauch oder regelmäßig erfasste Messwerte.

Zeitangaben sollten bereits in der SQL-Abfrage in ein einheitliches Format gebracht werden:

```sql
SELECT
    date(created_at) AS day,
    COUNT(*) AS registrations
FROM users
GROUP BY date(created_at)
ORDER BY day;
```

SQLite Hub verwendet `day` als zeitliche Achse und `registrations` als Messwert.

Bei Monatswerten kann `strftime('%Y-%m', created_at)` verwendet werden. Das Format mit Jahr und Monat ist wichtig, weil eine Gruppierung nur nach dem Monatsnamen oder der Monatsnummer Daten aus unterschiedlichen Jahren vermischen könnte.

Für Liniendiagramme bietet SQLite Hub außerdem eine geglättete Darstellung. Diese Option verändert nur die visuelle Verbindung zwischen den Datenpunkten. Die zugrunde liegenden Werte bleiben unverändert.

Eine geglättete Linie kann Entwicklungen ruhiger erscheinen lassen. Bei wenigen oder stark schwankenden Datenpunkten kann sie Unterschiede jedoch weniger deutlich darstellen. Deshalb sollte die Darstellung zur Aussage des Diagramms passen.

## Kreis- und Donutdiagramme für Anteile

Kreis- und Donutdiagramme können zeigen, welchen Anteil einzelne Kategorien an einer Gesamtheit haben.

Ein Beispiel ist die Verteilung von Supporttickets nach Priorität:

```sql
SELECT
    priority,
    COUNT(*) AS ticket_count
FROM support_tickets
GROUP BY priority
ORDER BY ticket_count DESC;
```

Solche Diagramme funktionieren am besten mit wenigen klar unterscheidbaren Kategorien. Bei vielen Segmenten werden Beschriftungen und Größenunterschiede schnell schwer lesbar.

Für eine größere Zahl von Kategorien ist ein sortiertes Balkendiagramm meist besser geeignet. SQLite Hub nimmt diese fachliche Entscheidung nicht automatisch ab. Die Oberfläche stellt die Diagrammtypen bereit, die passende Auswahl bleibt beim Nutzer.

## Streudiagramme für numerische Zusammenhänge

Ein Streudiagramm stellt numerische Werte auf zwei Achsen gegenüber. Damit lassen sich mögliche Zusammenhänge zwischen zwei Variablen untersuchen.

Ein Beispiel wäre die Frage, ob größere Importdateien längere Verarbeitungszeiten verursachen:

```sql
SELECT
    file_size_mb,
    processing_time_ms,
    item_count
FROM imports
WHERE file_size_mb IS NOT NULL
  AND processing_time_ms IS NOT NULL;
```

Für das Diagramm kann `file_size_mb` auf der X-Achse und `processing_time_ms` auf der Y-Achse verwendet werden.

Optional lässt sich eine weitere numerische Spalte für die Größe der Punkte auswählen. Im Beispiel kann `item_count` darstellen, wie viele Datensätze in der jeweiligen Datei enthalten waren.

Ein Streudiagramm kann auffällige Muster oder Ausreißer sichtbar machen. Es beweist jedoch noch keinen kausalen Zusammenhang zwischen den dargestellten Variablen.

## SQL-Abfragen für Diagramme richtig vorbereiten

Die Qualität eines SQLite-Diagramms hängt wesentlich von der zugrunde liegenden Abfrage ab. Die Daten sollten deshalb bereits im SQL so vorbereitet werden, dass das Ergebnis eine eindeutige Struktur besitzt.

### Verständliche Spaltennamen verwenden

Aliase machen sowohl das Abfrageergebnis als auch die spätere Diagrammkonfiguration verständlicher:

```sql
SELECT
    category AS product_category,
    SUM(amount) AS total_revenue
FROM sales
GROUP BY category;
```

Bezeichnungen wie `product_category` und `total_revenue` sind leichter einzuordnen als komplexe Ausdrücke oder automatisch erzeugte Spaltennamen.

### Ergebnisse explizit sortieren

Die Reihenfolge der Zeilen beeinflusst die Darstellung. Zeitreihen sollten chronologisch, Ranglisten meist nach dem numerischen Wert sortiert werden.

```sql
ORDER BY total_revenue DESC;
```

Ohne `ORDER BY` sollte nicht davon ausgegangen werden, dass SQLite die Zeilen dauerhaft in derselben Reihenfolge zurückgibt.

### Fehlende Werte bewusst behandeln

`NULL`-Werte können Achsen, Aggregationen und Vergleiche beeinflussen. Je nach Fragestellung sollten sie ausgeschlossen, ersetzt oder als eigene Kategorie dargestellt werden.

```sql
WHERE revenue IS NOT NULL;
```

Alternativ kann `COALESCE` einen Ersatzwert liefern:

```sql
SELECT
    COALESCE(category, 'Unbekannt') AS category,
    COUNT(*) AS records
FROM products
GROUP BY COALESCE(category, 'Unbekannt');
```

### Numerische Textwerte umwandeln

SQLite verwendet ein flexibles Typsystem. Eine Spalte kann Zahlen enthalten, die als Text gespeichert wurden. Für numerische Auswertungen kann deshalb eine explizite Umwandlung erforderlich sein:

```sql
SELECT
    category,
    AVG(CAST(value AS REAL)) AS average_value
FROM measurements
GROUP BY category;
```

Die automatische Spaltenauswahl von SQLite Hub erleichtert die Konfiguration. Sie ersetzt jedoch nicht die Prüfung, ob die Werte fachlich und technisch korrekt typisiert sind.

## Spalten, Achsen und Beschriftungen konfigurieren

Nach der Auswahl einer gespeicherten Abfrage zeigt SQLite Hub die für den Diagrammtyp geeigneten Spalten an. Anschließend lassen sich die benötigten Werte den Achsen oder Kategorien zuordnen.

![SQLite Hub visualisiert das Ergebnis einer SQL-Abfrage als Diagramm](/assets/images/side_projects/slqlite_hub/mockups/charts_4_edit_query_chart_modal_1920)

Je nach Diagrammtyp können unter anderem folgende Einstellungen relevant sein:

- Spalte für Kategorien oder Zeitpunkte
- Spalte für numerische Werte
- X- und Y-Achse
- optionale Punktgröße bei Streudiagrammen
- Titel und Beschriftungen
- Legende
- Sortierung
- geglättete Linien

Die automatische Vorauswahl soll den Einstieg erleichtern. Die endgültige Zuordnung bleibt aber kontrollierbar.

Das war mir aus Sicht der [Software-Engineering-Praxis](https://oliverjessner.at/category/software-engineering/) wichtig. Eine Oberfläche sollte sinnvolle Vorschläge machen, aber nicht verbergen, wie eine Darstellung zustande kommt.

## SQLite-Diagramme speichern und erneut ausführen

Ein erstelltes Diagramm kann in SQLite Hub gespeichert und dauerhaft mit der zugrunde liegenden Abfrage verbunden werden. Es lässt sich später erneut öffnen, bearbeiten, vergrößern oder löschen.

Beim erneuten Öffnen führt SQLite Hub die gespeicherte Abfrage mit dem aktuellen Stand der Datenbank aus. Die Diagrammkonfiguration bleibt erhalten, während sich die dargestellten Werte verändern können.

Das ist praktisch für SQLite-Dateien, die regelmäßig neue Datensätze erhalten. Eine monatliche Umsatzabfrage muss nicht jedes Mal neu konfiguriert werden. Das gespeicherte Diagramm kann mit den aktuellen Daten erneut gerendert werden.

Dabei ist wichtig: Ein gespeichertes Diagramm ist keine unveränderliche Momentaufnahme. Wer einen bestimmten Datenstand dokumentieren möchte, sollte das Diagramm als PNG exportieren und bei Bedarf zusätzlich die verwendete Datenbankversion sichern.

## SQLite-Diagramm als PNG exportieren

Fertige Diagramme lassen sich in SQLite Hub als PNG-Datei exportieren. Dadurch können sie außerhalb der Anwendung weiterverwendet werden, etwa in:

- technischen Dokumentationen
- Projektberichten
- Präsentationen
- Blogposts
- Fehleranalysen
- internen Auswertungen

Der Export ist bewusst auf ein portables Bildformat beschränkt. SQLite Hub soll keine vollständige Layout- oder Reportingsoftware ersetzen. Das Ziel ist eine schnelle Visualisierung auf Basis einer geprüften SQL-Abfrage.

Für weitere Analysen lassen sich vollständige Tabellen und Abfrageergebnisse zusätzlich als CSV, TSV, JSON, Markdown oder Parquet exportieren. Die Daten bleiben damit auch für Tabellenkalkulationen, Skripte, Notebooks und andere Datenbankwerkzeuge zugänglich.

## SQLite Hub oder BI-Plattform?

Ob SQLite Hub oder eine Business-Intelligence-Plattform besser geeignet ist, hängt vom Umfang des Projekts ab.

SQLite Hub ist sinnvoll, wenn:

- bereits eine lokale SQLite-Datei vorhanden ist
- eine konkrete SQL-Abfrage visualisiert werden soll
- Daten das lokale System nicht verlassen sollen
- kein dauerhaftes Dashboard benötigt wird
- ein Diagramm schnell als PNG exportiert werden soll
- SQL-Abfrage und Visualisierung nachvollziehbar verbunden bleiben sollen

Eine BI-Plattform ist sinnvoller, wenn:

- mehrere Datenquellen zusammengeführt werden
- viele Personen dieselben Dashboards verwenden
- Berichte automatisch verteilt werden
- Zugriffsrechte und Rollen benötigt werden
- Kennzahlen zentral verwaltet werden
- interaktive Management-Dashboards entstehen sollen

SQLite Hub positioniert sich bewusst nicht als Power-BI-, Tableau- oder Looker-Ersatz. Das Tool deckt den kleineren, lokalen Workflow ab, bei dem der Aufbau einer zusätzlichen Analyseplattform unverhältnismäßig wäre.

## Grenzen der Visualisierung

Diagramme erleichtern es, Entwicklungen, Unterschiede und Ausreißer zu erkennen. Sie können aber auch irreführend sein, wenn Abfrage, Skalierung oder Diagrammtyp nicht zur Fragestellung passen.

Vor dem Export sollte deshalb geprüft werden:

- Ist die Grundgesamtheit vollständig?
- Enthält das Ergebnis doppelte Datensätze?
- Werden fehlende Werte korrekt behandelt?
- Ist die zeitliche Sortierung eindeutig?
- Verdeckt die Aggregation wichtige Unterschiede?
- Passt der Diagrammtyp zur Aussage?
- Sind Achsen und Einheiten verständlich beschriftet?
- Zeigt das Diagramm nur eine Korrelation oder tatsächlich einen belastbaren Zusammenhang?

SQLite Hub unterstützt die technische Aufbereitung und Darstellung. Die fachliche Interpretation bleibt beim Menschen.

## Von der lokalen SQLite-Datei zum fertigen Diagramm

Mit der Chart-Funktion wollte ich einen häufigen SQLite-Workflow verkürzen. Eine SQL-Abfrage soll nicht erst als Datei exportiert und in einem zweiten Werkzeug nachgebaut werden müssen, nur um daraus ein einfaches Diagramm zu erstellen.

In SQLite Hub bleiben SQL-Editor, Query History, gespeicherte Abfragen, Ergebnistabelle und Visualisierung miteinander verbunden. Dadurch bleibt nicht nur das fertige Diagramm sichtbar, sondern auch der Weg dorthin.

Für kleine Analysen, lokale Projekte und Entwicklungsdatenbanken ist das häufig ausreichend. Die SQLite-Datei bleibt eine normale Datei, die Abfrage bleibt nachvollziehbar und das Ergebnis lässt sich bei Bedarf als PNG oder offener Datensatz exportieren.
