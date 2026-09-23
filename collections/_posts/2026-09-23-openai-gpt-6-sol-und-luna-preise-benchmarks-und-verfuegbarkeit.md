---
layout: post
title: 'OpenAI GPT-6 Sol und Luna: Preise, Benchmarks und Verfügbarkeit'
date: 2026-09-23 10:18:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - openai
    - KI
    - software-development
    - anthropic
description: 'OpenAI bringt GPT-6 Sol und Luna: Preise, Benchmarks, Kontextfenster, Codex- und API-Verfügbarkeit kompakt erklärt'
thumbnail: '/assets/images/gen/blog/openai-gpt-6-sol-und-luna-preise-benchmarks-und-verfuegbarkeit/header_thumbnail.webp'
image: '/assets/images/gen/blog/openai-gpt-6-sol-und-luna-preise-benchmarks-und-verfuegbarkeit/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Was kosten GPT-6 Sol und GPT-6 Luna?'
      answer: 'GPT-6 Sol kostet im Standard-Tarif 2 US-Dollar pro Million Input-Tokens und 10 US-Dollar pro Million Output-Tokens. GPT-6 Luna kostet 0,10 beziehungsweise 0,50 US-Dollar.'
    - question: 'Sind GPT-6 Sol und GPT-6 Luna in ChatGPT verfügbar?'
      answer: 'Zum Start stehen beide Modelle in ChatGPT Work und Codex für Plus, Pro, Business, Enterprise und Edu bereit. Free- und Go-Nutzer erhalten Zugriff auf GPT-6 Luna in der Desktop-App. Der normale Chat wird schrittweise erweitert.'
    - question: 'Wie groß ist das Kontextfenster von GPT-6 Sol und Luna?'
      answer: 'Beide Modelle unterstützen bis zu 1,05 Millionen Tokens Kontext und maximal 128.000 Output-Tokens.'
socialmedia:
    - 'GPT-6 Sol und Luna sind da. Ich habe Preise, Benchmarks, Kontextfenster und Verfügbarkeit eingeordnet und geprüft, was hinter OpenAIs Aussage "halb so viele Fehler" steckt.'
    - 'GPT-6 Sol kostet 2 Dollar pro Million Input-Tokens, Luna nur 10 Cent. Beide bieten 1,05 Millionen Tokens Kontext. Was das praktisch bedeutet und wo die Grenzen der Benchmarks liegen.'
    - 'OpenAI macht GPT-6 günstiger: Sol zielt auf Coding und Agenten, Luna auf günstige Aufgaben in großer Menge. Ein kompakter Überblick zu Preisen, API, Codex und Benchmarks.'
news: true
---

OpenAI erweitert GPT-6 um Sol und Luna. Beide Modelle sollen günstiger, faktentreuer und effizienter arbeiten. Entscheidend sind vor allem Preis, Kontextfenster und Einsatzgebiet.

## GPT-6 Sol und Luna – die wichtigsten Unterschiede

