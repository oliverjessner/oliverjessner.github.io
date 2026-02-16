---
layout: post
title: 'PineFetch – mal anders: yt-dlp als lokale macOS-App'
date: 2026-02-01 19:00:00 +0100
last_modified_at: 2026-02-16 13:00:10 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - macos
    - javascript
    - software-development
    - vibecoding
description: 'PineFetch ist eine lokale macOS-App, die yt-dlp mit Queue, Presets und Audio-Export in eine minimalistische Oberfläche bringt'
thumbnail: '/assets/images/gen/blog/pinefetch-mal-anders-yt-dlp-als-lokale-macos-app/header_thumbnail.webp'
image: '/assets/images/gen/blog/pinefetch-mal-anders-yt-dlp-als-lokale-macos-app/header.webp'
faq:
    - question: 'Was ist PineFetch?'
      answer: 'Eine lokale macOS-App, die yt-dlp in eine einfache Desktop-Oberfläche mit Queue, Presets und optionalem Audio-Export verpackt.'
    - question: 'Worin unterscheidet sich PineFetch von Browser-Tools?'
      answer: 'PineFetch arbeitet lokal, transparent und ohne Cloud-Account. Damit bleiben Dateien und Workflow auf deinem Gerät kontrollierbar.'
    - question: 'Unterstützt PineFetch nur macOS?'
      answer: 'Aktuell gibt es einen fertigen macOS-Build. Da PineFetch mit Tauri gebaut ist, lassen sich Windows- und Linux-Builds aus dem Repo erstellen.'
    - question: 'Darf ich damit beliebige Inhalte herunterladen?'
      answer: 'Nein. Der Einsatz ist für Inhalte gedacht, die dir gehören oder für die du eine klare Nutzungserlaubnis hast.'
---

Nach [NO BULLSHIT RSS](https://oliverjessner.at/no-bullshit-rss) kommt [PineFetch](https://oliverjessner.at/pinefetch): eine lokale macOS-App, die yt-dlp in eine ruhige Oberfläche packt, mit Queue, Presets und optionalen Logs, damit Downloads planbar bleiben.

## PineFetch – warum noch ein Downloader?

Wer regelmäßig mit Videos arbeitet, kennt das Muster: Man will schnell ein eigenes Video archivieren, eine Aufnahme offline sichern oder aus einem Upload die Audiospur ziehen. Technisch geht das seit Jahren, praktisch scheitert es oft an Friktion.

CLI Tools sind schnell, aber nicht jede:r will im Terminal leben. Browser Extensions sind bequem, aber oft intransparent, kurzlebig oder hängen an irgendwelchen Cloud Diensten. Genau in diese Lücke fällt [PineFetch](https://oliverjessner.at/pinefetch): eine kleine Desktop App für [macos](https://oliverjessner.at/category/macos/), die die Stärken von yt-dlp nutzt, ohne sich wie ein wackeliges Bastelprojekt anzufühlen.

> Wichtig dabei: PineFetch ist explizit für Inhalte gedacht, die du selbst besitzt oder für die du eine klare Erlaubnis hast.

## Was PineFetch konkret macht

PineFetch ist eine macOS Desktop App, die Downloads für YouTube und andere von yt-dlp unterstützte Plattformen vereinfacht.

Die wichtigsten Bausteine:

- Queueing: Mehrere Links einfügen, PineFetch arbeitet sie nacheinander ab.
- Audio Extraction: MP3 oder oog exportieren, wenn du die Rechte dazu hast.
- Transparent Engine: Kein magischer Download Button, sondern ein klarer Wrapper um yt-dlp.
- Local first: Dateien bleiben auf deinem Gerät, kein Account, keine Cloud Uploads.
- Clean Logs: Einblendbar, wenn man Debugging oder Transparenz braucht.

## Warum ich PineFetch nach NO BULLSHIT RSS gebaut habe

Wir leben in einer Zeit, in der Vibe Coding funktioniert. Beides und auch [KlauselCheck](https://oliverjessner.at/blog/2025-12-23-klauselcheck-com/) sind für mich Experimente, um herauszufinden, wo Vibe Coding aktuell steht. Das Ganze kombiniere ich mit Ideen, die ich schon seit Jahren umsetzen wollte, für die ich aber lange zu faul war.

Das Wichtige: Viele Entwickler wollen nicht sehen, dass Vibe Coding heute schon extrem viel Arbeit abnehmen kann und dass das in Zukunft noch mehr wird. Wir werden in **3 bis 8 Jahren** wahrscheinlich nur noch extrem wenig Code selbst schreiben, und Produktentwickler werden die wichtigste Einheit im Software-Team.

## Windows und Linux

Aktuell gibt es PineFetch nur als macOS-Desktop-App, aber sie ist in Tauri gebaut. Unter Linux oder Windows kannst du dir mit einem einzigen Command eine eigene Version builden. Das Repo findest du [hier](https://github.com/oliverjessner/PineFetch).
