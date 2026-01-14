---
layout: post
title: 'JavaScript: Wie Closures funktionieren und warum sie so nützlich sind'
date: 2026-01-14 15:34:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - javascript
    - web-development
    - software-development
description: 'Closures sind Funktionen mit Gedächtnis: Sie behalten Variablen aus ihrem Scope. Hier ist die verständliche Erklärung mit typischen Use-Cases und Fallen'
thumbnail: '/assets/images/gen/blog/javascript-wie-closures-funktionieren-und-warum-sie-so-nuetzlich-sind/header_thumbnail.webp'
image: '/assets/images/gen/blog/javascript-wie-closures-funktionieren-und-warum-sie-so-nuetzlich-sind/header.webp'
---

Closures sind eines dieser JavaScript-Themen, die abstrakt klingen, aber im Alltag überall auftauchen: in Event-Handlern, Hooks, Callbacks, Timern und Modulen. Die kurze Definition ist simpel: Eine Funktion “merkt sich” die Variablen aus dem Scope, in dem sie erstellt wurde.

## Das Grundprinzip in einem Satz

Eine Closure entsteht, wenn eine Funktion auf Variablen außerhalb ihres eigenen Körpers zugreift und diese Referenzen behält, auch wenn der äußere Scope eigentlich schon “fertig” ist.

Das klingt theoretisch. Ein kleines Beispiel macht es klar.

## Das klassische Beispiel: Funktion, die sich einen Wert merkt

```js
function makeCounter() {
    let count = 0;

    return function () {
        count += 1;
        return count;
    };
}

const counterA = makeCounter();
console.log(counterA()); // 1
console.log(counterA()); // 2

const counterB = makeCounter();
console.log(counterB()); // 1
```

Was hier passiert:

-   `makeCounter()` legt eine Variable `count` an
-   die zurückgegebene innere Funktion greift auf `count` zu
-   obwohl `makeCounter()` schon zurückgegeben hat, bleibt `count` verfügbar
-   jedes `makeCounter()` erzeugt eine eigene “Kapsel” mit eigener `count`-Instanz

Genau diese “Kapsel” ist das, was viele mit Closure meinen.

## Warum das funktioniert: Lexical Scoping

JavaScript nutzt lexical scoping. Das bedeutet: Eine Funktion sieht Variablen anhand ihrer Position im Code, nicht anhand dessen, von wo sie später aufgerufen wird.

Die innere Funktion sieht `count`, weil sie innerhalb von `makeCounter` definiert wurde. Diese Bindung bleibt erhalten.

Ein häufiger Irrtum ist, dass Variablen “kopiert” werden. Sie werden nicht kopiert, sie werden referenziert. Das ist wichtig, wenn sich Werte verändern.

## Typischer Use-Case: Private State ohne Klassen

Closures werden oft genutzt, um internen Zustand zu kapseln, ohne dass er von außen direkt verändert werden kann.

```js
function makeBankAccount(initial) {
    let balance = initial;

    return {
        deposit(amount) {
            balance += amount;
            return balance;
        },
        withdraw(amount) {
            if (amount > balance) return null;
            balance -= amount;
            return balance;
        },
        getBalance() {
            return balance;
        },
    };
}

const acc = makeBankAccount(100);
acc.deposit(50); // 150
acc.getBalance(); // 150
```

`balance` ist nicht als Property erreichbar. Das ist kein Security-Feature, aber eine sehr praktische Kapselung für API-Design.

## Typischer Use-Case: Parameter “einbauen” (Partial Application)

Closures sind auch der Kern von “Funktionen bauen, die schon etwas wissen”.

```js
function withPrefix(prefix) {
    return function (msg) {
        return `${prefix}${msg}`;
    };
}

const info = withPrefix('[INFO] ');
console.log(info('Server gestartet'));
```

Du nutzt hier die Closure, um `prefix` im Ergebnis fest zu “verdrahten”.

## Typische Falle: Schleifen und var

Das klassische Closure-Problem kennt fast jeder aus alten Codebasen: `var` ist function-scoped und führt dazu, dass alle Callbacks dieselbe Variable teilen.

```js
const handlers = [];

for (var i = 0; i < 3; i++) {
    handlers.push(() => i);
}

console.log(handlers[0]()); // 3
console.log(handlers[1]()); // 3
console.log(handlers[2]()); // 3
```

Warum? Weil es nur ein `i` gibt, das am Ende 3 ist.

Die Lösung ist heute fast immer: `let` verwenden, weil `let` block-scoped ist.

```js
const handlers = [];

for (let i = 0; i < 3; i++) {
    handlers.push(() => i);
}

console.log(handlers[0]()); // 0
console.log(handlers[1]()); // 1
console.log(handlers[2]()); // 2
```

Jede Iteration bekommt ihr eigenes `i`.

## Closures und Memory: was man wissen sollte

Closures halten Referenzen auf Variablen. Das bedeutet nicht automatisch “Memory Leak”, aber es kann relevant werden, wenn du große Objekte im Scope hältst und die Closure lange lebt.

Ein typisches Beispiel ist ein Event-Listener, der auf ein großes Objekt referenziert und nie entfernt wird. Das Problem ist dann weniger “Closure”, sondern “Lebensdauer”.

Eine pragmatische Regel: Wenn du lange lebende Listener oder Timer hast, halte ihre Dependencies klein und räume sie auf, wenn du sie nicht mehr brauchst.

## Ein kurzer Blick in den Alltag

Wenn du schon einmal sowas geschrieben hast:

```js
button.addEventListener('click', () => {
    console.log(userId);
});
```

dann hast du bereits Closures benutzt. Der Click-Handler läuft später, aber `userId` bleibt verfügbar, weil der Handler eine Closure über den umgebenden Scope bildet.

## Kurzfazit

Closures sind Funktionen mit Gedächtnis: Sie behalten Zugriff auf Variablen aus dem Scope, in dem sie definiert wurden. Das ist die Grundlage für gekapselten State, Factory-Funktionen, Callbacks und viele moderne JavaScript-Patterns. Die wichtigste Falle ist `var` in Schleifen, die pragmatische Lösung ist `let`.
