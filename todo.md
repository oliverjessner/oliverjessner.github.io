# Website TODO

Priorisierte Optimierungen für `oliverjessner.at`. Die Reihenfolge orientiert sich an Auswirkung auf Nutzer, SEO, Performance und Wartbarkeit.

## P0 – Fehler und SEO-Grundlagen

### Interne Links und Assets reparieren

- [x] Alle nicht auflösbaren internen Links aus dem generierten `_site` prüfen und korrigieren.
- [x] Links der SQLite-Serie von `/blog/2026-06-28-.../` auf die tatsächlich veröffentlichten `/blog/2026-06-29-.../`-URLs umstellen.
- [x] Falsche Links auf den `.gitignore`-Artikel korrigieren und Varianten mit `.md` entfernen.
- [x] Fehlende beziehungsweise veraltete Screenshot-Pfade reparieren, insbesondere bei No Bullshit RSS und SQLite Hub.
- [x] Bildlinks ohne Dateiendung korrigieren.
- [x] `/linkhub` konsistent mit der tatsächlich erzeugten URL verlinken.
- [x] Bestehende Weiterleitungen in `_redirects` prüfen und notwendige Redirects für geänderte Artikel-URLs ergänzen.
- [ ] Automatischen Link- und Asset-Check in den Build integrieren.

**Fertig, wenn:** Der Produktions-Build enthält keine unbeabsichtigten internen 404-Links und keine fehlenden lokalen Bilder.

### Strukturiertes JSON-LD reparieren

- [ ] Die Generierung von `BlogPosting.articleBody` in `_layouts/post.html` prüfen.
- [ ] Backslashes, reguläre Ausdrücke und Bash-Code JSON-sicher serialisieren.
- [ ] Erwägen, `articleBody` bei sehr codeintensiven Artikeln zu kürzen oder wegzulassen.
- [ ] Alle `application/ld+json`-Blöcke nach dem Build automatisch mit `JSON.parse` validieren.
- [ ] Die aktuell fehlerhaften technischen Artikel erneut prüfen.

**Fertig, wenn:** Jeder erzeugte JSON-LD-Block valides JSON ist und der Build bei ungültigem Schema fehlschlägt.

### Analytics konsolidieren

- [x] Hart codierte Google-Analytics-Einbindungen aus den Layouts entfernen.
- [x] Nur `_includes/framework/global/seo/google-analytics.html` als zentrale Implementierung verwenden.
- [x] Den fehlerhaften Liquid-Ausdruck `{{ $gid }}` korrigieren.
- [x] Analytics-ID ausschließlich aus `_config.yml` oder der Netlify-Umgebung beziehen.
- [x] Sicherstellen, dass Analytics pro Seite nur einmal initialisiert wird.

**Fertig, wenn:** Pro Seite nur ein Analytics-Script geladen wird und ohne Einwilligung kein optionales Tracking startet.

## P1 – Performance und Nutzererlebnis

### Bilder optimieren

- [ ] Für alle relevanten Bilder feste `width`- und `height`-Attribute ausgeben.
- [ ] `srcset` und `sizes` für Header-, Artikel- und Kartenbilder ergänzen.
- [ ] Große PNG-Dateien in WebP oder AVIF konvertieren.
- [ ] `assets/images/linkhub/razerv2.gif` durch WebM oder MP4 ersetzen.
- [ ] Nur das jeweilige LCP-Bild eager laden beziehungsweise mit `fetchpriority="high"` markieren.
- [ ] Alle Bilder unterhalb des sichtbaren Bereichs lazy laden.
- [ ] Einen Build-Check für ungewöhnlich große Bilddateien ergänzen.

**Fertig, wenn:** Bilder verursachen keine sichtbaren Layout-Sprünge und unnötig große Assets werden im Build erkannt.

### CSS nach Seitentyp aufteilen

- [ ] Ermitteln, welche Styles Blog, Standardseiten und Produkt-Landingpages gemeinsam benötigen.
- [ ] Produkt-spezifische Styles aus dem globalen `main.css` entfernen.
- [ ] Separate CSS-Bundles für SkipTheVoice, SQLite Hub, Billly, PineFetch und weitere eigenständige Landingpages erzeugen.
- [ ] PurgeCSS-Konfiguration auf die tatsächlichen Verzeichnisse `collections/_posts` und `pages` ausrichten.
- [ ] Dynamisch gesetzte Klassen vollständig safelisten.
- [ ] CSS-Größe nach der Aufteilung dokumentieren.

**Ausgangswert:** `main.css` aktuell ungefähr 374 KB unkomprimiert beziehungsweise 54 KB gzip nach PurgeCSS.

**Fertig, wenn:** Normale Blog- und Inhaltsseiten laden keine umfangreichen Produkt-spezifischen Styles mehr.

### Navigation und Product Lab verbessern

- [ ] „Product Lab“ im Hauptmenü sichtbar machen.
- [ ] SkipTheVoice im Product-Lab-Footermenü ergänzen.
- [ ] Unterpunkte von „Artikel“ auch im mobilen Menü zugänglich machen.
- [ ] Deutsche und englische Navigationsbezeichnungen vereinheitlichen.
- [ ] Footer-Beschreibung korrigieren: „Östereich“ → „Österreich“.
- [ ] Prüfen, ob Suche und Themenübersicht auf Mobile schnell erreichbar sind.

