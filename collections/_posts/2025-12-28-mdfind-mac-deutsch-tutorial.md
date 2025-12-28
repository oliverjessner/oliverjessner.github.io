---
layout: post
title: 'Wie funktioniert mdfind unter Mac eigentlich? Tutorial'
date: 2025-12-28 12:55:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - macos
    - computer-stuff
    - terminal
description: 'Tutorial: Mit dem macOS-Terminal-Befehl mdfind Dateien und Inhalte über den Spotlight-Index schnell und gezielt durchsuchen.'
thumbnail: '/assets/images/gen/blog/mdfind-mac-deutsch-tutorial/header_thumbnail.webp'
image: '/assets/images/gen/blog/mdfind-mac-deutsch-tutorial/header.webp'
---

## Spotlight im Terminal?

Wer unter macOS nach Dateien sucht, nutzt meist Spotlight oder den Finder. Beides funktioniert gut solange man ungefähr weiß, wonach man sucht. Wird es ungenauer oder komplexer, stößt die grafische Suche schnell an ihre Grenzen.

Genau hier kommt der Terminal-Befehl `mdfind` ins Spiel.

`mdfind` greift direkt auf den Spotlight-Index von macOS zu und ermöglicht es, Dateien und Inhalte gezielt über das Terminal zu durchsuchen – schnell, präzise und ohne grafische Oberfläche.

## Wie installier ich mdfind?

Gar nicht.  
`mdfind` ist **fester Bestandteil von macOS** und steht standardmäßig im Terminal zur Verfügung. Kein Homebrew, keine Zusatzsoftware.

## Beispiel

Um alle Dateien zu finden, die das Wort „Rechnung“ enthalten, reicht ein einzelner Befehl:

```bash
mdfind "Paper"
```

Nur in einem bestimmten Ordner suchen:

```bash
mdfind -onlyin ~/Downloads "Angebote"
```

Nach bestimmten Dateitarten filtern:

```bash
mdfind -name oli kind:folder
```

| File format                   | kind term |
| ----------------------------- | --------- |
| jpeg / jpg, png, gif, tiff    | image     |
| Applications (.app)           | app       |
| mp3, ogg                      | music     |
| mp4, mov, mpeg                | movie     |
| Bookmarks                     | bookmark  |
| Email messages                | email     |
| Folders                       | folder    |
| MS Word documents (docx, dot) | word      |

Nach dateityp filtern

```bash
mdfind "kMDItemFSName == '*.pdf'"
```

Kombinierte Suche:

```bash
mdfind -name header AND created:28.01.2025
```

**Anmerkung**: Die Datumsangabe erfolgt je nach lokalisierung im vorgegebenen Format.

Filegrößen filtern:

```bash
mdfind -interpret name:header AND size:\<1024 AND size:\>10
```

Hier werden Dateien zwischen 10 und 1024 Bytes gesucht mit "header" im Namen.

## Fazit

Mit mdfind wird Spotlight planbar und reproduzierbar. Der Befehl ist ideal für alle, die regelmäßig mit vielen Dateien, Projekten oder Recherchen arbeiten und gezielt Ergebnisse brauchen. Im vergleich zu grep oder find ist mdfind oft schneller und liefert präzisere Resultate dank des integrierten Spotlight-Index.
