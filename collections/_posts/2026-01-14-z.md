---
layout: post
title: 'Shell: Unterschied zwischen sh und bash'
date: 2026-01-14 11:15:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
    - macos
description: 'sh ist die POSIX-Shell-Schnittstelle, bash ist eine konkrete Shell mit Extras. So wählst du den richtigen Shebang und vermeidest Skripte, die nur auf deinem System laufen'
thumbnail: '/assets/images/gen/blog/shell-unterschied-zwischen-sh-und-bash/header_thumbnail.webp'
image: '/assets/images/gen/blog/shell-unterschied-zwischen-sh-und-bash/header.webp'
---

"sh oder bash?" klingt nach einem Detail, ist aber in der Praxis eine der häufigsten Ursachen für Skripte, die bei dir laufen und auf einer anderen Maschine plötzlich scheitern. Der Kern ist einfach: `sh` ist in vielen Umgebungen die kompatible POSIX-Schale, `bash` ist eine konkrete Shell mit zusätzlichen Features.

## Was ist sh

`sh` steht historisch für die Bourne Shell, meint heute aber in der Praxis meistens: "Starte eine POSIX-kompatible Shell". Auf modernen Systemen ist `sh` häufig ein Link auf eine andere Shell:

-   auf Debian und Ubuntu oft `dash` (schnell, minimal, sehr POSIX-nah)
-   auf macOS ist `/bin/sh` eine POSIX-Variante, die sich nicht wie "bash im Vollmodus" verhält
-   auf manchen Systemen kann `sh` auch tatsächlich `bash` sein, aber im POSIX-Mode

Wichtig ist weniger, welche Implementierung dahinter steckt, sondern welche Features du erwarten darfst: bei `sh` solltest du dich an POSIX halten.

## Was ist bash

`bash` ist die Bourne Again SHell. Sie ist verbreitet, komfortabel und bringt viele Bash-spezifische Erweiterungen mit, zum Beispiel:

-   `[[ ... ]]` als Testkonstrukt mit Pattern-Matching
-   Arrays und assoziative Arrays
-   Brace Expansion, `**`-Globs (je nach Option), `shopt`
-   `(( ... ))` und erweiterte Parameter Expansion
-   `source` als Keyword (bei POSIX wäre es `.`)

Diese Features machen Bash-Skripting angenehm, sind aber nicht automatisch in `sh` verfügbar.

## Der Shebang entscheidet, was du versprichst

Der wichtigste praktische Punkt: Mit deinem Shebang signalisierst du, welche Shell dein Skript braucht.

POSIX / portable:

```bash
#!/bin/sh
```

Bash-spezifisch:

```bash
#!/usr/bin/env bash
```

`/usr/bin/env bash` ist oft die bessere Wahl als `#!/bin/bash`, weil `bash` nicht auf jedem System an derselben Stelle liegt. Auf macOS ist `bash` zwar vorhanden, aber oft eine ältere Version. Über `env` nutzt du die Bash, die im `PATH` liegt.

## Das typische Problem: Skript heißt .sh, ist aber Bash

Viele nennen Skripte `something.sh` und verwenden dann Bash-Features. Der Dateiname sagt aber nichts über die Shell aus. Entscheidend ist:

-   womit du es ausführst
-   was im Shebang steht

Wenn du ein Bash-Skript mit `sh script.sh` startest, wird es häufig scheitern. Ein Klassiker sind `[[ ... ]]` und Arrays.

## Konkrete Unterschiede, die in der Praxis wehtun

### Tests: [ ] vs [[]]

POSIX-kompatibel:

```bash
if [ -n "$name" ]; then
  echo "ok"
fi
```

Bash-spezifisch (und oft angenehmer):

```bash
if [[ -n "$name" ]]; then
  echo "ok"
fi
```

### Pattern-Matching im Test

Bash:

```bash
if [[ "$text" == *"foo"* ]]; then
  echo "enthält foo"
fi
```

In `sh` brauchst du meist andere Patterns oder arbeitest über `case`:

```bash
case "$text" in
  *foo*) echo "enthält foo" ;;
esac
```

### Arrays

Bash:

```bash
arr=("a" "b" "c")
echo "${arr[1]}"
```

`sh` kennt dieses Array-Konzept nicht. In `sh` arbeitest du mit Strings, Parametern oder set/shift Patterns.

## Wann du sh wählen solltest

Nimm `sh`, wenn:

-   dein Skript möglichst portabel sein muss
-   es auf minimalen Systemen laufen soll (Initramfs, BusyBox, Alpine-Images)
-   du Abhängigkeiten klein halten willst
-   du bewusst auf POSIX bleibst und Bash-Features nicht brauchst

Das ist besonders relevant für CI-Runner, Container und "kleine" Systemskripte.

## Wann du bash wählen solltest

Nimm Bash, wenn:

-   du Bash-Features bewusst nutzen willst (Arrays, `[[ ]]`, bessere String-Operationen)
-   das Skript eher ein Tool im Repo ist, nicht ein Systemskript
-   du klar sagen kannst: Bash ist Voraussetzung

Das ist oft sinnvoll für Entwickler-Tools, Build-Skripte und lokale Automatisierung.

## Ein pragmatischer Leitfaden für deine Skripte

-   Wenn du `[[ ... ]]`, Arrays oder `source` nutzt, setze Bash als Shebang.
-   Wenn du Portabilität brauchst, bleib bei POSIX-Features und nutze `#!/bin/sh`.
-   Mische nicht. Ein Skript sollte nicht "zufällig" auf einer Maschine funktionieren.

Wenn du dir unsicher bist: Schreibe ein Bash-Skript lieber klar als Bash, statt es als `sh` zu tarnen.

## Kurzfazit

`sh` steht in der Praxis für POSIX-kompatibles Shell-Scripting, `bash` ist eine konkrete Shell mit vielen Erweiterungen. Der Shebang ist deine Schnittstelle: `#!/bin/sh` bedeutet Portabilität, `#!/usr/bin/env bash` bedeutet Komfort und Bash-Features. Sobald du Bash-spezifische Syntax nutzt, sollte dein Skript auch als Bash laufen.
