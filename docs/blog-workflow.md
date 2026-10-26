# Blog erstellen und veröffentlichen

`npm run blog:new` führt den gesamten Ablauf über `scripts/blogposts/blog.mjs` aus. Der Aufruf erzeugt einen Artikel und veröffentlicht ihn einschließlich Git-Commit, Push und IndexNow-Meldung. Es gibt keinen separaten `blog:publish`-Schritt und keine zusätzliche Bestätigungsfrage.

```bash
npm run blog:new
npm run blog:new -- --custom "https://example.com/artikel"
```

`--custom` nimmt eine HTTP(S)-Quell-URL entgegen und überspringt NO-BULLSHIT-RSS vollständig. Ohne das Flag wird weiterhin `no-bullshit-rss articles last 100 --choose --url --title` aufgerufen. Das Menü bleibt interaktiv; Titel und URL gehen an Codex. Ein Abbruch oder eine fehlende Datenbank beendet den Workflow, statt einen Artikel ohne Quelle zu veröffentlichen.

## Voraussetzungen

- Node.js gemäß `package.json` und installierte Projektabhängigkeiten.
- Aktuelle `codex` CLI mit bestehendem ChatGPT-Login, Websuche und eingebauter Bildgenerierung. API-Keys werden nicht vorausgesetzt.
- `bulkpixel` im PATH für die beiden WebP-Konvertierungen.
- Für den RSS-Modus zusätzlich `no-bullshit-rss` und die bestehende App-Datenbank.
- Lokale Dateien `prompts/prompt.md` und `prompts/article-thumbnail.md`. Der Ordner bleibt von Git ignoriert.
- Ein konfigurierter Git-Upstream. HEAD und Upstream müssen zu Beginn übereinstimmen; der Workflow führt weder Pull noch Rebase durch und pusht keine bereits vorher vorhandenen lokalen Commits.
- Die vorhandene IndexNow-Schlüsseldatei im Repository-Root, die über Eleventy veröffentlicht wird.

## Ablauf

1. Voraussetzungen prüfen und Quellartikel auswählen.
2. Den vorhandenen Artikelprompt mit der Quelle an Codex übergeben. YAML und Artikeltext prüfen.
3. Den vollständigen Artikel mit dem vorhandenen Bildprompt an einen eigenen Codex-Aufruf mit eingebauter Bildgenerierung übergeben. Titel und Beschreibung werden zusätzlich hervorgehoben. Der Bildauftrag verlangt eine gut lesbare deutsche Headline mit 2 bis 5 Wörtern, deren konkreter Wortlaut ausdrücklich an das Bildwerkzeug übergeben werden soll. Die Anweisung zur Sichtprüfung ersetzt keine technische Texterkennung im PNG.
4. Das tatsächlich erzeugte Bild prüfen und als PNG in `~/Downloads/header.png` speichern. Ein bisheriges Bild erhält eine separate Backup-Datei.
5. **BulkPixel** erzeugt `header_thumbnail.webp` mit 500 Pixeln und `header.webp` mit 1280 Pixeln Breite, jeweils WebP-Qualität 75. Die erzeugten Dateien werden geprüft; die tatsächlichen Headermaße gehen ins Frontmatter.
6. Titel, Markdown-Dateiname, Bildverzeichnis und Bildpfade aus demselben Slug ableiten. Bestehende Artikel oder Bildverzeichnisse werden nicht überschrieben.
7. Linkhub gezielt für diesen Artikel aktualisieren. Bereits vorhandene lokale Änderungen an den Linkhub-Ausgabedateien führen zum Abbruch.
8. Nur den Artikel, seine beiden Bilder und die Linkhub-Ausgabe committen. Andere Änderungen, einschließlich bereits gestagter Dateien, bleiben außerhalb des Blog-Commits.
9. Den Commit ohne Force-Push an den konfigurierten Upstream senden.
10. Zuerst 120 Sekunden auf das Deployment warten. Danach die veröffentlichte URL mit passender Canonical-URL und die erreichbare IndexNow-Schlüsseldatei prüfen; bei fehlendem Deployment alle 10 Sekunden erneut versuchen. Anschließend die URL über einen JSON-POST an IndexNow melden. HTTP 200 oder 202 bedeutet, dass die Meldung angenommen wurde, nicht dass der Artikel bereits indexiert ist.
11. Auf macOS die Artikel-URL, vorbereitete Threads-/X-/Reddit-Beiträge und die Search Console in Chrome öffnen sowie die URL in die Zwischenablage kopieren. Beiträge werden nicht automatisch in sozialen Netzwerken abgeschickt.

