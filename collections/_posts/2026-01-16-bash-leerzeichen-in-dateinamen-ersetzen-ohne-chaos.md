---
layout: post
title: 'Bash: Leerzeichen in Dateinamen ersetzen ohne Chaos'
date: 2026-01-16 20:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
description: 'So ersetzt du Leerzeichen in Dateinamen sicher per Bash Script, ohne Files zu verlieren oder Pfade zu zerlegen'
thumbnail: '/assets/images/gen/blog/bash-leerzeichen-in-dateinamen-ersetzen-ohne-chaos/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-leerzeichen-in-dateinamen-ersetzen-ohne-chaos/header.webp'
---

Leerzeichen in Dateinamen sind kein Problem, bis du automatisierst. Ein unquoted mv reicht und aus einem Pfad werden plötzlich mehrere Argumente. So geht es sicher und nachvollziehbar.

## Warum das überhaupt schiefgeht

Das Problem sind nicht die Leerzeichen, sondern die Shell-Regeln: Unquoted Variablen werden aufgespalten, und Wildcards können expandieren. Wer Dateinamen umbennen will, muss daher zwei Dinge konsequent tun:

-   Immer korrekt quoten
-   Nicht über ls oder fragile Text-Pipelines iterieren

In der Praxis heißt das: Glob-Expansion oder find, dazu eine Loop, dazu mv mit klarer Zielbildung.

## Ziel definieren: Was soll aus dem Leerzeichen werden?

Meist gibt es drei Varianten:

-   Leerzeichen durch Unterstrich ersetzen: "My File.txt" → "My_File.txt"
-   Leerzeichen durch Bindestrich ersetzen: "My File.txt" → "My-File.txt"
-   Mehrere Leerzeichen zusammenfassen und nebenbei "aufräumen"

Im folgenden Beispiel ersetze ich Leerzeichen durch Unterstriche. Den Ersatz kannst du jederzeit anpassen.

## Die sichere Basis: In einem Ordner alle Dateien umbenennen

```bash
#!/usr/bin/env bash
set -euo pipefail

replacement="_"
dry_run=0

usage() {
  cat <<'EOF'
Usage: replace-spaces.sh [--dry-run] [--replacement STR] [path]

Replaces spaces in file names in the given directory (non-recursive).

Options:
  --dry-run            Show what would be renamed, do not change anything
  --replacement STR    Replacement for spaces (default: _)
  -h, --help           Show help
EOF
}

path="."

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run) dry_run=1; shift ;;
    --replacement)
      [[ $# -ge 2 ]] || { echo "Missing value for --replacement" >&2; usage; exit 2; }
      replacement="$2"
      shift 2
      ;;
    -h|--help) usage; exit 0 ;;
    *) path="$1"; shift ;;
  esac
done

[[ -d "$path" ]] || { echo "Error: not a directory: $path" >&2; exit 2; }

shopt -s nullglob

for old in "$path"/*; do
  base="$(basename "$old")"
  dir="$(dirname "$old")"

  new="${base// /$replacement}"

  [[ "$new" == "$base" ]] && continue

  target="$dir/$new"

  if [[ -e "$target" ]]; then
    echo "Skip: target exists: $target" >&2
    continue
  fi

  if (( dry_run )); then
    printf "Would rename: %q -> %q\n" "$old" "$target"
  else
    mv -- "$old" "$target"
    printf "Renamed: %q -> %q\n" "$old" "$target"
  fi
done
```

Was das Script bewusst macht:

-   ${base// /$replacement} ersetzt alle Leerzeichen
-   mv -- trennt Optionen vom Dateinamen, falls ein Name mit - beginnt
-   Es überspringt Kollisionen, statt still zu überschreiben
-   --dry-run ist der sichere Start, bevor du tatsächlich umbenennst

## Rekursiv umbenennen, aber ohne Nebenwirkungen

Rekursiv wird es schneller heikel, weil du beim Umbennen nicht durch einen Pfad laufen willst, der sich gerade ändert. Der zuverlässige Ansatz ist, mit find von unten nach oben zu arbeiten, also deepest first.

```bash
#!/usr/bin/env bash
set -euo pipefail

replacement="_"
dry_run=0
root="."

usage() {
  cat <<'EOF'
Usage: replace-spaces-recursive.sh [--dry-run] [--replacement STR] [root]

Replaces spaces in file and directory names under root, deepest first.

Options:
  --dry-run            Show what would be renamed
  --replacement STR    Replacement for spaces (default: _)
  -h, --help           Show help
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run) dry_run=1; shift ;;
    --replacement)
      [[ $# -ge 2 ]] || { echo "Missing value for --replacement" >&2; usage; exit 2; }
      replacement="$2"
      shift 2
      ;;
    -h|--help) usage; exit 0 ;;
    *) root="$1"; shift ;;
  esac
done

[[ -d "$root" ]] || { echo "Error: not a directory: $root" >&2; exit 2; }

while IFS= read -r -d '' old; do
  base="$(basename "$old")"
  dir="$(dirname "$old")"
  new="${base// /$replacement}"

  [[ "$new" == "$base" ]] && continue

  target="$dir/$new"

  if [[ -e "$target" ]]; then
    echo "Skip: target exists: $target" >&2
    continue
  fi

  if (( dry_run )); then
    printf "Would rename: %q -> %q\n" "$old" "$target"
  else
    mv -- "$old" "$target"
    printf "Renamed: %q -> %q\n" "$old" "$target"
  fi
done < <(find "$root" -depth -name "* *" -print0)
```

Zwei technische Entscheidungen sind hier entscheidend:

-   -print0 und read -d '' sind der Standard, um Dateinamen mit Sonderzeichen korrekt zu behandeln
-   -depth stellt sicher, dass Unterordner vor ihren Eltern umbenannt werden

## Mehr als nur Leerzeichen: "aufräumen" ohne Überraschungen

Manchmal willst du neben Leerzeichen auch andere typische Stolpersteine entschärfen, etwa mehrere Spaces, Tabs oder doppelte Unterstriche. Das kann sinnvoll sein, aber es wird schnell subjektiv.

Wenn du das willst, mach es bewusst und schrittweise, zum Beispiel:

-   Erst Leerzeichen ersetzen
-   Dann Mehrfach-Separatoren reduzieren
-   Dann optional trimmen

In Bash kann man Mehrfach-Separatoren reduzieren, aber sobald Regeln komplexer werden, ist es besser, kleine Schritte zu machen und mit --dry-run zu prüfen.

## Warnhinweise, die in der Praxis zählen

-   Starte immer mit --dry-run, besonders in Ordnern mit vielen Dateien
-   Überschreiben vermeiden: mv ohne Schutz kann vorhandene Dateien ersetzen, wenn du es zulässt
-   Nicht über ls iterieren: Das bricht bei Sonderzeichen und ist unnötig
-   Vorsicht bei externen Referenzen: Umbenennen kann Links, Scripts, Imports oder Media-Referenzen brechen, je nach Projekt

## Fazit

Leerzeichen in Dateinamen sind in Bash kein Drama, solange du strikt quotest und eine robuste Iteration verwendest. Für einen Ordner reicht ein sauberer Glob-Loop. Rekursiv ist find -depth mit -print0 die stabile Lösung. Mit --dry-run und Kollisionschecks wird daraus ein Script, das man auch auf echte Ordner loslassen kann.

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
