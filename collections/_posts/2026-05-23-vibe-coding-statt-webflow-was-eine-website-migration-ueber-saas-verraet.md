---
layout: post
title: 'Vibe Coding statt Webflow – was eine Website-Migration über SaaS verrät'
date: 2026-05-23 12:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - vibecoding
    - software-development
    - Privacy
description: 'Eine Website-Migration zeigt, wo KI-gestützte Eigenlösungen SaaS entlasten und wo ihre Grenzen liegen'
thumbnail: '/assets/images/gen/blog/vibe-coding-statt-webflow-was-eine-website-migration-ueber-saas-verraet/header_thumbnail.webp'
image: '/assets/images/gen/blog/vibe-coding-statt-webflow-was-eine-website-migration-ueber-saas-verraet/header.webp'
faq:
    - question: 'Kann Vibe Coding klassische SaaS-Tools ersetzen?'
      answer: 'Teilweise. Besonders einfache Workflows, interne Tools, Content-Strukturen und Integrationen lassen sich heute schneller individuell bauen. Komplexe Plattformkerne bleiben aber schwer ersetzbar.'
    - question: 'Warum sah der Traffic nach der Migration um 80 Prozent niedriger aus?'
      answer: 'Der Rückgang lag laut Erfahrungsbericht vor allem am veränderten Tracking. Nach der Migration wurden Nutzer ohne Cookie-Zustimmung nicht mehr an Google Analytics gemeldet.'
    - question: 'Was ist die wichtigste Lehre aus der Migration?'
      answer: 'KI kann technische Migrationen stark beschleunigen. Entscheidend bleiben aber Kontrolle, saubere Redirects, Datenschutz, Monitoring und die Frage, ob das eigene Team den neuen Stack langfristig betreiben kann.'
---

Eine Website mit über 1.000 Seiten in wenigen Stunden neu bauen klingt nach typischem KI-Versprechen. Spannend wird es aber dort, wo aus dem Experiment eine ernsthafte Frage entsteht: Welche SaaS-Tools brauchen Teams wirklich noch?

## Vibe Coding statt Webflow

Ein Erfahrungsbericht von Hopsworks beschreibt eine Migration, die vor wenigen Jahren noch nach einem größeren Relaunch-Projekt geklungen hätte. Die Website des Unternehmens bestand Ende 2025 aus mehr als 1.000 Seiten. Darunter waren Blogposts, Landingpages, Videos, Glossareinträge und viele ältere Inhalte.

Die Seite lief seit 2018 auf Webflow. Das war aus damaliger Sicht nachvollziehbar. Webflow machte es nicht-technischen Teams einfach, Inhalte zu pflegen und Seiten zu bauen. Genau darin lag der Wert: weniger Abhängigkeit von Entwicklerinnen und Entwicklern, schnelle Änderungen, eine visuelle Oberfläche und ein integriertes Hosting.

Mit der Zeit wurde daraus aber ein anderes Problem. Viele Seiten, viele Komponenten und viele historische Entscheidungen lagen in einem System, das zwar bequem war, aber nur begrenzt flexibel. Inhalte, Layouts, Struktur und Hosting waren eng an eine Plattform gebunden. Der Wechsel wurde dadurch nicht unmöglich, aber schwerer.

Der interessante Punkt ist nicht, dass Webflow schlecht wäre. Der interessante Punkt ist, dass sich die Kosten-Nutzen-Rechnung verändert hat.

## Der angebliche Traffic-Crash

Besonders interessant ist der Teil des Erfahrungsberichts, in dem Hopsworks zunächst einen Traffic-Einbruch von rund 80 Prozent sah. Nach einer großen Migration wäre das ein ernstes Warnsignal.

Naheliegende Vermutungen gibt es viele: fehlende Redirects, kaputte Seiten, verlorene Rankings, falsche Metadaten, fehlerhafte Sitemaps, schwache Performance oder schlechtere interne Verlinkung. Genau solche Probleme können bei Relaunches tatsächlich massive Folgen haben.

In diesem Fall lag die Ursache laut Autor aber an einer anderen Stelle. Mit der Migration wurde auch das Tracking umgebaut. Vorher wurden Nutzer offenbar stärker von Google Analytics erfasst, auch wenn sie nicht in gleicher Weise gegenüber dem eigenen System sichtbar waren. Nach dem Umbau wurde das Tracking datenschutzfreundlicher umgesetzt. Wer Cookies nicht akzeptierte, wurde nicht mehr an Google Analytics gemeldet.

Die Folge: In Google Analytics sah es aus, als wäre der Traffic massiv eingebrochen. Ein internes cookieless Analytics-System zeigte jedoch, dass der reale Besucherstrom deutlich weniger stark betroffen war.

Das ist eine wichtige Lehre. Analytics misst nicht einfach "die Realität". Analytics misst das, was technisch, rechtlich und organisatorisch erfasst wird. Ändert sich das Tracking, ändert sich oft auch die Zahl.

Gerade bei [Privacy](https://oliverjessner.at/category/Privacy/) und Cookie-Consent ist das wichtig. Ein Rückgang in einem Dashboard kann ein echter Traffic-Verlust sein. Er kann aber auch zeigen, dass vorher mehr gemessen wurde, als heute noch gemessen werden soll.

## Die neue Frage für interne Tools

Für Teams entsteht daraus eine praktische Entscheidungsfrage: Ist ein Tool ein strategischer Kern oder nur eine austauschbare Arbeitsschicht?

Wenn ein Tool nur Daten speichert, einfache Workflows ausführt und mit zwei internen Systemen verbunden ist, kann eine eigene Lösung sinnvoll sein. Wenn ein Tool regulatorische Anforderungen abbildet, kritische Prozesse steuert oder über Jahre gereifte Speziallogik enthält, ist Vorsicht angebracht.

Der Unterschied ist nicht immer offensichtlich. Gerade deshalb lohnt sich eine nüchterne Prüfung.

Ein einfacher Fragenkatalog kann helfen:

```text
1. Welche Funktion des SaaS-Tools nutzen wir wirklich?
2. Welche Funktionen bezahlen wir, ohne sie zu brauchen?
3. Welche Daten liegen dort und wie leicht bekommen wir sie heraus?
4. Wer wäre intern für Betrieb und Wartung verantwortlich?
5. Was passiert, wenn das selbst gebaute Tool ausfällt?
6. Welche Sicherheits- und Datenschutzpflichten übernehmen wir selbst?
7. Ist das Tool strategisch wichtig oder nur operativer Klebstoff?
```

Solche Fragen sind weniger aufregend als die Aussage, dass man ein System "in einem Nachmittag" ersetzt hat. Aber sie entscheiden darüber, ob eine Migration sinnvoll ist.

## Fazit

Vibe Coding macht interne Eigenlösungen realistischer. Es senkt die Schwelle, bestehende Systeme zu hinterfragen und technische Schulden abzubauen. Gleichzeitig verschiebt es Verantwortung zurück ins eigene Team.

Der Hopsworks-Fall ist deshalb kein Beweis dafür, dass SaaS tot ist. Er ist ein gutes Beispiel dafür, dass der bequeme Standard nicht mehr automatisch die beste Lösung sein muss.

Quelle: [https://www.hopsworks.ai/post/vibe-migrating-1k-pages-and-losing-80-percent-of-our-traffic](https://www.hopsworks.ai/post/vibe-migrating-1k-pages-and-losing-80-percent-of-our-traffic)
