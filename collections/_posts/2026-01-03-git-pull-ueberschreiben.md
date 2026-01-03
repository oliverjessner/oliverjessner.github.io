---
layout: post
title: 'Git: git pull "überschreiben", lokale Dateien auf Remote-Stand zurücksetzen'
date: 2026-01-03 10:25:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - git
    - computer-stuff
    - software-development
description: 'Tutorial: So setzt du deinen lokalen Branch auf den Stand von origin/main zurück – inklusive Backup-Branch und Umgang mit uncommitted Änderungen.'
thumbnail: '/assets/images/gen/blog/   /header_thumbnail.webp'
image: '/assets/images/gen/blog/git-pull-ueberschreiben/header.webp'
---

Manchmal ist der lokale Stand einfach kaputt: Konflikte, falsche Dateien, experimentelle Änderungen und du willst nur noch eins:

**Alles lokal wegwerfen und exakt den Stand vom Remote übernehmen.**

Wichtig: Ein normales `git pull` ist dafür nicht gedacht. Was du suchst, ist ein kontrollierter Reset auf den Remote-Branch.

## Achtung: Dabei gehen lokale Änderungen verloren

**Warnung:**  
Alle **uncommitted** Änderungen an getrackten Dateien gehen verloren auch wenn sie bereits gestaged sind (`git add`).

-   getrackte Dateien: betroffen
-   ungetrackte Dateien (nicht von Git verwaltet): bleiben unangetastet

Wenn du etwas behalten willst: **stash oder committen**, bevor du weitermachst.

## Kurzfassung (Executive Summary)

```bash
git fetch --all
git branch backup-main
git reset --hard origin/main
```

## Schritt 1: Remote-Stand holen (ohne Merge)

```bash
git fetch --all
```

git fetch lädt die neuesten Änderungen vom Remote herunter, ohne etwas zu mergen oder zu rebasen. Das ist die sichere Basis für alles Weitere.

## Schritt 2: Backup deines aktuellen Branches erstellen

Bevor du hart zurücksetzt, lege dir eine Sicherung an:

```bash
git branch backup-main
```

Damit hast du jederzeit einen Ankerpunkt, falls du doch noch etwas aus dem alten Stand brauchst.

## Schritt 3: Lokal exakt auf Remote-Stand zurücksetzen

Jetzt setzt du deinen lokalen Branch auf den Stand von origin/main zurück:

```bash
git reset --hard origin/main
```

Was passiert dabei:

Git setzt den Branch-Zeiger auf denselben Commit wie origin/main

**--hard** aktualisiert deinen Working Tree und Index so, dass alle Dateien exakt dem Remote-Stand entsprechen

lokale uncommitted Änderungen an getrackten Dateien werden verworfen

Lokale Commits behalten (aber trotzdem resetten)

Wenn du lokale Commits nicht verlieren willst, kannst du sie vor dem Reset in einen neuen Branch „parken“:

```bash
git checkout main
git branch new-branch-to-save-current-commits
git fetch --all
git reset --hard origin/main
```

Danach:

-   main entspricht exakt origin/main
-   deine bisherigen lokalen Commits sind weiterhin in new-branch-to-save-current-commits vorhanden

## Uncommitted Änderungen retten: stash

Wenn du uncommitted Änderungen behalten willst, sichere sie vorher:

```bash
git stash
```

Nach dem Reset kannst du sie wieder anwenden:

```bash
git stash pop
```

> Hinweis: stash pop kann Merge-Konflikte erzeugen, wenn sich die gleichen Dateien auch remote verändert haben.

Anderes Thema: [Git: Remote-Branch auschecken (einfach erklärt)](https://oliverjessner.at/blog/2026-01-03-git-checkout-remote-branch)
