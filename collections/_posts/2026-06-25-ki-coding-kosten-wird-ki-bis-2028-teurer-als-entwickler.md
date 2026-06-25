---
layout: post
title: 'KI-Coding-Kosten: Wird KI bis 2028 teurer als Entwickler?'
date: 2026-06-25 10:59:23 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - vibecoding
    - Arbeitswelt
description: 'KI-Coding-Kosten steigen mit Tokenverbrauch und Coding-Agenten. Warum der Vergleich mit Entwicklergehältern trotzdem zu kurz greift'
thumbnail: '/assets/images/gen/blog/ki-coding-kosten-wird-ki-bis-2028-teurer-als-entwickler/header_thumbnail.webp'
image: '/assets/images/gen/blog/ki-coding-kosten-wird-ki-bis-2028-teurer-als-entwickler/header.webp'
faq:
    - question: 'Werden KI-Coding-Tools bis 2028 wirklich teurer als Entwickler?'
      answer: 'Gartner prognostiziert, dass die Kosten für KI-gestützte Softwareentwicklung bis 2028 ein durchschnittliches Entwicklergehalt übersteigen könnten. Die öffentliche Mitteilung lässt jedoch offen, ob sich der Vergleich auf einen Entwickler, ein Team, ein Projekt oder eine ganze Organisation bezieht.'
    - question: 'Warum steigen die Kosten von Coding-Agenten?'
      answer: 'Coding-Agenten lesen Quellcode, laden Kontext, rufen Werkzeuge auf, führen Tests aus und wiederholen Arbeitsschritte. Dadurch entstehen mehr Modellaufrufe und ein höherer Tokenverbrauch als bei einfachen Coding-Assistenten.'
    - question: 'Welche Kennzahlen eignen sich für die Kosten von KI-Coding?'
      answer: 'Aussagekräftig sind Kosten pro akzeptierter Codeänderung, Review-Zeit, Nacharbeit, Fehlerquote, Durchlaufzeit und der tatsächlich erreichte Nutzen. Reine Tokenkosten zeigen nur den Verbrauch.'
socialmedia:
    - 'Gartner erwartet, dass KI-Coding-Kosten bis 2028 ein Entwicklergehalt übersteigen. Doch ohne klare Bezugsgröße sagt der Vergleich wenig darüber aus, ob Coding-Agenten wirtschaftlich arbeiten.'
    - 'Tokenkosten zeigen Verbrauch, aber keinen Nutzen. Für KI-Coding zählen Kosten pro akzeptierter Änderung, Review-Zeit, Fehlerquote und die tatsächlich eingesparte Entwicklungszeit.'
    - 'Coding-Agenten können Entwicklung beschleunigen. Ohne begrenzten Kontext, Kostenlimits und klare Erfolgskriterien werden agentische Workflows jedoch schnell teuer und schwer messbar.'
---

Gartner erwartet, dass KI-Coding-Kosten bis 2028 ein durchschnittliches Entwicklergehalt übersteigen. Entscheidend ist aber nicht der Tokenpreis, sondern der Preis einer geprüften Änderung.

## KI-Coding-Kosten bis 2028 – was Gartner wirklich prognostiziert

