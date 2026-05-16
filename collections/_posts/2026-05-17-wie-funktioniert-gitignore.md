---
layout: post
title: 'Wie funktioniert .gitignore?'
date: 2026-05-17 01:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - git
    - software-development
    - terminal
description: 'Eine .gitignore-Datei hält Logs, Abhängigkeiten und Geheimnisse aus deinem Repository heraus'
thumbnail: '/assets/images/gen/blog/wie-funktioniert-gitignore/header_thumbnail.webp'
image: '/assets/images/gen/blog/wie-funktioniert-gitignore/header.webp'
faq:
    - question: 'Was macht eine .gitignore-Datei?'
      answer: 'Eine .gitignore-Datei sagt Git, welche Dateien und Ordner nicht ins Repository aufgenommen werden sollen.'
    - question: 'Warum ignoriert Git meine Datei trotz .gitignore nicht?'
      answer: 'Wurde die Datei bereits getrackt, reicht .gitignore allein nicht aus. Dann muss sie zuerst aus dem Git-Index entfernt werden.'
    - question: 'Sollte .env in die .gitignore?'
      answer: 'Ja. Lokale Umgebungsdateien wie .env enthalten oft Secrets, API-Keys oder Datenbankzugänge und gehören nicht ins Repository.'
---

Eine `.gitignore`-Datei gehört zu den kleinen Dingen in Git, die viel Ärger verhindern können. Sie sorgt dafür, dass bestimmte Dateien gar nicht erst in dein Repository wandern. Das betrifft lokale Konfigurationen, Logdateien, Build-Ordner, Abhängigkeiten oder temporäre Dateien deines Betriebssystems.

