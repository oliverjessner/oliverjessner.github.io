---
layout: post
title: 'Vibecoding – fünf einfache Regeln für mehr Sicherheit'
date: 2026-05-13 10:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - vibecoding
    - software-development
    - Privacy
description: 'Vibe-Coding macht Prototypen schnell, aber nicht automatisch sicher. Fünf praktische Regeln für weniger Risiko beim Bauen mit KI'
thumbnail: '/assets/images/gen/blog/vibecoding-fuenf-einfache-regeln-fuer-mehr-sicherheit/header_thumbnail.webp'
image: '/assets/images/gen/blog/vibecoding-fuenf-einfache-regeln-fuer-mehr-sicherheit/header.webp'
faq:
    - question: 'Was bedeutet Vibe-Coding?'
      answer: 'Vibe-Coding beschreibt eine Arbeitsweise, bei der Nutzer ihre Software-Idee in natürlicher Sprache formulieren und KI-Systeme daraus Code, Datenmodelle oder Deployments erzeugen.'
    - question: 'Warum ist Vibe-Coding ein Sicherheitsrisiko?'
      answer: 'Das Risiko liegt weniger im KI-Werkzeug selbst, sondern darin, dass funktionierende Oberflächen schnell mit produktionsreifer Software verwechselt werden.'
    - question: 'Welche Regel ist beim Vibe-Coding am wichtigsten?'
      answer: 'Eine App sollte nie als sicher gelten, nur weil sie im Browser funktioniert. Zugriffsschutz, Secrets, Datenmodell und Deployment müssen separat geprüft werden.'
---

Vibe-Coding macht Softwareentwicklung zugänglicher. Genau deshalb lohnt sich ein ruhiger Blick auf Sicherheit. Fünf einfache Regeln helfen, typische Fehler früher zu erkennen.

## Warum ich über Vibecoding und Sicherheit schreibe

Ich habe gemeinsam mit [Christopher Helm](https://christopher-helm.com/) an einem Golem-Artikel zum Thema Vibe-Coding gearbeitet. Dabei ging es nicht um die Frage, ob KI beim Programmieren hilfreich ist. Das ist sie längst. Interessanter ist eine andere Frage: Was passiert, wenn Menschen sehr schnell Anwendungen bauen, aber die sicherheitsrelevanten Entscheidungen im Hintergrund nicht mehr wirklich nachvollziehen?

Genau hier liegt für mich der spannendste Punkt. [Vibecoding](https://oliverjessner.at/category/vibecoding/) senkt die Einstiegshürde. Eine Idee wird beschrieben, ein KI-System erzeugt daraus Code, Datenmodelle, Login-Flows oder Deployment-Anweisungen. Nach kurzer Zeit gibt es eine Oberfläche, die nach fertiger Software aussieht.

Das ist praktisch. Es kann produktiv sein. Aber es verändert auch, wie wir über Verantwortung im Bereich des [software development](https://oliverjessner.at/category/software-development/)s nachdenken müssen.

Denn eine App kann funktionieren und trotzdem unsicher sein.

## It Works But…

Aus genau diesem Problem heraus ist [ItWorksBut](https://oliverjessner.at/itworksbut/) entstanden: ein kleines Tool für JavaScript-, Node.js-, Web-, Tauri- und Electron-Projekte, das typische Vibe-Coding-Fallen sichtbar machen soll, bevor aus einem funktionierenden Prototyp ein unsicheres Live-System wird.

Der Name ist bewusst gewählt. Denn viele dieser Projekte funktionieren auf den ersten Blick: Die App startet, das Formular speichert Daten, das Dashboard sieht fertig aus. Aber darunter können .env-Dateien im Git-Index liegen, Backend-Secrets im Frontend auftauchen, API-Routen ohne echte Authentifizierung erreichbar sein oder Electron- und Tauri-Konfigurationen zu viele Rechte erlauben.

ItWorksBut soll genau diesen Zwischenraum prüfen: Es ersetzt kein Security-Audit und keinen Pentest, aber es stellt die unangenehme Frage, die beim Vibe Coding oft zu spät kommt: Es funktioniert, aber sollte es wirklich schon ausgeliefert werden?

## Mein Fazit

Vibe-Coding ist kein Spielzeug und auch keine automatische Gefahr. Es ist eine neue Abkürzung im Entwicklungsprozess. Abkürzungen sind nützlich, solange man weiß, welche Kontrollpunkte man dadurch überspringt.

Wer mit KI Anwendungen baut, muss nicht alles selbst schreiben. Aber man sollte verstehen, wo Daten liegen, wer darauf zugreifen darf und welche Annahmen die generierte App trifft.

Für mich ist das die wichtigste Lehre aus der Arbeit an diesem Thema: Die Oberfläche ist nur der sichtbare Teil der Anwendung. Sicherheit entsteht in den Regeln darunter.
