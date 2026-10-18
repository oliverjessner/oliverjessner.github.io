---
layout: post
title: 'PS5-Jailbreak 2026: Welche Firmware funktioniert mit Relapse?'
date: 2026-10-18 14:45:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - gaming
    - emulation
    - gta6
    - software-development
    - computer-stuff
description: 'PS5-Jailbreak 2026: Welche Relapse-Firmware funktioniert? Alle unterstützten Versionen von 7.00 bis 13.60 und die Einschränkungen ab 14.00'
thumbnail: '/assets/images/gen/blog/ps5-jailbreak-2026-welche-firmware-funktioniert-mit-relapse/header_thumbnail.webp'
image: '/assets/images/gen/blog/ps5-jailbreak-2026-welche-firmware-funktioniert-mit-relapse/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Welche PS5-Firmware unterstützt Relapse 2026?'
      answer: 'Relapse unterstützt laut Projektangaben ausgewählte PS5-Firmware-Versionen von 7.00 bis einschließlich 13.60. Nicht jede Zwischenversion ist kompatibel. Unter anderem fehlen 9.05, 10.60 und 11.40 in der veröffentlichten Firmwareliste.'
    - question: 'Funktioniert der Relapse-Jailbreak mit PS5-Firmware 14.00 oder 14.10?'
      answer: 'Nein. Die öffentlich verfügbaren Relapse-Versionen unterstützen weder PS5-Firmware 14.00 noch 14.10. Die letzte gelistete Version ist 13.60. Ein zukünftiger Exploit könnte die Situation verändern.'
    - question: 'Kann ich meine PS5 von Firmware 14.10 auf 13.60 downgraden?'
      answer: 'Sony bietet keinen regulären Firmware-Downgrade für die PS5 an. Ein Zurücksetzen der Konsole stellt nicht automatisch eine ältere Systemsoftware wieder her. Wer bereits auf 14.10 aktualisiert hat, kann Relapse daher nicht einfach durch eine Neuinstallation nutzen.'
socialmedia:
    - 'PS5-Jailbreak 2026: Relapse unterstützt Firmware 7.00 bis 13.60. Allerdings gibt es Ausnahmen. Eine Übersicht aller kompatiblen Versionen und der Grenzen des Exploits.'
    - 'PS5-Firmware 14.00 oder 14.10 installiert? Der Relapse-Jailbreak funktioniert damit derzeit nicht. Warum das so ist und welche Firmware-Versionen unterstützt werden.'
    - 'Relapse, etaHEN, Kernel-Zugriff und Byepervisor Reborn: Was der aktuelle PS5-Jailbreak technisch ermöglicht und warum neue Spiele wie GTA 6 trotzdem zum Problem werden können.'
news: true
---

Relapse ermöglicht einen PS5-Jailbreak auf ausgewählten Firmware-Versionen bis 13.60. Welche Versionen tatsächlich unterstützt werden, wo Ausnahmen bestehen und warum neuere Spiele zum Problem werden können.

## Welche PS5-Firmware unterstützt Relapse 2026?

Der PS5-Jailbreak Relapse unterstützt nach Angaben der Entwickler Firmware-Versionen von 7.00 bis einschließlich 13.60. Das gilt grundsätzlich für PlayStation 5, PS5 Slim und PS5 Pro.

Allerdings bedeutet diese Angabe nicht, dass jede dazwischenliegende Firmware automatisch funktioniert.

Entscheidend sind die tatsächlich implementierten Firmware-Profile. Sie enthalten unter anderem Speicheradressen und Offsets, die für die jeweilige Version der Systemsoftware benötigt werden.

Im öffentlichen Repository des Entwicklers Sonic-Iso sind zahlreiche Firmware-Versionen aufgeführt. Einige Versionen innerhalb des angegebenen Bereichs fehlen jedoch.

**Der aktuelle Stand vom 18. Oktober 2026:**

- Relapse unterstützt ausgewählte Firmware-Versionen von 7.00 bis 13.60.
- Firmware 13.60 ist die höchste offiziell aufgeführte Version.
- Firmware 9.05, 10.60 und 11.40 fehlen in der veröffentlichten Kompatibilitätsliste.
- Firmware 14.00 und 14.10 werden nicht unterstützt.
- Ein kompatibler Exploit bedeutet nicht automatisch, dass sämtliche Homebrew-Anwendungen und Payloads funktionieren.

