---
layout: post
title: 'Git letzten Commit rückgängig machen: reset, revert oder amend?'
meta_title: 'Git letzten Commit rückgängig machen: reset, revert oder amend?'
date: 2025-12-31 11:39:00 +0100
last_modified_at: 2026-06-11 14:00:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - git
    - computer-stuff
    - software-development
description: 'So machst du den letzten Git-Commit sicher rückgängig und erkennst, wann reset, revert oder amend die richtige Lösung ist.'
thumbnail: '/assets/images/gen/blog/git-letzten-commit-rueckgaengig-machen/header_thumbnail.webp'
image: '/assets/images/gen/blog/git-letzten-commit-rueckgaengig-machen/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Wie mache ich den letzten Git Commit rückgängig?'
      answer: 'Wenn du noch nicht gepusht hast, kannst du den letzten Commit mit `git reset --soft HEAD~1` rückgängig machen und die Änderungen behalten.'
    - question: 'Wie mache ich einen Commit rückgängig, ohne Änderungen zu verlieren?'
      answer: 'Nutze `git reset --soft HEAD~1`, wenn die Änderungen gestaged bleiben sollen. Nutze `git reset --mixed HEAD~1`, wenn die Änderungen lokal erhalten, aber nicht gestaged sein sollen.'
    - question: 'Wie lösche ich den letzten Commit komplett?'
      answer: 'Mit `git reset --hard HEAD~1`. Achtung: Dabei können Änderungen verloren gehen.'
    - question: 'Was ist der Unterschied zwischen git reset und git revert?'
      answer: '`git reset` setzt deinen Branch auf einen früheren Commit zurück und eignet sich vor allem für lokale Commits. `git revert` erstellt einen neuen Commit, der frühere Änderungen rückgängig macht, und ist bei bereits gepushten Commits oft sicherer.'
    - question: 'Was bedeutet HEAD~1?'
      answer: '`HEAD~1` bezeichnet den Commit direkt vor dem aktuellen Commit.'
    - question: 'Was mache ich, wenn der Commit schon gepusht wurde?'
      answer: 'Dann ist meistens `git revert <commit-hash>` besser, weil dadurch die öffentliche Historie nicht umgeschrieben wird.'
---

Falsche Dateien committed, falsche Commit-Message gesetzt oder zu früh auf Commit gedrückt? Passiert schneller als man denkt. Wichtig ist jetzt vor allem eine Frage: Ist der Commit schon gepusht oder existiert er nur lokal?

Solange der Commit nur lokal existiert, lässt er sich mit `git reset` sauber zurücknehmen. Du kannst entscheiden, ob die Änderungen gestaged bleiben, nur lokal erhalten bleiben oder komplett gelöscht werden.

## Kurzlösung

Wenn du den letzten Commit rückgängig machen willst und noch nicht gepusht hast, ist meistens `git reset` der richtige Befehl.

```bash
git reset --soft HEAD~1
```

Damit wird der letzte Commit entfernt, aber deine Änderungen bleiben gestaged.

Wenn du den Commit entfernen und die Änderungen nur lokal behalten willst:

```bash
git reset --mixed HEAD~1
```

Wenn du den Commit und alle Änderungen wirklich löschen willst:

```bash
git reset --hard HEAD~1
```

Achtung: `--hard` verwirft Änderungen. Nutze diesen Befehl nur, wenn du sicher bist, dass du den Stand nicht mehr brauchst.

## Welchen Befehl brauche ich?

| Situation                                             | Befehl                     | Änderungen bleiben erhalten? |
| ----------------------------------------------------- | -------------------------- | ---------------------------- |
| Commit rückgängig machen, Änderungen bleiben gestaged | `git reset --soft HEAD~1`  | Ja, in der Staging Area      |
| Commit rückgängig machen, Änderungen bleiben lokal    | `git reset --mixed HEAD~1` | Ja, aber unstaged            |
| Commit und Änderungen löschen                         | `git reset --hard HEAD~1`  | Nein                         |
| Commit wurde schon gepusht                            | `git revert <commit>`      | Ja, über neuen Gegen-Commit  |
| Nur Commit-Message ändern                             | `git commit --amend`       | Ja                           |

