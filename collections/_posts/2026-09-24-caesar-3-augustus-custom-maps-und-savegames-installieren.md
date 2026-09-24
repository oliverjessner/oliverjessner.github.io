---
layout: post
title: 'Caesar 3 Augustus: Custom Maps und Savegames installieren'
date: 2026-09-24 13:55:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - gaming
    - macos
    - linux
    - recomp
description: 'Neue Karten für Caesar 3: So findest und installierst du Custom Maps und .svx-Savegames für Augustus unter macOS, Windows und Linux'
thumbnail: '/assets/images/gen/blog/caesar-3-augustus-custom-maps-und-savegames-installieren/header_thumbnail.webp'
image: '/assets/images/gen/blog/caesar-3-augustus-custom-maps-und-savegames-installieren/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Wo finde ich Custom Maps für Caesar 3 und Augustus?'
      answer: 'Eine große Auswahl gibt es bei Caesar 3 Heaven. Eine umfangreiche Sammlung der dort veröffentlichten Custom Maps steht außerdem auf ModDB zum Download bereit.'
    - question: 'Was sind .svx-Dateien bei Augustus?'
      answer: '.svx-Dateien sind Savegames von Augustus. Sie werden über Load Game geladen und erscheinen deshalb nicht in der Liste der Custom Maps.'
    - question: 'Wo müssen Custom Maps und Savegames für Augustus gespeichert werden?'
      answer: 'Das hängt von der Augustus-Konfiguration ab. In klassischen Installationen liegen die Dateien im Caesar-3-Datenverzeichnis. Neuere Versionen können dafür ein separates Benutzerverzeichnis mit Unterordnern verwenden.'
socialmedia:
    - 'Neue Caesar-3-Karten für Augustus: Wo du Custom Maps findest, was der Unterschied zwischen .map und .svx ist und wohin die Dateien unter macOS, Windows und Linux gehören.'
    - 'Eine Augustus-Map taucht nicht unter Custom Scenarios auf? Wenn die Datei auf .svx endet, ist sie ein Savegame. Ich zeige, wo sie hingehört und wie du sie lädst.'
    - 'Caesar 3 endet nicht mit der Originalkampagne. Community-Maps und Augustus-Savegames bringen neue Szenarien ins Spiel. Hier sind Downloadquellen und Installation erklärt.'
---

Caesar 3 lässt sich mit Augustus weit über die ursprüngliche Kampagne hinaus spielen. Community-Maps und vorbereitete Savegames bringen neue Städte, Regeln und Szenarien ins Spiel.

## Caesar 3 Augustus Custom Maps: .map und .svx sind nicht dasselbe

Wer nach neuen Karten für Caesar 3 oder Augustus sucht, trifft schnell auf unterschiedliche Dateiformate. Besonders wichtig ist der Unterschied zwischen `.map` und `.svx`.

Eine `.map`-Datei ist eine klassische Custom Map beziehungsweise ein eigenes Szenario. Solche Dateien erscheinen in Augustus normalerweise unter der Auswahl für benutzerdefinierte Szenarien.

Eine `.svx`-Datei ist dagegen ein Savegame von Augustus. Sie wird nicht als neue Karte in der Liste der Custom Scenarios angezeigt, sondern über "Load Game" geladen.

Das ist vor allem bei Community-Szenarien wichtig. Ein Download kann durchaus nur aus einer oder mehreren `.svx`-Dateien bestehen. Dann wurde nicht die rohe Karte veröffentlicht, sondern ein vorbereiteter Spielstand.

Kurz gesagt:

| Dateiendung | Inhalt                        | Start in Augustus |
| ----------- | ----------------------------- | ----------------- |
| `.map`      | Custom Map oder Szenario      | Custom Scenarios  |
| `.svx`      | Augustus-Savegame             | Load Game         |
| `.sav`      | klassisches Caesar-3-Savegame | Load Game         |

Augustus verwendet für eigene Spielstände `.svx`, damit sie einfacher von klassischen Caesar-3-Savegames unterschieden werden können.

## Wo gibt es Custom Maps für Caesar 3 und Augustus?

Eine der wichtigsten Quellen für neue Caesar-3-Karten ist seit vielen Jahren Caesar 3 Heaven. Dort finden sich klassische Caesar-III-Szenarien ebenso wie Karten, die speziell für Augustus erstellt wurden.

Eine praktische Alternative ist die Sammlung auf ModDB:

