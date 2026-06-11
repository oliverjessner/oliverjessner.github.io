---
layout: post
title: 'Globales .gitignore einrichten: .DS_Store, .env & lokale Dateien ignorieren'
date: 2026-05-20 09:00:00 +0100
last_modified_at: 2026-06-11 13:00:10 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - git
    - terminal
    - macos
description: 'Ein globales gitignore hält .DS_Store, .env und andere lokale Dateien aus deinen Repositories'
thumbnail: '/assets/images/gen/blog/globales-gitignore-weniger-muell-im-repository/header_thumbnail.webp'
image: '/assets/images/gen/blog/globales-gitignore-weniger-muell-im-repository/header.webp'
faq:
    - question: 'Was ist ein globales gitignore?'
      answer: 'Ein globales gitignore ist eine persönliche Ignore-Datei für Git. Sie gilt für alle lokalen Repositories eines Nutzers und eignet sich für Dateien, die nie projektabhängig sind.'
    - question: 'Sollte .env ins globale gitignore?'
      answer: 'Ja, häufig ist das sinnvoll. Eine .env-Datei enthält oft lokale Konfiguration oder geheime Werte. Sie sollte aber zusätzlich in projektbezogenen Sicherheits- und Setup-Regeln berücksichtigt werden.'
    - question: 'Entfernt ein globales gitignore bereits getrackte Dateien?'
      answer: 'Nein. Git ignoriert damit nur neue, noch nicht getrackte Dateien. Bereits getrackte Dateien müssen separat aus dem Index entfernt werden.'
---

Viele lokale Dateien gehören nicht in ein Repository. Ein globales gitignore hilft dabei, wiederkehrende Störquellen wie .DS_Store oder .env automatisch aus allen Projekten herauszuhalten.

## Warum ein globales gitignore sinnvoll ist

In fast jedem [Git](https://oliverjessner.at/category/git/)-Projekt gibt es Dateien, die nicht ins Repository gehören. Manche davon sind projektspezifisch. Andere entstehen nur durch das eigene Betriebssystem, den Editor oder die lokale Entwicklungsumgebung.

Genau für diese zweite Gruppe eignet sich ein globales gitignore. Es ist keine Alternative zur normalen [gitignore](https://oliverjessner.at/blog/2026-05-17-wie-funktioniert-gitignore.md/) im Projekt. Es ergänzt sie um persönliche Regeln, die auf deinem Rechner immer gelten sollen.

Typische Beispiele sind:

```text
.DS_Store
.env
```

`.DS_Store` wird unter [macOS](https://oliverjessner.at/category/macos/) automatisch vom Finder erzeugt. Die Datei speichert Ordneransichten und andere lokale Finder-Metadaten. Für ein Repository ist sie in der Regel wertlos.

`.env` enthält häufig lokale Umgebungsvariablen. Darin können API-Keys, Datenbankzugänge oder andere sensible Werte stehen. Solche Dateien sollten nicht versehentlich in ein Repository geraten.

## Globales gitignore einrichten

Git kann eine globale Ignore-Datei verwenden. Der folgende Befehl sagt Git, wo diese Datei liegt:

```bash
git config --global core.excludesFile ~/.config/git/ignore
```

Damit setzt du die globale Git-Konfiguration für deinen Nutzer. Ab diesem Zeitpunkt prüft Git zusätzlich die Datei `~/.config/git/ignore`, wenn es entscheidet, ob neue Dateien ignoriert werden sollen.

Falls der Ordner noch nicht existiert, kannst du ihn im [Terminal](https://oliverjessner.at/category/terminal/) anlegen:

```bash
mkdir -p ~/.config/git
```

Danach erstellst oder bearbeitest du die Ignore-Datei:

```bash
nano ~/.config/git/ignore
```

Der Inhalt kann zum Beispiel so aussehen:

```gitignore
.DS_Store
.env
```

Damit ignoriert Git diese Dateien in allen lokalen Repositories, solange sie noch nicht getrackt werden.

## Was gehört in die globale Ignore-Datei?

In eine globale Ignore-Datei gehören Dinge, die mit deinem Rechner oder deinem persönlichen Workflow zu tun haben. Sie sollte nicht zur Ablage projektbezogener Regeln werden.

Projektregeln gehören dagegen weiterhin in die `.gitignore` des jeweiligen Repositories. Wenn ein Projekt zum Beispiel einen `dist`-Ordner oder bestimmte Build-Artefakte ignorieren soll, sollte das im Projekt selbst stehen. So sehen auch andere Mitwirkende dieselben Regeln.

## Wichtiger Hinweis zu bereits getrackten Dateien

Ein globales gitignore schützt nicht rückwirkend. Wenn eine Datei bereits von Git getrackt wird, ignoriert Git sie nicht einfach, nur weil sie später in einer Ignore-Datei steht.

Das betrifft zum Beispiel eine `.env`, die versehentlich bereits committed wurde. In diesem Fall muss die Datei aus dem Git-Index entfernt werden:

```bash
git rm --cached .env
```

Danach sollte geprüft werden, ob sensible Werte bereits in der Git-Historie gelandet sind. Ein normales Entfernen aus dem aktuellen Commit reicht dann unter Umständen nicht aus. Bei API-Keys oder Passwörtern ist es meist besser, die betroffenen Zugangsdaten zu rotieren.

## Globale Regeln sauber halten

Ein globales gitignore ist praktisch, sollte aber übersichtlich bleiben. Je mehr Regeln dort stehen, desto schwieriger wird es, unerwartetes Git-Verhalten nachzuvollziehen.

Meine Faustregel: Alles, was nur meinen Rechner betrifft, darf global sein. Alles, was ein Projekt für alle Beteiligten betrifft, gehört in die `.gitignore` des Projekts.

So bleibt die Trennung klar. Das Repository beschreibt das Projekt. Die globale Ignore-Datei beschreibt deinen lokalen Arbeitsplatz.
