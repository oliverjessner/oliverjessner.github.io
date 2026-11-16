# SEO-Recovery-Sprint 1 – internes Änderungsprotokoll

Bearbeitung und Quellenabruf: **16. November 2026**. Ausgangs-HEAD: `204a6cf6` auf `main`; Arbeitsbaum vor Beginn sauber. Dieses Dokument liegt im durch `.eleventyignore` ausgeschlossenen Verzeichnis `docs/`. Keine GSC-Rohdateien wurden ins Repository kopiert. Änderungen sind lokal; **Veröffentlichungsdatum: noch nicht veröffentlicht, später separat eintragen**. Kein Commit, Push, Merge oder Produktionsdeploy.

## Ausgangslage und Aussagegrenzen

Die sieben bereitgestellten CSV-Dateien in Downloads wurden mit Python (`csv`, `datetime`, `urllib.parse`) lesend geprüft. `Diagramm.csv` enthält 92 lückenlose Tage vom 15.08. bis 14.11.2026. Die optionale abgeleitete Arbeitsmappe `SEO_Rettungsplan_oliverjessner_2026-11.xlsx` wurde in Downloads und dem bereitgestellten Attachment-Verzeichnis nicht gefunden. Die CSV-Dateien sind die verwendeten Primärdaten.

| Zeitraum, jeweils 28 Tage | Klicks | Impressionen | CTR aus Summen | Impressionsgewichtete Position |
| --- | ---: | ---: | ---: | ---: |
| 15.08.–11.09.2026 | 4.509 | 135.742 | 3,3217 % | ca. 5,4891 |
| 18.10.–14.11.2026 | 2.824 | 167.298 | 1,6880 % | ca. 6,8294 |

Klicks: −37,37 %; Impressionen: +23,25 %; CTR: −1,6337 Prozentpunkte. CTR wurde als Summe Klicks / Summe Impressionen berechnet, Position nach Impressionen gewichtet. Die auf eine Nachkommastelle gerundeten Tagespositionen begrenzen die Genauigkeit (ungefähr ±0,05 je Zeitraum).

Seiten- und Query-Datei enthalten jeweils 1.000 eindeutige Zeilen und ausschließlich Gesamtperiodenwerte. Von den Seitenzeilen tragen 378 ein Fragment; alle beziehen sich auf ebenfalls enthaltene Basis-URLs. Es bleiben 622 verschiedene Basis-URLs. Basis- und Fragmentwerte wurden **nicht addiert**. Die 1.000 Query-Zeilen summieren sich auf 4.592 Klicks / 127.258 Impressionen und decken die Diagramm-Gesamtwerte von 10.677 / 477.709 nicht vollständig ab; die Ursache der Differenz ist aus den Dateien nicht bestimmbar. Länder (187 Zeilen) und Geräte (3 Zeilen) summieren sich jeweils auf die Diagramm-Gesamtwerte. Die Suchdarstellungsdatei enthält nur Überschriften. Filter: Web (textbasiert), letzte drei Monate. Keine leeren Zellen, doppelten Dimensionsschlüssel oder ungültigen Kennzahlen in den vorhandenen Datenzeilen festgestellt.

Alle sieben im Auftrag genannten Haupt-URL-Kennzahlen stimmen mit den CSV-Zeilen überein. Daraus folgt **keine artikelbezogene Verlustrangliste**, keine Query-zu-URL-Zuordnung und keine belegte Kannibalisierung. Es gibt keine Belege für bestimmte Google-Updates, KI-Antworten, Abstrafungen, eine bestimmte SERP-Veränderung oder eine technische Ursache des aggregierten Rückgangs.

## Projekt und URL-Zuordnung

Eleventy 3 mit Liquid-Layouts und Markdown; bestehende Jekyll-Kompatibilität in `plugins/eleventy-compat.js` und `_data/eleventyComputed.js`. Artikel liegen unter `collections/_posts/` mit YAML-Frontmatter. Die Website verwendet vorhandene OJ-Komponenten und die Navigation unter `_includes/framework/global/`. Keine neue SEO-Bibliothek oder Abhängigkeit.

