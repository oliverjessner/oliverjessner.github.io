---
layout: post
title: 'defaults – macOS-Tweaks ohne GUI'
date: 2026-01-12 12:12:10 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - macos
    - terminal
    - computer-stuff
description: 'defaults ist der schnellste Weg zu macOS-Tweaks per Terminal: lesen, schreiben, sichern und sauber zurücksetzen, ohne durch Menüs zu klicken'
thumbnail: '/assets/images/gen/blog/defaults-macos-tweaks-ohne-gui/header_thumbnail.webp'
image: '/assets/images/gen/blog/defaults-macos-tweaks-ohne-gui/header.webp'
---

Mit defaults steuerst du viele macOS-Einstellungen direkt im Terminal. Das ist skriptbar, reproduzierbar und ideal, wenn du mehrere Macs gleich konfigurieren willst oder dir Klickwege sparen möchtest.

## defaults – was du damit wirklich steuerst

`defaults` ist das Kommandozeilen-Interface zu den macOS Preferences. Viele Apps und Systemkomponenten speichern ihre Einstellungen als Key-Value-Paare in sogenannten Preference Domains. Genau dort liest und schreibt `defaults`.

Das ist im Alltag besonders praktisch, wenn du

-   Einstellungen schnell prüfen willst, ohne dich durch Menüs zu klicken
-   Änderungen reproduzierbar machen willst, zum Beispiel in einem Setup-Skript
-   auf mehreren Macs dieselben Tweaks setzen möchtest

**Hinweis:** `defaults` ist ein Werkzeug für Preferences, nicht für jede Systemeinstellung. Manche Optionen sind bewusst nicht über Preferences steuerbar oder werden von MDM-Profilen überlagert.

## Das Grundmodell: Domain, Key, Typ

Damit `defaults` Sinn ergibt, brauchst du drei Begriffe:

-   Domain: der Namensraum, meist eine Reverse-DNS wie `com.apple.finder`
-   Key: der konkrete Einstellungsschlüssel innerhalb der Domain
-   Typ: Boolean, Integer, String, Array oder Dictionary

Es gibt auch globale Einstellungen, die nicht an eine einzelne App gebunden sind. Dafür wird oft die Global Domain genutzt.

## Lesen: defaults read als erster Schritt

Bevor du etwas änderst, lies den Ist-Zustand. Das verhindert viele Missverständnisse, vor allem bei Typen und Schreibweisen.

Alle Domains anzeigen:

```bash
defaults domains
```

Eine Domain komplett auslesen:

```bash
defaults read com.apple.finder
```

Einen einzelnen Key lesen:

```bash
defaults read com.apple.finder AppleShowAllFiles
```

Wenn du unsicher bist, welcher Typ hinter einem Key steckt, hilft die Typabfrage:

```bash
defaults read-type com.apple.finder AppleShowAllFiles
```

Für große Ausgaben ist Paging hilfreich:

```bash
defaults read com.apple.finder | less
```

## Schreiben: defaults write, aber mit Typangabe

Beim Schreiben lohnt es sich, den Typ explizit zu setzen. Das macht die Änderung eindeutig und reduziert Nebenwirkungen.

Boolean:

```bash
defaults write com.apple.finder AppleShowAllFiles -bool true
```

Integer:

```bash
defaults write -g KeyRepeat -int 2
```

String:

```bash
defaults write com.apple.screencapture location -string "$HOME/Screenshots"
```

Array und Dictionary sind ebenfalls möglich, werden aber schnell unübersichtlich. Für viele Alltags-Tweaks reichen Boolean, Integer und String.

**Warnhinweis:** Schreibe nicht blind Keys, die du nicht zuvor gelesen hast. Manche Keys existieren nur in bestimmten macOS-Versionen oder werden von Apps beim nächsten Start überschrieben.

## Änderungen wirksam machen: App neu starten statt neu booten

Viele Preferences werden erst angewendet, wenn die betroffene App oder der betroffene Dienst neu startet. Du kannst das gezielt auslösen, ohne den ganzen Mac neu zu starten.

Finder neu starten:

```bash
killall Finder
```

Dock neu starten:

```bash
killall Dock
```

Menüleiste und systemnahe UI-Komponenten neu starten:

```bash
killall SystemUIServer
```

Wenn eine Änderung trotzdem nicht greift, ist das nicht automatisch ein Fehler. Manche Settings werden nur beim Login, nach einem Reboot oder gar nicht mehr ausgewertet.

## Sichern und zurückrollen: export, import und delete

Wenn du ernsthaft an Preferences schraubst, ist ein Backup der Domain sinnvoll. So kannst du später sauber zurück.

Domain als Datei exportieren:

```bash
defaults export com.apple.finder "$HOME/Desktop/finder-prefs.plist"
```

Domain wieder importieren:

```bash
defaults import com.apple.finder "$HOME/Desktop/finder-prefs.plist"
```

Einen einzelnen Key entfernen, um zum Default zurückzugehen:

```bash
defaults delete com.apple.finder AppleShowAllFiles
killall Finder
```

Eine ganze Domain zu löschen ist möglich, aber im Alltag selten nötig. Wenn du es tust, mache vorher ein Export, sonst ist der Rückweg unnötig schmerzhaft.

## Praxis: typische macOS-Tweaks ohne GUI

Die folgenden Beispiele sind verbreitet und in vielen Setups nützlich. Je nach macOS-Version können Details abweichen, also im Zweifel zuerst lesen und danach schreiben.

### Versteckte Dateien im Finder anzeigen

```bash
defaults write com.apple.finder AppleShowAllFiles -bool true
killall Finder
```

Zurück zum Standard:

```bash
defaults delete com.apple.finder AppleShowAllFiles
killall Finder
```

### Screenshot-Speicherort setzen

```bash
mkdir -p "$HOME/Screenshots"
defaults write com.apple.screencapture location -string "$HOME/Screenshots"
killall SystemUIServer
```

### Dock automatisch einblenden

```bash
defaults write com.apple.dock autohide -bool true
killall Dock
```

### .DS_Store auf Netzlaufwerken vermeiden

```bash
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true
killall Finder
```

Optional auch für USB-Medien:

```bash
defaults write com.apple.desktopservices DSDontWriteUSBStores -bool true
killall Finder
```

## Ein kleines Muster für Skripte: erst lesen, dann schreiben

Wenn du `defaults` in Skripten nutzt, ist ein konservativer Ansatz oft der beste:

1. aktuellen Wert lesen
2. Backup exportieren
3. Wert schreiben
4. betroffene App neu starten

Beispiel für Finder-Preferences:

```bash
defaults export com.apple.finder "$HOME/Desktop/finder-backup.plist"
defaults write com.apple.finder AppleShowAllFiles -bool true
killall Finder
```

So bleibt die Änderung nachvollziehbar, und du hast einen klaren Rückweg.

## Fazit

`defaults` ist kein Geheimtrick, aber ein unterschätztes Werkzeug: Es macht macOS-Tweaks skriptbar und wiederholbar, ohne dass du dich durch GUI-Pfade kämpfen musst. Mit Lesen, sauberem Typing und einem Backup-Workflow bleibt das Ganze alltagstauglich und kontrollierbar.
