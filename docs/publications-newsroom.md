# Redaktionelles Veröffentlichungsarchiv

`/journalismus/publications/` verwendet die bestehende Eleventy-/Liquid-Pipeline und die redaktionellen `news-feature`-/`news-row`-Bausteine aus dem Blog. Die Gestaltung bleibt auf den Veröffentlichungsinhalt begrenzt; die globale Navigation und der Footer werden nicht neu gestaltet.

## Daten und Auswahl

Die vorhandenen JSON-Dateien unter `_data/publications/` bleiben die einzige Quelle der vollständigen Artikel. `plugins/publications-page.js` bereitet daraus ein reines Präsentationsmodell auf: Herausgeber, unveränderte externe Ziele, gültige Veröffentlichungsdaten, globale chronologische Reihenfolge, URL-Deduplizierung, höchstens zwei unterschiedliche Themen sowie abgeleitete Anzahlen. Die Quelldateien werden nicht verändert.

Das Archiv umfasst auch den vorhandenen MeinBezirk-Beitrag, der bisher nicht in der Herausgeberregistrierung stand. Für MeinBezirk wird kein Logo erfunden. Die fünf bereits lokal vorhandenen Medienlogos bleiben erhalten.

Die hervorgehobenen Recherchen werden über Quellenkennung und Artikel-Slug ausgewählt; vollständige Artikel werden nicht nochmals gespeichert. Methodenangaben stammen ausschließlich aus den bestehenden Recherchefällen der Journalismus-Seite. Aufmacher und Archiv verwenden dieselben Originalartikel und die vorhandenen lokalen Bilder.

Der bisherige Front-Matter-Wert von zwei Print-Veröffentlichungen bleibt eine Informationsangabe. Im Repository fehlen zuordenbare strukturierte Print-Einträge mit belegten Titeln, Ausgaben, Daten, Verweisen oder Titelbildern. Deshalb entstehen weder erfundene Print-Karten noch entsprechende Online-ItemList-Einträge. Für eine spätere Ergänzung werden diese bibliografischen Angaben benötigt.

## Bedienung und progressive Erweiterung

Alle Online-Artikel werden als statische HTML-Liste ausgegeben. Ohne JavaScript bleibt das vollständige Archiv sichtbar; die erweiterten Filter und der Mehr-anzeigen-Button bleiben verborgen. Es werden keine bereits vorhandenen Artikeldaten nachgeladen.

Mit JavaScript erscheinen zunächst 20 Artikel. Der Mehr-anzeigen-Button ergänzt bis zu 20 weitere passende Artikel. Publisher- und Jahresfilter berücksichtigen immer den vollständigen Datensatz. Die Medienanzahlen beziehen sich auf das ausgewählte Jahr; die Live-Meldung nennt getrennt die angezeigte und die passende Gesamtzahl. Eine leere Kombination hat eine sichtbare Erklärung. Native Buttons, `aria-pressed`, sichtbare Fokusrahmen und eine beschriftete Jahresauswahl unterstützen die Tastaturbedienung.

Die Parameter `publisher`, `year` und `limit` bilden den Archivzustand in der URL ab. Zurück/Vorwärts und Neuladen stellen ihn wieder her; unbekannte Werte werden auf gültige Standardwerte zurückgesetzt. Nach der letzten Erweiterung bleibt der fokussierte Button mit dem Hinweis „Alle Veröffentlichungen angezeigt“ und `aria-disabled="true"` erhalten.

Die bestehende kanonische URL, Pagefind-Integration, CollectionPage-, Person-, BreadcrumbList- und ItemList-Daten bleiben erhalten. Die Online-ItemList enthält ausschließlich echte Online-Artikel, mit den ursprünglichen Veröffentlichungsdaten, Medien und Autorenverweisen.

## Reproduzierbare Prüfungen

```bash
npm test
npm run build
npm run qa
npm run test:browser
```

Der reine Datenmodelltest steht in `scripts/tests/publications-page-test.mjs`. `tools/qa/validate-publications-page.js` vergleicht das tatsächlich gebaute Archiv mit allen vorhandenen Artikel-JSON-Dateien und prüft Reihenfolge, Eindeutigkeit, Originaldaten, reale Aufmacher, lokale responsive Bilddateien, Maße, native Semantik und die Online-ItemList.

`scripts/tests/browser/publications.spec.mjs` ergänzt die bestehende Playwright-/axe-Infrastruktur. Der lokale Testserver liefert `_site/` auf `127.0.0.1:4192`; Drittanbieter-Anfragen sind in den Browserprüfungen blockiert. Die Fälle decken die vollständigen Daten, Filter aller Medien, Erweiterung im aktiven Filter, URL-Zustand, Zurück/Vorwärts, Tastaturfokus, leere Jahreskombination, Schema, Profile und die Nutzung ohne JavaScript ab.

Die Ansichten werden bei 1920, 1440, 768, 390 und 320 CSS-Pixeln auf Überlauf und axe-Verstöße geprüft. Zusätzlich werden 200 Prozent Textvergrößerung und 320 CSS-Pixel als Reflow-Äquivalent zu 400 Prozent Zoom ausgehend von 1280 Pixeln geprüft. Dies ist keine Bedienung der nativen Browser-Zoomoberfläche. Automatisierte axe-Prüfungen ersetzen keine vollständige WCAG-Abnahme oder VoiceOver-/NVDA-Sitzung.

