# Blog erstellen und veröffentlichen

Die sechs Blog-Scripts führen den gesamten Ablauf über `scripts/blogposts/blog.mjs` aus. Jeder Aufruf erzeugt einen Artikel und veröffentlicht ihn einschließlich Git-Commit, Push und IndexNow-Meldung. Es gibt keinen separaten `blog:publish`-Schritt und keine zusätzliche Bestätigungsfrage.

```bash
npm run blog:feed
npm run blog:feed:random
npm run blog:top
npm run blog:top:random
npm run blog:custom -- "https://example.com/artikel"
npm run blog:transcription
```

`blog:feed` verwendet den bisherigen Aufruf `no-bullshit-rss articles last 100 --choose --url --title`; Titel und URL gehen an Codex. `blog:top` ruft `no-bullshit-rss articles top 100 --choose --url` auf und übergibt die gewählte URL. Beide Menüs bleiben interaktiv. Ein Abbruch oder eine fehlende Datenbank beendet den Workflow.

`blog:feed:random` ruft `no-bullshit-rss articles random --url --feed` auf, `blog:top:random` verwendet `no-bullshit-rss articles random --url --top`. Sie wählen jeweils einen zufälligen Artikel ohne Menü und übergeben dessen URL an denselben Artikel-, Bild- und Veröffentlichungsworkflow.

`blog:custom` nimmt eine HTTP(S)-Quell-URL als Argument entgegen und überspringt NO-BULLSHIT-RSS vollständig. Es ersetzt die bisherige `--custom`-Flag; `blog:new` entfällt.

`blog:transcription` verwendet stattdessen `PineFetch history transcription --choose`. Das Menü bleibt interaktiv und wählt eine bereits gespeicherte Transkription; eine neue Transkription wird nicht gestartet. PineFetch liefert den vollständigen Text ohne URL oder Metadaten. Dieser Text wird unverändert gespeichert und als Quelle an Codex übergeben. Codex prüft Fakten online und darf fehlende Sprecher-, Datums- oder URL-Angaben nicht erfinden. Eine leere Ausgabe oder ein Abbruch beendet den Workflow vor der Generierung.

Die Erfassung der CLI-Ausgabe ist auf 8.388.608 Zeichen begrenzt. Größere Transkripte brechen mit einer Fehlermeldung vor der Generierung ab; ein gekürzter Text wird nicht als Quelle verwendet.

## Voraussetzungen

- Node.js gemäß `package.json` und installierte Projektabhängigkeiten.
- Aktuelle `codex` CLI mit bestehendem ChatGPT-Login, Websuche und eingebauter Bildgenerierung. API-Keys werden nicht vorausgesetzt.
- `bulkpixel` im PATH für die beiden WebP-Konvertierungen.
- Für die vier RSS-Modi `blog:feed`, `blog:feed:random`, `blog:top` und `blog:top:random` zusätzlich `no-bullshit-rss` und die bestehende App-Datenbank.
- Für `blog:transcription` zusätzlich PineFetch mit Unterstützung für `history transcription --choose`; NO-BULLSHIT-RSS und `DB_PATH` werden nicht benötigt.
- Lokale Dateien `prompts/prompt.md` und `prompts/article-thumbnail.md`. Der Ordner bleibt von Git ignoriert.
- Ein konfigurierter Git-Upstream. HEAD und Upstream müssen zu Beginn übereinstimmen; der Workflow führt weder Pull noch Rebase durch und pusht keine bereits vorher vorhandenen lokalen Commits.
- Die vorhandene IndexNow-Schlüsseldatei im Repository-Root, die über Eleventy veröffentlicht wird.

PineFetch wird zuerst über `PINEFETCH_BIN` aufgelöst, falls gesetzt, sonst als `PineFetch` im PATH, anschließend unter `/Applications/PineFetch.app/Contents/MacOS/PineFetch` und `~/Applications/PineFetch.app/Contents/MacOS/PineFetch`. `PINEFETCH_BIN` akzeptiert einen ausführbaren Dateipfad oder CLI-Namen; relative Dateipfade gelten ab dem Repository-Root. Ein Shell-Alias allein ist für den Node-Aufruf nicht ausreichend; bei einer üblichen App-Installation greift der App-Pfad.

## Ablauf

1. Voraussetzungen prüfen und Quellartikel oder gespeicherte Transkription auswählen.
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
npm run blog:feed -- --resume "/absoluter/pfad/.cache/blog/<lauf>/state.json"
```

Alle sechs Scripts unterstützen `--resume` ohne Quell-URL. Dabei werden die gespeicherte Quelle und der gespeicherte Modus verwendet; Random-Läufe ziehen keinen neuen Artikel und Transkriptionsläufe öffnen keine neue Auswahl. Der vollständige gespeicherte Transkripttext wird weiterverwendet, auch wenn PineFetch und NO-BULLSHIT-RSS nicht installiert sind. Der gezeigte `blog:feed`-Aufruf kann auch einen Top-, Random-, Custom- oder Transkriptionslauf fortsetzen. Alte Zustandsdateien ohne Modus werden als Feed-Läufe behandelt.

Fertige Artikel und Bilder werden weiterverwendet. Ein gespeicherter Commit wird nicht erneut angelegt; nach einem erfolgreichen Push werden nur noch Deployment und IndexNow geprüft. Ein IndexNow- oder Deploymentfehler wird als Fehler gemeldet, obwohl der Git-Push bereits erfolgreich gewesen sein kann. Der Fehlertext unterscheidet diese Zustände.

Manuelle Änderungen an den bereits vorbereiteten Dateien stoppen die automatische Veröffentlichung. Bei einem ungültigen Codex-Artikel kann die gespeicherte `article.md` korrigiert und der Lauf anschließend fortgesetzt werden, solange noch keine Dateien vorbereitet wurden. Bei Git-Konflikten oder zwischenzeitlich verändertem HEAD ist eine manuelle Klärung nötig; es gibt kein automatisches Reset oder Rebase. Gleichzeitig laufende Blog-Workflows werden durch eine Prozesssperre verhindert.

## Umgebungsvariablen

| Variable | Bedeutung |
| --- | --- |
| `DB_PATH` | Nur für RSS-Modi: bestehende Datenbank; Standard: `~/Library/Application Support/NO-BULLSHIT-RSS/data-v2.db` |
| `PINEFETCH_BIN` | Optionaler ausführbarer PineFetch-Dateipfad oder CLI-Name; sonst Suche im PATH und in den üblichen macOS-App-Pfaden |
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

Die Workflow-Tests verwenden temporäre Git-Repositories und einen lokalen Bare-Remote sowie simulierte Codex-, RSS-, PineFetch-, BulkPixel- und HTTP-Antworten. Sie erzeugen keine KI-Ausgaben, greifen nicht auf die echten RSS- oder PineFetch-Datenbanken zu und veröffentlichen keine Inhalte im Internet. Sie ersetzen keinen echten Durchlauf mit den installierten CLI-Werkzeugen und dem Website-Deployment.
