---
layout: post
title: 'Pokémon tauschen mit RetroArch: Mac, PC und Android ohne Link-Kabel'
date: 2026-05-25 12:00:51 +0100
last_modified_at: 2026-06-11 13:00:10 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - gaming
    - emulation
    - pokemon
description: 'So tauschst du Pokémon mit RetroArch zwischen Mac, PC und Android ohne echtes Link-Kabel'
thumbnail: '/assets/images/gen/blog/pokemon-tauschen-mit-retroarch-mac-pc-und-android-ohne-link-kabel/header_thumbnail.webp'
image: '/assets/images/gen/blog/pokemon-tauschen-mit-retroarch-mac-pc-und-android-ohne-link-kabel/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Kann ich mit RetroArch Pokémon zwischen Mac und Android tauschen?'
      answer: 'Ja, mit dem passenden Core, RetroArch Netplay und zwei Geräten im selben Netzwerk kann der Link-Kabel-Modus zwischen Mac und Android funktionieren.'
    - question: 'Brauche ich dafür ein echtes Link-Kabel?'
      answer: 'Nein. Das Link-Kabel wird in diesem Setup über Emulator, Core und Netzwerkverbindung ersetzt.'
    - question: 'Funktioniert das nur mit Pokémon?'
      answer: 'Nein. Grundsätzlich kann das auch mit anderen Game-Boy- und Game-Boy-Color-Spielen funktionieren, die den Link-Kabel-Modus unterstützen.'
---

Pokémon tauschen ohne echtes Link-Kabel: Mit RetroArch, DoubleCherry und Netplay funktioniert der Tausch zwischen Mac, PC und Android über WLAN.

## Pokémon tauschen mit RetroArch – ohne echtes Link-Kabel

