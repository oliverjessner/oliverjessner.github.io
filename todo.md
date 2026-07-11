# Roadmap: Journalismus-Seite

## Grundlage und Zielbild

**Stand der Analyse: 9. Juli 2026.** Geprüft wurden die ausgelieferte Seite `https://oliverjessner.at/journalismus/`, `pages/journalismus.md`, `_layouts/journalismus.html`, die zugehörigen Styles sowie die vorhandenen externen Publikationsdaten.

Die Seite ist heute inhaltlich substanziell: Sie hat einen klaren Service-Ansatz, konkrete Preise, echte Medienreferenzen, Arbeitsproben, ein FAQ, interne Themencluster und valides Grund-SEO (eindeutiger Title, Description, Canonical, Open-Graph-/X-Metadaten, `Service`- und `FAQPage`-Schema). Sie ist indexierbar und in der Sitemap enthalten. Die Roadmap ersetzt diese Stärken nicht.

Der größte Hebel ist **nicht mehr Inhalt**, sondern eine klarere Informationshierarchie: Als Erstes muss sichtbar werden, dass Oliver Jessner ein freier Tech- und Wirtschaftsjournalist ist, für welche Redaktionen er veröffentlicht und welche aktuellen, belastbaren Arbeiten seine Expertise belegen. Danach sollen Redaktionen und Unternehmensauftraggeber jeweils einen eindeutigen nächsten Schritt erhalten.

Wichtige technische Ausgangslage:

- `_data/links/golem.yml` enthält 48 externe Artikel (22. Januar 2024 bis 6. Juli 2026); die stärksten wiederkehrenden Themen sind KI (27), Softwareentwicklung (16), Arbeitswelt (11), Politik (9), Bildung und Social Media (je 8).
- Weitere strukturierte Quellen sind `_data/links/it-finanzmagazin.yml`, `gamestar.yml`, `ign.yml` und `meinbezirk.yml`. Alle verwenden `title`, `slug`, `link`, `date`, `description`, `thumbnail`, `authors` und `categories`.
- Die Journalismus-Seite verwendet diese Artikelquellen derzeit **nicht** für die sechs Arbeitsproben: Sie sind in `_layouts/journalismus.html` fest verdrahtet. Neuere Golem-Artikel erscheinen daher dort nicht.
- Das bestehende Include `_includes/theme/cards/card-editorial.html` kann externe Artikel bereits mit Bild, Datum, Kategorien, Beschreibung, zugänglichem Gesamtlink und Lazy Loading ausgeben. Es wird z. B. im Blog und in den Kategorie-Seiten eingesetzt.
- Das vorhandene Autorenprofil unter `pages/authors/oliver-jessner.md` enthält bereits Personendaten, Abschlüsse, Fachgebiete, Publikationsprofile und `Person`-Schema. Diese Quelle soll verlinkt und nicht doppelt gepflegt werden.

## Prioritäten und Abhängigkeiten

- **P0** = kritisch / hoher unmittelbarer Effekt
- **P1** = hoher Nutzen
- **P2** = sinnvoll
- **P3** = optional / Experiment

Die P0-Tasks `POS-01`, `CONTENT-01`, `DESIGN-01` und `TECH-01` bilden zusammen die neue sichtbare Seite. `SEO-02` setzt die in `CONTENT-01` eingeführte kuratierte Auswahl voraus. `CONTENT-02` und `DESIGN-02` dürfen erst nach dieser neuen Kernstruktur umgesetzt werden, damit keine neue Doppelung entsteht.

---

## SEO

### [P0 · SEO-01] H1 und Hero für Personen- und Leistungs-Suchintention schärfen

**Problem**

Der vorhandene Title (`Freier Tech- & Wirtschaftsjournalist | Oliver Jessner`) und die Meta Description sind präzise; Canonical, Open Graph, X Cards und Robots-Meta sind ebenfalls korrekt. Der sichtbare H1 lautet jedoch nur „Tech- und Wirtschaftstexte, die Entscheidungen erleichtern.“ Weder der Name noch „freier Journalist“, „Recherche“ oder der DACH-Kontext stehen in der primären sichtbaren Überschrift.

**Warum**

Menschen, die nach einer Person, einem freien Tech-Journalisten, einer journalistischen Recherche oder einem Autor für KI-/Wirtschaftsthemen suchen, sollen die Relevanz innerhalb weniger Sekunden erkennen. Das stärkt **SEO, Conversion und Vertrauen**, ohne die funktionierenden Meta-Daten unnötig umzubauen.

**Konkrete Umsetzung**

1. In `_layouts/journalismus.html` den H1 in eine sachlichere, trotzdem positionierende Form überführen, z. B. „Oliver Jessner – freier Tech- und Wirtschaftsjournalist für KI, Plattformen und digitale Souveränität“.
2. Den bisherigen, guten Nutzen-Claim als Hero-Lead oder kurze Eyebrow-Zeile behalten; er darf nicht als zweiter H1 erscheinen.
3. Den Hero-Text auf die vorhandenen, belegten Leistungen verdichten: recherchierte Analysen, Kommentare, Interviews und Event-Berichte für Redaktionen; Research/Ghostwriting nur klar getrennt für Unternehmen.
4. In `pages/journalismus.md` `image_alt` mit einer zur Banner-Grafik passenden Beschreibung ergänzen, damit das Social-Image-Alt nicht mehr nur auf `page.title` zurückfällt.
5. `meta_title` und `meta_description` nur dann minimal anpassen, wenn die endgültige H1-Terminologie abweicht; keine Keyword-Liste, keine Wiederholung von „Journalist“ im Stakkato. Der aktuelle Canonical-Pfad `/journalismus/` bleibt unverändert.

**Acceptance Criteria**

- Es gibt genau einen H1; er enthält „Oliver Jessner“, „freier“ und „Tech- und Wirtschaftsjournalist“ oder eine inhaltlich gleichwertige Formulierung.
- Title, Description, Canonical, `og:url`, `og:title` und X-Metadaten bleiben vollständig und verweisen weiterhin auf `https://oliverjessner.at/journalismus/`.
- Der sichtbare Hero erklärt in höchstens zwei kurzen Textblöcken Person, Themen und Auftraggeber.
- Kein Keyword-Stuffing und keine zusätzliche, konkurrierende Landingpage-URL werden eingeführt.

**Abhängigkeiten**

- Vor `DESIGN-01`, weil die finale Hero-Hierarchie dort gestaltet wird.

### [P1 · SEO-02] Portfolio als verknüpfte WebPage-, Person-, Service- und ItemList-Daten auszeichnen

**Problem**

Die Seite liefert aktuell ein sinnvolles `Service`-Schema mit eingebettetem Provider und ein separates `FAQPage`-Schema. Es fehlt aber ein strukturierter Bezug zwischen der Journalismus-Landingpage, dem vorhandenen Autorenprofil und den kuratierten Arbeitsproben. Damit bleibt ein wesentlicher E-E-A-T-Nachweis im sichtbaren HTML statt auch maschinenlesbar verknüpft.

**Warum**

Die Verknüpfung macht die Seite für Suchsysteme als professionelle Portfolio- und Leistungsseite eindeutiger. Sie stärkt **SEO, Vertrauen und Wartbarkeit**, weil die Personendaten nicht erneut als freier Text gepflegt werden müssen.

**Konkrete Umsetzung**

1. Nach `CONTENT-01` ein schlankes Include, z. B. `_includes/framework/global/seo/journalism-schema.html`, erstellen und in `_layouts/journalismus.html` einbinden.
2. Das Include erzeugt einen JSON-LD-`@graph` mit:
   - `WebPage` für die kanonische Journalismus-URL und das Banner als `primaryImageOfPage`;
   - Verweis auf die existierende `Person`-ID `https://oliverjessner.at/authors/oliverjessner/#person` statt einer zweiten, abweichenden Person;
   - `Service` als Weiterentwicklung des vorhandenen `service-schema.html` oder mit konsistentem `@id` zum bestehenden Service;
   - `ItemList` für die 4–6 kuratierten Arbeitsproben aus `page.journalism_featured_articles`.
