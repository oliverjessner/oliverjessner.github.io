# Hinweise und Leaks

`/journalismus/hinweise/` ist ein journalistisches Kontaktangebot für Hinweise aus Tech und Wirtschaft. Auf die Einleitung mit Veröffentlichungslink und Kontaktkarte folgen fünf Inhaltsabschnitte: relevante Hinweise, technische Recherche und digitale Beweissicherung, „Veröffentlicht bei“, drei Ablaufschritte sowie Vertraulichkeit und Quellenschutz. Einzelne Dokumente, Beobachtungen oder technische Auffälligkeiten können Ausgangspunkt einer Recherche sein; eine fertige Geschichte oder vollständige Beweise werden nicht vorausgesetzt.

Der Kompetenzabschnitt beschreibt OSINT, Datenanalyse, strukturierte Sicherung und Speicherung digitaler Belege sowie journalistische Beweisführung in zwei Absätzen. Er nutzt die vorhandenen Klassen `hinweise-section`, `hinweise-split`, `oj-section-title` und `oj-stack`. Unter 768 CSS-Pixeln werden Überschrift und Text wie bei den anderen geteilten Abschnitten untereinander angeordnet. Zusätzliche CSS-Regeln, Komponenten, Abhängigkeiten oder Animationen sind nicht nötig.

„Veröffentlicht bei“ übernimmt dasselbe `partners.html`-Include wie die Journalismusübersicht, mit identischem Introtext sowie denselben sechs Medienlogos und Links aus `_data/data/partners.json` (`type="media_outlet"`). Der Abschnitt steht nach der fachlichen Spezialisierung und verwendet die vorhandene Gestaltung `journalism-media` ohne zusätzlichen verschachtelten Container. Eine auf die Hinweise-Seite begrenzte Größenregel hält die Logos auch bei 200 Prozent Textgröße innerhalb ihrer Spalten.

Beide Kontaktbuttons öffnen unverändert `mailto:team@oliverjessner.at?subject=Kontaktanfrage`; die Kontaktkarte bleibt direkt neben beziehungsweise unter der Einleitung sichtbar. Es gibt kein Kontakt- oder Uploadformular. Direkt an den Buttons steht, dass gewöhnliche E-Mail nur zum allgemeinen Erstkontakt dient und keine sensiblen Details oder Dokumente übermittelt werden sollen. Der weitere Kommunikationsweg wird vorher abgestimmt. Die Kontaktaufnahme ist unverbindlich. Hinweise werden sorgfältig geprüft und sensible Informationen verantwortungsvoll und vertraulich behandelt. Die Seite verspricht weder technische Anonymität noch eine Veröffentlichung.

Im Erstkontakt-Bereich steht der öffentliche PGP-Schlüssel für verschlüsselte E-Mails an `team@oliverjessner.at` als `.asc`-Download bereit. `assets/keys/oliver-jessner-public-key.asc` enthält den bereitgestellten Schlüsselblock unverändert und wird über die bestehende Assets-Konfiguration ausgeliefert. Der Download funktioniert ohne JavaScript.

Alle Inhalte stehen ohne JavaScript im HTML. Brotkrümelnavigation und `ContactPage`-/`BreadcrumbList`-Daten bleiben erhalten. Die angepasste `meta_description` beschreibt den journalistischen Erstkontakt und die fachlichen Schwerpunkte; sie speist auch Open Graph, Twitter und `ContactPage.description`. Ein kommerzielles `Service`-Schema wird nicht ergänzt. `ads: false` lässt die AdSense-Kontometadaten und den bestehenden Google-Analytics-Baustein aus.

„Hinweise & Leaks“ ist im Journalismus-Menü und Footer verlinkt. Kontaktabschnitt und Whistleblower-Frage der Journalismusübersicht verweisen ebenfalls dorthin.

## Quelldateien

