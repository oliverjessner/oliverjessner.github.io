---
layout: post
title: 'Bash: Ein Shell-Skript aus einem anderen Skript aufrufen'
date: 2026-01-14 14:48:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
    - macos
description: 'So rufst du ein Shell-Skript aus einem anderen auf: ausführen vs sourcen, Pfade robust lösen, Argumente weiterreichen, Output abfangen und Exit-Codes sauber nutzen'
thumbnail: '/assets/images/gen/blog/bash-ein-shell-skript-aus-einem-anderen-skript-aufrufen/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-ein-shell-skript-aus-einem-anderen-skript-aufrufen/header.webp'
---

Ein Skript soll ein anderes Skript nutzen, ohne dass Pfade brechen oder Variablen “verschwinden”. Hier sind die zwei sauberen Wege in Bash, plus Argumente, Output, Exit-Codes und ein robustes Projektmuster.

## Zwei Konzepte, die man trennen muss

Wenn Leute sagen "ein Skript aus einem anderen aufrufen", meinen sie in Bash meist eines von zwei Dingen:

1. Das zweite Skript als eigenes Programm ausführen
2. Das zweite Skript in den aktuellen Prozess einbinden

Beides wirkt ähnlich, hat aber komplett andere Folgen für Variablen, Arbeitsverzeichnis und Fehlerbehandlung.

## Variante 1: Ein anderes Skript ausführen

Das ist der Standard, wenn du das zweite Skript wie ein eigenständiges Tool behandeln willst.

```bash
./other.sh
```

Voraussetzungen:

-   Das Skript ist ausführbar (`chmod +x other.sh`)
-   Es hat idealerweise einen Shebang wie `#!/usr/bin/env bash`

Wenn du nicht auf Ausführungsrechte bauen willst, kannst du den Interpreter explizit angeben:

```bash
bash ./other.sh
```

Das ist praktisch in CI oder in Repos, in denen nicht jeder Filemode korrekt gesetzt ist.

### Argumente weiterreichen

Argumente werden ganz normal angehängt:

```bash
./other.sh --name "Oliver" --count 3
```

Wenn dein Wrapper-Skript einfach alles durchreichen soll, ist dieses Muster üblich:

```bash
./other.sh "$@"
```

`"$@"` bewahrt Argumentgrenzen, auch bei Leerzeichen.

### Exit-Code übernehmen oder auswerten

Bash-Skripte arbeiten in der Praxis oft über Exit-Codes. Nach dem Aufruf steht der Rückgabewert in `$?`.

```bash
./other.sh "$@"
rc=$?

if [[ "$rc" -ne 0 ]]; then
  echo "other.sh ist fehlgeschlagen (rc=$rc)" >&2
  exit "$rc"
fi
```

Wenn du das Ergebnis einfach durchreichen willst, reicht auch:

```bash
./other.sh "$@"
exit $?
```

## Variante 2: Ein anderes Skript sourcen

Sourcen heißt: Das zweite Skript wird im aktuellen Shell-Prozess ausgeführt. Das ist sinnvoll, wenn du Funktionen oder Variablen "importieren" willst.

```bash
source ./lib.sh
```

oder kürzer:

```bash
. ./lib.sh
```

Das ist kein Subprozess. Das bedeutet:

-   Variablen, die `lib.sh` setzt, sind danach im aktuellen Skript verfügbar
-   Funktionen aus `lib.sh` stehen danach zur Verfügung
-   `cd` in `lib.sh` ändert dein aktuelles Arbeitsverzeichnis

Genau deshalb ist Sourcen gleichzeitig mächtig und riskant. Du willst es vor allem für Bibliotheken nutzen, nicht für eigenständige Programme.

## Der häufigste Fehler: relative Pfade brechen je nach Startverzeichnis

Viele Skripte funktionieren nur, wenn man sie aus genau dem richtigen Ordner startet. Das passiert, wenn du mit relativen Pfaden arbeitest und annimmst, dass das aktuelle Verzeichnis "das Repo" ist.

