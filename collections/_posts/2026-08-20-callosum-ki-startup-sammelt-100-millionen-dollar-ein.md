---
layout: post
title: 'Callosum: KI-Startup sammelt 100 Millionen Dollar ein'
date: 2026-08-20 10:07:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - startups
    - cloud
description: 'Callosum erhält 100 Millionen Dollar. Das KI-Startup will AI-Aufgaben auf passende Modelle und Chips verteilen und damit Inferenzkosten senken'
thumbnail: '/assets/images/gen/blog/callosum-ki-startup-sammelt-100-millionen-dollar-ein/header_thumbnail.webp'
image: '/assets/images/gen/blog/callosum-ki-startup-sammelt-100-millionen-dollar-ein/header.webp'
image_width: 1280
image_height: 721
faq:
    - question: 'Was ist Callosum?'
      answer: 'Callosum ist ein britisches KI-Startup, das unterschiedliche KI-Modelle und Chip-Architekturen kombinieren und Aufgaben möglichst effizient auf diese verteilen will.'
    - question: 'Wie viel Geld hat Callosum eingesammelt?'
      answer: 'Callosum hat im August 2026 eine Seed-Finanzierungsrunde über 100 Millionen US-Dollar abgeschlossen. Zuvor hatte das Unternehmen 10,25 Millionen US-Dollar eingesammelt.'
    - question: 'Wie will Callosum KI günstiger machen?'
      answer: 'Callosum will für einzelne Aufgaben geeignete Kombinationen aus KI-Modellen und Hardware auswählen, anstatt einen kompletten Workflow mit demselben Modell und derselben Chip-Architektur auszuführen.'
socialmedia:
    - '100 Millionen Dollar für ein KI-Startup, das nicht das nächste große Modell bauen will: Callosum versucht stattdessen, AI-Aufgaben automatisch auf unterschiedliche Modelle und Chips zu verteilen.'
    - 'Muss wirklich jede KI-Aufgabe auf dem größten verfügbaren Modell laufen? Callosum sagt nein und sammelt für seinen Ansatz 100 Millionen Dollar ein.'
    - 'Callosum will KI günstiger machen, indem nicht ein Modell alles erledigt. Stattdessen sollen unterschiedliche Modelle und Chips je nach Aufgabe kombiniert werden. Dafür gibt es jetzt 100 Millionen Dollar.'
---

Das britische KI-Startup Callosum sammelt 100 Millionen Dollar ein. Seine Software soll AI-Aufgaben auf passende Modelle und Chips verteilen und dadurch Kosten senken.

## Callosum erhält 100 Millionen Dollar

