---
layout: post
title: 'Bash: CPU Kerne und Threads auslesen und ausgeben'
date: 2026-01-14 14:40:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
description: 'So liest du in Bash die Anzahl an CPU Kernen und logischen Threads aus, inkl. macOS und Linux und einem portablen Fallback per getconf'
thumbnail: '/assets/images/gen/blog/bash-cpu-kerne-und-threads-auslesen-und-ausgeben/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-cpu-kerne-und-threads-auslesen-und-ausgeben/header.webp'
image_width: 1280
image_height: 720
---

Wie viele CPU Kerne hat die Maschine gerade, und wie viele Threads sieht das System? In Bash kannst du das je nach OS mit einem Befehl abfragen und sauber ausgeben, ohne extra Tools zu installieren.

## Warum es zwei Zahlen geben kann

Im Alltag stolpert man schnell über zwei Begriffe:

- Physische Kerne: echte CPU Kerne
- Logische Kerne: Threads, die das Betriebssystem sieht, oft durch Hyper Threading oder SMT

Für Parallelisierung ist in der Praxis meist die logische Zahl relevant. Für Performance Abschätzungen kann die physische Zahl hilfreicher sein.

## Linux: nproc als pragmatischer Standard

Auf Linux ist `nproc` oft die einfachste Antwort. Es gibt die Anzahl der verfügbaren Processing Units aus.

```bash
threads="$(nproc)"
echo "Logische Kerne: $threads"
```

Wenn du mehr Details brauchst, liefert `lscpu` eine gute Übersicht:

```bash
lscpu
```

Für Skripte ist `lscpu` aber nicht immer ideal, weil Output Parsing schnell fragil wird.

## Linux: /proc/cpuinfo als Fallback ohne Extra Tools

Wenn du nur Threads zählen willst, kannst du auch über `/proc/cpuinfo` gehen:

```bash
threads="$(grep -c '^processor' /proc/cpuinfo)"
echo "Logische Kerne: $threads"
```

Das ist einfach, aber Linux spezifisch.

## macOS: sysctl für logisch und physisch

Auf macOS ist `sysctl` der übliche Weg.

Logische Kerne:

```bash
threads="$(sysctl -n hw.logicalcpu)"
echo "Logische Kerne: $threads"
```

Physische Kerne:

```bash
cores="$(sysctl -n hw.physicalcpu)"
echo "Physische Kerne: $cores"
```

Ein häufiger Shortcut ist `hw.ncpu`. Der steht für die Anzahl der CPUs, die das System nutzt, und entspricht in vielen Fällen der logischen Zahl:

```bash
threads="$(sysctl -n hw.ncpu)"
echo "Kerne laut hw.ncpu: $threads"
```

## Portabler Ansatz: getconf als Baseline

Wenn du ein Skript schreibst, das auf vielen Unix Systemen laufen soll, ist `getconf` ein solider Fallback. Der Wert steht für online verfügbare Processing Units.

```bash
threads="$(getconf _NPROCESSORS_ONLN)"
echo "Logische Kerne: $threads"
```

Das ist nicht immer so detailreich wie OS spezifische Befehle, aber für viele Automationszwecke ausreichend.

## Ein kleines Bash Snippet, das macOS und Linux abdeckt

Dieses Beispiel versucht zuerst OS spezifische Varianten und fällt dann auf `getconf` zurück. Es gibt Threads und, wenn möglich, auch physische Kerne aus.

```bash
#!/usr/bin/env bash
set -u

os="$(uname -s)"

threads=""
cores=""

if [[ "$os" == "Darwin" ]]; then
  threads="$(sysctl -n hw.logicalcpu 2>/dev/null || true)"
  cores="$(sysctl -n hw.physicalcpu 2>/dev/null || true)"
elif [[ "$os" == "Linux" ]]; then
  if command -v nproc >/dev/null 2>&1; then
    threads="$(nproc)"
  fi
fi

if [[ -z "$threads" ]]; then
  threads="$(getconf _NPROCESSORS_ONLN 2>/dev/null || echo "")"
fi

if [[ -z "$threads" ]]; then
  echo "Konnte CPU Anzahl nicht ermitteln" >&2
  exit 1
fi

echo "Logische Kerne: $threads"

if [[ -n "$cores" ]]; then
  echo "Physische Kerne: $cores"
fi
```

## Kurzfazit

Für Linux ist `nproc` der pragmatische Standard, für macOS sind `sysctl hw.logicalcpu` und `sysctl hw.physicalcpu` am klarsten. Wenn du Portabilität willst, ist `getconf _NPROCESSORS_ONLN` ein guter Fallback, der in vielen Skripten völlig ausreicht.

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
