---
layout: post
title: 'Windows Server 2022: Support-Ende 2026 und Updates bis 2031'
date: 2026-10-17 15:26:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - microsoft
    - computer-stuff
    - software-engineering
    - cloud
description: 'Windows Server 2022 ist aus dem Mainstream-Support. Welche Updates es bis 2031 noch gibt und wann sich der Wechsel auf Windows Server 2025 lohnt'
thumbnail: '/assets/images/gen/blog/windows-server-2022-support-ende-2026-und-updates-bis-2031/header_thumbnail.webp'
image: '/assets/images/gen/blog/windows-server-2022-support-ende-2026-und-updates-bis-2031/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Wann endet der Support für Windows Server 2022?'
      answer: 'Der Mainstream-Support für Windows Server 2022 endete am 13. Oktober 2026. Der erweiterte Support läuft bis zum 14. Oktober 2031. Bis dahin stellt Microsoft weiterhin monatliche Sicherheitsupdates bereit.'
    - question: 'Sind Sicherheitsupdates für Windows Server 2022 nach 2026 kostenlos?'
      answer: 'Ja. Microsoft stellt während des erweiterten Supports bis Oktober 2031 weiterhin Sicherheitsupdates ohne zusätzliche Kosten bereit. Eine gesonderte ESU-Lizenz ist für diese reguläre Supportphase nicht erforderlich.'
    - question: 'Kann man Windows Server 2022 direkt auf Windows Server 2025 upgraden?'
      answer: 'Ja. Microsoft unterstützt den direkten Wechsel von Windows Server 2022 auf Windows Server 2025 als In-Place-Upgrade für geeignete Installationen. Bei Domänencontrollern empfiehlt Microsoft hingegen die Migration auf neu installierte Server.'
socialmedia:
    - 'Windows Server 2022: Der Mainstream-Support ist seit dem 13. Oktober 2026 beendet. Sicherheitsupdates gibt es dennoch kostenlos bis Oktober 2031. Was Administratoren jetzt wissen sollten.'
    - 'Muss Windows Server 2022 jetzt ersetzt werden? Nein. Microsoft liefert noch fünf Jahre Sicherheitsupdates. Trotzdem lohnt sich ein Blick auf den Upgrade-Pfad zu Windows Server 2025.'
    - 'Windows Server 2022 vs. 2025: Support bis 2031 oder 2034? Die wichtigsten Termine, Unterschiede und Möglichkeiten für ein direktes Upgrade im Überblick.'
news: true
---

Der reguläre Support für Windows Server 2022 ist beendet. Sicherheitsupdates bleiben jedoch bis Oktober 2031 verfügbar. Für Administratoren beginnt damit vor allem die langfristige Migrationsplanung.

## Windows Server 2022 – Mainstream-Support seit Oktober 2026 beendet

