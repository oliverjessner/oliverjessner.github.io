---
layout: post
title: 'Bash: Erste Zeile aus einer Datei entfernen mit sed und ohne Datenverlust'
date: 2026-01-14 16:13:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
description: 'So entfernst du die erste Zeile einer Textdatei in Bash: sed-Varianten für macOS und Linux, sichere temp-file Methode, In-Place Fallen und Alternativen mit tail'
thumbnail: '/assets/images/gen/blog/bash-erste-zeile-aus-einer-datei-entfernen-mit-sed-und-ohne-datenverlust/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-erste-zeile-aus-einer-datei-entfernen-mit-sed-und-ohne-datenverlust/header.webp'
---

Die erste Zeile zu entfernen ist eine typische “kleine” Aufgabe, die trotzdem Ärger machen kann, wenn man sie in-place macht und zwischen macOS und Linux wechselt. Hier sind die robusten Varianten, ohne fragiles Verhalten oder unnötige Datenverluste.

## Schritt 1: Nur ausgeben, ohne die Datei zu ändern

Wenn du die Datei nicht verändern willst, sondern nur den Inhalt ohne erste Zeile weiterpipen möchtest, ist `sed` sehr direkt:

```bash
sed '1d' file.txt
```

`1d` bedeutet: Zeile 1 löschen.

Eine Alternative ohne sed ist `tail`:

```bash
tail -n +2 file.txt
```

Das ist oft leichter zu merken: “ab Zeile 2 ausgeben”.

## Schritt 2: Datei wirklich ändern, aber sicher

Viele greifen zu `sed -i`, aber genau da liegt der Haken: Das Verhalten von `-i` unterscheidet sich zwischen GNU sed (Linux) und BSD sed (macOS).

Die portable, sichere Methode ist: in eine temporäre Datei schreiben und dann ersetzen.

```bash
tmp="$(mktemp)"
sed '1d' file.txt > "$tmp" && mv "$tmp" file.txt
```

Das ist nicht die kürzeste Lösung, aber sie ist robust, verständlich und funktioniert überall.

Warnhinweis: Wenn du Dateirechte oder Ownership exakt erhalten musst, ist `mv` meist okay, aber je nach Umgebung kann ein Tool wie `sponge` (moreutils) oder eine gezielte Preserve-Strategie sinnvoll sein. Für typische Textfiles ist `mv` pragmatisch.

## In-place mit sed: Linux vs macOS

Wenn du bewusst in-place arbeiten willst:

Linux (GNU sed):

```bash
sed -i '1d' file.txt
```

macOS (BSD sed) verlangt ein Argument für das Backup-Suffix. Für “kein Backup” gibst du ein leeres Suffix an:

```bash
sed -i '' '1d' file.txt
```

Wenn du ein Backup willst:

```bash
sed -i '.bak' '1d' file.txt
```

Damit entsteht zusätzlich `file.txt.bak`.

## Ein kleines Bash Snippet, das macOS und Linux abdeckt

Dieses Muster erkennt das OS und wählt die passende `sed -i` Variante. Für viele Skripte ist das eine sinnvolle Balance zwischen “kurz” und “robust”.

```bash
#!/usr/bin/env bash
set -u

file="${1:-}"

if [[ -z "$file" || ! -f "$file" ]]; then
  echo "Usage: $0 <file>" >&2
  exit 1
fi

if [[ "$(uname -s)" == "Darwin" ]]; then
  sed -i '' '1d' "$file"
else
  sed -i '1d' "$file"
fi
```

Wenn du maximale Portabilität willst, bleib bei der temp-file Variante. Wenn du bewusst nur macOS und Linux targetest, ist `sed -i` mit OS-Branch oft okay.

## Sonderfall: Datei mit nur einer Zeile

`sed '1d'` produziert dann eine leere Datei. Das ist meist genau das gewünschte Verhalten. Wenn du das nicht willst, musst du es vorher prüfen:

```bash
lines="$(wc -l < file.txt)"
if [[ "$lines" -gt 1 ]]; then
  sed '1d' file.txt > out.txt
fi
```

## Kurzfazit

Zum Entfernen der ersten Zeile reicht `sed '1d'` oder `tail -n +2`, wenn du nur outputten willst. Wenn du die Datei ändern willst, ist die temp-file Methode der robusteste Standard. `sed -i` ist bequem, aber auf macOS und Linux unterschiedlich, deshalb entweder bewusst OS-spezifisch oder mit Branching lösen.
