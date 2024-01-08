---
layout: post
title: 'Die dunklen Seiten von JavaScript '
date: 2024-01-08 00:00:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - computer-stuff
    - software-engineering
    - javascript
description: 'Wir verwandeln zwei fürchterliche Beispiele in gute Lösungen. Wir analysieren code.'
thumbnail: '/assets/images/gen/blog/warum-var-in-js-eine-schlechte-idee-ist/header_thumbnail.webp'
image: '/assets/images/gen/blog/warum-var-in-js-eine-schlechte-idee-ist/header.webp'
---

# Der Globale Space

JavaScript, als eine der weitverbreitetsten Programmiersprachen, bietet eine Vielzahl von Möglichkeiten für Entwickler. Dennoch gibt es in dieser Welt des Codes dunkle Ecken, und heute werden wir uns genauer mit zwei konkreten Beispielen beschäftigen

## Du bist eher der Video Typ?

Dann schau dir doch das YouTube Video dazu an!

## Beispiel 1

Ihr kennt sicherlich solchen Code oder etwas Ähnliches. Wir haben eine Funktion, in der irgendwo auf eine Variable geschrieben wird. Jedoch wurde diese nicht deklariert und initialisiert.

```javascript
function foo() {
    a = 3;
}

foo();
console.log(a);
```

Während in vielen Sprachen hier einfach ein Compiler-Error oder Laufzeitfehler auftritt, lässt uns der JavaScript-Interpreter einfach weitermachen. Und allokiert die Variable einfach in den globalen Scope.
Den meisten ist wahrscheinlich klar, warum wir nichts in den globalen Space stecken wollen. Für den Fall, dass du es nicht weißt, sind hier 5 triftige Gründe.

1. Vermeidung von Namenskonflikten
1. Lesbarkeit und Wartbarkeit
1. Isolation von Funktionalitäten
1. Verbesserung der Codequalität
1. Vermeidung von Side effects

## Lösungen für Beispiel 1

Für jedes Problem sollten wir eine oder mehrere Lösungen finden. Das Erste, was an dieser Codebase schlecht ist, ist, dass JavaScript nicht im Strict-Modus läuft. Dazu gibt es zwei Möglichkeiten, das zu erreichen. Erste Lösung:

```javascript
'use strict';

function foo() {
    a = 3;
}

foo();
console.log(a);
```

Den Strict-Modus führen wir einfach mit einem einfachen String am Anfang unseres Codes ein. Dadurch können wir nicht einfach überall globale Variablen allokieren.

Die zweite und moderne Lösung ist, ein ESM-Modul daraus zu machen. Dazu verzichten wir einfach auf 'use strict' und verwenden entweder die .mjs-Endung doer teilen unserem package.json oder unserem Browser mit, dass es sich um ein ESM handelt.

Die Lösung, die wahrscheinlich für uns alle naheliegend ist, besteht darin, 'let' oder 'const' zu verwenden.

```javascript
function foo() {
    const a = 3;
}

foo();
```

## Beispiel 2

Kommen wir zum nächsten Beispiel. Dieses Mal geht es um Schleifen und das var-Keyword.

```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, 0);
}
```

Wenn wir uns den Code ansehen und vielleicht nicht aus der JavaScript-Welt kommen, könnten wir denken, dass der Code in der Konsole folgendermaßen aussieht:

```bash
0
1
2
3
4
```

Das ist jedoch nicht der Fall, denn unser Output sieht genau so aus:

```bash
5
5
5
5
5
```

Warum ist das so? Das liegt am Scoping von var, denn var ist immer nur global oder in einer Funktion gescopet. Das bedeutet, alle Funktionen aus setTimeout greifen nach Beendigung des Timeouts auf die globale Variable i zu. Was in unserem Fall bedeutet, immer auf 5.
Die Lösung hier ist ganz einfach let:

```javascript
for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, 0);
}
```

Den 'let' benutzt einen Block Scope, und Überraschung, die Schleife ist auch ein Block!

### Fazit

Ich möchte niemanden abschrecken, was JavaScript angeht. Die meisten Programmiersprachen, die wir im wirtschaftlichen Umfeld nutzen, sind sehr alt. JavaScript ist zum Beispiel 28 Jahre alt, Python 32 Jahre, Java ebenfalls 28 Jahre, und C++ sogar 38 Jahre. Das bedeutet, keine von ihnen ist perfekt. Es ist wichtig für uns als Programmierer, die Schwächen zu kennen und diese genau zu verstehen, denn nur so können wir guten Code schreiben.
