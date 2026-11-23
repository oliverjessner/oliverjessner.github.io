---
layout: post
title: ChatGPT für SNES – ein Sprachmodell auf dem Super Nintendo
date: 2026-11-23 14:47:14 +0100
authors:
  - oliver_jessner
meta_og_type: article
categories:
  - KI
  - gaming
  - nintendo
  - emulation
description: 'Ein KI-Chatbot auf dem Super Nintendo: Was der Super FX 2 möglich macht und wie du das Experiment selbst ausprobierst'
thumbnail: /assets/images/gen/blog/chatgpt-fuer-snes-ein-sprachmodell-auf-dem-super-nintendo/header_thumbnail.webp
image: /assets/images/gen/blog/chatgpt-fuer-snes-ein-sprachmodell-auf-dem-super-nintendo/header.webp
faq:
  - question: Läuft ChatGPT tatsächlich auf dem Super Nintendo?
    answer: ChatGPT for SNES ist ein inoffizielles Experiment mit einem eigenen kleinen Sprachmodell. Es ist weder das originale ChatGPT noch ein Produkt von OpenAI.
  - question: Benötigt ChatGPT for SNES eine Internetverbindung?
    answer: Auf einer echten Konsole läuft das Sprachmodell lokal ohne Internetverbindung. Für den Aufruf der Browserversion müssen zunächst die Programmdaten geladen werden.
  - question: Wie kann ich ChatGPT for SNES ausprobieren?
    answer: Das Projekt lässt sich direkt im Browser oder mit einem geeigneten Flash-Modul auf einem Super Nintendo starten. Für die Version mit Faktenbuch ist zusätzlich MSU-1-Unterstützung nötig.
socialmedia:
  - 'Ein Sprachmodell auf dem Super Nintendo: ChatGPT for SNES nutzt den Super FX 2 und läuft auf echter Hardware lokal. Was das Experiment kann und wo seine Grenzen liegen.'
  - Der Super FX 2 war für Spiele wie Yoshi's Island gedacht. Jetzt berechnet er auch Antworten eines kleinen Sprachmodells. Das SNES-Experiment lässt sich im Browser ausprobieren.
  - ChatGPT for SNES ist kein offizielles ChatGPT. Das Projekt zeigt, wie ein kleines Sprachmodell auf Retro-Hardware läuft und warum seine Antworten mit Vorsicht zu genießen sind.
news: true
pinned: false
ads: true
image_width: 1280
image_height: 720
---

Ein Sprachmodell auf dem Super Nintendo? Ein inoffizielles Experiment macht es möglich und nutzt dafür einen Zusatzchip aus der Spielemodul-Ära.

## ChatGPT auf dem SNES – was steckt dahinter?

Der Technikjournalist Benj Edwards hat mit "ChatGPT for SNES" einen Chatbot für das Super Nintendo Entertainment System entwickelt. Das Projekt führt ein kleines Sprachmodell auf der Konsole aus und kommt auf echter Hardware ohne Internetverbindung aus.

Der Name ist eine Anspielung auf ChatGPT: Es handelt sich weder um den originalen Dienst noch um ein offizielles Produkt von OpenAI. Das Modell wurde mit Trainingsgesprächen trainiert, die OpenAIs Modell gpt-oss-120b erzeugt hat. Es ist also kein einfach verkleinertes Abbild dieses Modells. Das [Projekt selbst](https://www.bxfoundry.com/chatgpt_snes/) beschreibt die Hintergründe und bietet die Software zum Ausprobieren an.

Damit treffen zwei Themen aufeinander, die selten zusammenkommen: [KI](https://oliverjessner.at/category/KI/) und eine Konsole aus der frühen Geschichte des [Gaming](https://oliverjessner.at/category/gaming/).

## Wie läuft ein Sprachmodell auf dem Super Nintendo?

Das Modell besitzt rund 2,2 Millionen Parameter. Das sind vereinfacht gesagt die beim Training festgelegten Werte, mit denen es seine Antworten erzeugt. Für die Berechnungen nutzt das Projekt den Super FX 2, einen Zusatzprozessor, der in unterstützten Spielemodulen saß.

Der Chip war ursprünglich vor allem für aufwendigere Grafik gedacht und kam unter anderem in "Yoshi's Island" zum Einsatz. Im SNES-Chatbot übernimmt er eine andere Aufgabe: Er hilft dabei, die Antwort des Sprachmodells Schritt für Schritt zu berechnen und auf dem Bildschirm auszugeben.

Das Ergebnis braucht Geduld. Der verfügbare Wortschatz umfasst ungefähr 8.000 englische Wörter, und die Antworten entstehen langsam. Das Experiment zeigt damit vor allem, was sich mit begrenzter Hardware umsetzen lässt.

## Zwei Versionen: Sprachmodell und Faktenbuch

Das Projekt steht in Version 0.7 in zwei Varianten bereit:

- **Pure:** Die Antworten stammen vollständig aus dem Sprachmodell. Beim ersten Aufruf im Browser werden ungefähr 4 MB geladen.
- **Mit Faktenbuch:** Diese Variante ergänzt einen Taschenrechner und ein Nachschlagewerk. Es enthält unter anderem die Einleitungssätze von rund 150.000 Artikeln der Simple English Wikipedia. Das Modell kann entscheiden, dort etwas nachzuschlagen. Der erste Aufruf lädt ungefähr 19 MB.

Das Faktenbuch kann zusätzliche Informationen liefern, macht die Antworten aber nicht automatisch zuverlässig. Auch die gespeicherten Inhalte können Fehler enthalten.

**Hinweis:** Das Sprachmodell kann falsche Aussagen überzeugend formulieren. Für verlässliche Informationen sollten die Antworten anhand anderer Quellen überprüft werden.

## ChatGPT for SNES im Browser oder auf echter Hardware ausprobieren

Am einfachsten lässt sich das Experiment auf der [Projektseite im Browser](https://www.bxfoundry.com/chatgpt_snes/) testen. Dort läuft es im Emulator Snes9x. Nach dem Start mit Enter kannst du eine englische Eingabe über die Tastatur schreiben und mit Enter absenden. Die Eingabe erscheint etwas verzögert, weil die Seite die Bildschirmtastatur der Konsole bedient.

Für ein echtes Super Nintendo stellt Edwards die ROM-Dateien ebenfalls zum Download bereit. Benötigt wird ein Flash-Modul mit Super-FX-Unterstützung, etwa ein FXPak Pro oder ein sd2snes mit aktueller Firmware. Für die Variante mit Faktenbuch muss das Modul zusätzlich MSU-1 unterstützen. Die `.sfc`- und die `.msu`-Datei gehören dabei mit unveränderten Namen in denselben Ordner.

## Ein Experiment mit klaren Grenzen

Edwards beschreibt das Projekt als Zusammenarbeit mit KI-Agenten: Er gab unter anderem das Konzept, die Oberfläche und die Chip-Auswahl vor, während die Agenten den Code schrieben.

Als alltäglicher Assistent ist der Chatbot kaum geeignet. Dafür sind seine Antworten zu langsam und zu fehleranfällig. Interessant ist das Projekt trotzdem: Es zeigt, wie sich ein Sprachmodell mit einem Zusatzchip auf einer Konsole betreiben lässt, die lange vor dem heutigen KI-Boom entwickelt wurde. Wer sich für [Nintendo](https://oliverjessner.at/category/nintendo/) und die Technik hinter alten Spielen interessiert, kann das selbst ausprobieren.
