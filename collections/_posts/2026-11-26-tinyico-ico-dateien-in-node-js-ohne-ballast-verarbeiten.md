---
layout: post
title: tinyico – ICO-Dateien in Node.js ohne Ballast verarbeiten
date: 2026-11-26 11:51:48 +0100
authors:
  - oliver_jessner
meta_og_type: article
categories:
  - javascript
  - software-development
  - web-development
description: Warum ich tinyico für ICO-Dateien in Node.js geschrieben habe und was die Bibliothek ohne externe Laufzeitabhängigkeiten kann
thumbnail: /assets/images/gen/blog/tinyico-ico-dateien-in-node-js-ohne-ballast-verarbeiten/header_thumbnail.webp
image: /assets/images/gen/blog/tinyico-ico-dateien-in-node-js-ohne-ballast-verarbeiten/header.webp
faq:
  - question: Was ist tinyico?
    answer: tinyico ist eine Node.js-Bibliothek zum Lesen, Extrahieren und Erstellen von ICO- und CUR-Dateien.
  - question: Hat tinyico externe Abhängigkeiten?
    answer: tinyico hat keine externen Laufzeitabhängigkeiten und verwendet Funktionen, die Node.js mitbringt.
  - question: Kann tinyico Bilder automatisch skalieren?
    answer: Nein. tinyico wählt vorhandene Bilder aus einem Icon-Container aus oder schreibt bereitgestellte Bilder hinein. Es skaliert sie nicht.
socialmedia:
  - Ich wollte ICO-Dateien in Node.js verarbeiten, ohne dafür einen halben Werkzeugkasten zu installieren. Also habe ich tinyico geschrieben.
  - Ein Favicon extrahieren sollte kein Großprojekt sein. tinyico verarbeitet ICO- und CUR-Dateien ohne externe Laufzeitabhängigkeiten.
  - tinyico liest und erstellt ICO-Dateien für Node.js. Warum ich die Bibliothek gebaut habe und wo ihre Grenzen liegen.
news: true
pinned: false
ads: true
image_width: 1280
image_height: 720
---

Ein Favicon extrahieren und dabei erst einmal eine halbe Bildbearbeitung installieren? Darauf hatte ich keine Lust. Deshalb gibt es tinyico für Node.js.

## Warum ich tinyico geschrieben habe

Ich wollte ICO-Dateien verarbeiten. Die Bibliotheken, auf die ich dabei gestoßen bin, waren mir für meinen Anwendungsfall entweder zu langsam oder brachten zu viele externe Abhängigkeiten mit.

Das heißt nicht, dass diese Bibliotheken schlecht sind. Wer Bilder in vielen Formaten bearbeiten, skalieren und konvertieren muss, braucht möglicherweise genau diesen Funktionsumfang. Ich wollte allerdings vor allem mit Icon-Dateien arbeiten. Dafür schien mir ein kleineres Werkzeug sinnvoll.

Das Ergebnis ist [tinyico](https://github.com/oliverjessner/tinyico): eine Bibliothek für [JavaScript](https://oliverjessner.at/category/javascript/) und Node.js, die ICO- und CUR-Dateien liest, Bilder daraus extrahiert und solche Container erstellt. Sie setzt Node.js 26 oder neuer voraus und hat keine externen Laufzeitabhängigkeiten.

## Was steckt in einer ICO-Datei?

Eine ICO-Datei ist ein Container für ein oder mehrere Bilder. Ein Favicon kann darin beispielsweise in verschiedenen Größen liegen. Das ist praktisch, weil ein Programm aus den vorhandenen Varianten eine passende auswählen kann.

Neben ICO unterstützt tinyico auch CUR-Dateien für Mauszeiger. Sie enthalten zusätzlich Informationen zum sogenannten Hotspot: dem Punkt im Bild, an dem sich der Mauszeiger tatsächlich befindet.

Die Bilder innerhalb solcher Dateien können unterschiedlich gespeichert sein. tinyico reicht eingebettete PNGs ohne erneute Komprimierung weiter. Unterstützte ältere Windows-DIB-Bilder wandelt die Bibliothek bei der Extraktion in PNG um. Die Einzelheiten und unterstützten Formate stehen im [Repository](https://github.com/oliverjessner/tinyico).

## tinyico installieren und ein Favicon extrahieren

Die Installation erfolgt über npm:

```bash
npm install @oliverj/tinyico
```

Das folgende Beispiel liest eine ICO-Datei und speichert ein enthaltenes Bild als PNG:

```javascript
import { readFileSync, writeFileSync } from "node:fs";
import { extractIco } from "@oliverj/tinyico";

const ico = readFileSync("favicon.ico");
const png = extractIco(ico, { size: 32 });

writeFileSync("icon.png", png);
```

Die Option `size: 32` fordert ein Bild für die Größe 32 × 32 Pixel an. tinyico wählt dafür einen passenden vorhandenen Eintrag aus. Es skaliert das Bild nicht. Ist keine exakte Größe enthalten, kann das Ergebnis also andere Abmessungen haben.

## Eine ICO-Datei aus PNGs erstellen

Auch der umgekehrte Weg ist möglich. Dieses Beispiel fasst drei bereits vorbereitete PNG-Dateien in einem ICO-Container zusammen:

```javascript
import { readFileSync, writeFileSync } from "node:fs";
import { encodeIco } from "@oliverj/tinyico";

const ico = encodeIco([
    { buffer: readFileSync("16.png") },
    { buffer: readFileSync("32.png") },
    { buffer: readFileSync("256.png") },
]);

writeFileSync("favicon.ico", ico);
```

Die PNGs müssen bereits in den gewünschten Größen vorliegen. Automatisches Skalieren gehört nicht zum Funktionsumfang.

## Weniger Abhängigkeiten, klarer Umfang

Keine externen Laufzeitabhängigkeiten zu haben, macht eine Bibliothek nicht automatisch schneller oder fehlerfrei. Für mich bedeutet es vor allem, dass für diese Aufgabe weniger fremder Code mitinstalliert und gepflegt werden muss. tinyico nutzt stattdessen Funktionen aus Node.js.

Auch bei der Geschwindigkeit kommt es auf den konkreten Einsatz an. Das Repository enthält [Benchmarks](https://github.com/oliverjessner/tinyico/blob/main/BENCHMARKS.md). Ob die Ergebnisse für ein eigenes Projekt relevant sind, lässt sich am besten mit den eigenen Dateien und Arbeitsabläufen prüfen.

**Hinweis:** tinyico arbeitet synchron. Während ein Aufruf läuft, blockiert er den Event Loop von Node.js. Bei vielen Dateien oder in einem Server, der gleichzeitig Anfragen bearbeitet, sollte man das bei der Integration berücksichtigen.

## Für wen ist tinyico gedacht?

tinyico passt, wenn eine Anwendung ICO- oder CUR-Dateien gezielt untersuchen, Bilder daraus extrahieren oder vorhandene Bilder in einen Icon-Container schreiben soll. Das kann bei einem Favicon-Werkzeug, einem Importskript oder einem Projekt im [Web Development](https://oliverjessner.at/category/web-development/) nützlich sein.

Wer Bilder zuschneiden, skalieren oder umfassend zwischen Formaten konvertieren möchte, braucht zusätzliche Werkzeuge. Diese Grenze ist Absicht. Ich wollte eine Bibliothek, die sich um Icon-Container kümmert und dabei überschaubar bleibt.

Der Code, die API-Dokumentation und die unterstützten Formate sind auf [GitHub](https://github.com/oliverjessner/tinyico) zu finden.
