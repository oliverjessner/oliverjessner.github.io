---
layout: post
title: 'Pokemon Rot in 3D: gen1recomp und Voxel-Mod installieren'
date: 2026-07-30 08:30:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - pokemon
    - recomp
    - emulation
    - nintendo
    - gaming
description: 'So verwandelst du Pokemon Rot und Blau mit gen1recomp und DramaticShapeVoxelMod in ein spielbares 3D-Diorama'
thumbnail: '/assets/images/gen/blog/pokemon-rot-in-3d-gen1recomp-und-voxel-mod-installieren/header_thumbnail.webp'
image: '/assets/images/gen/blog/pokemon-rot-in-3d-gen1recomp-und-voxel-mod-installieren/header.webp'
image_alt: 'Pokemon Rot mit gen1recomp in 3D'
image_width: 1280
image_height: 854
faq:
    - question: 'Wie kann ich Pokemon Rot mit gen1recomp in 3D spielen?'
      answer: 'Installiere gen1recomp, importiere eine unterstützte US-ROM von Pokemon Rot oder Blau und füge die DramaticShapeVoxelMod als ZIP über den Mod-Manager hinzu.'
    - question: 'Welche Pokemon-ROM benötigt gen1recomp?'
      answer: 'Für Pokemon Rot und Blau werden die kanonischen 1 MiB großen US-ROMs benötigt. Die Anwendung überprüft die Dateien beim Import anhand ihrer SHA-1-Prüfsumme.'
    - question: 'Funktioniert DramaticShapeVoxelMod auch mit Pokemon Gelb?'
      answer: 'Pokemon Gelb wird im aktuellen Launcher von gen1recomp als Alpha gekennzeichnet. Für einen stabileren Einstieg empfiehlt sich daher Pokemon Rot oder Blau.'
socialmedia:
    - 'Pokemon Rot in 3D spielen: Mit gen1recomp und DramaticShapeVoxelMod wird Kanto zum begehbaren Voxel-Diorama. So funktionieren Installation, ROM-Import, 3D-Kämpfe und die wichtigsten Einstellungen.'
    - 'gen1recomp bringt Pokemon Rot und Blau nativ auf macOS, Windows, Linux und Android. Mit einer einzigen Mod-ZIP entstehen echte 3D-Geometrie, Schatten und Kämpfe direkt auf der Karte.'
    - 'Voxel 35, 50 oder 75? V-Curve, 3D-Kämpfe, Wasser als Kartenrand und höhere Spielgeschwindigkeit: Ich zeige, wie sich Pokemon Rot mit gen1recomp modernisiert, ohne das Grundspiel umzubauen.'
---

gen1recomp bringt Pokémon Rot und Blau nativ auf moderne Systeme. Mit DramaticShapeVoxelMod wird Kanto zum 3D-Diorama, ohne Kartenlogik oder Spielstand grundlegend zu verändern.

## Pokemon Rot in 3D: Was hinter gen1recomp steckt

