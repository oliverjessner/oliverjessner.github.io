---
layout: post
title: 'SEO – mal anders: Wie mein Blog endlich Struktur bekommen hat'
date: 2026-02-16 12:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - web-development
    - browser
    - Kolumne
description: 'Was sich an meinem Blog konkret verbessert hat: Inhaltsverzeichnis, Updates, FAQ, JSON-LD und sauberere Meta-Daten ohne SEO-Voodoo'
thumbnail: '/assets/images/gen/blog/seo-mal-anders-wie-mein-blog-endlich-struktur-bekommen-hat/header_thumbnail.webp'
image: '/assets/images/gen/blog/seo-mal-anders-wie-mein-blog-endlich-struktur-bekommen-hat/header.webp'
faq:
    - question: 'Warum sollte ein Blog überhaupt ein Inhaltsverzeichnis haben?'
      answer: 'Weil Leser schneller zur relevanten Stelle springen und der Text besser scannbar wird. Gerade bei längeren Tutorials oder Erfahrungsberichten spart das Zeit und senkt die Absprungrate, ohne dass man den Inhalt "kürzer schreibt".'
    - question: 'Was bringt es, Updates am Artikel sichtbar zu markieren?'
      answer: 'Transparenz. Wenn sich Tools, Menüs oder Dateipfade ändern, sehen Leser sofort, ob der Text gepflegt ist. Das reduziert Rückfragen und verhindert, dass jemand einer veralteten Anleitung folgt.'
    - question: 'Warum sind JSON-LD, Meta-Titel und Descriptions mehr als kosmetisch?'
      answer: 'Sie sind strukturierte Signale: Meta-Titel und Descriptions entscheiden oft, ob jemand in Suchergebnissen überhaupt klickt. JSON-LD hilft Suchmaschinen, den Inhalt maschinenlesbar einzuordnen, etwa bei FAQ oder Artikeln.'
---

Ich habe von SEO wenig Ahnung. Haufen wir mal das mein Blog jetzt sichtbarer und vor allem besser nutzbar, weil ich ihn mit Hilfe von [Alexander Außermayr](https://aussermayr.com/) strukturiert und technisch sauberer gemacht habe. Alexander ist sowas wie der Jesus der SEO-Welt. Wenn ihr jemanden für SEO, CRO und Webanalyse sucht, meldet euch bei ihm.

## SEO – mal anders: Erstmal die Basics der Nutzbarkeit

Ich habe Texte geschrieben, veröffentlicht und dann gehofft, dass sie gefunden werden. Das funktioniert manchmal, aber es ist keine Strategie. Mit Alexander Außermayr habe ich deshalb nicht an "Tricks" gearbeitet, sondern an Dingen, die für Leser unmittelbar helfen und nebenbei auch Suchmaschinen besser verstehen lassen, was da eigentlich steht.

Ein Blog ist nicht nur eine Sammlung von Artikeln. Er ist auch ein System aus Navigation, Kontext und Erwartungen – zumindest sehe ich das ab heute so.

## Inhaltsverzeichnisse für alle Blogposts

Die sichtbarste Änderung: Alle Blogposts haben jetzt ein Inhaltsverzeichnis. Das klingt banal, ist aber für lange Texte ein echter Unterschied. Wer nur schnell wissen will, wo ein bestimmter Abschnitt steht, muss nicht scrollen und raten. Gerade bei technischen Themen, also viel [Webentwicklung](https://oliverjessner.at/category/web-development/), Setup-Schritten oder Troubleshooting, ist das der Unterschied zwischen "ich finde es" und "ich gebe auf".

Für mich hat sich dadurch auch der Schreibprozess verbessert. Wenn ich weiß, dass ein Inhaltsverzeichnis sichtbar ist, merke ich schneller, wo die Struktur hakt. Überschriften werden klarer, Abschnitte sinnvoller abgegrenzt, und der Text lässt sich leichter pflegen.

## Updates sind jetzt klar erkennbar

Ein Problem bei Techniktexten ist nicht der erste Release, sondern die Zeit danach. Tools ändern sich, Menüs wandern, Dateipfade werden angepasst. Wenn ein Blogpost Updates erhalten hat, wird das jetzt oben gekennzeichnet. Das ist kein Marketing, sondern ein Service: Leser sehen sofort, ob sie einem Stand folgen, der noch passt.

Das nimmt auch mir Druck raus. Ich muss nicht so tun, als wäre ein Artikel "fertig". Ich kann ihn pragmatisch weiterentwickeln und transparent zeigen, was sich geändert hat.

## FAQ für die letzten 22 Artikel und künftig als Standard

Die letzten 22 Artikel haben jetzt ein FAQ, und das soll auch in Zukunft Standard werden. Nicht, weil "FAQ gut für SEO" ist, sondern weil die gleichen Rückfragen immer wieder kommen. Ein gutes FAQ fängt diese Fragen ab, ohne den Fließtext zu überladen.

Ich mag FAQs besonders, wenn sie ehrlich sind. Also nicht nur "Wie toll ist das Tool?", sondern Fragen wie: Für wen lohnt es sich? Wo sind Grenzen? Was geht schief? Das ist oft der Teil, der aus einem netten Text einen hilfreichen macht.

## Unter der Haube: JSON-LD und bessere Meta-Daten

Neben den sichtbaren Änderungen hat sich auch technisch einiges getan: JSON-LDs, sauberere Meta-Titel und bessere Descriptions. Das sind genau die Details, die Leser kaum wahrnehmen, die aber in Suchergebnissen und Vorschauen im [Browser](https://oliverjessner.at/category/browser) den Ausschlag geben können.

Ein kleines Beispiel: FAQ-Markup via JSON-LD. Das ist kein Zauber, sondern strukturierte Beschreibung dessen, was ohnehin auf der Seite steht.

```json
{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Warum sollte ein Blog ein Inhaltsverzeichnis haben?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Weil Leser schneller navigieren und der Text besser scannbar wird."
            }
        }
    ]
}
```

Wichtig ist dabei die Haltung: Ich will keine juristisch wackligen Versprechen, keine künstliche Optimierung und keinen Bullshit. Wenn Meta-Titel und Descriptions präziser sind, dann weil sie klarer sagen, was Leser erwartet. Nicht weil irgendeine Checkliste das verlangt.

## Was ich aus dem SEO-Update mitnehme

Ich habe gelernt, dass SEO für mich am besten funktioniert, wenn ich es als Qualitätsarbeit am Medium sehe. Struktur schlägt Tricks. Pflege schlägt Hype. Und Transparenz schlägt den Versuch, perfekt zu wirken.

Der Blog ist jetzt nicht nur "optimierter". Er ist besser benutzbar. Und das ist am Ende das Ziel, egal ob jemand über eine Suche kommt, über Social Media oder direkt über oliverjessner.at.

Wenn ich künftig an Artikeln arbeite, will ich genau diesen Standard halten: klare Struktur, sichtbare Pflege und technische Grundlagen, die man nicht spürt, die aber zuverlässig ihren Job machen.
