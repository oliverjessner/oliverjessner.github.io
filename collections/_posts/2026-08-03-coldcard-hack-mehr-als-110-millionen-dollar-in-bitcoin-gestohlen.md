---
layout: post
title: 'Coldcard-Hack: Mehr als 110 Millionen Dollar in Bitcoin gestohlen'
date: 2026-08-03 09:30:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - Privacy
    - software-engineering
    - computer-stuff
description: 'Beim Coldcard-Hack wurden Bitcoin im Wert von mehr als 110 Millionen Dollar gestohlen. Ursache war eine Schwäche bei der Seed-Erzeugung'
thumbnail: '/assets/images/gen/blog/coldcard-hack-mehr-als-110-millionen-dollar-in-bitcoin-gestohlen/header_thumbnail.webp'
image: '/assets/images/gen/blog/coldcard-hack-mehr-als-110-millionen-dollar-in-bitcoin-gestohlen/header.webp'
image_width: 1280
image_height: 854
faq:
    - question: 'Sind alle Coldcard Hardware-Wallets betroffen?'
      answer: 'Nein. Entscheidend sind das Modell, die Firmware-Version zum Zeitpunkt der Seed-Erzeugung und zusätzliche Schutzmaßnahmen wie mindestens 50 private Würfelwürfe oder eine starke BIP-39-Passphrase.'
    - question: 'Reicht ein Firmware-Update bei einer betroffenen Coldcard aus?'
      answer: 'Nein. Das Update korrigiert nur die Erzeugung neuer Seeds. Ein bereits mit betroffener Firmware erzeugter Seed bleibt unsicher und muss durch einen neuen Seed ersetzt werden.'
    - question: 'Sind Hardware-Wallets nach dem Coldcard-Hack noch sicher?'
      answer: 'Hardware-Wallets schützen weiterhin vor vielen Online-Angriffen. Der Fall zeigt jedoch, dass ihre Sicherheit auch von korrekter Firmware, guter Zufallszahlenerzeugung und einer sorgfältigen Einrichtung abhängt.'
socialmedia:
    - 'Beim Coldcard-Hack wurden inzwischen Bitcoin im Wert von mehr als 110 Millionen Dollar bewegt. Das Problem lag nicht bei der Offline-Speicherung, sondern bei schwach erzeugten Seed Phrases.'
    - 'Ein Firmware-Update allein reicht beim Coldcard-Hack nicht. Wer einen Seed mit betroffener Firmware erzeugt hat, muss einen neuen Seed anlegen und die Bitcoin kontrolliert übertragen.'
    - 'Hardware-Wallet gehackt? Nicht ganz. Beim Coldcard-Hack machte eine fehlerhafte Zufallszahlenerzeugung Seed Phrases berechenbarer. Der Fall zeigt, wie wichtig Entropie für Bitcoin-Wallets ist.'
---

Beim Coldcard-Hack wurden Bitcoin im Wert von mehr als 110 Millionen US-Dollar bewegt. Das Problem lag nicht in der Offline-Verwahrung, sondern in vorhersehbar erzeugten Seed Phrases.

## Coldcard-Hack betrifft inzwischen mehr als 5.000 Bitcoin-Adressen

Die zunächst gemeldeten 89 Millionen US-Dollar sind bereits nicht mehr aktuell. Nach drei beobachteten Angriffswellen hatte Galaxy Research rund 1.367 Bitcoin auf 4.585 betroffenen Adressen erfasst. Am 3. August 2026 folgte eine mutmaßliche vierte Welle mit weiteren rund 448,7 Bitcoin von 709 Adressen.

Zusammengerechnet ergibt das ein beobachtetes Volumen von rund 1.815,75 Bitcoin. Beim Bitcoin-Kurs vom 3. August 2026 entspricht das ungefähr 114 Millionen US-Dollar. Die Zahl ist jedoch kein abschließend bestätigter Schadensstand. Sie basiert auf Onchain-Mustern, und mögliche Überschneidungen zwischen den erfassten Adressen lassen sich noch nicht vollständig ausschließen.

