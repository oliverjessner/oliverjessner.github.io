---
layout: post
title: 'Rüstungssoftware: Welche Fragen Entwickler vor dem Job stellen sollten'
date: 2026-07-07 16:40:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - software-engineering
    - Politik
description: 'Backend, Kubernetes oder Embedded Code sagen wenig über die Wirkung eines Jobs. Entscheidend ist, woran die eigene Software später hängt'
thumbnail: '/assets/images/gen/blog/ruestungssoftware-welche-fragen-entwickler-vor-dem-job-stellen-sollten/header_thumbnail.webp'
image: '/assets/images/gen/blog/ruestungssoftware-welche-fragen-entwickler-vor-dem-job-stellen-sollten/header.webp'
faq:
    - question: 'Ist Softwareentwicklung in der Rüstungsindustrie automatisch Arbeit an Waffen?'
      answer: 'Nein. Die Spannweite reicht von interner IT und Produktionssystemen bis zu Sensorik, Autonomie und Software mit direkter Nähe zu militärischen Funktionen. Entscheidend ist die konkrete Rolle im Gesamtsystem.'
    - question: 'Welche Fragen sollten Entwickler im Vorstellungsgespräch stellen?'
      answer: 'Wichtig sind Fragen zum konkreten Produkt, zum späteren Nutzerkreis, zur Funktion der Software, zu Sicherheitsanforderungen sowie zu Entwicklungs-, Prüf- und Freigabeprozessen.'
    - question: 'Kann man die moralische Nähe eines Softwarejobs am Tech-Stack erkennen?'
      answer: 'Nur sehr eingeschränkt. Kubernetes, Rust, APIs oder Machine Learning können in zivilen und militärischen Systemen eingesetzt werden. Aussagekräftiger ist die Funktion des Codes im Gesamtsystem.'
socialmedia:
    - 'Kubernetes, Rust oder eine REST-API sagen wenig darüber aus, welche Wirkung ein Job hat. Ich habe mir angesehen, welche Fragen Entwickler vor einem Wechsel in die Rüstungsindustrie stellen sollten.'
    - 'Ein Backendjob bleibt technisch ein Backendjob. Aber woran hängt der Code am Ende? Mein Companion-Artikel zu Rüstungssoftware, Verantwortung und den Fragen, die ich im Bewerbungsgespräch stellen würde.'
    - 'Nicht der Tech-Stack entscheidet über die Nähe zur Waffenwirkung. Entscheidend sind Funktion, Systemkontext und Verantwortung. Fünf Fragen, die Entwickler vor einem Job in der Rüstungsindustrie stellen sollten.'
companion_article:
    from: golem.yml
    id: 47
---

Ein Job kann nach Backend, Kubernetes und CI/CD klingen und trotzdem Teil eines militärischen Systems sein. Der Tech-Stack allein hilft kaum. Wichtiger ist die Frage, welche Funktion der eigene Code später übernimmt.

## Der Tech-Stack ist ein schlechter moralischer Kompass

Ich habe für Golem untersucht, was Entwicklerinnen und Entwickler in der Rüstungsindustrie tatsächlich bauen. Der Ausgangspunkt war erstaunlich unspektakulär: Viele Stellenanzeigen klingen zunächst wie gewöhnliche Tech-Jobs.

