---
layout: post
title: 'Wie funktioniert caffeinate unter Mac? Tutorial'
date: 2025-12-28 12:10:10 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - macos
    - computer-stuff
description: 'Tutorial: Mit dem macOS-Terminal-Befehl caffeinate den Ruhezustand verhindern und den Mac zuverlässig wach halten.'
thumbnail: '/assets/images/gen/blog/caffeine-mac-deutsch-tutorial/header_thumbnail.webp'
image: '/assets/images/gen/blog/caffeine-mac-deutsch-tutorial/header.webp'
---

## Kaffee für den Mac?

Wer kennt es nicht: Der Mac soll nicht in den Ruhezustand wechseln, obwohl gerade ein Download läuft, ein Skript rechnet oder eine Präsentation offen ist. Genau dafür gibt es unter macOS den integrierten Terminal-Befehl caffeinate.

Der caffeinate-Befehl verhindert den Ruhezustand des Macs, solange der Prozess aktiv ist. Wird caffeinate ohne zusätzliche Flags ausgeführt, bleibt das System dauerhaft wach, bis der Prozess manuell beendet wird.

## Wie installier ich caffeine?

```
brew install --cask caffeine
```

Zur [brew formulae](https://formulae.brew.sh/cask/caffeine).

## Beispiel

Um den Mac für eine Stunde wach zu halten, ohne dass er in den Ruhezustand wechselt, verwenden wir den folgenden Befehl:

```bash
caffeinate -i -t 3600
```

## Was kann ich sonst noch damit machen?

Die folgenden Flags bestimmen, welche Systemfunktionen wach gehalten werden.

caffeinate [-disu] [-t Timeout] [-w PID] [Programmargumente...]

**Flags:**

**-d** Erzeugt eine assertion, um das Ausschalten des Bildschirms zu verhindern.

**-i** Erzeugt eine assertion, um den Ruhezustand des Systems zu verhindern.

**-m** Erzeugt eine assertion, um den Ruhezustand der Festplatte zu verhindern.

**-s** Erzeugt eine assertion, um den Ruhezustand des Systems zu verhindern. Diese assertion
ist nur gültig, wenn das System mit Strom betrieben wird!

**-u** Erzeugt eine assertion, die angibt, dass der Benutzer aktiv ist.
Wenn der Bildschirm ausgeschaltet ist, schaltet diese Option den Bildschirm ein und verhindert,
dass er in den Ruhezustand wechselt. Wenn keine Zeitüberschreitung mit der Option '-t' angegeben ist,
wird diese assertion standardmäßig mit einer Zeitüberschreitung von 5 Sekunden verwendet.

**-t** Gibt den Zeitüberschreibungswert in Sekunden an, für den diese assertion gültig sein soll.
Die assertion wird nach Ablauf der angegebenen Zeit aufgehoben.
Der Zeitüberschreibungswert wird nicht verwendet, wenn ein Programm mit diesem Befehl aufgerufen wird.

**-w** Wartet darauf, dass der Prozess mit der angegebenen PID beendet wird. Sobald der Prozess beendet ist,
wird auch die assertion aufgehoben. Diese Option wird ignoriert, wenn sie mit der Programmbefehl verwendet wird.

## Fazit

Mit caffeinate bietet macOS eine einfache, zuverlässige Möglichkeit, den Ruhezustand gezielt zu verhindern. Wer regelmäßig im Terminal arbeitet oder seinen Mac kontrolliert wach halten möchte, kommt an diesem Befehl kaum vorbei. Kurz gesagt: klein, unscheinbar aber extrem praktisch.