Mit [gen1recomp](https://github.com/bryanthaboi/gen1recomp) lassen sich Pokémon Rot und Blau auf aktuellen Systemen ausführen. Fertige Versionen stehen für Android, Linux, macOS und Windows bereit.

Der Name erinnert an klassische Recompilation-Projekte. Technisch handelt es sich aber nicht um einen Game-Boy-Emulator und auch nicht um eine direkte Übersetzung des ursprünglichen Maschinencodes. Die Engine und das Verhalten der Karten wurden in Lua für LÖVE2D neu umgesetzt. Spieldaten und Grafiken liest gen1recomp beim ersten Start aus einer vom Spieler bereitgestellten ROM aus.

Nach dem Import werden die benötigten Daten in einem privaten Cache gespeichert. Bei späteren Starts muss die ROM daher nicht erneut ausgewählt werden. Pokémon Rot und Blau können zudem parallel importiert und mit getrennten Spielständen verwendet werden.

Der Ablauf erinnert an Projekte wie [Banjo Recompiled](https://oliverjessner.at/banjo-recompiled-mod-installieren/). Die technische Umsetzung unterscheidet sich, das praktische Prinzip ist jedoch ähnlich: Eine moderne Anwendung übernimmt die Ausführung, während die eigentlichen Spieldaten aus der eigenen Kopie des Spiels stammen.

## Was für die Installation benötigt wird

Für Pokémon Rot oder Blau in 3D werden drei Dateien beziehungsweise Komponenten benötigt:

1. Eine aktuelle Version von [gen1recomp aus dem Release-Bereich](https://github.com/bryanthaboi/gen1recomp/releases)
2. Die ZIP-Datei der [DramaticShapeVoxelMod](https://github.com/DramaticShape/DramaticShapeVoxelMod/releases)
3. Eine selbst ausgelesene und rechtmäßig erworbene US-ROM von Pokémon Rot oder Blau

Die Mod-Datei muss nicht entpackt werden. gen1recomp kann das heruntergeladene ZIP-Archiv direkt über den integrierten Mod-Manager importieren.

> **Hinweis:** gen1recomp enthält keine ROM und lädt auch keine Spieldaten aus dem Internet. Benötigt wird eine eigene, unterstützte ROM-Datei. Diese Anleitung beschreibt nicht die Beschaffung von ROMs.

## Welche ROM-Version funktioniert?

gen1recomp überprüft die ausgewählte ROM beim Import. Für Pokémon Rot und Blau werden die kanonischen, jeweils 1 MiB großen US-Versionen akzeptiert.

| Edition      | SHA-1-Prüfsumme                            |
| ------------ | ------------------------------------------ |
| Pokémon Rot  | `ea9bcae617fdf159b045185467ae58b2e4a48b9a` |
| Pokémon Blau | `d7037c83e1ae5b39bde3c30787637ba1d4c48ce2` |

![Pokémon Rot in gen1recomp mit dreidimensional dargestellter Spielwelt](/assets/images/gen/blog/pokemon-rot-in-3d-gen1recomp-und-voxel-mod-installieren/gen1recomp_game.webp)

Wird eine andere Revision, eine übersetzte Version oder eine bereits veränderte ROM verwendet, kann der Import abgelehnt werden. Das ist bei Recompilation- und Rekonstruktionsprojekten üblich, da sich Speicheradressen und enthaltene Daten zwischen den Versionen unterscheiden können.

Pokémon Gelb ist ebenfalls im Launcher sichtbar, wird dort derzeit jedoch ausdrücklich als Alpha bezeichnet. Für diese Anleitung verwende ich deshalb Pokémon Rot oder Blau.

## gen1recomp auf macOS, Windows, Linux oder Android installieren

Zuerst wird die passende gen1recomp-Version aus dem Release-Bereich heruntergeladen. Unter Windows, Linux und macOS wird die jeweilige Desktop-Version verwendet. Für Android steht eine APK-Datei bereit.

Nach dem Start zeigt gen1recomp die verfügbaren Editionen an. Hier wählt man Pokémon Rot oder Pokémon Blau aus und gibt anschließend die eigene `.gb`-Datei an. Alternativ kann die ROM bei den Desktop-Versionen direkt in das Fenster gezogen werden.

Der Import dauert normalerweise nur wenige Sekunden. Die Anwendung überprüft die Datei, extrahiert die benötigten Grafiken und Spieldaten und legt daraus einen lokalen Cache an.

Rot und Blau lassen sich unabhängig voneinander importieren. Wer beide Editionen besitzt, kann sie daher innerhalb derselben Installation auswählen und mit separaten Spielständen spielen.

## DramaticShapeVoxelMod als ZIP installieren

Die DramaticShapeVoxelMod wird über den Launcher von gen1recomp hinzugefügt:

1. Die aktuelle Mod-Version als ZIP herunterladen
2. gen1recomp öffnen
3. Im Launcher den Bereich "Mods" auswählen
4. Die heruntergeladene ZIP-Datei hinzufügen
5. Die Mod aktivieren
6. Zum Menü von Pokémon Rot oder Blau zurückkehren
7. Das Spiel starten

Das ZIP-Archiv sollte nicht vorher entpackt werden. Der Mod-Manager erwartet die von der Release-Seite bereitgestellte Paketstruktur.

![Mod-Verwaltung von gen1recomp mit aktivierter DramaticShapeVoxelMod](/assets/images/gen/blog/pokemon-rot-in-3d-gen1recomp-und-voxel-mod-installieren/gen1recomp_mods.webp)

Falls das Spiel bereits ohne Mod gestartet wurde, sollte es nach der Aktivierung neu geöffnet werden. Mods werden beim Start in die Laufzeitumgebung eingebunden.

## Was DramaticShapeVoxelMod verändert

Die DramaticShapeVoxelMod verwandelt die zweidimensionale Spielwelt in ein räumliches Diorama. Wege, Wasserflächen, Gebäude und andere Elemente werden als echte Geometrie dargestellt. Figuren bleiben weitgehend zweidimensionale Sprites, stehen aber als geneigte Flächen in der dreidimensionalen Umgebung.

Zusätzlich verwendet die Mod einen Tiefenpuffer, Schatten und auf Wunsch einen Tilt-Shift-Effekt. Dadurch wirkt die Welt wie ein kleines physisches Modell.

Die Veränderungen sind rein visuell. Kollisionen, Bewegungen, Ereignisse, Skripte und Kartenübergänge werden von der Mod nicht verändert. Die dreidimensionale Darstellung macht Kanto also nicht größer und erzeugt keine neuen begehbaren Bereiche.

Damit bleibt das eigentliche [Pokemon](https://oliverjessner.at/category/Pokemon/)-Spiel weitgehend erhalten. Die Mod verändert vor allem die Perspektive und Präsentation.

## Voxel 35, 50 oder 75 einstellen

Nach dem Start befinden sich im normalen Optionsmenü mehrere neue Einstellungen. Die wichtigste davon ist "VOXEL".

![Optionsmenü von Pokémon Rot mit Einstellungen für Voxel, V-Curve und 3D-Kämpfe](/assets/images/gen/blog/pokemon-rot-in-3d-gen1recomp-und-voxel-mod-installieren/menu.webp)

Folgende Stufen stehen zur Auswahl:

- OFF
- 15
- 35
- 50
- 75

Der Wert beeinflusst vor allem den Winkel der Kamera. Je höher die Einstellung ist, desto stärker blickt man von oben auf die dreidimensional aufgebaute Welt.

Voxel 35 ist für mich ein guter Einstieg. Die räumliche Wirkung ist bereits deutlich sichtbar, während die ursprüngliche Kartenstruktur gut lesbar bleibt. Bei Voxel 50 wirkt die Spielwelt stärker wie ein Diorama. Voxel 75 erzeugt den auffälligsten 3D-Effekt, kann in engen Innenräumen aber unübersichtlicher wirken.

Für Vergleichsbilder bieten sich daher besonders die Einstellungen 35, 50 und 75 an. Sie zeigen gut, wie stark sich die Wirkung allein durch den Kamerawinkel verändert.

![Pokémon Rot mit Voxel-Stufe 35 und V-Curve 2](/assets/images/gen/blog/pokemon-rot-in-3d-gen1recomp-und-voxel-mod-installieren/voxel_35_v_curve2.webp)
![Pokémon Rot mit Voxel-Stufe 50 und V-Curve 2](/assets/images/gen/blog/pokemon-rot-in-3d-gen1recomp-und-voxel-mod-installieren/voxel_50_v_curve2.webp)
![Pokémon Rot mit Voxel-Stufe 75 und V-Curve 2](/assets/images/gen/blog/pokemon-rot-in-3d-gen1recomp-und-voxel-mod-installieren/voxel_75_v_curve2.webp)

## Mit V-Curve die Welt abrunden

Die Option "V-CURVE" krümmt die dargestellte Welt in Richtung Horizont. Verfügbar sind die Stufen OFF, 1, 2 und 3.

Mit V-Curve 2 entsteht eine gut sichtbare vertikale Rundung, ohne dass die Karte zu stark verzerrt wird. Höhere Werte verstärken den Diorama-Eindruck, können aber dazu führen, dass gerade Wege und Gebäudekanten deutlich gebogen erscheinen.

Zusätzlich stehen weitere Darstellungsoptionen zur Verfügung:

- "V-GRID" zeichnet ein feines Raster über die einzelnen Voxel
- "T-SHIFT" fügt einen Miniatur-Unschärfeeffekt hinzu
- "DAYTIME" steuert Tageszeit und Beleuchtung
- "3D-BTL" schaltet die dreidimensionalen Kämpfe ein oder aus

Diese Einstellungen lassen sich unabhängig voneinander kombinieren. Für eine eher zurückhaltende Darstellung reicht häufig Voxel 35 oder 50 zusammen mit V-Curve 2.

## Pokemon-Kämpfe direkt auf der Karte

Besonders auffällig sind die veränderten Kämpfe. Statt vor dem klassischen weißen Hintergrund werden die Pokémon direkt in der Umgebung dargestellt, in der der Kampf begonnen hat.

Die Spielfigur und das eigene Pokémon befinden sich im Vordergrund. Das gegnerische Pokémon steht weiter hinten in der Szene. Die Umgebung bleibt sichtbar und bewegt sich leicht durch einen Parallaxeffekt.

![Pokémon-Kampf in der dreidimensionalen Umgebung der DramaticShapeVoxelMod](/assets/images/gen/blog/pokemon-rot-in-3d-gen1recomp-und-voxel-mod-installieren/battle.webp)

Die Funktion ist standardmäßig aktiviert und unabhängig von der gewählten Voxel-Stufe. Wer die ursprüngliche Darstellung bevorzugt, kann "3D-BTL" im Optionsmenü deaktivieren. Danach erscheinen Kämpfe wieder im klassischen Layout.

Auch hier bleibt die Änderung rein optisch. Nach dem Kampf steht die Spielfigur weiterhin exakt an der ursprünglichen Position. Die Mod verändert keine Felder, Blickrichtungen oder Ereignisse auf der Karte.

## Kartenränder mit Wasser, Bäumen oder Schwarz füllen

Durch den größeren sichtbaren Bereich können Flächen außerhalb der ursprünglich vorgesehenen Karte erscheinen. Diese Bereiche sind nicht begehbar und gehören nicht zur eigentlichen Spielwelt.

Über die Option "VOID FILL" lässt sich auswählen, wie diese Flächen dargestellt werden:

- "TREES" setzt die Baumstruktur der Umgebung fort
- "WATER" füllt den Bereich mit animiertem Wasser
- "VOID" stellt die Fläche schwarz dar

Ich habe mich für Wasser entschieden. Vor allem bei Städten und Routen mit offenen Kartenrändern wirkt die Darstellung dadurch ruhiger. Bäume passen besser zu Waldgebieten, können auf anderen Karten aber den Eindruck einer künstlichen Begrenzung verstärken.

Wichtig ist, dass es sich nur um eine visuelle Füllung handelt. Die zusätzlichen Flächen erweitern die Karte nicht und können nicht erkundet werden.

## Pokemon Rot schneller spielen

gen1recomp bietet außerdem eine einstellbare Spielgeschwindigkeit. Damit können Bewegungen, Dialoge, Kämpfe und Skripte beschleunigt werden, ähnlich wie beim Fast Forward in der klassischen [Emulation](https://oliverjessner.at/category/emulation/).

Zur Verfügung stehen mehrere Geschwindigkeitsstufen, darunter 2X, 4X und 10X. Auch deutlich höhere Multiplikatoren sind möglich. Ob diese vollständig erreicht werden, hängt von der Leistung des verwendeten Geräts ab.

Anders als bei manchen Emulatoren wird die Musik nicht schneller oder höher abgespielt. Die Spiellogik läuft beschleunigt, während Musik und Soundeffekte ihr normales Tempo behalten.

Gerade beim erneuten Durchspielen oder beim Trainieren von Pokémon ist diese Funktion praktisch. Für Dialoge und normale Erkundung reichen meist 2X oder 4X. Höhere Werte können Eingaben und Menüs schwer kontrollierbar machen.

## Wie gut funktioniert Pokemon Rot in 3D?

Die DramaticShapeVoxelMod verändert Pokémon Rot und Blau stärker, als es die einfache Installation vermuten lässt. Vor allem Städte, Höhlen und Kämpfe erhalten durch die neue Perspektive eine andere räumliche Wirkung.

Gleichzeitig bleibt die ursprüngliche Kartenlogik bestehen. Das unterscheidet die Mod von einem Remake, das Level, Mechaniken oder Inhalte neu interpretiert. Es bleibt das bekannte Spiel der ersten Generation, nur mit einer anderen Darstellung.

Nicht jede Einstellung funktioniert auf jeder Karte gleich gut. Ein hoher Voxel-Wert kann in kleinen Gebäuden unübersichtlich werden. Starke V-Curve- und Tilt-Shift-Einstellungen entfernen sich außerdem deutlich von der ursprünglichen Pixeloptik.

Wer die Mod eher als behutsame Modernisierung verwenden möchte, kann mit Voxel 35, V-Curve 1 oder 2 und deaktiviertem V-GRID beginnen. Für den vollständigen Diorama-Effekt eignen sich Voxel 50 oder 75 zusammen mit 3D-Kämpfen und einer angepassten Tageszeit.

> **Hinweis:** gen1recomp und DramaticShapeVoxelMod befinden sich in aktiver Entwicklung. Vor Updates empfiehlt es sich, vorhandene Spielstände zusätzlich zu sichern.

## Fazit

Mit gen1recomp und DramaticShapeVoxelMod lässt sich Pokémon Rot oder Blau ohne komplizierte manuelle Einrichtung in einer dreidimensionalen Variante spielen. Die Anwendung übernimmt den ROM-Import, die Mod wird als ZIP hinzugefügt und die Darstellung kann direkt im Optionsmenü angepasst werden.

Besonders gelungen ist, dass die Mod das eigentliche Spiel nicht umbaut. Kollisionen, Ereignisse und Karten bleiben unverändert. Gleichzeitig sorgen echte Geometrie, Schatten, 3D-Kämpfe und die gekrümmte Perspektive für eine deutlich andere Präsentation.

Für Fans von Retro-[Gaming](https://oliverjessner.at/category/gaming/) ist das Projekt deshalb mehr als ein grafischer Filter. Es zeigt, wie sich ein bekanntes Game-Boy-Spiel technisch modernisieren lässt, ohne seinen grundlegenden Aufbau zu ersetzen.

## Als Tiktok

<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@oliverjessner/video/7668284334918405398" data-video-id="7668284334918405398" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@oliverjessner" href="https://www.tiktok.com/@oliverjessner?refer=embed">@oliverjessner</a> <p>Einfach Orginal Pokémon rot und blau in 3D mit dem dramatic voxel shader mod und dem gen1recomp.  Und wir ihr das installiert zeig ich euch.</p> <a target="_blank" title="♬ original sound - Oliver Jessner | Tech" href="https://www.tiktok.com/music/original-sound-7668284350945446678?refer=embed">♬ original sound - Oliver Jessner | Tech</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>
