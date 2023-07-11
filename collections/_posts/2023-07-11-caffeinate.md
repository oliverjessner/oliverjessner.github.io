---
layout: post
title: 'Caffeinate: Keep Your Mac Awake and Productive!'
date: 2023-07-11 00:00:00
authors: ['oliver_jessner']
categories:
    - macos
    - computer-stuff
description: Wie du deinen Mac mit einem simplen Befehl wach hältst.
thumbnail: '/assets/images/gen/blog/caffeinate/header_thumbnail.webp'
image: '/assets/images/gen/blog/caffeinate/header.webp'
published: true
---

# Kaffee für den Mac?

> “A cup of coffee commits one to forty years of friendship”
>
> -   Turkish Proverb

Heute mal ein ganz andere blogpost.
Wer kennt es nicht: Der Mac soll mal wieder munter bleiben. Dank des simplen Terminalbefehls **caffeinate** ist das kein Problem. Was anfangs wie ein Scherz klingt, entpuppt sich als einfacher Befehl, der mit Flags wie **-t** verwendet wird. Wenn wir **caffeinate** ohne Flags ausführen, bleibt unser Mac solange wach, bis wir den Prozess manuell beenden. Mit dem **-t** -Flag hingegen können wir die Zeit in Sekunden angeben, wie lange wir ihn aktiv halten möchten.

## Was kann ich sonst noch damit machen?

Hier eine kleine Deutschübersetzung aus der Man page von **caffeinate**:

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
