---
layout: post
title: 'VLC 3.0.24: Großes Sicherheitsupdate mit über 130 Fixes'
date: 2026-09-25 09:17:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - computer-stuff
    - software-development
    - macos
    - linux
description: 'VLC 3.0.24 bringt über 130 Sicherheitsfixes, FFmpeg 8.1.2 und 49 aktualisierte Bibliotheken. Was sich unter Windows, macOS und Linux ändert'
thumbnail: '/assets/images/gen/blog/vlc-3-0-24-grosses-sicherheitsupdate-mit-ueber-130-fixes/header_thumbnail.webp'
image: '/assets/images/gen/blog/vlc-3-0-24-grosses-sicherheitsupdate-mit-ueber-130-fixes/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Sollte ich VLC auf Version 3.0.24 aktualisieren?'
      answer: 'Ja. VideoLAN bezeichnet VLC 3.0.24 als großes Sicherheitsupdate mit über 130 Sicherheitsfixes in VLC und den mitgelieferten Bibliotheken.'
    - question: 'Welche Sicherheitslücken behebt VLC 3.0.24?'
      answer: 'Das Changelog nennt unter anderem Out-of-Bounds-Zugriffe, Integer Overflows, Double-Free- und Use-after-Free-Probleme sowie eine Schwachstelle beim Parsen von MKV-Dateien.'
    - question: 'Was ist neben den Sicherheitsupdates neu in VLC 3.0.24?'
      answer: 'VLC aktualisiert unter anderem FFmpeg auf Version 8.1.2 und 49 Drittanbieter-Bibliotheken. Dazu kommen ATRAC3- und ATRAC9-Unterstützung, Verbesserungen bei Untertiteln, SRT und SFTP.'
socialmedia:
    - 'VLC 3.0.24 ist da. Das Update bringt über 130 Sicherheitsfixes, aktualisiert FFmpeg auf 8.1.2 und erneuert 49 weitere Bibliotheken. Wer VLC regelmäßig nutzt, sollte die installierte Version prüfen.'
    - 'VLC bekommt mit Version 3.0.24 eines seiner wichtigeren Updates: über 130 Security-Fixes, FFmpeg 8.1.2 und zahlreiche Fehlerkorrekturen für Windows und macOS.'
    - 'Über 130 Sicherheitsfixes heißt nicht automatisch 130 einzelne VLC-CVEs. VideoLAN zählt auch Korrekturen in mitgelieferten Bibliotheken. Trotzdem ist VLC 3.0.24 ein Update, das man nicht lange aufschieben sollte.'
news: true
---

VLC 3.0.24 ist vor allem ein Sicherheitsupdate: VideoLAN behebt über 130 Probleme in VLC und mitgelieferten Bibliotheken. Dazu kommt der Sprung auf FFmpeg 8.1.2.

## VLC 3.0.24 bringt über 130 Sicherheitsfixes

Wer den VLC Media Player auf dem Rechner hat, sollte die installierte Version prüfen. VideoLAN hat am 22. September 2026 VLC 3.0.24 veröffentlicht und bezeichnet das Release selbst als großes Sicherheitsupdate.

Nach Angaben des Projekts enthält die neue Version mehr als 130 Sicherheitsfixes in VLC und den zusammen mit dem Player ausgelieferten Bibliotheken. Gleichzeitig wurden 49 Drittanbieter-Bibliotheken aktualisiert.

Das ist eine wichtige Unterscheidung: Die Zahl bedeutet nicht zwangsläufig, dass VLC selbst mehr als 130 eigenständige Sicherheitslücken oder CVEs hatte. VideoLAN fasst unter dieser Zahl auch Korrekturen in den mitgelieferten Abhängigkeiten zusammen.

Unabhängig davon ist der Umfang für ein Wartungsupdate ungewöhnlich groß.

## Was hinter den Sicherheitsfixes steckt

