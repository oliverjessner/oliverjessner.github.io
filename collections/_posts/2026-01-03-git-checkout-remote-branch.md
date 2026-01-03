---
layout: post
title: 'Git: Remote-Branch auschecken (einfach erklärt)'
date: 2026-01-03 11:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - git
    - computer-stuff
    - software-development
description: 'Tutorial: So checkst du einen Remote-Git-Branch aus – mit einem oder mehreren Remotes, verständlich und ohne Stolperfallen.'
thumbnail: '/assets/images/gen/blog/  /header_thumbnail.webp'
image: '/assets/images/gen/blog/git-checkout-remote-branch/header.webp'
---

Remote-Branches sieht man ständig (`origin/main`, `origin/test`) aber sie lassen sich nicht direkt bearbeiten.

Die typische Frage lautet daher: **Wie checke ich einen Remote-Git-Branch korrekt aus, um daran zu arbeiten?**

Die Antwort hängt davon ab, ob dein Repository **nur ein Remote** hat oder **mehrere**.

## Vorbereitung: Aktuelle Branches vom Remote holen

Egal welcher Fall zutrifft, der erste Schritt ist immer derselbe:

```bash
git fetch
```

Damit lädt Git alle aktuellen Remote-Branches herunter Um zu sehen, welche Branches verfügbar sind:

```bash
git branch -v -a
```

Typische Ausgabe:

```bash
remotes/origin/test
```

Branches unter remotes/\* sind nur lesbare Kopien der Remote-Branches. Um daran zu arbeiten, musst du daraus einen lokalen Branch erstellen.

## Fall 1: Repository mit nur einem Remote

Wenn dein Projekt nur ein Remote hat (meist origin), ist Git recht komfortabel. Remote-Branch auschecken

```bash
git switch test
```

Was hier passiert:

-   Git erkennt automatisch origin/test
-   erstellt einen lokalen Branch test
-   setzt origin/test als Upstream

Diese automatische Zuordnung nennt sich Guessing und kann bei Bedarf mit --no-guess deaktiviert werden.

## Fall 2: Repository mit mehreren Remotes

Gibt es mehrere Remotes, muss Git explizit wissen, von welchem Remote der Branch stammt.

Zuerst vom gewünschten Remote fetchen

```bash
git fetch origin
```

Dann lokalen Branch aus dem Remote-Branch erstellen

```bash
git switch -c test origin/test
```

Dabei bedeutet:

-   **-c** test → neuen lokalen Branch erstellen
-   origin/test → Quelle des Remote-Branches

Jetzt arbeitest du ganz normal auf dem lokalen Branch test, der mit origin/test verknüpft ist.

Anderes Thema: Unterschied zwischen [git pull und git fetch](https://oliverjessner.at/blog/2026-01-02-unterschied-zwischen-git-fetch-und-git-pull/)
