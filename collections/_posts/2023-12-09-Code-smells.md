---
layout: post
title: 'Code smells - Wie riecht guter Code?'
date: 2023-12-09 00:00:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - web-development
    - software-engineering
description: 'Wir sehen uns heute an wie wir Code smells erkennen und wie wir sie vermeiden können.'
thumbnail: '/assets/images/gen/blog/code_smells/header_thumbnail.webp'
image: '/assets/images/gen/blog/code_smells/header.webp'
---

# Code smells, was war das nochmal?

Die erste Frage die wir uns stellen sollten ist, was sind Code smells überhaupt?
Code Smells sind Hinweise auf mögliche Probleme oder ineffiziente Programmierpraktiken in Softwarecode. Sie dienen als Anzeichen dafür, dass eine Überprüfung oder möglicher Refaktorisierungsbedarf besteht, um die Codequalität zu verbessern. Code Smells sind nicht Bugs, sie sind nicht unbedingt falsch und sie sind nicht Sicherheitslücken, soviel ist sicher. Sie sind jedoch ein Hinweis darauf, dass der Code möglicherweise nicht so wartbar ist, wie er sein könnte.

## Ist das Overengineering?

Im Hinblick auf die Effizienz sollten wir uns stets zuerst fragen, ob eine Software-Engineering-Methode/Maßnahme nicht Überengineering bedeutet. Im Fall von Code Smells müssen wir feststellen, dass es darauf ankommt. Lasst uns trozdem einen Blick auf die verschiedenen Arten von Code Smells werfen.

## Long methods

Einer der offensichtlichsten Code Smells ist eine lange/große Methode/Funktion, die zu viele Dinge erledigt, zu viele Parameter hat oder zu viele verschachtelte Ebenen von Logik aufweist. Lange Methoden/Funktionen sind schwer zu lesen, zu verstehen, zu testen und wiederzuverwenden. Sie verstoßen auch gegen das Single Responsibility Principle, das besagt, dass eine Methode eine Sache tun und dies gut tun sollte.

Um eine lange Methode zu refaktorieren, können wir die Technik des Extrahierens von Methoden verwenden, die darin besteht, die Methode in kleinere und zusammenhängendere Methoden aufzuteilen, die klare Namen und Zwecke haben.

❌ Negativ Beispiel:

```javascript
function doEveryThing() {
    const element = document.querySelector('#element');
    const data = await fetch('https://longmethod.com');

    element.style.color = 'red';
    element.style.backgroundColor = 'blue';
    element.style.fontSize = '20px';

    element.addEventListener('click', () => {
        const element = document.querySelector('#element');

        if (element) {
            element.classList.add('active');
        }
    });

    element.innerText = data.text;
}
```

✅ Positiv Beispiel:

```javascript
const element = document.querySelector('#element');
const data = await fetch('https://longmethod.com');

function changeElementColor(element) {
    element.style.color = 'red';
    element.style.backgroundColor = 'blue';
    element.style.fontSize = '20px';
}

function addClickEventListener(element) {
    element.addEventListener('click', () => {
        const element = document.querySelector('#element');

        if (element) {
            element.classList.add('active');
        }
    });
}

function changeElementText(element, text) {
    element.innerText = text;
}

changeElementColor(element);
addClickEventListener(element);
changeElementText(element, data.text);
```

Persönliche Erfahrung von mir und vielen Kollegen ist, dass sich da draußen auch Methoden/Funktionen befinden, die über 1.000 – ja, Ihr habt richtig gelesen – über Eintausend Zeilen lang sind. Diese Methoden/Funktionen sind teilweise so komplex, dass die Teams teilweise Angst haben, sie zu refaktorieren.

## Large classes

Ein weiteres häufiges Code-Smell ist eine große Klasse, die zu viele Felder, Methoden oder Verantwortlichkeiten hat. Große Klassen sind schwer zu warten, zu testen und zu erweitern. Sie verstoßen auch gegen das Single Responsibility Principle. Um eine große Klasse zu refaktorieren, können wir wieder die Technik der Extraktion einer Klasse verwenden, die darin besteht, eine neue Klasse zu erstellen, die einige der Felder und Methoden der Originalklasse kapselt.

❌ Negativ Beispiel:

```javascript
class DoEveryThing {
    constructor() {
        this.button1 = document.querySelector('#bttn');
        this.button2 = document.querySelector('#bttn2');
        this.dropdown = document.querySelector('#dropdown');
    }

    changeElementColor() {
        this.button1.style.color = 'red';
        this.button1.style.backgroundColor = 'blue';
        this.button1.style.fontSize = '20px';

        this.button2.style.color = 'red';
        this.button2.style.backgroundColor = 'blue';
        this.button2.style.fontSize = '20px';
    }

    addClickEventListener() {
        this.button1.addEventListener('click', function () {});
        this.button2.addEventListener('click', function () {});
        this.dropdown.addEventListener('change', function () {});
    }
}
```

✅ Positiv Beispiel:

```javascript
class ButtonWrapper {
    constructor(button) {
        this.button = button;
    }

    changeElementColor() {
        this.button.style.color = 'red';
        this.button.style.backgroundColor = 'blue';
        this.button.style.fontSize = '20px';
    }

    addClickEventListener() {
        this.button.addEventListener('click', function () {});
    }
}

class DropDown {
    constructor(dropdown) {
        this.dropdown = dropdown;
    }

    addClickEventListener() {
        this.dropdown.addEventListener('change', function () {});
    }
}
```

Auch hier ist es nicht ungewöhnlich, dass es Klassen gibt, die über 10.000 Zeilen oder noch länger sind. Wir kennen alle diese Geschichten oder noch schlimmer, wir haben sie vielleicht sogar selbst erlebt. Wichtig ist hier gar nicht so sehr die Länge der Klasse, sondern die Anzahl der Verantwortlichkeiten, die sie hat. Wenn eine Klasse mehr als eine Verantwortlichkeit hat, ist es Zeit, sie zu refactoren.