**Fertig, wenn:** Blog, Product Lab, Suche und zentrale Leistungen auf Desktop und Mobile ohne Umwege erreichbar sind.

### Pagefind-Warnungen beseitigen

- [ ] `/cluster/terminal/` mit einem vollständigen HTML-Layout rendern oder bewusst von Pagefind ausschließen.
- [ ] `/cluster/javascript/` mit einem vollständigen HTML-Layout rendern oder bewusst von Pagefind ausschließen.
- [ ] `/cluster/git/` mit einem vollständigen HTML-Layout rendern oder bewusst von Pagefind ausschließen.
- [ ] Pagefind-Warnungen im Build als überprüfbaren QA-Schritt behandeln.

**Fertig, wenn:** Pagefind ohne Warnungen durchläuft und alle gewünschten Inhaltsseiten indexiert werden.

### AdSense gezielter laden

- [ ] AdSense nur auf Seiten laden, die tatsächlich Anzeigenplätze enthalten.
- [ ] Prüfen, ob das Script erst in der Nähe des ersten Anzeigenplatzes geladen werden kann.
- [ ] Anzeigenplätze so dimensionieren, dass sie keine Layout-Sprünge verursachen.
- [ ] AdSense in das Consent-Konzept einbinden.

**Fertig, wenn:** Seiten ohne Werbung laden kein AdSense und Anzeigen verursachen keinen relevanten CLS.

## P2 – Infrastruktur und Wartbarkeit

### Netlify-Header ergänzen

- [ ] Langfristiges Caching für versionierte Bilder, Fonts, CSS und JavaScript konfigurieren.
- [ ] `X-Content-Type-Options: nosniff` setzen.
- [ ] Eine passende `Referrer-Policy` setzen.
- [ ] Eine restriktive `Permissions-Policy` definieren.
- [ ] HSTS für die Produktionsdomain aktivieren.
- [ ] Content Security Policy zunächst im Report-only-Modus testen.
- [ ] CSP nach Prüfung schrittweise erzwingen.

**Fertig, wenn:** Statische Assets sinnvoll gecacht werden und die zentralen Security-Header in Produktion vorhanden sind.

### Jekyll-Konfiguration aufräumen

- [ ] Entscheiden, ob die eigene `sitemap.xml` oder `jekyll-sitemap` verwendet wird, und die Doppelung entfernen.
- [ ] Legacy-`paginate` und die zusätzliche `pagination`-Konfiguration konsolidieren.
- [ ] Nicht mehr verwendete Layouts, Redirect-Seiten und Konfigurationswerte identifizieren.
- [ ] `_config.yml`, `Gemfile` und `package.json` auf nicht mehr benötigte Abhängigkeiten prüfen.
- [ ] Produktions- und Entwicklungs-Build klar trennen und dokumentieren.

**Fertig, wenn:** Für Sitemap, Pagination und Analytics jeweils nur noch eine nachvollziehbare Implementierung existiert.

### Sass modernisieren

- [ ] Bestehende Sass-Deprecation-Warnungen kategorisieren.
- [ ] Eigene Styles schrittweise von `@import` auf `@use` und `@forward` migrieren.
- [ ] Veraltete globale Sass-Funktionen durch `map.*`, `color.*` und `math.*` ersetzen.
- [ ] Bootstrap-Abhängigkeit und Upgrade-Pfad prüfen.
- [ ] Neue Sass-Warnungen im CI sichtbar machen.

**Ausgangswert:** Der Build meldet derzeit 263 wiederholte Deprecation-Warnungen.

**Fertig, wenn:** Der Sass-Build ohne Deprecation-Warnungen läuft oder verbleibende Warnungen klar dokumentiert sind.

### Automatische Qualitätschecks ausbauen

- [ ] Jekyll-Build ausführen.
- [ ] PurgeCSS ausführen.
- [ ] Pagefind-Index erzeugen.
- [ ] Interne Links und lokale Assets prüfen.
- [ ] JSON-LD validieren.
- [ ] Doppelte Seitentitel und Canonicals prüfen.
- [ ] Fehlende Meta-Descriptions erkennen.
- [ ] Bilder ohne Alt-Text oder Dimensionen erkennen.
- [ ] Größenlimits für CSS, JavaScript und Bilder definieren.
- [ ] Alle Prüfungen in einem CI-Workflow ausführen.

**Fertig, wenn:** Ein Pull Request mit kaputten Links, ungültigem JSON-LD oder fehlenden Assets nicht mehr unbemerkt veröffentlicht werden kann.

## Bereits positiv

- [x] Der vollständige Build mit Jekyll, PurgeCSS und Pagefind läuft durch.
- [x] Pagefind indexiert den Großteil der Website.
- [x] Die generierten Bilder besitzen durchgehend Alt-Attribute.
- [x] JavaScript-Dateien sind insgesamt vergleichsweise klein und überwiegend nach Funktion getrennt.
