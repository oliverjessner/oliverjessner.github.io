---
layout: post
title: 'Git: Was ist der Unterschied zwischen git fetch und git pull?'
date: 2026-01-02 11:21:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - git
    - computer-stuff
    - software-development
description: 'Tutorial: Der Unterschied zwischen git fetch und git pull einfach erklärt – was passiert im Hintergrund und wann welcher Befehl sinnvoll ist.'
thumbnail: '/assets/images/gen/blog/unterschied-zwischen-git-fetch-und-git-pull/header_thumbnail.webp'
image: '/assets/images/gen/blog/unterschied-zwischen-git-fetch-und-git-pull/header.webp'
---

Wer mit Git arbeitet, stößt früher oder später auf diese Frage:

**Was ist eigentlich der Unterschied zwischen `git fetch` und `git pull`?**

Beide holen Änderungen vom Remote-Repository und trotzdem verhalten sie sich grundlegend unterschiedlich. Wer das nicht versteht, holt sich schnell unerwartete Merges oder Konflikte ins Projekt.

## Die Kurzfassung

In den einfachsten Worten:

> **`git pull` ist ein `git fetch` gefolgt von einem `git merge` (oder `git rebase`).**

Damit ist der Kern schon beschrieben, die Details sind entscheidend.

## Was macht git fetch?

```bash
git fetch
```

git fetch lädt neue Commits vom Remote-Repository herunter und aktualisiert die sogenannten Remote-Tracking-Branches, z. B.:

refs/remotes/origin/main

Wichtig dabei:

-   keine lokalen Branches werden verändert
-   kein Merge
-   kein Rebase
-   kein Risiko für den aktuellen Arbeitsstand

git fetch ist daher immer sicher und kann jederzeit ausgeführt werden.

Kurz gesagt:
Du holst dir Informationen, aber änderst noch nichts.

Wichtig dabei:

-   keine lokalen Branches werden verändert
-   kein Merge
-   kein Rebase
-   kein Risiko für den aktuellen Arbeitsstand

git fetch ist daher immer sicher und kann jederzeit ausgeführt werden.

Kurz gesagt:
Du holst dir Informationen, aber änderst noch nichts.

## Was macht git pull?

```bash
git pull
```

git pull macht zwei Dinge:

1. führt intern ein git fetch aus
1. bringt den aktuellen lokalen Branch mit dem Remote-Branch zusammen

Je nach Konfiguration passiert das per:

-   git merge (Standard)
-   oder git rebase

Aus der Git-Dokumentation:

> git pull runs git fetch and then, depending on configuration or flags, calls either git rebase or git merge to reconcile diverging branches.

Das bedeutet:

-   dein lokaler Branch ändert sich sofort
-   es können Merge-Commits entstehen
-   es können Konflikte auftreten

Der entscheidende Unterschied

| Befehl    | Holt Änderungen | Verändert lokale Branches |
| --------- | --------------- | ------------------------- |
| git fetch | ja              | nein                      |
| git pull  | ja              | ja                        |

## Wann solltest du welchen Befehl nutzen?

git fetch ist sinnvoll, wenn du:

-   erst prüfen willst, was sich geändert hat
-   kontrolliert mergen oder rebasen möchtest
-   Konflikte vermeiden willst
-   verstehen willst, wie weit dein Branch hinterherhinkt

git pull ist sinnvoll, wenn du:

-   sicher bist, dass du die Änderungen direkt übernehmen willst
-   alleine am Branch arbeitest
-   einen schnellen Update-Workflow brauchst

Anderes Thema möchtest du den letzten Commit rückgängig machen? Schau dir mein Tutorial dazu an: [Git: Letzte Commits rückgängig machen (ohne Push)](https://oliverjessner.github.io/blog/2025-12-31-git-letzten-commit-rueckgaengig-machen/).
