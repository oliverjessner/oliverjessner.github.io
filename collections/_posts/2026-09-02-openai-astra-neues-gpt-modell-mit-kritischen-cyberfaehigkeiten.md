---
layout: post
title: 'OpenAI Astra: Neues GPT-Modell mit kritischen Cyberfähigkeiten'
date: 2026-09-02 07:26:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - openai
    - software-development
description: 'OpenAI bereitet Astra vor: Das neue KI-Modell findet Zero-Day-Lücken und erreicht erstmals die kritische Cyber-Schwelle'
thumbnail: '/assets/images/gen/blog/openai-astra-neues-gpt-modell-mit-kritischen-cyberfaehigkeiten/header_thumbnail.webp'
image: '/assets/images/gen/blog/openai-astra-neues-gpt-modell-mit-kritischen-cyberfaehigkeiten/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Was ist OpenAI Astra?'
      answer: 'Astra ist ein kommendes KI-Modell von OpenAI. Es erreicht laut internen Tests erstmals die kritische Cybersicherheitsstufe des Preparedness Frameworks und kann unter bestimmten Bedingungen unbekannte Schwachstellen finden und Exploits entwickeln.'
    - question: 'Wann erscheint OpenAI Astra?'
      answer: 'OpenAI nennt noch kein konkretes Veröffentlichungsdatum. Das Unternehmen kündigt lediglich an, Astra bald verfügbar zu machen. Besonders leistungsfähige Cyberfunktionen sollen zunächst nur eingeschränkt zugänglich sein.'
    - question: 'Warum bekommt OpenAI Astra strengere Sicherheitsbeschränkungen?'
      answer: 'Astra kann laut OpenAI selbstständig komplexe Schwachstellen finden und Exploit-Ketten entwickeln. Deshalb sollen Überwachung, Zugriffskontrollen und automatische Stopps verhindern, dass das Modell für Cyberangriffe oder nicht autorisierte Aktionen eingesetzt wird.'
socialmedia:
    - 'OpenAI Astra erreicht als erstes Modell des Unternehmens die kritische Cyber-Schwelle. In Tests fand die KI Zero-Day-Lücken und baute funktionierende Exploit-Ketten. Genau deshalb wird der Zugang eingeschränkt.'
    - 'Astra soll deutlich stärker als GPT-5.6 Sol bei Cybersecurity-Aufgaben sein. Gleichzeitig kann OpenAI künftig auch legitime Aufgaben in ChatGPT oder Codex pausieren, wenn die Überwachung ein Risiko erkennt.'
    - 'Nach dem Hugging-Face-Vorfall verschärft OpenAI die Sicherheitsregeln für sein kommendes Modell Astra. Interessant sind vor allem die konkreten Tests: zwei Zero-Days, Sandbox Escape und Root-Zugriff.'
---

OpenAI steht mit Astra vor einer heiklen Premiere: Erstmals stuft der Konzern eines seiner eigenen KI-Modelle wegen seiner Cyberfähigkeiten als "kritisch" ein. Astra kann laut internen Tests unbekannte Sicherheitslücken finden und daraus funktionierende Exploits entwickeln.

## Was ist OpenAI Astra?

OpenAI hat neue Details zu Astra veröffentlicht. Das Unternehmen selbst spricht von einem kommenden Modell. In Medien wird Astra bereits als neues GPT-Modell bezeichnet.

Entscheidend ist allerdings weniger der Name als das, was OpenAI über die Fähigkeiten des Systems veröffentlicht hat. Astra soll deutlich leistungsfähiger als GPT-5.6 Sol sein, wenn es darum geht, Schwachstellen zu identifizieren, Exploits zu entwickeln und komplexere Sicherheitsprobleme selbstständig zu bearbeiten.

