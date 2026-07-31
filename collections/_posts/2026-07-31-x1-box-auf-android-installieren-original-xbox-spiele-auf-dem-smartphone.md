---
layout: post
title: 'X1 BOX auf Android installieren: Original-Xbox-Spiele auf dem Smartphone'
date: 2026-07-31 13:11:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - gaming
    - emulation
    - computer-stuff
description: 'Mit X1 BOX lassen sich erste Original-Xbox-Spiele unter Android starten. So funktionieren Installation, Systemdateien und XISO-Images'
thumbnail: '/assets/images/gen/blog/x1-box-auf-android-installieren-original-xbox-spiele-auf-dem-smartphone/header_thumbnail.webp'
image: '/assets/images/gen/blog/x1-box-auf-android-installieren-original-xbox-spiele-auf-dem-smartphone/header.webp'
image_width: 1280
image_height: 854
faq:
    - question: 'Welche Dateien benötigt X1 BOX?'
      answer: 'X1 BOX benötigt eine MCPX Boot ROM, ein kompatibles Xbox-BIOS, ein Xbox-HDD-Image und ein selbst ausgelesenes Spiel im unterstützten Disc-Format.'
    - question: 'Warum startet ein Xbox-Spiel nur bis zum Xbox-Logo?'
      answer: 'Häufige Ursachen sind ein ungeeignetes ISO-Format, fehlerhafte Systemdateien, fehlende Dateiberechtigungen oder ein noch nicht unterstütztes Spiel.'
    - question: 'Ist ein 1,7 MB großes QCOW2-HDD-Image zu klein?'
      answer: 'Nicht zwingend. QCOW2 unterstützt dynamisch wachsende Images, die anfangs nur wenige Megabyte belegen und trotzdem eine wesentlich größere virtuelle Festplatte bereitstellen können.'
socialmedia:
    - 'Original-Xbox-Spiele auf Android: Ich habe X1 BOX eingerichtet und zeige, welche Systemdateien, Formate und Einstellungen für den ersten Start notwendig sind.'
    - 'Das Xbox-Logo erscheint, danach beendet sich der Emulator? Bei X1 BOX können das Spielformat, die Systemdateien oder Androids Dateiberechtigungen verursachen.'
    - 'Eine QCOW2-Datei mit nur 1,7 MB muss nicht beschädigt sein. Mein Praxisleitfaden erklärt die Einrichtung von X1 BOX auf Android und typische Fehlerquellen.'
---

Mit X1 BOX lassen sich Spiele der ersten Xbox direkt auf einem Android-Gerät emulieren. Die Einrichtung verlangt allerdings mehrere Systemdateien, passende Spielabbilder und etwas Fehlersuche.

## Was ist X1 BOX?

X1 BOX ist ein noch junges Open-Source-Projekt, das die Emulation der ersten Xbox auf ARM64-Geräte mit Android bringt. Die Anwendung orientiert sich technisch an xemu, einem Emulator, der die Hardware der ursprünglichen Xbox möglichst vollständig nachbildet.

Im Unterschied zu einfacher aufgebauten Emulatoren genügt es deshalb nicht, nur eine APK zu installieren und ein Spiel auszuwählen. X1 BOX benötigt mehrere Dateien, die auch eine echte Xbox während des Startvorgangs verwendet.

