---
layout: post
title: Die faszinierende Welt der Farben - Ein Leitfaden für Programmierer und Designer
date: 2024-11-05 10:00:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - UX
description: 'Farben begegnen uns überall – doch was genau steckt eigentlich dahinter? Dieser Blogpost beleuchtet die grundlegende Funktionsweise von Farben und geht dabei auf Themen wie Wellenlängen, das RGB-Farbmodell und die Geheimnisse hinter Hex-Werten ein.'
thumbnail: '/assets/images/gen/blog/wie-funktionieren-farben/header_thumbnail.webp'
image: '/assets/images/gen/blog/wie-funktionieren-farben/header.webp'
---

## Licht und Farben: Die Grundlagen

Licht besteht aus elek0tromagnetischen Wellen, die verschiedene Wellenlängen haben. Diese Wellenlänge bestimmt die Farbe, die wir wahrnehmen: Kurze Wellenlängen erscheinen blau, während lange Wellenlängen rot wirken. Unser Auge nimmt jedoch nur einen kleinen Bereich dieser Wellen wahr, das sogenannte sichtbare Spektrum (ca. 380 bis 700 Nanometer). Wenn Licht auf ein Objekt trifft, werden bestimmte Wellenlängen reflektiert – und genau diese Wellenlängen sind das, was wir als Farbe sehen. Zum Beispiel reflektiert ein roter Apfel vor allem rote Wellenlängen.

### Farben auf dem Display: Das RGB-Modell

Im Gegensatz zu einem gedruckten Bild, das Licht reflektiert, gibt ein Display Licht aktiv ab. Deshalb wirken Farben auf Bildschirmen auch im Dunkeln lebendig. Computerbildschirme nutzen das **RGB-Farbmodell** (Rot, Grün, Blau), um eine Vielzahl von Farben darzustellen. Durch die Mischung dieser drei Grundfarben kann das Display nahezu alle sichtbaren Farben erzeugen. Jeder der drei RGB-Kanäle hat einen Wert zwischen 0 und 255 – eine Kombination dieser Werte erzeugt verschiedene Farben.

### Pixel und Auflösung

Die kleinste Einheit eines Bildschirms ist ein **Pixel**, und die Summe aller Pixel bestimmt die Auflösung. Bei einem 4K-Display beispielsweise beträgt die Auflösung 3840 x 2160 Pixel – das sind über 8 Millionen einzelne Pixel! Jedem Pixel wird ein RGB-Wert zugeordnet, um die gewünschte Farbe darzustellen. Um eine größere Vielfalt an Farben darzustellen, ist eine höhere Farbtiefe erforderlich.

### Farbtiefe und mögliche Farben

Die Farbtiefe bestimmt, wie viele Farben ein Bildschirm darstellen kann. Aktuelle Displays haben in der Regel eine Farbtiefe von **24 Bit** – das bedeutet, dass jeder Farbkanal (Rot, Grün und Blau) 8 Bit zur Verfügung hat. Mit einer Farbtiefe von 24 Bit können insgesamt 16.777.216 Farben dargestellt werden (256 Rot x 256 Grün x 256 Blau).

### Ein Beispiel aus der Geschichte: Der Game Boy Color

Ein nostalgisches Beispiel: Der Game Boy Color hatte nur eine Auflösung von 160 x 144 Pixeln und eine Farbtiefe von 15 Bit (5 Bit pro Kanal). Damit konnte er „nur“ 32.768 Farben darstellen – für die damalige Zeit eine technische Meisterleistung, obwohl heutige Geräte viel mehr Farben anzeigen können.

### Farbmodelle: RGB, CMYK und mehr

Neben RGB gibt es weitere Farbmodelle wie **CMYK** (Cyan, Magenta, Yellow, Black), das im Druck eingesetzt wird. Während RGB durch die Addition von Licht arbeitet, nutzt CMYK die Subtraktion von Licht, indem bestimmte Wellenlängen von weißem Papier absorbiert werden. Für diesen Blogpost bleiben wir jedoch beim RGB-Modell, das in der digitalen Darstellung die Hauptrolle spielt.

### Farbwerte in Hex: #4287f5 und Co.

In der Webentwicklung begegnen uns Farben häufig als **Hex-Werte**, die das RGB-Modell in einem kompakten Format darstellen. Hex-Werte beginnen mit einem Hash-Zeichen (#) und bestehen aus sechs Stellen, die jeweils für die Rot-, Grün- und Blauwerte stehen. Ein Beispiel: Der Hex-Wert `#4287f5` bedeutet Rot = 66, Grün = 135, und Blau = 245.

Warum Hex? Die meisten Computersysteme arbeiten ohnehin mit binären und hexadezimalen Zahlen. Der Hex-Wert erlaubt uns, Farbwerte effizient darzustellen und zu speichern. Falls du einmal eine Umrechnung von RGB in Hex brauchst – einfache Tools und sogar die Google-Suche bieten hier sofort Hilfe.

Farben sind nicht nur visuell faszinierend, sondern auch ein komplexes Zusammenspiel von Physik und Technologie. Das RGB-Modell und Hex-Werte sind nur einige der Konzepte, die die Welt der digitalen Farben greifbar machen. Ob für Webdesign, Grafikdesign oder App-Entwicklung – ein fundiertes Verständnis der Farbtheorie ist ein Muss. Und wer weiß, vielleicht entdeckst du ja die nächste große Farbinnovation!

## Du bist eher der Video Typ?

Dann schau dir doch das YouTube Video dazu an!

<iframe width="560" height="315" src="https://www.youtube.com/embed/7ZfXQQtU1Eo?si=x4fLKG5hgQ_vCorC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