Bevor du einen Commit rückgängig machst, ist entscheidend, ob du schon gepusht hast. Lokale Commits kannst du meistens mit `git reset` bearbeiten. Bei bereits gepushten Commits ist `git revert` oft der sicherere Weg, weil dadurch die öffentliche Git-Historie nicht umgeschrieben wird.

## Git Commit rückgängig machen, wenn noch nicht gepusht wurde

Zur Einordnung ein typisches Beispiel:

```bash
git commit -m "Something terribly misguided"
```

Du merkst danach, dass der Commit falsch war. Vielleicht waren zu viele Dateien enthalten, vielleicht fehlt etwas oder die Commit-Message passt nicht. Wenn du noch nicht gepusht hast, kannst du den Commit lokal zurücknehmen und danach sauber neu committen.

Der vorsichtige Ablauf ist:

```bash
git status
git log --oneline -5
```

Danach entscheidest du, ob du `--soft`, `--mixed` oder `--hard` brauchst.

## Letzten Commit rückgängig machen und Änderungen behalten

Wenn du nur den Commit entfernen willst, aber die Änderungen direkt wieder für einen neuen Commit bereithalten möchtest, nutzt du:

```bash
git reset --soft HEAD~1
```

Das bedeutet:

- Der letzte Commit verschwindet aus deiner lokalen Historie.
- Die geänderten Dateien bleiben erhalten.
- Die Änderungen bleiben in der Staging Area.
- Du kannst sie direkt neu committen.

Beispiel:

```bash
git reset --soft HEAD~1
git commit -m "Neue bessere Commit-Message"
```

Das ist praktisch, wenn eigentlich alles im Commit richtig war, aber du die Message verbessern oder den Commit direkt neu bauen willst.

## Commit rückgängig machen, aber Änderungen nicht mehr stagen

Wenn du den Commit entfernen willst, die Änderungen aber erst noch einmal prüfen möchtest, nutzt du:

```bash
git reset --mixed HEAD~1
```

Oder kurz:

```bash
git reset HEAD~1
```

Das ist der Standardmodus von `git reset`.

Das bedeutet:

- Der letzte Commit wird entfernt.
- Die Änderungen bleiben lokal erhalten.
- Die Dateien sind danach nicht mehr gestaged.
- Du kannst mit `git diff` prüfen, was geändert wurde.

Danach kannst du falsche Dateien entfernen, Inhalte korrigieren und gezielt neu stagen:

```bash
git diff
git add .
git commit -m "Korrigierter Commit"
```

Wenn du die alte Commit-Message als Vorlage nutzen willst, kannst du auch `ORIG_HEAD` verwenden:

```bash
git commit -c ORIG_HEAD
```

`git reset` setzt `ORIG_HEAD` auf den vorherigen Stand. Mit `-c ORIG_HEAD` öffnet Git einen Editor mit der alten Commit-Message als Vorlage. Wenn du die Nachricht exakt übernehmen willst, funktioniert auch:

```bash
git commit -C ORIG_HEAD
```

## Commit und Änderungen komplett löschen

Wenn du den letzten Commit und die zugehörigen Änderungen wirklich verwerfen willst, kannst du `--hard` verwenden:

```bash
git reset --hard HEAD~1
```

Achtung: Dieser Befehl ist destruktiv. Änderungen aus dem Commit und lokale Änderungen können verloren gehen. Nutze ihn nur, wenn du sicher bist, dass du diesen Stand nicht mehr brauchst.

Vorher prüfen:

```bash
git status
git log --oneline -5
```

Wenn du nur uncommitted Änderungen verwerfen willst, aber keinen Commit zurücknehmen möchtest, passt eher der Artikel [Git unstaged Änderungen verwerfen](/blog/2026-01-03-git-unstaged-aenderungen-verwerfen/).

## Was bedeutet HEAD~1?

`HEAD` steht für den aktuellen Commit. `HEAD~1` meint den Commit direkt davor. Wenn du also `git reset HEAD~1` ausführst, setzt du deinen aktuellen Branch einen Commit zurück.

