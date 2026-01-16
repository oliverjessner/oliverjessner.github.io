---
layout: post
title: 'Bash-Skripte mit optionalen Argumenten: Defaults, Flags und Hilfe'
date: 2026-01-16 20:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
description: 'So baust du optionale Parameter in Bash sauber ein: Defaults, Flags und ein robustes Parsing ohne Overkill'
thumbnail: '/assets/images/gen/blog/bash-skripte-mit-optionalen-argumenten-defaults-flags-und-hilfe/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-skripte-mit-optionalen-argumenten-defaults-flags-und-hilfe/header.webp'
---

Optionale Argumente klingen trivial, bis ein Flag fehlt, ein Wert leer ist oder jemand --help tippt. Mit ein paar Bash-Bausteinen wird daraus ein Script, das sich wie ein Tool anfühlt.

## Was "optional" in Bash praktisch bedeutet

Ein Bash-Script bekommt Argumente als Positionals ($1, $2, ...) und als Liste ($@). "Optional" heißt meist eine dieser Varianten:

-   Ein Parameter kann fehlen und bekommt dann einen Default
-   Ein Flag schaltet Verhalten ein oder aus, etwa --verbose
-   Eine Option erwartet einen Wert, etwa --file report.txt
-   Eine Kombination davon, idealerweise mit --help

Gute Defaults und ein klarer Parser machen Scripts stabiler, ohne sie unnötig aufzublasen.

## Der einfachste Fall: Positionsargumente mit Defaults

Wenn dein Script nur wenige Parameter hat und die Reihenfolge klar ist, reicht oft Parameter-Expansion mit Default-Werten.

```bash
#!/usr/bin/env bash
set -euo pipefail

input="${1:-}"
output="${2:-out.txt}"
mode="${3:-fast}"

if [[ -z "$input" ]]; then
  echo "Usage: $(basename "$0") <input> [output] [mode]" >&2
  exit 1
fi

echo "input=$input"
echo "output=$output"
echo "mode=$mode"
```

Wichtig ist die Unterscheidung:

-   ${var:-default} nimmt default, wenn var unset oder leer ist
-   ${var-default} nimmt default nur, wenn var unset ist

In Scripts ist :- meistens das erwartete Verhalten, weil "leer" in der Praxis oft wie "nicht angegeben" wirkt.

## Flags ohne Werte: Pattern für Toggle-Optionen

Ein typischer nächster Schritt sind Schalter wie --verbose oder --dry-run. Dafür genügt ein loop über "$@".

```bash
#!/usr/bin/env bash
set -euo pipefail

verbose=0
dry_run=0

for arg in "$@"; do
  case "$arg" in
    --verbose|-v) verbose=1 ;;
    --dry-run) dry_run=1 ;;
    --help|-h)
      echo "Usage: $(basename "$0") [--verbose] [--dry-run]"
      exit 0
      ;;
    *)
      echo "Unknown argument: $arg" >&2
      exit 2
      ;;
  esac
done

(( verbose )) && echo "Verbose mode on"
(( dry_run )) && echo "Dry run on"
```

Dieses Muster ist bewusst streng: Unbekannte Flags sind ein Fehler. Das verhindert stille Fehlbedienung.

## Optionen mit Werten: --file foo und -f foo

Sobald Optionen Werte tragen, solltest du über die Argumentliste iterieren und das nächste Element konsumieren. Der robuste Standard ist eine while-Schleife mit shift.

```bash
#!/usr/bin/env bash
set -euo pipefail

file=""
threads=4
verbose=0

usage() {
  cat <<'EOF'
Usage: script.sh [options]

Options:
  -f, --file PATH       Input file
  -t, --threads N       Number of threads (default: 4)
  -v, --verbose         Verbose output
  -h, --help            Show help
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -f|--file)
      [[ $# -ge 2 ]] || { echo "Missing value for $1" >&2; usage; exit 2; }
      file="$2"
      shift 2
      ;;
    -t|--threads)
      [[ $# -ge 2 ]] || { echo "Missing value for $1" >&2; usage; exit 2; }
      threads="$2"
      shift 2
      ;;
    -v|--verbose)
      verbose=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    --)
      shift
      break
      ;;
    -*)
      echo "Unknown option: $1" >&2
      usage
      exit 2
      ;;
    *)
      break
      ;;
  esac
done

if [[ -z "$file" ]]; then
  echo "Error: --file is required" >&2
  usage
  exit 2
fi

if ! [[ "$threads" =~ ^[0-9]+$ ]] || [[ "$threads" -lt 1 ]]; then
  echo "Error: --threads must be a positive integer" >&2
  exit 2
fi

(( verbose )) && echo "file=$file threads=$threads"
```

Zwei Details sind hier praxisrelevant:

-   shift 2 ist das sichere "Option + Wert verbrauchen"
-   -- als Separator erlaubt, danach bleiben Positionals unangetastet

## Optional heißt nicht beliebig: Validierung gehört dazu

Optionalen Input anzunehmen ist die eine Seite. Zu prüfen, ob er plausibel ist, die andere. Das ist kein Overkill, sondern spart Debug-Zeit.

Beispiele, die in Scripts viel Ärger verhindern:

-   Existiert eine Datei wirklich?
-   Ist eine Zahl wirklich eine Zahl?
-   Ist ein Pfad leer oder nur whitespace?

```bash
if [[ -n "$file" && ! -f "$file" ]]; then
  echo "Error: file not found: $file" >&2
  exit 2
fi
```

## getopts: Gut für kurze Optionen, limitiert bei Long Flags

Bash bringt getopts mit. Das ist solide für -f, -t, -v, aber unterstützt keine Long Options wie --file ohne Extra-Logik. Für viele interne Tools reicht getopts, für "CLI-Feeling" mit Long Flags ist die while+case-Variante oft einfacher.

Ein minimales getopts-Beispiel:

```bash
#!/usr/bin/env bash
set -euo pipefail

file=""
threads=4
verbose=0

while getopts ":f:t:vh" opt; do
  case "$opt" in
    f) file="$OPTARG" ;;
    t) threads="$OPTARG" ;;
    v) verbose=1 ;;
    h)
      echo "Usage: $(basename "$0") -f PATH [-t N] [-v]"
      exit 0
      ;;
    :)
      echo "Missing value for -$OPTARG" >&2
      exit 2
      ;;
    \?)
      echo "Unknown option: -$OPTARG" >&2
      exit 2
      ;;
  esac
done

shift $((OPTIND - 1))
```

Wenn du Long Flags willst, bleib bei case parsing oder nutze in anderen Sprachen Argumentparser. In Bash ist "einfach und korrekt" meist besser als "vollständig und fragil".

## Ein Pattern, das sich bewährt: Defaults oben, Parsing in der Mitte, Logik unten

Ein Script liest sich am besten, wenn es drei klare Bereiche hat:

1. Defaults und usage() ganz oben
2. Parsing in einer while-Schleife
3. Validierung und eigentliche Arbeit danach

Damit wird aus einem "schnellen Script" ein kleines Tool, das auch in sechs Monaten noch verständlich ist.

## Fazit

Optionale Argumente in Bash sind kein Spezialthema, sondern Alltag. Für wenige Positionals reichen Defaults mit ${1:-...}. Sobal

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
