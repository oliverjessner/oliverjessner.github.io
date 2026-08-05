---
layout: post
title: 'Pokémon Rot in 3D – Stadium-Sprites und neue Kampfanimationen'
date: 2026-08-05 11:11:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - gaming
    - pokemon
    - recomp
description: 'Dramatic Shape 1.6 bringt eine steuerbare Kampfkamera und animierte Pokémon-Stadium-Modelle in Pokémon Rot'
thumbnail: '/assets/images/gen/blog/pokemon-rot-in-3d-dramatic-shape-16-veraendert-die-kaempfe/header_thumbnail.webp'
image: '/assets/images/gen/blog/pokemon-rot-in-3d-dramatic-shape-16-veraendert-die-kaempfe/header.webp'
image_width: 1280
image_height: 721
faq:
    - question: 'Was ist neu in Dramatic Shape 1.6?'
      answer: 'Version 1.6.0 erweitert die 3D-Kämpfe um Pokémon-Stadium-Modelle und zusätzliche Arenavarianten. Der aktuelle Mod-Stand enthält außerdem eine steuerbare Kampfkamera.'
    - question: 'Welche ROM wird für die Pokémon-Stadium-Modelle benötigt?'
      answer: 'Benötigt wird eine eigene Pokémon Stadium US 1.0 ROM. Unterstützt werden Dateien im Format .z64, .n64 und .v64.'
    - question: 'Wie werden die neuen Kampfmodi aktiviert?'
      answer: 'Im Optionsmenü lässt sich unter 3D-BTL zwischen 2D-3D A, 2D-3D B, STADIUM A, STADIUM B und dem ursprünglichen 2D-Kampf wählen.'
socialmedia:
    - 'Dramatic Shape 1.6 verändert die Kämpfe in Pokémon Rot: mit steuerbarer Battle Camera und animierten Modellen aus Pokémon Stadium.'
    - 'Pokémon Rot in 3D bekommt Stadium-Kämpfe. Die neue Mod-Version setzt Modelle, Animationen und eine bewegliche Kampfkamera direkt in Kanto ein.'
    - 'Nicht nur die Oberwelt ist jetzt dreidimensional: Dramatic Shape 1.6 bringt Pokémon-Stadium-Modelle und neue Kameraperspektiven in die Kämpfe.'
---

Dramatic Shape 1.6 rückt die Kämpfe in den Mittelpunkt: Eine steuerbare Kamera setzt Duelle neu in Szene, während Modelle aus Pokémon Stadium die bisherigen Battle-Sprites ersetzen.

## Dramatic Stadium erweitert die Kämpfe

