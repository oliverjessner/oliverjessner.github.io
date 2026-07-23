---
layout: post
title: 'Ein Kommentarfilter für Social Media'
date: 2024-07-11 02:00:00 +0200
last_modified_at: 2026-07-23 20:11:37 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - javascript
    - css
    - Social Media
    - google
description: 'Ich habe eine Chrome-Extension geschrieben, welche Kommentare mit blauen Herzen ausblendet.'
thumbnail: '/assets/images/gen/blog/blauherzfilter/header_thumbnail.webp'
image: '/assets/images/gen/blog/blauherzfilter/header.webp'
image_width: 1280
image_height: 720
---

## BlauHerzFilter: Eine Chrome-Extension

Vor einiger Zeit hat mir einer meiner Follower gesagt, wir sollten eine Chrome-Extension schreiben, um Kommentare mit blauen Herzen auszublenden. Für alle, die nicht wissen, was damit gemeint ist, lasst mich das kurz erklären.

Die AfD (Alternative für Deutschland) ist eine politische Partei in Deutschland, die sich vermeintlich im rechten bis rechtsextremen Spektrum befindet. Die Anhänger dieser Partei kommentieren sehr oft einfach nur mit blauen Herz-Emojis 💙. Das können sehr viele dieser inhaltlosen Kommentare werden, was aus meiner Sicht nicht unbedingt einen Mehrwert bringt. Oft werden diese Herzen auch zum Provozieren genutzt, insbesondere bei Inhalten, die sich um Themen drehen, welche die AfD nicht unterstützt.

Kurzer Disclaimer: Ich selbst bin nicht Deutscher, sondern Österreicher, und habe mich in den letzten Jahren nie öffentlich zum Thema Politik geäußert. Ich bin auch weiterhin der Meinung, dass es besser ist, sich weder in sozialen Medien noch im beruflichen Leben in eine politische Richtung zu drängen. Außerdem bin ich der Meinung, dass das Recht auf Meinungsfreiheit und freie Meinungsäußerung eines der wichtigsten Elemente der menschlichen Gesellschaft ist. Dazu gehört auch, dass andere Menschen Meinungen haben dürfen, die einem nicht gefallen. Nichtsdestotrotz bin ich der Meinung, dass meine Extension nicht zensiert, sondern einfach für das einzelne Individuum ein besseres Erlebnis in sozialen Medien schafft.

Genug um den heißen Brei geredet, wie und wo funktioniert das Ding? Im Moment läuft es nur im Chrome-Browser und auf Instagram und TikTok. Dazu habe ich folgenden Stack gewählt: TypeScript und Tailwind. Das war völlig ausreichend, denn die Extension ist nicht sehr groß. Mein ursprünglicher Prototyp war einfach nur in JavaScript und CSS. Jedoch wünschen sich viele der Zuschauer Frameworks und TypeScript. Daher habe ich den Prototyp einfach in TypeScript und Tailwind portiert. Die Idee ist, aus der Extension ein Deep-Dive-Video auf YouTube zu machen, in dem ich genau erkläre, wie man die Applikation programmiert, sowie eine kurze TikTok-Serie.

Planung

Für so kleine Hobbyprojekte mache ich gerne eine kleine Mindmap wie diese hier. Nichts, wo ich stundenlang Sprints definieren muss oder andere aufwendige Elemente des Projektmanagements - einfach eine Mindmap mit Daten und Häkchen. Wenn ich mal etwas komplett alleine entwickeln will, möchte ich schnell sein.

![Die Mindmap für BlauHerzFilter](/assets/images/gen/blog/blauherzfilter/mindmap.webp)

## Die Oberfläche

In der derzeitigen Version 0.0.1 ist die Oberfläche sehr einfach gehalten. Im Endeffekt habe ich zwei Klassen für meine Checkbox erstellt, denn die normalen Checkboxen sind einfach langweilig, sowie das Label für die Checkbox:

```css
.social-media-checkbox {
    @apply relative appearance-none w-5 h-5 border rounded-full border-gray-500 cursor-pointer checked:bg-blue-800;
}

.checkbox-label {
    @apply text-gray-500 text-lg cursor-pointer float-left;
}
```

Der Rest sind Standard-Tailwind-Klassen. Ein Problem, das mir aufgefallen ist, ist, dass Chrome-Extensions keine runden Ecken erlauben. Ich wollte unbedingt ein Extension-Window mit einem Border-Radius, aber da kann man halt auch nichts machen.

