---
layout: post
title: 'Gen1Recomp auf Android: Pokémon-Stadium-ROM in den richtigen Ordner kopieren'
date: 2026-08-11 08:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - recomp
    - pokemon
    - gaming
description: 'Gen1Recomp findet die Pokémon-Stadium-ROM auf Android nicht? Der richtige Pfad liegt in Android/data und ist oft im Dateimanager versteckt'
thumbnail: '/assets/images/gen/blog/gen1recomp-auf-android-pokemon-stadium-rom-in-den-richtigen-ordner-kopieren/header_thumbnail.webp'
image: '/assets/images/gen/blog/gen1recomp-auf-android-pokemon-stadium-rom-in-den-richtigen-ordner-kopieren/header.webp'
image_width: 1280
image_height: 721
image_alt: 'Gen1Recomp auf Android mit Pokémon-Stadium-Modellen: Bibor kämpft in einer 3D-Voxelwelt gegen Abra, daneben der Schriftzug "GEN1RECOMP STADIUM-MODELLE".'
faq:
    - question: 'Wo muss die Pokémon-Stadium-ROM bei Gen1Recomp unter Android liegen?'
      answer: 'Bei der Android-Version von Gen1Recomp für Pokémon Rot liegt der baseroms-Ordner unter Android/data/com.theboisclub.pokemonred/files/save/pokemon-love2d/baseroms/.'
    - question: 'Warum sehe ich den Gen1Recomp-Ordner im Android-Dateimanager nicht?'
      answer: 'Android schränkt seit Android 11 den Zugriff auf Android/data stark ein. Viele vorinstallierte Dateimanager zeigen App-Verzeichnisse deshalb nicht oder nur eingeschränkt an.'
    - question: 'Welche Pokémon-Stadium-ROM wird benötigt?'
      answer: 'Für die Stadium-Modelle wird eine kompatible Pokémon Stadium USA Version 1.0 benötigt. Die ROM muss aus einer eigenen legalen Kopie stammen.'
socialmedia:
    - 'Gen1Recomp findet eure Pokémon-Stadium-ROM unter Android nicht? Das Problem ist oft nicht die ROM, sondern Android/data. Hier ist der richtige Pfad und warum der normale Dateimanager ihn häufig nicht zeigt.'
    - 'Pokémon Stadium in Gen1Recomp auf Android: Die ROM gehört in den baseroms-Ordner. Der liegt allerdings in Android/data und ist auf modernen Android-Versionen oft nicht direkt sichtbar.'
    - 'Gen1Recomp + Stadium-Modelle auf Android: Ich zeige den richtigen ROM-Pfad und erkläre, warum ihr ihn mit dem vorinstallierten Dateimanager möglicherweise gar nicht öffnen könnt.'
---

