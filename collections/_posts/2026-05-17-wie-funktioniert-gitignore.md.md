---
layout: post
title: '.gitignore einfach erklärt: Regeln, Beispiele und häufige Fehler'
meta_title: '.gitignore einfach erklärt: Regeln, Beispiele und häufige Fehler'
date: 2026-05-17 00:00:00 +0100
permalink: '/blog/2026-05-17-wie-funktioniert-gitignore/'
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - git
    - software-development
    - terminal
cluster:
  git:
    section: working-tree
    order: 40
description: 'So funktioniert .gitignore in Git: Regeln, Beispiele, typische Fehler und was du tun musst, wenn Git Dateien trotzdem trackt'
thumbnail: '/assets/images/gen/blog/wie-funktioniert-gitignore/header_thumbnail.webp'
image: '/assets/images/gen/blog/wie-funktioniert-gitignore/header.webp'
image_width: 1280
image_height: 853
faq:
    - question: 'Was macht eine .gitignore-Datei?'
      answer: 'Eine .gitignore-Datei legt Muster für ungetrackte Dateien und Ordner fest, die Git beim normalen Hinzufügen auslassen soll. Bereits getrackte Dateien sind davon nicht betroffen.'
    - question: 'Warum ignoriert Git meine Datei trotz .gitignore nicht?'
      answer: 'Meistens wurde die Datei bereits getrackt. Dann musst du sie mit `git rm --cached <datei>` aus dem Git-Index entfernen.'
    - question: 'Sollte .env in die .gitignore?'
      answer: 'Ja. .env enthält oft API-Keys, Tokens oder Datenbankzugänge und sollte normalerweise nicht ins Repository.'
    - question: 'Sollte node_modules in die .gitignore?'
      answer: 'Ja. node_modules/ wird in JavaScript-Projekten normalerweise nicht versioniert, weil Abhängigkeiten über den Paketmanager wieder installiert werden können.'
    - question: 'Wie prüfe ich, ob eine .gitignore-Regel greift?'
      answer: 'Mit `git check-ignore -v <datei>` kannst du prüfen, welche Regel eine Datei ignoriert.'
    - question: 'Kann .gitignore bereits committete Secrets schützen?'
      answer: 'Nein. Wenn ein Secret bereits im Repository gelandet ist, sollte es rotiert und gegebenenfalls aus der Git-Historie entfernt werden.'
---

Eine `.gitignore`-Datei legt fest, welche ungetrackten Dateien Git beim normalen Hinzufügen auslassen soll. Das betrifft etwa lokale Konfigurationen, Logdateien, Build-Ordner oder Abhängigkeiten. Bereits getrackte Dateien bleiben davon unberührt.