Die Grundlage bildet das öffentlich zugängliche [Relapse-Repository von Sonic-Iso](https://github.com/soniciso1/relapse). Auch die [Relapse-Implementierung von ntfargo](https://github.com/ntfargo/Relapse-Exploit) nennt den Bereich von 7.00 bis 13.60.

## PS5-Jailbreak 2026 – Firmware-Kompatibilität im Überblick

Die folgende Tabelle unterscheidet zwischen den vom Projekt ausdrücklich unterstützten Firmware-Versionen und solchen, für die keine entsprechende Unterstützung dokumentiert ist.

**Letzte Quellenprüfung: 18. Oktober 2026**

| PS5-Firmware                             | Relapse-Status    | Einschränkungen                                     |
| :--------------------------------------- | :---------------- | :-------------------------------------------------- |
| 1.00 bis 6.xx                            | Nicht unterstützt | Ältere Exploit-Verfahren sind separat zu betrachten |
| 7.00, 7.01, 7.20, 7.40, 7.60, 7.61       | Unterstützt       | Firmwareabhängige Payloads erforderlich             |
| 8.00, 8.20, 8.40, 8.60                   | Unterstützt       | Firmwareabhängige Payloads erforderlich             |
| 9.00, 9.20, 9.40, 9.60                   | Unterstützt       | 9.05 ist nicht aufgeführt                           |
| 9.05                                     | Nicht gelistet    | Kein entsprechendes Relapse-Profil                  |
| 10.00, 10.01, 10.20, 10.40               | Unterstützt       | Firmwareabhängige Payloads erforderlich             |
| 10.60                                    | Nicht unterstützt | Benötigte Modul-Offsets fehlen                      |
| 11.00, 11.20, 11.60                      | Unterstützt       | Firmwareabhängige Payloads erforderlich             |
| 11.40                                    | Nicht unterstützt | Benötigte Modul-Offsets fehlen                      |
| 12.00, 12.02, 12.20, 12.40, 12.60, 12.70 | Unterstützt       | Firmwareabhängige Payloads erforderlich             |
| 13.00, 13.20, 13.40, 13.42               | Unterstützt       | Firmwareabhängige Payloads erforderlich             |
| 13.60                                    | Unterstützt       | Höchste gelistete Firmware                          |
| 14.00                                    | Nicht unterstützt | Außerhalb des Relapse-Bereichs                      |
| 14.10                                    | Nicht unterstützt | Außerhalb des Relapse-Bereichs                      |
| Neuere Versionen                         | Nicht bestätigt   | Kein öffentlich dokumentierter Relapse-Support      |

Die Tabelle bezieht sich auf den Firmware-Support der veröffentlichten Relapse-Implementierung. Sie ist kein Nachweis dafür, dass jede Kombination aus Konsole, Exploit-Host und Homebrew-Payload erfolgreich getestet wurde.

Eine wichtige Unterscheidung betrifft außerdem andere Jailbreak-Verfahren: Eine Firmware, die Relapse nicht unterstützt, ist nicht zwangsläufig mit sämtlichen anderen Exploit-Methoden inkompatibel.

### Warum fehlen Firmware 10.60 und 11.40?

Besonders interessant sind die Versionen 10.60 und 11.40.

Beide liegen innerhalb des häufig genannten Relapse-Bereichs von 7.00 bis 13.60. Trotzdem werden sie im Repository nicht als unterstützt aufgeführt.

Der Entwickler erklärt das mit fehlenden Modulen in den verfügbaren Firmware-Abbildern. Ohne diese lassen sich die benötigten Offsets nicht vollständig ermitteln.

Ein Offset beschreibt vereinfacht eine Position relativ zu einer bekannten Speicheradresse. Exploit-Code benötigt solche Informationen, um auf die richtigen Datenstrukturen oder Funktionen zuzugreifen.

Fehlen diese Informationen, kann eine Exploit-Kette trotz grundsätzlich vorhandener Sicherheitslücke nicht zuverlässig auf einer bestimmten Firmware ausgeführt werden.

Das ist ein wichtiger Unterschied zwischen einer theoretisch ausnutzbaren Schwachstelle und einer tatsächlich implementierten Unterstützung.

Bei Firmware 9.05 ist ebenfalls kein entsprechendes Profil aufgeführt. Daraus lässt sich zunächst nur ableiten, dass diese Version nicht Teil der dokumentierten Relapse-Kompatibilität ist.

## Welche PS5-Firmware habe ich installiert?

Bevor man sich mit einem Jailbreak beschäftigt, sollte die installierte Systemsoftware überprüft werden.

Sony dokumentiert dafür einen eigenen Menüpunkt.

1. Öffne auf der PS5 die **Einstellungen**.
2. Navigiere zu **System**.
3. Wähle **Systemsoftware**.
4. Öffne **Konsoleninformationen**.
5. Lies die angezeigte Version der Systemsoftware ab.

Die vollständige Versionsnummer kann beispielsweise so aussehen:

`26.05-13.60.00`

Für den Vergleich mit der Relapse-Tabelle ist in diesem Fall die Firmware-Version `13.60` relevant.

Bei `26.06-14.10.00` handelt es sich dagegen um Firmware 14.10. Diese liegt außerhalb des aktuell unterstützten Bereichs.

Sony beschreibt die einzelnen Schritte auch auf seiner [offiziellen Support-Seite zum Überprüfen der PS5-Systemsoftware](https://www.playstation.com/de-at/support/hardware/playstation-system-software-application-version/).

## Was ist Relapse und wie funktioniert der PS5-Jailbreak?

Relapse ist eine Exploit-Kette, die mehrere Schwachstellen miteinander kombiniert, um auf der PlayStation 5 eigenen Code auszuführen.

Der Ansatz unterscheidet sich damit von einem gewöhnlichen Programm, das über eine offizielle Schnittstelle gestartet wird.

Relapse nutzt zunächst Schwachstellen im Browser-Umfeld der Konsole. Dazu gehören Probleme in JavaScriptCore und bei der Verarbeitung bestimmter JavaScript-Objekte.

Vereinfacht beschrieben besteht die Exploit-Kette aus mehreren Stufen.

### 1. Browser-Exploit über WebKit

Der erste Schritt erfolgt im Browser-Kontext.

Dabei werden Schwachstellen genutzt, um Speicherinformationen offenzulegen und Speicherstrukturen gezielt zu verändern.

Unter anderem beschreibt das Projekt eine fehlerhafte Zuordnung bei der Verarbeitung strukturierter JavaScript-Daten, die zur Beschädigung eines TypedArray verwendet wird.

Dadurch entstehen Möglichkeiten, die normalerweise vorgesehenen Beschränkungen des Browser-Prozesses zu umgehen.

Dieser Zugriff ist allerdings noch kein vollständiger Jailbreak.

### 2. Kernel-Exploit über eine Race Condition

In der nächsten Stufe nutzt Relapse eine Schwachstelle im Kernel.

Die Entwickler beschreiben einen Use-after-free-Fehler in Verbindung mit `aio_multi_wait`.

Ein Use-after-free entsteht, wenn Software weiterhin auf einen Speicherbereich zugreift, obwohl dieser bereits freigegeben wurde.

Durch eine gezielte zeitliche Abfolge von Operationen kann daraus eine ausnutzbare Speicherbeschädigung entstehen.

Im Fall von Relapse ermöglicht die Kombination der Schwachstellen Lese- und Schreibzugriffe auf den Kernel-Speicher.

Das ist der zentrale technische Schritt, der anschließend weitere Eingriffe in die Systemumgebung ermöglicht.

### 3. ELF-Loader und zusätzliche Payloads

Nach einem erfolgreichen Exploit kann ein ELF-Loader bereitstehen.

Die Dokumentation von Relapse nennt dafür den Port `9021`.

ELF steht für Executable and Linkable Format. Es handelt sich um ein Format für ausführbare Dateien, das unter anderem aus Unix-ähnlichen Betriebssystemen bekannt ist.

Über diesen Loader lassen sich zusätzliche Programme und sogenannte Payloads auf der Konsole ausführen.

Dazu gehören beispielsweise:

- **etaHEN:** Eine Homebrew-Umgebung mit zusätzlichen Funktionen und Werkzeugen.
- **kstuff:** Ergänzende Kernel-Funktionen, die für bestimmte Homebrew-Anwendungen und Pakete benötigt werden.
- **FTP-Server:** Ermöglichen unter geeigneten Bedingungen den Zugriff auf Dateien über das lokale Netzwerk.
- **Debugging-Werkzeuge:** Erleichtern die Untersuchung laufender Prozesse und des Systemverhaltens.

Relapse stellt damit die Grundlage für weitere Anwendungen bereit.

Welche Funktionen tatsächlich verfügbar sind, hängt jedoch von der Firmware und den zusätzlich verwendeten Payload-Versionen ab.

Gerade bei experimentellen Anwendungen im Bereich [Emulation](https://oliverjessner.at/category/emulation/) ist diese Unterscheidung relevant. Ein funktionierender Kernel-Exploit allein bedeutet noch nicht, dass ein bestimmter Emulator zuverlässig läuft.

## Funktioniert Relapse auf PS5 Slim und PS5 Pro?

Grundsätzlich ja.

Relapse wird für verschiedene Modelle der PlayStation 5 eingesetzt. Dazu gehören die ursprüngliche PS5, die Slim-Varianten und die PS5 Pro.

Die entscheidende Voraussetzung bleibt die installierte Firmware.

Eine PS5 Pro mit Firmware 13.60 liegt beispielsweise innerhalb des dokumentierten Relapse-Bereichs. Eine ursprüngliche PS5 mit Firmware 14.10 dagegen nicht.

Allerdings unterscheiden sich die Hardwaremodelle in einzelnen technischen Details. Das betrifft unter anderem Speicheraufbau und Systemkomponenten.

Deshalb lässt sich aus einer erfolgreich getesteten Exploit-Kette auf einem Modell nicht automatisch die vollständige Kompatibilität sämtlicher Payloads mit allen anderen Modellen ableiten.

Wer Relapse für Homebrew nutzen möchte, sollte deshalb sowohl die Firmware-Kompatibilität des Exploits als auch die Unterstützung der jeweiligen Payload prüfen.

## Warum funktioniert Relapse nicht mit Firmware 14.00 und 14.10?

Relapse nutzt konkrete Schwachstellen und Implementierungsdetails der PS5-Systemsoftware.

Neue Firmware-Versionen können diese Voraussetzungen verändern oder beseitigen.

Genau deshalb endet die dokumentierte Unterstützung derzeit bei Firmware 13.60.

Sony veröffentlichte am 16. September 2026 die Systemsoftware 14.00. Am 1. Oktober folgte nach Medienberichten Firmware 14.10.

In den [offiziellen Versionshinweisen von Sony](https://www.playstation.com/de-at/support/hardware/ps5/system-software-info/) wird 14.10 unter der vollständigen Bezeichnung `26.06-14.10.00` geführt.

Sony nennt dafür Sicherheitskorrekturen sowie Verbesserungen bei Leistung und Stabilität.

Welche einzelnen Schwachstellen damit geschlossen wurden, geht aus den öffentlich zugänglichen Versionshinweisen nicht hervor.

Deshalb wäre es zu weitgehend, allein aus diesen Angaben abzuleiten, welche konkrete Sicherheitslücke für das Ende der Relapse-Kompatibilität verantwortlich ist.

Gesichert ist dagegen, dass die öffentlichen Relapse-Implementierungen Firmware 14.00 und 14.10 nicht als unterstützt aufführen.

## Kernel-Zugriff ist nicht dasselbe wie Hypervisor-Zugriff

Bei Meldungen über einen PS5-Jailbreak werden mehrere technische Ebenen häufig miteinander vermischt.

Der Kernel ist ein zentraler Bestandteil des Betriebssystems. Er verwaltet unter anderem Prozesse, Speicher und den Zugriff auf Hardware-Ressourcen.

Der Hypervisor befindet sich auf einer weiteren privilegierten Ebene und kann selbst Kernel-Zugriffe beschränken.

Deshalb bedeutet ein erfolgreicher Kernel-Exploit nicht automatisch, dass sämtliche Sicherheitsmechanismen der PlayStation 5 deaktiviert sind.

Für manche Eingriffe in die Systemsoftware werden weitergehende Zugriffsrechte oder zusätzliche Exploits benötigt.

### Was bedeutet Byepervisor Reborn für Relapse?

Im Oktober 2026 wurde mit [Byepervisor Reborn](https://github.com/PS5Dev/Byepervisor-Reborn) ein weiterer PS5-Exploit öffentlich dokumentiert.

Dieser richtet sich gezielt gegen den Hypervisor.

Das Projekt nutzt einen Fehler im Zusammenhang mit der Wiederaufnahme aus dem Ruhemodus. Dabei entsteht unter bestimmten Bedingungen eine Möglichkeit, auf Speicherbereiche des Hypervisors zuzugreifen.

Die Entwickler bezeichnen den veröffentlichten Stand ausdrücklich als technische Grundlage für weitere Forschungs- und Entwicklungsarbeiten.

Laut Projektdokumentation werden derzeit insbesondere Firmware 13.20 und 13.60 unterstützt. Firmware 13.00 ist ebenfalls aufgeführt, aber als ungetestet gekennzeichnet.

Eine grundsätzliche Ausnutzbarkeit auf weiteren Versionen wird diskutiert. Daraus ergibt sich jedoch noch keine unmittelbar nutzbare Jailbreak-Lösung.

Insbesondere bedeutet Byepervisor Reborn nicht, dass Relapse dadurch plötzlich mit Firmware 14.00 oder 14.10 funktioniert.

Beide Projekte betreffen unterschiedliche Stufen der Systemsicherheit und müssen entsprechend getrennt betrachtet werden.

## Bleibt der PS5-Jailbreak nach einem Neustart erhalten?

Ein weiterer wichtiger Punkt ist die Dauerhaftigkeit.

Relapse installiert keine universelle, dauerhaft modifizierte PS5-Systemsoftware.

Nach einem vollständigen Neustart muss die Exploit-Kette normalerweise erneut ausgeführt werden, damit die entsprechenden Zugriffsrechte und Payloads wieder verfügbar sind.

Es existieren verschiedene Autoloader- und Cache-Lösungen, die diesen Vorgang vereinfachen sollen.

Sie ersetzen allerdings nicht die grundlegende Abhängigkeit von den jeweiligen Sicherheitslücken.

Auch die Stabilität ist nicht garantiert.

Die Relapse-Entwickler weisen ausdrücklich darauf hin, dass bereits die Browser-Stufe mehrere Versuche benötigen kann. Beim Kernel-Exploit sind außerdem Abstürze oder ein vollständiges Einfrieren der Konsole möglich.

Das ist insbesondere dann relevant, wenn die PS5 nicht als separates Experimentiersystem, sondern als täglich genutzte Spielekonsole eingesetzt wird.

## Kann man PS5-Firmware 14.10 auf 13.60 downgraden?

Wer bereits auf Firmware 14.00 oder 14.10 aktualisiert hat, kann nicht einfach über die regulären Systemeinstellungen zu 13.60 zurückkehren.

Sony bietet keinen allgemeinen Firmware-Downgrade für die PlayStation 5 an.

Auch das Zurücksetzen auf Werkseinstellungen ist keine Lösung. Dabei werden Einstellungen und gegebenenfalls Nutzerdaten entfernt, aber nicht automatisch eine ältere Firmware installiert.

Die Neuinstallation der Systemsoftware über den Sicherheitsmodus ist ebenfalls nicht als regulärer Downgrade vorgesehen.

Deshalb sollte man vor einem Systemupdate prüfen, ob die bisherige Firmware für Homebrew oder andere technische Experimente benötigt wird.

Wer bewusst auf einer älteren Version bleiben möchte, kann unter **Einstellungen > System > Systemsoftware > Update und Einstellungen der Systemsoftware** die Optionen für automatische Downloads und Installationen überprüfen.

Das verhindert allerdings nicht sämtliche Update-Anforderungen. Bestimmte Spiele, Dienste oder Online-Funktionen können weiterhin eine neuere Systemsoftware voraussetzen.

Hinzu kommt ein Sicherheitsaspekt: Wer Updates dauerhaft aussetzt, verzichtet möglicherweise auch auf wichtige Sicherheitskorrekturen.

Es handelt sich deshalb um eine Abwägung zwischen Firmware-Kompatibilität, Systemsicherheit und regulärer Nutzbarkeit.

## Welche Spiele funktionieren mit einer PS5 auf Firmware 13.60?

Die Frage nach kompatiblen Spielen lässt sich nicht allein anhand des Jailbreak-Status beantworten.

Ein Spiel kann grundsätzlich auf einer bestimmten Firmware funktionieren, auch wenn die Konsole nicht die neueste Systemsoftware verwendet.

Bei neu veröffentlichten Spielen und Updates können jedoch höhere Mindestanforderungen gelten.

Das betrifft insbesondere Titel, die Funktionen oder Komponenten neuerer Systemsoftware-Versionen voraussetzen.

Außerdem ist zwischen mehreren Dingen zu unterscheiden:

- **Firmware-Kompatibilität:** Erfüllt die Konsole die Mindestanforderung des Spiels?
- **Installation:** Lässt sich das Spiel oder sein Update auf der vorhandenen Systemsoftware installieren?
- **Ausführung:** Startet die Software und stehen die benötigten Funktionen zur Verfügung?
- **Online-Nutzung:** Werden PlayStation-Dienste oder eine aktuelle Systemsoftware benötigt?

Eine erfolgreiche Installation bedeutet nicht automatisch, dass ein Spiel vollständig funktioniert.

Ebenso kann ein Spiel offline nutzbar sein, während bestimmte Netzwerkfunktionen ein Update verlangen.

Das ist eine Einschränkung, die sich nicht durch den Jailbreak allein beseitigen lässt.

## GTA 6 und Relapse – Warum Firmware 14.10 besonders relevant ist

Ein konkretes Beispiel ist Grand Theft Auto VI.

Wie bereits im Artikel [GTA 6 und PS5-Jailbreak: Warum Relapse wohl nicht funktionieren wird](https://oliverjessner.at/blog/2026-10-06-gta-6-und-ps5-jailbreak-warum-relapse-wohl-nicht-funktionieren-wird/) beschrieben, gibt es Hinweise auf eine Firmware-Mindestanforderung von 14.10.

Diese Einschätzung beruht auf Berichten über Informationen aus dem Backend des PlayStation Store und Aussagen aus der Modding-Szene.

Eine abschließende technische Bestätigung der Mindestanforderung zum Verkaufsstart steht damit noch aus.

Sollte GTA 6 tatsächlich mindestens Firmware 14.10 voraussetzen, ergibt sich ein klarer Konflikt.

Eine PS5 mit Firmware 13.60 könnte den aktuellen Relapse-Jailbreak nutzen, würde aber die erwartete Systemanforderung von GTA 6 nicht erfüllen.

Eine PS5 mit Firmware 14.10 könnte dagegen die erwartete Mindestanforderung erfüllen, würde jedoch außerhalb des gegenwärtigen Relapse-Bereichs liegen.

Damit stehen sich zwei unterschiedliche Anforderungen gegenüber.

Für Nutzer, die ihre PS5 hauptsächlich zum [Gaming](https://oliverjessner.at/category/gaming/) aktueller Titel verwenden, kann ein Systemupdate sinnvoll oder sogar notwendig sein.

Wer die Konsole dagegen gezielt für Homebrew und Sicherheitsforschung einsetzt, hat möglicherweise andere Prioritäten.

Eine spätere Lösung ist technisch nicht ausgeschlossen. Sie müsste aber tatsächlich entwickelt und für die entsprechende Firmware nachgewiesen werden.

## Welche Risiken hat ein PS5-Jailbreak mit Relapse?

Neben der Firmware-Kompatibilität sollten auch die möglichen Folgen berücksichtigt werden.

Ein Jailbreak verändert das vorgesehene Sicherheitsmodell der Konsole. Dadurch können Funktionen zugänglich werden, die Sony normalerweise nicht für eigene Anwendungen freigibt.

Gleichzeitig entstehen Risiken.

Fehlerhafte oder nicht zur Firmware passende Payloads können Abstürze, Datenverluste oder eine instabile Systemumgebung verursachen.

Auch Auswirkungen auf Garantieansprüche und die Nutzung von PlayStation-Diensten sind möglich.

Sony weist in seinen [Hinweisen zur PS5-Systemsoftware](https://www.playstation.com/de-at/support/hardware/ps5/system-software/) darauf hin, dass Änderungen am System den ordnungsgemäßen Betrieb und die Inanspruchnahme bestimmter Serviceleistungen beeinträchtigen können.

Eine Kontosperrung ist dabei nicht die automatische Folge jedes Jailbreaks. Sie gehört jedoch zu den möglichen Risiken bei Verstößen gegen die Nutzungsbedingungen.

Wer eine PS5 für technische Experimente einsetzen möchte, sollte daher persönliche Daten sichern und die Herkunft verwendeter Software prüfen.

Besondere Vorsicht ist bei unbekannten Exploit-Hosts und ausführbaren Payloads angebracht. Die Möglichkeit, eigenen Code auf einer Konsole auszuführen, bedeutet schließlich auch, dass fremder Code weitreichende Änderungen vornehmen kann.

## Fazit – Firmware 13.60 bleibt die Relapse-Grenze

Der PS5-Jailbreak Relapse gehört zu den interessanteren Entwicklungen der Konsolen-Homebrew-Szene im Jahr 2026.

Die öffentlich dokumentierte Exploit-Kette ermöglicht Kernel-Lese- und Schreibzugriffe auf ausgewählten PS5-Firmware-Versionen von 7.00 bis 13.60.

Dabei ist die konkrete Kompatibilitätsliste wichtiger als die häufig genannte Versionsspanne. Nicht sämtliche Zwischenversionen werden unterstützt.

Mit Firmware 14.00 und 14.10 liegt die PlayStation 5 außerhalb des derzeit dokumentierten Relapse-Bereichs.

Gleichzeitig zeigen Projekte wie Byepervisor Reborn, dass die technische Untersuchung der Konsole weitergeht.

Das ist allerdings kein Beleg dafür, dass neue Firmware-Versionen kurzfristig unterstützt werden.

Für die Praxis bleibt daher eine einfache Erkenntnis: **Vor einem PS5-Systemupdate sollte geprüft werden, welche Funktionen benötigt werden und ob die neue Firmware mit den verwendeten Homebrew-Werkzeugen kompatibel ist.**

Ein Jailbreak erweitert die technischen Möglichkeiten einer Konsole. Er ersetzt aber weder eine Prüfung der konkreten Firmware noch die Anforderungen, die aktuelle Spiele und Online-Dienste an die Systemsoftware stellen.

## Quellen und Aktualisierungsstand

**Quellenstand: 18. Oktober 2026.** Die Firmware-Tabelle basiert auf den ausdrücklich aufgeführten Versionen der veröffentlichten Relapse-Implementierung. Änderungen an der Projektunterstützung müssen anhand neuer Releases und der jeweiligen Firmware-Profile erneut geprüft werden.

Maßgebliche technische Quellen sind das [Relapse-Repository von Sonic-Iso](https://github.com/soniciso1/relapse), die [Relapse-Dokumentation von ntfargo](https://github.com/ntfargo/Relapse-Exploit) und das Forschungsprojekt [Byepervisor Reborn](https://github.com/PS5Dev/Byepervisor-Reborn).

Die offiziellen Firmware-Versionsnummern und Änderungen lassen sich über die [Systemsoftware-Versionshistorie von Sony](https://www.playstation.com/de-at/support/hardware/ps5/system-software-info/) überprüfen. Für die Einordnung der Veröffentlichung von Firmware 14.10 dient außerdem die [Berichterstattung von PlayStation LifeStyle vom 1. Oktober 2026](https://www.playstationlifestyle.net/2026/10/01/ps5-system-update-rolled-out-to-ring-in-october-2026/).
