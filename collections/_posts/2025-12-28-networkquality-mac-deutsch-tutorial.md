---
layout: post
title: 'Wie funktioniert networkQuality unter Mac eigentlich? Tutorial'
date: 2025-12-28 12:40:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - macos
    - computer-stuff
    - terminal
description: 'Tutorial: Mit dem macOS-Terminal-Befehl networkQuality die echte Netzwerkqualität messen – inklusive Latenz und Reaktionsfähigkeit.'
thumbnail: '/assets/images/gen/blog/networkquality-mac-deutsch-tutorial/header_thumbnail.webp'
image: '/assets/images/gen/blog/networkquality-mac-deutsch-tutorial/header.webp'
---

## Speedtest im Terminal?

Wer seine Internetverbindung testen will, landet meist bei Browser-Speedtests. Die liefern zwar große Zahlen, sagen aber wenig darüber aus, wie sich die Verbindung im Alltag tatsächlich anfühlt etwa bei Video-Calls, Remote-Arbeit oder Cloud-Services.

Genau hier setzt der macOS-Befehl `networkQuality` an.

`networkQuality` ist ein von Apple bereitgestelltes Kommandozeilen-Tool, das nicht nur Download- und Upload-Geschwindigkeit misst, sondern auch Latenz und Reaktionsfähigkeit der Verbindung berücksichtigt.

## Wie installier ich networkQuality?

Gar nicht, `networkQuality` ist **ab macOS Monterey standardmäßig enthalten**.  
Kein Homebrew, keine Zusatzsoftware, kein Browser nötig. Der Befehl steht direkt im Terminal zur Verfügung.

## Beispiel

Um die aktuelle Netzwerkqualität zu messen, reicht ein einzelner Befehl:

```bash
networkQuality
```

Nach wenigen Sekunden liefert macOS eine kompakte Auswertung, unter anderem mit:

-   Download-Kapazität
-   Upload-Kapazität
-   Responsiveness (Reaktionsfähigkeit)

Gerade dieser letzte Wert unterscheidet networkQuality von klassischen Speedtests.

# Was misst networkQuality genau?

Neben reinen Bandbreitenwerten bewertet networkQuality, wie schnell das Netzwerk auf Anfragen reagiert. Das ist entscheidend für:

-   Video- und Audio-Calls
-   Remote-Desktop-Verbindungen
-   Cloud-IDEs
-   SSH-Sessions
-   Online-Gaming

Optional lässt sich der Test auch mit parallelen Verbindungen erzwingen:

```bash
networkQuality -v
```

## Fazit

Mit networkQuality liefert macOS einen realistischeren Blick auf die eigene Internetverbindung als viele Browser-Speedtests. Der Befehl ist klein, sofort verfügbar und besonders für Remote-Arbeit und Entwickler-Workflows relevant.

Kurz gesagt:
networkQuality misst nicht nur, wie schnell dein Internet ist sondern wie gut es sich anfühlt.