Gerade am Anfang wirkt `.gitignore` unspektakulär. Man legt eine Datei an, schreibt ein paar Regeln hinein und Git ignoriert den Rest. In der Praxis ist sie aber ein wichtiger Teil sauberer [Git](https://oliverjessner.at/category/git/)-Arbeit. Denn nicht alles, was in deinem Projektordner liegt, gehört auch in die Versionskontrolle.

## Was macht .gitignore?

Git beobachtet Dateien in deinem Projekt. Sobald du `git status` ausführst, zeigt Git dir neue, geänderte oder gelöschte Dateien an. Eine `.gitignore`-Datei sagt Git, welche Dateien dabei ausgeblendet werden sollen.

Ein einfaches Beispiel:

```gitignore
node_modules/
.env
*.log
.DS_Store
```

Diese Regeln bedeuten:

```text
node_modules/  ignoriert den ganzen Ordner node_modules
.env           ignoriert die Datei .env
*.log          ignoriert alle Dateien mit der Endung .log
.DS_Store      ignoriert macOS-Systemdateien
```

Das Ziel ist nicht, Dateien auf deinem Rechner zu löschen. `.gitignore` verhindert nur, dass Git sie als neue Dateien für das Repository vorschlägt.

## Warum ist .gitignore wichtig?

Ohne `.gitignore` landen schnell Dateien im Repository, die dort nichts verloren haben. Bei [Softwareentwicklung](https://oliverjessner.at/category/software-development/) sind das oft Abhängigkeiten, Build-Ergebnisse oder lokale Einstellungen.

Typische Beispiele sind:

```gitignore
node_modules/
dist/
build/
coverage/
.env
*.log
```

Der Ordner `node_modules/` kann tausende Dateien enthalten. Er wird in JavaScript-Projekten normalerweise nicht versioniert, weil er über `npm install`, `pnpm install` oder `yarn install` wiederhergestellt werden kann.

Auch `dist/` oder `build/` sind meist generierte Ordner. Sie entstehen aus deinem Quellcode und müssen nicht zwingend in Git liegen. Das hängt vom Projekt ab. In vielen Webprojekten ist es aber sauberer, nur den Quellcode zu versionieren.

Besonders wichtig sind `.env`-Dateien. Dort stehen oft API-Keys, Datenbankzugänge oder andere sensible Werte. Diese Informationen sollten nicht in einem öffentlichen oder geteilten Repository landen.

## Wo liegt die .gitignore-Datei?

Die `.gitignore` liegt normalerweise im Hauptverzeichnis deines Projekts:

```text
mein-projekt/
├── .gitignore
├── package.json
├── src/
└── README.md
```

Du kannst auch `.gitignore`-Dateien in Unterordnern verwenden. Dann gelten die Regeln ab diesem Ordner. Für die meisten Projekte reicht aber eine zentrale Datei im Root-Verzeichnis.

Anlegen kannst du sie direkt im [Terminal](https://oliverjessner.at/category/terminal/):

```bash
touch .gitignore
```

Danach öffnest du die Datei in deinem Editor und trägst die Regeln ein.

## Wie funktionieren die Regeln?

Die Syntax ist einfach. Ein paar Details sind trotzdem wichtig.

Eine einzelne Datei ignorieren:

```gitignore
.env
```

Einen ganzen Ordner ignorieren:

```gitignore
node_modules/
```

Alle Dateien mit einer bestimmten Endung ignorieren:

```gitignore
*.log
```

Alles in einem Ordner ignorieren:

```gitignore
tmp/*
```

Eine Ausnahme definieren:

```gitignore
*.log
!important.log
```

Das Ausrufezeichen bedeutet: Diese Datei soll trotz vorheriger Regel nicht ignoriert werden.

Kommentare kannst du mit `#` schreiben:

```gitignore
# Lokale Umgebungsvariablen
.env
.env.local
```

Das ist hilfreich, wenn die Datei mit der Zeit wächst oder mehrere Personen am Projekt arbeiten.

## Warum greift .gitignore manchmal nicht?

Ein häufiger Fehler: Die Datei wurde bereits von Git getrackt. Dann hilft `.gitignore` allein nicht mehr.

Beispiel: Du hast versehentlich `.env` committed. Danach trägst du `.env` in die `.gitignore` ein. Git beobachtet die Datei trotzdem weiter, weil sie bereits im Index liegt.

In diesem Fall entfernst du sie aus dem Git-Index:

```bash
git rm --cached .env
```

Danach commitest du die Änderung:

```bash
git commit -m "Remove env file from repository"
```

Die Datei bleibt lokal auf deinem Rechner erhalten. Sie wird nur aus dem Repository entfernt.

Bei Ordnern funktioniert das ähnlich:

```bash
git rm -r --cached node_modules/
```

Danach sollte Git den Ordner nicht mehr als Änderung anzeigen, solange er in der `.gitignore` steht.

## Was gehört in eine gute .gitignore?

Eine gute `.gitignore` hängt vom Projekt ab. Ein Node.js-Projekt braucht andere Regeln als ein Python-, PHP- oder macOS-Projekt. Trotzdem gibt es typische Einträge, die in vielen Webprojekten sinnvoll sind:

```gitignore
# Dependencies
node_modules/

# Build output
dist/
build/

# Environment files
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# Coverage
coverage/

# OS files
.DS_Store
Thumbs.db

# Editor files
.vscode/
.idea/
```

Bei `.vscode/` gibt es eine kleine Einschränkung. Manche Teams versionieren bewusst bestimmte Editor-Einstellungen, etwa empfohlene Extensions. Dann sollte man nicht den ganzen Ordner ignorieren, sondern nur lokale Dateien ausschließen.

## .gitignore ist keine Sicherheitsgarantie

Eine `.gitignore` hilft, sensible Dateien gar nicht erst zu committen. Sie ist aber kein Schutzschild. Wenn ein Secret bereits im Repository gelandet ist, bleibt es in der Git-Historie erhalten.

Dann reicht es nicht, die Datei später zu löschen. API-Keys, Tokens oder Passwörter sollten rotiert werden. Das bedeutet: Den alten Zugang deaktivieren und einen neuen erzeugen.

Gerade bei öffentlichen Repositories ist das wichtig. Ein versehentlich veröffentlichter Key kann von Bots sehr schnell gefunden werden.

## Fazit

`.gitignore` ist keine komplizierte Git-Funktion, sondern eine einfache Schutzschicht für dein Projekt. Sie hält lokale, generierte und sensible Dateien aus der Versionskontrolle heraus.

Am besten legst du sie direkt beim Start eines Projekts an. Dann musst du später weniger aufräumen und reduzierst das Risiko, unnötige Dateien oder Secrets zu committen.

Die wichtigste Regel lautet: Alles, was lokal erzeugt, geheim oder jederzeit wiederherstellbar ist, gehört sehr wahrscheinlich nicht in Git.
