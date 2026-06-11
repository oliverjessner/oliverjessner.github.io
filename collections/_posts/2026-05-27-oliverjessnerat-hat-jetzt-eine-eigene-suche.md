---
layout: post
title: 'Eigene Suche für Jekyll: Umsetzung auf OliverJessner.at'
date: 2026-05-27 13:30:00 +0100
last_modified_at: 2026-06-11 13:00:10 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - computer-stuff
    - web-development
    - software-development
description: 'Du willst eine schnelle, datenschutzfreundliche Suche für deinen Jekyll-Blog? Hier zeige ich die technische Umsetzung live auf OliverJessner.at.'
thumbnail: '/assets/images/gen/blog/oliverjessnerat-hat-jetzt-eine-eigene-suche/header_thumbnail.webp'
image: '/assets/images/gen/blog/oliverjessnerat-hat-jetzt-eine-eigene-suche/header.webp'
faq:
    - question: 'Wie öffne ich die Suche auf OliverJessner.at?'
      answer: 'Die Suche lässt sich über /search/ öffnen. Zusätzlich funktioniert sie per Tastenkürzel mit Strg+K oder Cmd+K.'
    - question: 'Was kann ich über die Suche finden?'
      answer: 'Die Suche hilft dabei, Blogposts, Themen und Inhalte auf OliverJessner.at schneller zu finden.'
    - question: 'Warum gibt es eine eigene Suche?'
      answer: 'Weil eine wachsende Website eine bessere Orientierung braucht als nur Chronologie, Kategorien und manuelle Navigation.'
---

oliverjessner.at hat jetzt eine eigene Suche. Damit lassen sich ältere Texte, Themen und wiederkehrende Begriffe schneller finden, ohne sich durch Archivseiten klicken zu müssen.

## Eine Suche für die eigene Website

Auf oliverjessner.at sind in den vergangenen Jahren viele Texte entstanden. Um genau zu sein: 248 Blogposts allein (Stand: 27.05.2026). Die Themen reichen von Softwareentwicklung über Tech bis hin zu Retro-Gaming und digitalen Werkzeugen. Je mehr Inhalte dazukommen, desto wichtiger wird die Frage: Wie findet man einen bestimmten Artikel wieder?
Genau dafür gibt es jetzt eine eigene Suche.

## Aufruf über Strg+K, Cmd+K oder /search/

Die Suche lässt sich auf drei Arten öffnen. Unter Windows und Linux funktioniert das Tastenkürzel Strg+K. Auf dem Mac ist es Cmd+K. Außerdem ist die Suchseite direkt über /search/ erreichbar.

Damit wird die Suche nicht als versteckte Zusatzfunktion behandelt, sondern als normaler Teil der Website. Wer gezielt nach einem Thema sucht, muss nicht erst über Kategorien, Datumsarchive oder einzelne Übersichtsseiten gehen.

![Die Suche auf oliverjessner.at](/assets/images/gen/blog/oliverjessnerat-hat-jetzt-eine-eigene-suche/search.webp)

## Technical Details

Die Suche läuft vollständig im Browser. oliverjessner.at bleibt damit weiterhin eine 100 Prozent statische Website. Es gibt keine eigene Serverlogik, keine Datenbankabfragen im Hintergrund und keine dynamische Anwendung, die Inhalte erst zur Laufzeit zusammenbauen muss. Die Seite bleibt schnell, einfach hostbar und technisch überschaubar.
