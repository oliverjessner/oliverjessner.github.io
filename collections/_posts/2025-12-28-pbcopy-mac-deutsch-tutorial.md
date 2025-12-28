---
layout: post
title: 'Wie funktioniert pbcopy und pbpaste unter Mac eigentlich? Tutorial'
date: 2025-12-28 13:15:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - macos
    - computer-stuff
    - terminal
description: 'Tutorial: Mit pbcopy und pbpaste die macOS-Zwischenablage direkt aus dem Terminal nutzen und Text nahtlos zwischen Terminal und Apps austauschen.'
thumbnail: '/assets/images/gen/blog/pbcopy-mac-deutsch-tutorial/header_thumbnail.webp'
image: '/assets/images/gen/blog/pbcopy-mac-deutsch-tutorial/header.webp'
---

## Zwischenablage im Terminal nutzen?

Kopieren und Einfügen funktionieren unter macOS und iOS geräteübergreifend und nahtlos. Aber was ist, wenn man im Terminal arbeitet und Text direkt in die Zwischenablage kopieren oder von dort einfügen möchte?

Genau dafür gibt es die beiden Befehle `pbcopy` und `pbpaste`.

Mit ihnen lässt sich Text aus dem Terminal in die macOS-Zwischenablage kopieren und umgekehrt. Ohne Umwege, ohne Maus, ohne zusätzliche Tools.

## Wie installier ich pbcopy und pbpaste?

Gar nicht. `pbcopy` und `pbpaste` sind **fester Bestandteil von macOS** und standardmäßig im Terminal verfügbar. Kein Homebrew, keine Zusatzsoftware.

## Beispiel

Um die Ausgabe eines Befehls direkt in die Zwischenablage zu kopieren, reicht eine Pipe:

```bash
ls | pbcopy
```

Der Inhalt liegt danach ganz normal in der Zwischenablage und kann in jeder App eingefügt werden etwa in Mail, Teams, Notes oder einem Texteditor.

Umgekehrt lässt sich der aktuelle Inhalt der Zwischenablage im Terminal ausgeben:

```bash
pbpaste
```

So wird aus Copy & Paste ein nahtloser Austausch zwischen Terminal und Oberfläche.

Was kann ich sonst noch damit machen?

pbcopy und pbpaste spielen ihre Stärke vor allem in Kombination mit anderen Befehlen aus.

Einen Dateipfad kopieren:

```bash
pwd | pbcopy
```

Text aus der Zwischenablage weiterverarbeiten:

```bash
pbpaste | grep ERROR
```

Oder Inhalte gezielt formatieren, bevor sie eingefügt werden:

```bash
pbpaste | sort | uniq
```

Fazit

Mit `pbcopy` und `pbpaste` wird die Zwischenablage zu einem Teil des Terminals. Die Befehle sind unscheinbar, aber extrem effektiv vor allem für alle, die regelmäßig zwischen Terminal und Apps wechseln. Wer Inhalte effizient weiterverarbeiten möchte, muss sie zuerst finden. Genau hier kommt [mdfind](https://oliverjessner.at/blog/2025-12-28-mdfind-mac-deutsch-tutorial/) ins Spiel, der Terminal-Zugang zum Spotlight-Index von macOS.

> Dieser Artikel ist Teil der Mini-Serie „Wie funktioniert eigentlich X unter Mac?“ – kurze Erklärungen zu kleinen Terminal-Befehlen, die im Alltag mehr bringen, als man denkt.
