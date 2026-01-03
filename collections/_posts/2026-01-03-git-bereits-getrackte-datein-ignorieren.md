---
layout: post
title: 'Git: Bereits getrackte Datei ignorieren (.gitignore richtig anwenden)'
date: 2026-01-03 12:15:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - git
    - computer-stuff
    - software-development
description: 'Tutorial: So bringst du Git dazu, eine bereits getrackte Datei zu ignorieren – und was das für andere Entwickler bedeutet.'
thumbnail: '/assets/images/gen/blog/git-bereits-getrackte-datein-ignorieren/header_thumbnail.webp'
image: '/assets/images/gen/blog/git-bereits-getrackte-datein-ignorieren/header.webp'
---

Ein häufiger Irrtum bei Git:

> „Ich habe die Datei in `.gitignore` eingetragen, warum trackt Git sie trotzdem?“

Die Erklärung ist simpel – aber wichtig:

**`.gitignore` wirkt nur auf ungetrackte Dateien.**  
Alles, was Git bereits kennt, bleibt auch weiterhin unter Versionskontrolle.

## Was `.gitignore` tatsächlich tut

`.gitignore` verhindert:

-   dass neue, ungetrackte Dateien
-   versehentlich zu Git hinzugefügt werden

Es entfernt **keine Dateien**, die bereits Teil der Git-History sind.

## Lösung: Datei aus dem Index entfernen

Um Git „vergessen zu lassen“, dass eine Datei getrackt wird, musst du sie aus dem **Index** entfernen – nicht vom Dateisystem.

### Einzelne Datei nicht mehr tracken

```bash
git rm --cached <file>
```

Beispiel:

```bash
git rm --cached config.json
```

Was passiert dabei:

-   die Datei bleibt lokal erhalten
-   Git hört auf, sie zu tracken
-   die Änderung wird beim nächsten Commit wirksam

## Ordner rekursiv aus dem Tracking entfernen

Wenn ein kompletter Ordner ignoriert werden soll:

```bash
git rm -r --cached <folder>
```

Beispiel:

```bash
git rm -r --cached build/
```

Damit entfernt Git alle Dateien im Ordner aus dem Index.

## Änderungen committen

Nach dem Entfernen aus dem Index musst du die Änderung committen:

```bash
git commit -m "Stop tracking ignored files"
```

Ab diesem Punkt greift `.gitignore` wie erwartet.

## Wichtiger Hinweis für Teams

**Achtung:**  
Auch wenn die Datei lokal nicht gelöscht wird, gilt:

-   Beim nächsten `git pull` wird die Datei  
    **aus den Working Trees anderer Entwickler entfernt**

Das ist korrektes Verhalten – kann aber überraschend sein.

Deshalb:

-   Team informieren
-   sensible Dateien (z. B. Konfigurationen) vorher abstimmen

## Typische Anwendungsfälle

-   lokale Konfigurationsdateien (`.env`, `config.local.json`)
-   Build-Artefakte, die versehentlich committed wurden
-   IDE-spezifische Dateien

Anderes Thema: [Git: Untracked Dateien aus dem Working Tree entfernen](https://oliverjessner.at/blog/2026-01-03-git-untrackted-dateien-aus-dem-working-tree-entfernen/)
