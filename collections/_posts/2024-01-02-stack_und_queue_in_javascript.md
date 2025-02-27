---
layout: post
title: 'Warum du etwas über Stacks lernen musst in 2024'
date: 2024-01-02 00:00:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - computer-stuff
    - software-engineering
    - javascript
description: 'Der perfekte Artikel für alle, die nie studiert haben oder bei Algorithmen und Datenstrukturen auf Leerlauf geschaltet haben.'
thumbnail: '/assets/images/gen/blog/stack_und_queue_in_javascript/header_thumbnail.webp'
image: '/assets/images/gen/blog/stack_und_queue_in_javascript/header.webp'
---

## Was ist ein Stack

Ein Stapel oder Stack ist eine Datenstruktur in der Informatik, die nach dem Last-In-First-Out (LIFO)-Prinzip funktioniert. Das bedeutet, dass das zuletzt hinzugefügte Element auch das erste ist, das wieder entfernt wird. Man kann sich einen Stack wie einen Stapel von Büchern vorstellen, bei dem man immer nur das oberste Buch hinzufügen oder entfernen kann.

## Du bist eher der Video Typ?

Dann schau dir doch das YouTube Video dazu an!

<iframe width="560" height="315" src="https://www.youtube.com/embed/p7bI2nsUgjI?si=YjAB8vVpIuZCd0bg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Wofür brauchen wir Stacks?

Stacks spielen eine entscheidende Rolle in der Informatik und werden in verschiedenen Anwendungen eingesetzt:

1. Funktionsaufrufe und Rücksprungadressen: Stacks organisieren den Aufruf und die Rückkehr von Funktionen, was den Programmfluss strukturiert.
1. Speicherverwaltung: Stacks ermöglichen eine effiziente Verwaltung von lokalen Variablen und temporären Daten.
1. Rekursion: Die Verwendung von Stacks erleichtert die Implementierung rekursiver Algorithmen.
1. Ausdrucksauswertung: In Postfix- oder umgekehrter polnischer Notation spielen Stacks eine Schlüsselrolle bei der Verarbeitung von Operanden und Operatoren.
1. Undo-Mechanismus: Stacks werden genutzt, um Schritte zu speichern und bei Bedarf rückgängig zu machen.
1. Parsing: In der Syntaxanalyse von Sprachen kommen Stacks zum Einsatz, um Grammatikregeln zu verarbeiten und die Struktur von Programmcode zu verstehen.

Die Vielseitigkeit und Effizienz von Stacks machen sie auf jeden fall zu einer unverzichtbaren Datenstruktur in der Informatik.

## Wie sieht dieser in JavaScript aus

Der hier Code definiert eine einfache Implementierung eines Last-In-First-Out (LIFO) Stacks in der Programmiersprache JavaScript. LIFO bedeutet, dass das zuletzt hinzugefügte Element als erstes wieder entfernt wird, ähnlich einem Stapel von Tellern, bei dem der oberste Teller zuerst weggenommen wird.

```javascript
class LIFO {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        return this.items.pop();
    }

    peek() {
        return this.items.slice(-1);
    }

    isEmpty() {
        return this.items.length == 0;
    }
}
```

Wenn wir genau hinsehen, merken wir, dass das klassische Array in JavaScript sowieso einen Stack darstellt. Der obige Code hilft uns in diesem Fall nur das Konzept zu verstehen.
Im realwelt-fall würde man auch eine Grenze für seinen Stack definieren, damit dieser nicht unendlich wächst. Daher empfiehlt es sich, hier einen Sicherheitsmechanismus einzubauen:

```javascript
class LIFO {
    push(item) {
        if (this.items.length < 10000) {
            this.items.push(item);

            return true;
        } else {
            console.error('stack overflow');

            return false;
        }
    }
}
```

## Zeig mir einen Anwendungsfall

Schauen wir uns kurz eine Anwendungsmöglichkeit an, auch wenn ich bereits einige weiter oben erwähnt habe. Finde ich besonders gut zur Demonstration, nämlich das Umkehren eines Strings. Das funktioniert ganz einfach folgendermaßen mit unserem Stack:

