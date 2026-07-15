---
layout: post
title: 'Vibe Coding statt Webflow – was eine Website-Migration über SaaS verrät'
date: 2026-05-23 12:00:00 +0100
last_modified_at: 2026-06-11 13:00:10 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - vibecoding
    - software-development
    - Privacy
description: 'Eine Website-Migration zeigt, wo KI-gestützte Eigenlösungen SaaS entlasten und wo ihre Grenzen liegen'
thumbnail: '/assets/images/gen/blog/vibe-coding-statt-webflow-was-eine-website-migration-ueber-saas-verraet/header_thumbnail.webp'
image: '/assets/images/gen/blog/vibe-coding-statt-webflow-was-eine-website-migration-ueber-saas-verraet/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Kann Vibe Coding klassische SaaS-Tools ersetzen?'
      answer: 'Teilweise. Besonders einfache Workflows, interne Tools, Content-Strukturen und Integrationen lassen sich heute schneller individuell bauen. Komplexe Plattformkerne bleiben aber schwer ersetzbar.'
    - question: 'Warum sah der Traffic nach der Migration um 80 Prozent niedriger aus?'
      answer: 'Der Rückgang lag laut Erfahrungsbericht vor allem am veränderten Tracking. Nach der Migration wurden Nutzer ohne Cookie-Zustimmung nicht mehr an Google Analytics gemeldet.'
    - question: 'Was ist die wichtigste Lehre aus der Migration?'
      answer: 'KI kann technische Migrationen stark beschleunigen. Entscheidend bleiben aber Kontrolle, saubere Redirects, Datenschutz, Monitoring und die Frage, ob das eigene Team den neuen Stack langfristig betreiben kann.'
---

Eine Website mit über 1.000 Seiten in wenigen Stunden neu bauen klingt nach typischem KI-Versprechen. Spannend wird es aber dort, wo aus dem Experiment eine ernsthafte Frage entsteht: Brauchen Teams für jede Website, jedes CMS und jede Landingpage wirklich noch klassische SaaS-Plattformen wie Webflow?

Genau diese Frage stellt sich bei einer Webflow-Migration besonders deutlich. Webflow ist bequem, visuell, etabliert und für Marketing-Teams oft leichter bedienbar als ein eigener Code-Stack. Gleichzeitig bindet es Inhalte, Komponenten, Hosting und Workflows eng an eine Plattform.

Mit Vibe Coding entsteht eine neue Alternative. Tools wie Cursor, v0.dev, Lovable, Bolt.new oder Replit senken die Einstiegshürde für individuelle Website-Stacks. Sie machen es leichter, Frontends zu bauen, Komponenten zu rekonstruieren, CMS-Daten zu verarbeiten und Deployments auf Plattformen wie Vercel oder Netlify vorzubereiten.

Das heißt nicht, dass Webflow plötzlich überflüssig ist. Es heißt aber, dass sich die Kosten-Nutzen-Rechnung verändert.

## CMS-Daten exportieren: Funktioniert der Transfer zu Vibe-Coding-Stacks?

Ein Erfahrungsbericht von Hopsworks beschreibt eine Migration, die vor wenigen Jahren noch nach einem größeren Relaunch-Projekt geklungen hätte. Die Website bestand aus mehr als 1.000 Seiten. Darunter waren Blogposts, Landingpages, Videos, Glossareinträge und viele ältere Inhalte.

Die Seite lief seit 2018 auf Webflow. Das war aus damaliger Sicht nachvollziehbar. Webflow machte es nicht-technischen Teams einfach, Inhalte zu pflegen und Seiten zu bauen. Genau darin lag der Wert: weniger Abhängigkeit von Entwicklerinnen und Entwicklern, schnelle Änderungen, eine visuelle Oberfläche und integriertes Hosting.

Bei einer Migration wird aber sichtbar, was diese Bequemlichkeit kostet. Inhalte liegen nicht einfach als neutrale Daten herum. Sie hängen an CMS-Strukturen, Slugs, Komponenten, Bildern, Metadaten, internen Links und historischen Design-Entscheidungen.

Für Vibe-Coding-Stacks ist deshalb nicht die erste Frage, ob Cursor, Replit oder Bolt.new eine neue Seite erzeugen können. Das können sie oft erstaunlich schnell. Die wichtigere Frage lautet: Können die bestehenden Inhalte sauber übernommen werden?

Bei einer Webflow-Migration müssen vor allem diese Punkte geprüft werden:

