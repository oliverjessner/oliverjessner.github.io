---
layout: post
title: 'Google Frozen v2: Neuer KI-Chip soll Gemini effizienter machen'
date: 2026-07-21 10:02:41 +0200
last_modified_at: 2026-07-23 20:11:37 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - cloud
    - software-engineering
    - google
description: 'Google entwickelt laut Bericht den KI-Chip Frozen v2. Er soll Gemini ab 2028 mit deutlich mehr Tokens pro Watt ausführen'
thumbnail: '/assets/images/gen/blog/google-frozen-v2-neuer-ki-chip-soll-gemini-effizienter-machen/header_thumbnail.webp'
image: '/assets/images/gen/blog/google-frozen-v2-neuer-ki-chip-soll-gemini-effizienter-machen/header.webp'
image_width: 1280
image_height: 854
faq:
    - question: 'Was ist Google Frozen v2?'
      answer: 'Frozen v2 ist der interne Name eines angeblich geplanten Google-Chips, der Teile von Gemini direkt in Hardware abbilden und die KI-Ausführung effizienter machen soll.'
    - question: 'Wie viel effizienter soll Frozen v2 sein?'
      answer: 'Laut dem Bericht könnte der Chip sechs- bis zehnmal mehr Tokens pro Energieeinheit verarbeiten als Googles aktuelle KI-Chips. Unabhängige Benchmarks gibt es noch nicht.'
    - question: 'Ersetzt Frozen v2 Googles TPUs?'
      answer: 'Nein. Frozen v2 soll laut Reuters als zusätzliche Chipfamilie neben den Tensor Processing Units entstehen und diese nicht vollständig ersetzen.'
socialmedia:
    - 'Google arbeitet laut einem Bericht an "Frozen v2". Der neue KI-Chip soll Gemini ab 2028 mit sechs- bis zehnmal mehr Tokens pro Watt ausführen. Was hinter dem ungewöhnlich spezialisierten Ansatz steckt.'
    - '"Frozen v2" soll kein Nachfolger von Googles TPUs werden. Stattdessen könnte der Chip Teile von Gemini direkt in Hardware abbilden. Das verspricht mehr Effizienz, reduziert aber auch die Flexibilität.'
    - 'Mehr Leistung ist bei KI nicht nur eine Frage schnellerer Chips. Google will mit "Frozen v2" offenbar Modell und Hardware enger verzahnen. Der Ansatz könnte Gemini günstiger betreiben, ist bisher aber nur ein unbestätigtes Projekt.'
---

Google arbeitet laut einem Bericht an "Frozen v2", einem spezialisierten KI-Chip für Gemini. Das Projekt verspricht deutlich mehr Tokens pro Watt, ist aber weder bestätigt noch serienreif.

## Google Frozen v2 soll Gemini ab 2028 effizienter ausführen