Die aktuelle Version kann über die [Release-Seite des X1-BOX-Projekts auf GitHub](https://github.com/WinDroidEmulation/x1-box/releases) heruntergeladen werden. Für diesen Artikel habe ich Version 1.2.5 auf einem AYN Thor mit 12 GB Arbeitsspeicher verwendet.

Die Entwicklung befindet sich noch in einer frühen Phase. Nicht jedes Spiel funktioniert und selbst kompatible Titel können Grafikfehler, Leistungsprobleme oder Abstürze zeigen. Wer sich allgemein für [Emulation](https://oliverjessner.at/category/emulation/) interessiert, bekommt mit X1 BOX dennoch einen spannenden Einblick in den aktuellen Stand der Xbox-Emulation unter Android.

## Was für die Installation benötigt wird

X1 BOX bringt aus rechtlichen Gründen keine Xbox-Systemdateien mit. Diese Dateien müssen von der eigenen Konsole ausgelesen werden.

Für die Einrichtung werden folgende Komponenten benötigt:

1. eine MCPX Boot ROM
2. ein kompatibles Flash-ROM beziehungsweise Xbox-BIOS
3. ein Xbox-HDD-Image
4. ein selbst ausgelesenes Xbox-Spiel
5. ein ausreichend leistungsfähiges ARM64-Android-Gerät

Das xemu-Projekt beschreibt dieselben drei grundlegenden Systemdateien in seiner [Dokumentation zu den benötigten Dateien](https://xemu.app/docs/required-files/).

Für meine Installation habe ich folgende Kombination verwendet:

- MCPX: `mcpx_1.0.bin`
- BIOS: `Complex 4627 v1.03`
- HDD: `xbox_hdd.qcow2`
- X1 BOX: Version 1.2.5

Laut xemu-Dokumentation sollte die MCPX-Datei von einer Xbox der Revision 1.0 stammen. Als kompatibles BIOS wird häufig Complex 4627 verwendet. BIOS und MCPX sollten möglichst aus einer zueinander passenden Konfiguration stammen.

## X1 BOX unter Android installieren

Die APK wird über die GitHub-Releases des Projekts heruntergeladen. Da die App nicht über den Google Play Store installiert wird, muss Android die Installation aus der verwendeten Quelle erlauben.

Je nach Gerät befindet sich diese Einstellung unter:

1. "Einstellungen" öffnen
2. "Apps" oder "Sicherheit" auswählen
3. "Unbekannte Apps installieren" öffnen
4. dem Browser oder Dateimanager die Installation erlauben
5. die heruntergeladene X1-BOX-APK öffnen

Nach der Installation kann die Berechtigung wieder deaktiviert werden.

X1 BOX sollte nur aus dem offiziellen Repository oder einer anderen nachvollziehbaren Quelle installiert werden. APK-Dateien aus nicht überprüfbaren Downloadportalen bergen ein unnötiges Sicherheitsrisiko.

## Den Setup Wizard einrichten

Beim ersten Start führt X1 BOX durch einen Einrichtungsassistenten. Dort werden die zuvor vorbereiteten Systemdateien ausgewählt.

Die genaue Bezeichnung einzelner Menüpunkte kann sich zwischen den Versionen verändern. Der grundsätzliche Ablauf bleibt jedoch gleich.

### MCPX auswählen

Als Erstes wird die MCPX Boot ROM hinterlegt. Für eine mit Complex 4627 kompatible Konfiguration wird normalerweise eine MCPX-Datei der Xbox-Revision 1.0 verwendet.

In meinem Fall trägt sie den Namen:

`mcpx_1.0.bin`

Der Dateiname allein bestätigt allerdings nicht, dass es sich um den richtigen Dump handelt. Bei Problemen sollte die Datei erneut von der eigenen Konsole ausgelesen und mit einer funktionierenden xemu-Konfiguration verglichen werden.

### BIOS auswählen

Danach wird das Flash-ROM beziehungsweise BIOS ausgewählt.

Ich verwende:

`Complex 4627 v1.03`

xemu nennt Complex 4627 als eine BIOS-Version, mit der Nutzer erfolgreich arbeiten. Ein BIOS-Dump aus einer anderen Xbox-Revision oder eine beschädigte Datei kann dazu führen, dass die Emulation bereits während des Startvorgangs abbricht.

### HDD-Image einbinden

Als dritte Systemdatei wird das Xbox-HDD-Image ausgewählt.

Üblich ist eine Datei mit einem Namen wie:

`xbox_hdd.qcow2`

QCOW2 ist ein dynamisches Festplattenformat. Eine solche Datei kann auf dem Android-Speicher anfangs nur ungefähr 1,7 MB belegen, obwohl sie innerhalb des Emulators eine wesentlich größere virtuelle Festplatte bereitstellt.

Eine kleine Dateigröße bedeutet daher nicht automatisch, dass das Image beschädigt oder unvollständig ist. Mit der Nutzung kann die tatsächlich belegte Größe wachsen.

Wichtig ist stattdessen, dass X1 BOX dauerhaft auf die Datei zugreifen darf. Das Image sollte nicht in einem temporären Ordner liegen und nach der Einrichtung nicht verschoben oder umbenannt werden.

## Warum das Xbox-Dashboard nicht automatisch startet

Ein häufiges Missverständnis betrifft den Eintrag "Dashboard" in X1 BOX.

Das leere HDD-Image enthält nicht zwingend das originale Xbox-Dashboard. Die dazugehörigen Dashboard-Dateien müssen von der eigenen Xbox ausgelesen und anschließend auf das virtuelle Laufwerk übertragen werden. xemu beschreibt diesen zusätzlichen Vorgang in seiner [Dashboard-Dokumentation](https://xemu.app/docs/dashboard/).

Wenn X1 BOX beim Start des Dashboards abstürzt oder zum Hauptmenü zurückkehrt, beweist das deshalb nicht automatisch, dass MCPX, BIOS oder HDD-Image defekt sind. Auf der virtuellen Festplatte können schlicht die benötigten Dashboard-Dateien fehlen.

Für einen ersten Funktionstest ist ein kompatibles Spiel daher oft aussagekräftiger als der Dashboard-Eintrag.

## Xbox-Spiele in X1 BOX hinzufügen

Die Dateiendung `.iso` sagt bei Xbox-Spielen noch nicht zuverlässig aus, in welchem Disc-Format das Abbild vorliegt.

Viele vollständige Dumps einer Xbox-DVD enthalten sämtliche Bereiche des Datenträgers und sind mehrere Gigabyte groß. Emulatoren erwarten dagegen häufig ein für Xbox-Emulation geeignetes XISO-Image.

Ein Spiel mit der Endung `.iso` kann daher entweder ein geeignetes XISO oder ein anders aufgebauter vollständiger Disc-Dump sein.

Für den ersten Test habe ich unter anderem folgende Dateien verwendet:

- Halo: Combat Evolved als ISO
- Alien Hominid als ungefähr 1,4 GB großes XISO

Eine kleinere Datei ist nicht automatisch gültig und eine große Datei nicht automatisch falsch. Entscheidend ist der interne Aufbau des Images.

Wer die eigene Disc ausgelesen hat, kann den Dump auf einem Computer mit Werkzeugen wie `extract-xiso` in ein passendes XISO-Format umwandeln. Das erzeugte Image wird anschließend auf den internen Speicher oder eine ausreichend schnelle Speicherkarte des Android-Geräts kopiert.

Danach lässt es sich über die Spielebibliothek von X1 BOX auswählen.

## Warum ein Spiel nur das Xbox-Logo zeigt

Bei meinen ersten Versuchen erschien kurz das Xbox-Logo. Danach wurde die Emulation beendet. Dieses Verhalten kann mehrere Ursachen haben.

### Das Spiel liegt nicht als geeignetes XISO vor

Das ist besonders wahrscheinlich, wenn eine vollständige Redump-ISO direkt geladen wird. In diesem Fall sollte der eigene Dump zunächst in ein für xemu beziehungsweise X1 BOX geeignetes Disc-Image umgewandelt werden.

Ein Spiel, das bereits als XISO vorliegt, schließt einen fehlerhaften oder inkompatiblen Dump trotzdem nicht vollständig aus.

### Android verliert den Dateizugriff

Android verwaltet Zugriffe auf ausgewählte Dateien und Ordner über ein eigenes Berechtigungssystem. X1 BOX kann eine Datei zunächst im Setup Wizard anzeigen, später aber trotzdem Probleme beim erneuten Öffnen haben.

Folgende Maßnahmen können helfen:

- Systemdateien in einen dauerhaft verfügbaren lokalen Ordner kopieren
- keine Cloud-Ordner verwenden
- Dateien nach der Einrichtung nicht verschieben
- X1 BOX alle erforderlichen Dateiberechtigungen erteilen
- den Setup Wizard nach einer Änderung erneut ausführen

Auf einer Speicherkarte sollte zusätzlich geprüft werden, ob Android der App dauerhaft Zugriff auf den betreffenden Ordner erlaubt.

### BIOS und MCPX passen nicht zusammen

Für die verbreitete Konfiguration mit Complex 4627 wird eine MCPX Boot ROM der Xbox-Revision 1.0 empfohlen. Dateien unterschiedlicher Revisionen können den Start verhindern.

Da Dateinamen beliebig geändert werden können, sollte man sich nicht ausschließlich auf Namen wie `mcpx_1.0.bin` verlassen. Der zuverlässigste Test ist eine Konfiguration, die mit denselben Dateien bereits in xemu auf einem Computer funktioniert.

### Das HDD-Image ist nicht beschreibbar

X1 BOX muss Änderungen auf der virtuellen Festplatte speichern können. Liegt das QCOW2-Image in einem schreibgeschützten Bereich oder fehlt der App die Berechtigung, kann die emulierte Xbox während des Starts abbrechen.

Das Image sollte deshalb in einem normalen lokalen Ordner liegen, auf den X1 BOX lesend und schreibend zugreifen kann.

### Das Spiel wird noch nicht unterstützt

X1 BOX befindet sich in aktiver Entwicklung. Ein korrektes XISO und funktionierende Systemdateien garantieren daher noch nicht, dass jedes Spiel startet.

Die Kompatibilität kann sich außerdem von xemu auf einem Desktop-System unterscheiden. Android-Portierung, ARM64-Übersetzung, Vulkan-Treiber und das konkrete Gerät bringen zusätzliche Fehlerquellen mit.

## Eine saubere Testreihenfolge

Wer nach dem Xbox-Logo wieder im Hauptmenü landet, sollte nicht mehrere Dateien gleichzeitig austauschen. Sinnvoller ist eine feste Testreihenfolge.

### 1. Systemdateien mit xemu prüfen

MCPX, BIOS, HDD-Image und Spiel sollten zunächst mit xemu unter Windows, macOS oder Linux getestet werden.

Startet das Spiel dort mit denselben Dateien, sind beschädigte Dumps als Ursache weniger wahrscheinlich.

### 2. Ein bekanntes XISO verwenden

Für die Android-Tests sollte ein korrekt erzeugtes XISO aus der eigenen Sammlung verwendet werden. So lässt sich ein ungeeigneter vollständiger Disc-Dump ausschließen.

### 3. Dateien lokal speichern

Alle Dateien werden in einen festen Ordner im internen Speicher kopiert. Danach wird der Setup Wizard erneut ausgeführt.

### 4. App-Daten zurücksetzen

Bleibt das Problem bestehen, können die App-Daten von X1 BOX über die Android-Einstellungen gelöscht werden.

Der Pfad lautet je nach Gerät ungefähr:

"Einstellungen" → "Apps" → "X1 BOX" → "Speicher" → "Daten löschen"

Anschließend muss die gesamte Konfiguration neu eingerichtet werden.

### 5. Protokolle kontrollieren

Falls X1 BOX weiterhin beendet wird, liefert das Android-Systemprotokoll häufig konkretere Hinweise. Mit aktiviertem USB-Debugging kann auf einem Computer beispielsweise `adb logcat` verwendet werden.

Wichtig sind vor allem Meldungen direkt nach dem Absturz. Hinweise auf fehlende Dateien, verweigerte Zugriffe, Vulkan-Probleme oder Speicherfehler helfen dabei, die Ursache einzugrenzen.

## Welche Hardware ist sinnvoll?

Xbox-Emulation ist deutlich anspruchsvoller als die Emulation vieler älterer Konsolen. Ein leistungsfähiger ARM64-Prozessor, eine aktuelle Vulkan-Unterstützung und ausreichend Arbeitsspeicher sind deshalb hilfreich.

Mein Testgerät ist ein AYN Thor mit 12 GB RAM. Diese Speichermenge sollte für erste Versuche grundsätzlich ausreichen. Sie garantiert jedoch keine fehlerfreie Emulation.

Bei Abstürzen direkt nach dem Xbox-Logo ist der verfügbare Arbeitsspeicher nicht automatisch die wahrscheinlichste Ursache. Zuerst sollten Disc-Format, Dateizugriff und Systemdateien überprüft werden.

Auch die eingesetzte GPU und deren Vulkan-Treiber spielen eine wichtige Rolle. Zwei Geräte mit derselben RAM-Ausstattung können deshalb sehr unterschiedliche Ergebnisse liefern.

## X1 BOX ist noch kein unkomplizierter Konsolenemulator

Die Installation von X1 BOX ist möglich, verlangt derzeit aber mehr Vorbereitung als viele etablierte Android-Emulatoren. Besonders die benötigten Xbox-Systemdateien und die unterschiedlichen Disc-Formate können beim ersten Versuch verwirren.

Wer bereits eigene Xbox-Konsolen und selbst ausgelesene Spiele besitzt, findet hier dennoch ein interessantes Projekt. Die Vorstellung, Original-Xbox-Spiele direkt auf einem kompakten Android-Gerät zu starten, ist technisch reizvoll.

Im Alltag muss man aktuell allerdings mit inkompatiblen Spielen, Abstürzen und Änderungen zwischen einzelnen Versionen rechnen. X1 BOX ist deshalb eher ein Projekt für experimentierfreudige Nutzer als eine fertige Alternative zur ursprünglichen Konsole.

Für mich liegt genau darin ein Teil des Reizes. Die [Gaming](https://oliverjessner.at/category/gaming/)-Hardware bleibt zwar unverändert, aber neue Emulatoren verschieben schrittweise, auf welchen Geräten sich ältere Spiele erhalten und verwenden lassen.