```text
1. Lassen sich alle CMS-Collections vollständig exportieren?
2. Bleiben Slugs, Canonicals und Meta-Daten erhalten?
3. Werden Bilder, Alt-Texte und interne Links korrekt übernommen?
4. Gibt es alte Seiten, die Redirects brauchen?
5. Werden strukturierte Daten, Sitemaps und Robots-Regeln sauber neu erzeugt?
6. Wer prüft nach der Migration, ob alle wichtigen URLs weiterhin funktionieren?
```

Gerade bei großen Websites ist Vibe Coding deshalb kein magischer Export-Knopf. Es ist eher ein Beschleuniger. Cursor kann helfen, Migrationsskripte zu schreiben. v0.dev kann beim Aufbau neuer Komponenten nützlich sein. Lovable oder Bolt.new können einfache Admin-Oberflächen oder Content-Workflows prototypisieren. Replit kann für schnelle Experimente reichen.

Die eigentliche Verantwortung bleibt aber beim Team.

## Hosting & Deployment: Von Webflow Servers zu Vercel/Netlify

Webflow nimmt Teams viel Infrastrukturarbeit ab. Hosting, SSL, CDN, Formulare, CMS-Oberfläche und Deployment sind in einem System gebündelt. Genau das ist bequem. Genau das macht einen späteren Wechsel aber auch komplex.

Wer von Webflow weggeht, muss entscheiden, wohin die Website technisch wandert. Häufig landen Vibe-Coding-Projekte bei Stacks mit React, Next.js, Astro oder ähnlichen Frameworks. Das Deployment läuft dann oft über Vercel, Netlify, Cloudflare Pages oder eigene Infrastruktur.

Das bringt mehr Kontrolle, aber auch mehr Verantwortung. Statt "in Webflow veröffentlichen" gibt es plötzlich Repositories, Build-Prozesse, Environment Variables, Preview Deployments, Rollbacks und Monitoring.

Für Entwicklerinnen und Entwickler kann das ein Vorteil sein. Für Marketing-Teams kann es ein Rückschritt sein, wenn danach jede kleine Änderung durch einen technischen Prozess muss.

Die zentrale Frage lautet daher nicht nur: Können wir Webflow ersetzen?

Die bessere Frage lautet: Wer betreibt danach den neuen Stack?

Ein eigener Vibe-Coding-Stack kann sinnvoll sein, wenn ein Team ohnehin technisch arbeitet, klare Deployment-Prozesse hat und Inhalte strukturiert verwalten kann. Er wird riskant, wenn Webflow nur deshalb ersetzt wird, weil die Migration technisch möglich ist.

## Design-Treue: Kann Vibe Coding Webflow-Komponenten 1:1 ersetzen?

Eine der größten Sorgen bei einer Webflow-Migration ist die Design-Treue. Auf den ersten Blick wirkt eine Website oft einfacher, als sie tatsächlich ist. Farben, Abstände, Buttons und Karten lassen sich schnell nachbauen. Schwieriger werden Interaktionen, Breakpoints, Animationen, Formularlogik und kleine Sonderfälle, die über Jahre gewachsen sind.

Tools wie v0.dev, Lovable oder Bolt.new können aus Beschreibungen sehr schnell UI-Entwürfe erzeugen. Cursor kann helfen, bestehende Komponenten zu refaktorisieren oder fehlende Zustände nachzubauen. Trotzdem bleibt die Frage, ob das Ergebnis wirklich dieselbe Website ist oder nur eine ähnlich aussehende neue Version.

Bei einer Migration von Webflow zu einem eigenen Stack sollte deshalb nicht nur die Startseite geprüft werden. Wichtiger sind die langweiligen Seiten:

```text
1. Alte Blogposts
2. Glossarseiten
3. Landingpages mit abweichendem Layout
4. Formulare
5. Fehlerseiten
6. Mobile Ansichten
7. Archivseiten
8. Seiten mit eingebetteten Videos
```

Genau dort entstehen viele Migrationsfehler. Eine moderne Startseite sieht schnell gut aus. Eine gewachsene Website mit 1.000 Seiten sauber zu übertragen ist eine andere Aufgabe.

Vibe Coding kann diesen Prozess beschleunigen. Es ersetzt aber nicht die finale Qualitätskontrolle.

## Tracking nach der Migration: Warum 80 Prozent weniger Traffic nicht immer Traffic-Verlust bedeuten

Besonders interessant ist der Teil des Hopsworks-Erfahrungsberichts, in dem zunächst ein Traffic-Einbruch von rund 80 Prozent sichtbar wurde. Nach einer großen Migration wäre das normalerweise ein ernstes Warnsignal.

