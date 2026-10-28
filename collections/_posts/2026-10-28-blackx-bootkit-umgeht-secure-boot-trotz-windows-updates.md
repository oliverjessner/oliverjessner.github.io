---
layout: post
title: BlackX-Bootkit umgeht Secure Boot trotz Windows-Updates
date: 2026-10-28 11:25:51 +0100
authors:
  - oliver_jessner
meta_og_type: article
categories:
  - microsoft
  - computer-stuff
  - Privacy
description: Warum BlackX trotz Windows-Updates Secure Boot umgehen kann und welche zusätzlichen Schutzmaßnahmen Administratoren prüfen sollten
thumbnail: /assets/images/gen/blog/blackx-bootkit-umgeht-secure-boot-trotz-windows-updates/header_thumbnail.webp
image: /assets/images/gen/blog/blackx-bootkit-umgeht-secure-boot-trotz-windows-updates/header.webp
faq:
  - question: Was ist das BlackX-Bootkit?
    answer: BlackX ist eine Schadsoftware, die früh im Startvorgang eingreift und Secure Boot über die bekannte Schwachstelle Baton Drop umgeht. Kaspersky beobachtete sie bei Angriffen auf diplomatische Einrichtungen in Zentralasien.
  - question: Warum reichen Windows-Updates gegen BlackX nicht immer aus?
    answer: In der beobachteten Kampagne fehlten zusätzliche Secure-Boot-Sperren. Installierte Updates allein belegen deshalb nicht, dass verwundbare Bootkomponenten tatsächlich blockiert werden.
  - question: Schützt das abgelaufene Zertifikat automatisch vor BlackX?
    answer: Nein. Der Ablauf des Zertifikats Windows Production PCA 2011 ersetzt dessen Sperrung nicht. Für die Schutzwirkung ist entscheidend, ob die entsprechenden Komponenten weiterhin als vertrauenswürdig gelten.
socialmedia:
  - BlackX umgeht Secure Boot auf Windows-Systemen, obwohl Updates installiert sind. Der Fall zeigt, warum bei der Absicherung des Startvorgangs auch Zertifikate und Sperrlisten zählen.
  - Ein abgelaufenes Zertifikat ist nicht automatisch gesperrt. Genau dieser Unterschied ist beim BlackX-Bootkit relevant. Was Administratoren bei Secure Boot prüfen sollten.
  - BlackX wurde bei gezielten Spionageangriffen beobachtet. Die Angreifer hatten bereits Administratorrechte. Warum das Bootkit trotzdem eine wichtige Frage zur Windows-Absicherung aufwirft.
news: true
pinned: false
ads: true
image_width: 1280
image_height: 720
---

Installierte Windows-Updates bedeuten nicht automatisch, dass alle Schutzmaßnahmen für Secure Boot greifen. Das Bootkit BlackX nutzt diese Lücke zwischen ausgeliefertem Update und aktivierter Absicherung.

## Was das BlackX-Bootkit macht

BlackX ist ein UEFI-Bootkit, das in den Startvorgang eines Windows-Rechners eingreift. Kaspersky entdeckte es Anfang 2026 bei Angriffen auf diplomatische Einrichtungen in Tadschikistan, Usbekistan und Turkmenistan. Der Forschungsbericht erschien am 22. Oktober 2026.

