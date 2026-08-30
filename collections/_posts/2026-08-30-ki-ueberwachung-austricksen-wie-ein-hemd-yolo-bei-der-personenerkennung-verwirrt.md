---
layout: post
title: 'KI-Überwachung austricksen: Wie ein Hemd YOLO bei der Personenerkennung verwirrt'
date: 2026-08-30 22:28:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - Privacy
    - Gesellschaft
description: 'Ein Hemd soll KI-Überwachung austricksen: Wie Digital Camouflage YOLO verwirrt und wo die Grenzen adversarialer Kleidung liegen'
thumbnail: '/assets/images/gen/blog/ki-ueberwachung-austricksen-wie-ein-hemd-yolo-bei-der-personenerkennung-verwirrt/header_thumbnail.webp'
image: '/assets/images/gen/blog/ki-ueberwachung-austricksen-wie-ein-hemd-yolo-bei-der-personenerkennung-verwirrt/header.webp'
image_width: 1280
image_height: 853
faq:
    - question: 'Kann Kleidung KI-Überwachungskameras austricksen?'
      answer: 'Spezielle adversariale Muster können bestimmte Systeme zur Personenerkennung stören. Simon Weckert demonstriert seine Digital Camouflage mit einem offenen YOLO-Modell. Ob das Muster auch andere oder behördlich eingesetzte Systeme täuscht, ist nicht belegt.'
    - question: 'Wie funktioniert das Digital-Camouflage-Hemd von Simon Weckert?'
      answer: 'Das Muster wurde darauf optimiert, visuelle Merkmale zu verändern, die Computer-Vision-Systeme zur Erkennung von Menschen verwenden. Dadurch kann die Wahrscheinlichkeit sinken, mit der ein Modell den Träger als Person klassifiziert.'
    - question: 'Funktioniert Digital Camouflage gegen die KI-Videoüberwachung am Kottbusser Tor?'
      answer: 'Das ist nicht bekannt. Die Demonstrationen verwenden ein generisches Open-Source-System aus der YOLO-Familie. Simon Weckert macht ausdrücklich keine Aussage darüber, ob das konkrete Berliner System auf das Muster reagiert.'
socialmedia:
    - 'Ein Hemd gegen KI-Überwachung? Simon Weckerts Digital Camouflage kann ein YOLO-System bei der Personenerkennung verwirren. Spannender als das Hemd selbst ist die Frage, was solche adversarialen Muster über Computer Vision verraten.'
    - 'Menschen sehen ein auffälliges Hemd. Ein Computer-Vision-Modell sieht unter Umständen keine Person mehr. Digital Camouflage zeigt ziemlich anschaulich, wo statistische Bilderkennung an ihre Grenzen kommen kann.'
    - 'Kann man KI-Überwachung mit Kleidung austricksen? Teilweise. Digital Camouflage funktioniert in Demonstrationen gegen YOLO. Ob reale Polizeisysteme darauf reagieren, ist dagegen völlig offen. Genau diese Einschränkung ist entscheidend.'
---

Ein auffälliges Hemd soll Computer-Vision-Systeme bei der Personenerkennung verwirren. Das funktioniert zumindest mit einem offenen YOLO-Modell. Das Experiment zeigt damit weniger einen universellen Schutz vor Überwachung als eine grundlegende Schwäche statistischer Bilderkennung.

## Digital Camouflage soll KI bei der Personenerkennung stören

Ein Hemd kann einen Menschen für andere Menschen kaum unsichtbar machen. Für ein System zur automatisierten Bilderkennung sieht die Sache anders aus.

