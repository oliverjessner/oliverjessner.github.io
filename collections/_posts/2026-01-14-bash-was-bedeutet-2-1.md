---
layout: post
title: 'Bash: Was bedeutet "2&gt;&1"'
date: 2026-01-14 13:56:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
description: '2>&1 ist Bash-Umleitung: stderr wird auf stdout gelegt. Hier ist, was das in der Praxis bedeutet und warum die Reihenfolge bei Redirects entscheidend ist'
thumbnail: '/assets/images/gen/blog/bash-was-bedeutet-2-1/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-was-bedeutet-2-1/header.webp'
image_width: 1280
image_height: 720
---

2&gt;&amp;1 wirkt wie Kryptografie, ist aber nur eine Umleitung. Du leitest damit Fehlermeldungen dorthin, wo sonst normale Ausgabe landet. Das ist praktisch für Logs, Pipes und saubere Checks mit Exit-Codes.

## Die zwei Ausgabekanäle: stdout und stderr

Programme schreiben typischerweise auf zwei Kanäle:

-   stdout ist die normale Ausgabe, zum Beispiel Ergebnisse, Listen, Status
-   stderr ist für Fehlermeldungen und Diagnose gedacht

In Bash sind diese Kanäle als sogenannte File Descriptors nummeriert:

-   `1` ist stdout
-   `2` ist stderr

Das ist der Hintergrund für die Zahlen in `2>&1`.

## Was "2>&1" wörtlich bedeutet

`2>&1` heißt: leite den File Descriptor 2 so um, dass er auf denselben Ort zeigt wie File Descriptor 1.

-   `2>` ist die Umleitung von stderr
-   `&1` bedeutet "auf File Descriptor 1 zeigen", nicht auf eine Datei mit dem Namen `1`

Damit landen Fehler und normale Ausgabe im gleichen Stream.

## Praxisbeispiel: Alles in eine Datei schreiben

Ohne `2>&1` würdest du nur stdout umleiten, stderr bliebe im Terminal:

```bash
mycmd > output.log
```

Mit `2>&1` geht beides in die Datei:

```bash
mycmd > output.log 2>&1
```

Das ist typisch, wenn du Logs sammeln willst.

## Häufigste Nutzung: Output unterdrücken, aber Exit-Code nutzen

Viele Skripte wollen prüfen, ob ein Kommando existiert oder erfolgreich war, ohne Output zu zeigen. Dann siehst du oft:

```bash
command -v git >/dev/null 2>&1
```

-   `>/dev/null` schickt stdout ins Nichts
-   `2>&1` schickt stderr an denselben Ort wie stdout, also ebenfalls ins Nichts

So bleibt das Terminal ruhig, aber du kannst weiterhin den Exit-Code abfragen.

## Die Falle: Reihenfolge ist entscheidend

Redirects werden von links nach rechts ausgewertet. Deshalb ist das hier korrekt:

```bash
mycmd >/dev/null 2>&1
```

Und das hier macht etwas anderes:

```bash
mycmd 2>&1 >/dev/null
```

Warum? In der zweiten Variante wird zuerst stderr auf den aktuellen stdout umgeleitet, der zu diesem Zeitpunkt noch das Terminal ist. Erst danach wird stdout nach `/dev/null` umgeleitet. Ergebnis: stdout ist weg, aber stderr kann weiterhin im Terminal landen.

Wenn du dir nur eine Regel merken willst: Erst stdout umleiten, dann stderr "dazuhängen".

## Kurzvarianten und moderne Schreibweisen

Du wirst auch diese Form sehen:

```bash
mycmd &>/dev/null
```

Das ist eine Bash-spezifische Kurzschreibweise und leitet stdout und stderr gemeinsam um. Sie ist bequem, aber weniger portabel, wenn du in anderen Shells landen könntest.

Für Skripte, die klar als Bash laufen, ist das völlig okay. Für maximale Klarheit und Wiedererkennung bleibt `>/dev/null 2>&1` ein guter Standard.

## Mini-Beispiel zum Ausprobieren

```bash
#!/usr/bin/env bash

echo "stdout: Hallo"
echo "stderr: Fehler" >&2
```

Aufruf mit Redirect:

```bash
./demo.sh > out.log 2>&1
```

Danach steht beides in `out.log`.

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