Nur wenige Monate nach GPT-5.6 erweitert [OpenAI](https://oliverjessner.at/category/openai/) seine aktuelle Modellfamilie um GPT-6 Sol und GPT-6 Luna. Beide sitzen unterhalb von GPT-6 Astra und sollen einen anderen Schwerpunkt setzen: möglichst viel Leistung zu deutlich niedrigeren Kosten.

GPT-6 Sol ist dabei das leistungsfähigere der beiden Modelle. OpenAI positioniert es vor allem für komplexe Coding-Aufgaben, Softwareentwicklung und agentische Workflows. GPT-6 Luna richtet sich dagegen an Aufgaben, bei denen Geschwindigkeit, Kosten und ein hoher Durchsatz wichtiger sind.

Die wichtigsten technischen Daten sind bei beiden Modellen überraschend ähnlich:

- GPT-6 Sol: 1.050.000 Tokens Kontext
- GPT-6 Luna: 1.050.000 Tokens Kontext
- maximal 128.000 Output-Tokens
- Text- und Bildeingaben
- verschiedene Reasoning-Stufen von "none" bis "max"
- Nutzung über Responses API und Chat Completions API

Der wesentliche Unterschied liegt damit weniger in der maximalen Kontextgröße als bei Rechenaufwand, Leistungsfähigkeit und Preis.

## GPT-6 Sol und Luna – Preise der neuen OpenAI-Modelle

OpenAI senkt die API-Preise gegenüber den bisherigen GPT-5.6-Modellen deutlich.

Für GPT-6 Sol gelten im Standard-Tarif:

- Input: 2 US-Dollar pro Million Tokens
- gecachter Input: 0,20 US-Dollar pro Million Tokens
- Output: 10 US-Dollar pro Million Tokens

GPT-5.6 Sol lag zuvor bei 4 US-Dollar für Input und 20 US-Dollar für Output. Bei Sol entspricht das tatsächlich einer Halbierung.

GPT-6 Luna ist noch erheblich günstiger:

- Input: 0,10 US-Dollar pro Million Tokens
- gecachter Input: 0,01 US-Dollar pro Million Tokens
- Output: 0,50 US-Dollar pro Million Tokens

Zum Vergleich: GPT-5.6 Luna kostete 0,20 US-Dollar für Input und 1,20 US-Dollar für Output. Beim Input halbiert sich der Preis. Beim Output fällt er sogar um rund 58 Prozent.

OpenAI fasst die neuen Tarife in seiner Kommunikation als rund 50 Prozent günstigere API-Preise zusammen.

Wichtig ist allerdings eine Einschränkung: Diese Standardpreise gelten für Prompts mit bis zu 272.000 Input-Tokens. Wer einen größeren Teil des verfügbaren Kontextfensters nutzt, fällt in den teureren Long-Context-Tarif.

## 1,05 Millionen Tokens Kontext

Einer der interessantesten Punkte für Entwickler ist das Kontextfenster von 1,05 Millionen Tokens.

Damit können GPT-6 Sol und GPT-6 Luna sehr große Mengen an Text, Quellcode oder Dokumenten innerhalb eines Requests verarbeiten. Das kann bei größeren Codebasen, langen Dokumentensammlungen oder Agenten hilfreich sein, die über längere Zeit Kontext behalten müssen.

Das maximale Kontextfenster sollte allerdings nicht mit kostenlos verfügbarem Speicher verwechselt werden. Große Prompts erzeugen weiterhin Token-Kosten und wechseln oberhalb der entsprechenden Grenze in den teureren Long-Context-Tarif.

Für viele praktische Anwendungen dürfte deshalb weiterhin entscheidend sein, Kontext gezielt auszuwählen, statt grundsätzlich möglichst viele Daten an ein Modell zu schicken.

GPT-6 Sol besitzt laut API-Dokumentation einen Wissensstand bis zum 20. April 2026. Bei GPT-6 Luna liegt der Knowledge Cutoff mit dem 18. Mai 2026 etwas später.

## Halb so viele Fehler – was OpenAI damit meint

Besonders auffällig ist OpenAIs Aussage, GPT-6 Sol produziere ungefähr halb so viele faktische Fehler wie GPT-5.6 Sol.

Das klingt zunächst nach einem sehr großen Qualitätssprung. Die zugrunde liegende Messung muss aber genauer betrachtet werden.

OpenAI verwendet dafür eine interne Factuality-Evaluation mit anonymisierten ChatGPT-Unterhaltungen, bei denen Nutzer zuvor einen sachlichen Fehler gemeldet hatten. Die Auswahl enthält damit bewusst Situationen, in denen Modelle Schwierigkeiten hatten.

OpenAI weist selbst darauf hin, dass diese Beispiele nicht repräsentativ für normale ChatGPT-Unterhaltungen sind. Im gewöhnlichen Einsatz seien faktische Fehler seltener.

Die Aussage "halb so viele Fehler" bedeutet deshalb nicht, dass GPT-6 Sol grundsätzlich bei jeder Art von Anfrage nur noch halb so häufig falsche Informationen liefert. Sie beschreibt das Ergebnis eines spezifischen internen Tests.

Interessant ist dennoch, dass auch GPT-6 Luna deutlich besser abschneiden soll. Bei höherem Reasoning-Aufwand erreicht Luna laut OpenAI in diesem Test ungefähr das Niveau von GPT-5.6 Sol, allerdings zu einem Bruchteil der Kosten.

Gerade bei [KI](https://oliverjessner.at/category/KI/) lohnt sich diese Unterscheidung zwischen Benchmark-Ergebnis und tatsächlichem Alltagseinsatz. Ein einzelner Messwert beschreibt nicht automatisch die Zuverlässigkeit eines Modells in jedem Szenario.

## GPT-6 Sol gegen Claude – was die Benchmarks zeigen

OpenAI vergleicht GPT-6 Sol und Luna in seiner Vorstellung mehrfach mit aktuellen Claude-Modellen von Anthropic.

Beim AutomationBench, der komplette Arbeitsabläufe über verschiedene Anwendungen hinweg testet, erreicht GPT-6 Sol mit der Reasoning-Stufe "xhigh" einen Score von 33,2 Prozent.

Claude Opus 5 kommt laut den von OpenAI verwendeten Vergleichsdaten bei maximalem Rechenaufwand auf 26,9 Prozent. OpenAI beziffert die Kosten von GPT-6 Sol pro Aufgabe dabei auf rund neun Prozent der Kosten von Opus 5.

Auch bei Softwareentwicklung fallen die Kostenunterschiede deutlich aus.

Im DeepSWE-Benchmark erreicht GPT-6 Sol bei maximalem Reasoning 68,8 Prozent. Claude Fable 5 liegt mit 69,9 Prozent knapp darüber. Laut OpenAI kostet eine Aufgabe mit GPT-6 Sol dabei ungefähr 80 Prozent weniger.

GPT-6 Luna erreicht 66,6 Prozent. Das liegt laut OpenAI ungefähr auf dem Niveau von Claude Opus 5 und Claude Fable 5 bei mittlerem Reasoning-Aufwand.

Auch beim Computer-Use-Benchmark OSWorld liegen die Modelle eng zusammen. GPT-6 Sol erreicht mit "xhigh" 60,5 Prozent, Claude Opus 5 mit mittlerem Reasoning 60,3 Prozent.

Solche Zahlen sind interessant, sollten aber nicht als universelle Rangliste verstanden werden. Unterschiedliche Reasoning-Stufen verändern sowohl Ergebnisse als auch Kosten. Zudem stammen einige Vergleichswerte konkurrierender Modelle aus öffentlich verfügbaren Berichten und nicht aus identisch kontrollierten Testläufen.

## GPT-6 Sol richtet sich stark an Entwickler

Der Schwerpunkt von GPT-6 Sol liegt deutlich auf Coding, Agenten und komplexen Arbeitsabläufen.

OpenAI beschreibt das Modell ausdrücklich als Modell für komplexe Coding- und Agentic-Workflows. Neben DeepSWE nutzt das Unternehmen dafür auch FrontierCode. Dieser Benchmark bewertet nicht nur, ob erzeugter Code grundsätzlich funktioniert, sondern auch Aspekte wie Tests, Codequalität, Umfang einer Änderung und die Integration in bestehende Projekte.

Für [Softwareentwicklung](https://oliverjessner.at/category/software-development/) ist diese Entwicklung relevanter als ein isolierter Benchmarkwert. Coding-Agenten bearbeiten zunehmend Aufgaben, die länger laufen, mehr Dateien betreffen und entsprechend große Mengen Tokens verbrauchen.

Bei solchen Workflows wird der Preis pro Token schnell zu einem praktischen Faktor.

GPT-6 Sol dürfte deshalb weniger dadurch interessant werden, dass es überall das leistungsfähigste Modell ist. OpenAI reserviert diese Position weiterhin für GPT-6 Astra. Sol soll vielmehr einen großen Teil dieser Fähigkeiten zu wesentlich niedrigeren laufenden Kosten bereitstellen.

## Wo GPT-6 Luna interessant wird

Bei Luna ist der Preis noch stärker Teil des Produkts.

Mit 0,10 US-Dollar pro Million Input-Tokens kostet das Modell nur fünf Prozent dessen, was GPT-6 Sol für die gleiche Menge Input berechnet. Beim Output beträgt der Unterschied ebenfalls den Faktor 20.

Das kann Anwendungen verändern, bei denen sehr viele Modellaufrufe stattfinden.

Denkbare Einsatzbereiche sind etwa:

- Klassifikation größerer Datenmengen
- Extraktion strukturierter Informationen
- Zusammenfassungen
- einfache Recherche- und Verarbeitungsschritte innerhalb von Agenten
- Hintergrundprozesse
- wiederkehrende Transformationen von Text
- Vorverarbeitung vor einem stärkeren Modell

Nicht jede Aufgabe benötigt das leistungsfähigste verfügbare Modell. Bei Anwendungen mit hunderttausenden oder Millionen Requests kann ein etwas schwächeres, aber deutlich günstigeres Modell wirtschaftlich sinnvoller sein.

Luna wird damit besonders dort interessant, wo nicht die Qualität einer einzelnen Antwort optimiert wird, sondern das Verhältnis zwischen Qualität und Kosten über sehr viele Anfragen.

## Prompt Caching soll zusätzlich Kosten sparen

Neben den eigentlichen Token-Preisen hat OpenAI auch das Prompt Caching für GPT-6 überarbeitet.

Bereits verarbeitete Teile eines Prompts können wiederverwendet werden. Für gecachte Input-Tokens verlangt OpenAI bei Sol nur 0,20 US-Dollar und bei Luna 0,01 US-Dollar pro Million Tokens.

Das entspricht einem Rabatt von 90 Prozent gegenüber regulärem Input.

Für längere Agenten-Sitzungen kann das relevant sein. Ein Agent muss beispielsweise Systemanweisungen, größere Teile einer Codebasis oder bereits bekannte Informationen nicht bei jeder Anfrage vollständig neu verarbeiten.

OpenAI will außerdem die Cache-Trefferrate verbessert haben. Änderungen an Reasoning-Stufe oder verfügbaren Tools sollen vorhandenen Kontext nicht mehr automatisch aus dem Cache werfen.

Gerade bei langen Workflows kann dieser Punkt praktisch wichtiger sein als ein kleiner Unterschied in einzelnen Benchmarks.

## GPT-6 Sol und Luna in ChatGPT, Codex und der API

Beide Modelle sind seit dem 22. September 2026 über die OpenAI API verfügbar.

Die Modellbezeichnungen lauten:

- `gpt-6-sol`
- `gpt-6-luna`

Zum Start hat OpenAI GPT-6 Sol und Luna außerdem für ChatGPT Work und Codex freigeschaltet. Das gilt für Nutzer von Plus, Pro, Business, Enterprise und Edu.

Free- und Go-Nutzer können GPT-6 Luna laut OpenAI über die Desktop-App verwenden.

Für den normalen Chat hatte OpenAI zum Launch noch keine vollständige Freigabe angekündigt. Die Bereitstellung in den verschiedenen ChatGPT-Oberflächen erfolgt schrittweise. Deshalb kann sich die sichtbare Modellauswahl je nach Account und Zeitpunkt unterscheiden.

Für Entwickler ist die Situation eindeutiger: Beide Modelle stehen über die API zur Verfügung.

## GPT-6 Sol, Luna oder Astra – welches Modell wofür gedacht ist

Die drei Modelle verfolgen unterschiedliche Schwerpunkte.

**GPT-6 Astra** bleibt OpenAIs leistungsfähigstes Modell. Es richtet sich an Aufgaben, bei denen möglichst hohe Qualität wichtiger ist als der Preis.

**GPT-6 Sol** soll einen Mittelweg bieten. Das Modell richtet sich besonders an komplexe Coding-Aufgaben, Agenten und professionelle Workflows, bei denen sowohl Qualität als auch laufende Kosten relevant sind.

**GPT-6 Luna** optimiert stärker auf Effizienz. Es eignet sich für hohe Anfragevolumen und Aufgaben, bei denen ein günstiger Modellaufruf wichtiger ist als die letzten Prozentpunkte bei komplexen Benchmarks.

Für reale Anwendungen dürfte deshalb zunehmend nicht mehr nur die Frage "Welches Modell ist am besten?" relevant sein.

Wichtiger wird die Frage, welches Modell für einen bestimmten Arbeitsschritt ausreichend gut ist.

Ein Agent könnte beispielsweise Luna für einfache Klassifikationen und Datenaufbereitung einsetzen, Sol für anspruchsvollere Programmieraufgaben und Astra nur dann aufrufen, wenn tatsächlich maximale Modellleistung erforderlich ist.

## GPT-6 Sol und Luna – Effizienz ist der eigentliche Schwerpunkt

GPT-6 Sol und GPT-6 Luna wirken weniger wie ein kompletter Neustart als wie der Versuch, die Fähigkeiten von GPT-6 wirtschaftlicher nutzbar zu machen.

Bei Sol halbiert OpenAI die regulären API-Preise gegenüber GPT-5.6 Sol. Luna fällt mit 0,10 US-Dollar pro Million Input-Tokens noch wesentlich günstiger aus. Gleichzeitig besitzen beide Modelle ein Kontextfenster von 1,05 Millionen Tokens und unterstützen hohe Reasoning-Stufen.

Auch die verbesserten Benchmarkwerte sind interessant. Besonders die Aussage über weniger faktische Fehler sollte jedoch im Kontext der verwendeten internen Evaluation betrachtet werden.

Der wichtigste Fortschritt könnte deshalb weniger ein einzelner Spitzenwert sein. Für Entwickler und Unternehmen ist entscheidender, wie viel brauchbare Modellleistung sie für einen Dollar tatsächlich bekommen.

Genau dort setzt OpenAI mit GPT-6 Sol und Luna an.
