---
layout: post
title: 'Bash: Prüfen, ob ein Programm installiert ist'
date: 2026-01-14 12:50:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
description: 'So prüfst du in Bash zuverlässig, ob ein Kommando verfügbar ist, und lieferst saubere Fehlermeldungen für Nutzer und CI'
thumbnail: '/assets/images/gen/blog/bash-pruefen-ob-ein-programm-installiert-ist/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-pruefen-ob-ein-programm-installiert-ist/header.webp'
image_width: 1280
image_height: 720
---

Bevor ein Skript loslegt, sollte es prüfen, ob benötigte Tools überhaupt verfügbar sind. In Bash geht das sauber mit Bordmitteln, inklusive klarer Fehlermeldung und optionaler Version-Checks.

## Warum sich der Check lohnt

Viele Bash-Skripte scheitern nicht an der Logik, sondern an fehlenden Abhängigkeiten: `git` ist nicht installiert, `jq` fehlt in der CI, oder `ffmpeg` liegt nicht im `PATH`. Wenn du das früh abfängst, werden Fehler verständlicher und Debugging kürzer.

Der Fokus ist dabei simpel: Prüfen, ob ein Kommando aufrufbar ist, bevor du es verwendest.

## Der Standardweg: command -v

Am robustesten ist `command -v`. Es ist in der Shell eingebaut und vermeidet einige Stolperfallen von externen Tools.

```bash
if command -v git >/dev/null 2>&1; then
  echo "git ist verfügbar"
else
  echo "git fehlt"
fi
```

Was hier passiert:

-   `command -v git` liefert den Pfad zum Kommando, falls es gefunden wird
-   `>/dev/null 2>&1` unterdrückt Output und Fehlertext, du arbeitest nur mit dem Exit-Code

Das Muster eignet sich für einzelne Tools genauso wie für Listen.

## Alternativen: type und which

Du wirst oft auch `type` sehen:

```bash
if type git >/dev/null 2>&1; then
  echo "git ist verfügbar"
fi
```

Das funktioniert in Bash ebenfalls gut, ist aber stärker shell-spezifisch.

`which` ist verbreitet, aber nicht die erste Wahl. Es ist oft ein externes Kommando, kann sich je nach System anders verhalten und ist unnötig, wenn du bereits `command -v` hast.

Wenn es um Skripte geht, die möglichst portabel sein sollen, ist `command -v` die pragmatische Default-Entscheidung.

## Praxisvariante: mehrere Abhängigkeiten prüfen und sauber abbrechen

In echten Skripten brauchst du meist nicht ein Tool, sondern mehrere. Dann ist ein kleiner Helfer sinnvoll, der eine verständliche Fehlermeldung ausgibt und das Skript beendet.

```bash
require_cmd() {
  local cmd="$1"

  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "Fehler: Benötigtes Programm fehlt: $cmd" >&2
    exit 1
  fi
}

require_cmd git
require_cmd jq
require_cmd curl
```

So bekommst du einen klaren Abbruch direkt am Anfang, statt eines kryptischen Fehlers irgendwo in der Mitte.

## Bonus: Prüfen, ob ein konkreter Pfad ausführbar ist

Manchmal willst du nicht "irgendein git", sondern ein ganz bestimmtes Programm an einem Ort prüfen. Dann passt `-x` auf Pfad-Ebene.

```bash
BIN="/usr/local/bin/ffmpeg"

if [[ -x "$BIN" ]]; then
  echo "ffmpeg ist ausführbar unter $BIN"
else
  echo "ffmpeg fehlt oder ist nicht ausführbar unter $BIN" >&2
fi
```

Das ist nützlich, wenn du bewusst nicht vom `PATH` abhängig sein willst.

## Version prüfen, wenn es wirklich wichtig ist

Ob du Versionen prüfen solltest, hängt vom Skript ab. Oft reicht "ist vorhanden". Wenn du aber ein Feature brauchst, das erst ab einer bestimmten Version existiert, ist ein Check sinnvoll.

Ein pragmatischer Ansatz ist, die Version auszugeben und in Logs sichtbar zu machen, statt alles hart zu parsen:

```bash
require_cmd jq
jq --version
```

Wenn du härter validieren musst, lohnt sich ein gezielter Check für genau dein Tool, nicht ein generisches, fehleranfälliges Version-Parsing für alles.

## Mini-Skript: Dependencies am Anfang prüfen

```bash
#!/usr/bin/env bash
set -u

require_cmd() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "Fehler: '$cmd' ist nicht installiert oder nicht im PATH" >&2
    exit 1
  fi
}

require_cmd git
require_cmd curl

echo "OK: Alle benötigten Programme sind verfügbar"
```

Das Skript macht genau eine Sache: Es sorgt dafür, dass der Rest später nicht in zufälligen Stellen auseinanderfällt.

## Kurzfazit

Wenn du in Bash prüfen willst, ob ein Programm existiert, ist `command -v <name>` das Standardmuster. Kombiniert mit einer kleinen `require_cmd`-Funktion bekommst du robuste Skripte, die früh und verständlich scheitern, statt spät und kryptisch.

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
