---
layout: post
title: 'F5 BIG-IP, Check Point und VeloCloud: Sicherheitslücken aktiv ausgenutzt'
date: 2026-09-23 10:35:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - computer-stuff
    - cloud
    - linux
    - software-engineering
description: 'Angreifer nutzen kritische Lücken in F5 BIG-IP APM, Check Point und Arista VeloCloud aus. Patches sind verfügbar und sollten priorisiert werden'
thumbnail: '/assets/images/gen/blog/f5-big-ip-check-point-und-velocloud-sicherheitsluecken-aktiv-ausgenutzt/header_thumbnail.webp'
image: '/assets/images/gen/blog/f5-big-ip-check-point-und-velocloud-sicherheitsluecken-aktiv-ausgenutzt/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Welche Sicherheitslücken werden derzeit aktiv ausgenutzt?'
      answer: 'Betroffen sind CVE-2026-94127 in F5 BIG-IP APM, CVE-2026-85102 und CVE-2026-93616 bei Check Point sowie CVE-2026-93952 im Arista VeloCloud Orchestrator.'
    - question: 'Sind alle F5-, Check-Point- und VeloCloud-Systeme betroffen?'
      answer: 'Nein. Ob ein System verwundbar ist, hängt von Produktversion und Konfiguration ab. Besonders wichtig ist deshalb eine genaue Prüfung der eingesetzten Systeme.'
    - question: 'Was sollten Administratoren bei betroffenen Systemen tun?'
      answer: 'Betroffene Systeme sollten mit den verfügbaren Hersteller-Updates abgesichert werden. Zusätzlich empfiehlt sich die Prüfung von Logs und anderen Hinweisen auf eine mögliche Kompromittierung.'
socialmedia:
    - 'Vier aktiv ausgenutzte Schwachstellen treffen F5 BIG-IP APM, Check Point und Arista VeloCloud. Welche Systeme betroffen sind, was die CVEs erlauben und welche Schritte Administratoren jetzt priorisieren sollten.'
    - 'F5 BIG-IP APM, Check Point Security Gateway und VeloCloud Orchestrator stehen wegen aktiv ausgenutzter Sicherheitslücken im Fokus. Ein Überblick über CVE-2026-94127, CVE-2026-85102, CVE-2026-93616 und CVE-2026-93952.'
    - 'Nicht jedes F5-, Check-Point- oder VeloCloud-System ist automatisch verwundbar. Entscheidend sind Version und Konfiguration. Ich habe die vier aktuell aktiv ausgenutzten CVEs und die wichtigsten Gegenmaßnahmen zusammengefasst.'
news: true
---

Mehrere kritische Sicherheitslücken in F5 BIG-IP APM, Check Point und Arista VeloCloud werden aktiv ausgenutzt. Für betroffene Systeme stehen bereits Sicherheitsupdates bereit.

## Vier kritische Sicherheitslücken werden aktiv ausgenutzt

Innerhalb kurzer Zeit haben F5, Check Point und Arista vor aktiv ausgenutzten Schwachstellen in zentralen Netzwerk- und Security-Produkten gewarnt. Betroffen sind unter anderem VPN-Gateways, Security-Management-Systeme und der VeloCloud Orchestrator.

Die Schwachstellen sind besonders relevant, weil solche Systeme häufig an zentralen Punkten eines Unternehmensnetzes stehen und teilweise direkt aus dem Internet erreichbar sind.

| Hersteller  | Produkt                             | CVE            | Auswirkung                                                                           |
| ----------- | ----------------------------------- | -------------- | ------------------------------------------------------------------------------------ |
| F5          | BIG-IP APM                          | CVE-2026-94127 | Unauthentifizierte Remote Code Execution                                             |
| Check Point | Security Gateway und Spark Firewall | CVE-2026-85102 | Unauthentifizierte Remote Code Execution                                             |
| Check Point | Security Management                 | CVE-2026-93616 | Zugriff auf beliebige Pfade und Ausführung von Code                                  |
| Arista      | VeloCloud Orchestrator              | CVE-2026-93952 | Zugriff auf privilegierte interne Funktionen und mögliche Kompromittierung des Hosts |

Alle vier Schwachstellen werden nach Angaben der jeweiligen Hersteller bereits für Angriffe verwendet. Entscheidend ist deshalb nicht nur, ob ein Produkt eingesetzt wird. Auch Version, Konfiguration und Erreichbarkeit spielen eine Rolle.

## F5 BIG-IP APM: CVE-2026-94127 ermöglicht Remote Code Execution

Bei **CVE-2026-94127** handelt es sich um einen Heap-basierten Buffer Overflow im Access Policy Manager von F5 BIG-IP.

Ein Angreifer benötigt keine vorherige Authentifizierung. Speziell präparierter Netzwerkverkehr kann unter bestimmten Bedingungen dazu führen, dass Code auf dem BIG-IP-System ausgeführt wird.

Betroffen sind allerdings nicht pauschal alle BIG-IP-Installationen. Voraussetzung ist, dass auf einem virtuellen Server sowohl eine APM Access Policy als auch ein OAuth-Profil konfiguriert sind.

