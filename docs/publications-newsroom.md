# Redaktionelles Veröffentlichungsarchiv

`/journalismus/publications/` verwendet die bestehende Eleventy-/Liquid-Pipeline und die kompakten redaktionellen `news-row`-Bausteine aus dem Blog. Auf den Masthead und die Medienlogos folgt direkt das vollständige chronologische Archiv. Die Gestaltung bleibt auf den Veröffentlichungsinhalt begrenzt; die globale Navigation und der Footer werden nicht neu gestaltet.

## Daten und Archiv

Die vorhandenen JSON-Dateien unter `_data/publications/` bleiben die einzige Quelle der vollständigen Artikel. `plugins/publications-page.js` bereitet daraus ein reines Präsentationsmodell auf: Herausgeber, unveränderte externe Ziele, gültige Veröffentlichungsdaten, globale chronologische Reihenfolge, URL-Deduplizierung, höchstens zwei unterschiedliche Themen sowie abgeleitete Anzahlen. Die Quelldateien werden nicht verändert.

Das Archiv umfasst auch den vorhandenen MeinBezirk-Beitrag, der bisher nicht in der Herausgeberregistrierung stand. Für MeinBezirk wird kein Logo erfunden. Die fünf bereits lokal vorhandenen Medienlogos bleiben erhalten.

Alle Veröffentlichungen erscheinen ausschließlich im gemeinsamen Archiv, mit ihren ursprünglichen Daten und vorhandenen lokalen Vorschaubildern. Es gibt keinen separaten Abschnitt mit ausgewählten Recherchen und keine zusätzliche Aufmacher-Konfiguration.

Der bisherige Front-Matter-Wert von zwei Print-Veröffentlichungen bleibt eine Informationsangabe. Im Repository fehlen zuordenbare strukturierte Print-Einträge mit belegten Titeln, Ausgaben, Daten, Verweisen oder Titelbildern. Deshalb entstehen weder erfundene Print-Karten noch entsprechende Online-ItemList-Einträge. Für eine spätere Ergänzung werden diese bibliografischen Angaben benötigt.

## Bedienung und Medienfilter

Alle Online-Artikel werden als statische HTML-Liste ausgegeben und sofort vollständig angezeigt. Das gilt mit und ohne JavaScript. Ohne JavaScript bleiben ausschließlich die erweiterten Medienfilter verborgen. Es werden keine bereits vorhandenen Artikeldaten nachgeladen.

Die Medienfilter zeigen jeweils sämtliche Veröffentlichungen des gewählten Herausgebers. „Alle“ zeigt alle 63 Artikel; Golem.de zeigt alle 54 zugehörigen Artikel. Die Medienanzahlen und die Live-Meldung beziehen sich immer auf den vollständigen Datensatz. Native Buttons, `aria-pressed` und sichtbare Fokusrahmen unterstützen die Tastaturbedienung. Jahresauswahl und Mehr-anzeigen-Steuerung entfallen.

Der Parameter `publisher` bildet den Medienfilter in der URL ab. Zurück/Vorwärts und Neuladen stellen ihn wieder her; unbekannte Werte werden auf „Alle“ zurückgesetzt. Alte Parameter `year` und `limit` werden entfernt, ohne fremde Parameter oder den URL-Fragmentbezeichner zu verlieren. Auch alte Verweise mit diesen Parametern zeigen sämtliche passenden Artikel.

Die bestehende kanonische URL, Pagefind-Integration, CollectionPage-, Person-, BreadcrumbList- und ItemList-Daten bleiben erhalten. Die Online-ItemList enthält ausschließlich echte Online-Artikel, mit den ursprünglichen Veröffentlichungsdaten, Medien und Autorenverweisen.

## Autorenprofile

Die sechs bestehenden Nachweise aus `publication_evidence` erscheinen als vollständig anklickbare OJ-Karten. Jede Karte zeigt den kurzen Mediennamen, die Zieldomain und einen dekorativen externen Pfeil. Das Raster wechselt von drei Spalten auf zwei und auf schmalen Bildschirmen auf eine Spalte. Innerhalb besonders schmaler Karten stehen Logo und Pfeil über dem Text; dadurch behält dieser auch bei vergrößerter Schrift die volle Kartenbreite.

DIE ZEIT, Golem.de, IGN, GameStar Tech und IT-Finanzmagazin verwenden ihre bereits vorhandenen lokalen Linkhub-Logos. Muck Rack erhält die Textmarke „MR“. Es werden keine externen Bilder geladen. Die unveränderten Ziele öffnen weiterhin in einem neuen Tab; der zugängliche Linkname enthält den sichtbaren Titel, die Domain und die Ankündigung des neuen Tabs. Logos und Pfeile sind dekorativ, der Fokusrahmen bleibt sichtbar. Alle Karten funktionieren ohne JavaScript.

