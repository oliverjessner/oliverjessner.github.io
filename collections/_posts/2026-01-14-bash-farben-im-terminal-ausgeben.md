---
layout: post
title: 'Bash: Farben im Terminal ausgeben'
date: 2026-01-14 13:09:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
description: 'So gibst du in Bash farbigen Text aus, ohne das Terminal zu "verfärben": ANSI-Codes, printf statt echo und ein kleines Helper-Pattern für klare Statusmeldungen'
thumbnail: '/assets/images/gen/blog/bash-farben-im-terminal-ausgeben/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-farben-im-terminal-ausgeben/header.webp'
---

Farbiger Output macht Bash-Skripte besser lesbar, wenn du es sparsam und sauber einsetzt. Entscheidend ist der Reset am Ende und ein Ansatz, der auf macOS und Linux stabil funktioniert.

## Schritt 0: Was echo kann und warum printf meist die bessere Basis ist

Viele Beispiele im Netz nutzen `echo -e`, um Escape-Sequenzen wie `\033` zu interpretieren. Das funktioniert häufig, ist aber nicht überall gleich zuverlässig, weil `echo` je nach Shell und System leicht unterschiedlich implementiert ist.

Für reproduzierbare Skripte ist `printf` die solidere Wahl. Es interpretiert Escape-Sequenzen konsistent und formatiert sauber.

## ANSI Escape Codes: der kleinste gemeinsame Nenner

Die meisten Terminals unterstützen ANSI Escape Codes. Du kombinierst dabei:

-   Startsequenz, die eine Farbe setzt
-   Text
-   Resetsequenz, die wieder auf Standard zurückstellt

Ein minimaler Einstieg mit `printf`:

```bash
printf "\033[31mRot\033[0m\n"
```

Dabei gilt:

-   `\033` ist das Escape-Zeichen
-   `[31m` setzt die Vordergrundfarbe auf Rot
-   `[0m` setzt alles zurück

Wenn du den Reset vergisst, bleibt dein Terminal nach dem Skript im Farbschema hängen. Genau das ist der häufigste Fehler.

## Praktisches Muster: Farben als Variablen definieren

Im Skript-Alltag willst du nicht überall Codes wiederholen. Definiere sie einmal und nutze sie dann wie Bausteine.

```bash
RED="\033[31m"
GREEN="\033[32m"
YELLOW="\033[33m"
RESET="\033[0m"

printf "${GREEN}OK${RESET} Build erfolgreich\n"
printf "${YELLOW}WARN${RESET} Konfiguration fehlt, nutze Defaults\n"
printf "${RED}ERR${RESET} Konnte Datei nicht öffnen\n"
```

Das ist schlicht, gut lesbar und schnell angepasst.

## Hintergrundfarben und Styles

Neben Vordergrundfarben kannst du auch Hintergrundfarben und Styles setzen:

-   Bold: `1`
-   Underline: `4`
-   Hintergrundfarben beginnen meist bei `40` bis `47`

Beispiel: Weißer Text auf rotem Hintergrund, fett, danach Reset:

```bash
printf "\033[1;37;41mFATAL\033[0m Etwas ist schiefgelaufen\n"
```

Wenn du Styles kombinierst, trennst du die Codes mit Semikolon.

## echo in Farbe: wenn du es trotzdem verwenden willst

Wenn du bewusst bei `echo` bleiben willst, brauchst du typischerweise `-e`, damit Escape-Sequenzen interpretiert werden.

```bash
echo -e "\033[34mBlau\033[0m"
```

Das kann funktionieren, aber es ist weniger verlässlich als `printf`. Für Skripte, die du teilst oder in CI laufen lässt, ist `printf` meist die bessere Default-Entscheidung.

## Nutzerfreundlich: Status-Helper statt bunter Texte überall

Farben sind am hilfreichsten bei Statusmeldungen. Ein kleines Helper-Pattern hält den Code sauber und reduziert Wiederholungen.

```bash
RED="\033[31m"
GREEN="\033[32m"
YELLOW="\033[33m"
RESET="\033[0m"

log_ok()   { printf "${GREEN}OK${RESET} %s\n" "$1"; }
log_warn() { printf "${YELLOW}WARN${RESET} %s\n" "$1"; }
log_err()  { printf "${RED}ERR${RESET} %s\n" "$1" >&2; }

log_ok "Alles bereit"
log_warn "Kein Cache gefunden"
log_err "Download fehlgeschlagen"
```

Zwei Details sind hier bewusst:

-   Fehler gehen nach `stderr` über `>&2`
-   der Text wird als `%s` formatiert, dadurch bleibt Quoting sauber

## Optional, aber sinnvoll: Farben automatisch deaktivieren

Nicht jedes Umfeld kann Farben. Logs in Dateien, manche CI-Ausgaben oder Tools, die Output weiterverarbeiten, profitieren von "no color".

