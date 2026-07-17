---
layout: post
title: 'Soofi S: Deutsches Open-Source-KI-Modell mit 30 Milliarden Parametern'
date: 2026-07-17 09:24:10 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - software-engineering
    - cloud
description: 'Soofi S ist ein deutsches 30B-KI-Modell mit MoE- und Mamba-Architektur. Was Benchmarks, Offenheit und lokale Nutzung wirklich zeigen'
thumbnail: '/assets/images/gen/blog/soofi-s-deutsches-open-source-ki-modell-mit-30-milliarden-parametern/header_thumbnail.webp'
image: '/assets/images/gen/blog/soofi-s-deutsches-open-source-ki-modell-mit-30-milliarden-parametern/header.webp'
image_width: 1280
image_height: 721
faq:
    - question: 'Was ist Soofi S?'
      answer: 'Soofi S ist ein in Deutschland entwickeltes Sprachmodell mit rund 30 Milliarden Parametern. Durch eine Mixture-of-Experts-Architektur sind bei der Verarbeitung eines Tokens nur ungefähr drei Milliarden Parameter aktiv.'
    - question: 'Kann Soofi S lokal ausgeführt werden?'
      answer: 'Auf Hugging Face stehen Preview-Modelle und quantisierte Varianten bereit. Für die lokale Nutzung sind jedoch ausreichend Arbeitsspeicher, kompatible Software und teilweise die Ausführung von projektspezifischem Modellcode erforderlich.'
    - question: 'Ist Soofi S vollständig Open Source?'
      answer: 'Das Projekt veröffentlicht Modellgewichte, Code und Informationen zu den Trainingsdaten. Die endgültigen Lizenzbedingungen sind derzeit jedoch noch nicht vollständig dokumentiert und Teile der Trainingsdaten sind kommerziell lizenziert.'
socialmedia:
    - 'Soofi S ist ein deutsches KI-Modell mit rund 30 Milliarden Parametern. Dank MoE und Mamba-2 sollen lange Kontexte effizient verarbeitet werden. Doch bei Lizenz, lokaler Nutzung und Benchmarks bleiben wichtige Einschränkungen.'
    - 'Ein deutsches Open-Source-KI-Modell auf Augenhöhe mit internationalen Modellen? Soofi S erzielt starke deutsche Benchmarkwerte, aktiviert aber nur rund drei Milliarden seiner 30 Milliarden Parameter.'
    - 'Soofi S ist kein deutscher ChatGPT-Ersatz. Das Modell ist vielmehr eine offene technische Grundlage für Forschung, Unternehmen und spezialisierte KI-Anwendungen. Was das 30B-Modell wirklich kann.'
---

Soofi S soll Europas Abhängigkeit von US-amerikanischen und chinesischen KI-Modellen verringern. Das offene 30B-Modell überzeugt auf Deutsch, ist aber noch kein fertiger ChatGPT-Ersatz.

## Was ist Soofi S?

Soofi S ist ein großes Sprachmodell, das von einem Konsortium deutscher Forschungseinrichtungen und Unternehmen entwickelt wurde. Der Name SOOFI steht für "Sovereign Open Source Foundation Models".

