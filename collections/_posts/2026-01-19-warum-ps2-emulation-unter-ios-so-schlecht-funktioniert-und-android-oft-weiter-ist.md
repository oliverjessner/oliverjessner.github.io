---
layout: post
title: 'Warum PS2-Emulation unter iOS so schlecht funktioniert und Android weiter ist'
date: 2026-01-19 09:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - emulation
    - gaming
    - computer-stuff
description: 'Der erste PS2-Emulator GamePlaytoo ist da, doch iOS bremst: JIT, Sandboxing und Metal machen PS2-Emulation schwer'
thumbnail: '/assets/images/gen/blog/warum-ps2-emulation-unter-ios-so-schlecht-funktioniert-und-android-oft-weiter-ist/header_thumbnail.webp'
image: '/assets/images/gen/blog/warum-ps2-emulation-unter-ios-so-schlecht-funktioniert-und-android-oft-weiter-ist/header.webp'
---

Seit dem ersten PS2-[Emulator](https://oliverjessner.at/category/emulation/) auf iPhone und iPad fragen sich viele: Warum ruckelt es trotz starker Hardware? Die Antwort liegt weniger im Chip als in iOS selbst.

## Der Eindruck aus der Praxis: Viel Potenzial, wenig Spielbarkeit

Mein guter Freund [Mukaan](https://mukaan.de/) hat mich gefragt, ob ich nicht bei einem Video zum Thema PS2-Emulation helfen kann. Dabei sind einige Fragen aufgetaucht, warum PS2 unter iOS so schlecht läuft. Noch mal einen Schritt zurück.

Wenn ein neuer Emulator erscheint, ist die Erwartung naheliegend: Ein [iPad mit M2](https://oliverjessner.at/blog/2026-01-17-gameplaytoo-auf-ipad-m2-ps2-emulator-fuer-ios-im-kurztest/) sollte eine PS2 doch locker schaffen. In der Praxis sieht der Start oft anders aus. Spiele starten nicht, stürzen nach dem Intro ab, hängen nach Menüs, laufen mit einstelligen FPS oder haben Tonprobleme. Das ist kein Ausreißer, sondern ein Muster, das bei PS2-Emulation auf iOS besonders häufig auftritt.

> Aber anzumerken ist, dass der Entwickler explizit erwähnt, dass die derzeitige Version nur für 2D-Spiele geeignet ist.

Der wichtigste Punkt dabei: Viele dieser Probleme sind nicht primär "Bugs im Spiel", sondern Folgen davon, wie iOS Apps ausführt, absichert und einschränkt.

## PS2-Emulation ist anspruchsvoller als viele erwarten

Die PlayStation 2 ist aus Emulationssicht eine der unbequemeren Konsolen. Nicht weil die Grafik "so krass" (TikTok Kommentare lassen grüßen) wäre, sondern wegen Architektur, Timing und Eigenheiten vieler Engines.

Typische Stolpersteine:

- CPU-Emulation ist teuer, besonders wenn sie nicht aggressiv optimiert werden darf
- Viele Spiele reagieren empfindlich auf Timing-Abweichungen
- Grafikpfade sind oft speziell, inklusive Effekten, die nicht sauber auf moderne APIs passen
- Save States, Shader-Caches und Textur-Caches werden schnell groß und müssen stabil laufen

Auf Plattformen, die Emulatoren ihre stärksten Optimierungen erlauben, kann man diese Komplexität über Jahre wegpolieren. Auf iOS ist genau das schwer.

## Der Kernunterschied: JIT und dynarec sind auf iOS nicht "einfach verfügbar"

Moderne Emulatoren sind schnell, weil sie einen großen Teil der emulierten CPU-Arbeit zur Laufzeit in nativen Code übersetzen. Das läuft je nach Projekt unter Begriffen wie JIT oder dynamischer Recompiler (dynarec).

iOS ist hier deutlich [restriktiver](https://support.apple.com/el-cy/guide/security/sec7c917bf14/web) als Android. Der Grund ist Sicherheit: Apple möchte verhindern, dass Apps zur Laufzeit beliebigen ausführbaren Code erzeugen. Damit sinkt das Risiko für ganze Klassen von Angriffen, aber es trifft Emulatoren genau an ihrer wichtigsten Leistungsader.

Die praktische Folge:

- Wenn kein performanter dynarec möglich ist, fällt der Emulator auf langsamere Ausführungsmodi zurück
- Performance bricht ein, was wiederum Timing und Stabilität verschlechtert
- Was wie Inkompatibilität wirkt, ist oft ein Leistungsproblem, das sich in Audio-Glitches, Freezes und Crashes übersetzt

## "Emulatoren sind erlaubt" heißt nicht "Emulatoren dürfen alles"

Apple hat den Kurs bei Emulatoren geöffnet. Das ist relevant, weil es überhaupt erst erlaubt, solche Apps normal zu veröffentlichen. Trotzdem bleibt das Betriebssystem mit seinen Regeln das Betriebssystem.

Zwei Dinge können gleichzeitig wahr sein:

- Emulatoren dürfen in den Store
- Emulatoren laufen weiterhin in einer Umgebung, die bestimmte Performance-Tricks deutlich erschwert

Der Unterschied ist wichtig, weil er Erwartungen erdet. Es ist ein Fortschritt, aber kein Freifahrtschein für den Reifegrad, den viele von Android gewohnt sind.

> Und für alle, die sich nun wieder fragen: Sind Emulatoren nicht illegal? Nein, solange sie keinen reverse-engineerten Code verwenden, sind sie nicht illegal.

## Grafik: Metal ist solide, aber Portierung ist Arbeit

Auf Android sind Emulatoren oft jahrelang auf Vulkan oder OpenGL getrimmt worden. Auf iOS ist Metal das Ziel. Das ist keine Wertung, sondern eine Realität für Entwickler: Rendering-Backends, Shader-Handling, Caches und Workarounds müssen neu stabilisiert werden.

Das sieht man in frühen Versionen besonders an:

- falscher Skalierung oder falschem Viewport
- Artefakten, flackernden Effekten oder kaputten Post-Processing-Pfaden
- übermäßigem Stottern durch fehlende Shader-Caches

Wenn bei einem Spiel nur ein Teil des Bildes nutzbar ist, ist das selten ein Hardware-Limit. Es ist fast immer ein Rendering-Problem, das noch nicht sauber gelöst ist.

## Sandboxing, Dateizugriff und Hintergrundregeln: viele kleine Bremsen

Emulation ist auch Dateimanagement: große Images, BIOS-Dateien, Memory Cards, Save States, Shader-Cache, Logs. iOS ist hier strenger als Android.

Typische Reibungspunkte:

- begrenztere Pfade und weniger direkte Kontrolle über das Dateisystem
- stärkeres Sandboxing, das manche Workflows umständlich macht
- Hintergrundverhalten und Energiesparregeln, die lang laufende Tasks beeinflussen können
- Fehlerbilder, die sich für Nutzer wie "endless loading" anfühlen, obwohl intern ein Zugriff oder eine Ressource blockiert

Keines dieser Themen ist allein der Hauptgrund. Zusammen verstärken sie aber genau die Instabilität, die man bei frühen iOS-Emulatoren oft spürt.

## Warum Android bei PS2 oft "einfach funktioniert"

Android ist nicht automatisch besser. Es ist nur ein Umfeld, in dem PS2-Emulation seit Jahren produktiv betrieben wird, und in dem bestimmte Optimierungen realistischer nutzbar sind.

Drei strukturelle Vorteile:

- Emulatoren können ihre dynarec-Strategien häufig näher am Optimum fahren
- Der Reifegrad vieler Android-Ports ist höher, inklusive Spiel-spezifischer Workarounds
- Grafik-Stacks und Treiber-Workarounds sind in der Emu-Szene länger erprobt, weil es mehr Geräte und mehr Testfläche gibt

Dazu kommt ein psychologischer Faktor: Android-PS2-Emulation wurde nicht über Nacht gut. Sie ist über Jahre durch Iteration, Kompatibilitätslisten und viele kleine Fixes dorthin gekommen.

## Was du als Leser daraus ableiten kannst

Wenn du PS2-Emulation auf iOS heute testest, solltest du sie als frühen Stand betrachten. Das heißt nicht, dass es "schlecht" bleibt. Es heißt nur, dass iOS die Kurve flacher macht als Android.

Eine realistische Erwartung für die nächsten Monate ist:

- mehr Stabilität durch Bugfixes und bessere Metal-Backends
- bessere Kompatibilität durch Spielprofile und Workarounds
- trotzdem ein Abstand bei Performance, solange dynarec nur eingeschränkt nutzbar ist

## Persönlich Meinung!

Ich schreibe das jetzt als jemand, der jahrelanger Apple-Nutzer ist und sich niemals vorstellen kann, sein iPhone gegen ein Android-Gerät einzutauschen. Verschiedene Systeme bieten verschiedene Vorteile.

Apples strikte Vorgaben bei der Entwicklung sind bei Projekten wie Emulation hinderlich, geben mir aber die Sicherheit, dass irgendwelche Apps, die ich im App Store lade, keinen Unfug treiben.

Darum macht es für mich auch Sinn, das zu trennen: Für Emulation allein habe ich mir zum Beispiel den [AYN Thor gekauft](https://oliverjessner.at/blog/2026-01-09-ayn-thor-community-qa/). Der läuft auf Android und kann sehr gut emulieren.

Ich verstehe oft nicht, woher das Bedürfnis kommt, dass ein Gerät alles erfüllen muss. Für mich ist diese Trennung die beste Lösung. Ungern möchte ich 500 GB ROMs und Emulatoren mit meinem iPhone vermischen, das grundlegende geschäftliche und private Inhalte enthält. Just my two cents.
