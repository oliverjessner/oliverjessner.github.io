---
layout: post
title: 'Nativer Support für CSS Nesting - Willkommen in der Zukunft'
date: 2023-12-21 00:00:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - web-development
    - css
description: 'Mein Lieblingsfeature aus Sass ist nun endlich nativ im Browser gelandet.'
thumbnail: '/assets/images/gen/blog/css_nesting/header_thumbnail.webp'
image: '/assets/images/gen/blog/css_nesting/header.webp'
---

## Was ist CSS Nesting?

[CSS](https://oliverjessner.at/category/css)-Nesting ist eine Funktion in der Cascading Style Sheets (CSS)-Sprache, die es Entwicklern ermöglicht, verschachtelte Strukturen in ihrem Stylesheet-Code zu erstellen. Mit CSS-Nesting können Sie die Lesbarkeit und Organisiertheit Ihres Codes verbessern, indem Sie Regeln für verschachtelte Elemente in einer hierarchischen Struktur definieren. Ganz neu ist das nicht, nesting gab es doch schon eine Zeit lang in Sass.

## Du bist eher der Video Typ?

Dann schau dir doch das YouTube Video dazu an!

<iframe width="560" height="315" src="https://www.youtube.com/embed/GYZ2FWgxkN8?si=BWI5yuJfgmB3oE3K" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Beispiele

Während wir früher mehrere descendant selector verwenden mussten, sah das Ganze so aus:

```css
.container div {
    padding: 10px;
}

.container .pie {
    background-color: palevioletred;
}
```

Können wir das Ganze nun viel schöner mit CSS-Nesting abbilden.

```css
.container {
    div {
        padding: 10px;
    }

    .pie {
        background-color: palevioletred;
    }
}
```

Just in case: Der descendant selector klingt zwar fancy, ist aber einfach der Selektor, bei dem Elemente durch Leerzeichen verbunden werden.

## Kann ich das schon nutzen?

Grundsätzlich ist das Nesting in neuen Chrome-Versionen möglich. In einigen anderen Browsern müssen wir jedoch den Nesting-Operator verwenden. Genauer gesagt betrifft dies Edge und Opera. Allerdings werden auch diese sehr bald Nesting ohne den Operator unterstützen. [Aktuelle Verfübgarkeit](https://caniuse.com/?search=css%20nesting)

## Nesting Operator?

```css
.container {
    & div {
        padding: 10px;
    }

    & .pie {
        background-color: palevioletred;
    }
}
```

Dazu setzen Sie einfach vor dem verschachtelten Kind-Element ein '&' Zeichen. Diese Methode wird natürllich auch von Chrome unterstützt.

## Den Spaß kann mann auch umdrehen

Der Nesting Operator kann auch angewendet werden, um den Kontext der Regeln umzukehren.

```css
small {
    p & {
        color: red;
    }
}
```

Das ist dann gleichzusetzen mit:

```css
p small {
    color: red;
}
```

Das gesamte kann auch noch kaskadieren:

```css
small {
    p & & & {
        color: red;
    }
}
```

Wenn wir dies erneut als descendant selector darstellen, sieht das folgendermaßen aus:

```css
p small small small {
    color: red;
}
```

Klingt vielleicht zunächst unnötig, aber stellen wir uns Folgendes vor: Wir haben einige Badges, die je nach übergeordnetem Element verändert werden sollen, jedoch teilen sich alle Badges gemeinsame Eigenschaften.

```css
.badge {
    border-radius: 5px;
    padding: 10px;

    p & {
        color: red;
    }

    div {
        color: blue;
    }
}
```

## Fazit

CSS hat sich in den letzten 12-16 Monaten unglaublich weiterentwickelt und wird immer komplexer, aber auch immer komfortabler. Ich denke, das ist eine sehr positive Entwicklung, und wir werden bald keine Frameworks mehr benötigen, da CSS nunmehr mächtig genug ist. All diese Neuerungen hätte ich mir bereits vor vielen Jahren gewünscht und musste damals mit Sass jonglieren. Das gehört ab jetzt der Zukunft an. Jetzt fehlt mir nur noch, dass JavaScript mit Features wie optionalem Typing nachzieht, aber das ist wieder ein anderes Thema.
