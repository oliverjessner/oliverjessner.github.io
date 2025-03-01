---
layout: post
title: 'CSS Scroll-Snapping: Dein Schlüssel zu einer Faszinierenden Slider-UX'
date: 2023-12-22 00:00:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - web-development
    - css
description: 'wipe, Scroll, Snap: CSS zaubert Magie für deinen Slider! Wir sehen uns an wie schnell und einfach ein Slider in puren CSS erstellt werden kann.'
thumbnail: '/assets/images/gen/blog/scroll-to-snap/header_thumbnail.webp'
image: '/assets/images/gen/blog/scroll-to-snap/header.webp'
---

## Snap to was?

Hast du gewusst, dass CSS eine Scroll-to-Snap-Funktion hat? Lass uns einen Blick darauf werfen, wie wir diese Funktion nutzen können, um einen Slider mit verschiedenen Inhalten benutzerfreundlich zu gestalten.

## Du bist eher der Video Typ?

Dann schau dir doch das YouTube Video dazu an!

<iframe width="560" height="315" src="https://www.youtube.com/embed/5gN5xbuHG7k?si=uzb-nKUxpm7baTjc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Scroll to Snap für eine verbesserte Benutzererfahrung

Ein Slider sollte nicht nur visuell ansprechend sein, sondern sich auch nahtlos und intuitiv bedienen lassen. Hier kommt die CSS-Scroll-to-Snap-Funktion ins Spiel.

Um dies zu erreichen, benötigen wir HTML-Container mit spezifischen CSS-Klassen:

```html
<div class="container x mandatory-scroll-snapping" dir="ltr">
    <div class="snap-item"><img alt="a pizza" src="imgs/pizza.webp" /></div>
    <div class="snap-item"><img alt="a lasagna" src="imgs/lasagna.webp" /></div>
    <div class="snap-item"><img alt="a risotto" src="imgs/risotto.webp" /></div>
    <div class="snap-item"><img alt="spaghetti" src="imgs/spaghetti.webp" /></div>
</div>

<div class="container y mandatory-scroll-snapping" dir="ltr">
    <div class="snap-item"><img alt="a pizza" src="imgs/pizza.webp" /></div>
    <div class="snap-item"><img alt="a lasagna" src="imgs/lasagna.webp" /></div>
    <div class="snap-item"><img alt="a risotto" src="imgs/risotto.webp" /></div>
    <div class="snap-item"><img alt="spaghetti" src="imgs/spaghetti.webp" /></div>
</div>
```

### Steuere das Snap-Verhalten mit CSS-Klassen

Es gibt zwei Möglichkeiten, das Snap-Verhalten zu steuern: mit `mandatory` und `proximity`.

```css
.mandatory-scroll-snapping {
    scroll-snap-type: x mandatory;
}

.proximity-scroll-snapping {
    scroll-snap-type: y proximity;
}
```

### Richtung des Snaps anpassen

Du kannst auch die Richtung des Snaps beeinflussen, indem du das HTML-Attribut `dir` verwendest. Zum Beispiel für von links nach rechts (ltr steht für left to right):

```html
<div class="container x mandatory-scroll-snapping" dir="ltr"></div>
```

Oder von rechts nach links (rtl steht für right to left):

```html
<div class="container x mandatory-scroll-snapping" dir="rtl"></div>
```

### Vertikalen Snap hinzufügen

Die Funktion funktioniert nicht nur in der horizontalen Achse, sondern auch in der vertikalen. Hierzu verwende die Klasse `y` und passe das CSS entsprechend an:

```css
.y {
    flex-flow: column nowrap;
    overflow-x: hidden;
}
```

### Feinabstimmung mit `mandatory` oder `proximity`

Für die vertikale Achse kannst du den `scroll-snap-type` auf `y` einstellen und zwischen `mandatory` und `proximity` wählen:

```css
.y.mandatory-scroll-snapping {
    scroll-snap-type: x mandatory;
}
```

### Bonus-Tipp: Dev Tools Scroll-Snap-Badge

In den Entwicklertools gibt es einen eigenen Scroll-Snap-Badge. Damit kannst du leicht herausfinden, wie viele Elemente sich noch rechts, links, oben oder unten befinden.
Der badge sieht so aus:
![ein screenshot der chrome dev tools](/assets/images/gen/blog/scroll-to-snap/dev-tools.webp)

Und unsere Items werden dann mit lila Linien markiert:

![ein screenshot des scroll-snap features in den dev tools](/assets/images/gen/blog/scroll-to-snap/scoll-snap-mid.webp)

### Fazit

Sehr cooles und einfaches Feature, das du in deinen Projekten verwenden kannst. Ich denke
da an Slider wie in Instagram oder slider für Produkte einer E-Commerce Seite.

PS: Schon den letzten Post über [CSS nesting](https://oliverjessner.at/blog/2023-12-21-css-nesting/) gelesen? Wenn nicht, dann schau doch mal rein!
