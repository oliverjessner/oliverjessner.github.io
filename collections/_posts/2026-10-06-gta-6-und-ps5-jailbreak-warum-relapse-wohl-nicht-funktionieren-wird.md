---
layout: post
title: 'GTA 6 und PS5-Jailbreak – Warum Relapse wohl nicht funktionieren wird'
date: 2026-10-06 10:03:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - gaming
    - gta6
    - software-development
    - computer-stuff
description: 'GTA 6 dürfte mit dem aktuellen Relapse-Jailbreak auf der PS5 zunächst nicht laufen. Der Grund ist Firmware 14.10 und eine geschlossene Sicherheitslücke'
thumbnail: '/assets/images/gen/blog/gta-6-und-ps5-jailbreak-warum-relapse-wohl-nicht-funktionieren-wird/header_thumbnail.webp'
image: '/assets/images/gen/blog/gta-6-und-ps5-jailbreak-warum-relapse-wohl-nicht-funktionieren-wird/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Läuft GTA 6 mit dem Relapse-Jailbreak auf der PS5?'
      answer: 'Nach aktuellem Stand wahrscheinlich nicht. Relapse unterstützt PS5-Firmware 7.00 bis 13.60, während GTA 6 voraussichtlich mindestens Firmware 14.10 voraussetzt.'
    - question: 'Welche PS5-Firmware unterstützt Relapse?'
      answer: 'Der aktuelle Relapse-Exploit unterstützt PS5-Systemsoftware von Version 7.00 bis einschließlich 13.60.'
    - question: 'Erscheint GTA 6 auch für die PS4?'
      answer: 'Nein. GTA 6 erscheint am 19. November 2026 für PlayStation 5 und PlayStation 5 Pro. Eine PS4-Version ist nicht angekündigt.'
socialmedia:
    - 'GTA 6 und PS5-Jailbreak: Relapse unterstützt nur Firmware 7.00 bis 13.60. GTA 6 dürfte dagegen mindestens 14.10 verlangen. Was das für Homebrew-Nutzer bedeutet.'
    - 'Wer Relapse auf der PS5 nutzt, steht bei GTA 6 wohl vor einer Entscheidung: alte Firmware behalten oder für das Spiel aktualisieren. Warum Firmware 14.10 entscheidend ist.'
    - 'GTA 6 erscheint am 19. November für PS5. Für Relapse-Nutzer könnte aber schon Firmware 14.10 zum Problem werden. Der aktuelle Jailbreak endet bei Version 13.60.'
news: true
---

GTA 6 dürfte auf einer PS5 mit aktuellem Relapse-Jailbreak zunächst nicht starten. Entscheidend ist nicht das Spiel selbst, sondern die dafür erwartete Firmware 14.10.

## GTA 6 braucht wohl PS5-Firmware 14.10

Wer seine PlayStation 5 mit dem Relapse-Jailbreak betreibt, könnte bei GTA 6 vor einem Problem stehen. Nach derzeitigen Hinweisen aus Backend-Daten des PlayStation Store soll das Spiel mindestens die PS5-Firmware 14.10 voraussetzen.