3. Jeder `ListItem` referenziert ausschließlich die Original-URL des externen Beitrags, dessen `name`, `datePublished`, Bild und Quelle aus den vorhandenen YAML-Daten. Externe Artikel nicht als eigene `NewsArticle` auf `oliverjessner.at` auszeichnen.
4. Das bestehende `Service`-Schema nicht zusätzlich doppelt ausgeben: Entweder dessen Include gezielt in das neue `@graph` überführen oder den Service-Teil dort entfernen und die bisherigen Werte weiterverwenden.
5. Das bestehende FAQ-Schema beibehalten, solange die drei Fragen sichtbar und inhaltlich unverändert vorhanden sind.

**Acceptance Criteria**

- Rich Results Test bzw. Schema Validator meldet für den `@graph` keine Syntax- oder Entitätskonflikte.
- Die `Person`-Referenz zeigt auf das vorhandene Autorenprofil und dessen `sameAs`-/Credential-Daten, nicht auf eine neue, unvollständige Person.
- Die `ItemList` enthält genau die sichtbar kuratierten Arbeitsproben in derselben Reihenfolge.
- Keine externe Veröffentlichung wird irreführend als auf der eigenen Domain publizierter Artikel deklariert.

**Abhängigkeiten**

- `CONTENT-01`.

### [P2 · SEO-03] Aussagekräftige Linktexte und Bildalternativen konsolidieren

**Problem**

Die sechs bisherigen Karten verwenden mehrfach generische Linktexte wie „auf Golem lesen“. Die funktionalen Medienlogos beschreiben teils nur das Logo („logo von golem.de“) statt das Ziel. Die vorhandenen Arbeitsprobenbilder haben zwar größtenteils gute Alt-Texte, laden aber künftig besser über die zugängliche Kartenkomponente.

**Warum**

Konkrete Linkziele helfen Nutzern, Screenreadern und Suchsystemen bei der Einordnung. Das verbessert **SEO, UX und Accessibility**; der Effekt ist klein, der Aufwand gering.

**Konkrete Umsetzung**

1. Mit `CONTENT-01` die doppelten Bild- und Buttonlinks je Arbeitsprobe durch einen vollständigen `editorial-card`-Link ersetzen. Den sichtbaren Abschlusslink pro Karte als „Artikel auf Golem.de lesen“, „Artikel im IT-Finanzmagazin lesen“ usw. ausgeben.
2. `card-editorial.html` weiterhin mit leerem Bild-Alt für dekorative Kartenbilder verwenden, weil der gesamte Kartenlink bereits einen spezifischen `aria-label` aus dem Artikeltitel hat.
3. In der Medienreferenz die Alt-Texte funktionaler Logos auf das Ziel ausrichten, z. B. „Golem-Autorenprofil von Oliver Jessner öffnen“ statt „logo von golem.de“.
4. Die Linktexte der internen Themencluster als vollständige Artikeltitel belassen; sie sind bereits gute, kontextreiche interne Anchors.

**Acceptance Criteria**

- Es gibt keine mehrfach identischen „auf Golem lesen“-Links ohne Artikeltitel-Kontext.
- Jeder verlinkte Medienlogo-Link hat einen zugänglichen Namen, der Ziel und Zweck erkennen lässt.
- Kartenbilder werden nicht mit redundanten, nebenstehenden Artikeltexten vorgelesen.

**Abhängigkeiten**

- `CONTENT-01`, `ACC-02`.

### [P2 · SEO-04] Themencluster mit passender interner und externer Evidenz verknüpfen

**Problem**

Die drei `journalism_clusters` in `pages/journalismus.md` verlinken nur statisch ausgewählte eigene Blogposts. Die 48 Golem-Artikel mit nachvollziehbaren Kategorien werden weder für diese thematischen Cluster noch für weiterführende Expertise-Signale verwendet. Aktuelle Arbeiten bleiben dadurch von den passenden internen Analysen getrennt.

**Warum**

Saubere Themencluster stärken die Informationsarchitektur und zeigen pro Beat wiederkehrende journalistische Praxis. Das verbessert **SEO, Vertrauen, UX und Conversion**, weil ein Ressortleiter schneller relevante Beispiele findet.

**Konkrete Umsetzung**

1. Die bestehenden drei Cluster in `pages/journalismus.md` behalten, aber pro Cluster ergänzen:
   - `golem_categories`: 1–3 Kategorien, die aus den tatsächlichen Golem-Daten stammen;
   - höchstens zwei explizit ausgewählte externe Slugs als `featured_external_slugs`, wenn nur bestimmte Beiträge gezeigt werden sollen.
2. In `_layouts/journalismus.html` die interne Liste weiter aus den vorhandenen `cluster.posts` rendern und darunter maximal zwei passende externe Artikel aus `site.data.links.golem` ausgeben. Auswahl zuerst nach expliziten Slugs, sonst nach Kategorie und neuestem Datum.
3. Die sichtbaren Cluster als „Eigene Analysen & veröffentlichte Recherche“ bezeichnen, damit klar ist, welche Links intern und welche extern sind.
4. Für den Start nur die fachlich kongruenten Bereiche verknüpfen:
   - KI / Plattformen / Souveränität: `KI`, `Privacy`, `Politik`, `cloud`;
   - Startups / Marktlogik: `startups`, `Wirtschaft`, `Arbeitswelt`;
   - Tech-Macht / Arbeit: `Arbeitswelt`, `software-development`, `Politik`.
5. Gaming- und allgemeine Produktartikel nicht künstlich in diese drei Cluster pressen. Sie bleiben im Gesamtportfolio auffindbar, aber nicht in einem unpassenden Expertise-Block.

**Acceptance Criteria**

- Jeder Themencluster enthält mindestens zwei interne, passende Links und höchstens zwei klar als extern markierte Veröffentlichungen.
- Kein externer Artikel erscheint in einem Cluster allein wegen eines sehr allgemeinen Tags wie „KI“, wenn Thema und Clusterbeschreibung nicht zusammenpassen.
- Die Auswahl bleibt nach einem `npm run update:golem` stabil, wenn sie über Slugs kuratiert wurde.
- Alle internen URLs führen zu existierenden Beiträgen.

**Abhängigkeiten**

- `CONTENT-01`; erst nach der Entdichtung der Seite umsetzen.

### [P3 · SEO-05] FAQ nur um nachweisbare, kaufnahe Fragen ergänzen

**Problem**

Die aktuelle FAQ deckt Presseausweis, PR-Veröffentlichung und Messeberichterstattung ab und ist korrekt als `FAQPage` ausgezeichnet. Fragen zu Ablauf, Themen-Fit oder redaktioneller Unabhängigkeit stehen dagegen an anderen Stellen der Seite oder fehlen. Es besteht kein akuter Schema-Fehler.

**Warum**

Ein präzises FAQ kann **Conversion und Vertrauen** erhöhen; ein großes Keyword-FAQ ohne echten Nutzwert würde die Seite dagegen verlängern und bietet keine verlässliche Rich-Result-Perspektive.

**Konkrete Umsetzung**

1. Erst nach Auswertung echter Anfragen maximal zwei Fragen ergänzen, etwa „Welche Themen übernimmst du für Redaktionen?“ und „Wie trennst du Unternehmensaufträge von redaktioneller Arbeit?“
2. Frage und Antwort im sichtbaren HTML sowie im vorhandenen JSON-LD identisch halten.
3. Keine allgemeinen Fragen zu „Was ist Journalismus?“ oder künstliche Standort-/Keyword-Fragen ergänzen.

**Acceptance Criteria**

- Jede FAQ-Frage beantwortet eine reale Beauftragungsentscheidung in zwei bis vier Sätzen.
- JSON-LD und sichtbarer Text bleiben synchron.

**Abhängigkeiten**

- Keine; bewusst nachrangig.

---

## Positionierung & Conversion

### [P0 · POS-01] Medienpublikation von sonstigen Kooperationen trennen

**Problem**

Direkt nach dem Hero erscheint „Selected Collaborations“ mit zehn Logos. Fünf davon sind in `_data/partners.json` als `social_media_marketing` markiert (Razer, Samsung, Wix, Rowenta, Codesphere), fünf als `media_outlet`. Auf einer Journalismus-Seite vermischt diese Darstellung journalistische Veröffentlichungen mit anderen Leistungsbereichen. Weiter unten werden Medienlogos zudem noch einmal gezeigt.

