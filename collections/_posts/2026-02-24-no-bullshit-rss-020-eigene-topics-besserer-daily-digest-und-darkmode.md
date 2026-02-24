---
layout: post
title: 'NO-BULLSHIT-RSS 0.2.0 – Eigene Topics, besserer Daily Digest und Darkmode'
date: 2026-02-24 12:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - macos
    - software-development
    - vibecoding
description: 'NO-BULLSHIT-RSS 0.2.0 bringt eigene Topics, Topic-Filter, einen besseren Daily Digest und Darkmode für die tägliche Feed-Arbeit'
thumbnail: '/assets/images/gen/blog/no-bullshit-rss-020-eigene-topics-besserer-daily-digest-und-darkmode/header_thumbnail.webp'
image: '/assets/images/gen/blog/no-bullshit-rss-020-eigene-topics-besserer-daily-digest-und-darkmode/header.webp'
faq:
    - question: 'Was ist neu in NO-BULLSHIT-RSS 0.2.0?'
      answer: 'Version 0.2.0 bringt eigene Topics, Topic-Filter, einen verbesserten Daily Digest mit Listen und robusterem Clustering, Darkmode sowie kleinere Workflow-Verbesserungen wie Clear-Button und Sofortsuche per Rechtsklick.'
    - question: 'Wofür sind eigene Topics im Alltag nützlich?'
      answer: 'Eigene Topics helfen dabei, Feeds nicht nur nach Quellen, sondern nach tatsächlichen Themen zu organisieren. Das ist besonders praktisch, wenn du viele Quellen beobachtest und schnell relevante Artikel bündeln willst.'
    - question: 'Was bringen Stop Words und ausgeschlossene Quellen im Daily Digest?'
      answer: 'Damit wird der Daily Digest sauberer. Du kannst irrelevante Begriffe ausblenden und bestimmte Quellen vom Digest ausschließen, damit Cluster fokussierter und besser lesbar bleiben.'
---

Mit Version 0.2.0 wird NO-BULLSHIT-RSS im Alltag deutlich praktischer. Das Update erweitert nicht nur den Daily Digest, sondern verbessert vor allem das thematische Arbeiten mit vielen Feeds, Filtern und wiederkehrenden Recherchewegen.

## Was Version 0.2.0 im Kern verbessert

Das Update wirkt wie ein typischer Schritt von "funktioniert schon" zu "fühlt sich im Alltag richtig gut an". Der Fokus liegt klar auf Struktur, schnellerer Navigation und besserer Lesbarkeit.

Neu sind vor allem diese Punkte:

- Eigene Topics definieren
- Nach Topics filtern
- Daily Digest mit Listen
- Clear-Button im Dashboard oder per Esc
- Stop Words und ausgeschlossene Quellen für den Daily Digest
- Fuzzigeres Clustering mit stärkerer Matching-Logik und Guardrails
- Wort markieren, rechtsklicken und sofort suchen
- Darkmode

Gerade wenn man RSS nicht nur passiv liest, sondern aktiv für Recherche, Monitoring oder Redaktionsarbeit nutzt, sind das keine kosmetischen Änderungen. Sie reduzieren Reibung.

## Eigene Topics statt starrer Kategorien

Die wichtigste Änderung ist aus meiner Sicht die Einführung eigener Topics. Statt nur mit Quellenlisten zu arbeiten, kann NO-BULLSHIT-RSS jetzt Themen erkennen, die du selbst definierst.

Das ist im Alltag stark, weil viele relevante Artikel über sehr unterschiedliche Quellen verteilt sind. Ein Thema wie [KI](/category/ki) oder Git taucht oft gleichzeitig in Blogs, News-Seiten, Foren und Hersteller-Updates auf. Mit eigenen Topics lässt sich dieser Strom besser bündeln.

Für mich ist das ein sinnvoller Schritt in Richtung themenbasierter Recherche statt rein quellenbasierter Navigation.

![Screenshot für NO-BULLSHIT-RSS](/assets/images/side_projects/no-bullshit-rss/mockups/dark_dashboard.webp)

## Daily Digest wird deutlich reifer

