---
layout: post
title: 'Billly – Buchhaltung, die einfach mitläuft'
date: 2026-02-14 23:29:19 +0100
last_modified_at: 2026-02-16 13:00:10 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - macos
    - KI
    - software-development
    - vibecoding
description: 'Ein kleiner macOS-Helfer, der PDFs beobachtet, Werte extrahiert und dir eine ruhige Übersicht über Umsatz und Gewinn baut'
thumbnail: '/assets/images/gen/blog/billly-buchhaltung-die-einfach-mitlaeuft/header_thumbnail.webp'
image: '/assets/images/gen/blog/billly-buchhaltung-die-einfach-mitlaeuft/header.webp'
faq:
    - question: 'Für wen ist Billly gedacht?'
      answer: 'Billly passt vor allem zu Freelancer:innen und kleinen Projekten mit überschaubarem Belegvolumen, die eine schnelle Übersicht statt eines komplexen Buchhaltungssystems wollen.'
    - question: 'Was kostet Billly?'
      answer: 'Die App selbst ist kostenlos. Laufende Kosten entstehen nur über die OpenAI-Nutzung und werden direkt dort nach Verbrauch abgerechnet.'
    - question: 'Kann Billly die Steuerberatung ersetzen?'
      answer: 'Nein. Billly hilft bei der Vorstrukturierung und Übersicht deiner Zahlen, ersetzt aber keine Steuer- oder Rechtsberatung.'
---

Eine kleine App, die einfach zwei Ordner beobachtet: PDFs rein, Dashboard raus. Billly kombiniert OCR und KI, hält Umsatz und Gewinn aktuell und bleibt dabei angenehm unsichtbar.

## Was ich an Buchhaltung wirklich brauche

Viele Tools lösen Buchhaltung als Projekt: Setup, Konten, Kategorien, Integrationen, Sync, Automatisierungen. Das kann sinnvoll sein, aber mein Alltag ist oft simpler. Ich will vor allem drei Dinge:

1. Einen Ort, an dem Rechnungen und Belege landen (PDFs).
2. Eine grobe, aktuelle Übersicht: Umsatz, Ausgaben, Gewinn, Trends.
3. Möglichst wenig manuelles Nachpflegen.

Genau daraus ist Billly entstanden. Nicht als All-in-one-ERP, sondern als ruhiger Helfer, der im Hintergrund mitläuft und mir ein Dashboard baut.

Billly ist eine reine [macOS](https://oliverjessner.at/category/macos/)-App: Ordner auswählen, OpenAI-Token einmalig einfügen, fertig. Ab dann beobachtet die App den Ordner, liest neue PDFs per OCR, lässt Werte via [KI](https://oliverjessner.at/category/ki/) extrahieren und aktualisiert die Kennzahlen automatisch. Natürlich von mir [vibe gecodet](https://oliverjessner.at/category/vibecoding/).

## Der Workflow: Vier Schritte, dann läuft es

Billly beschreibt den Ablauf selbst sehr nüchtern und das ist auch die richtige Erwartungshaltung:

1. Ordner auswählen, in dem deine Aus- und Eingangsrechnungen liegen
1. OCR extrahiert automatisch Text aus dem PDF
1. KI erkennt Werte wie Betrag, Datum und Vendor
1. Dass Dashboard aktualisiert Umsatz, Ausgaben und Gewinn
1. Zurücklehnen

Der Punkt ist nicht, dass das magisch ist, sondern dass du dich nicht darum kümmern musst. Nutze deine Zeit nützlich anstatt PDFs zu managen.

## Dashboard statt Spreadsheet-Pflege

Das Dashboard ist bewusst auf Übersicht getrimmt:

- Umsatz und Gewinn werden aus den Dokumenten berechnet
- Trends und Totals sind auf einen Blick sichtbar
- Monat-zu-Monat-Änderungen sind schnell nachvollziehbar
- Export-ready: eher als Gesprächsgrundlage für Steuerberatung, nicht als Ersatz

Das ist ein wichtige: Billly ist ein Buchhaltungs-Helfer, aber kein Steuerberater und keine Rechtsberatung. Die App kann dir Arbeit abnehmen, nicht Verantwortung.

![screenshot von billly](/assets/images/side_projects/billly/mockups/dashboard.webp)

## Kostenmodell: App gratis, API nach Verbrauch

Billly selbst ist kostenlos. Die laufenden Kosten entstehen über OpenAI-Nutzung, abgerechnet direkt von OpenAI. Als grobe Hausnummer: etwa 50 Rechnungen für rund 1 EUR.

## Für wen Billly gut passt

Billly wirkt am sinnvollsten für:

- Freelancer:innen und kleine Projekte mit überschaubarem Belegvolumen
- Menschen, die ohnehin PDF-first arbeiten und einen klaren Ablageordner haben
- alle, die eine schnelle, ruhige Übersicht wollen, statt ein komplexes System

Wenn du dagegen ein Setup brauchst, das tief in Kontenpläne, automatische Verbuchung und vollständige Steuerlogik geht, ist Billly vermutlich nicht das richtige Tool. Dafür ist es absichtlich nicht gebaut.
