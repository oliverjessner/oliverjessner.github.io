# Produktseiten: OJ und acht Originaldesign-Ausnahmen

Die abschließende Nutzerkorrektur nimmt genau acht Landingpages von der OJ-Migration aus. Product Lab, KnotenWerk und RedactionResearch gehören weiterhin zur OJ-Website. LinkHub bleibt ebenfalls OJ. Die aktuellen Nutzeränderungen in `pages/product-lab.md` wurden bei der Scopekorrektur nicht verändert.

## Genau acht Originaldesign-Ausnahmen

| Landingpage | Route | Erhaltenes Design |
| --- | --- | --- |
| SQLite Hub | `/sqlite-hub/` | Gelb, ursprüngliche Komposition und Typografie |
| BulkPixel | `/bulkpixel/` | Schwarz/Grün, ursprüngliche Komposition |
| PineFetch | `/pinefetch/` | Türkis, ursprüngliche Komposition |
| OpenEmperor | `/openemperor/` | Papier/Rot, Cormorant Garamond und Inter |
| NO-BULLSHIT-RSS | `/no-bullshit-rss/` | Schwarz/Gold, Lato |
| SkipTheVoice | `/skipthevoice/` | Ursprüngliche vollständige CSS-Definitionen |
| Billly | `/billly/` | Ursprüngliche vollständige CSS-Definitionen |
| ItWorksBut | `/itworksbut/` | Ursprüngliche vollständige CSS-Definitionen |

Jedes dieser acht Dokumente lädt genau einmal und in dieser Reihenfolge:

1. `/assets/css/legacy-product-fonts.css`
2. `/assets/css/side-projects-legacy.css`

OJ-Styles und die gemeinsame `main.css` werden auf diesen Seiten nicht geladen. PineFetch und NO-BULLSHIT-RSS verwenden die isolierte ursprüngliche `_layouts/side_projects/legacy-default.html`. Die sechs anderen Ausnahmen behalten ihre eigenständigen HTML-Dokumente. Die ursprünglichen allgemeinen Partials und Controller liegen unter `_includes/side_projects/legacy-shell/` und `assets/js/side_projects/legacy/`.

Der Liquid-Entrypoint `side-projects-legacy.css` behält die ursprüngliche Modulreihenfolge. Allgemeine alte Grundlagen liegen unter `assets/css/legacy-products-source/`; die acht Produkt-CSS-Dateien bleiben an ihren bisherigen Quellpfaden. Für Hub, KnotenWerk und RedactionResearch verwendet das Legacy-Bundle unveränderte Originalkopien unter `legacy-products-source/_native/framework/selfmade/side_project/`. Ihre aktiven OJ-Quellen können damit die acht Originaldesigns nicht verändern.

Das vollständig kompilierte Legacy-CSS ist bytegleich zum geschützten Produktionsbuild unmittelbar vor der abschließenden Scopekorrektur: SHA256 `1078515393a5d03f52d833d3e238b7a228c5cf96bf6b96da64fc7533cce4db15`. Auch das Font-Stylesheet und alle 24 darin referenzierten lokalen Fontdateien sind bytegleich zur Referenz. Herkunft und echte Schriftlizenzen liegen unter `assets/fonts/side-projects/`; Google-Font-Netzwerklinks werden nicht benötigt.

## Product Lab, KnotenWerk und RedactionResearch verwenden OJ

Diese drei Seiten laden die tatsächliche lokale OJ-Distribution `0.2.0` und anschließend `main.css`, jeweils genau einmal. Sie verwenden das gemeinsame dunkle Theme, Comfortaa und die öffentliche Akzent-API. Keine dieser Seiten lädt Legacy-CSS oder verwendet einen Legacy-Hub-Wrapper. `main.css` enthält ihre aktiven `hub.css`, `knotenwerk.css` und `redactionresearch.css`; die acht Originalprodukt-CSS-Dateien bleiben im isolierten Bundle.

Product Lab verwendet echte OJ-Karten, Badges, Tags, Buttons und Links. Kategorien, Filter, URL-Zustand, Projektzählung und GitHub-Sektion bleiben erhalten. Der aktuelle Nutzer-Datenstand enthält zehn Projekte; die Filter ergeben Desktop 5, SaaS 2, CLI 7 und Browser-Erweiterung 1. Kategorien können sich überschneiden.

