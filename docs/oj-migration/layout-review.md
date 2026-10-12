# Layoutprüfung der Sitemap – 12. Oktober 2026

Alle **93 Seiten außerhalb der Blogposts** aus der Sitemap wurden bei **390, 768 und 1440 Pixeln** im Browser geprüft. Das umfasst 33 reguläre Seiten und 60 Kategorieübersichten, insgesamt 279 Ansichten pro Durchlauf. Vollständige Abschnittsaufnahmen, Seitenübersichten, Footer und gemessene Elementgrenzen ergänzen die Sichtprüfung. Die Zuordnung schließt auch Blogposts mit eigenen Banjo-Permalinks und URL-kodierten Titeln korrekt aus: 514 der 607 Sitemap-Einträge sind Blogposts.

[Die vollständige Seitenliste](evidence/layout-review-scope.json) dokumentiert den Umfang.

Die Änderungen beschränken sich auf Layout, Abstände, Ausrichtung und responsive Größen:

- **Ticker:** nativer Hero- und Abschnittsabstand anstelle der wirkungslosen alten Wrapper.
- **Kategorieübersichten:** Schnellzugriffe ohne Browser-Einzug, Pfeile neben dem Text sowie getrennte Überschriften und Beschreibungen. Vorhandene Shorts-Vorschaubilder verwenden ihre eigenen Proportionen; die großen leeren Hochformatflächen entfallen.
- **Startseite:** die Artikel-Links gleich hoher Karten stehen auf derselben Höhe.
- **Journalismus:** Abstand zwischen Recherche-Panels und gleichmäßige Abstände im Kopf der Interview-Mediengruppen.
- **Autoren und Profil:** native Stack-Abstände in den Karten und Fakten, Haupttext bündig mit den benachbarten Bereichen.
- **About:** Abstand zwischen den drei Recherche-Fakten.
- **Social Media Marketing:** doppelte Innenpolster entfernt, Preis und Währung bleiben zusammen.
- **Gewinnspiel:** zusammengehöriger Abschnittskopf, ein adaptives Fakten-Grid ohne zusätzliche Einrückung und native Blockabstände in den Teilnahmebedingungen.
- **Produkte:** SQLite-Hub-Kopierbuttons bleiben kompakt, ItWorksBut-Wortmarke bleibt mobil einzeilig, SkipTheVoice-Installation verwendet mobil eine Spalte, mehrzeilige Billly-FAQ-Fragen stehen linksbündig.

Die acht eigenständigen Produktdesigns behalten ihre Schriftfamilien und Gestaltung. Texte, Links, Bild-/Videoattribute, Inhalte, Datenquellen und Farben wurden nicht verändert. Bereits vorhandene sichtbare Überschriftenmarker im Autorenprofil und zusammengezogene Wörter in der BlauHerzFilter-Datenschutzerklärung bleiben als Inhalts-/Renderingbefunde außerhalb dieser Layoutänderungen erhalten.

Der Produktionsbuild einschließlich bestehender Tests, Suchindex und Website-QA besteht. URL-/SEO-Parität, JSON-LD, Datumsangaben, Indexierungsattribute und lokale Designsystem-Dateien sind erhalten. Ein zusätzlicher vollständiger Inhaltsvergleich prüft sämtliche 693 HTML-Ausgaben, 65.563 Links und 10.578 Medienelemente sowie 2.616 geschützte Quelldateien einschließlich Blogposts, Daten, Bildern, Videos, Fonts und JavaScript.

Die Prüfnachweise stehen in den [Build-Logs](evidence/layout-review-final-build.log), dem [SEO-Vergleich](evidence/layout-review-parity.log), der [Migrationsprüfung](evidence/layout-review-invariants.log) und dem [Inhaltsvergleich](evidence/layout-review-preservation.json). Die [vollständige Abdeckung](evidence/layout-review-final-coverage.json) und die [Bytegleichheit unverändert geprüfter Ausgaben](evidence/layout-review-final-output-stability.json) sind separat belegt. Die finalen Browserberichte decken [allgemeine Seiten](evidence/layout-review-general-final.json), [Marketing und Profile](evidence/layout-review-marketing-final.json), [Produkte](evidence/layout-review-products-final.json) sowie [alle Kategorien](evidence/layout-review-categories-final.json) ab.

Ausgewählte Vorher/Nachher-Beispiele:

| Bereich | Vorher | Nachher |
| --- | --- | --- |
| Kategorie-Schnellzugriffe, mobil | [Ansicht](evidence/layout-review-screenshots/category-quick-links-before.png) | [Ansicht](evidence/layout-review-screenshots/category-quick-links-after.png) |
| Shorts-Vorschaubilder, mobil | [Ansicht](evidence/layout-review-screenshots/shorts-posters-before.png) | [Ansicht](evidence/layout-review-screenshots/shorts-posters-after.png) |
| Externe Artikel, Abschnittskopf | [Ansicht](evidence/layout-review-screenshots/external-article-intro-before.png) | [Ansicht](evidence/layout-review-screenshots/external-article-intro-after.png) |

Die letzte gezielte [Journalismus-Prüfung](evidence/layout-review-journalism-final.json) bestätigt 16 Pixel Abstand zwischen allen vier Recherche-Panels bei jeder Bildschirmbreite. [Die mobile Abschnittsaufnahme](evidence/layout-review-screenshots/journalism-panels-390-after.png) zeigt den endgültigen Stand.

Die [Teilnahmebedingungen](evidence/layout-review-giveaway-terms-final.json) haben bei allen drei Breiten mindestens 16 Pixel Abstand zwischen ihren 58 Inhaltsblöcken, ohne seitlichen Überlauf.
