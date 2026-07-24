---
layout: post
title: 'macOS 27 Golden Gate: DVD-Wiedergabe vor dem Aus'
date: 2026-07-24 20:00:43 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - macos
    - computer-stuff
    - software-development
description: 'Apple entfernt DVDPlayback aus dem macOS-27-SDK. Was das für den DVD-Player, bestehende Apps und Alternativen wie VLC bedeutet'
thumbnail: '/assets/images/gen/blog/macos-27-golden-gate-dvd-wiedergabe-vor-dem-aus/header_thumbnail.webp'
image: '/assets/images/gen/blog/macos-27-golden-gate-dvd-wiedergabe-vor-dem-aus/header.webp'
image_width: 1280
image_height: 854
faq:
    - question: 'Kann macOS 27 Golden Gate weiterhin DVDs abspielen?'
      answer: 'Voraussichtlich ja. Apple entfernt DVDPlayback zunächst aus dem SDK, kündigt die vollständige Entfernung aber erst für eine spätere macOS-Version an.'
    - question: 'Verschwindet der DVD-Player bereits mit macOS 27?'
      answer: 'Apple hat das Ende der App nicht ausdrücklich bestätigt. Die Abkündigung des zugrunde liegenden Frameworks zeigt jedoch, dass der integrierte DVD-Player langfristig keine verlässliche Lösung mehr ist.'
    - question: 'Welche Alternative gibt es zum DVD-Player auf dem Mac?'
      answer: 'VLC ist eine bekannte kostenlose Alternative und unterstützt laut VideoLAN auch die Wiedergabe von DVDs. Zusätzlich wird weiterhin ein kompatibles externes DVD-Laufwerk benötigt.'
socialmedia:
    - 'macOS 27 Golden Gate entfernt DVDPlayback aus dem SDK. Der DVD-Player verschwindet damit noch nicht sofort, doch Apple bereitet das Ende der integrierten DVD-Wiedergabe vor.'
    - 'DVDs am Mac bleiben unter macOS 27 zunächst nutzbar. Für die Zukunft sollten sich Nutzer aber nicht mehr auf Apples DVD-Player verlassen. VLC und andere unabhängige Player werden wichtiger.'
    - 'Apple räumt in macOS 27 alte Technik auf: Das DVDPlayback-Framework kann nicht mehr für neue Builds genutzt werden und soll später ganz verschwinden. Was das praktisch bedeutet.'
---

Apple entfernt das DVDPlayback-Framework aus dem SDK von macOS 27 Golden Gate. DVDs funktionieren zunächst weiter, langfristig braucht es aber unabhängige Player.

## macOS 27 entfernt DVDPlayback aus dem SDK

