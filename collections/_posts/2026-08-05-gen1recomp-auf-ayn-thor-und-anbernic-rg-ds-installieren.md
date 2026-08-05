---
layout: post
title: 'Gen1Recomp auf AYN Thor und ANBERNIC RG DS installieren'
date: 2026-08-05 13:15:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - recomp
    - emulation
    - pokemon
description: 'Gen1Recomp mit Kanto Gear auf AYN Thor und ANBERNIC RG DS installieren und Pokémon Rot, Blau oder Gelb auf zwei Displays spielen'
thumbnail: '/assets/images/gen/blog/gen1recomp-auf-ayn-thor-und-anbernic-rg-ds-installieren/header_thumbnail.webp'
image: '/assets/images/gen/blog/gen1recomp-auf-ayn-thor-und-anbernic-rg-ds-installieren/header.webp'
image_width: 1280
image_height: 721
faq:
    - question: 'Funktioniert Gen1Recomp mit Kanto Gear auf dem AYN Thor?'
      answer: 'Ja. Der AYN Thor mit Android 13 ist das bestätigte Referenzgerät für den Android-Test-Build und Kanto Gear.'
    - question: 'Funktioniert Kanto Gear auf dem ANBERNIC RG DS?'
      answer: 'Der ANBERNIC RG DS erfüllt grundsätzlich die Voraussetzungen eines Android-Handhelds mit zwei Displays. Eine vollständige Kompatibilität ist bisher aber nicht offiziell bestätigt.'
    - question: 'Brauche ich den Voxel Mod für Kanto Gear?'
      answer: 'Nein. Kanto Gear funktioniert auch ohne Voxel Mod. Der angepasste Dramatic-Shape-Fork ist eine optionale Erweiterung für die 3D-Darstellung.'
socialmedia:
    - 'Gen1Recomp auf dem AYN Thor installieren: Kanto Gear verschiebt Karte, Team, Kampfmenüs und Touch-Steuerung auf das zweite Display. Hier ist die vollständige Anleitung.'
    - 'Läuft Kanto Gear auch auf dem ANBERNIC RG DS? Der Dual-Screen-Handheld erfüllt die grundlegenden Voraussetzungen, ist bisher aber noch kein bestätigtes Testgerät.'
    - 'Pokémon Rot, Blau und Gelb auf zwei Displays: So installierst du Gen1Recomp und Kanto Gear auf einem Dual-Screen-Android-Handheld.'
---

Kanto Gear erweitert Gen1Recomp für Android-Handhelds mit zwei Displays. Diese Anleitung zeigt die Installation auf dem getesteten AYN Thor und erklärt, was Besitzer eines ANBERNIC RG DS beachten müssen.

## Was ist Kanto Gear für Gen1Recomp?

Kanto Gear ist eine Mod für Gen1Recomp, die speziell für Android-Geräte mit zwei Bildschirmen entwickelt wurde. Das eigentliche Spiel bleibt auf dem Hauptdisplay. Karte, Teamübersicht, Kampfmenüs und kontextabhängige Touch-Bedienelemente erscheinen auf dem zweiten Bildschirm.

Dadurch erinnert die Bedienung stellenweise an einen Nintendo DS. Der zusätzliche Bildschirm zeigt jedoch nicht einfach ein festes Menü. Sein Inhalt passt sich an die aktuelle Spielsituation an.

Je nach Situation kann der zweite Bildschirm unter anderem folgende Inhalte anzeigen:

- die Karte von Kanto
- die aktuelle Position und lokale Umgebung
- das eigene Pokémon-Team
- Erfahrungspunkte und Statuswerte
- Kampfoptionen und Attacken
- Dialogentscheidungen
- PC-Listen
- Schrittzähler und Gebietsinformationen
- optionale Hilfen und einen integrierten Guide

