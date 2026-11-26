---
layout: post
title: ChatGPT und Codex in der Landwirtschaft – Ein Bauer automatisiert sein Gewächshaus
date: 2026-11-26 11:45:59 +0100
authors:
    - oliver_jessner
meta_og_type: article
categories:
    - KI
    - openai
    - software-development
    - computer-stuff
description: Wie ein Landwirt mit ChatGPT, Codex und einem ESP32 praktische Werkzeuge für seinen Betrieb entwickelt
thumbnail: /assets/images/gen/blog/chatgpt-und-codex-in-der-landwirtschaft-ein-bauer-automatisiert-sein-gewaechshaus/header_thumbnail.webp
image: /assets/images/gen/blog/chatgpt-und-codex-in-der-landwirtschaft-ein-bauer-automatisiert-sein-gewaechshaus/header.webp
faq:
    - question: Wie nutzt Hiroki Tomiyasu ChatGPT in der Landwirtschaft?
      answer: Er bespricht unter anderem Fotos auffälliger Pflanzen, recherchiert technische Möglichkeiten und entwickelt mit Unterstützung von ChatGPT Werkzeuge für seinen Betrieb.
    - question: Wie steuert der Landwirt sein Gewächshaus aus der Ferne?
      answer: Ein ESP32 ruft Befehle ab, die über den Messenger LINE und Cloudflare Workers bereitgestellt werden. Ein Motortreiber steuert damit den Lüftungsmotor.
    - question: Kann ChatGPT Pflanzenkrankheiten zuverlässig erkennen?
      answer: Ein Foto und eine KI-Antwort können erste Hinweise liefern. Für eine verlässliche Diagnose und die Wahl geeigneter Maßnahmen kann fachliche Beratung nötig sein.
socialmedia:
    - Ein Landwirt in Hokkaido nutzt ChatGPT und Codex, um Werkzeuge für seinen Betrieb zu entwickeln. Dazu gehört eine Gewächshauslüftung, die sich per LINE steuern lässt.
    - 'Vom Foto eines auffälligen Brokkolis bis zur Satellitenkarte: Hiroki Tomiyasu zeigt, wie KI im Alltag eines landwirtschaftlichen Betriebs helfen kann.'
    - 'ESP32, Motortreiber und Messenger: So beschreibt ein japanischer Landwirt seine selbst entwickelte Fernsteuerung für die Gewächshauslüftung.'
news: false
pinned: false
ads: true
image_width: 1280
image_height: 720
---

Ein Landwirt in Japan nutzt ChatGPT und Codex für praktische Probleme auf seinem Betrieb. Mit ihrer Hilfe entwickelt er unter anderem eine fernsteuerbare Gewächshauslüftung.

## ChatGPT und Codex auf einem Bauernhof in Hokkaido

