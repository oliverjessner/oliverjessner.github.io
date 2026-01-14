---
layout: post
title: 'Bash: Ein Skript kurz pausieren mit sleep'
date: 2026-01-14 16:17:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
description: 'So pausierst du ein Shell-Skript für eine Sekunde oder länger: sleep Basics, Bruchteile von Sekunden, Timer in Loops und wann eine Pause überhaupt sinnvoll ist'
thumbnail: '/assets/images/gen/blog/bash-ein-skript-kurz-pausieren-mit-sleep/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-ein-skript-kurz-pausieren-mit-sleep/header.webp'
---

Wenn du ein Shell-Skript kurz anhalten willst, ist `sleep` der Standard. Es wirkt simpel, ist aber in der Praxis oft Teil eines Polling- oder Retry-Musters, bei dem du Last und Wartezeit bewusst steuern solltest.

## Die einfachste Lösung: eine Sekunde warten

```bash
sleep 1
```

Das pausiert das Skript für eine Sekunde und führt danach mit der nächsten Zeile weiter.

## Mehrere Sekunden, Minuten oder Stunden

`sleep` versteht auch Suffixe. Das macht Skripte lesbarer als nackte Zahlen.

```bash
sleep 5      # 5 Sekunden
sleep 2m     # 2 Minuten
sleep 1h     # 1 Stunde
```

In vielen Umgebungen funktioniert das zuverlässig. Wenn du maximale Portabilität willst, bleib bei Sekunden ohne Suffix.

## Bruchteile von Sekunden

Für kurze Pausen, etwa beim Polling, willst du manchmal weniger als eine Sekunde:

```bash
sleep 0.2
```

Das funktioniert auf den meisten modernen Systemen. In sehr alten oder minimalistischen Umgebungen kann das anders sein, im Alltag ist es aber gängig.

## Typisches Muster: Schleife mit Pause

Häufig wird `sleep` in einer Schleife genutzt, um auf einen Zustand zu warten, ohne CPU zu verbrennen.

```bash
for i in {1..10}; do
  if [[ -f /tmp/ready.flag ]]; then
    echo "bereit"
    break
  fi
  sleep 1
done
```

Das ist der Kern vieler “warte bis X verfügbar ist” Skripte.

## Retry mit Backoff

Wenn du externe Systeme abfragst, ist ein fixer 1-Sekunden-Takt oft unnötig aggressiv. Ein einfacher Backoff ist meist freundlicher.

```bash
attempt=1
max=5

while (( attempt <= max )); do
  if curl -fsS https://example.com/health >/dev/null 2>&1; then
    echo "OK"
    exit 0
  fi

  sleep_seconds=$(( attempt * 2 ))
  echo "Noch nicht verfügbar, warte ${sleep_seconds}s (attempt $attempt/$max)"
  sleep "$sleep_seconds"
  attempt=$(( attempt + 1 ))
done

echo "Timeout"
exit 1
```

Das bleibt lesbar und vermeidet unnötige Last.
