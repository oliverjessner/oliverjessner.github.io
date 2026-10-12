# Native OJ-Website-Komponenten

Stand: 12. Oktober 2026. Die gemeinsame Website verwendet die tatsächlich veröffentlichten Komponenten aus `oj-designsystem` `0.2.0`. Die unveränderte Distribution bleibt separat von der Website-CSS und wird nicht gepurgt.

| Baustein | Native Umsetzung |
| --- | --- |
| Intro | `oj-section-intro`, `oj-section-title`, `oj-lead`, zentrierte Variante für passende Sektionen |
| Hero / Display | `oj-hero`, `oj-hero-grid`, Copy/Media/Actions und `oj-display` mit den öffentlichen Größen-/Breiten-Tokens |
| Split / CTA | `oj-split-section` mit Copy, Media und Actions für bestehende Kontakt-, Produkt-, Podcast- und Markeninhalte |
| Video Card | `oj-card oj-video-card` und native Media-/Portrait-Varianten; vorhandene lokale Clips mit echten Controls, linkbare YouTube-Poster und bestehende Embeds behalten ihre Quellen |
| Steps / Methodenablauf | `ol.oj-steps`, `li.oj-step` und native Nummer-/Titel-/Beschreibungsbausteine; wichtige Jahreszahlen bleiben zugänglich |
| Big Numbers | Native `dl`/`dt`/`dd`, `oj-big-number-list`, Label/Value/Suffix und unveränderte vollständige Endwerte |
| Textlisten | `oj-bullet-list` für Markdown, verschachtelte Listen, einfache authored HTML-Listen und Inhaltsverzeichnisse |
| Bestehende Grundlagen | Native Cards, Buttons, Links, Badges, Stack/Grid, Checkbox/Radio und `details.oj-accordion` |

`assets/js/oj-website-components.js` importiert ausschließlich `initCountUps` und `initVideoPreviews` aus der lokal ausgelieferten Distribution. OJ übernimmt Sichtbarkeit, Animation, Breitenreserve, zugängliche Endwerte, reduzierte Bewegung und die Video-Vorschau. Navigation, Suche, Filter, Clipboard und andere fachliche Controller behalten ihre Zuständigkeit. Der bisherige eigene Zähler und der Video-Observer entfallen.

Die zentrale Markdown-Verarbeitung verändert keine Artikeldaten. Normale Listen erhalten native Marker; Checklisten behalten Checkboxen und Persistenz. Autoren-HTML mit bestehenden Komponentenklassen sowie Navigation, Code und Skriptbeispiele werden nicht in Textlisten umgewandelt. Rendererprüfungen und vollständige Artikel-/SEO-Parität sichern diese Grenzen ab.

Die nachgebauten Hero-, Intro-, Bullet-, Steps-, Zahlen- und Video-Regeln sind entfernt. Sechs ersetzte CSS-Dateien sind gelöscht, einschließlich der eigenen Zählerdarstellung. Die gepurgte gemeinsame `main.css` sinkt von **134.104 auf 58.779 Bytes**. Verbleibende Website-CSS beschreibt spezifische Medien, Projektfenster, Daten-/Preis-/Publikationsanordnung, Markenfarben und Controllerzustände. Der zentrale Akzent bleibt `#ff4a4a`, Partnerlogos bleiben weiß und dynamiq. behält seine violette Sektion.

Genau acht Landingpages behalten ihr ursprüngliches Design: SQLite Hub, BulkPixel, PineFetch, OpenEmperor, NO-BULLSHIT-RSS, SkipTheVoice, Billly und ItWorksBut. Product Lab, KnotenWerk, RedactionResearch und LinkHub verwenden OJ. Die acht Originaldokumente, deren CSS und Fonts bleiben unverändert.

## Ausgeführte Prüfungen

