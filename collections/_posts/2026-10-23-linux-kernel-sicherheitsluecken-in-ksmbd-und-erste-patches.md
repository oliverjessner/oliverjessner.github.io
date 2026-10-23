---
layout: post
title: 'Linux-Kernel: Sicherheitslücken in KSMBD und erste Patches'
date: 2026-10-23 15:07:20 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - linux
    - software-engineering
    - terminal
description: 'Zwei kritische KSMBD-Lücken sind öffentlich. Welche Linux-Systeme betroffen sein können und was beim Patch-Stand zu beachten ist'
thumbnail: '/assets/images/gen/blog/linux-kernel-sicherheitsluecken-in-ksmbd-und-erste-patches/header_thumbnail.webp'
image: '/assets/images/gen/blog/linux-kernel-sicherheitsluecken-in-ksmbd-und-erste-patches/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Sind alle Linux-Systeme von den KSMBD-Sicherheitslücken betroffen?'
      answer: 'Nein. Entscheidend sind eine verwundbare KSMBD-Implementierung, ihre Konfiguration und die jeweiligen Angriffsvoraussetzungen. Der Bericht zur SMB-Direct-Lücke nennt beispielsweise RDMA-Unterstützung und eine beschreibbare Freigabe. Andere öffentlich gemeldete Kernel-Lücken müssen separat bewertet werden.'
    - question: 'Betreffen die KSMBD-Sicherheitslücken auch Samba?'
      answer: 'KSMBD und Sambas smbd sind unterschiedliche Serverimplementierungen. Die beiden Berichte beschreiben Fehler in KSMBD. Daraus folgt keine pauschale Betroffenheit von Samba-Servern.'
    - question: 'Gibt es bereits Patches für die KSMBD-Sicherheitslücken?'
      answer: 'Stand 23. Oktober 2026 verweist der KSMBD-Maintainer auf einen Fix für die Race Condition. Für SMB Direct wurde ein Patchvorschlag veröffentlicht. Ob die Korrekturen bereits in einem Update deiner Distribution enthalten sind, muss anhand ihrer Sicherheitshinweise geprüft werden.'
socialmedia:
    - 'Zwei KSMBD-Sicherheitslücken im Linux-Kernel sind öffentlich, beide von ZDI mit CVSS 9,0 bewertet. Wer betroffen sein kann, welche Patches vorliegen und warum die Kernelversion allein nicht ausreicht.'
    - 'KSMBD und Samba sind unterschiedliche Serverimplementierungen. Bei den aktuellen Linux-Kernel-Sicherheitslücken entscheiden die eingesetzten Funktionen und der Patch-Stand über die Betroffenheit.'
    - 'Für die öffentlich gemeldeten KSMBD-Lücken gibt es erste Korrekturen. Ein Patch im Entwicklerbaum ist aber noch kein installiertes Distributionsupdate. Der aktuelle Stand und sinnvolle Prüfungen.'
news: true
---

Öffentliche Berichte beschreiben kritische Sicherheitslücken im Linux-Kernel. Zwei betreffen den Dateiserver KSMBD. Inzwischen gibt es erste Korrekturen. Was bedeutet das für dein System?

## Linux-Kernel-Sicherheitslücken: Was öffentlich wurde