Das [VLC-Changelog](https://github.com/videolan/vlc/blob/master/NEWS) nennt mehrere Klassen von Speicherfehlern, die mit Version 3.0.24 korrigiert werden.

Dazu gehören unter anderem:

- Out-of-Bounds-Zugriffe
- Integer Overflows
- Double-Free-Probleme
- Use-after-Free-Fehler
- eine mögliche Speichererschöpfung beim Verarbeiten speziell aufgebauter MKV-Dateien
- zusätzliche Absicherungen beim Parsen von Matroska- und EBML-Daten

Die Fehler betreffen verschiedene Demuxer, Packetizer und Codecs. Genau diese Komponenten sind dafür zuständig, Audio- und Videodateien zu zerlegen und deren Inhalte für die weitere Verarbeitung bereitzustellen.

Damit sind solche Fehler für einen Mediaplayer besonders relevant. VLC verarbeitet regelmäßig Dateien und Streams aus unterschiedlichsten Quellen. Manipulierte oder schlicht fehlerhafte Mediendateien können dadurch Codepfade erreichen, die bei normalen Dateien kaum auffallen.

VideoLAN hat zum Release angekündigt, die detaillierten [Security Advisories](https://www.videolan.org/security/) separat zu aktualisieren.

## FFmpeg springt von Version 4.4 auf 8.1.2

Auch abseits der unmittelbaren VLC-Korrekturen fällt eine Änderung auf: Die mitgelieferte FFmpeg-Version springt von 4.4 auf 8.1.2.

FFmpeg bildet einen wesentlichen Teil der technischen Grundlage für die Verarbeitung zahlreicher Audio- und Videoformate. VLC profitiert damit nicht nur von neuen Funktionen, sondern auch von Fehlerkorrekturen und Verbesserungen, die in den vergangenen FFmpeg-Versionen hinzugekommen sind.

Zusätzlich aktualisiert VLC 3.0.24 insgesamt 49 weitere Drittanbieter-Bibliotheken.

Gerade bei Software wie einem Mediaplayer ist das relevant. Ein erheblicher Teil der eigentlichen Formatverarbeitung findet nicht ausschließlich im VLC-eigenen Code statt, sondern in solchen Abhängigkeiten.

Aus Sicht der [Softwareentwicklung](https://oliverjessner.at/category/software-development/) ist VLC 3.0.24 deshalb nicht nur ein klassisches Bugfix-Release. Ein großer Teil des technischen Unterbaus wurde auf einen deutlich neueren Stand gebracht.

## Das ändert sich unter Windows und macOS

Neben den Sicherheitskorrekturen behebt VLC 3.0.24 einige Probleme, die im normalen Alltag auffallen konnten.

Unter Windows korrigiert VideoLAN unter anderem Abstürze, Speicherlecks und Deadlocks in der Audioausgabe. Auch Fehler bei der Darstellung über Direct3D11 wurden behoben.

Ein eher ungewöhnliches Problem betraf den Start von VLC nach einer Umstellung zwischen Sommer- und Winterzeit. Auch dieser Fehler soll mit Version 3.0.24 verschwinden.

Neu hinzu kommt außerdem Unterstützung für NV12-Aufnahmen über DirectShow.

Auf [macOS](https://oliverjessner.at/category/macos/) behebt VLC einen Absturz des AudioToolbox-MIDI-Synthesizers unter macOS 26 und neueren Versionen.

Wer VLC unter [Linux](https://oliverjessner.at/category/linux/) über die Paketverwaltung installiert hat, sollte dagegen prüfen, welche Version die eigene Distribution bereits anbietet. Neue VLC-Versionen landen nicht zwangsläufig gleichzeitig in allen Paketquellen.

## VLC 3.0.24 unterstützt zusätzliche Formate und Funktionen

Das Release enthält auch einige funktionale Erweiterungen.

VLC kann jetzt ATRAC3 und ATRAC9 dekodieren. ATRAC stammt ursprünglich von Sony und spielte unter anderem bei älteren Audioformaten und verschiedenen PlayStation-Systemen eine Rolle.

Neu sind außerdem CEA-708-Untertitel in MP4-Dateien. Die automatische Erkennung der Sprache von Untertiteln wurde ebenfalls verbessert.

Im Netzwerkbereich bekommt VLC einen SRT-Listener-Modus. Bei SFTP kommen zusätzliche Optionen für die Anmeldung mit öffentlichen Schlüsseln sowie Unterstützung für ED25519-Hostkeys hinzu.

RIST-Ein- und Ausgaben laufen nun über die Bibliothek librist.

Für den normalen Einsatz sind viele dieser Änderungen eher Spezialfälle. Zusammen zeigen sie aber, dass VLC 3.0.24 deutlich mehr verändert als nur einige Versionsnummern von Bibliotheken.

## Einige alte Funktionen verschwinden

Mit dem Update räumt VideoLAN gleichzeitig ältere Komponenten auf.

Das längst überholte NPAPI-Browser-Plugin wird entfernt. RealRTSP ist deaktiviert worden.

Auch die bisher mitgelieferte Datei `youtube.lua` verschwindet. Das Skript sollte VLC ermöglichen, Videos direkt über YouTube-URLs zu öffnen, funktionierte aufgrund von Änderungen bei YouTube allerdings bereits nicht mehr zuverlässig.

Wer diese Funktion bisher verwendet hat, sollte deshalb nicht davon ausgehen, dass VLC 3.0.24 sie repariert.

Zusätzlich stellt VideoLAN die Überprüfung eigener Softwareupdates auf einen neuen RSA-4096-Schlüssel um.

## VLC 3.0.24 herunterladen und installierte Version prüfen

Die aktuelle Version steht direkt auf der [offiziellen VLC-Webseite](https://www.videolan.org/vlc/releases/3.0.24.html) für Windows und macOS bereit.

Unter Linux hängt die verfügbare Version vom verwendeten Paketformat und der jeweiligen Distribution ab.

> **Hinweis:** Wer VLC über die Paketverwaltung seines Betriebssystems installiert hat, sollte nach Möglichkeit auch für das Update denselben Weg verwenden.

Die aktuell installierte VLC-Version lässt sich direkt im Programm über den jeweiligen Info- beziehungsweise Über-VLC-Dialog kontrollieren.

Steht dort noch VLC 3.0.23 oder eine ältere Version, ist ein Update auf 3.0.24 aufgrund der zahlreichen Sicherheitskorrekturen sinnvoll.

## VLC 3.0.24 ist mehr als ein gewöhnliches Wartungsupdate

VLC gehört zu den Programmen, die auf vielen Rechnern jahrelang installiert bleiben und oft nur dann geöffnet werden, wenn eine bestimmte Datei mit anderen Anwendungen nicht funktioniert.

Genau das macht Sicherheitsupdates bei einem Mediaplayer leicht übersehbar.

VLC 3.0.24 aktualisiert nicht nur den eigentlichen Player. Mit FFmpeg 8.1.2 und 49 weiteren erneuerten Bibliotheken verändert VideoLAN einen erheblichen Teil der technischen Basis.

Die Zahl von über 130 Sicherheitsfixes sollte dabei nicht mit 130 einzelnen VLC-Sicherheitslücken gleichgesetzt werden. Sie macht aber deutlich, welchen Schwerpunkt dieses Release hat.

Wer VLC unter Windows, macOS oder Linux verwendet, sollte deshalb prüfen, ob Version 3.0.24 bereits installiert ist.

## Quellen

- [VideoLAN: VLC 3.0.24 Vetinari](https://www.videolan.org/vlc/releases/3.0.24.html)
- [VideoLAN: VLC Changelog](https://github.com/videolan/vlc/blob/master/NEWS)
- [VideoLAN: Security Advisories](https://www.videolan.org/security/)