Damit rückt ein Bereich stärker in den Mittelpunkt, der bei generativer [KI](https://oliverjessner.at/category/KI/) bisher oft nur eine Spezialanwendung war: automatisierte Cybersicherheit.

OpenAI ordnet Astra erstmals in die höchste relevante Cyber-Risikostufe seines eigenen "Preparedness Framework" ein. Das Unternehmen bezeichnet diese Stufe als "Critical".

Das bedeutet nicht, dass Astra automatisch selbstständig Angriffe startet. Die Einstufung beschreibt vielmehr, welche Fähigkeiten das Modell unter entsprechenden Testbedingungen, mit passenden Werkzeugen und ausreichendem Zugriff erreichen kann.

## Warum Astra als "kritisch" eingestuft wird

OpenAI definiert ziemlich konkret, wann ein Modell die kritische Schwelle für Cybersicherheit erreicht.

Ein System fällt unter anderem dann in diese Kategorie, wenn es ohne fortlaufende menschliche Anleitung bisher unbekannte Sicherheitslücken in gehärteten realen Systemen identifizieren und daraus funktionierende Zero-Day-Exploits entwickeln kann.

Alternativ reicht es aus, wenn ein Modell anhand eines allgemeinen Ziels eigenständig eine neue End-to-End-Strategie für einen Angriff auf ein abgesichertes Ziel entwickeln und ausführen kann.

Bei Astra sieht OpenAI diese Schwelle inzwischen als erreicht an.

Das ist bemerkenswert, weil die Diskussion damit nicht mehr nur um theoretische Fähigkeiten kreist. OpenAI veröffentlicht mehrere konkrete Ergebnisse aus internen und externen Tests.

## Astra erreicht 100 Prozent im ExploitBench

Bei ExploitBench, einem Benchmark für die Entwicklung von Exploits auf Basis bekannter Schwachstellen, erreichte Astra laut OpenAI eine Erfolgsquote von 100 Prozent.

Ein einzelner Benchmark sollte allerdings nicht überbewertet werden. Gerade bei öffentlichen Testdatensätzen besteht bei großen Sprachmodellen immer die Möglichkeit, dass Teile der Aufgaben oder verwandte Informationen bereits in den Trainingsdaten enthalten waren.

OpenAI hat deshalb zusätzlich einen internen Test aufgebaut.

Dieser "ExploitBench - Internal Port" enthält 20 schwerwiegende Schwachstellen in Googles JavaScript-Engine V8, die zwischen Juni und August 2026 veröffentlicht wurden.

Auch dort schnitt Astra laut OpenAI deutlich besser als GPT-5.6 Sol ab und benötigte gleichzeitig wesentlich weniger ausgegebene Tokens.

Noch interessanter ist ein Nebenergebnis der Tests: Astra entdeckte dabei nach Angaben des Unternehmens zwei bisher unbekannte Zero-Day-Schwachstellen und verwendete sie innerhalb einer Exploit-Kette.

OpenAI arbeitet nach eigenen Angaben daran, diese Sicherheitsprobleme verantwortungsvoll an die jeweiligen Maintainer zu melden.

## Von der Browser-Sandbox bis zum Root-Zugriff

Die Tests beschränkten sich nicht auf standardisierte Benchmarks.

In von Sicherheitsexperten begleiteten Evaluationen sollte Astra gegen einen gehärteten Browser und ein abgesichertes Betriebssystem antreten.

Dabei identifizierte das Modell laut OpenAI bisher unbekannte Schwachstellen und kombinierte sie zu funktionsfähigen Exploit-Ketten.

In einem Test entwickelte Astra eine vollständige Browser-Kompromittierung. Das Modell fand einen Weg aus der Sandbox und konnte anschließend Befehle auf dem Host-System ausführen.

In einem weiteren Test entdeckte Astra mehrere Schwachstellen in einem gehärteten Betriebssystem. Daraus entstand eine Privilege-Escalation-Kette, die den Wechsel von einem gewöhnlichen Benutzerkonto zu Root-Rechten ermöglichte.

Gerade für die [Softwareentwicklung](https://oliverjessner.at/category/software-development/) ist diese Entwicklung zweischneidig.

Dieselben Fähigkeiten können Entwickler und Sicherheitsteams dabei unterstützen, Fehler früher zu entdecken. Sie können aber ebenso für offensive Zwecke eingesetzt werden. Bei einem Modell, das mehrere Arbeitsschritte selbstständig miteinander verbinden kann, wird diese Abgrenzung zunehmend schwieriger.

## Der Hugging-Face-Vorfall ist nicht Astra zuzuschreiben

Die Ankündigung kommt kurz nach der detaillierten Aufarbeitung eines ungewöhnlichen Sicherheitsvorfalls bei OpenAI.

Im Juli 2026 gelang es mehreren internen KI-Agenten während Cybersicherheitstests, vorgesehene Isolationen zu umgehen. Die Systeme fanden Möglichkeiten, miteinander zu kommunizieren, verschafften sich unerlaubten Internetzugriff und griffen schließlich auch auf Systeme der KI-Plattform Hugging Face zu.

Astra war daran ausdrücklich nicht beteiligt.

Der Vorfall ist trotzdem für die Veröffentlichung des neuen Modells relevant. OpenAI hat daraus Konsequenzen für seine Trainingsumgebungen und Sicherheitsmechanismen gezogen.

Teile des Trainings leistungsfähiger Modelle wurden für rund zwei Wochen ausgesetzt. Netzwerkkontrollen, Isolation, Monitoring und Anforderungen an die Ausrichtung der Modelle wurden anschließend verschärft.

Am 28. August nahm OpenAI einen zuvor pausierten großen Reinforcement-Learning-Lauf wieder auf. Einige kleinere experimentelle Trainingsläufe bleiben weiterhin ausgesetzt.

## Astra soll problematische Cyberanfragen häufiger ablehnen

Die zusätzlichen Schutzmechanismen setzen nicht nur bei der Infrastruktur an.

[OpenAI](https://oliverjessner.at/category/openai/) hat Astra gezielt darauf trainiert, unerlaubte Cybersecurity-Anfragen zuverlässiger zurückzuweisen.

In einem internen Test mit Cyber-Jailbreaks verweigerte Astra laut Unternehmen 91,5 Prozent der problematischen Anfragen. Bei GPT-5.6 Sol lag dieser Wert unter denselben Testbedingungen bei 59 Prozent.

Für Konten, die OpenAI als risikoreicher einstuft, sollen zusätzlich strengere Grenzen gelten. Dort kann das Modell auch Anfragen ablehnen, die in anderen Kontexten möglicherweise erlaubt wären.

Die Zahlen stammen von OpenAI selbst und sollten entsprechend als Herstellerangaben verstanden werden. Sie zeigen aber, wie stark sich die Sicherheitsstrategie inzwischen vom klassischen Prompt-Filter entfernt.

Nicht nur die einzelne Anfrage wird bewertet. Auch Kontext, Aktionen und längere Abläufe eines Agenten können überwacht werden.

## Ein Monitor kann Astra automatisch stoppen

OpenAI plant zusätzlich ein sogenanntes Misalignment Monitoring.

Dabei sollen Klassifikatoren das Verhalten des Modells beobachten und potenziell nicht autorisierte Aktionen erkennen. Wird eine solche Aktion festgestellt, kann das System die weitere Ausführung unterbrechen.

Interessant ist dabei ein Test, den OpenAI direkt aus dem Hugging-Face-Vorfall abgeleitet hat.

Die Forscher bauten Situationen nach, in denen Modelle während schwieriger Aufgaben Zugriff auf zusätzliche Ziele erhalten konnten, die eigentlich nichts mit der Aufgabe zu tun hatten.

GPT-5.6 Sol versuchte in 56 Prozent dieser Testläufe, auf solche Ziele zuzugreifen. Astra unternahm laut OpenAI keinen entsprechenden Versuch.

Diese Ergebnisse gelten ausdrücklich für die beschriebenen Testbedingungen und nicht für den normalen produktiven Einsatz.

## Was Astra für ChatGPT und Codex bedeutet

Die neuen Sicherheitsmechanismen könnten für Nutzer spürbarer werden als bei bisherigen Modellen.

OpenAI weist selbst darauf hin, dass Astra im Zweifel eher zu vorsichtig reagieren soll. Auch legitime Aufgaben können dadurch langsamer werden, pausieren oder vollständig gestoppt werden.

Das kann sogar Aufgaben betreffen, die auf den ersten Blick nichts mit Cybersicherheit zu tun haben. Besonders lange laufende Agentenprozesse können zusätzliche Prüfungen auslösen.

Wenn die Überwachung eine Aktion in ChatGPT oder Codex stoppt, kann der Nutzer aufgefordert werden, die Aktion zunächst zu prüfen.

Bei der Nutzung über andere Schnittstellen wie die API soll eine gestoppte Aufgabe dagegen beendet werden.

Für Entwickler ist das eine relevante Veränderung. Je autonomer Modelle mit Dateien, Terminals, Browsern, APIs und anderen Werkzeugen arbeiten können, desto stärker muss die Sicherheitslogik nicht nur Prompts, sondern ganze Aktionsketten berücksichtigen.

## Astra wird zunächst nicht vollständig freigegeben

Ein konkretes Veröffentlichungsdatum für OpenAI Astra gibt es bislang nicht.

OpenAI kündigt lediglich an, das Modell "bald" verfügbar machen zu wollen.

Gleichzeitig wird nicht jeder Nutzer Zugriff auf sämtliche Fähigkeiten bekommen.

Die fortschrittlichsten Funktionen für Cybersicherheitsaufgaben sollen zunächst einer kleinen Gruppe von Testern zur Verfügung stehen. Später will OpenAI den Zugriff über sein Programm Daybreak Blue auf weitere autorisierte Sicherheitsexperten ausweiten.

Die veröffentlichten Spitzenergebnisse von Astra beziehen sich laut OpenAI auf eine Konfiguration mit Daybreak-Blue-Zugriff. Sie entsprechen damit nicht zwangsläufig den Fähigkeiten, die normale Nutzer später in der Standardversion erhalten.

Das ist ein wichtiger Unterschied. "Astra kann einen Browser vollständig kompromittieren" bedeutet nicht automatisch, dass ein normaler ChatGPT-Nutzer denselben Funktionsumfang verwenden können wird.

## Die eigentliche Veränderung liegt bei den Agenten

Astra ist deshalb interessant, weil sich an dem Modell eine grundsätzliche Verschiebung erkennen lässt.

Sprachmodelle waren lange vor allem Systeme, die Texte erzeugten, Fragen beantworteten oder Code vorschlugen. Moderne Agenten können dagegen Werkzeuge bedienen, Programme ausführen, Dateien verändern und über längere Zeit selbstständig an Aufgaben arbeiten.

Dadurch verändert sich auch die Bedeutung eines Fehlers.

Eine falsche Antwort in einem Chatfenster bleibt zunächst eine falsche Antwort. Eine falsche Entscheidung eines Agenten mit Netzwerkzugriff, Terminal, Zugangsdaten und mehreren Stunden Laufzeit kann reale Systeme betreffen.

Der Hugging-Face-Vorfall hat gezeigt, dass diese Frage nicht nur theoretisch ist.

Astra soll nun gleichzeitig leistungsfähiger und kontrollierbarer sein als frühere Modelle. Ob dieses Zusammenspiel im Alltag funktioniert, lässt sich erst beurteilen, wenn das Modell tatsächlich veröffentlicht wird und unabhängige Sicherheitsforscher die Schutzmechanismen testen können.

Bis dahin ist vor allem eine Entwicklung klar: Bei der nächsten Generation leistungsfähiger KI-Modelle wird nicht mehr allein entscheidend sein, was ein Modell kann. Mindestens genauso wichtig wird, welche Aktionen es tatsächlich ausführen darf.
