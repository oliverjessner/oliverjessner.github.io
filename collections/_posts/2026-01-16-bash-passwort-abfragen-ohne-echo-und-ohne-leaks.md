---
layout: post
title: 'Bash: Passwort abfragen ohne Echo und ohne Leaks'
date: 2026-01-16 20:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
    - macos
description: 'So liest du ein Passwort in Bash ohne Anzeige ein und vermeidest typische Leaks in Logs, History und Prozesslisten'
thumbnail: '/assets/images/gen/blog/bash-passwort-abfragen-ohne-echo-und-ohne-leaks/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-passwort-abfragen-ohne-echo-und-ohne-leaks/header.webp'
---

Ein Passwort ohne Echo einzulesen ist leicht. Es sicher weiterzuverwenden ist der Teil, an dem Shell-Skripte oft unbemerkt Daten preisgeben.

## Der Kern: read -s liest verdeckt

Bash kann Eingaben ohne Anzeige lesen. Dafür ist read -s da, meist kombiniert mit einem Prompt.

```bash
#!/usr/bin/env bash
set -euo pipefail

read -r -s -p "Password: " password
echo
```

Was dabei passiert:

-   -s deaktiviert die Echo-Ausgabe im Terminal
-   -p zeigt den Prompt, ohne ein separates echo davor
-   -r verhindert, dass Backslashes als Escape interpretiert werden

Das echo danach ist nur für den Zeilenumbruch, damit die nächste Ausgabe nicht direkt neben dem Prompt landet.

## Das wichtigste "Don’t": Passwörter nicht ausgeben

Dein Beispiel endet mit:

```bash
echo $password
```

Das ist für einen Test verständlich, aber in echten Scripts ein Sicherheitsproblem. Es landet in:

-   Terminal-Scrollback
-   Logs, wenn stdout umgeleitet wird
-   CI-Ausgaben, falls das Script in Pipelines läuft
-   Copy-Paste-Kontexten

Wenn du debuggen musst, gib höchstens Metadaten aus, nicht den Inhalt:

```bash
echo "Password length: ${#password}"
```

## Passwörter sicher an Commands übergeben

Viele Tools nehmen Passwörter über stdin oder ein File Descriptor, manche über Umgebungsvariablen. Die schlechteste Option ist fast immer ein Command-Line-Argument, weil es in Prozesslisten sichtbar sein kann.

### 1) Per stdin an ein Programm pipen

Wenn das Tool stdin akzeptiert, ist das der einfachste Weg.

```bash
read -r -s -p "Password: " password
echo

printf "%s" "$password" | some_command --password-stdin
```

Nur: Nicht jedes Programm unterstützt so ein Flag. Wenn es das nicht tut, bringt dir stdin allein nichts.

### 2) Mit sudo: -S und stdin

sudo kann das Passwort über stdin lesen. Dafür ist -S da.

```bash
read -r -s -p "Password: " password
echo

printf "%s\n" "$password" | sudo -S some_command
```

Warnhinweis: Das ist nicht automatisch "sicher", sondern nur weniger sichtbar als ein Argument. Du musst trotzdem vermeiden, dass dein Script das Passwort irgendwo ausgibt oder loggt.

### 3) With care: Umgebungsvariable

Manche Tools lesen Passwörter aus Environment-Variablen. Das ist oft besser als Argumente, aber auch nicht perfekt, weil Umgebungsvariablen je nach System sichtbar sein können.

```bash
read -r -s -p "Password: " password
echo

PASSWORD="$password" some_command
```

Wenn du das nutzt, begrenze die Reichweite, indem du es nur für den einen Prozess setzt, wie oben.

## Typische Leaks vermeiden

Wenn du schon eine verdeckte Eingabe machst, solltest du die klassischen Shell-Fallen gleich mitdenken.

### Quoting und read

Nutze immer -r und quote Variablen:

```bash
read -r -s -p "Password: " password
printf "%s\n" "Got input"
```

Nicht:

```bash
read -s password
echo $password
```

Unquoted echo kann Sonderzeichen interpretieren und ist im Debugging noch unangenehmer.

### Keine Passwörter in History

Wenn du das Passwort als Argument übergibst, taucht es unter Umständen in der Shell-History auf. Deshalb: keine Passwörter als Parameter.

### Keine Passwörter in Prozesslisten

Alles, was du als Argument an ein Programm gibst, kann je nach System über ps, top oder /proc sichtbar sein. Darum: lieber stdin oder einen sicheren Prompt-Mechanismus des jeweiligen Tools.

## Gute Praxis: Variable nach Nutzung vergessen

Das ist keine harte Garantie, aber es reduziert das Risiko, dass das Passwort später versehentlich ausgegeben oder weiterverwendet wird.

```bash
unset password
```

In langen Scripts ist das ein sinnvolles Ritual, sobald du das Geheimnis nicht mehr brauchst.

## Kleine Utility-Funktion für Scripts

Wenn du das öfter brauchst, kann eine kleine Funktion helfen, die das Verhalten konsistent macht.

```bash
prompt_secret() {
  local prompt="$1"
  local out_var="$2"
  local value

  read -r -s -p "$prompt" value
  echo
  printf -v "$out_var" "%s" "$value"
  unset value
}

prompt_secret "Password: " password
```

Das Muster ist: Prompt, read -s, newline, Ergebnis in eine Variable, temporäre Variable bereinigen. Es bleibt übersichtlich und wiederverwendbar.

## Fazit

read -s ist der richtige Einstieg, um ein Passwort ohne Echo einzulesen. Der eigentliche Sicherheitsgewinn kommt aber erst danach: Nicht ausgeben, nicht als Argument übergeben und bewusst entscheiden, wie ein Tool das Secret bekommen soll. Wenn du diese Basics einhältst, werden aus "quick scripts" deutlich weniger riskante Werkzeuge.

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
