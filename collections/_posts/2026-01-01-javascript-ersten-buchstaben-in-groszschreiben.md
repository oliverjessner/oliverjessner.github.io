---
layout: post
title: 'JavaScript: Ersten Buchstaben eines Strings großschreiben'
date: 2026-01-01 17:35:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - javascript
    - computer-stuff
    - software-development
description: 'Tutorial: So wandelst du in JavaScript den ersten Buchstaben eines Strings in einen Großbuchstaben um – einfach und verständlich erklärt.'
thumbnail: '/assets/images/gen/blog/javascript-ersten-buchstaben-in-groszschreiben/header_thumbnail.webp'
image: '/assets/images/gen/blog/javascript-ersten-buchstaben-in-groszschreiben/header.webp'
---

## Ersten Buchstaben großschreiben

Namen, Überschriften, Labels oder Benutzereingaben:  
In JavaScript landet Text häufig in der falschen Schreibweise.

Eine typische Frage lautet daher:

**Wie mache ich in JavaScript den ersten Buchstaben eines Strings groß?**

## Die einfache Standardlösung

Der klassische Ansatz kombiniert drei Dinge:

-   den ersten Buchstaben extrahieren
-   ihn in Großbuchstaben umwandeln
-   den Rest des Strings anhängen

```javascript
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
```

Beispiel:

```javascript
capitalizeFirstLetter('hello'); // "Hello"
```

## Alternative Schreibweise mit Destructuring

Wer es moderner mag, kann auch so schreiben:

```javascript
const capitalizeFirstLetter = ([first, ...rest]) => (first ? first.toUpperCase() + rest.join('') : '');
```

Funktional identisch, aber etwas weniger intuitiv für Einsteiger.
Anderes Thema: Wenn du ein Element aus einem Array entfernen willst, schau dir mein Tutorial dazu an: [JavaScript: Bestimmtes Element aus einem Array entfernen](https://oliverjessner.github.io/blog/2026-01-01-javascript-array-elemente-entfernen/).
