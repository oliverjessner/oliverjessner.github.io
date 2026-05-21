---
layout: post
title: 'Vibe Coding – meine Meinung hat sich geändert'
date: 2026-05-21 14:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - KI
    - vibecoding
description: 'Vibe Coding kann interne Software radikal beschleunigen, aber ohne Engineering-Verständnis entstehen schnell fragile Systeme'
thumbnail: '/assets/images/gen/blog/vibe-coding-meine-meinung-hat-sich-geaendert/header_thumbnail.webp'
image: '/assets/images/gen/blog/vibe-coding-meine-meinung-hat-sich-geaendert/header.webp'
faq:
    - question: 'Ersetzt Vibe Coding klassische Softwareentwicklung?'
      answer: 'Nein. Vibe Coding kann Entwicklung stark beschleunigen, ersetzt aber nicht automatisch Architektur, Sicherheit, Testing, UX und Produktverständnis.'
    - question: 'Für wen ist Vibe Coding besonders nützlich?'
      answer: 'Es ist besonders nützlich für Menschen mit technischem Verständnis, die schnell Prototypen, interne Tools oder erste Produktversionen bauen wollen.'
    - question: 'Wo liegt das größte Risiko beim Vibe Coding?'
      answer: 'Das größte Risiko liegt darin, funktionierende Oberflächen mit belastbarer Software zu verwechseln. Gerade bei Hosting, Security, Payments und Datenmodellen entstehen schnell Probleme.'
---

Vibe Coding hat mich zuerst euphorisch gemacht. Heute sehe ich klarer: Es kann Softwareentwicklung massiv beschleunigen. Aber es macht fehlendes Engineering-Verständnis nicht automatisch wett.

## Warum ich Vibe Coding anfangs überschätzt habe

Ich komme aus der Softwareentwicklung. Seit mehr als 15 Jahren arbeite ich in diesem Feld. Ich war Freelancer, habe hochbegabten Kindern Programmieren beigebracht, eine GmbH gegründet, Juniors ausgebildet, als CTO in einem Unternehmen mit rund 45 Personen gearbeitet und wahrscheinlich noch ein paar Stationen verdrängt.

