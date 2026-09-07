1. [x] Wir sollten bei den categories
 <nav class="section-nav" aria-label="Inhalte dieser Seite"><div class="container"><ul><li><a href="#ign-articles">IGN</a></li><li><a href="#blogposts">Blogposts</a></li><li><a href="#external-articles">Externe Artikel</a></li><li><a href="#videos">Videos</a></li><li><a href="#weitere-kategorien">Weitere Kategorien</a></li></ul></div></nav>
 nicht videos sonder youtube videos schreiben.

   Anmerkung: Navigation und Abschnittsüberschrift heißen jetzt „YouTube Videos“.
   `todo.md` ist vom Website-Build ausgeschlossen, damit Arbeitsnotizen nicht veröffentlicht werden.

2. [x] Wir brauchen ein /category/youtube-videos/ seite die alle youtube videos anzeigt.
   das als extra bei den "Weitere Kategorien" anzeigen. Dort auch die Categories
   der Videos anzeigen. Ähnlich zu den Blog category pages

   Anmerkung: `/category/youtube-videos/` listet alle Longform-Einträge nach Datum absteigend.
   Videokarten enthalten verlinkte Kategorien; „Weitere Kategorien“ enthält einen zusätzlichen Link mit Videoanzahl.
   Die strukturierten Daten listen die Videos ebenfalls auf. Build- und Browserprüfung erfolgreich.

3. [x] schau dir \_data/videos/youtube_shortform.yml an und lade für die einträge die thumbnails herunter
   und speichere sie im richtigen ordner ab.

   Anmerkung: Alle 10 YouTube-Thumbnails heruntergeladen. Je Eintrag liegen `header.webp` (max. 1200 px)
   und `header_thumbnail.webp` (max. 500 px) in den angegebenen Ordnern unter `assets/images/gen/external_short/`.
   Fehler beim ersten Versuch: Sandbox konnte `i.ytimg.com` nicht auflösen. Mit Netzwerkfreigabe behoben.
   Thumbnail-Hinweis: Für `TCuvWZ-8crM` liefern `maxresdefault` und `sddefault` HTTP 404;
   `hqdefault` (480 × 360) ist verfügbar und wird ohne Hochskalierung verwendet.
   Datenhinweis: Bei „Pokémon Gen1Recomp: Eure Fragen beantwortet“ fehlt das Datum; es wird keines erfunden.
   Der offensichtliche Titel-Tippfehler „hiny Mewtu“ wurde zu „Shiny Mewtu“ korrigiert.

4. [x] Wir brauchen nun auch /category/youtube-shorts/ die zeigt alle shorts aus
   \_data/videos/youtube_shortform.yml an verlinken. Dort auch die Categories
   der Videos anzeigen. Ähnlich zu den Blog category pages

   Anmerkung: `/category/youtube-shorts/` zeigt alle 10 Shorts mit verlinkten Kategorien und Hochformatkarten.
   Die Seite ist unter „Weitere Kategorien“ verlinkt. Sortierung nach Datum, der undatierte Eintrag steht zuletzt
   und zeigt kein Datum. Build- und Browserprüfung erfolgreich.

5. [x] Wenn wir einen blogpost offen haben, das machen wir die Ähnlichen Beiträge 100% breite des inhaltes.
   falls ein short video erhältlich ist sollte es als viertes element rechts von den blog artikel erscheinen


   Anmerkung: „Ähnliche Beiträge“ nutzt die gesamte Containerbreite. Auf Desktop stehen drei Artikel
   und, falls Kategorien übereinstimmen, ein Short als vierte Karte rechts. Auf Tablet sind es zwei Spalten,
   auf Mobilgeräten eine. Ohne passenden Short bleibt das bisherige Raster mit drei Artikeln.
   Auswahl des Shorts: Ein konkretes `related_topics`-Thema muss im Artikeltitel oder in seinen Kategorien
   vorkommen. Danach entscheiden Titelübereinstimmung, gemeinsame Kategorien und Datum.
   Build- und Browserprüfung erfolgreich.

## Prüfprotokoll

- Erster vollständiger Produktionsbuild erfolgreich (Jekyll, responsive Bilder, Bildladeattribute, PurgeCSS, Pagefind).
- Die Inhaltsprüfung hat einen Fehler in den strukturierten Daten entdeckt: Kategorie-Includes überschrieben
  Layoutvariablen, wodurch falsche Artikel statt der Videoeinträge im Schema standen. Die Layoutvariablen
  sind jetzt eindeutig benannt; beide Video-Archive bestehen die Schema-Prüfung.
- Lokaler Browser-Testserver: Start in der Sandbox nicht erlaubt. Mit Freigabe festgestellt, dass Port 4186
  bereits vom vorhandenen Preview-Server belegt ist; für die Prüfung wird dieser verwendet.

