---
layout: post
title: 'Super ZSNES 0.310: SNES-Emulator für Apple TV und Android TV'
date: 2026-09-28 14:36:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - gaming
    - emulation
    - nintendo
description: 'Super ZSNES 0.310 bringt SNES-Emulation auf Apple TV und Android TV, inklusive Star-Fox-HD-Modus, Widescreen, Controller-Support und lokalem ROM-Transfer'
thumbnail: '/assets/images/gen/blog/super-zsnes-0-310-snes-emulator-fuer-apple-tv-und-android-tv/header_thumbnail.webp'
image: '/assets/images/gen/blog/super-zsnes-0-310-snes-emulator-fuer-apple-tv-und-android-tv/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Läuft Super ZSNES auf Apple TV und Android TV?'
      answer: 'Ja. Seit Version 0.310 unterstützt Super ZSNES sowohl Apple TV als auch Android TV. ROMs und Spielstände lassen sich über einen lokalen Webserver übertragen.'
    - question: 'Wie übertrage ich SNES-ROMs auf Apple TV mit Super ZSNES?'
      answer: 'Super ZSNES startet dafür einen lokalen Webserver. Dessen Adresse wird auf einem anderen Gerät im Browser geöffnet, anschließend lassen sich ROMs und Spielstände über das lokale Netzwerk übertragen.'
    - question: 'Was kostet Super ZSNES?'
      answer: 'Zum Stand vom 28. September 2026 kosten die Versionen für Apple und Android jeweils 3 US-Dollar. Die Desktop-Versionen für Windows, macOS und Linux werden kostenlos angeboten.'
socialmedia:
    - 'Super ZSNES 0.310 bringt den SNES-Emulator auf Apple TV und Android TV. Dazu kommen lokaler ROM-Transfer, bessere Controller-Unterstützung und eine erste HD-Erweiterung für Star Fox.'
    - 'SNES am Fernseher ohne zusätzlichen PC: Super ZSNES läuft jetzt auf Apple TV und Android TV. ROMs und Spielstände lassen sich dabei bequem über einen lokalen Webserver übertragen.'
    - 'Super ZSNES ist mehr als ein nostalgischer ZSNES-Neustart: Version 0.310 bringt Apple-TV- und Android-TV-Support, Widescreen-Verbesserungen, .zlua-Skripte und GPU-basierte Erweiterungen für Star Fox.'
news: true
---

Super ZSNES 0.310 landet auf Apple TV und Android TV. Der neu geschriebene SNES-Emulator bringt lokalen ROM-Transfer, Controller-Support und erste HD-Erweiterungen für Star Fox ins Wohnzimmer.

## Super ZSNES 0.310 bringt den SNES ins Wohnzimmer

Wer einen SNES-Emulator direkt am Fernseher nutzen möchte, bekommt mit Super ZSNES eine neue Option. Version 0.310 des Emulators unterstützt erstmals Apple TV und Android TV. Damit lässt sich die eigene SNES-Bibliothek ohne zusätzlichen PC oder Handheld direkt über eine Streaming-Box am Fernseher starten.

Super ZSNES ist dabei nicht einfach eine neue Version des klassischen ZSNES. Die beiden ursprünglichen Entwickler arbeiten wieder gemeinsam an dem Projekt, haben den Emulator allerdings vollständig neu geschrieben. Neben einer genaueren CPU- und Audio-Emulation setzt Super ZSNES auf eine GPU-basierte PPU und eigene Erweiterungen für einzelne Spiele.