**Warum**

Für Redaktionen ist eine klare Antwort auf „Wo wurde veröffentlicht?“ wichtiger als eine breite, aber mehrdeutige Logowand. Die Änderung verbessert **Vertrauen, Conversion, UX und Positionierung**.

**Konkrete Umsetzung**

1. `_includes/framework/blocks/sections/partners.html` optional um `include.type`, `include.heading` und `include.intro` erweitern; ohne Parameter bleibt das Verhalten auf anderen Seiten unverändert.
2. In `_layouts/journalismus.html` das Include mit `type="media_outlet"`, der deutschen Überschrift „Veröffentlicht bei“ und einer kurzen, sachlichen Einleitung aufrufen.
3. Die `social_media_marketing`-Partner auf dieser Seite nicht als journalistische Referenz zeigen. Sie bleiben auf passenden Seiten wie Social Media Marketing verfügbar.
4. Die spätere Logo-Wiederholung in `#proof` entfernen und den frei werdenden Bereich für kompakten, belegten Vertrauensaufbau nutzen (siehe `CONTENT-02`).
5. Die Ziel-URLs in `_data/partners.json` vor der Veröffentlichung prüfen: Wenn möglich, verlinkt jeder Medienlogo-Link auf ein Autorenprofil oder eine Suchergebnisseite von Oliver Jessner, nicht lediglich auf die Startseite des Mediums. Keine URL erfinden; t3n nur dann als Publikationsreferenz zeigen, wenn eine belastbare Zielseite vorliegt.

**Acceptance Criteria**

- Im ersten Sichtbereich nach dem Hero stehen nur Medienreferenzen mit `type: media_outlet`.
- Kein als journalistische Publikation bezeichnetes Logo führt nur auf eine irrelevante Startseite.
- Jedes Medium wird auf der Seite maximal einmal als Logoreferenz ausgegeben.
- Die globale Partnerdarstellung auf anderen Seiten bleibt unverändert, wenn sie das Include ohne Filter verwendet.

**Abhängigkeiten**

- Vor `CONTENT-02` und `DESIGN-01`.

### [P0 · POS-02] Den nächsten Schritt für Redaktionen und Unternehmen im Hero unterscheiden

**Problem**

Die Hero-CTAs „Thema anfragen“ und „Erstgespräch buchen“ sind technisch funktionsfähig, unterscheiden aber nicht den häufigsten Entscheidungsweg einer Redaktion von dem eines Unternehmens. Erst deutlich weiter unten werden beide Zielgruppen erklärt.

**Warum**

Die Seite spricht zwei legitime, aber unterschiedliche Auftraggeber an. Eine frühe Wahl reduziert Reibung und macht die Trennung von publizistischer Arbeit und Unternehmensmandaten glaubwürdig. Erwarteter Effekt: **Conversion, Vertrauen und UX**.

**Konkrete Umsetzung**

1. Die CTA-Gruppe im Hero in `_layouts/journalismus.html` mit semantischer Wrapper-Klasse (z. B. `journalism-hero-actions`) versehen; die generische Bootstrap-Klasse `m-5` nicht weiter für die Layoutsteuerung verwenden.
2. Einen primären CTA als Mailto mit eindeutigem Betreff für Redaktionen anlegen, z. B. „Artikel oder Recherche anfragen“. Dafür den bestehenden Mail-Link aus `_includes/framework/blocks/components/get_in_touch_button.html` mit einer URL-kodierten Betreffzeile nutzen oder das Include um einen optionalen `button_href` ergänzen.
3. Einen sekundären CTA als „Research / Ghostwriting besprechen“ zum bestehenden Calendly-Link oder zu `#unternehmen` führen. Das Label muss deutlich machen, dass dies kein redaktioneller Pitch ist.
4. Unter den Buttons einen knappen Vertrauenssatz belassen: „Publizistische Arbeit und Unternehmensmandate sind getrennte Aufträge.“
5. Im Abschnitt `#zielgruppen` für jede Zielgruppe eine passende Anschluss-CTA ergänzen, die dieselben zwei Wege wieder aufnimmt. Keine dritte Kontaktlogik oder Formularplattform einführen.

**Acceptance Criteria**

- Im Hero ist ohne Scrollen erkennbar, welcher CTA für Redaktionen und welcher für Unternehmen gedacht ist.
- Beide CTAs haben konkrete, deutschsprachige Handlungslabels; „Get in touch“ bleibt nicht der einzige konkrete Kontakttext der Seite.
- Redaktions- und Unternehmensauftrag werden sprachlich und visuell nicht vermischt.
- Mail- und Kalenderlink funktionieren auf Desktop und Mobile.

**Abhängigkeiten**

- `DESIGN-01`, `ACC-02`.

### [P1 · POS-03] Kompetenznachweise aus dem Autorenprofil verdichtet sichtbar machen

**Problem**

Die Seite nennt im Abschnitt `#values` belastbare Erfahrungen (Ing. Informatik, MBA, 15 Jahre Softwareentwicklung, Führungserfahrung), platziert sie aber spät nach mehreren Angebots- und Ghostwriting-Blöcken. Das detaillierte Autorenprofil mit Credentials und Autorenlinks existiert bereits, wird hier jedoch nicht sichtbar referenziert.

**Warum**

Für Chefredaktionen und Interviewpartner sind Fachnähe, methodische Kompetenz und nachprüfbare Autorenprofile zentrale Vertrauenssignale. Das hilft **Vertrauen, Conversion, UX und E-E-A-T**.

**Konkrete Umsetzung**

1. Den Inhalt von `#values` auf drei konkrete, belegte Fakten verdichten und als kompakte Faktenleiste bzw. Proof-Block direkt nach „Veröffentlicht bei“ platzieren:
   - Ing. Informatik und MBA mit VC-Fokus;
   - 15 Jahre Software-/Produktpraxis;
   - publizistische Arbeit und Unternehmensmandate getrennt.
2. Einen deskriptiven internen Link zum Autorenprofil `/authors/oliverjessner/` ergänzen, z. B. „Fachprofil, Abschlüsse und Autorenprofile ansehen“.
3. Den großen Netzwerk-Claim („mehreren Hundert …“) nur beibehalten, wenn er im nächsten Review mit einer belastbaren, nicht vertraulichen Einordnung präzisiert werden kann. Andernfalls den belegbaren Teil der Methodik hervorheben: Quellenarbeit, Interviews, Sekundäranalyse und eigene Datenerhebungen, wo angemessen.
4. Keine Testimonials, Reichweitenzahlen oder Kundenzitate erfinden. Solche Elemente erst nach Vorlage einer freigegebenen Quelle ergänzen.

**Acceptance Criteria**

- Mindestens drei konkrete Fach- oder Erfahrungsnachweise stehen vor den Arbeitsproben oder unmittelbar danach.
- Der Autorenprofil-Link ist intern, beschreibend und funktioniert.
- Jeder quantitative oder weitreichende Claim ist vom Betreiber freigegeben bzw. nachvollziehbar belegbar.

**Abhängigkeiten**

- `POS-01`, `CONTENT-02`.

### [P2 · POS-04] Angebotskarten auf tatsächliche Entscheidungsinformationen reduzieren

**Problem**

Die drei Karten unter „Typische Formate & Honorare“ enthalten nützliche Einstiegspreise und Lieferzeiten, stehen aber vor der Darstellung von Arbeitsweise, Zielgruppen und redaktioneller Unabhängigkeit. Teilweise entstehen Spannungen: „4.000–8.000 Worte in 1–2 Werktagen“ wirkt ohne Umfangsdefinition sehr pauschal.

**Warum**

Klare Angebotsgrenzen machen Anfragen qualifizierter. Das verbessert **Conversion, Vertrauen und UX**, ohne ein komplexes Pricing-System einzuführen.

**Konkrete Umsetzung**

1. Die Karten nach den Arbeitsproben und den Zielgruppen platzieren (siehe `CONTENT-02`).
2. Pro Karte die Beschreibungen in „Geeignet für“, „Enthalten“ und „Rahmen ab“ strukturieren. Lieferzeiten als Richtwerte und nicht als verbindliche SLA kennzeichnen.
3. Bei journalistischen Stücken explizit „Umfang und Rechercheaufwand nach Briefing“ ergänzen, statt die Wortzahl als generellen Standard zu behaupten.
4. Für Ghostwriting auf die sichtbare Trennung zur publizistischen Tätigkeit verweisen und denselben Unternehmens-CTA wie im Hero nutzen.

