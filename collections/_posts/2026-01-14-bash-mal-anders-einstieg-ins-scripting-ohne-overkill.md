---
layout: post
title: 'Bash – mal anders: Einstieg ins Scripting ohne Overkill'
date: 2026-01-14 11:15:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - software-development
    - linux
description: 'Die wichtigsten Bash-Grundlagen, kompakt erklärt: Shebang, Rechte, Variablen, Input, Bedingungen, Schleifen und Arrays für echte Automationsaufgaben'
thumbnail: '/assets/images/gen/blog/bash-mal-anders-einstieg-ins-scripting-ohne-overkill/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-mal-anders-einstieg-ins-scripting-ohne-overkill/header.webp'
---

Ein kleines Bash-Skript spart Routinearbeit. Dieser Einstieg bleibt pragmatisch und zeigt Muster, die im Alltag wirklich helfen.

## Worum es hier geht und was Bash besonders macht

> Wenn du bereits erfahrung hast mit Programmieren kannst du direkt zum Kapitel
> **Shebang: Die erste Zeile entscheidet, wie dein Skript startet**
> springen.

Bash ist kein "Programmieren wie in einer App", sondern oft Automatisierung in kleinen Schritten: Dateien anfassen, Text ausgeben, Eingaben verarbeiten, Tools kombinieren. Das wirkt simpel, hat aber Eigenheiten, die man früh verstehen sollte.

Zwei Punkte, die später viel Ärger sparen:

- Bash ist tolerant gegenüber Fehlern: Ein einzelner Fehler stoppt nicht automatisch das ganze Skript.
- Variablen sind standardmäßig global: Ohne bewusstes Gegensteuern "leaken" Werte leicht in andere Teile des Skripts.

Der Rest dieses Artikels ist ein Werkzeugkasten: kurze Erklärungen, konkrete Beispiele, und am Ende ein kleines, zusammengesetztes Mini-Skript.

## Schritt 0

Bevor wir überhaupt über Bash sprechen, brauchen wir drei Dinge:

1. eine Datei, in die das Skript kommt
1. ein Terminal, um es auszuführen
1. einen Editor/eine IDE

