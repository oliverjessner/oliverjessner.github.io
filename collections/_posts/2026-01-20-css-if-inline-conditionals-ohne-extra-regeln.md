---
layout: post
title: 'CSS if(): Inline Conditionals ohne Extra Regeln'
date: 2026-01-20 15:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - css
    - web-development
    - software-development
description: 'CSS bekommt mit if() Inline-Conditionals: Werte direkt in einer Property wählen, mit Syntax, Use Cases, Fallbacks und aktuellem Browser-Stand'
thumbnail: '/assets/images/gen/blog/css-if-inline-conditionals-ohne-extra-regeln/header_thumbnail.webp'
image: '/assets/images/gen/blog/css-if-inline-conditionals-ohne-extra-regeln/header.webp'
---

[CSS](https://oliverjessner.at/category/css/) kann seit Jahren Bedingungen über @media und @supports. Neu ist der nächste Schritt: if() als Inline-Conditional, also Logik direkt im Property-Wert. Das ändert nicht alles, aber es kann Code spürbar aufräumen.

## Was mit if() in CSS gemeint ist

if() ist eine CSS Value Function, die je nach Bedingung unterschiedliche Werte für eine einzelne Property zurückgibt. Statt einen ganzen Block zu schalten, entscheidest du direkt beim Wert.

In der Spezifikation ist if() als "Conditional Value Selection" beschrieben: Eine Liste von Statements, jeweils Bedingung, Doppelpunkt, Wert, getrennt durch Semikolons. Gewonnen hat die erste Bedingung, die zutrifft.

## Syntax in der Praxis

Das Grundmuster sieht so aus:

```css
.selector {
    property: if(condition-1: value-1; condition-2: value-2; else: fallback;);
}
```

MDN beschreibt drei Condition-Typen, die in if() genutzt werden: Style Queries, Media Queries und Feature Queries.

## Kleine Variationen direkt am Wert

Ein klassisches Beispiel ist ein Wert, der sich je nach Umgebung leicht ändert, ohne dass du einen extra Regelblock anlegen willst.

```css
.card {
    padding: if(media(width <= 600px): 12px; else: 20px;);
}
```

Das ist bewusst "feingranular": Du kapselst die Entscheidung dort, wo sie hingehört, beim Wert.

## Theming und Varianten mit Custom Properties

Spannend wird es, wenn du Varianten über Custom Properties steuerst und dann Werte gezielt auswählst. Der Chrome Artikel zeigt if() explizit als sauberes Interface fuer dynamische Styles, etwa in Kombination mit Queries.

```css
.badge {
    background: if(style(--variant: success): #1f8f4a; style(--variant: warning): #c98300; else: #6b7280;);
}
```

Das ist kein Ersatz fuer ein Design System, aber ein solides Werkzeug, um kleine Zustandslogik zu zentralisieren.

## Unterschied zu @media und @supports

@media und @supports sind weiterhin die Werkzeuge, wenn du mehrere Properties oder ganze Layoutbereiche umstellen willst. if() ist eher dann interessant, wenn nur ein einzelner Wert konditional ist und du den Kontext in einer Zeile behalten willst.

## Browser-Realitaet und Fallback

if() ist Spezifikationsarbeit, aber nicht automatisch "ueberall safe". In Chrome kann man Inline Conditionals ab Chrome 137 ausprobieren.

Praktisch heisst das: progressive Enhancement. Erst eine robuste Baseline, dann if() nur, wenn unterstuetzt.

```css
.card {
    padding: 20px;
}

@supports (padding: if(media(width <= 800px): 10px; else: 20px;)) {
    .card {
        padding: if(media(width <= 800px): 10px; else: 20px;);
    }
}
```

Warnhinweis: Wenn du auf iOS Safari oder Firefox Zielgruppen hast, plane mit Baselines. So bleibt das CSS lesbar, und niemand bekommt kaputte Styles.

## Fazit

if() ist kein "CSS wird zur Programmiersprache" Moment, sondern ein neues Werkzeug fuer sauberere, lokale Entscheidungen in Property-Werten. Wer es sparsam einsetzt und mit Fallbacks kombiniert, bekommt weniger doppelte Regeln und klareren CSS Kontext.
