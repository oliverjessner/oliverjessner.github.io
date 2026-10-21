---
layout: post
title: 'PHP2Shell: Betroffene PHP-Versionen und Sicherheitsupdates'
date: 2026-10-21 20:24:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - web-development
    - Privacy
    - cloud
description: 'PHP2Shell ermöglicht Angriffe auf PHP-Server. Diese Versionen sind betroffen, diese Updates schützen und das sollten WordPress-Betreiber prüfen'
thumbnail: '/assets/images/gen/blog/php2shell-betroffene-php-versionen-und-sicherheitsupdates/header_thumbnail.webp'
image: '/assets/images/gen/blog/php2shell-betroffene-php-versionen-und-sicherheitsupdates/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Was ist PHP2Shell?'
      answer: 'PHP2Shell bezeichnet zwei kritische Sicherheitslücken in PHP, CVE-2026-109618 und CVE-2026-109619. Angreifer können darüber unter bestimmten Bedingungen ohne Anmeldung Schadcode auf betroffenen Webservern ausführen.'
    - question: 'Welche PHP-Versionen sind von PHP2Shell betroffen?'
      answer: 'Betroffen sind ältere PHP-Versionen einschließlich ungepatchter Installationen von PHP 8.2, 8.3, 8.4 und 8.5. Die Sicherheitslücken wurden in PHP 8.2.35, 8.3.36, 8.4.27 und 8.5.12 behoben. Für ältere PHP-Zweige können herstellerspezifische Sicherheitsupdates verfügbar sein.'
    - question: 'Sind WordPress-Websites von PHP2Shell betroffen?'
      answer: 'Ja, wenn der Webserver eine verwundbare PHP-Version verwendet. Da die Sicherheitslücken im PHP-Interpreter liegen, genügt ein WordPress-Update allein nicht. Die serverseitige PHP-Laufzeit muss aktualisiert werden.'
socialmedia:
    - 'PHP2Shell betrifft PHP selbst, nicht nur einzelne Anwendungen. Die Patches für PHP 8.2 bis 8.5 sind verfügbar. Welche Versionen sicher sind und was WordPress-Betreiber jetzt prüfen sollten.'
    - 'Zwei PHP2Shell-Lücken, zweimal CVSS 9,2: Ein WordPress-Update allein reicht nicht. Entscheidend ist der Sicherheitsstand der PHP-Laufzeit auf dem Server.'
    - 'Warum oliverjessner.at trotz PHP2Shell online bleibt? Die Website nutzt kein PHP. Für PHP-basierte Websites gilt dagegen: Version und Patchstand der tatsächlichen Serverumgebung prüfen.'
news: true
---

Zwei kritische PHP-Sicherheitslücken ermöglichen Angriffe auf Webserver. Für PHP2Shell gibt es inzwischen Updates. Entscheidend ist, welche PHP-Version auf dem Server läuft.

## Was ist PHP2Shell?

Am 21. Oktober 2026 hat das PHP-Projekt außerplanmäßige Sicherheitsupdates für zwei kritische Schwachstellen veröffentlicht. Unter dem gemeinsamen Namen **PHP2Shell** ermöglichen sie Angreifern unter bestimmten Bedingungen, beliebigen Programmcode auf betroffenen Webservern auszuführen.

Die beiden Sicherheitslücken werden unter folgenden Kennungen geführt:

- **CVE-2026-109618:** Ein Fehler bei der Speicherverwaltung kann während der Bereinigung einer PHP-Anfrage zu beschädigten internen Speicherstrukturen führen.
- **CVE-2026-109619:** Bereits freigegebener Speicher kann über veraltete interne Zustände bei späteren Anfragen erneut verwendet werden.

Beide Schwachstellen wurden mit **9,2 von 10 Punkten nach CVSS 4.0** bewertet und gelten damit als kritisch.

Besonders problematisch ist, dass für einen erfolgreichen Angriff keine vorherige Anmeldung erforderlich sein muss. Die Schwachstellen befinden sich im PHP-Interpreter selbst und nicht in einer bestimmten Webanwendung.