Genug der Selbstbeweihräucherung. Als GPT-4 veröffentlicht wurde, habe ich früh mit den ersten primitiven Formen von Vibe Coding experimentiert. Damals war ich überzeugt: Diese Art zu arbeiten wird Programmierer sehr schnell ersetzen. Zumindest viele Aufgaben, die früher eindeutig in die klassische [Softwareentwicklung](https://oliverjessner.at/category/software-development/) gefallen sind.

Mit GPT-5 hat sich dieser Eindruck zunächst noch verstärkt. Bei einem [Consulting-Kunden](https://oliverjessner.at/strategic-advisor/) habe ich ein internes Softwareprojekt in etwa acht Stunden umgesetzt. Das Team hatte zuvor mit drei bis vier Monaten Aufwand gerechnet. Dazu wären mehrere Personen, Gehälter, Abstimmungen und Ressourcen gekommen.

Aus einer betriebswirtschaftlichen Perspektive ist das unmöglich zu ignorieren.

Wenn ein internes Tool nicht Monate, sondern einen Arbeitstag braucht, verändert das die Rechnung. Nicht jedes Problem braucht dann ein eigenes Projektteam. Nicht jede interne Software muss durch denselben Prozess wie ein großes Kundenprodukt. Und nicht jede Idee muss sterben, nur weil niemand Budget für eine klassische Umsetzung freigibt.

## Der Tunnelblick

Ich habe mit vielen Menschen darüber gesprochen. Einige davon entwickeln seit Jahren Software. Andere haben gegründet, Teams geführt oder selbst Produkte gebaut. Viele von ihnen sind inzwischen ebenfalls auf [Vibe Coding](https://oliverjessner.at/category/vibecoding/) umgestiegen.

Zumindest teilweise.

Und genau hier lag mein Denkfehler. Ich war von Menschen umgeben, die Softwareentwicklung schon lange verstehen. Diese Menschen können ein KI-generiertes Projekt lesen. Sie erkennen falsche Architekturentscheidungen. Sie sehen, wenn ein Datenmodell wackelt. Sie wissen, warum eine Authentifizierung nicht nur "Login einbauen" bedeutet.

## Das große Aber

Der wichtigste Punkt ist einfach: Nur weil Software schneller entsteht, wird sie nicht automatisch besser.

Vibe Coding senkt die Einstiegshürde massiv. Menschen, die früher nie eine Anwendung gebaut hätten, können heute mit wenigen Prompts funktionierende Oberflächen, kleine Tools oder sogar vollständige Produkte erzeugen. Das ist beeindruckend. Es ist auch sinnvoll. Viele Ideen wären sonst nie ausprobiert worden.

So wie immer gibt es eine zweite Seite.

Wer keine Erfahrung mit Softwareentwicklung hat, kann sehr schnell etwas bauen, das funktioniert, aber trotzdem fragil ist. Eine Anwendung kann starten, Daten speichern und hübsch aussehen. Gleichzeitig kann sie Sicherheitslücken haben, schlechte Datenstrukturen nutzen, kaputte Rechtekonzepte enthalten oder bei den ersten echten Nutzern auseinanderfallen.

Das Problem ist, dass die Oberfläche heute oft professioneller aussieht als das Fundament darunter.

Früher war es schwerer, überhaupt an diesen Punkt zu kommen. Wer keine Ahnung von Entwicklung hatte, scheiterte oft schon an Setup, Frameworks, Datenbankanbindung oder Deployment. Das war mühsam, aber es hatte einen Nebeneffekt: Viele Probleme wurden sichtbar, bevor etwas produktiv ging.

## Die Ernüchterung

In meiner aktiven TikTok-Zeit wurde ich fast täglich gefragt, ob ich nicht als Business Angel in Startups investieren möchte. Damals kamen viele Menschen mit Ideen, Pitchdecks und ersten Konzepten auf mich zu.

Heute kommen viele mit Vibe-Coding Projekten.

Am Anfang war ich neugierig. Ich wollte sehen, was entsteht, wenn Menschen ohne klassischen Entwicklungsweg plötzlich Software bauen können. Inzwischen sehe ich häufiger dieselben Muster: unklare Datenmodelle, fehlende Rechtekonzepte, keine Tests, schwache Fehlerbehandlung, unsichere API-Keys, improvisiertes Hosting und kaum Verständnis dafür, was im laufenden Betrieb passiert.

Genau das macht es gefährlich. Nicht dramatisch gefährlich im Sinne von "alles ist kaputt". Aber gefährlich genug, um bei echten Nutzerinnen, echten Zahlungen oder echten Kundendaten sehr genau hinzusehen.

## Was viele an laufender Software unterschätzen

Eine Software ist nicht fertig, weil sie auf dem eigenen Rechner läuft.

Dieser Satz klingt banal. In der Praxis wird er beim Vibe-Coding aber schnell vergessen. Besonders dann, wenn ein Projekt den persönlichen Laptop verlässt und im Internet landet.

Ab diesem Moment entstehen Fragen, die früher oft eigene Rollen oder ganze Teams beschäftigt haben:

- Hosting
- Security
- Payments
- UX
- QA
- Architektur
- Monitoring
- Backups
- Rechteverwaltung
- Datenschutz
- Kostenkontrolle
- Support
- Wartbarkeit

Früher saßen dafür Kolleginnen und Kollegen am Tisch, die sich auf einzelne Bereiche konzentriert haben. Heute werden diese Themen manchmal mit zwei oder drei Prompts abgehandelt.

Dazu kommt der Business Case.

Eine Anwendung muss nicht nur technisch laufen. Sie muss ein Problem lösen. Sie muss für Nutzerinnen verständlich sein. Sie muss in einen Prozess passen. Sie muss Kosten rechtfertigen. Und sie muss so gebaut sein, dass Änderungen nicht jedes Mal das gesamte System gefährden.

Das ist der Teil, den [KI](https://oliverjessner.at/category/KI/) bisher nur begrenzt abnimmt. Modelle können Code erzeugen, Vorschläge machen und Fehler erklären. Sie ersetzen aber nicht automatisch Produktdenken, Priorisierung und Verantwortung.

## Sparmodus oder Token-Budget

Aktuelle KI-Modelle haben noch ein weiteres Problem: Sie arbeiten nicht immer auf derselben Tiefe.

Viele Setups sind im Alltag auf Effizienz ausgelegt. Dann entstehen oft kleine, schnelle Lösungen. Diese können für einfache Aufgaben völlig reichen. Bei komplexeren Systemen wirken sie aber manchmal wie One-Trick-Ponys.

Die andere Strategie ist das Gegenteil. Man wirft viele Agenten, lange Kontexte und teure Modelle auf ein Problem. Das kann funktionieren. Es kann aber auch schnell teuer werden.

Und auch dann bleibt eine wichtige Frage offen: Wer beurteilt das Ergebnis?

Wenn die Person, die das System erstellt, nicht versteht, wie Architektur, Security, UX und Betrieb zusammenhängen, helfen auch viele Agenten nur begrenzt. Sie produzieren mehr Output. Aber mehr Output ist nicht automatisch mehr Qualität.

## Sind wir am Peak von Vibe Coding angekommen?

Ich glaube nicht, dass Vibe Coding verschwindet. Im Gegenteil. Es wird bleiben. Es wird normaler werden. Und es wird viele Arbeitsprozesse verändern.

Aber ich bin skeptischer geworden, ob der nächste große Sprung nur durch größere Modelle, mehr Performance und teurere Agentensysteme kommt.

Wer mit Claude, GPT-5 oder ähnlichen Systemen mehr als eine einfache Todo-App gebaut hat, kennt die Grenzen. Modelle helfen enorm. Sie können Tempo erzeugen. Sie können Boilerplate reduzieren. Sie können technische Barrieren senken. Aber irgendwann sinkt das Verhältnis zwischen Mehrkosten und Mehrleistung.

Mehr Tokens bedeuten nicht automatisch bessere Software. Mehr Agenten bedeuten nicht automatisch bessere Architektur. Mehr Vorschläge bedeuten nicht automatisch mehr Klarheit.

Aus meiner Sicht liegt ein wichtiger nächster Schritt nicht nur in besseren Modellen, sondern in besseren Kontrollsystemen.

## Nicht-deterministische KI braucht deterministische Gegenstücke

KI-Systeme sind nicht-deterministisch. Sie können halluzinieren, Annahmen treffen oder scheinbar plausible Lösungen bauen, die bei genauer Prüfung nicht halten.

Das ist nicht grundsätzlich ein Ausschlusskriterium. Aber es bedeutet, dass wir sie anders absichern müssen.

Ich glaube deshalb, dass wir KI-gestützte Entwicklung stärker mit deterministischen Systemen koppeln sollten. Also mit Werkzeugen, die klare Regeln prüfen. Statische Analyse. Security-Checks. Tests. Konventionen. Architekturregeln. Deployment-Prüfungen. Kostenwarnungen.

So wie [ItWorksBut](https://oliverjessner.at/itworksbut/). Die Idee dahinter
ist nicht, KI zu ersetzen. Es geht darum, typische Fehler abzufangen, bevor sie teuer werden. Gerade bei Vibe-Coding-Projekten können solche Werkzeuge helfen, grundlegende Probleme sichtbar zu machen, ohne tausende Euro an Tokens zu verbrennen.

Das ist aus meiner Sicht die realistischere Zukunft: nicht KI statt Softwareentwicklung, sondern KI plus bessere rail guards.

## Meine heutige Einschätzung

Ich habe meine Meinung zu Vibe Coding geändert.

Nicht, weil ich es weniger beeindruckend finde. Im Gegenteil. Ich halte es für eine der größten Veränderungen in der praktischen Softwareentwicklung der letzten Jahre. Es kann interne Tools massiv beschleunigen. Es kann Gründerinnen und Gründern helfen, Ideen schneller zu testen. Es kann erfahrene Entwickler produktiver machen.

Aber ich glaube nicht mehr, dass es Softwareentwicklung einfach ersetzt.

Vibe Coding verschiebt die Arbeit. Weniger Zeit geht in Boilerplate, Setup und Standardfunktionen. Mehr Verantwortung wandert in Bewertung, Architektur, Sicherheit, Produktdenken und Betrieb.

Für erfahrene Menschen ist das ein Vorteil. Für unerfahrene Menschen kann es eine Falle sein.

Die entscheidende Frage lautet daher nicht: "Kann KI Software bauen?"

Die bessere Frage ist: "Wer erkennt, ob diese Software gut genug ist?"

Genau dort beginnt die neue Trennlinie. Nicht zwischen Menschen, die Code schreiben, und Menschen, die keinen Code schreiben. Sondern zwischen Menschen, die Software beurteilen können, und Menschen, die nur sehen, dass etwas auf dem Bildschirm funktioniert.
