---
layout: post
title: 'corner-shape in CSS: Ecken jenseits von border-radius'
date: 2026-01-20 10:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - css
    - web-development
    - software-development
description: 'corner-shape erweitert border-radius um neue Ecken wie bevel, notch oder squircle, mit Beispielen, Fallback und aktuellem Support-Stand'
thumbnail: '/assets/images/gen/blog/corner-shape-in-css-ecken-jenseits-von-border-radius/header_thumbnail.webp'
image: '/assets/images/gen/blog/corner-shape-in-css-ecken-jenseits-von-border-radius/header.webp'
---

Mit corner-shape kann [CSS](https://oliverjessner.at/category/css) Ecken zeichnen, die nicht nur rund sind: abgeschrägt, eingekerbt oder konkav. Das funktioniert zusammen mit border-radius und eignet sich gut als progressive Enhancement.

## Was ist corner-shape

corner-shape ist eine CSS Property, die die Form von Ecken definiert, innerhalb des Bereichs, den border-radius vorgibt. Wichtig ist der mentale Rahmen: border-radius bestimmt die Größe der Ecke, corner-shape bestimmt die Geometrie dieser Ecke. Ohne border-radius hat corner-shape keinen Effekt.

corner-shape ist ein Shorthand und kann wie border-radius ein bis vier Werte annehmen. Damit kannst du gleiche Ecken setzen oder pro Ecke variieren.

Typische Keyword Werte sind unter anderem round, square, bevel, notch, scoop und squircle. Für feinere Kontrolle gibt es außerdem superellipse(), wobei die Keywords jeweils einer superellipse() Form entsprechen.

## Was kann man damit praktisch bauen

### 1) Snipped Corners, also abgeschnittene Ecken

Das klassische Pattern: Eine Karte wirkt weniger "rounded UI" und mehr technisch, ohne SVG oder Masking.

```css
.card {
    border-radius: 20px;
    corner-shape: bevel;
    border: 1px solid currentColor;
}
```

bevel zieht eine Gerade zwischen die beiden Endpunkte, die border-radius definiert.

![](/assets/images/gen/blog/corner-shape)

### 2) Konkave Ecken für Panels und Callouts

Mit scoop bekommst du eine nach innen gezogene Ecke. Das ist ein Effekt, der mit border-radius allein nicht möglich ist.

```css
.panel {
    border-radius: 24px;
    corner-shape: scoop;
    box-shadow: 0 10px 30px rgb(0 0 0 / 0.12);
}
```

MDN zeigt explizit, dass border, shadow und backgrounds der Corner Form folgen, was den Effekt konsistent macht.

### 3) Unterschiedliche Ecken pro Seite, ohne Zusatz-Markup

Du kannst corner-shape wie border-radius mit mehreren Werten schreiben. Das ist hilfreich für Tags, Buttons oder Karten, die nur an einer Seite "geknickt" wirken sollen.

```css
.pill {
    border-radius: 16px 40px 40px 16px / 16px 50% 50% 16px;
    corner-shape: round bevel bevel round;
}
```

Das Pattern funktioniert, weil border-radius die Eckregionen unterschiedlich groß macht, während corner-shape die Form der jeweiligen Eckregion zeichnet.

### 4) Squircle Buttons und App Icon Look

squircle ist interessant, wenn du diese weicheren, "geglätteten" Ecken willst, die man aus App Icons und modernen UI Kits kennt.

```css
.button {
    border-radius: 28px;
    corner-shape: squircle;
    padding: 0.8rem 1.1rem;
}
```

corner-shape kann hier den Unterschied machen zwischen "rund" und "organisch glatt".

## Animationen: Corner Formen als UI Signal

corner-shape lässt sich animieren, weil intern superellipse() Formen als Interpolationsbasis dienen. Damit sind subtile Zustandswechsel möglich, zum Beispiel hover von round zu squircle oder notch.

```css
.tile {
    border-radius: 24px;
    corner-shape: round;
    transition: corner-shape 180ms ease;
}

.tile:hover {
    corner-shape: squircle;
}
```

## Browser Support: unbedingt als progressive Enhancement denken

Aktuell ist die Unterstützung noch eingeschränkt. Ein pragmatischer Ansatz ist: border-radius als Baseline, corner-shape nur dort, wo es unterstützt wird. LogRocket nennt als Beispiel Support ab Chrome 139 und Chromium Browsers wie Edge und Opera.

```css
.box {
    border-radius: 20px;
}

@supports (corner-shape: squircle) {
    .box {
        corner-shape: squircle;
    }
}
```

So bleibt das Design überall brauchbar, und moderne Browser bekommen den Bonus.

## Fazit

corner-shape ist kein Ersatz für gutes Layout oder gute Typografie, aber ein sauberer Baustein für UI Details, die bisher oft SVG oder zusätzliche Wrapper gebraucht hätten. Wer es als progressive Enhancement einsetzt, kann damit Ecken gezielt als Gestaltungssignal nutzen, ohne das CSS kompliziert zu machen.
