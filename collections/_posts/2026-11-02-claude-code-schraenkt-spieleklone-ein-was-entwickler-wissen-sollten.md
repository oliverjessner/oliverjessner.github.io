---
layout: post
title: 'Claude Code schränkt Spieleklone ein: Was Entwickler wissen sollten'
date: 2026-11-02 19:39:53 +0100
authors:
  - oliver_jessner
meta_og_type: article
categories:
  - anthropic
  - KI
  - gaming
  - software-development
description: Anthropic bremst Spieleklone mit Claude Code. Was weiterhin möglich sein soll und warum Entwickler auch bei eigenen Projekten von Ablehnungen berichten
thumbnail: /assets/images/gen/blog/claude-code-schraenkt-spieleklone-ein-was-entwickler-wissen-sollten/header_thumbnail.webp
image: /assets/images/gen/blog/claude-code-schraenkt-spieleklone-ein-was-entwickler-wissen-sollten/header.webp
faq:
  - question: Darf Claude Code weiterhin Spiele entwickeln?
    answer: Ja. Laut Anthropic soll Claude Code weiterhin eigenständige Spiele, Genre-Spiele und Projekte auf Basis eigener Entwürfe und Materialien unterstützen
  - question: Welche Spiele-Nachbauten soll Claude Code ablehnen?
    answer: Die neue Anweisung richtet sich gegen die Rekonstruktion eines konkreten bestehenden Spiels. Ein anderer Name oder die Bezeichnung als eigenes Werk soll daran nichts ändern
  - question: Ist Reverse Engineering mit Claude Code generell gesperrt?
    answer: Ein pauschales Verbot lässt sich aus der bestätigten Spiele-Regel nicht ableiten. Es gibt Berichte über Ablehnungen, deren genaue Ursachen jedoch nicht durchgehend geklärt sind
socialmedia:
  - Claude Code soll konkrete bestehende Spiele nicht mehr nachbauen. Eigene Spielideen und Genre-Spiele bleiben laut Anthropic vorgesehen. Die Abgrenzung sorgt allerdings für Diskussionen
  - 'Ein neuer Name reicht nicht: Anthropics neue Anweisung für Claude Code richtet sich auch gegen umbenannte Spieleklone. Was das für die Spieleentwicklung bedeutet'
  - 'Entwickler berichten über abgelehnte Spieleprojekte in Claude Code. Dabei lohnt sich ein genauer Blick: Eine bestätigte Regel, einzelne Nutzerberichte und offene Fragen sind auseinanderzuhalten'
news: true
pinned: false
ads: true
image_width: 1280
image_height: 720
---

Anthropic schränkt das Nachbauen bestehender Spiele mit Claude Code ein. Eigene Spielideen sollen weiter funktionieren. Berichte über Ablehnungen zeigen jedoch, wie schwierig die Abgrenzung ist.

## Was sich bei Claude Code geändert hat