Hiroki Tomiyasu bewirtschaftet auf der japanischen Insel Hokkaido rund 100 Hektar Land. Dort baut er unter anderem Brokkoli, Kürbisse, Frühlingszwiebeln und Sojabohnen an. Für Fragen aus dem Arbeitsalltag nutzt er ChatGPT und das Programmierwerkzeug Codex von [OpenAI](https://oliverjessner.at/category/openai/).

Sein Weg in die Landwirtschaft war kein geradliniger. Tomiyasu arbeitete zunächst im öffentlichen Dienst und kam über Bekannte mit ländlichen Gemeinden in Kontakt. Später beteiligte er sich an der Wiederherstellung aufgegebener Reisterrassen in der Präfektur Okayama. Auf Hokkaido lernte er schließlich die Arbeit auf größeren Anbauflächen.

Im Gespräch mit [ChatGPT for Pros](https://chatgptpro.substack.com/p/hiroki-tomiyasu) beschreibt er, wie er sich neben der Arbeit mit Software, Sensoren und Automatisierung beschäftigt. Der Beitrag stammt aus einer Reihe, in der Nutzerinnen und Nutzer eines kostenpflichtigen ChatGPT-Abos ihre Erfahrungen teilen. Die Beispiele beruhen auf Tomiyasus eigenen Angaben.

## Gewächshaus per LINE und ESP32 steuern

Ein Projekt ist eine Fernsteuerung für die Lüftung eines Gewächshauses. Tomiyasu beschreibt dafür eine Kombination aus einem ESP32, einem Motortreiber und einem 24-Volt-Gleichstrommotor. Hinzu kommen Cloudflare Workers, eine D1-Datenbank und ein Bot für den Messenger LINE. Ein Schalter ist für die manuelle Bedienung vorgesehen.

Der vorgesehene Ablauf ist überschaubar: Tomiyasu sendet über LINE einen Befehl zum Öffnen, Schließen oder Stoppen. Das System stellt diesen bereit, der ESP32 fragt ihn regelmäßig ab und steuert anschließend den Motor. Laut Tomiyasu half ihm Codex dabei, die Steuerung zu entwickeln.

Der Anwendungsfall zeigt, wie [Softwareentwicklung](https://oliverjessner.at/category/software-development/) und einfache Hardware bei einer konkreten Aufgabe zusammenkommen können. Die Fernbedienung spart Wege zum Gewächshaus, setzt aber voraus, dass die beteiligten Komponenten zuverlässig zusammenspielen.

**Wichtig:** Bei eigenen Lösungen mit Motoren und elektrischen Anlagen müssen unter anderem Stromversorgung, Absicherung, Endlagen und das Verhalten bei Verbindungsabbrüchen geprüft werden. KI-generierter Code und Schaltungsvorschläge sollten vor dem Einsatz fachkundig überprüft und getestet werden.

## Auffälligkeiten am Brokkoli besprechen

Tomiyasu nutzt ChatGPT auch, um Beobachtungen einzuordnen. Im veröffentlichten Beispiel fragt er nach schwarzen Flecken auf geerntetem Brokkoli und fügt ein Foto hinzu. Er möchte wissen, ob eine Krankheit dahinterstecken könnte und welche Maßnahmen infrage kommen.

Ein solcher Austausch kann helfen, eine Beobachtung zu beschreiben und mögliche nächste Schritte zu sammeln. Eine Bildanalyse ist allerdings keine gesicherte Diagnose. Ähnliche Symptome können unterschiedliche Ursachen haben, und ein Foto zeigt nicht alle Bedingungen vor Ort. Wenn eine Krankheit vermutet wird oder Maßnahmen gegen Schädlinge und Krankheiten anstehen, ist fachliche Beratung sinnvoll.

## Satellitendaten auf eigenen Feldkarten

Ein weiteres Projekt betrifft die Beobachtung der Anbauflächen. Tomiyasu berichtet, dass er ein System aufgebaut hat, das Satellitendaten anhand der eigenen Felddaten abruft und regelmäßig Vegetationsindizes wie den NDVI bezieht.

Der NDVI ist ein aus Satellitenmessungen berechneter Index, der Hinweise auf die Vegetation geben kann. Tomiyasu überlagert die Daten mit einer bereits vorhandenen Kartenanwendung, sodass sie den jeweiligen Feldern zugeordnet werden können. Solche Karten können die Beobachtung vor Ort ergänzen. Aus einem Indexwert allein lässt sich aber nicht sicher auf eine bestimmte Ursache für Veränderungen schließen.

## Technik dokumentieren und besser verstehen

ChatGPT hilft Tomiyasu außerdem dabei, technische Zusammenhänge aufzubereiten. Für ein Beispiel fotografierte er den Schaltschrank seiner Gewächshaussteuerung und beschrieb die sichtbaren Bauteile. Daraus ließ er ein beschriftetes Bild erstellen, das die Teile und ihre Funktion erklären soll.

Eine solche Darstellung kann beim Dokumentieren und Lernen nützlich sein. Ob Beschriftungen und Verbindungen stimmen, muss anhand der tatsächlichen Anlage geprüft werden. Ein generiertes Bild ist für sich genommen kein verlässlicher Schaltplan.

## Was sich aus dem Beispiel mitnehmen lässt

Tomiyasus Projekte beginnen bei konkreten Fragen: Was zeigen die Flecken auf dem Gemüse? Wie lassen sich Felddaten leichter betrachten? Und wie kann die Lüftung aus der Ferne bedient werden?

[KI](https://oliverjessner.at/category/KI/) unterstützt ihn dabei beim Recherchieren, Erklären und Entwickeln. Der praktische Nutzen entsteht durch die Verbindung mit seinem Wissen über den Betrieb und durch die Arbeit an den jeweiligen Werkzeugen. Wie gut sich einzelne Lösungen auf andere Betriebe übertragen lassen, hängt von deren Anforderungen, technischer Ausstattung und der sorgfältigen Prüfung vor Ort ab.