Die Kosten für KI-gestützte Softwareentwicklung könnten bis 2028 höher ausfallen als das durchschnittliche Gehalt eines Entwicklers. Das berichtet [Golem.de unter Berufung auf Gartner](https://www.golem.de/news/ki-teurer-als-der-mensch-bis-2028-uebersteigen-coding-kosten-das-entwicklergehalt-2606-210168.html).

Als Gründe nennt das Marktforschungsunternehmen den steigenden Tokenverbrauch, verbrauchsabhängige Preismodelle und den wachsenden Einsatz autonom arbeitender Coding-Agenten. Unternehmen würden bei der Nutzung häufig Geschwindigkeit und Leistungsfähigkeit priorisieren, während die Kosteneffizienz eine geringere Rolle spiele.

Die Prognose greift damit einen realen Trend auf. Coding-Assistenten entwickeln sich von vergleichsweise einfach kalkulierbaren Werkzeugen zu agentischen Systemen, die eigenständig mehrere Arbeitsschritte ausführen können. Dadurch steigt nicht nur ihr Funktionsumfang, sondern auch der Verbrauch von Rechenleistung und Tokens.

Die Schlagzeile, KI-Coding werde teurer als ein Entwickler, klingt dennoch präziser, als es die öffentlich verfügbaren Angaben erlauben.

Die [Mitteilung von Gartner zu den KI-Coding-Kosten](https://www.gartner.com/en/newsroom/press-releases/2026-06-24-gartner-predicts-ai-coding-costs-will-surpass-average-developer-salary-by-2028-as-token-consumption-surges) nennt keine konkrete Kostenrechnung. Offen bleibt, ob sich die Ausgaben auf einen einzelnen Entwickler, ein Team, ein Projekt oder eine gesamte Organisation beziehen.

Auch die zugrunde gelegte Region, das angenommene Entwicklergehalt und der Umfang der KI-Nutzung werden nicht näher erläutert. Ohne diese Bezugsgrößen lässt sich die Prognose weder nachvollziehen noch auf ein konkretes Unternehmen übertragen.

Die Gartner-Aussage ist daher vor allem als Warnung zu verstehen: Wer Coding-Agenten intensiv einsetzt, muss mit einer anderen Kostenstruktur rechnen als bei klassischen Entwicklerwerkzeugen.

## Warum KI-Coding teurer werden kann

Viele Coding-Assistenten wurden zunächst als monatliches Abonnement angeboten. Entwickler zahlten einen festen Betrag und erhielten dafür Codevorschläge, Erklärungen oder Unterstützung bei einzelnen Aufgaben.

Coding-Agenten arbeiten anders. Sie beantworten nicht nur eine Frage, sondern können vollständige Arbeitsabläufe übernehmen. Ein Agent kann beispielsweise:

- ein Repository durchsuchen
- relevante Dateien und Dokumentationen lesen
- Abhängigkeiten analysieren
- Änderungen an mehreren Dateien vornehmen
- Tests und Build-Prozesse starten
- Fehlermeldungen auswerten
- den eigenen Lösungsversuch überarbeiten
- einen Pull Request vorbereiten

Jeder dieser Schritte kann zusätzliche Modellaufrufe auslösen. Wird ein Test nicht bestanden, beginnt eine neue Schleife. Der Agent lädt erneut Kontext, analysiert die Fehlermeldung, verändert den Code und führt den Test noch einmal aus.

Aus einem einzelnen Auftrag können so Dutzende oder Hunderte Modellinteraktionen entstehen. Genau dadurch unterscheiden sich die Kosten agentischer Softwareentwicklung von den Kosten eines klassischen Chatbots oder einer einfachen Autovervollständigung.

## Welche Kosten beim Programmieren mit KI entstehen

Die sichtbaren Lizenz- oder API-Gebühren bilden nur einen Teil der gesamten KI-Coding-Kosten ab.

Zu einer vollständigen Betrachtung gehören:

- Eingabe- und Ausgabetokens
- wiederholte Agentenschleifen
- große Kontextfenster
- Modell- und API-Aufrufe
- Rechenzeit für Tests und Builds
- zusätzliche Cloud-Infrastruktur
- Protokollierung und Kostenüberwachung
- Sicherheits- und Datenschutzprüfungen
- menschliche Code-Reviews
- Korrekturen und spätere Nacharbeit

Besonders relevant sind die indirekten Kosten. Günstig generierter Code ist nicht automatisch günstige [Softwareentwicklung](https://oliverjessner.at/category/software-engineering/).

Enthält ein Vorschlag falsche Annahmen, unnötige Abstraktionen oder schwer erkennbare Sicherheitsprobleme, entstehen die eigentlichen Kosten häufig erst nach der Generierung. Entwickler müssen den Code verstehen, korrigieren, testen und langfristig warten.

Ein Agent kann deshalb niedrige Tokenkosten verursachen und trotzdem wirtschaftlich ineffizient arbeiten. Umgekehrt kann ein teurer Modellaufruf sinnvoll sein, wenn er eine komplexe Migration deutlich beschleunigt oder einen schwer reproduzierbaren Fehler findet.

## Tokenkosten sind nicht gleich KI-Coding-Kosten

Bei vielen Diskussionen über KI-Coding stehen die [Preise für Eingabe- und Ausgabetokens](https://oliverjessner.at/blog/2026-05-27-tokenmaxxing-wenn-ki-nutzung-zur-falschen-kennzahl-wird/) im Mittelpunkt. Sie sind leicht messbar und lassen sich zwischen Modellen vergleichen.

Für die tatsächliche Wirtschaftlichkeit reicht diese Kennzahl jedoch nicht aus.

Ein günstiges Modell kann mehrere erfolglose Versuche benötigen. Ein leistungsfähigeres Modell kann dieselbe Aufgabe mit einem einzelnen, teureren Aufruf lösen. Der niedrigere Preis pro Token führt dann nicht automatisch zu niedrigeren Gesamtkosten.

Auch die Länge der erzeugten Antwort sagt wenig über ihren Wert aus. Entscheidend ist, ob der Code:

- die gestellte Aufgabe erfüllt
- zum bestehenden System passt
- die vorhandenen Konventionen einhält
- automatisierte Tests besteht
- keine neuen Sicherheitsprobleme erzeugt
- von Entwicklern nachvollzogen werden kann
- langfristig wartbar bleibt

Tokenkosten messen Verbrauch. Sie messen weder Codequalität noch Produktivität oder Geschäftsnutzen.

## Warum große Kontextfenster teuer werden

Viele Entwickler stellen einem Coding-Agenten möglichst viel Kontext zur Verfügung. Das erscheint zunächst sinnvoll. Je mehr das Modell über eine Anwendung weiß, desto passender sollten seine Vorschläge sein.

In der Praxis ist mehr Kontext jedoch nicht automatisch besserer Kontext.

Werden bei jedem Arbeitsschritt große Teile eines Repositorys, umfangreiche Dokumentationen und lange Protokolle verarbeitet, steigt der Tokenverbrauch deutlich. Gleichzeitig können irrelevante Informationen die Qualität der Antwort verschlechtern.

Ein Coding-Agent muss für eine kleine Änderung an einer API-Route möglicherweise nicht die gesamte Codebasis kennen. Häufig reichen die betroffene Datei, verwendete Datentypen, relevante Tests und einige Projektregeln.

Gezielt ausgewählter Kontext kann deshalb gleichzeitig:

- KI-Coding-Kosten senken
- Modellantworten beschleunigen
- irrelevante Vorschläge reduzieren
- die Nachvollziehbarkeit verbessern
- Datenschutzrisiken begrenzen

Context Engineering wird damit zu einem praktischen Bestandteil moderner Entwicklungsarbeit. Teams müssen nicht nur gute Aufgaben formulieren, sondern auch entscheiden, welche Informationen ein Agent für diese Aufgabe wirklich benötigt.

## Ist ein Entwicklergehalt die richtige Vergleichsgröße?

Die Gegenüberstellung von KI-Coding-Kosten und Entwicklergehältern suggeriert, beide Größen seien direkt austauschbar. Das ist in den meisten Unternehmen nicht der Fall.

Entwickler schreiben nicht nur Code. Sie klären Anforderungen, sprechen mit Fachbereichen, priorisieren technische Schulden, treffen Architekturentscheidungen, bewerten Risiken und übernehmen Verantwortung für produktive Systeme.

Coding-Agenten können Teile dieser Arbeit unterstützen. Sie können Quellcode durchsuchen, Implementierungen vorbereiten oder Tests erzeugen. Sie ersetzen aber nicht automatisch die Rolle, die hinter einem Entwicklergehalt steht.

Die Rechnung "Der Agent kostet weniger als ein Entwickler, also spart das Unternehmen Geld" ist daher ebenso unvollständig wie die umgekehrte Aussage "Der Agent kostet mehr als ein Entwickler, also lohnt sich die Nutzung nicht".

In beiden Fällen fehlt der erreichte Nutzen.

Ein teures KI-System kann wirtschaftlich sinnvoll sein, wenn es eine kritische Migration beschleunigt, Ausfallzeiten reduziert oder einem kleinen Team die Wartung einer komplexen Anwendung erleichtert.

Ein günstiger Coding-Assistent kann dagegen teuer werden, wenn seine Vorschläge zusätzliche Review-Zeit, Fehler und technische Schulden verursachen.

## Ersetzt KI Entwickler, wenn sie ähnlich viel kostet?

Die Höhe der KI-Coding-Kosten beantwortet nicht die Frage, ob KI Entwickler ersetzt.

Ein Werkzeug ersetzt einen Beruf nicht allein deshalb, weil seine Nutzung ähnlich viel kostet wie ein Beschäftigter. Entscheidend ist, welche Aufgaben das Werkzeug zuverlässig übernehmen kann und welche Verantwortung weiterhin bei Menschen liegt.

Coding-Agenten können besonders bei strukturierten und überprüfbaren Aufgaben produktiv sein. Dazu gehören:

- einfache Tests erzeugen
- wiederkehrende Codeänderungen durchführen
- Schnittstellen anpassen
- Dokumentation aktualisieren
- betroffene Dateien finden
- bekannte Fehlermuster untersuchen
- überschaubare Migrationen vorbereiten

Schwieriger wird es bei offenen Aufgaben ohne eindeutige Erfolgskriterien. Dazu zählen unklare Produktanforderungen, weitreichende Architekturentscheidungen oder Änderungen, deren Auswirkungen erst im Zusammenspiel mehrerer Systeme sichtbar werden.

Für die [Arbeitswelt](https://oliverjessner.at/category/Arbeitswelt/) ist deshalb weniger entscheidend, ob Mensch oder Maschine isoliert günstiger arbeitet. Relevant ist, wie sich Aufgaben, Verantwortung und Kontrolle innerhalb eines Teams verändern.

## KI-Coding-Kosten sinnvoll messen

Unternehmen sollten KI-Coding nicht nur anhand von Lizenzen, Modellpreisen oder verbrauchten Tokens bewerten. Sinnvoller ist eine Messung entlang des gesamten Entwicklungsprozesses.

| Kennzahl                         | Was sie zeigt                                                     |
| -------------------------------- | ----------------------------------------------------------------- |
| Kosten pro akzeptierter Änderung | Wie viel eine tatsächlich übernommene Codeänderung kostet         |
| Zeit bis zum Pull Request        | Ob der Agent die Durchlaufzeit verkürzt                           |
| Akzeptanzquote                   | Wie viele Vorschläge unverändert oder angepasst übernommen werden |
| Review-Zeit                      | Wie viel menschliche Kontrolle erforderlich ist                   |
| Nacharbeit                       | Wie häufig generierter Code korrigiert werden muss                |
| Fehlerquote                      | Ob nach der Auslieferung zusätzliche Probleme entstehen           |
| Testabdeckung                    | Ob die Änderung ausreichend überprüft wurde                       |
| Wartbarkeit                      | Ob der Code langfristig verständlich bleibt                       |

Diese Kennzahlen verbinden Kosten mit einem Ergebnis. Sie machen sichtbar, ob ein Agent tatsächlich produktiver arbeitet oder lediglich mehr Code erzeugt.

Besonders aussagekräftig sind die Kosten pro akzeptierter und geprüfter Änderung. Diese Kennzahl berücksichtigt, dass nicht jeder generierte Vorschlag einen wirtschaftlichen Wert besitzt.

## Kosten pro Ergebnis statt Kosten pro Token

Für eine realistische Bewertung sollten Unternehmen den gesamten Weg von der Aufgabe bis zur produktiven Änderung betrachten.

Dazu gehören:

1. die Formulierung der Aufgabe
2. die Auswahl des Modells
3. der bereitgestellte Kontext
4. die Ausführung des Agenten
5. automatisierte Tests
6. menschliches Review
7. notwendige Korrekturen
8. spätere Fehler und Wartungsaufwand

Erst danach lässt sich beurteilen, ob ein KI-Workflow günstiger oder teurer als eine konventionelle Umsetzung war.

Die relevante Frage lautet daher nicht: "Wie viele Tokens hat der Agent verbraucht?"

Sie lautet: "Was hat eine geprüfte, akzeptierte und wartbare Änderung gekostet?"

Diese Perspektive verhindert auch eine falsche Optimierung. Ein Team könnte den Tokenverbrauch reduzieren und gleichzeitig mehr menschliche Nacharbeit erzeugen. Auf dem API-Dashboard sähe das effizient aus, während die gesamten Entwicklungskosten steigen.

## Wo Coding-Agenten wirtschaftlich sinnvoll sind

Coding-Agenten eignen sich besonders für Aufgaben mit klaren Grenzen und überprüfbaren Ergebnissen.

Wirtschaftlich sinnvoll kann ihr Einsatz sein, wenn:

- die Aufgabe eindeutig beschrieben ist
- relevante Dateien bekannt sind
- automatisierte Tests vorhanden sind
- das Ergebnis schnell überprüft werden kann
- Fehler keine unkontrollierbaren Folgen haben
- der Agent wiederkehrende Arbeit übernimmt

Ein Beispiel ist die Anpassung einer bestehenden Schnittstelle in mehreren ähnlich aufgebauten Dateien. Der Agent kann betroffene Stellen finden, Änderungen durchführen und vorhandene Tests ausführen.

Weniger geeignet sind Aufgaben, bei denen der Agent zunächst selbst herausfinden muss, welches Problem eigentlich gelöst werden soll. Ohne klare Grenzen kann er lange Lösungswege verfolgen, immer neuen Kontext laden und mehrere Varianten erzeugen, ohne einem belastbaren Ergebnis näherzukommen.

Die KI-Coding-Kosten steigen dann, während der tatsächliche Fortschritt schwer messbar bleibt.

## Wie Teams die Kosten von Coding-Agenten begrenzen

Kostenkontrolle sollte Teil des normalen Entwicklungsprozesses sein und nicht erst beginnen, wenn eine hohe Rechnung eintrifft.

Ein pragmatischer Umgang mit Coding-Agenten kann so aussehen:

1. Für jede Aufgabe wird ein überprüfbares Ergebnis definiert.
2. Kleine Aufgaben laufen zunächst über günstigere Modelle.
3. Leistungsfähigere Modelle werden nur bei ausreichender Komplexität eingesetzt.
4. Agenten erhalten gezielt ausgewählten Kontext.
5. Laufzeit, Tokenverbrauch und Modellkosten werden protokolliert.
6. Agentenschleifen erhalten klare Abbruchbedingungen.
7. Auffällig teure Aufgaben werden im Team untersucht.
8. Änderungen gelangen erst nach Tests und Review in produktive Systeme.

Zusätzlich können Unternehmen Budgets pro Entwickler, Repository oder Projekt festlegen. Ein einzelner Agent sollte nicht unbegrenzt weiterarbeiten können, nur weil er noch keinen erfolgreichen Lösungsweg gefunden hat.

Dabei geht es nicht darum, Entwickler zu Token-Buchhaltern zu machen. Die eingesetzten Werkzeuge müssen verständlich anzeigen, welche Aufgabe welche Kosten verursacht hat.

Ohne diese Transparenz können Teams weder Modelle vergleichen noch unwirtschaftliche Workflows erkennen.

## Sinkende Tokenpreise lösen das Kostenproblem nicht

Die Preise einzelner KI-Modelle können in den kommenden Jahren weiter sinken. Daraus folgt jedoch nicht automatisch, dass Unternehmen weniger für KI-Coding ausgeben.

Günstigere Modellaufrufe können dazu führen, dass Agenten:

- häufiger eingesetzt werden
- größere Aufgaben erhalten
- mehr Dateien analysieren
- länger autonom arbeiten
- zusätzliche Tests ausführen
- mehr Lösungsvarianten erzeugen

Der Preis pro Token kann sinken, während der gesamte Tokenverbrauch deutlich schneller steigt.

Dieses Verhalten ist aus anderen Bereichen bekannt. Werden einzelne Ressourcen günstiger, werden sie häufig intensiver genutzt. Am Ende sinken die Gesamtausgaben nicht zwingend.

Für KI-Coding bedeutet das: Unternehmen müssen nicht nur Modellpreise vergleichen, sondern auch beobachten, wie sich die Nutzung innerhalb ihrer Teams verändert.

## Die eigentliche Warnung hinter Gartners Prognose

Die Gartner-Prognose beweist nicht, dass [KI](https://oliverjessner.at/category/KI/) Entwickler wirtschaftlich verdrängt oder Programmieren mit KI grundsätzlich zu teuer wird. Dafür bleibt die veröffentlichte Berechnungsgrundlage zu unklar.

Sie weist aber auf ein reales Problem hin: Viele Unternehmen führen Coding-Agenten ein, bevor sie deren Kosten, Qualität und Nutzen zuverlässig messen können.

Solange ein monatliches Abonnement den Großteil der Ausgaben abdeckt, fällt diese Lücke kaum auf. Bei autonomen und verbrauchsabhängig abgerechneten Systemen kann dieselbe Nachlässigkeit schnell zu schwer kalkulierbaren Kosten führen.

Unternehmen benötigen deshalb keine einfache Antwort auf die Frage, ob KI oder ein Entwickler günstiger ist. Sie müssen wissen, für welche Aufgaben Coding-Agenten geeignet sind, welche Ergebnisse sie liefern und welcher Aufwand bis zu einer geprüften Änderung entsteht.

Die entscheidende Frage lautet nicht, ob KI-Coding im Jahr 2028 mehr kostet als ein Entwicklergehalt.

Entscheidend ist, ob ein Unternehmen weiß, was eine mit KI unterstützte, getestete und langfristig wartbare Codeänderung tatsächlich kostet.
