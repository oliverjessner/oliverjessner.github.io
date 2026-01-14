---
layout: post
title: 'Bash: Betriebssystem erkennen ohne fragiles Parsing'
date: 2026-01-14 11:15:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
    - macos
description: 'So erkennst du in Bash das Betriebssystem: uname für macOS und Linux, /etc/os-release für Distributionen, plus robuste Patterns für Skripte, die überall laufen sollen'
thumbnail: '/assets/images/gen/blog/bash-betriebssystem-erkennen-ohne-fragiles-parsing/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-betriebssystem-erkennen-ohne-fragiles-parsing/header.webp'
---

Skripte werden oft dann “komisch”, wenn sie auf unterschiedlichen Systemen laufen: macOS vs Linux, oder Linux-Distributionen mit leicht anderen Tools. OS-Erkennung in Bash ist deshalb nicht das Ziel an sich, sondern ein Mittel, um bewusst die richtige Code-Path zu wählen.

## Schritt 1: Grob erkennen mit uname

Für die meisten Skripte reicht eine grobe Unterscheidung:

-   macOS: `Darwin`
-   Linux: `Linux`

Das ist stabil und leicht zu lesen:

```bash
os="$(uname -s)"

case "$os" in
  Darwin)
    echo "macOS"
    ;;
  Linux)
    echo "Linux"
    ;;
  *)
    echo "Unbekanntes OS: $os" >&2
    exit 1
    ;;
esac
```

Warum `uname -s`? Weil du damit nicht auf Release-Strings oder Dateiinhalte angewiesen bist, sondern auf ein Kernel-Attribut, das überall verfügbar ist.

## Schritt 2: Linux Distribution erkennen mit /etc/os-release

Wenn du auf Linux nicht nur “Linux”, sondern die Distribution brauchst, ist `/etc/os-release` der übliche Standard.

```bash
if [[ -r /etc/os-release ]]; then
  . /etc/os-release
  echo "ID=$ID"
  echo "VERSION_ID=$VERSION_ID"
fi
```

`/etc/os-release` definiert Variablen wie `ID`, `VERSION_ID` und `PRETTY_NAME`. Durch das Sourcen bekommst du sie direkt als Variablen im Skript.

Warnhinweis: Quelle nur, wenn du die Datei erwartest und sie lesbar ist. Auf sehr minimalen Systemen kann sie fehlen.

## Schritt 3: Nicht auf “Tool-Namen” schließen

Ein häufiger Anfängerfehler ist: “Wenn brew existiert, ist es macOS.” Das stimmt nicht zwingend. Genau so ist “apt existiert” kein sicherer Indikator für Debian, weil Container oder hybride Systeme dich überraschen können.

Wenn du wirklich eine OS-Weiche brauchst, nutze OS-Merkmale:

-   `uname` für macOS vs Linux
-   `/etc/os-release` für Linux-Distros
-   im Zweifel Feature-Detection für Tools

Feature-Detection ist oft besser als OS-Erkennung, wenn es dir eigentlich nur um ein Tool geht:

```bash
if command -v gsed >/dev/null 2>&1; then
  SED="gsed"
else
  SED="sed"
fi
```

Das fragt nicht “welches OS”, sondern “welches Tool ist verfügbar”. Das ist im Alltag robuster.

## Ein kleines Snippet: macOS vs Linux und Linux-ID

Dieses Beispiel liefert dir eine klare Ausgabe und kann direkt als Utility-Funktion in Skripte wandern.

```bash
#!/usr/bin/env bash
set -u

detect_os() {
  local kernel
  kernel="$(uname -s)"

  case "$kernel" in
    Darwin)
      echo "macos"
      return 0
      ;;
    Linux)
      echo "linux"
      return 0
      ;;
    *)
      echo "unknown"
      return 1
      ;;
  esac
}

detect_linux_id() {
  if [[ -r /etc/os-release ]]; then
    . /etc/os-release
    echo "${ID:-unknown}"
  else
    echo "unknown"
  fi
}

os="$(detect_os)" || true

case "$os" in
  macos)
    echo "OS: macOS"
    ;;
  linux)
    distro="$(detect_linux_id)"
    echo "OS: Linux ($distro)"
    ;;
  *)
    echo "OS: unbekannt" >&2
    exit 1
    ;;
esac
```

## Typische Anwendungsfälle

-   macOS benötigt `sysctl`, Linux nutzt `nproc`
-   Pfade unterscheiden sich, etwa `sed -i` Verhalten oder GNU vs BSD Tools
-   Installationswege unterscheiden sich (brew vs apt), wobei Feature-Detection oft die bessere Logik ist

Wenn du in einem Skript mehr als zwei oder drei OS-Weichen hast, ist das meist ein Signal, dass du eher Tool-Detection oder kleinere, spezialisierte Skripte brauchst.

## Kurzfazit

Für OS-Erkennung in Bash ist `uname -s` der stabile Standard für macOS vs Linux. Wenn du auf Linux die Distribution brauchst, ist `/etc/os-release` der übliche Weg. Und wenn es dir eigentlich um Verhalten oder Tools geht, ist Feature-Detection oft robuster als “OS raten”.