Da geht es um Backend-Services, APIs, Container, Kubernetes, DevSecOps, Embedded Software, Computer Vision, Simulation oder Machine Learning. Wer seit Jahren in der [Softwareentwicklung](https://oliverjessner.at/software-development/) arbeitet, kennt viele dieser Begriffe aus völlig anderen Branchen.

Im vollständigen Golem-Artikel habe ich mir diese Spannweite genauer angesehen:

https://www.golem.de/news/backend-devsecops-autonomie-was-entwickler-in-der-ruestung-bauen-2607-210490.html

Für mich blieb nach der Recherche aber eine praktische Frage offen. Was mache ich als Entwickler mit dieser Information, wenn tatsächlich eine interessante Stelle vor mir liegt?

Denn ein Tech-Stack beantwortet die entscheidende Frage nicht.

Kubernetes kann einen Onlineshop betreiben. Es kann eine interne Analyseplattform stützen. Es kann aber auch Infrastruktur bereitstellen, die militärische Systeme vernetzt oder deren Einsatzbereitschaft unterstützt.

Rust kann in einem CLI-Tool stecken. In einer Datenbank. In einem autonomen System.

Computer Vision kann Qualitätskontrolle in einer Fabrik ermöglichen. Es kann medizinische Bilder auswerten. Es kann aber auch Objekte in einem militärischen Kontext erkennen und verfolgen.

Die Technologie allein ist deshalb ein schlechter moralischer Kompass.

## Ich würde zuerst nach dem Gesamtsystem fragen

Meine erste Frage in einem Vorstellungsgespräch wäre sehr direkt:

- "An welchem konkreten Produkt oder System arbeite ich?"
- Nicht: Welche Programmiersprache verwendet ihr?
- Nicht: Arbeitet ihr mit Kubernetes?
- Nicht: Wie groß ist das Team?

Diese Fragen sind beruflich relevant. Aber sie sagen wenig darüber aus, welche Funktion die eigene Arbeit später übernimmt.

Mich würde interessieren, ob ich an interner IT arbeite, an einer Produktionsplattform, an Wartungssoftware, an einem digitalen Zwilling, an Sensorverarbeitung oder an einem System, das unmittelbar im militärischen Einsatz genutzt wird.

Schon diese Einordnung verändert viel.

Eine Datenbank für interne Abrechnung ist nicht dasselbe wie Software für ein Lagebild. Eine Deployment-Pipeline für ein HR-System ist nicht dasselbe wie Infrastruktur, die einsatzkritische Systeme aktualisiert. Ein Modell zur Qualitätskontrolle ist nicht dasselbe wie ein Modell zur Erkennung militärisch relevanter Objekte.

Technisch können sich Aufgaben ähneln. Funktional müssen sie es nicht.

## Die zweite Frage betrifft nicht den Code, sondern seine Wirkung

Ich würde danach fragen:

- "Was ermöglicht meine Software im Gesamtsystem?"

Das klingt abstrakt, ist aber für mich die entscheidende Ebene.

Software kann Daten speichern. Sie kann Daten priorisieren. Sie kann Sensoren zusammenführen. Sie kann Empfehlungen erzeugen. Sie kann Bewegungen steuern. Sie kann Entscheidungen vorbereiten oder automatisieren.

Zwischen diesen Funktionen liegen erhebliche Unterschiede.

Gerade in komplexen Systemen ist es leicht, nur auf die eigene Komponente zu schauen. Das ist im Alltag der [Software Engineering](https://oliverjessner.at/software-engineering/) sogar normal. Große Produkte werden zerlegt. Teams besitzen Services. Entwickler bearbeiten Tickets. Schnittstellen trennen Verantwortungsbereiche.

Das ist organisatorisch sinnvoll.

Es kann aber den Blick darauf erschweren, was das Gesamtsystem eigentlich tut.

In einem Jira-Ticket steht möglicherweise nur, dass eine Latenz reduziert, ein API-Endpunkt erweitert oder ein Datenformat normalisiert werden soll. Daraus lässt sich nicht automatisch erkennen, welche Wirkung diese Verbesserung später hat.

Deshalb würde ich nicht nur nach meiner Komponente fragen. Ich würde nach dem Weg durch das System fragen.

- Welche Daten kommen hinein?
- Was macht meine Software daraus?
- Welches andere System verwendet das Ergebnis?
- Wer trifft danach eine Entscheidung?

## Die dritte Frage lautet: Was passiert, wenn die Software falsch liegt?

Bei einem Onlineshop kann ein Fehler Geld kosten. Bei einer Banking-Anwendung kann er Transaktionen blockieren. In medizinischen, industriellen oder militärischen Systemen können Fehler andere und deutlich schwerwiegendere Folgen haben.

Deshalb würde ich fragen:

- "Was passiert konkret, wenn meine Software ausfällt oder ein falsches Ergebnis liefert?"

Diese Frage sagt oft mehr über die tatsächliche Kritikalität einer Rolle aus als die Stellenbeschreibung.

Wenn ein interner Report einige Minuten verspätet ist, ist das unangenehm.

Wenn ein Wartungssystem falsche Zustände meldet, kann das operative Folgen haben.

Wenn ein System Sensordaten falsch klassifiziert, wird die Frage noch einmal anders.

Mich würden deshalb auch die technischen Konsequenzen interessieren:

- Welche Tests sind vorgeschrieben?
- Welche Verifikation gibt es?
- Wer darf Änderungen freigeben?
- Gibt es unabhängige Prüfungen?
- Wie werden Fehlentscheidungen erkannt?
- Welche Rückfallebenen existieren?

Das ist nicht nur eine moralische Frage. Es ist auch eine Frage professioneller Softwareentwicklung.

## Die vierte Frage betrifft Entscheidungen

Ein besonders wichtiger Punkt wäre für mich:

"Trifft die Software Entscheidungen oder bereitet sie Entscheidungen für Menschen vor?"

Auch hier gibt es keine einfache Ja-Nein-Grenze.

Ein System kann Daten nur anzeigen. Es kann Informationen priorisieren. Es kann Handlungsvorschläge erzeugen. Es kann ein Ziel klassifizieren. Es kann eine Route planen. Es kann Bewegungen steuern.

Je weiter Software in diese Kette hineinreicht, desto wichtiger wird für mich die genaue Erklärung des Systems.

Ich würde wissen wollen, wo ein Mensch eingebunden ist.

- Wer überprüft Ergebnisse?
- Wer kann widersprechen?
- Was passiert bei Unsicherheit?
- Kann ein automatisierter Prozess gestoppt werden?

Das Wort "KI" hilft bei dieser Einordnung übrigens kaum. Ein Machine-Learning-Modell kann eine Nebenfunktion übernehmen oder ein zentraler Bestandteil einer Entscheidungskette sein. Auch hier entscheidet nicht das Werkzeug, sondern seine Funktion.

## Die fünfte Frage ist unangenehm, aber notwendig

Ich würde außerdem fragen:

- "Wer nutzt das System später?"

Bei Rüstungssoftware reicht es aus meiner Sicht nicht, nur das Produkt zu kennen. Relevant ist auch der Einsatzkontext.

- Wird die Software ausschließlich intern verwendet?
- Geht sie an staatliche Stellen?
- Ist sie für verschiedene Länder vorgesehen?
- Ist bekannt, in welchen Systemen sie integriert wird?
- Welche Rolle spielen Exportkontrollen und Freigabeprozesse?

Nicht jede dieser Fragen wird in einem ersten Gespräch vollständig beantwortet werden können. Manche Informationen können aus Sicherheitsgründen eingeschränkt sein. Trotzdem halte ich die Richtung der Fragen für legitim.

Eine professionelle Bewerbung besteht nicht nur daraus, dass ein Unternehmen einen Kandidaten prüft. Der Kandidat prüft auch das Unternehmen und die konkrete Aufgabe.

## Auch gute Governance nimmt einem die Entscheidung nicht ab

Für meinen Golem-Artikel habe ich mit Markus Weiss gesprochen, der früher in leitender Funktion für Rheinmetall in Nordamerika tätig war.

Seine Einordnung fand ich gerade deshalb interessant, weil sie nicht beim Tech-Stack ansetzt. Für ihn verläuft die Grenze in der Praxis entlang der Funktion und des Risikoprofils einer Software. Je unmittelbarer Software sicherheitskritische Funktionen unterstützt, desto höher seien typischerweise die Anforderungen an Entwicklung, Verifikation, Dokumentation und Freigabe.

Das ist ein wichtiger Punkt.

Klare Prozesse, Reviews und Freigaben sind gerade bei sicherheitskritischer Software notwendig. Sie schaffen Verantwortlichkeiten und reduzieren Risiken.

Trotzdem nehmen sie dem einzelnen Entwickler die persönliche Entscheidung nicht vollständig ab.

Ein gut reguliertes System kann technisch professionell entwickelt sein. Die Frage, ob ich persönlich an seiner Funktion mitarbeiten möchte, bleibt bestehen.

Governance beantwortet, wie gearbeitet und entschieden wird.

Sie beantwortet nicht automatisch, ob ich diese Arbeit mit meinen eigenen Maßstäben vereinbaren kann.

## Was ich vor einer Zusage wissen wollte

Ich würde eine Rolle in diesem Bereich nicht allein wegen des Firmennamens ablehnen oder annehmen. Ich würde aber auch keinen Vertrag unterschreiben, solange ich den Systemkontext nicht zumindest grob verstanden habe.

Meine wichtigsten Fragen wären:

1. An welchem konkreten Produkt oder System arbeite ich?
2. Was ermöglicht meine Software im Gesamtsystem?
3. Was passiert bei einem Fehler oder einer falschen Entscheidung?
4. Welche Entscheidungen trifft die Software selbst und wo bleibt ein Mensch eingebunden?
5. Wer nutzt das System später?

Danach kommen für mich die klassischen Fragen zu Team, Technologie, Architektur, Gehalt und Arbeitsweise.

## Der Code bleibt technisch, die Entscheidung nicht

Das vielleicht Unbequemste an Rüstungssoftware ist ihre Normalität.

Der Code muss nicht aussehen wie "Waffensoftware". Er kann sauber strukturiert sein. Gut getestet. Modern deployed. Mit bekannten Frameworks, Pull Requests, Pipelines und Sprints.

Genau deshalb reicht es nicht, nur den Stack zu bewerten.

Die entscheidende Frage beginnt eine Ebene höher: Welche Funktion übernimmt meine Arbeit in einem größeren System?

Darauf gibt es keine universelle Antwort. Entwicklerinnen und Entwickler können zu unterschiedlichen moralischen Entscheidungen kommen. Das halte ich für legitim.

Problematisch wird es für mich erst dann, wenn man die Frage gar nicht stellt.

Denn wer Code schreibt, muss nicht jede spätere Wirkung kontrollieren können. Aber bei einem Jobwechsel sollte man zumindest versuchen zu verstehen, woran der eigene Code am Ende hängt.