Auf macOS ist das naheliegendste Terminal die App “Terminal” (`terminal.app`). Wer mehr auf KI steht, für den gibt es [Terminal Wrap](https://oliverjessner.at/blog/2024-06-16-ein-terminal-der-zukunft/), das aber erst heruntergeladen werden muss.

Ich würde der Einfachheit halber das direkt in [VS Code](https://oliverjessner.at/blog/2024-03-10-zwei-vscode-features-die-du-noch-nicht-kanntest/) integrierte Terminal empfehlen. Für das Tutorial ist das egal. Wichtig ist nur, dass du Kommandos eintippen und Dateien im richtigen Ordner ausführen kannst.

Lege dir einen Arbeitsordner an, wechsle hinein und erstelle dort eine neue Datei, zum Beispiel `helloworld.sh`:

```bash
mkdir -p ~/bash-tutorial
cd ~/bash-tutorial
touch helloworld.sh
```

Wenn du lieber direkt in einem Editor startest, kannst du die Datei auch mit VS Code öffnen:

```bash
code helloworld.sh
```

Der entscheidende Punkt ist das Verzeichnis: Du solltest im Terminal dort stehen, wo deine Datei liegt. Ein schneller Check ist `ls`, damit sie wirklich sichtbar ist:

```bash
ls -la
```

## Shebang: Die erste Zeile entscheidet, wie dein Skript startet

Das "Shebang" steht in Zeile 1 und beginnt mit `#!`. Danach kommt der Pfad zum Interpreter.

Beispiel für Bash:

```bash
#!/bin/bash
```

Der praktische Effekt: Du musst Bash nicht jedes Mal explizit davor schreiben. Statt `bash script.sh` kannst du das Skript direkt ausführen, sofern es die passenden Rechte hat.

Ein häufig robusterer Ansatz ist `env`, wenn du dich nicht auf einen festen Pfad verlassen willst:

```bash
#!/usr/bin/env bash
```

Das ist besonders dann sinnvoll, wenn Bash nicht an derselben Stelle liegt oder wenn du in Teamprojekten auf unterschiedlichen Systemen arbeitest.

## Rechte: Warum "Permission denied" auftaucht

Ein Skript ist nur dann direkt ausführbar, wenn es das Execute-Recht hat. Das setzt du mit `chmod`:

```bash
chmod +x helloworld.sh
```

Danach kannst du es so starten:

```bash
./helloworld.sh
```

Mit `ls -al` siehst du die Rechte einer Datei. Das `x` in der Rechte-Spalte ist das Signal, dass sie ausführbar ist.

## Ausgabe: echo, Strings und Escape-Sequenzen

Der schnellste Output ist `echo`:

```bash
echo "Hello World"
```

Escape-Sequenzen wie `\n` werden nicht immer automatisch interpretiert. Mit `-e` klappt es in vielen Setups:

```bash
echo -e "Erste Zeile\nZweite Zeile"
```

Wenn du planbar formatieren willst, ist `printf` oft die stabilere Wahl:

```bash
printf "Erste Zeile\nZweite Zeile\n"
```

## Variablen: Zuweisung, Nutzung, Veränderlichkeit

Variablen werden ohne Typdeklaration zugewiesen. Wichtig ist: keine Leerzeichen um das `=`.

```bash
age=32
echo "Hi, I am $age years old"
```

Variablen kannst du später überschreiben:

```bash
age=32
echo "Zuerst: $age"
age=100
echo "Dann: $age"
```

Für Werte, die sich nicht verändern sollen, gibt es `readonly`:

```bash
readonly pi=3.14
echo "Pi: $pi"
# pi=3.2  # würde einen Fehler auslösen
```

Das ist ein guter Schutz gegen versehentliche Änderungen, gerade in längeren Skripten.

## Kommentare: Lesbarkeit statt Lärm

Einzeilige Kommentare beginnen mit `#`:

```bash
# Das ist ein Kommentar
echo "Code läuft"
```

Mehrzeilige Kommentare sind in Bash kein "offizielles" Sprachfeature. Ein häufig genutztes Muster ist ein No-Op-Block, der vom Interpreter ignoriert wird:

```bash
: '
Dieser Block wird nicht ausgeführt.
Er ist praktisch für Notizen oder Debugging.
'
```

Kommentar-Regel für den Alltag: Kommentiere vor allem "Warum", nicht "Was". Was `echo` macht, muss selten erklärt werden. Warum etwas in genau dieser Reihenfolge passiert, dagegen schon.

## Parameter: Dein Skript wird dynamisch

Bash stellt Positionsparameter bereit:

- `$0` Name des Skripts
- `$1`, `$2`, ... Argumente
- `$#` Anzahl der Argumente
- `$@` alle Argumente (als Liste)
- `$$` Prozess-ID
- `$?` Exit-Status des letzten Befehls

Beispiel:

```bash
#!/usr/bin/env bash

echo "Skript: $0"
echo "Erstes Argument: $1"
echo "Anzahl: $#"
echo "Alle: $@"
echo "PID: $$"
echo "Exit Status: $?"
```

Aufruf:

```bash
./params.sh 10 20 Oliver
```

## Bedingungen: if, Vergleich und saubere Syntax

Die `if`-Struktur endet mit `fi`. In Bedingungen sind Leerzeichen entscheidend.

Stringvergleich:

```bash
#!/usr/bin/env bash

if [[ "$1" == "Hello" ]]; then
  echo "Hello World"
else
  echo "Goodbye World"
fi
```

Wichtig: `[[ ... ]]` ist in Bash meist die bessere Wahl als `[ ... ]`, weil es weniger Stolperfallen bei Leerzeichen und Pattern-Matching hat.

PS: Du kannst z. B. if nutzen, um zu prüfen, ob ein Directory existiert. Mehr dazu in [diesem Blogpost](https://oliverjessner.at/blog/2026-01-14-bash-pruefen-ob-ein-ordner-existiert/).

### Regex-Checks: "Standard Library" per Muster und Konvention

Bash hat keine komfortable Typprüfung wie viele Hochsprachen. Du kannst aber mit Regex in `[[ ... ]]` arbeiten.

Nur Buchstaben:

```bash
value="$1"

if [[ "$value" =~ ^[A-Za-z]+$ ]]; then
  echo "Nur Buchstaben"
else
  echo "Nicht nur Buchstaben"
fi
```

Integer:

```bash
value="$1"

if [[ "$value" =~ ^[0-9]+$ ]]; then
  echo "Integer"
else
  echo "Kein Integer"
fi
```

Für echte Validierung in Produktionsskripten lohnt sich oft ein kleiner, klarer "Fail fast"-Block mit verständlicher Fehlermeldung.

## Eingabe: read, Prompt und versteckte Eingaben

Interaktive Eingabe geht mit `read`.

Mit Prompt:

```bash
read -p "What is your name? " name
echo "Hello $name"
```

Ohne Prompt, dafür besser kontrollierbar im Layout:

```bash
echo "What is your name?"
read name
echo "Hello $name"
```

Versteckte Eingabe, zum Beispiel für sensible Werte:

```bash
read -s -p "Secret: " secret
echo
echo "Danke"
```

Warnhinweis: Versteckte Eingaben sind ein legitimes Feature, werden aber auch für unseriöse Zwecke missbraucht. Nutze es transparent und sparsam, und speichere solche Werte nicht leichtfertig weiter.

## Schleifen: Range, C-Style und der Scope-Haken

Einfache Range-Variante:

```bash
for i in {0..5}; do
  echo "i=$i"
done
```

C-Style:

```bash
for ((i=0; i<=5; i++)); do
  echo "i=$i"
done
```

Typischer Bash-Haken: Variablen aus der Schleife existieren danach weiter.

```bash
for i in {0..3}; do
  :
done

echo "Nach der Schleife ist i noch da: $i"
```

Das ist nicht "falsch", aber man muss es wissen, sonst entstehen unerwartete Abhängigkeiten.

## Arrays: Werte sammeln und durchgehen

Ein Array definierst du mit runden Klammern:

```bash
fruits=("Apfel" "Banane" "Kirsche" 100)
```

Zugriff per Index:

```bash
echo "${fruits[0]}"
echo "${fruits[1]}"
```

Iteration über Indizes:

```bash
for idx in "${!fruits[@]}"; do
  echo "Index $idx: ${fruits[$idx]}"
done
```

Ein praktisches Muster: Dateien einsammeln.

```bash
files=( *.sh )
echo "Alle Skripte: ${files[@]}"
echo "Anzahl: ${#files[@]}"
```

Hinweis: Wenn kein Match existiert, kann `*.sh` als Literal im Array landen. Für robuste Skripte lohnt sich ein Check, ob die erste "Datei" wirklich existiert.

## Switch Cases: case als lesbare Alternative zu if-Ketten

`case` ist gut, wenn du viele Optionen sauber abbilden willst:

```bash
read -p "Option (1-3): " number

case "$number" in
  1) echo "Eins" ;;
  2) echo "Zwei" ;;
  3) echo "Drei" ;;
  *) echo "Ungültige Option" ;;
esac
```

## Associative Arrays: Key-Value statt Index

Associative Arrays funktionieren ab Bash 4.

```bash
declare -A capitals
capitals["Deutschland"]="Berlin"
capitals["Frankreich"]="Paris"
capitals["Spanien"]="Madrid"

for country in "${!capitals[@]}"; do
  echo "$country: ${capitals[$country]}"
done
```

macOS-Hinweis: Auf manchen macOS-Systemen ist die vorinstallierte Bash historisch älter. Prüfe deine Version:

```bash
bash --version
```

Wenn du aktualisierst, achte darauf, was dein Standard-Shell ist und wie dein Terminal es startet. Ein Upgrade ist sinnvoll, aber nicht "gratis", weil Shell-Umstellungen auch Nebenwirkungen haben können.

## Funktionen: Wiederverwendung und Scope bewusst machen

Funktion definieren:

```bash
hello() {
  echo "Hello World"
}

hello
```

Parameter in Funktionen: Auch hier gelten Positionsparameter, aber bezogen auf die Funktion.

```bash
greet() {
  echo "Hello $1$2"
}

greet "Oliver" "!"
```

Wichtig in Bash: Variablen sind ohne `local` global.

```bash
set_name() {
  name="World"
}

set_name
echo "$name"
```

Sauberer ist:

```bash
set_name() {
  local name="World"
  echo "$name"
}

set_name
# echo "$name"  # bleibt leer oder unverändert
```

## Arithmetik: Rechnen in Bash, ohne Umwege

Arithmetik klappt mit `$(( ... ))`:

```bash
a=10
b=5
sum=$((a + b))
echo "$sum"
```

Compound Operatoren:

```bash
n=10
n+=10
echo "$n"
```

Inkrement und Dekrement:

```bash
x=1
x++
echo "$x"

x--
echo "$x"
```

## Command Substitution: Tools kombinieren statt alles selbst bauen

Output eines Kommandos in eine Variable:

```bash
first_file=$(ls -1 | head -n 1)
echo "Erste Datei: $first_file"
```

Oder direkt inline:

```bash
echo "Dateien im Ordner: $(ls -1 | wc -l)"
```

Das ist ein Kernprinzip: Bash gewinnt nicht durch eine große Bibliothek, sondern durch das Zusammensetzen vorhandener Tools.

Ein Beispiel mit Sortierung ohne eigene Logik:

```bash
fruits=("Kirsche" "Apfel" "Banane")
sorted=$(printf "%s\n" "${fruits[@]}" | sort)
echo "$sorted"
```

## Mini-Skript: Ein solides Gerüst für echte Nutzung

Zum Abschluss ein kleines Skript, das mehrere Konzepte verbindet: Shebang, Parameter, Input, Checks, Arrays, Schleifen und Exit Codes.

```bash
#!/usr/bin/env bash
set -u

usage() {
  echo "Usage: $0 [--name NAME] [--list-sh]"
}

name=""

if [[ $# -eq 0 ]]; then
  usage
  exit 1
fi

while [[ $# -gt 0 ]]; do
  case "$1" in
    --name)
      shift
      name="${1:-}"
      ;;
    --list-sh)
      list_sh="yes"
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unbekannte Option: $1"
      usage
      exit 1
      ;;
  esac
  shift
done

if [[ -n "$name" ]]; then
  echo "Hello $name"
else
  read -p "What is your name? " name
  echo "Hello $name"
fi

if [[ "${list_sh:-}" == "yes" ]]; then
  files=( *.sh )
  if [[ "${files[0]}" == "*.sh" ]]; then
    echo "Keine .sh Dateien gefunden"
    exit 0
  fi

  echo "Gefundene .sh Dateien (${#files[@]}):"
  for f in "${files[@]}"; do
    echo " - $f"
  done
fi

exit 0
```

Zwei bewusste Designentscheidungen:

- `set -u` hilft, Tippfehler bei Variablennamen früh zu erkennen, weil die Bash dann bei nicht gesetzten Variablen stoppt.
- Die Option `--help` ist kein Luxus. Gerade bei kleinen Tools ist eine klare Nutzungserklärung die halbe Miete.

Wenn du Bash so angehst, wird es schnell vom "Hack" zum verlässlichen Werkzeug: kleine, lesbare Skripte, die echte Schritte automatisieren, ohne dass du dir dabei eine eigene Mini-Programmiersprache bauen musst.

Hier findest du noch meine [10 macOS-Terminal-Tools](https://oliverjessner.at/blog/2026-01-12-10-macos-terminal-tools-serie-im-ueberblick/)