Zentrale Metadaten: `_includes/framework/global/seo/meta.html`; Artikel/H1/BlogPosting/FAQ und Hero: `_layouts/post.html`; globale Daten: `_data/site.json`; Routing: Eleventy-Kompatibilität und vorhandene Permalinks; Sitemap: `sitemap.xml`, News-Sitemap: `plugins/news-sitemap.js`; `robots.liquid` verweist auf beide. Deployment: `netlify.toml`, `npm run build`, `_site`, `ELEVENTY_ENV=production`. Bestehende Redirects in `_redirects` bleiben unverändert.

| URL unter `/blog/` | Tatsächliche Quelldatei unter `collections/_posts/` | Eingriff |
| --- | --- | --- |
| `2026-07-09-gpt-56-sol-terra-und-luna-was-ist-der-unterschied/` | `2026-07-09-gpt-56-sol-terra-und-luna-was-ist-der-unterschied.md` | Ein Linkziel technisch korrigiert |
| `2026-08-03-gen1recomp-auf-deutsch-spielen-so-funktioniert-die-mod/` | `2026-08-03-gen1recomp-auf-deutsch-spielen-so-funktioniert-die-mod.md` | Zwei falsche Bildmaß-Angaben korrigiert |
| `2025-12-28-caffeine-mac-deutsch-tutorial/` | `2025-12-28-caffeine-mac-deutsch-tutorial.md` | Quelle unverändert |
| `2025-12-31-git-letzten-commit-rueckgaengig-machen/` | `2025-12-31-git-letzten-commit-rueckgaengig-machen.md` | Redaktioneller Pilot |
| `2026-05-17-wie-funktioniert-gitignore/` | `2026-05-17-wie-funktioniert-gitignore.md.md` | Redaktioneller Pilot; bestehender Permalink bleibt |
| `2026-01-23-browser-aus-europa-alternativen-zwischen-privacy-nachhaltigkeit-und-power-user-features/` | `2026-01-23-browser-aus-europa-alternativen-zwischen-privacy-nachhaltigkeit-und-power-user-features.md` | Redaktioneller Pilot |
| `2026-07-13-gpt-5-6-sol-vs-sol-pro-medium-high-extra-high-und-pro-erklaert/` | `2026-07-13-gpt-5-6-sol-vs-sol-pro-medium-high-extra-high-und-pro-erklaert.md` | Abgrenzung geprüft, nur ein Linkziel technisch korrigiert |

Alle sieben URLs wurden gefunden. Kein Artikel neu erstellt, gelöscht, zusammengeführt oder umgeleitet. Veröffentlichungs- und vorhandene Änderungsdaten bleiben exakt erhalten. Der tatsächliche Quellenprüftag steht beim Browserartikel im Text; er ist kein vorgezogenes Veröffentlichungsdatum.

## Technische Eingriffe: Fundstelle → Problem → Änderung → Prüfung

### T1 – Metadaten werden an HTML-Grenzen korrekt escaped

- **Fundstelle/Beleg:** `meta.html` interpolierte Titel und Beschreibungen direkt in HTML. Im Baseline-Build wurde die Description der Musk-Doku vom 06.10.2026 auf `Die neue Elon-Musk-Doku ` abgeschnitten. Auch der Tesla-Assisted-Driving-Artikel vom 11.10.2026 verlor Text ab den Anführungszeichen. Die OG-/Twitter-Titelattribute waren ebenfalls betroffen.
- **Änderung:** vorhandenen Liquid-Filter `escape` an den sechs Ausgabestellen für Title sowie OG-/Twitter-Titel und die drei Description-Ausgaben verwenden. Auswahlreihenfolge, Canonicals und Robots-Logik bleiben erhalten.
- **Hypothese:** vollständige, dem Quelltext entsprechende Metadaten sind auslesbar; keine Aussage über Googles tatsächlich angezeigtes Snippet oder CTR-Effekt.
- **Prüfung:** `scripts/tests/seo-meta-test.mjs` rendert das echte Template, prüft Quotes, Ampersands, spitze Klammern, Overrides, Kategorie-/Website-Fallback und bestehende Robots-Regeln. Test scheiterte vor der Reparatur an irrtümlich erzeugten Attributen und besteht danach. Build-Validator prüft auch die zwei real betroffenen Beispielartikel und andere Seitentypen.
- **Rücknahme:** ausschließlich die sechs Escape-Änderungen im Template und den zugehörigen Testhunk zurücknehmen.