Das britische KI-Startup Callosum hat eine Finanzierungsrunde über 100 Millionen US-Dollar abgeschlossen. Wie [Bloomberg](https://www.bloomberg.com/news/articles/2026-08-20/ai-startup-callosum-raises-100-million-to-make-ai-tasks-cheaper) berichtet, will das Unternehmen damit an einem Problem arbeiten, das mit der zunehmenden Nutzung von KI immer wichtiger wird: den Kosten für die eigentliche Ausführung von KI-Modellen.

Die Seed-Runde wird von Atomico angeführt. Beteiligt sind außerdem Plural, DCVC und der britische Sovereign AI Fund. Für Callosum ist das ein deutlicher Sprung. Im Februar 2026 hatte das Unternehmen noch eine Pre-Seed-Finanzierung über 10,25 Millionen Dollar bekannt gegeben.

Callosum gehört damit zu einer Gruppe von [KI](https://oliverjessner.at/category/ki/)-Unternehmen, die nicht primär versuchen, ein noch größeres Sprachmodell zu entwickeln. Stattdessen arbeitet das Startup an der Infrastruktur zwischen Modellen, Software und Hardware.

## Was macht Callosum?

Die Grundidee von Callosum ist vergleichsweise einfach: Nicht jede KI-Aufgabe benötigt dasselbe Modell und nicht jedes Modell läuft auf jeder Hardware gleich effizient.

In vielen heutigen KI-Anwendungen wird trotzdem ein großer Teil eines Workflows über dieselben Modelle oder zumindest über eine relativ homogene Infrastruktur abgewickelt. Callosum will diese Struktur aufbrechen.

Das Unternehmen spricht selbst von "Heterogeneous Intelligence". Gemeint ist damit ein System, das unterschiedliche KI-Modelle und unterschiedliche Chip-Architekturen miteinander kombiniert.

Eine Aufgabe kann dabei in mehrere Teilaufgaben zerlegt werden. Anschließend soll entschieden werden, welche Kombination aus Modell und Hardware für den jeweiligen Arbeitsschritt geeignet ist.

Dabei geht es nicht ausschließlich um klassische GPUs. Callosum experimentiert unter anderem mit verschiedenen KI-Beschleunigern und spezialisierten Architekturen. Das Unternehmen hat beispielsweise bereits Systeme auf Basis von AWS Trainium, Cerebras und SambaNova untersucht.

## Warum unterschiedliche Modelle KI günstiger machen können

Der Ansatz ist besonders für sogenannte Inferenz relevant. Damit ist die Phase gemeint, in der ein bereits trainiertes KI-Modell tatsächlich verwendet wird, also beispielsweise Texte erzeugt, Dokumente analysiert oder einen Agenten steuert.

Ein sehr leistungsfähiges Modell kann eine einfache Aufgabe zwar lösen, wirtschaftlich sinnvoll ist das deshalb noch nicht automatisch.

Für einen einzelnen API-Aufruf spielt der Unterschied häufig kaum eine Rolle. Bei Millionen von Modellaufrufen können kleine Unterschiede bei Kosten und Laufzeit jedoch erheblich werden.

Genau an dieser Stelle setzt Callosum an. Statt einen gesamten Workflow auf einem einzigen großen Modell auszuführen, sollen unterschiedliche Modelle dort eingesetzt werden, wo ihre jeweiligen Eigenschaften sinnvoll sind.

Das Prinzip erinnert ein wenig an klassische Softwarearchitektur. Auch dort wird normalerweise nicht jede Aufgabe mit derselben Technologie gelöst. Datenbanken, Caches, Suchsysteme und Hintergrundprozesse werden entsprechend ihrer Aufgabe ausgewählt.

Bei KI-Systemen könnte sich eine ähnliche Spezialisierung entwickeln.

## Eigene Benchmarks zeigen deutliche Unterschiede

Callosum veröffentlicht bereits erste Benchmarks für seine Infrastruktur. Diese Ergebnisse sind interessant, sollten aber mit einer wichtigen Einschränkung gelesen werden: Es handelt sich um Messungen des Unternehmens selbst und nicht um unabhängige Benchmarks.

Bei Aufgaben mit großen Kontextmengen berichtet Callosum je nach Kombination von Modellen und Hardware von deutlich niedrigeren Kosten. Einzelne getestete Konfigurationen sollen bei vergleichbarer Genauigkeit bis zu zwölfmal günstiger als eine untersuchte GPT-5-Konfiguration gewesen sein.

Bei anderen Konfigurationen berichtet Callosum zusätzlich von deutlich kürzeren Laufzeiten.

Auch bei Aufgaben, bei denen KI-Agenten Webseiten bedienen, experimentiert das Unternehmen mit der Kombination unterschiedlicher Modelle. Ein kleineres Vision-Modell kann dabei beispielsweise einzelne visuelle Arbeitsschritte übernehmen, während ein größeres Modell für komplexere Entscheidungen zuständig bleibt.

Genau solche Workflows dürften für die wirtschaftliche Nutzung von KI zunehmend relevant werden. Unternehmen bauen nicht mehr nur einzelne Chatbots, sondern Systeme, in denen Modelle wiederholt Daten abrufen, Werkzeuge verwenden und weitere Modelle aufrufen.

Mit jedem zusätzlichen Schritt steigen allerdings auch Rechenbedarf und Kosten.

## Callosum optimiert nicht nur Modelle

Interessant ist Callosum deshalb vor allem aus Sicht der [Cloud](https://oliverjessner.at/category/cloud/)-Infrastruktur.

Die Optimierung findet nicht nur auf Ebene des KI-Modells statt. Callosum betrachtet den gesamten Stack aus Workflows, Modellen, Laufzeitumgebung und Hardware.

Das unterscheidet den Ansatz von klassischen Model-Routern. Diese können beispielsweise eine Anfrage abhängig von Preis oder Qualität an unterschiedliche Sprachmodelle weiterleiten.

Callosum will tiefer in die Infrastruktur eingreifen. Workflows sollen gemeinsam mit den darunterliegenden Modellen und Chip-Architekturen optimiert werden.

Dadurch entsteht allerdings auch ein wesentlich komplexeres Optimierungsproblem. Ein günstigeres Modell ist nicht automatisch günstiger für den gesamten Workflow. Wenn es mehr Schritte benötigt oder häufiger Fehler produziert, kann die vermeintliche Einsparung schnell verschwinden.

Ein sinnvolles Routing muss deshalb Kosten, Geschwindigkeit und Qualität gleichzeitig berücksichtigen.

## Der britische Staat investiert mit

Bemerkenswert ist auch die Zusammensetzung der Investoren.

Neben Atomico, Plural und DCVC beteiligt sich der UK Sovereign AI Fund. Der britische Staat hatte den mit 500 Millionen Pfund ausgestatteten Fonds 2026 angekündigt, um heimische KI-Unternehmen und Infrastruktur zu fördern.

Callosum war dessen erstes angekündigtes direktes Investment.

Das passt zur politischen Bedeutung des Themas. Die Infrastruktur hinter generativer KI wird derzeit stark von wenigen großen Cloud- und Hardwareanbietern bestimmt. Gleichzeitig entstehen zunehmend spezialisierte Chips für einzelne KI-Workloads.

Wenn sich diese Entwicklung fortsetzt, wird die Frage wichtiger, wie Anwendungen unterschiedliche Hardware verwenden können, ohne für jede Plattform separat entwickelt werden zu müssen.

Für [Startups](https://oliverjessner.at/category/startups/) könnte genau diese Abstraktionsschicht interessant werden.

## Noch muss Callosum den Ansatz im Alltag beweisen

Die Finanzierung über 100 Millionen Dollar zeigt vor allem, wie groß Investoren das wirtschaftliche Potenzial hinter effizienterer KI-Infrastruktur einschätzen.

Ob Callosum daraus tatsächlich eine relevante Plattform entwickeln kann, ist damit noch nicht entschieden.

Die veröffentlichten Ergebnisse zeigen, dass unterschiedliche Modelle und Chip-Architekturen bei bestimmten Aufgaben erhebliche Unterschiede bei Kosten und Geschwindigkeit ermöglichen können. Gleichzeitig stammen viele der derzeit verfügbaren Leistungsangaben direkt vom Unternehmen.

Entscheidend wird deshalb sein, ob sich diese Vorteile auch bei unterschiedlichen realen Anwendungen reproduzieren lassen.

Die grundlegende Fragestellung dürfte jedoch bleiben: Je stärker KI-Systeme aus mehreren Modellen, Agenten und Werkzeugen bestehen, desto weniger selbstverständlich wird es, jeden Arbeitsschritt mit demselben Modell auf derselben Hardware auszuführen.

Callosum setzt darauf, dass genau diese Optimierung zu einer eigenen Infrastrukturschicht wird.