KnotenWerk behält seine Fensterkomposition, Logos, Screenshots, Galerie und Desktop-Drag-Funktion. Normaler Text, Buttons, Panels, Code und native Radio-/Checkbox-Bedienelemente verwenden OJ. RedactionResearch behält seine Inhalte, Diagramme, Installationsbefehle und eigenen Seitenaufbau; Buttons, Links, Callouts, Code, Installationspanels und native FAQ-Accordions verwenden OJ. Der Header-Brand-Link besitzt ebenfalls die öffentliche `oj-link`-Klasse und zeigt keine Browser-Standardlinkfarbe.

Der zentrale Build kompiliert genau zwei CSS-Entrypoints: `main.css` und `side-projects-legacy.css`. Beide werden vom zusätzlichen Passthrough ausgeschlossen. `product-hub-legacy.css` entfällt.

## Native Website-Komponenten und aktuelle Prüfung

Product Lab, KnotenWerk, RedactionResearch und LinkHub verwenden jetzt die tatsächlichen Website-Komponenten aus OJ `0.2.0`, einschließlich ihrer strukturellen Klassen. Die ersetzten lokalen Hero-, Intro-, Split-, Steps-, Bullet- und Typografie-Regeln wurden gelöscht. Die vier Produkt-CSS-Dateien wurden von 1691 auf 411 Zeilen reduziert; sie enthalten keine lokalen `font`, `font-size`, `font-family`, `line-height`, `letter-spacing` oder `color`-Grundlagen. Eigene Regeln betreffen Projektmedien, Kartenanordnung, KnotenWerk-Fenster, eingebettete Medien und Controller-Zustände. Die Display-Größe im KnotenWerk-Fenster wird über die dokumentierten öffentlichen `--oj-display-*`-Tokens angepasst.

| Seite | Tatsächlich verwendete native Website-Komponenten |
| --- | --- |
| Product Lab | Hero/Grid/Copy/Media/Actions, Display, zentrierte Section Intros, Bullet Lists |
| KnotenWerk | Hero innerhalb der Fensterkomposition, Display, Section Intros, native OJ-Stacks für die Optionsgruppen |
| RedactionResearch | Hero, Display, Section Intros, Split-/CTA-Strukturen, Steps, Bullet Lists |
| LinkHub | Profil- und Abschnittsintros, native Abschnittsüberschriften, Card Body und Stack |

Die vollständige Quellprüfung bestätigt unveränderte Texte, Links, Medien, IDs, Anwendungshooks und Script-/Schema-Inhalte in den sechs Owned-Templates/Includes. Der LinkHub-Renderer wurde isoliert mit den bereits gespeicherten Daten ausgeführt: Native Intro/H2/Stack/Card-Body-Strukturen bleiben bei einer Regeneration erhalten; Inhalt, Linkziele, Bildpfade und Controller-Inhalte bleiben gleich. Dabei wurden keine LinkHub-Daten neu erzeugt oder extern abgerufen.

Die Browserprüfung erfolgte auf dem Produktionsoutput in unabhängigen Headless-Chromium-Kontexten bei 390, 768 und 1440 Pixeln. Nach dem letzten Produktionsbuild wurde KnotenWerk gezielt erneut in allen drei Breiten geprüft; die übrigen bestandenen Ergebnisse bleiben erhalten.

| Prüfung | Ergebnis |
| --- | --- |
| Vier OJ-Seiten × drei Breiten | 12/12 bestanden |
| Einmalige OJ-/Main-Einbindung, dunkles Theme und geladene lokale Comfortaa-Fonts | auf allen zwölf Ansichten bestätigt |
| Acht Originaldesign-Seiten mit ausschließlich ihren beiden Legacy-Styles | 8/8 bestanden |
| Vier Interaktionsgruppen × drei Breiten | 12/12 bestanden |
| Finaler KW-Choice-/Keyboard-/Galerie-Nachlauf | 3/3 bestanden |
| Äußerer Overflow, defekte geladene Medien, lokale HTTP- und JavaScript-Laufzeitfehler, Standardfarben auf Textlinks | keine |
| Acht Legacy-HTMLs, kompiliertes Legacy-CSS und Font-CSS gegen die geschützte Baseline | bytegleich |
| 24 lokale Font-URLs und 106 geschützte Legacy-/Font-/Bundle-/Product-Lab-Datenquellen | unverändert |

