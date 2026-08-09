---
layout: post
title: 'Gen2Recomp: Pokémon Gold und Silber nativ auf PC, Mac, Linux und Android'
date: 2026-08-09 09:13:00 +0200
authors: ['oliver\_jessner']
meta_og_type: 'article'
categories:
    - recomp
    - pokemon
    - gaming
description: 'Gen2Recomp bringt Pokémon Gold und Silber als nativen LÖVE2D-Port auf Windows, macOS, Linux und Android. So funktioniert die neue Beta'
thumbnail: '/assets/images/gen/blog/gen2recomp-pokemon-gold-und-silber-nativ-auf-pc-mac-linux-und-android/header_thumbnail.webp'
image: '/assets/images/gen/blog/gen2recomp-pokemon-gold-und-silber-nativ-auf-pc-mac-linux-und-android/header.webp'
image_width: 1280
image_height: 721
faq:
    - question: 'Was ist Gen2Recomp?'
      answer: 'Gen2Recomp ist eine LÖVE2D-Neuimplementierung von Pokémon Gold und Silber auf Basis von Gen1Recomp. Spieldaten werden aus einer eigenen ROM importiert.'
    - question: 'Welche Pokémon-ROMs unterstützt Gen2Recomp?'
      answer: 'Der Importer unterstützt die kanonischen US-Versionen von Pokémon Gold, Silber, Rot, Blau und Gelb. Für Generation 2 stehen Gold und Silber im Mittelpunkt.'
    - question: 'Ist Gen2Recomp ein Game-Boy-Emulator?'
      answer: 'Nein. Gen2Recomp emuliert keinen Game Boy. Engine und Spiellogik laufen als LÖVE2D-Anwendung, während Daten und Grafiken aus einer vom Nutzer bereitgestellten ROM importiert werden.'
socialmedia:
    - 'Gen2Recomp ist da: Pokémon Gold und Silber bekommen eine native LÖVE2D-Neuimplementierung für Windows, macOS, Linux und Android. Ich zeige, was die Beta kann, welche ROMs funktionieren und wie die Installation läuft.'
    - 'Pokémon Gold und Silber auf PC, Mac und Android, ohne klassischen Game-Boy-Emulator: Gen2Recomp importiert die Spieldaten aus einer eigenen ROM und baut darauf einen modernen LÖVE2D-Port mit Controller-Support und Mods.'
    - 'Nach Gen1Recomp folgt Gen2Recomp. Die Beta bringt Johto, Tag/Nacht, Mods und sogar den bekannten Voxel-Look auf moderne Systeme. Wichtig: Das Projekt ist noch jung und sollte auch genau so behandelt werden.'
---

Gen2Recomp bringt Pokémon Gold und Silber in eine moderne LÖVE2D-Neuimplementierung. Die erste Beta läuft auf Desktop und Android und unterstützt sogar Mods und den bekannten Voxel-Look.

## Was ist Gen2Recomp?

