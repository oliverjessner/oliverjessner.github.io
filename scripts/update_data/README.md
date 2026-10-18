# Datenquellen aktualisieren

Die Skripte aktualisieren externe Veröffentlichungen, Videos und Release-Daten. Die Veröffentlichungs- und Video-Skripte erzeugen zusätzlich WebP-Bilder und ergänzen die passende JSON-Datei.

```bash
npm run update:golem
npm run update:ign
npm run update:youtube
npm run update:shorts
npm run update:side-projects
```

`update:ign` liest das IGN-Autorenprofil von Oliver Jessner. Ein Beitrag wird nur übernommen, wenn die Artikel-JSON-LD Oliver Jessner als Autor ausweist. Bereits vorhandene URLs bleiben unverändert.

`update:shorts` liest den Shorts-Tab des YouTube-Kanals. Bestehende Einträge bleiben unverändert; ergänzt werden nur unbekannte Video-IDs mit Veröffentlichungsdatum ab dem 14.09.2026. Dadurch lädt der erste Lauf nur heutige Shorts und spätere Läufe holen alle seit diesem Startdatum veröffentlichten Shorts nach. Bilder werden unter `assets/images/gen/external_short/` als WebP gespeichert.

Optionen:

```bash
npm run update:shorts -- --dry-run
npm run update:shorts -- --force-images
npm run update:shorts -- --since=2026-09-14
```

`update:side-projects` liest die aktuellen Release-Tags mit der [Fetchary-Library](https://github.com/oliverjessner/fetchary/blob/main/docs/LIBRARY.md) direkt von den GitHub-Seiten `/releases/latest`. Dazu verwendet es `extractSelector()` mit `.breadcrumb-item-selected a` im HTTP-Modus:

| Projekt | GitHub-Repository | Seite |
| --- | --- | --- |
| BulkPixel | `oliverjessner/BulkPixel` | `pages/side_projects/bulkpixel.md` |
| PineFetch | `oliverjessner/PineFetch` | `pages/side_projects/pinefetch.md` |
| NO-BULLSHIT-RSS | `oliverjessner/NO-BULLSHIT-RSS` | `pages/side_projects/nobullshitrss.md` |
| SQLite Hub | `oliverjessner/sqlite-hub` | `pages/side_projects/sqlite_hub.md` |
| Pitchary | `oliverjessner/pitchary` | `pages/side_projects/pitchary.md` |

Die Library ist als Entwicklungsabhaengigkeit installiert; fuer dieses Update-Skript benoetigt Fetchary Node.js 26 oder neuer. Eine globale Fetchary-CLI, eine lokale Quellen-Datenbank und Chromium sind nicht erforderlich. `.puppeteerrc.cjs` deaktiviert den unbenoetigten Browser-Download bei `npm install`. Der Selector muss genau eine Version wie `2.2.0` oder `v2.2.0` liefern. Gelesen wird der Release-Tag, auch wenn die Release-Notes keine Versionsueberschrift enthalten.

Das Script aktualisiert `software_version`, Release-Links, die Versionen in den DMG-Download-URLs von PineFetch und Pitchary sowie den Release-Link im SQLite-Hub-Installationsabschnitt. Pitchary verwendet `Pitchary_<version>_aarch64.dmg`, PineFetch weiterhin `PineFetch_<version>_aarch64_adhoc.dmg`. Die lokalen Installationslinks bleiben erhalten. Alle Releases und Seiten werden vor dem Schreiben validiert; fehlgeschlagene Abrufe sowie leere, mehrdeutige oder ungueltige Versionen brechen das Update ab. Unveraenderte Seiten werden nicht neu geschrieben.

```bash
npm run update:side-projects -- --dry-run
```

`--dry-run` ruft die aktuellen Releases ab und zeigt die gefundenen Versionen ohne Seiten zu aendern. Es wird kein Fetchary-Archiv angelegt oder veraendert. `--skip-fetch` entfaellt, da die Library kein lokales Quellen-Archiv verwendet; die Option bricht vor jedem Abruf mit einem Hinweis ab. Die Website verwendet die Werte beim naechsten Eleventy-Build fuer Download-Buttons, Versionsanzeigen und JSON-LD; der normale Website-Build fuehrt keine Release-Abrufe aus.