F5 beziehungsweise CERT-EU nennen folgende Produktstände als betroffen:

- BIG-IP APM 17.1.0 bis 17.1.3
- BIG-IP APM 17.5.0 bis 17.5.1
- BIG-IP APM 21.1.0

Für die unterstützten Versionen stehen Hotfixes bereit.

Wer BIG-IP APM einsetzt, sollte deshalb zuerst prüfen, ob die entsprechende Kombination aus Access Policy und OAuth-Profil tatsächlich verwendet wird. Erst danach lässt sich die konkrete Angriffsfläche sinnvoll bewerten.

Bei der Suche nach einer möglichen Kompromittierung empfiehlt CERT-EU unter anderem, OAuth-Fehler in `/var/log/apm`, Auffälligkeiten im Audit-Log und ungewöhnliche TMM-Abstürze zu untersuchen.

## Check Point: Zwei Schwachstellen werden angegriffen

Check Point meldet gleichzeitig aktive Angriffe auf zwei unterschiedliche Sicherheitslücken.

### CVE-2026-85102 in Security Gateway und Spark Firewall

**CVE-2026-85102** betrifft die Verarbeitung von Zertifikatsdaten während der VPN-Aushandlung.

Die Schwachstelle kann es einem nicht authentifizierten Angreifer ermöglichen, Code auf einem Security Gateway auszuführen. Voraussetzung ist eine entsprechende VPN-Konfiguration.

Betroffen sind verschiedene Versionen von Check Point Security Gateway sowie zentral oder lokal verwaltete Spark Firewalls. Dazu gehören mehrere Releases der R81- und R82-Familien.

Check Point hatte die Schwachstelle bereits am 9. September 2026 veröffentlicht und Updates bereitgestellt. Zu diesem Zeitpunkt lagen dem Hersteller nach eigenen Angaben noch keine Hinweise auf Angriffe vor.

Seit dem 12. September beobachtet Check Point jedoch eine Welle von Exploit-Versuchen gegen Spark-Kunden. Die Angriffe kamen unter anderem über VPN- und Proxy-Infrastruktur.

Administratoren sollten neben dem Patch-Stand deshalb auch ungewöhnliche zertifikatsbasierte Mobile-Access-Anmeldungen und daran anschließende Aktivitäten im internen Netzwerk untersuchen.

### CVE-2026-93616 betrifft Check Point Security Management

Die zweite aktiv ausgenutzte Schwachstelle ist **CVE-2026-93616**.

Dabei handelt es sich um eine Pre-Authentication-Path-Traversal-Schwachstelle im Webdienst von Check Point Security Management. Ein Angreifer kann dadurch unter anderem Skripte aus beliebigen Pfaden ausführen und Java-Klassen laden.

Check Point bezeichnet die Schwachstelle als Zero-Day und veröffentlichte am 22. September 2026 einen Fix.

Interessant ist dabei auch der zeitliche Abstand: Nach Angaben des Herstellers wurden bereits am 23. Juli 2026 einige gezielte Angriffe beobachtet.

Betroffen sind verschiedene Versionen von R81 und R82. Welche Hotfix-Version erforderlich ist, unterscheidet sich je nach eingesetztem Release. Betreiber sollten deshalb die konkrete Versionsmatrix von Check Point prüfen, statt lediglich von einer gepatchten R81- oder R82-Installation auszugehen.

## Arista VeloCloud Orchestrator: CVE-2026-93952 erreicht CVSS 10.0

Auch **CVE-2026-93952** im Arista VeloCloud Orchestrator wird aktiv ausgenutzt.

Arista bewertet die Schwachstelle mit einem CVSS-v3.1-Wert von 10.0. Nach Angaben des Unternehmens kann ein Angreifer auf privilegierte interne Funktionen zugreifen und dadurch den Orchestrator sowie die von ihm verwalteten Daten gefährden.

Betroffen sind On-Premises-Installationen des VeloCloud Orchestrator aus folgenden Versionszweigen:

- 5.2.x bis einschließlich 5.2.3.15
- 6.1.x bis einschließlich 6.1.3.7
- 6.4.x bis einschließlich 6.4.2.7
- 7.0.x bis einschließlich 7.0.0.2

Für einen erfolgreichen Angriff muss zertifikatsbasierte Authentifizierung zwischen VeloCloud Edge und VeloCloud Orchestrator verwendet werden. Außerdem benötigt der Angreifer Netzwerkzugriff auf die Weboberfläche des VCO sowie Zugriff auf den öffentlichen Teil eines Edge-Authentifizierungszertifikats.

Tenant- oder Operator-Zugangsdaten sind laut Arista dagegen nicht notwendig.

Für die Versionszweige 5.2.3 und 6.4.2 stehen mit **5.2.3.16** beziehungsweise **6.4.2.8** korrigierte Releases zur Verfügung. Für weitere unterstützte Versionszweige sollen korrigierte Versionen folgen.

Von Arista gehostete VCO-Instanzen, einschließlich Dedicated-Umgebungen, waren ebenfalls betroffen, wurden laut Hersteller aber bereits aktualisiert.

## VeloCloud-Systeme auf eine mögliche Kompromittierung prüfen