**Acceptance Criteria**

- Jede Angebotskarte enthält Zielgruppe, Leistungsumfang, Preisrahmen und nächsten Schritt.
- Kein Preis- oder Lieferzeitversprechen steht ohne seinen Kontext auf der Seite.
- Es gibt keine neue Preisrechner-, Checkout- oder Formularabhängigkeit.

**Abhängigkeiten**

- `CONTENT-02`, `POS-02`.

---

## Content

### [P0 · CONTENT-01] Kuratierte, datengetriebene Featured Articles statt sechs fest verdrahteter Arbeitsproben einführen

**Problem**

Die sechs Karten im Block `#arbeitsproben` sind vollständig in `_layouts/journalismus.html` codiert. Sie enthalten wiederholte Bild-/Buttonlinks und alte, manuell formulierte Leistungsbeschreibungen. Gleichzeitig liegen aktuelle, reichhaltige Daten vor: allein 48 Golem-Artikel, darunter Beiträge vom 6. und 2. Juli 2026. Aktuelle relevante Arbeiten können dadurch nicht ohne Template-Edit erscheinen.

**Warum**

Eine bewusst kuratierte Auswahl ist für eine journalistische Landingpage überzeugender als eine gleichgewichtete Link-Sammlung: Sie zeigt Aktualität, Themenbreite und Rechercheformate, ohne die Seite mit allen 48 Artikeln zu überladen. Das verbessert **Vertrauen, Conversion, SEO, UX, Performance und Wartbarkeit**.

**Konkrete Umsetzung**

1. In `pages/journalismus.md` eine kleine, seitenbezogene Konfiguration `journalism_featured_articles` anlegen. Jeder Eintrag enthält mindestens `source` und `slug`; optional `label` für ein kurzes, kuratiertes Format-Label. Titel, Datum, Kategorie, Bild, Beschreibung und externe URL dürfen **nicht** doppelt gepflegt werden, sondern kommen aus `site.data.links[source]`.
2. Für den ersten Stand 4–6 Stücke auswählen, die die Positionierung tatsächlich abdecken. Kandidaten aus den vorhandenen Daten sind:
   - Golem: „Entwickler in der Rüstungsindustrie: Kubernetes für den Krieg“ (Software, Politik, Recherchekontext);
   - Golem: „Doomjobbing: ITler in einer zermürbenden Bewerbungsspirale“ (KI, Arbeitswelt, Wirtschaft);
   - Golem: „15 Tage Autonomie: Was eine Multi-Agenten-Simulation über Langzeitrisiken verrät“ (KI, Governance);
   - IT-Finanzmagazin: „Offiziell sicher, real abgezockt …“ (Wirtschaft, Privacy);
   - IGN: „Accessibility im Gaming …“ (Interview- und UX-Kompetenz) **nur**, wenn Gaming als gewünschter Kompetenzbeleg mitgeführt werden soll.
   Die endgültige Auswahl erfolgt anhand der Kriterien Aktualität, Themen-Fit, Rechercheleistung, Medienvielfalt und gewünschte Auftraggeber – nicht allein nach Veröffentlichungsdatum.
3. Den bestehenden harten Markup-Block in `_layouts/journalismus.html` durch eine Liquid-Schleife ersetzen: pro Referenz Datenquelle mit `site.data.links[feature.source]` laden, per `slug` den Artikel finden und `card-editorial.html` mit `external=true`, `link_target="_blank"`, Medium als `marker` und passendem Read-more-Text aufrufen.
4. Die vorhandene `editorial-card-grid` nutzen. Keine neue JavaScript-Karussell-, Filter- oder CMS-Abhängigkeit einführen.
5. Wenn eine konfigurierte Quelle oder ein Slug fehlt, den einzelnen Eintrag beim Build überspringen und eine klar sichtbare Liquid-Kommentar-/Build-Notiz hinterlassen; die komplette Seite darf nicht brechen.
6. Direkt unter dem Grid einen schlanken Link „Alle Veröffentlichungen nach Medium und Thema“ auf die bestehende Autorenseite oder auf einen neu vorhandenen, aber nur dann bereits nutzbaren Veröffentlichungsindex setzen. Bis ein eigener Index existiert, nicht auf eine nicht vorhandene Übersichtsseite verlinken.

**Acceptance Criteria**

- `_layouts/journalismus.html` enthält keine sechs handcodierten Arbeitsproben-URLs oder Bildpfade mehr.
- Die Seite zeigt 4–6 kuratierte Karten aus den YAML-Daten mit Bild, Medium, Datum, Kategorien, Beschreibung und externem Original-Link.
- Mindestens drei der sichtbaren Featured Articles stammen aus 2026, sofern sie zur freigegebenen Auswahl gehören.
- Das Hinzufügen eines vorhandenen `source`/`slug`-Eintrags in `pages/journalismus.md` reicht aus, um eine weitere Karte auszuspielen.
- Ein `npm run update:golem` ändert keine kuratierten Texte oder URLs manuell im Template.

**Abhängigkeiten**

- Vor `SEO-02`, `SEO-03`, `CONTENT-02`, `DESIGN-01`, `TECH-02`.

### [P1 · CONTENT-02] Seitenreihenfolge auf einen redaktionellen Entscheidungsfunnel reduzieren

**Problem**

Die aktuelle Seite enthält viele wertvolle Bereiche, aber die Reihenfolge springt zwischen Logos, Themen, alten Arbeitsproben, Preisen, Arbeitsweise, Zielgruppen, Ghostwriting, Erfahrung, FAQ, Kontakt und erst ganz am Ende internen Analysen. Medienlogos werden wiederholt; die Trennung von Redaktion und Unternehmen wird mehrfach erzählt. Die Seite wirkt damit mehr wie eine vollständige Materialsammlung als wie eine fokussierte journalistische Landingpage.

**Warum**

Eine klare Reihenfolge steigert die Scanbarkeit, verlagert Beweise vor Behauptungen und verkürzt den Weg zur Anfrage. Erwarteter Effekt: **Conversion, Vertrauen, UX und SEO-Informationsarchitektur**.

**Konkrete Umsetzung**

1. Die bestehenden Inhalte in dieser Reihenfolge anordnen; Texte und Belege werden nur verschoben oder verdichtet, nicht neu erfunden:

   1. Hero mit zwei Zielgruppen-CTAs (`SEO-01`, `POS-02`)
   2. „Veröffentlicht bei“ nur mit Medienlogos (`POS-01`)
   3. kompakter Erfahrungs-/Methodik-Proof mit Link zum Autorenprofil (`POS-03`)
   4. „Worüber ich schreibe“ mit den vier vorhandenen Beats
   5. „Ausgewählte Veröffentlichungen“ aus `CONTENT-01`
   6. zwei klare Wege: „Für Redaktionen“ und „Für Unternehmen“
   7. Angebote und Prozess; Ghostwriting-Details als Teil des Unternehmenswegs statt eigener, gleich großer Verkaufsebene
   8. FAQ
   9. eindeutiger Kontaktabschluss
   10. vertiefende interne/externe Themencluster (`SEO-04`) als Lese- und SEO-Ebene.

2. Die inhaltlichen Wiederholungen zusammenführen:
   - Logo-Wiederholung in `#proof` entfernen;
   - „Arbeitsweise“ und „Gütekriterium“ zu einem nachprüfbaren Methodik-Block zusammenführen;
   - Ghostwriting nicht gleichzeitig in Zielgruppenkarte, Preisangebot und großem Sales-Block mit fast identischer Erklärung wiederholen.
3. Die vorhandenen IDs (`#themenfelder`, `#arbeitsproben`, `#leistungen`, `#zielgruppen`, `#faq`) möglichst behalten oder bei Umbenennung per Anker-Redirect/kompatiblen ID-Alias erhalten, damit bestehende Links nicht brechen.
4. Abschnittsüberschriften in einer Sprache halten: „Selected Collaborations“ wird im Zuge von `POS-01` durch Deutsch ersetzt; „Get in touch“ durch einen deutschsprachigen, zielorientierten CTA.

