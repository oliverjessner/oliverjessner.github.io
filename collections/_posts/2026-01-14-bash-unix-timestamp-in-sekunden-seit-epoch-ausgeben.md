---
layout: post
title: 'Bash: Unix-Timestamp in Sekunden seit Epoch ausgeben'
date: 2026-01-14 16:38:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
description: 'So bekommst du in Bash den aktuellen Unix-Timestamp in Sekunden: date +%s auf Linux, Unterschiede zu macOS, Millisekunden-Optionen und typische Use-Cases für Logging und Timing'
thumbnail: '/assets/images/gen/blog/bash-unix-timestamp-in-sekunden-seit-epoch-ausgeben/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-unix-timestamp-in-sekunden-seit-epoch-ausgeben/header.webp'
---

Ein Unix-Timestamp ist die Anzahl an Sekunden seit dem 1. Januar 1970 (UTC). Für Logs, Metriken, Cache-Keys oder einfache Laufzeitmessungen ist das oft die praktischste Zeitdarstellung, weil sie eindeutig und gut vergleichbar ist.

## Linux Standard: date +%s

Auf Linux ist die Standardlösung schlicht:

```bash
date +%s
```

Das gibt die Sekunden seit Epoch aus, zum Beispiel `1736850000`.

Wenn du den Wert in eine Variable brauchst:

```bash
now="$(date +%s)"
echo "$now"
```

## In Skripten: Zeitdifferenzen messen

Ein typisches Muster ist “Startzeit merken, am Ende Differenz berechnen”.

```bash
start="$(date +%s)"

# ... Arbeit ...

end="$(date +%s)"
echo "Dauer: $(( end - start ))s"
```

Für viele Skripte reicht Sekundenauflösung völlig aus.

## Millisekunden und Nanosekunden: je nach date-Implementierung

GNU `date` (typisch auf Linux) kann oft auch feinere Auflösung liefern:

```bash
date +%s%3N   # Millisekunden
date +%s%N    # Nanosekunden
```

Warnhinweis: Das ist nicht überall verfügbar, weil es von GNU coreutils abhängt. Auf macOS ist `date` BSD-basiert und unterstützt `%N` in der Regel nicht.

## macOS Unterschied: Sekunden gehen, %N meist nicht

Auch auf macOS funktioniert der Sekunden-Timestamp:

```bash
date +%s
```

Wenn du Millisekunden brauchst, musst du auf macOS anders arbeiten oder GNU coreutils installieren. Ein pragmatischer Weg ist, die Aufgabe bewusst auf Sekunden zu beschränken, wenn du Portabilität willst.

## Portables Fallback-Muster

Wenn du Skripte für mehrere Systeme schreibst, ist es sinnvoll, den einfachsten gemeinsamen Nenner zu nehmen.

```bash
now_epoch() {
  date +%s
}

echo "$(now_epoch)"
```

Wenn du unbedingt Millisekunden willst, kannst du feature-detecten und sonst degradieren:

```bash
epoch_ms() {
  if date +%s%3N >/dev/null 2>&1; then
    date +%s%3N
  else
    echo "$(( $(date +%s) * 1000 ))"
  fi
}

echo "$(epoch_ms)"
```

Das zweite Ergebnis ist dann auf Systemen ohne `%3N` eine grobe Annäherung in 1000er-Schritten.

## Kurzfazit

Auf Linux ist `date +%s` der Standard, um den aktuellen Unix-Timestamp in Sekunden zu bekommen. Für Timing und Logs ist das in Bash meist der beste Default. Feinere Auflösung wie Millisekunden klappt oft mit GNU `date`, ist aber nicht überall portabel, deshalb nur bewusst einsetzen oder mit Fallback lösen.

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