Die Schadsoftware ähnelt BlackLotus und verwendet die bekannte Schwachstelle Baton Drop, geführt als CVE-2022-21894. Darüber lässt sich Secure Boot umgehen. Anschließend kann BlackX einen schädlichen Treiber in den Windows-Kernel laden. Kaspersky ordnet die Kampagne mit mittlerer Sicherheit APT41 zu. Diese Zuordnung ist eine Einschätzung der Forscher. Die technischen Details beschreibt die [BlackX-Analyse auf Securelist](https://securelist.com/uefi-bootkit-blackx/121539/).

## Warum Secure Boot trotz Updates umgangen werden kann

Secure Boot prüft beim Start, ob Bootsoftware als vertrauenswürdig gilt. Dafür verwendet die Firmware unter anderem eine Datenbank erlaubter Signaturen und eine Sperrliste namens DBX. Eine gültige Signatur allein sagt allerdings nicht aus, dass die signierte Software keine Sicherheitslücke enthält.

Genau deshalb müssen verwundbare Bootkomponenten zusätzlich gesperrt werden. [Microsoft](https://oliverjessner.at/category/microsoft/) dokumentiert die dafür vorgesehenen Maßnahmen in [KB5025885](https://support.microsoft.com/en-us/servicing/os/windows/2023/03/how-to-manage-the-windows-boot-manager-revocations-for-secure-boot-changes-associated-with-cve-2023). Die Anleitung behandelt Secure-Boot-Änderungen im Zusammenhang mit CVE-2023-24932 und dem BlackLotus-Angriffsweg.

Der entscheidende Unterschied: Ein installiertes Sicherheitsupdate und eine tatsächlich angewendete Sperrliste sind zwei getrennte Zustände. Laut dem [Bericht von WinFuture](https://winfuture.de/news,162188.html) waren die angegriffenen Systeme aktuell gepatcht. Die zusätzlich erforderliche Sperrung war jedoch nicht aktiviert.

## BlackX setzt bereits erlangte Administratorrechte voraus

Bei den beobachteten Angriffen hatten die Täter die Netzwerke bereits kompromittiert und Administratorrechte auf den betroffenen Windows-Rechnern erlangt. Erst danach installierten sie BlackX.

Das Bootkit dient damit dazu, einen bestehenden Zugriff zu verfestigen. Der nachgeladene Treiber versucht unter anderem, Sicherheitssoftware zu beeinträchtigen. Weitere Spionagewerkzeuge verwenden Google Drive, OneDrive oder Yandex Disk zur Kommunikation und für Dateiübertragungen. Diese Nutzung bedeutet keine Sicherheitslücke in den genannten Diensten. Die beschriebenen Abläufe stammen aus der [Kaspersky-Untersuchung](https://securelist.com/uefi-bootkit-blackx/121539/).

Für die Einordnung ist diese Reihenfolge wesentlich: Der Bericht beschreibt gezielte Angriffe nach einem bereits erfolgten Einbruch.

## Warum das abgelaufene Zertifikat nicht genügt

Das Zertifikat "Microsoft Windows Production PCA 2011" ist am 19. Oktober 2026 abgelaufen. Dieser Ablauf ersetzt keine Sperrung in der DBX.

Microsoft erklärt ausdrücklich, dass bestehende Geräte mit den bisherigen Bootloadern weiterhin starten können. Ohne den Wechsel auf die neuen Zertifikate fehlen ihnen jedoch künftig neue Sicherheitskorrekturen für diese Bootloader. Ablaufdatum, Zertifikatswechsel und Widerruf erfüllen also unterschiedliche Aufgaben. Das erläutert Microsoft in den [Hinweisen zum Ablauf von Windows Production PCA 2011](https://support.microsoft.com/en-gb/servicing/os/secure-boot/2026/10/kb5132953-windows-production-ca-2011-expiration-bootloader-updates).

## Was Administratoren jetzt prüfen sollten

Für verwaltete Windows-Geräte lohnt sich eine gezielte Bestandsaufnahme:

1. Sind die aktuellen Windows-Sicherheitsupdates installiert?
2. Sind das neue Zertifikat und der aktualisierte Bootmanager eingerichtet?
3. Wurde das alte Zertifikat tatsächlich gesperrt?
4. Sind Installations- und Wiederherstellungsmedien für den geänderten Vertrauensstand vorbereitet?

Microsoft sieht eine feste Reihenfolge vor: zunächst das neue Zertifikat und den Bootmanager bereitstellen, danach die Sperrung und den Schutz gegen ältere Bootmanager anwenden. Die Umsetzung und Kontrolle beschreibt die [Bereitstellungsanleitung für Unternehmen](https://support.microsoft.com/en-us/servicing/os/windows/2025/02/enterprise-deployment-guidance-for-cve-2023-24932).

**Hinweis:** Die Sperrung kann dazu führen, dass ältere Boot- und Wiederherstellungsmedien nicht mehr starten. Microsoft empfiehlt deshalb Tests mit repräsentativen Geräten und aktualisierte Wiederherstellungsmedien, bevor die Änderungen breit ausgerollt werden.

BlackX macht damit eine konkrete Schwäche im Betriebsalltag sichtbar: Der erfolgreiche Abschluss eines Updates bestätigt noch nicht, dass jede dazugehörige Schutzmaßnahme aktiv ist. Bei Secure Boot gehört die Prüfung des tatsächlichen Zustands zur Absicherung dazu.