Der Berliner Künstler Simon Weckert hat mit ["Digital Camouflage"](https://www.simonweckert.com/digitalcamouflage.html) ein Kleidungsstück entwickelt, dessen auffälliges Muster Computer-Vision-Systeme bei der Erkennung von Personen stören soll. Das Prinzip basiert auf sogenannten adversarialen Angriffen.

Menschen erkennen weiterhin problemlos einen Menschen in einem gemusterten Hemd. Ein Modell zur Objekterkennung arbeitet dagegen mit statistischen Merkmalen innerhalb eines Bildes. Genau diese Unterschiede lassen sich ausnutzen.

Weckerts Demonstrationen verwenden ein generisches Open-Source-Modell aus der YOLO-Familie. YOLO steht für "You Only Look Once" und gehört zu den bekanntesten Ansätzen für schnelle Objekterkennung in Bildern und Videos.

Im Video erkennt das System andere Passanten als "person". Beim Träger der Digital Camouflage kann diese Klassifikation dagegen ausbleiben.

## Wie YOLO Menschen erkennt

Systeme wie YOLO bekommen nicht beigebracht, was ein Mensch im abstrakten Sinn ist. Während des Trainings sehen sie große Mengen beschrifteter Bilder und lernen daraus Muster, die mit bestimmten Objektklassen zusammenhängen.

Bei der Klasse "person" können dafür unter anderem Körperkonturen, Proportionen, Kontraste, Texturen und wiederkehrende visuelle Strukturen relevant sein.

Das Modell berechnet anschließend, wie wahrscheinlich es ist, dass sich innerhalb eines bestimmten Bildbereichs eine Person befindet.

Genau hier setzen adversariale Muster an.

Sie müssen einen Menschen nicht davon überzeugen, dass vor der Kamera kein Mensch steht. Es reicht, bestimmte Merkmale so zu verändern, dass die interne Bewertung eines Modells kippt.

Damit wird das Hemd zu einem interessanten Beispiel dafür, wie unterschiedlich menschliche Wahrnehmung und maschinelle Bilderkennung funktionieren.

## Was ist ein adversarialer Angriff?

Adversariale Angriffe sind gezielt erzeugte Eingaben, die Machine-Learning-Modelle zu falschen Ergebnissen bringen sollen.

Bei Bildern können bereits Veränderungen an Farben, Formen oder Texturen dafür sorgen, dass ein Modell ein Objekt falsch klassifiziert oder überhaupt nicht mehr erkennt.

Das ist kein grundsätzlich neues Problem der [KI](https://oliverjessner.at/category/KI/). Forschende beschäftigen sich seit Jahren mit sogenannten "adversarial examples".

Besonders interessant werden solche Angriffe, wenn sie nicht nur in einer Bilddatei funktionieren, sondern auch in der physischen Welt.

Ein gedrucktes Muster muss schließlich mit unterschiedlichen Entfernungen, Körperhaltungen, Kamerawinkeln, Lichtverhältnissen und Falten im Stoff zurechtkommen.

Genau daran scheitern viele theoretisch erfolgreiche Angriffe außerhalb des Labors.

## Adversariale Kleidung ist kein neues Konzept

Weckerts Projekt steht deshalb nicht allein.

Bereits frühere Forschungsarbeiten haben untersucht, ob speziell optimierte T-Shirts und andere Kleidungsstücke Systeme zur Personenerkennung stören können.

Eine 2022 auf arXiv veröffentlichte Arbeit zu ["Adversarial Texture for Fooling Person Detectors in the Physical World"](https://arxiv.org/abs/2203.03373) untersuchte beispielsweise adversariale Texturen für reale Kleidung.

Neuere Ansätze berücksichtigen zusätzlich Bewegungen, unterschiedliche Perspektiven und die Verformung des Stoffes. Eine Ende 2025 veröffentlichte Arbeit optimierte Texturen beispielsweise über komplette Videosequenzen hinweg und simulierte dabei verschiedene Kamerawinkel, Beleuchtung und Stoffbewegungen.

Eine weitere Forschungsarbeit von 2025 zeigte, dass speziell entwickelte Kleidung sogar mehrere Schutzmechanismen gegen adversariale Angriffe beeinträchtigen kann.

Digital Camouflage greift damit auf ein reales Forschungsgebiet der Computer Vision zurück und übersetzt es in ein Kleidungsstück und eine künstlerische Intervention.

## Das Hemd macht nicht vor jeder Kamera unsichtbar

Entscheidend ist allerdings eine Einschränkung, die bei solchen Experimenten leicht verloren geht.

Digital Camouflage ist kein Tarnumhang für Überwachungskameras.

Weckert schreibt selbst ausdrücklich, dass seine Demonstrationen mit einem generischen offenen YOLO-System durchgeführt wurden. Er behauptet nicht, dass das Hemd konkrete behördliche Überwachungssysteme austricksen kann.

Das ist technisch relevant.

Ein Muster, das gegen ein bestimmtes Modell funktioniert, muss nicht automatisch gegen eine andere Architektur erfolgreich sein. Selbst verschiedene Versionen eines Modells können unterschiedlich reagieren.

Dazu kommen Faktoren wie:

- verwendete Trainingsdaten
- Auflösung der Kamera
- Entfernung zur Kamera
- Blickwinkel
- Beleuchtung
- Bildvorverarbeitung
- zusätzliche Erkennungsmodelle
- eingesetzte Gegenmaßnahmen

Ein System könnte beispielsweise neben einer klassischen Personenerkennung zusätzliche Informationen aus Bewegung, Körperhaltung oder anderen Sensoren verwenden.

Von "unsichtbar für KI-Überwachung" zu sprechen wäre deshalb zu pauschal.

## Warum das Kottbusser Tor eine Rolle spielt

Weckert präsentiert sein Projekt bewusst im Zusammenhang mit der neuen KI-gestützten Videoüberwachung am Berliner Kottbusser Tor.

Dort wird 2026 ein Pilotprojekt der Berliner Polizei aufgebaut. Weitere Standorte sollen folgen.

Nach Angaben der Berliner Innenverwaltung geht es bei dem System nicht um klassische Gesichtserkennung. Die Software soll Bewegungen analysieren und mögliche Gefahrensituationen erkennen. Einsatzkräfte sollen dabei anonymisierte Darstellungen der erkannten Personen sehen.

Damit unterscheidet sich dieses System bereits konzeptionell von einem einfachen YOLO-Personendetektor.

Ob Digital Camouflage das tatsächlich eingesetzte System beeinflussen könnte, ist öffentlich nicht bekannt.

Genau diese fehlende Überprüfbarkeit ist Teil von Weckerts Kritik.

Seine Argumentation lautet im Kern: Wenn algorithmische Systeme im öffentlichen Raum eingesetzt werden, Außenstehende ihre Funktionsweise aber nicht unabhängig untersuchen können, lässt sich ihre Robustheit nur schwer beurteilen.

Damit berührt das Projekt nicht nur Computer Vision, sondern auch Fragen rund um [Privacy](https://oliverjessner.at/category/Privacy/) und die Kontrolle automatisierter Systeme im öffentlichen Raum.

## KI erkennt Wahrscheinlichkeiten, keine Bedeutung

Technisch interessant ist Digital Camouflage vor allem deshalb, weil das Projekt ein häufiges Missverständnis über Bilderkennung sichtbar macht.

Wenn ein Computer-Vision-Modell einen Menschen erkennt, bedeutet das nicht, dass es einen Menschen so versteht wie wir.

Das Modell hat während seines Trainings statistische Zusammenhänge gelernt.

Diese funktionieren im normalen Betrieb erstaunlich gut. Sie können aber empfindlich auf Eingaben reagieren, die gezielt außerhalb der erwarteten Verteilung liegen.

Ein Mensch sieht ein seltsames Muster und ignoriert es weitgehend.

Ein neuronales Netz kann dasselbe Muster deutlich stärker gewichten, weil es bestimmte gelernte Merkmale verändert.

Adversariale Angriffe suchen genau solche Schwachstellen.

## Das Problem betrifft nicht nur Überwachung

Die Frage nach der Robustheit von Computer Vision geht weit über Überwachungskameras hinaus.

Objekterkennung wird beispielsweise eingesetzt bei:

- autonomen Fahrzeugen
- Robotik
- industrieller Qualitätskontrolle
- Zugangssystemen
- Einzelhandel
- Verkehrsüberwachung
- Drohnen
- Sicherheitsanwendungen

Je stärker Entscheidungen von solchen Systemen abhängen, desto wichtiger wird die Frage, wie sie auf ungewöhnliche oder bewusst manipulierte Eingaben reagieren.

Adversariale Forschung ist deshalb nicht nur eine Anleitung zum Austricksen von Modellen. Sie ist gleichzeitig eine Methode, um Schwächen sichtbar zu machen und robustere Systeme zu entwickeln.

## Digitale Camouflage als politisches Kunstprojekt

Weckert geht es bei Digital Camouflage allerdings nicht nur um die technische Machbarkeit.

Das Kleidungsstück ist gleichzeitig eine Aussage über Überwachung im öffentlichen Raum.

Damit knüpft das Projekt an frühere Arbeiten des Künstlers an. Bekannt wurde Weckert unter anderem durch sein "Google Maps Hacks"-Projekt. Dafür zog er 99 Smartphones in einem Handwagen durch Berlin. Google Maps interpretierte die ungewöhnlich hohe Zahl langsam bewegter Geräte als Verkehrsstau.

Auch damals bestand der eigentliche Trick nicht darin, ein System technisch zu kompromittieren.

Weckert nutzte vielmehr dessen vorgesehene Funktionsweise und erzeugte bewusst Eingangsdaten, mit denen das System nicht gerechnet hatte.

Digital Camouflage überträgt dieses Prinzip auf Computer Vision.

Die Technik funktioniert innerhalb ihrer statistischen Regeln. Das Kunstprojekt sucht lediglich nach Eingaben, bei denen diese Regeln zu einem unerwarteten Ergebnis führen.

Damit wird aus einem auffälligen Hemd auch eine praktische Frage für die [Gesellschaft](https://oliverjessner.at/category/Gesellschaft/): Wie viel Vertrauen wollen wir automatisierten Systemen entgegenbringen, wenn ihre Entscheidungen für Außenstehende kaum überprüfbar sind?

## Fazit: Das Hemd ist interessanter als ein einfacher KI-Trick

Digital Camouflage zeigt nicht, dass sich jede KI-Überwachung mit einem bunten Hemd ausschalten lässt.

Es zeigt etwas Interessanteres.

Ein modernes Computer-Vision-System kann bei einer Aufgabe scheitern, die für einen Menschen vollkommen trivial erscheint: einen sichtbar vor der Kamera stehenden Menschen als Menschen zu erkennen.

Dass adversariale Kleidung grundsätzlich funktionieren kann, ist inzwischen durch mehrere Forschungsarbeiten gut dokumentiert. Wie zuverlässig ein bestimmtes Muster außerhalb des getesteten Modells funktioniert, ist dagegen eine andere Frage.

Bei Weckerts Hemd ist deshalb vor allem die Grenze entscheidend: Es demonstriert eine bekannte Schwäche maschineller Bilderkennung an einem offenen YOLO-System. Über die Wirksamkeit gegen das konkrete Berliner Überwachungssystem sagt der Versuch nichts aus.

Gerade diese Einschränkung macht das Experiment aus technischer Sicht interessant. Denn sie lenkt den Blick weg vom vermeintlichen "Unsichtbarkeitshemd" und hin zur eigentlichen Frage: Wie robust sind Systeme, denen wir zunehmend Aufgaben im öffentlichen Raum übertragen?
