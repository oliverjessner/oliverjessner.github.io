---
layout: post
title: 'FaceStealer: Gefälschte Zoom- und Teams-Meetings als Krypto-Falle'
date: 2026-11-15 00:47:19 +0100
authors:
  - oliver_jessner
meta_og_type: article
categories:
  - computer-stuff
  - Privacy
  - software-development
description: 'Vertrautes Gesicht, angebliches Tonproblem: Wie FaceStealer gefälschte Videokonferenzen für Krypto-Diebstahl nutzt und welche Warnsignale zählen'
thumbnail: /assets/images/gen/blog/facestealer-gefaelschte-zoom-und-teams-meetings-als-krypto-falle/header_thumbnail.webp
image: /assets/images/gen/blog/facestealer-gefaelschte-zoom-und-teams-meetings-als-krypto-falle/header.webp
faq:
  - question: Was ist FaceStealer?
    answer: FaceStealer ist eine vom FBI beschriebene Betrugsmasche mit gefälschten Videokonferenzen. Angreifer imitieren vertraute Kontakte und bringen ihre Zielpersonen dazu, Schadsoftware als vermeintliche Fehlerbehebung auszuführen.
  - question: Sind Zoom oder Microsoft Teams bei FaceStealer gehackt?
    answer: Die beschriebene Masche verwendet nachgebaute Meeting-Oberflächen. Das vertraute Erscheinungsbild ist kein Beleg dafür, dass die echte Plattform genutzt wird oder deren Infrastruktur kompromittiert wurde.
  - question: Woran erkenne ich einen verdächtigen Videoanruf?
    answer: Ein wichtiges Warnsignal ist die Aufforderung, wegen eines angeblichen Tonproblems Software zu installieren oder Befehle auszuführen. Beende das Meeting und überprüfe die Einladung über einen unabhängig gewählten Kontaktweg.
socialmedia:
  - 'FaceStealer nutzt gefälschte Zoom- und Teams-Meetings, vertraute Gesichter und angebliche Tonprobleme. Der entscheidende Moment: Aus einer vermeintlichen Reparatur wird die Ausführung von Schadsoftware.'
  - Ein bekanntes Gesicht im Videoanruf bestätigt noch keine Identität. Bei FaceStealer spielen Angreifer Aufnahmen früherer Opfer ab und nutzen übernommene Konten für neue Einladungen.
  - 'Gefälschte Videokonferenzen betreffen auch die Softwareentwicklung: Das FBI warnt vor FaceStealer-Angriffen auf Open-Source-Maintainer. Ziel können neben Kryptowährungen auch Zugänge zu Software-Repositories sein.'
news: true
pinned: false
ads: true
image_width: 1280
image_height: 720
---

Ein vertrautes Gesicht im Videoanruf schafft Vertrauen. FaceStealer nutzt genau das aus: Gefälschte Meetings und angebliche Tonprobleme sollen Menschen dazu bringen, Schadsoftware auszuführen.

## Was ist FaceStealer?

FaceStealer ist eine Social-Engineering-Masche, bei der Angreifer bekannte Kontakte in gefälschten Videokonferenzen nachahmen. Social Engineering bedeutet hier: Die Täter manipulieren eine Alltagssituation, damit die Zielperson selbst eine schädliche Handlung ausführt.