Das Projekt soll eine offene und europäisch kontrollierte Grundlage für industrielle [KI](https://oliverjessner.at/category/KI/) schaffen. Im Fokus stehen unter anderem technische Dokumente, regulatorische Texte, Code-Generierung, unternehmensspezifische Anwendungen und KI-Agenten.

Nach Angaben des Projekts wurde Soofi S auf der Industrial AI Cloud der Deutschen Telekom in München trainiert. Die Infrastruktur befindet sich in Deutschland und wird von T-Systems betrieben. Damit sollen Unternehmen KI-Anwendungen entwickeln können, ohne ihre Modelle und Daten zwingend über eine außereuropäische Cloud verarbeiten zu müssen.

Soofi S ist auf Deutsch und Englisch ausgerichtet. Weitere europäische Sprachen spielen im Trainingsdatensatz bisher nur eine untergeordnete Rolle.

## Soofi S im Überblick

| Eigenschaft      | Soofi S                                                          |
| ---------------- | ---------------------------------------------------------------- |
| Modellgröße      | rund 30 Milliarden Parameter                                     |
| Aktive Parameter | rund 3 bis 3,5 Milliarden pro Token                              |
| Architektur      | Mixture of Experts mit Mamba-2- und Attention-Schichten          |
| Sprachen         | vor allem Deutsch und Englisch                                   |
| Trainingsumfang  | rund 27 Billionen Token                                          |
| Einsatzzweck     | Forschung, Industrie, Fine-Tuning und spezialisierte Anwendungen |
| Verfügbarkeit    | Preview-Modelle über Hugging Face                                |
| Varianten        | Base, Instruct und Reasoning                                     |
| Lokale Formate   | unter anderem GGUF, FP8 und weitere Quantisierungen              |

Die Werte unterscheiden sich je nach Darstellung leicht. Die offizielle Projektseite spricht von 30 Milliarden Parametern und rund drei Milliarden aktiven Parametern. Die technischen Unterlagen nennen teilweise präzisere Werte von rund 31,6 beziehungsweise 3,2 Milliarden Parametern.

## Warum nur ein Teil des Modells aktiv ist

Soofi S verwendet eine Mixture-of-Experts-Architektur, kurz MoE. Dabei besteht das Modell aus zahlreichen spezialisierten Teilnetzen, die als Experten bezeichnet werden.

Bei einer Anfrage werden nicht alle Experten gleichzeitig verwendet. Ein Router entscheidet für jeden Token, welche Experten aktiviert werden. Dadurch kann ein Modell viele Parameter enthalten, ohne für jeden Verarbeitungsschritt die Rechenleistung eines vollständig aktiven 30B-Modells zu benötigen.

Bei Soofi S sind von rund 30 Milliarden Parametern nur ungefähr drei Milliarden gleichzeitig aktiv. Das soll die Inferenz beschleunigen und den Speicherbedarf während der Berechnung reduzieren.

Ein MoE-Modell mit 30 Milliarden Gesamtparametern verhält sich dennoch nicht automatisch wie ein klassisches 3B-Modell. Sämtliche Gewichte müssen weiterhin gespeichert oder geladen werden. Für die lokale Ausführung bleibt die Gesamtgröße daher entscheidend.

## Mamba-2 soll lange Kontexte effizienter machen

Neben der MoE-Struktur verwendet Soofi S eine hybride Architektur aus Mamba-2- und klassischen Attention-Schichten.

Transformer-Modelle speichern während der Textgenerierung Informationen über vorherige Token in einem sogenannten KV-Cache. Dieser Speicher wächst mit der Länge des Kontexts. Sehr lange Dokumente können deshalb viel GPU-Speicher benötigen und die Verarbeitung verlangsamen.

Mamba gehört zu den State-Space-Modellen. Diese Architektur kann längere Sequenzen verarbeiten, ohne für jedes frühere Token einen ständig wachsenden Attention-Cache vorzuhalten.

Soofi S kombiniert beide Ansätze. Mamba-2 übernimmt einen großen Teil der Verarbeitung, während einige Attention-Schichten weiterhin gezielte Beziehungen zwischen weit voneinander entfernten Textstellen herstellen.

Laut dem technischen Bericht bleibt der Durchsatz des Modells bei Kontextlängen zwischen 4.000 und 256.000 Token vergleichsweise stabil. Das ist vor allem für umfangreiche technische Dokumentationen, Quellcode, Verträge und regulatorische Unterlagen interessant.

Ein großer theoretischer Kontext bedeutet allerdings nicht automatisch, dass das Modell jede Information darin zuverlässig findet. Bei bestimmten Langkontext-Tests zeigt Soofi S deutliche Schwächen.

## Wie gut ist Soofi S in Benchmarks?

Das Soofi-Konsortium vergleicht das Modell unter anderem mit OLMo 3 32B, Apertus 70B, EuroLLM 22B und Alia 40B. Nach den veröffentlichten Ergebnissen erreicht Soofi S besonders bei deutschsprachigen Aufgaben hohe Werte.

| Benchmark             |     Ergebnis |
| --------------------- | -----------: |
| Englischer Gesamtwert |         70,1 |
| Deutscher Gesamtwert  |         79,1 |
| HumanEval Code        | 73,8 Prozent |
| MBPP Code             | 70,2 Prozent |
| MBPP Deutsch          | 84,2 Prozent |
| INCLUDE-DE            |         61,2 |

Bei INCLUDE-DE wird Wissen geprüft, das speziell für Deutschland relevant ist. Dazu gehören unter anderem regionale, kulturelle und institutionelle Zusammenhänge.

Nach Angaben des Projekts liegt Soofi S bei den untersuchten deutschsprachigen Benchmarks vor anderen vollständig offenen europäischen Modellen. Auch bei englischen Aufgaben soll das stärkere Gewicht deutscher Trainingsdaten nicht zu einem deutlichen Leistungsverlust geführt haben.

Diese Ergebnisse sind interessant, sollten aber richtig eingeordnet werden. Die Benchmarks wurden vom Projektteam selbst ausgewählt und ausgewertet. Eine umfassende unabhängige Überprüfung durch externe Organisationen steht noch aus.

Benchmarkwerte zeigen zudem nur einen Ausschnitt der Qualität. Für den praktischen Einsatz sind auch Zuverlässigkeit, Halluzinationen, Sicherheit, Werkzeugnutzung, Geschwindigkeit und die Qualität längerer Dialoge relevant.

## Wo Soofi S noch Schwächen zeigt

Der technische Bericht dokumentiert nicht nur positive Ergebnisse. Bei deutschen Mathematikaufgaben aus Minerva MATH-DE erreicht Soofi S beispielsweise 56 Punkte. Qwen3.5 35B-A3B kommt im gleichen Vergleich auf 76,5 Punkte.

Auch bei NaturalQuestions, einem Benchmark für faktisches Wissen, bleibt Soofi S hinter größeren dichten Modellen zurück. Eine mögliche Erklärung ist die geringe Zahl aktiver Parameter. Ein Modell mit nur ungefähr drei Milliarden aktiven Parametern kann während einer einzelnen Berechnung weniger Faktenwissen abrufen als ein vollständig aktives Modell mit 27 oder 32 Milliarden Parametern.

Eine auffällige Schwäche zeigt sich zudem im RULER-Test für lange Kontexte. Wenn das Modell häufig vorkommende Wörter aus langen Texten extrahieren soll, sinkt die Trefferquote ab einer bestimmten Kontextlänge deutlich.

Das verdeutlicht einen wichtigen Unterschied: Ein Modell kann technisch 256.000 Token verarbeiten, ohne deshalb jede darin enthaltene Information zuverlässig zu verstehen oder wiederzufinden.

## Soofi S ist kein deutscher ChatGPT-Ersatz

Das Basismodell Soofi-S-Base wurde nicht als fertiger Chatbot veröffentlicht. Es handelt sich um ein vortrainiertes Modell für Textvervollständigung.

Nach Angaben der [Modellkarte auf Hugging Face](https://huggingface.co/Soofi-Project/Soofi-S-Base) wurde die Base-Version weder auf die Befolgung von Anweisungen abgestimmt noch mit einer vollständigen Sicherheitsausrichtung versehen. Sie ist deshalb nicht für den direkten Einsatz als öffentlicher Assistent gedacht.

Für Dialoge stellt das Projekt eine Variante namens [Soofi-S-Instruct-Preview](https://huggingface.co/Soofi-Project/Soofi-S-Instruct-Preview) bereit. Daneben existieren mit Isar und Rhine zwei Preview-Varianten, die stärker auf schrittweise Problemlösung und Reasoning ausgerichtet sind.

Das entspricht dem typischen Aufbau einer Modellfamilie:

1. Ein Basismodell lernt Sprache, Wissen und grundlegende Muster.
2. Eine Instruct-Version wird auf das Befolgen von Aufgaben abgestimmt.
3. Spezialisierte Varianten werden für Reasoning, Code oder bestimmte Branchen optimiert.
4. Unternehmen können eigene Modelle durch Fine-Tuning oder weiteres Training ableiten.

Soofi S ist daher eher mit einer technischen Plattform als mit einem fertigen Endkundenprodukt vergleichbar.

## Ist Soofi S wirklich Open Source?

Das Projekt bezeichnet Soofi S als Open-Source-Modell. Tatsächlich veröffentlicht das Konsortium deutlich mehr Informationen als viele kommerzielle Modellanbieter.

Dazu gehören Modellgewichte, Trainings- und Evaluierungscode, Zwischenstände sowie eine Aufstellung der verwendeten Datenquellen. Das Projekt argumentiert deshalb, die Anforderungen der Open Source AI Definition der Open Source Initiative zu erfüllen.

Ganz abgeschlossen ist die Frage trotzdem nicht.

Auf Hugging Face wird die Lizenz derzeit als "Other" geführt. In der Modellkarte steht außerdem, dass der vollständige Lizenztext noch ergänzt werden muss. Der Zugriff auf die Dateien ist öffentlich auffindbar, setzt aber die Anmeldung und Zustimmung zu Bedingungen voraus.

Hinzu kommt, dass ungefähr 1,3 Prozent der Trainingsdaten aus dem kommerziell lizenzierten Genios-Korpus stammen. Diese Daten können nicht frei weitergegeben werden. Nach Angaben des Projekts lassen sich etwa 99 Prozent des Trainingsmixes unabhängig rekonstruieren.

Soofi S ist damit wesentlich offener dokumentiert als zahlreiche sogenannte Open-Weight-Modelle. Ob die Bezeichnung Open Source uneingeschränkt gerechtfertigt ist, hängt jedoch auch von der endgültigen Lizenz und den konkreten Nutzungsbedingungen ab.

Bis diese Dokumente vollständig vorliegen, ist "offenes Modell" die vorsichtigere Bezeichnung.

## Kann Soofi S lokal auf einem Mac laufen?

Grundsätzlich stellt das Projekt quantisierte Varianten bereit, die für llama.cpp, Ollama und LM Studio vorgesehen sind. Dazu gehören GGUF-Modelle mit unterschiedlichen Quantisierungsstufen.

Ein unquantisiertes Modell mit rund 32 Milliarden Parametern benötigt allein für die Gewichte in BF16 rechnerisch ungefähr 64 Gigabyte Speicher. Hinzu kommen der Kontext, Zwischenergebnisse und die Laufzeitumgebung.

Für typische Consumer-Systeme sind daher quantisierte Versionen notwendig. Bei einer 4-Bit-Quantisierung sinkt der reine Speicherbedarf der Gewichte rechnerisch auf ungefähr 16 Gigabyte. In der Praxis wird zusätzlicher Arbeitsspeicher benötigt.

Auf einem Mac mit Apple Silicon und 32 Gigabyte Unified Memory könnte eine passende 4-Bit-Variante grundsätzlich ausführbar sein. Ob das Modell flüssig läuft, hängt jedoch von der jeweiligen Quantisierung, der Kontextlänge und der Unterstützung der hybriden Mamba-MoE-Architektur ab.

Die Modelle befinden sich außerdem noch im Preview-Stadium. Die Modellkarten weisen auf projektspezifischen Python-Code und mögliche Änderungen an Gewichten und Metadaten hin. Die lokale Installation dürfte daher derzeit weniger unkompliziert sein als bei etablierten Modellen wie Llama, Gemma oder Qwen.

Für produktive Anwendungen sollte die Preview-Version nicht ohne eigene Tests, Sicherheitsmaßnahmen und eine Prüfung der Lizenzbedingungen eingesetzt werden.

## Warum das Training in Deutschland relevant ist

Soofi S wurde auf der Industrial AI Cloud der Deutschen Telekom in München trainiert. Die Anlage verwendet Nvidia-Blackwell-GPUs und wird laut Telekom mit erneuerbarer Energie betrieben.

Das Training auf europäischer Infrastruktur ist vor allem für Unternehmen und öffentliche Einrichtungen relevant, die Anforderungen an Datenstandort, Datenschutz und Kontrolle erfüllen müssen.

Digitale Souveränität bedeutet hier jedoch nicht vollständige technologische Unabhängigkeit. Die Infrastruktur verwendet weiterhin Hardware von Nvidia und zahlreiche internationale [Cloud](https://oliverjessner.at/category/cloud/)- und Open-Source-Komponenten.

Der entscheidende Unterschied liegt in der Kontrolle über das Modell, die Trainingsprozesse und den späteren Betrieb. Unternehmen können Soofi S grundsätzlich auf eigener oder europäischer Infrastruktur weiterentwickeln, statt ausschließlich eine geschlossene API eines einzelnen US-Anbieters zu verwenden.

## Für wen Soofi S interessant ist

Für normale Nutzer ist Soofi S derzeit noch kein Modell, das ChatGPT, Claude oder Gemini unmittelbar ersetzt.

Interessant ist es vor allem für:

- Forschungseinrichtungen, die offene Sprachmodelle untersuchen
- Unternehmen mit umfangreichen deutschen Dokumenten
- Entwickler, die eigene Instruct- oder Branchenmodelle trainieren
- Organisationen mit Anforderungen an europäischen Datenstandort
- Projekte aus dem Bereich Code-Generierung und [Software-Engineering](https://oliverjessner.at/category/software-engineering/)
- Anwendungen, die sehr lange Dokumente verarbeiten müssen
- öffentliche Einrichtungen mit hohen Transparenzanforderungen

Ob Soofi S in diesen Bereichen tatsächlich Vorteile bietet, muss sich in unabhängigen Tests und realen Industrieprojekten zeigen.

## Fazit

Soofi S ist eines der technisch interessantesten offenen Sprachmodelle aus Deutschland. Die Kombination aus rund 30 Milliarden Gesamtparametern, einer sparsamen Mixture-of-Experts-Struktur und Mamba-2-Schichten verspricht hohe Effizienz bei langen Kontexten.

Besonders überzeugend sind die guten deutschsprachigen Benchmarkwerte und die vergleichsweise ausführliche Dokumentation der Trainingsdaten. Damit adressiert das Projekt eine Lücke, die viele internationale Modelle offenlassen.

Gleichzeitig ist Soofi S noch kein fertiger ChatGPT-Konkurrent. Die Modelle sind als Preview gekennzeichnet, die endgültige Lizenz ist nicht vollständig dokumentiert und mehrere Benchmarkwerte müssen erst unabhängig bestätigt werden.

Für Forschung und industrielle Experimente bietet Soofi S bereits eine interessante Grundlage. Ob daraus eine dauerhaft konkurrenzfähige europäische Modellfamilie entsteht, entscheidet sich jedoch nicht allein in Benchmarks. Maßgeblich werden die Qualität der späteren Instruct-Modelle, die Unterstützung durch lokale Werkzeuge und die tatsächliche Nutzung durch Unternehmen sein.

## Quellen und weiterführende Informationen

- [Offizielle Soofi-Projektseite](https://www.soofi.info/)
- [Soofi S im Überblick](https://www.soofi.info/soofi-s/)
- [Soofi-S-Base auf Hugging Face](https://huggingface.co/Soofi-Project/Soofi-S-Base)
- [Soofi-S-Instruct-Preview auf Hugging Face](https://huggingface.co/Soofi-Project/Soofi-S-Instruct-Preview)
- [Technischer Pretraining-Report](https://huggingface.co/spaces/Soofi-Project/Pretraining-Tech-Report)
- [Industrial AI Cloud der Deutschen Telekom](https://www.telekom.com/en/media/media-information/archive/germany-s-first-ai-factory-for-industry-1101670)
- [Technische Einordnung von The Decoder](https://the-decoder.com/german-ai-consortium-releases-soofi-s-an-open-30b-model-that-tops-benchmarks-in-both-english-and-german/)
