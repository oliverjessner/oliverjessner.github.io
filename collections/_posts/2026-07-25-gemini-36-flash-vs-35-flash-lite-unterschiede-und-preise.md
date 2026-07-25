---
layout: post
title: 'Gemini 3.6 Flash vs. 3.5 Flash-Lite: Unterschiede und Preise'
date: 2026-07-25 19:40:04 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - google
    - cloud
description: 'Gemini 3.6 Flash und 3.5 Flash-Lite im Vergleich: Preise, Unterschiede, Verfügbarkeit, API-Änderungen und die Rolle von Flash Cyber'
thumbnail: '/assets/images/gen/blog/gemini-36-flash-vs-35-flash-lite-unterschiede-und-preise/header_thumbnail.webp'
image: '/assets/images/gen/blog/gemini-36-flash-vs-35-flash-lite-unterschiede-und-preise/header.webp'
image_width: 1280
image_height: 854
faq:
    - question: 'Was ist der Unterschied zwischen Gemini 3.6 Flash und 3.5 Flash-Lite?'
      answer: 'Gemini 3.6 Flash ist für komplexere Coding-, Agenten- und multimodale Aufgaben vorgesehen. Gemini 3.5 Flash-Lite ist schneller und günstiger und eignet sich besonders für große Mengen einfacher oder gut strukturierter Anfragen.'
    - question: 'Was kosten Gemini 3.6 Flash und 3.5 Flash-Lite?'
      answer: 'Gemini 3.6 Flash kostet regulär $1.50 pro Million Input-Tokens und $7.50 pro Million Output-Tokens. Bei Gemini 3.5 Flash-Lite sind es $0.30 beziehungsweise $2.50.'
    - question: 'Ist Gemini 3.5 Flash Cyber öffentlich verfügbar?'
      answer: 'Nein. Google plant zunächst einen eingeschränkten Pilotbetrieb über CodeMender. Zugriff sollen vorerst nur Regierungen und ausgewählte vertrauenswürdige Partner erhalten.'
socialmedia:
    - 'Google bringt Gemini 3.6 Flash, 3.5 Flash-Lite und 3.5 Flash Cyber. Der Überblick zeigt Unterschiede, Preise, Verfügbarkeit und welches Modell sich für welchen Einsatz eignet.'
    - 'Gemini 3.6 Flash oder 3.5 Flash-Lite? Google setzt auf ein leistungsfähiges Arbeitsmodell und eine günstige Variante für hohe Stückzahlen. Dazu kommt ein Cybersecurity-Modell mit eingeschränktem Zugang.'
    - 'Gemini 3.6 Flash kostet weniger als 3.5 Flash und soll zugleich effizienter arbeiten. Für große Datenmengen ist 3.5 Flash-Lite günstiger. Was Entwickler bei Auswahl und Migration beachten sollten.'
---

Google erweitert Gemini um drei Modelle für unterschiedliche Aufgaben. Entscheidend sind nicht nur Benchmarks, sondern Kosten, Tempo, Verfügbarkeit und die Frage, welches Modell im Alltag tatsächlich sinnvoll ist.

## Drei neue Gemini-Modelle für unterschiedliche Aufgaben

Google hat am 21. Juli 2026 drei neue Modelle der Gemini-Familie vorgestellt. Dabei handelt es sich nicht einfach um drei unterschiedlich große Varianten desselben Modells. Jedes Modell ist für einen bestimmten Einsatzzweck gedacht.

Gemini 3.6 Flash soll komplexere Aufgaben übernehmen, bei denen Coding, multimodale Inhalte oder mehrere aufeinanderfolgende Arbeitsschritte eine Rolle spielen. Gemini 3.5 Flash-Lite richtet sich dagegen an Anwendungen mit hohem Durchsatz und knappen Kostenbudgets.

Gemini 3.5 Flash Cyber nimmt eine Sonderrolle ein. Das Modell wurde für das Erkennen, Überprüfen und Beheben von Sicherheitslücken trainiert. Es wird vorerst jedoch nicht über die normale Gemini API angeboten.

