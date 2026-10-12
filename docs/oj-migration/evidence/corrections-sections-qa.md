# Browserprüfung: Blog, Home-Karten und Autorenprofile

Geprüft gegen den fertigen Produktionsbuild auf `http://127.0.0.1:8776/` in einem eigenen Chrome-Kontext bei 390, 768 und 1440 Pixeln Breite. Alle neun Ansichten bestanden ohne äußeren horizontalen Überlauf oder JavaScript-Fehler. Der Akzent ist `#ff4a4a`.

- Blog: Beide zentrierten Abschnittsüberschriften und ihre H2 nutzen jeweils die gesamte Container-Innenbreite: 350 / 728 / 1112 Pixel. Die alte `.text-center`-Regel wurde auf `.site-text-center` korrigiert.
- Home: Zwei OJ-Projektkarten, normaler Titel- und Beschreibungstext, ausschließlich die CTA unterstrichen. Die Beschreibung ist 16 Pixel groß. Beide ursprünglichen Linkziele bleiben erhalten; Hover, sichtbare 2-Pixel-Fokuskontur sowie Tab und Shift+Tab funktionieren.
- Veröffentlichungen: Sechs unveränderte externe Profilziele mit `_blank` und `noopener noreferrer`, konsistente OJ-Panels und korrekte Tastaturreihenfolge. Alle sechs Filterzustände funktionieren bei jeder Breite mit passenden sichtbaren Gruppen, `aria-pressed` und Statuszahlen. Enter und Space funktionieren ebenfalls; insgesamt bleiben 62 Online-Artikel sichtbar.

Die beiden Home-Linkziele und alle Profiltexte/-ziele wurden beibehalten. Frontmatter und JSON-LD im Publications-Template bleiben bytegleich zum ursprünglichen Template. Liquid/CSS-Parsing und `git diff --check` bestanden; kein Build wurde durch diese Browserprüfung gestartet.

Messwerte: [corrections-sections-qa.json](corrections-sections-qa.json). Neue Screenshots liegen ausschließlich unter `../screenshots/corrections-*.png`; die historischen Originaldesign-Screenshots bleiben unverändert.

Die mobilen Home- und Blog-Kategorien-Screenshots wurden zusätzlich mit 1400 Pixeln Aufnahmehöhe erstellt: Bei einer Aufnahme der gesamten Sektion über den kleineren 900-Pixel-Viewport hinaus zeichnete Chromium den bereits außerhalb des Viewports liegenden, unfokussierten Skip-Link fälschlich ins Bild. Die DOM-Prüfung bestätigte vor und nach Tastaturbedienung sowie nach dem Screenshot `top: -50px`, `bottom: -12px` und keinen Fokus. Dafür war keine Website-CSS-Änderung nötig. Die übrigen normalen Blog-/Publications-Aufnahmen wurden visuell geprüft und zeigen kein solches Artefakt.
