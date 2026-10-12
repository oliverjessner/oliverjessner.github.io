# Ursprüngliche Produktdesigns nach Nutzerkorrektur

Die spätere Nutzerkorrektur nimmt die Side-Project-Landingpages ausdrücklich von der OJ-Migration aus. Ihre ursprünglichen Designs, Farben, Typografie, Bedienelemente und Seitenkompositionen wurden aus dem gesicherten Ausgangszustand `git HEAD` wiederhergestellt. Die übrige Website einschließlich LinkHub behält OJ.

## Isolierte Styles und Seitenschalen

Die zehn eigenständigen Produktseiten laden genau diese lokalen Stylesheets in dieser Reihenfolge:

1. `/assets/css/legacy-product-fonts.css`
2. `/assets/css/side-projects-legacy.css`

Sie laden weder die OJ-Distribution noch die neue gemeinsame `main.css`. Die ursprünglichen Produkt-CSS-Quellen und drei Card-/Mockup-Includes sind bytegleich dem Ausgangszustand. Das Produkt-Markup ist wieder ursprünglich; Änderungen betreffen ausschließlich die isolierten CSS-/Font-/Controller-Pfade und das eigene Layout für die drei zuvor Default-erbenden Produkte.

`side-projects-legacy.css` ist ein Liquid-Entrypoint mit der ursprünglichen Modulreihenfolge. Die alten allgemeinen Module liegen als separate Originalkopien unter `assets/css/legacy-products-source/`; die Produkt-Includes verwenden weiterhin die wiederhergestellten Dateien unter `assets/css/_native/framework/selfmade/side_project/`. Damit lassen sich spätere Produkt-CSS-Änderungen weiter aus den vorhandenen Quelldateien bauen. Die alten allgemeinen Grundlagen werden ausschließlich auf Produktdokumenten geladen.

PineFetch, NO-BULLSHIT-RSS und KnotenWerk verwenden `_layouts/side_projects/legacy-default.html`. Diese isolierte ursprüngliche Default-Schale behält Metadaten, Analytics, RSS-/LLM-Links, Wrapper, ursprüngliche Header-/Footer-/Search-Partials und ihre Controller. Die Partials liegen unter `_includes/side_projects/legacy-shell/`, die dazugehörigen Originalcontroller unter `assets/js/side_projects/legacy/`. Die sieben anderen Produkte sind weiterhin eigenständige vollständige HTML-Dokumente.

| Originaldesign | Wesentliche Identität |
| --- | --- |
| PineFetch | Türkis `#4cf2c7`, Hintergrund `#0c1113` |
| NO-BULLSHIT-RSS | Gold `#c2a36b`, Hintergrund `#080a0e`, Lato |
| KnotenWerk | Ursprüngliche Win95-Komposition, Tahoma/Systemschrift, graue Fenster auf Teal |
| SQLite Hub | Gelb `#ffd23a`, Hero `#ffcf29`, Lato |
| OpenEmperor | Papier `#f1e8d5`, Rot `#bd2f24`, Cormorant Garamond/Inter |
| BulkPixel | Schwarz, Grün `#22c55e`, ursprüngliche Komposition |
| RedactionResearch | Papier `#f4f3ef`, Grün `#1d5945`, Lato |
| Billly, SkipTheVoice, ItWorksBut | Jeweilige vollständige ursprüngliche CSS-Definitionen |

Die lokalen Originalfonts werden in `legacy-product-fonts.css` bereitgestellt; Herkunft und echte Schriftlizenzen liegen unter `assets/fonts/side-projects/`. Comfortaa verwendet die bereits vorhandene lokale WOFF2-Datei. Die ursprünglichen Font-Awesome-Dateien unter `assets/fonts/font-awesome/` wurden ebenfalls exakt aus `HEAD` wiederhergestellt. Es werden keine Google-Font-Netzwerklinks erneut eingebunden.

## Product Lab und LinkHub

Product Lab ist eine Portfolioübersicht und bleibt in der neuen gemeinsamen Website-Schale. Die ursprüngliche Produktdarstellung befindet sich innerhalb von `.legacy-product-hub.side-projects-hub`. Nur diese Seite lädt zusätzlich `/assets/css/legacy-product-fonts.css` und `/assets/css/product-hub-legacy.css`.

Die alten allgemeinen Hub-Grundlagen sind auf den Inhaltswrapper begrenzt. Die ursprüngliche `hub.css` und die ursprünglichen Projektkarten-Includes bleiben erhalten. Kategorien, Filter, URL-Zustand, Projektzählung und GitHub-Sektion bleiben unverändert. Header und Footer dürfen die neue OJ-Website-Schale verwenden. LinkHub ist keine Produktlandingpage und behält seine OJ-Umsetzung.

