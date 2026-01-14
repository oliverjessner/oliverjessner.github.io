---
layout: post
title: 'Bash: Dateiname und Endung sauber trennen'
date: 2026-01-14 12:15:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
    - mac
description: 'So trennst du in Bash Dateinamen und Erweiterung robust, inklusive Sonderfällen wie versteckte Dateien, mehrere Punkte und Pfade mit Leerzeichen'
thumbnail: '/assets/images/gen/blog/bash-anders-dateiname-und-endung-sauber-trennen/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-anders-dateiname-und-endung-sauber-trennen/header.webp'
---

In Bash kannst du Dateiname und Endung ohne externe Tools trennen. Entscheidend sind die Sonderfälle: mehrere Punkte, versteckte Dateien und Pfade mit Leerzeichen.

## Warum das in Bash schnell schiefgehen kann

"Dateiname ohne Endung" klingt trivial, bis echte Beispiele auftauchen: `report.final.pdf`, `.env`, `archive.tar.gz` oder ein Pfad wie `~/Downloads/Mein Dokument.txt`. Wenn du hier blind mit `cut` oder `awk` arbeitest, verlierst du schnell Informationen.

Bash bringt dafür eingebaute Parameter Expansion mit. Das ist schnell, lesbar und vermeidet unnötige Prozesse.

## Schritt 0: Pfad und Dateiname voneinander trennen

Oft kommt nicht nur ein Dateiname, sondern ein kompletter Pfad. Erst trennen wir den reinen Dateinamen vom Pfad, dann kümmern wir uns um die Endung.

```bash
path="/Users/oliver/Downloads/Mein Dokument.txt"
file="${path##*/}"
echo "$file"
```

`##*/` entfernt alles bis zum letzten Slash. Übrig bleibt `Mein Dokument.txt`.

## Standardfall: Basisname und Extension trennen

Für den Standardfall "letzter Punkt trennt Name und Extension" sind diese zwei Zeilen das gängigste Muster:

```bash
file="report.pdf"
base="${file%.*}"
ext="${file##*.}"
echo "base=$base ext=$ext"
```

Was hier passiert:

-   `${file%.*}` entfernt den kürzesten Match von `.*` von rechts, also "Punkt plus Rest"
-   `${file##*.}` entfernt den längsten Match von `*.` von links, also "alles bis zum letzten Punkt"

Damit bekommst du `base=report` und `ext=pdf`.

## Sonderfall 1: Dateien ohne Punkt

Wenn kein Punkt im Namen ist, würde `ext` identisch zum Dateinamen werden. Das ist oft nicht das, was man erwartet. Daher lohnt sich ein Guard.

```bash
file="README"

if [[ "$file" == *.* ]]; then
  base="${file%.*}"
  ext="${file##*.}"
else
  base="$file"
  ext=""
fi

echo "base=$base ext=$ext"
```

So bleibt `ext` leer, statt fälschlich `README` zu werden.

## Sonderfall 2: Versteckte Dateien wie .env

Bei `.env` ist der erste Punkt Teil des Namens, nicht zwingend eine Extension. Viele Skripte behandeln `.env` als "keine Extension".

```bash
file=".env"

if [[ "$file" == .* && "$file" != *.*.* ]]; then
  base="$file"
  ext=""
elif [[ "$file" == *.* ]]; then
  base="${file%.*}"
  ext="${file##*.}"
else
  base="$file"
  ext=""
fi

echo "base=$base ext=$ext"
```

Das ist bewusst konservativ: `.env` bleibt komplett im `base`. Wenn du `.env` als Extension interpretieren willst, musst du diese Regel ändern.

## Sonderfall 3: Mehrteilige Endungen wie .tar.gz

Viele wollen bei `archive.tar.gz` als Extension nicht nur `gz`, sondern `tar.gz`. Bash kann das, aber du musst definieren, was "Extension" bedeutet.

Variante A: Nur letzte Extension

```bash
file="archive.tar.gz"
base="${file%.*}"
ext="${file##*.}"
echo "base=$base ext=$ext"
```

Ergebnis: `base=archive.tar` und `ext=gz`.

Variante B: Bekannte Double-Extensions gezielt behandeln

```bash
file="archive.tar.gz"

case "$file" in
  *.tar.gz)
    base="${file%.tar.gz}"
    ext="tar.gz"
    ;;
  *.tar.bz2)
    base="${file%.tar.bz2}"
    ext="tar.bz2"
    ;;
  *.tar.xz)
    base="${file%.tar.xz}"
    ext="tar.xz"
    ;;
  *)
    if [[ "$file" == *.* ]]; then
      base="${file%.*}"
      ext="${file##*.}"
    else
      base="$file"
      ext=""
    fi
    ;;
esac

echo "base=$base ext=$ext"
```

Das ist im Alltag oft die sauberste Lösung: Du behandelst bekannte Muster explizit, statt zu hoffen, dass "alles nach dem ersten Punkt" immer sinnvoll ist.

## Mini-Skript: Pfad rein, base und ext raus

Dieses Beispiel nimmt einen Pfad als Argument und gibt Basisname und Extension aus, inklusive der wichtigsten Guards.

```bash
#!/usr/bin/env bash
set -u

path="${1:-}"

if [[ -z "$path" ]]; then
  echo "Usage: $0 <dateipfad>" >&2
  exit 1
fi

file="${path##*/}"

case "$file" in
```

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