## Fortsetzen und Fehler

Jeder Lauf speichert seinen Fortschritt und seine Artefakte in einem eigenen, von Git ignorierten Ordner unter `.cache/blog/`. Bei einem Fehler wird der passende Befehl ausgegeben:

```bash
npm run blog:new -- --resume "/absoluter/pfad/.cache/blog/<lauf>/state.json"
```

Fertige Artikel und Bilder werden weiterverwendet. Ein gespeicherter Commit wird nicht erneut angelegt; nach einem erfolgreichen Push werden nur noch Deployment und IndexNow geprüft. Ein IndexNow- oder Deploymentfehler wird als Fehler gemeldet, obwohl der Git-Push bereits erfolgreich gewesen sein kann. Der Fehlertext unterscheidet diese Zustände.

Manuelle Änderungen an den bereits vorbereiteten Dateien stoppen die automatische Veröffentlichung. Bei einem ungültigen Codex-Artikel kann die gespeicherte `article.md` korrigiert und der Lauf anschließend fortgesetzt werden, solange noch keine Dateien vorbereitet wurden. Bei Git-Konflikten oder zwischenzeitlich verändertem HEAD ist eine manuelle Klärung nötig; es gibt kein automatisches Reset oder Rebase. Gleichzeitig laufende Blog-Workflows werden durch eine Prozesssperre verhindert.

## Umgebungsvariablen

| Variable | Bedeutung |
| --- | --- |
| `DB_PATH` | Bestehende RSS-Datenbank; Standard: `~/Library/Application Support/NO-BULLSHIT-RSS/data-v2.db` |
| `CODEX_BLOG_MODEL` | Optionales Modell für den Artikel; sonst CLI-Standard ohne globale Benutzerkonfiguration |
| `CODEX_BLOG_IMAGE_MODEL` | Optionales Modell für den Bildaufruf; sonst wie Artikel |
| `SITE_URL` | Website-Ursprung; Standard aus `_data/site.json` |
| `INDEXNOW_KEY` | Vorhandener Schlüssel; die passende Root-Datei muss existieren |
| `INDEXNOW_ENDPOINT` | Standard: `https://api.indexnow.org/indexnow` |
| `INDEXNOW_DISABLE=1` | IndexNow ausdrücklich deaktivieren |
| `BLOG_DEPLOY_TIMEOUT` | Maximale Prüfphase nach der anfänglichen Wartezeit von 120 Sekunden, Standard 600 Sekunden |
| `BLOG_DEPLOY_INTERVAL` | Abstand zwischen Prüfungen in Sekunden, Standard 10 |
| `BLOG_OPEN_BROWSER=0` | Browser-Tabs und Zwischenablage überspringen |

Die separaten IndexNow-Wartungswerkzeuge bleiben erhalten. Sie werden vom neuen Veröffentlichungsworkflow nicht aufgerufen.

## Prüfung

```bash
npm run test:blog-workflow
```

Die Workflow-Tests verwenden temporäre Git-Repositories und einen lokalen Bare-Remote sowie simulierte Codex-, RSS-, BulkPixel- und HTTP-Antworten. Sie erzeugen keine KI-Ausgaben, greifen nicht auf die echte RSS-Datenbank zu und veröffentlichen keine Inhalte im Internet. Sie ersetzen keinen echten Durchlauf mit den installierten CLI-Werkzeugen und dem Website-Deployment.