- Ein alter Build enthielt noch `_site/todo.md`. Dieses generierte Artefakt wurde entfernt;
  der nächste Build prüft, dass die ausgeschlossene Datei nicht erneut kopiert wird.
- Browserkonsole: Externe Google-Anzeigen melden lokal HTTP 403; ein eingebundenes TikTok-Skript
  meldet einen JavaScript-Fehler (`prod`). Diese Drittanbieterfehler sind unabhängig von den neuen Videokarten.
- Visuelle Nachbesserung: Shorts verwenden das größere Headerbild für den Hochformat-Ausschnitt,
  damit nicht das kleine 500-Pixel-Thumbnail stark vergrößert wird.

- Vorschau-Konflikt entdeckt: Ein bereits laufender Jekyll-Watcher überschreibt `_site` mit alter
  Konfiguration und ohne den neu geladenen Short-Filter. Dadurch erschien kurz ein Artikel fälschlich
  als Short und `todo.md` wurde erneut kopiert. Die Abschlussprüfung läuft deshalb isoliert unter
  `/tmp/oj-todo-qa/_site` auf Port 4187. Der bestehende Jekyll-Devserver muss nach Änderungen an
  `_config.yml` oder `_plugins` neu gestartet werden.

## Abschluss – 07.09.2026

- Alle fünf Aufgaben umgesetzt und geprüft.
- Isolierter Produktionsbuild erfolgreich: Jekyll, responsive Bilder (590 Bilder, 0 übersprungen),
  Bildladeattribute (588 HTML-Dateien, 0 ungültig), PurgeCSS und Pagefind (559 Seiten).
- Beide Übersichten vollständig: 12 Longform-Videos und 10 Shorts. Alle Videoziele, Kategorie- und
  Sprunglinks sowie die Einträge in den strukturierten Daten geprüft. Alle 20 WebP-Dateien vorhanden.
- Browserprüfung bei 1440, 768 und 390 Pixeln: kein horizontaler Überlauf.
  Mit passendem Short vier Karten am Desktop, ohne Treffer drei Artikel und keine Short-Karte.
  Der Xbox-Artikel verlinkt den Xbox-Short mit dem richtigen Thumbnail und YouTube-Ziel.
- `todo.md` ist im frischen Build nicht enthalten. Bereits bestehende Sass-Deprecation-Warnungen bleiben.
- Vorschau: http://127.0.0.1:4187/category/youtube-videos/ und http://127.0.0.1:4187/category/youtube-shorts/
- Keine offenen Implementierungsfehler. Das fehlende Short-Datum und die externen Skriptfehler sind oben dokumentiert.

## Nachbesserung: unpassender Short beim Digimon-Vergleich

- Auf Port 4000 erschien der Artikel selbst als Short, weil der laufende Server den neuen Filter noch nicht
  geladen hatte. Der Filter-Rückgabewert wird jetzt auf YouTube-Plattform und YouTube-Link geprüft.
  Ein Artikel kann dadurch auch bei fehlendem Filter nicht mehr als Short gerendert werden.
- Gemeinsame Oberkategorien wie `gaming` oder `nintendo` reichen nicht mehr: Alle zehn Shorts haben
  konkrete `related_topics`. Neue Shorts benötigen diese Themenangabe für automatische Empfehlungen.
- Ohne konkretes passendes Thema wird kein Short angezeigt. Themen werden ohne Beachtung von Großschreibung
  und Akzenten, aber mit Wortgrenzen verglichen. Der Digimon-Vergleich hat keinen passenden Short.
- Filterprüfungen bestanden: Digimon und UN/KI ohne Short, Xbox mit Xbox-Short, Gen1Recomp mit passendem Thema,
  Akzente und Wortgrenzen korrekt. Ein erster Test erwartete einen bestimmten Gen1Recomp-Clip; beide
  infrage kommenden Clips behandeln das Thema. Die Prüfung wurde auf thematische Eignung korrigiert.
- Jekyll-Devserver dieses Projekts neu gestartet. Der erste Browseraufruf während des Builds meldete noch
  `ERR_CONNECTION_REFUSED`; nach dem Start erfolgreich direkt auf Port 4000 geprüft: Digimon zeigt drei
  Artikel und keinen Short, Xbox verlinkt den richtigen Clip. Auch der Schutz bei fehlendem Filter ist geprüft.

## Optische Trennung von Artikeln und Short

- Der Short erhält ab Tablet eine dezente vertikale Trennlinie und zusätzlichen Abstand zu den Artikeln.
  Mobil trennt eine horizontale Linie mit Abstand den Short von den Artikeln darüber.
- Nur die Empfehlungen im Blog sind betroffen; die Videoübersichten behalten ihr bisheriges Layout.
- Jekyll-Neubuild und Browserprüfung auf Port 4000 bei 1440 und 390 Pixeln erfolgreich: richtige
  Trennlinien und Abstände, kein horizontaler Überlauf. Keine neuen Fehler.
