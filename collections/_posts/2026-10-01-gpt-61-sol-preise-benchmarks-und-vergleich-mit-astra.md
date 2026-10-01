---
layout: post
title: 'GPT-6.1 Sol: Preise, Benchmarks und Vergleich mit Astra'
date: 2026-10-01 13:23:40 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - openai
    - KI
    - software-development
description: 'GPT-6.1 Sol rückt näher an Astra. Was das OpenAI-Modell kostet, wo es verfügbar ist und worauf Entwickler bei den Benchmarks achten sollten'
thumbnail: '/assets/images/gen/blog/gpt-61-sol-preise-benchmarks-und-vergleich-mit-astra/header_thumbnail.webp'
image: '/assets/images/gen/blog/gpt-61-sol-preise-benchmarks-und-vergleich-mit-astra/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Was kostet GPT-6.1 Sol in der API?'
      answer: 'Die Standardpreise pro Million Token betragen 2 US-Dollar für Eingaben, 0,10 US-Dollar für gelesene Cache-Token, 2,50 US-Dollar für Cache-Schreibvorgänge und 10 US-Dollar für Ausgaben. Für lange Prompts und andere Verarbeitungsmodi gelten abweichende Preise.'
    - question: 'Ist GPT-6.1 Sol in ChatGPT verfügbar?'
      answer: 'GPT-6.1 Sol wird in ChatGPT Work und Codex für berechtigte kostenpflichtige Tarife ausgerollt. In gewöhnlichen ChatGPT-Chats ist das Modell nicht verfügbar. Der tatsächliche Zugriff hängt vom Tarif, dem Rollout und den Workspace-Einstellungen ab.'
    - question: 'Ist GPT-6.1 Sol genauso gut wie GPT-6 Astra?'
      answer: 'In einzelnen von OpenAI veröffentlichten Benchmarks erreicht GPT-6.1 Sol das Niveau von Astra oder kommt ihm nahe. Daraus folgt keine Gleichwertigkeit bei allen Aufgaben. OpenAI führt Astra weiterhin als sein leistungsfähigstes Modell.'
socialmedia:
    - 'GPT-6.1 Sol kostet in der API 2 Dollar pro Million Eingabe-Token und 10 Dollar pro Million Ausgabe-Token. Wie nah kommt es an Astra heran? Preise, Benchmarks und die wichtigsten Einschränkungen im Überblick.'
    - 'GPT-6.1 Sol ist für ChatGPT Work, Codex und die API vorgesehen, nicht für gewöhnliche ChatGPT-Chats. Was beim Rollout gilt und wie du das Modell in Codex auswählst.'
    - '0,10 Dollar pro Million gelesene Cache-Token klingt günstig. Bei GPT-6.1 Sol gehören aber auch Cache-Schreibkosten zur Rechnung. Warum der günstigste Tokenpreis nicht automatisch den günstigsten Auftrag ergibt.'
news: true
---

GPT-6.1 Sol soll anspruchsvolle KI-Aufgaben deutlich günstiger erledigen als Astra. Entscheidend sind aber nicht nur die Benchmarks, sondern auch API-Preise, Cache-Kosten und die Verfügbarkeit in ChatGPT.

## Was ist GPT-6.1 Sol?

