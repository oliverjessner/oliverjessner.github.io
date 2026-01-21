---
layout: post
title: 'sibling-count() – CSS zählt Geschwisterelemente ohne JavaScript'
date: 2026-01-21 11:03:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - css
    - web-development
    - software-development
description: 'Mit sibling-count() wird CSS plötzlich „zählfähig“: Layouts passen sich an die Anzahl der Elemente an, ganz ohne JS und ohne starre Breakpoints'
thumbnail: '/assets/images/gen/blog/sibling-count-css-zaehlt-geschwisterelemente-ohne-javascript/header_thumbnail.webp'
image: '/assets/images/gen/blog/sibling-count-css-zaehlt-geschwisterelemente-ohne-javascript/header.webp'
---

Manchmal fehlt [CSS](https://oliverjessner.at/category/css/) nur eine Kleinigkeit, um wirklich dynamisch zu werden: zählen. Genau das liefert `sibling-count()`, und plötzlich werden Layouts einfacher, die sonst nach [JavaScript](https://oliverjessner.at/category/javascript/) riechen.

## Was sibling-count() macht

`sibling-count()` ist eine CSS-Funktion, die eine Zahl zurückgibt: die Anzahl der Geschwisterelemente eines Elements, inklusive des Elements selbst. Praktisch gedacht: Ein Listenelement kann fragen "Wie viele sind wir in dieser Liste?"

Das Ergebnis ist eine Ganzzahl. Damit eignet sich die Funktion gut für Berechnungen in `calc()`, für Größen, Abstände, Animationen oder auch Farbverläufe, die sich automatisch an die Menge der Elemente anpassen.

Wenn du dich fragst, wo das einzuordnen ist: Es ist nicht der nächste Selector-Trick wie `:nth-child()`, sondern ein Zahlenwert, den du direkt in Properties verwenden kannst.

## Syntax und erste Stolpersteine

Die Syntax ist unspektakulär:

```css
selector {
    --count: sibling-count();
}
```

Wichtig ist, was gezählt wird:

- Es geht um Element-Geschwister, also direkte Kinder desselben Eltern-Elements
- Textknoten oder Kommentare spielen hier keine Rolle
- Das Element zählt mit, daher ist das Minimum 1

## Praxisbeispiel 1: Spaltenbreite automatisch aus der Anzahl ableiten

Das klassische Beispiel ist eine horizontale Liste, bei der jedes Item genau gleich viel Platz bekommt, egal ob es 3 oder 9 Elemente sind.

```css
.list {
    display: flex;
    gap: 0;
    padding: 0;
    margin: 0;
    list-style: none;
}

.list > li {
    width: calc(100% / sibling-count());
}
```

Beispiel:

<ul class="list">
<li>CSS</li>
<li>HTML</li>
<li>JavaScript</li>
<li>PHP</li>
</ul>
<style>
.list {
    display: flex;
    gap: 0;
    padding: 0;
    margin: 0;
    list-style: none;
}

.list > li {
width: calc(100% / sibling-count());
}
</style>

## Praxisbeispiel 2: Abstände und Größen, die „mitwachsen“

Manchmal soll ein Element kleiner werden, wenn viele Geschwister vorhanden sind. Auch das ist mit einer simplen Formel möglich.

```css
.cards > * {
    --n: sibling-count();
    padding: calc(24px - (var(--n) * 1px));
    border-radius: calc(16px - (var(--n) * 0.2px));
}
```

Beispiel

<style>
.cards > * {
    --n: sibling-count();
    padding: calc(24px - (var(--n) * 1px));
    border-radius: calc(16px - (var(--n) * 0.2px));
}
.inner-card {
    background-color: red;
    margin: 2px;
}
.bttn {
    padding: 12px 20px;
    margin: 10px;
    border-radius: 10px;
}
</style>
<div class="cards">
    <div class="inner-card">card Height:<span></span></div>
    <div class="inner-card">card Height:<span></span></div>
    <div class="inner-card">card Height:<span></span></div>
    <div class="inner-card">card Height:<span></span></div>
</div>
<button class="add-bttn bttn">add</button>
<button class="remove-bttn bttn">remove</button>
<br/>
<script type="text/javascript" src="/assets/js/blog/count-sibling.js"></script>

Das ist kein Ersatz für Design-Entscheidungen, aber als sanfter Automatismus für Komponenten kann es sinnvoll sein.

## Praxisbeispiel 3: Staggered Animation ohne Hardcoding

Wenn du zusätzlich `sibling-index()` nutzt, bekommst du Index und Gesamtanzahl. Damit lassen sich saubere Stagger-Effekte bauen, ohne dass du pro Element eine Klasse oder Inline-Variable setzen musst.

```css
.menu > a {
    animation: fade-in 240ms ease both;
    animation-delay: calc((sibling-index() - 1) * 40ms);
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(6px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

`sibling-count()` brauchst du für Stagger nicht zwingend, aber in Kombination wird es interessant, etwa wenn du die Dauer oder den Offset relativ zur Gesamtanzahl skalieren willst.

## Warnhinweis: Browser-Support ist aktuell der Haken

`sibling-count()` ist ein modernes Feature und funktioniert nicht überall. In der Praxis bedeutet das: Du solltest es als Progressive Enhancement behandeln.

Das heißt konkret:

- Plane ein Fallback ein, wenn das Layout kritisch ist
- Nutze Feature Queries, um nur dort umzuschalten, wo es unterstützt wird

Ein defensives Muster sieht so aus:

```css
.list > li {
    width: 100%;
}

@supports (width: calc(100% / sibling-count())) {
    .list > li {
        width: calc(100% / sibling-count());
    }
}
```

Damit bekommen nicht unterstützende Browser ein stabiles, wenn auch weniger dynamisches Layout.

## Fallback-Strategien, wenn du heute shippen willst

Wenn du die Idee sofort nutzen möchtest, aber der Support noch nicht reicht, gibt es zwei pragmatische Alternativen.

### Option 1: Quantity Queries mit :nth-child()

Mit `:nth-child()` und `:nth-last-child()` lässt sich „Anzahl“ indirekt abbilden, aber der Preis ist Wartbarkeit. Du brauchst Regeln für Bereiche, etwa "bis 6 Elemente", "bis 10 Elemente" und so weiter.

Das funktioniert, ist aber schnell ein CSS-Regelwald.

### Option 2: JavaScript setzt eine CSS-Variable

Wenn du ohnehin etwas JS im Stack hast, ist das oft die pragmatischste Lösung: Einmal beim Rendern zählen und als Custom Property an den Parent hängen.

```js
document.querySelectorAll('.list').forEach(el => {
    el.style.setProperty('--count', el.children.length);
});
```

```css
.list > li {
    width: calc(100% / var(--count, 1));
}
```

Das bleibt überschaubar und funktioniert überall. Sobald `sibling-count()` breit verfügbar ist, kannst du das JS wieder entfernen.

## Fazit

`sibling-count()` ist eine dieser kleinen CSS-Funktionen, die sich im Alltag schnell groß anfühlen. Du bekommst eine Zahl, direkt im Stylesheet, und kannst Komponenten bauen, die sich an ihre Inhalte anpassen, ohne zusätzliche Klassen, ohne Sonderlogik und oft ohne JavaScript.
