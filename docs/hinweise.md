# Hinweise und Leaks

`/journalismus/hinweise/` fasst den Erstkontakt für journalistische Hinweise kurz zusammen: eine Einleitung mit Veröffentlichungslink, drei Themenpunkte, drei Ablaufschritte und die wesentlichen Angaben zum Quellenschutz. Vorteile, ausführliche Selbstdarstellung, FAQ und ein zusätzlicher Schlussabschnitt entfallen. Die Seite verwendet die vorhandene Eleventy-/Liquid-Pipeline und OJ-Komponenten mit responsiver Gestaltung.

Die Seite bleibt kompakt. Die unten dokumentierten Desktop- und Mobilaufnahmen zeigen die Kurzfassung vom 20. Oktober 2026 ohne den später ergänzten PGP-Download.

Beide Kontaktbuttons öffnen `mailto:team@oliverjessner.at?subject=Kontaktanfrage`. Es gibt kein Kontakt- oder Uploadformular. Direkt an den Buttons steht, dass gewöhnliche E-Mail nur zum allgemeinen Erstkontakt dient und keine sensiblen Details oder Dokumente übermittelt werden sollen. Der weitere Kommunikationsweg wird vorher abgestimmt. Die Seite verspricht weder technische Anonymität noch eine Veröffentlichung.

Im Erstkontakt-Bereich steht der öffentliche PGP-Schlüssel für verschlüsselte E-Mails an `team@oliverjessner.at` als `.asc`-Download bereit. `assets/keys/oliver-jessner-public-key.asc` enthält den bereitgestellten Schlüsselblock unverändert und wird über die bestehende Assets-Konfiguration ausgeliefert. Der Download funktioniert ohne JavaScript.

Alle Inhalte stehen ohne JavaScript im HTML. Brotkrümelnavigation und `ContactPage`-/`BreadcrumbList`-Daten bleiben erhalten. `ads: false` lässt die AdSense-Kontometadaten und den bestehenden Google-Analytics-Baustein aus.

„Hinweise & Leaks“ ist im Journalismus-Menü und Footer verlinkt. Kontaktabschnitt und Whistleblower-Frage der Journalismusübersicht verweisen ebenfalls dorthin.

## Quelldateien

- `pages/hinweise.md`: Route, Metadaten, `ads: false`, Themen und Ablauf.
- `_layouts/hinweise.html`: Seitenstruktur, kurze Texte, Kontaktlinks und Schema.
- `assets/keys/oliver-jessner-public-key.asc`: öffentlicher PGP-Schlüssel zum Herunterladen.
- `assets/css/_native/framework/selfmade/hinweise.css` und `assets/css/main.css`: Gestaltung und Einbindung.
- `_data/menu.json`, `_layouts/journalismus.html` und `pages/journalismus.md`: Navigation und Verweise.
- `scripts/tests/browser/hinweise.spec.mjs`: Browser- und axe-Prüfungen.

## Verifikation vom 20. Oktober 2026

Der am 22. Oktober 2026 ergänzte PGP-Download ist in diesen Ergebnissen und Browseraufnahmen noch nicht enthalten. Build und Browserprüfungen wurden dafür nicht erneut gestartet.

Der vollständige isolierte Produktionsbuild und QA waren erfolgreich: 771 HTML-Dateien, 82.501 lokale Verweise, 1.182 JSON-LD-Blöcke und keine kaputten lokalen Verweise. Alle sieben Browserfälle der Kurzfassung bestanden in 3,4 Sekunden. Geprüft wurden höchstens 300 Wörter, drei Inhaltsabschnitte, das Fehlen von FAQ und FAQPage, beide E-Mail-Links samt Sicherheitshinweisen, Nutzung ohne JavaScript, axe bei 1440, 768, 390 und 320 CSS-Pixeln sowie 200 Prozent Textgröße. Der laufende Entwicklungsserver blieb unverändert; ein Deployment erfolgte nicht.

## Browseraufnahmen

| Ansicht | Aufnahme |
| --- | --- |
| Desktop, 1440 Pixel | [Kurzfassung](qa/hinweise/desktop.png) |
| Tablet, 768 Pixel | [Kurzfassung](qa/hinweise/tablet.png) |
| Mobil, 390 Pixel | [Kurzfassung](qa/hinweise/mobile.png) |