Arista veröffentlicht für CVE-2026-93952 auch konkrete Hinweise zur Untersuchung bestehender Installationen.

Administratoren sollten unter anderem Web-, Backend- und System-Logs auf ungewöhnliche Zugriffe kontrollieren. Dazu gehören unerwartete ausgehende HTTP- oder HTTPS-Verbindungen, nicht nachvollziehbare Konfigurationsänderungen sowie ungewöhnliche Befehlsausführungen oder neu angelegte Dateien.

Besondere Aufmerksamkeit verdienen laut Arista die Dateien:

```text
/usr/local/sbin/.vcnode.js
/usr/local/sbin/vc-sysmond
/etc/systemd/system/vc-sysmon.service
```

Auch der HTTP-Header `x-vc-opt` kann ein Hinweis auf eine Kompromittierung sein.

Wer entsprechende Spuren findet, sollte relevante Logs und den Systemzustand möglichst erhalten, bevor eine Bereinigung beginnt. Ein Update beseitigt zwar die ursprüngliche Schwachstelle, entfernt aber nicht automatisch mögliche Veränderungen, die ein Angreifer bereits am System vorgenommen hat.

## Was Administratoren jetzt prüfen sollten

Bei allen drei Herstellern gilt zunächst: Nicht jedes installierte Produkt ist automatisch angreifbar. Eine saubere Bestandsaufnahme ist deshalb wichtiger als ein pauschaler Blick auf den Herstellernamen.

Sinnvoll ist eine Prüfung in mehreren Schritten:

1. **Produkt und Version feststellen:** Zuerst muss geklärt werden, welche BIG-IP-, Check-Point- oder VeloCloud-Version tatsächlich eingesetzt wird.
2. **Konfiguration überprüfen:** Einige der Schwachstellen sind nur unter bestimmten Voraussetzungen ausnutzbar, etwa bei aktivierter VPN-, OAuth- oder zertifikatsbasierter Authentifizierung.
3. **Hersteller-Updates installieren:** Für die betroffenen Produkte stehen bereits Fixes zur Verfügung oder werden für weitere Release-Zweige bereitgestellt.
4. **Logs untersuchen:** Bei öffentlich erreichbaren oder bereits länger verwundbaren Systemen sollte nicht davon ausgegangen werden, dass ein Update allein ausreicht.
5. **Erreichbarkeit reduzieren:** Management-Oberflächen sollten nur dort öffentlich erreichbar sein, wo dies tatsächlich notwendig ist.

Gerade in [Cloud](https://oliverjessner.at/category/cloud/)- und hybriden Umgebungen lohnt es sich außerdem, nicht nur das einzelne Gerät zu betrachten. Security-Appliances verwalten häufig Zugangsdaten, Zertifikate, Policies und Verbindungen zu weiteren Systemen.

Viele dieser Produkte basieren intern auf [Linux](https://oliverjessner.at/category/linux/), sind im Betrieb aber keine gewöhnlichen Server. Änderungen, Wiederherstellung und Incident Response sollten deshalb entsprechend den Vorgaben des Herstellers erfolgen.

## Warum Angriffe auf Security-Appliances besonders relevant sind

F5 BIG-IP, Check Point Security Gateway und VeloCloud Orchestrator übernehmen sehr unterschiedliche Aufgaben. Gemeinsam ist ihnen aber ihre Position innerhalb der Infrastruktur.

Sie kontrollieren Zugriffe, VPN-Verbindungen, Policies oder Netzwerkpfade. Ein erfolgreicher Angriff trifft deshalb nicht irgendeinen Arbeitsplatzrechner, sondern potenziell eine zentrale Komponente zwischen externen und internen Netzen.

Das erklärt auch, warum Schwachstellen in solchen Produkten für Angreifer interessant sind. Ein kompromittiertes Gateway oder Management-System kann ein Ausgangspunkt für weitere Bewegungen im Netzwerk sein.

Gleichzeitig sollte die aktuelle Situation nicht pauschalisiert werden. Die vier CVEs betreffen unterschiedliche Produkte, Versionen und Konfigurationen. Wer eines der genannten Systeme einsetzt, sollte deshalb gezielt prüfen, ob die jeweilige Schwachstelle auf die eigene Installation zutrifft.

## Fazit

Mit F5 BIG-IP APM, Check Point Security Gateway, Check Point Security Management und Arista VeloCloud Orchestrator sind mehrere zentrale Netzwerkprodukte gleichzeitig von aktiv ausgenutzten Schwachstellen betroffen.

Für Administratoren sind dabei zwei Fragen entscheidend: Ist die eigene Konfiguration tatsächlich verwundbar und gibt es bereits Hinweise auf eine Kompromittierung?

Da die Hersteller Sicherheitsupdates bereitgestellt haben und aktive Angriffe bestätigt sind, sollten betroffene Systeme entsprechend priorisiert werden. Gerade bei öffentlich erreichbaren Appliances ist zusätzlich eine Prüfung der Logs sinnvoll, weil ein aktueller Patch-Stand allein nichts darüber aussagt, ob ein System zuvor bereits angegriffen wurde.