Apple bereitet das Ende seiner integrierten DVD-Wiedergabe vor. In den [Release Notes zu macOS 27 Golden Gate](https://developer.apple.com/documentation/macos-release-notes/macos-27-release-notes) steht, dass das Framework `DVDPlayback` nicht mehr Teil des neuen SDK ist. Anwendungen können mit dem macOS-27-SDK daher nicht mehr dagegen gebaut werden.

Apple kündigt außerdem an, das Framework in einer zukünftigen Version von [macOS](https://oliverjessner.at/category/macos/) vollständig zu entfernen. Das ist ein wichtiger Unterschied: Unter macOS 27 verschwindet die technische Laufzeitkomponente noch nicht zwingend aus dem System. Für Entwickler ist sie aber bereits ein Auslaufmodell.

Wer gelegentlich eine Film-DVD am Mac abspielt, muss deshalb nicht davon ausgehen, dass nach dem Update auf macOS 27 sofort nichts mehr funktioniert. Die Richtung ist dennoch klar. Apples eigene DVD-Technik hat keine langfristige Zukunft mehr.

## Was ist das DVDPlayback-Framework?

`DVDPlayback` stammt aus der Zeit von Mac OS X 10.3. Das Framework stellt Schnittstellen bereit, über die Anwendungen Funktionen zur DVD-Wiedergabe einbinden können. Dazu gehören nicht nur das eigentliche Video, sondern auch DVD-Menüs, Kapitel, Untertitel und weitere typische Bestandteile einer Video-DVD.

Für die [Softwareentwicklung](https://oliverjessner.at/category/software-development/) ist die Entfernung aus dem SDK der entscheidende Schritt. Bestehende Programme lassen sich möglicherweise noch ausführen, solange das Framework im Betriebssystem vorhanden ist. Entwickler können sich für neue Versionen ihrer Apps aber nicht mehr auf diese Apple-Schnittstelle verlassen.

Programme mit DVD-Funktionen müssen deshalb auf eine eigene Wiedergabelösung oder eine andere Medienbibliothek umgestellt werden. Dabei geht es nicht nur um das Abspielen einer Videodatei. Auch Navigation, Regionalcodes, Untertitel, Audiospuren und der Zugriff auf externe Laufwerke müssen berücksichtigt und getestet werden.

## Verschwindet der DVD-Player schon mit macOS 27?

Apple hat bisher nicht ausdrücklich angekündigt, die App DVD-Player bereits aus macOS 27 Golden Gate zu entfernen. Die Release Notes beziehen sich zunächst auf das Framework und das SDK.

Der [DVD-Player wird von Apple weiterhin dokumentiert](https://support.apple.com/de-at/guide/dvd-player/dvdp1fe13dc6/mac). Die App kann Video-DVDs sowie lokal gespeicherte `VIDEO_TS`-Ordner öffnen. Blu-ray-Discs unterstützt sie dagegen nicht.

Langfristig hängt die Zukunft der App am zugrunde liegenden Framework. Sobald Apple `DVDPlayback` vollständig aus macOS entfernt, müsste das Unternehmen den DVD-Player technisch neu aufbauen oder ebenfalls streichen. Angesichts der Abkündigung ist es vernünftig, nicht mehr dauerhaft mit der integrierten App zu planen.

## DVDs unter macOS 27 weiter abspielen

Für die Wiedergabe einer DVD wird weiterhin ein kompatibles internes oder externes optisches Laufwerk benötigt. Aktuelle Macs besitzen seit Jahren kein eingebautes DVD-Laufwerk mehr. Im [Computer-Alltag](https://oliverjessner.at/category/computer-stuff/) kommen daher meist USB-Laufwerke oder ältere Apple-SuperDrive-Modelle zum Einsatz.

Unter macOS 27 bieten sich zunächst drei Wege an:

1. **Apples DVD-Player weiterverwenden:** Solange die App und das Framework vorhanden sind, kann die bisherige Lösung weiter funktionieren.
2. **Auf einen unabhängigen Player umsteigen:** Der kostenlose [VLC Media Player](https://www.videolan.org/vlc/download-macosx.html) unterstützt laut VideoLAN neben zahlreichen Videoformaten auch DVDs.
3. **Vor einem großen macOS-Update testen:** Wer regelmäßig auf DVDs zugreift, sollte Laufwerk, Player, Menüs, Tonspuren und Untertitel vor einem produktiven Umstieg prüfen.

Eine alternative App löst allerdings nicht jedes mögliche Problem automatisch. Laufwerk, Disc-Zustand, Regionalcode und Kopierschutz können die Wiedergabe weiterhin beeinflussen. Gerade bei älteren Sammlungen lohnt sich deshalb ein Test mit mehreren Discs.

## Was die Änderung für bestehende Apps bedeutet

Apps, die Apples DVDPlayback-Schnittstelle verwenden, können unter macOS 27 zunächst weiterlaufen, solange die benötigte Komponente im System vorhanden ist. Eine Garantie für kommende macOS-Versionen gibt es jedoch nicht.

Für Entwickler entsteht dadurch ein klarer Migrationsbedarf. Spätestens bevor Apple das Framework vollständig entfernt, müssen betroffene Anwendungen angepasst werden. Andernfalls können sie ihre DVD-Funktionen verlieren oder gar nicht mehr starten.

Bei selten gepflegter Software ist das besonders relevant. Eine ältere App kann heute noch funktionieren, obwohl ihr Entwickler die DVD-Komponente seit Jahren nicht aktualisiert hat. Nach der vollständigen Entfernung des Frameworks ist dann nicht zwingend mit einem Update zu rechnen.

## Warum Apple die DVD-Technik entfernt

Die Entscheidung passt zu Apples langjährigem Rückzug von optischen Datenträgern. Neue Macs werden ohne DVD-Laufwerk ausgeliefert, Filme und Software kommen überwiegend über Downloads oder Streamingdienste. Ein altes Framework verursacht dennoch Wartungsaufwand und muss mit neuen Systemversionen, Sicherheitsmechanismen und Hardwaregenerationen kompatibel gehalten werden.

Für die Mehrheit der Mac-Nutzer dürfte die Änderung kaum auffallen. Relevant bleibt sie für Filmsammler, Archive, Bildungseinrichtungen und Menschen, die ältere Inhalte weiterhin von physischen Datenträgern nutzen.

Gerade dort zeigt sich ein grundsätzlicher Nachteil eingestellter Systemfunktionen: Die Disc selbst bleibt vorhanden, doch der einfache Zugriff darauf hängt von Laufwerken, Treibern und gepflegter Wiedergabesoftware ab.

## Fazit

macOS 27 Golden Gate beendet die DVD-Wiedergabe nicht sofort. Apple entfernt `DVDPlayback` zunächst aus dem SDK und kündigt die vollständige Entfernung für eine spätere macOS-Version an.

Für Nutzer bedeutet das vor allem eine Übergangsphase. Der integrierte DVD-Player kann vorerst weiter funktionieren, sollte aber nicht mehr als dauerhafte Lösung betrachtet werden. Wer DVDs regelmäßig am Mac abspielt, kann schon jetzt einen unabhängigen Player wie VLC testen und prüfen, ob das vorhandene Laufwerk zuverlässig damit arbeitet.
