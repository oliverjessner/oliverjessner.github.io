---
layout: post
title: 'GPT-5.6 Kontextfenster: Was bringen 1,05 Millionen Token?'
date: 2026-07-13 12:40:09 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - openai
    - KI
    - software-development
description: 'GPT-5.6 verarbeitet bis zu 1,05 Millionen Token. Was das bei Code, Dokumenten und langen KI-Workflows praktisch bringt'
thumbnail: '/assets/images/gen/blog/gpt-5-6-kontextfenster-was-bringen-1-05-millionen-token/header_thumbnail.webp'
image: '/assets/images/gen/blog/gpt-5-6-kontextfenster-was-bringen-1-05-millionen-token/header.webp'
faq:
    - question: 'Wie groß ist das Kontextfenster von GPT-5.6?'
      answer: 'OpenAI gibt für GPT-5.6 Sol, Terra und Luna in der API ein Kontextfenster von 1.050.000 Token an. Darin müssen Eingabe, Ausgabe und je nach Modell auch Reasoning-Token Platz finden.'
    - question: 'Sind 1,05 Millionen Token dasselbe wie 1,05 Millionen Wörter?'
      answer: 'Nein. Wörter können aus einem oder mehreren Token bestehen. Die genaue Menge hängt von Sprache, Formatierung, Quellcode und Sonderzeichen ab.'
    - question: 'Ersetzt das große Kontextfenster eine Vektordatenbank oder RAG?'
      answer: 'Nicht grundsätzlich. Für klar begrenzte Datenbestände kann das große Fenster die Architektur vereinfachen. Bei wachsenden oder häufig aktualisierten Daten bleibt eine gezielte Suche meist effizienter.'
socialmedia:
    - '1,05 Millionen Token klingen nach grenzenlosem Gedächtnis. Tatsächlich ist das Kontextfenster von GPT-5.6 vor allem ein größerer Arbeitsbereich. Ich erkläre, wann er bei Code, Dokumenten und Agenten hilft und wo die Grenzen bleiben.'
    - 'Eine komplette Codebasis in einen Prompt legen? Mit GPT-5.6 rückt das näher. Doch mehr Kontext kostet, kann wichtige Details verwässern und ersetzt keine saubere Auswahl der Daten.'
    - 'GPT-5.6 bietet in der API ein Kontextfenster von 1,05 Millionen Token. Entscheidend ist nicht nur, wie viel hineinpasst, sondern ob das Modell die wichtigen Stellen darin zuverlässig findet.'
---

GPT-5.6 kann in der API bis zu 1,05 Millionen Token in einem Kontext verarbeiten. Das ist vor allem für große Codebasen, Dokumente und lange Agenten-Workflows interessant.

## Was ein Kontextfenster überhaupt ist

Das Kontextfenster ist der Arbeitsbereich eines Sprachmodells. Darin befinden sich unter anderem die aktuelle Eingabe, frühere Nachrichten, Systemanweisungen, Dokumente, Quellcode, Ergebnisse von Werkzeugen und die vom Modell erzeugte Antwort.

Es handelt sich nicht um ein dauerhaftes Gedächtnis. Informationen im Kontextfenster werden auch nicht automatisch Teil des trainierten Wissens des Modells. Sie stehen lediglich während der jeweiligen Verarbeitung zur Verfügung.

