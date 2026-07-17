---
layout: post
title: 'Inkling: Mira Muratis Thinking Machines veröffentlicht erstes KI-Modell'
date: 2026-07-17 15:03:44 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - openai
    - startups
description: 'Thinking Machines veröffentlicht Inkling: ein Open-Weights-KI-Modell mit 975 Milliarden Parametern, Multimodalität und Fokus auf Anpassbarkeit'
thumbnail: '/assets/images/gen/blog/inkling-mira-muratis-thinking-machines-veroeffentlicht-erstes-ki-modell/header_thumbnail.webp'
image: '/assets/images/gen/blog/inkling-mira-muratis-thinking-machines-veroeffentlicht-erstes-ki-modell/header.webp'
image_width: 1280
image_height: 721
faq:
    - question: 'Was ist Inkling von Thinking Machines?'
      answer: 'Inkling ist ein multimodales KI-Modell mit offenen Gewichten. Es verarbeitet Text, Bilder und Audio und wurde für anpassbare Anwendungen, Coding-Assistenten und Agentensysteme entwickelt.'
    - question: 'Kann Inkling lokal ausgeführt werden?'
      answer: 'Ja, allerdings benötigt das Modell Server-Hardware. Der BF16-Checkpoint verlangt mindestens 2 TB gemeinsamen Grafikspeicher. Die quantisierte NVFP4-Version benötigt mindestens 600 GB VRAM.'
    - question: 'Ist Inkling vollständig Open Source?'
      answer: 'Nein. Die Modellgewichte stehen unter der Apache-2.0-Lizenz bereit. Trainingsdaten, Trainingscode und der vollständige Herstellungsprozess sind jedoch nicht vollständig öffentlich.'
socialmedia:
    - 'Mira Muratis Thinking Machines Lab veröffentlicht Inkling. Das Open-Weights-KI-Modell hat 975 Milliarden Parameter, verarbeitet Text, Bilder und Audio und lässt sich über Tinker anpassen. Doch lokal braucht es weiterhin Server-Hardware.'
    - 'Inkling ist kein neues ChatGPT, sondern ein anpassbares Fundament für Entwickler. 41 Milliarden Parameter sind pro Token aktiv, die Gewichte stehen unter Apache 2.0 bereit. Der Haken: Selbst die quantisierte Version benötigt rund 600 GB VRAM.'
    - 'Open Weights ist nicht automatisch Open Source. Bei Inkling sind die Modellgewichte verfügbar, während Trainingsdaten und der vollständige Trainingsprozess nicht offenliegen. Trotzdem entsteht eine interessante Alternative zu geschlossenen KI-APIs.'
---

Mira Muratis Thinking Machines Lab veröffentlicht mit Inkling sein erstes eigenes KI-Modell. Die offenen Gewichte versprechen mehr Kontrolle, verlangen beim lokalen Betrieb aber enorme Hardware.

## Was ist Inkling von Thinking Machines?

Thinking Machines Lab hat am 15. Juli 2026 sein erstes selbst entwickeltes, allgemein einsetzbares KI-Modell veröffentlicht. Inkling soll vor allem als anpassbare Grundlage für Entwickler, Unternehmen und Forschungsteams dienen.