### T2 – Hero-Fläche mit tatsächlichen Bildmaßen reservieren

- **Fundstelle/Beleg:** Hero-`img` in `_layouts/post.html` hatte keine `width`/`height`. CSS setzte nur Breite 100 % und automatische Höhe, ohne Seitenverhältnis; die Bild-Nachverarbeitung ergänzte keine Maße. In allen sieben Baseline-Artikeln fehlte dadurch die intrinsische Platzreservierung.
- **Änderung:** vorhandenen `image_dimensions`-Filter benutzen und HTML-Maße aus der lokalen Bilddatei ausgeben. Bei unbekannten oder externen Dateien werden keine Maße erfunden. Bestehende Ladepriorität und responsive Bilder bleiben erhalten.
- **Hypothese:** der Browser kann die Bildhöhe vor dem Decodieren reservieren. Keine Feld-CWV-Messung und kein Nachweis einer Traffic-Ursache.
- **Prüfung:** `scripts/tests/post-image-test.mjs` vergleicht sieben reale Bilder gegen `sharp`, einschließlich absichtlich falscher Frontmatter-Maße, externer/fehlender Bilder und Artikel ohne Bild. Vor Reparatur erwarteter Fehlschlag, danach PASS. Zusätzlich stimmten die durch den Filter ermittelten Maße aller 614 lokalen Hero-Dateien mit `sharp` überein; keine problematische EXIF-Achsenrotation festgestellt.
- **Rücknahme:** konditionale Maßattribute am Hero entfernen; Bilddateien und CSS wurden nicht geändert.

### T3 – Gen1Recomp: falsche ImageObject-Maße

- **URL/Quelle:** Gen1Recomp-Zeile der Zuordnungstabelle; Frontmatter `image_width`/`image_height`.
- **Beleg:** deklarierte 1280 × 721 gegenüber unabhängig aus den Dateibytes gelesenen **1200 × 675**. BlogPosting übernahm die falschen Deklarationen.
- **Änderung:** nur diese zwei Werte auf die tatsächlichen Maße korrigiert; Titel, Text, URL und Datumsfelder erhalten.
- **Hypothese:** Bildmetadaten und ausgeliefertes Bild stimmen überein; keine Rankingbehauptung.
- **Prüfung:** Build-Validator vergleicht HTML- und Schema-Maße mit `sharp` für alle sieben Artikel.
- **Rücknahme:** die zwei Frontmatter-Hunks zurücknehmen.

### T4 – Drei interne Links mit falscher Großschreibung

- **Beleg:** GPT-Hauptartikel und Sol-vs-Pro verlinkten `/category/KI/`, Browserpilot `/category/Privacy/`. Tatsächlich erzeugt werden `/category/ki/` und `/category/privacy/`. Auf dem lokalen macOS-Dateisystem kann ein einfacher Existenzcheck diesen Fehler verdecken; geprüft wurde deshalb ein exaktes Dateiinventar.
- **Änderung:** die drei Links einzeln auf die existierenden kleingeschriebenen Pfade berichtigt. Keine neuen Redirects, kein automatischer Linker, kein neuer Linkblock.
- **Hypothese:** Leser:innen können die vorhandenen passenden Kategorien zuverlässig erreichen. Keine Änderung des Artikelthemas.
- **Prüfung:** `tools/qa/validate-seo-recovery.js` prüft relative und absolute Same-Origin-Links einschließlich Ankern, vorhandenen Redirects und extensionless HTML-Zielen anhand exakter Pfade.
- **Rücknahme:** jeweils nur die betreffende Linkzeile zurücknehmen.

### T5 – Sitemap respektiert vorhandene Indexierungsausschlüsse

