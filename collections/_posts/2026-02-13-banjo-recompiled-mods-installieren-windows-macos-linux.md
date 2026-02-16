---
layout: post
title: 'Banjo Recompiled Mods installieren: Schritt-für-Schritt für Windows, macOS und Linux'
meta_title: 'Banjo Recompiled Mods installieren (2026): Setup für Windows, macOS, Linux und Steam Deck'
permalink: /banjo-recompiled-mod-installieren/
date: 2026-02-13 16:10:00 +0100
last_modified_at: 2026-02-16 13:00:10 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - gaming
    - emulation
    - nintendo
description: 'So installierst du Banjo Recompiled Mods sauber unter Windows, macOS, Linux und Steam Deck. Mit Voraussetzungen, Update-Plan, Clean Uninstall und Version-Pinning.'
thumbnail: '/assets/images/gen/blog/banjo-recompiled-mod-installieren/header_thumbnail.webp'
image: '/assets/images/gen/blog/banjo-recompiled-mod-installieren/header.webp'
---

Diese Seite ist der reine Install-Guide für **banjo recompiled mod installieren**. Den kompletten Hub mit Mod-Liste und FAQ findest du hier: [banjo recompiled mods](/banjo-kazooie-recompiled-mods/) und [banjo kazooie recompiled mods](/banjo-kazooie-recompiled-mods/).

## Voraussetzungen

- Banjo Recompiled `v1.0.x` (Guide-Stand: `v1.0.1`)
- Eigene Banjo-Kazooie ROM (NTSC-U 1.0, SHA1: `1fe1632098865f639e22c11b9a81ee8f29c75d7a`)
- Mod-Dateien von Thunderstore
- Optional: Savegame-Backup vor größeren Mod-Changes

Offizielle Links:

- Releases: <https://github.com/BanjoRecomp/BanjoRecomp/releases>
- Projekt-README: <https://github.com/BanjoRecomp/BanjoRecomp#readme>
- Thunderstore: <https://thunderstore.io/c/banjo-recompiled/>

## Windows

1. Banjo Recompiled Release entpacken und starten.
2. Beim ersten Start die eigene NTSC-U ROM auswählen.
3. Gewünschte Mod-Datei herunterladen.
4. Im Spiel `Mods -> Install Mods` öffnen oder Mod-Datei auf das Spielfenster ziehen.
5. Mod aktivieren und Spiel neu starten.

**Savegame-Backup (PowerShell):**

```powershell
$src = Join-Path $env:LOCALAPPDATA 'BanjoRecompiled\saves'
$dst = Join-Path $env:USERPROFILE 'Desktop\BanjoRecompiled-saves-backup'
Copy-Item $src $dst -Recurse -Force
```

## macOS

1. Banjo Recompiled entpacken und starten.
2. ROM einmalig einrichten.
3. Mod über `Mods -> Install Mods` installieren oder per Drag-and-drop auf das Fenster.
4. Mod aktivieren und neu starten.

**Savegame-Backup (Terminal):**

```bash
cp -R "$HOME/Library/Application Support/BanjoRecompiled/saves" "$HOME/Desktop/BanjoRecompiled-saves-backup"
```

## Linux

1. Linux-Build entpacken.
2. ROM einmalig setzen.
3. Mod im Mod-Menü installieren oder auf das Fenster ziehen.
4. Mod aktivieren und Spiel neu starten.

**Savegame-Backup (Terminal):**

```bash
cp -R "$HOME/.config/BanjoRecompiled/saves" "$HOME/BanjoRecompiled-saves-backup"
```

## Steam Deck

Laut Projekt funktioniert der Linux-Build auch auf Steam Deck:

1. Linux-Build auf das Deck kopieren und entpacken.
2. In Desktop-Mode die ausführbare Datei mit Rechtsklick zu Steam hinzufügen.
3. In Game-Mode starten und Controls mappen.
4. Mods wie auf Linux im Mod-Menü installieren.

## Update sicher durchführen

1. Savegames sichern.
2. Alle Mods kurz deaktivieren.
3. Spiel auf neue Version bringen.
4. Erst ohne Mods testen.
5. Mods nacheinander wieder aktivieren.

## Clean Uninstall

1. Betroffene Mods im Mod-Menü deaktivieren.
2. Mod entfernen.
3. Spiel neu starten und prüfen.
4. Falls weiterhin Probleme bestehen: nur mit Basis-Setup starten.

## Version pinning

Wenn du Stabilität willst, pinne deinen Stand bewusst:

- Lege Spielversionen in getrennten Ordnern ab (`BanjoRecompiled-v1.0.0`, `BanjoRecompiled-v1.0.1`).
- Ändere nicht gleichzeitig Spielversion und zehn Mods.
- Dokumentiere deine funktionierende Kombi kurz in einer `mods-lock.md`.

Wenn etwas trotzdem klemmt, nutze den Fehler-Guide: [banjo recompiled troubleshooting](/banjo-recompiled-troubleshooting/).