Wer die Pokémon-Stadium-Modelle in [Gen1Recomp](https://oliverjessner.at/category/gen1recomp/) unter Android nutzen möchte, kann an einem unscheinbaren Problem hängen bleiben: Der benötigte Ordner liegt in `Android/data` und ist mit vielen normalen Dateimanagern nicht sichtbar.

## Der richtige Gen1Recomp-Pfad unter Android

Gen1Recomp lässt sich mit Mods um eine 3D-Darstellung und Pokémon-Stadium-Modelle erweitern. Gerade auf Android-Handhelds ist das eine interessante Ergänzung für klassische [Pokémon](https://oliverjessner.at/category/pokemon/)-Spiele.

Damit die Stadium-Integration die benötigten Daten auslesen kann, muss eine kompatible Pokémon-Stadium-ROM im richtigen `baseroms`-Verzeichnis liegen.

Für die Android-Version von Gen1Recomp mit Pokémon Rot lautet der Pfad:

```text
/storage/emulated/0/Android/data/com.theboisclub.pokemonred/files/save/pokemon-love2d/baseroms/
```

![Gen1Recomp auf Android zeigt den benötigten Speicherpfad für die Pokémon-Stadium-USA-1.0-ROM im baseroms-Ordner.](/assets/images/gen/blog/pokemon-rot-in-3d-dramatic-shape-16-veraendert-die-kaempfe/stadium_mode.webp)

In diesen Ordner kommt die eigene Pokémon-Stadium-ROM.

Unterstützt werden je nach verwendeter Stadium-Integration N64-ROMs mit den Dateiendungen:

```text
.z64
.n64
.v64
```

Wichtig ist außerdem die verwendete ROM-Version. Für die Stadium-Unterstützung wird eine kompatible US-Version 1.0 von Pokémon Stadium erwartet.

![Gen1Recomp extrahiert die Pokémon-Stadium-Daten und zeigt den Fortschritt der Modell-Extraktion für Poliwrath an.](/assets/images/gen/blog/pokemon-rot-in-3d-dramatic-shape-16-veraendert-die-kaempfe/stadium_extract.webp)

Gen1Recomp selbst liefert keine Pokémon-ROMs mit. Benötigte Spieldaten müssen aus einer eigenen Kopie stammen.

## Warum Android/data im Dateimanager nicht sichtbar ist

Das eigentliche Problem ist häufig nicht Gen1Recomp, sondern Android.

Seit Android 11 schränkt das Betriebssystem den Zugriff anderer Apps auf `Android/data` deutlich ein. Das betrifft auch Dateimanager.

Der vorinstallierte Dateimanager eines Android-Handhelds kann deshalb beispielsweise bis hierhin kommen:

```text
/storage/emulated/0/Android/
```

Der Ordner `data` lässt sich anschließend aber nicht öffnen oder erscheint gar nicht erst.

Das bedeutet nicht automatisch, dass der Gen1Recomp-Ordner fehlt.

Er liegt lediglich in einem Bereich des Dateisystems, auf den Android normalen Apps nur eingeschränkten Zugriff erlaubt.

Gerade bei [Emulation](https://oliverjessner.at/category/emulation/) und Mods ist das relevant, weil viele ältere Anleitungen davon ausgehen, dass sich `Android/data` wie jeder andere Ordner öffnen lässt. Auf aktuellen Android-Versionen funktioniert das nicht mehr zuverlässig.

## Den baseroms-Ordner zuerst von Gen1Recomp anlegen lassen

Bevor man versucht, den Ordner manuell zu erreichen, sollte Gen1Recomp mindestens einmal gestartet und eingerichtet worden sein.

Die Ordnerstruktur wird dadurch von der Anwendung angelegt.

Gesucht wird anschließend:

```text
Android
└── data
    └── com.theboisclub.pokemonred
        └── files
            └── save
                └── pokemon-love2d
                    └── baseroms
```

Falls `baseroms` noch nicht existiert, kann der Ordner innerhalb von `pokemon-love2d` angelegt werden.

Die Pokémon-Stadium-ROM liegt danach beispielsweise hier:

```text
/storage/emulated/0/Android/data/com.theboisclub.pokemonred/files/save/pokemon-love2d/baseroms/PokemonStadium.z64
```

Der Dateiname selbst ist dabei weniger entscheidend als die korrekte ROM und der richtige Speicherort.

## Was tun, wenn der normale Dateimanager den Ordner nicht öffnet?

Wenn der vorinstallierte Dateimanager `Android/data` nicht anzeigt, bringt es wenig, innerhalb dieser App weiter nach dem Ordner zu suchen.

Das ist eine Einschränkung des Android-Speichermodells.

Je nach Gerät und Android-Version gibt es mehrere Möglichkeiten. Einige alternative Dateimanager können über von Android bereitgestellte Zugriffsmechanismen bestimmte Verzeichnisse öffnen. Bei anderen Geräten ist der Zugriff über einen Computer oder über Entwicklerwerkzeuge einfacher.

Welche Methode funktioniert, hängt allerdings vom Android-Gerät und dessen Software ab.

Der entscheidende Punkt bleibt deshalb der Zielpfad:

```text
/storage/emulated/0/Android/data/com.theboisclub.pokemonred/files/save/pokemon-love2d/baseroms/
```

Wenn die Stadium-ROM dort liegt und mit der verwendeten Mod-Version kompatibel ist, kann Gen1Recomp sie für die entsprechenden Stadium-Funktionen verwenden.

## Warum der Pfad auf anderen Geräten abweichen kann

`/storage/emulated/0/` ist auf vielen Android-Geräten der normale Pfad für den internen gemeinsamen Speicher.

Es gibt allerdings Ausnahmen. Geräte mit anders eingebundenem Speicher oder speziellen Herstelleranpassungen können einen abweichenden Speicherpfad verwenden.

Auch der Paketname der Anwendung ist relevant. Der oben genannte Pfad bezieht sich auf die Android-Version von Gen1Recomp für Pokémon Rot mit dem Paket:

```text
com.theboisclub.pokemonred
```

Wer eine andere Gen1Recomp-Version oder einen Fork verwendet, sollte deshalb nicht blind den gesamten Pfad übernehmen.

Der relevante Teil ist grundsätzlich:

```text
Android/data/[Gen1Recomp-Paket]/files/save/pokemon-love2d/baseroms/
```

## Gen1Recomp findet die Stadium-ROM trotzdem nicht

Wenn die ROM im richtigen Ordner liegt und Gen1Recomp sie weiterhin nicht erkennt, würde ich in dieser Reihenfolge prüfen:

1. Liegt die Datei wirklich direkt im Ordner `baseroms`?
2. Ist die ROM entpackt und nicht mehr in einer ZIP-Datei?
3. Handelt es sich um Pokémon Stadium USA Version 1.0?
4. Wird eine unterstützte Dateiendung wie `.z64`, `.n64` oder `.v64` verwendet?
5. Ist eine aktuelle und kompatible Version der Stadium-Mod beziehungsweise des Voxel-Mods installiert?
6. Wurde Gen1Recomp nach dem Kopieren der ROM vollständig neu gestartet?

Gerade der erste Punkt ist leicht zu übersehen. Ein Pfad wie

```text
baseroms/PokemonStadium/PokemonStadium.z64
```

ist nicht dasselbe wie:

```text
baseroms/PokemonStadium.z64
```

Wer Gen1Recomp auf einem Android-Handheld für [Gaming](https://oliverjessner.at/category/gaming/) nutzt, stößt hier also weniger auf ein Pokémon-Problem als auf eine Eigenheit moderner Android-Versionen. Ist `Android/data` einmal erreichbar und die ROM im richtigen `baseroms`-Ordner abgelegt, ist der entscheidende Teil der Einrichtung erledigt.