- **Beleg:** die Baseline-Sitemap enthielt trotz bestehendem `noindex` sechs URLs: `/blauherzfilter-privacy-policy/`, `/privacy-policy/`, `/search/`, `/impressum/`, `/blog/2024-04-23-hat-da-jemand-seinen-guten-vorsatz-gebrochen/` und `/category/quarter-review/`. [Google empfiehlt die URLs aufzunehmen, die in Suchergebnissen erscheinen sollen](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) (Abruf 16.11.2026).
- **Änderung:** `sitemap.xml` respektiert bestehende `noindex`/`none`-Direktiven bei Artikeln und Seiten. Kategorien verwenden zusätzlich den tatsächlichen Archivzustand, aus dem bereits ihre bestehende `noindex`-Regel entsteht. Eleventy nimmt hier nur die erste generierte Kategorie in `collections.all` auf; deren vorhandenes `pagination.pages` liefert die vollständigen Archivzustände. Video-/Publikationskategorien bleiben erhalten. Keine Indexierbarkeitsregel geändert.
- **Hypothese:** Sitemap und ausdrücklich gesetzte Indexierungsabsicht widersprechen sich nicht mehr. Keine Zusage über Crawling oder Rankings.
- **Prüfung:** `scripts/tests/standard-sitemap-test.mjs` rendert das echte Template und nutzt den bestehenden CategoryPages-/`eleventyComputed.site`-Vertrag mit nur dem ersten Pagination-Record: indexierbare, leere, Video-/External-only-Kategorien, `sitemap:false`, `none`, Overrides und Pagination. Die erste idealisierte Testfixture mit allen Kategorie-Records erkannte die reale Collection-Grenze nicht; der Build-Validator deckte den verbliebenen `quarter-review`-Eintrag auf. Test und Implementierung wurden korrigiert; Gegenproben gegen beide alten Templatezustände scheitern, die endgültige Fassung besteht. Finaler HTML-Check bestätigt **701 statt 707** Sitemap-Ziele und alle sechs beabsichtigten Ausschlüsse.
- **Rücknahme:** ausschließlich die neuen Sitemap-Auswahlbedingungen zurücknehmen; Robots-Direktiven wurden nicht verändert.

## Redaktionelle Piloten

### P1 – Letzten Git-Commit rückgängig machen

**Nutzerfrage:** letzten Commit zurücknehmen; Änderungen behalten oder verwerfen; bereits veröffentlichte Historie beachten. Die hilfreiche Kurzlösung und alle bestehenden Überschriften/Anker bleiben erhalten.

**Befund und Änderung:** Die Entscheidungstabelle behauptete bei `revert`, Änderungen blieben erhalten. Sie benennt jetzt korrekt den neuen Gegen-Commit. `git commit --amend --only` erklärt die reine Nachrichtenänderung, ohne vorbereitete Dateiänderungen versehentlich aufzunehmen. `HEAD~1` setzt einen vorhandenen ersten Eltern-Commit voraus; sauberer Arbeitsstand, Konflikte/Abbruch und Merge-Sonderfall bei `revert` sind erläutert. Verlustwarnungen stehen vor `--hard`, einschließlich ungetrackter Hindernisse. Sichtbare FAQ und daraus erzeugtes Schema sind synchronisiert.

**Metadaten vorher = nachher:**

- Title/H1/Meta-Title: `Git letzten Commit rückgängig machen: reset, revert oder amend?`
- Description: `So machst du den letzten Git-Commit sicher rückgängig und erkennst, wann reset, revert oder amend die richtige Lösung ist.`

Diese Angaben passen bereits zur Frage; niedrige aggregierte CTR ist kein ausreichender Änderungsgrund. **Hypothese:** die tatsächliche Befehlswirkung und Voraussetzungen helfen, den passenden Weg schneller zu wählen und unbeabsichtigte Änderungen zu vermeiden. Keine Rankingursache behauptet.

