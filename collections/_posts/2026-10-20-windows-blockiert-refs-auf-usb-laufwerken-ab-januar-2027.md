---
layout: post
title: 'Windows blockiert ReFS auf USB-Laufwerken ab Januar 2027'
date: 2026-10-20 10:41:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - microsoft
    - computer-stuff
    - software-development
    - terminal
description: 'Microsoft schränkt ReFS auf USB-Laufwerken ein. Was im Januar 2027 passiert und wie du betroffene Datenträger schon jetzt erkennst'
thumbnail: '/assets/images/gen/blog/windows-blockiert-refs-auf-usb-laufwerken-ab-januar-2027/header_thumbnail.webp'
image: '/assets/images/gen/blog/windows-blockiert-refs-auf-usb-laufwerken-ab-januar-2027/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Blockiert Windows 11 ab Januar 2027 alle USB-Sticks?'
      answer: 'Nein. Die Sperre betrifft ReFS-Volumes auf bestimmten externen und wechselbaren Datenträgern. USB-Sticks und Festplatten mit NTFS, exFAT oder FAT32 sind von dieser Änderung nicht betroffen.'
    - question: 'Wann werden externe ReFS-Laufwerke unter Windows gesperrt?'
      answer: 'Microsoft plant, die Blockierung mit dem Windows-Sicherheitsupdate im Januar 2027 standardmäßig zu aktivieren. Seit dem 13. Oktober 2026 werden betroffene ReFS-Volumes zunächst nur protokolliert.'
    - question: 'Wie erkenne ich, ob meine externe Festplatte ReFS verwendet?'
      answer: 'Das Dateisystem lässt sich im Windows-Explorer unter Eigenschaften oder mit dem PowerShell-Befehl Get-Volume prüfen. Die Ereignisanzeige protokolliert betroffene ReFS-Konfigurationen außerdem mit der Ereignis-ID 524.'
socialmedia:
    - 'Windows protokolliert seit Oktober 2026 externe ReFS-Laufwerke. Ab Januar 2027 folgt eine Standardsperre. Warum normale USB-Sticks nicht betroffen sind und wie du ReFS erkennst.'
    - 'ReFS ist nicht einfach der Nachfolger von NTFS. Microsoft schränkt den Einsatz auf externen Laufwerken weiter ein. Ein Blick auf die technischen Hintergründe und die Folgen für Windows-Nutzer.'
    - 'Wer eine externe Festplatte mit ReFS verwendet, sollte vor Januar 2027 seine Daten sichern. Windows wird solche Datenträger künftig standardmäßig blockieren. Was dahintersteckt und welche Optionen bleiben.'
news: true
---

Microsoft verschärft den Umgang mit externen ReFS-Laufwerken. Seit Oktober 2026 protokolliert Windows betroffene Datenträger. Ab Januar 2027 soll daraus eine Standardsperre werden. Doch nicht jeder USB-Speicher ist betroffen.

## Windows blockiert externe ReFS-Laufwerke ab Januar 2027