```javascript
const stack = new LIFO();

stack.push('h');
stack.push('e');
stack.push('l');
stack.push('l');
stack.push('o');

console.log(stack);
console.log(stack.pop() + stack.pop() + stack.pop() + stack.pop() + stack.pop());
```

Und wenn wir das dann ausführen passiert folgendes:

```bash
LIFO { items: [ 'h', 'e', 'l', 'l', 'o' ] }
olleh
```

## Wir animieren das ganze in einem GIF

Achtung es loopt natürlich :)

![Eine animation des stacks](/assets/images/gen/blog/stack_und_queue_in_javascript/stack-animation.gif)

## Achtung der Stack hat auch einen Bruder

In der Familie der Datenstrukturen hat der Stack einen Bruder: die FIFO-Queue. Während ein Stack nach dem Last-In-First-Out (LIFO)-Prinzip funktioniert, folgt eine FIFO-Queue dem First-In-First-Out-Prinzip. Das bedeutet, dass das zuerst hinzugefügte Element auch als erstes entfernt wird – ähnlich einer Warteschlange.

Im Gegensatz zum Stapel, bei dem der Fokus auf dem zuletzt hinzugefügten Element liegt, legt eine FIFO-Queue Wert darauf, die Reihenfolge der Elemente zu bewahren. Ein klassisches Beispiel hierfür ist eine Warteschlange an einer Kasse: Die Person, die zuerst ankommt, wird auch als erste bedient.

## It´s building time

Wenn wir so faul sind wie ich, kopieren wir den Stackcode einfach, nennen die Klasse um, ändern den Namen der Push-Funktion auf enqueue und den Namen der Pop-Funktion auf dequeue. Jetzt müssen wir nur noch die Logik der 'dequeue'-Methode anpassen, indem wir von einem `.pop` zu einem `.shift` wechseln.

```javascript
class FIFO {
    constructor() {
        this.items = [];
    }

    queue(item) {
        this.items.push(item);
    }

    dequeue() {
        return this.items.shift();
    }

    peek() {
        return this.items.slice(-1);
    }

    isEmpty() {
        return this.items.length == 0;
    }

    clear() {
        this.items = [];
    }
}
```

### Wo verwende ich die queue?

1. Aufgabenwarteschlangen: Prozesse, die auf die Ausführung warten, werden in einer Warteschlange platziert und nach dem FIFO-Prinzip ausgeführt.
   Datenverarbeitung:
1. Breadth-First Search (BFS) in Graphen: Eine Queue kann verwendet werden, um die Nachbarn eines Knotens zu speichern und zu durchsuchen.
   Druckwarteschlangen:
1. Druckaufträge werden normalerweise in einer Warteschlange organisiert und in der Reihenfolge abgearbeitet, in der sie eingehen.
   Aufgabenplanung:
1. In multithreading- oder parallelen Umgebungen können Queues verwendet werden, um Aufgaben zwischen Threads oder Prozessen zu koordinieren.
   Messaging-Systeme:
1. Kommunikation zwischen verschiedenen Teilen eines Systems kann durch den Austausch von Nachrichten in einer Queue organisiert werden.

## Muss ich das 2024 noch lernen?

Ich weiß bereits vor Veröffentlichung, dass dieser Artikel sowie auch das dazugehörige YouTube-Video bei einigen Zuschauern folgende Gefühle/Meinungen auslösen könnte: "Das muss heute niemand mehr lernen, wir haben bereits alle fertigen Datenstrukturen in der Standardbibliothek." Das mag zwar stimmen, jedoch gibt es immer wieder Menschen, die neue Sprachen entwickeln oder an Big Data arbeiten, wo man beispielsweise auch mal die eine oder andere Datenstruktur aufgrund der Performance selbst schreiben muss. Solche Fähigkeiten zu beherrschen mag für Anfänger zwar keinen sofortigen Sinn ergeben, macht sie jedoch zu besseren Programmierern. In diesem Sinne danke fürs Lesen, wir sehen uns im nächsten Artikel.