Die Zero Day Initiative (ZDI) von Trend Micro hat am 21. Oktober 2026 mehrere Schwachstellenberichte an öffentliche Kernel-Mailinglisten geschickt. Zwei davon betreffen KSMBD, einen Dateiserver im [Linux](https://oliverjessner.at/category/linux/)-Kernel. ZDI bewertet beide Probleme [mit einem CVSS-Wert von 9,0](https://www.zerodayinitiative.com/advisories/upcoming/).

Die Meldungen beschreiben Speicherfehler, die nach Einschätzung von ZDI eine Codeausführung über das Netzwerk ermöglichen können. Für Administratoren stellt sich deshalb zunächst eine konkrete Frage: Läuft auf ihren Systemen eine betroffene KSMBD-Version, und sind die erforderlichen Funktionen erreichbar?

**Aus einer Sicherheitslücke im Linux-Kernel folgt keine automatische Betroffenheit jedes Linux-Rechners.** Auch der CVSS-Wert beantwortet diese Frage nicht. Er beschreibt den technischen Schweregrad einer Schwachstelle. Für das tatsächliche Risiko müssen laut [CVSS-Dokumentation von FIRST](https://www.first.org/cvss/v3.1/user-guide#2-1-CVSS-Measures-Severity-not-Risk) zusätzlich die jeweilige Umgebung und weitere Faktoren berücksichtigt werden.

## Was KSMBD ist und welche Fehler gemeldet wurden

[KSMBD](https://docs.kernel.org/filesystems/smb/ksmbd.html) stellt Dateien über das Netzwerk mit dem SMB-Protokoll bereit. Einen Teil der Verarbeitung übernimmt dabei direkt der Kernel.

Davon zu unterscheiden ist [Sambas Serverprozess smbd](https://www.samba.org/samba/docs/current/man-html/smbd.8.html). Beide können SMB-Dateifreigaben anbieten, sind aber unterschiedliche Implementierungen. Wer einen Samba-Server betreibt oder lediglich auf eine Netzwerkfreigabe zugreift, verwendet deshalb nicht automatisch KSMBD als Server.

### ZDI-CAN-33549: Integer-Unterlauf in SMB Direct

Der Bericht zu [ZDI-CAN-33549](https://lkml.iu.edu/2610.2/14779.html) beschreibt einen Fehler in SMB Direct. Diese Transportvariante verwendet RDMA, ein Verfahren für direkte Speicherzugriffe über ein Netzwerk.

Bei der Verarbeitung von Längenangaben kann ein Integer-Unterlauf entstehen. Eine Zahl unterschreitet dabei ihren vorgesehenen Wertebereich und wird anschließend falsch interpretiert. Dadurch sind Speicherzugriffe außerhalb der vorgesehenen Grenzen möglich.

Für das beschriebene Szenario nennt ZDI RDMA-Unterstützung, SMB Direct und eine beschreibbare Freigabe. Diese Voraussetzungen sind für die Bewertung eines konkreten Servers relevant.

### ZDI-CAN-33774: Race Condition in KSMBD

[ZDI-CAN-33774](https://lkml.iu.edu/2610.2/14807.html) betrifft eine Race Condition bei der Protokollverarbeitung. Dabei hängt das Ergebnis davon ab, in welcher Reihenfolge parallele Abläufe stattfinden.

KSMBD kann dadurch eine Anfrage mit der falschen Verarbeitungsroutine bearbeiten und auf Speicher außerhalb der vorgesehenen Grenzen zugreifen. Der Bericht beschreibt Lesezugriffe sowie einen möglichen Schreibpfad. Für den gezeigten Auslöser nennt er eine Gastfreigabe und das erforderliche zeitliche Zusammenspiel.

Beide KSMBD-Berichte nennen Linux 7.3-rc3 als getestete Version. Daraus lässt sich keine vollständige Liste betroffener Kernelversionen ableiten.

Zur veröffentlichten Meldungsserie gehört außerdem beispielsweise [ZDI-CAN-33367](https://lkml.iu.edu/2610.2/14824.html), eine gemeldete lokale Rechteausweitung im Netzwerkcode. Ein System ohne KSMBD muss daher hinsichtlich anderer Kernel-Schwachstellen gesondert bewertet werden.

## War die Veröffentlichung tatsächlich ein Versehen?

Die [Meldung von WinFuture](https://winfuture.de/news,162149.html) beschreibt die Veröffentlichung als versehentlich. In den Originalthreads ist belegt, dass Kernel-Entwickler Greg Kroah-Hartman das [öffentliche Einsenden ohne beigefügten Patch kritisierte](https://lkml.iu.edu/2610.2/15259.html).

Die geltenden [Kernel-Richtlinien für Sicherheitsmeldungen](https://docs.kernel.org/process/security-bugs.html) unterscheiden allerdings mehrere Fälle. Bislang vertrauliche Sicherheitsprobleme sollen grundsätzlich zunächst an die zuständigen Maintainer und das Sicherheitsteam gehen.

Für Fehler, die mit KI-Unterstützung gefunden wurden, sieht die Dokumentation ausdrücklich eine öffentliche Behandlung vor. Gleichzeitig sollen dabei keine Programme zur unmittelbaren Reproduktion des Fehlers öffentlich mitgeschickt werden.

Diese Ausnahme erklärt, weshalb eine öffentliche Meldung nicht automatisch einen versehentlichen Versand belegt. Sie beweist allerdings auch nicht, dass ZDI sich hier auf diese Regel berief oder die betreffenden Fehler mit KI entdeckte. Aus den vorliegenden Antworten lässt sich die Ursache für die Wahl des Meldewegs nicht abschließend bestimmen.

## Welche Patches am 23. Oktober 2026 vorliegen

Bei den Korrekturen ist die Diskussion bereits weiter als die erste Berichterstattung:

- **KSMBD-Race-Condition:** Maintainer Namjae Jeon erklärte am 22. Oktober, dass das Problem bereits behoben sei. Seine [Antwort verweist auf einen Fix im SMB-Entwicklerbaum](https://lkml.iu.edu/2610.2/16095.html).
- **SMB Direct:** Am 23. Oktober veröffentlichte Jeon einen [konkreten Patch gegen den Integer-Unterlauf](https://lkml.iu.edu/2610.2/18418.html). Stefan Metzmacher beurteilte die Änderung anschließend [positiv](https://lkml.iu.edu/2610.2/18452.html).

Für die Absicherung eines Rechners muss eine solche Änderung auch im tatsächlich verwendeten Kernel enthalten sein. Ein Fix im Entwicklerbaum, seine Übernahme in gepflegte Kernelzweige und ein bereitgestelltes Distributionsupdate sind unterschiedliche Schritte.

**Maßgeblich ist deshalb der Sicherheitsstatus des konkreten Kernelpakets deiner Distribution oder deines Geräteherstellers.**

## So prüfst du dein Linux-System

Eine erste Bestandsaufnahme ist im [Terminal](https://oliverjessner.at/category/terminal/) möglich. Diese Befehle zeigen den laufenden Kernel und die geladenen Kernelmodule:

```bash
# Version des aktuell laufenden Kernels anzeigen
uname -r

# Aktuell geladene Kernelmodule auflisten
lsmod
```

Suche in der Modulliste nach `ksmbd`. Ein entsprechender Eintrag zeigt, dass das Modul geladen ist. Er belegt für sich genommen weder eine verwundbare Version noch einen erreichbaren Dateiserver.

Auch ein fehlender Eintrag ist keine vollständige Prüfung: Wie die Kernel-Dokumentation beschreibt, kann KSMBD fest in den Kernel eingebaut sein. Solche Komponenten erscheinen nicht in der von [`lsmod`](https://man7.org/linux/man-pages/man8/lsmod.8.html) ausgegebenen Liste geladener Module.

Für das weitere Vorgehen sind vier Punkte sinnvoll:

1. **Serverfunktion klären:** Prüfe, ob dein Rechner oder NAS tatsächlich KSMBD verwendet und welche Freigaben sowie Transportfunktionen aktiviert sind.
2. **Erreichbarkeit begrenzen:** Erlaube Zugriffe auf den Dateiserver nur aus den benötigten Netzen. Berücksichtige bei SMB Direct auch den verwendeten RDMA-Transport.
3. **Sicherheitshinweise abgleichen:** Prüfe die Meldungen deiner Distribution, beispielsweise die [Ubuntu Security Notices](https://ubuntu.com/security/notices) oder die [Debian-Sicherheitshinweise](https://www.debian.org/security/). Bei einem NAS oder einer Appliance ist zusätzlich der Gerätehersteller die passende Anlaufstelle.
4. **Korrigierte Pakete einspielen:** Installiere bereitgestellte Sicherheitsupdates über den vorgesehenen Updateweg. Beachte anschließend die Hinweise dazu, ob ein Neustart erforderlich ist.

Die Ausgabe von `uname -r` allein reicht zur Bewertung des Patch-Stands nicht aus. Distributionen können Sicherheitskorrekturen in ältere Kernelstände zurückportieren. Dieses [Backporting](https://access.redhat.com/security/updates/backporting) ermöglicht Fehlerbehebungen, ohne auf die neueste Hauptversion umzusteigen.

Vergleiche deshalb die vollständige Paketversion mit dem jeweiligen Sicherheitshinweis und prüfe nach dem Update, ob der korrigierte Kernel tatsächlich läuft.
