---
layout: post
title: 'WPSplinter: Welche Broadcom-Router sind betroffen?'
date: 2026-10-21 10:06:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - computer-stuff
    - Privacy
    - linux
description: 'WPSplinter: Ein 16 Jahre alter Fehler bedroht Broadcom-Router. Wie du betroffene Modelle erkennst und warum WPS ausschalten nicht immer genügt'
thumbnail: '/assets/images/gen/blog/wpsplinter-welche-broadcom-router-sind-betroffen/header_thumbnail.webp'
image: '/assets/images/gen/blog/wpsplinter-welche-broadcom-router-sind-betroffen/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Was ist WPSplinter?'
      answer: 'WPSplinter ist eine Sicherheitslücke in älterer WPS-Software von Broadcom. Angreifer innerhalb der WLAN-Reichweite können auf anfälligen Routern ohne Kenntnis des WLAN-Passworts Speicherinhalte auslesen und eigenen Code ausführen.'
    - question: 'Welche Router sind von WPSplinter betroffen?'
      answer: 'Zu den identifizierten Geräten gehören bestimmte Modelle von TP-Link, Netgear, Cisco, Huawei, Askey und Sercomm. Auch ältere Speedport- und EasyBox-Router stehen auf der Liste. Entscheidend sind das genaue Modell und die installierte Firmware.'
    - question: 'Kann ich WPSplinter durch das Deaktivieren von WPS verhindern?'
      answer: 'Nicht zwangsläufig. Bei manchen Routern kann die verwundbare Softwarekomponente trotz deaktivierter WPS-Funktion erreichbar bleiben. Eine bestätigte Gegenmaßnahme des Herstellers oder Providers, ein Sicherheitsupdate oder der Austausch des Routers bietet verlässlicheren Schutz.'
socialmedia:
    - 'WPSplinter betrifft zahlreiche Broadcom-Router. Der Fehler existiert seit mindestens 2010 und ermöglicht Angriffe ohne WLAN-Passwort. Welche Router betroffen sind und wie man das eigene Gerät überprüft.'
    - 'WPS am Router deaktivieren und alles ist sicher? Bei WPSplinter stimmt das nicht unbedingt. Entscheidend ist, ob die verwundbare Softwarekomponente tatsächlich abgeschaltet wird.'
    - 'Eine Sicherheitslücke aus 2010, eine unvollständige Korrektur aus 2018 und 2026 noch immer betroffene Router. WPSplinter zeigt, wie lange veraltete Software in Netzwerkgeräten überleben kann.'
news: true
---

Eine 16 Jahre alte Sicherheitslücke macht zahlreiche WLAN-Router angreifbar. Bei WPSplinter benötigen Angreifer nicht einmal das WLAN-Passwort. Entscheidend ist die Software im Router.

## Was ist WPSplinter?

Der Sicherheitsforscher Quentin Kaiser hat eine Schwachstelle in älterer WLAN-Software des Chipherstellers Broadcom veröffentlicht. Die unter dem Namen "WPSplinter" bekannte Sicherheitslücke ermöglicht es, bestimmte Router über WLAN anzugreifen, ohne zuvor das Netzwerkpasswort zu kennen.