Mit [Gen1Recomp](https://github.com/bryanthaboi/gen1recomp) entstand eine Neuimplementierung von Pokémon Rot, Blau und Gelb, die nicht wie ein klassischer Game-Boy-Emulator arbeitet. Statt die ursprüngliche Hardware nachzubilden, wird die Spiellogik in einer eigenen Engine umgesetzt.

[Gen2Recomp](https://github.com/UNDERdecoded/Gen2Recomped) führt diesen Ansatz nun für die zweite Pokémon-Generation weiter. Das Projekt von UNDERdecodedHD basiert auf Gen1Recomp und erweitert dessen Engine um Pokémon Gold und Silber.

Die erste öffentliche Version erschien am 9. August 2026. Auf GitHub wird sie als "v0.5-Beta" geführt. Für Desktop-Systeme steht aktuell ein gemeinsames Paket für Windows, Linux und macOS bereit. Zusätzlich gibt es eine Android-Version als APK.

Damit wird aus einem interessanten [Recomp-Projekt](https://oliverjessner.at/category/recomp/) erstmals eine praktisch nutzbare Grundlage für Pokémon Gold und Silber auf aktuellen Systemen.

## Gen2Recomp ist kein klassischer Game-Boy-Emulator

Der Name kann etwas in die Irre führen. Technisch handelt es sich weder um klassische Emulation noch um eine automatische Übersetzung des ursprünglichen Game-Boy-Assemblers in modernen Maschinencode.

Das Projekt bezeichnet sich selbst als "native LÖVE2D recreation".

Die Engine, Script-VM und das Verhalten der Karten wurden in Lua neu implementiert. Die eigentlichen Spieldaten und Grafiken werden dagegen aus einer ROM gelesen, die der Nutzer selbst bereitstellt.

Gen2Recomp enthält deshalb weder Pokémon Gold noch Pokémon Silber.

Auch die ROM wird laut Projekt nicht dauerhaft in den Cache kopiert. Beim ersten Start wird sie geprüft und für den Import verwendet. Anschließend startet Gen2Recomp mit den daraus erzeugten lokalen Daten.

Das ist ein wesentlicher Unterschied zu einem Emulator. Ein Emulator versucht die ursprüngliche Game-Boy-Hardware nachzubilden und führt weiterhin das originale ROM-Programm aus. Gen2Recomp stellt dagegen eine eigene Laufzeitumgebung für das Spiel bereit.

## Pokémon Gold und Silber auf modernen Systemen

Das interessante Ziel von Gen2Recomp ist deshalb nicht einfach, Pokémon Gold und Silber irgendwie auf einem PC starten zu können. Das funktioniert mit Emulatoren seit Jahrzehnten.

Interessanter sind die Möglichkeiten, die durch eine eigene Engine entstehen.

Gen2Recomp unterstützt laut aktueller Projektbeschreibung unter anderem:

- Pokémon Gold und Pokémon Silber
- die Johto- und Kanto-Welt
- Tag- und Nachtwechsel
- Pokégear
- gehaltene Items
- Shinys
- Day-Care und Zucht
- Controller
- frei belegbare Tasten
- verschiedene Darstellungsmodi
- Zoom
- perspektivische Kartenansicht
- Modding
- einen integrierten Mod-Manager
- portable Spielstände
- Performance-Profile für schwächere Geräte

Gleichzeitig bleibt Gen2Recomp eine Beta. Bei einem Projekt, das erst seit wenigen Stunden öffentlich verfügbar ist und eine derart große Spiellogik nachbildet, sollte mit Fehlern und Abweichungen gerechnet werden.

Die Entwickler arbeiten bereits an konkreten Problemen. Zu den ersten Änderungen nach Veröffentlichung gehörten beispielsweise Korrekturen am Sound im Pokémon Center sowie an Ereignissen rund um die Mutter des Spielers.

Für einen vollständigen Ersatz eines etablierten Game-Boy-Emulators ist die Beta deshalb noch nicht gedacht. Als technisches Projekt ist sie aber bereits deutlich interessanter.

## Welche ROMs funktionieren mit Gen2Recomp?

Gen2Recomp akzeptiert nicht jede beliebige Gold- oder Silber-ROM.

Der Importer prüft die Datei anhand ihres SHA-1-Hashes. Für Pokémon Gold und Silber werden aktuell die kanonischen US-ROMs mit jeweils 2 MiB erwartet.

| Spiel          | Größe | SHA-1                                      |
| -------------- | ----: | ------------------------------------------ |
| Pokémon Gold   | 2 MiB | `d8b8a3600a465308c9953dfa04f0081c05bdcb94` |
| Pokémon Silber | 2 MiB | `49b163f7e57702bc939d642a18f591de55d92dae` |

Eine deutsche Pokémon-Gold-ROM besitzt andere Daten und damit auch einen anderen Hash. Sie wird vom aktuellen Importer nicht als unterstützte Version erkannt.

Zusätzlich kann die Engine weiterhin die von Gen1Recomp unterstützten US-ROMs von Pokémon Rot, Blau und Gelb importieren.

Wer beim Start also eine Fehlermeldung erhält, obwohl die ROM grundsätzlich funktioniert, sollte zuerst prüfen, welche regionale Version verwendet wird.

## Gen2Recomp installieren

Am einfachsten ist derzeit die Installation über die offizielle [Release-Seite von Gen2Recomp](https://github.com/UNDERdecoded/Gen2Recomped/releases/tag/Beta).

Zum Zeitpunkt dieses Artikels werden dort unter anderem folgende Dateien angeboten:

- `Gen2Recomped.Windows-Linux.-.Mac.v0.5.1.zip`
- `Gen2Recompv0.5.1a.apk`
- `Gen2DramaticShapes.zip`

Die Versionsnummern und Dateinamen können sich während der Beta schnell ändern. Deshalb würde ich grundsätzlich über die Release-Seite gehen und nicht einen einzelnen Download dauerhaft verlinken.

> **Hinweis:** Das Projekt warnt ausdrücklich vor der Webseite `gen1recomp.com`. Diese gehört laut Entwickler weder zu Gen1Recomp noch zu Gen2Recomp. Die offizielle Quelle für Gen2Recomp ist das GitHub-Repository von UNDERdecoded.

## Gen2Recomp unter Windows starten

Im Repository befindet sich mit `Play-Windows.bat` ein eigener Windows-Launcher.

Wer das Projekt direkt aus dem Quellcode startet, kann darüber die benötigten Komponenten einrichten lassen. Gen2Recomp verwendet LÖVE 11.x und Python 3 für den Importprozess.

Alternativ lassen sich die Voraussetzungen unter Windows über `winget` installieren:

```powershell
winget install --exact --id Python.Python.3.12
winget install --exact --id Love2d.Love2d
```

Danach kann die ROM beispielsweise über das Setup-Script importiert werden:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\setup.ps1 -Rom C:\path\to\Gold.gbc
powershell -ExecutionPolicy Bypass -File scripts\run.ps1
```

Beim ersten Import benötigt Gen2Recomp etwas Zeit, um die Daten aus der ROM aufzubereiten. Danach muss die ROM bei normalen Starts nicht erneut ausgewählt werden.

## Gen2Recomp unter macOS starten

Auch für macOS liegt mit `Play-Mac.command` ein eigener Launcher im Projekt.

Dieser prüft beim ersten Start, ob Python 3 und LÖVE vorhanden sind. Fehlt LÖVE, kann das Script die Installation über Homebrew vorbereiten.

Wer die Abhängigkeiten bereits installiert hat, kann Gen2Recomp auch manuell einrichten:

```sh
scripts/setup.sh --rom "/path/to/Poke Gold.gbc"
scripts/run.sh
```

Nach einem erfolgreichen Import reicht anschließend:

```sh
love .
```

Gen2Recomp ist damit gerade für macOS interessant. Statt einen speziellen Game-Boy-Emulator zu konfigurieren, läuft die eigentliche Anwendung innerhalb der plattformübergreifenden LÖVE2D-Engine.

## Gen2Recomp unter Linux starten

Unter Linux verwendet das Projekt ebenfalls die Shell-Scripts aus dem Repository.

Unter Debian oder Ubuntu lassen sich die wichtigsten Voraussetzungen beispielsweise so installieren:

```sh
sudo apt install love python3 python3-venv
```

Danach:

```sh
chmod +x scripts/*.sh
scripts/setup.sh --rom "/path/to/Poke Gold.gbc"
scripts/run.sh
```

LÖVE lässt sich alternativ auch über Flatpak installieren.

## Gen2Recomp auf Android

Für Android wird bereits eine APK angeboten. Das ist für ein so junges Projekt bemerkenswert, weil Gen2Recomp damit nicht nur klassische Desktop-Systeme abdeckt.

Die aktuelle Beta-Datei trägt zum Zeitpunkt dieses Artikels den Namen:

```text
Gen2Recompv0.5.1a.apk
```

Für schwächere Hardware besitzt die Engine unterschiedliche Performance-Profile. Das Profil "AUTO" soll das Gerät erkennen und optionale Effekte entsprechend reduzieren.

Die eigentliche Spiellogik bleibt davon unabhängig. Reduziert werden vor allem grafische Zusatzfunktionen wie Perspektiv-Effekte, GBC-Filter oder sehr weit herausgezoomte Karten.

## Der Voxel-Mod funktioniert auch mit Generation 2

Besonders interessant wird Gen2Recomp durch das Modding-System.

Schon bei Gen1Recomp konnte der Renderer deutlich weiter verändert werden als bei einem normalen Emulator. Ich hatte mir das bereits bei [Pokémon Rot in 3D mit Gen1Recomp und dem Voxel-Mod](https://oliverjessner.at/blog/2026-07-30-pokemon-rot-in-3d-gen1recomp-und-voxel-mod-installieren/) angesehen.

Gen2Recomp führt diesen Ansatz weiter.

Das Projekt nennt ausdrücklich `DRAMATIC_SHAPE`, einen Voxel-Renderer, der von UNDERdecodedHD für die zweite Generation erweitert wurde. Auf der Release-Seite steht zusätzlich ein eigenes Paket namens `Gen2DramaticShapes.zip` bereit.

Damit lässt sich die klassische Welt nicht nur größer oder mit anderen Farben darstellen. Die ursprünglich flache Game-Boy-Grafik kann in eine räumliche Darstellung überführt werden.

Das verändert das Spiel nicht grundsätzlich, zeigt aber gut, weshalb solche [Pokémon](https://oliverjessner.at/category/pokemon/)-Neuimplementierungen technisch interessanter sein können als reine Emulation.

## Zoom, Tilt und GBC-Effekte

Auch ohne Voxel-Mod bringt die Engine einige Darstellungsoptionen mit.

Mit `-` und `=` beziehungsweise dem Mausrad lässt sich die Welt heraus- und hineinzoomen. Der Renderer kann dabei auch angrenzende Karten darstellen.

Über die Taste `3` lässt sich eine perspektivische Neigung der Karte aktivieren. Verfügbar sind unterschiedliche Winkel bis 50 Grad.

Dabei wird die Karte wie eine flache Ebene perspektivisch gekippt, während Charaktere weiterhin aufrecht dargestellt werden. Kollisionsabfragen, Begegnungen und Scripts verändern sich dadurch nicht.

Zusätzlich besitzt Gen2Recomp verschiedene Farbmodi und GBC-Effekte. Diese können beispielsweise ein Pixelraster oder andere Eigenschaften eines Game-Boy-Color-Displays simulieren.

Die wichtigsten Hotkeys sind aktuell:

| Taste     | Funktion                 |
| --------- | ------------------------ |
| `-` / `=` | Zoom                     |
| `2`       | Farbmodus wechseln       |
| `3`       | Perspektive wechseln     |
| `4`       | Zoom-Level durchschalten |
| `5`       | GBC-Effekt wechseln      |
| `F1`      | Speichern                |
| `F2`      | Laden                    |
| `F10`     | Mod-Manager              |

Controller werden ebenfalls unterstützt.

## Warum Gen2Recomp spannender als ein weiterer Emulator ist

Einen weiteren Game-Boy-Emulator braucht vermutlich niemand dringend. Die Emulation der ersten beiden Pokémon-Generationen ist längst ausgereift.

Gen2Recomp verfolgt aber ein anderes Ziel.

Wenn Spiellogik, Renderer und Benutzeroberfläche nicht mehr direkt an die ursprüngliche Hardware gebunden sind, können Entwickler Funktionen ergänzen, die auf dem Game Boy kaum oder gar nicht möglich gewesen wären.

Dazu gehören größere Ansichten der Spielwelt, moderne Controller-Unterstützung, neue Renderverfahren und ein Modding-System mit eigenen Hooks und Events.

Gerade für [Gaming](https://oliverjessner.at/category/gaming/) und die langfristige technische Erhaltung alter Spiele ist dieser Ansatz interessant. Das Original bleibt die Referenz, während die neu implementierte Engine neue Möglichkeiten für moderne Hardware eröffnet.

## Der Beta-Status sollte ernst genommen werden

Gen2Recomp ist aktuell kein fertiger Port, bei dem ich davon ausgehen würde, dass jeder Ablauf exakt wie auf dem Game Boy funktioniert.

Die Dokumentation des Projekts befindet sich selbst noch sichtbar in Bewegung. Neben bereits implementierten Gen2-Komponenten existieren weiterhin Roadmaps und Paritätsarbeiten für einzelne Systeme.

Das ist bei einer ersten Beta nicht ungewöhnlich.

Wer einfach nur Pokémon Gold oder Silber möglichst originalgetreu spielen möchte, ist mit einem etablierten Emulator momentan weiterhin auf der sicheren Seite.

Wer dagegen beobachten möchte, wie aus einem Game-Boy-Spiel eine eigenständige moderne Engine entsteht, bekommt mit Gen2Recomp eines der derzeit interessanteren Pokémon-Fanprojekte.

## Fazit

Gen1Recomp hat bereits gezeigt, was passiert, wenn Pokémon Rot, Blau und Gelb aus der klassischen Emulator-Umgebung gelöst werden. Gen2Recomp versucht dasselbe nun mit Pokémon Gold und Silber.

Die aktuelle Beta unterstützt Windows, macOS, Linux und Android, importiert Spieldaten aus einer eigenen ROM und bringt bereits Controller-Support, verschiedene Rendering-Modi, Modding und den für Generation 2 erweiterten Voxel-Renderer mit.

Noch würde ich Gen2Recomp nicht als vollständigen Ersatz für einen Game-Boy-Color-Emulator betrachten. Dafür ist das Projekt zu frisch und der Beta-Status zu deutlich.

Technisch ist die Richtung trotzdem spannend. Pokémon Gold und Silber laufen damit nicht einfach nur auf moderner Hardware. Die Spiele bekommen eine Engine, die sich unabhängig von den ursprünglichen Grenzen des Game Boy weiterentwickeln lässt.

## Download und Quellen

- [Gen2Recomp auf GitHub](https://github.com/UNDERdecoded/Gen2Recomped)
- [Gen2Recomp Releases und Beta-Downloads](https://github.com/UNDERdecoded/Gen2Recomped/releases/tag/Beta)
- [Gen2Recomp README](https://github.com/UNDERdecoded/Gen2Recomped/blob/main/README.md)
- [Gen2-Migrations-Roadmap](https://github.com/UNDERdecoded/Gen2Recomped/blob/main/docs/gen2-migration-roadmap.md)
- [Neue Funktionen und Renderer](https://github.com/UNDERdecoded/Gen2Recomped/blob/main/docs/new-features.md)