## Duplicated code

Als nächstes haben wir duplizierten Code, der auftritt, wenn derselbe oder ähnlicher Code an mehreren Stellen wiederholt wird. Duplizierter Code ist ein Zeichen von Nachlässigkeit, Inkonsistenz und Ineffizienz. Er erhöht auch das Risiko von Fehlern und Bugs, da jede Änderung an einer Stelle in allen anderen Stellen repliziert werden muss.

❌ Negativ Beispiel:

```javascript
function changeX(element) {
    element.innerText = 'x';
}

function setX(element) {
    element.innerText = 'x';
}
```

Ich denke das Beispiel ist selbsterklärend. Wir haben hier zwei Funktionen, die das gleiche tun. Wir müssen also eine der beiden Funktionen entfernen und die andere verwenden, um den Code zu bereinigen.

## Primitive obsession

Ich würde ja jetzt gerne 'Primitive Obsession' eindeutschen, aber 'primitive Besessenheit' klingt einfach nicht sexy. Wie auch immer, Primitive Obsession tritt dann auf, wenn primitive Typen wie int, string oder boolean verwendet werden, um komplexe Konzepte oder Datenstrukturen darzustellen. Primitive Obsession kann zu schlechter Lesbarkeit, Validierung und Kapselung führen. Sie macht den Code auch weniger ausdrucksstark und flexibel.

❌ Negativ Beispiel:

```javascript
const playerName = 'Oliver';
const playerScore = 100;
const playerLives = 3;
```

✅ Positiv Beispiel:

```javascript
class Player {
    constructor(name, score, lives) {
        this.name = name;
        this.score = score;
        this.lives = lives;
    }
}
```

Weiteres ✅ Positiv Beispiel:

```javascript
const player = {
    name: 'Oliver',
    score: 100,
    lives: 3,
};
```

Ein weiteres Beispiel für Primitive Obsession ist die Verwendung von Arrays, um Daten zu speichern, die eigentlich in Objekten gespeichert werden sollten.

❌ Negativ Beispiel:

```javascript
const arr = ['Oliver', 100, 3];
```

## Switch statements

Ein weiterer häufiger Code Smell sind Switch-Anweisungen, die auftreten, wenn wir eine Switch- oder If-Else-Anweisung verwenden, um unterschiedliche actions basierend auf dem Wert einer Variable auszuführen. Switch-Anweisungen können umständlich, repetitiv und fehleranfällig sein. Sie verstoßen auch gegen das Open-Closed-Prinzip, das besagt, dass eine Klasse für Erweiterungen offen, aber für Modifikationen geschlossen sein sollte. Um Switch-Anweisungen zu refactoren, können wir die Technik des Ersetzens von Bedingungen durch Polymorphismus verwenden, bei der Unterklassen erstellt werden, die eine Methode basierend auf dem Variablenwert überschreiben.

❌ Negativ Beispiel:

```javascript
class Action {
    doAction(action) {
        switch (action) {
            case 'jump':
                console.log('jump');
                break;
            case 'run':
                console.log('run');
                break;
            case 'walk':
                console.log('walk');
                break;
            default:
                console.log('default');
                break;
        }
    }
}
```

✅ Positiv Beispiel:

```javascript
class Action {
    doAction() {
        console.log('default');
    }
}

class Jump extends Action {
    doAction() {
        console.log('jump');
    }
}

class Run extends Action {
    doAction() {
        console.log('run');
    }
}

class Walk extends Action {
    doAction() {
        console.log('walk');
    }
}
```

Kleiner persönlicher Bonus, lookup tables sind auch eine gute Alternative zu Switch statements. Um ehrlich zu sein: Ich hasse Switch statements! Im Vergleich
sind lookup tables viel einfacher zu lesen, zu erweitern und zu verstehen.

```javascript
const actions = {
    jump: () => console.log('jump'),
    run: () => console.log('run'),
    walk: () => console.log('walk'),
};

actions[action]();
```

## Feature envy

Kommen wir zum sogenannte 'Feature Envy', die tritt dann auf, wenn eine Methode auf mehr Daten oder Verhalten einer anderen Klasse zugreift als auf die ihrer eigenen Klasse. 'Feature Envy' kann auf eine unzureichende Verteilung von Verantwortlichkeiten und eine hohe Kopplung zwischen Klassen hinweisen.

❌ Negativ Beispiel:

```javascript
class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}

class RandomClass {
    constructor() {
        this.triangle = new Triangle(1, 2, 3);
    }

    getCircumference() {
        return this.triangle.a + this.triangle.b + this.triangle.c;
    }
}
```

✅ Positiv Beispiel:

```javascript
class Triangle {
    #a;
    #b;
    #c;

    constructor(a, b, c) {
        this.#a = a;
        this.#b = b;
        this.#c = c;
    }

    getCircumference() {
        return this.a + this.b + this.c;
    }
}
```

## Schlusswort

Wichtig ist, dass wir uns immer wieder fragen, ob wir nicht overengineeren und ob
wir nicht zu viel Zeit in die Refaktorisierung (was für ein Wort) stecken. Es gibt viele Teams da draußen, die sich zu sehr auf die Refaktorisierung konzentrieren und dabei vergessen, dass sie eigentlich neue Features oder Tests entwickeln sollten. Genauso gibt es code bases, die so schlecht sind, dass sie nicht mehr gewartet werden können.

## War's das?

Nein, natürlich nicht, es gibt noch viel mehr Code Smells, die wir uns anschauen können, aber nicht in diesem Artikel.
