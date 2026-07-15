---
layout: post
title: 'Bash: Prüfen, ob ein Ordner existiert'
date: 2026-01-14 11:58:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
description: 'So prüfst du in Bash sauber, ob ein Verzeichnis existiert und wie du typische Fallen mit Pfaden, Leerzeichen und Symlinks vermeidest'
thumbnail: '/assets/images/gen/blog/bash-pruefen-ob-ein-ordner-existiert/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-pruefen-ob-ein-ordner-existiert/header.webp'
image_width: 1280
image_height: 720
---

In Bash reicht oft eine Zeile, um die Existenz eines Ordners zu prüfen. Trotzdem lohnt sich ein Blick auf Details wie Leerzeichen, Symlinks und saubere Fehlerbehandlung im Skript-Alltag.

## Der Kernbefehl: -d prüft Verzeichnisse

Wenn du in einem Bash-Skript prüfen willst, ob ein Ordner existiert, ist `-d` der Standard-Test. Er liefert "true", wenn der Pfad existiert und ein Verzeichnis ist.

```bash
if [[ -d "$DIR" ]]; then
  echo "Ordner existiert"
else
  echo "Ordner existiert nicht"
fi
```

Wichtig ist das Quoting: `"$DIR"` verhindert, dass Pfade mit Leerzeichen oder Sonderzeichen zerlegt werden.

## Praxisvariante: Ordner anlegen, falls er fehlt

In Automationsskripten ist die eigentliche Frage oft nicht "gibt es den Ordner", sondern "sorge dafür, dass er da ist". Dafür ist `mkdir -p` die pragmatische Lösung, weil sie keinen Fehler wirft, wenn der Ordner bereits existiert.

```bash
mkdir -p "$DIR"
```

Wenn du trotzdem bewusst prüfen und dann anlegen willst, bleibt das Muster klar:

```bash
if [[ ! -d "$DIR" ]]; then
  mkdir -p "$DIR"
fi
```

## -e, -f, -d: Welche Tests wofür gedacht sind

Bash bietet mehrere Datei-Tests, die sich ähnlich lesen, aber unterschiedliche Dinge prüfen:

-   `-e` prüft, ob ein Pfad existiert, egal ob Datei oder Ordner
-   `-f` prüft, ob es eine reguläre Datei ist
-   `-d` prüft, ob es ein Verzeichnis ist

Wenn du konkret "Ordner" meinst, ist `-d` die passende Wahl. `-e` ist nützlich, wenn dir der Typ egal ist, zum Beispiel bei "irgendwas liegt schon da".

## Symlinks und Sonderfälle: Was -d abdeckt und was nicht

`-d` folgt Symlinks. Wenn also `DIR` ein Symlink auf einen existierenden Ordner ist, gilt der Test als wahr. Das ist in vielen Fällen genau das, was man will.

Wenn du explizit prüfen möchtest, ob der Pfad ein Symlink ist, nutzt du `-L`:

```bash
if [[ -L "$DIR" ]]; then
  echo "Pfad ist ein Symlink"
fi
```

Das wird relevant, wenn du vermeiden willst, dass ein Skript in ein anderes Zielverzeichnis schreibt, als du erwartest.

## Robust im Alltag: Fehler sichtbar machen, statt still weiterlaufen

Bash-Skripte laufen oft weiter, auch wenn ein Schritt schiefgeht. Bei Verzeichnis-Checks ist das in der Regel okay, aber beim anschließenden Erstellen oder Schreiben kann es sinnvoll sein, Fehler klar zu behandeln.

Ein simples Muster:

```bash
if [[ ! -d "$DIR" ]]; then
  mkdir -p "$DIR" || {
    echo "Konnte Ordner nicht anlegen: $DIR" >&2
    exit 1
  }
fi
```

Das macht den Fehler sichtbar und beendet das Skript sauber, statt später mit schwer erklärbaren Folgeschäden weiterzulaufen.

## Mini-Beispiel: Check plus Nutzung in einem kleinen Skript

```bash
#!/usr/bin/env bash
set -u

DIR="${1:-}"

if [[ -z "$DIR" ]]; then
  echo "Usage: $0 <ordnerpfad>" >&2
  exit 1
fi

if [[ -d "$DIR" ]]; then
  echo "OK: Ordner existiert: $DIR"
else
  echo "Fehlt: Ordner existiert nicht, lege an: $DIR"
  mkdir -p "$DIR" || {
    echo "Fehler: Konnte Ordner nicht anlegen: $DIR" >&2
    exit 1
  }
fi

echo "Fertig"
```

Du kannst das Skript so aufrufen:

```bash
./check-dir.sh "/tmp/test ordner"
```

Der Effekt ist bewusst unspektakulär: exakt das ist der Punkt. In Bash sind stabile, kleine Checks oft wertvoller als komplexe Konstrukte.

## Kurzfazit

Für "existiert dieser Ordner" ist `[[ -d "$DIR" ]]` das passende Muster. In der Praxis ergänzt du das meistens mit `mkdir -p` und sauberem Quoting, damit dein Skript auch dann stabil bleibt, wenn Pfade nicht perfekt aussehen.

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
