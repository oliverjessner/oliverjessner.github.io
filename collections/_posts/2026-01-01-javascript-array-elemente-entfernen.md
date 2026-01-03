---
layout: post
title: 'JavaScript: Bestimmtes Element aus einem Array entfernen'
date: 2026-01-01 20:55:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - javascript
    - computer-stuff
    - software-development
description: 'Tutorial: So entfernst du in JavaScript gezielt ein bestimmtes Element aus einem Array – einfach erklärt und mit sicheren Beispielen.'
thumbnail: '/assets/images/gen/blog/javascript-array-elemente-entfernen/header_thumbnail.webp'
image: '/assets/images/gen/blog/javascript-array-elemente-entfernen/header.webp'
---

## Ein bestimmtes Element aus einem Array entfernen

Arrays gehören zu den Grundlagen von JavaScript. Trotzdem stolpert man immer wieder über dieselbe Frage: Wie entferne ich ein bestimmtes Element aus einem Array?
Die Antwort hängt davon ab, ob du:

-   das Original-Array **verändern** willst
-   oder lieber ein **neues Array erzeugst**

Beides ist legitim, wichtig ist, den Unterschied zu kennen.

## Die empfohlene Lösung: filter

Der sauberste und meist empfohlene Weg nutzt `Array.prototype.filter`.

```javascript
const array = [1, 2, 3, 4, 5];
const valueToRemove = 3;

const result = array.filter(item => item !== valueToRemove);
```

Ergebnis:

```javascript
[1, 2, 4, 5];
```

Warum filter so gut ist

-   verändert das ursprüngliche Array nicht
-   ist gut lesbar
-   funktioniert zuverlässig für primitive Werte

Gerade in modernen JavaScript-Codebases ist das der bevorzugte Ansatz.

## Wenn du das Array direkt verändern willst: splice

Manchmal soll das ursprüngliche Array angepasst werden. Dann bietet sich splice an.

```javascript
const array = [1, 2, 3, 4, 5];
const index = array.indexOf(3);

if (index !== -1) {
    array.splice(index, 1);
}
```

Nach dem Aufruf enthält array:

```javascript
[1, 2, 4, 5];
```

Wichtig

-   splice verändert das bestehende Array
-   der Index muss vorher bekannt sein
-   vorsichtig einsetzen, z. B. bei State-Management

## Objekte aus Arrays entfernen

Bei Arrays mit Objekten funktioniert filter ebenfalls hier wird meist über eine Eigenschaft gefiltert:

```javascript
const users = [
    { id: 1, name: 'oliver' },
    { id: 2, name: 'conny' },
    { id: 3, name: 'fabio' },
];

const result = users.filter(user => user.id !== 2);
```

Ergebnis:

```javascript
[
    { id: 1, name: 'oliver' },
    { id: 3, name: 'fabio' },
];
```

Fazit

Ein Element aus einem Array zu entfernen ist in JavaScript kein Sonderfall aber die Wahl der Methode macht einen großen Unterschied.

Anderes Thema: Wenn du rausfinden möchtest wie du den ersten Buchstaben eines Strings großschreibst, schau dir auch mein [Tutorial dazu an](https://oliverjessner.github.io/blog/2026-01-01-javascript-ersten-buchstaben-in-groszschreiben/).