**Acceptance Criteria**

- Die ersten fünf Inhaltsbereiche beantworten nacheinander: Wer? Wo veröffentlicht? Warum glaubwürdig? Worüber? Welche Arbeiten?
- Medienlogos, Ghostwriting-Erklärung und Methodik erscheinen jeweils nur einmal als vollwertiger Block.
- Die Page-Outline bleibt bei genau einem H1 und logisch geschachtelten H2/H3.
- Die bisherige inhaltliche Aussage zur Trennung von Publizistik und Unternehmensmandaten bleibt sichtbar.

**Abhängigkeiten**

- `POS-01`, `POS-02`, `POS-03`, `CONTENT-01`.

### [P1 · CONTENT-03] Redaktionelle Rechercheformate aus den vorhandenen Daten sichtbar machen

**Problem**

Die vier Beats beschreiben Themen gut, aber potenzielle Redaktionen sehen nicht in einem Scan, welche journalistischen Formen Oliver tatsächlich anbietet: Analyse, Kommentar, Interview, Selbstversuch, Test, Event-Bericht oder datengetriebene Einordnung. Die alten Arbeitsproben erwähnen Leistung und Ergebnis, aber diese Beschreibungen sind nicht wartbar an der Datenquelle gekoppelt.

**Warum**

Formate sind neben Themen ein wesentlicher Kaufgrund für Ressortleitungen. Eine sichtbare Differenzierung erhöht **Conversion, Vertrauen und UX** und macht die Daten-/Recherchekompetenz greifbarer.

**Konkrete Umsetzung**

1. In `pages/journalismus.md` pro `journalism_featured_articles`-Eintrag ein optionales, kurzes `label` pflegen, etwa „Recherche & Analyse“, „Datengetriebene Einordnung“, „Interview“, „Selbstversuch“ oder „Kommentar“. Es beschreibt die Arbeit an der Auswahl, nicht den externen Beitrag allgemein.
2. Das Label in `CONTENT-01` als visuellen Marker der `editorial-card` ausgeben; vorhandene Kategorien bleiben sekundäre Themenchips.
3. Im Block „Für Redaktionen“ die Leistungsformate als kompakte Liste bündeln und nur Formate nennen, die mindestens durch eine sichtbare Arbeitsprobe oder vorhandene Publikation gestützt werden.
4. Für „datengetriebene Einordnung“ konkrete, vorhandene Belege bevorzugen (z. B. quantitative Abwägungen, Simulationen, Daten-/Quellenanalyse), keine nicht nachweisbare Behauptung „Data Journalism“ als pauschales Label verwenden.

**Acceptance Criteria**

- Jede Featured Article Card hat optional höchstens ein Format-Label und 0–5 thematische Kategorien.
- Der Redaktionsblock nennt mindestens vier klar unterscheidbare Formate.
- Jedes gezeigte Format lässt sich anhand einer sichtbaren Karte oder einer vorhandenen Veröffentlichung nachvollziehen.

**Abhängigkeiten**

- `CONTENT-01`.

### [P2 · CONTENT-04] Veröffentlichungsbestand zentral und ohne Seitenduplikat erschließen

**Problem**

Die Seite `pages/about.md` bzw. `_layouts/about.html` listet externe Publikationen bereits dynamisch aus den YAML-Dateien. Die Journalismus-Seite hat dagegen feste Arbeitsproben. Eine vollständige, gleichgewichtete Liste aller 54+ externen Beiträge auf der Landingpage wäre zu lang; ein sichtbarer Weg zum Gesamtbestand fehlt aber.

**Warum**

Ein klarer Anschluss für Leser mit tieferem Prüfbedarf schafft **Vertrauen, UX, SEO und Wartbarkeit**, ohne die Landingpage in ein Archiv zu verwandeln.

**Konkrete Umsetzung**

1. Die Journalismus-Seite nach `CONTENT-01` mit einem eindeutigen Link auf die bestehende, dynamische Veröffentlichungsdarstellung im About-Bereich oder auf ein gezielt dafür angelegtes, kleines Archiv ergänzen.
2. Falls ein Archiv angelegt wird, ausschließlich vorhandene Layout-Bausteine nutzen: `_includes/framework/blocks/sections/external-articles.html`, `card-editorial.html` und `_data/links/publications.yml`. Keine zweite Kopie der YAMLs erstellen.
3. Das Archiv nach Medium gruppieren und optional über bestehende Kategorien verlinken; keine clientseitige Filterbibliothek einführen.
4. Die Journalismus-Landingpage selbst bei 4–6 Featured Articles belassen.

**Acceptance Criteria**

- Von `/journalismus/` erreicht man mit einem aussagekräftigen Link alle hinterlegten externen Veröffentlichungen.
- Neue Einträge in einer der bestehenden `_data/links/*.yml`-Dateien erscheinen ohne manuelles Nachtragen im Template im Gesamtbestand.
- Die Landingpage bleibt auf eine kuratierte Auswahl begrenzt.

**Abhängigkeiten**

- `CONTENT-01`; bei einem neuen Archiv zusätzlich `TECH-03`.

---

## Design & UX

### [P0 · DESIGN-01] Arbeitsproben als scanbares Editorial-Grid gestalten

**Problem**

Die alten Arbeitsproben sind Bootstrap-Karten mit langen Listen, getrenntem Bildlink und Button. Sechs gleich schwere Karten über eine lange Seite sind langsam zu scannen. Gleichzeitig existiert bereits ein hochwertigeres, responsives `editorial-card-grid`, das Bildformat, Kategorien, Datum, Texthierarchie und Linkzustände konsistent behandelt.

**Warum**

Der Wechsel zeigt die besten Arbeiten als redaktionelles Portfolio statt als Link-Sammlung und verbessert **UX, Vertrauen, Conversion, Performance und Konsistenz**.

**Konkrete Umsetzung**

1. Für `#arbeitsproben` aus `CONTENT-01` ausschließlich `editorial-card-grid` und `_includes/theme/cards/card-editorial.html` einsetzen.
2. Das bestehende Grid-Verhalten beibehalten: drei Spalten ab Desktop, zwei auf Tablet, eine auf Mobile. Keine neue Layout-Bibliothek.
3. Das Medium als kompakte Kennzeichnung, Datum und Kategorien über dem Titel beibehalten. Beschreibung auf die vorhandene Kürzung der Karte begrenzen; die Seite darf nicht wieder lange „Leistung/Ergebnis“-Listen pro Karte erzeugen.
4. Die Sektion sichtbar von den inhaltlichen Beat-Karten unterscheiden: redaktionelle Karten ohne zusätzliche Bootstrap-Card-Schachtelung und mit dem vorhandenen Bildseitenverhältnis `16 / 10`.
5. Ein Kartenlink führt direkt zum Originalartikel in neuem Tab mit `rel="noopener noreferrer"`; die gesamte Karte ist der Interaktionsbereich.

**Acceptance Criteria**

- Arbeitsproben sehen und verhalten sich wie die bestehenden Editorial-Karten auf Blog/Kategorie.
- Auf 375 px Breite liegt pro Zeile genau eine lesbare Karte; es gibt keine horizontale Überlappung oder abgeschnittenen Buttons.
- Auf großen Bildschirmen sind Titel, Metadaten und Abschlusslinks zwischen Karten gut scannbar.
- Jede Karte hat genau einen primären, ausreichend großen Klickbereich.

**Abhängigkeiten**

- `CONTENT-01`, `TECH-02`, `ACC-02`.

### [P1 · DESIGN-02] Lange Seite mit einer kompakten Abschnittsnavigation orientierbar machen

**Problem**

Die Seite hat viele Ziel-IDs und einen statischen Header, aber keine sichtbare Orientierung zwischen Hero und Footer. Besucher müssen weit scrollen, um Arbeitsproben, Redaktionsangebot, Unternehmensangebot oder Kontakt wiederzufinden.

**Warum**

Eine kleine Sprungnavigation verbessert **UX, Conversion und Accessibility** auf einer bewusst langen Landingpage, ohne Inhalt zu streichen.

**Konkrete Umsetzung**

