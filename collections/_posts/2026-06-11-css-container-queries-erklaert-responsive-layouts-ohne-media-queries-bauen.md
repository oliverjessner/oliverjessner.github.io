---
layout: post
title: 'CSS Container Queries erklärt: Responsive Layouts ohne Media Queries bauen'
date: 2026-06-11 15:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - css
    - software-development
    - web-development
description: 'CSS Container Queries machen Komponenten responsiv, ohne dass sich alles am Viewport orientieren muss. So funktionieren @container, container-type und responsive Cards'
thumbnail: '/assets/images/gen/blog/css-container-queries-erklaert-responsive-layouts-ohne-media-queries-bauen/header_thumbnail.webp'
image: '/assets/images/gen/blog/css-container-queries-erklaert-responsive-layouts-ohne-media-queries-bauen/header.webp'
faq:
    - question: 'Was sind CSS Container Queries?'
      answer: 'CSS Container Queries ermöglichen es, Elemente abhängig von der Größe oder den Eigenschaften ihres umgebenden Containers zu stylen. Anders als Media Queries orientieren sie sich nicht am gesamten Viewport.'
    - question: 'Sind Container Queries ein Ersatz für Media Queries?'
      answer: 'Nicht vollständig. Media Queries bleiben sinnvoll für globale Layout-Entscheidungen. Container Queries sind besonders nützlich für Komponenten, Cards, Sidebars und wiederverwendbare Layout-Elemente.'
    - question: 'Was macht container-type in CSS?'
      answer: 'Mit container-type wird ein Element als Container für Container Queries definiert. Häufig wird container-type: inline-size verwendet, damit Nachfahren auf die Breite des Containers reagieren können.'
---

Responsive Design wurde lange fast automatisch mit Media Queries gleichgesetzt. Das funktioniert gut, solange ein Layout vor allem vom Viewport abhängt. In modernen Interfaces ist das aber oft zu grob.

Eine Card kann in einer Sidebar schmal sein, im Hauptbereich breit und in einem Grid irgendwo dazwischen liegen. Der Bildschirm ist in allen drei Fällen derselbe. Genau hier helfen CSS Container Queries: Nicht die Breite des Browserfensters entscheidet über das Styling, sondern die Breite des umgebenden Containers.

Container Queries sind dabei nur ein Teil einer größeren Entwicklung: CSS übernimmt immer mehr Aufgaben, für die früher JavaScript oder Präprozessoren nötig waren. Einen Überblick über mehrere neue CSS-Funktionen findest du in meinem Artikel [CSS3 – vier neue Funktionen, die CSS flexibler machen](/blog/2026-01-21-css3-vier-neue-funktionen-die-css-flexibler-machen/).

## Was sind CSS Container Queries?

CSS Container Queries sind Bedingungen in CSS, die sich auf einen Container beziehen. Statt zu fragen "Wie breit ist der Bildschirm?", fragt CSS also: "Wie breit ist das Element, in dem diese Komponente liegt?"

Das ist ein wichtiger Unterschied. Media Queries reagieren auf den Viewport. Container Queries reagieren auf den Kontext einer Komponente.

Ein klassisches Beispiel ist eine Card-Komponente. Auf einer Übersichtsseite kann sie viel Platz haben. In einer Sidebar kann dieselbe Card deutlich schmaler sein. Mit Media Queries lässt sich das nur indirekt lösen, weil sie nicht wissen, wo die Card gerade verwendet wird. Mit Container Queries kann die Card selbst auf ihren verfügbaren Platz reagieren.

## Warum Media Queries oft nicht reichen

Media Queries sind weiterhin sinnvoll. Sie eignen sich für globale Entscheidungen: Navigation umstellen, Seitenlayout verändern, große Bereiche ein- oder ausblenden.

Problematisch werden sie aber bei wiederverwendbaren Komponenten. Eine Komponente kann auf demselben Bildschirm in mehreren Breiten vorkommen. Eine Produktkarte im Grid hat vielleicht 320 Pixel Breite. Dieselbe Karte in einem hervorgehobenen Bereich hat 720 Pixel. Der Viewport ist identisch, aber der verfügbare Platz ist komplett unterschiedlich.

Genau hier entstehen oft Workarounds: zusätzliche Klassen, JavaScript-Messungen, Sonderfälle im CSS oder sehr viele Breakpoints. Container Queries machen viele dieser Umwege überflüssig.

## Das Grundprinzip: Der Container entscheidet

Damit Container Queries funktionieren, muss ein Element zuerst als Container definiert werden. Das passiert meistens mit `container-type: inline-size`.

