---
layout: post
title: 'CSS attr(): Attribute-Werte in CSS nutzen'
date: 2026-01-20 10:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - css
    - web-development
    - software-development
description: 'attr() zieht HTML-Attribute ins CSS: von content Labels bis zu typisierten Werten fuer Farbe, Laenge und Zahlen, mit sauberem Fallback'
thumbnail: '/assets/images/gen/blog/css-attr-attribute-werte-in-css-nutzen/header_thumbnail.webp'
image: '/assets/images/gen/blog/css-attr-attribute-werte-in-css-nutzen/header.webp'
---

attr() ist eine kleine [CSS](https://oliverjessner.at/category/css/)-Funktion mit grosser Wirkung: Sie kann Attribute aus dem HTML lesen und in CSS nutzen. Lange war das praktisch nur fuer content, inzwischen wird es deutlich interessanter.

## Was macht attr()

attr() liest den Wert eines Attributes des aktuell selektierten Elements und setzt ihn als CSS-Wert ein. Du kennst das Prinzip vielleicht von var(), nur dass die Quelle hier nicht eine Custom Property ist, sondern ein echtes HTML-Attribut wie title, aria-label oder data-\*.

Der klassische Einstieg sieht so aus:

```css
a::after {
    content: ' (' attr(href) ')';
}
```

Damit kannst du zum Beispiel Links im Print-Layout oder in Demos sichtbar machen, ohne den Text im HTML zu duplizieren.

## Der klassische Einsatz: Labels und Badges ohne doppelten Content

Ein typisches Pattern ist ein kleines Label aus data-\*:

```html
<button class="btn" data-state="beta">Feature</button>
```

```css
.btn::after {
    content: attr(data-state);
    margin-left: 0.5rem;
    font-size: 0.75rem;
    opacity: 0.75;
}
```

Das ist simpel und alltagstauglich, solange du dir klar machst, dass es nur dekorativ ist. Inhalt, der fuer Verstaendnis oder Barrierefreiheit wichtig ist, gehoert ins HTML, nicht in ::before oder ::after.

## Warum attr() lange als "limitiert" galt

Viele verbinden attr() mit einer Enttaeuschung: Es funktionierte zuverlaessig im content, aber nicht als echter Zahlen-, Laengen- oder Farbwert in beliebigen Properties. Man konnte also nicht sauber sagen: nutze data-size als width oder data-color als color.

Genau das war der Knackpunkt, wenn man attr() als Bruecke zwischen Markup und Styling nutzen wollte.

## Das Upgrade: attr() mit Typ und Fallback

Mit der neueren Richtung in CSS kann attr() Werte nicht nur als String behandeln, sondern typisiert parsen. Dann wird aus einem data-Attribut ein echter <color>, <length> oder <number>.

Das Prinzip: Du gibst an, wie der Attributwert interpretiert werden soll und was passieren soll, wenn das Parsing scheitert.

Beispiel fuer Farbe:

```html
<div class="tag" data-color="rebeccapurple">UX</div>
```

```css
.tag {
    color: attr(data-color type(<color>), #111);
}
```

Wenn data-color kein gueltiger Farbwert ist, greift der Fallback.

Beispiel fuer Laenge:

```html
<div class="bar" data-w="72%"></div>
```

```css
.bar {
    width: attr(data-w type(<length-percentage>), 0%);
    height: 10px;
    background: currentColor;
}
```

Damit wird attr() von "Text in content" zu einem Baustein fuer datengetriebene Darstellung, ohne direkt in JavaScript zu gehen.

## Use Cases, die wirklich Sinn ergeben

## Kleine visuelle Parameter aus dem Markup

Wenn dein HTML ohnehin Daten traegt, etwa aus einem CMS oder einem Generator, kann attr() fuer die Darstellung helfen, ohne dass du fuer jeden Fall eine Klasse erzeugst. Das ist besonders praktisch bei Komponenten, die viele Varianten haben, aber nur ein oder zwei Parameter variieren.

## Debug Views und Dokumentation

attr() eignet sich gut, um Informationen sichtbar zu machen, die im DOM schon vorhanden sind: IDs, Statuswerte, Versionen, Feature Flags. Das kann die [Entwicklung](https://oliverjessner.at/category/software-development/) vereinfachen, ohne dass du Debug-Text ins HTML schreibst.

## Progressive Enhancement statt Abhaengigkeit

Auch mit dem Upgrade gilt: Plane mit Fallback. Ein Baseline-Wert sorgt dafuer, dass die UI nicht bricht, wenn attr() nicht wie erwartet greift.

```css
.tag {
    color: #111;
}

@supports (color: attr(data-color type(<color>), #111)) {
    .tag {
        color: attr(data-color type(<color>), #111);
    }
}
```

## Grenzen, die du einplanen solltest

Warnhinweis: Browser Support ist nicht ueberall gleich. Nutze attr() als Enhancement, nicht als einzige Quelle fuer kritische Darstellung.

Und: attr() ist keine Sicherheitsgrenze. Wenn ein Attribut aus untrusted Input kommt, musst du die Werte an der Quelle validieren. CSS kann dir nicht garantieren, dass ein semantisch sinnvoller Wert ankommt.

## Fazit

attr() war lange ein netter Trick fuer content. Mit typisierten Werten wird es zu einem Werkzeug, das Markup und Styling sauberer verbinden kann, solange du Fallbacks setzt und die Grenzen im Blick behaeltst.
