---
layout: post
title: 'JavaScript runden: aufrunden und Nachkommastellen im Griff'
date: 2026-01-17 20:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - javascript
    - web-development
    - software-development
description: 'So kannst du in JavaScript runden, aufrunden und auf Nachkommastellen runden, inklusive typischer Floating-Point-Fallen und sauberer Praxisbeispiele'
thumbnail: '/assets/images/gen/blog/javascript-runden-aufrunden-und-nachkommastellen-im-griff/header_thumbnail.webp'
image: '/assets/images/gen/blog/javascript-runden-aufrunden-und-nachkommastellen-im-griff/header.webp'
---

Wenn du in [JavaScript](https://oliverjessner.at/category/javascript/) runden willst, stolperst du schnell über Nachkommastellen und Floating-Point-Effekte. Mit den richtigen Funktionen kannst du zuverlässig runden, javascript aufrunden und Werte sauber formatieren.

## Die Basics: runden javascript mit Math

Fürs klassische js runden auf ganze Zahlen gibt es drei Standardfunktionen:

- Math.round(x): rundet zur nächsten ganzen Zahl
- Math.floor(x): rundet ab
- Math.ceil(x): rundet auf

```js
console.log(Math.round(2.5)); // 3
console.log(Math.floor(2.9)); // 2
console.log(Math.ceil(2.1)); // 3
```

Wenn du explizit javascript aufrunden willst, ist Math.ceil dein Werkzeug.

## JavaScript runden auf Nachkommastellen

Math.round kann nur auf ganze Zahlen runden. Für javascript runden auf nachkommastellen verschiebst du das Komma, rundest und verschiebst zurück.

```js
function roundTo(value, decimals) {
    const factor = 10 ** decimals;
    return Math.round(value * factor) / factor;
}

console.log(roundTo(3.14159, 2)); // 3.14
console.log(roundTo(1.005, 2)); // 1.01? nicht immer, siehe unten
```

Diese Methode ist simpel, aber sie trifft auf die bekannte Floating-Point-Problematik. Manche Dezimalzahlen lassen sich im Binärformat nicht exakt darstellen.

## Warum 1.005 nicht immer 1.01 wird

JavaScript nutzt IEEE-754 Floating-Point. Dadurch kann ein Wert intern minimal kleiner oder größer sein als erwartet. Bei Rundungen wirkt sich das aus.

Ein pragmatischer Ansatz ist, vor dem Runden eine kleine Korrektur einzubauen:

```js
function roundToSafe(value, decimals) {
    const factor = 10 ** decimals;
    return Math.round((value + Number.EPSILON) * factor) / factor;
}

console.log(roundToSafe(1.005, 2)); // 1.01
```

Das ist keine mathematische Wunderwaffe, aber für typische UI-, Preis- und Anzeige-Logik funktioniert es meist zuverlässig.

## Aufrunden auf Nachkommastellen

Manchmal willst du nicht "normal" runden, sondern immer nach oben, zum Beispiel bei Mindestmengen oder Zeitfenstern. Auch das geht mit dem Komma-Trick.

```js
function ceilTo(value, decimals) {
    const factor = 10 ** decimals;
    return Math.ceil(value * factor) / factor;
}

console.log(ceilTo(2.341, 2)); // 2.35
```

Damit deckst du javascript aufrunden auch für Nachkommastellen ab.

## Formatieren vs. Rechnen: toFixed ist Anzeige, nicht Wahrheit

toFixed ist praktisch, aber es liefert einen String, nicht zwingend einen "besseren" Zahlwert.

```js
const x = 2.345;
console.log(x.toFixed(2)); // "2.35"
```

Wenn du weiterrechnen willst, parse bewusst zurück:

```js
const y = Number(x.toFixed(2));
```

Warnhinweis: Für finanzielle Berechnungen ist das Rechnen mit Cent-Integern oft stabiler als mit Floats, je nach Projektanforderung.

## Ein kleines Cheat-Sheet

- js runden auf ganze Zahl: Math.round(x)
- immer abrunden: Math.floor(x)
- javascript aufrunden: Math.ceil(x)
- javascript runden auf nachkommastellen: roundToSafe(x, n)
- immer aufrunden auf Nachkommastellen: ceilTo(x, n)

## Fazit

runden javascript ist einfach, solange du weißt, ob du normal runden oder immer aufrunden willst und ob du einen Rechenwert oder nur eine Anzeige brauchst. Mit Math.round, Math.ceil und einem kleinen Helper für Nachkommastellen bekommst du in JavaScript runden sauber in den Griff.

PS: Für mehr JavaScript: Hier sind [5 typische Anfängerfehler und die pragmatischen Lösungen](https://oliverjessner.at/blog/2026-01-14-javascript-5-typische-anfaengerfehler-und-die-pragmatischen-loesungen/).