Die [Dokumentation von OpenAI](https://developers.openai.com/api/docs/guides/conversation-state) beschreibt das Kontextfenster als gemeinsames Budget für Eingabe und Ausgabe. Bei Reasoning-Modellen können zusätzlich interne Reasoning-Token einen Teil dieses Budgets belegen.

Ein größeres Fenster bedeutet daher zunächst nur: Das Modell kann bei einer Anfrage mehr Material gleichzeitig berücksichtigen.

## Was 1,05 Millionen Token konkret bedeuten

Die API-Modellseiten führen für GPT-5.6 Sol, Terra und Luna jeweils ein Kontextfenster von 1.050.000 Token auf. Die maximale Ausgabe ist bei allen drei Modellen auf 128.000 Token begrenzt.

Token sind keine Wörter. Ein häufig verwendetes deutsches Wort kann aus einem Token bestehen, ein zusammengesetztes Wort aus mehreren. Quellcode, Tabellen, URLs und ungewöhnliche Zeichenfolgen werden ebenfalls unterschiedlich zerlegt.

Als grobe Größenordnung entsprechen 1,05 Millionen Token mehreren hunderttausend Wörtern. Je nach Sprache und Format kann damit Material im Umfang von deutlich mehr als tausend normalen Textseiten verarbeitet werden.

Die konkrete Zahl ist jedoch weniger wichtig als die neue Größenordnung. Eine Anfrage muss nicht mehr auf einige einzelne Dokumente oder ausgewählte Dateien begrenzt bleiben. In vielen Fällen kann ein vollständiger Arbeitsbestand in Reichweite kommen.

## Große Codebasen lassen sich zusammenhängender analysieren

Für die [Softwareentwicklung](https://oliverjessner.at/category/software-development/) ist das große Kontextfenster besonders interessant.

Ein Coding-Agent kann mehr Dateien gleichzeitig sehen. Dazu gehören beispielsweise:

- Anwendungscode
- Tests
- Datenbankschemas
- Konfigurationsdateien
- API-Definitionen
- Migrationsdateien
- technische Dokumentation
- relevante Auszüge aus Issues und Pull Requests

Dadurch werden Aufgaben möglich, bei denen Änderungen über viele Teile eines Projekts hinweg verstanden werden müssen. Das Modell kann beispielsweise prüfen, wie ein Datenfeld vom Datenbankschema über das Backend bis zur Benutzeroberfläche verarbeitet wird.

Bei kleineren und mittleren Projekten kann sogar ein großer Teil der Codebasis in eine Anfrage passen. Das bedeutet allerdings nicht, dass jeder Ordner übertragen werden sollte. Abhängigkeiten, generierte Dateien, Build-Artefakte, Binärdateien und große Lockfiles benötigen viel Platz, ohne für die Aufgabe zwingend hilfreich zu sein.

Auch mit einem großen Kontextfenster bleibt eine saubere Auswahl sinnvoll.

## Dokumente können gemeinsam statt einzeln ausgewertet werden

Ein weiterer Anwendungsbereich sind umfangreiche Dokumentensammlungen.

Statt einzelne Dateien nacheinander zusammenzufassen, kann GPT-5.6 mehrere Quellen gemeinsam betrachten. Das hilft unter anderem bei:

- dem Vergleich verschiedener Vertragsversionen
- der Auswertung langer Studien und ihrer Anhänge
- der Analyse technischer Spezifikationen
- der Zusammenführung von Interviewtranskripten
- der Prüfung von Protokollen und Projektdokumentationen
- der Suche nach Widersprüchen zwischen mehreren Berichten

Der Vorteil liegt nicht nur in der Menge. Beziehungen zwischen weit voneinander entfernten Stellen bleiben eher erhalten. Eine Definition aus dem ersten Dokument kann direkt mit einer späteren Tabelle oder einer abweichenden Formulierung verglichen werden.

Für Recherche und [KI](https://oliverjessner.at/category/ki/) gestützte Wissensarbeit kann das viele Zwischenschritte reduzieren.

## Lange Agenten-Workflows verlieren weniger Vorgeschichte

Agenten arbeiten häufig über zahlreiche Schritte hinweg. Sie lesen Dateien, führen Befehle aus, durchsuchen Quellen, erzeugen Zwischenergebnisse und korrigieren ihre eigene Arbeit.

Jeder dieser Schritte produziert neue Token. Bei kleineren Kontextfenstern muss die bisherige Arbeit deshalb regelmäßig zusammengefasst oder entfernt werden. Dabei können Details verloren gehen.

Mit 1,05 Millionen Token kann ein Workflow deutlich länger laufen, bevor eine solche Komprimierung notwendig wird. Ein Agent kann mehr frühere Entscheidungen, Fehlermeldungen und Werkzeugausgaben im unmittelbaren Kontext behalten.

Das ist besonders hilfreich bei Aufgaben wie:

- umfangreichen Refactorings
- Migrationen zwischen Frameworks
- der Fehlersuche über mehrere Dienste hinweg
- längeren Datenanalysen
- mehrstufigen Recherchen
- der Erstellung größerer Dokumente und Präsentationen

Das Kontextfenster ersetzt dabei keine gute Zustandsverwaltung. Es verschiebt lediglich den Zeitpunkt, an dem Informationen verdichtet oder ausgelagert werden müssen.

## Mehr Kontext bedeutet nicht automatisch bessere Antworten

Ein großes Kontextfenster ist eine Kapazitätsangabe, keine Garantie für perfekte Aufmerksamkeit.

Je mehr Informationen eine Anfrage enthält, desto schwieriger wird es, relevante von irrelevanten Details zu unterscheiden. Wiederholungen, widersprüchliche Versionen und unnötige Dateien können die Qualität verschlechtern.

Auch die von [OpenAI veröffentlichten Langkontext-Benchmarks](https://openai.com/index/gpt-5-6/) zeigen, dass die Leistung bei sehr großen Datenmengen nicht perfekt ist. GPT-5.6 Sol erreicht im MRCR-Test für den Bereich zwischen 512.000 und einer Million Token 73,8 Prozent. Bei GraphWalks BFS mit einer Million Token nennt OpenAI einen F1-Wert von 77,1 Prozent.

Diese Werte zeigen eine deutliche Langkontext-Fähigkeit. Sie zeigen aber ebenso, dass Informationen am äußersten Rand des Fensters nicht in jeder Aufgabe zuverlässig verarbeitet werden.

In der Praxis bleibt es sinnvoll, eine klare Aufgabe zu formulieren, relevante Quellen zu kennzeichnen und unnötiges Material vorab zu entfernen.

## 1,05 Millionen Token sind nicht nur für die Eingabe verfügbar

Die Zahl von 1.050.000 Token bezeichnet das gesamte Kontextfenster. Sie darf deshalb nicht mit einer ebenso großen maximalen Eingabe verwechselt werden.

Innerhalb des Fensters benötigen mehrere Bestandteile Platz:

- der Prompt
- System- und Entwickleranweisungen
- übertragene Dokumente und Bilder
- frühere Nachrichten
- Antworten von Werkzeugen
- Reasoning-Token
- die erzeugte Ausgabe

Soll das Modell eine lange Antwort erstellen oder intensiv über eine Aufgabe nachdenken, muss dafür ausreichend Platz reserviert bleiben.

Die maximale Ausgabe von GPT-5.6 liegt laut [Modellseite von GPT-5.6 Sol](https://developers.openai.com/api/docs/models/gpt-5.6-sol) bei 128.000 Token. Eine Eingabe nahe der vollständigen Kontextgrenze kann daher nicht gleichzeitig mit der maximalen Ausgabe kombiniert werden.

## Sehr große Prompts werden teurer

Ein großes Kontextfenster ist nicht kostenlos.

GPT-5.6 Sol kostet regulär 5 US-Dollar pro Million Eingabetoken und 30 US-Dollar pro Million Ausgabetoken. Für Prompts mit mehr als 272.000 Eingabetoken gelten laut OpenAI höhere Preise. Der gesamte Request wird dann mit dem doppelten Eingabepreis und dem 1,5-fachen Ausgabepreis berechnet.

Eine nicht zwischengespeicherte Eingabe mit ungefähr einer Million Token kostet bei GPT-5.6 Sol damit rund 10 US-Dollar. Die Ausgabe und mögliche Werkzeugaufrufe kommen zusätzlich hinzu.

Bei einzelnen Analysen kann das vertretbar sein. Werden jedoch bei jeder kleinen Rückfrage erneut Hunderttausende Token übertragen, steigen Kosten und Latenz schnell an.

Prompt-Caching kann wiederverwendete Inhalte günstiger machen. Trotzdem bleibt eine Architektur sinnvoll, die große Datenbestände nicht unnötig bei jeder Anfrage erneut verarbeitet.

## Das Kontextfenster ersetzt RAG nicht vollständig

Retrieval-Augmented Generation, kurz RAG, sucht zunächst gezielt nach relevanten Textstellen und übergibt nur diese an das Modell.

Bei 1,05 Millionen Token stellt sich die berechtigte Frage, ob dieser zusätzliche Schritt noch notwendig ist. Für abgeschlossene und überschaubare Datenbestände kann die Antwort tatsächlich manchmal Nein lauten.

Ein ganzes Handbuch, ein Projektarchiv oder eine Codebasis direkt zu übertragen, kann einfacher sein als eine eigene Vektorsuche aufzubauen. Das gilt besonders für selten ausgeführte Analysen, bei denen Vollständigkeit wichtiger als minimale Kosten ist.

RAG bleibt jedoch sinnvoll, wenn:

- der Datenbestand größer als das Kontextfenster ist
- sich Inhalte häufig ändern
- nur wenige Quellen pro Anfrage relevant sind
- niedrige Antwortzeiten wichtig sind
- dieselben Dokumente sehr häufig abgefragt werden
- Zugriffsrechte pro Dokument berücksichtigt werden müssen

Das große Fenster ersetzt daher nicht jede Sucharchitektur. Es erweitert die Auswahl möglicher Architekturen.

## API und ChatGPT sollten nicht gleichgesetzt werden

Die 1,05 Millionen Token sind ausdrücklich auf den Modellseiten der OpenAI API dokumentiert.

Das bedeutet nicht automatisch, dass jede normale Unterhaltung in ChatGPT das vollständige API-Kontextfenster bereitstellt. ChatGPT kann eigene Grenzen, Dateiverarbeitung und Komprimierungsmechanismen verwenden. Die aktuelle [ChatGPT-Dokumentation zu GPT-5.6](https://help.openai.com/en/articles/20001354) nennt die Verfügbarkeit von Sol für die Reasoning-Stufen Medium, High und Extra High, weist dort aber kein identisches Kontextlimit für normale Chats aus.

Wer eine Anwendung entwickelt und sich auf eine konkrete Tokenzahl verlassen muss, sollte daher die Angaben des jeweiligen Produkts und Endpunkts prüfen.

Die Unterschiede zwischen [GPT-5.6 Sol, Terra und Luna](https://oliverjessner.at/blog/2026-07-09-gpt-56-sol-terra-und-luna-was-ist-der-unterschied/) betreffen vor allem Leistung, Geschwindigkeit und Kosten. Das Kontextfenster ist laut API-Dokumentation bei allen drei Modellen gleich groß.

## Was das große Kontextfenster wirklich verändert

Der wichtigste Fortschritt liegt nicht darin, dass nun möglichst viel Text in einen Prompt kopiert werden kann.

Interessant wird das Kontextfenster dort, wo eine Aufgabe bisher künstlich zerlegt werden musste. GPT-5.6 kann mehr Dateien, mehr Vorgeschichte und mehr Zwischenergebnisse gemeinsam betrachten. Dadurch sinkt das Risiko, dass beim Aufteilen wichtige Verbindungen verloren gehen.

Gleichzeitig verschiebt sich das Problem. Die entscheidende Frage lautet nicht mehr nur, ob die Daten in das Fenster passen. Es geht stärker darum, welche Daten relevant sind, wie sie strukturiert werden und ob die Verarbeitungskosten zum Anwendungsfall passen.

1,05 Millionen Token sind deshalb kein grenzenloses Gedächtnis. Sie sind ein großer Arbeitsbereich. Richtig genutzt kann dieser Arbeitsbereich komplexe Analysen und lange Workflows deutlich vereinfachen.
