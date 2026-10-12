# Isolierte Dev-/Watch-Prüfung

Ergebnis: **PASS**. Der aktuelle Workspace wurde nach `/tmp/oj-corrections-dev-u73usbnw` gespiegelt: 947 Dateien als echte, bytegleiche Kopien ohne Hardlinks; nur `node_modules`, `assets/images` und `assets/videos` sind Symlinks. CSS, Konfiguration, Templates, Scripts, Fonts und DS-Vendor sind echte Kopien. Package/Lockfile, Eleventy-Konfiguration, Build-Scripts und alle drei CSS-Entrypoints wurden vor dem Start per SHA-256 verglichen.

Ausgeführt wurde ausschließlich `npm run dev -- --port=8788` in dieser Spiegelkopie. Die Serverbereitschaft wurde über eine echte HTTP-200-Antwort geprüft.

| CSS-URL | Start | Probe angefügt | Probe entfernt |
| --- | --- | --- | --- |
| `/assets/css/main.css` | 200, kompiliert | 200, kompiliert | 200, kompiliert |
| `/assets/css/side-projects-legacy.css` | 200, ohne Probe | 200, mit Probe | 200, ohne Probe |
| `/assets/css/product-hub-legacy.css` | 200, kompiliert | 200, kompiliert | 200, kompiliert |

Keine Antwort enthält rohe Liquid-Tags oder Frontmatter. Nur die echte, kopierte `side-projects-legacy.css` erhielt vorübergehend eine Kommentarzeile. Beide Änderungen lösten tatsächliche Watch-Rebuilds aus. Nach Entfernen sind sämtliche ausgelieferten CSS-Hashes wieder identisch zum Start.

Es gab genau drei abgeschlossene Buildzyklen: Start, Kommentar hinzufügen, Kommentar entfernen. Pagefind meldete in jedem Zyklus **665 Seiten** und **38.499 Wörter**. DS-Vendor meldete null Änderungen; auch während einer zusätzlichen achtsekündigen Ruhephase entstand keine Watch-Schleife.

Die Quellbytes aller 947 kopierten Root-Dateien und die Hashes/Zeitstempel der drei CSS-Dateien im Root-`_site` blieben unverändert. Ausschließlich der eigene npm-Prozess samt eigener Prozessgruppe wurde gestoppt; Port 8788 ist danach frei. Der Root-Server auf 8776 antwortet weiterhin mit HTTP 200. Kein Produktionsbuild, Commit oder Push wurde ausgeführt.

Echter vollständiger Erfolgslog: [corrections-dev-watch.log](corrections-dev-watch.log). Messwerte und Hashes: [corrections-dev-watch.json](corrections-dev-watch.json).
