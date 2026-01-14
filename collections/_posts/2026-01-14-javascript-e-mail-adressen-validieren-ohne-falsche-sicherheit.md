---
layout: post
title: 'JavaScript: E-Mail-Adressen validieren ohne falsche Sicherheit'
date: 2026-01-14 15:25:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - javascript
    - web-development
    - software-development
description: 'So validierst du E-Mail-Adressen in JavaScript pragmatisch: Browser-Validierung nutzen, Regex bewusst simpel halten und Zustellbarkeit immer serverseitig prüfen'
thumbnail: '/assets/images/gen/blog/javascript-e-mail-adressen-validieren-ohne-falsche-sicherheit/header_thumbnail.webp'
image: '/assets/images/gen/blog/javascript-e-mail-adressen-validieren-ohne-falsche-sicherheit/header.webp'
---

E-Mail-Validierung ist ein Klassiker, der oft überengineert wird. Mit einem pragmatischen Ansatz bekommst du gute UX, ohne legitime Adressen auszuschließen oder dir Scheinsicherheit einzubauen.

## Warum "valid" bei E-Mail-Adressen schnell trügt

Bei E-Mail-Adressen gibt es drei Ebenen, die man auseinanderhalten sollte:

-   Format: sieht aus wie eine E-Mail-Adresse
-   Zustellbarkeit: existiert die Domain und nimmt sie Mails an
-   Besitz: gehört die Adresse wirklich dem Nutzer

JavaScript im Browser kann dir beim Format und bei der UX helfen. Zustellbarkeit und Besitz sind dagegen serverseitige Themen.

## Der einfachste Weg: HTML input type="email" nutzen

Wenn du ein Formular hast, ist das der erste Schritt. Der Browser validiert das Format bereits und zeigt dem Nutzer eine native Fehlermeldung.

```html
<label>
    E-Mail
    <input type="email" name="email" required autocomplete="email" />
</label>
<button type="submit">Registrieren</button>
```

In JavaScript kannst du die eingebaute Validierung nutzen:

```js
const form = document.querySelector('form');
const emailInput = document.querySelector('input[name="email"]');

form.addEventListener('submit', e => {
    if (!emailInput.checkValidity()) {
        e.preventDefault();
        emailInput.reportValidity();
    }
});
```

Das ist oft besser als eigene Regex-Checks, weil es konsistent zur nativen Browserlogik bleibt.

## Wenn du dennoch selbst prüfen willst: bewusst simpel bleiben

Für viele Anwendungen reicht eine pragmatische Formatprüfung, die nur grobe Fehler abfängt. Diese Regex ist absichtlich nicht "RFC komplett", sondern auf Alltag optimiert:

```js
function looksLikeEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
```

Warum so simpel?

-   Strenge Regex blockieren reale Nutzer, zum Beispiel mit plus addressing
-   Es gibt gültige Randfälle, die du in der Praxis nicht sauber abdecken willst
-   Der eigentliche Qualitätscheck ist ohnehin serverseitig

Ein guter Kompromiss ist: Trim, lowercasing nur dort, wo es sinnvoll ist, und dann eine grobe Strukturprüfung.

```js
function normalizeEmail(value) {
    return value.trim();
}

function validateEmail(value) {
    const email = normalizeEmail(value);
    if (!looksLikeEmail(email)) return { ok: false, reason: 'format' };
    return { ok: true, value: email };
}
```

## Fehlermeldungen, die Nutzer wirklich weiterbringen

Validierung ist UX. Zwei typische Fehler sind:

-   zu generische Meldungen wie "invalid"
-   zu technische Meldungen wie "Regex failed"

Besser ist: kurz, konkret, ohne zu behaupten, du wüsstest mehr als du weißt.

```js
function emailErrorMessage(value) {
    if (!value.trim()) return 'Bitte gib eine E-Mail-Adresse ein';
    if (!looksLikeEmail(value)) return 'Bitte prüfe das Format, zum Beispiel name@domain.tld';
    return '';
}
```

In Kombination mit einem Formular:

```js
emailInput.addEventListener('input', () => {
    const msg = emailErrorMessage(emailInput.value);
    emailInput.setCustomValidity(msg);
});
```

Damit nutzt du die Browser-UI, kannst aber eigene, verständliche Texte liefern.

## Zustellbarkeit: nicht im Frontend lösen

Viele versuchen im Frontend Domains zu prüfen oder MX Records abzufragen. Das ist in Browser-JavaScript nicht sinnvoll. Was du stattdessen tun solltest:

-   serverseitig Domain prüfen, wenn du willst
-   bestätigende E-Mail mit Link versenden
-   erst nach Klick auf den Link als "verifiziert" markieren

Wenn du nur eine Sache konsequent machst, dann diese: Besitz wird nicht durch Regex geprüft, sondern durch einen Verifikationsprozess.

## Kurzfazit

Für Web-Forms ist `input type="email"` die stabilste Basis. Wenn du zusätzlich in JavaScript validierst, halte die Regex bewusst simpel und nutze sie nur für Formatchecks. Alles, was "existiert wirklich" oder "gehört wirklich" bedeutet, gehört auf den Server und endet in einer Bestätigungs-Mail.