Für das Design habe ich einfach schnell etwas hingeklatscht und mir wenig Gedanken darüber gemacht.

![Die Oberfläche von BlauHerzFilter](/assets/images/gen/blog/blauherzfilter/ui.webp)

Die Extension soll so einfach wie möglich sein: eine Checkbox pro Social-Media-Plattform. Im Screenshot darüber ist TikTok aktiv und Instagram inaktiv. Weiter geht es mit der Logik: Die Extension benötigt nur Zugriff auf den Speicher, sonst nichts. Denn ich muss speichern, welche Social-Media-Plattformen der User ausgewählt hat. Als Host-Berechtigungen (das ist Chrome-Extension-Sprache für die URLs, auf die ich Zugriff brauche) sind logischerweise im Moment TikTok und Instagram angegeben. Nun haben wir eine Popup-Logik, welche den User-Input-Klick auf eine Checkbox zur Content-Logik schickt.

Eine kleine Herausforderung, die uns Google hier stellt, ist, dass es APIs gibt, die nur in der Popup-Logik vorhanden sind und nicht in der Content-Logik und umgekehrt. Das Manipulieren des DOM muss in content.js erfolgen und die User-Logik muss in popup.js sein. Das Ganze synct man mit einem Nachrichtensystem, das so aussieht:

```typescript
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, message, () => {});
    }
});
```

und zum entfangen:

```typescript
chrome.runtime.onMessage.addListener((request: Message, _, sendResponse) => {
    // logik
    return sendResponse({ status: 'ok' });
});
```

Die Logik der einzelnen Social-Media-Plattformen habe ich in Klassen aufgeteilt, die jeweils von derselben Basisklasse erben. Im Prinzip machen sie nichts anderes, als den DOM zu beobachten und nach Kommentaren mit blauen Herzen zu suchen. Haben sie solche gefunden, fügen sie display: none hinzu. Wichtig ist hier, dass ich einen MutationObserver verwende, um Kommentare, die zum Beispiel durch Pagination nachgeladen werden, ebenfalls zu finden.

Es werden keine Daten gespeichert, und das Ganze läuft nur auf deinem PC. Hier kannst du auch die [offizielle Policy](https://oliverjessner.at/blauherzfilter-privacy-policy/) nachlesen, welche auch im Chrome Store bekannt gegeben werden musste.

## Vorher und Nachher

![Ein vergleich mit und ohne BlauHerzFilter](/assets/images/gen/blog/blauherzfilter/comparison.png)

## Fazit

Ja, meine allererste Chrome-Extension. Ich musste erstmal alles über Chrome-Extensions lernen, dann meinen Prototypen bauen und ihn anschließend portieren. Alles in allem habe ich knappe 8 Stunden investiert. Das Logo ist auch von mir und nichts Besonderes. Ich wollte die Applikation auch gleich einreichen, denn ich bin der Meinung, dass "Release early, release often" die bessere Strategie für Produkte ist. So kann man schneller Nutzerbedürfnisse und Fehler finden, ohne sich einen Elfenbeinturm an Software zu bauen. Falls du den Code sehen willst, er ist hier zu finden: [GitHub](https://github.com/oliverjessner/blauherzfilter). Willst du die Extension installieren? Dann kannst du das hier tun [Chrome Web Store](https://chromewebstore.google.com/detail/blauherzfilter/ekhanknjgoennfolmgpmhfhkfehcgldp).

### Zukunft

Wie sieht die Zukunft aus? Ich kann mir gut vorstellen, Pull-Requests von anderen anzunehmen, wenn sie gute Ideen haben, wie zum Beispiel das Zählen der Blauherzkommentare, die bereits blockiert wurden, oder natürlich die Unterstützung weiterer Social-Media-Plattformen und Browser. Ebenso kann ich mir auch vorstellen, mehr als nur das blaue Herz zu filtern. Es würde mich natürlich freuen, wenn viele die Extension nutzen und damit ein besseres Social-Media-Erlebnis erfahren. Möchtest du sehen, wie man diese Extension von Grund auf programmiert? Dann schau dir doch das YouTube-Video an, in dem wir Schritt für Schritt alles gemeinsam programmieren.

### Schritt für Schritt

Möchtest du sehen, wie man diese Extension von Grund auf programmiert? Dann schau dir doch das YouTube-Video an, in dem wir Schritt für Schritt alles gemeinsam programmieren.

<iframe width="560" height="315" src="https://www.youtube.com/embed/fPSKgTdB4XA?si=uv0DiC0Z5ncGWwb9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