Der Daily Digest ist weiterhin einer der spannendsten Bereiche von NO-BULLSHIT-RSS, weil er versucht, Artikel nicht nur anzuzeigen, sondern sinnvoll zu bündeln.

In 0.2.0 wurde hier an mehreren Stellen geschraubt:

- eigene Digest-Ansicht mit geclusterten Artikeln
- fuzzigeres Clustering
- stärkere Matching-Logik
- Stop Words
- Quellen für den Digest gezielt ausschließen

Das ist ein gutes Paket, weil Clustering immer ein Balanceakt ist. Zu streng und zusammengehörige Artikel landen getrennt. Zu locker und unterschiedliche Themen werden vermischt.

Die Kombination aus "fuzzier matching" plus Guardrails klingt nach einem pragmatischen Ansatz: mehr Treffer, aber mit Absicherung gegen offensichtliche Fehlgruppierungen. Genau so sollte man solche Systeme im Alltag verbessern.

![Screenshot für NO-BULLSHIT-RSS](/assets/images/side_projects/no-bullshit-rss/mockups/dark_daily_digest.webp)

## Stop Words und Source Excludes sind klein, aber sehr wichtig

Diese beiden Funktionen wirken unscheinbar, sind für die Qualität eines Digests aber oft entscheidend.

Stop Words helfen dabei, zb Werbung zu filtern. Das reduziert Rauschen. Ausgeschlossene Quellen sind nützlich, wenn bestimmte Feeds zwar im Reader sinnvoll sind, aber den Daily Digest regelmäßig verzerren.

Ein typisches Beispiel sind Quellen mit sehr ähnlichen Meldungen oder hoher Posting-Frequenz. Im normalen Lesen sind sie okay. Im Digest dominieren sie sonst schnell das Bild.

![Screenshot für NO-BULLSHIT-RSS](/assets/images/side_projects/no-bullshit-rss/mockups/dark_daily_digest_setup.webp)

## Schnellere Recherche im Lesefluss

Ein Detail, das im Alltag überraschend viel bringt: Wort markieren, rechtsklicken und sofort suchen.

Das ist ein sehr praktischer Recherche-Shortcut, vor allem wenn man beim Lesen auf Begriffe, Projekte oder Firmennamen stößt, die man direkt einordnen will. Der Lesefluss bleibt erhalten, statt dass man Begriffe kopiert, Tabs wechselt und manuell sucht.

## Darkmode und kleine UX-Verbesserungen

Darkmode ist kein Pflichtfeature für jedes Tool, aber bei einem Reader sehr sinnvoll. Wer länger liest, merkt den Unterschied sofort, besonders abends oder bei längeren Recherche-Sessions.

Dazu kommen kleinere Verbesserungen wie der Clear-Button im Dashboard und der Shortcut per Esc. Das klingt banal, ist aber typische UX-Arbeit, die ein Interface ruhiger macht. Weniger Klicks, weniger visuelles Chaos, schneller zurück in einen sauberen Zustand.

![Screenshot für NO-BULLSHIT-RSS](/assets/images/side_projects/no-bullshit-rss/mockups/both_dashboard.webp)

## Einordnung nach dem Update

- eigener Themenlogik
- besserem Filtering
- reiferem Daily Digest
- kleinen, schnellen Interaktionen im UI

Wenn NO-BULLSHIT-RSS als Werkzeug für kuratierte Feeds und Recherche gedacht ist, dann geht diese Version in die richtige Richtung. Sie macht das System nicht nur funktionsreicher, sondern vor allem steuerbarer.

## Worauf ich als Nächstes achten würde

Nach so einem Update wird spannend, wie stabil das Clustering in realen Feeds über mehrere Tage läuft. Gerade bei ähnlichen Schlagzeilen, Syndication und Reposts zeigt sich, wie gut die Guardrails wirklich greifen.

Ebenso interessant ist, wie sich eigene Topics in der Praxis entwickeln: Ob Nutzer eher wenige präzise Topics definieren oder viele breite Themenräume anlegen. Beide Nutzungsarten brauchen etwas unterschiedliche Defaults.