Naheliegende Vermutungen gibt es viele: fehlende Redirects, kaputte Seiten, verlorene Rankings, falsche Metadaten, fehlerhafte Sitemaps, schwache Performance oder schlechtere interne Verlinkung. Genau solche Probleme können bei Relaunches tatsächlich massive Folgen haben.

In diesem Fall lag die Ursache laut Autor aber an einer anderen Stelle. Mit der Migration wurde auch das Tracking umgebaut. Vorher wurden Nutzer offenbar stärker von Google Analytics erfasst. Nach dem Umbau wurde das Tracking datenschutzfreundlicher umgesetzt. Wer Cookies nicht akzeptierte, wurde nicht mehr an Google Analytics gemeldet.

Die Folge: In Google Analytics sah es aus, als wäre der Traffic massiv eingebrochen. Ein internes cookieless Analytics-System zeigte jedoch, dass der reale Besucherstrom deutlich weniger stark betroffen war.

Das ist eine wichtige Lehre. Analytics misst nicht einfach "die Realität". Analytics misst das, was technisch, rechtlich und organisatorisch erfasst wird. Ändert sich das Tracking, ändert sich oft auch die Zahl.

Gerade bei [Privacy](https://oliverjessner.at/category/Privacy/) und Cookie-Consent ist das wichtig. Ein Rückgang in einem Dashboard kann ein echter Traffic-Verlust sein. Er kann aber auch zeigen, dass vorher mehr gemessen wurde, als heute noch gemessen werden soll.

## Wann SaaS bleibt und wann Vibe Coding reicht

Für Teams entsteht aus solchen Migrationen eine praktische Entscheidungsfrage: Ist ein Tool ein [strategischer Kern](https://oliverjessner.at/blog/2026-05-22-vibecoding-fuenf-einfache-regeln-fuer-mehr-sicherheit/) oder nur eine austauschbare Arbeitsschicht?

Wenn ein Tool nur Daten speichert, einfache Workflows ausführt und mit zwei internen Systemen verbunden ist, kann eine eigene Lösung sinnvoll sein. Wenn ein Tool regulatorische Anforderungen abbildet, kritische Prozesse steuert oder über Jahre gereifte Speziallogik enthält, ist Vorsicht angebracht.

Webflow liegt genau zwischen diesen Welten. Für manche Teams ist es nur ein Website-Baukasten. Für andere ist es das zentrale System für Marketing, SEO, Landingpages, Kampagnen und Content-Produktion.

Deshalb sollte eine Migration nicht mit der Frage beginnen, ob Cursor, v0.dev, Lovable, Bolt.new oder Replit die Seite nachbauen können. Die interessantere Frage lautet: Welche Funktion erfüllt Webflow im Unternehmen wirklich?

Ein einfacher Fragenkatalog kann helfen:

```text
1. Welche Webflow-Funktionen nutzen wir wirklich?
2. Welche Funktionen bezahlen wir, ohne sie zu brauchen?
3. Welche Daten liegen dort und wie leicht bekommen wir sie heraus?
4. Wer wäre intern für Betrieb und Wartung verantwortlich?
5. Was passiert, wenn der selbst gebaute Stack ausfällt?
6. Welche Sicherheits- und Datenschutzpflichten übernehmen wir selbst?
7. Ist Webflow strategisch wichtig oder nur operativer Klebstoff?
```

Solche Fragen sind weniger aufregend als die Aussage, dass man ein System "in einem Nachmittag" ersetzt hat. Aber sie entscheiden darüber, ob eine Migration sinnvoll ist.

## Fazit

[Vibe Coding](https://oliverjessner.at/category/vibecoding/) macht Webflow-Migrationen realistischer. Es senkt die Schwelle, bestehende SaaS-Systeme zu hinterfragen, eigene Stacks zu bauen und technische Schulden abzubauen. Gleichzeitig verschiebt es Verantwortung zurück ins eigene Team.

Der Hopsworks-Fall ist deshalb kein Beweis dafür, dass SaaS tot ist. Er ist ein gutes Beispiel dafür, dass der bequeme Standard nicht mehr automatisch die beste Lösung sein muss.

Wer Webflow durch einen Vibe-Coding-Stack ersetzen will, sollte nicht nur auf Geschwindigkeit schauen. Entscheidend sind CMS-Daten, Redirects, Design-Treue, Hosting, Deployment, Datenschutz, Monitoring und die Frage, ob das eigene Team den neuen Stack langfristig betreiben kann.

Quelle: https://www.hopsworks.ai/post/vibe-migrating-1k-pages-and-losing-80-percent-of-our-traffic
