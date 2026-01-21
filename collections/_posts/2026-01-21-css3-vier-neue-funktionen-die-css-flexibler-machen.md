---
layout: post
title: 'CSS3 – vier neue Funktionen, die CSS flexibler machen'
date: 2026-01-21 13:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - css
    - web-development
    - software-development
description: 'Vier neue CSS-Features machen Layout und Styling dynamischer, ohne dass jede Kleinigkeit in JavaScript landen muss'
thumbnail: '/assets/images/gen/blog/css3-vier-neue-funktionen-die-css-flexibler-machen/header_thumbnail.webp'
image: '/assets/images/gen/blog/css3-vier-neue-funktionen-die-css-flexibler-machen/header.webp'
---

[CSS](https://oliverjessner.at/category/css/) wirkt oft statisch, bis man es mit echten UI-Zuständen füttert. Vier neue Funktionen und Properties schließen genau diese Lücke, ohne dass sofort JavaScript zum Klebstoff wird.

## sibling-count(): CSS kennt die Anzahl der Geschwister

`sibling-count()` liefert eine Zahl: wie viele Geschwisterelemente ein Element hat, inklusive sich selbst. Das klingt banal, ist aber für Layouts und Berechnungen Gold wert, weil es endlich eine fehlende Information direkt in CSS verfügbar macht.

Ein typischer Use Case ist eine Liste, deren Items sich automatisch die Breite teilen, egal ob drei oder neun Elemente gerendert werden:

```css
/* Dynamische Spaltenbreite pro Item */
.list {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
}

.list > li {
    width: calc(100% / sibling-count());
}
```

Zum Deep-Dive geht es [hier](https://oliverjessner.at/blog/2026-01-21-sibling-count-css-zaehlt-geschwisterelemente-ohne-javascript/)

## attr(): Attribute-Werte in CSS nutzen

`attr()` ist nicht neu, aber es wird an einer Stelle endlich interessanter: Attribute-Werte sollen nicht nur als Text in `content` landen, sondern auch als "echte" Werte in Properties, etwa als Länge oder Farbe.

Im etablierten Bereich bleibt `attr()` ein zuverlässiger Trick für UI-Metadaten, die du im Markup pflegst und im Styling sichtbar machen willst:

```css
/* UI-Hinweis aus einem Attribut ausgeben */
.badge::after {
    content: attr(data-label);
    font-size: 0.85rem;
}
```

Zum Deep-Dive geht es [hier](https://oliverjessner.at/blog/2026-01-20-css-attr-attribute-werte-in-css-nutzen/)

## if(): Inline-Conditionals ohne Extra Regeln

Bisher war "wenn X, dann Y" in CSS oft ein Puzzle aus zusätzlichen Selektoren, Kaskade-Tricks oder Variablen. `if()` bringt echte Conditionals in Property Values.

Das Besondere: Die Tests können sich an Style Queries, Media Queries oder Feature Queries orientieren. Damit lässt sich beispielsweise eine Farbe oder ein Spacing direkt dort entscheiden, wo der Wert gebraucht wird.

```css
/* Beispiel: abhängig von einer Custom Property ein anderes Hintergrundbild */
.panel {
    background-image: if(
        style(--scheme: ice): linear-gradient(#caf0f8, white, #caf0f8) ;
            style(--scheme: fire): linear-gradient(#ffc971, white, #ffc971) ; else: none;
    );
}
```

Zum Deep-Dive geht es [hier](https://oliverjessner.at/blog/2026-01-20-css-if-inline-conditionals-ohne-extra-regeln/)

## corner-shape: Ecken jenseits von border-radius

`border-radius` kennt nur eine Art von Rundung. `corner-shape` setzt genau dort an: Es verändert die Form bereits gerundeter Ecken und ermöglicht Varianten wie bevel, notch oder squircle.

Wichtig dabei: Ohne `border-radius` (oder wenn es auf 0 hinausläuft) hat `corner-shape` keinen Effekt. Praktisch heißt das: Du brauchst beides.

```css
/* Formbare Ecken: border-radius definiert die Größe, corner-shape die Geometrie */
.card {
    border-radius: 20px;
    corner-shape: bevel;
    box-shadow: 0 8px 24px rgb(0 0 0 / 0.12);
}
```

Auch hier gilt: Erst sinnvoller Default, dann Enhancement.

```css
.card {
    border-radius: 20px;
}

@supports (corner-shape: bevel) {
    .card {
        corner-shape: squircle;
    }
}
```

Zum Deep-Dive geht es [hier](https://oliverjessner.at/blog/2026-01-20-corner-shape-in-css-ecken-jenseits-von-border-radius/)