GPT-6.1 Sol ist ein KI-Modell von [OpenAI](https://oliverjessner.at/category/openai/) für Programmierung, die Bedienung von Computeranwendungen und mehrstufige Arbeitsabläufe. Es wurde am 29. September 2026 veröffentlicht, wie der [API-Changelog](https://developers.openai.com/api/docs/changelog) dokumentiert.

Das Modell entwickelt [GPT-6 Sol](https://oliverjessner.at/blog/2026-09-23-openai-gpt-6-sol-und-luna-preise-benchmarks-und-verfuegbarkeit/) weiter. OpenAI positioniert es als günstigere Alternative zu GPT-6 Astra, nicht als dessen vollständigen Ersatz. Die [Modellbeschreibung](https://developers.openai.com/api/docs/models/gpt-6.1-sol) empfiehlt ausdrücklich, Qualität und Kosten anhand der eigenen Aufgaben zu vergleichen.

![](/assets/images/gen/blog/gpt-61-sol-preise-benchmarks-und-vergleich-mit-astra/pricing.webp)

## GPT-6.1 Sol: API-Preise im Vergleich zu Astra

Für GPT-6.1 Sol nennt die [API-Dokumentation](https://developers.openai.com/api/docs/models/gpt-6.1-sol) folgende Standardpreise je Million Token:

- **Normale Eingaben:** 2,00 US-Dollar
- **Gelesene Cache-Token:** 0,10 US-Dollar
- **Cache-Schreibvorgänge:** 2,50 US-Dollar
- **Ausgaben:** 10,00 US-Dollar

Zum Vergleich: [GPT-6 Astra](https://developers.openai.com/api/docs/models/gpt-6-astra) kostet im Standardtarif 10 US-Dollar für eine Million normale Eingabe-Token und 50 US-Dollar für eine Million Ausgabe-Token.

Bei diesen beiden Tokenarten ist GPT-6.1 Sol damit **80 Prozent günstiger**. Das gilt für den Preis pro Token, nicht automatisch für die Gesamtkosten einer Aufgabe. Dafür ist zusätzlich entscheidend, wie viele Token und Bearbeitungsschritte das jeweilige Modell benötigt.

**Kostenhinweis:** Bei Prompts mit mehr als 272.000 Eingabe-Token steigen für den gesamten Request die Eingabe- und Cache-Preise auf das Doppelte, die Ausgabepreise auf das 1,5-Fache. Auch Verarbeitungsmodus und regionale Verarbeitung können die Abrechnung verändern.

Die genannten Preise beziehen sich auf die API, nicht auf den monatlichen Preis eines ChatGPT-Abos. Stand der Angaben ist der 1. Oktober 2026.

## Warum die Cache-Kosten genauer betrachtet werden sollten

Der niedrige Preis für gelesene Cache-Token ist vor allem dann interessant, wenn mehrere Anfragen denselben Anfang eines Prompts verwenden. Das können beispielsweise feste Arbeitsanweisungen, Werkzeugdefinitionen oder wiederholt benötigte Projektinformationen sein.

Laut [OpenAIs Dokumentation zu Prompt Caching](https://developers.openai.com/api/docs/guides/prompt-caching) lässt sich bereits verarbeiteter Kontext dadurch wiederverwenden. Ein bestehender Gesprächsverlauf allein garantiert allerdings noch keinen Cache-Treffer.

Wichtig ist die Unterscheidung zwischen Lesen und Schreiben: Wird ein Token in den Cache geschrieben, gilt dafür der Cache-Schreibpreis. Dieser wird nicht zusätzlich zum normalen Eingabepreis berechnet, sondern ersetzt ihn für die betreffenden Token.

Der beworbene Rabatt von 95 Prozent betrifft also **wiederverwendete Eingabe-Token**, nicht die gesamte Rechnung. Neue Inhalte, Cache-Schreibvorgänge und Ausgaben bleiben eigene Kostenbestandteile.

Für eine Anwendung würde ich deshalb nicht nur den günstigsten Preis aus der Modellübersicht übernehmen. Ich würde messen, welcher Anteil des tatsächlichen Datenverkehrs aus Cache-Lesezugriffen, Cache-Schreibvorgängen und neuen Eingaben besteht.

## GPT-6.1 Sol vs. GPT-6 Astra: Was zeigen die Benchmarks?

OpenAI veröffentlicht in der [Ankündigung zu GPT-6.1 Sol](https://openai.com/index/introducing-gpt-6-1-sol/) mehrere Vergleiche. Drei davon sind für Entwickler und automatisierte Arbeitsabläufe besonders relevant.

**Programmierung:** Bei DeepSWE 1.1 erreicht GPT-6.1 Sol laut OpenAI das Ergebnis von Astra bei ungefähr einem Fünftel der Aufgabenkosten. Gegenüber dem besten Ergebnis von GPT-6 Sol beträgt der Vorsprung 6,4 Prozentpunkte.

**Computerbedienung:** Im Offline-Datensatz von OSWorld 2.0 liegt GPT-6.1 Sol bei maximalem Reasoning-Aufwand sieben Prozentpunkte vor GPT-6 Sol und 2,1 Prozentpunkte hinter Astra. Die Aufgabenkosten liegen dabei ungefähr bei einem Siebtel der Astra-Kosten.

**Geschäftsabläufe:** In AutomationBench verbessert sich GPT-6.1 Sol bei mittlerem Reasoning-Aufwand um 4,8 Prozentpunkte gegenüber GPT-6 Sol.

Der Reasoning-Aufwand gehört zum Vergleich dazu. Mehr davon kann die Ergebnisse verbessern, benötigt aber zusätzliche Zeit und Token, wie auch die [Dokumentation zur Modellauswahl](https://learn.chatgpt.com/docs/models) erläutert.

**Einordnung:** Diese Leistungswerte stammen aus OpenAIs Evaluierungen, nicht aus einem eigenen Praxistest. Sie beziehen sich auf bestimmte Aufgaben und Einstellungen. Ein gutes Ergebnis in einem Coding-Benchmark ist keine Zusage, dass das Modell jede bestehende Codebasis gleich zuverlässig bearbeiten kann.

## Ist GPT-6.1 Sol in ChatGPT verfügbar?

Hier ist die Unterscheidung zwischen **ChatGPT Chat, ChatGPT Work und Codex** wichtig. GPT-6.1 Sol ist für Work und Codex vorgesehen, nicht für gewöhnliche ChatGPT-Unterhaltungen. Das stellt OpenAI im [Hilfebereich zu Work und Codex](https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex) ausdrücklich klar.

Die [ChatGPT-Release-Notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) beschreiben einen gestaffelten Rollout: zunächst für Pro, anschließend für Plus, Business, Enterprise und Edu. Ob das Modell bereits auswählbar ist, hängt deshalb auch vom konkreten Konto ab.

Bei Enterprise und Edu müssen Workspace-Verantwortliche den Zugriff freigeben. Taucht GPT-6.1 Sol nicht in der Auswahl auf, muss das also nicht an einer fehlerhaften Installation liegen.

Für Entwickler steht außerdem die OpenAI API zur Verfügung. Der Modellname lautet dort `gpt-6.1-sol`.

## GPT-6.1 Sol in Codex und über die API nutzen

Wer die Codex CLI bereits installiert hat und über den erforderlichen Modellzugriff verfügt, kann eine Sitzung im Projektverzeichnis so starten:

```bash
codex --model gpt-6.1-sol
```

Diesen Aufruf dokumentiert OpenAI auf der [Seite zur Modellauswahl in Codex](https://learn.chatgpt.com/docs/models). Der Parameter wählt das Modell aus, schaltet aber keine fehlenden Kontoberechtigungen frei.

Für eigene Integrationen sind zwei Angaben aus der [API-Modellübersicht](https://developers.openai.com/api/docs/models/gpt-6.1-sol) relevant: Das Kontextfenster umfasst 1.050.000 Token, die maximale Ausgabe 128.000 Token. Ein großes Kontextfenster bedeutet allerdings nicht, dass große Requests zum gleichen Tarif wie kurze Eingaben abgerechnet werden. Dafür gilt die zuvor beschriebene Preisschwelle.

Bei Werkzeugaufrufen ist außerdem die Schnittstelle wichtig: GPT-6.1 Sol unterstützt Tool Calling über die **Responses API**. Chat Completions werden ebenfalls unterstützt, dort allerdings ohne Tool Calling.

## Was ist mit GPT-6.1 Sol Ultrafast?

GPT-6.1 Sol Ultrafast ist laut der [Codex-Dokumentation](https://learn.chatgpt.com/docs/models) noch angekündigt. OpenAI nennt in der Modellankündigung eine bis zu achtfach schnellere Tokenausgabe gegenüber der Standardgeschwindigkeit in Codex.

Das ist keine Zusage, dass komplette Aufgaben achtmal schneller abgeschlossen werden. Wartezeiten auf Werkzeuge, Tests und weitere Bearbeitungsschritte gehören ebenfalls zur Laufzeit.

## Wann lohnt sich GPT-6.1 Sol statt Astra?

Meine Einordnung: GPT-6.1 Sol ist vor allem ein Kandidat für Aufgaben, die häufig anfallen und deren Ergebnisse sich nachvollziehbar prüfen lassen. Für die anspruchsvollsten Arbeiten führt OpenAI [Astra weiterhin als leistungsfähigstes Modell](https://developers.openai.com/api/docs/models/gpt-6-astra).

Ich würde beide Modelle mit einer kleinen Auswahl echter Aufgaben vergleichen: dieselbe Fehlerbeschreibung, dieselben Ausgangsdateien und dieselben Abnahmekriterien. Anschließend zählen nicht nur Tokenkosten und Laufzeit, sondern auch fehlgeschlagene Versuche und notwendige Nacharbeiten.

Ein günstigerer Durchlauf hilft wenig, wenn er wiederholt werden muss. Umgekehrt braucht nicht jede klar abgegrenzte Aufgabe das teuerste Modell. Entscheidend ist, welches Modell sie mit dem geringsten Gesamtaufwand zuverlässig erledigt.