- `pages/hinweise.md`: Route, Metadaten, `ads: false`, Themen und Ablauf.
- `_layouts/hinweise.html`: Seitenstruktur, kurze Texte, Kontaktlinks und Schema.
- `assets/keys/oliver-jessner-public-key.asc`: öffentlicher PGP-Schlüssel zum Herunterladen.
- `assets/css/_native/framework/selfmade/hinweise.css` und `assets/css/main.css`: Gestaltung und Einbindung.
- `_data/menu.json`, `_layouts/journalismus.html` und `pages/journalismus.md`: Navigation und Verweise.
- `scripts/tests/browser/hinweise.spec.mjs`: Browser- und axe-Prüfungen.

## Verifikation vom 28. Oktober 2026

- `npm run build` nach der Ergänzung des Medienabschnitts und der begrenzten Logobreite erfolgreich, einschließlich aller enthaltenen Tests und QA: 794 HTML-Dateien, 84.771 lokale Verweise, 1.227 gültige JSON-LD-Blöcke, keine defekten lokalen Ziele.
- `npm run test:blog-workflow`: alle 36 Tests erfolgreich.
- `npm run test:browser`: vor der Ergänzung des Medienabschnitts 56 von 57 Tests erfolgreich.
- `npm run test:browser -- scripts/tests/browser/hinweise.spec.mjs --output=test-results/hinweise-media`: nach der Ergänzung des Medienabschnitts und der begrenzten Logobreite alle acht Hinweise-Fälle erfolgreich: Inhalte und Metadaten, sechs geladene Medienlogos, PGP-Download, Reflow und axe bei 1440, 768, 390 und 320 CSS-Pixeln, 200 Prozent Textgröße sowie Nutzung ohne JavaScript. Desktop- und Mobilaufnahmen wurden zusätzlich visuell geprüft.
- Der einzige Browserfehler betrifft den bestehenden Test für `/category/year-in-review/`: Die Kategorie fehlt bereits in der vorgefundenen Änderung an `_data/blog/categories.json`, die Route fehlt im Vergleichsbuild vor dieser Überarbeitung ebenso. Die Datendatei wurde unverändert belassen.
- Der Vergleich von 874 erzeugten HTML- und CSS-Dateien zeigt nur Änderungen an der Hinweise-Seite und ihrer CSS-Regel für die Logobreite. Andere HTML-Seiten bleiben unverändert. Die entfernte Formulierung erscheint auf der Hinweise-Seite nicht mehr. Beide Kontaktlinks, Warnhinweise und der unveränderte PGP-Schlüssel sind geprüft; der Download liefert HTTP 200 und dieselben Bytes wie die Quelldatei.

Die aktuellen Aufnahmen und Prüfprotokolle liegen in den ignorierten Ordnern `test-results/hinweise-media/`, `test-results/blog-newsroom/` und `.cache/hinweise-qa/`. Kein Deployment durchgeführt.

## Verifikation vom 20. Oktober 2026

Diese historischen Ergebnisse und Browseraufnahmen zeigen die damalige Kurzfassung. Sie enthalten weder den am 22. Oktober 2026 ergänzten PGP-Download noch den Kompetenzabschnitt vom 28. Oktober 2026.

Der vollständige isolierte Produktionsbuild und QA waren erfolgreich: 771 HTML-Dateien, 82.501 lokale Verweise, 1.182 JSON-LD-Blöcke und keine kaputten lokalen Verweise. Alle sieben Browserfälle der Kurzfassung bestanden in 3,4 Sekunden. Geprüft wurden höchstens 300 Wörter, drei Inhaltsabschnitte, das Fehlen von FAQ und FAQPage, beide E-Mail-Links samt Sicherheitshinweisen, Nutzung ohne JavaScript, axe bei 1440, 768, 390 und 320 CSS-Pixeln sowie 200 Prozent Textgröße. Der laufende Entwicklungsserver blieb unverändert; ein Deployment erfolgte nicht.

## Browseraufnahmen

| Ansicht | Aufnahme |
| --- | --- |
| Desktop, 1440 Pixel | [Kurzfassung](qa/hinweise/desktop.png) |
| Tablet, 768 Pixel | [Kurzfassung](qa/hinweise/tablet.png) |
| Mobil, 390 Pixel | [Kurzfassung](qa/hinweise/mobile.png) |
