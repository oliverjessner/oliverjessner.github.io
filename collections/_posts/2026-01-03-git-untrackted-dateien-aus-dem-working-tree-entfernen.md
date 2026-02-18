---
layout: post
title: 'Git: Untracked Dateien aus dem Working Tree entfernen'
date: 2026-01-03 09:50:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - git
    - computer-stuff
    - software-development
description: 'Tutorial: So entfernst du ungetrackte Dateien und Ordner aus deinem Git-Working-Tree – sicher, kontrolliert und ohne böse Überraschungen.'
thumbnail: '/assets/images/gen/blog/git-untrackted-dateien-aus-dem-working-tree-entfernen/header_thumbnail.webp'
image: '/assets/images/gen/blog/git-untrackted-dateien-aus-dem-working-tree-entfernen/header.webp'
---

Build-Artefakte, temporäre Dateien, Logs oder lokale Experimente: Im Laufe der Zeit sammelt sich im Working Tree einiges an, das **nicht von Git verwaltet** wird.

Diese sogenannten _untracked files_ können:

- Builds verfälschen
- Tests beeinflussen
- Verzeichnisse unübersichtlich machen

Die Lösung dafür ist der Git-Befehl `git clean`.

## Achtung: `git clean` löscht Dateien endgültig

**Warnung:**
`git clean` entfernt Dateien **physisch vom Dateisystem**.  
Gelöschte Dateien landen **nicht** im Papierkorb und lassen sich nicht über Git wiederherstellen.

Deshalb gilt: **Immer zuerst einen Dry-Run machen.**

## Schritt 1: Anzeigen, was gelöscht würde (Dry Run)

```bash
git clean -n -d
```

- **-n** → zeigt nur an, was passieren würde
- **-d** → berücksichtigt auch ungetrackte Ordner

Dieser Befehl ist völlig ungefährlich und sollte immer zuerst ausgeführt werden.

## Schritt 2: Untracked Dateien löschen

Wenn die Liste passt, kannst du die Dateien wirklich entfernen:

```bash
git clean -f
```

Da Git standardmäßig Schutzmechanismen aktiviert hat, ist -f (force) zwingend notwendig.

## Untracked Ordner mit löschen

```bash
git clean -f -d
```

Oder kurz:

```bash
git clean -fd
```

Damit werden auch komplette Verzeichnisse entfernt, die nicht von Git verwaltet werden.

## Ignorierte Dateien entfernen (.gitignore)

Standardmäßig respektiert git clean die Regeln aus .gitignore.

Nur ignorierte Dateien löschen

```bash
git clean -f -X
```

Typischer Anwendungsfall:
Build-Artefakte neu erzeugen, ohne manuell angelegte Dateien zu verlieren.

## Ignorierte und nicht ignorierte Dateien löschen

```bash
git clean -f -x
```

Das ist der radikalste Modus:
Alles, was nicht von Git getrackt wird, fliegt raus.

Großes X vs. kleines x:

- **-X** → nur ignorierte Dateien
- **-x** → alle untracked Dateien

## Warum -f nötig ist

Git verlangt das -f-Flag, wenn die Konfiguration clean.requireForce aktiv ist (Standard).
Ohne -f, -n oder -i passiert bewusst gar nichts.

Das ist Absicht und ein Schutz vor versehentlichem Datenverlust.

## Fazit

git clean ist das richtige Werkzeug, um den Working Tree aufzuräumen aber nur, wenn man es kontrolliert einsetzt. Anderes Thema: [Git: git pull "überschreiben", lokale Dateien](https://oliverjessner.at/blog/2026-01-03-git-pull-ueberschreiben/)