1. Nach Hero und Medienproof eine schmale, inhaltlich begrenzte Anchor-Navigation mit maximal fünf Links einfügen: „Arbeitsproben“, „Themen“, „Für Redaktionen“, „Für Unternehmen“, „Kontakt“.
2. Bestehende Abschnitts-IDs nutzen. Für den Unternehmensweg bei Bedarf ein zusätzliches, eindeutiges `id="unternehmen"` am relevanten Zielgruppen-/Angebotsabschnitt setzen.
3. Navigation als echte `<nav aria-label="Inhalte dieser Seite">` mit Liste umsetzen; sie darf auf kleinen Screens horizontal scrollbar oder umbrochen sein, aber nicht durch ein neues JavaScript-Menü ersetzt werden.
4. `scroll-margin-top` für alle Ziele definieren, damit Überschriften nach einem Ankersprung nicht direkt am Header kleben.
5. Nicht sticky machen, solange ein visueller Test nicht zeigt, dass der feste Platzbedarf den Hero oder Mobile-Sichtbereich verschlechtert.

**Acceptance Criteria**

- Jeder Link springt zu einer sichtbaren H2-Überschrift mit ausreichend oberem Abstand.
- Die Navigation ist per Tastatur erreichbar und auf 320–375 px ohne Überdeckung nutzbar.
- Es existieren keine toten oder doppelten Anker.

**Abhängigkeiten**

- `CONTENT-02`, `ACC-01`.

### [P2 · DESIGN-03] Hero- und Angebotsabstände für Mobile präzisieren

**Problem**

Die Hero-CTA-Gruppe verwendet `m-5`, also einen pauschalen Abstand in alle Richtungen. Bei höchstens 992 px werden Hero-Links blockweise ausgegeben. Das verhindert zwar zu kleine nebeneinanderliegende Buttons, wirkt aber ohne gezielte Wrapper-Regeln schnell unnötig luftig und lässt den primären CTA nicht klarer gewichten.

**Warum**

Gezielte Abstände erhöhen die Lesbarkeit und Kontaktrate auf Mobilgeräten. Erwarteter Effekt: **UX, Conversion und Accessibility**.

**Konkrete Umsetzung**

1. Mit `POS-02` eine lokale `journalism-hero-actions`-Klasse in `_sass/framework/selfmade/journalism.scss` ergänzen.
2. Desktop: Buttons mit nachvollziehbarem `gap`, ohne pauschalen Außenabstand. Mobile: volle Breite oder mindestens 44 px hohe, vertikal gestapelte Buttons mit konsistentem Abstand.
3. Den primären Redaktions-CTA visuell als Primary-Button und den Unternehmens-CTA als Secondary/Outline-Variante auszeichnen; nicht allein durch Position oder Farbe differenzieren.
4. Die Angebotskarten aus `POS-04` auf gleiche Kopf- und CTA-Ausrichtung prüfen, ohne mit fixer Kartenhöhe Text abzuschneiden.

**Acceptance Criteria**

- Auf 320, 375 und 768 px liegen die CTAs nicht zu dicht, überlappen nicht und haben klaren Primär-/Sekundärstatus.
- Die CTA-Flächen erfüllen mindestens 44×44 CSS-Pixel oder eine gleichwertig gut bedienbare Fläche.
- Desktop-Abstände wirken nicht größer als die Abstände zu Hero-Lead und Vertrauenssatz.

**Abhängigkeiten**

- `POS-02`, `ACC-02`.

### [P3 · DESIGN-04] Medienlogos nur bei belegbarem Nutzen interaktiv hervorheben

**Problem**

Die aktuellen Logos animieren nur auf `:hover` (`translateY` und Skalierung). Das ist ein kleiner visueller Effekt, aber kein Orientierungsinstrument; auf Touch und Tastatur bringt er wenig.

**Warum**

Der potenzielle Nutzen ist begrenzt. Falls die Logo-Ziele nach `POS-01` tatsächlich hilfreiche Autorenprofile sind, kann eine dezente, zugängliche Hervorhebung **UX und Vertrauen** verbessern.

**Konkrete Umsetzung**

1. Erst nach der URL-Prüfung in `POS-01` Hover und `:focus-visible` angleichen; bei `prefers-reduced-motion` die Bewegung abschalten.
2. Keine Karussells, Graustufen-/Farbspiele oder zusätzliche Logo-Wand einführen.

**Acceptance Criteria**

- Fokus und Hover sind äquivalent sichtbar.
- Bei reduzierter Bewegung findet keine transformierende Logoanimation statt.

**Abhängigkeiten**

- `POS-01`, `ACC-02`.

---

## Accessibility

### [P1 · ACC-01] Inhaltsbereiche als Landmarken mit verständlichen Überschriften auszeichnen

**Problem**

Die Seite liegt zwar im globalen `<main>`, die vielen inhaltlichen Abschnitte bestehen aber überwiegend aus `<div class="section">`. Die H1–H3-Reihenfolge ist sinnvoll, aber Screenreader-Nutzer erhalten wenig Landmarkenorientierung auf einer langen Seite.

**Warum**

Semantische Bereiche vereinfachen das Springen zwischen Portfolio, Zielgruppen, FAQ und Kontakt. Das verbessert **Accessibility, UX und SEO-Semantik** ohne sichtbare Designänderung.

**Konkrete Umsetzung**

1. Die in `CONTENT-02` verbleibenden Hauptbereiche in `_layouts/journalismus.html` von neutralen `div.section` zu `<section class="section" aria-labelledby="…">` umstellen.
2. Jede Section erhält eine echte, sichtbare H2 mit passender ID; `aria-labelledby` verweist darauf. Der Hero bleibt als `<section aria-labelledby="journalism-hero-title">` mit H1.
3. Wiederverwendete globale Include-Blöcke nur dann verändern, wenn ihre Semantik auf allen Seiten verbessert wird. Für die Journalismus-spezifische Struktur lokale Wrapper bevorzugen.
4. Den Medienblock und die Sprungnavigation mit `<section>` bzw. `<nav>` korrekt verschachteln; keine Landmarken ohne sichtbaren Zweck anlegen.

**Acceptance Criteria**

- Ein Landmark-/Heading-Check zeigt einen Hauptbereich und klar benannte Section-Landmarken für Hero, Themen, Arbeitsproben, Zielgruppen, FAQ und Kontakt.
- Kein Überschriftenlevel wird zur reinen Stilgröße übersprungen.
- Die visuelle Darstellung bleibt unverändert oder verbessert sich nur durch die geplanten Layoutänderungen.

**Abhängigkeiten**

- `CONTENT-02`, `DESIGN-02`.

### [P1 · ACC-02] Tastaturfokus, Linknamen und externe Linkattribute auf der ganzen Seite vervollständigen

**Problem**

Die moderne `editorial-card` hat bereits einen guten `:focus-visible`-Zustand. Die derzeitigen Bildlinks in `.work-demos` und Logo-Links gestalten hingegen nur `:hover`; die Social-Icons im gemeinsamen Get-in-touch-Block haben sichtbare Icons, aber keine expliziten zugänglichen Namen. In ausgeliefertem HTML erscheinen bei manchen Links doppelte `rel`-Tokens durch die Kombination aus Template und Plugin.

**Warum**

Gleichwertige Fokuszustände und eindeutige Namen sind Basisanforderungen für Tastatur- und Screenreader-Nutzung. Das verbessert **Accessibility, UX und Vertrauen**.

**Konkrete Umsetzung**

1. Durch `DESIGN-01` die alten Work-Demo-Bildlinks entfernen; die vorhandenen Kartenfokusregeln weiterverwenden.
2. In `_includes/framework/blocks/sections/get_in_touch.html` (oder dem exakt verwendeten Kontakt-Subinclude) Social-Links mit `aria-label` ergänzen, dekorative `<i>`-Icons mit `aria-hidden="true"` markieren und den sichtbaren CTA in Deutsch formulieren.
3. Externe Links einheitlich mit einem einzigen `rel="noopener noreferrer"` ausgeben. Prüfen, wie `jekyll-target-blank` mit den vorhandenen Attributen interagiert; keine duplizierten Tokens im finalen HTML lassen.
4. Für Medienlogo-Links und CTA-Buttons sichtbare `:focus-visible`-Konturen in `_sass/framework/selfmade/journalism.scss` oder der zuständigen Shared-Komponente setzen. Fokus nicht ausschließlich über Farbe vermitteln.
5. Alle neuen Anchor-Navigationen, Karten und CTAs in natürlicher, visueller Reihenfolge per Tastatur testen.

