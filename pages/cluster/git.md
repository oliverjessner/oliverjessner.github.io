---
layout: cluster-guide
category: git
slug: git
title: Git
description: Git-Anleitungen für Rückgängig-Schritte, Branches, Remotes, Aufräumen und typische Notfälle im Alltag.
permalink: /cluster/git/
sitemap: false
nav: false
---

## Git-Befehle einfach erklärt

Du hast versehentlich Dateien gestaged, einen Commit falsch gesetzt, lokale Änderungen kaputt gemacht oder einen Branch falsch benannt? In dieser Git-Notfallzentrale findest du kurze Anleitungen für typische Alltagspanik: rückgängig machen, Branches verwalten, Remote-Probleme lösen und Dateien sauber aus Git entfernen.

Git ist im Alltag selten kompliziert, solange alles funktioniert. Schwierig wird es meistens dann, wenn ein Befehl schon ausgeführt wurde und du nicht sicher bist, ob du Änderungen verlieren könntest. Genau dafür ist diese Übersicht gedacht: Sie zeigt dir, welche Git-Anleitung zu welchem Problem passt.

## Git rückgängig machen

Wenn du etwas zurücknehmen willst, kommt es darauf an, in welchem Zustand deine Änderungen gerade sind. Wurden sie nur bearbeitet, schon gestaged, bereits committed oder sogar gepusht?

- **[git add rückgängig machen](/blog/2026-01-02-git-add-rueckgaengig-machen/)**: Wenn du Dateien versehentlich in die Staging Area gelegt hast.
- **[Unstaged Änderungen verwerfen](/blog/2026-01-03-git-unstaged-aenderungen-verwerfen/)**: Wenn du lokale Änderungen löschen und zur letzten Version zurückkehren willst.
- **[Lokale Commits rückgängig machen](/blog/2025-12-31-git-letzten-commit-rueckgaengig-machen/)**: Wenn du bereits committed, aber noch nicht gepusht hast.
- **Commit nach Push rückgängig machen**: Wenn der Commit schon im Remote-Repository liegt, ist meistens `git revert` der sichere Weg.
- **[Alle lokalen Änderungen verwerfen](/blog/2026-01-03-git-pull-ueberschreiben/)**: Wenn dein Arbeitsstand komplett auf den Remote-Stand zurückgesetzt werden soll.

## Branches verwalten

Viele Git-Probleme entstehen rund um Branches: falscher Name, alter Branch, Remote-Branch, lokaler Branch oder ein Branch, der nicht mehr gebraucht wird.

- **[Lokalen Branch umbenennen](/blog/2026-01-02-git-lokalen-branch-umbenennen/)**: Wenn ein Branch falsch benannt wurde.
- **[Branch lokal und remote löschen](/blog/2026-01-01-branch-lokal-und-remote-loeschen/)**: Wenn ein Branch nicht mehr gebraucht wird.
- **[Remote-Branch auschecken](/blog/2026-01-03-git-checkout-remote-branch/)**: Wenn du einen Branch aus dem Remote-Repository lokal verwenden willst.
- **Branch wechseln**: Wenn du zwischen Entwicklungsständen umschalten möchtest.
- **Neuen Branch erstellen**: Wenn du sauber an einem Feature arbeiten willst.

## Aufräumen und ignorieren

Nicht alles gehört ins Repository. Besonders häufig sind Probleme mit `.gitignore`, temporären Dateien, Build-Ordnern oder bereits getrackten Dateien.

- **[Bereits getrackte Datei ignorieren](/blog/2026-01-03-git-bereits-getrackte-datein-ignorieren/)**: Wenn `.gitignore` scheinbar nicht funktioniert.
- **[Untracked Dateien entfernen](/blog/2026-01-03-git-untrackted-dateien-aus-dem-working-tree-entfernen/)**: Wenn neue, nicht versionierte Dateien gelöscht werden sollen.
- **[.gitignore funktioniert nicht](/blog/2026-01-03-git-bereits-getrackte-datein-ignorieren/)**: Wenn Git Dateien weiter beachtet, obwohl sie ignoriert werden sollten.
- **node_modules, .env und Build-Dateien ignorieren**: Wenn typische Projektdateien nicht ins Repository sollen.

## Fetch, Pull und Remote

Bei Remote-Repositories geht es oft darum, Änderungen richtig abzuholen, lokale Arbeit nicht zu überschreiben und zu verstehen, was Git im Hintergrund macht.

- **[Unterschied zwischen git fetch und git pull](/blog/2026-01-02-unterschied-zwischen-git-fetch-und-git-pull/)**: Wenn du verstehen willst, wann welcher Befehl sinnvoll ist.
- **[git pull überschreiben](/blog/2026-01-03-git-pull-ueberschreiben/)**: Wenn lokale Änderungen mit dem Remote-Stand ersetzt werden sollen.
- **Remote-URL ändern**: Wenn sich das Repository verschoben hat.
- **[Remote-Branch lokal auschecken](/blog/2026-01-03-git-checkout-remote-branch/)**: Wenn ein Branch online existiert, aber lokal noch fehlt.

## Welche Git-Anleitung brauche ich?

| Problem | Passende Richtung |
|---|---|
| Datei versehentlich mit `git add` gestaged | [`git restore --staged`](/blog/2026-01-02-git-add-rueckgaengig-machen/) |
| Lokale Änderung soll weg | [`git restore`](/blog/2026-01-03-git-unstaged-aenderungen-verwerfen/) |
| Commit ist falsch, aber noch nicht gepusht | [`git reset`](/blog/2025-12-31-git-letzten-commit-rueckgaengig-machen/) |
| Commit ist schon gepusht | meistens `git revert` |
| Untracked Dateien sollen weg | [`git clean`](/blog/2026-01-03-git-untrackted-dateien-aus-dem-working-tree-entfernen/) |
| Branch ist falsch benannt | [`git branch -m`](/blog/2026-01-02-git-lokalen-branch-umbenennen/) |
| Remote-Änderungen sollen geholt werden | [`git fetch` oder `git pull`](/blog/2026-01-02-unterschied-zwischen-git-fetch-und-git-pull/) |

## Warum diese Unterscheidung wichtig ist

Viele Git-Befehle klingen ähnlich, haben aber sehr unterschiedliche Folgen. Manche Befehle nehmen nur Dateien aus der Staging Area. Andere löschen lokale Änderungen wirklich. Wieder andere verändern die Commit-Historie. Deshalb ist es wichtig, zuerst zu klären, ob du Änderungen behalten oder bewusst verwerfen willst.

Wenn du unsicher bist, ist meistens der vorsichtigere Weg besser: Erst Status prüfen, dann gezielt entscheiden.

```bash
git status
```

Als kompakte Übersicht hilft auch der Artikel [Die 5 meistgestellten Git-Fragen](/blog/2026-01-02-git-top-5-fragen-einfach-erklaert/), wenn du schnell zwischen den häufigsten Problemen unterscheiden willst.
