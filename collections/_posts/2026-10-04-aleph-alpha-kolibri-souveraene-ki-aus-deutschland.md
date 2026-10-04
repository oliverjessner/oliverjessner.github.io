---
layout: post
title: 'Aleph Alpha Kolibri – souveräne KI aus Deutschland'
date: 2026-10-04 20:26:26 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - cloud
    - software-development
    - Privacy
description: 'Was bietet Aleph Alpha Kolibri? Ein Blick auf das deutsche KI-Modell, seinen Hardwarebedarf und die Frage, wie viel Kontrolle offene Gewichte bringen'
thumbnail: '/assets/images/gen/blog/aleph-alpha-kolibri-souveraene-ki-aus-deutschland/header_thumbnail.webp'
image: '/assets/images/gen/blog/aleph-alpha-kolibri-souveraene-ki-aus-deutschland/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Was ist Kolibri von Aleph Alpha?'
      answer: 'Kolibri ist ein Open-Weight-Sprachmodell für Deutsch und Englisch. Aleph Alpha veröffentlichte es am 3. Oktober 2026 für Anwendungen in Unternehmen und Verwaltung.'
    - question: 'Ist Aleph Alpha Kolibri kostenlos nutzbar?'
      answer: 'Die Modellgewichte sind unter Apache 2.0 verfügbar. Die Lizenz ermöglicht auch kommerzielle Nutzung unter ihren Bedingungen. Kosten für Hardware, Betrieb und Support kommen gegebenenfalls hinzu.'
    - question: 'Welche Hardware braucht Kolibri?'
      answer: 'Für die offizielle FP8-Version nennt Aleph Alpha ungefähr 78 GB Speicher allein für die Modellgewichte. Zusätzlicher Speicher ist nötig. Als mögliche Konfigurationen nennt der Anbieter unter anderem zwei H100 SXM5 oder eine H200.'
socialmedia:
    - 'Aleph Alpha veröffentlicht Kolibri für Deutsch und Englisch. Offene Gewichte ermöglichen den Eigenbetrieb. Ob daraus souveräne KI wird, entscheidet aber nicht allein der Standort des Anbieters.'
    - '78 Milliarden Parameter, davon rund 3,46 Milliarden pro Token aktiv: Kolibri rechnet mit einem Teil seines Modells, muss die übrigen Gewichte aber trotzdem vorhalten. Warum das für den Hardwarebedarf wichtig ist.'
    - 'Kolibri unterstützt bis zu eine Million Tokens Kontext. Aleph Alpha empfiehlt für komplexe Aufgaben höchstens 262.144. Ein Blick auf die Unterschiede zwischen Maximalwerten und praktischer Nutzung.'
news: true
---

Mit Kolibri veröffentlicht Aleph Alpha ein deutsches KI-Modell mit offenen Gewichten. Es lässt sich selbst betreiben, braucht aber passende Hardware. Was hinter Technik und Souveränitätsversprechen steckt.

## Was ist Kolibri von Aleph Alpha?

