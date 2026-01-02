---
layout: post
title: 'Git: Letzte lokale Commits rückgängig machen (ohne Push)'
date: 2025-12-31 11:39:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - git
    - computer-stuff
    - software-development
description: 'Tutorial: So machst du den letzten lokalen Git-Commit rückgängig, ohne etwas auf den Server gepusht zu haben.'
thumbnail: '/assets/images/gen/blog/git-letzten-commit-rueckgaengig-machen/header_thumbnail.webp'
image: '/assets/images/gen/blog/git-letzten-commit-rueckgaengig-machen/header.webp'
---

Falsche Dateien committed, aber noch nicht gepusht? Passiert schneller als man denkt: Du committest, merkst danach, dass die falschen Dateien drin sind und zum Glück ist noch nichts gepusht.

Die gute Nachricht: Solange der Commit nur lokal existiert, lässt er sich sehr sauber "zurückdrehen", ohne dass du History-Konflikte mit anderen erzeugst.

## Schritt 0: Der „Unfall“-Commit

Zur Einordnung ein typisches Beispiel:

```bash
git commit -m "Something terribly misguided"
```

## Schritt 1: Letzten Commit rückgängig machen, Änderungen behalten:

```bash
git reset HEAD~
```

Wichtig: Wenn du nur den Commit entfernen wolltest (aber die Änderungen behalten möchtest), bist du an dieser Stelle im Prinzip schon fertig. Du hast jetzt wieder den Zustand "Änderungen vorhanden, aber nicht committed".

## Schritt 2: Dateien korrigieren

Jetzt kannst du die falschen Dateien entfernen, richtige hinzufügen oder Inhalte korrigieren:

Schritt 3: Alles neu committen

Wenn der Stand passt, stage die gewünschten Dateien erneut:

```bash
git add .
```

Und committe dann erneut, mit der ursprünglichen Commit-Message als Vorlage:

```bash
git commit -c ORIG_HEAD
```

Committed die Änderungen erneut und verwende dabei die alte Commit-Nachricht. reset hat den vorherigen HEAD nach .git/ORIG_HEAD kopiert; ein Commit mit -c ORIG_HEAD öffnet einen Editor, der zunächst die Commit-Nachricht des alten Commits enthält und es dir erlaubt, sie zu bearbeiten.
Wenn du die Nachricht nicht ändern musst, kannst du stattdessen die Option -C verwenden.

Fazit

Wenn ein Commit lokal schiefgeht und noch nicht gepusht wurde, ist git reset HEAD~ der schnellste und sauberste Weg, um die History zu korrigieren und danach korrekt neu zu committen.

Wer seinen lokalen Branch löschen möchte der kann diesen Blogpost lesen: [Git: Branch lokal und remote löschen (einfach erklärt)](https://oliverjessner.at/blog/2026-01-01-branch-lokal-und-remote-loeschen/).