Ein erfolgreicher Angriff kann zur sogenannten Remote Code Execution (RCE) führen. Dabei führen Angreifer eigenen Programmcode auf dem betroffenen Server aus, grundsätzlich mit den Berechtigungen des jeweiligen PHP-Prozesses.

Das bedeutet nicht automatisch vollständige Administratorrechte. Abhängig von den Berechtigungen und der Serverkonfiguration können jedoch erhebliche Schäden entstehen.

Wie [heise online](https://www.heise.de/news/php2shell-Kritische-Sicherheitsluecken-erlauben-Codeeinschleusung-in-PHP-11492938.html) berichtet, reichen die betroffenen PHP-Versionen rund zwei Jahrzehnte zurück.

Ursprünglich war die koordinierte Veröffentlichung der Sicherheitsupdates für den 22. Oktober vorgesehen. Nachdem Informationen über die Schwachstellen vorzeitig öffentlich geworden waren, wurde die Veröffentlichung auf den 21. Oktober vorgezogen.

## Welche PHP-Versionen sind von PHP2Shell betroffen?

Die PHP-Entwickler haben Sicherheitsupdates für sämtliche derzeit regulär unterstützten Versionszweige veröffentlicht.

Folgende Versionen schließen die beiden bekannten Sicherheitslücken:

| PHP-Version       | Betroffene Versionen              | Sicherheitsupdate                         |
| ----------------- | --------------------------------- | ----------------------------------------- |
| PHP 8.5           | Vor 8.5.12                        | **8.5.12**                                |
| PHP 8.4           | Vor 8.4.27                        | **8.4.27**                                |
| PHP 8.3           | Vor 8.3.36                        | **8.3.36**                                |
| PHP 8.2           | Vor 8.2.35                        | **8.2.35**                                |
| PHP 8.1 und älter | Ohne reguläre PHP-Projekt-Updates | Upgrade oder Herstellerpatch erforderlich |

**Wichtig:** PHP 8.1 und ältere Versionen erhalten vom PHP-Projekt keine regulären Sicherheitsupdates mehr. Einige Linux-Distributionen und kommerzielle Anbieter stellen jedoch eigene, zurückportierte Sicherheitskorrekturen bereit.

Eine ältere Versionsnummer bedeutet deshalb nicht zwangsläufig, dass eine Installation ungepatcht ist. Bei solchen Systemen muss der Sicherheitsstatus anhand der Paketinformationen des jeweiligen Anbieters geprüft werden.

PHP 8.2 erreicht zudem am 31. Dezember 2026 sein reguläres Supportende. Wer ohnehin eine größere Aktualisierung plant, sollte das berücksichtigen.

Die offiziellen Informationen stehen im [Sicherheitshinweis des PHP-Projekts](https://www.php.net/archive/2026.php#2026-10-21-5).

## Sind WordPress, Drupal und Joomla von PHP2Shell betroffen?

Grundsätzlich ja. Entscheidend ist allerdings nicht, welches Content-Management-System eingesetzt wird, sondern welche PHP-Version die Anwendung auf dem Server verwendet.

Zu den potenziell betroffenen Systemen zählen:

- WordPress
- Drupal
- Joomla
- Magento beziehungsweise Adobe Commerce
- PHP-basierte Anwendungen mit Laravel oder Symfony
- Selbst entwickelte PHP-Webanwendungen

Hinzu kommen zahlreiche Verwaltungsoberflächen, Onlineshops und andere Systeme, die PHP serverseitig einsetzen.

Die Sicherheitslücken können verschiedene Ausführungsumgebungen betreffen, darunter PHP-FPM, Apache mit mod_php, php-cgi, FrankenPHP und LiteSpeed.

Besonders kritisch bewertet das PHP-Projekt den Einsatz von Apache mit mod_php. Dort wurde ein Angriff demonstriert, der bereits vor der Ausführung des eigentlichen Anwendungscodes ausgelöst werden kann.

Das erklärt auch, warum ein aktualisiertes CMS allein keine ausreichende Absicherung darstellt.

### Warum ein WordPress-Update nicht genügt

WordPress läuft auf PHP. Die WordPress-Installation selbst ist jedoch nicht für die Sicherheitsupdates des PHP-Interpreters verantwortlich.

Auch eine vollständig aktualisierte WordPress-Website kann deshalb weiterhin gefährdet sein, wenn darunter eine verwundbare PHP-Version läuft.

[WordPress.org weist ausdrücklich darauf hin](https://wordpress.org/news/2026/10/critical-php-security-release/), dass für diese Schwachstellen kein spezielles WordPress-Core-Update erforderlich oder geplant ist.

Die Korrektur muss auf Ebene der PHP-Laufzeit erfolgen.

## PHP2Shell prüfen – Welche PHP-Version verwendet meine Website?

Wer selbst eine Website betreibt, sollte zunächst feststellen, welche PHP-Version tatsächlich zum Einsatz kommt.

### PHP-Version in WordPress prüfen

Bei WordPress funktioniert das direkt über das Dashboard:

1. Im WordPress-Backend anmelden.
2. Unter "Werkzeuge" den Menüpunkt "Website-Zustand" öffnen.
3. Zum Reiter "Bericht" wechseln.
4. Den Bereich "Server" aufklappen.
5. Die angezeigte PHP-Version kontrollieren.

Anschließend lässt sich die Versionsnummer mit den veröffentlichten Sicherheitsupdates vergleichen.

Bei Managed-Hosting-Angeboten übernimmt häufig der Hostinganbieter die Aktualisierung der PHP-Laufzeit. Das sollte im Kundenbereich oder anhand einer Mitteilung des Anbieters überprüft werden.

### PHP-Version über das Terminal prüfen

Wer Zugriff auf den Server hat, kann die installierte PHP-Version über das [Terminal](https://oliverjessner.at/category/terminal/) abfragen.

```bash
php -v
```

Der Befehl zeigt die Version der PHP-Kommandozeilenumgebung.

**Achtung:** Diese Version muss nicht identisch mit der PHP-Version sein, die der Webserver verwendet. Auf vielen Servern laufen mehrere Versionen parallel.

Deshalb sollten Administratoren zusätzlich die Konfiguration von PHP-FPM, Apache oder der tatsächlich verwendeten Containerumgebung überprüfen.

Gerade bei Docker-Installationen ist das wichtig: Ein aktualisiertes PHP-Paket auf dem Host aktualisiert nicht automatisch die PHP-Laufzeit innerhalb eines Containers.

## PHP2Shell beheben – Was Website-Betreiber jetzt tun sollten

Die wichtigste Maßnahme ist die Installation eines Sicherheitsupdates, das beide Schwachstellen schließt.

Für Betreiber ergeben sich daraus mehrere Schritte.

**1. PHP-Version und Paketstatus kontrollieren**

Zunächst muss geklärt werden, welche PHP-Laufzeit die öffentlich erreichbare Anwendung tatsächlich verwendet und ob dafür bereits ein korrigiertes Paket installiert wurde.

**2. Sicherheitsupdate installieren**

Betroffene Installationen sollten auf die gepatchten PHP-Versionen aktualisiert werden. Bei Linux-Distributionen mit eigenen Sicherheitsupdates sind die Hinweise des jeweiligen Paketbetreuers maßgeblich.

**3. Dienste neu starten**

Nach der Aktualisierung müssen gegebenenfalls PHP-FPM-Worker, Webserver oder Container neu gestartet werden, damit die korrigierte Laufzeit tatsächlich verwendet wird.

**4. Funktionalität prüfen**

Nach einem PHP-Update sollten zentrale Funktionen wie Anmeldung, Formulare, Uploads und Datenbankzugriffe kontrolliert werden. Ein aktuelles Backup und gegebenenfalls ein vorheriger Kompatibilitätstest helfen dabei, Probleme durch Versionswechsel zu vermeiden.

**5. Serverprotokolle kontrollieren**

Da öffentlich erreichbare Systeme betroffen sein können, ist auch eine Prüfung auf ungewöhnliche Prozesse, Dateien, ausgehende Verbindungen und verdächtige Webserver-Anfragen sinnvoll.

Die kanadische Cybersicherheitsbehörde empfiehlt diese Maßnahmen ebenfalls in ihrem [Sicherheitshinweis zu PHP2Shell](https://www.cyber.gc.ca/en/alerts-advisories/al26-026-critical-vulnerabilities-impacting-php-cve-2026-109618-cve-2026-109619).

## Gibt es einen Schutz gegen PHP2Shell ohne Update?

Das PHP-Projekt beschreibt mehrere Möglichkeiten, einzelne bekannte Angriffswege vorübergehend einzuschränken.

Dazu gehören unter anderem Änderungen an PHP-Konfigurationen, die Deaktivierung bestimmter Session-Funktionen und Begrenzungen eingehender Anfragen.

Allerdings betonen die Entwickler ausdrücklich, dass diese Maßnahmen keinen vollständigen Schutz gewährleisten.

Auch eine Web Application Firewall kann bestimmte Angriffsversuche blockieren. Sie ersetzt jedoch nicht die Aktualisierung der verwundbaren PHP-Laufzeit.

Wenn ein Sicherheitsupdate nicht unmittelbar möglich ist, sollten Betreiber prüfen, ob betroffene Dienste vorübergehend vom öffentlichen Internet getrennt oder ihre Zugriffsmöglichkeiten eingeschränkt werden können.

Welche Maßnahmen sinnvoll sind, hängt von der jeweiligen Infrastruktur ab.

## Warum oliverjessner.at trotz PHP2Shell online bleibt

Auch diese Website ist von den aktuellen Meldungen rund um PHP2Shell nicht betroffen.

Der Grund ist vergleichsweise einfach: **oliverjessner.at baut nicht auf PHP auf.**

Für die Bereitstellung dieser Website wird kein PHP-Interpreter benötigt. Die beiden beschriebenen PHP-Sicherheitslücken betreffen den technischen Aufbau dieser Website deshalb nicht.

Der Blog bleibt entsprechend weiterhin online und erreichbar.

Das bedeutet selbstverständlich nicht, dass eine Website ohne PHP grundsätzlich sicherer oder gegen alle Angriffe geschützt wäre.

Jede Technologie bringt eigene Abhängigkeiten und mögliche Schwachstellen mit sich.

Der Fall zeigt jedoch einen praktischen Unterschied zwischen verschiedenen Ansätzen in der [Webentwicklung](https://oliverjessner.at/category/web-development/): Eine Website, die für ihre Auslieferung keine serverseitige PHP-Laufzeit benötigt, ist von Sicherheitslücken in diesem Interpreter nicht direkt betroffen.

## Fazit: Bei PHP2Shell zählt die tatsächliche Serverumgebung

PHP2Shell ist ein ernst zu nehmendes Sicherheitsproblem, weil sich die Schwachstellen in einer weitverbreiteten serverseitigen Laufzeit befinden.

Entscheidend ist dabei nicht allein, ob eine Website WordPress, Drupal oder ein bestimmtes Framework verwendet. Relevant ist, welche PHP-Version tatsächlich Anfragen verarbeitet und ob die veröffentlichten Sicherheitskorrekturen installiert wurden.

Die notwendigen Updates stehen seit dem 21. Oktober 2026 zur Verfügung.

Wer PHP-basierte Websites betreibt, sollte deshalb den Patchstatus überprüfen und ausstehende Sicherheitsupdates zeitnah installieren. Insbesondere bei älteren PHP-Versionen lohnt sich außerdem ein Blick auf den langfristigen Support.

Für Websites, die kein PHP einsetzen, besteht durch diese beiden konkreten Sicherheitslücken hingegen keine direkte Gefährdung.
