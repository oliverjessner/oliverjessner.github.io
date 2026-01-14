---
layout: post
title: 'JavaScript: Auf maximal 2 Nachkommastellen runden, wenn nötig'
date: 2026-01-14 15:28:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - javascript
    - web-development
    - software-development
description: 'So rundest du Zahlen in JavaScript auf höchstens zwei Nachkommastellen, ohne immer Nullen anzuhängen, inkl. toFixed, Math.round und Intl.NumberFormat'
thumbnail: '/assets/images/gen/blog/javascript-auf-maximal-2-nachkommastellen-runden-wenn-noetig/header_thumbnail.webp'
image: '/assets/images/gen/blog/javascript-auf-maximal-2-nachkommastellen-runden-wenn-noetig/header.webp'
---

"Auf zwei Nachkommastellen runden" klingt einfach, aber in JavaScript steckt dahinter eine Designfrage: Willst du eine Zahl fürs Rechnen oder einen String fürs Anzeigen? Und soll immer exakt `2` Stellen erscheinen, oder nur dann, wenn es überhaupt Dezimalstellen gibt?

Hier geht es um "maximal 2", also keine erzwungenen Nullen.

## Schritt 0: Zahl oder Anzeige

Es gibt zwei typische Fälle:

-   Du willst weiterrechnen: Ergebnis bleibt eine Number
-   Du willst es anzeigen: Ergebnis ist meist ein String und darf lokalisiert sein

Beides ist legitim, aber du solltest es bewusst trennen.

## Variante 1: Anzeige mit Intl.NumberFormat

Für UI ist `Intl.NumberFormat` meistens die sauberste Lösung, weil du "maximal 2" direkt ausdrücken kannst.

```js
const fmt = new Intl.NumberFormat('de-AT', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});

console.log(fmt.format(12)); // "12"
console.log(fmt.format(12.3)); // "12,3"
console.log(fmt.format(12.345)); // "12,35"
```

Das ist ideal, wenn du Werte im Frontend ausgibst und nebenbei auch gleich das richtige Dezimaltrennzeichen willst.

## Variante 2: Runden als Number mit Math.round

Wenn du eine Number zurückgeben willst, ist das klassische Muster:

```js
function roundMax2(value) {
    return Math.round(value * 100) / 100;
}

console.log(roundMax2(12)); // 12
console.log(roundMax2(12.3)); // 12.3
console.log(roundMax2(12.345)); // 12.35
```

Das ist kompakt, aber du solltest wissen: Wegen Floating-Point können Grenzfälle überraschend wirken. Für viele Alltagswerte ist es okay, bei Ge