**Quellen, Abruf 16.11.2026:** [git-reset](https://git-scm.com/docs/git-reset), [git-revert](https://git-scm.com/docs/git-revert), [git-commit](https://git-scm.com/docs/git-commit), [gitrevisions](https://git-scm.com/docs/gitrevisions).

**Prüfung:** sieben semantische Szenarien in wegwerfbaren Test-Repositories unter Apple Git 2.54.0: soft/mixed/hard mit Branch, Index und Arbeitsbaum; revert erhält den alten Commit und nimmt Inhalt mit neuem Commit zurück; amend-only lässt Folgeänderungen staged; Ignore-Regeln/Tracking/Indexentfernung; ignorierter Elternordner verhindert Ausnahme. Alle bestanden. Test isolierte globale Hooks/Excludes/Signierung; keine Commits im Website-Repository. Die 14 bisherigen Markdown-Anker sind erhalten. Passende bestehende Links zu Gitignore, getrackten Dateien und Git-Kategorie bleiben.

**Rücknahme:** ausschließlich die redaktionellen Hunks dieses Artikels zurücknehmen; keine URL-/Datumsänderung nötig.

### P2 – Wie funktioniert `.gitignore`?

**Nutzerfrage:** welche Muster wirken, wie kann man sie nachvollziehen, warum werden vorhandene Dateien weiter getrackt?

**Befund und Änderung:** pauschales Versprechen, Dateien gelangten gar nicht ins Repository, auf ungetrackte Dateien beim normalen Hinzufügen präzisiert. Pfad-/Ordnergrenzen und Negation bei ignorierten Eltern erläutert. Reproduzierbares `debug.log`/`important.log`-Beispiel ergänzt. Diagnose getrackter Dateien mit `check-ignore --no-index` erklärt. Beim Entfernen aus dem Index `.gitignore` mitstagen; lokale Datei, aktueller Repository-Stand und alte Commits klar getrennt. FAQ entsprechend präzisiert. Keine allgemeine Git-Einführung ergänzt.

**Metadaten vorher = nachher:**

- Title/H1/Meta-Title: `.gitignore einfach erklärt: Regeln, Beispiele und häufige Fehler`
- Description: `So funktioniert .gitignore in Git: Regeln, Beispiele, typische Fehler und was du tun musst, wenn Git Dateien trotzdem trackt`

**Hypothese:** nachvollziehbare Beispiele und Grenzen erleichtern korrekte Diagnose und Anwendung. Metadaten sind bereits inhaltlich passend, deshalb kein CTR-basierter Rewrite.

**Quellen, Abruf 16.11.2026:** [gitignore](https://git-scm.com/docs/gitignore), [git-check-ignore](https://git-scm.com/docs/git-check-ignore), [git-rm](https://git-scm.com/docs/git-rm).

**Prüfung:** oben genannte temporäre Git-Szenarien, 13 vorhandene Markdown-Anker erhalten. Bestehender expliziter Permalink erhält die URL trotz historischem `.md.md`-Quelldateinamen. Interne Links zu passenden bestehenden Git-Anleitungen bleiben.

**Rücknahme:** nur Artikelhunks zurücknehmen; Dateiname, Permalink und bestehender Redirect wurden nicht verändert.

### P3 – Browser aus Europa

**Nutzerfrage:** welche vorhandenen Alternativen haben welchen Europa-Bezug und welche Kriterien sind für die Auswahl nachvollziehbar?

**Befund:** „EU Browser“ passte nicht zu Norwegen/Island und internationalen Communities. Konqueror war fälschlich als KHTML/nicht Chromium dargestellt; Otter pauschal als Chromium, LibreWolf-Sync pauschal als nicht vorhanden. Mehrere Superlative und Performance-/Compliance-Aussagen waren nicht durch eigene Messungen belegt. Drei explizite leere Anker duplizierten gleichnamige automatisch erzeugte Heading-IDs.

**Änderung:** Europa-Bezug als Anbieterstandort beziehungsweise organisatorischer Hintergrund definiert; Eigentümer, Engine und Datenflüsse getrennt. Desktop-Vergleich kenntlich gemacht. Konqueror/Qt WebEngine und Otters Backend-Abhängigkeit korrigiert; LibreWolf-Sync ist standardmäßig deaktiviert, optional aktivierbar. Pauschale Sieger-/Leistungs-/Compliance-Aussagen durch überprüfbare Kriterien eingeschränkt. Bestehende neun Einträge bleiben; keine neue Browserliste. Drei redundante leere Anker entfernt, identische vorhandene Heading-IDs bleiben jeweils einmal erhalten. FAQ an sichtbare Aussagen angepasst.

| Feld | Vorher | Nachher |
| --- | --- | --- |
| Title/H1 | Europäische Browser: Die besten Alternativen zu Chrome, Safari und Edge | Browser aus Europa: Herkunft, Engine und Datenschutz im Vergleich |
| Meta-Title | EU Browser: 9 Alternativen zu Chrome + Privacy-Check | Browser aus Europa: Herkunft, Engine und Datenschutz |
| Description | Vergleich europäischer Browser nach Datenschutz, Engine und Sync. Empfehlungen für macOS, Windows, Linux, Android plus FAQ: Ist X wirklich europäisch? | Neun Browser mit unterschiedlichem Europa-Bezug: Anbieter, Desktop-Engine und Datenschutzfunktionen im Vergleich. Mit Einordnung von Opera und Community-Projekten. |

**Hypothese:** präzisere Herkunft und belegte Vergleichskriterien schaffen eine bessere Übereinstimmung zwischen Metadaten, schneller Antwort und Inhalt. Keine behauptete Snippet-, CTR- oder Rankingwirkung; nur eine Variante umgesetzt.

**Wesentliche offizielle Quellen, Abruf 16.11.2026:** [Vivaldi-Unternehmen](https://vivaldi.com/company/), [Vivaldi-Sync](https://help.vivaldi.com/desktop/tools/sync/), [Vivaldi Enterprise](https://vivaldi.com/enterprise/), [Opera-Beteiligungsmeldung 30.03.2026](https://investor.opera.com/static-files/26a5252d-9278-4789-aca4-c54c8d505741), [Ecosia-Impressum](https://www.ecosia.org/imprint), [Ecosia-Browser](https://www.ecosia.org/browser), [Ecosias Chromium/Blink-Angabe an die CMA](https://assets.publishing.service.gov.uk/media/66d6c5b76eb664e57141db5b/Ecosia_WP_1__2___3_-_TO_BE_PUBLISHED.pdf), [Mullvad Browser](https://mullvad.net/en/browser), [Mullvad-FAQ](https://mullvad.net/en/help/faq), [Konqueror](https://apps.kde.org/konqueror/), [Falkon](https://apps.kde.org/falkon/), [Otter](https://otter-browser.org/), [Qt WebEngine](https://doc.qt.io/qtwebengine/qtwebengine-overview.html), [LibreWolf-Features](https://librewolf.net/docs/features/), [LibreWolf-FAQ](https://librewolf.net/docs/faq/), [Brave-Anbieter](https://brave.com/about/), [Apples alternative Engines](https://developer.apple.com/support/alternative-browser-engines/).

**Prüfung/Rücknahme:** alle bisherigen Content-Anker erhalten; drei doppelte Content-IDs beseitigt. Exakte interne Zielpfade prüfen Build-Validator und Browsercheck. Zur Rücknahme nur Artikelhunks verwenden. Keine Änderung an Slug, Permalink, Veröffentlichung oder `last_modified_at`.

## Bewusst nicht umgesetzt und offene Prüfpunkte

- **GPT-Abgrenzung:** Hauptartikel vergleicht Sol/Terra/Luna als Modellfamilie, Preise und Einsatzbereiche; Vertiefung behandelt Sol/Pro und Reasoning-Einstellungen in ChatGPT/API. Der Vertiefungsartikel verlinkt bereits den Hauptartikel. Das ist eine erkennbare inhaltliche Abgrenzung, aber keine Query-Auswertung. Keine Kannibalisierungsbehauptung, Zusammenführung, Weiterleitung oder fachliche Modellaktualisierung. Nur die belegte defekte Kategorieverlinkung wurde repariert.
- **Traffic-Treiber:** keine experimentellen Title-/Text-Rewrites. Caffeine bleibt unverändert; GPT nur Link, Gen1Recomp nur falsche Maße. Keine unbestätigten Modellnamen, Versionen, Kompatibilitäten oder Funktionen ergänzt. Fachliche Prüfung der möglichen Caffeine-App/caffeinate-Begriffsvermischung wäre ein separater Inhaltsschritt.
- **Canonicals:** alle sieben Artikel sind selbstkanonisch ohne Fragment und stimmen mit BlogPosting überein. Linkhub hat bewusst `/linkhub` als Canonical trotz physischem `/linkhub.html`; erhalten. Kein pauschales Canonical-Refactoring. Prozentkodierte Unicode-Pfade wurden nicht als Fehler bewertet.
- **Robots:** keine versehentliche globale Produktionssperre gefunden. Bestehende bewusste `noindex`-Regeln (unter anderem Suche, rechtliche Seiten, paginierter Blog und leere Kategorien) erhalten. Keine Artikel pauschal ausgeschlossen.
- **Ecosia-Sync:** [Kontohilfe](https://support.ecosia.org/article/630-ecosia-accounts) und [Datenschutzerklärung](https://www.ecosia.org/privacy) beschreiben unterschiedliche Sync-Fälle. Keine neue pauschale Feature-Aussage; konkrete App und Version separat prüfen.
- **Globale ID `social`:** auf Standardseiten doppelt; keine konkrete kaputte Artikel-Sprungmarke/Funktion belegt. Kein zusätzlicher globaler Komponentenumbau in diesem Sprint.
- **Leeres Kategorie-Metadatum:** `/category/vscode/` hat eine leere Description, ist aber bereits vorhandene Redirect-Quelle nach `/category/software-development/`. Keine neue Kategoriecopy oder Redirect-Änderung ohne gesonderten Bedarf. Live-Redirectverhalten später prüfen.
- **Performance/Ads:** kein Nachweis, dass CWV den Rückgang verursachten. Autorenfotos sind bereits per CSS reserviert. AdSense Auto Ads hat keine im Repo bestimmbaren festen Slots; reale Platzierung und Consent-Verhalten verlangen Laufzeit-/Felddaten. Werbung, Consent und Analytics wurden nicht entfernt. Lokale Browserprüfung blockiert Drittanbieter für Reproduzierbarkeit und beweist kein Produktionsverhalten externer Dienste.
- **Keine Live-Wirkung geprüft:** kein veröffentlichtes Google-Snippet, kein Search-Console-Livezugang, kein Ranking-/Traffic-Effekt, keine produktive HTTP-Header-/Redirectprüfung. Keine Ranking- oder Traffic-Garantie.

## Technische Prüfung und Wiederholung

Vor Änderungen lief `npm run build` erfolgreich: 869 HTML-Dateien, 92.339 lokale Referenzen, 1.372 parsebare JSON-LD-Blöcke, keine von der bestehenden Site-QA gefundenen Fehler. Die bestehende QA prüft absolute interne Links und Fragmente nicht vollständig; der neue Sprint-Validator ergänzt dies für die sieben Ziele.

Neue Prüfungen sind in `npm test`/`npm run qa` eingebunden: Metadaten-Escaping, Hero-Maße und Sitemap-Auswahl. `tools/qa/validate-seo-recovery.js` prüft die sieben Originalpfade, alle gespeicherten bisherigen IDs, unveränderte Daten, geschützte Metadaten, Canonicals/Robots, JSON-LD, tatsächliche Bildmaße, exakte interne Links/Anker, weitere Seitentypen und alle Sitemap-Ziele. Die Fixture `scripts/tests/fixtures/seo-recovery-baseline.json` enthält ausschließlich öffentliche Repository-/HTML-Werte, keine GSC-Daten. Sie soll bei späteren bewussten Datums-/Titleänderungen gezielt angepasst werden.

Browserprüfung: `npm run test:browser -- scripts/tests/browser/seo-recovery.spec.mjs` prüft die drei Piloten bei 390 und 1440 Pixeln, Überschrift/Einleitung, Hero, horizontalen Überlauf, eindeutige TOC-Ziele und Sprungnavigation. Screenshots liegen im ignorierten `test-results/`.

Finale Ergebnisse am 16.11.2026:

| Prüfung | Ergebnis |
| --- | --- |
| `ELEVENTY_ENV=production npm run build`, einschließlich aller bestehenden und neuen QA-Tests | PASS, Exit 0 |
| Bestehende Site-QA | 869 HTML-Dateien, 92.339 lokale Referenzen, 1.372 parsebare JSON-LD-Blöcke, 0 gefundene Fehler |
| Neuer SEO-Build-Validator | 7 unveränderte Artikelpfade mit bisherigen IDs/Daten, geschützten Metadaten, Bildmaßen und Schema; 554 exakte interne Links; 10 weitere Layout-/Metadatenkontrollen; 701 Sitemap-Ziele: PASS |
| Sechs bestehende `noindex`-URLs aus Sitemap entfernt, Sitemap als XML geparst | PASS; ihre Robots-Regeln unverändert |
| Private Exporte und internes `docs/` im Produktionsbuild ausgeschlossen | PASS |
| Chromium gegen Produktionsbuild, drei Piloten × 390/1440 px | 6/6 PASS; keine Seiten-JavaScript-Fehler, kein horizontaler Dokumentüberlauf, TOC-Ziele eindeutig und erreichbar |
| Visuelle Prüfung | Alle sechs Screenshots der oberen Seitenbereiche geöffnet; zusätzlich vollständige Browser-/Git-Ansichten geprüft. Keine erkennbare Regression in Titel, Einleitung, Hero, Lesefluss oder Navigation |
| Git-Befehlsbeispiele in temporären Repositories | 7/7 semantische Szenarien PASS |
| `git diff --check` | PASS |

Die erste Browserassertion verlangte ein exakt gleiches Seitenverhältnis zwischen Originalattributen und den auf ganze Pixel gerundeten responsiven `naturalWidth`/`naturalHeight`-Werten. Das war eine unpassende Testannahme; sie wurde auf Bildladeprüfung und Rundungstoleranz berichtigt. Originaldateimaße werden weiterhin unabhängig und exakt mit `sharp` geprüft. Nach der Korrektur bestanden alle sechs Browserfälle auch gegen den abschließenden Produktionsbuild.

Geänderte Produktionsquellen: die sechs Artikeldateien mit Eingriff laut Zuordnungstabelle, `meta.html`, `_layouts/post.html`, `sitemap.xml`. Weitere geänderte Dateien sind `package.json`, die drei neuen Unit-Testskripte, die Browser-Spezifikation, die Baseline-Fixture, der SEO-Build-Validator und dieses interne Protokoll. Keine Lockfile-/Abhängigkeitsänderung. Caffeine-Quelle, Redirects, Deploymentkonfiguration und Bilddateien bleiben unverändert.

Wiederholbare Befehle:

```sh
ELEVENTY_ENV=production npm run build
npm run test:browser -- scripts/tests/browser/seo-recovery.spec.mjs
git diff --check
```

## Messplan nach tatsächlicher Veröffentlichung

1. Tatsächliches Veröffentlichungsdatum, Uhrzeit und ausgelieferten Git-Stand später separat erfassen. Lokale Bearbeitung am 16.11.2026 ist noch keine Veröffentlichung.
2. Unmittelbar danach die sieben Pfade und neue interne Linkziele auf HTTP-Status/Weiterleitung prüfen; gerenderte Titles, vollständige Descriptions, je ein Canonical, Robots und parsebares Schema abgleichen. Alte Sprungmarken mobil/desktop prüfen. Sitemap mit sechs entfernten `noindex`-Einträgen prüfen, bestehende Ausschlüsse erhalten. Mit URL-Prüfung in GSC bei Bedarf Indexierbarkeit und von Google gewählten Canonical kontrollieren.
3. Die drei Pilot-URLs und geschützte Vergleichsartikel in vergleichbaren 28-Tage-Fenstern beobachten; erste 28 Tage nach Veröffentlichung erst nach vollständigen GSC-Daten bewerten. Veröffentlichten Misch-/Rollouttag gesondert behandeln; saisonal passende Vorjahresfenster ergänzen, falls verfügbar.
4. Klicks, Impressionen, CTR aus Summen und Position für jede URL und ihre tatsächlich zugehörigen Queries exportieren. Query-Exporte mit explizitem Seitenfilter verwenden; Fragment- und Basiszeilen nicht als eindeutige Sichtbarkeit aufsummieren.
5. Query-Mix, Geräte-/Länderverteilung, Suchnachfrage und andere Veröffentlichungen/Änderungen mitbeobachten. Alte/neue Queries sowie Positionsbereiche getrennt vergleichen. Keine sichere Kausalität aus einfachem Vorher/Nachher-Vergleich ableiten; mehrere Änderungen wurden zusammen umgesetzt.
6. Für den nächsten Sprint **Seiten- und Query-Vergleichsexporte vom 15.08.–11.09.2026 und 18.10.–14.11.2026** beschaffen. Zusätzlich seitengefilterte Queries der Kandidaten, zeitlich vergleichbare Geräte-/Länderaufschlüsselung, GSC-Indexierungs-/Canonical-Belege und verfügbare CWV-Felddaten. Erst damit lassen sich tatsächliche Verlustartikel priorisieren oder vermutete Überschneidungen untersuchen.