## Prüfung und Abschluss

Bereits ausgeführt:

- Alle elf ursprünglichen Produkt-CSS-Dateien und drei Produkt-Includes gegen `HEAD` verglichen.
- 27 Produkt-HTML-Templates/Includes und 73 isolierte CSS-Dateien erfolgreich geparst.
- Lokale relative Font-Awesome-URLs und die ursprünglichen Controller-Abhängigkeiten geprüft.
- Keine Änderungen an Produkttexten, Bildpfaden, Screenshotvarianten, Downloads, IDs oder bisherigen Anwendungshooks vorgenommen.
- OpenEmperor-Video bleibt automatisch laufend, stumm, inline und endlos wiederholt, ohne sichtbare Steuerelemente.

Die beiden Legacy-CSS-Entrypoints werden vom zentralen CSS-Build kompiliert; sie werden nicht zusätzlich als ungebaute Liquid-Dateien durchgereicht. `main.css` enthält keine der elf ursprünglichen Produkt-CSS-Dateien mehr; LinkHub-CSS bleibt darin.

Die Browserprüfung der wiederhergestellten Designs ist auf dem frischen Productionbuild vollständig bestanden. Ein eigener Headless-Chromium-Prozess prüfte die zehn Landingpages und Product Lab bei 390/768/1440 Pixeln. Der geschützte Vor-Migrations-Build wurde dabei als Referenz geladen und ausschließlich im isolierten Testbrowser mit denselben lokalen Originalfonts versorgt. So werden ursprüngliche CSS-Farben, Typografie, Abstände, Radien und Hero-/CTA-Geometrie ohne Google-Font-Netzwerk- oder Fallbackunterschiede verglichen. Die Referenzdateien selbst wurden nicht geändert.

| Browserprüfung | Ergebnis |
| --- | --- |
| Zehn Landingpages und Product Lab × drei Breiten | 33/33 bestanden |
| Gemessene Originalfarben, Fonts, Schriftgrößen, Abstände, Radien und Hero-/CTA-Geometrie gegen die Referenz | keine Abweichungen |
| Zehn Produktdokumente ohne OJ-/Main-CSS, Hub mit OJ-Schale und Legacy-Inhaltswrapper | auf allen Aufrufen bestätigt |
| Äußerer horizontaler Overflow, lokale Assetfehler und JavaScript-Laufzeitfehler | keine |
| Produktinteraktionen und vollständige lokale Medienprüfung bei 390/1440 Pixeln, einschließlich LinkHub-OJ-Smokecheck | 42/42 bestanden |
| Zusätzliche KnotenWerk-/ItWorksBut-Funktionen sowie Download-/Release-Ziele aller zehn Produkte | 14/14 bestanden |

Tatsächlich geprüft wurden PineFetch-Dialog und Fokuswiederherstellung, SQLite-Carousel/Punktwahl/Copy/Lightbox, native BulkPixel- und RedactionResearch-FAQs, Billly-Carousel/FAQ, RSS-Ansichtswechsel, KnotenWerk-Galerie/Escape/Fokus und Desktop-Fensterdrag sowie ItWorksBut-Clipboard. KnotenWerk-Dragging bleibt auf Touch entsprechend seiner ursprünglichen Logik deaktiviert. Product-Lab-Filter aktualisieren Projektzahlen, verborgene Karten, `aria-pressed` und URL korrekt und stellen den Zustand beim Reload wieder her. Das OpenEmperor-Video zeigt tatsächlichen Playback-Fortschritt und Wiederbeginn nach dem Ende seines fünf Sekunden langen Clips; alle geforderten Videoattribute sind bestätigt.

Die aktuellen Screenshots aller elf Seiten in den drei Breiten sowie geöffnete Lightboxes, FAQs und repräsentative vollständige Seiten wurden visuell geprüft. Die Nachweise liegen unter:

- `docs/oj-migration/evidence/corrections-products-qa.json`
- `docs/oj-migration/evidence/corrections-products-interactions.json`
- `docs/oj-migration/evidence/corrections-products-extra-interactions.json`
- `.playwright-mcp/corrections-product-*.png` und ergänzende Kontaktübersichten

Externe Release-Downloads wurden anhand ihrer erhaltenen DOM-Linkziele mit der Referenz verglichen, nicht heruntergeladen. Verborgene responsive Logos und inaktive Carousel-Bilder wurden von defekten sichtbaren Bildern unterschieden. Es sind keine offenen produktspezifischen Korrekturen bekannt. Frühere Artefakte mit `oj-product-*` belegen die inzwischen zurückgenommene OJ-Produktumsetzung und dienen nicht als Nachweis der Wiederherstellung.