Ein pragmatisches Muster ist ein Flag oder eine einfache Umgebungsvariable:

```bash
NO_COLOR="${NO_COLOR:-}"

if [[ -n "$NO_COLOR" ]]; then
  RED=""
  GREEN=""
  YELLOW=""
  RESET=""
else
  RED="\033[31m"
  GREEN="\033[32m"
  YELLOW="\033[33m"
  RESET="\033[0m"
fi
```

Damit kannst du Farben per `NO_COLOR=1 ./script.sh` abschalten, ohne den Code umzubauen.

## Mini-Skript: farbige Ausgabe als Grundlage für eigene Tools

```bash
#!/usr/bin/env bash
set -u

NO_COLOR="${NO_COLOR:-}"

if [[ -n "$NO_COLOR" ]]; then
  RED=""
  GREEN=""
  YELLOW=""
  RESET=""
else
  RED="\033[31m"
  GREEN="\033[32m"
  YELLOW="\033[33m"
  RESET="\033[0m"
fi

log_ok()   { printf "${GREEN}OK${RESET} %s\n" "$1"; }
log_warn() { printf "${YELLOW}WARN${RESET} %s\n" "$1"; }
log_err()  { printf "${RED}ERR${RESET} %s\n" "$1" >&2; }

log_ok "Start"
log_warn "Das ist nur ein Hinweis"
log_err "Das ist ein Fehler"
```

Aufruf:

```bash
./colors.sh
NO_COLOR=1 ./colors.sh
```

## Cheatsheet

| Zweck              | Name             | Code | Beispiel    |
| ------------------ | ---------------- | ---: | ----------- |
| Reset              | Reset            |    0 | `\033[0m`   |
| Style              | Bold             |    1 | `\033[1m`   |
| Style              | Dim              |    2 | `\033[2m`   |
| Style              | Underline        |    4 | `\033[4m`   |
| Style              | Blink (selten)   |    5 | `\033[5m`   |
| Style              | Reverse          |    7 | `\033[7m`   |
| Style              | Hidden           |    8 | `\033[8m`   |
| Vordergrund        | Schwarz          |   30 | `\033[30m`  |
| Vordergrund        | Rot              |   31 | `\033[31m`  |
| Vordergrund        | Grün             |   32 | `\033[32m`  |
| Vordergrund        | Gelb             |   33 | `\033[33m`  |
| Vordergrund        | Blau             |   34 | `\033[34m`  |
| Vordergrund        | Magenta          |   35 | `\033[35m`  |
| Vordergrund        | Cyan             |   36 | `\033[36m`  |
| Vordergrund        | Weiß             |   37 | `\033[37m`  |
| Vordergrund (hell) | Hellgrau         |   90 | `\033[90m`  |
| Vordergrund (hell) | Hellrot          |   91 | `\033[91m`  |
| Vordergrund (hell) | Hellgrün         |   92 | `\033[92m`  |
| Vordergrund (hell) | Hellgelb         |   93 | `\033[93m`  |
| Vordergrund (hell) | Hellblau         |   94 | `\033[94m`  |
| Vordergrund (hell) | Hellmagenta      |   95 | `\033[95m`  |
| Vordergrund (hell) | Hellcyan         |   96 | `\033[96m`  |
| Vordergrund (hell) | Hellweiß         |   97 | `\033[97m`  |
| Hintergrund        | Schwarz          |   40 | `\033[40m`  |
| Hintergrund        | Rot              |   41 | `\033[41m`  |
| Hintergrund        | Grün             |   42 | `\033[42m`  |
| Hintergrund        | Gelb             |   43 | `\033[43m`  |
| Hintergrund        | Blau             |   44 | `\033[44m`  |
| Hintergrund        | Magenta          |   45 | `\033[45m`  |
| Hintergrund        | Cyan             |   46 | `\033[46m`  |
| Hintergrund        | Weiß             |   47 | `\033[47m`  |
| Hintergrund (hell) | Hellschwarz/Grau |  100 | `\033[100m` |
| Hintergrund (hell) | Hellrot          |  101 | `\033[101m` |
| Hintergrund (hell) | Hellgrün         |  102 | `\033[102m` |
| Hintergrund (hell) | Hellgelb         |  103 | `\033[103m` |
| Hintergrund (hell) | Hellblau         |  104 | `\033[104m` |
| Hintergrund (hell) | Hellmagenta      |  105 | `\033[105m` |
| Hintergrund (hell) | Hellcyan         |  106 | `\033[106m` |
| Hintergrund (hell) | Hellweiß         |  107 | `\033[107m` |

## Kurzfazit

Farbiger Output in Bash ist im Kern nur ANSI plus Reset. Wenn du stabile Skripte willst, nutze `printf` statt `echo -e`, definiere Farben als Variablen und kapsle Statusausgaben in kleine Helper-Funktionen. So bleibt es lesbar und du vermeidest den Klassiker, das Terminal dauerhaft einzufärben.

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