Wie [Golem berichtet](https://www.golem.de/news/jailbreak-mit-relapse-gta-6-wird-wohl-auf-gehackten-playstations-nicht-laufen-2610-213742.html), funktioniert der aktuelle Relapse-Exploit jedoch nur mit Systemversionen bis einschließlich 13.60.

Damit treffen zwei Anforderungen direkt aufeinander: Eine für Relapse geeignete PS5 muss auf einer älteren Firmware bleiben, während GTA 6 voraussichtlich eine neuere Version der Systemsoftware verlangt.

Nach aktuellem Stand soll Firmware 14.10 am 26. Oktober 2026 erscheinen. GTA 6 folgt am 19. November 2026 für PlayStation 5 und PlayStation 5 Pro. Für die PS4 erscheint das Spiel nicht.

## Was ist der Relapse-Jailbreak?

Relapse ist eine Exploit-Kette für die PlayStation 5. Vereinfacht gesagt werden mehrere Schwachstellen kombiniert, um Zugriff auf Bereiche des Systems zu erhalten, die Sony normalerweise gegenüber Nutzern abschottet.

Der öffentliche Exploit unterstützt PS5-Firmware von Version 7.00 bis 13.60. Ein Teil der Exploit-Kette ermöglicht Lese- und Schreibzugriffe auf den Kernel-Speicher. Darüber lassen sich anschließend weitere Payloads ausführen.

Das ist vor allem für Homebrew, technische Experimente, Security Research und [Emulation](https://oliverjessner.at/category/emulation/) interessant. Ein Jailbreak bedeutet dabei nicht automatisch, dass damit kopierte Spiele ausgeführt werden. Er beschreibt zunächst nur die Möglichkeit, Beschränkungen des Systems zu umgehen und eigenen Code auszuführen.

Genau diese Abhängigkeit von konkreten Schwachstellen ist aber auch die größte Einschränkung eines Jailbreaks.

## Warum Firmware 14.10 zum Problem wird

Sony kann bekannte Sicherheitslücken mit neuen Versionen der PS5-Systemsoftware schließen. Genau das soll bei Firmware 14.10 mit einer für Relapse wichtigen Schwachstelle passieren.

Für Nutzer einer PS5 mit Firmware 13.60 oder älter entsteht deshalb ein klassischer Konflikt.

Wer auf der alten Firmware bleibt, behält die aktuell von Relapse unterstützte Umgebung. Verlangt GTA 6 tatsächlich mindestens Version 14.10, lässt sich das Spiel auf diesem System aber nicht regulär starten.

Wer auf Firmware 14.10 oder eine neuere Version aktualisiert, erfüllt dagegen die erwartete Systemanforderung von GTA 6. Der derzeit verfügbare Relapse-Jailbreak funktioniert dort jedoch nicht.

| PS5-Firmware              | Relapse                   | GTA 6                          |
| ------------------------- | ------------------------- | ------------------------------ |
| 7.00 bis 13.60            | unterstützt               | voraussichtlich nicht startbar |
| 14.10 oder neuer          | aktuell nicht unterstützt | erwartete Systemumgebung       |
| Zukünftiger neuer Exploit | offen                     | offen                          |

Wichtig ist dabei das Wort "voraussichtlich". Die Mindestanforderung von Firmware 14.10 basiert derzeit auf Hinweisen aus dem PlayStation-Store-Backend. Bis zum Release können sich technische Details noch ändern.

## Warum ein PS5-Jailbreak so stark von der Firmware abhängt

Bei Konsolen sind Jailbreaks normalerweise keine universellen Programme, die auf jeder Systemversion funktionieren. Sie nutzen sehr konkrete Fehler in Browser-Komponenten, Betriebssystem, Kernel oder anderen Teilen der Plattform.

Wird eine dieser Schwachstellen geschlossen, funktioniert die bisherige Exploit-Kette nicht automatisch weiter.

Aus Sicht der [Software-Entwicklung](https://oliverjessner.at/category/software-development/) ist das wenig überraschend. Ein Exploit ist an bestimmte Speicherstrukturen, Funktionen und Verhaltensweisen einer Softwareversion gebunden. Bereits vergleichsweise kleine Änderungen können Annahmen zerstören, auf denen der Angriff basiert.

Genau deshalb sind ältere Konsolen-Firmwares in der Homebrew-Szene interessant. Je älter die installierte Version, desto größer ist häufig die Zahl öffentlich bekannter und noch nicht geschlossener Schwachstellen.

Das bedeutet allerdings nicht, dass jede ältere PS5 automatisch jailbreakbar ist. Entscheidend sind immer die konkrete Firmware und die dafür verfügbaren Exploit-Ketten.

## Könnte GTA 6 später trotzdem auf einer Jailbreak-PS5 laufen?

Ausgeschlossen ist das nicht.

Zwischen dem geplanten Erscheinen von Firmware 14.10 am 26. Oktober und dem Release von GTA 6 am 19. November liegen etwas mehr als drei Wochen. Es wäre theoretisch möglich, dass Sicherheitsforscher oder die Homebrew-Community weitere Schwachstellen finden.

Realistischer ist allerdings, zunächst keine funktionierende Lösung für Firmware 14.10 vorauszusetzen. Neue Exploits müssen gefunden, verstanden, zuverlässig umgesetzt und häufig mit weiteren Schwachstellen kombiniert werden.

Das kann schnell gehen, Monate dauern oder überhaupt nicht gelingen.

Auch deshalb sollten Meldungen über einen möglichen "GTA-6-Jailbreak" vorsichtig betrachtet werden. Dass eine PS5 grundsätzlich gehackt werden kann, bedeutet nicht, dass der dafür verwendete Exploit auch auf der Firmware funktioniert, die ein aktuelles Spiel benötigt.

## GTA 6 macht den Firmware-Konflikt besonders sichtbar

Das eigentliche Problem ist nicht neu. Nutzer modifizierter Konsolen müssen im [Gaming](https://oliverjessner.at/category/gaming/) regelmäßig zwischen neuer Software und einer älteren, für Homebrew interessanten Firmware abwägen.

GTA 6 macht diesen Konflikt lediglich besonders sichtbar. Kaum ein anderes Spiel dürfte 2026 eine vergleichbare Zahl von PS5-Besitzern dazu bringen, ihre Konsole auf die aktuelle Systemsoftware zu bringen.

Gleichzeitig erscheint das Spiel ausschließlich für die aktuelle Konsolengeneration. Eine ältere PS4 mit etablierten Jailbreak-Verfahren ist deshalb keine Alternative.

Für Relapse-Nutzer lautet die Situation damit zunächst ziemlich nüchtern: Firmware 13.60 oder älter kann den aktuellen Jailbreak behalten. GTA 6 dürfte dort aber nicht ohne Weiteres laufen. Mit Firmware 14.10 dürfte GTA 6 funktionieren, Relapse in seiner derzeitigen Form dagegen nicht.

## Fazit

GTA 6 wird auf einer aktuell mit Relapse kompatiblen PS5 wahrscheinlich zunächst nicht laufen. Relapse unterstützt Firmware 7.00 bis 13.60, während das Spiel nach aktuellem Stand mindestens PS5-Firmware 14.10 voraussetzen soll.

Das bedeutet allerdings nicht, dass GTA 6 dauerhaft von Jailbreak-Konsolen ausgeschlossen bleibt. Bislang gibt es schlicht keine öffentlich bekannte Relapse-Version für Firmware 14.10 oder eine vergleichbare neue Exploit-Kette.

Wer eine PS5 wegen Homebrew oder Emulation bewusst auf einer älteren Firmware hält, sollte deshalb nicht davon ausgehen, GTA 6 zum Release am 19. November 2026 gleichzeitig in dieser Umgebung nutzen zu können.