[Caesar 3 Heaven Custom Maps Collection auf ModDB](https://www.moddb.com/games/caesar-iii/addons/caesar-3-heaven-custom-maps-collection)

Das Paket bündelt eine große Zahl der auf Caesar 3 Heaven veröffentlichten Custom Maps und ist deshalb ein guter Ausgangspunkt, wenn man nicht jede Karte einzeln herunterladen möchte.

Für neuere Augustus-Szenarien lohnt sich trotzdem ein Blick auf die Community rund um das Projekt. Moderne Karten können Funktionen nutzen, die das ursprüngliche Caesar III nicht kannte, darunter zusätzliche Ereignisse, neue Siegbedingungen oder speziell konfigurierte Handelsbeziehungen.

Wer Augustus noch nicht eingerichtet hat, findet hier meine vollständige Anleitung:

[Caesar 3 auf Windows, macOS und Linux spielen mit Julius oder Augustus](https://oliverjessner.at/blog/2026-08-03-caesar-3-auf-windows-macos-und-linux-spielen-mit-julius-oder-augustus/)

## Custom Maps für Augustus unter macOS installieren

Unter [macOS](https://oliverjessner.at/category/macos/) ist zunächst wichtig zu wissen, welches Caesar-3-Verzeichnis Augustus verwendet.

Augustus bringt die ursprünglichen Spieldaten von Caesar III nicht selbst mit. Beim ersten Start wird deshalb ein vorhandenes Caesar-3-Datenverzeichnis ausgewählt.

Ein solches Verzeichnis kann beispielsweise so aussehen:

```text
/Users/deinname/games/pc/caesar3/
```

Darin befinden sich typischerweise Dateien wie:

```text
c3.eng
c3.exe
C3.sg2
Caesarea.map
Carthago.map
autosave.svx
```

Wenn deine Installation so aufgebaut ist, können zusätzliche `.map`- oder `.svx`-Dateien ebenfalls in diesem Verzeichnis liegen.

Beispiel:

```text
caesar3/
├── c3.eng
├── c3.exe
├── Caesarea.map
├── Carthago.map
├── Meine-Custom-Map.map
├── Dune-Conquest-of-Arrakis.svx
└── autosave.svx
```

Anschließend Augustus vollständig beenden und neu starten.

## Eine .svx-Datei in Augustus laden

Wenn der Download nur `.svx`-Dateien enthält, musst du nicht im Menü für Custom Maps suchen.

Gehe stattdessen in Augustus auf:

```text
Load Game
```

Dort sollte der kopierte Spielstand erscheinen.

Genau hier entsteht häufig Verwirrung: Eine Datei kann zu einem Community-Szenario gehören und trotzdem nicht als `.map` veröffentlicht worden sein. Bei einer `.svx` lädst du einen bereits vorbereiteten Spielstand.

Eine `.svx` sollte auch nicht einfach in `.map` umbenannt werden. Die Dateiformate enthalten unterschiedliche Daten und sind nicht durch eine Änderung der Dateiendung austauschbar.

## Eine .map-Datei in Augustus starten

Bei einer echten `.map`-Datei funktioniert der Ablauf anders.

Kopiere die Karte zunächst in das von Augustus verwendete Caesar-3-Verzeichnis beziehungsweise das konfigurierte Kartenverzeichnis.

Starte danach Augustus neu und öffne die Auswahl für benutzerdefinierte Szenarien.

Dort sollte die Karte anhand ihres Szenarionamens erscheinen.

Wenn bereits Karten wie Caesarea, Carthago, Cyrene oder Corinthus sichtbar sind, kannst du dich an deren Speicherort orientieren. Deine neue `.map` gehört in denselben Bereich.

## Neuere Augustus-Versionen können Unterordner verwenden

Bei neueren Builds von Augustus kann die Verzeichnisstruktur anders aussehen als bei älteren Installationen.

Unter:

```text
Options
→ General Settings
→ Set user directory
```

lässt sich festlegen, wo Augustus persönliche Dateien speichert.

Wurde dort ein Benutzerverzeichnis mit Unterordnern aktiviert, solltest du diese von Augustus angelegte Struktur verwenden, statt Dateien wahllos in das Hauptverzeichnis zu kopieren.

Das ist besonders relevant, wenn Anleitungen im Netz unterschiedliche Ordner nennen. Augustus wurde über die Jahre erweitert und die Verwaltung von Maps, Kampagnen und zusätzlichen Szenariodaten hat sich ebenfalls weiterentwickelt.

Wenn du nicht sicher bist, ist der einfachste Test ein bereits vorhandenes Savegame. Suche beispielsweise nach `autosave.svx`. Dort, wo Augustus seine eigenen `.svx`-Dateien speichert, gehört in der Regel auch ein heruntergeladenes Augustus-Savegame hin.

## Installation unter Windows und Linux

Das Prinzip ist unter [Linux](https://oliverjessner.at/category/linux/) und Windows identisch. Entscheidend ist nicht das Betriebssystem, sondern das Caesar-3-Datenverzeichnis, das Augustus verwendet.

Unter Windows ist das häufig der Installationsordner der GOG- oder Steam-Version.

Unter Linux kann es das über InnoExtract extrahierte Caesar-3-Verzeichnis sein.

Augustus kann auch getrennt von diesen Spieldaten installiert sein. In diesem Fall sollte man nicht automatisch den Ordner der Augustus-Anwendung verwenden. Entscheidend ist das Verzeichnis mit den eigentlichen Caesar-3-Dateien.

## Warum erscheint meine Augustus Custom Map nicht?

Wenn eine heruntergeladene Caesar-3-Map nicht auftaucht, sind meistens einige wenige Ursachen verantwortlich.

### Die Datei endet auf .svx

Dann handelt es sich um ein Savegame. Suche unter "Load Game" und nicht unter "Custom Scenarios".

### Das Archiv wurde noch nicht entpackt

Dateien in `.zip`, `.7z` oder `.rar` müssen zuerst entpackt werden. Augustus kann die darin enthaltenen Maps nicht direkt laden.

### Die Datei liegt im falschen Caesar-3-Ordner

Gerade auf macOS kann Augustus als eigene Anwendung installiert sein, während die Caesar-3-Daten an einer völlig anderen Stelle liegen.

Überprüfe deshalb, welches Verzeichnis Augustus tatsächlich verwendet.

### Ein separates User Directory ist aktiviert

Dann kann Augustus Savegames und andere Dateien in einer eigenen Ordnerstruktur speichern.

### Augustus wurde nach dem Kopieren nicht neu gestartet

Nach dem Hinzufügen einer neuen Map oder eines Savegames ist ein kompletter Neustart die einfachste Methode, um sicherzustellen, dass die Datei erkannt wird.

### Das Szenario benötigt zusätzliche Dateien

Komplexere Augustus-Projekte können neben einer Map weitere Daten mitbringen. Dazu können beispielsweise eigene Kampagneninhalte, Ereignisse, Bilder oder Empire-Konfigurationen gehören.

In diesem Fall sollte die mitgelieferte Ordnerstruktur erhalten bleiben.

## Custom Maps machen Caesar 3 erstaunlich langlebig

Caesar III erschien ursprünglich 1998. Trotzdem entstehen noch immer neue Szenarien, Kampagnen und Varianten für das Spiel.

Ein wesentlicher Grund dafür ist Augustus. Das Projekt erweitert Caesar III nicht nur technisch, sondern stellt Map-Erstellern zusätzliche Mechaniken zur Verfügung. Dadurch können Community-Szenarien wesentlich stärker von den ursprünglichen Missionen abweichen.

Gerade wenn man die klassische Kampagne bereits mehrfach gespielt hat, sind Custom Maps deshalb eine der interessantesten Möglichkeiten, noch einmal zu [Gaming](https://oliverjessner.at/category/gaming/) mit Caesar 3 zurückzukehren.

Und wer beim Testen einer besonders schwierigen Community-Map etwas experimentieren möchte, findet hier außerdem meine Übersicht der verfügbaren Cheats:

[Augustus Cheats: Alle Cheat Codes für Caesar 3](https://oliverjessner.at/blog/2026-08-26-augustus-cheats-alle-cheat-codes-fuer-caesar-3/)

## Fazit

Für Custom Maps und Savegames in Augustus ist vor allem die Dateiendung entscheidend.

`.map` steht für eine Karte beziehungsweise ein Szenario und wird über die Custom-Scenario-Auswahl gestartet. `.svx` ist ein Augustus-Savegame und wird über "Load Game" geladen.

Wer nur `.svx`-Dateien heruntergeladen hat, muss deshalb nicht weiter nach einer fehlenden `.map` suchen. Der Spielstand selbst ist der Einstieg in das Community-Szenario.

Als Ausgangspunkt für neue Karten eignet sich besonders die [Caesar 3 Heaven Custom Maps Collection auf ModDB](https://www.moddb.com/games/caesar-iii/addons/caesar-3-heaven-custom-maps-collection). In Kombination mit Augustus lässt sich Caesar III damit noch viele Jahre nach der ursprünglichen Veröffentlichung mit neuen Szenarien spielen.
