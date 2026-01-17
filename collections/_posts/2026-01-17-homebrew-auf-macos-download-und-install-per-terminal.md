---
layout: post
title: 'Homebrew auf macOS: download und install per Terminal'
date: 2026-01-17 20:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - macos
    - terminal
    - software-development
description: 'Homebrew erklärt: Tools per Terminal download und install, inklusive Casks, Updates und den wichtigsten Befehlen für den Alltag'
thumbnail: '/assets/images/gen/blog/homebrew-auf-macos-download-und-install-per-terminal/header_thumbnail.webp'
image: '/assets/images/gen/blog/homebrew-auf-macos-download-und-install-per-terminal/header.webp'
---

Homebrew ist der Paketmanager für [macOS](https://oliverjessner.at/category/macos/), wenn du Tools lieber per Terminal verwaltest. Einmal eingerichtet, laufen download, install und Updates konsistent und nachvollziehbar.

## Was ist Homebrew

Homebrew ist ein Paketmanager für macOS. Er hilft dir, Software aus dem [Terminal](https://oliverjessner.at/category/terminal/) heraus zu beziehen, zu aktualisieren und zu entfernen. Statt jede Website einzeln abzuklappern, hast du ein Werkzeug, das Quellen, Versionen und Abhängigkeiten für dich organisiert.

Im Alltag bedeutet das: Du tippst einen Befehl, Homebrew erledigt download und install, legt die Dateien an einem definierten Ort ab und macht das Tool für dich im Pfad verfügbar.

## Warum Homebrew so praktisch ist

Homebrew löst mehrere typische macOS Probleme auf einmal:

- Du bekommst CLI Tools wie git, ffmpeg oder jq ohne manuelle Handarbeit
- Abhängigkeiten werden automatisch mitgezogen
- Updates sind zentral steuerbar
- Du kannst später sauber deinstallieren, statt Reste zu suchen
- Du kannst Setups reproduzierbar machen, etwa für neue Macs

Das ist weniger Magie, mehr Hygiene.

## Wie Homebrew technisch arbeitet

Homebrew verwaltet Pakete als sogenannte "Formulae" und "Casks".

- Formulae sind in der Regel Kommandozeilen Tools und Libraries
- Casks sind meist GUI Apps oder größere Bundles

Homebrew installiert nicht wild irgendwohin, sondern in ein eigenes Prefix. Typischerweise ist das:

- Apple Silicon: /opt/homebrew
- Intel: /usr/local

Von dort aus legt Homebrew Symlinks in ein bin Verzeichnis, damit du die Programme einfach aufrufen kannst. Der eigentliche Inhalt bleibt im verwalteten Bereich, was Updates und Uninstall deutlich sauberer macht.

## Homebrew installieren

Die Installation erfolgt im Terminal über ein offizielles Script. Das fühlt sich zunächst ungewohnt an, ist aber der Standardweg, weil dabei gleich die nötigen Pfade und Rechte korrekt gesetzt werden.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Warnhinweis: Führe Install-Scripts nur aus, wenn du die Quelle kennst und dem Projekt vertraust. Im Zweifel schaust du dir das Script zuerst an, bevor du es ausführst!

Nach der Installation lohnt sich ein kurzer Check, ob brew erreichbar ist:

```bash
brew --version
```

Wenn das klappt, ist die Basis erledigt.

## Die wichtigsten Befehle für den Alltag

Ein Tool wie zb.: [git](https://oliverjessner.at/category/git/) installieren:

```bash
brew install git
```

Eine App als Cask installieren:

```bash
brew install --cask visual-studio-code
```

Pakete aktualisieren besteht in der Praxis aus zwei Schritten:

```bash
brew update
brew upgrade
```

- brew update lädt die neuesten Paketdefinitionen
- brew upgrade aktualisiert die installierten Pakete

Aufräumen hilft, alte Versionen zu entfernen:

```bash
brew cleanup
```

Und wenn du wissen willst, was du überhaupt installiert hast:

```bash
brew list
brew list --cask
```

Deinstallieren geht genauso klar:

```bash
brew uninstall git
brew uninstall --cask visual-studio-code
```

## Wie du herausfindest, was es gibt

Homebrew bietet mehrere Wege, Pakete zu entdecken:

```bash
brew search imagemagick
brew info imagemagick
```

brew info ist besonders nützlich, weil du dort siehst, wofür ein Paket gedacht ist, welche Optionen es gibt und welche Abhängigkeiten mitkommen.

## Ein kurzer mentaler Rahmen

Wenn du Homebrew nutzt, hilft diese Einteilung:

- brew update und brew upgrade sind Wartung, so wie Systemupdates
- brew install ist dein Standardweg für Tools
- brew cleanup hält das System schlank
- Casks sind für Apps, Formulae eher für CLI und Libraries

Damit wird Homebrew schnell zu einem Teil deiner Routine, statt zu einem Tool, das du nur einmal im Jahr anfasst.

## Fazit

Homebrew ist der pragmatische Weg, Software auf macOS per Terminal zu verwalten. Es macht download und install reproduzierbar, Updates kontrollierbar und Deinstallationen sauber. Wer häufiger mit Developer Tools arbeitet, spart damit Zeit und reduziert Chaos.

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