Für Entwickler, die [KI](https://oliverjessner.at/category/ki/) in produktiven Anwendungen einsetzen, ist deshalb weniger die Versionsnummer entscheidend. Wichtiger ist, wie komplex eine Aufgabe ist, wie viele Anfragen verarbeitet werden und wie teuer ein einzelner Durchlauf sein darf.

## Gemini 3.6 Flash: das Modell für komplexere Aufgaben

Google bezeichnet Gemini 3.6 Flash als neues Arbeitsmodell der Flash-Reihe. Es basiert auf Gemini 3.5 Flash, soll Aufgaben aber mit weniger Ausgaben, Tool-Aufrufen und wiederholten Verarbeitungsschritten erledigen.

Nach Angaben von Google benötigt Gemini 3.6 Flash im Artificial Analysis Index durchschnittlich 17 Prozent weniger Output-Tokens als Gemini 3.5 Flash. Gleichzeitig wurde der Preis pro Million Output-Tokens gesenkt.

Das Modell ist vor allem für folgende Aufgaben vorgesehen:

- Coding und die Bearbeitung größerer Softwareprojekte
- mehrstufige Abläufe mit mehreren Tools
- Analyse von Dokumenten, Diagrammen und Bildern
- Bedienung grafischer Oberflächen über Computer Use
- Wissensarbeit mit umfangreichen Ausgangsdaten
- Agenten, die über längere Zeit selbstständig Aufgaben bearbeiten

Für die [Softwareentwicklung](https://oliverjessner.at/category/software-development/) ist besonders relevant, dass das Modell laut Google weniger unerwünschte Änderungen an Dateien vornehmen und seltener in wiederholten Ausführungs- oder Debugging-Schleifen hängen bleiben soll.

Das muss sich in realen Projekten erst beweisen. Gerade bei Coding-Agenten können wenige zusätzliche Tool-Aufrufe oder unnötige Änderungen erhebliche Kosten verursachen. Die Tokenzahl allein sagt deshalb noch nicht aus, wie effizient ein kompletter Arbeitsablauf ist.

## Gemini 3.5 Flash-Lite: für große Mengen und kurze Antwortzeiten

Gemini 3.5 Flash-Lite ist das schnellste und günstigste Modell innerhalb der Gemini-3.5-Reihe. Es ist für Aufgaben gedacht, die sehr häufig ausgeführt werden und ein vorhersehbares Format besitzen.

Typische Einsatzbereiche sind:

- Klassifizierung und Sortierung von Inhalten
- Extraktion strukturierter Daten aus Dokumenten
- Übersetzungen und Zusammenfassungen
- Verarbeitung großer Tabellen oder Datensätze
- Erzeugung strukturierter JSON-Ausgaben
- einfache Unteraufgaben innerhalb eines größeren Agentensystems

Google verweist auf Messungen von Artificial Analysis, nach denen das Modell bis zu 350 Output-Tokens pro Sekunde erzeugen kann. Solche Werte sind allerdings stark von Infrastruktur, Region, Auslastung und Art der Anfrage abhängig.

Flash-Lite ist damit nicht automatisch die bessere Wahl für jede Anwendung. Bei einfachen Aufgaben kann das Modell Kosten und Wartezeiten deutlich reduzieren. Sobald mehrere Tools koordiniert, umfangreiche Entscheidungen getroffen oder komplexe Fehler analysiert werden müssen, kann Gemini 3.6 Flash zuverlässiger sein.

## Gemini 3.6 Flash vs. 3.5 Flash-Lite

Beide Modelle unterstützen ein Kontextfenster von bis zu einer Million Tokens und können maximal 64.000 Tokens ausgeben. Text, Bilder, Audio und Video können als Eingaben verarbeitet werden.

Die Unterschiede liegen vor allem bei Preis, Standardkonfiguration und vorgesehenem Einsatzgebiet.

**Gemini 3.6 Flash**

- Modell-ID: `gemini-3.6-flash`
- Input: $1.50 pro Million Tokens
- Output: $7.50 pro Million Tokens
- Standardmäßiges Thinking-Level: `medium`
- Fokus: Coding, komplexe Agenten und multimodale Analysen

**Gemini 3.5 Flash-Lite**

- Modell-ID: `gemini-3.5-flash-lite`
- Input: $0.30 pro Million Tokens
- Output: $2.50 pro Million Tokens
- Standardmäßiges Thinking-Level: `minimal`
- Fokus: hohe Stückzahlen, geringe Latenz und strukturierte Aufgaben

Gemini 3.6 Flash kostet beim Input fünfmal so viel wie Flash-Lite. Beim Output liegt der Faktor bei drei. Dieser Unterschied kann bei Anwendungen mit Millionen täglichen Anfragen erhebliche Auswirkungen haben.

## Was kosten die neuen Gemini-Modelle im Alltag?

Die veröffentlichten Preise beziehen sich jeweils auf eine Million Tokens und berücksichtigen kein Caching oder mögliche Sondertarife.

Eine Anwendung verarbeitet beispielsweise pro Monat zehn Millionen Input-Tokens und erzeugt zwei Millionen Output-Tokens.

Mit Gemini 3.6 Flash entstehen dabei reguläre Modellkosten von:

- $15 für den Input
- $15 für den Output
- insgesamt $30

Mit Gemini 3.5 Flash-Lite kostet dieselbe Tokenmenge:

- $3 für den Input
- $5 für den Output
- insgesamt $8

Die tatsächliche Differenz hängt allerdings davon ab, wie viele Anfragen erfolgreich abgeschlossen werden. Ein günstiges Modell bringt wenig, wenn es häufiger wiederholt werden muss oder bei komplexeren Aufgaben zusätzliche Tool-Aufrufe verursacht.

Für produktive [Cloud-Anwendungen](https://oliverjessner.at/category/cloud/) sollte deshalb nicht nur der Preis pro Token gemessen werden. Aussagekräftiger sind die Kosten pro erfolgreich erledigter Aufgabe.

## Ein Modell für alles ist selten die günstigste Lösung

In größeren Anwendungen müssen Gemini 3.6 Flash und Flash-Lite nicht gegeneinander antreten. Beide Modelle können unterschiedliche Stufen desselben Arbeitsablaufs übernehmen.

Flash-Lite kann zunächst Dokumente klassifizieren, Felder extrahieren oder einfache Anfragen beantworten. Nur unklare, umfangreiche oder fehlerhafte Fälle werden anschließend an Gemini 3.6 Flash weitergeleitet.

Ein solcher Aufbau kann mehrere Vorteile haben:

- einfache Aufgaben bleiben günstig
- komplexe Fälle erhalten mehr Rechenzeit
- Antwortzeiten sinken bei Routineanfragen
- Kosten lassen sich nach Aufgabentyp auswerten
- einzelne Modelle können später leichter ersetzt werden

Damit das funktioniert, benötigt die Anwendung klare Kriterien für die Weiterleitung. Dazu können ein niedriges Konfidenzniveau, fehlende Pflichtfelder, wiederholte Tool-Fehler oder ungewöhnlich große Eingaben gehören.

## Gemini 3.5 Flash Cyber: spezialisiertes Modell für Sicherheitslücken

Gemini 3.5 Flash Cyber basiert auf Gemini 3.5 Flash und wurde speziell für das Finden, Validieren und Beheben von Schwachstellen optimiert.

Das Modell wird innerhalb von Googles CodeMender eingesetzt. Dabei können mehrere Agenten parallel unterschiedliche Bereiche eines Projekts untersuchen. Die Ergebnisse werden anschließend zu einem gemeinsamen Bericht zusammengeführt.

Google nennt unter anderem folgende Einsatzgebiete:

- Analyse großer Codebasen
- Suche nach schwer erreichbaren Ausführungspfaden
- Prüfung neuer Commits
- Validierung möglicher Schwachstellen
- Erstellung und Überprüfung von Patches

Das Modell ist zum Start nicht allgemein verfügbar. Aufgrund des möglichen Missbrauchs plant Google zunächst einen eingeschränkten Pilotbetrieb für Regierungen und ausgewählte Partner.

Entwickler können Gemini 3.5 Flash Cyber daher nicht einfach als Modell-ID in einer normalen API-Anfrage auswählen. Einen öffentlichen Preis oder einen allgemeinen Starttermin gibt es bislang ebenfalls nicht.

## So lassen sich Gemini 3.6 Flash und Flash-Lite verwenden

Gemini 3.6 Flash und Gemini 3.5 Flash-Lite sind laut Google allgemein verfügbar und für den produktiven Einsatz vorgesehen. Sie können unter anderem über Google AI Studio, die Gemini API und die Gemini Enterprise Agent Platform verwendet werden.

Für JavaScript stellt Google das Paket `@google/genai` bereit.

```bash
npm install @google/genai
```

Eine einfache Anfrage mit Gemini 3.6 Flash sieht über die Interactions API so aus:

```javascript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

async function main() {
    const response = await ai.interactions.create({
        model: 'gemini-3.6-flash',
        input: 'Analysiere dieses Dokument und fasse die wichtigsten Risiken zusammen.',
    });

    console.log(response.outputText);
}

main().catch(console.error);
```

Für Flash-Lite muss lediglich die Modell-ID geändert werden:

```javascript
model: 'gemini-3.5-flash-lite';
```

Der API-Schlüssel kann über die Umgebungsvariable `GEMINI_API_KEY` bereitgestellt werden. Er sollte nicht direkt im Quellcode oder in einem öffentlichen Repository gespeichert werden.

## Wichtige Änderungen bei der API-Migration

Mit den neuen Modellen führt Google mehrere Änderungen an der Konfiguration ein. Bestehende Anwendungen sollten deshalb nicht nur die Modell-ID ersetzen.

Die Parameter `temperature`, `top_p`, `top_k` und `candidate_count` werden von den neuen Modellen nicht mehr unterstützt. Der bisher verwendete Parameter `thinking_budget` wird durch `thinking_level` ersetzt.

Für Gemini 3.6 Flash stehen dabei unter anderem die Werte `medium` und `high` zur Verfügung. Flash-Lite verwendet standardmäßig `minimal`. Bei komplexeren Unteragenten kann auch dort ein höheres Thinking-Level sinnvoll sein.

**Hinweis:** Alte Konfigurationsparameter sollten bei einer Migration bewusst entfernt werden. Andernfalls können Anfragen abgelehnt werden oder sich anders verhalten als erwartet.

Vor einer Umstellung empfiehlt sich ein eigener Testdatensatz. Dabei sollten nicht nur Antwortqualität und Laufzeit geprüft werden, sondern auch Tool-Aufrufe, Wiederholungen, Tokenverbrauch und die Kosten pro abgeschlossener Aufgabe.

## Wo bleibt Gemini 3.5 Pro?

Das auffällige fehlende Modell ist Gemini 3.5 Pro. Google erklärt lediglich, dass die Version derzeit gemeinsam mit Partnern getestet werde. Eine breite Veröffentlichung soll erfolgen, sobald das Modell fertig ist.

Einen konkreten Termin nennt das Unternehmen nicht. Aussagen über ein bestimmtes Veröffentlichungsdatum bleiben daher vorerst Spekulation.

Parallel hat Google nach eigenen Angaben bereits den bisher umfangreichsten Pre-Training-Lauf für Gemini 4 gestartet. Für aktuelle Projekte ist das jedoch nur begrenzt relevant. Entwickler müssen ihre Anwendungen anhand der tatsächlich verfügbaren Modelle planen.

## Grenzen und offene Fragen

Die Leistungsangaben stammen überwiegend von Google und aus von Google ausgewählten Benchmarks. Sie zeigen, welche Bereiche das Unternehmen verbessern wollte, ersetzen aber keine Tests mit den eigenen Daten.

Auch Gemini 3.6 Flash kann falsche Informationen erzeugen. Die Modellkarte nennt außerdem mögliche Verzögerungen und Timeouts. Ein Kontextfenster von einer Million Tokens garantiert nicht, dass jede Information innerhalb eines sehr großen Dokuments zuverlässig erkannt oder korrekt gewichtet wird.

Bei kritischen Anwendungen sollten Ausgaben deshalb geprüft, Tool-Berechtigungen begrenzt und Veränderungen an Daten oder Quellcode protokolliert werden.

## Fazit

Gemini 3.6 Flash und Gemini 3.5 Flash-Lite verfolgen zwei klar unterschiedliche Ziele. Gemini 3.6 Flash soll komplexere Agenten-, Coding- und Analyseaufgaben mit weniger Wiederholungen erledigen. Flash-Lite ist für hohe Stückzahlen, kurze Antwortzeiten und gut strukturierte Routineaufgaben vorgesehen.

Für viele Anwendungen dürfte eine Kombination sinnvoller sein als die Festlegung auf ein einziges Modell. Flash-Lite übernimmt günstige Standardaufgaben, während Gemini 3.6 Flash nur bei komplexen Fällen eingesetzt wird.

Gemini 3.5 Flash Cyber erweitert diese Strategie um ein spezialisiertes Sicherheitsmodell. Für normale Entwickler ist es vorerst jedoch nicht zugänglich. Auch Gemini 3.5 Pro bleibt angekündigt, hat aber weiterhin keinen bestätigten Veröffentlichungstermin.

## Quellen und weiterführende Informationen

- [Ankündigung der neuen Gemini-Modelle bei Google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/)
- [Dokumentation zu Gemini 3.6 Flash und 3.5 Flash-Lite](https://ai.google.dev/gemini-api/docs/latest-model)
- [Modellkarte von Gemini 3.6 Flash](https://deepmind.google/models/model-cards/gemini-3-6-flash/)
- [Modellkarte von Gemini 3.5 Flash-Lite](https://deepmind.google/models/model-cards/gemini-3-5-flash-lite/)
- [Informationen zu Gemini 3.5 Flash Cyber](https://deepmind.google/blog/introducing-gemini-3-5-flash-cyber/)