Kanto Gear gehört zur wachsenden Szene der [Recomp-Projekte](https://oliverjessner.at/category/recomp/), mit denen ältere Spiele auf moderne Plattformen übertragen werden.

Obwohl Android-Handhelds häufig mit [Emulation](https://oliverjessner.at/category/emulation/) verbunden werden, ist Gen1Recomp kein klassischer Game-Boy-Emulator. Das Spiel wird über eine angepasste Laufzeitumgebung auf moderner Hardware ausgeführt und kann dadurch um Funktionen erweitert werden, die im ursprünglichen Spiel nicht vorgesehen waren.

## Gen1Recomp auf AYN Thor und ANBERNIC RG DS

Kanto Gear richtet sich an Android-Handhelds mit zwei eigenständigen Displays. Zu den interessantesten Geräten für diese Mod gehören der AYN Thor und der ANBERNIC RG DS.

Der AYN Thor ist derzeit das bestätigte Referenzgerät des Projekts. Getestet wurde Kanto Gear auf einem AYN Thor mit Android 13. Gen1Recomp läuft dort auf dem oberen Bildschirm, während Kanto Gear Karte, Teamübersicht, Kampfmenüs und Touch-Steuerung auf das untere Display verschiebt.

![gen1recomp version für dual screen mit voxel mod und map auf dem dual screen](/assets/images/gen/blog/gen1recomp-auf-ayn-thor-und-anbernic-rg-ds-installieren/)

Der ANBERNIC RG DS ist ebenfalls ein Android-Handheld mit zwei Touchscreens. Damit entspricht er grundsätzlich dem Gerätekonzept, für das Kanto Gear entwickelt wurde.

Eine vollständige Kompatibilität mit dem ANBERNIC RG DS ist bisher jedoch nicht offiziell bestätigt. Ob die automatische Display-Erkennung, die Touch-Steuerung und der optionale Voxel-Fork funktionieren, muss praktisch auf dem Gerät getestet werden.

**Wichtig:** Zwei vorhandene Bildschirme bedeuten unter Android nicht automatisch, dass jede Dual-Screen-App funktioniert. Entscheidend ist, wie der Hersteller das zweite Display gegenüber Android-Anwendungen bereitstellt.

Auch externe Monitore, Docks und ungewöhnliche Konfigurationen mit drei Displays benötigen weitere Tests. Auf gewöhnlichen Android-Geräten mit nur einem Bildschirm bleibt die zusätzliche Oberfläche von Kanto Gear inaktiv.

## Voraussetzungen für die Installation

Für die Installation brauchst du:

- einen AYN Thor oder einen vergleichbaren Android-Handheld mit zwei Displays
- alternativ einen ANBERNIC RG DS für einen bisher unbestätigten Kompatibilitätstest
- eine eigene unterstützte ROM-Datei von Pokémon Rot, Blau oder Gelb
- die passende Gen1Recomp-Test-APK
- die Kanto-Gear-Mod als ZIP-Datei
- optional den angepassten Dramatic Shape Voxel Mod

Kanto Gear enthält keine ROM und keine aus einer ROM extrahierten Spieldaten. Die benötigte Spieldatei muss separat vorliegen.

Falls du bereits die offizielle Gen1Recomp-App verwendest, solltest du außerdem deinen Spielstand exportieren. Der Android-Test-Build verwendet ein eigenes App-Paket und übernimmt den ROM-Cache sowie die Spielstände der offiziellen Version nicht automatisch.

## Die passenden Versionen herunterladen

Die drei Komponenten werden getrennt veröffentlicht. Für ein stabiles Setup sollten nur Versionen kombiniert werden, die gemeinsam getestet wurden.

Stand 5. August 2026 besteht das getestete Paket aus:

1. Gen1Recomp Android Test `0.1.69-kanto.3`
2. Kanto Gear `1.2.0`
3. Dramatic Shape `1.6.0-android.1`, optional

Die benötigte APK findest du im Gen1Recomp-Fork:

https://github.com/AverageConsumer/gen1recomp/releases/tag/v0.1.69-kanto.3

Lade dort die folgende Datei herunter:

`gen1recomp-android-0.1.69-kanto.3.apk`

Kanto Gear wird separat als Mod angeboten:

https://github.com/AverageConsumer/kanto-gear/releases/tag/v1.2.0

Benötigt wird:

`Kanto-Gear-Mod-1.2.0.zip`

Die ZIP-Datei muss nicht entpackt werden. Sie wird später direkt über Gen1Recomp importiert.

**Wichtig:** Mische keine Versionen aus unterschiedlichen Release-Paketen. Änderungen am Android-Host, an Kanto Gear und am Voxel-Fork können voneinander abhängig sein.

## Gen1Recomp auf Android installieren

Öffne die heruntergeladene APK auf deinem Android-Handheld. Android kann dabei nachfragen, ob dein Browser oder Dateimanager Apps aus externen Quellen installieren darf.

Erlaube die Installation nur für die Anwendung, mit der du die APK geöffnet hast. Es ist nicht notwendig, Sicherheitsfunktionen für das gesamte Gerät zu deaktivieren.

Installiere anschließend:

`gen1recomp-android-0.1.69-kanto.3.apk`

Die App erscheint danach als **Gen1Recomp Android Test** auf dem Gerät. Sie kann parallel zur offiziellen Gen1Recomp-App installiert werden.

Beim ersten Start importierst du deine eigene ROM-Datei von Pokémon Rot, Blau oder Gelb. Folge dazu dem normalen Importvorgang innerhalb der App.

## Kanto Gear in Gen1Recomp installieren

Nachdem die ROM erkannt wurde, kannst du Kanto Gear importieren:

1. Starte **Gen1Recomp Android Test**.
2. Öffne den Bereich **MODS**.
3. Wähle **Import mod .zip**.
4. Öffne `Kanto-Gear-Mod-1.2.0.zip`.
5. Aktiviere Kanto Gear in der Mod-Liste.
6. Starte das Spiel.

Erkennt Android einen geeigneten zweiten Bildschirm, öffnet Kanto Gear dort automatisch die zusätzliche Oberfläche.

Falls der zweite Bildschirm nicht verwendet wird, kontrolliere zunächst, ob Kanto Gear im Bereich **MODS** aktiviert ist. Prüfe anschließend in den Einstellungen der Mod, welches Display ausgewählt wurde.

## Gen1Recomp auf dem AYN Thor einrichten

Der AYN Thor ist derzeit das Gerät, auf dem Kanto Gear nachweislich getestet wurde. Für die erste Einrichtung sollte die automatische Display-Auswahl ausreichen.

Öffne nach der Installation die Einstellungen von Kanto Gear und stelle **BOTTOM SCREEN** zunächst auf **AUTO**.

Kanto Gear versucht dadurch selbstständig, das zweite integrierte Display des AYN Thor zu erkennen.

Falls die Oberfläche auf dem falschen Bildschirm erscheint, kannst du stattdessen **HANDHELD** auswählen. Diese Einstellung bevorzugt das andere integrierte Display des Geräts.

Nach dem Start sollte das Spiel auf dem oberen Bildschirm laufen. Die Kanto-Gear-Oberfläche erscheint auf dem unteren Touchscreen.

## Funktioniert Gen1Recomp auf dem ANBERNIC RG DS?

Der ANBERNIC RG DS besitzt Android und zwei separate Touchscreens. Damit erfüllt er die grundlegenden Voraussetzungen für Kanto Gear.

Trotzdem ist die Unterstützung noch nicht bestätigt. Entscheidend ist nicht nur die Anzahl der Bildschirme, sondern auch, ob Android den zweiten Bildschirm als geeignetes zusätzliches Display an Gen1Recomp meldet.

Wer Kanto Gear auf dem ANBERNIC RG DS testen möchte, sollte deshalb zunächst ein möglichst einfaches Setup verwenden.

Empfohlen ist folgende Reihenfolge:

1. Gen1Recomp Android Test installieren.
2. Eine unterstützte ROM importieren.
3. Kanto Gear ohne weitere Grafik-Mods installieren.
4. **BOTTOM SCREEN** auf **AUTO** stellen.
5. Prüfen, ob der zweite Bildschirm erkannt wird.
6. Falls nötig, **HANDHELD** als Display-Modus testen.
7. Touch-Steuerung, Menüs und Kämpfe überprüfen.
8. Erst danach den optionalen Voxel-Fork installieren.

So lässt sich leichter erkennen, ob ein Problem von der Display-Erkennung, Kanto Gear oder der zusätzlichen 3D-Darstellung verursacht wird.

Falls Kanto Gear auf dem ANBERNIC RG DS nicht automatisch startet, bedeutet das nicht zwingend, dass die Hardware ungeeignet ist. Möglicherweise müsste der Android-Test-Build an die Display-Verwaltung des Geräts angepasst werden.

## Den zweiten Bildschirm bedienen

Auf dem unteren Bildschirm kannst du nach links oder rechts wischen, um zwischen den verschiedenen Ansichten zu wechseln. Alternativ stehen Pfeiltasten im Kopfbereich der Oberfläche zur Verfügung.

Zu den regulären Ansichten gehören:

- Karte
- Team
- Schritte
- Feldwerkzeuge
- Gebietsinformationen
- Guide

Bestimmte Spielaktionen ersetzen diese Ansichten vorübergehend. Während eines Kampfes erscheinen beispielsweise die verfügbaren Attacken und Aktionen. Bei Dialogen oder beim Erlernen einer Attacke zeigt Kanto Gear die passenden Auswahlmöglichkeiten an.

Nach Abschluss der Aktion kehrt der zweite Bildschirm zur vorherigen Ansicht zurück.

In der Teamübersicht wird unter dem KP-Balken jedes Pokémon zusätzlich ein schmaler Balken für die Erfahrungspunkte dargestellt. Über die Karten lassen sich Statuswerte öffnen oder Pokémon innerhalb des Teams tauschen, sofern das Spiel gerade keine andere Aktion ausführt.

## Lokale Karte und Spoiler-Einstellungen

Kanto Gear kann neben der normalen Weltkarte auch die aktuelle Umgebung oder den jeweiligen Stockwerkplan anzeigen. Diese Funktion ist standardmäßig deaktiviert, da sie Informationen über den Aufbau eines Gebiets vorwegnehmen kann.

Unter **SPOILER LOCAL MAP** stehen drei Einstellungen zur Verfügung:

- **OFF:** Die lokale Karte bleibt deaktiviert.
- **MAP:** Zeigt das aktuelle Gebiet und die Position der Spielfigur.
- **ENHANCED:** Markiert zusätzlich Ausgänge sowie sichtbare und versteckte Gegenstände, die noch nicht eingesammelt wurden.

Über die Schaltflächen `+` und `-` kann eine auf die Spielfigur zentrierte Vergrößerung aktiviert oder deaktiviert werden.

Die normale Karte von Kanto bleibt weiterhin für die Fliegen-Funktion zuständig. Bereits freigeschaltete Ziele lassen sich dort wie gewohnt auswählen.

## Empfohlene Display-Einstellungen

Kanto Gear bietet mehrere Einstellungen für unterschiedliche Dual-Screen-Konfigurationen.

### BOTTOM SCREEN

Für den AYN Thor und einen ersten Test auf dem ANBERNIC RG DS ist **AUTO** die sinnvollste Einstellung.

Kanto Gear versucht damit selbstständig, einen geeigneten zweiten Bildschirm zu erkennen.

**HANDHELD** bevorzugt das andere integrierte Display des Geräts. Diese Einstellung kann helfen, wenn die automatische Erkennung nicht das gewünschte Ergebnis liefert.

**EXTRA SCREEN** bevorzugt einen externen Präsentationsbildschirm. Das ist vor allem für Docks, externe Monitore oder eine Verbindung zum Fernseher relevant.

### HIDE UPPER BATTLE UI

Mit **HIDE UPPER BATTLE UI** lassen sich doppelte Kampfmenüs auf dem Hauptbildschirm ausblenden.

Die Option greift nur, wenn der zweite Bildschirm korrekt erkannt wurde und einsatzbereit ist. Wird das zusätzliche Display deaktiviert, soll die normale Oberfläche auf dem Hauptbildschirm wieder erscheinen.

### FULL BOTTOM BATTLE UI

Diese Einstellung verschiebt zusätzlich die KP- und Statusanzeigen beider Pokémon auf den unteren Bildschirm.

Standardmäßig verwendet Kanto Gear eine geteilte Darstellung, bei der ein Teil der Kampfinformationen auf dem Hauptdisplay bleibt.

### PROFILE

Über das Profil lässt sich festlegen, wie viele zusätzliche Informationen Kanto Gear anzeigen soll.

- **PURIST:** Blendet zusätzliche Hilfsfunktionen aus.
- **ENHANCED:** Aktiviert die erweiterten Informationen.
- **CUSTOM:** Erlaubt die individuelle Auswahl einzelner Funktionen.

## Optional den Voxel Mod installieren

Kanto Gear benötigt den Voxel Mod nicht. Das Spiel kann auch mit der normalen Darstellung von Gen1Recomp verwendet werden.

Für die getestete 3D-Konfiguration auf dem AYN Thor empfiehlt das Projekt jedoch einen angepassten Android-Fork des Dramatic Shape Voxel Mods:

https://github.com/AverageConsumer/DramaticShapeVoxelMod/releases/tag/v1.6.0-android.1

Lade dort die aktuelle ZIP-Datei des Android-Forks herunter.

Ist bereits der ursprüngliche Dramatic Shape Voxel Mod installiert, musst du ihn zuerst im Bereich **MODS** entfernen. Beide Varianten verwenden dieselbe Mod-ID und sollten daher nicht gleichzeitig installiert werden.

Danach gehst du folgendermaßen vor:

1. Öffne in Gen1Recomp den Bereich **MODS**.
2. Wähle **Import mod .zip**.
3. Öffne die heruntergeladene Dramatic-Shape-ZIP.
4. Bestätige den Hinweis auf experimentelle Mods.
5. Aktiviere den Voxel-Fork.

Ein neues Setup startet mit dem getesteten Profil:

- **VOXEL 35**
- **BALANCED**
- **T-SHIFT 3**
- **V-CURVE OFF**

Diese Einstellungen wurden für den AYN Thor gewählt. Sie müssen auf anderen Android-Handhelds nicht automatisch die beste Leistung liefern.

Auf dem ANBERNIC RG DS sollte der Voxel-Fork erst installiert werden, nachdem Gen1Recomp und Kanto Gear ohne zusätzliche Grafik-Mod zuverlässig funktionieren.

Eine allgemeine Anleitung zur 3D-Darstellung findest du in meinem Artikel [Pokémon Rot in 3D mit Gen1Recomp und Voxel Mod installieren](https://oliverjessner.at/blog/2026-07-30-pokemon-rot-in-3d-gen1recomp-und-voxel-mod-installieren/).

Die einzelnen Grafikoptionen erkläre ich außerdem im Guide [Das Voxel-Setup in Gen1Recomp richtig einstellen](https://oliverjessner.at/blog/2026-08-01-pokemon-rot-in-3d-voxel-setup-in-gen1recomp-richtig-einstellen/).

## Spielstände aus der offiziellen App übernehmen

Der Android-Test-Build wird neben der offiziellen Gen1Recomp-App installiert. Beide Anwendungen verwalten ihre Daten getrennt.

Eine bereits importierte ROM oder ein vorhandener Spielstand steht daher nicht automatisch im Test-Build zur Verfügung.

Exportiere deinen Spielstand über die normale Exportfunktion der bisherigen App und importiere ihn anschließend in **Gen1Recomp Android Test**.

Auch während der öffentlichen Testphase empfiehlt sich ein regelmäßiges Backup des Spielstands.

## Kanto Gear und Gen1Recomp aktualisieren

Neuere APK-Versionen des Android-Test-Builds sollten über die vorhandene App installiert werden. Deinstalliere die App vor einem Update nicht.

Solange Paket-ID und Signatur unverändert bleiben, kann Android die bestehende Installation aktualisieren. ROM-Cache, Einstellungen und Spielstände bleiben dabei normalerweise erhalten.

Kanto Gear und der optionale Voxel-Fork werden weiterhin als ZIP-Dateien über den Bereich **MODS** aktualisiert.

Automatische Updates sind für diese Forks absichtlich deaktiviert. Dadurch wird verhindert, dass eine nicht getestete Version unbemerkt eine Komponente des abgestimmten Pakets ersetzt.

Trotzdem solltest du vor jedem Update einen Spielstand exportieren.

## Bekannte Einschränkungen

Der AYN Thor mit Android 13 ist derzeit das einzige ausdrücklich bestätigte Referenzgerät.

Der ANBERNIC RG DS ist aufgrund seines Dual-Screen-Aufbaus ein naheliegender Kandidat für Kanto Gear. Die vollständige Unterstützung wurde bisher aber nicht bestätigt.

Weitere mögliche Einschränkungen betreffen:

- externe Displays mit ungewöhnlicher Ausrichtung
- Docks mit eigener Displayverwaltung
- Konfigurationen mit mehr als zwei Bildschirmen
- herstellerspezifische Änderungen an Android
- abweichendes Verhalten einzelner Grafikprozessoren
- die automatische Wiederherstellung nach dem Abschalten eines Displays
- unterschiedliche Touchscreen-Zuordnungen
- die Erkennung des zweiten Bildschirms durch Android

Auf Desktop-Systemen und Geräten mit nur einem Bildschirm öffnet Kanto Gear kein separates Fenster. Die Mod bleibt dort inaktiv.

## Probleme richtig melden

Bei einem Fehler ist entscheidend, welche Komponente betroffen ist.

Probleme mit dem zweiten Bildschirm, den Touch-Elementen oder der Oberfläche von Kanto Gear gehören in den Issue-Bereich von Kanto Gear:

https://github.com/AverageConsumer/kanto-gear/issues

Probleme beim Start der Android-App oder bei der Integration des Hosts gehören zum Gen1Recomp-Fork:

https://github.com/AverageConsumer/gen1recomp/issues

Fehler bei der 3D-Darstellung oder der Leistung des angepassten Voxel Mods gehören zum Dramatic-Shape-Fork:

https://github.com/AverageConsumer/DramaticShapeVoxelMod/issues

Eine hilfreiche Fehlermeldung sollte folgende Informationen enthalten:

- verwendetes Gerät
- Android-Version
- Displaykonfiguration
- Version des Android-Test-Builds
- Version von Kanto Gear
- installierte Grafik-Mods
- erwartetes Verhalten
- tatsächliches Verhalten

Bei einem Test auf dem ANBERNIC RG DS ist außerdem relevant, ob der zweite Bildschirm überhaupt erkannt wird und auf welchem Display die Touch-Eingaben ankommen.

Ein Screenshot oder kurzes Video kann die Fehlersuche erleichtern.

## Fazit

Kanto Gear zeigt, wie sinnvoll Gen1Recomp die zusätzlichen Displays moderner Android-Handhelds nutzen kann.

Auf dem AYN Thor ist das Zusammenspiel bereits getestet. Das Spiel bleibt auf dem oberen Bildschirm, während Karte, Teamverwaltung, Kampfoptionen und Touch-Elemente auf das untere Display wandern.

Der ANBERNIC RG DS ist aufgrund seines Android-Systems und der zwei Touchscreens ebenfalls ein interessantes Gerät für Gen1Recomp. Eine vollständige Kompatibilität mit Kanto Gear ist bislang jedoch nicht bestätigt.

Wer die Kombination ausprobiert, sollte deshalb zunächst ohne Voxel Mod testen und den Spielstand regelmäßig exportieren.

Damit richtet sich Kanto Gear nicht nur an Besitzer des AYN Thor. Das Projekt könnte langfristig auch für den ANBERNIC RG DS und weitere Dual-Screen-Android-Handhelds relevant werden, sofern deren zweites Display von der App korrekt erkannt wird.

Für Fans klassischer [Pokémon](https://oliverjessner.at/category/pokemon/)-Spiele entsteht dadurch eine ungewöhnliche Möglichkeit, Pokémon Rot, Blau oder Gelb auf moderner Hardware mit einer echten Dual-Screen-Oberfläche zu spielen.