**Acceptance Criteria**

- Tab-Fokus ist auf jeder interaktiven Fläche sichtbar, einschließlich Medienlogos, Hero-CTAs, Karten, Sprungnavigation und Kontakt-Socials.
- Screenreader geben für jeden reinen Icon-Link Zweck und Ziel aus.
- Im ausgelieferten HTML gibt es für externe Links keine doppelten `noopener`-/`noreferrer`-Werte.
- Die Tastaturreihenfolge folgt der sichtbaren Reihenfolge der Seite.

**Abhängigkeiten**

- `CONTENT-01`, `POS-02`, `DESIGN-01`.

### [P2 · ACC-03] Inhalte und visuelle Hervorhebung auf Kontrast und reduzierte Bewegung prüfen

**Problem**

Die Seite verwendet die Markenfarbe `#FF4A4A` auch für `<strong>`-Text und Hover-Zustände. Im ausgelieferten Dark Mode ist die Kombination überwiegend tragfähig, aber Änderungen an Primary-/Outline-Buttons und Logos müssen sowohl in heller als auch in dunkler Darstellung geprüft werden. Die Journalismus-spezifischen Hover-Animationen enthalten bisher keine `prefers-reduced-motion`-Regel.

**Warum**

Die geplanten Hervorhebungen dürfen Lesbarkeit und Bewegungspräferenzen nicht verschlechtern. Das verbessert **Accessibility und UX**.

**Konkrete Umsetzung**

1. Nach den Button- und Logoänderungen Text-, Border- und Fokuskontraste gegen den jeweiligen Hintergrund mit einem Kontrast-Tool prüfen; bei normalgroßem Text mindestens WCAG AA anstreben.
2. Keine Bedeutung ausschließlich über die rote Markenfarbe kommunizieren: CTA-Zweck zusätzlich über Text und Button-Variante erkennbar machen.
3. In `journalism.scss` eine `@media (prefers-reduced-motion: reduce)`-Regel für Hero-Bild-, Logo- und künftige Kartenanimationen ergänzen.

**Acceptance Criteria**

- Geänderte Text-, Button- und Fokusfarben bestehen die dokumentierte Kontrastprüfung für ihren Einsatz.
- Reduzierte Bewegung deaktiviert dekorative Transform-/Transitionseffekte der Journalismus-Seite.
- Primärer und sekundärer CTA bleiben ohne Farbe unterscheidbar.

**Abhängigkeiten**

- `DESIGN-03`, `DESIGN-04`, `ACC-02`.

---

## Technical Improvements

### [P0 · TECH-01] Bild-Ladeverhalten und Layoutstabilität der Landingpage korrigieren

**Problem**

Die ausgelieferte Seite enthält 25 Bilder. Mit Ausnahme des mobilen Header-Logos haben sie keine `width`-/`height`-Attribute; keines lädt mit `loading="lazy"`. Dadurch kann die Seite unterhalb des Folds unnötig viele Bilder anfordern und die Bildhöhe kann erst beim Laden stabil werden. Der Hero ist 1200×1572 px, die große Ghostwriting-Grafik 1124×760 px.

**Warum**

Explizite Dimensionen und sinnvolles Lazy Loading sind ein direkter, risikoarmer Hebel für **Performance, Core Web Vitals und UX**.

**Konkrete Umsetzung**

1. Das Hero-Bild in `_layouts/journalismus.html` als LCP-Kandidat behalten: `width="1200"`, `height="1572"`, `fetchpriority="high"`, kein `loading="lazy"`.
2. Das Bild im Ghostwriting-/Unternehmensbereich mit seinen nativen Dimensionen `width="1124"`, `height="760"` und `loading="lazy"` ausgeben.
3. Im gefilterten Partner-/Medieninclude Bilder unterhalb des Folds mit `loading="lazy"` sowie bekannten Dimensionen oder einem CSS-`aspect-ratio`-Container ausgeben. Bei allen funktionalen Logos `decoding="async"` verwenden, wenn es mit dem getesteten Browser-Rendering unauffällig ist.
4. `CONTENT-01` priorisieren: `card-editorial.html` liefert seine Bilder bereits lazy und reserviert per `aspect-ratio` Platz. Die sechs alten, eager geladenen Arbeitsprobenbilder verschwinden damit.
5. Den geteilten Kontaktblock auf seine Bildattribute prüfen und, falls das Bild ohne Layout-Reservierung ausgegeben wird, dort ebenfalls Dimensionen und `loading="lazy"` ergänzen. Änderungen am Shared-Block auf allen Seiten kurz regressionstesten.

**Acceptance Criteria**

- Das Hero-Bild bleibt eager und besitzt Width, Height und hohe Abrufpriorität.
- Alle nicht im ersten Sichtbereich befindlichen Journalismus-Bilder laden lazy oder haben eine begründete Ausnahme.
- Alle direkt im Template ausgegebenen Inhaltsbilder reservieren vor dem Laden ihre Fläche.
- Nach dem Umbau melden Lighthouse/Chrome DevTools keine vermeidbaren Bilder ohne Dimensionsangabe auf der Seite.

**Abhängigkeiten**

- `CONTENT-01` für die alten Arbeitsprobenbilder.

### [P1 · TECH-02] Kuratierte Artikelauswahl robust gegen Datenaktualisierungen machen

**Problem**

`npm run update:golem` schreibt neue Einträge in `_data/links/golem.yml`; IDs sind nur innerhalb einer Quelle sinnvoll. Eine künftige Auswahl, die auf globalen IDs oder kopierten Titel-/URLs beruht, wäre bei mehreren Publikationen und Titeländerungen fragil.

**Warum**

Eine kleine, eindeutige Referenzstruktur verhindert stille Fehlverlinkungen und macht Aktualisierungen wartbar. Das verbessert **Wartbarkeit, Vertrauen und Performance**.

**Konkrete Umsetzung**

1. In `journalism_featured_articles` ausschließlich die Kombination `source` + `slug` als Identität verwenden; `id` weder quellübergreifend noch im Template als Identität nutzen.
2. Im Liquid-Loop pro Feature eine Prüfung auf vorhandene Datenquelle, gefundenen Artikel, `link` und `thumbnail` vornehmen. Fehlende Daten nicht als leere Karte rendern.
3. Einen kurzen Kommentar über die erwartete Struktur direkt in `pages/journalismus.md` oder in einer benachbarten Maintainer-Dokumentation hinterlegen, inklusive Beispiel für einen Golem- und einen IT-Finanzmagazin-Eintrag.
4. Kein neues Datenbankschema, keine API zur Laufzeit und keinen Node-Generator für eine Liste von maximal sechs Referenzen schaffen.

**Acceptance Criteria**

- Zwei Quellen dürfen denselben numerischen `id`-Wert haben, ohne dass die falsche Karte erscheint.
- Ein fehlerhafter `slug` erzeugt keine leere Karte und verhindert den Jekyll-Build nicht.
- Neue Golem-Daten können über den bestehenden Update-Befehl eingespielt werden, ohne den Journalismus-Templatecode zu ändern.

**Abhängigkeiten**

- `CONTENT-01`.

### [P1 · TECH-03] Seitenänderungen mit Build-, Markup- und Responsive-Checks absichern

**Problem**

Die Seite kombiniert Liquid-Filter, strukturierte YAML-Quellen, Shared Includes und viele externe Links. Die geplante Datenbindung kann mit einem einzelnen falschen Slug, HTML-Attributen oder PurgeCSS-Regeln unbemerkt brechen, wenn sie nicht als Seite geprüft wird.

**Warum**

Eine kleine, reproduzierbare Prüfung verhindert Regressionsfehler. Das verbessert **Wartbarkeit, Accessibility, SEO und Performance**.

**Konkrete Umsetzung**

