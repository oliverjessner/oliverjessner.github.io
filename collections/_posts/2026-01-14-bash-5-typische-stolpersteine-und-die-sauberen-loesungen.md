---
layout: post
title: 'Bash: 5 typische Stolpersteine und die sauberen Lösungen'
date: 2026-01-14 11:15:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - macos
    - software-development
description: 'Fünf typische Bash-Fragen aus der Praxis, kompakt beantwortet: Ordner prüfen, Programme finden, Substrings checken, Dateiname trennen und farbiger Output'
thumbnail: '/assets/images/gen/blog/bash-5-typische-stolpersteine-und-die-sauberen-loesungen/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-5-typische-stolpersteine-und-die-sauberen-loesungen/header.webp'
---

Wenn ich Bash erkläre, sind es selten exotische Features, die hängen bleiben. Es sind fünf Basics, die ständig wieder auftauchen. Hier sind sie als kompakte Sammlung, inklusive der Muster, die in echten Skripten zuverlässig funktionieren.

## 1. Wie prüfe ich, ob ein Ordner existiert

Viele Skripte bauen auf Dateien und Verzeichnissen auf. Bevor du etwas anlegst, liest oder schreibst, ist ein klarer Check sinnvoll.

Der Standardtest ist `-d`:

```bash
DIR="/tmp/example"

if [[ -d "$DIR" ]]; then
  echo "Ordner existiert"
else
  echo "Ordner existiert nicht"
fi
```

Wenn du in der Praxis einfach sicherstellen willst, dass ein Ordner existiert, ist oft `mkdir -p` die bessere Antwort als ein eigener Check:

```bash
mkdir -p "$DIR"
```

Mehr Kontext, inklusive typischer Fallen:  
[Prüfen, ob ein Ordner existiert](https://oliverjessner.at/blog/2026-01-14-bash-pruefen-ob-ein-ordner-existiert/)

## 2. Wie prüfe ich, ob ein Programm verfügbar ist

Skripte scheitern häufig nicht an deiner Logik, sondern an fehlenden Tools. Der pragmatische Standard ist `command -v`.

```bash
if command -v git >/dev/null 2>&1; then
  echo "git ist verfügbar"
else
  echo "git fehlt"
fi
```

Für mehrere Abhängigkeiten lohnt sich ein kleines Helper-Pattern:

```bash
require_cmd() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "Fehler: Benötigtes Programm fehlt: $cmd" >&2
    exit 1
  fi
}

require_cmd git
require_cmd curl
```

Mehr Details, inklusive Alternativen und Pfad-Checks:  
[Prüfen, ob ein Programm installiert ist
](https://oliverjessner.at/blog/2026-01-14-bash-pruefen-ob-ein-programm-installiert-ist/)

## 3. Wie prüfe ich, ob ein String einen Teilstring enthält

Das ist eine der typischen Fragen, sobald Scripts mit Parametern, Dateinamen oder Output arbeiten. In Bash ist der einfachste Ansatz Pattern-Matching in `[[ ... ]]`.

```bash
text="Hallo Oliver, willkommen im Terminal"
needle="Oliver"

if [[ "$text" == *"$needle"* ]]; then
  echo "Treffer"
else
  echo "Kein Treffer"
fi
```

Der wichtige Punkt ist das Quoting. Ohne `"$text"` und `"$needle"` zerlegt dir Bash Pfade mit Leerzeichen schnell in mehrere Teile.

Wenn Inputs Sonderzeichen enthalten können und du wirklich literal prüfen willst, ist eine Fixed-String-Variante oft robuster.

Mehr dazu, inklusive Stolperfallen:  
[Prüfen, ob ein String einen Teilstring enthält
](https://oliverjessner.at/blog/2026-01-14-bash-pruefen-ob-ein-string-einen-teilstring-enthaelt/)

## 4. Wie trenne ich Dateiname und Endung sauber

Spätestens bei Automationsskripten ist Dateinamenslogik unvermeidlich. Bash kann das mit Parameter Expansion sehr elegant.

Standardfall:

```bash
file="report.pdf"
base="${file%.*}"
ext="${file##*.}"
echo "base=$base ext=$ext"
```

In der Praxis musst du aber auch Sonderfälle bedenken: keine Endung, mehrere Punkte, versteckte Dateien wie `.env`, und mehrteilige Endungen wie `.tar.gz`. Je nach Projekt lohnt sich dafür eine bewusst definierte Regel, statt eines One-Liners.

Mehr Beispiele und robuste Varianten:  
[Dateiname und Endung sauber trennen](https://oliverjessner.at/blog/2026-01-14-bash-dateiname-und-endung-sauber-trennen/)

## 5. Wie mache ich farbigen Output, ohne das Terminal zu "verfärben"

Farben sind kein Muss, aber sie machen Statusausgaben deutlich lesbarer. Der wichtigste Punkt ist immer der Reset.

Mit `printf` ist es am stabilsten:

```bash
RED="\033[31m"
GREEN="\033[32m"
RESET="\033[0m"

printf "${GREEN}OK${RESET} %s\n" "Alles bereit"
printf "${RED}ERR${RESET} %s\n" "Etwas ist schiefgelaufen"
```

Ein kleines Logging-Pattern hält das Skript sauber, statt überall Escape Codes zu streuen.

Mehr dazu, inklusive `NO_COLOR`-Schalter:  
[Farben im Terminal ausgeben](https://oliverjessner.at/blog/2026-01-14-bash-farben-im-terminal-ausgeben/)

## Ein Muster, das diese fünf Fragen verbindet

Diese Fragen wirken wie Einzelfälle, sind aber im Kern dasselbe Problem: Bash ist stark, wenn du klare, wiederverwendbare Muster hast.

-   früh prüfen statt später rätseln
-   Inputs quoten, bis das Gegenteil bewiesen ist
-   Sonderfälle bewusst behandeln, nicht zufällig
-   Output so bauen, dass er im Alltag lesbar bleibt

Wenn du diese fünf Basics sitzt, fühlen sich viele "komplizierte" Skripte plötzlich wie eine Kette kleiner, kontrollierter Schritte an.

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
