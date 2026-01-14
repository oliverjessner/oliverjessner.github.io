---
layout: post
title: 'Bash: 10 typische Lösungen für Aufgaben im Skript-Alltag'
date: 2026-01-14 11:15:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
    - macos
description: 'Zehn bewährte Bash-Muster für den Alltag: Checks, Prompts, Redirects, Prozesse, Parsing und Output, jeweils mit Mini-Beispiel und Link zum passenden Deep Dive'
thumbnail: '/assets/images/gen/blog/bash-10-typische-loesungen-fuer-aufgaben-im-skript-alltag/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-10-typische-loesungen-fuer-aufgaben-im-skript-alltag/header.webp'
---

Bash wirkt oft chaotisch, bis man ein paar robuste Standardmuster hat. Hier sind zehn typische Aufgaben und die Lösungen, die in echten Skripten sauber funktionieren, inklusive Links zu den passenden Deep Dives.

## 1. Prüfen, ob ein Ordner existiert und ihn bei Bedarf anlegen

Wenn ein Skript Dateien schreibt, ist der Zielordner oft die erste Fehlerquelle. `-d` prüft Verzeichnisse, `mkdir -p` macht es praktisch.

```bash
DIR="/tmp/example"
[[ -d "$DIR" ]] || mkdir -p "$DIR"
```

Zum vollständigen Artikel geht es [hier](https://oliverjessner.at/blog/2026-01-14-bash-pruefen-ob-ein-ordner-existiert/)

## 2. Prüfen, ob ein Programm verfügbar ist

Abhängigkeiten früh zu checken spart Debugging. `command -v` ist dafür das Standardmuster.

```bash
require_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Fehlt: $1" >&2
    exit 1
  }
}

require_cmd git
require_cmd curl
```

Zum vollständigen Artikel geht es [hier](https://oliverjessner.at/blog/2026-01-14-bash-pruefen-ob-ein-programm-installiert-ist/)

## 3. stdout und stderr sauber umleiten

Wenn du Output unterdrücken oder in Logs sammeln willst, ist `2>&1` zentral. Erst stdout umleiten, dann stderr “dazuhängen”.

```bash
mycmd >/dev/null 2>&1
```

Zum vollständigen Artikel geht es [hier](https://oliverjessner.at/blog/2026-01-14-bash-was-bedeutet-2-1/)

## 4. Einen Teilstring im String finden

Für schnelle Checks ist Pattern-Matching in `[[ ... ]]` meistens ausreichend und gut lesbar.

```bash
text="Hallo Oliver"
needle="Oliver"

if [[ "$text" == *"$needle"* ]]; then
  echo "Treffer"
fi
```

Zum vollständigen Artikel geht es [hier](https://oliverjessner.at/blog/2026-01-14-bash-pruefen-ob-ein-string-einen-teilstring-enthaelt/)

## 5. Dateiname und Endung trennen

Mit Parameter Expansion kommst du ohne externe Tools aus. Wichtig sind Sonderfälle wie mehrere Punkte oder keine Endung.

```bash
file="report.final.pdf"
base="${file%.*}"
ext="${file##*.}"
echo "base=$base ext=$ext"
```

Zum vollständigen Artikel geht es [hier](https://oliverjessner.at/blog/2026-01-14-bash-dateiname-und-endung-sauber-trennen/)

## 6. Ein Skript aus einem anderen aufrufen, ohne dass Pfade brechen

Relative Pfade sind die typische Fehlerquelle. Hol dir zuerst das Skriptverzeichnis und rufe von dort aus auf.

```bash
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
"$SCRIPT_DIR/other.sh" "$@"
```

Zum vollständigen Artikel geht es [hier](https://oliverjessner.at/blog/2026-01-14-bash-ein-shell-skript-aus-einem-anderen-skript-aufrufen/)

## 7. Interaktiver Prompt: Ja, Nein oder Abbrechen

Für Skripte, die bewusst interaktiv sind, ist `read` plus `case` der saubere Standard.

```bash
while true; do
  read -r -p "Fortfahren? [y/n/c]: " a
  case "$a" in
    [Yy]) break ;;
    [Nn]) exit 0 ;;
    [Cc]) exit 130 ;;
    *) echo "Bitte y, n oder c." ;;
  esac
done
```

Zum vollständigen Artikel geht es [hier](https://oliverjessner.at/blog/2026-01-14-bash-nutzer-anhalten-und-ja-nein-oder-abbrechen-abfragen/)

## 8. CPU Kerne und Threads ausgeben

Für Parallelisierung ist meist die logische Zahl relevant. Auf macOS ist `sysctl` der Standard, auf Linux `nproc`, und `getconf` ist ein guter Fallback.

```bash
threads="$(getconf _NPROCESSORS_ONLN 2>/dev/null)"
echo "Logische Kerne: $threads"
```

Zum vollständigen Artikel geht es [hier](https://oliverjessner.at/blog/2026-01-14-bash-cpu-kerne-und-threads-auslesen-und-ausgeben/)

## 9. Prozesse per Regex finden und kontrolliert beenden

Erst anzeigen, dann beenden. Mit `pgrep -af` bekommst du eine Vorschau, `pkill -TERM -f` beendet kontrolliert.

```bash
pattern="my-worker\.sh"
pgrep -af "$pattern"
pkill -TERM -f "$pattern"
```

Zum vollständigen Artikel geht es [hier](https://oliverjessner.at/blog/2026-01-14-bash-prozesse-per-regex-finden-und-sicher-beenden/)

## 10. Output lesbarer machen: Farben für Statusmeldungen

Farben helfen, wenn du sie sparsam einsetzt und immer resettest. `printf` ist dabei stabiler als `echo -e`.

```bash
GREEN="\033[32m"
RED="\033[31m"
RESET="\033[0m"

printf "${GREEN}OK${RESET} %s\n" "Alles bereit"
printf "${RED}ERR${RESET} %s\n" "Fehler beim Download" >&2
```

Zum vollständigen Artikel geht es [hier](https://oliverjessner.at/blog/2026-01-14-bash-farben-im-terminal-ausgeben/)

## Ein Einstieg, der diese Muster zusammenhält

Wenn du Bash neu lernst, ist es oft hilfreicher, diese Muster zu verstehen, als Features auswendig zu lernen. Sobald du Checks, Redirects, String-Handling und Prozesskontrolle sauber beherrschst, wirken viele Skripte plötzlich überraschend “geradlinig”.

Einstieg und Grundprinzipien:  
[Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
