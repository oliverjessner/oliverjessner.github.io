# Buying Guides schreiben

Buying Guides liegen wie andere Artikel in `collections/_posts/`, verwenden aber
`layout: buying-guide`. Das Layout ergänzt das vorhandene Post-Layout um nummerierte
Produktabschnitte. Im Artikel sind dafür keine HTML-Blöcke nötig.

Buying Guides beginnen nach dem Header direkt mit den Produktabschnitten, ohne
zusätzliches Inhaltsverzeichnis, Einleitungsblock oder Übersichtstabelle.

## Zeitlose URLs für Geschenkelisten

Geschenkelisten verwenden zusätzlich `contentType: gift-guide` und einen expliziten
`slug`. Dadurch entsteht die URL `/geschenke/<slug>/`, unabhängig von Dateiname,
Publikationsdatum oder Jahreszahl im Titel. `layout: buying-guide` bestimmt weiterhin
die Darstellung; andere Kaufberatungen ohne diesen Content-Typ behalten ihre normale
Artikel-URL.

```yaml
contentType: gift-guide
slug: maenner-unter-50-euro
date: 2026-11-24 11:00:00 +0100
last_modified_at: 2026-11-25 10:00:00 +0100
redirectFrom:
    - /blog/eine-fruehere-veroeffentlichte-adresse/
```

- `slug` ist ein eindeutiger, kleingeschriebener Bezeichner aus Buchstaben, Zahlen
  und Bindestrichen. Bei jährlichen Aktualisierungen bleibt er unverändert.
  Jahressegmente wie `2026` sind nicht erlaubt; doppelte Slugs brechen den Build ab.
- `date` bleibt das ursprüngliche Publikationsdatum. `last_modified_at` wird bei
  einer redaktionellen Aktualisierung manuell gesetzt oder angepasst; der Build
  erzeugt dafür keinen neuen Zeitstempel. Zusätzliche Felder wie `publishedAt` oder
  `updatedAt` sind nicht nötig.
- `redirectFrom` ist optional und enthält weitere historische URL-Pfade. Die aus
  dem aktuellen Dateinamen abgeleitete `/blog/<dateiname-ohne-md>/`-Adresse wird
  automatisch als Weiterleitung berücksichtigt und muss nicht zusätzlich in der
  Liste stehen.

`title` bleibt die sichtbare H1. Optional überschreibt `meta_title` den HTML-Title
sowie Open-Graph- und Twitter-Titel, `meta_description` die entsprechenden
Beschreibungen. Jahreszahlen in diesen redaktionellen Feldern werden vom Build
nicht verändert. `date` liefert weiterhin RSS-`pubDate` und Schema-`datePublished`;
`last_modified_at` liefert Schema-`dateModified`, Sitemap-`lastmod` und das sichtbare
Aktualisierungsdatum. Ohne Aktualisierungsdatum verwendet das Schema das
Publikationsdatum.

### Routing, Übersicht und Hosting

`plugins/gift-guides.js` ist die gemeinsame URL-Quelle für Eleventy-Permalinks,
öffentliche Post-Daten, Blog-/Kategorie-Vorschauen und Linkhub. Die vorhandenen
Markdown-Dateien werden direkt unter ihrer Geschenke-URL ausgegeben; unter den
alten Blog-Adressen wird keine zusätzliche HTML-Seite erzeugt.

`/geschenke/` listet automatisch alle veröffentlichten Beiträge mit
`contentType: gift-guide`. Für neue Slugs oder Budgets ist nur eine weitere
Content-Datei nötig. Unveröffentlichte Beiträge erscheinen weder in der Übersicht
noch in den Weiterleitungen. Nicht vorhandene Listen erhalten keine Platzhalter.