```css
.card-wrapper {
    container-type: inline-size;
}
```

Damit wird `.card-wrapper` zu einem Container, dessen Inline-Größe abgefragt werden kann. In horizontal geschriebenen Layouts entspricht das meistens der Breite.

Danach kann man mit `@container` Regeln schreiben, die nur dann greifen, wenn der Container eine bestimmte Größe hat.

```css
@container (min-width: 500px) {
    .card {
        display: grid;
        grid-template-columns: 160px 1fr;
    }
}
```

Die `.card` reagiert hier nicht auf die Breite des Browserfensters, sondern auf die Breite des nächsten passenden Containers.

## Einfaches Beispiel: Responsive Card mit Container Queries

Nehmen wir eine einfache Card. Auf wenig Platz soll sie untereinander stehen. Wenn der Container breit genug ist, soll sie Bild und Text nebeneinander anzeigen.

```html
<div class="card-wrapper">
    <article class="card">
        <img src="/assets/images/example.webp" alt="Beispielbild" />
        <div class="card-content">
            <h2>Container Queries in CSS</h2>
            <p>Diese Card passt sich an ihren Container an, nicht an den gesamten Viewport.</p>
        </div>
    </article>
</div>
```

Das Basis-CSS bleibt zunächst simpel.

```css
.card-wrapper {
    container-type: inline-size;
}

.card {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 1rem;
}

.card img {
    width: 100%;
    height: auto;
    border-radius: 0.75rem;
}
```

Jetzt kommt die Container Query dazu.

```css
@container (min-width: 520px) {
    .card {
        grid-template-columns: 180px 1fr;
        align-items: center;
    }
}
```

Wenn der Container mindestens 520 Pixel breit ist, wechselt die Card in ein zweispaltiges Layout. Ist der Container schmaler, bleibt sie einspaltig.

Das ist der große Vorteil: Die Card kann überall verwendet werden und entscheidet anhand ihres direkten Layout-Kontexts.

## container-type: inline-size erklärt

Die wichtigste Eigenschaft ist `container-type`.

```css
.card-wrapper {
    container-type: inline-size;
}
```

`inline-size` bedeutet, dass Container Queries auf die Inline-Achse reagieren können. In den meisten deutschsprachigen und englischsprachigen Layouts ist das die Breite.

Es gibt auch andere Werte, aber für viele Alltagsszenarien reicht `inline-size` aus. Es ist die typische Wahl für responsive Cards, Grids, Teaser, Produktboxen und Layout-Komponenten.

Wichtig ist: Die Query wird nicht auf das Element selbst angewendet, das den Container definiert, sondern auf dessen Nachfahren.

Das funktioniert also:

```css
.card-wrapper {
    container-type: inline-size;
}

@container (min-width: 520px) {
    .card {
        grid-template-columns: 180px 1fr;
    }
}
```

Das ist dagegen ein häufiger Denkfehler: Man erwartet, dass der Container sich selbst über `@container` direkt stylt. In der Praxis stylt man meistens Elemente im Inneren des Containers.

## Container benennen mit container-name

Wenn mehrere Container verschachtelt sind, kann es sinnvoll sein, Container zu benennen. Dafür gibt es `container-name`.

```css
.article-card-wrapper {
    container-type: inline-size;
    container-name: article-card;
}
```

Dann kann die Query gezielt auf diesen Container zeigen.

```css
@container article-card (min-width: 600px) {
    .card {
        grid-template-columns: 220px 1fr;
    }
}
```

Das ist besonders nützlich, wenn eine Komponente in komplexeren Layouts steckt. Ohne Namen sucht CSS den nächsten passenden Container. Mit Namen lässt sich genauer steuern, welcher Container gemeint ist.

Es gibt auch die Kurzschreibweise `container`.

```css
.article-card-wrapper {
    container: article-card / inline-size;
}
```

Das ist kompakter, aber für Einsteiger oft weniger selbsterklärend. Für einfache Beispiele ist `container-type` lesbarer.

## Container Queries mit CSS Grid

Container Queries passen besonders gut zu CSS Grid. Ein Grid kann global flexibel sein, während einzelne Komponenten innerhalb des Grids selbst entscheiden, wie sie sich darstellen.

```css
.article-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
}

.article-card-wrapper {
    container-type: inline-size;
}

.article-card {
    display: grid;
    gap: 1rem;
}

@container (min-width: 480px) {
    .article-card {
        grid-template-columns: 140px 1fr;
    }
}
```

Das Grid entscheidet, wie viele Cards nebeneinander passen. Die Card entscheidet, ob ihr inneres Layout ein- oder zweispaltig ist.