Am 13. Oktober 2026 hat [Microsoft](https://oliverjessner.at/microsoft/) den regulären Support für Windows Server 2022 eingestellt. Das Serverbetriebssystem wechselt damit vom sogenannten Mainstream-Support in die erweiterte Supportphase.

Für Unternehmen bedeutet dieser Schritt zunächst keine unmittelbare Einschränkung beim Betrieb. Windows Server 2022 bleibt weiterhin unterstützt und erhält bis zum 14. Oktober 2031 monatliche Sicherheitsupdates.

Das betrifft die Editionen Standard, Datacenter, Datacenter: Azure Edition und Essentials.

Microsoft folgt damit seinem bekannten Fixed-Lifecycle-Modell. Dieses sieht bei Windows Server üblicherweise rund fünf Jahre Mainstream-Support und anschließend fünf Jahre Extended Support vor.

Die entscheidende Unterscheidung: Das Ende des Mainstream-Supports ist nicht gleichbedeutend mit dem vollständigen Supportende.

## Welche Updates erhält Windows Server 2022 bis 2031?

Während der erweiterten Supportphase konzentriert sich Microsoft auf die Sicherheit des Betriebssystems.

Windows Server 2022 erhält weiterhin:

- Monatliche Sicherheitsupdates für unterstützte Komponenten
- Korrekturen für relevante Sicherheitslücken
- Sicherheitsbezogene Aktualisierungen im Rahmen des regulären Patch-Prozesses

Diese Sicherheitsupdates werden ohne zusätzliche Kosten bereitgestellt. Unternehmen benötigen während dieser Phase keine gesonderte Extended-Security-Updates-Lizenz (ESU).

Anders sieht es bei funktionalen Erweiterungen aus. Neue Produktfunktionen und reguläre Weiterentwicklungen sind im Extended Support grundsätzlich nicht mehr vorgesehen. Nicht sicherheitsrelevante Korrekturen und Supportleistungen stehen nur noch eingeschränkt beziehungsweise unter zusätzlichen Bedingungen zur Verfügung.

Das kumulative Sicherheitsupdate vom 13. Oktober 2026 mit der Kennung **KB5126655** war das letzte Update innerhalb des Mainstream-Supports. Anschließend läuft die monatliche Sicherheitsversorgung im Extended Support weiter.

Eine Besonderheit betrifft Windows Server 2022 Datacenter: Azure Edition. Microsoft hat die Unterstützung für Hotpatch-Updates bis Oktober 2027 verlängert. Damit können entsprechend konfigurierte Systeme weiterhin bestimmte Sicherheitsupdates ohne Neustart erhalten.

Die genauen Bedingungen dokumentiert Microsoft auf seiner [Windows Server 2022 Release-Health-Seite](https://learn.microsoft.com/en-us/windows/release-health/status-windows-server-2022).

## Windows Server 2022 vs. Windows Server 2025 – Support-Ende im Vergleich

Mit Windows Server 2025 steht seit November 2024 bereits ein Nachfolger zur Verfügung. Dieser erhält entsprechend länger reguläre Unterstützung.

Die wichtigsten Supporttermine im Vergleich:

| Version             | Mainstream-Support bis | Extended Support bis |
| ------------------- | ---------------------- | -------------------- |
| Windows Server 2022 | 13. Oktober 2026       | 14. Oktober 2031     |
| Windows Server 2025 | 13. November 2029      | 14. November 2034    |

Die Angaben beziehen sich auf die von Microsoft kommunizierten Supportstichtage in US-Pazifikzeit.

Windows Server 2025 wird damit rund drei Jahre länger unterstützt als sein Vorgänger.

Beide Versionen gehören zum Long-Term Servicing Channel (LTSC). Dieser Veröffentlichungszweig ist insbesondere für längerfristig betriebene Serverumgebungen vorgesehen, bei denen Stabilität und planbare Wartungszyklen eine wichtige Rolle spielen.

Die offiziellen Termine sind in den Lifecycle-Dokumentationen für [Windows Server 2022](https://learn.microsoft.com/de-de/lifecycle/products/windows-server-2022) und [Windows Server 2025](https://learn.microsoft.com/de-de/lifecycle/products/windows-server-2025) aufgeführt.

## Muss man Windows Server 2022 jetzt auf Windows Server 2025 upgraden?

Ein sofortiges Upgrade ist aus Sicht des Betriebssystem-Supports nicht erforderlich.

Wer Windows Server 2022 verwendet, kann das System grundsätzlich noch mehrere Jahre betreiben, solange Sicherheitsupdates installiert werden und die eingesetzte Hardware sowie Anwendungen weiterhin unterstützt werden.

Trotzdem sollten Administratoren die Migration frühzeitig berücksichtigen.

Gerade in größeren IT-Umgebungen hängt ein Versionswechsel nicht allein vom Betriebssystem ab. Auch Datenbanken, Virtualisierung, Backup-Lösungen, Treiber und Unternehmensanwendungen müssen mit der neuen Windows-Server-Version kompatibel sein.

Ein weiterer Aspekt sind die Anforderungen von Softwareherstellern. Einzelne Anwendungen können eigene Supportfristen besitzen, die unabhängig vom Lebenszyklus des Betriebssystems gelten.

Wer Server in der [Cloud](https://oliverjessner.at/cloud/) oder bei einem Hosting-Anbieter betreibt, sollte außerdem dessen Upgrade- und Supportbedingungen berücksichtigen.

## Windows Server 2022 auf 2025 upgraden – Diese Möglichkeiten gibt es

Microsoft unterstützt den direkten Wechsel von Windows Server 2022 auf Windows Server 2025.

Bei geeigneten, nicht geclusterten Installationen kann das Upgrade direkt auf dem bestehenden System durchgeführt werden. Dieses Verfahren bezeichnet Microsoft als In-Place-Upgrade.

Dabei sollen installierte Anwendungen, Serverrollen, Konfigurationen und Daten erhalten bleiben. Ob das in der jeweiligen Umgebung unterstützt wird, hängt allerdings von den eingesetzten Rollen und Anwendungen ab.

Vor einer Migration sind insbesondere folgende Schritte sinnvoll:

1. **Systembestand erfassen:** Welche Windows-Server-Versionen, Editionen und Rollen sind installiert?
2. **Kompatibilität überprüfen:** Unterstützen eingesetzte Anwendungen, Treiber und Backup-Systeme Windows Server 2025?
3. **Backups testen:** Vor dem Upgrade sollte eine vollständige Sicherung inklusive erfolgreichem Wiederherstellungstest vorhanden sein.
4. **Testmigration durchführen:** Ein möglichst realitätsnaher Test kann Kompatibilitätsprobleme vor dem produktiven Wechsel sichtbar machen.
5. **Wartungsfenster planen:** Ein In-Place-Upgrade benötigt Ausfallzeit und mehrere Neustarts.

Eine wichtige Ausnahme sind Domänencontroller mit Active Directory Domain Services (AD DS). Hier empfiehlt Microsoft ausdrücklich, neue Server zu installieren, diese zu Domänencontrollern hochzustufen und die bisherigen Systeme anschließend außer Betrieb zu nehmen.

Für geclusterte Systeme gelten ebenfalls gesonderte Migrationsverfahren.

Eine Übersicht bietet Microsoft im offiziellen [Leitfaden für Windows-Server-Upgrades](https://learn.microsoft.com/en-us/windows-server/get-started/install-upgrade-migrate).

## Installierte Windows-Server-Version und Updates überprüfen

Wer zunächst feststellen möchte, welche Windows-Server-Version auf einem System installiert ist, kann dafür PowerShell verwenden.

Mit folgendem Befehl lassen sich der Name des Betriebssystems, die Versionsnummer und die Build-Nummer auslesen:

```powershell
Get-CimInstance -ClassName Win32_OperatingSystem |
    Select-Object Caption, Version, BuildNumber
```

Um die zuletzt registrierten Windows-Updates anzuzeigen, eignet sich beispielsweise:

```powershell
Get-HotFix |
    Sort-Object InstalledOn -Descending |
    Select-Object -First 5 HotFixID, InstalledOn
```

Der zweite Befehl liefert einen Überblick über registrierte Hotfixes. Er bildet allerdings nicht zwingend sämtliche installierten Aktualisierungen vollständig ab.

Für eine zuverlässige Kontrolle des Patch-Status sollten Administratoren zusätzlich Windows Update, WSUS oder die jeweils eingesetzte zentrale Updateverwaltung verwenden.

## Was das Support-Ende für Unternehmen bedeutet

Windows Server 2022 ist auch nach Oktober 2026 kein grundsätzlich veraltetes oder unmittelbar unsicheres Betriebssystem. Die weitere Bereitstellung von Sicherheitsupdates ist Teil des vorgesehenen Produktlebenszyklus.

Allerdings verschiebt sich der Schwerpunkt von der Weiterentwicklung auf die Wartung bestehender Installationen.

Für Unternehmen mit funktionierenden Serverumgebungen gibt es deshalb keinen zwingenden Grund, ausschließlich wegen des Endes des Mainstream-Supports sofort zu migrieren.

Bei neuen Installationen dürfte dagegen Windows Server 2025 häufig die sinnvollere Wahl sein. Die längere verbleibende Supportdauer reduziert das Risiko, bereits nach wenigen Jahren erneut eine Betriebssystemmigration planen zu müssen.

Entscheidend bleibt die konkrete Infrastruktur. Solange Windows Server 2022 alle technischen und betrieblichen Anforderungen erfüllt, ist der Weiterbetrieb bis zum Ende des erweiterten Supports eine regulär unterstützte Option.

Die dafür verbleibende Zeit sollte jedoch nicht darüber hinwegtäuschen, dass auch umfangreiche Servermigrationen Vorbereitung benötigen.

Weitere Informationen finden sich in den [offiziellen Supporthinweisen von Microsoft](https://support.microsoft.com/en-us/servicing/os/windows-server/2026/10/kb5126655-windows-server-2022-security-update). Über das Ende des Mainstream-Supports berichtete auch [WinFuture](https://winfuture.de/news,162020.html).
