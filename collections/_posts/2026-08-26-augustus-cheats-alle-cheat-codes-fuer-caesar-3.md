---
layout: post
title: 'Augustus Cheats: Alle Cheat-Codes für Caesar 3'
date: 2026-08-26 08:04:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - gaming
    - emulation
    - recomp
description: 'Augustus Cheats für Caesar 3: Cheat-Modus aktivieren, Geld erhalten, Gebäude freischalten und Götter-Segen mit den richtigen IDs auslösen'
thumbnail: '/assets/images/gen/blog/augustus-cheats-alle-cheat-codes-fuer-caesar-3/header_thumbnail.webp'
image: '/assets/images/gen/blog/augustus-cheats-alle-cheat-codes-fuer-caesar-3/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Wie aktiviert man Cheats in Augustus?'
      answer: 'Öffne die Informationen eines Brunnens, drücke Alt+K und anschließend Alt+X. Danach öffnet sich die Konsole für die Augustus Cheat-Codes.'
    - question: 'Wie lautet der Geld-Cheat in Augustus?'
      answer: 'Mit addmoney gefolgt von einem Betrag lässt sich Geld hinzufügen. addmoney 10000 erhöht die Stadtkasse beispielsweise um 10.000 Denare.'
    - question: 'Welche IDs haben die Götter in Augustus?'
      answer: '0 steht für Ceres, 1 für Neptune, 2 für Mercury, 3 für Mars und 4 für Venus. Die IDs werden unter anderem bei blessing und curse verwendet.'
socialmedia:
    - 'Augustus hat eine eigene Cheat-Konsole. Brunnen anklicken, Alt+K, Alt+X und dann funktionieren Befehle wie addmoney, blessing oder whathaveromansdoneforus. Ich habe die wichtigsten Augustus Cheats samt IDs gesammelt.'
    - 'Der schnelle Augustus-Spickzettel: addmoney für Geld, whathaveromansdoneforus für alle Gebäude, blessing für Götter-Segen. Dazu die IDs für Ceres, Neptune, Mercury, Mars und Venus.'
    - '0 = Ceres, 1 = Neptune, 2 = Mercury, 3 = Mars, 4 = Venus. Falls du in Augustus gezielt blessing oder curse nutzen willst, sind genau diese God IDs entscheidend.'
---

Augustus bringt Caesar 3 nicht nur neue Systeme, sondern auch eine eigene Cheat-Konsole. Hier findest du die wichtigsten Befehle, IDs und Beispiele.

## Augustus Cheats aktivieren

Wer nach "Augustus Cheats", "Caesar 3 Augustus Cheats" oder den verfügbaren Console Commands sucht, landet schnell bei alten Caesar-3-Cheatlisten. Augustus besitzt allerdings zusätzlich eine eigene Konsole, über die sich deutlich mehr Funktionen aufrufen lassen.