1. Nach jeder Umsetzung `npm run build` ausführen; das umfasst Jekyll, PurgeCSS und Pagefind.
2. Die generierte `_site/journalismus/index.html` maschinell gegen diese Mindestbedingungen prüfen: ein H1, Canonical, Description, `Service`/`FAQPage`/Portfolio-JSON-LD, 4–6 Featured Cards, keine leeren `href`/`src`, externe Kartenlinks mit `noopener noreferrer`.
3. Die Seite manuell oder per vorhandener Browser-Automation bei 375 px, 768 px und mindestens 1280 px testen: Hero, Sprungnavigation, Karten, CTA, Fokusreihenfolge und kein horizontaler Overflow.
4. Vor dem Merge die JSON-LD-Blöcke im Schema Validator und die finale Seite in Lighthouse oder DevTools zumindest auf Bilder ohne Dimensionen/Lazy Loading prüfen.
5. Keine neue Testframework-Abhängigkeit allein für diese Seite einführen; ein dokumentierter Check in `progress.md` oder im PR-Beschrieb genügt zunächst.

**Acceptance Criteria**

- `npm run build` läuft erfolgreich durch.
- Die erzeugte Journalismus-Seite enthält alle erwarteten Bereiche und keine Liquid-Ausgabe wie `{{ ... }}`.
- Die drei repräsentativen Viewports zeigen keinen horizontalen Scrollbalken und alle CTA-/Card-Links sind erreichbar.
- Strukturierte Daten validieren ohne neue Fehler.

**Abhängigkeiten**

- Nach allen P0/P1-Template- und Style-Tasks ausführen.

### [P2 · TECH-04] Hero-Bild nur nach Messung responsive ausliefern

**Problem**

Das Hero-Bild ist bereits als WebP mit rund 200 KB kompakt, wird aber auf schmalen Geräten weiterhin aus der 1200 px breiten Quelldatei geladen. Ein Gewinn durch Responsive Sources ist möglich, aber im Vergleich zu `TECH-01` deutlich kleiner und sollte nicht spekulativ Assets vervielfachen.

**Warum**

Wenn die Messung auf Mobile zeigt, dass das Hero-Bild LCP bestimmt, kann eine kleinere Variante **Performance** verbessern.

**Konkrete Umsetzung**

1. Erst nach `TECH-01` Mobile-Lighthouse- und Network-Daten prüfen.
2. Nur bei messbarem Bedarf zwei abgeleitete WebP-Varianten (z. B. 640 und 960 px breit) neben `assets/images/journalism/banner.webp` erstellen und über `srcset`/`sizes` am Hero ausliefern.
3. Gleiche Bildaussage und Seitenverhältnis beibehalten; `width`/`height` der Fallback-Quelle nicht entfernen.

**Acceptance Criteria**

- Es gibt einen dokumentierten Messgrund für zusätzliche Bildvarianten.
- Der Browser lädt auf Mobile nicht unnötig die größte Datei, wenn `srcset` umgesetzt wurde.
- Keine sichtbare Verschiebung, unscharfe Darstellung oder abweichende Bildaussage entsteht.

**Abhängigkeiten**

- `TECH-01`, `TECH-03`.

---

## Top 5 Quick Wins

1. **[P0 · POS-01] Medienlogos filtern und doppelte Logo-Wand entfernen.** Hoher Vertrauensgewinn, weil Social-Media-Marketing-Kunden nicht länger als journalistische Publikationen gelesen werden können.
2. **[P0 · SEO-01] H1 um Name, Rolle und Kernthemen ergänzen.** Sehr kleiner Eingriff mit direktem Effekt auf Verständlichkeit und Personen-/Leistungs-Suchintention.
3. **[P0 · CONTENT-01] Sechs harte Arbeitsproben durch 4–6 kuratierte Karten aus den YAML-Daten ersetzen.** Macht aktuelle Arbeit sichtbar und entfernt die größte Wartungsfalle.
4. **[P0 · POS-02] Hero-CTAs nach Redaktion und Unternehmen differenzieren.** Führt beide Zielgruppen ohne Umweg zu einer passenden Anfrage.
5. **[P0 · TECH-01] Bilddimensionen und Lazy Loading ergänzen.** Verringert Layout Shift und unnötige Bildlast ohne Designrisiko.

## Top 5 Strategic Improvements

1. **[P1 · CONTENT-02] Die Seite zum klaren Entscheidungsfunnel ordnen.** Macht aus einer umfangreichen Link-/Leistungssammlung eine journalistische Landingpage.
2. **[P1 · SEO-02] WebPage, Person, Service und Portfolio als konsistenten Schema-Graph verbinden.** Stärkt langfristig E-E-A-T und maschinenlesbare Autorenschaft.
3. **[P2 · SEO-04] Eigene Analysen und externe Recherche nach Themenclustern verbinden.** Baut Expertise-Signale über KI, Plattformen, Marktlogik und Tech-Arbeit auf.
4. **[P1 · POS-03] Credentials und Methoden vor den Arbeitsproben sichtbar machen.** Verbindet die vorhandene Autorenprofil-Substanz mit der Kaufentscheidung auf der Landingpage.
5. **[P1 · TECH-03] Einen schlanken Build- und Seiten-Check etablieren.** Sichert die datengetriebene Seite bei jeder künftigen Veröffentlichung ab.

## Empfohlene Implementierungsreihenfolge

1. **POS-01** – Medienreferenzen sauber filtern, Links prüfen und Doppelung entfernen.
2. **SEO-01** und **POS-02** – Hero-Text, Zielgruppen-CTAs und deren lokale Layoutklasse finalisieren.
3. **CONTENT-01** und **TECH-02** – Datenreferenzen definieren und die harte Arbeitsproben-Sektion durch das bestehende Editorial-Grid ersetzen.
4. **TECH-01** und **ACC-02** – Bildattribute, Linkattribute, Fokuszustände und Social-Labels vervollständigen.
5. **POS-03**, **CONTENT-03** und **CONTENT-02** – Proof, Formate und die vollständige Seitenreihenfolge verdichten.
6. **DESIGN-01**, **DESIGN-03** und **ACC-01** – Karten-, CTA- und Semantik-Details über alle Breakpoints finalisieren.
7. **SEO-02** und **SEO-03** – Schema-Graph sowie präzise Anchor-/Alt-Texte auf der finalen sichtbaren Auswahl aufbauen.
8. **DESIGN-02**, **SEO-04** und **CONTENT-04** – Orientierung und vertiefende Themen-/Archivwege ergänzen, falls die verkürzte Kernseite sie noch benötigt.
9. **ACC-03**, **TECH-03**, anschließend optional **TECH-04**, **SEO-05** und **DESIGN-04** – Qualitätsprüfung, Messung und nur dann weitergehende Optimierungen.

## Bewusst nicht empfohlene Änderungen

- **Alle 48 Golem-Artikel direkt auf der Landingpage ausgeben:** Das macht die Seite zu einem Archiv, verlängert sie erheblich und verwässert die kuratierte Positionierung. Ein klarer Link zum Gesamtbestand ist besser.
- **Ein clientseitiges Filter-, Tab- oder Karussellsystem für Arbeitsproben:** Die vorhandenen Daten und das responsive Editorial-Grid lösen das Kernproblem ohne JavaScript, Fokusfallen oder zusätzliche Ladezeit.
- **Eine zweite, separate „Data Journalism“-Subsite:** Die Daten belegen relevante Recherche- und Analysekompetenz, aber eine neue Subsite würde vor einer stabilen Kern-Landingpage Content und Autorität unnötig aufspalten.
- **Neue Testimonials, Reichweitenzahlen, Medienzitate oder Kundenlogos ohne freigegebene Belege:** Gerade auf einer journalistischen Seite ist belastbare Vertrauensbildung wichtiger als Social Proof um jeden Preis.
- **Title, Canonical, URL oder Indexierbarkeit grundlos ändern:** Die vorhandenen Metadaten sind stimmig, die Seite ist indexierbar und kanonisch korrekt. Änderungen daran würden eher Ranking-/Linkrisiko schaffen als Nutzen.
- **Preiskalkulator, Checkout oder neue CRM-/Formularintegration:** Mailto und Calendly existieren bereits; zuerst sollen Nutzen, Zielgruppe und CTA-Text klar werden.
- **Dekorative Redesigns ohne Informationsnutzen:** Neue Farbwelten, Animationen, Icon-Sammlungen oder ein unabhängiges Designsystem würden die bestehende Website-Konsistenz unnötig gefährden.