Claude Code soll keine konkreten bestehenden Spiele mehr rekonstruieren. Anthropic hat dafür nach eigener Bestätigung zwei zusätzliche Sätze in die Anweisungen für Opus 5.5 aufgenommen. Über die Änderung berichtet auch [Golem](https://www.golem.de/news/spielebranche-claude-darf-keine-bekannten-games-mehr-nachbauen-2611-214734.html).

Die neue Vorgabe unterscheidet zwischen eigenständiger Spieleentwicklung und dem Nachbau eines bestimmten Titels. Auch ein anderer Name soll eine solche Rekonstruktion nicht zulässig machen.

Gegenüber [Game Developer](https://www.gamedeveloper.com/programming/anthropic-appears-to-have-ordered-ai-tool-claude-to-stop-remaking-video-games) verwies ein Anthropic-Sprecher auf eine Stellungnahme des Mitarbeiters Addy Osmani. Darin begründet er die Änderung mit den Nutzungsbedingungen zum Schutz geistigen Eigentums. Gleichzeitig erklärt er, dass eigene Spiele und Projekte mit eigenen Entwürfen und Materialien weiter unterstützt werden sollen.

Es geht damit um eine Einschränkung des vorgesehenen Verhaltens von Claude Code. Daraus lässt sich keine verlässliche technische Sperre für jeden denkbaren Spieleklon ableiten.

## Welche Spiele Claude Code weiterhin entwickeln soll

Für die praktische Arbeit ist entscheidend, dass die neue Anweisung Genre-Spiele ausdrücklich weiterhin vorsieht. Ein eigenes Jump ’n’ Run, ein Rennspiel oder ein rundenbasiertes Strategiespiel fällt dem erklärten Ziel nach weiterhin in den vorgesehenen Einsatzbereich.

Eine Aufgabenbeschreibung wie "Entwickle ein eigenes Plattformspiel mit Doppelsprung und selbst gezeichneten Figuren" beschreibt ein Genre und eigene Gestaltung. Die Aufforderung, einen konkreten veröffentlichten Titel möglichst vollständig zu reproduzieren, zielt dagegen auf genau jene Rekonstruktion, die Anthropic einschränken will.

Diese Beispiele veranschaulichen die angekündigte Abgrenzung. Sie sind keine getesteten Zusagen darüber, wie Claude auf einzelne Prompts reagiert.

Für [Gaming](https://oliverjessner.at/category/gaming/) mit KI-Unterstützung bleibt damit grundsätzlich Raum. Offen ist, wie zuverlässig das Modell eigene Projekte und konkrete Nachbauten im Einzelfall unterscheidet.

## Warum Entwickler über Ablehnungen berichten

Die Kritik betrifft vor allem die Anwendung der Regel. Im GitHub-Repository von Claude Code beschreibt ein Entwickler, dass die Arbeit an beauftragten digitalen Brettspielmodulen abgelehnt werde. Nach seiner Darstellung verwendet er eigenen Code und Materialien, die Kunden bereitstellen.

Ein Detail ist dabei wesentlich: Der Verfasser korrigierte seine ursprüngliche Beschreibung ausdrücklich. Die Projekte seien **nicht von den Spieleverlagen lizenziert**. Seine Einschätzung, dass die Arbeiten legitim seien, ist deshalb als Position des Meldenden zu lesen. Der [GitHub-Bericht](https://github.com/anthropics/claude-code/issues/106167) dokumentiert eine Beschwerde, klärt aber keine Nutzungsrechte.

Das macht den Fall für die [Softwareentwicklung](https://oliverjessner.at/category/software-development/) interessant: Ein Modell muss aus dem verfügbaren Kontext entscheiden, ob eine Aufgabe unter seine Vorgaben fällt. Für Nutzer kann dadurch auch ein bereits laufendes Projekt plötzlich ins Stocken geraten.

Osmani kündigt weitere Anpassungen an und bittet um Beispiele, wenn Claude Arbeiten an eigenen Projekten ablehnt. Das spricht dafür, dass Anthropic selbst noch Abstimmungsbedarf sieht.

## Bedeutet die Änderung ein Verbot von Reverse Engineering?

Ein allgemeines Verbot von Reverse Engineering lässt sich aus der bestätigten Spiele-Anweisung nicht ableiten.

[Tom's Hardware](https://www.tomshardware.com/tech-industry/artificial-intelligence/anthropics-ai-model-is-now-blocking-attempts-at-video-game-recreation-and-cloning-users-also-claim-non-malicious-generic-reverse-engineering-tasks-are-blocked) berichtet zwar auch über verweigerte Analysen und sicherheitsbezogene Entwicklungsaufgaben. Der Bericht weist aber darauf hin, dass unterschiedliche Schutzmechanismen beteiligt sein könnten. Ein zeitlicher Zusammenhang beweist nicht, dass jede Ablehnung durch die neue Spiele-Regel verursacht wird.

Wer sich mit alten Spielen, Portierungen oder technischen Analysen beschäftigt, sollte deshalb genau auf die jeweilige Fehlermeldung und Aufgabe schauen. Die Aussage "Claude darf keine bekannten Games mehr nachbauen" beschreibt die Stoßrichtung der Änderung. Als Erklärung für sämtliche Einschränkungen ist sie zu pauschal.

## Was bei eigenen Spieleprojekten sinnvoll ist

Aus der angekündigten Unterscheidung lassen sich einige praktische Schritte ableiten:

- **Das eigene Konzept beschreiben:** Spielablauf, Regeln und Gestaltung konkret erklären.
- **Materialien einordnen:** Angeben, welche Grafiken, Texte und Audiodateien selbst erstellt wurden und welche Nutzungsrechte vorliegen.
- **Aufgaben eingrenzen:** Beispielsweise die Kollisionsprüfung oder Speicherfunktion des eigenen Projekts bearbeiten lassen.
- **Ablehnungen dokumentieren:** Die konkrete Anfrage und Antwort festhalten, damit sich mögliche Fehlentscheidungen nachvollziehbar melden lassen.

Das dient einer klaren Projektbeschreibung. Eine Garantie für die Annahme einer Aufgabe ergibt sich daraus nicht.

## Die Grenze muss im Alltag nachvollziehbar sein

Ich halte es für nachvollziehbar, dass [Anthropic](https://oliverjessner.at/category/anthropic/) konkrete Spielekopien mit seinem Werkzeug begrenzen will. Für Entwickler zählt allerdings ebenso, ob die Grenze verständlich und im Arbeitsalltag verlässlich bleibt.

Der Maßstab sollte deshalb nicht allein sein, ob Claude einen offensichtlichen Klon verweigert. Ebenso relevant ist, ob es an einem eigenständigen Spiel weiterarbeiten kann und eine Ablehnung ausreichend erklärt.

Nach dem derzeit bestätigten Stand soll Claude Code weiterhin bei eigenen Spielen helfen. Die Rekonstruktion eines konkreten bestehenden Titels soll es dagegen ablehnen. Wie sauber diese Unterscheidung in der Praxis funktioniert, bleibt die entscheidende offene Frage.