Der Vorfall betrifft Wallets, deren Seed Phrase auf bestimmten Coldcard-Modellen mit verwundbarer Firmware erzeugt wurde. Die Geräte mussten dafür weder gestohlen noch mit dem Internet verbunden werden. Auch ein klassischer Phishing-Angriff war nicht notwendig.

## Nicht die Cold Wallet wurde geöffnet, sondern der Schlüssel berechenbarer

Eine Hardware-Wallet speichert die privaten Schlüssel getrennt von einem normalen Computer. Dadurch sollen Schadsoftware, Browser-Erweiterungen oder kompromittierte Betriebssysteme nicht direkt auf die Schlüssel zugreifen können.

Dieser Schutz funktioniert jedoch nur, wenn die Schlüssel von Beginn an sicher erzeugt wurden. Genau hier lag das Problem bei Coldcard.

Bei der Einrichtung einer Bitcoin-Wallet erzeugt das Gerät eine zufällige Zahl. Aus dieser Zahl wird die Seed Phrase abgeleitet. Sie besteht meist aus 12 oder 24 Wörtern und ermöglicht die Wiederherstellung der gesamten Wallet.

Die Sicherheit hängt von der sogenannten Entropie ab. Damit ist vereinfacht gesagt die Menge an echter Unvorhersehbarkeit gemeint. Eine Seed Phrase mit 128 Bit Entropie bietet so viele mögliche Kombinationen, dass ein systematisches Durchprobieren praktisch nicht möglich ist.

Bei betroffenen Coldcard-Versionen wurde die vorgesehene Hardwarequelle für Zufallszahlen jedoch nicht korrekt genutzt. Stattdessen griff ein eingebundener Softwarebestandteil auf einen schwächeren Pseudozufallszahlengenerator zurück.

Coinkite schätzt den effektiven Suchraum bei Mk2 und Mk3 auf ungefähr 40 Bit. Bei Mk4, Mk5 und Q sollen es unter den bisherigen Annahmen etwa 72 Bit sein. Beide Werte liegen deutlich unter dem vorgesehenen Sicherheitsniveau von 128 Bit.

Dadurch wurde aus einem praktisch unmöglichen Angriff ein Problem, das sich mit ausreichend Rechenleistung systematisch bearbeiten lässt. Ein Angreifer kann mögliche Seeds offline erzeugen, daraus Bitcoin-Adressen ableiten und prüfen, ob auf diesen Adressen Guthaben liegt.

## Welche Coldcard-Modelle und Firmware-Versionen sind betroffen?

Laut der offiziellen Sicherheitswarnung von Coinkite sind folgende Kombinationen betroffen:

| Modell                        | Betroffene Firmware            | Korrigierte Firmware |
| ----------------------------- | ------------------------------ | -------------------- |
| Coldcard Mk2 und Mk3          | 4.0.1 bis einschließlich 4.1.9 | 4.2.0 oder neuer     |
| Coldcard Mk4 und Mk5 Standard | älter als 5.6.0                | 5.6.0 oder neuer     |
| Coldcard Q Standard           | älter als 1.5.0Q               | 1.5.0Q oder neuer    |
| Coldcard Mk4 und Mk5 Edge     | älter als 6.6.0X               | 6.6.0X oder neuer    |
| Coldcard Q Edge               | älter als 6.6.0QX              | 6.6.0QX oder neuer   |

TAPSIGNER, OPENDIME und SATSCARD sollen laut Coinkite nicht betroffen sein, da sie auf anderen Codebasen beruhen.

Entscheidend ist nicht, welche Firmware heute auf dem Gerät installiert ist. Relevant ist die Firmware, mit der der Seed ursprünglich erzeugt wurde. Wurde ein betroffener Seed später auf eine andere Hardware-Wallet importiert, bleibt er ebenfalls unsicher.

