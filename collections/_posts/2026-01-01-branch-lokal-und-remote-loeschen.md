---
layout: post
title: 'Git: Branch lokal und remote löschen (einfach erklärt)'
date: 2026-01-01 12:10:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - git
    - computer-stuff
    - software-development
description: 'Tutorial für Einsteiger: So löscht du Git-Branches lokal und remote – sicher, verständlich und ohne Fehler.'
thumbnail: '/assets/images/gen/blog/branch-lokal-und-remote-loeschen/header_thumbnail.webp'
image: '/assets/images/gen/blog/branch-lokal-und-remote-loeschen/header.webp'
---

Irgendwann ist jeder Feature-Branch fertig. Der Code ist gemerged, das Ticket abgeschlossen – und der Branch kann weg.  
Spätestens dann stellt sich die Frage:

**Wie lösche ich einen Git-Branch richtig – lokal und auf dem Remote-Repository?**

## Kurzfassung (Executive Summary)

```bash
git branch -d <branchname>               # Lokalen Branch löschen
git push -d <remote_name> <branchname>   # Remote-Branch löschen
```

## Lokalen Branch löschen

Um einen lokalen Branch zu löschen, gibt es zwei Varianten.

Variante 1: Sicheres Löschen (empfohlen)

```bash
git branch -d <branch_name>
```

Löscht den Branch nur, wenn er bereits vollständig gemerged wurdeschützt davor, unabsichtlich Arbeit zu verlieren.

Die Option **-d** ist ein Alias für --delete und löscht den Branch nur, wenn er bereits vollständig in seinen Upstream-Branch gemergt wurde.

## Variante 2: Erzwingen (mit Vorsicht)

```bash
git branch -D <branch_name>
```

löscht den Branch unabhängig vom Merge-Statuskann nicht gemergte Änderungen verwerfen kann nicht gemergte Änderungen verwerfen

**-D** ist die Kurzform von --delete --force.

**Faustregel:**
Wenn du dir nicht sicher bist, nutze -d, nicht -D.

## Wichtiger Hinweis

Du kannst nicht den aktuell ausgecheckten Branch löschen.
Git gibt in diesem Fall eine Fehlermeldung aus.

Wechsle vorher z. B. zu main oder feature:

```bash
git checkout main
```

## Remote-Branch löschen

Um einen Branch auf dem Remote-Repository (z. B. GitHub oder GitLab) zu löschen, verwendest du:

```bash
git push origin --delete <branch_name>
```

Ab Git Version 2.8 funktioniert auch die kürzere Schreibweise:

```bash
git push -d origin <branch_name>
```

## Warum es zwei Schreibweisen gibt

Ältere Git-Versionen nutzten diese Syntax:

```bash
git push origin :<branch_name>
```

Sie funktioniert zwar noch, ist aber deutlich weniger lesbar.
Heute solltest du immer --delete oder -d verwenden, wenn möglich.

Beide Varianten tun dasselbe.

## letzten commit rückgängig machen

Wenn du den letzten Commit rückgängig machen möchtest habe ich folgenden Artikel für dich: [Git: Letzte lokale Commits rückgängig machen (ohne Push)](https://oliverjessner.at/blog/2025-12-31-git-letzten-commit-rueckgaengig-machen/)