Nach Angaben des FBI führte die Kampagne innerhalb von 18 Monaten zum Diebstahl von Kryptowährungen im Wert von mehr als 400 Millionen US-Dollar. Bei der Unterbrechung der verwendeten Infrastruktur stellten Ermittler außerdem mehr als 900 Webcam-Videos von Betroffenen sicher. Diese Zahl beschreibt sichergestellte Aufnahmen, keine unabhängig bestätigte Gesamtzahl aller Opfer. Das FBI ordnet die Angriffe nordkoreanischen Akteuren zu. [Quelle: FBI](https://www.fbi.gov/investigate/cyber/facestealer-cryptocurrency-theft-scheme)

## Wie die gefälschten Zoom- und Teams-Meetings funktionieren

Der Einstieg erfolgt über eine Nachricht, die scheinbar von einem bekannten Menschen oder einem relevanten Branchenkontakt stammt. Dafür verwenden die Täter unter anderem übernommene Telegram- oder LinkedIn-Konten. Die Einladung führt anschließend zu einer nachgebauten Meeting-Oberfläche.

Im vermeintlichen Gespräch erscheint das Video der erwarteten Person. Tatsächlich läuft eine zuvor aufgezeichnete Webcam-Aufnahme. Auch mehrere scheinbare Teilnehmer können Teil der Inszenierung sein.

Dann folgt der entscheidende Vorwand: Der Ton funktioniert angeblich nicht. Eine Nachricht oder eine gefälschte Fehlermeldung fordert dazu auf, ein Update auszuführen oder Anweisungen zur Reparatur zu befolgen. Wer darauf eingeht, kann dadurch Schadsoftware auf dem eigenen Rechner ausführen. Das FBI beschreibt diesen Ablauf ausdrücklich in seiner [Erläuterung zu FaceStealer](https://www.fbi.gov/video-repository/facestealer_110526.mp4/view).

Die Täuschung verbindet damit drei Dinge, die im Arbeitsalltag vertraut wirken: eine Nachricht aus dem eigenen Netzwerk, ein bekanntes Gesicht und ein technisches Problem kurz vor einem Meeting.

## Warum auch erfahrene Nutzer darauf hereinfallen können

Ein übernommenes Konto kann einen glaubwürdigen Gesprächsverlauf mitbringen. Eine echte Videoaufnahme verstärkt den Eindruck, tatsächlich mit der erwarteten Person verbunden zu sein. Wenn weitere Teilnehmer scheinbar warten, entsteht zusätzlich Zeitdruck.

Das FBI berichtet, dass sich unter den Betroffenen auch erfahrene Entwickler und Sicherheitsexperten befinden. Technisches Wissen allein verhindert deshalb nicht jede Täuschung. Gerade routinierte Nutzer sind es gewohnt, kleinere Probleme selbst zu beheben. FaceStealer macht aus dieser Hilfsbereitschaft einen Angriffspunkt. [Quelle: FBI-Video mit Transkript](https://www.fbi.gov/video-repository/facestealer_110526.mp4/view)

Für die Täuschung braucht es dabei nicht zwingend ein aufwendig erzeugtes KI-Video. Schon die Wiedergabe einer echten Aufnahme kann ausreichen, wenn Einladung und Situation glaubwürdig erscheinen.

## Weshalb Open-Source-Entwickler ebenfalls im Visier stehen

Die Angriffe betreffen nicht ausschließlich Menschen mit eigenen Krypto-Beständen. Das FBI warnt auch vor gezielten Versuchen, Geräte und Repository-Konten von Open-Source-Entwicklern und Maintainern zu übernehmen.

Solche Zugänge können Angreifern ermöglichen, Schadcode über vertrauenswürdige Software weiterzuverbreiten. Damit reicht das mögliche Risiko über den unmittelbar betroffenen Rechner hinaus. Für die [Softwareentwicklung](https://oliverjessner.at/category/software-development/) ist die Kampagne deshalb auch ein Thema der Lieferkettensicherheit. [Quelle: FBI-Warnung zu FaceStealer](https://www.fbi.gov/investigate/cyber/facestealer-cryptocurrency-theft-scheme)

Hinzu kommt ein sich selbst verstärkender Effekt: Heimlich aufgezeichnete Videos und übernommene Kommunikationskonten können als Ausgangspunkt für die nächste Täuschung dienen. Dadurch betrifft der Angriff ebenso die [Privacy](https://oliverjessner.at/category/Privacy/) der Betroffenen und das Vertrauen ihrer Kontakte.

## Welche Warnsignale im Alltag zählen

Ein stilles Mikrofon oder ein fehlender Ton ist für sich genommen kein Hinweis auf einen Angriff. Verdächtig wird die Situation, wenn eine Meeting-Seite oder ein Gesprächspartner daraus die Notwendigkeit ableitet, zusätzliche Software auszuführen.

**Warnhinweis:** Installiere keine angeblichen Audio-Reparaturen aus dem Meeting-Chat. Führe auch keine kopierten Befehle aus, nur weil eine Fehlermeldung oder ein vermeintlicher Kontakt dazu auffordert.

Für den Alltag helfen einige einfache Prüfschritte:

- **Meeting unterbrechen:** Zeitdruck ist kein guter Grund, einen unbekannten Download auszuführen.
- **Kontakt unabhängig prüfen:** Rufe die Person über eine bereits bekannte Telefonnummer an. Eine Rückfrage im möglicherweise übernommenen Chat schafft keine unabhängige Bestätigung.
- **Anwendung selbst öffnen:** Starte die bereits installierte Meeting-App und prüfe, ob sich das Gespräch darüber erreichen lässt.
- **Updates unabhängig beziehen:** Nutze die Update-Funktion der Anwendung oder eine selbst aufgerufene offizielle Bezugsquelle.
- **Webadresse genau ansehen:** Ein bekanntes Logo und der Name einer Plattform innerhalb einer Adresse bestätigen deren Echtheit nicht.

Die beschriebene Masche ist kein Beleg für eine Sicherheitslücke in Zoom oder Microsoft Teams. Die Täter bauen vertraute Oberflächen nach und nutzen sie als Kulisse.

## Was tun, wenn die vermeintliche Reparatur bereits ausgeführt wurde?

Wenn du Software oder Befehle aus einem solchen Meeting ausgeführt hast, behandle den Rechner zunächst als möglicherweise kompromittiert. Trenne ihn vom Netzwerk und informiere bei einem Arbeitsgerät sofort die zuständige IT.

Sichere wichtige Konten anschließend von einem anderen, vertrauenswürdigen Gerät aus. Dazu gehören das Ändern betroffener Passwörter und das Widerrufen aktiver Sitzungen. Bei Entwicklerkonten sollten auch Zugriffstoken und Repository-Berechtigungen geprüft werden. Ein Passwortwechsel allein entfernt keine Schadsoftware vom Rechner.

Bewahre die Einladung, die verwendete Adresse und vorhandene Nachrichten für die Untersuchung auf. Warne betroffene Kontakte über einen unabhängigen Kanal, falls dein Konto oder dein Video für weitere Einladungen missbraucht werden könnte.

Die praktische Lehre aus FaceStealer ist klar: Ein vertrautes Gesicht bestätigt noch keine sichere Verbindung. Sobald ein Videoanruf die Ausführung von Software oder Befehlen verlangt, lohnt sich eine Unterbrechung zur unabhängigen Prüfung.
