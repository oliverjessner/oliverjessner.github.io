---
layout: post
title: 'PS5-Jailbreak: Firmware prüfen und Relapse richtig einordnen'
date: 2026-11-13 11:49:00 +0100
authors: ['oliver_jessner']
meta_og_type: article
tags: ['posts']
permalink: '/blog/2026-11-13-ps5-jailbreak-firmware-pruefen-relapse/'
weight: 999
categories:
  - gaming
  - computer-stuff
  - software-development
description: 'Welche PS5-Firmware unterstützt Relapse? So liest du deine Systemsoftware richtig und prüfst, welche Aussagen zu Jailbreak und Homebrew belastbar sind'
thumbnail: '/assets/images/gen/blog/ps5-jailbreak-firmware-pruefen-relapse/header_thumbnail.webp'
image: '/assets/images/gen/blog/ps5-jailbreak-firmware-pruefen-relapse/header.webp'
image_width: 1280
image_height: 720
image_alt: 'Editorial-Illustration einer PS5 mit einer Karte für Systemeinstellungen und der Headline "PS5: Firmware prüfen"'
faq:
  - question: 'Wo finde ich die Firmware-Version meiner PS5?'
    answer: 'Öffne Einstellungen, System, Systemsoftware und anschließend Konsoleninformationen. Dort steht die installierte Systemsoftware. Bei einer Versionsnummer wie 26.05-13.60.00 ist 13.60 die für den Vergleich relevante Firmware.'
  - question: 'Unterstützt Relapse jede PS5-Firmware von 7.00 bis 13.60?'
    answer: 'Die allgemeine Bereichsangabe ersetzt keine Versionsliste des verwendeten Builds. Sonic_Iso führt beispielsweise 10.60 und 11.40 als fehlend auf. Prüfe deshalb die genaue Implementierung und ihre dokumentierten Firmware-Profile.'
  - question: 'Funktioniert der Relapse-Jailbreak mit PS5-Firmware 14.22?'
    answer: 'Firmware 14.22 liegt außerhalb des von ntfargo dokumentierten Relapse-Bereichs von 7.00 bis 13.60. Eine Unterstützung dieser Version ist durch diese Projektdokumentation nicht belegt.'
socialmedia:
  - 'Welche PS5-Firmware hast du wirklich installiert? Wo du die Systemsoftware findest und warum bei einem Relapse-Jailbreak die konkrete Versionsliste zählt.'
  - 'PS5-Jailbreak ist keine pauschale Kompatibilitätszusage. Firmware, Exploit-Build und gewünschte Homebrew brauchen jeweils einen eigenen Blick in die Dokumentation.'
  - 'PS5, Slim oder Pro: Der Modellname allein reicht zur Einordnung eines Jailbreak-Angebots nicht aus. Ein praktischer Leitfaden zum Prüfen von Firmware und Relapse-Angaben.'
news: true
pinned: false
ads: true
---

Welche PS5 lässt sich mit Relapse jailbreaken? Dafür brauchst du die genaue Firmware und die passende Projektdokumentation. So prüfst du deine Konsole und erkennst die Grenzen allgemeiner Versionsangaben.

## PS5-Jailbreak prüfen: Welche Firmware ist installiert?

