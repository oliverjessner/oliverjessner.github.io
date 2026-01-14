---
layout: post
title: 'Bash: Nutzer anhalten und Ja, Nein oder Abbrechen abfragen'
date: 2026-01-14 14:17:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
    - macos
description: 'So pausierst du ein Bash-Skript und fragst per Prompt nach Ja, Nein oder Abbrechen, inklusive robustem read, case und sauberen Exit-Codes'
thumbnail: '/assets/images/gen/blog/bash-nutzer-anhalten-und-ja-nein-oder-abbrechen-abfragen/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-nutzer-anhalten-und-ja-nein-oder-abbrechen-abfragen/header.webp'
---

Interaktive Prompts wirken simpel, werden aber schnell unklar, wenn du saubere Defaults, Wiederholungen und einen Abbruchpfad brauchst. Mit `read` und `case` bekommst du einen typischen "Yes / No / Cancel"-Prompt, der in echten Skripten gut funktioniert.

## Was "typisch" in Bash heißt

Bash hat keinen eingebauten Standarddialog wie grafische Tools, aber es gibt ein etabliertes Muster:

-   Prompt anzeigen
-   Eingabe lesen
-   Eingabe normalisieren
-   per `case` in Optionen verzweigen
-   bei ungültiger Eingabe erneut fragen
-   Abbruch mit klarem Exit-Code

Dabei ist wichtig, dass du nicht auf "irgendwas" reagierst, sondern nur auf definierte Eingaben.

## Variante 1: Der klassische Prompt mit read und case

Diese Variante fragt so lange nach, bis der Nutzer eine gültige Eingabe macht.

```bash
ask_ync() {
  local prompt="$1"
  local answer=""

  while true; do
    read -r -p "$prompt [y/n/c]: " answer

    case "$answer" in
      [Yy]|[Yy][Ee][Ss])
        return 0
        ;;
      [Nn]|[Nn][Oo])
        return 1
        ;;
      [Cc]|[Cc][Aa][Nn][Cc][Ee][Ll])
        return 2
        ;;
      *)
        echo "Bitte y, n oder c eingeben."
        ;;
    esac
  done
}
```

Verwendung:

```bash
ask_ync "Fortfahren?"
rc=$?

case "$rc" in
  0) echo "Ja" ;;
  1) echo "Nein" ;;
  2) echo "Abbruch"; exit 130 ;;
esac
```

Warum `130`? Das ist ein gängiger Exit-Code für "abgebrochen" (angelehnt an SIGINT), ohne dass du wirklich ein Signal senden musst.

## Variante 2: Ein Prompt mit Default und Enter als Auswahl

Manchmal willst du einen Default, zum Beispiel "Yes", wenn der Nutzer einfach Enter drückt. Das ist im Alltag angenehm, solange der Default klar sichtbar ist.

```bash
ask_ync_default_yes() {
  local prompt="$1"
  local answer=""

  while true; do
    read -r -p "$prompt [Y/n/c]: " answer

    if [[ -z "$answer" ]]; then
      return 0
    fi

    case "$answer" in
      [Yy]|[Yy][Ee][Ss]) return 0 ;;
      [Nn]|[Nn][Oo])     return 1 ;;
      [Cc]|[Cc][Aa][Nn][Cc][Ee][Ll]) return 2 ;;
      *) echo "Bitte y, n oder c eingeben." ;;
    esac
  done
}
```

Das Muster ist identisch, nur die leere Eingabe wird explizit behandelt.

## Variante 3: Ein einzelnes Zeichen lesen, ohne Enter

Für manche Skripte ist "Taste drücken" angenehmer. Das geht mit `read -n 1`. Hier ist wichtig: Du musst trotzdem sauber auswerten und danach eine neue Zeile ausgeben.

```bash
ask_ync_keypress() {
  local prompt="$1"
  local key=""

  while true; do
    printf "%s [y/n/c]: " "$prompt"
    read -r -n 1 key
    echo

    case "$key" in
      [Yy]) return 0 ;;
      [Nn]) return 1 ;;
      [Cc]) return 2 ;;
      *) echo "Bitte y, n oder c drücken." ;;
    esac
  done
}
```

Das wirkt "dialogiger", ist aber auch schneller falsch zu bedienen. Für riskante Aktionen ist Variante 1 oft besser, weil sie klarer ist.

## Pausieren ohne Auswahl: "Press any key to continue"

Wenn du nur stoppen willst, ohne Entscheidung:

```bash
pause() {
  read -r -n 1 -s -p "Weiter mit einer Taste..." _
  echo
}
```

-   `-n 1` liest ein Zeichen
-   `-s` versteckt die Eingabe
-   `_` ist eine Dummy-Variable

## Typische Details, die Skripte stabiler machen

-   Verwende `read -r`, damit Backslashes nicht versehentlich interpretiert werden
-   Gib Prompts mit `printf` oder `read -p` aus, aber halte es konsistent
-   Entscheide bewusst, ob Enter einen Default auslösen darf
-   Nutze `case` statt verschachtelter `if`-Ketten, das bleibt lesbarer

Warnhinweis: Interaktive Prompts sind in CI oder in piped Kontexten oft unpassend. Wenn dein Skript auch automatisiert laufen soll, lohnt sich ein `--yes` oder `--non-interactive` Flag als Alternative.

## Mini-Skript: Ja, Nein oder Abbrechen als wiederverwendbares Muster

```bash
#!/usr/bin/env bash
set -u

ask_ync() {
  local prompt="$1"
  local answer=""

  while true; do
    read -r -p "$prompt [y/n/c]: " answer

    case "$answer" in
      [Yy]|[Yy][Ee][Ss]) return 0 ;;
      [Nn]|[Nn][Oo])     return 1 ;;
      [Cc]|[Cc][Aa][Nn][Cc][Ee][Ll]) return 2 ;;
      *) echo "Bitte y, n oder c eingeben." ;;
    esac
  done
}

ask_ync "Soll das Skript die Datei überschreiben?"
rc=$?

case "$rc" in
  0)
    echo "Überschreibe Datei"
    ;;
  1)
    echo "Überschreibe nicht"
    ;;
  2)
    echo "Abbruch"
    exit 130
    ;;
esac
```

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