Wer früher Pokémon getauscht hat, brauchte zwei Game Boys, zwei Module und ein Link-Kabel. Heute lässt sich dieser Ablauf auch mit [Emulatoren](https://oliverjessner.at/category/emulation/) nachbauen. Nicht als Cloud-Service, nicht über ein modernes Nintendo-Konto, sondern vergleichsweise direkt: Zwei Geräte verbinden sich über das lokale Netzwerk und verhalten sich im Spiel so, als wären sie per Link-Kabel verbunden.

In meinem Fall sind es ein Mac und ein [AYN Thor](https://oliverjessner.at/blog/2026-01-09-ayn-thor-community-qa/). Das Prinzip ist aber nicht auf macOS beschränkt. Ein Windows-PC oder ein Linux-Gerät kann die gleiche Rolle übernehmen. Wer auf Android generell auch mit fremdsprachigen Spielen experimentiert, kann außerdem japanische Games [live auf Android übersetzen, etwa mit PlayTranslate](https://oliverjessner.at/blog/2026-05-24-playtranslate-japanische-games-live-auf-android-uebersetzen/).

## Was du dafür brauchst

Für dieses Setup brauchst du zwei Geräte, auf denen RetroArch läuft. Zusätzlich brauchst du auf beiden Geräten denselben passenden Core. Für dieses Beispiel verwende ich DoubleCherry.

Du brauchst also:

- RetroArch auf beiden Geräten
- den DoubleCherry-Core auf beiden Geräten
- dieselbe oder kompatible Spielversion
- zwei laufende Spielinstanzen
- beide Geräte im selben WLAN
- die lokale IP-Adresse des Host-Geräts

## Schritt 1: RetroArch für Desktop und Android installieren

RetroArch selbst bekommst du für Desktop-Systeme wie Windows, macOS und Linux direkt über die offizielle Download-Seite: [retroarch.com](https://www.retroarch.com/?page=platforms). Für Android gibt es RetroArch außerdem im Google Play Store: [RetroArch für Android](https://play.google.com/store/apps/details?id=com.retroarch).

## Schritt 2: DoubleCherry in RetroArch installieren

Zuerst muss auf beiden Geräten in RetroArch der DoubleCherry-Core installiert werden. Das machst du über den Core-Downloader von RetroArch.

![RetroArch DoubleCherry Core für Pokémon-Link-Kabel-Emulation laden](/assets/images/gen/blog/pokemon-tauschen-mit-retroarch-mac-pc-und-android-ohne-link-kabel/load_core.webp)

## Schritt 3: Ein Gerät hostet die Netplay-Verbindung

Danach wählst du eines der beiden Geräte als Host aus. In meinem Setup übernimmt der Mac diese Rolle. Der [AYN Thor](https://oliverjessner.at/blog/2026-01-09-ayn-thor-community-qa/) verbindet sich später mit ihm.

In RetroArch gehst du auf dem Host-Gerät in das Netplay-Menü und startest dort einen Host.

![RetroArch Netplay starten, um Pokémon ohne Link-Kabel zu tauschen](/assets/images/gen/blog/pokemon-tauschen-mit-retroarch-mac-pc-und-android-ohne-link-kabel/netplay.webp)

Sobald der Host läuft, wartet RetroArch auf die Verbindung des zweiten Geräts. Das Host-Gerät ist in diesem Moment die zentrale Gegenstelle, mit der sich das andere Gerät verbindet.

## Schritt 4: Die IP-Adresse des Hosts herausfinden

Damit sich das zweite Gerät verbinden kann, brauchst du die lokale IP-Adresse des Host-Geräts. Auf dem Mac kannst du sie über die Systemeinstellungen oder über das Terminal herausfinden.

Auf macOS ist dieser Befehl hilfreich:

```bash
ifconfig getifaddr en0
```

Auf Linux ist oft dieser Befehl sinnvoll:

```bash
ip addr
```

Auf Windows kannst du diesen Befehl verwenden:

```bash
ipconfig
```

Gesucht ist die lokale Netzwerkadresse des Geräts. Sie sieht häufig ungefähr so aus:

```text
192.168.0.23
```

Die genaue Adresse hängt von deinem Router und deinem Netzwerk ab. Wichtig ist nur: Du brauchst die Adresse des Geräts, das den Netplay-Host gestartet hat.

## Schritt 5: Das zweite Gerät verbindet sich mit dem Host

Auf dem zweiten Gerät startest du RetroArch ebenfalls mit dem passenden Core und dem passenden Spiel. Danach gehst du nicht auf "Host", sondern auf die Option zum Verbinden mit einem Netplay-Host (eng.: Connect to Netplay Host).

Dort gibst du die IP-Adresse des Host-Geräts ein. Wenn die Verbindung klappt, laufen beide Instanzen synchron genug, damit der Link-Kabel-Modus im Spiel genutzt werden kann. Im Host wird nun unten rechts angezeigt, dass der zweite Spieler gejoint ist.

## Danach geht es ins Pokémon Center

Wenn beide Spiele laufen und miteinander verbunden sind, gehen beide Spielfiguren ins Pokémon Center. Dort wählst du den Tauschraum aus, so wie du es früher mit zwei Game Boys und einem echten Link-Kabel gemacht hättest.

Das ist kein modernes Online-Trading. Es ist auch kein Ersatz für offizielle Nintendo-Dienste. Es ist eher ein technischer Nachbau des alten lokalen Link-Kabel-Prinzips mit Emulator, WLAN und RetroArch.

## Worauf du achten solltest

Bei solchen Setups können Kleinigkeiten entscheidend sein. Wenn der Tausch nicht funktioniert, liegt es nicht zwingend am Spiel. Häufig sind Core-Version, Netzwerk, Spielstand oder falsche IP-Adresse das Problem.

Sinnvolle Prüfpunkte sind:

- Nutzen beide Geräte denselben Core?
- Läuft auf beiden Geräten eine kompatible Spielversion?
- Sind beide Geräte im selben WLAN?
- Ist die IP-Adresse wirklich die lokale Adresse des Hosts?
- Blockiert eine Firewall die Verbindung?

Vor einem Test lohnt sich deshalb ein Backup des Spielstands. Das ist nicht dramatisch, aber sinnvoll. Ein kurzer Export oder eine Kopie der Save-Datei kann später viel Ärger sparen.

## Nicht nur für Pokémon interessant

Der naheliegende Anwendungsfall ist natürlich [Pokémon](https://oliverjessner.at/category/pokemon/). Der Link-Kabel-Modus war dort zentral, weil einige Entwicklungen und Pokédex-Einträge nur über Tausch wirklich vollständig erreichbar waren.

Das Prinzip ist aber nicht auf Pokémon beschränkt. Auch andere Game-Boy- und Game-Boy-Color-Spiele haben Link-Kabel-Funktionen genutzt. Je nach Spiel, Core und RetroArch-Konfiguration kann das ebenfalls funktionieren.

## Stolpersteine

Ein wichtiger Punkt ist die Geschwindigkeit. Beide Spielinstanzen sollten mit normaler Geschwindigkeit laufen. Wenn ein Gerät schneller schaltet als das andere, etwa durch Fast Forward oder erhöhte Emulationsgeschwindigkeit, kann die Verbindung instabil werden oder der Tausch hängen bleiben.

Ich empfehle deshalb, auf beiden Geräten die normale Geschwindigkeit zu nutzen und den Tausch möglichst gleichzeitig zu starten.

Außerdem sollte zuerst die Netplay-Verbindung aufgebaut werden und erst danach das Spiel gestartet werden. Also: erst mit dem Netplay-Host verbinden, dann das Spiel laden. Nicht umgekehrt.