## Warum ein Firmware-Update allein nicht reicht

Ein Firmware-Update korrigiert die Seed-Erzeugung für neue Wallets. Es verändert aber keine bereits existierende Seed Phrase.

Wer einen Seed mit betroffener Firmware erstellt hat, muss deshalb eine vollständig neue Wallet mit einem neuen Seed erzeugen und das Guthaben übertragen. Die alte Seed Phrase wird durch das Update nicht nachträglich zufälliger.

Coinkite empfiehlt grundsätzlich diesen Ablauf:

1. Die für das jeweilige Modell korrigierte Firmware installieren.
2. Auf der aktualisierten Coldcard einen neuen Seed erzeugen.
3. Den neuen Seed vollständig sichern und die Sicherung kontrollieren.
4. Wallet-Fingerprint und Empfangsadresse direkt auf dem Gerät prüfen.
5. Zuerst eine kleine Testtransaktion senden.
6. Nach erfolgreicher Prüfung das restliche Guthaben übertragen.
7. Die alte Sicherung erst entfernen, wenn die vollständige Migration bestätigt ist.

**Warnhinweis:** Die Seed Phrase darf niemals auf einer Website, in einem Support-Chat oder in einer unbekannten App eingegeben werden. Durch den aktuellen Vorfall dürften vermehrt gefälschte Hilfsangebote und angebliche Wiederherstellungsdienste auftauchen.

Die Migration sollte zügig, aber nicht hektisch erfolgen. Eine falsch notierte Seed Phrase, eine ungeprüfte Empfangsadresse oder eine überstürzte Übertragung kann einen zusätzlichen Verlust verursachen.

## Würfelwürfe und Passphrase konnten das Risiko reduzieren

Coldcard erlaubt es, bei der Seed-Erzeugung eigene Würfelwürfe als zusätzliche Zufallsquelle einzutragen. Nach Angaben von Coinkite gelten Seeds mit mindestens 50 fairen, unabhängigen und geheimen Würfelwürfen durch diese konkrete Schwachstelle nicht als gefährdet.

Weniger als 50 Würfelwürfe reichen für diese Ausnahme nicht aus. Wer sich nicht mehr sicher ist, wie viele Würfe verwendet wurden oder ob sie wirklich privat geblieben sind, sollte den Seed vorsichtshalber als betroffen behandeln.

Auch eine starke und einzigartige BIP-39-Passphrase kann eine zusätzliche Schutzschicht bilden. Gemeint ist nicht die PIN des Geräts, sondern eine zusätzliche geheime Zeichenfolge, aus der zusammen mit der Seed Phrase eine andere Wallet abgeleitet wird.

Coinkite weist dennoch darauf hin, dass eine Passphrase den schwachen Seed nicht repariert. Selbst Nutzer mit einer starken Passphrase sollen deshalb auf einen neu erzeugten Seed migrieren. Kurze, bekannte oder wiederverwendete Passphrasen bieten keinen verlässlichen Schutz.

## Der eigentliche Fehler lag in der Software-Integration

