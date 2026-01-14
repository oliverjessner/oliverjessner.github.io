---
layout: post
title: 'Bash: Zufallszahlen erzeugen ohne falsche Erwartungen'
date: 2026-01-14 11:15:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
description: 'So erzeugst du Zufallszahlen in Bash: $RANDOM für einfache Zwecke, Bereiche und Verteilungen, sichere Alternativen mit /dev/urandom, shuf und openssl'
thumbnail: '/assets/images/gen/blog/bash-zufallszahlen-erzeugen-ohne-falsche-erwartungen/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-zufallszahlen-erzeugen-ohne-falsche-erwartungen/header.webp'
---

Zufallszahlen in Bash sind schnell gemacht, aber nicht jede Methode ist für jeden Zweck geeignet. Für Tests, Dummy-Daten oder einfache Zufallsentscheidungen reicht oft `$RANDOM`. Für Tokens, Secrets oder sicherheitsrelevante Dinge brauchst du dagegen kryptografisch sichere Quellen.

## Schritt 0: Was du eigentlich brauchst

Bevor du einen Befehl wählst, klär kurz den Zweck:

-   “Random fürs Skriptverhalten” (Backoff, Zufallswahl): `$RANDOM` ist okay
-   “Random als Identifier oder Token” (API Keys, Passwörter): nicht `$RANDOM`, sondern `urandom` oder ein Crypto-Tool

## Die Bash-Standardlösung: $RANDOM

In Bash gibt es die Variable `$RANDOM`, die bei jedem Zugriff eine Zahl liefert.

```bash
echo "$RANDOM"
```

Typisch ist ein Wertebereich von 0 bis 32767. Das reicht für viele Skript-Alltagsfälle.

### Zufallszahl in einem Bereich (0 bis N-1)

```bash
n=10
r=$(( RANDOM % n ))
echo "$r"
```

### Zufallszahl zwischen min und max (inklusive)

```bash
min=5
max=12
r=$(( min + RANDOM % (max - min + 1) ))
echo "$r"
```

Warnhinweis: Modulo kann eine leichte Bias erzeugen, wenn der Zielbereich kein Teiler des Ausgangsbereichs ist. Für UI-Demos und Tests ist das meist egal. Für faire Verteilungen oder Security ist es es nicht.

## Wiederholbarkeit für Tests: Seed setzen

Wenn du reproduzierbare Ergebnisse willst, kannst du `$RANDOM` “seeden”, indem du ihm einen Wert zuweist.

```bash
RANDOM=42
echo "$RANDOM"
echo "$RANDOM"
```

Das ist nützlich für Tests und Debugging, weil du denselben Ablauf wiederholen kannst.

## Bessere Verteilung für Bereiche: shuf

Wenn `shuf` verfügbar ist, ist es komfortabel, weil es dir einen Bereich gleichmäßig sampelt.

```bash
shuf -i 1-100 -n 1
```

Das ist praktisch für Skripte, die random IDs oder Verzögerungen brauchen, ohne selbst rechnen zu müssen.

Hinweis: `shuf` ist auf vielen Linux-Systemen da, auf macOS oft nicht ohne coreutils.

## Kryptografisch sicher: /dev/urandom

Wenn du echte Zufallsbytes brauchst, nimm `/dev/urandom`. Für Zahlen kannst du Bytes lesen und umrechnen. Ein pragmatisches Beispiel für eine 32-bit Zahl:

```bash
num="$(od -An -N4 -tu4 < /dev/urandom | tr -d ' ')"
echo "$num"
```

Wenn du daraus einen Bereich machen willst:

```bash
min=1000
max=9999
raw="$(od -An -N4 -tu4 < /dev/urandom | tr -d ' ')"
r=$(( min + raw % (max - min + 1) ))
echo "$r"
```

Auch hier gilt: Das Modulo kann Bias erzeugen. Für viele Token-Use-Cases nimm lieber gleich Base64/Hex statt “Zahl in Bereich”.

## Tokens statt Zahlen: openssl oder Base64

Wenn du eigentlich eine zufällige Zeichenfolge brauchst, ist eine Zahl oft die falsche Form. Für Tokens:

Hex (32 Zeichen = 16 Bytes):

```bash
openssl rand -hex 16
```

Base64 (24 Zeichen plus mögliche Padding-Zeichen, je nach Länge):

```bash
openssl rand -base64 16
```

Falls `openssl` nicht vorhanden ist, geht es oft auch mit `base64`:

```bash
head -c 16 /dev/urandom | base64
```

Das ist typischerweise die bessere Wahl für IDs, Nonces und “random strings”.

## Mini-Utility: random_int in Bash

Dieses Snippet erzeugt eine Zufallszahl in einem Bereich. Es nutzt `$RANDOM` als Default und fällt auf `urandom` zurück, wenn du es bewusst so willst.

```bash
#!/usr/bin/env bash
set -u

random_int() {
  local min="$1"
  local max="$2"
  local span=$(( max - min + 1 ))

  if [[ "$span" -le 0 ]]; then
    echo "Ungültiger Bereich" >&2
    return 1
  fi

  local x
  if [[ -n "${USE_URANDOM:-}" ]]; then
    x="$(od -An -N4 -tu4 < /dev/urandom | tr -d ' ')"
  else
    x="$RANDOM"
  fi

  echo $(( min + x % span ))
}

random_int 10 20
```

Wenn du `USE_URANDOM=1` setzt, nutzt es `/dev/urandom`.

## Kurzfazit

Für einfache Skript-Zufälle ist `$RANDOM` der schnellste Weg, inklusive Bereichsberechnung über `$(( ... ))`. Wenn du Gleichverteilung oder Komfort willst, ist `shuf` angenehm. Für alles, was sicherheitsrelevant ist, geh direkt auf `/dev/urandom` oder nutze `openssl rand` für Tokens, statt “Random als Zahl” zu erzwingen.
