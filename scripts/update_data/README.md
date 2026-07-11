# Datenquellen aktualisieren

Die Skripte laden neue externe Veröffentlichungen, erzeugen die WebP-Bilder und ergänzen die passende YAML-Datei.

```bash
npm run update:golem
npm run update:ign
npm run update:youtube
```

`update:ign` liest das IGN-Autorenprofil von Oliver Jessner. Ein Beitrag wird nur übernommen, wenn die Artikel-JSON-LD Oliver Jessner als Autor ausweist. Bereits vorhandene URLs bleiben unverändert.