Der erste Schritt führt in die Einstellungen deiner Konsole. Die installierte Systemsoftware findest du unter **Einstellungen > System > Systemsoftware > Konsoleninformationen**. Diesen Menüpfad beschreibt [Sony in seiner Anleitung zur Versionsprüfung](https://www.playstation.com/de-de/support/hardware/playstation-system-software-application-version/).

Notiere die vollständige Nummer. Sony bezeichnet einen Firmwarestand beispielsweise als `26.05-13.60.00`. Für den Abgleich mit einer Angabe wie "Firmware 13.60" ist der entsprechende Abschnitt dieser Nummer relevant. Die [offizielle Versionsübersicht](https://www.playstation.com/de-at/support/hardware/ps5/system-software-info/) macht diese Zuordnung nachvollziehbar.

Prüfe dabei die Systemsoftware der Konsole. Die Versionsnummer eines Spiels, einer App oder eines Exploit-Hosts beantwortet eine andere Frage.

Die technischen Hintergründe und eine ausführlichere Einordnung findest du in meinem bisherigen Artikel [PS5-Jailbreak 2026: Welche Firmware funktioniert mit Relapse?](/blog/2026-10-18-ps5-jailbreak-2026-welche-firmware-funktioniert-mit-relapse/).

## Welche PS5-Firmware unterstützt Relapse?

Das [Relapse-Projekt von ntfargo](https://github.com/ntfargo/Relapse-Exploit) nennt den Firmwarebereich **7.00 bis 13.60**. Für einen ersten Vergleich ergibt sich folgende Einordnung:

| Installierte Firmware | Bedeutung für Relapse |
| :--- | :--- |
| Unter 7.00 | Außerhalb des genannten Bereichs; andere Verfahren separat betrachten |
| 7.00 bis 13.60 | Genaue Unterstützung im verwendeten Build prüfen |
| 14.00 und neuer | Außerhalb des dokumentierten Bereichs |

Sony führt zum Quellenstand dieses Artikels bereits **26.07-14.22.00** in seiner [Systemsoftware-Übersicht](https://www.playstation.com/de-at/support/hardware/ps5/system-software-info/) auf. Die Aussage "läuft mit aktueller Firmware" braucht deshalb immer ein Datum und eine konkrete Versionsnummer.

Eine solche Tabelle hilft beim Vorsortieren. Sie bestätigt keinen erfolgreichen Test jeder Kombination aus Konsole, Firmware und Exploit-Host.

## Warum die konkrete Relapse-Version zählt

Eine Versionsspanne kann Lücken enthalten. Die [Implementierung von Sonic_Iso](https://github.com/soniciso1/relapse/blob/main/README.md) führt einzelne unterstützte Versionen auf und nennt **10.60 und 11.40 ausdrücklich als fehlend**. Als Grund werden nicht verfügbare Module genannt, aus denen benötigte Offsets ermittelt werden müssten.

Im [Offset-Verzeichnis von ntfargo](https://github.com/ntfargo/Relapse-Exploit/tree/main/offsets) liegt dagegen eine Datei für 10.60. Das zeigt zunächst einen Unterschied zwischen den Implementierungen. Die Existenz einer Datei ist für sich genommen noch kein Nachweis eines erfolgreichen Durchlaufs auf deiner Konsole.

Für die Praxis heißt das: Gleiche deine Firmware mit genau dem Repository oder Release ab, das dein Host verwendet. Eine fremde Anleitung mit ähnlich klingendem Projektnamen reicht dafür nicht aus.

## Welche PS5 kann man jailbreaken: Standard, Slim oder Pro?

Der Modellname allein liefert keine belastbare Antwort. Die untersuchten Relapse-READMEs enthalten keine vollständige Kompatibilitätsmatrix für Standard-PS5, Slim und Pro. Aus der Firmwareangabe lässt sich deshalb keine pauschale Funktionsgarantie für jedes Modell ableiten.

Bei einer gebrauchten Konsole sind drei Angaben hilfreich: das genaue Modell, die vollständige Systemsoftware-Version und der konkret verwendete Exploit-Build. Frage bei einer beworbenen Jailbreak-Funktion außerdem nach, welche Anwendung tatsächlich getestet wurde.

Ein Foto mit einer eingeblendeten Versionsnummer dokumentiert einen anderen Sachverhalt als ein nachvollziehbarer Funktionstest. Beide Informationen sind nützlich, sollten aber entsprechend eingeordnet werden.

## Kernelzugriff und Homebrew getrennt prüfen

Relapse beschreibt eine Browser- und Kernel-Exploit-Kette für Kernel-Lese- und Schreibzugriff. Die Entwickler dokumentieren außerdem mögliche Browserprobleme, Hänger und Kernel-Abstürze. Ein Erfolg beim ersten Versuch ist damit nicht zugesichert. [Quelle: Relapse-Dokumentation](https://github.com/ntfargo/Relapse-Exploit)

Welche Software anschließend funktioniert, ist eine weitere Frage. Projekte wie [etaHEN](https://github.com/etaHEN/etaHEN) bringen eigene Funktionen und Voraussetzungen mit. Die Firmware-Unterstützung des Exploits ersetzt deshalb keine Prüfung der gewünschten Homebrew-Anwendung.

Das ist besonders dann relevant, wenn du von allgemeinen [Gaming](https://oliverjessner.at/category/gaming/)-Videos auf eine bestimmte Funktion schließt. Notiere zuerst dein Ziel und suche anschließend nach einem dokumentierten Nachweis für genau diese Kombination.

## Woran erkennst du eine brauchbare Anleitung?

Eine hilfreiche Anleitung nennt ihren Versionsstand, verlinkt das verwendete Projekt und beschreibt die getestete Konfiguration. Damit kannst du nachvollziehen, ob die Angaben auf deine Konsole passen.

Fehlen Firmware, Build oder überprüfbare Quellen, bleibt die Kompatibilität offen. Das gilt auch dann, wenn eine Überschrift besonders einfach klingt. Für einen belastbaren PS5-Jailbreak-Check brauchst du konkrete Angaben, die sich miteinander vergleichen lassen.

*Quellenstand: 13. November 2026. Die Kompatibilitätsangaben beruhen auf der jeweils verlinkten Projektdokumentation.*
