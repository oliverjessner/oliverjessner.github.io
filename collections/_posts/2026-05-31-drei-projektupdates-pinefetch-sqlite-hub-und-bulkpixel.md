---
layout: post
title: 'Drei Projektupdates – PineFetch, SQLite Hub und BulkPixel'
date: 2026-05-31 17:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - software-engineering
    - vibe-coding
description: 'Drei Updates für PineFetch, SQLite Hub und BulkPixel, die im Alltag mehr ausmachen als große Feature-Versprechen'
thumbnail: '/assets/images/gen/blog/drei-projektupdates-pinefetch-sqlite-hub-und-bulkpixel/header_thumbnail.webp'
image: '/assets/images/gen/blog/drei-projektupdates-pinefetch-sqlite-hub-und-bulkpixel/header.webp'
faq:
    - question: 'Was wurde bei PineFetch verbessert?'
      answer: 'PineFetch bekommt Unterstützung durch ein Chrome-Plugin, mit dem einzelne Videos oder ganze Videolisten direkt an die App gesendet werden können.'
    - question: 'Was hat sich bei SQLite Hub geändert?'
      answer: 'SQLite Hub speichert Einstellungen nun im localStorage, verzichtet an relevanten Stellen auf innerHTML-Rendering und stellt lange Titel robuster dar.'
    - question: 'Was wurde bei BulkPixel angepasst?'
      answer: 'BulkPixel setzt beim Clear-All-Button nun auch Postfixe und Präfixe zurück, was wiederholte Arbeitsabläufe etwas schneller macht.'
---

Nicht jedes Update braucht eine große Versionsnummer. Manchmal sind es kleine Änderungen an Bedienung, Speicherung und Robustheit, die ein eigenes Tool im Alltag deutlich angenehmer machen.

## PineFetch bekommt einen besseren Weg aus dem Browser

Bei PineFetch geht es darum, Videos strukturierter zu sammeln und weiterzuverarbeiten. Bisher war der Import ein Teil des Workflows, bei dem man schnell merkt, wie sehr kleine Unterbrechungen nerven können. Link kopieren, App öffnen, Link einfügen, Queue prüfen. Das funktioniert, fühlt sich aber nicht besonders direkt an.

Darum gibt es jetzt ein Chrome-Plugin: [PineFetch-Link-Dump](https://github.com/oliverjessner/PineFetch-Link-Dump). Die Idee ist einfach. Wenn ich auf YouTube bin, soll ich einzelne Videos oder ganze Listen direkt an PineFetch senden können. Das ist besonders praktisch, wenn man nicht nur ein einzelnes Video speichern möchte, sondern mehrere Videos aus einem Kanal, einer Stream-Übersicht oder einer Recherche-Session.

Damit wird PineFetch stärker zu einem Werkzeug, das dort beginnt, wo die Quelle liegt: im [Browser](https://oliverjessner.at/category/browser/). Der Browser ist in solchen Workflows nicht nur Anzeigeprogramm, sondern oft der Ort, an dem entschieden wird, welche Inhalte später verarbeitet werden sollen.

Zusätzlich wurde die History verbessert. Sie wird nun in SQLite gespeichert. Das passt besser zum Charakter des Projekts, weil PineFetch ohnehin lokal und nachvollziehbar arbeiten soll. Eine einfache History ist gut. Eine persistente History, die nicht nur irgendwie im Speicher hängt, ist im Alltag aber deutlich nützlicher.

Auch die Settings für das Chrome-Plugin sind Teil dieses Updates. Das klingt unspektakulär, ist aber wichtig. Sobald ein Plugin mit einer lokalen App sprechen soll, braucht es eine Konfiguration, die verständlich, wiederholbar und nicht zu fragil ist. Gerade bei kleinen Tools entscheidet oft nicht das große Kernfeature über die Nutzung, sondern ob die Verbindung zwischen den einzelnen Teilen zuverlässig bleibt.

## SQLite Hub wird robuster im Alltag

Auch bei [SQLite Hub](https://oliverjessner.at/sqlite-hub/) ging es weniger um ein spektakuläres neues Feature, sondern um Stabilität und Verhalten in echten Nutzungssituationen.

Ein Punkt ist localStorage für Settings. Das ist eine kleine Änderung mit praktischer Wirkung. Wenn ein Tool Einstellungen vergisst, fühlt es sich schnell unfertig an.

Ein weiterer Punkt ist der Verzicht auf innerHTML-Rendering an allen Stellen.

Dazu kommt ein kleiner UI-Fix: lange Titel brechen nun besser um. Konkret hilft hier word-break: all. Das ist nicht schön im Sinne von typografischer Perfektion, aber praktisch. Lange Dateinamen, Tabellennamen oder automatisch erzeugte Titel können Layouts schnell sprengen.

## BulkPixel spart ein paar Sekunden

Bei [BulkPixel](http://oliverjessner.at/bulkpixel) gab es einen kleineren Fix am Remove-All-Verhalten. Der Button setzt nun auch Postfixe und Präfixe zurück.

Das klingt banal, spart aber in wiederholten Abläufen ein paar Sekunden. Man löscht eine Liste, startet neu, aber bestimmte Felder bleiben befüllt. Dann muss man sie händisch entfernen. Einmal ist das egal. Zehnmal hintereinander ist es störend.