Augustus ist ein Fork des Julius-Projekts und erweitert Caesar 3 um zahlreiche Gameplay-Funktionen. Es handelt sich also nicht um eine klassische [Emulation](https://oliverjessner.at/emulation/), sondern um eine Neuimplementierung der Engine, die weiterhin die Originaldateien von Caesar 3 benötigt.

Um die Cheat-Konsole zu aktivieren:

1. Baue einen Brunnen.
2. Klicke den Brunnen mit der rechten Maustaste an, sodass das Informationsfenster geöffnet ist.
3. Drücke `Alt+K`.
4. Drücke anschließend `Alt+X`.
5. Die Konsole öffnet sich. Dort kannst du einen Befehl eingeben und mit Enter ausführen.

In aktuellen Augustus-Builds kann der Cheat-Modus laut Quellcode auch über einen Springbrunnen aktiviert werden. Der klassische und in der Dokumentation beschriebene Weg führt jedoch über einen normalen Brunnen.

Auf einem Mac entspricht die Alt-Taste der Option-Taste `⌥`.

## Augustus Geld-Cheat

Der wahrscheinlich praktischste Augustus Cheat ist `addmoney`. Anders als beim ursprünglichen Caesar 3 muss man damit nicht mehrfach eine Tastenkombination drücken, sondern kann direkt einen Betrag angeben.

Beispiel:

```text
addmoney 10000
```

Damit werden 10.000 Denare zur Stadtkasse hinzugefügt.

Auch der klassische Caesar-3-Geld-Cheat ist nach Aktivierung des Cheat-Modus weiterhin vorhanden:

`Alt+C` fügt 1.000 Denare hinzu, solange die Stadtkasse unter 5.000 Denaren liegt.

Für größere Beträge ist `addmoney` deshalb wesentlich komfortabler.

## Alle Augustus Cheat-Codes im Überblick

Die folgende Liste enthält die regulären Cheats sowie zusätzliche Befehle, die im aktuellen Augustus-Quellcode vorhanden sind.

| Cheat                                 | Funktion                                             | Beispiel                  |
| ------------------------------------- | ---------------------------------------------------- | ------------------------- |
| `addmoney <betrag>`                   | Fügt Geld zur Stadtkasse hinzu                       | `addmoney 10000`          |
| `startinvasion <typ> <größe> <punkt>` | Startet einen frei konfigurierbaren Angriff          | `startinvasion 0 100 1`   |
| `nextyear`                            | Springt zwölf Monate vorwärts                        | `nextyear`                |
| `blessing <god_id>`                   | Löst den Segen eines Gottes aus                      | `blessing 4`              |
| `curse <god_id> <major>`              | Löst den Fluch eines Gottes aus                      | `curse 4 1`               |
| `showtooltip <0/1>`                   | Zeigt Koordinaten unter dem Mauszeiger an            | `showtooltip 1`           |
| `killall`                             | Entfernt Menschen und Tiere auf der Karte            | `killall`                 |
| `finishmonuments`                     | Stellt alle im Bau befindlichen Monumente fertig     | `finishmonuments`         |
| `monumentphase <phase>`               | Setzt Monumente auf eine bestimmte Bauphase          | `monumentphase 3`         |
| `whathaveromansdoneforus`             | Schaltet Gebäude und verfügbare Ressourcen frei      | `whathaveromansdoneforus` |
| `nike`                                | Löst einen stadtweiten Aufstand aus                  | `nike`                    |
| `romanconcrete`                       | Macht Gebäude gegen Zerstörung immun                 | `romanconcrete`           |
| `globalwarming <climate>`             | Ändert das Klima des Szenarios                       | `globalwarming 1`         |
| `ihaveanarmy`                         | Schaltet zusätzliche Legionen frei                   | `ihaveanarmy`             |
| `breadandfish`                        | Deaktiviert den Ressourcenverbrauch der Legionen     | `breadandfish`            |
| `leavemealone`                        | Deaktiviert Invasionen und beendet laufende Angriffe | `leavemealone`            |
| `weather <typ> <intensität>`          | Ändert das Wetter                                    | `weather 1 500`           |
| `destroy <building_id> <typ>`         | Zerstört gezielt ein Gebäude                         | `destroy 123 1`           |
| `debug.customevents`                  | Öffnet die Verwaltung eigener Szenario-Events        | `debug.customevents`      |
| `debug.showeditor`                    | Öffnet Funktionen des Szenario-Editors               | `debug.showeditor`        |

Einige dieser Befehle gehören eher in den Debug- und Entwicklungsbereich als in ein normales Spiel. Besonders `destroy`, `killall`, `nike` und die beiden `debug`-Befehle können den Zustand eines Szenarios stark verändern.

Ich würde deshalb vor Experimenten einen separaten Spielstand anlegen.

## Augustus Götter-Cheats: Ceres, Neptune, Mercury, Mars und Venus

Bei `blessing` und `curse` erwartet Augustus nicht den Namen des Gottes, sondern eine numerische ID.

Die Zuordnung lautet:

|  ID | Gott    |
| --: | ------- |
| `0` | Ceres   |
| `1` | Neptune |
| `2` | Mercury |
| `3` | Mars    |
| `4` | Venus   |

Das ist vor allem deshalb wichtig, weil ein Befehl wie

```text
blessing 4
```

nicht den vierten Eintrag bei einer Zählung ab eins meint. `4` steht direkt für Venus.

Für Ceres lautet der Befehl entsprechend:

```text
blessing 0
```

Für Mercury:

```text
blessing 2
```

Und für Mars:

```text
blessing 3
```

Die komplette Zuordnung zum Kopieren:

```text
0 = Ceres
1 = Neptune
2 = Mercury
3 = Mars
4 = Venus
```

## Einen Fluch mit curse auslösen

Das Gegenstück zu `blessing` ist `curse`.

Die Syntax lautet:

```text
curse <god_id> <is_major>
```

Der erste Wert ist wieder die God ID. Der zweite Wert bestimmt, ob ein kleiner oder großer Fluch ausgelöst wird:

```text
0 = Minor Curse
1 = Major Curse
```

Ein großer Venus-Fluch sieht damit beispielsweise so aus:

```text
curse 4 1
```

Ein kleiner Ceres-Fluch:

```text
curse 0 0
```

Gerade zum Testen eigener Städte oder Szenarien kann das interessanter sein als reine Komfort-Cheats. Man kann damit gezielt ausprobieren, wie stabil die eigene Versorgung auf bestimmte Ereignisse reagiert.

## Alle Gebäude in Augustus freischalten

Einer der bekanntesten Augustus Cheat-Codes lautet:

```text
whathaveromansdoneforus
```

Der Name spielt auf "What have the Romans ever done for us?" aus Monty Pythons "Life of Brian" an.

Der Cheat schaltet die Gebäudemenüs frei. Im aktuellen Augustus-Code werden dabei zusätzlich Ressourcen und szenariobedingte Gebäudefreigaben entsperrt.

Das ist vor allem für Sandbox-Städte praktisch, wenn man nicht erst die normalen Bedingungen eines Szenarios erfüllen möchte.

## Invasionen selbst starten

Mit `startinvasion` lässt sich ein Angriff gezielt erzeugen.

Die Syntax:

```text
startinvasion <typ> <größe> <invasionspunkt>
```

Für den Typ gelten folgende IDs:

|  ID | Angreifer     |
| --: | ------------- |
| `0` | Barbaren      |
| `1` | Caesars Armee |
| `2` | Einheimische  |

Die Größe kann zwischen `0` und `150` liegen. Der Invasionspunkt wird mit einer Zahl von `1` bis `8` angegeben.

Beispiel:

```text
startinvasion 0 150 3
```

Damit startet eine große Barbaren-Invasion am dritten Invasionspunkt.

Anmerkung: Laut diesem [Pull Request](https://github.com/Keriew/augustus/pull/106) sollte startinvasion so funktionieren. Bei mir auf dem Mac ist es jedoch so, dass der type-Parameter bei 0 und 1 immer Barbaren sendet. Bei 2 stürzt mein Spiel ab. Vielleicht verhält sich das unter Windows anders.

## Invasionen komplett deaktivieren

Wer das genaue Gegenteil möchte, kann den aktuellen Augustus-Befehl

```text
leavemealone
```

verwenden.

Damit werden Invasionen deaktiviert. Eine bereits aktive Invasion wird ebenfalls entfernt.

Das eignet sich beispielsweise für Städte, bei denen man sich ausschließlich auf Wirtschaft, Stadtplanung oder Monumente konzentrieren möchte.

## Augustus Wetter-Cheats

Aktuelle Augustus-Builds besitzen auch einen Wetter-Befehl:

```text
weather <weather_type> <intensity>
```

Die Weather IDs sind:

|  ID | Wetter            |
| --: | ----------------- |
| `0` | Kein Wettereffekt |
| `1` | Regen             |
| `2` | Schnee            |
| `3` | Sand              |

Beispiel für Regen:

```text
weather 1 500
```

Die Intensität beeinflusst die Darstellung des Wetters. Der Befehl ist damit vor allem für Szenario-Tests und Experimente interessant.

## Monumente sofort fertigstellen

Wer die Monumente von Augustus ausprobieren möchte, muss nicht zwingend den gesamten Bauprozess abwarten.

Mit

```text
finishmonuments
```

werden Monumente, die sich gerade im Bau befinden, fertiggestellt.

Alternativ kann mit `monumentphase` eine bestimmte Bauphase gesetzt werden:

```text
monumentphase 3
```

Die regulären Werte reichen von Phase `1` bis `5`.

Das ist beispielsweise hilfreich, wenn man untersuchen möchte, wie eine bestimmte Bauphase aussieht oder ob die eigene Logistik für spätere Monumentabschnitte funktioniert.

## Zusätzliche Legionen freischalten

Mit

```text
ihaveanarmy
```

werden zusätzliche Legionen freigeschaltet.

Dazu gibt es einen zweiten militärischen Cheat:

```text
breadandfish
```

Dieser deaktiviert den normalen Ressourcenverbrauch der Legionen.

Gerade bei großen Schlachten lässt sich Augustus damit stärker in Richtung Sandbox spielen, ohne zuerst die gesamte militärische Versorgung aufbauen zu müssen.

## Sofort gewinnen mit Alt+V

Neben den Console Commands gibt es noch einen klassischen Tastatur-Cheat.

Nachdem der Cheat-Modus über `Alt+K` aktiviert wurde, führt

```text
Alt+V
```

direkt zum Sieg im aktuellen Szenario.

Das ist praktisch, wenn man eine Mission nur überspringen oder einen bestimmten Abschnitt einer Kampagne testen möchte.

Für einen normalen Durchlauf würde ich dagegen eher bei einzelnen Console Commands bleiben. Viele der Augustus Cheats eignen sich besser zum Testen und Experimentieren als zum eigentlichen Durchspielen.

## Wenn Alt+K oder Alt+X nicht funktioniert

Falls sich die Augustus Cheat-Konsole nicht öffnen lässt, sollte zuerst geprüft werden, ob das Informationsfenster des Brunnens tatsächlich geöffnet ist.

Die Reihenfolge ist wichtig:

```text
Brunnen bauen
Rechtsklick auf den Brunnen
Alt+K
Alt+X
```

Einfach `Alt+X` während des normalen Spiels zu drücken reicht nicht.

Auf macOS ist außerdem zu beachten, dass die mit `Alt` bezeichnete Taste normalerweise `Option` beziehungsweise `⌥` ist.

Bei unterschiedlichen Augustus-Versionen können einzelne Console Commands außerdem fehlen oder neu hinzukommen. Besonders die Debug-Befehle und einige der neueren Cheats entwickeln sich mit Augustus weiter.

Für die normalen Cheats wie `addmoney`, `blessing`, `nextyear`, `finishmonuments` und `whathaveromansdoneforus` bleibt das Grundprinzip jedoch gleich: Cheat-Modus aktivieren, Konsole öffnen, Befehl eingeben.