Mit den Windows-Sicherheitsupdates vom 13. Oktober 2026 hat [Microsoft](https://oliverjessner.at/category/microsoft/) eine Änderung eingeführt, die vor allem Nutzer spezieller Speicherkonfigurationen betrifft. Das Betriebssystem überprüft künftig, ob das Dateisystem ReFS (Resilient File System) auf externen oder wechselbaren Datenträgern eingesetzt wird.

Nach Angaben des Unternehmens gilt ReFS auf solchen Speichermedien als nicht unterstützte Konfiguration. Bisher konnten entsprechende Laufwerke dennoch unter Windows funktionieren.

Das soll sich ändern.

Microsoft führt die Einschränkungen in zwei Phasen ein:

- **13. Oktober 2026:** Windows beginnt, betroffene externe ReFS-Volumes zu protokollieren. Das Einbinden der Laufwerke bleibt standardmäßig erlaubt.
- **Januar 2027:** Mit dem geplanten Sicherheitsupdate wird die Blockierung standardmäßig aktiviert. Betroffene ReFS-Volumes können dann ohne entsprechende administrative Freigabe nicht mehr eingebunden werden.

Die Änderung betrifft nicht nur Windows 11. Das offizielle [Support-Dokument KB5130741](https://support.microsoft.com/de-de/servicing/os/windows/docs/2026/10/hardening-changes-for-refs-volumes-on-removable-media) führt auch verschiedene Windows-10-Versionen und Windows-Server-Ausgaben auf.

Wichtig ist dabei die Unterscheidung zwischen einem gesperrten Dateisystem und einem defekten Datenträger. Die Dateien auf einem betroffenen Laufwerk werden durch die neue Richtlinie nicht gelöscht. Windows verweigert lediglich das Einbinden des ReFS-Volumes.

Ohne eine Änderung der Richtlinie ist anschließend kein regulärer Zugriff auf die gespeicherten Daten mehr möglich.

## Was ist ReFS und warum wird es eingeschränkt?

Das Resilient File System wurde 2012 mit Windows Server 2012 eingeführt. Microsoft entwickelte es für Speicherumgebungen, in denen Datenintegrität, Ausfallsicherheit und große Datenmengen besonders wichtig sind.

Im Vergleich zum etablierten NTFS bietet ReFS einige technische Besonderheiten:

- **Datenintegrität:** Prüfsummen und Integritätsmechanismen helfen dabei, bestimmte Beschädigungen zu erkennen. Unter geeigneten Speicherbedingungen ist auch eine automatische Korrektur möglich.
- **Skalierbarkeit:** ReFS unterstützt laut Microsoft Volumes und Dateien mit einer Größe von bis zu 35 Petabyte.
- **Block Cloning:** Datenbereiche können innerhalb eines ReFS-Volumes durch Änderungen an Metadaten kopiert werden, ohne sämtliche Datenblöcke physisch zu duplizieren.
- **Resilienz:** ReFS ist darauf ausgelegt, bei bestimmten Speicherfehlern die Verfügbarkeit und Konsistenz von Daten zu verbessern.

Gerade Block Cloning macht das Dateisystem für große Dateien und virtualisierte Umgebungen interessant.

Anstatt Daten vollständig von einem Speicherbereich in einen anderen zu kopieren, kann ReFS unter bestimmten Voraussetzungen vorhandene Datenblöcke mehrfach referenzieren. Das reduziert Schreibvorgänge und kann Kopieroperationen erheblich beschleunigen.

Dennoch ist ReFS kein vollständiger Ersatz für NTFS.

Microsoft sieht NTFS weiterhin als universelles Dateisystem für gewöhnliche Windows-Installationen. ReFS richtet sich dagegen stärker an bestimmte Speicherarchitekturen, Serveranwendungen und Entwicklungsumgebungen.

Die [technische ReFS-Dokumentation](https://learn.microsoft.com/en-us/windows-server/storage/refs/refs-overview) nennt ausdrücklich, dass Wechselmedien keine unterstützte Einsatzumgebung darstellen.

Die neue Sperre ist deshalb weniger eine grundsätzliche Abkehr von ReFS als vielmehr die konsequentere Durchsetzung bereits bestehender Einschränkungen.

## Warum sperrt Microsoft ReFS auf USB-Festplatten?

Als Begründung nennt Microsoft eine Verbesserung der Sicherheit.

Die Verwendung von ReFS auf externen Speichermedien gehört nicht zu den offiziell unterstützten Konfigurationen. Durch die neuen Kontrollmechanismen sollen Administratoren solche Laufwerke zunächst erkennen und ihre Verwendung später unterbinden können.

Interessant ist dabei, dass Microsoft in der veröffentlichten Dokumentation keine konkrete Sicherheitslücke benennt, die unmittelbar durch ReFS auf USB-Laufwerken ausgenutzt werden könnte.

Stattdessen beschreibt das Unternehmen eine allgemeine Härtungsmaßnahme für Windows.

Für Administratoren bedeutet das mehr Kontrolle über nicht unterstützte Speicherkonfigurationen. Für Anwender, die solche Laufwerke bislang problemlos genutzt haben, kann die Änderung allerdings bestehende Arbeitsabläufe unterbrechen.

Ein typisches Beispiel wäre eine externe SSD mit ReFS, die regelmäßig zwischen unterschiedlichen Windows-Rechnern verwendet wird.

Solange Windows das Volume einbindet, lassen sich Dateien wie gewohnt lesen und schreiben. Mit der geplanten Standardsperre könnte dieser Zugriff nach einem Sicherheitsupdate plötzlich nicht mehr verfügbar sein.

## Welche USB-Sticks und externen Festplatten sind betroffen?

Die Einschränkung gilt ausdrücklich nicht für sämtliche USB-Speichermedien.

Entscheidend ist das verwendete Dateisystem und ob Windows den Datenträger als betroffene externe beziehungsweise wechselbare ReFS-Konfiguration erkennt.

| Dateisystem                          | Von der neuen ReFS-Sperre betroffen? |
| ------------------------------------ | ------------------------------------ |
| NTFS                                 | Nein                                 |
| exFAT                                | Nein                                 |
| FAT32                                | Nein                                 |
| ReFS auf betroffenen externen Medien | Ja                                   |

Wer einen gewöhnlichen USB-Stick mit FAT32 oder exFAT verwendet, muss aufgrund dieser Änderung nichts unternehmen.

Auch eine externe NTFS-Festplatte bleibt von der neuen ReFS-Richtlinie unberührt.

Relevant ist die Änderung hauptsächlich für Nutzer, die ReFS bewusst auf externen Datenträgern eingerichtet haben, etwa für spezielle Speicherlösungen, Tests oder Entwicklungsumgebungen.

Eine weitere wichtige Unterscheidung betrifft Windows 11 Dev Drives.

Diese verwenden ebenfalls ReFS und sollen insbesondere Arbeitsabläufe in der [Softwareentwicklung](https://oliverjessner.at/category/software-development/) unterstützen. Ein unterstütztes ReFS-Volume auf einem internen Datenträger fällt jedoch nicht allein deshalb unter die neue Sperre, weil es ReFS verwendet.

## So erkennst du, ob deine Festplatte ReFS verwendet

Wer überprüfen möchte, welches Dateisystem auf einem angeschlossenen Laufwerk verwendet wird, benötigt keine zusätzliche Software.

### Methode 1: Dateisystem im Windows-Explorer prüfen

Die einfachste Möglichkeit führt über die Laufwerkseigenschaften.

1. Öffne den Windows-Explorer.
2. Wechsle zu "Dieser PC".
3. Klicke mit der rechten Maustaste auf das betreffende Laufwerk.
4. Wähle "Eigenschaften".
5. Suche im Reiter "Allgemein" nach dem Eintrag "Dateisystem".

Steht dort "NTFS", "exFAT" oder "FAT32", ist das Laufwerk von der beschriebenen ReFS-Sperre nicht betroffen.

Bei "ReFS" lohnt sich eine genauere Überprüfung.

### Methode 2: ReFS mit PowerShell erkennen

Alternativ lassen sich die Dateisysteme aller erkannten Volumes über PowerShell anzeigen.

Öffne PowerShell und führe folgenden Befehl aus:

```powershell
Get-Volume | Select-Object DriveLetter, FileSystemLabel, FileSystem
```

Windows gibt anschließend eine Übersicht mit Laufwerksbuchstaben, Bezeichnungen und Dateisystemen aus.

Möchtest du nur ein bestimmtes Laufwerk überprüfen, beispielsweise Laufwerk E, kannst du folgenden Befehl verwenden:

```powershell
Get-Volume -DriveLetter E
```

In der Spalte `FileSystem` steht das erkannte Dateisystem.

Der Befehl verändert keine Daten und eignet sich deshalb gut für eine erste Kontrolle.

### Methode 3: ReFS-Warnungen in der Ereignisanzeige finden

Seit dem Oktober-Update 2026 protokolliert Windows erkannte externe ReFS-Konfigurationen im Systemprotokoll.

Dazu verwendet das Betriebssystem die **Ereignis-ID 524** mit der Quelle "ReFS".

So findest du die Einträge:

1. Drücke `Win + R`.
2. Gib `eventvwr.msc` ein.
3. Öffne "Windows-Protokolle" und anschließend "System".
4. Filtere nach der Ereignis-ID `524`.
5. Prüfe die Einträge mit der Quelle "ReFS".

Microsoft zufolge wird bei aktivierter Überwachung pro erkanntem betroffenem Volume und Systemstart ein entsprechendes Ereignis protokolliert.

Die Meldung weist darauf hin, dass das Volume auf einem extern angeschlossenen oder wechselbaren Datenträger liegt und diese Konfiguration nicht offiziell unterstützt wird.

Eine solche Warnung bedeutet im Oktober 2026 noch nicht, dass Windows den Datenträger bereits blockiert.

Sie zeigt vielmehr, dass die Konfiguration von der späteren Durchsetzung betroffen sein könnte.

## Was tun, wenn eine externe Festplatte ReFS verwendet?

Wer tatsächlich ReFS auf einer externen Festplatte oder SSD verwendet, sollte die verbleibende Zeit bis zum Sicherheitsupdate im Januar 2027 nutzen.

Dabei gibt es grundsätzlich mehrere Möglichkeiten.

### 1. Daten auf einen unterstützten Datenträger kopieren

Die naheliegendste Lösung besteht darin, wichtige Dateien rechtzeitig auf einen unterstützten Datenträger zu übertragen.

Für externe Laufwerke, die hauptsächlich unter Windows eingesetzt werden, bietet sich häufig NTFS an.

Soll das Laufwerk auch mit macOS verwendet werden, kann exFAT sinnvoll sein. Die Wahl hängt allerdings von den benötigten Funktionen und den verwendeten Betriebssystemen ab.

**Wichtig:** Eine Neuformatierung löscht die vorhandenen Daten des jeweiligen Volumes. Deshalb sollten alle benötigten Dateien zuvor auf einem anderen Datenträger gesichert und anschließend überprüft werden.

### 2. ReFS in einer unterstützten Umgebung weiterverwenden

Nicht jeder Nutzer möchte oder kann auf die Vorteile von ReFS verzichten.

Gerade für virtuelle Maschinen, große Entwicklungsprojekte und bestimmte Serveranwendungen kann das Dateisystem weiterhin sinnvoll sein.

In solchen Fällen empfiehlt sich eine Migration auf eine von Microsoft unterstützte Speicherkonfiguration.

Welche Möglichkeiten bestehen, hängt unter anderem von der eingesetzten Windows-Version, der Hardware und der vorgesehenen Anwendung ab.

### 3. Die ReFS-Sperre administrativ deaktivieren

Microsoft ermöglicht es Administratoren, das Verhalten über die Windows-Registry oder Gruppenrichtlinien anzupassen.

Dafür wurde die Einstellung `RefsRemovableDeviceMountPolicy` eingeführt.

Die lokale Registrierungseinstellung befindet sich unter:

```text
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem
```

Dort wird der DWORD-Wert `RefsRemovableDeviceMountPolicy` verwendet.

Die möglichen Werte sind:

| Wert | Bedeutung                                    |
| ---- | -------------------------------------------- |
| `0`  | Überwachung und Blockierung deaktiviert      |
| `1`  | Überwachung aktiviert, Einbinden erlaubt     |
| `2`  | Einbinden betroffener ReFS-Volumes blockiert |

Bis zur geplanten Umstellung im Januar 2027 ist die Überwachung standardmäßig aktiv.

Anschließend soll die Blockierung zum Standard werden.

Administratoren können diese Einstellung bei Bedarf überschreiben. In verwalteten Umgebungen haben Gruppenrichtlinien unter `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Policies` Vorrang vor der lokalen Dateisystemeinstellung.

Nach einer Änderung ist laut Microsoft ein Neustart erforderlich.

**Warnung:** Die Deaktivierung der Sperre setzt eine vorgesehene Sicherheitsmaßnahme außer Kraft. Sie sollte daher nicht als dauerhafte Alternative zu einer unterstützten Speicherkonfiguration betrachtet werden. Änderungen an der Registry sollten ausschließlich mit entsprechender Sachkenntnis und vorhandener Datensicherung vorgenommen werden.

## Fazit – ReFS bleibt, aber nicht überall

Die Entscheidung zeigt, wie unterschiedlich Microsoft seine beiden Dateisysteme positioniert.

NTFS bleibt die allgemeine Lösung für Windows-Datenträger. ReFS entwickelt sich dagegen als spezialisiertes Dateisystem für bestimmte Speicher- und Entwicklungsumgebungen weiter.

Dass Microsoft nun den Einsatz auf externen Medien einschränkt, bedeutet deshalb nicht, dass ReFS grundsätzlich eingestellt oder aus Windows entfernt wird.

Für die meisten Anwender dürfte die Änderung ohne praktische Folgen bleiben. Gewöhnliche USB-Sticks und externe Festplatten mit NTFS, exFAT oder FAT32 werden durch die neue Richtlinie nicht eingeschränkt.

Anders sieht es bei Nutzern aus, die externe ReFS-Volumes bewusst eingerichtet haben. Hier kann aus einer bislang funktionierenden, aber nicht unterstützten Konfiguration ab Januar 2027 ein Zugriffsproblem werden.

Ein kurzer Blick auf das Dateisystem der eigenen Laufwerke schafft Klarheit. Wer ReFS auf externen Speichern einsetzt, sollte seine Daten rechtzeitig sichern und die weitere Verwendung überprüfen.

Die Sperre selbst ist schließlich kein Datenverlust. Ohne Vorbereitung kann sie sich im Alltag aber durchaus wie einer anfühlen.