## Reproduzierbare Prüfungen

```bash
npm test
npm run build
npm run qa
npm run test:browser
```

Der reine Datenmodelltest steht in `scripts/tests/publications-page-test.mjs`. `tools/qa/validate-publications-page.js` vergleicht das tatsächlich gebaute Archiv mit allen vorhandenen Artikel-JSON-Dateien und prüft Reihenfolge, Eindeutigkeit, Originaldaten, echte responsive Vorschaubilder, Maße, native Semantik, die Online-ItemList und das Fehlen eines gesonderten Rechercheabschnitts.

`scripts/tests/browser/publications.spec.mjs` ergänzt die bestehende Playwright-/axe-Infrastruktur. Der lokale Testserver liefert `_site/` auf `127.0.0.1:4192`; Drittanbieter-Anfragen sind in den Browserprüfungen blockiert. Die Fälle decken das sofort vollständige Archiv, alle Medienfilter ohne Mengenbegrenzung, URL-Zustand, alte Jahres-/Limit-Verweise, Zurück/Vorwärts, Tastaturfokus, Schema, Profile und die Nutzung ohne JavaScript ab.

Die Ansichten werden bei 1920, 1440, 768, 390 und 320 CSS-Pixeln auf Überlauf und axe-Verstöße geprüft. Zusätzlich werden 200 Prozent Textvergrößerung und 320 CSS-Pixel als Reflow-Äquivalent zu 400 Prozent Zoom ausgehend von 1280 Pixeln geprüft. Dies ist keine Bedienung der nativen Browser-Zoomoberfläche. Automatisierte axe-Prüfungen ersetzen keine vollständige WCAG-Abnahme oder VoiceOver-/NVDA-Sitzung.

Vor Änderungen wurden die vorhandenen Blog- und KI-Ressortseiten bei 1440 und 390 Pixeln als HTML, SHA-256-Werte, berechnete Styles und echte Screenshots unter `/tmp/publications-reference/` gesichert. Diese temporären Vergleichsdateien gehören nicht zum Commit.

## Ergebnisse vom 18. Oktober 2026

- `npm test`: im Hauptcheckout erfolgreich.
- Im Hauptcheckout anschließend auch `build:images`, `purge`, `build:pagefind` und `qa` erfolgreich: 762 HTML-Dateien, 79.410 lokale Verweise, 1.166 JSON-LD-Blöcke und keine kaputten lokalen Verweise.
- Isolierter Produktionsbuild: `npm run build` und die separate Ausführung von `npm run qa` erfolgreich; 762 HTML-Dateien, 79.410 lokale Verweise und 1.166 JSON-LD-Blöcke ohne kaputte lokale Verweise.
- `npm run test:browser`: im isolierten Checkout 47 Tests bestanden, darunter zwölf Veröffentlichungsfälle. Das sofort vollständige Archiv, sämtliche Medienfilter und die Entfernung von Jahres-/Mehr-anzeigen-Steuerung sind geprüft; keine gemeldeten axe-Verstöße oder JavaScript-Seitenfehler.
- Veröffentlichungsmodell und Archiv: 63 unterschiedliche Online-Artikel aus sechs Medien und die getrennte bestehende Print-Angabe von zwei Publikationen.
- Layout und Bedienung: 1920, 1440, 768, 390 und 320 CSS-Pixel; 200 Prozent Textvergrößerung bei 320 Pixeln; 400-Prozent-Reflow-Äquivalent; vollständiges Archiv mit und ohne JavaScript; alle Medienfilter und Verlauf.

Ein erster Build im Hauptcheckout brach im Bildschritt mit „unsupported image format“ ab; die Ursache wurde nicht abschließend bestimmt. Die verbleibenden Bild-, Purge-, Pagefind- und QA-Schritte wurden danach im Hauptcheckout erfolgreich wiederholt. Für den vollständigen Produktionsbuild, die Browserprüfung und die aktualisierten Screenshots wurde zusätzlich `/tmp/publications-all-validation/` verwendet: ein isolierter Checkout des bestehenden Commits mit ausschließlich den Änderungen am Veröffentlichungsarchiv. Andere lokale Änderungen im Arbeitsverzeichnis sind darin nicht enthalten. Die relevanten Quelldateien wurden auf Übereinstimmung mit dem Hauptcheckout geprüft. Ein gleichzeitig laufender Entwicklungsserver im Hauptcheckout wurde nicht verändert.

