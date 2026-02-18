---
layout: post
title: 'Git: Unstaged Änderungen verwerfen (einfach erklärt)'
date: 2026-01-03 10:15:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - git
    - computer-stuff
    - software-development
description: 'Tutorial: So verwirfst du in Git nicht gestagte Änderungen – für einzelne Dateien oder das gesamte Working Directory.'
thumbnail: '/assets/images/gen/blog/git-unstaged-aenderungen-verwerfen/header_thumbnail.webp'
image: '/assets/images/gen/blog/git-unstaged-aenderungen-verwerfen/header.webp'
---

Im Git-Alltag passiert es schnell:  
Man probiert etwas aus, ändert ein paar Dateien merkt dann aber, dass man diese Änderungen doch nicht behalten möchte.

Die Frage lautet dann:

**Wie kann ich unstaged Änderungen in Git verwerfen, ohne Commits oder gestagte Änderungen zu verlieren?**

## Die empfohlene Lösung: `git restore`

Seit neueren Git-Versionen ist `git restore` der richtige Befehl, um Änderungen im Working Tree zurückzusetzen.

## Alle unstaged Änderungen verwerfen

```bash
git restore .
```

Was passiert dabei:

- alle unstaged Änderungen im aktuellen Verzeichnis werden verworfen
- der Stand entspricht wieder dem letzten Commit
- gestagte Änderungen bleiben unangetastet

## Einzelne Datei zurücksetzen

Wenn du nur eine bestimmte Datei zurücksetzen möchtest:

```bash
git restore path/to/file
```

Beispiel:

```bash
git restore src/config.js
```

Nur diese Datei wird auf den letzten Commit-Stand zurückgesetzt.

## Wichtig: Unterschied zwischen staged und unstaged

Wenn eine Datei **sowohl staged als auch unstaged Änderungen** enthält, gilt:

- `git restore` verwirft **nur die unstaged Änderungen**
- Änderungen, die bereits mit `git add` gestaged wurden, bleiben erhalten

Zur Einordnung:

- `git diff` → zeigt unstaged Änderungen
- `git diff --staged` → zeigt staged Änderungen

`git restore` betrifft nur das, was in `git diff` sichtbar ist.

## Warum nicht mehr `git checkout`?

Früher wurde oft folgender Befehl verwendet:

```bash
git checkout -- .
```

Dieser funktioniert zwar noch, ist aber **nicht mehr empfohlen**.  
Mit `git restore` und `git switch` hat Git die überladene Funktion von `git checkout` bewusst aufgeteilt:

- `git switch` → Branches wechseln
- `git restore` → Dateien zurücksetzen

Das macht Git-Befehle klarer und weniger fehleranfällig.

## Achtung

`git restore` verwirft Änderungen **endgültig**.  
Nicht gestagte Änderungen lassen sich danach nicht wiederherstellen.

Wenn du dir unsicher bist, sichere die Änderungen vorher:

```bash
git stash
```

## Fazit

Unstaged Änderungen zu verwerfen ist mit `git restore` einfach und kontrolliert möglich für einzelne Dateien oder das gesamte Working Directory. Anderes Thema: [ Bereits getrackte Datei ignorieren](https://oliverjessner.at/blog/2026-01-03-git-bereits-getrackte-datein-ignorieren/)