`generated/gift-guide-redirects.11ty.js` verbindet beim Build die vorhandene
handgeschriebene `_redirects` mit direkten `301!`-Regeln aus den Content-Daten.
Das Ergebnis liegt in `_site/_redirects`, das Netlify mit dem bestehenden
Publish-Verzeichnis aus `netlify.toml` verwendet. Die Regeln decken auch
`index.html`-Adressen ab; Netlify behandelt Pfade mit und ohne abschließenden Slash
gleich. Zusätzliche Query-Parameter werden von Netlify weitergereicht.
Die Regeln erzeugen keine JavaScript- oder HTML-Weiterleitungen.
Siehe [Netlify: Redirect-Optionen](https://docs.netlify.com/manage/routing/redirects/redirect-options/).

Die Quelldateien bei späteren redaktionellen Updates beibehalten. Sollte eine
Quelldatei ausnahmsweise umbenannt werden, gehört ihre bisherige Blog-Adresse
zusätzlich in `redirectFrom`, damit die alte automatisch abgeleitete Adresse
weiterhin abgedeckt bleibt.

Gezielte Prüfungen: `npm run test:gift-guides` für Content-/Routing-Verträge,
`npm run build` einschließlich Build-QA, danach `npm run test:gift-guides:http`
für echte HTTP-Requests über Netlifys lokale Redirect-Engine. Letzteres startet
einen kurzlebigen Testserver und prüft ausschließlich lokale Build-Ausgaben;
es veröffentlicht oder deployt nichts.

Die Quelldateien, Produktbildpfade, Texte und Affiliate-Links bleiben bei einer
URL-Migration unverändert. Interne Artikelverweise zeigen direkt auf die neue
Geschenke-URL; ihre sichtbaren Linktexte bleiben erhalten.

### Migration der bestehenden Geschenkelisten

Die Spalte „Bisherige Artikel-URL“ wird automatisch aus dem weiterhin unveränderten
Dateinamen abgedeckt. Die zusätzlichen Aliasse stehen jeweils in `redirectFrom`.

| Geschenkeliste | Neue URL | Bisherige Artikel-URL | Zusätzlicher historischer Alias |
| --- | --- | --- | --- |
| Männer unter 50 Euro | `/geschenke/maenner-unter-50-euro/` | `/blog/2026-11-24-weihnachtsgeschenke-fuer-maenner-2026-unter-50euro/` | `/blog/2026-11-23-weihnachtsgeschenke-fuer-maenner-2026-unter-50euro/` |
| Männer unter 250 Euro | `/geschenke/maenner-unter-250-euro/` | `/blog/2026-11-23-weihnachtsgeschenke-fuer-maenner-2026-unter-250euro/` | `/blog/2026-11-24-weihnachtsgeschenke-fuer-maenner-2026-unter-250euro/` |
| Männer unter 500 Euro | `/geschenke/maenner-unter-500-euro/` | `/blog/2026-11-23-weihnachtsgeschenke-fuer-maenner-2026-unter-500euro/` | `/blog/2026-11-24-weihnachtsgeschenke-fuer-maenner-2026-unter-500euro/` |
| Geschenke bei ADHS | `/geschenke/adhs/` | `/blog/2026-11-24-weihnachtsgeschenke-adhs-2026-unter-30-euro/` | `/blog/2026-11-24-adhs-alltagshelfer-unter-30-euro/` |

Die Datumsvarianten der Budget-Guides sind durch frühere Quelldateinamen in der
Git-Historie belegt: `60c012af` und `e22f943d` für den 50-Euro-Guide,
`f6bf84ef` und `60c012af` für den 250-Euro-Guide sowie `e5721e03` und
`e22f943d` für den 500-Euro-Guide. Der zusätzliche ADHS-Alias war vor der lokalen
Umbenennung in den Weihnachtsgeschenke-Beitrag verwendet worden; in Git ist der
Beitrag seit `11c02417` unter seinem jetzigen Dateinamen gespeichert.

## Beispiel

Die üblichen Artikelmetadaten wie Datum, Autor, Kategorien, Beschreibung, Headerbild
und FAQ bleiben erhalten. Ein Guide mit einem Produkt sieht beispielsweise so aus:

```yaml
---
layout: buying-guide
contentType: gift-guide
slug: lego-fuer-star-wars-fans
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

- `name`: Produktname und Standard für die Überschrift.
- `title`: optional eine ausführlichere Produktüberschrift.
- `id`: optional eine feste Sprungmarke. Ohne Angabe entsteht sie aus Position und
  Produktname. Bereits veröffentlichte IDs beim Umordnen beibehalten.
- `category`: optional eine kurze Einordnung über der Überschrift.
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

Die Reihenfolge der `products` bestimmt die Reihenfolge und Nummerierung der Abschnitte. Produktdaten
müssen nur einmal gepflegt werden.

## Einstellungen des Guides

Produktbeschreibungen, Hinweise und `disclosure` unterstützen
Markdown. Die übrigen Beschriftungen sind normaler Text.

`cta_label` gilt für alle Kaufbuttons, sofern ein
Produkt keine eigene Beschriftung hat.

`affiliate_links: true` kennzeichnet Kauflinks mit `rel="sponsored"`. Der sichtbare
Affiliate-Hinweis am Ende wird über `disclosure` gepflegt; `disclosure_id` bestimmt
seine Sprungmarke. Ohne `disclosure` wird dieser Hinweis nicht eingeblendet. Die Einstellung `ads`
für die Website-Werbung ist davon unabhängig.

Die Vorlagen liegen in `_layouts/buying-guide.html` und
`_includes/buying-guide/`. Die Darstellung verwendet die gemeinsame Komponente
`assets/css/_native/theme/components/gift-guide.css`.