Gerade für [Emulation](https://oliverjessner.at/category/emulation/) auf dem Fernseher ist die Unterstützung von Apple TV und Android TV interessant. Beide Plattformen sind bereits für Controller und Wohnzimmer-Nutzung ausgelegt. Mit Version 0.310 versucht Super ZSNES nun, genau diesen Anwendungsfall abzudecken.

## SNES-Emulator für Apple TV: ROMs einfach im Browser übertragen

Die größte praktische Frage bei einem Emulator auf Apple TV ist schnell gestellt: Wie bekomme ich meine Spiele überhaupt auf das Gerät?

Super ZSNES löst das über einen lokalen Webserver. Der Emulator zeigt eine Adresse an, die sich auf einem Computer, Smartphone oder Tablet im selben Netzwerk im Browser öffnen lässt. Dort können anschließend ROM-Dateien und Spielstände übertragen werden.

Das ist wesentlich angenehmer als ein Dateitransfer über Entwicklerwerkzeuge oder andere Umwege. Im Alltag bedeutet das: Super ZSNES auf dem Apple TV öffnen, die angezeigte Adresse am Mac oder Smartphone aufrufen und die gewünschten Dateien übertragen.

Der Emulator selbst bringt keine Spiele mit. Die entsprechenden ROM-Dateien müssen vom Nutzer bereitgestellt werden.

Auch Spielstände können über diesen Weg übertragen werden. Damit eignet sich die TV-Version nicht nur für eine neue Sammlung, sondern auch dafür, bereits vorhandene Spielstände auf dem Fernseher weiterzunutzen.

## Super ZSNES läuft auch auf Android TV

Das gleiche Prinzip gilt für Android TV. Super ZSNES 0.310 unterstützt Android-basierte Fernseher und Streaming-Geräte und ergänzt dort zusätzlich die Unterstützung für Frontend-Launcher.

Damit wird Android TV für Super ZSNES zu einer ähnlichen Plattform wie ein klassischer Retro-Gaming-PC. Emulator, Spiele und Controller befinden sich direkt am Fernseher, ohne dass dafür ein separater Rechner angeschlossen werden muss.

Für [Retro-Gaming](https://oliverjessner.at/category/gaming/) ist das vor allem deshalb praktisch, weil moderne Streaming-Boxen ohnehin dauerhaft am Fernseher hängen. Die Einstiegshürde reduziert sich damit auf Emulator, Controller und die eigenen Spieldateien.

## Star Fox bekommt eine eigene HD-Erweiterung

Technisch interessanter als der reine TV-Support ist ein anderes Feature von Version 0.310: Super ZSNES enthält eine erste Erweiterung für Star Fox.

Dabei handelt es sich nicht einfach um einen klassischen Grafikfilter oder einen Upscaler. Super ZSNES rekonstruiert Modelle und Sprites des Spiels als tatsächliche 3D-Modelle, die anschließend über die GPU dargestellt werden.

Dadurch werden unter anderem höhere Auflösungen, Breitbilddarstellung und Interpolation möglich. Die aktuelle Umsetzung funktioniert allerdings nur mit dem unveränderten Original-ROM von Star Fox.

Gerade Star Fox ist für einen solchen Ansatz interessant. Das SNES-Spiel verwendet den Super-FX-Chip und erzeugt damit polygonale 3D-Grafik, die sich deutlich von klassischen 2D-SNES-Spielen unterscheidet.

Super ZSNES kann an dieser Stelle deshalb mehr verändern als lediglich die Ausgabeauflösung hochzusetzen.

## Super Enhancement Engine statt einfachem Upscaling

Diese Erweiterungen sind Teil der sogenannten "Super Enhancement Engine". Sie soll ausgewählte SNES-Spiele gezielt technisch erweitern.

Unterstützt werden bereits Spiele wie Chrono Trigger, F-Zero, Mega Man X, Super Mario Kart, Super Mario World und Super Metroid. Je nach Spiel können höhere Auflösungen, Widescreen-Modi, Texturen, Normal Maps, Overclocking oder überarbeitete Audioinhalte zum Einsatz kommen.

Das unterscheidet Super ZSNES von vielen klassischen Emulatoren. Das Ziel besteht nicht ausschließlich darin, die ursprüngliche Hardware möglichst exakt nachzubilden. Der Emulator bietet zusätzlich optionale Erweiterungen, die auf einzelne Spiele zugeschnitten werden.

Wer seine Spiele möglichst originalgetreu nutzen möchte, kann diese Funktionen deaktivieren.

Für [Nintendo](https://oliverjessner.at/category/nintendo/) ist das Konzept nicht neu. Projekte rund um ROM-Hacks, Widescreen-Patches und HD-Texturen versuchen seit Jahren, ältere Spiele auf modernen Displays angenehmer darzustellen. Super ZSNES integriert solche Möglichkeiten allerdings direkt in den Emulator.

## Eigene Skripte und Erweiterungen kommen dazu

Version 0.310 öffnet Super ZSNES zusätzlich stärker für eigene Erweiterungen.

Neu ist eine erste Unterstützung für `.zlua`-Skripte. Außerdem kann der Emulator eigene `.zsmod`-Dateien laden. Eine solche Erweiterungsdatei wird gemeinsam mit dem zugehörigen ROM gespeichert und muss denselben Dateinamen verwenden.

Damit entsteht neben den offiziellen Verbesserungen eine technische Grundlage für Erweiterungen durch die Community.

Auch der interne Breitbildmodus wurde angepasst. Wenn für ein Spiel bereits ein eigener Widescreen-Modus aktiv ist, deaktiviert Super ZSNES seine allgemeine Breitbildfunktion automatisch. Das behebt unter anderem Probleme mit dem Widescreen-Patch für Super Metroid.

## Controller-Unterstützung wurde verbessert

Für Apple TV und Android TV ist eine vernünftige Controller-Unterstützung entscheidend. Genau daran haben die Entwickler in Version 0.310 ebenfalls gearbeitet.

Mehrere Probleme bei der Erkennung von Controller-Tasten und Eingaben über das Steuerkreuz wurden behoben. Der rechte Analogstick kann außerdem den 3D-Layer-Modus steuern. Wird der linke Analogstick gedrückt gehalten, lässt sich der Zoom-Modus aktivieren.

Auf mobilen Geräten unterstützt Super ZSNES inzwischen zusätzlich eine Darstellung im Hochformat.

Die neuen Funktionen zeigen allerdings auch, dass sich Super ZSNES noch deutlich in Entwicklung befindet. Der Emulator ist bereits auf vielen Plattformen verfügbar, aber noch nicht in allen Situationen so ausgereift wie etablierte SNES-Emulatoren.

## Auf Apple TV gibt es noch Baustellen

Ein erster Praxistest von RetroRGB zeigt einige dieser Probleme.

So war dort zunächst nicht klar, wie sich bestimmte Schalter für die Emulator-Erweiterungen mit der Apple-TV-Fernbedienung oder einem PlayStation-5-Controller erreichen lassen. Auch die Darstellung der Scanlines wirkte im Test teilweise ungleichmäßig.

Noch deutlicher war ein anderes Problem: Auf einem Apple TV mit der aktuellen Systemversion 27 stürzte die App im Test direkt nach dem Öffnen ab. Auf einem Gerät mit iOS 26 funktionierte Super ZSNES dagegen.

Das muss nicht jedes Gerät und jede Konfiguration betreffen, zeigt aber, dass die neue TV-Unterstützung noch nicht als vollständig ausgereift betrachtet werden sollte.

Wer Super ZSNES am Fernseher ausprobiert, sollte außerdem den Spielemodus des Fernsehers aktivieren. Im Test von RetroRGB reduzierte dieser die wahrgenommene Eingabeverzögerung deutlich. Das betrifft grundsätzlich viele Konsolen und Emulatoren, weil andere TV-Modi zusätzliche Bildverarbeitung verwenden können.

## Was kostet Super ZSNES?

Zum Stand vom 28. September 2026 kosten die Versionen für Apple und Android jeweils 3 US-Dollar.

Für Windows, macOS und Linux bietet das Projekt kostenlose Desktop-Versionen an. Damit kann Super ZSNES auch zunächst am Rechner ausprobiert werden, bevor die TV-Version zum Einsatz kommt.

Die Unterstützung reicht damit inzwischen von klassischen Desktop-Systemen über Smartphones und Tablets bis hin zu Apple TV und Android TV.

## Super ZSNES wird damit vor allem am Fernseher interessant

SNES-Emulatoren gibt es seit Jahrzehnten. Allein die Möglichkeit, Super-Nintendo-Spiele zu emulieren, macht Super ZSNES deshalb noch nicht besonders.

Interessanter ist die Kombination aus Wohnzimmer-Plattform, einfachem Dateitransfer und den spielespezifischen Erweiterungen. Gerade Apple TV ist normalerweise nicht das erste Gerät, an das man bei SNES-Emulation denkt. Mit einem Bluetooth-Controller und dem lokalen Datei-Upload wird daraus aber ein erstaunlich unkompliziertes Setup.

Super ZSNES verfolgt gleichzeitig einen anderen Ansatz als Emulatoren, die sich ausschließlich auf möglichst originalgetreue Wiedergabe konzentrieren. Die Entwickler wollen Spiele nicht nur emulieren, sondern bei Bedarf auch technisch erweitern.

Version 0.310 ist dabei sichtbar noch ein Zwischenschritt. Einige Funktionen benötigen Feinschliff und insbesondere die Apple-TV-Version hat noch Probleme. Als Grundlage für einen SNES-Emulator, der direkt auf modernen Fernsehern und Streaming-Boxen läuft, wird Super ZSNES damit aber deutlich interessanter.