Vor Änderungen wurden die vorhandenen Blog- und KI-Ressortseiten bei 1440 und 390 Pixeln als HTML, SHA-256-Werte, berechnete Styles und echte Screenshots unter `/tmp/publications-reference/` gesichert. Diese temporären Vergleichsdateien gehören nicht zum Commit.

## Ergebnisse vom 18. Oktober 2026

- `npm test`, `npm run build` und `npm run qa`: erfolgreich. Die Produktions-QA prüft 762 HTML-Dateien, 79.426 lokale Verweise und 1.166 JSON-LD-Blöcke ohne kaputte lokale Verweise.
- `npm run test:browser`: 47 Tests bestanden, darunter die zwölf neuen Veröffentlichungsfälle. Die geprüften Ansichten und Filterzustände haben keine gemeldeten axe-Verstöße und keine JavaScript-Seitenfehler.
- Veröffentlichungsmodell und gebautes Archiv: 63 unterschiedliche Online-Artikel aus sechs Medien, vier reale hervorgehobene Recherchen und die getrennte bestehende Print-Angabe von zwei Publikationen.
- Layout und Bedienung: 1920, 1440, 768, 390 und 320 CSS-Pixel; 200 Prozent Textvergrößerung bei 320 Pixeln; 400-Prozent-Reflow-Äquivalent; vollständiges Archiv ohne JavaScript; alle Medien-/Jahresfilter, Erweiterung und Verlauf geprüft.

Der endgültige Produktionsbuild wurde mit einem separat aus Commit `0ede7923874c1f29f4cebc98f3e5a7216510818b` erstellten Produktionsbuild verglichen. `/blog/` und `/category/ki/` sind bei 1440 und 390 Pixeln im vollständig geladenen Screenshot jeweils pixelidentisch: null veränderte Pixel. Auch ihre gerenderten HTML-Dateien sind byteidentisch. Der [Vergleichsbericht](qa/publications-newsroom/regression-parity.json) hält Bedingungen, Bildmaße und HTML-Hashes fest. Eine zuvor vorhandene unvollständig optimierte `_site/`-Ausgabe wurde für diesen endgültigen Vergleich durch den reproduzierbaren Produktionsbuild ersetzt.

Die folgenden echten Browseraufnahmen wurden zusätzlich visuell auf Schriftbild, Abstände, Hierarchie, Logo-Balance, Bildgrößen und Umbrüche geprüft:

| Ansicht | Aufnahme |
| --- | --- |
| Desktop, 1440 Pixel | [Vollständige Seite](qa/publications-newsroom/desktop.png) |
| Tablet, 768 Pixel | [Vollständige Seite](qa/publications-newsroom/tablet.png) |
| Mobil, 390 Pixel | [Vollständige Seite](qa/publications-newsroom/mobile.png) |
| Gefiltertes Archiv, drei IGN-Artikel | [Aktiver Medienfilter](qa/publications-newsroom/filtered.png) |
| Erweitertes Archiv, 40 Golem.de-Artikel | [Nach tatsächlicher Button-Erweiterung](qa/publications-newsroom/expanded.png) |
| Bestehender Blog zum Vergleich | [Blog, 1440 Pixel](qa/publications-newsroom/blog-desktop.png) |

Die Verifikation bezieht sich auf den lokalen Produktionsbuild in Chromium. Separate Firefox-/Safari-Läufe, VoiceOver-/NVDA-Sitzungen und native Browser-Zoomsteuerung wurden nicht ausgeführt. Externe Artikel- und Profilziele werden exakt aus den vorhandenen Quelldaten übernommen; die Browserprüfung ruft diese Redaktionsserver nicht auf. Ein Deployment ist durch die lokalen Prüfungen nicht erfolgt.


## Geänderte Dateien

- `_data/eleventyComputed.js`: bindet das fokussierte Präsentationsmodell ein und liest die bestehenden Recherchemethoden.
- `plugins/publications-page.js`: reine Normalisierung, Auswahl, Sortierung, Deduplizierung und Zählung.
- `pages/publications.md`: Metadaten und konfigurierbare Aufmacherreferenzen.
- `_layouts/publications.html`: Masthead, Medienlogos, Rechercheaufmacher, Archiv, Print-Zusammenfassung, Profile und Navigation samt Schema.
- `_includes/publications/article-meta.html` und `featured-story.html`: externe redaktionelle Artikelbausteine.
- `_includes/framework/blocks/components/publication-list.html`: vollständiges chronologisches Archiv.
- `assets/css/_native/framework/selfmade/publications.css`: seitenspezifische Gestaltung auf Grundlage der unveränderten gemeinsamen Newsroom-Stile.
- `assets/js/publications-filter.js`: Filter, Jahreszahlen, Erweiterung und URL-/History-Zustand.
- `scripts/tests/publications-page-test.mjs`, `scripts/tests/browser/publications.spec.mjs`, `tools/qa/validate-publications-page.js`: Daten-, Browser- und Produktionsprüfungen.
- `package.json`: Aufnahme der neuen Prüfungen in `test` und `qa`.
- `docs/publications-newsroom.md` und `docs/qa/publications-newsroom/`: Dokumentation, sechs visuell geprüfte Screenshots und Vergleichsnachweis.
