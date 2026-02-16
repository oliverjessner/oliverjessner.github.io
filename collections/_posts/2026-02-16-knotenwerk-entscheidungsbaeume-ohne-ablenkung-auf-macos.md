---
layout: post
title: 'KnotenWerk – Entscheidungsbäume ohne Ablenkung auf macOS'
date: 2026-02-16 15:45:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - macos
    - software-development
    - vibecoding
description: 'KnotenWerk ist ein ruhiges Tool für Entscheidungsbäume mit Edit- und Demo-Modus, lokal gespeicherten JSON-Graphs und Export nach SVG und Markdown'
thumbnail: '/assets/images/gen/blog/knotenwerk-entscheidungsbaeume-ohne-ablenkung-auf-macos/header_thumbnail.webp'
image: '/assets/images/gen/blog/knotenwerk-entscheidungsbaeume-ohne-ablenkung-auf-macos/header.webp'
faq:
    - question: 'Für wen ist KnotenWerk gedacht?'
      answer: 'Für alle, die Entscheidungen als Pfade modellieren wollen: Produktideen, Workflows, Content-Planung oder technische Abläufe. Der Fokus liegt auf klaren Knoten, beschrifteten Pfaden und einem ruhigen Interface.'
    - question: 'Was ist der Unterschied zwischen Edit Mode und View/Demo Mode?'
      answer: 'Im Edit Mode baust du den Graphen, setzt Knoten und Verbindungen. Im View/Demo Mode klickst du Entscheidungen wie ein Nutzer durch und siehst den aktiven Pfad. Das hilft beim Testen, Erklären und Präsentieren.'
    - question: 'Warum local-first statt Cloud?'
      answer: 'Weil deine Graphen normale Dateien bleiben. KnotenWerk speichert sie als JSON auf deinem Rechner, damit du sie verschieben, versionieren und unabhängig von einem Service nutzen kannst.'
---

KnotenWerk ist mein Versuch, Entscheidungsbäume so simpel zu machen, dass man sie tatsächlich benutzt: ruhig, lokal, exportierbar und ohne Tool-Kram, der vom Denken ablenkt.

Zur Landingpage: [KnotenWerk](https://oliverjessner.at/knotenwerk/).

## KnotenWerk – Warum ich ein ruhiges Graph-Tool wollte

Es gibt genug Tools, die alles können. Mindmaps, Whiteboards, Notion-Boards, Diagramm-Editoren, Projektplanung, Kollaboration und noch drei KI-Buttons dazu. Genau das ist oft das Problem: Sobald das Tool mehr Aufmerksamkeit will als die Entscheidung selbst, verliere ich den Faden.

KnotenWerk ist bewusst anders. Es ist ein kleines Tool für Entscheidungsbäume und einfache Graphen. Du baust Pfade, beschriftest Abzweigungen und klickst Entscheidungen später wie ein Nutzer durch. Das Interface bleibt absichtlich ruhig, damit der Inhalt dominiert.

## Edit Mode – Bauen, verbinden, strukturieren

Im Edit Mode erstellst du Knoten und verbindest sie über beschriftete Entscheidungen. Das ist der Kern: nicht zeichnen um des Zeichnens willen, sondern Optionen als klare Pfade modellieren.

Typische Fälle aus meinem Alltag:

- Content-Entscheidungen: Welche Storyline ist stärker, wenn ich mit Hook A starte und danach Schritt B erkläre?
- Projekt-Entscheidungen: Welche Abhängigkeiten entstehen, wenn ich Feature X verschiebe?
- Tech-Entscheidungen: Welche Wege gibt es bei einem Bug, wenn Log A oder Log B auftaucht?

Der Vorteil gegenüber einer Liste: Du siehst sofort, welche Entscheidungen Folgeentscheidungen auslösen.

## View Mode – Durchklicken, testen, erklären

Der zweite Modus ist für mich das eigentliche Argument: View/Demo. Dort klickst du Entscheidungen entlang, und KnotenWerk hebt den aktiven Pfad hervor. Das klingt simpel, ist aber extrem praktisch, wenn du nicht nur entwerfen, sondern auch prüfen willst.

![Ein Screenshot von KnotenWerk](/assets/images/side_projects/knotenwerk/tree.webp)

Beispiele:

- Du testest, ob ein Entscheidungsbaum wirklich vollständig ist, oder ob du an einer Stelle in eine Sackgasse läufst.
- Du erklärst einem Kollegen einen Ablauf, ohne zu scrollen oder ständig zu sagen "geh mal zu Abschnitt drei".
- Du präsentierst Optionen, ohne nebenbei live am Diagramm herumzuziehen.

## Local-first – Deine Graphen sind Dateien

KnotenWerk ist local-first. Jeder Graph wird als JSON auf deinem Rechner gespeichert. Das ist bewusst gewählt, weil es die robusteste Form von Kontrolle ist: Du besitzt die Dateien, du kannst sie verschieben, du kannst sie sichern, du kannst sie in Git legen.

Ein gekürztes Beispiel, wie so eine Datei aussieht:

```json
{
    "id": "g_93b853ae-6ceb-4bca-96c8-c0591af61966",
    "name": "Idea 3",
    "version": 1,
    "createdAt": "2026-02-14T14:36:19.996Z",
    "updatedAt": "2026-02-14T14:49:58.603Z",
    "nodes": []
}
```

Das ist keine Magie, sondern absichtlich boring. Ein Format, das man notfalls auch ohne KnotenWerk lesen kann.

## Exporte – JSON, SVG und Markdown

Ich wollte drei Outputs, die in echten Workflows landen können:

1. JSON für Maschine, Wiederverwendung und Versionierung
2. SVG für Doku, Slides und saubere Grafiken
3. Markdown für Dokumentation, Tickets und schnelle Texte

Ein Beispiel für den Markdown-Export sieht so aus:

```markdown
## Todo

- [ ] An IGN pitchen
- [ ] YouTube Langform Video erstellen
- [ ] TikTok Video erstellen
- [ ] Reel erstellen
- [ ] YouTube Short erstellen
- [ ] thread text schreiben
- [ ] LinkedIn text Schreiben
```

Das ist bewusst simpel. Der Export soll nicht beeindrucken, sondern dort funktionieren, wo du sowieso arbeitest.

## macOS, Retro-Look, moderner Unterbau

KnotenWerk sieht aus wie ein Windows 98 Tool, läuft aber als native App auf [macOS](https://oliverjessner.at/category/macos), aktuell auf Apple Silicon. Der Retro-Look ist nicht Nostalgie um der Nostalgie willen, sondern eine Design-Entscheidung: Weniger visuelle Reize, mehr Fokus auf Struktur.

## Warum ich KnotenWerk überhaupt veröffentliche

Ich baue gerne kleine Werkzeuge, die einen klaren Job haben. KnotenWerk ist genau so ein Projekt: ein ruhiger Editor für Entscheidungen, der Dateien respektiert und Exporte ernst nimmt.

Wenn du ein Tool willst, das dich nicht mit Features überredet, sondern dich beim Denken unterstützt, dann ist KnotenWerk mein Angebot. Und wenn du Feedback hast, landet es bei mir nicht in einem Support-Ticket, sondern direkt im nächsten Build.
