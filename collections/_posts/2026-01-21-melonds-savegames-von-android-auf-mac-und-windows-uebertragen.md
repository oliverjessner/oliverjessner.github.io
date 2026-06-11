---
layout: post
title: 'melonDS Save File übertragen: Android, Mac und Windows'
date: 2026-01-21 11:00:00 +0100
last_modified_at: 2026-06-11 12:13:37 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - emulation
    - macos
    - gaming
    - ds
description: 'So überträgst du melonDS-Savegames von Android auf Mac oder Windows: .sav-Datei finden, Save-State vermeiden und Save File richtig importieren.'
thumbnail: '/assets/images/gen/blog/melonds-savegames-von-android-auf-mac-und-windows-uebertragen/header_thumbnail.webp'
image: '/assets/images/gen/blog/melonds-savegames-von-android-auf-mac-und-windows-uebertragen/header.webp'
---

Du spielst auf Android mit melon[DS](https://oliverjessner.at/category/ds/) und willst den Spielstand am [Mac](https://oliverjessner.at/category/macos/) oder Windows-PC weiterführen.

## Unterschied zwischen .sav und Save-State

Wenn beim Kopieren etwas "nicht funktioniert", liegt es oft daran, dass zwei Dinge verwechselt werden:

- In-Game-Save: Das ist der normale Spielstand, den das Spiel selbst schreibt. Üblich ist eine Datei wie `.sav`.
- Save-State: Das ist ein Emulator-Schnappschuss. Auf Android tauchen je nach App und Slot Formate wie `.ml1` auf. Save-States sind praktisch, aber zwischen Geräten und Emulator-Versionen nicht immer kompatibel.

Wenn du sicher von Android nach macOS oder Windows wechseln willst, setze auf den In-Game-Save. Save-States sind eher ein Bonus, kein verlässliches Austauschformat.

## "Save next to ROM" aktivieren

Der entscheidende Komfort-Hebel in melonDS Android ist die Option:

"Save next to ROM file"

Wenn sie aktiv ist, findest du deine Savegames dort, wo du sie erwartest: direkt neben der ROM (Bei mir war das der Default).

![Android melonDS setting für savegames](/assets/images/gen/blog/melonds-savegames-von-android-auf-mac-und-windows-uebertragen/setting.webp)

So sieht das dann typischerweise aus:

![Das Android Dateisystem mit unserem MelonDS Dateien](/assets/images/gen/blog/melonds-savegames-von-android-auf-mac-und-windows-uebertragen/savegame.webp)

## Den passenden Save erzeugen

Wenn du aktuell nur `.ml1` oder ähnliche Dateien siehst, ist das ein Hinweis auf Save-States.

So kommst du sauber zu einem portablen Spielstand:

1. Im Spiel selbst speichern
1. Danach sollte die `.sav` aktualisiert oder neu angelegt sein

Das ist der Moment, in dem du vom "Emulator-Schnappschuss" auf einen Spielstand wechselst, den auch melonDS am Desktop in der Regel versteht.

## melonDS Save von Android exportieren

Wenn "Save next to ROM file" aktiv ist, gehst du auf Android einfach in denselben Ordner, in dem deine `.nds` liegt.

Wichtig sind zwei Details:

- Dateiname muss passen: `Game.nds` erwartet `Game.sav`

Zum Kopieren eignen sich:

- USB-Transfer auf den Rechner
- Cloud/Sync (wenn du den ROM-Ordner ohnehin synchronisierst)
- Ein Dateimanager, der Zugriff auf deinen ROM-Ordner hat

Warnhinweis: Android schränkt den Zugriff auf manche App-Verzeichnisse ein. Mit "Save next to ROM file" umgehst du das meistens komplett, weil du im normalen ROM-Ordner arbeitest.

## melonDS Save auf Mac oder Windows importieren

Wenn du die .sav-Datei auf deinen Mac oder Windows-PC übertragen hast, kannst du melonDS öffnen und unter macOS zum Beispiel über File -> Import Savefile dein Save importieren. Danach spielst du genau dort weiter, wo du aufgehört hast. Achtung: Du musst die Save-Datei nicht direkt neben der ROM ablegen wie auf Android. Beim Speichern erstellt melonDS jedoch jetzt wieder eine .save-Datei neben der ROM.

![mac setting um savefiles zu importen](/assets/images/gen/blog/melonds-savegames-von-android-auf-mac-und-windows-uebertragen/mac_import_save.webp)

## Häufige Fehler: Save wird nicht erkannt

### Du hast nur Save-States und keine `.sav`

- Lade den State auf Android
- Speichere im Spiel
- Kopiere erst dann die `.sav`

### Du hast mehrere `.sav` und blickst nicht durch

- Lege pro Spiel einen eigenen Ordner an
- Halte die Dateinamen kurz und eindeutig
- Vermeide Dopplungen wie `Game (1).sav`

Und schon kannst du deinen Spielstand fortsetzen:

![Digimon Championship auf dem MelonDS](/assets/images/gen/blog/melonds-savegames-von-android-auf-mac-und-windows-uebertragen/melonds.webp)
