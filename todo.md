# Website TODO

### Strukturiertes JSON-LD reparieren

- [ ] Die Generierung von `BlogPosting.articleBody` in `_layouts/post.html` prüfen.
- [ ] Backslashes, reguläre Ausdrücke und Bash-Code JSON-sicher serialisieren.
- [ ] Erwägen, `articleBody` bei sehr codeintensiven Artikeln zu kürzen oder wegzulassen.
- [ ] Alle `application/ld+json`-Blöcke nach dem Build automatisch mit `JSON.parse` validieren.
- [ ] Die aktuell fehlerhaften technischen Artikel erneut prüfen.

**Fertig, wenn:** Jeder erzeugte JSON-LD-Block valides JSON ist und der Build bei ungültigem Schema fehlschlägt.

### CSS nach Seitentyp aufteilen

- [ ] Ermitteln, welche Styles Blog, Standardseiten und Produkt-Landingpages gemeinsam benötigen.
- [ ] Produkt-spezifische Styles aus dem globalen `main.css` entfernen.
- [ ] Separate CSS-Bundles für SkipTheVoice, SQLite Hub, Billly, PineFetch und weitere eigenständige Landingpages erzeugen.
- [ ] PurgeCSS-Konfiguration auf die tatsächlichen Verzeichnisse `collections/_posts` und `pages` ausrichten.
- [ ] Dynamisch gesetzte Klassen vollständig safelisten.
- [ ] CSS-Größe nach der Aufteilung dokumentieren.

**Ausgangswert:** `main.css` aktuell ungefähr 374 KB unkomprimiert beziehungsweise 54 KB gzip nach PurgeCSS.

**Fertig, wenn:** Normale Blog- und Inhaltsseiten laden keine umfangreichen Produkt-spezifischen Styles mehr.

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
