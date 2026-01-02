---
layout: post
title: 'Git: Lokalen Branch umbenennen (einfach erklärt)'
date: 2026-01-02 10:41:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - git
    - computer-stuff
    - software-development
description: 'Tutorial: So benennst du einen lokalen Git-Branch um – inklusive Push, Upstream-Update und typischer Stolperfallen.'
thumbnail: '/assets/images/gen/blog/git-lokalen-branch-umbenennen/header_thumbnail.webp'
image: '/assets/images/gen/blog/git-lokalen-branch-umbenennen/header.webp'
---

Branch-Namen entstehen oft schnell: `feature-xyz`, `fix-bug-3`, `testASDF`. Später merkt man, dass der Name nicht mehr passt oder einfach besser lesbar sein sollte. Die gute Nachricht: Einen lokalen Git-Branch umzubenennen ist unkompliziert.

## Aktuellen Branch umbenennen

Wenn du dich **bereits auf dem Branch befindest**, den du umbenennen möchtest, reicht ein einziger Befehl:

```bash
git branch -m <newname>
```

Beispiel:

```bash
git branch -m feature/login-flow
```

Der Branch wird sofort lokal umbenannt.

## Anderen Branch umbenennen

Du kannst auch einen Branch umbenennen, ohne ihn ausgecheckt zu haben:

```bash
git branch -m <oldname> <newname>
```

Beispiel:

```bash
git branch -m fix-bug hotfix/login-bug
```

-m ist dabei die Kurzform von --move.

## Umbenannten Branch zum Remote pushen

Nach dem Umbenennen existiert der neue Branch zunächst nur lokal. Um ihn auf das Remote-Repository zu pushen und korrekt zu verknüpfen:

```bash
git push origin -u <newname>
```

-u setzt den neuen Branch als Upstream, sodass zukünftige git pull- und git push-Befehle ohne Zusatzparameter funktionieren.

## Alten Remote-Branch löschen

Der alte Branch-Name existiert auf dem Remote weiterhin.
Diesen kannst du anschließend löschen:

```bash
git push origin --delete <oldname>
```

## Sonderfall: Nur Groß-/Kleinschreibung ändern

Auf Windows und anderen case-insensitiven Dateisystemen reicht -m manchmal nicht aus, wenn sich nur die Schreibweise ändert (z. B. feature/Login → feature/login).

In diesem Fall erzwingt -M die Umbenennung:

```bash
git branch -M <newname>
```

Ohne -M meldet Git sonst häufig: **branch already exists**. So bleibt das Remote-Repository aufgeräumt.

Anderes Thema: Wenn du den Unterschied zwischen `git fetch` und `git pull` verstehen willst, schau dir mein Tutorial dazu an: [Git: Was ist der Unterschied zwischen git fetch und git pull?](https://oliverjessner.github.io/blog/2026-01-02-unterschied-zwischen-git-fetch-und-git-pull/).
