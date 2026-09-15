---
layout: post
title: 'Windows 11 Update-Probleme: Notfall-Update KB5129195 behebt RDP, Hyper-V und Audio'
date: 2026-09-15 10:44:11 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - microsoft
    - computer-stuff
    - software-engineering
description: 'KB5129195 behebt nach dem September-Update Probleme mit RDP, Hyper-V und USB-Audio unter Windows 11. Ein Audio-Fehler bleibt offen'
thumbnail: '/assets/images/gen/blog/windows-11-update-probleme-notfall-update-kb5129195-behebt-rdp-hyper-v-und-audio/header_thumbnail.webp'
image: '/assets/images/gen/blog/windows-11-update-probleme-notfall-update-kb5129195-behebt-rdp-hyper-v-und-audio/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Was behebt Windows 11 Update KB5129195?'
      answer: 'KB5129195 behebt unter Windows 11 24H2 und 25H2 Probleme mit Remote Desktop Services, Hyper-V und bestimmten Mehrkanal-Modi von USB Audio Class 1.0. Außerdem enthält das Update zusätzlichen Schutz für CVE-2026-62721.'
    - question: 'Ist der USB-Audio-Fehler mit KB5129195 vollständig behoben?'
      answer: 'Nein. Probleme mit 8-Kanal- und 3D-Audio werden korrigiert. Einige USB-Audio-Class-1.0-Geräte können aber weiterhin mit Fehlercode 10 starten, keinen Ton ausgeben oder nicht auf die Lautstärkeregelung reagieren.'
    - question: 'Muss KB5129195 manuell installiert werden?'
      answer: 'Auf regulär aktualisierten Windows-11-Systemen wird KB5129195 über Windows Update verteilt. In verwalteten Unternehmensumgebungen hängt die Installation von den jeweiligen Update-Richtlinien ab.'
socialmedia:
    - 'Microsoft verteilt mit KB5129195 ein außerplanmäßiges Windows-11-Update. Es behebt Probleme mit Remote Desktop, Hyper-V und USB-Audio. Ein Teil der Audio-Störungen bleibt allerdings offen.'
    - 'Windows 11 macht nach dem September-Update Probleme? KB5129195 soll RDP-Ausfälle, Hyper-V-Fehler und bestimmte USB-Audio-Probleme beheben. Welche Versionen betroffen sind und was noch offen bleibt.'
    - 'KB5129195 ist mehr als ein kleiner Bugfix: Das Out-of-Band-Update für Windows 11 bringt Fehlerkorrekturen und zusätzlichen Schutz für CVE-2026-62721. Bei USB Audio Class 1.0 bleibt aber ein bekanntes Problem bestehen.'
news: true
---

Nach dem September-Patchday meldet Microsoft mehrere Windows-Probleme. KB5129195 korrigiert RDP, Hyper-V und Teile der USB-Audio-Fehler, aber nicht alles.

## Windows 11 Update-Probleme – warum Microsoft KB5129195 nachschiebt

Die Sicherheitsupdates vom 8. September 2026 haben auf einigen Windows-Systemen unerwünschte Nebenwirkungen verursacht. Betroffen sind unter anderem Remote Desktop Services, bestimmte Hyper-V-Konfigurationen und USB-Audiogeräte.

