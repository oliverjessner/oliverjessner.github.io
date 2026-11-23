# Buying Guides schreiben

Buying Guides liegen wie andere Artikel in `collections/_posts/`, verwenden aber
`layout: buying-guide`. Das Layout ergänzt das vorhandene Post-Layout um Einleitung,
Produktübersicht und Produktabschnitte. Im Artikel sind dafür keine HTML-Blöcke nötig.

## Beispiel

Die üblichen Artikelmetadaten wie Datum, Autor, Kategorien, Beschreibung, Headerbild
und FAQ bleiben erhalten. Ein Guide mit einem Produkt sieht beispielsweise so aus:

```yaml
---
layout: buying-guide
title: LEGO als Geschenk für Star-Wars-Fans
date: 2026-11-24 00:00:00 +0100
authors:
    - oliver_jessner
categories:
    - buying-guide
    - gaming
description: Eine LEGO-Geschenkidee für Star-Wars-Fans und Hinweise zur Auswahl.
news: false
pinned: false
ads: false
buying_guide:
    eyebrow: Geschenkguide
    intro: >-
        **Ein Bauprojekt zum Abschalten:** Dieses LEGO-Set ist eine Geschenkidee
        für Fans der klassischen Star-Wars-Filme.
    count_label: Geschenkideen
    facts:
        - Persönliche Auswahl
    overview_title: Geschenkideen im Überblick
    cta_label: Bei Amazon ansehen
    affiliate_links: true
    disclosure: >-
        **Transparenz:** Dieser Artikel enthält Affiliate-Links. Bei einem Kauf
        erhalte ich möglicherweise eine Provision. Für dich entstehen keine
        zusätzlichen Kosten.
products:
    - name: LEGO Star Wars AT-AT Walker 8129
      title: LEGO Star Wars AT-AT Walker 8129 – ein analoges Bauprojekt
      category: Star Wars & Bauen
      ideal_for: Star-Wars-Fans und Sammler
      benefit: Analoges Bauprojekt statt Bildschirmzeit
      audience: Star-Wars-Fans und alle, die gerne mit den Händen bauen.
      description: >-
          Der **LEGO Star Wars AT-AT Walker 8129** ist ein nostalgisches
          Bauprojekt für Fans der klassischen Filme.
      note: >-
          **Darauf achten:** Bei einem älteren Set sind Zustand und
          Vollständigkeit des Angebots entscheidend.
      image: /assets/images/gen/blog/weihnachtsgeschenke-fuer-maenner-2026-unter-500euro/lego_walker.webp
      image_alt: LEGO Star Wars AT-AT Walker 8129 auf der Verpackung mit grauem Walker und Minifiguren
      url: https://link.amazon/B03lO5Cra
---

## Worauf es bei der Auswahl ankommt

Hier steht der redaktionelle Text nach den Produktabschnitten, etwa Einordnung,
Kaufhinweise, Fragen oder ein Fazit. Ganz normal als Markdown.
```

## Produktfelder

- `name`: kurzer Produktname für die Übersicht und als Standard für die Überschrift.
- `title`: optional eine ausführlichere Produktüberschrift.
- `id`: optional eine feste Sprungmarke. Ohne Angabe entsteht sie aus Position und
  Produktname. Bereits veröffentlichte IDs beim Umordnen beibehalten.
- `category`: optional eine kurze Einordnung über der Überschrift.
- `ideal_for` und `benefit`: Zielgruppe und Nutzen in der Übersichtstabelle.
- `audience`: optional die ausführlichere Zielgruppe im Produktabschnitt.
- `description`: Produktbeschreibung als Markdown. Mit `|` lassen sich mehrere
  Absätze schreiben.
- `note`: optional ein Hinweis als Markdown, beispielsweise mit
  `**Darauf achten:**` am Anfang.
- `image` und `image_alt`: optionales Produktbild mit beschreibendem Alt-Text.
  Die Maße lokaler Bilder werden automatisch erkannt; Lazy Loading und responsive
  Bildgrößen übernimmt das Layout. Ohne Bild nutzt der Abschnitt die gesamte Breite.
  Geplante Dateinamen dürfen schon eingetragen werden: Solange die lokale Datei
  fehlt, erscheint die Textvariante. Nach dem Ablegen wird das Bild beim nächsten
  Build automatisch eingeblendet. Das Headerbild des Artikels muss bereits existieren.
- `url`: optionaler Kauflink. Ohne URL wird kein Button angezeigt.
- `cta_label`: optional eine abweichende Buttonbeschriftung für dieses Produkt.
- `affiliate`: optional `true` oder `false`, um die Affiliate-Einstellung des Guides
  für diesen Link zu überschreiben.

Die Reihenfolge der `products` bestimmt Übersicht und Nummerierung. Produktdaten
müssen nur einmal gepflegt werden.

## Einstellungen des Guides

`buying_guide.intro`, Produktbeschreibungen, Hinweise und `disclosure` unterstützen
Markdown. Die übrigen Beschriftungen sind normaler Text.

`count_label` ergänzt die automatisch ermittelte Produktanzahl; `facts` enthält
weitere kurze Merkmale. Die Übersicht lässt sich mit `overview_title`, `overview_id`
und `overview_hint` beschriften. `cta_label` gilt für alle Kaufbuttons, sofern ein
Produkt keine eigene Beschriftung hat.

Die Spaltenüberschriften lassen sich mit `overview_product_label`,
`overview_audience_label` und `overview_benefit_label` an das jeweilige Thema anpassen.

`affiliate_links: true` kennzeichnet Kauflinks mit `rel="sponsored"`. Der sichtbare
Affiliate-Hinweis wird über `disclosure` gepflegt; `disclosure_id` und
`disclosure_label` passen seine Sprungmarke und den Link in der Einleitung an.
Ohne `disclosure` werden diese Hinweise nicht eingeblendet. Die Einstellung `ads`
für die Website-Werbung ist davon unabhängig.

Die Vorlagen liegen in `_layouts/buying-guide.html` und
`_includes/buying-guide/`. Die Darstellung verwendet die gemeinsame Komponente
`assets/css/_native/theme/components/gift-guide.css`.