Diese Trennung macht CSS oft robuster. Das Seitenlayout muss nicht jeden Sonderfall kennen. Die Komponente bringt ihre eigene Logik mit.

Wenn du Layouts nicht nur nach verfügbarem Platz, sondern auch nach der Anzahl der Elemente steuern willst, ist [sibling-count()](/blog/2026-01-21-sibling-count-css-zaehlt-geschwisterelemente-ohne-javascript/) spannend. Damit kann CSS Layouts abhängig von der Zahl der Geschwisterelemente berechnen, ohne dass JavaScript zählen muss.

## Container Queries mit Flexbox

Auch mit Flexbox funktionieren Container Queries gut. Zum Beispiel bei einer kleinen Profilbox.

```html
<div class="profile-box">
    <div class="profile">
        <img src="/assets/images/avatar.webp" alt="Profilbild" />
        <div>
            <h2>Oliver Jessner</h2>
            <p>Tech, Webentwicklung und digitale Produkte.</p>
        </div>
    </div>
</div>
```

```css
.profile-box {
    container-type: inline-size;
}

.profile {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.profile img {
    width: 96px;
    height: 96px;
    border-radius: 50%;
}

@container (min-width: 420px) {
    .profile {
        flex-direction: row;
        align-items: center;
    }
}
```

Auf engem Raum steht das Bild über dem Text. Ab 420 Pixel Container-Breite wird daraus ein horizontales Layout.

Auch hier gilt: Entscheidend ist nicht der Bildschirm, sondern der verfügbare Platz der Komponente.

## Container Query Units: cqw, cqh und cqi

Container Queries bringen auch eigene Einheiten mit. Besonders interessant ist `cqw`. Die Einheit steht für ein Prozent der Breite des Query-Containers.

```css
.card-title {
    font-size: clamp(1.25rem, 6cqw, 2rem);
}
```

Damit kann sich eine Schriftgröße an der Breite des Containers orientieren. Das ist genauer als `vw`, weil `vw` immer auf die gesamte Viewport-Breite schaut.

Nützliche Einheiten sind unter anderem:

```css
/* 1 Prozent der Container-Breite */
1cqw

/* 1 Prozent der Container-Höhe */
1cqh

/* 1 Prozent der Inline-Größe des Containers */
1cqi

/* 1 Prozent der Block-Größe des Containers */
1cqb
```

Für viele Layouts ist `cqw` oder `cqi` am interessantesten. Trotzdem sollte man solche Einheiten vorsichtig verwenden. Zu dynamische Schriftgrößen können schnell unruhig wirken.

## Wann Container Queries sinnvoll sind

Container Queries sind besonders sinnvoll für wiederverwendbare Komponenten:

- Cards
- Teaser
- Produktboxen
- Sidebars
- Profilboxen
- Dashboards
- Widget-Layouts
- Content-Blöcke in Grids
- Komponenten in CMS-Layouts

Immer dann, wenn dieselbe Komponente an verschiedenen Stellen unterschiedlich viel Platz hat, sind Container Queries oft die bessere Wahl als Media Queries.

## Wann Media Queries weiterhin sinnvoll sind

Container Queries ersetzen Media Queries nicht vollständig.

Media Queries bleiben sinnvoll für globale Layout-Fragen:

- Soll die Hauptnavigation auf Mobile umklappen?
- Soll ein komplettes Seitenlayout von zwei Spalten auf eine Spalte wechseln?
- Soll ein Element nur auf kleinen Viewports sichtbar sein?
- Soll das Layout auf Touch-Geräte reagieren?
- Soll ein Print-Stylesheet greifen?

Die einfache Faustregel lautet: Media Queries sind gut für die Seite. Container Queries sind gut für Komponenten.

Für noch feinere Bedingungen innerhalb einzelner CSS-Werte lohnt sich außerdem ein Blick auf [CSS if()](/blog/2026-01-20-css-if-inline-conditionals-ohne-extra-regeln/). Während Container Queries ganze Komponentenlayouts abhängig vom Container verändern, geht es bei `if()` eher darum, einzelne Werte direkt in einer Property bedingt zu setzen.

## Typische Fehler bei Container Queries

Ein häufiger Fehler ist, `@container` zu schreiben, ohne vorher einen Container zu definieren.

```css
@container (min-width: 500px) {
    .card {
        display: grid;
    }
}
```

Wenn kein passender Container existiert, greift diese Regel nicht wie erwartet. Deshalb braucht das umgebende Element zuerst `container-type`.

```css
.card-wrapper {
    container-type: inline-size;
}
```