Nach der Gestaltung der Autorenprofile wurde der endgültige Quellstand erneut isoliert vollständig als Produktion gebaut und mit QA geprüft: 762 HTML-Dateien, 79.415 lokale Verweise, 1.166 JSON-LD-Blöcke und keine kaputten lokalen Verweise. Die anschließende gezielte Browserprüfung bestand alle zwölf Veröffentlichungsfälle in 10,1 Sekunden, einschließlich axe, schmaler Ansichten, 200 Prozent Textvergrößerung, Reflow und Nutzung ohne JavaScript. Die oben genannten 47 Tests dokumentieren den vorherigen vollständigen Browserlauf; sie wurden für die Profilkarten nicht erneut vollständig ausgeführt.

Der dokumentierte Produktionsvergleich mit einem separat aus Commit `0ede7923874c1f29f4cebc98f3e5a7216510818b` erstellten Produktionsbuild bestätigt für `/blog/` und `/category/ki/` bei 1440 und 390 Pixeln pixelidentische vollständige Screenshots und byteidentische HTML-Dateien. Der [Vergleichsbericht](qa/publications-newsroom/regression-parity.json) hält Bedingungen, Bildmaße und HTML-Hashes fest. Diese beiden Seiten wurden durch die anschließende Vereinfachung der Veröffentlichungsfilter nicht geändert.

Die folgenden echten Browseraufnahmen wurden zusätzlich visuell auf Schriftbild, Abstände, Hierarchie, Logo-Balance, Bildgrößen und Umbrüche geprüft:

| Ansicht | Aufnahme |
| --- | --- |
| Desktop, 1440 Pixel | [Vollständige Seite](qa/publications-newsroom/desktop.png) |
| Tablet, 768 Pixel | [Vollständige Seite](qa/publications-newsroom/tablet.png) |
| Mobil, 390 Pixel | [Vollständige Seite](qa/publications-newsroom/mobile.png) |
| Gefiltertes Archiv, drei IGN-Artikel | [Aktiver Medienfilter](qa/publications-newsroom/filtered.png) |
| Vollständiges gefiltertes Archiv, 54 Golem.de-Artikel | [Alle Golem.de-Veröffentlichungen](qa/publications-newsroom/golem.png) |
| Autorenprofile, Desktop | [Profilkarten, 1440 Pixel](qa/publications-newsroom/profiles-desktop.png) |
| Autorenprofile, Mobil | [Profilkarten, 390 Pixel](qa/publications-newsroom/profiles-mobile.png) |
| Bestehender Blog zum Vergleich | [Blog, 1440 Pixel](qa/publications-newsroom/blog-desktop.png) |

Die Verifikation bezieht sich auf den lokalen Produktionsbuild in Chromium. Separate Firefox-/Safari-Läufe, VoiceOver-/NVDA-Sitzungen und native Browser-Zoomsteuerung wurden nicht ausgeführt. Externe Artikel- und Profilziele werden exakt aus den vorhandenen Quelldaten übernommen; die Browserprüfung ruft diese Redaktionsserver nicht auf. Ein Deployment ist durch die lokalen Prüfungen nicht erfolgt.


## Geänderte Dateien

- `_data/eleventyComputed.js`: bindet das fokussierte Präsentationsmodell ein.
- `plugins/publications-page.js`: reine Normalisierung, Sortierung, Deduplizierung und Zählung.
- `pages/publications.md`: Metadaten der Archivseite.
- `pages/authors/oliver-jessner.md`: bestehende Profilnachweise mit lokalen Logos beziehungsweise der Textmarke für Muck Rack.
- `_layouts/publications.html`: Masthead, Medienlogos, Archiv, Print-Zusammenfassung, Profile und Navigation samt Schema.
- `_includes/publications/article-meta.html`: redaktionelle Metadaten der externen Artikel.
- `_includes/framework/blocks/components/publication-list.html`: vollständiges chronologisches Archiv.
- `assets/css/_native/framework/selfmade/publications.css`: seitenspezifische Gestaltung auf Grundlage der unveränderten gemeinsamen Newsroom-Stile.
- `assets/js/publications-filter.js`: vollständige Medienfilter und URL-/History-Zustand.
- `scripts/tests/publications-page-test.mjs`, `scripts/tests/browser/publications.spec.mjs`, `tools/qa/validate-publications-page.js`: Daten-, Browser- und Produktionsprüfungen.
- `package.json`: Aufnahme der neuen Prüfungen in `test` und `qa`.
- `docs/publications-newsroom.md` und `docs/qa/publications-newsroom/`: Dokumentation, acht visuell geprüfte Screenshots und Vergleichsnachweis.