Tatsächlich geprüft wurden Hubfilter mit Projektzahlen, verborgenen Karten, `aria-pressed`, URL-Reload, Browser-Zurück und ungültigem Kategorie-Fallback. KnotenWerk unterstützt native Radio-/Checkbox-Auswahl, Radio-Pfeiltasten, Galerie per Enter, Escape, Schließen, Fokuswiederherstellung und Desktopdrag. Die Optionsgruppen haben echte vertikale `oj-stack`-Container mit 16px Abstand; ihre Reihen überlappen bei keiner geprüften Breite. RedactionResearch kopiert beide vollständigen Installationsbefehle in die echte Zwischenablage; seine nativen FAQs öffnen auch per Enter. LinkHub zeigt den nativen Tastaturfokus und sein unveränderter Wochentagscontroller besteht alle sieben Tage mit isolierten DOM-Fixtures. Interne Anker und sämtliche beim vollständigen Scrollen geladenen Produktmedien wurden geprüft. Aktuelle Screenshots wurden tatsächlich angesehen, einschließlich der Steps-/Split-/Bullet-Darstellung in RedactionResearch.

Aktuelle Nachweise:

- `docs/oj-migration/evidence/native-products-source.json`
- `docs/oj-migration/evidence/native-products-browser.json`
- `docs/oj-migration/evidence/native-products-interactions.json`
- `docs/oj-migration/evidence/native-products-kw-final.json`
- `docs/oj-migration/evidence/native-products-isolation.json`

Dauerhafte Screenshots:

| Seite | Mobil | Desktop |
| --- | --- | --- |
| Product Lab | [390px](oj-migration/screenshots/native-products-product-lab-390.png) | [1440px](oj-migration/screenshots/native-products-product-lab-1440.png) |
| KnotenWerk | [390px](oj-migration/screenshots/native-products-knotenwerk-390.png) | [1440px](oj-migration/screenshots/native-products-knotenwerk-1440.png) |
| RedactionResearch | [390px](oj-migration/screenshots/native-products-redaction-research-390.png) | [1440px](oj-migration/screenshots/native-products-redaction-research-1440.png) |
| LinkHub | [390px](oj-migration/screenshots/native-products-linkhub-390.png) | [1440px](oj-migration/screenshots/native-products-linkhub-1440.png) |

Die vorherigen `product-scope-*`-Nachweise dokumentieren die frühere Scopekorrektur mit drei OJ-Produktseiten vor der Umstellung auf native Website-Kompositionen. Ihre damaligen Screenshots bleiben erhalten; die oben verlinkten `native-products-*`-Artefakte beschreiben den aktuellen Stand.

Die früheren `corrections-products-*`-Artefakte dokumentieren die zwischenzeitliche Wiederherstellung von zehn Produktseiten und dem Legacy-Hub. Ihre weiterhin gültigen Prüfungen zu den acht unveränderten Ausnahmen umfassen unter anderem PineFetch-Lightbox, SQLite-Carousel/Copy/Lightbox, BulkPixel-FAQ, Billly-Carousel/FAQ, RSS-Ansichtswechsel, ItWorksBut-Clipboard sowie tatsächlichen Playback-Fortschritt und Endlosschleife des OpenEmperor-Videos. Sie sind historische Nachweise und belegen nicht die jetzige OJ-Darstellung von Product Lab, KnotenWerk und RedactionResearch. Das OpenEmperor-Video bleibt automatisch laufend, stumm, inline und ohne Steuerelemente.

Externe Release-Downloads werden über erhaltene Linkziele geprüft und wurden nicht heruntergeladen. Es wurden keine Commits, Pushes oder Deployments durch diesen Produkt-Migrationsschritt ausgeführt.
