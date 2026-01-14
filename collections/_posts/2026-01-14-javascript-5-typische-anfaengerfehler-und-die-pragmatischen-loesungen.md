---
layout: post
title: 'JavaScript: 5 typische Anfängerfehler und die pragmatischen Lösungen'
date: 2026-01-14 15:42:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - javascript
    - web-development
    - software-development
description: 'Fünf klassische JavaScript-Fallen: Arrays mutieren, E-Mail-Validierung übertreiben, Dezimalstellen falsch runden, Strings naiv formatieren und Closures missverstehen'
thumbnail: '/assets/images/gen/blog/javascript-5-typische-anfaengerfehler-und-die-pragmatischen-loesungen/header_thumbnail.webp'
image: '/assets/images/gen/blog/javascript-5-typische-anfaengerfehler-und-die-pragmatischen-loesungen/header.webp'
---

Viele JavaScript-Fehler sind keine "Dummheiten", sondern entstehen, weil JavaScript mehrere Wege erlaubt und Tutorials oft den simpelsten zeigen, nicht den stabilsten. Hier sind fünf typische Anfängerfallen und Lösungen, die im Alltag gut tragen, plus Links zu den ausführlichen Artikeln.

## 1. Arrays verändern, ohne es zu merken

Ein Klassiker: Du entfernst Elemente aus einem Array und wunderst dich später, warum an anderer Stelle plötzlich Daten fehlen. Der Grund ist fast immer Mutation, zum Beispiel durch `splice()`.

Wenn du eine neue Liste willst, nutze lieber nicht-mutierende Patterns wie `filter()`.

```js
const items = ['a', 'b', 'c'];
const next = items.filter(x => x !== 'b');
// items bleibt unverändert, next ist neu
```

Wenn du bewusst mutieren willst, ist das okay, aber dann solltest du es so schreiben, dass es im Code sofort sichtbar ist.

[Deep Dive](https://oliverjessner.at/blog/2026-01-01-javascript-array-elemente-entfernen/)

## 2. E-Mail-Validierung als Regex-Projekt behandeln

Viele bauen riesige Regex-Monster und fühlen sich danach “sicher”. In der Praxis blockierst du damit legitime Adressen und löst das eigentliche Problem nicht.

Ein pragmatischer Ansatz:

-   im Formular `type="email"` nutzen
-   optional zusätzlich grob formatprüfen
-   Besitz immer über Verifikations-Mail klären

[Deep Dive](https://oliverjessner.at/blog/2026-01-14-javascript-e-mail-adressen-validieren-ohne-falsche-sicherheit/)

## 3. Dezimalstellen runden und dabei UI und Rechenlogik vermischen

Ein häufiger Fehler ist, `toFixed(2)` überall zu nutzen und dann weiter mit dem Ergebnis zu rechnen, obwohl `toFixed` einen String liefert. Oder man rundet “für die Anzeige” und wundert sich über Rundungsartefakte in Berechnungen.

Die saubere Trennung:

-   für Anzeige: `Intl.NumberFormat` mit `maximumFractionDigits`
-   fürs Rechnen: bewusst runden und als Number behalten

[Deep Dive](https://oliverjessner.at/blog/2026-01-14-javascript-auf-maximal-2-nachkommastellen-runden-wenn-noetig/)

## 4. Strings “formatieren” ohne Sonderfälle

"Ersten Buchstaben großschreiben" klingt trivial, wird aber schnell falsch, wenn Leerstrings, Whitespaces oder bereits formatierte Inhalte auftauchen. Anfänger schreiben oft schnell `str[0].toUpperCase()` und bekommen dann Exceptions oder kaputten Output.

Ein robustes Muster prüft zuerst, ob überhaupt Inhalt da ist und arbeitet dann bewusst weiter.

[Deep Dive](https://oliverjessner.at/blog/2026-01-01-javascript-ersten-buchstaben-in-groszschreiben/)

## 5. Closures nutzen, ohne sie zu verstehen

Closures tauchen überall auf: Event-Handler, Timer, Callbacks. Anfänger wundern sich dann, warum eine Variable “noch da” ist oder warum in einer Schleife alle Handler denselben Wert liefern.

Die pragmatische Faustregel:

-   Closures merken sich ihren umgebenden Scope (lexical scoping)
-   `let` in Loops verhindert viele der klassischen Fallstricke

[Deep Dive](https://oliverjessner.at/blog/2026-01-14-javascript-wie-closures-funktionieren-und-warum-sie-so-nuetzlich-sind/)

## Ein Muster, das alle fünf Fehler verbindet

Die meisten Anfängerfehler entstehen, weil JavaScript dir mehrere Ebenen gleichzeitig anbietet:

-   Daten vs. Darstellung
-   Mutation vs. immutables Arbeiten
-   “sieht richtig aus” vs. “ist robust gegen Sonderfälle”
-   Scope im Code vs. Verhalten zur Laufzeit

Wenn du dir bei neuen Snippets kurz diese Trennlinien bewusst machst, wird dein Code automatisch stabiler und leichter zu warten.
