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

`update:side-projects` aktualisiert zuerst die Fetchary-Quellen 13, 14, 15, 17 und 19 und liest anschliessend ihre Release-Versionen mit `fetchary open <id> --show-include-selector --json`:

| Projekt | Fetchary-ID | Seite |
| --- | --- | --- |
| BulkPixel | 13 | `pages/side_projects/bulkpixel.md` |
| PineFetch | 14 | `pages/side_projects/pinefetch.md` |
| NO-BULLSHIT-RSS | 15 | `pages/side_projects/nobullshitrss.md` |
| SQLite Hub | 17 | `pages/side_projects/sqlite_hub.md` |
| Pitchary | 19 | `pages/side_projects/pitchary.md` |

Die Fetchary CLI muss im `PATH` verfuegbar sein und diese Quellen samt Include-Selector enthalten. Der Selector muss genau eine Version wie `2.2.0` oder `v2.2.0` liefern. Pitchary verwendet Quelle 19 und liest den echten Tag auf der Latest-Seite, da die Release-Notes keine Versionsueberschrift enthalten:

```bash
fetchary edit 19 --url https://github.com/oliverjessner/pitchary/releases/latest --include-selector '.breadcrumb-item-selected a' --mode http
```

Das Script aktualisiert `software_version`, Release-Links, die Versionen in den DMG-Download-URLs von PineFetch und Pitchary sowie den Release-Link im SQLite-Hub-Installationsabschnitt. Pitchary verwendet `Pitchary_<version>_aarch64.dmg`, PineFetch weiterhin `PineFetch_<version>_aarch64_adhoc.dmg`. Die lokalen Installationslinks bleiben erhalten. Fetcharys Exit-Code 10 bedeutet einen erfolgreichen Abruf mit Inhaltsaenderung und wird akzeptiert. Alle Quellen und Seiten werden vor dem Schreiben validiert; fehlerhafte oder leere Ausgaben brechen das Update ab. Unveraenderte Seiten werden nicht neu geschrieben.

```bash
npm run update:side-projects -- --dry-run
npm run update:side-projects -- --skip-fetch
```

`--dry-run` zeigt die gefundenen Versionen ohne Seiten zu aendern; Fetchary aktualisiert dabei weiterhin sein Archiv. `--skip-fetch` liest nur das vorhandene Archiv. Die Website verwendet die Werte beim naechsten Eleventy-Build fuer Download-Buttons, Versionsanzeigen und JSON-LD; der normale Website-Build benoetigt kein Fetchary.
