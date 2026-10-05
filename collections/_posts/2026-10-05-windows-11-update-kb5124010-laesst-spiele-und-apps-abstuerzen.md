---
layout: post
title: 'Windows 11: Update KB5124010 lässt Spiele und Apps abstürzen'
date: 2026-10-05 10:20:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - microsoft
    - gaming
    - computer-stuff
description: 'Windows 11 KB5124010 lässt ältere Spiele und Apps wegen eines AC-3-Audiofehlers abstürzen; betroffen sind 24H2, 25H2 und 26H2'
thumbnail: '/assets/images/gen/blog/windows-11-update-kb5124010-laesst-spiele-und-apps-abstuerzen/header_thumbnail.webp'
image: '/assets/images/gen/blog/windows-11-update-kb5124010-laesst-spiele-und-apps-abstuerzen/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Warum stürzen Spiele nach dem Windows-Update KB5124010 ab?'
      answer: 'KB5124010 verursacht Probleme mit der integrierten AC-3-Audiodecodierung von Windows. Anwendungen, die darauf zurückgreifen, können nicht starten oder während der Wiedergabe von Audio unerwartet beendet werden.'
    - question: 'Welche Windows-11-Versionen sind von KB5124010 betroffen?'
      answer: 'Microsoft führt den Fehler für Windows 11 24H2, 25H2 und 26H2 auf. Besonders betroffen sind ältere Anwendungen und Spiele, die die Windows-eigene AC-3-Decodierung verwenden.'
    - question: 'Was kann ich tun, wenn KB5124010 Spiele oder Apps abstürzen lässt?'
      answer: 'Microsoft hat noch keinen offiziellen Workaround veröffentlicht. Betroffene Nutzer können als vorübergehende Lösung KB5124010 deinstallieren oder auf das angekündigte korrigierende Windows-Update warten.'
socialmedia:
    - 'Windows 11 KB5124010 kann ältere Spiele und Apps abstürzen lassen. Betroffen ist die AC-3-Audiodecodierung. Microsoft arbeitet an einem Fix, einen Termin gibt es noch nicht.'
    - 'Fallout: New Vegas, SimCity 4 und andere ältere Programme machen nach KB5124010 Probleme. Der gemeinsame Nenner ist offenbar die Windows-eigene AC-3-Audiodecodierung.'
    - 'Nach KB5124010 stürzt ein Spiel plötzlich ohne Fehlermeldung ab? Ein Blick in die Ereignisanzeige kann helfen. Taucht msmpeg2ac3dec.dll auf, spricht vieles für den bekannten Windows-11-Fehler.'
news: true
---

Das optionale Windows-11-Update KB5124010 kann ältere Spiele, Mediaplayer und andere Apps zum Absturz bringen. Ursache ist ein Problem mit der integrierten AC-3-Audiodecodierung.

## Windows 11 KB5124010 verursacht Abstürze bei Apps und Spielen

Microsoft hat ein neues Problem mit dem Windows-11-Update KB5124010 bestätigt. Das am 22. September 2026 veröffentlichte Vorschau-Update kann dazu führen, dass bestimmte Anwendungen nicht mehr starten oder während der Nutzung plötzlich geschlossen werden.