Kaiser stellte seine [technische Analyse](https://quentinkaiser.be/security/2026/10/16/one-parser-two-bugs/) am 16. Oktober 2026 auf der Sicherheitskonferenz Hexacon in Paris vor. Der zugrunde liegende Fehler ist nach seinen Erkenntnissen seit mindestens 2010 in Broadcoms Software enthalten.

Betroffen sind nicht automatisch sämtliche Router mit einem Broadcom-Chipsatz. Entscheidend ist, ob die Firmware eine bestimmte ältere Implementierung von Wi-Fi Protected Setup (WPS) verwendet.

WPS soll die Verbindung neuer Geräte mit einem WLAN vereinfachen. Anstatt ein Passwort einzugeben, können Nutzer beispielsweise eine Taste am Router drücken oder eine PIN verwenden.

Genau in der Verarbeitung solcher WPS-Nachrichten befindet sich die Schwachstelle.

## Wie funktioniert die Broadcom-Sicherheitslücke?

Der Fehler liegt in einer Softwarekomponente namens `wps_monitor`.

Diese verarbeitet unter anderem Nachrichten des Extensible Authentication Protocol (EAP), das auch beim Verbindungsaufbau über WPS eingesetzt wird.

Größere Nachrichten können dabei in mehrere Fragmente aufgeteilt werden. Die Software muss diese Fragmente anschließend wieder zusammensetzen.

Bei der verwundbaren Broadcom-Implementierung wird die Größe der zusammengesetzten Daten nicht ausreichend gegen den verfügbaren Speicherbereich geprüft.

Ein Angreifer kann dadurch mit manipulierten Nachrichten eine Speicherbeschädigung verursachen.

Kaiser demonstrierte, dass sich die Schwachstelle für zwei besonders relevante Angriffsformen ausnutzen lässt:

1. **Information Disclosure:** Auslesen von Speicherinhalten, beispielsweise eines gespeicherten WLAN-Schlüssels.
2. **Remote Code Execution (RCE):** Ausführen von selbst gewähltem Programmcode auf einem betroffenen Router.

Bei einer Demonstration gelang es Kaiser, das WLAN-Passwort eines Routers auszulesen und sich anschließend mit dem Netzwerk zu verbinden.

Auf einem anderen Gerät demonstrierte er den Zugriff auf eine Shell mit administrativen Rechten.

Das Besondere daran: Der Angriff setzt vor der regulären WLAN-Anmeldung an.

Ein komplexes WLAN-Passwort verhindert deshalb nicht die Ausnutzung dieser konkreten Schwachstelle. Auch WPA2 oder WPA3 beseitigen den Fehler in der WPS-Software nicht.

**Wichtig:** Ein Angreifer muss sich innerhalb der Funkreichweite des Routers befinden. Es handelt sich damit nicht automatisch um eine Sicherheitslücke, die sich von einem beliebigen Standort über das Internet ausnutzen lässt.

## Welche Router sind von WPSplinter betroffen?

Die Sicherheitslücke betrifft verschiedene Gerätehersteller, die Broadcoms ältere WLAN-Software in ihre Firmware integriert haben.

Kaiser pflegt auf GitHub eine [Liste der betroffenen Router](https://github.com/qkaiser/broadcom-wps/). Sie enthält bereits zahlreiche Modelle, ist nach Angaben des Forschers aber nicht vollständig.

Folgende Geräte sind beispielsweise aufgeführt:

| Hersteller | Router-Modelle                                         |
| ---------- | ------------------------------------------------------ |
| Askey      | Speedport W 723V Typ A, TCG3000                        |
| Huawei     | Speedport W 724V Typ A, Speedport Hybrid, B310, B315   |
| Sercomm    | EasyBox 804, Speedport W 724V Typ C                    |
| TP-Link    | Archer C3150, Archer C5400, Archer VR600, Archer VR900 |
| Cisco      | RV110W, RV130W, WAP121, WAP125                         |
| Netgear    | CG3100, CG3700B                                        |
| Sagemcom   | F@st 5336                                              |

**Stand: 21. Oktober 2026.**

Die Tabelle zeigt eine Auswahl aus der öffentlichen Geräteliste. Nicht alle Modelle besitzen denselben Nachweisstatus.

Beim Speedport W 724V Typ C wird die Anfälligkeit beispielsweise als wahrscheinlich eingestuft. Für die EasyBox 804 nennt die Dokumentation bestimmte untersuchte Firmwareversionen.

Auch kann ein Gerät durch eine neuere Firmware bereits geschützt sein, obwohl die Modellbezeichnung weiterhin in der Liste steht.

Die Nennung eines Routers ist deshalb ein Anlass zur Überprüfung, aber kein Beweis dafür, dass jedes einzelne Gerät dieser Modellreihe aktuell angreifbar ist.

Umgekehrt bedeutet das Fehlen eines Modells nicht automatisch, dass es sicher ist.

## So überprüfst du, ob dein Router betroffen ist

Für eine erste Einschätzung benötigst du keine spezielle Software. Entscheidend sind das Routermodell und die installierte Firmwareversion.

### 1. Routermodell herausfinden

Die genaue Modellbezeichnung steht meistens auf einem Aufkleber an der Unterseite oder Rückseite des Geräts.

Alternativ findest du die Modellinformationen in der Administrationsoberfläche des Routers.

Diese ist häufig unter einer lokalen Adresse wie `192.168.0.1` oder `192.168.1.1` erreichbar. Welche Adresse tatsächlich verwendet wird, hängt von deiner Netzwerkkonfiguration ab.

Unter macOS kannst du die IPv4-Adresse des Standardgateways auch über das Terminal ermitteln.

```bash
route -n get default | awk '/gateway:/{print $2}'
```

Der Befehl gibt normalerweise die Adresse deines Routers aus. Bei einer aktiven VPN-Verbindung kann das Ergebnis abweichen.

### 2. Firmwareversion überprüfen

Öffne die Administrationsoberfläche und suche nach Menüpunkten wie "System", "Firmware", "Softwareupdate" oder "Geräteinformationen".

Notiere die installierte Firmwareversion.

Prüfe anschließend auf der Supportseite des Herstellers, ob ein neueres Update verfügbar ist und ob dessen Versionshinweise WPSplinter beziehungsweise die Broadcom-WPS-Schwachstelle ausdrücklich erwähnen.

Bei Routern, die vom Internetanbieter bereitgestellt werden, erfolgt die Aktualisierung häufig direkt durch den Provider.

### 3. Mit der Geräteliste vergleichen

Vergleiche dein Modell mit der [öffentlichen WPSplinter-Geräteliste](https://github.com/qkaiser/broadcom-wps/).

Achte dabei nicht ausschließlich auf den Produktnamen, sondern auch auf Hardwareversion, Firmware und den dokumentierten Status.

Für Administratoren und technisch erfahrene Nutzer bietet das Projekt zusätzliche Prüfwerkzeuge.

Dazu gehören YARA-Regeln zur Untersuchung extrahierter Firmware und ein Python-Skript, das die verwendete WLAN-Implementierung anhand ihres Verhaltens identifiziert.

Der WLAN-Test setzt einen kompatiblen Funkadapter mit Monitor-Modus voraus. Er ist kein gewöhnlicher Test, den man über eine Website im Browser durchführen kann.

Die Werkzeuge liefern technische Hinweise, ersetzen aber nicht in jedem Fall die Prüfung der konkreten Firmware. Tests sollten ausschließlich auf eigenen oder ausdrücklich autorisierten Geräten durchgeführt werden.

## WPS deaktivieren – reicht das?

Die naheliegende Reaktion auf eine WPS-Sicherheitslücke ist, WPS in den Routereinstellungen auszuschalten.

Das ist grundsätzlich sinnvoll, wenn die Funktion nicht benötigt wird.

Allerdings weist Kaiser in seiner [WPSplinter-Dokumentation](https://qkaiser.github.io/broadcom-wps/) ausdrücklich darauf hin, dass der Schalter in der Administrationsoberfläche nicht zwangsläufig die gesamte verwundbare Softwarekomponente deaktiviert.

Bei einigen Geräten kann der betroffene Parser weiterhin erreichbar bleiben.

Ob die Deaktivierung tatsächlich schützt, hängt daher von der konkreten Implementierung ab.

Das bedeutet nicht, dass das Ausschalten wirkungslos ist. Es bedeutet lediglich, dass die Einstellung allein keinen verlässlichen Nachweis für eine geschlossene Sicherheitslücke liefert.

Eine wirksame Gegenmaßnahme muss sicherstellen, dass der verwundbare Code nicht mehr über WLAN erreichbar ist.

## Was du jetzt tun kannst

Wenn dein Router auf der Liste steht oder du die verwendete Software nicht eindeutig zuordnen kannst, sind folgende Schritte sinnvoll:

1. **Firmware aktualisieren:** Installiere verfügbare Sicherheitsupdates des Geräteherstellers oder Providers. Prüfe, ob die konkrete Schwachstelle behoben wurde.
2. **WPS deaktivieren:** Schalte die Funktion ab, wenn du sie nicht verwendest. Betrachte das als vorsorgliche Maßnahme und nicht automatisch als vollständige Lösung.
3. **Hersteller oder Provider kontaktieren:** Frage ausdrücklich nach WPSplinter und danach, ob deine Modell- und Firmwarekombination betroffen ist.
4. **Unterstützungsstatus prüfen:** Wird dein Router nicht mehr mit Sicherheitsupdates versorgt, ist ein Austausch besonders sinnvoll.
5. **WLAN vorübergehend abschalten:** Bei einem nachweislich anfälligen Gerät ohne verfügbare Gegenmaßnahme kann die vollständige Deaktivierung seiner WLAN-Funkfunktion das beschriebene Angriffsszenario unterbinden. Voraussetzung ist, dass die Funkfunktion tatsächlich abgeschaltet wird.

Ein neues WLAN-Passwort allein löst das Problem nicht. Auf einem weiterhin angreifbaren Router könnte der Schlüssel erneut ausgelesen werden.

Wenn es Hinweise auf eine tatsächliche Kompromittierung gibt, sollte das Gerät zuerst bereinigt beziehungsweise durch ein sicheres Gerät ersetzt werden. Anschließend ist auch ein Wechsel der Zugangsdaten sinnvoll.

## Warum existiert die Sicherheitslücke seit 16 Jahren?

Besonders interessant ist bei WPSplinter die lange Lebensdauer des Fehlers.

Nach Kaisers Angaben befindet sich die problematische Implementierung seit mindestens 2010 im Software Development Kit (SDK) von Broadcom.

Ein SDK enthält Softwarekomponenten, die Gerätehersteller in ihre eigenen Produkte integrieren können.

2018 veröffentlichte Broadcom eine unvollständige Korrektur. Später stellte das Unternehmen eine SDK-Version bereit, in der die ältere WPS-Implementierung durch `hostapd` ersetzt wurde.

`hostapd` ist eine verbreitete Software zur Bereitstellung von WLAN-Zugangspunkten, unter anderem unter [Linux](https://oliverjessner.at/category/linux/).

Damit ist jedoch nicht automatisch jeder Router geschützt.

Gerätehersteller müssen die neuen Komponenten in ihre jeweilige Firmware integrieren, testen und anschließend als Update ausliefern.

Bei älteren Produkten findet diese Weiterentwicklung möglicherweise nicht mehr statt.

Das betrifft insbesondere die von Kaiser untersuchten eCos-basierten Broadcom-Plattformen BCM3380, BCM3383 und BCM33834.

Für diese hält der Forscher eine nachträgliche Fehlerbehebung für wenig wahrscheinlich.

Bei bestimmten Linux-basierten Plattformen besteht dagegen grundsätzlich die Möglichkeit, die verwundbare Implementierung auszutauschen.

WPSplinter zeigt damit ein grundlegendes Problem langlebiger Netzwerkhardware: Eine Sicherheitskorrektur beim ursprünglichen Softwarelieferanten bedeutet nicht, dass sie auch auf den Geräten der Endkunden ankommt.

## Wie viele Router sind betroffen?

Eine belastbare weltweite Gesamtzahl gibt es bisher nicht.

Kaiser schätzte anhand von Providerinformationen und Anschlusszahlen, dass allein in Belgien ursprünglich rund 1,56 Millionen Geräte betroffen sein könnten.

Dabei handelt es sich ausdrücklich um eine Schätzung und nicht um das Ergebnis einer vollständigen technischen Bestandsaufnahme.

Die mögliche Verbreitung reicht allerdings weit über Belgien hinaus, da verschiedene internationale Hersteller die betroffene Broadcom-Software eingesetzt haben.

Weltweit könnten deshalb Millionen Router mit der verwundbaren Implementierung ausgestattet sein.

Für Deutschland und Österreich liegen bislang keine vergleichbar belastbaren Gesamtzahlen vor.

### Erste Gegenmaßnahmen bei Providern

Am 20. Oktober ergänzte Kaiser seinen Forschungsbericht um Informationen zu Maßnahmen belgischer Internetanbieter.

Demnach deaktivierte Proximus WPS auf seiner gesamten BBox-Geräteflotte und plante weitere Firmwarekorrekturen.

Für Telenet bestätigte der Forscher nach einer Überprüfung durch den Anbieter, dass dessen Geräteflotte nicht betroffen sei. Orange Belgium untersuchte zu diesem Zeitpunkt noch mögliche Gegenmaßnahmen.

Diese Entwicklungen zeigen, dass die ursprünglichen Schätzungen nicht mit der Zahl weiterhin angreifbarer Geräte gleichgesetzt werden dürfen.

## Warum hat WPSplinter keine CVE-Nummer?

Üblicherweise erhalten öffentlich dokumentierte Sicherheitslücken eine Kennung aus dem System Common Vulnerabilities and Exposures (CVE).

Damit lassen sich Schwachstellen eindeutig identifizieren und in Sicherheitsdatenbanken, Updatehinweisen und Monitoring-Systemen nachverfolgen.

WPSplinter besitzt nach den bislang veröffentlichten Angaben keine solche Kennung.

Kaiser berichtet, dass Broadcom die Registrierung einer CVE abgelehnt habe. Als Begründung sei auf den veralteten und nicht mehr unterstützten Softwarebestand verwiesen worden.

Das Fehlen einer CVE-Nummer bedeutet jedoch nicht, dass eine Sicherheitslücke harmlos oder technisch nicht nachgewiesen wäre.

Es erschwert unter anderem die standardisierte Zuordnung von Sicherheitsmeldungen zu betroffenen Produkten.

## Was WPSplinter über Router-Sicherheit zeigt

Der Fall ist nicht nur wegen der technischen Schwachstelle relevant.

Router gehören zu den Geräten, die häufig über viele Jahre betrieben werden. Solange Internet und WLAN funktionieren, gibt es für viele Nutzer keinen offensichtlichen Grund, sich mit der installierten Software zu beschäftigen.

Anders als bei Smartphones oder Computern ist zudem oft nicht unmittelbar erkennbar, wie lange ein Router noch Sicherheitsupdates erhält.

Bei WPSplinter kommt hinzu, dass ein Angriff bereits vor der eigentlichen Netzwerkanmeldung möglich ist. Ein sicheres Passwort schützt deshalb nicht vor dem ursprünglichen Fehler.

Wird ein Router erfolgreich kompromittiert, können neben der Netzwerkverfügbarkeit auch Zugangsdaten und die [Privatsphäre](https://oliverjessner.at/category/privacy/) der Nutzer betroffen sein.

Die entscheidende Frage ist somit nicht nur, ob Broadcom eine Korrektur bereitgestellt hat, sondern ob diese tatsächlich auf den eingesetzten Routern angekommen ist.

Gerade bei älteren Geräten lässt sich das häufig nur durch eine konkrete Prüfung der Firmware und der Herstellerinformationen klären.

Die technische Grundlage liefern Kaisers [Forschungsbericht](https://quentinkaiser.be/security/2026/10/16/one-parser-two-bugs/) und die [öffentliche Projektdokumentation](https://qkaiser.github.io/broadcom-wps/). Über die Entdeckung berichtete unter anderem auch [Golem.de](https://www.golem.de/news/millionen-router-angreifbar-16-jahre-alter-broadcom-bug-gefaehrdet-wlan-netze-2610-214298.html).

Die hier genannten betroffenen Geräte stammen aus der öffentlichen Recherche und der zugehörigen Geräteliste. Eine eigene technische Überprüfung der einzelnen Routermodelle liegt diesem Beitrag nicht zugrunde.