Die robuste Lösung ist, den Pfad zum Skriptverzeichnis zu bestimmen und davon aus weiter zu referenzieren.

```bash
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
```

Dann kannst du sicher auf andere Dateien relativ zum Skript zugreifen:

```bash
"$SCRIPT_DIR/other.sh" --help
source "$SCRIPT_DIR/lib.sh"
```

Das ist eines der Muster, die Bash-Skripte plötzlich deutlich weniger fragil machen.

## Output eines Skripts abfangen

Wenn das zweite Skript etwas ausgibt, kannst du den Output per Command Substitution einsammeln:

```bash
result="$("$SCRIPT_DIR/other.sh" --mode value)"
echo "Ergebnis: $result"
```

Wichtig: Damit fängst du stdout ab. Fehlertexte, die nach stderr gehen, bleiben sichtbar, was oft genau richtig ist.

Wenn du beides brauchst, musst du bewusst entscheiden, ob du stderr ebenfalls umleitest:

```bash
result="$("$SCRIPT_DIR/other.sh" --mode value 2>&1)"
```

Das ist hilfreich für Logging, aber du verlierst dann die Trennung zwischen normaler Ausgabe und Fehlern.

## Ein pragmatisches Projektmuster: lib plus tools

Wenn du mehrere Skripte hast, funktioniert diese Struktur gut:

-   `scripts/` enthält ausführbare Tools
-   `scripts/lib/` enthält sourced Bibliotheken mit Funktionen

Beispiel:

```bash
repo/
  scripts/
    build.sh
    deploy.sh
    lib/
      logging.sh
      paths.sh
```

In `scripts/build.sh`:

```bash
#!/usr/bin/env bash
set -u

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/lib/logging.sh"

log_ok "Build startet"
```

In `scripts/lib/logging.sh`:

```bash
log_ok() {
  printf "OK %s\n" "$1"
}
```

So ist klar, was als Tool gedacht ist und was als Bibliothek.

## Wann du welche Variante nutzen solltest

Ausführen ist sinnvoll, wenn:

-   das zweite Skript ein eigenständiges Tool ist
-   du eine saubere Prozessgrenze willst
-   du mit Exit-Codes arbeitest
-   du vermeiden willst, dass Variablen global "leaken"

Sourcen ist sinnvoll, wenn:

-   du Funktionen oder Konstanten teilen willst
-   du ein gemeinsames Logging oder Pfad-Handling zentralisieren willst
-   du bewusst im gleichen Prozess bleiben möchtest

Wenn du unsicher bist: Ausführen ist meist die konservativere Wahl.

## Mini-Beispiel: Wrapper-Skript, das ein Tool aufruft und ein lib sourced

```bash
#!/usr/bin/env bash
set -u

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

source "$SCRIPT_DIR/lib/logging.sh"

log_info() {
  printf "INFO %s\n" "$1"
}

log_info "Starte other.sh"
"$SCRIPT_DIR/other.sh" "$@"
rc=$?

if [[ "$rc" -ne 0 ]]; then
  printf "ERR other.sh fehlgeschlagen (rc=%s)\n" "$rc" >&2
  exit "$rc"
fi

log_info "Fertig"
```

Das Beispiel trennt bewusst:

-   Bibliothek wird sourced, damit Funktionen verfügbar sind
-   Tool wird ausgeführt, damit es isoliert bleibt
-   Exit-Code wird sauber übernommen

## Kurzfazit

Du kannst ein Shell-Skript aus einem anderen entweder ausführen oder sourcen. Ausführen ist die Standardlösung für Tools, sourcen ist das Mittel der Wahl für geteilte Funktionen. Entscheidend für stabile Skripte ist fast immer der Pfad: löse Referenzen relativ zum Skriptverzeichnis, nicht relativ zum aktuellen Arbeitsverzeichnis.

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