Beispiele:

```bash
git reset --soft HEAD~1
```

setzt einen Commit zurück.

```bash
git reset --soft HEAD~2
```

setzt zwei Commits zurück.

## Mehrere Commits rückgängig machen

Wenn du mehrere lokale Commits rückgängig machen willst, kannst du die Zahl erhöhen:

```bash
git reset --soft HEAD~3
```

Damit nimmst du die letzten drei Commits zurück, behältst die Änderungen aber gestaged.

Wenn du unsicher bist, prüfe vorher deine Historie:

```bash
git log --oneline
```

Nutze `--hard` bei mehreren Commits nur sehr bewusst. Je mehr Commits du zurücksetzt, desto wichtiger ist ein Blick in `git log`.

## Was tun, wenn der Commit schon gepusht wurde?

Wenn du den Commit bereits gepusht hast, solltest du vorsichtig mit `git reset` sein. Ein Reset verändert die Historie. Das kann problematisch sein, wenn andere Personen bereits auf Basis dieses Commits arbeiten.

In vielen Fällen ist dann `git revert` besser:

```bash
git revert <commit-hash>
```

`git revert` löscht den alten Commit nicht aus der Historie, sondern erstellt einen neuen Commit, der die Änderungen rückgängig macht.

Es gibt Situationen, in denen ein Reset mit Force Push absichtlich genutzt wird. Für gemeinsame Branches ist das aber riskant und sollte nicht die Standardlösung sein.

## git reset vs. git revert

| Befehl               | Zweck                                                 | Geeignet für                                        |
| -------------------- | ----------------------------------------------------- | --------------------------------------------------- |
| `git reset`          | Branch auf einen früheren Commit zurücksetzen         | Lokale Commits vor dem Push                         |
| `git revert`         | Änderungen durch neuen Gegen-Commit rückgängig machen | Bereits gepushte Commits                            |
| `git commit --amend` | Letzten Commit ändern                                 | Commit-Message oder kleine Ergänzungen vor dem Push |

Als Faustregel gilt: Vor dem Push ist `git reset` oft passend. Nach dem Push ist `git revert` meist sicherer.

## Nur die Commit-Message ändern

Wenn du nur die letzte Commit-Message ändern willst, brauchst du keinen Reset. Dann reicht:

```bash
git commit --amend
```

Oder direkt mit neuer Message:

```bash
git commit --amend -m "Neue Commit-Message"
```

Auch hier gilt: Wenn der Commit schon gepusht wurde, solltest du vorsichtig sein, weil sich dadurch die Commit-Historie ändern kann.

## Vorher prüfen: git status und git log

Bevor du einen Commit rückgängig machst, prüfe den aktuellen Zustand:

```bash
git status
```

Und die letzten Commits:

```bash
git log --oneline -5
```

So siehst du, ob du lokale Änderungen hast, ob Dateien gestaged sind und welchen Commit du wirklich zurücknehmen willst.

## Weitere Git-Probleme lösen

Wenn du gerade an mehreren Git-Baustellen gleichzeitig hängst, passen diese Anleitungen gut dazu:

- [Git add rückgängig machen](/blog/2026-01-02-git-add-rueckgaengig-machen/)
- [Git unstaged Änderungen verwerfen](/blog/2026-01-03-git-unstaged-aenderungen-verwerfen/)
- [Untracked Dateien entfernen](/blog/2026-01-03-git-untrackted-dateien-aus-dem-working-tree-entfernen/)
- [.gitignore einfach erklärt](/blog/2026-05-17-wie-funktioniert-gitignore/)
- [Alle Git-Anleitungen im Überblick](/category/git/)

## Fazit

Wenn ein Commit lokal schiefgeht und noch nicht gepusht wurde, ist `git reset` der schnellste Weg, um ihn zu korrigieren. `--soft` behält die Änderungen gestaged, `--mixed` behält sie lokal unstaged und `--hard` löscht sie.

Sobald der Commit schon im Remote-Repository liegt, solltest du genauer hinsehen. In gemeinsamen Branches ist `git revert` meistens die sauberere Lösung, weil die öffentliche Historie erhalten bleibt.
