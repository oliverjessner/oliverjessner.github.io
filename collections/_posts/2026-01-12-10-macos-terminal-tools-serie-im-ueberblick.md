---
layout: post
title: '10 macOS-Terminal-Tools: Serie im Überblick'
date: 2026-01-12 14:12:45 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - macos
    - terminal
    - computer-stuff
description: 'Zehn eingebaute macOS-Terminal-Tools, die Klickwege sparen und dir bei Support, Debugging und Setup im Alltag helfen'
thumbnail: '/assets/images/gen/blog/10-macos-terminal-tools-serie-im-ueberblick/header_thumbnail.webp'
image: '/assets/images/gen/blog/10-macos-terminal-tools-serie-im-ueberblick/header.webp'
---

Zehn eingebaute macOS-Tools, die man selten bewusst lernt, aber ständig brauchen kann: weniger Klickwege, schnelleres Debugging und saubere Reports für Support oder Setup, direkt aus dem Terminal.

## Worum es in der Serie geht

Die Serie dreht sich um ein simples Prinzip: macOS bringt viele Werkzeuge bereits mit. Wer sie kennt, spart Zeit, arbeitet reproduzierbarer und kommt bei Problemen schneller zu belastbaren Antworten. Statt Vermutungen gibt es Ausgaben, statt Screenshots gibt es kopierbare Reports.

Der Fokus liegt auf drei Alltagssituationen:

-   Support: Was steckt im Gerät, wie sieht die Konfiguration aus, was braucht ein Ticket wirklich
-   Debugging: Was blockiert, was ändert sich, welche Komponente ist beteiligt
-   Setup: wiederholbare Einstellungen und kleine Automatisierungen ohne Zusatztools

## Die 10 Tools im Überblick

### 1) watch

Wofür es gut ist: wiederholt einen Befehl in Intervallen und macht Zustände sichtbar, die sonst flüchtig sind, zum Beispiel Netzstatus, Prozesse oder Log-Auszüge.

Typischer Einstieg:

```bash
watch -n 2 "pmset -g assertions"
```

Hier geht es zum [kompletten Artikel](https://oliverjessner.at/blog/2025-12-28-watch-mac-deutsch-tutorial/)

### 2) pmset

Wofür es gut ist: Power-Management diagnostizieren, etwa wenn der Mac nicht schlafen will oder sofort wieder aufwacht. Liefert Ursachen statt Bauchgefühl.

Typischer Einstieg:

```bash
pmset -g assertions
```

Hier geht es zum [kompletten Artikel](https://oliverjessner.at/blog/2026-01-12-pmset-wenn-der-mac-nicht-mehr-schlafen-will/)

### 3) mdfind

Wofür es gut ist: Spotlight-Suche als Kommandozeile, ideal um Dateien per Index zu finden, auch in Skripten oder bei großen Projekten.

Typischer Einstieg:

```bash
mdfind "kind:pdf report"
```

Hier geht es zum [kompletten Artikel](https://oliverjessner.at/blog/2025-12-28-mdfind-mac-deutsch-tutorial/)

### 4) pbcopy und pbpaste

Wofür es gut ist: verbindet Terminal-Output mit der Zwischenablage, ohne Umwege. Praktisch für Tickets, Notizen und schnelles Copy and Paste aus Pipes.

Typischer Einstieg:

```bash
ls -la | pbcopy
```

Hier geht es zum [kompletten Artikel](https://oliverjessner.at/blog/2025-12-28-pbcopy-mac-deutsch-tutorial/)

### 5) sips

Wofür es gut ist: Bilder für Web und Alltag konvertieren oder skalieren, ohne zusätzliche Tools. Besonders nützlich für Batch-Workflows und schnelle Anpassungen.

Typischer Einstieg:

```bash
sips -Z 1600 input.jpg --out output.jpg
```

Hier geht es zum [kompletten Artikel](https://oliverjessner.at/blog/2026-01-12-mac-sips-image-processing-ohne-imagemagick/)

### 6) open

Wofür es gut ist: Brücke zwischen Terminal und GUI. Öffnet Dateien, Ordner und URLs, zeigt Dateien im Finder und startet gezielt Apps.

Typischer Einstieg:

```bash
open -R path/to/file.txt
```

Hier geht es zum [kompletten Artikel](https://oliverjessner.at/blog/2026-01-12-open-voellig-unterschaetzt-extrem-praktisch/)

### 7) caffeinate

Wofür es gut ist: verhindert temporär Sleep, wenn du es bewusst brauchst, etwa bei Präsentationen, Downloads oder längeren Jobs.

Typischer Einstieg:

```bash
caffeinate
```

Hier geht es zum [kompletten Artikel](https://oliverjessner.at/blog/2025-12-28-caffeine-mac-deutsch-tutorial/)

### 8) defaults

Wofür es gut ist: macOS-Preferences lesen und schreiben, skriptbar und reproduzierbar. Nützlich für wiederkehrende Tweaks ohne Klickpfade.

Typischer Einstieg:

```bash
defaults read com.apple.finder AppleShowAllFiles
```

Hier geht es zum [kompletten Artikel](https://oliverjessner.at/blog/2026-01-12-defaults-macos-tweaks-ohne-gui/)

### 9) networkQuality

Wofür es gut ist: liefert einen praxisnahen Netztest unter macOS, wenn du wissen willst, wie stabil und reaktionsfähig eine Verbindung ist, nicht nur wie schnell sie theoretisch ist.

Typischer Einstieg:

```bash
networkQuality
```

Hier geht es zum [kompletten Artikel](https://oliverjessner.at/blog/2025-12-28-networkquality-mac-deutsch-tutorial/)

### 10) system_profiler

Wofür es gut ist: Hardware- und Systeminfos als Report, ohne GUI. Ideal für Support, Debugging und Kaufberatung, weil du sauber exportieren und vergleichen kannst.

Typischer Einstieg:

```bash
system_profiler SPHardwareDataType SPSoftwareDataType -detailLevel mini
```

Hier geht es zum [kompletten Artikel](https://oliverjessner.at/blog/2026-01-12-systemprofiler-hardware-infos-ohne-gui/)

## Fazit

Die Tools sind nicht spektakulär, aber genau deshalb stark: Sie sind eingebaut, schnell verfügbar und passen in reale Workflows. Wer sie einmal im Alltag nutzt, arbeitet weniger über Menüs und mehr über nachvollziehbare, wiederholbare Schritte.

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
