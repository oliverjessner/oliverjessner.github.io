---
layout: post
title: 'NO-BULLSHIT-RSS: Warum ich einen RSS-Reader mit CLI entwickelt habe'
date: 2026-11-14 00:21:55 +0100
authors:
  - oliver_jessner
meta_og_type: article
categories:
  - macos
  - terminal
  - software-development
description: 'RSS lesen, Most-read-Listen abrufen und Artikel ins eigene System pipen: Warum ich NO-BULLSHIT-RSS mit CLI und Analytics entwickelt habe'
thumbnail: /assets/images/gen/blog/no-bullshit-rss-warum-ich-einen-rss-reader-mit-cli-entwickelt-habe/header_thumbnail.webp
image: /assets/images/gen/blog/no-bullshit-rss-warum-ich-einen-rss-reader-mit-cli-entwickelt-habe/header.webp
faq:
  - question: Warum habe ich NO-BULLSHIT-RSS entwickelt?
    answer: Mir fehlte ein RSS-Reader, der eine Desktop-Oberfläche, eine nutzbare CLI, direkt von Websites abgerufene Most-read-Listen und ein integriertes Analysesystem verbindet.
  - question: Kann ich RSS-Artikel über die CLI weiterverarbeiten?
    answer: Ja. Die CLI liest gespeicherte Daten und liefert unter anderem URLs, Titel oder JSON für eigene Skripte und Pipes. Neue Inhalte ruft die App ab.
  - question: Was zeigen die Most-read-Analysen?
    answer: Sie zeigen gespeicherte Ranglisten und beobachtete Platzierungen unterstützter Websites. Daraus lassen sich keine absoluten Aufrufzahlen ableiten.
socialmedia:
  - Warum einen eigenen RSS-Reader entwickeln? Mir fehlte die Kombination aus CLI, Most-read-Listen direkt von Websites und integrierter Analyse. Daraus ist NO-BULLSHIT-RSS entstanden. https://oliverjessner.at/no-bullshit-rss/
  - 'Artikel im RSS-Reader sammeln und anschließend ins eigene System pipen: Genau dafür habe ich die CLI von NO-BULLSHIT-RSS gebaut. Gespeicherte Inhalte lassen sich im Terminal abfragen und weiterverarbeiten.'
  - NO-BULLSHIT-RSS verbindet RSS, Publisher-Ranglisten und Analytics. Entscheidend ist für mich, Artikel lesen, einordnen und weiterverarbeiten zu können. Das Projekt gibt es in Version 2.1.0.
news: true
pinned: false
ads: true
image_width: 1280
image_height: 720
---

Ich wollte RSS lesen, Most-read-Listen direkt von Websites abrufen und Artikel in mein eigenes System pipen. Weil mir diese Kombination fehlte, habe ich NO-BULLSHIT-RSS entwickelt.

## Warum ich einen eigenen RSS-Reader gebaut habe

Mein Ausgangspunkt war eine konkrete Anforderung: Ich wollte Nachrichten in einer Oberfläche lesen und dieselben Daten über die Kommandozeile weiterverwenden können. Dazu sollten die Most-read-Listen der Websites kommen und ein Analysesystem, das die gesammelten Inhalte auswertbar macht.

Unter den RSS-Readern, die ich mir angesehen habe, fand ich diese Kombination nicht so, wie ich sie brauchte. Mir fehlte eine passende CLI als Teil des gesamten Werkzeugs.

