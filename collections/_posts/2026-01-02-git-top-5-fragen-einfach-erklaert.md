---
layout: post
title: 'Die 5 meistgestellten Git-Fragen – einfach erklärt'
date: 2026-01-02 16:10:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - git
    - computer-stuff
    - software-development
description: 'Die fünf häufigsten Git-Fragen einfach erklärt: git add rückgängig machen, git fetch vs pull, Branch umbenennen, löschen und Commits zurücknehmen.'
thumbnail: '/assets/images/gen/blog/git-top-5-fragen-einfach-erklaert/header_thumbnail.webp'
image: '/assets/images/gen/blog/git-top-5-fragen-einfach-erklaert/header.webp'
---

Git gehört zu den Werkzeugen, die fast jeder Entwickler nutzt und trotzdem regelmäßig für Verwirrung sorgen. Viele Fragen tauchen immer wieder auf, unabhängig vom Erfahrungslevel.

Dieser Artikel bündelt **die fünf meistgestellten Git-Fragen**, die mir in der Praxis am häufigsten begegnen, jeweils kurz, verständlich und ohne unnötige Theorie.

## 1. Wie mache ich `git add` rückgängig (vor dem Commit)?

Zu früh Dateien gestaged? Kein Problem.

```bash
git reset <file>
```

Oder für alle Dateien:

```bash
git reset
```

Damit entfernst du Dateien aus dem Staging-Bereich, ohne Änderungen zu verlieren.

Ausführlicher erklärt in folgenden Blogpost: [Git: git add rückgängig machen](https://oliverjessner.at/blog/2026-01-02-git-add-rueckgaengig-machen/)

## 2. Was ist der Unterschied zwischen git fetch und git pull?

Kurz gesagt:

git fetch holt Änderungen, verändert aber nichts lokal
git pull holt Änderungen und merged oder rebased sie sofort

```bash
git fetch
git pull
```

git fetch gibt dir Kontrolle, git pull spart Zeit aber kann Überraschungen mitbringen.

Ausführlicher erklärt in folgenden Blogpost: [Git: git fetch vs git pull](https://oliverjessner.at/blog/2026-01-02-unterschied-zwischen-git-fetch-und-git-pull/)

## 3. Wie benenne ich einen lokalen Git-Branch um?

Aktuellen Branch umbenennen:

```bash
git branch -m <newname>
```

Anderen Branch umbenennen:

```bash
git branch -m <oldname> <newname>
```

Danach solltest du den neuen Branch pushen und den alten remote löschen.

Ausführlicher erklärt in folgenden Blogpost: [Git: Branch umbenennen](https://oliverjessner.at/blog/2026-01-02-git-lokalen-branch-umbenennen/)

## 4. Wie lösche ich einen Git-Branch lokal und remote?

Lokalen Branch löschen:

```bash
git branch -d <branchname>
```

Remote-Branch löschen:

```bash
git push origin --delete <branchname>
```

**-d** ist dabei bewusst sicher: Git löscht nur gemergte Branches

Ausführlicher erklärt in folgenden Blogpost: [Git: Branch löschen](https://oliverjessner.at/blog/2026-01-01-branch-lokal-und-remote-loeschen/)

## 5. Wie mache ich den letzten lokalen Commit rückgängig (ohne Push)?

Wenn noch nichts gepusht wurde:

```bash
git reset HEAD~
```

Die Änderungen bleiben erhalten und können korrigiert neu committed werden.

Optional mit alter Commit-Message:

```bash
git commit -c ORIG_HEAD
```

Ausführlicher erklärt in folgenden Blogpost: [Git: Letzten Commit rückgängig machen](https://oliverjessner.at/blog/2025-12-31-git-letzten-commit-rueckgaengig-machen/)

## Fazit

Die meisten Git-Probleme entstehen nicht durch komplizierte Szenarien, sondern durch Unsicherheit bei alltäglichen Befehlen. Wer diese fünf Fragen versteht, ist im Git-Alltag deutlich souveräner unterwegs.

Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
