---
layout: post
title: 'Banjo Recompiled auf Android – der N64-Klassiker für Handhelds'
date: 2026-08-01 19:35:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - recomp
    - emulation
    - nintendo
description: 'Banjo Recompiled kommt auf Android-Handhelds und bringt Widescreen, Controller-Support, Mods und eine eigene Dual-Screen-Anzeige mit'
thumbnail: '/assets/images/gen/blog/banjo-recompiled-auf-android-der-n64-klassiker-fuer-handhelds/header_thumbnail.webp'
image: '/assets/images/gen/blog/banjo-recompiled-auf-android-der-n64-klassiker-fuer-handhelds/header.webp'
image_width: 1280
image_height: 854
faq:
    - question: 'Gibt es Banjo Recompiled bereits als fertige Android-App?'
      answer: 'Im GitHub-Repository ist derzeit kein regulärer Release mit fertiger APK aufgeführt. Der Android-Port muss aktuell aus dem Quellcode gebaut und über ADB installiert werden.'
    - question: 'Benötige ich eine eigene Banjo-Kazooie-ROM?'
      answer: 'Ja. Das Projekt enthält keine Spieldaten. Zum Start wird eine eigene, unterstützte Banjo-Kazooie-ROM benötigt.'
    - question: 'Unterstützt Banjo Recompiled auf Android auch Mods?'
      answer: 'Ja. Der Android-Port unterstützt den lokalen Import von Mods und Texture Packs. Bisher wurde vom Entwickler unter anderem das Texture Pack BK Reloaded getestet.'
socialmedia:
    - 'Banjo Recompiled steht auch als Android-Port bereit. Das Projekt bringt Widescreen, Controller-Support, Mods und eine eigene Dual-Screen-Anzeige auf mobile Handhelds.'
    - 'Banjo-Kazooie ohne klassische N64-Emulation auf einem Android-Handheld: Banjo Recompiled wird als eigenständige Android-App umgesetzt, inklusive Mod-Support.'
    - 'Der Android-Port von Banjo Recompiled richtet sich aktuell vor allem an Tester. Was bereits funktioniert und welche Voraussetzungen gelten, steht im Artikel.'
---

Banjo Recompiled läuft als eigenständiger Android-Port auf mobilen Handhelds. Das Projekt übernimmt die PC-Funktionen und ergänzt sie um Android-spezifische Bedienung und Speicherverwaltung.

## Was ist Banjo Recompiled für Android?

[BanjoRecomp-Android](https://github.com/AurelioB/BanjoRecomp-Android) ist ein Android-Port von Banjo: Recompiled. Das ursprüngliche Nintendo-64-Spiel wird dabei nicht einfach in einem klassischen Emulator ausgeführt. Der Spielcode wird für moderne Plattformen neu kompiliert und mit einer zeitgemäßen Laufzeitumgebung verbunden.

Diese Form der [Recompilation](https://oliverjessner.at/category/recomp/) soll das Verhalten des Originals möglichst genau erhalten. Gleichzeitig lassen sich Funktionen ergänzen, die auf dem Nintendo 64 nicht möglich waren.

Der Android-Port verwendet eine native Laufzeitumgebung innerhalb einer Android-App. Er wurde vor allem für leistungsfähige Gaming-Handhelds entwickelt und laut Entwickler unter anderem auf dem AYN Thor getestet.

## Welche Funktionen übernimmt der Port?

Die Android-Version soll funktional mit der PC-Ausgabe von Banjo: Recompiled gleichziehen. Dazu gehören:

- Unterstützung für höhere Bildraten
- Widescreen-Darstellung
- Controller-Support
- Speichern bereits eingesammelter Noten
- Import von Mods und Texture Packs
- weitgehend originales Spielverhalten und originale Audioausgabe

Im Unterschied zu vielen Formen der klassischen [Emulation](https://oliverjessner.at/category/emulation/) müssen die Eingaben nicht erst über eine virtuelle Nintendo-64-Hardware übersetzt werden. Das bedeutet allerdings nicht automatisch, dass der Port auf jedem Android-Gerät gleich gut läuft. Grafiktreiber, Prozessorarchitektur und die Vulkan-Unterstützung des Geräts bleiben wichtige Faktoren.

## Dual-Screen und Speicherverwaltung

Eine Besonderheit ist die Unterstützung von Android-Geräten mit zwei Bildschirmen. Der zweite Bildschirm zeigt nicht einfach eine Kopie des Spiels. Stattdessen dient er als eigene Statusanzeige.

Dort können unter anderem Leben, Energie, Noten, Eier, Federn, Jiggies, Mumbo-Schädel und Jinjos dargestellt werden. Hintergrund und angezeigte Informationen passen sich an das aktuelle Gebiet und den Spielzustand an.

Auch die Speicherverwaltung wurde an Android angepasst. Spielstände lassen sich innerhalb der App importieren und exportieren. Zusätzlich kann ein Ordner über die Android-Dokumentenauswahl festgelegt werden. Die App synchronisiert den aktiven Spielstand anschließend mit diesem Ordner.

Das ist besonders bei Handhelds praktisch, auf denen Spielstände regelmäßig gesichert oder zwischen unterschiedlichen Installationen übertragen werden sollen.

## Installation ist noch nicht für alle gedacht

Zum Stand vom 1. August 2026 ist im GitHub-Repository kein regulärer Release mit einer fertigen APK aufgeführt. Der Port ist daher noch keine Anwendung, die sich einfach aus dem Play Store oder über eine veröffentlichte Installationsdatei laden lässt.

Die Projektdokumentation beschreibt stattdessen den Bau einer Debug-APK mit Gradle und CMake. Anschließend wird die erzeugte APK über ADB auf einem verbundenen Android-Gerät installiert.

Der aktuelle Stand richtet sich damit eher an Entwickler und erfahrene Tester. Für eine unkomplizierte Installation auf einem normalen Smartphone oder Android-Handheld sollte ein offizieller Release abgewartet werden.

**Hinweis:** Das Projekt enthält weder eine Banjo-Kazooie-ROM noch andere geschützte Spieldaten. Zum Start wird eine eigene, unterstützte ROM benötigt.

## Mods und Texture Packs unter Android

Der Android-Port unterstützt den lokalen Import von Mods und Texture Packs. Als getestetes Beispiel nennt der Entwickler das Texture Pack "BK Reloaded". Bei anderen Mods können abhängig von Version und verwendeten Funktionen noch Kompatibilitätsprobleme auftreten.

Wie Mods in der regulären Version unter Windows, macOS und Linux eingerichtet werden, zeige ich im Artikel [Banjo Recompiled Mods installieren](https://oliverjessner.at/banjo-recompiled-mod-installieren/).

Die grundsätzliche Mod-Unterstützung macht den Android-Port besonders interessant. Banjo-Kazooie lässt sich damit nicht nur mobil spielen, sondern auch mit überarbeiteten Texturen und kleineren Komfortfunktionen erweitern.

## Fazit

Banjo Recompiled auf Android ist noch kein fertiges Produkt für den Massenmarkt. Technisch ist der Port aber bereits deutlich mehr als ein erster Startversuch. Widescreen, Controller-Support, Mods, eine angepasste Speicherverwaltung und die Dual-Screen-Anzeige sind bereits integriert.

Für Besitzer leistungsfähiger Android-Handhelds ist das Projekt deshalb einen Blick wert. Wer lediglich eine fertige APK installieren und sofort spielen möchte, sollte die weitere Entwicklung und einen offiziellen Release abwarten.