Deshalb habe ich NO-BULLSHIT-RSS entwickelt. Der RSS-Reader für [macOS](https://oliverjessner.at/category/macos/) soll sich in meine Arbeitsweise einfügen: Artikel sammeln, Zusammenhänge sichtbar machen und Daten für die Weiterverarbeitung bereitstellen.

<figure class="post-image">
    <a href="/assets/images/side_projects/no-bullshit-rss/mockups/feed_cards_1920.webp">
        <img
            src="/assets/images/side_projects/no-bullshit-rss/mockups/feed_cards_1200.webp"
            srcset="/assets/images/side_projects/no-bullshit-rss/mockups/feed_cards_361.webp 361w, /assets/images/side_projects/no-bullshit-rss/mockups/feed_cards_1200.webp 1200w, /assets/images/side_projects/no-bullshit-rss/mockups/feed_cards_1920.webp 1920w"
            sizes="(min-width: 1000px) 900px, 100vw"
            width="1200"
            height="675"
            alt="NO-BULLSHIT-RSS mit chronologischem Feed, Artikeln in Kartenansicht und Filtern für Themen und Quellen"
            loading="lazy"
            decoding="async"
        />
    </a>
    <figcaption>Der chronologische Feed von NO-BULLSHIT-RSS mit Kartenansicht und Filtern.</figcaption>
</figure>

## Eine CLI, mit der ich RSS ins eigene System pipen kann

Eine grafische Oberfläche ist praktisch zum Lesen. Sobald ich Artikeldaten in eigene Abläufe übernehmen möchte, brauche ich einen anderen Zugang.

Mit einer CLI kann ich Ergebnisse abfragen, filtern und an weitere Programme übergeben. Damit wird der RSS-Reader zu einer Datenquelle für mein eigenes System.

Die [CLI von NO-BULLSHIT-RSS](https://oliverjessner.at/no-bullshit-rss/#cli) greift lesend auf die lokale Datenbank der App zu. Sie kann gespeicherte Artikel und Digests ausgeben. Das Abrufen neuer Inhalte übernimmt die App.

### Die neuesten Artikel im Terminal ausgeben

Dieser Befehl liefert URLs und Titel von bis zu zehn der neuesten gespeicherten Artikel:

```sh
no-bullshit-rss articles last 10 --url --title
```

### Artikelausgaben über eine Pipe filtern

Für eine einfache Textsuche lässt sich die Ausgabe direkt weiterreichen:

```sh
no-bullshit-rss articles last 100 --url --title | grep -i 'nvidia'
```

Das Beispiel filtert die ausgegebenen Zeilen nach "nvidia". Es durchsucht nicht automatisch den vollständigen Artikelinhalt.

Genau diese Anschlussfähigkeit war mir wichtig. Im [Terminal](https://oliverjessner.at/category/terminal/) möchte ich Daten mit vorhandenen Werkzeugen bearbeiten können, ohne sie zuerst aus einer Oberfläche kopieren zu müssen.

## Most read direkt von den Websites abrufen

Neben neuen Artikeln interessieren mich die Beiträge, die eine Website in ihren eigenen Ranglisten hervorhebt. Ein chronologischer Feed und eine Most-read-Liste beantworten unterschiedliche Fragen: Was wurde veröffentlicht? Und welche Beiträge tauchen beim jeweiligen Anbieter als besonders häufig gelesen auf?

Deshalb wollte ich diese Listen direkt von den Websites abrufen und im Reader zusammenführen.

NO-BULLSHIT-RSS unterstützt dafür ausgewählte Medien, darunter Golem, ComputerBase, t3n und The Verge. Je nach Anbieter stehen meistgelesene, meistkommentierte oder redaktionell ausgewählte Beiträge zur Verfügung. Diese Auswahltypen müssen getrennt betrachtet werden. Die unterstützten Anbieter beschreibt das [Projekt auf GitHub](https://github.com/oliverjessner/NO-BULLSHIT-RSS).

<figure class="post-image">
    <a href="/assets/images/side_projects/no-bullshit-rss/mockups/most_read_1920.webp">
        <img
            src="/assets/images/side_projects/no-bullshit-rss/mockups/most_read_1200.webp"
            srcset="/assets/images/side_projects/no-bullshit-rss/mockups/most_read_361.webp 361w, /assets/images/side_projects/no-bullshit-rss/mockups/most_read_1200.webp 1200w, /assets/images/side_projects/no-bullshit-rss/mockups/most_read_1920.webp 1920w"
            sizes="(min-width: 1000px) 900px, 100vw"
            width="1200"
            height="675"
            alt="Most-read-Ansicht von NO-BULLSHIT-RSS mit gespeicherten Publisher-Ranglisten und gekennzeichneten Platzierungen"
            loading="lazy"
            decoding="async"
        />
    </a>
    <figcaption>Die Most-read-Ansicht zeigt gespeicherte Publisher-Ranglisten mit Quellen und Platzierungen.</figcaption>
</figure>

### Gespeicherte Publisher-Ranglisten als JSON ausgeben

Auch die gespeicherten Ranglisten lassen sich über die CLI abfragen:

```sh
no-bullshit-rss articles top --medium t3n --json
```

Die JSON-Ausgabe lässt sich anschließend in eigenen Skripten verarbeiten. Der Befehl liest den gespeicherten Stand; er startet keinen neuen Abruf der Website.

Für mich verbindet das zwei Anforderungen: Ich kann die Auswahl im Reader ansehen und dieselben Daten in meinen eigenen Ablauf übernehmen.

## Ein integriertes Analysesystem für Artikel und Rankings

Ich habe außerdem ein umfassendes Analysesystem eingebaut. Denn eine Artikelsammlung wird für mich interessanter, wenn ich ihre Entwicklung untersuchen kann.

<figure class="post-image">
    <a href="/assets/images/side_projects/no-bullshit-rss/mockups/analytics_overview_1920.webp">
        <img
            src="/assets/images/side_projects/no-bullshit-rss/mockups/analytics_overview_1200.webp"
            srcset="/assets/images/side_projects/no-bullshit-rss/mockups/analytics_overview_361.webp 361w, /assets/images/side_projects/no-bullshit-rss/mockups/analytics_overview_1200.webp 1200w, /assets/images/side_projects/no-bullshit-rss/mockups/analytics_overview_1920.webp 1920w"
            sizes="(min-width: 1000px) 900px, 100vw"
            width="1200"
            height="675"
            alt="Analytics-Übersicht von NO-BULLSHIT-RSS mit Kennzahlen und dem zeitlichen Verlauf der gespeicherten Artikel"
            loading="lazy"
            decoding="async"
        />
    </a>
    <figcaption>Die Analytics-Übersicht zeigt Kennzahlen und den zeitlichen Verlauf der gespeicherten Artikel.</figcaption>
</figure>

Der Bereich Analytics umfasst Übersichten, Themenverläufe, Publisher-Vergleiche und Most-read-Auswertungen. Damit lassen sich beispielsweise folgende Fragen untersuchen:

- Welche Themen kommen in der gespeicherten Berichterstattung häufiger vor?
- Wie unterscheiden sich die erfassten Artikelmengen verschiedener Publisher?
- Welche Beiträge erscheinen wiederholt in den abgerufenen Ranglisten?

<figure class="post-image">
    <a href="/assets/images/side_projects/no-bullshit-rss/mockups/analytics_publisher_comparison_1920.webp">
        <img
            src="/assets/images/side_projects/no-bullshit-rss/mockups/analytics_publisher_comparison_1200.webp"
            srcset="/assets/images/side_projects/no-bullshit-rss/mockups/analytics_publisher_comparison_361.webp 361w, /assets/images/side_projects/no-bullshit-rss/mockups/analytics_publisher_comparison_1200.webp 1200w, /assets/images/side_projects/no-bullshit-rss/mockups/analytics_publisher_comparison_1920.webp 1920w"
            sizes="(min-width: 1000px) 900px, 100vw"
            width="1200"
            height="1088"
            alt="Publisher-Vergleich von NO-BULLSHIT-RSS mit Artikelverläufen, Themenanteilen und beobachteten Ranking-Auftritten"
            loading="lazy"
            decoding="async"
        />
    </a>
    <figcaption>Der Publisher-Vergleich stellt Artikelmengen, Themenanteile und beobachtete Ranking-Auftritte gegenüber.</figcaption>
</figure>

Die Auswertung arbeitet mit dem gespeicherten Bestand. Bei Rankings zeigt sie beobachtete Platzierungen und deren Verlauf. Das sind keine absoluten Aufrufzahlen und keine direkte Messung der gesamten Leserschaft. Diese Grenze nennt auch die [Analytics-Beschreibung im Repository](https://github.com/oliverjessner/NO-BULLSHIT-RSS#explore-analytics).

Für meine Einordnung ist diese Unterscheidung entscheidend. Eine Position in einer Publisher-Liste liefert einen Anhaltspunkt. Sie erklärt für sich allein weder die Reichweite eines Artikels noch die Gründe für seine Platzierung.

<figure class="post-image">
    <a href="/assets/images/side_projects/no-bullshit-rss/mockups/analytics_ranking_history_1920.webp">
        <img
            src="/assets/images/side_projects/no-bullshit-rss/mockups/analytics_ranking_history_1200.webp"
            srcset="/assets/images/side_projects/no-bullshit-rss/mockups/analytics_ranking_history_361.webp 361w, /assets/images/side_projects/no-bullshit-rss/mockups/analytics_ranking_history_1200.webp 1200w, /assets/images/side_projects/no-bullshit-rss/mockups/analytics_ranking_history_1920.webp 1920w"
            sizes="(min-width: 1000px) 900px, 100vw"
            width="1200"
            height="1091"
            alt="Ranking-Historie eines Artikels mit beobachteten Positionen in Most-commented- und Most-read-Listen"
            loading="lazy"
            decoding="async"
        />
    </a>
    <figcaption>Die Ranking-Historie zeigt erfasste Platzierungen eines Artikels in den Publisher-Listen.</figcaption>
</figure>

## Warum Lesen, Analyse und CLI zusammengehören

Für mich hängen diese Funktionen unmittelbar zusammen. Der Feed liefert neue Artikel. Die Publisher-Ranglisten ergänzen eine weitere Perspektive. Analytics macht Entwicklungen im gespeicherten Bestand sichtbar. Über die CLI kann ich Ergebnisse schließlich in mein eigenes System pipen.

Dahinter steckt eine praktische Entscheidung aus der [Softwareentwicklung](https://oliverjessner.at/category/software-development/): Wenn ich Inhalte bereits lokal sammle, möchte ich sie auch außerhalb der Oberfläche nutzen können.

Nicht jeder braucht dafür eine Kommandozeile. Für meinen Anwendungsfall war sie jedoch einer der Gründe, das Projekt überhaupt zu starten.

## NO-BULLSHIT-RSS in Version 2.1.0

NO-BULLSHIT-RSS ist in Version 2.1.0 erhältlich. Das Projekt ist ein kostenloser, quelloffener RSS-Reader für macOS.

Einen Überblick und den Einstieg findest du auf der [Landingpage von NO-BULLSHIT-RSS](https://oliverjessner.at/no-bullshit-rss/). Quellcode und Dokumentation liegen im [GitHub-Repository](https://github.com/oliverjessner/NO-BULLSHIT-RSS).

Entwickelt habe ich den Reader, weil mir ein Werkzeug für genau diesen Ablauf fehlte: Nachrichten lesen, die Auswahl der Websites nachvollziehen, den eigenen Bestand analysieren und mit den Daten weiterarbeiten.
