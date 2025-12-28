---
layout: post
title: 'Wie funktioniert watch unter Mac? Tutorial'
date: 2025-12-28 12:25:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - macos
    - computer-stuff
    - terminal
description: 'Tutorial: Mit dem macOS-Terminal-Befehl watch Befehle in festen Intervallen ausführen und Systemzustände live beobachten.'
thumbnail: '/assets/images/gen/blog/watch-mac-deutsch-tutorial/header_thumbnail.webp'
image: '/assets/images/gen/blog/watch-mac-deutsch-tutorial/header.webp'
---

## Live-Ansicht fürs Terminal

Wer im Terminal arbeitet, kennt das Problem: Ein Befehl liefert zwar die richtigen Informationen – aber nur als Momentaufnahme. Gerade bei Systemzuständen, Logs oder laufenden Prozessen möchte man sehen, wie sich etwas _verändert_.

Genau dafür gibt es den Terminal-Befehl `watch`.

`watch` führt einen beliebigen Befehl in einem festen Zeitintervall immer wieder aus und aktualisiert die Ausgabe im Terminal automatisch. So wird aus einem statischen Kommando eine Live-Ansicht.

## Wie installier ich watch?

Unter macOS ist `watch` standardmäßig **nicht vorinstalliert**, lässt sich aber einfach über Homebrew nachrüsten:

```bash
brew install watch
```

Zur [brew formula](https://formulae.brew.sh/formula/watch).

## Beispiel

Um alle zwei Sekunden den aktuellen Energie- und Sleep-Status des Macs anzuzeigen, verwenden wir:

```bash
watch -n 2 pmset -g
```

Der Befehl führt pmset -g alle zwei Sekunden erneut aus und ersetzt die vorherige Ausgabe. Änderungen werden sofort sichtbar, ohne dass man den Befehl manuell neu starten muss.

## Was kann ich sonst noch damit machen?

Die Syntax von watch ist bewusst simpel:

watch [-n Sekunden] [-d] Befehl

**Flags:**

**-n** Gibt das Aktualisierungsintervall in Sekunden an.

**-d** Hebt Änderungen zwischen zwei Durchläufen visuell hervor.

Typische Anwendungsfälle:

-   laufende Prozesse beobachten
-   Speicher- oder CPU-Werte prüfen
-   Netzwerkstatus überwachen
-   Log-Ausgaben verfolgen
-   Systemzustände live analysieren

## Weitere Beispiele

Aktualisiert die aktuelle Uhrzeit jede Sekunde.

```bash
watch -n 1 date
```

Zeigt alle fünf Sekunden die Festplattennutzung an.

```bash
watch -n 5 df -h
```

Überwacht alle zwei Sekunden, welche Prozesse den Port 3000 nutzen.

```bash
watch -n 2 lsof -i :3000
```

## Fazit

Wer regelmäßig im Terminal arbeitet und verstehen möchte, was gerade passiert – und nicht nur, was bereits passiert ist sollte diesen Befehl kennen.
Wer hingegen einfach nur verhindern möchte, dass der Mac in den Ruhezustand wechselt, ist mit [caffeinate besser beraten](https://oliverjessner.at/blog/2025-12-28-caffeine-mac-deutsch-tutorial/).