Am 4. August 2026 ist [Dramatic Shape 1.6.0 "Dramatic Stadium"](https://github.com/DramaticShape/DramaticShapeVoxelMod/releases/tag/v1.6.0) erschienen. Die Mod baut auf der [Pokémon](https://oliverjessner.at/category/pokemon/)-Gen-1-[Recompilation](https://oliverjessner.at/category/recomp/) auf und verwandelt die Oberwelt von Pokémon Rot in ein räumliches Voxel-Diorama.

Wer das Grundspiel und die Mod noch nicht eingerichtet hat, findet die vollständige Installation in meinem früheren Beitrag:

[Pokémon Rot in 3D: gen1recomp und Voxel-Mod installieren](https://oliverjessner.at/blog/2026-07-30-pokemon-rot-in-3d-gen1recomp-und-voxel-mod-installieren/)

Dieser Artikel konzentriert sich ausschließlich auf den aktuellen Kampfmodus, die Battle Camera und die Modelle aus Pokémon Stadium.

## Die Battle Camera bleibt bewusst kontrolliert

Die Kampfkamera ist keine völlig freie Kamera. Sie bewegt sich innerhalb eines festgelegten Bereichs, damit beide Pokémon, die Attacken und die Benutzeroberfläche im Bild bleiben.

Mit der Maus, dem rechten Analogstick oder einer Touch-Geste lässt sich die Perspektive seitlich um die Arena bewegen und anheben. Das Mausrad, Q und E, eine Pinch-Geste oder ein Stick-Klick verändern die Brennweite beziehungsweise den Abstand.

Die Kamera stoppt an den Grenzen, an denen die Bildkomposition nicht mehr funktionieren würde. Ganz rechts entsteht eine seitliche Perspektive, in der beide Pokémon ungefähr gleich weit von der Kamera entfernt sind. Beim Anheben oder Drehen passt die Mod den Bildausschnitt automatisch an.

Die zuletzt gewählte Position wird gespeichert. Der nächste Kampf beginnt deshalb mit derselben Perspektive.

Eine Ausnahme ist die Option "BACK SPRITES". Sie zeigt das eigene Pokémon weiterhin als klassischen Rückensprite im Menü. Da sich diese Darstellung nicht sinnvoll mit jeder Kameraposition kombinieren lässt, wird die Battle Camera in diesem Modus fixiert.

## Vier Varianten für 3D-Kämpfe

Die frühere Ein-Aus-Option wurde durch fünf Einstellungen ersetzt:

| Einstellung | Darstellung                                              |
| ----------- | -------------------------------------------------------- |
| 2D-3D A     | Game-Boy-Kampfbilder auf der aktuellen Karte             |
| 2D-3D B     | Game-Boy-Kampfbilder auf zwei schwebenden Plattformen    |
| STADIUM A   | Pokémon-Stadium-Modelle auf der aktuellen Karte          |
| STADIUM B   | Pokémon-Stadium-Modelle auf zwei schwebenden Plattformen |
| OFF         | Ursprünglicher 2D-Kampfbildschirm                        |

Die A-Varianten nutzen den tatsächlichen Ort des Kampfes. Licht, Tageszeit und Wetter der Karte bleiben sichtbar. Das wirkt besonders stimmig auf offenen Flächen, kann in engen Höhlen oder vollgestellten Innenräumen aber an Grenzen stoßen.

Die B-Varianten verzichten auf die Karte und stellen beide Pokémon auf getrennte Plattformen. Dadurch bleibt die Inszenierung unabhängig vom aktuellen Raum konsistent. Auch ohne Stadium-ROM steht mit "2D-3D B" eine räumliche Alternative zur Verfügung.

## Pokémon-Stadium-Modelle statt neuer Sprites

Die Bezeichnung "Stadium-Sprites" wäre eigentlich zu kurz gegriffen. Dramatic Shape verwendet die animierten 3D-Kampfmodelle aus Pokémon Stadium. Die Modelle werden beleuchtet, werfen Schatten und spielen abhängig von der verwendeten Attacke unterschiedliche Animationen ab.

Auch Einwechslungen, Ruheanimationen und das Besiegtwerden werden berücksichtigt. Effekte wie Glumandas Schwanzflamme oder Smogmogs Gas werden zusätzlich über dem Modell dargestellt.

Nach aktuellem Stand können 148 der 151 Pokémon als Modelle verwendet werden. Kokowei, Tangela und Magmar fallen wegen fehlerhafter Animationsdaten auf ihre Game-Boy-Kampfbilder zurück. Die Mod entscheidet das für jedes Pokémon einzeln. Ein fehlerhaftes Modell verhindert deshalb nicht, dass das gegnerische Pokémon weiterhin dreidimensional dargestellt wird.

Die Release Notes bezeichnen die Stadium-Unterstützung noch als initial. Einzelne Darstellungs- und Animationsfehler sind deshalb weiterhin möglich.

## Stadium-ROM importieren

Die Modelle sind nicht Bestandteil der Mod. Sie werden lokal aus einer eigenen Pokémon Stadium US 1.0 ROM erzeugt. Andere Regionen, Stadium 2 oder spätere Revisionen werden nicht unterstützt.

Unterstützt werden diese Dateiformate:

- `.z64`
- `.n64`
- `.v64`

Öffne im Spiel das Menü "OPTIONS" und wähle den Eintrag "STADIUM ROM". Auf macOS, Windows und unterstützten Linux-Systemen erscheint ein Dateidialog. Nach der Auswahl erstellt die Mod die benötigten Modelldateien. Der Vorgang dauert auf einem Desktop normalerweise nur wenige Sekunden.

Die ursprüngliche ROM wird anschließend nicht im Speicherordner der Mod behalten. Gespeichert werden nur die daraus erzeugten Modelle. Sobald der Import abgeschlossen ist, zeigt die Option "READY" an und die Einstellungen "STADIUM A" und "STADIUM B" werden verfügbar.

Auf Android sowie unter Linux ohne passenden Dateidialog kann die ROM alternativ in einen Ordner namens `baseroms` neben dem Spiel beziehungsweise im Speicherverzeichnis gelegt werden.

> **Hinweis:** Die Mod enthält keine ROM und verweist nicht auf Downloadquellen. Du musst die benötigte Datei selbst bereitstellen.

## Dramatic Shape 1.6 installieren

Lade die ZIP-Datei der [aktuellen Version](https://github.com/DramaticShape/DramaticShapeVoxelMod/releases/tag/v1.6.0) herunter. Entpacke sie nicht, sondern importiere sie direkt im Spiel über:

`MODS > Import mod .zip`

Anschließend findest du die neuen Einstellungen im Optionsmenü unter "3D-BTL". Für die klassischen 3D-Kämpfe mit Game-Boy-Grafiken ist keine zusätzliche ROM erforderlich. Nur die beiden Stadium-Modi benötigen den beschriebenen Import.

## Ein sinnvoller Ausbau statt eines kompletten Umbaus

Dramatic Shape 1.6 verändert nicht das Kampfsystem von Pokémon Rot. Werte, Attacken und Abläufe bleiben erhalten. Neu ist die Art, wie diese Kämpfe dargestellt werden.

Gerade deshalb wirkt das Update nachvollziehbar. Die Battle Camera erweitert die Inszenierung, ohne den Kampf unübersichtlich zu machen. Die Stadium-Modelle ersetzen die ursprüngliche Grafik dort, wo die passenden Daten vorhanden sind, und greifen andernfalls kontrolliert auf die Game-Boy-Bilder zurück.