Google entwickelt offenbar einen neuen Serverchip, der speziell auf die Ausführung seiner Gemini-Modelle zugeschnitten ist. Das Projekt trägt intern den Namen "Frozen v2" und könnte frühestens 2028 eingesetzt werden. Zuerst berichtete The Information darüber. [Reuters](https://www.reuters.com/business/google-plans-new-chip-run-gemini-models-more-efficiently-information-reports-2026-07-20/) und [TechCrunch](https://techcrunch.com/2026/07/20/google-is-working-on-a-new-ai-chip-designed-to-make-gemini-more-efficient/) griffen den Bericht anschließend auf.

Google hat das Projekt bisher nicht offiziell bestätigt. Gegenüber TechCrunch erklärte das Unternehmen lediglich, dass seine Teams laufend neue Ansätze für mehr Leistung und Effizienz erforschen. Nicht jedes dieser Projekte erreiche später die Produktion.

Damit ist Frozen v2 noch kein angekündigtes Produkt. Der Bericht zeigt aber, wie eng Google künftig Modelle, Software und Hardware verzahnen könnte.

## Was ist Google Frozen v2?

Frozen v2 soll ein eigener KI-Beschleuniger für die Inference von Gemini werden. Inference bezeichnet den Teil, bei dem ein bereits trainiertes Modell Anfragen verarbeitet und neue Inhalte erzeugt. Genau dieser laufende Betrieb verursacht bei Diensten mit vielen Nutzern einen großen Teil der Rechenkosten.

Der neue Chip soll laut Reuters nicht die bekannten Tensor Processing Units ersetzen. Google plant offenbar eine zusätzliche Chipfamilie, die stärker auf konkrete Gemini-Versionen optimiert ist.

Google verfolgt damit mehrere Ansätze:

- TPU 8t ist für das Training großer Modelle ausgelegt und verbindet hohe Rechenleistung mit der schnellen Kommunikation zwischen vielen Chips.
- TPU 8i konzentriert sich auf Inference, niedrige Latenz und eine hohe Speicherbandbreite.
- Frozen v2 soll Teile von Gemini enger in der Hardware abbilden, wurde bisher aber nicht offiziell angekündigt.

Google stellte seine achte TPU-Generation mit [TPU 8t und TPU 8i](https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/eighth-generation-tpu-agentic-era/) im Jahr 2026 vor. Beide Chips bleiben grundsätzlich für unterschiedliche Modelle und Arbeitslasten programmierbar. Frozen v2 könnte deutlich enger an ein bestimmtes Modell gekoppelt sein.

## Warum Modellteile direkt im Chip landen könnten

Bei herkömmlichen KI-Beschleunigern liegen Modellinformationen im Speicher. Der Chip lädt Daten, führt programmierbare Operationen aus und schreibt Ergebnisse zurück. Ein erheblicher Teil des Energieverbrauchs entsteht dabei nicht nur durch Berechnungen, sondern auch durch Datenbewegungen zwischen Speicher, Prozessoren und weiteren Systemkomponenten.

Frozen v2 könnte einen Teil dieser Arbeit vermeiden. Laut Reuters prüft Google, wie viele Modellinformationen direkt in der Hardware fest verankert werden können. Der genaue technische Aufbau ist noch nicht bekannt.

Eine solche Spezialisierung kann mehrere Vorteile haben:

- weniger Daten müssen zwischen Speicher und Recheneinheiten bewegt werden
- häufig benötigte Operationen lassen sich direkter ausführen
- die Hardware kann genauer auf die Struktur eines Modells abgestimmt werden
- Durchsatz und Energieeffizienz können steigen

Der Preis dafür ist geringere Flexibilität. Ändert Google die Architektur oder zentrale Bestandteile von Gemini, passt der Chip möglicherweise nicht mehr optimal zum neuen Modell. Die Entwicklung von Hardware dauert zudem deutlich länger als die Anpassung von Software.

Der Ansatz ist deshalb ein anspruchsvolles Beispiel für [Software Engineering](https://oliverjessner.at/category/software-engineering/), bei dem Modellarchitektur, Compiler, Speicher, Netzwerk und Silizium gemeinsam geplant werden müssen.

## Sechs- bis zehnmal mehr Tokens pro Watt

Frozen v2 könnte laut dem ursprünglichen Bericht sechs- bis zehnmal effizienter als Googles aktuelle KI-Chips arbeiten. Gemessen werden soll dies anhand der erzeugten Tokens pro Energieeinheit.

Tokens sind kleine Textbestandteile, aus denen Sprachmodelle Ein- und Ausgaben zusammensetzen. Eine höhere Zahl von Tokens pro Watt bedeutet, dass ein System mit derselben elektrischen Leistung mehr Anfragen oder längere Antworten verarbeiten kann.

Die Angabe bedeutet jedoch nicht automatisch, dass Gemini sechs- bis zehnmal schneller antwortet. Der Messwert beschreibt vor allem den Durchsatz im Verhältnis zum Energieverbrauch. Die wahrgenommene Geschwindigkeit hängt zusätzlich von Auslastung, Speicherzugriffen, Netzwerk, Modellgröße und Software ab.

Unabhängige Benchmarks oder technische Datenblätter gibt es bisher nicht. Auch ist unklar, mit welcher Google-Hardware Frozen v2 konkret verglichen wurde.

## Warum Google noch einen eigenen KI-Chip braucht

Google entwickelt seit mehr als zehn Jahren eigene TPUs. Trotzdem steigt der Bedarf an Rechenleistung schneller, als neue Kapazitäten aufgebaut werden können. Alphabet [sprach im April 2026](https://abc.xyz/investor/events/event-details/2026/2026-Q1-Earnings-Call-2026-nW8kCrBAKS/default.aspx) von einer außergewöhnlich hohen internen und externen Nachfrage nach KI-Rechenleistung.

Das Unternehmen plant für 2026 Investitionen von 180 bis 190 Milliarden US-Dollar. Ein großer Teil fließt in technische Infrastruktur, Rechenzentren und [Cloud](https://oliverjessner.at/category/cloud/)-Kapazitäten. Alphabet rechnet zugleich mit steigenden Kosten für Energie und den Betrieb dieser Infrastruktur.

Ein effizienterer Chip kann diese Engpässe nicht vollständig lösen. Er könnte Google aber ermöglichen, mit derselben Stromversorgung und derselben Zahl an Servern mehr Gemini-Anfragen zu verarbeiten.

Die wirtschaftliche Bedeutung ist erheblich. Bei einem Dienst mit sehr vielen täglichen Anfragen summieren sich selbst kleine Einsparungen pro Token. Ein deutlich spezialisierterer Chip könnte deshalb Betriebskosten senken und vorhandene Rechenzentren besser auslasten.

## Frozen v2 ist nicht einfach ein Nvidia-Ersatz

Eigene Chips verringern Googles Abhängigkeit von externen Anbietern. Trotzdem wäre es zu einfach, Frozen v2 nur als Angriff auf Nvidia zu verstehen.

Nvidia-GPUs sind flexibel und können sehr unterschiedliche Modelle, Frameworks und Aufgaben ausführen. Genau diese Vielseitigkeit ist für Forschung, Training und wechselnde Arbeitslasten wichtig. Ein stark auf Gemini zugeschnittener Chip würde dagegen einen kleineren Aufgabenbereich besonders effizient bearbeiten.

Google könnte deshalb weiterhin mehrere Hardwaretypen parallel einsetzen:

- GPUs für flexible oder neue Arbeitslasten
- TPUs für Training und allgemeine KI-Inference
- Frozen-Chips für besonders häufig ausgeführte Gemini-Versionen

Frozen v2 wäre damit eher eine Ergänzung für sehr große, wiederkehrende [KI](https://oliverjessner.at/category/ki/)-Arbeitslasten als ein universeller Ersatz für bestehende Beschleuniger.

## Was Nutzer von Frozen v2 bemerken könnten

Für Nutzer wäre der Chip selbst unsichtbar. Mögliche Verbesserungen würden sich indirekt zeigen. Gemini könnte bei hoher Nachfrage stabiler verfügbar sein, Antworten könnten günstiger erzeugt werden und Google könnte leistungsfähigere Modelle häufiger einsetzen.

Ob der Dienst dadurch tatsächlich schneller oder günstiger wird, ist offen. Effizienzgewinne können auch dafür genutzt werden, längere Kontexte, komplexere Berechnungen oder mehr parallele Anfragen zu ermöglichen.

Für Google-Cloud-Kunden ist ebenfalls unklar, ob Frozen v2 später als eigenes Produkt angeboten würde. Der bisherige Bericht beschreibt vor allem einen Chip für Googles interne Gemini-Infrastruktur.

## Mehr Effizienz bedeutet nicht automatisch weniger Stromverbrauch

Google arbeitet bereits an effizienteren Modellen, Quantisierung, spekulativem Decoding und speziell entwickelter Hardware. Das Unternehmen [bezeichnete seine Ironwood-TPU](https://cloud.google.com/blog/products/compute/inside-the-ironwood-tpu-codesigned-ai-stack) als fast 30-mal energieeffizienter als die erste öffentlich verfügbare Cloud-TPU von 2018.

Solche Vergleiche beziehen sich auf die erledigte Rechenarbeit pro Energieeinheit. Der gesamte Stromverbrauch kann trotzdem steigen, wenn gleichzeitig mehr Nutzer, größere Modelle und aufwendigere KI-Agenten hinzukommen.

Frozen v2 könnte den Energiebedarf pro erzeugtem Token deutlich reduzieren. Ob dadurch auch der absolute Stromverbrauch von Googles KI-Infrastruktur sinkt, lässt sich daraus nicht ableiten.

## Die größten offenen Fragen

Bis zu einem möglichen Start im Jahr 2028 kann sich das Projekt deutlich verändern. Besonders offen sind derzeit folgende Punkte:

- Welche Teile von Gemini werden tatsächlich in Hardware abgebildet?
- Für welche Gemini-Version wird der Chip entwickelt?
- Wie flexibel kann Frozen v2 auf Modellupdates reagieren?
- Welche Fertigungstechnik und welche Speicherarchitektur kommen zum Einsatz?
- Bezieht sich der Effizienzvergleich auf TPU 8i, Ironwood oder eine andere Plattform?
- Wird Google den Chip nur intern nutzen oder auch Cloud-Kunden anbieten?

Entscheidend werden reale Messwerte sein. Dazu gehören nicht nur Tokens pro Watt, sondern auch Antwortlatenz, Kosten pro Anfrage, Auslastung, Speicherbedarf und die Qualität der erzeugten Ergebnisse.

## Fazit: Frozen v2 wäre ein ungewöhnlich spezialisierter Gemini-Chip

Frozen v2 zeigt, wie weit die Spezialisierung von KI-Hardware gehen könnte. Google würde nicht nur einen weiteren allgemeinen Beschleuniger entwickeln, sondern Teile seines eigenen Modells enger mit dem Chip verbinden.

Der versprochene Effizienzgewinn von sechs- bis zehnmal mehr Tokens pro Energieeinheit wäre erheblich. Bislang handelt es sich jedoch um einen unbestätigten Bericht über ein frühes Projekt. Technische Spezifikationen, unabhängige Benchmarks und eine verbindliche Markteinführung fehlen.

Sollte Frozen v2 tatsächlich 2028 erscheinen, wäre der Chip vor allem ein Beleg dafür, dass der Wettbewerb um leistungsfähige KI zunehmend über das Zusammenspiel von Modell, Software, Rechenzentrum und speziell entwickelter Hardware entschieden wird.