Ein zweiter Fehler ist, die Query auf das falsche Element zu beziehen. Der Container ist meistens ein Wrapper. Die Regel betrifft die Inhalte innerhalb dieses Wrappers.

Ein dritter Fehler ist zu viel Komplexität. Container Queries sind mächtig, aber sie sollten nicht jeden Abstand und jede Schriftgröße in Sonderlogik verwandeln. Oft reicht eine einfache Query, die das Layout ab einer bestimmten Breite umstellt.

## Ein vollständiges Beispiel

Hier ist ein komplettes Beispiel für eine responsive Artikelkarte.

```html
<div class="post-card-container">
    <article class="post-card">
        <img src="/assets/images/css-container-queries.webp" alt="CSS Code auf einem Bildschirm" />
        <div class="post-card-content">
            <p class="post-card-kicker">CSS</p>
            <h2>Container Queries erklärt</h2>
            <p>
                Mit Container Queries reagieren Komponenten auf ihren verfügbaren Platz statt auf den gesamten Viewport.
            </p>
            <a href="/category/css/">Mehr CSS-Artikel lesen</a>
        </div>
    </article>
</div>
```

```css
.post-card-container {
    container-type: inline-size;
}

.post-card {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 1rem;
}

.post-card img {
    width: 100%;
    height: auto;
    border-radius: 0.75rem;
}

.post-card-kicker {
    margin: 0 0 0.5rem;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.post-card h2 {
    margin: 0 0 0.5rem;
    font-size: clamp(1.25rem, 6cqw, 2rem);
}

.post-card p {
    margin: 0 0 1rem;
}

@container (min-width: 560px) {
    .post-card {
        grid-template-columns: 180px 1fr;
        align-items: center;
    }
}

@container (min-width: 760px) {
    .post-card {
        grid-template-columns: 240px 1fr;
        padding: 1.5rem;
    }
}
```

Die Karte funktioniert jetzt in verschiedenen Kontexten. In einer schmalen Sidebar bleibt sie kompakt. In einem breiteren Bereich bekommt sie ein zweispaltiges Layout. In einem sehr breiten Container wächst das Bild weiter mit.

## Warum Container Queries gut zu modernen Websites passen

Viele Websites bestehen heute nicht mehr aus wenigen starren Seitenlayouts. Sie bestehen aus Komponenten: Cards, Module, Teaser, Inhaltsblöcke, Widgets, Produktboxen und Embeds.

Diese Komponenten werden an unterschiedlichen Stellen wiederverwendet. Genau deshalb ist es problematisch, wenn ihre Darstellung nur vom Viewport abhängt. Eine Komponente sollte wissen, wie viel Platz sie selbst hat.

Container Queries verschieben Responsive Design deshalb näher an die Komponente. Das passt besser zu modernen Frontends, Designsystemen und CMS-Layouts.

## Fazit

CSS Container Queries lösen ein altes Problem im Responsive Design. Sie machen Komponenten unabhängiger vom Viewport und erlauben Layouts, die stärker auf den tatsächlichen Kontext reagieren.

Media Queries bleiben wichtig. Aber für Cards, Grids, Sidebars und wiederverwendbare UI-Elemente sind Container Queries oft die sauberere Lösung.

Die wichtigste Regel ist einfach: Wenn eine Entscheidung die ganze Seite betrifft, sind Media Queries meistens richtig. Wenn eine Entscheidung nur eine Komponente betrifft, sind Container Queries oft die bessere Wahl.

## Weiterführende CSS-Guides

Wenn du tiefer in moderne CSS-Features einsteigen willst, passen diese Artikel gut dazu:

- [CSS3 – vier neue Funktionen, die CSS flexibler machen](/blog/2026-01-21-css3-vier-neue-funktionen-die-css-flexibler-machen/)
- [sibling-count(): CSS zählt Geschwister ohne JavaScript](/blog/2026-01-21-sibling-count-css-zaehlt-geschwisterelemente-ohne-javascript/)
- [CSS attr(): Attribute-Werte in CSS nutzen](/blog/2026-01-20-css-attr-attribute-werte-in-css-nutzen/)
- [CSS if(): Inline Conditionals ohne Extra Regeln](/blog/2026-01-20-css-if-inline-conditionals-ohne-extra-regeln/)
- [corner-shape in CSS: Ecken jenseits von border-radius](/blog/2026-01-20-corner-shape-in-css-ecken-jenseits-von-border-radius/)
- [CSS Scroll-Snapping: So baust du bessere Slider](/blog/2023-12-22-scroll-to-snapp-css3/)
- [Nativer Support für CSS Nesting](/blog/2023-12-21-css-nesting/)
