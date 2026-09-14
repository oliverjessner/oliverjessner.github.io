# Datenquellen aktualisieren

Die Skripte laden neue externe Veröffentlichungen, erzeugen die WebP-Bilder und ergänzen die passende JSON-Datei.

```bash
npm run update:golem
npm run update:ign
npm run update:youtube
npm run update:shorts
```

`update:ign` liest das IGN-Autorenprofil von Oliver Jessner. Ein Beitrag wird nur übernommen, wenn die Artikel-JSON-LD Oliver Jessner als Autor ausweist. Bereits vorhandene URLs bleiben unverändert.

`update:shorts` liest den Shorts-Tab des YouTube-Kanals. Bestehende Einträge bleiben unverändert; ergänzt werden nur unbekannte Video-IDs mit Veröffentlichungsdatum ab dem 14.09.2026. Dadurch lädt der erste Lauf nur heutige Shorts und spätere Läufe holen alle seit diesem Startdatum veröffentlichten Shorts nach. Bilder werden unter `assets/images/gen/external_short/` als WebP gespeichert.

Optionen:

```bash
npm run update:shorts -- --dry-run
npm run update:shorts -- --force-images
npm run update:shorts -- --since=2026-09-14
```
