---
layout: post
title: 'Bash: Dateiendung für viele Dateien umbenennen'
date: 2026-01-14 16:22:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
description: 'So änderst du in Bash die Dateiendung für viele Dateien: sichere for-Schleife, dry run, Umgang mit Leerzeichen, find-Varianten und warum rename nicht überall gleich ist'
thumbnail: '/assets/images/gen/blog/bash-dateiendung-fuer-viele-dateien-umbenennen/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-dateiendung-fuer-viele-dateien-umbenennen/header.webp'
---

Eine Dateiendung für viele Dateien umzubenennen ist ein typischer Terminal-Job: schnell gemacht, aber auch schnell falsch, wenn Leerzeichen, Subdirs oder ein zu breites Pattern ins Spiel kommen. Hier sind robuste Bash-Muster, inklusive Dry Run.

## Schritt 0: Erst prüfen, was getroffen wird

Bevor du irgendwas umbenennst, schau dir an, welche Dateien du erwischst.

```bash
ls -1 *.txt
```

Wenn das zu viel ist oder Subordner relevant sind, spring direkt zu den find-Varianten weiter unten.

## Variante 1: Standard im aktuellen Ordner mit for-Schleife

Das ist das typische Muster, wenn du nur im aktuellen Verzeichnis arbeitest. Es ist bewusst ohne exotische Tools und funktioniert auf macOS und Linux.

Beispiel: `.txt` zu `.md` ändern.

```bash
for f in *.txt; do
  [[ -e "$f" ]] || continue
  mv -- "$f" "${f%.txt}.md"
done
```

Warum die Details wichtig sind:

-   `[[ -e "$f" ]] || continue` verhindert, dass die Schleife mit dem literal Pattern `*.txt` läuft, wenn es keine Treffer gibt
-   `mv --` schützt vor Dateinamen, die mit `-` beginnen
-   `${f%.txt}` entfernt nur das letzte `.txt` am Ende

## Dry Run: erst anzeigen, dann ausführen

Wenn du das sicherer machen willst, bau dir einen Dry Run, der nur zeigt, was passieren würde.

```bash
for f in *.txt; do
  [[ -e "$f" ]] || continue
  echo "mv -- '$f' '${f%.txt}.md'"
done
```

Wenn die Ausgabe passt, ersetzt du `echo` wieder durch `mv`.

## Variante 2: Beliebige Extension tauschen, ohne den Namen hart zu codieren

Wenn du Dateien mit einer Endung hast und die neue Endung als Variable setzen willst:

```bash
from="jpeg"
to="jpg"

for f in *."$from"; do
  [[ -e "$f" ]] || continue
  mv -- "$f" "${f%.$from}.$to"
done
```

Das skaliert gut, wenn du mehrere Durchläufe machst.

## Variante 3: Rekursiv in Unterordnern mit find

Wenn du Unterordner einschließen willst, ist `find` der richtige Einstieg. Wichtig ist dabei: Dateinamen können Leerzeichen enthalten, deshalb `-print0` plus `read -d ''`.

Beispiel: alle `.txt` in einem Projekt rekursiv zu `.md` ändern.

```bash
find . -type f -name '*.txt' -print0 |
while IFS= read -r -d '' f; do
  mv -- "$f" "${f%.txt}.md"
done
```

Das ist robust gegenüber Leerzeichen und Sonderzeichen.

## Variante 4: Nur eine Extension ersetzen, wenn sie wirklich am Ende steht

Manchmal willst du nicht “enthält .txt irgendwo”, sondern wirklich nur “endet auf .txt”. Das ist bei `-name '*.txt'` bereits der Fall. Zusätzlich ist `${f%.txt}` genau darauf ausgelegt, nur das Ende zu entfernen.

Wenn du komplexere Muster brauchst, ist das oft ein Signal, dass du vorher filtern solltest oder dir den Dateinamen sauber trennst.

## Warum ich rename nur mit Vorsicht empfehle

Es gibt ein `rename`-Tool, aber es ist nicht überall gleich. Auf manchen Systemen ist es eine Perl-Variante, auf anderen eine util-linux-Variante mit anderer Syntax. Für portable Skripte ist das häufig eine unnötige Abhängigkeit.

Wenn du lokal arbeitest und genau weißt, welche rename-Version du hast, kann es bequem sein. Für Blog- und Repo-Skripte ist die for/find-Variante oft die stabilere Default-Wahl.

## Mini-Skript: Extension-Batch-Rename mit Dry Run Flag

Dieses kleine Skript arbeitet rekursiv, nimmt `from` und `to` als Argument und kann per `--apply` wirklich umbenennen. Standard ist Dry Run.

```bash
#!/usr/bin/env bash
set -u

from="${1:-}"
to="${2:-}"
mode="${3:-}"

if [[ -z "$from" || -z "$to" ]]; then
  echo "Usage: $0 <from-ext> <to-ext> [--apply]" >&2
  exit 1
fi

apply=false
if [[ "$mode" == "--apply" ]]; then
  apply=true
fi

find . -type f -name "*.${from}" -print0 |
while IFS= read -r -d '' f; do
  new="${f%.$from}.$to"

  if $apply; then
    mv -- "$f" "$new"
  else
    echo "mv -- '$f' '$new'"
  fi
done
```