Der Coldcard-Hack ist auch ein Lehrstück für [Software Engineering](https://oliverjessner.at/category/software-engineering/).

Coldcard wechselte 2021 für bestimmte kryptografische Funktionen auf eine neue Bibliothek. Dabei wurde die Seed-Erzeugung von einer direkten Hardwarefunktion auf einen anderen Funktionsaufruf umgestellt. Dieser führte nicht wie vorgesehen zum Hardware-Zufallszahlengenerator, sondern zu einem Software-Fallback aus MicroPython.

Beide Implementierungen hatten dieselbe Funktionssignatur. Der Code ließ sich deshalb kompilieren, obwohl zur Laufzeit die falsche Implementierung verwendet wurde. Der vorgesehene Hardwaregenerator war sogar weiterhin in der Firmware vorhanden, wurde für die Seed-Erzeugung aber nicht erreicht.

Laut Coinkite hatten frühere Prüfungen zwar den vorhandenen Zufallszahlencode kontrolliert, aber nicht den vollständigen Aufrufpfad von der Seed-Erzeugung bis zur tatsächlich verwendeten Implementierung.

Der Fehler zeigt, warum sicherheitskritische Software nicht nur auf Quellcodeebene geprüft werden darf. Entscheidend ist auch, welche Symbole beim Build eingebunden werden und welcher Codepfad auf dem fertigen Gerät wirklich ausgeführt wird.

## Sind Hardware-Wallets jetzt grundsätzlich unsicher?

Nein. Der Vorfall widerlegt nicht das grundlegende Prinzip einer Hardware-Wallet. Die Trennung zwischen privaten Schlüsseln und internetfähigen Geräten schützt weiterhin vor vielen alltäglichen Angriffen.

Der Fall zeigt aber eine Grenze dieses Schutzes. Eine Cold Wallet kann einen Schlüssel nur so sicher aufbewahren, wie er ursprünglich erzeugt wurde. Ist die Seed Phrase vorhersehbar, hilft auch eine vollständig offline gelagerte Hardware-Wallet nicht mehr.

Für Nutzer bedeutet das:

- Firmware-Versionen und Sicherheitsmeldungen sollten regelmäßig geprüft werden.
- Seed Phrases sollten nur auf vertrauenswürdigen und aktualisierten Geräten erzeugt werden.
- Zusätzliche Entropie kann sinnvoll sein, erfordert aber ein korrektes Verfahren.
- Eine starke Passphrase kann Risiken reduzieren, ersetzt aber keine sichere Seed-Erzeugung.
- Sicherheitsupdates können eine Migration auf einen neuen Seed notwendig machen.

Der Vorfall betrifft damit nicht nur Kryptowährungen, sondern auch grundlegende Fragen rund um [Privacy](https://oliverjessner.at/category/privacy/) und die Vertrauenswürdigkeit spezialisierter Sicherheitsgeräte.

## Fazit: Offline bedeutet nicht automatisch unangreifbar

Beim Coldcard-Hack wurde die Hardware-Wallet nicht aus der Ferne geöffnet. Stattdessen konnten Angreifer den stark verkleinerten Suchraum möglicher Seed Phrases ausnutzen und private Schlüssel offline rekonstruieren.

Das macht den Fall besonders relevant. Nutzer konnten alle üblichen Regeln befolgt haben, ohne ihren Seed zu teilen oder ein unsicheres Gerät zu verwenden. Trotzdem war die Wallet gefährdet, weil der Schlüssel bereits bei seiner Erzeugung zu wenig Zufälligkeit enthielt.

Eine aktualisierte Firmware verhindert das Problem bei neuen Seeds. Bereits betroffene Seeds müssen jedoch ersetzt werden. Wer eine Coldcard verwendet und den Seed auf einer betroffenen Firmware erzeugt hat, sollte die offizielle Sicherheitswarnung lesen und die Migration sorgfältig durchführen.

## Quellen

- [Coldcard Security Advisory von Coinkite](https://blog.coinkite.com/coldcard-mk3-seed-generation-warning/)
- [Technische Analyse der Entropie-Schwachstelle](https://blog.coinkite.com/entropy-technical-backgrounder/)
- [Galaxy Research: Vierte mutmaßliche Angriffswelle](https://x.com/intangiblecoins/status/2084079706320646300)
- [Bitcoin2Go: Ursprünglicher Bericht zu drei Angriffswellen](https://bitcoin-2go.de/bitcoin-aus-cold-wallets-gestohlen/)
- [Aktualisierte Onchain-Schätzung zur vierten Welle](https://crypto.news/coldcard-losses-rise-as-fourth-attack-wave-sweeps-448-btc/)
