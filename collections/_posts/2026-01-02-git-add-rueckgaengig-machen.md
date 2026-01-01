---
layout: post
title: 'Git: git add rückgängig machen (vor dem Commit)'
date: 2026-01-02 13:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - git
    - computer-stuff
    - software-development
description: 'Tutorial: So machst du ein git add rückgängig – einzelne Dateien oder alle auf einmal, ohne Inhalte zu verlieren.'
thumbnail: '/assets/images/gen/blog/git-add-rueckgaengig-machen/header_thumbnail.webp'
image: '/assets/images/gen/blog/git-add-rueckgaengig-machen/header.webp'
---

Ein Klassiker im Git-Alltag: Man fügt Dateien mit `git add` zum Commit hinzu und merkt danach, dass eine Datei doch nicht hinein sollte.

Die gute Nachricht: Ein `git add` lässt sich jederzeit rückgängig machen, solange noch kein Commit erfolgt ist.

## Eine bestimmte Datei aus dem Staging-Bereich entfernen

Um **eine einzelne Datei** wieder aus dem Staging-Bereich zu entfernen, reicht:

```bash
git reset <file>
```

Beispiel:

```bash
git reset config.json
```

Was passiert dabei:

-   die Datei wird aus dem Index (Staging Area) entfernt
-   der Dateiinhalt bleibt unverändert
-   Änderungen gehen nicht verloren

Kurz gesagt: Die Datei ist wieder „unstaged“.

## Alle Dateien wieder unstagen

Wenn du alle aktuell gestagten Dateien auf einmal zurücknehmen möchtest:

```bash
git reset
```

Danach ist der Staging-Bereich leer, deine Änderungen liegen wieder ganz normal im Working Tree.

Was git reset hier wirklich tut

-   In diesem Kontext ist git reset harmlos:
-   kein Commit wird verändert
-   keine Datei wird gelöscht
-   nur der Staging-Bereich wird angepasst

Das ist etwas völlig anderes als ein git reset --hard, das tatsächlich Änderungen verwerfen kann.

## Hinweis zu älteren Git-Versionen

In sehr alten Git-Versionen war oft folgende Schreibweise nötig:

```bash
git reset HEAD <file>
git reset HEAD
```

Diese Variante konnte jedoch Probleme machen, wenn:

-   noch kein Commit existierte
-   HEAD nicht eindeutig war

Seit **git 1.8.2** ist das deutlich einfacher:
git reset funktioniert auch vor dem ersten Commit und setzt den Index einfach zurück.

Ein versehentliches git add ist kein Problem.
Mit git reset lässt sich der Staging-Bereich jederzeit sauber korrigierenohne Risiko für den Code. Anderes Thema: Wenn du einen lokalen Git-Branch umbenennen willst, schau dir mein Tutorial dazu an: [Git: Lokalen Branch umbenennen (einfach erklärt)](https://oliverjessner.github.io/blog/2026-01-02-git-lokalen-branch-umbenennen/).