**Kolibri ist ein Sprachmodell von Aleph Alpha für deutsch- und englischsprachige Anwendungen in Verwaltung und Unternehmen.** Das Heidelberger Unternehmen hat es am [3. Oktober 2026 veröffentlicht](https://aleph-alpha.com/en/blog/kolibri-has-landed-a-sovereign-open-weight-model/). Die Modellgewichte stehen zum Download bereit, sodass Organisationen die [KI](https://oliverjessner.at/category/ki/) auf selbst kontrollierter Infrastruktur einsetzen können.

Laut [Model Card auf Hugging Face](https://huggingface.co/Aleph-Alpha/Kolibri-1#intended-use) ist Kolibri unter anderem für Dokumentenverarbeitung, strukturierte Datenextraktion und Fragen zu eigenen Wissensbeständen vorgesehen. Denkbar wären etwa ein Assistent für technische Handbücher oder die Vorbereitung von Antworten auf Verwaltungsanfragen.

Das Modell unterstützt außerdem einen einstellbaren Reasoning-Modus für mehrstufige Problemlösung und Tool Calling. Letzteres erlaubt einer angeschlossenen Anwendung, vom Modell vorgeschlagene Werkzeugaufrufe auszuführen. Die benötigten Schnittstellen und Kontrollen muss diese Anwendung allerdings selbst bereitstellen.

## Was bedeutet "souveräne KI" bei Aleph Alpha?

Aleph Alpha verbindet den Begriff mit Kontrolle über Entwicklung und Einsatz. Nach der [Veröffentlichungsankündigung](https://aleph-alpha.com/en/blog/kolibri-has-landed-a-sovereign-open-weight-model/) wurde Kolibri von Teams in Deutschland entwickelt und auf Infrastruktur in Deutschland und Finnland trainiert. "Made in Germany" bedeutet hier also nicht, dass sämtliche Rechenschritte ausschließlich in Deutschland stattgefunden haben.

Für Kunden ist vor allem relevant, dass sie nicht zwingend einen fremden Dienst mit der Verarbeitung ihrer Anfragen beauftragen müssen. Sie können das Modell in einer eigenen Betriebsumgebung einsetzen.

Ich würde Souveränität deshalb an konkreten Fragen festmachen: Wer kann auf Eingaben und Protokolle zugreifen? Wer entscheidet über Updates? Lässt sich das System zu einem anderen Betreiber übertragen? Die Herkunft des Entwicklers beantwortet diese Fragen nicht allein.

**Eigener Betrieb schafft Gestaltungsspielraum, ersetzt aber kein Sicherheitskonzept.** Berechtigungen, angebundene Dienste und die Prüfung der Ergebnisse bleiben Aufgaben der konkreten Anwendung.

## Welche Hardware braucht Kolibri für den lokalen Betrieb?

Kolibri besitzt laut [technischem Bericht](https://aleph-alpha.com/downloads/tech-report.pdf) rund **78,1 Milliarden Parameter**, aktiviert davon aber nur etwa **3,46 Milliarden pro Token**. Möglich macht das eine Mixture-of-Experts-Architektur: Für einen Verarbeitungsschritt wird nur ein Teil der spezialisierten Modellbereiche genutzt. Tokens sind die Textbausteine, mit denen das Modell arbeitet.

Weniger aktive Parameter bedeuten allerdings nicht, dass nur dieser Teil gespeichert werden muss. Die übrigen Modellgewichte müssen ebenfalls vorgehalten werden. Die Unterscheidung zwischen Rechenaufwand und Speicherbedarf ist beim Eigenbetrieb entscheidend.

Die [offiziellen Hardwareangaben](https://aleph-alpha.com/en/kolibri/) nennen für die FP8-Gewichte ungefähr **78 GB Speicherbedarf allein für das Modell**. Hinzu kommen unter anderem Speicher für den Kontext und die Ausführung. Als mögliche Konfigurationen führt Aleph Alpha beispielsweise zwei Nvidia H100 SXM5 oder eine H200 auf.

Die dokumentierte Konfiguration richtet sich damit an leistungsfähige Serversysteme. Sie ist kein Beleg dafür, dass Kolibri auf einem gewöhnlichen Notebook problemlos läuft. Der Betrieb kann auf eigener Hardware oder bei einem geeigneten [Cloud-Anbieter](https://oliverjessner.at/category/cloud/) erfolgen.

## Eine Million Tokens Kontext – was davon praktisch bleibt

Kolibri unterstützt laut [Modelldokumentation](https://huggingface.co/Aleph-Alpha/Kolibri-1#model-overview) bis zu **1.048.576 Tokens Kontext**. Für komplexe Aufgaben und einen effizienten Betrieb empfiehlt Aleph Alpha jedoch höchstens **262.144 Tokens**.

Das ist eine wichtige Einschränkung: Die maximal unterstützte Kontextlänge ist nicht automatisch die sinnvollste Einstellung für jede Anwendung.

Ein großes Kontextfenster kann helfen, umfangreiche Dokumente gemeinsam zu verarbeiten. Es garantiert aber weder, dass jede relevante Stelle berücksichtigt wird, noch dass die Antwort korrekt ist. Für einen Praxistest wären deshalb nicht nur lange Dokumente interessant, sondern auch gezielte Fragen zu verstreuten oder widersprüchlichen Informationen.

## Ist Kolibri Open Source und kostenlos nutzbar?

Die [Modellgewichte von Kolibri](https://huggingface.co/Aleph-Alpha/Kolibri-1) sind unter Apache 2.0 verfügbar. Diese [Lizenz](https://www.apache.org/licenses/LICENSE-2.0) erlaubt grundsätzlich auch die kommerzielle Nutzung unter ihren Bedingungen. Kosten für Rechenleistung, Einrichtung, Wartung und gegebenenfalls Support verschwinden dadurch nicht.

Bei der Bezeichnung lohnt sich Genauigkeit: **Open Weight bedeutet zunächst, dass die trainierten Modellgewichte zugänglich sind.** Das allein belegt noch kein vollständig offenes KI-System.

Die [Open Source AI Definition der Open Source Initiative](https://opensource.org/ai/open-source-ai-definition) verlangt zusätzlich unter anderem den Quellcode für Training und Betrieb sowie ausreichend detaillierte Informationen über die Trainingsdaten. Für die hier beschriebene Freigabe ist "Open-Weight-Modell" deshalb die präzisere Bezeichnung.

## Wie gut ist Kolibri im Vergleich zu anderen KI-Modellen?

Aleph Alpha veröffentlicht im [technischen Bericht](https://aleph-alpha.com/downloads/tech-report.pdf) Vergleiche mit anderen offenen Modellen. Dabei ergibt sich kein durchgehender Vorsprung.

Im Mathematiktest AIME 2026 erreicht Kolibri beispielsweise 96,0 Punkte, Qwen3.6-35B-A3B kommt auf 91,0. Bei LongBench Pro, einem Test für die Verarbeitung längerer Kontexte, liegt die Reihenfolge umgekehrt: 64,5 Punkte für Kolibri gegenüber 70,8 für Qwen.

**Diese Werte stammen vom Hersteller, nicht aus einem eigenen Praxistest.** Sie zeigen Unterschiede unter den jeweiligen Testbedingungen. Ob Kolibri eine bestimmte Aufgabe besser erledigt, sollte mit passenden Dokumenten, identischen Anforderungen und nachvollziehbaren Bewertungskriterien geprüft werden.

## Welche Rolle spielt der Zusammenschluss mit Cohere?

Zur Einordnung gehört auch die Unternehmensstruktur. Aleph Alpha und das kanadische Unternehmen Cohere haben am [16. September 2026 eine verbindliche Vereinbarung zum Zusammenschluss bekannt gegeben](https://aleph-alpha.com/en/news/cohere-agreement-transatlantic-sovereign-ai/). Das gemeinsame Unternehmen soll weltweit unter dem Namen Cohere auftreten. Laut dieser Mitteilung stand der Vollzug noch unter dem Vorbehalt abschließender behördlicher Genehmigungen.

Entwicklungsstandort, Eigentümerstruktur und Kontrolle über den laufenden Betrieb sind also unterschiedliche Fragen. Ein in Deutschland entwickeltes Modell ist nicht automatisch gleichbedeutend mit einem dauerhaft rein deutschen Anbieter.

## Für wen ist Aleph Alpha Kolibri interessant?

Kolibri kommt besonders dort für einen Vergleich infrage, wo deutschsprachige Dokumente und Kontrolle über die Betriebsumgebung wichtig sind. Vor einer Einführung würde ich dieselben anonymisierten Aufgaben mit mehreren Modellen testen und auch unvollständige oder widersprüchliche Unterlagen einbeziehen.

Entscheidend wären für mich Antworten mit prüfbaren Fundstellen, der notwendige Korrekturaufwand und die gesamten Betriebskosten. Erst dieser Vergleich zeigt, ob die Möglichkeit zum Eigenbetrieb im konkreten Arbeitsablauf einen Vorteil bringt.