Gerade am Anfang wirkt `.gitignore` unspektakulär. Man legt eine Datei an, schreibt ein paar Regeln hinein und Git ignoriert den Rest. In der Praxis ist sie aber ein wichtiger Teil sauberer [Git](https://oliverjessner.at/category/git/)-Arbeit. Denn nicht alles, was in deinem Projektordner liegt, gehört auch in die Versionskontrolle.

## Kurz erklärt

Eine `.gitignore`-Datei sagt Git, welche Dateien und Ordner nicht ins Repository aufgenommen werden sollen. Typische Beispiele sind `node_modules/`, `.env`, Logdateien, Build-Ordner und Betriebssystemdateien wie `.DS_Store`.

Wichtig: `.gitignore` wirkt nur auf Dateien, die noch nicht von Git getrackt werden. Wurde eine Datei bereits committed oder gestaged, musst du sie zuerst aus dem Git-Index entfernen.

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

## .gitignore erstellen

Eine `.gitignore` ist eine normale Textdatei mit einem besonderen Namen. Du kannst sie im Hauptverzeichnis deines Projekts anlegen:

```bash
touch .gitignore
```

Danach öffnest du die Datei im Editor und trägst pro Zeile eine Regel ein. Wichtig ist der Punkt am Anfang des Dateinamens: Die Datei heißt `.gitignore`, nicht `gitignore.txt`.

Wenn du ein neues Repository auf GitHub anlegst, kannst du dort oft schon ein passendes Template auswählen. Bei einem bestehenden Projekt legst du die Datei einfach nachträglich an und commitest sie wie jede andere Projektdatei.

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

## .gitignore-Regeln mit Beispielen

Die Syntax ist einfach. Ein paar Details sind trotzdem wichtig.

Eine einzelne Datei ignorieren:

```gitignore
.env
```

Ohne Pfadbegrenzung gilt `.env` auch in Unterordnern. `/.env` beschränkt die Regel auf das Verzeichnis dieser `.gitignore`. Ein abschließender Schrägstrich wie bei `node_modules/` begrenzt ein Muster auf Ordner.

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

Wichtig: Liegt die Datei in einem vollständig ignorierten Ordner, reicht eine Ausnahme für die Datei nicht. Statt `tmp/` mit `!tmp/keep.txt` kannst du für eine Ausnahme direkt darin `tmp/*` und danach `!tmp/keep.txt` verwenden.

Kommentare kannst du mit `#` schreiben:

```gitignore
# Lokale Umgebungsvariablen
.env
.env.local
```

Das ist hilfreich, wenn die Datei mit der Zeit wächst oder mehrere Personen am Projekt arbeiten.

Zum Nachvollziehen: Trage `*.log` und danach `!important.log` in die `.gitignore` eines Test-Repositories ein. Lege dann zwei Dateien an:

```bash
touch debug.log important.log
git check-ignore -v debug.log important.log
git status --short --untracked-files=all
```

`debug.log` wird ignoriert. Bei `important.log` zeigt `check-ignore -v` die Ausnahme mit `!`; die Datei erscheint in `git status` als ungetrackt. Voraussetzung: Beide Dateien waren noch nicht gestaged oder committed.

## .gitignore funktioniert nicht: Die häufigsten Gründe

Wenn `.gitignore` nicht greift, liegt es meistens an einem dieser Punkte:

1. Die Datei wurde bereits von Git getrackt.
2. Die Regel steht an der falschen Stelle.
3. Das Muster passt nicht zum tatsächlichen Dateipfad.
4. Eine spätere Regel hebt eine frühere Regel wieder auf.
5. Die Datei wird durch eine globale Gitignore-Regel anders behandelt.

Mit diesem Befehl prüfst du, welche Ignore-Regel für eine Datei greift:

```bash
git check-ignore -v .env
```

Wenn Git eine passende Regel findet, zeigt die Ausgabe die Datei, die Zeile und das Muster. Das ist besonders nützlich, wenn mehrere `.gitignore`-Dateien oder globale Regeln im Spiel sind.

Für bereits getrackte Dateien liefert `check-ignore` standardmäßig keine Ausgabe. Zum Prüfen des Musters kannst du `git check-ignore -v --no-index .env` verwenden. Das ändert den Index nicht und beendet auch nicht das Tracking.

Mit diesem Befehl siehst du, welche ignorierten Dateien Git erkennt:

```bash
git status --ignored
```

Wenn eine Datei bereits getrackt wird, hilft `.gitignore` allein nicht. Dann musst du sie aus dem Git-Index entfernen:

```bash
git rm --cached .env
git add .gitignore
git commit -m "Remove env file from repository"
```

Die Datei bleibt lokal erhalten, wird aber aus dem Git-Index entfernt und künftig nicht mehr versioniert.

## Bereits getrackte Dateien nachträglich ignorieren

Ein häufiger Fehler: Die Datei wurde bereits von Git getrackt. Dann hilft `.gitignore` allein nicht mehr.

Beispiel: Du hast versehentlich `.env` committed. Danach trägst du `.env` in die `.gitignore` ein. Git beobachtet die Datei trotzdem weiter, weil sie bereits im Index liegt.

In diesem Fall entfernst du sie aus dem Git-Index:

```bash
git rm --cached .env
```

Danach commitest du die Änderung:

```bash
git add .gitignore
git commit -m "Remove env file from repository"
```

Bei Ordnern funktioniert das ähnlich:

```bash
git rm -r --cached node_modules/
git commit -m "Remove ignored files from repository"
```

Die Dateien bleiben in deinem aktuellen Arbeitsverzeichnis erhalten. Der Commit speichert ihre Entfernung aus dem aktuellen Projektstand; ältere Commits enthalten sie weiterhin. Das ist eine Änderung für das gemeinsame Repository und sollte bei lokalen Konfigurationen mit dem Team abgestimmt werden. Ausführlicher ist das im Artikel [Git: Bereits getrackte Datei korrekt ignorieren](/blog/2026-01-03-git-bereits-getrackte-datein-ignorieren/) erklärt.

## Was gehört in eine gute .gitignore?

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

Für viele Sprachen und Frameworks musst du nicht bei null anfangen. GitHub pflegt eine Sammlung offizieller [.gitignore-Templates](https://github.com/github/gitignore), etwa für Node.js, Python, macOS, Visual Studio und viele andere Umgebungen.

## Beispiel: .gitignore für Node.js-Projekte

Ein typisches Node.js-Projekt ignoriert Abhängigkeiten, lokale Umgebungsdateien, Build-Ausgaben, Coverage-Daten und Logdateien:

```gitignore
node_modules/
.env
.env.local
dist/
build/
coverage/
npm-debug.log*
```

`node_modules/` gehört normalerweise nicht ins Repository, weil die Abhängigkeiten über `npm install`, `pnpm install` oder `yarn install` wiederhergestellt werden können. Die Datei `package-lock.json`, `pnpm-lock.yaml` oder `yarn.lock` wird dagegen in vielen Projekten bewusst versioniert, damit Installationen reproduzierbar bleiben.

## Beispiel: .gitignore für macOS, VS Code und Webprojekte

Für lokale System-, Editor- und Cache-Dateien sieht eine einfache Ergänzung oft so aus:

```gitignore
.DS_Store
.vscode/
.idea/
*.log
.cache/
.tmp/
```

Bei `.vscode/` gibt es eine Einschränkung. Manche Teams teilen bewusst bestimmte VS-Code-Einstellungen, etwa empfohlene Extensions oder Formatter-Regeln. Dann sollte nicht der ganze Ordner ignoriert werden, sondern nur lokale Dateien, die wirklich nicht ins Repository gehören.

## .gitignore ist keine Sicherheitsgarantie

Eine `.gitignore` verhindert nur, dass neue ungetrackte Dateien versehentlich aufgenommen werden. Sie schützt keine Dateien, die bereits committed wurden.

Wenn ein Secret bereits im Repository gelandet ist, wird es nicht dadurch sicher, dass es später in `.gitignore` steht. API-Keys, Tokens oder Passwörter sollten dann rotiert werden. Das bedeutet: Den alten Zugang deaktivieren und einen neuen erzeugen.

Je nach Fall muss zusätzlich die Git-Historie bereinigt werden. Das ist nicht bei jeder versehentlich versionierten Datei nötig, bei echten Secrets aber ein ernstes Thema. Gerade bei öffentlichen Repositories können veröffentlichte Keys sehr schnell gefunden werden.

## Weitere Git-Probleme lösen

Wenn du gerade an einem Git-Problem hängst, passen diese Anleitungen gut dazu:

- [Git add rückgängig machen](/blog/2026-01-02-git-add-rueckgaengig-machen/)
- [Git unstaged Änderungen verwerfen](/blog/2026-01-03-git-unstaged-aenderungen-verwerfen/)
- [Untracked Dateien entfernen](/blog/2026-01-03-git-untrackted-dateien-aus-dem-working-tree-entfernen/)
- [Git Commit rückgängig machen](/blog/2025-12-31-git-letzten-commit-rueckgaengig-machen/)
- [Alle Git-Anleitungen im Überblick](/category/git/)

## Fazit

`.gitignore` ist keine komplizierte Git-Funktion, sondern eine einfache Schutzschicht für dein Projekt. Sie hält lokale, generierte und sensible Dateien aus der Versionskontrolle heraus.

Am besten legst du sie direkt beim Start eines Projekts an. Dann musst du später weniger aufräumen und reduzierst das Risiko, unnötige Dateien oder Secrets zu committen.

Details zu Mustern und Grenzen stehen in der offiziellen [gitignore-Dokumentation](https://git-scm.com/docs/gitignore), die Diagnose erklärt [git check-ignore](https://git-scm.com/docs/git-check-ignore). Das Entfernen nur aus dem Index beschreibt [git rm --cached](https://git-scm.com/docs/git-rm).

Die wichtigste Regel lautet: Alles, was lokal erzeugt, geheim oder jederzeit wiederherstellbar ist, gehört sehr wahrscheinlich nicht in Git.