Am 14. September hat [Microsoft](https://oliverjessner.at/category/microsoft/) deshalb mehrere außerplanmäßige Updates veröffentlicht. Für Windows 11 24H2 und Windows 11 25H2 ist vor allem **KB5129195** relevant.

Das sogenannte Out-of-Band-Update erscheint außerhalb des üblichen monatlichen Patchday-Zyklus. KB5129195 ist dabei kein isolierter Hotfix, sondern ein kumulatives Sicherheitsupdate. Es enthält also auch die vorherigen Änderungen für die unterstützten Windows-Versionen.

Für Windows 11 25H2 hebt KB5129195 die Buildnummer auf **26200.9457** an. Windows 11 24H2 landet nach dem Update bei **26100.9457**.

## Was behebt Windows 11 Update KB5129195?

Microsoft nennt drei größere Fehlerbereiche, die durch die September-Updates entstanden sind oder sichtbar wurden:

- Remote Desktop Services und RDP-Verbindungen
- Hyper-V und freigegebene Ordner für Linux-VMs
- Mehrkanal-Audio mit USB Audio Class 1.0

Dazu kommt eine weitere sicherheitsrelevante Änderung.

## Remote Desktop und RDP funktionieren wieder stabiler

Besonders relevant für Unternehmen und Administratoren sind die Probleme mit den Remote Desktop Services, kurz RDS.

Nach der Installation der September-Updates konnten RDP-Verbindungen instabil werden oder vollständig fehlschlagen. In betroffenen Umgebungen waren unter anderem folgende Symptome möglich:

- RDP-Verbindungen konnten nicht aufgebaut werden
- Anmeldungen über Remote Desktop schlugen fehl
- Systeme reagierten während der Remote-Desktop-Konfiguration nicht mehr
- die Microsoft Management Console reagierte nicht
- der RDS Licensing Diagnoser konnte hängen bleiben
- der Datei-Explorer reagierte teilweise nicht mehr
- die Windows-Update-Seite konnte einfrieren

KB5129195 soll diese RDS-Probleme unter Windows 11 24H2 und 25H2 beheben.

Das ist vor allem in Unternehmensumgebungen relevant. Dort wird RDP häufig nicht nur für den gelegentlichen Fernzugriff verwendet, sondern ist Bestandteil der eigentlichen Infrastruktur.

## Hyper-V – Linux-VMs bekommen ihre Ordner zurück

Auch Nutzer von Hyper-V konnten nach den September-Updates auf Probleme stoßen.

Betroffen waren Anwendungen, die über den Host Compute Service verwaltete virtuelle Maschinen einsetzen. Konkret ging es um Linux-VMs, bei denen Verzeichnisse des Windows-Hosts über Plan9 in die virtuelle Maschine eingebunden werden.

Nach dem Update konnten diese freigegebenen Ordner innerhalb der Linux-VM fehlen oder nicht mehr erreichbar sein.

KB5129195 korrigiert dieses Verhalten ebenfalls.

Für klassische Desktop-Nutzer dürfte dieser Fehler kaum eine Rolle spielen. In Entwicklungsumgebungen und bei Werkzeugen, die Hyper-V im Hintergrund einsetzen, kann eine nicht erreichbare Dateifreigabe allerdings schnell ganze Workflows blockieren.

Gerade deshalb zeigt der Fehler auch ein grundsätzliches Problem moderner [Windows-PCs](https://oliverjessner.at/category/computer-stuff/): Ein einzelnes kumulatives Update verändert inzwischen zahlreiche Komponenten gleichzeitig.

## USB Audio – KB5129195 behebt das Problem nur teilweise

Komplizierter sieht es bei USB-Audiogeräten aus.

Nach dem Sicherheitsupdate vom 8. September können bestimmte Geräte nach dem Standard USB Audio Class 1.0 Probleme verursachen.

KB5129195 behebt laut Microsoft einen Teil davon. Geräte, die im normalen Stereo-Betrieb funktionieren, aber bei **8-Kanal-Audio oder 3D-Audio** ausfallen, sollen nach dem Update wieder korrekt arbeiten.

Damit ist das USB-Audio-Problem allerdings noch nicht vollständig gelöst.

Microsoft führt weiterhin mehrere bekannte Symptome auf:

- Im Geräte-Manager erscheint "Dieses Gerät kann nicht gestartet werden (Code 10)"
- das Audiogerät gibt keinen Ton aus
- die Lautstärkeregelung reagiert nicht
- die Lautstärke bleibt bei null
- die Windows-Soundeinstellungen reagieren nicht oder stehen nicht zur Verfügung

Wer nach KB5129195 weiterhin Audio-Probleme hat, sollte deshalb nicht automatisch davon ausgehen, dass das Update fehlgeschlagen ist. Ein Teil der USB-Audio-Probleme ist laut Microsoft weiterhin offen.

## CVE-2026-62721 – KB5129195 ist auch ein Sicherheitsupdate

KB5129195 enthält nicht nur Fehlerkorrekturen.

Microsoft integriert zusätzlichen Schutz für **CVE-2026-62721**. Die Schwachstelle betrifft den Windows User-Mode Power Service, kurz UMPS.

Dabei handelt es sich um eine Schwachstelle zur Rechteausweitung. Ein Angreifer, der bereits Zugriff auf ein System hat, könnte eine solche Sicherheitslücke grundsätzlich nutzen, um höhere Berechtigungen zu erhalten.

Das ist ein wichtiger Unterschied zu einem normalen Qualitätsupdate. KB5129195 korrigiert nicht nur Probleme, die durch vorherige Updates entstanden sind, sondern enthält selbst sicherheitsrelevante Änderungen.

Das einfache Deinstallieren des September-Updates ist deshalb keine besonders attraktive Dauerlösung. Damit verschwinden gegebenenfalls nicht nur Fehler, sondern auch bereits ausgelieferte Sicherheitskorrekturen.

## Welche Windows-Versionen bekommen ein außerplanmäßiges Update?

KB5129195 gilt ausschließlich für Windows 11 24H2 und 25H2. Microsoft hat für andere unterstützte Windows-Versionen eigene Pakete veröffentlicht.

| Windows-Version                          | Update    |
| ---------------------------------------- | --------- |
| Windows 11 26H1                          | KB5129194 |
| Windows 11 25H2 und 24H2                 | KB5129195 |
| Windows 11 25H2 und 24H2 mit Hotpatch    | KB5129241 |
| Windows 11 23H2                          | KB5129242 |
| Windows 10 22H2 und Enterprise LTSC 2021 | KB5129236 |
| Windows 10 Enterprise LTSC 2019          | KB5129238 |
| Windows 10 Enterprise LTSB 2016          | KB5129239 |
| Windows Server 2025                      | KB5129235 |
| Windows Server 2022                      | KB5129237 |
| Windows Server 2019                      | KB5129238 |
| Windows Server 2016                      | KB5129239 |
| Windows Server 2012 R2                   | KB5129243 |
| Windows Server 2012                      | KB5129244 |

Gerade bei verwalteten Systemen sollte deshalb auf die genaue Windows-Version geachtet werden. Die KB-Nummern sind nicht untereinander austauschbar.

## Muss ich KB5129195 installieren?

Für Windows 11 24H2 und 25H2 stellt Microsoft KB5129195 über Windows Update bereit. Auf regulär aktualisierten Systemen wird das Update automatisch angeboten und installiert.

Wer die Installation kontrollieren möchte, findet den Status unter:

**Einstellungen > Windows Update > Updateverlauf**

Mit `winver` lässt sich anschließend die installierte Windows-Buildnummer prüfen.

Nach erfolgreicher Installation sollte Windows 11 25H2 die Buildnummer **26200.9457** anzeigen. Bei Windows 11 24H2 ist es **26100.9457**.

In Unternehmensumgebungen ist die Situation etwas differenzierter. Dort können Windows Update for Business, WSUS oder andere Patch-Management-Systeme bestimmen, wann ein Update tatsächlich auf den Geräten landet.

Gerade Systeme mit Remote Desktop Services oder betroffenen Hyper-V-Workloads dürften dabei eine höhere Priorität haben. Gleichzeitig bleibt es sinnvoll, außerplanmäßige Updates vor einem breiten Rollout zunächst mit den eigenen Anwendungen und Konfigurationen zu testen.

## Warum ein Out-of-Band-Update bemerkenswert ist

Fehler nach einem großen kumulativen Windows-Update sind grundsätzlich nichts Neues. Interessant ist hier vor allem die Kombination der betroffenen Bereiche.

Remote Desktop betrifft Unternehmensinfrastruktur. Hyper-V ist für Virtualisierung und Entwicklungsumgebungen relevant. USB Audio wiederum betrifft klassische Desktop-Systeme und spezialisierte Audio-Hardware.

Microsoft bündelt die Korrekturen anschließend erneut in einem kumulativen Paket.

Aus Sicht des [Software Engineering](https://oliverjessner.at/category/software-engineering/) zeigt das die Schwierigkeit moderner Betriebssystemupdates: Ein Sicherheitsupdate verändert nicht nur eine einzelne Komponente. Es bewegt sich durch ein komplexes System aus Treibern, Virtualisierung, Netzwerkdiensten, Benutzeroberfläche und Sicherheitsmechanismen.

Entsprechend schwierig ist es, jede mögliche Kombination aus Hardware und Software vorab abzudecken.

## Was nach KB5129195 weiterhin offen bleibt

Der wichtigste bestätigte Restfehler betrifft weiterhin USB Audio Class 1.0.

KB5129195 löst die Schwierigkeiten mit bestimmten Mehrkanal-Modi, aber nicht sämtliche Audio-Ausfälle. Microsoft arbeitet nach eigenen Angaben an einer weiteren Lösung.

Deshalb lohnt es sich, bei weiterhin auftretenden Audio-Problemen genau zwischen den verschiedenen Fehlerbildern zu unterscheiden.

Funktioniert Stereo, aber 8-Kanal- oder 3D-Audio nicht, sollte KB5129195 helfen. Startet das USB-Audiogerät dagegen überhaupt nicht mehr, zeigt Code 10 oder liefert keinen Ton, kann das bekannte Problem auch nach der Installation bestehen bleiben.

## Fazit

Mit KB5129195 reagiert Microsoft relativ schnell auf mehrere Probleme des September-Updates für Windows 11.

Für viele betroffene Nutzer dürfte vor allem die Reparatur der Remote Desktop Services und der Hyper-V-Dateifreigaben relevant sein. Auch bestimmte USB-Audio-Probleme werden behoben.

Vollständig abgeschlossen ist das Thema damit allerdings noch nicht. Bei USB Audio Class 1.0 bleiben Fehler bekannt, an denen Microsoft weiter arbeitet.

KB5129195 ist zudem nicht nur ein Reparaturpaket. Durch die zusätzlichen Schutzmaßnahmen für CVE-2026-62721 handelt es sich gleichzeitig um ein sicherheitsrelevantes Update. Gerade deshalb ist ein aktualisiertes System langfristig die sinnvollere Lösung als das dauerhafte Entfernen der September-Patches.