Das Unternehmen wurde von Mira Murati gegründet, der früheren Technikchefin von [OpenAI](https://oliverjessner.at/category/openai/). Mit Thinking Machines verfolgt sie einen anderen Ansatz als viele Anbieter geschlossener KI-Dienste: Nutzer sollen Modelle nicht nur über eine vorgegebene API verwenden, sondern sie stärker an eigene Anforderungen anpassen können.

Inkling ist deshalb ein Open-Weights-Modell. Die Gewichte können über [Hugging Face](https://huggingface.co/thinkingmachines/Inkling) heruntergeladen und unter der Apache-2.0-Lizenz verwendet werden.

Das Modell ist allerdings nicht als direkter Ersatz für ChatGPT, Claude oder Gemini positioniert. Thinking Machines beschreibt Inkling selbst als breit aufgestelltes Fundament für spezialisierte Anwendungen.

## 975 Milliarden Parameter, aber nur 41 Milliarden aktiv

Inkling besitzt insgesamt 975 Milliarden Parameter. Diese Zahl klingt zunächst nach einem entsprechend hohen Rechenbedarf. Tatsächlich arbeitet das Modell jedoch mit einer Mixture-of-Experts-Architektur.

Dabei wird nicht für jede Eingabe das gesamte Modell aktiviert. Pro verarbeitetem Token verwendet Inkling nach Angaben des Unternehmens rund 41 Milliarden aktive Parameter.

Technisch besteht das Modell aus einem Decoder-Transformer mit 66 Schichten. Jeder Token wird an sechs von insgesamt 256 spezialisierten Experten weitergeleitet. Zusätzlich sind zwei gemeinsam genutzte Experten dauerhaft aktiv.

Diese Architektur soll zwei Ziele miteinander verbinden:

- eine hohe Gesamtkapazität
- einen niedrigeren Rechenaufwand pro Anfrage

Das macht Inkling nicht klein. Im Vergleich zu einem vollständig dichten Modell mit 975 Milliarden gleichzeitig aktiven Parametern arbeitet es jedoch deutlich effizienter.

## Eine Million Token als maximales Kontextfenster

Inkling unterstützt laut der [offiziellen Ankündigung](https://thinkingmachines.ai/news/introducing-inkling/) ein Kontextfenster von bis zu einer Million Token.

Ein solches Kontextfenster kann theoretisch große Codebasen, umfangreiche Dokumentationen oder lange Gesprächsverläufe aufnehmen. In der Praxis hängt die tatsächlich nutzbare Länge jedoch vom jeweiligen Anbieter, der Hardware und den Kosten ab.

Über Thinking Machines eigene Fine-Tuning-Plattform Tinker stehen zum Start Kontextlängen von 64.000 und 256.000 Token zur Verfügung. Die maximale Modellkapazität von einer Million Token ist damit nicht automatisch in jeder angebotenen Umgebung verfügbar.

Für Entwickler ist diese Unterscheidung wichtig. Eine hohe theoretische Kontextgrenze bedeutet nicht, dass jede API oder jeder Hosting-Anbieter diese vollständig freischaltet.

## Inkling verarbeitet Text, Bilder und Audio

Inkling ist ein multimodales Modell. Laut Model Card akzeptiert es folgende Eingaben:

- Text
- Bilder
- Audiodateien

Die Ausgabe erfolgt derzeit als Text. Bilder sollen idealerweise zwischen 40 und 4.096 Pixel groß sein. Audiodateien werden im WAV-Format mit 16 kHz erwartet und sollten für eine optimale Verarbeitung nicht länger als 20 Minuten sein.

Das Modell wurde mit insgesamt 45 Billionen Token trainiert. Die Trainingsdaten umfassten Text, Bilder, Audio und Video. Sie stammen laut Thinking Machines aus öffentlich verfügbaren Quellen, von Drittanbietern sowie aus synthetisch erzeugten oder erweiterten Datensätzen.

Welche konkreten Webseiten, Archive oder Datensammlungen verwendet wurden, legt das Unternehmen nicht vollständig offen.

## Open Weights bedeutet nicht vollständig Open Source

Thinking Machines und mehrere Medien beschreiben Inkling als offenes Modell. Technisch genauer ist jedoch die Bezeichnung Open Weights.

Die trainierten Modellgewichte können heruntergeladen, selbst betrieben und verändert werden. Die Apache-2.0-Lizenz erlaubt zudem eine weitreichende Nutzung in eigenen Produkten.

Nicht vollständig verfügbar sind dagegen:

- die ursprünglichen Trainingsdaten
- der komplette Trainingscode
- sämtliche Filter- und Aufbereitungsschritte
- eine vollständig reproduzierbare Trainingsumgebung

Inkling erfüllt damit nicht jede Definition von Open Source, bietet Entwicklern aber erheblich mehr Kontrolle als ein Modell, das ausschließlich über eine proprietäre Cloud-API erreichbar ist.

Diese Unterscheidung spielt in der aktuellen [KI](https://oliverjessner.at/category/ki/)-Landschaft eine wichtige Rolle. Ein Modell kann offene Gewichte besitzen, ohne dass seine gesamte Entstehung transparent oder reproduzierbar ist.

## Lokaler Betrieb benötigt Server-Hardware

Die offenen Gewichte bedeuten nicht, dass Inkling auf einem gewöhnlichen Desktop-PC oder einem gut ausgestatteten Mac läuft.

Der unkomprimierte BF16-Checkpoint benötigt laut [Model Card](https://thinkingmachines.ai/model-card/inkling/) mindestens 2 TB gemeinsamen Grafikspeicher. Thinking Machines nennt dafür beispielsweise folgende Konfigurationen:

- acht Nvidia-B300-GPUs
- 16 Nvidia-H200-GPUs

Die quantisierte NVFP4-Version reduziert den notwendigen Grafikspeicher auf mindestens 600 GB. Auch dafür werden mehrere aktuelle Rechenzentrums-GPUs benötigt.

Zum Vergleich: Selbst ein Mac Studio mit sehr großem gemeinsamem Arbeitsspeicher liegt weit unter diesen Anforderungen.

Inkling ist deshalb zwar grundsätzlich selbst betreibbar, aber nicht lokal im üblichen Sinn. Realistisch ist der eigene Betrieb vor allem für Unternehmen, Forschungseinrichtungen und spezialisierte Hosting-Anbieter.

Für kleinere Teams dürfte der Zugriff über einen Inference-Anbieter oder über Tinker wirtschaftlicher sein.

## Anpassung über Tinker

Thinking Machines hatte bereits vor Inkling die Plattform Tinker veröffentlicht. Damit können Entwickler Modelle durch Fine-Tuning an eigene Daten und Aufgaben anpassen, ohne eine vollständige Trainingsinfrastruktur aufbauen zu müssen.

Inkling ist von Beginn an in Tinker verfügbar. Das passt zur Positionierung des Modells: Thinking Machines will nicht ausschließlich das leistungsstärkste allgemeine Modell anbieten, sondern ein möglichst flexibles Fundament für spezialisierte Systeme.

Mögliche Einsatzgebiete sind laut Unternehmen:

- Coding-Assistenten
- Agenten mit Werkzeugzugriff
- Chatbots
- Retrieval-Augmented Generation
- multimodale Anwendungen
- unternehmensspezifische Modelle

In einer Demonstration ließ Thinking Machines Inkling sogar ein Fine-Tuning für sich selbst vorbereiten. Das Modell sollte lernen, Antworten ohne den Buchstaben "e" zu formulieren. Inkling erzeugte dafür Trainingsdaten, schrieb den Trainingsauftrag und wertete das angepasste Modell anschließend aus.

Das Beispiel ist bewusst verspielt, zeigt aber den vorgesehenen Arbeitsablauf. Inkling soll nicht nur Antworten liefern, sondern als Basis für veränderte Modellvarianten dienen.

## Benchmarks zeigen ein gemischtes Bild

Thinking Machines veröffentlicht umfangreiche Benchmark-Ergebnisse für Inkling. Dabei tritt das Modell gegen offene und geschlossene Systeme an.

Bei SWE-bench Verified erreicht Inkling nach Angaben des Unternehmens 77,6 Prozent. Der Benchmark untersucht, ob Modelle reale Probleme in Softwareprojekten lösen können.

Beim wissenschaftlichen Reasoning-Benchmark GPQA Diamond kommt Inkling auf 87,2 Prozent. Im textbasierten Humanity's Last Exam erreicht es dagegen 29,7 Prozent und liegt damit hinter mehreren geschlossenen Spitzenmodellen.

Die Ergebnisse zeigen ein konsistentes Muster: Inkling kann in vielen Bereichen mithalten, führt die Benchmark-Tabellen aber nicht durchgehend an.

Thinking Machines formuliert das selbst relativ offen. Das Unternehmen bezeichnet Inkling ausdrücklich nicht als das insgesamt stärkste verfügbare Modell.

Die veröffentlichten Werte stammen außerdem überwiegend vom Hersteller. Für eine belastbare Bewertung sind unabhängige Tests, reproduzierbare Messungen und Erfahrungen aus realen Projekten wichtiger als einzelne Tabellenwerte.

## Inkling-Small soll geringere Kosten ermöglichen

Neben dem großen Modell hat Thinking Machines eine Vorschau auf Inkling-Small angekündigt.

Diese Variante besitzt insgesamt 276 Milliarden Parameter, von denen zwölf Milliarden aktiv sind. Das Unternehmen verspricht geringere Latenzen und niedrigere Betriebskosten.

Interessant ist, dass Inkling-Small laut den internen Tests bei einigen Aufgaben nahe an das größere Modell herankommt oder es sogar übertrifft. Thinking Machines führt das auf Verbesserungen an den Trainingsdaten und am Trainingsverfahren zurück.

Für praktische Anwendungen könnte die kleinere Variante langfristig relevanter werden. Das große Inkling-Modell zeigt die technische Leistungsfähigkeit des Unternehmens. Inkling-Small könnte dagegen für Hosting-Anbieter und Unternehmen einfacher wirtschaftlich einsetzbar sein.

Konkrete Anforderungen für einen Betrieb auf normaler Consumer-Hardware nennt das Unternehmen bislang nicht.

## Warum Inkling für Entwickler interessant ist

Inkling erscheint in einem Markt, in dem viele der leistungsfähigsten Modelle nur als geschlossene Dienste verfügbar sind. Entwickler können diese Modelle über APIs verwenden, aber weder die Gewichte herunterladen noch den Betrieb vollständig kontrollieren.

Bei offenen Modellen stammen viele der stärksten Alternativen inzwischen von chinesischen Unternehmen wie Alibaba, DeepSeek, Moonshot AI oder Zhipu AI. Reuters sieht Inkling deshalb auch als Versuch, eine weitere westliche Alternative im Open-Weights-Bereich aufzubauen.

Für [Startups](https://oliverjessner.at/category/startups/) und Unternehmen können offene Gewichte mehrere Vorteile bieten:

- eigene Hosting- und Datenschutzkonzepte
- Anpassung an interne Daten
- geringere Abhängigkeit von einem API-Anbieter
- kontrollierbare Modellversionen
- Integration in bestehende Infrastruktur

Diese Vorteile entstehen jedoch nicht automatisch. Der Betrieb großer Modelle erfordert spezialisierte Hardware, Erfahrung mit Inference-Systemen und eigene Sicherheitsmaßnahmen.

Thinking Machines empfiehlt selbst zusätzliche Filter, Überwachung und anwendungsspezifische Schutzmechanismen. Die eingebauten Sicherheitsregeln eines offenen Modells sollten nicht als alleinige Absicherung verwendet werden.

## Kein neuer ChatGPT-Konkurrent für Endnutzer

Die Veröffentlichung von Inkling lässt sich leicht als direkter Angriff auf ChatGPT oder Claude darstellen. Für Nutzer ist der Unterschied jedoch größer.

ChatGPT ist ein fertiges Produkt mit Benutzeroberfläche, Speicherfunktionen, Werkzeugen und verschiedenen integrierten Modellen. Inkling ist dagegen zunächst ein technisches Basismodell.

Seine Zielgruppe besteht vor allem aus Entwicklern, Forschungsteams und Unternehmen, die ein Modell selbst anpassen oder in eigene Produkte integrieren möchten.

Der eigentliche Wettbewerb findet deshalb weniger bei gewöhnlichen Chatbots statt. Thinking Machines konkurriert um die Frage, welche technische Grundlage Unternehmen für ihre eigenen KI-Systeme verwenden.

## Fazit

Inkling ist kein Modell, das die etablierten Spitzenmodelle in jeder Disziplin übertrifft. Thinking Machines verspricht das auch nicht.

Interessant ist vielmehr die Kombination aus offenen Gewichten, multimodalen Eingaben, einer Mixture-of-Experts-Architektur und direkter Anbindung an eine Fine-Tuning-Plattform.

Die Apache-2.0-Lizenz gibt Entwicklern vergleichsweise viel Freiheit. Gleichzeitig bleiben der lokale Betrieb und die notwendige Infrastruktur teuer. Ein Modell mit mindestens 600 GB Grafikspeicher ist trotz offener Gewichte kein Werkzeug für den gewöhnlichen Desktop.

Inkling zeigt damit sowohl das Potenzial als auch die Grenzen offener KI-Modelle. Entwickler erhalten mehr Kontrolle über das Modell, brauchen dafür aber weiterhin erhebliche technische und finanzielle Ressourcen.