- Produktionsbuild einschließlich aller bestehenden QA und Renderer-/Copy-/Codeprüfungen: 693 HTML-Dateien, 66.549 lokale Verweise, 1.034 JSON-LD-Blöcke, null defekte Verweise.
- Parität: 693 HTML-Pfade und 607 Sitemap-URLs, null Metadatenabweichungen. Vollständige Invarianten: 685 OJ-Dokumente, acht Originaldesigns, 518 redaktionelle Wrapper und 10.511 Originalmedien-/Download-Verweise erhalten.
- Blog, Artikel, Kategorie, Gewinnspiel, 404 und echte 58-Punkte-Checkliste: 18 Ansichten und neun Interaktionsgruppen bestanden; sichtbare native Marker, vollständige Blogbreiten, TOC-Ziele, Suchdialog/Fokus und Checklist-Persistenz.
- Marketingseiten: 18 Ansichten und 18 Interaktionsgruppen bestanden; Publikationsfilter mit Tastatur, native FAQ und alle drei durchgestrichenen Altpreise erhalten.
- Home/Platform: sechs normale und sechs Reduced-Motion-Ansichten sowie zwei No-JavaScript-Fallbacks; native Counter, zugängliche Breitenreserve, Endwerte und Video-Vorschau samt Fokus, Offscreen-/manueller Pause geprüft. Der gezielte Nachlauf bestätigt vollständige 272×272px-Tortengrafiken auf Home und Social Media; die Werben-KPIs sind ebenfalls unverändert lesbar.
- Produktseiten: zwölf OJ-Ansichten und zwölf Interaktionsgruppen sowie acht Originaldesign-Einbindungen bestanden. KnotenWerk-Optionen in nativen Stack-Gruppen wurden bei drei Breiten erneut geprüft: getrennte Reihen, Radio-/Checkbox-Auswahl, Galerie, Escape und Fokuswiederherstellung funktionieren. Die acht Original-HTML-Dateien, deren CSS und Fontdateien sind bytegleich zur Referenz.

Nachweise: [Produktionsbuild](oj-migration/evidence/native-production-build.log), [Parität](oj-migration/evidence/native-parity.log), [Invarianten](oj-migration/evidence/native-invariants.log), [Referenz und CSS-Größe](oj-migration/evidence/native-build-reference.json), [redaktionelle Seiten](oj-migration/evidence/native-editorial-browser.json), [Marketingseiten](oj-migration/evidence/native-marketing-browser.json), [Home/Platform](oj-migration/evidence/native-home-platform-browser.json), [Produktseiten](oj-migration/evidence/native-products-browser.json), [Interaktionen](oj-migration/evidence/native-products-interactions.json), [Originaldesign-Isolation](oj-migration/evidence/native-products-isolation.json), [Produktquellen](oj-migration/evidence/native-products-source.json). Die Browserprüfungen laufen in Chromium; externe Release-Downloads werden nicht ausgeführt.

Aktuelle Beispiele: [native Blog-Intros](oj-migration/screenshots/native-blog-1440.png), [Textlisten mobil](oj-migration/screenshots/native-article-bullets-390.png), [Steps](oj-migration/screenshots/native-marketing-social-media-steps-1440.png), [Product Lab](oj-migration/screenshots/native-products-product-lab-1440.png).

## Nachkorrektur: Werben-Kennzahlen

Die wiederverwendbare Klasse `site-section-full-width` setzt ausschließlich den öffentlichen OJ-Token `--oj-content-width: 100%`. Der Metrics-Include aktiviert sie mit `full_width=true`; die übrigen Sektionen behalten ihre normale Containerbreite.

Werben stellt `100 %` als großen Wert und `Tech` als nativen `oj-big-number-suffix` dar. Ein nicht umbrechendes Leerzeichen erhält den vollständigen zugänglichen Text auch nach HTML-Minifizierung. Die native Animation für `~10.000` und die statischen Werte bleiben erhalten. Produktionsbuild und sechs Browserfälle auf dem Nutzer-Devserver bestanden: 390/768/1440/1920px plus Reduced Motion und No-JavaScript-Fallback. Alle Werte sind vollständig und einzeilig, ohne horizontalen Überlauf.

[Prüfbericht](oj-migration/evidence/advertising-big-numbers.json), [Build](oj-migration/evidence/advertising-big-numbers-build.log), [Desktop](oj-migration/screenshots/advertising-big-numbers-1440.png), [Mobile](oj-migration/screenshots/advertising-big-numbers-390.png). Mit der zusätzlichen Kompositionsvariante misst die gemeinsame gepurgte CSS 58.837 Bytes.
