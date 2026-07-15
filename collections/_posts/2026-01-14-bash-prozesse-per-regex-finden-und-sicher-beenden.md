---
layout: post
title: 'Bash: Prozesse per Regex finden und sicher beenden'
date: 2026-01-14 14:22:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - software-development
description: 'So findest du Prozesse per Regex und beendest sie in Bash kontrolliert, inklusive Dry Run, Signal-Strategie und typischen Fallen bei pgrep und pkill'
thumbnail: '/assets/images/gen/blog/bash-prozesse-per-regex-finden-und-sicher-beenden/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-prozesse-per-regex-finden-und-sicher-beenden/header.webp'
image_width: 1280
image_height: 720
---

Einen Prozess "killen" ist schnell, aber nicht immer klug. Mit pgrep und pkill kannst du Prozesse per Regex finden und kontrolliert beenden, ohne aus Versehen die falsche PID zu erwischen.

## Warum Regex beim Killen gefährlich und gleichzeitig praktisch ist

Wenn du Prozesse automatisch beendest, brauchst du ein Auswahlkriterium. In der Praxis ist das häufig ein Teil des Kommandozeilenstrings, etwa ein Scriptname, ein Port-Flag oder ein Projektpfad. Regex ist dafür praktisch, weil du flexibler matchen kannst als mit exakten Namen.

Der Preis ist klar: Ein zu breiter Regex kann mehr treffen als gedacht. Deshalb lohnt sich ein Setup, das zuerst anzeigt, was es treffen würde, und erst danach beendet.

## Der saubere Standard: pgrep und pkill mit -f

`pgrep` findet Prozesse, `pkill` beendet sie. Mit `-f` matchen beide gegen die komplette Kommandozeile, nicht nur gegen den Prozessnamen.

Nur finden:

```bash
pgrep -af "pattern"
```

-   `-a` zeigt die Kommandozeile
-   `-f` matcht gegen die volle Kommandozeile

Beenden mit Signal TERM:

```bash
pkill -TERM -f "pattern"
```

Das ist in vielen Fällen besser als sofort SIGKILL, weil der Prozess Gelegenheit bekommt, sauber zu schließen.

## Regex sinnvoll eingrenzen: Beispiele, die nicht zu breit sind

Ein paar Muster, die in Projekten häufiger vorkommen:

Match auf einen konkreten Scriptnamen irgendwo in der Kommandozeile:

```bash
pgrep -af "my-worker\.sh"
```

Match auf einen Node-Prozess, der ein bestimmtes Projektverzeichnis enthält:

```bash
pgrep -af "node .* /Users/oliver/projects/myapp"
```

Match auf einen Prozess, der ein Port-Flag enthält:

```bash
pgrep -af "--port[= ]3000"
```

Wichtig ist hier das Escaping. Ein Punkt in Regex bedeutet "beliebiges Zeichen". Wenn du wirklich einen Punkt meinst, brauchst du `\.`.

## Dry Run als Pflicht: erst anzeigen, dann killen

Wenn du per Regex suchst, solltest du den Treffer immer zuerst ansehen. Ein typisches Muster ist:

```bash
pattern="my-worker\.sh"
pgrep -af "$pattern"
```

Erst wenn die Ausgabe passt, führst du den Kill aus.

Für Skripte lohnt sich ein eingebauter Dry Run Modus, der standardmäßig nur listet.

## TERM, warten, dann KILL als Fallback

Eine bewährte Reihenfolge ist:

1. TERM senden
2. kurz warten
3. prüfen, ob der Prozess noch da ist
4. nur dann KILL senden

Das sieht in Bash kompakt so aus:

```bash
pkill -TERM -f "$pattern"
sleep 1
pgrep -f "$pattern" >/dev/null 2>&1 && pkill -KILL -f "$pattern"
```

Warnhinweis: SIGKILL ist final. Wenn der Prozess gerade schreibt oder Ressourcen hält, ist ein harter Kill eher die Ausnahme als der Standard.

## Alternative ohne pkill: PIDs explizit einsammeln und gezielt killen

Wenn du maximale Kontrolle willst, sammelst du PIDs ein und beendest sie explizit. Das ist gut, wenn du zusätzlich filtern oder die Ausgabe sauber loggen willst.

```bash
mapfile -t pids < <(pgrep -f "$pattern")

for pid in "${pids[@]}"; do
  kill -TERM "$pid"
done
```

Damit sieht man klar, welche PIDs betroffen sind, und du kannst pro PID zusätzliche Checks einbauen.

## Typische Falle: grep findet sich selbst

Viele greifen reflexartig zu `ps | grep`. Das funktioniert, hat aber eine klassische Falle: `grep` taucht selbst in der Liste auf.

Wenn du das trotzdem nutzen willst, ist `pgrep` meist die bessere Wahl. Falls du bei `ps` bleiben musst, hilft ein Muster, das sich selbst nicht matcht:

```bash
ps aux | grep -E "[m]y-worker\.sh"
```

Das ist ein Workaround. Für Skripte, die du wiederverwenden willst, bleiben `pgrep` und `pkill` die robustere Basis.

## Mini-Skript: Prozesse per Regex finden, bestätigen, dann beenden

Dieses Skript macht drei Dinge: Treffer anzeigen, Abfrage stellen, dann kontrolliert beenden. Es startet mit TERM und nutzt KILL nur, wenn der Prozess weiterläuft.

```bash
#!/usr/bin/env bash
set -u

pattern="${1:-}"

if [[ -z "$pattern" ]]; then
  echo "Usage: $0 <regex-pattern>" >&2
  exit 1
fi

echo "Treffer für Regex: $pattern"
if ! pgrep -af "$pattern"; then
  echo "Keine Prozesse gefunden"
  exit 0
fi

while true; do
  read -r -p "Beenden? [y/n/c]: " answer
  case "$answer" in
    [Yy]|[Yy][Ee][Ss]) break ;;
    [Nn]|[Nn][Oo])     echo "Abgebrochen"; exit 0 ;;
    [Cc]|[Cc][Aa][Nn][Cc][Ee][Ll]) echo "Abbruch"; exit 130 ;;
    *) echo "Bitte y, n oder c eingeben." ;;
  esac
done

pkill -TERM -f "$pattern"
sleep 1

if pgrep -f "$pattern" >/dev/null 2>&1; then
  echo "Einige Prozesse laufen noch. Sende KILL."
  pkill -KILL -f "$pattern"
fi

echo "Fertig"
```

Praxis-Tipp: Wenn du häufig mit bekannten Mustern arbeitest, lohnt sich ein Wrapper, der die Regex enger macht, etwa durch Projektpfade oder eindeutige Argumente. Je weniger "freies" Regex, desto weniger Überraschungen.

## Kurzfazit

Mit `pgrep -af` bekommst du eine gute Vorschau, was dein Regex trifft. Mit `pkill -TERM -f` beendest du Prozesse kontrolliert. Der wichtigste Teil ist nicht das Kill-Kommando, sondern die Disziplin davor: Dry Run, enge Muster und ein Fallback auf KILL nur, wenn es wirklich nötig ist.

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