Betroffen sind Windows 11 24H2, 25H2 und 26H2. Der Fehler hängt nach Angaben von [Microsoft](https://oliverjessner.at/category/microsoft/) mit der in Windows integrierten Decodierung von AC-3-Audio zusammen. AC-3 ist besser unter der Bezeichnung Dolby Digital bekannt.

Vor allem ältere Programme verlassen sich noch auf die Audiofunktionen des Betriebssystems. Moderne Anwendungen bringen ihre Decoder dagegen häufig selbst mit und umgehen damit den problematischen Teil von Windows.

Das erklärt auch, warum der Fehler nicht auf jedem Rechner und nicht in jeder Anwendung auftritt.

## Welche Spiele sind von KB5124010 betroffen?

Microsoft nennt keine vollständige Liste betroffener Software. In Nutzerberichten tauchen jedoch mehrere ältere Spiele auf, darunter:

- Fallout: New Vegas
- Fallout 3
- The Elder Scrolls IV: Oblivion
- SimCity 4

Auch Mediaplayer und andere Anwendungen können betroffen sein. Microsoft spricht ausdrücklich von Spielen, Medienanwendungen und bestimmten Produktivitätsprogrammen.

Damit ist das Problem nicht ausschließlich ein [Gaming](https://oliverjessner.at/category/gaming/)-Fehler.

Entscheidend ist vielmehr, wie eine Anwendung Audio verarbeitet. Greift sie auf die integrierte AC-3-Decodierung von Windows zurück, kann KB5124010 den betroffenen Audiopfad auslösen.

Die Anwendung kann dann entweder bereits beim Start scheitern oder zunächst normal funktionieren und später unerwartet geschlossen werden. Microsoft nennt als mögliches Beispiel das Abspielen von Musik.

## Warum lässt KB5124010 ältere Spiele abstürzen?

Berichte aus der Windows- und Modding-Community weisen auf die Systembibliothek `msmpeg2ac3dec.dll` hin. Sie gehört zur Multimedia-Infrastruktur von Windows und wird für die Decodierung bestimmter Audioformate verwendet.

In der Windows-Ereignisanzeige erscheint die DLL bei einigen Abstürzen als fehlerhaftes Modul. Teilweise wird dabei der Exception-Code `0xc0000602` protokolliert.

Microsoft selbst beschreibt das Problem allgemeiner und bestätigt lediglich, dass Anwendungen abstürzen können, wenn sie die integrierte AC-3-Decodierung verwenden.

Deshalb sollte `msmpeg2ac3dec.dll` eher als wichtiger Hinweis bei der Fehlersuche verstanden werden und nicht als universeller Beweis für jeden Absturz nach dem Update.

## So prüfst du, ob KB5124010 installiert ist

Wer seit Ende September plötzlich Probleme mit älteren Spielen oder Anwendungen feststellt, sollte zuerst prüfen, ob KB5124010 installiert wurde.

Unter Windows 11 geht das über:

**Einstellungen > Windows Update > Updateverlauf**

Dort sollte KB5124010 in der Liste der installierten Updates auftauchen.

Das Update wurde als optionales Vorschau-Update veröffentlicht. Es handelt sich also nicht um das reguläre monatliche Sicherheitsupdate, sondern um eine Vorabversion kommender Qualitätsverbesserungen und Fehlerkorrekturen.

Wer solche optionalen Updates nicht bewusst installiert, muss KB5124010 deshalb nicht zwangsläufig auf seinem System haben.

## Windows-Ereignisanzeige auf msmpeg2ac3dec.dll prüfen

Stürzt ein Spiel ohne verständliche Fehlermeldung ab, kann die Ereignisanzeige weitere Hinweise liefern.

Öffne dazu die Windows-Suche und starte die "Ereignisanzeige". Unter:

**Windows-Protokolle > Anwendung**

finden sich Fehlerberichte abgestürzter Programme.

Suche nach einem Eintrag, dessen Zeitpunkt zum Absturz passt. Taucht dort `msmpeg2ac3dec.dll` als fehlerhaftes Modul auf, liegt der Zusammenhang mit dem bekannten AC-3-Problem von KB5124010 nahe.

Das ist insbesondere bei älteren Spielen hilfreich, weil deren eigene Fehlermeldungen häufig wenig über die tatsächliche Ursache verraten.

## KB5124010 deinstallieren als vorübergehende Lösung

Microsoft arbeitet nach eigenen Angaben an einer Korrektur, hat bislang aber keinen offiziellen Workaround und keinen konkreten Veröffentlichungstermin genannt.

Wer tatsächlich von den Abstürzen betroffen ist, kann KB5124010 vorübergehend wieder entfernen.

Das geht über:

**Einstellungen > Windows Update > Updateverlauf > Updates deinstallieren**

Dort kann KB5124010 ausgewählt und deinstalliert werden. Anschließend ist ein Neustart sinnvoll.

Die Deinstallation sollte allerdings nur erfolgen, wenn tatsächlich Probleme auftreten. KB5124010 enthält neben neuen Funktionen auch verschiedene Fehlerkorrekturen. Auf einem problemlos funktionierenden System gibt es aktuell keinen Grund, das Update vorsorglich zu entfernen.

Im Netz werden außerdem alternative Audio-Decoder und speziell für einzelne Spiele entwickelte Workarounds angeboten. Solche Lösungen können funktionieren, verändern aber teilweise die Multimedia-Konfiguration des Systems oder setzen zusätzliche Software voraus.

Wer keine dringende Notwendigkeit hat, das betroffene Programm zu verwenden, fährt mit dem nächsten offiziellen Windows-Fix meist einfacher.

## Nicht jedes Windows-11-System ist automatisch betroffen

Dass KB5124010 installiert ist, bedeutet nicht automatisch, dass Programme abstürzen.

Microsoft weist ausdrücklich darauf hin, dass viele moderne Anwendungen die problematische Windows-Decodierung nicht verwenden. Auch Nutzerberichte deuten darauf hin, dass sich das Verhalten je nach Installationshistorie und vorhandenen Windows-Komponenten unterscheiden kann.

Einzelne Beobachtungen aus Unternehmen und der Community legen beispielsweise nahe, dass die betroffene Decoder-Bibliothek häufiger auf Systemen vorhanden ist, die über ältere Windows-11-Versionen aktualisiert wurden.

Microsoft hat diese Einschränkung bisher jedoch nicht offiziell bestätigt.

Für die Praxis bedeutet das: Wenn KB5124010 installiert ist und alle Anwendungen normal funktionieren, besteht kein unmittelbarer Handlungsbedarf.

## Ein Audiofehler mit ungewöhnlich breiten Auswirkungen

Der Fehler zeigt gut, wie weit die Abhängigkeiten älterer Windows-Software reichen können. Ein Update an einer Multimedia-Komponente wirkt auf den ersten Blick wenig relevant für ein Spiel wie Fallout: New Vegas oder SimCity 4. Nutzt die Anwendung jedoch weiterhin einen Decoder des Betriebssystems, kann genau diese Komponente über Stabilität oder Absturz entscheiden.

Gerade bei älteren PC-Spielen ist deshalb nicht immer das Spiel selbst die Ursache, wenn es nach einem Windows-Update plötzlich nicht mehr funktioniert.

Wer seit der Installation von KB5124010 unerklärliche Abstürze beobachtet, sollte deshalb zunächst Updateverlauf und Ereignisanzeige prüfen. Microsoft arbeitet bereits an einer Korrektur. Bis diese veröffentlicht wird, bleibt die Deinstallation des optionalen Vorschau-Updates die einfachste temporäre Lösung für tatsächlich betroffene Systeme.
