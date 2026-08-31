---
layout: post
title: 'Mobilfunk-Sicherheitslücke: Anruf verrät IMEI und Gerätedaten'
date: 2026-08-31 12:21:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - Privacy
    - Gesellschaft
    - Politik
description: 'Eine Mobilfunk-Sicherheitslücke konnte IMEI, Smartphone-Modell und Softwareversion schon vor Annahme eines Anrufs offenlegen'
thumbnail: '/assets/images/gen/blog/mobilfunk-sicherheitsluecke-anruf-verraet-imei-und-geraetedaten/header_thumbnail.webp'
image: '/assets/images/gen/blog/mobilfunk-sicherheitsluecke-anruf-verraet-imei-und-geraetedaten/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Was ist eine IMEI?'
      answer: 'Die IMEI ist eine meist 15-stellige eindeutige Kennung eines Mobilfunkgeräts. Sie identifiziert das Gerät im Mobilfunknetz und sollte nicht unnötig an andere Teilnehmer oder fremde Netze übertragen werden.'
    - question: 'Kann ein Angreifer mit der IMEI direkt mein Smartphone hacken?'
      answer: 'Nein. Die IMEI allein ermöglicht keinen direkten Zugriff auf ein Smartphone. Zusammen mit Modell und Softwareversion kann sie jedoch gezielte Angriffe, Geräteprofile und Überwachung erleichtern.'
    - question: 'Sind österreichische Mobilfunknetze von der Sicherheitslücke betroffen?'
      answer: 'Magenta und Drei erklärten Ende August 2026, entsprechende Informationen an Netzgrenzen zu filtern. A1 untersuchte die eigene Infrastruktur zu diesem Zeitpunkt noch.'
socialmedia:
    - 'Ein Anruf genügte in mehreren Mobilfunknetzen, um IMEI, Smartphone-Modell und Softwareversion einer Zielperson auszulesen. Was hinter der Lücke steckt und warum Nutzer sie kaum selbst beheben können.'
    - 'Die IMEI ist kein Passwort. Trotzdem sollte sie bei einem normalen Anruf nicht an die Gegenseite gelangen. Genau das passierte in mehreren deutschen Mobilfunknetzen. Die Betreiber haben inzwischen reagiert.'
    - 'Telekom, Vodafone und O2 waren laut BR-Recherche von einer Mobilfunk-Sicherheitslücke betroffen. In Österreich melden Magenta und Drei Filter im Netz, während A1 noch prüft. Was technisch dahintersteckt.'
---

Ein Anruf, ohne dass die Zielperson abhebt: Genau das reichte in mehreren deutschen Mobilfunknetzen, um IMEI, Smartphone-Modell und Softwareversion offenzulegen.

## Mobilfunk-Sicherheitslücke – was genau passiert ist

Bei einem normalen Telefonanruf werden nicht nur Audiodaten übertragen. Bereits beim Aufbau der Verbindung tauschen Smartphones, Mobilfunknetze und beteiligte Provider technische Informationen aus.

Genau dort lag das Problem.

Eine Recherche des Bayerischen Rundfunks zeigte, dass bei bestimmten Anrufen Informationen über das Smartphone der angerufenen Person bis zur Gegenseite gelangten. Dafür musste die Zielperson den Anruf nicht einmal annehmen.

Der BR führte mehr als 70 Testanrufe durch. Dabei wurden in den Netzen der Deutschen Telekom und von Telefónica beziehungsweise O2 in mehreren Fällen IMEI-Nummern übertragen. Bei Telekom und Vodafone ließen sich außerdem Informationen zum Smartphone-Modell und zur verwendeten Softwareversion erkennen.

Die Daten wurden nicht bei jedem Anruf übertragen. Bestimmte Kombinationen aus Netz, Gerät und Verbindung waren offenbar entscheidend.

Das macht die Sicherheitslücke weniger universell, aber nicht unproblematisch. Ein entfernter Anrufer sollte solche Informationen bei einem gewöhnlichen Rufaufbau grundsätzlich nicht erhalten.

## Warum die IMEI so sensibel ist

Die IMEI, ausgeschrieben "International Mobile Equipment Identity", ist eine normalerweise 15-stellige Kennung eines Mobilfunkgeräts.

Sie ist kein Passwort und ermöglicht allein keinen Zugriff auf ein Smartphone. Trotzdem ist sie aus [Privacy](https://oliverjessner.at/category/privacy/)-Sicht relevant, weil sie ein Gerät dauerhaft identifizieren kann.

Eine Telefonnummer gehört in erster Linie zu einem Mobilfunkanschluss. Eine SIM-Karte kann gewechselt werden. Die IMEI gehört dagegen zum Gerät selbst.

Genau deshalb sehen technische Standards einen restriktiven Umgang mit dieser Kennung vor. Die IETF bezeichnet die Weitergabe einer IMEI an Netze, zu denen das Gerät keine entsprechende Beziehung hat, ausdrücklich als Sicherheitsproblem. Auch die Bundesnetzagentur zählt die IMEI zu besonders schützenswerten Kundendaten.

Bei einem normalen Telefonanruf gibt es keinen erkennbaren Grund, warum die Kennung des angerufenen Smartphones beim Anrufer landen sollte.

## Auch Smartphone-Modell und Softwareversion sind interessant

Noch problematischer wird die Kombination mehrerer Informationen.

Neben der IMEI konnten die Testanrufe teilweise das verwendete Smartphone-Modell und die Softwareversion sichtbar machen.

Für sich genommen wirken solche Angaben vergleichsweise harmlos. Für einen gezielten Angriff können sie jedoch wertvoll sein.

Kennt ein Angreifer beispielsweise das genaue Smartphone-Modell und eine veraltete Betriebssystemversion, kann er prüfen, ob öffentlich bekannte Schwachstellen für genau diese Kombination existieren.

Damit wird aus einem beliebigen Angriff ein wesentlich genaueres Geräteprofil.

Das bedeutet nicht, dass ein Smartphone durch einen solchen Anruf automatisch kompromittiert wird. Die übermittelten Informationen können aber bei der Vorbereitung weiterer Angriffe helfen, etwa für gezieltes Phishing, Social Engineering oder die Auswahl passender Exploits.

## Ein Anruf kann damit zur Abfrage werden

Technisch interessant ist vor allem, wie niedrig die Hürde für die Recherche war.

Die Zielperson musste keine App installieren, keinen Link öffnen und den Anruf nicht beantworten. Die Informationen entstanden bereits während des Rufaufbaus.

Damit unterscheidet sich das Problem von vielen klassischen Smartphone-Angriffen.

Die Ursache liegt nicht primär auf dem Endgerät des Nutzers, sondern in der Verarbeitung und Weiterleitung von Signalisierungsdaten innerhalb der Mobilfunkinfrastruktur.

Moderne Telefonnetze sind komplexe Systeme, in denen unterschiedliche Provider, Gerätehersteller, Standards und Protokolle zusammenspielen. An den Übergängen zwischen diesen Systemen müssen Informationen gefiltert werden, die für die jeweils andere Seite nicht notwendig sind.

Offenbar funktionierte genau das nicht konsequent.

## Telekom, Vodafone und O2 haben reagiert

Der Bayerische Rundfunk informierte Telekom, Vodafone und Telefónica Ende Juni 2026 über die Ergebnisse.

Die Provider reagierten anschließend mit technischen Änderungen.

Vodafone erklärte, die bei Anrufen übertragenen Daten zusätzlich eingeschränkt zu haben. Die Telekom kündigte Anpassungen am eigenen Netz an. Telefónica erklärte ebenfalls, technische Maßnahmen umgesetzt zu haben.

Die Telekom teilte später mit, Metadaten inzwischen unabhängig von den Eigenschaften einzelner Endgeräte an der Grenze des eigenen Netzes zu entfernen.

Auch der internationale Mobilfunkverband GSMA reagierte. Nach der Recherche wurden mehr als 1.000 Mitgliedsunternehmen weltweit aufgefordert, ihre Infrastruktur zu überprüfen und unnötig übertragene Informationen herauszufiltern.

Die Zahl bedeutet nicht, dass mehr als 1.000 Provider nachweislich verwundbar waren. Die GSMA verschickte die Warnung vorsorglich an ihre Mitglieder.

## Österreich – Magenta und Drei sehen sich nicht betroffen

Interessant ist die Situation in Österreich.

DER STANDARD fragte die drei großen österreichischen Mobilfunkanbieter nach der Schwachstelle.

Magenta erklärte, bereits 2018 Änderungen vorgenommen zu haben, durch die entsprechende Informationen an den Grenzen zu anderen Netzen herausgefiltert werden. Das Unternehmen sieht sich deshalb von den beschriebenen Szenarien grundsätzlich nicht betroffen.

Auch Drei erklärte, dass in den von der GSMA genannten Fällen keine entsprechenden Daten an andere Netze weitergegeben würden.

Bei A1 liefen zum Zeitpunkt der Veröffentlichung am 31. August 2026 dagegen noch Analysen verschiedener Nutzungsszenarien. Das Unternehmen verwies auf die Einhaltung der GSMA-Vorgaben und kündigte Änderungen an, falls die Untersuchung Probleme zeigen sollte.

Damit gibt es zumindest derzeit keinen Hinweis darauf, dass die in Deutschland demonstrierte IMEI-Abfrage in gleicher Form bei allen österreichischen Providern funktioniert.

Eine endgültige Aussage für jedes Gerät, jede Verbindung und jede Netzkonstellation lässt sich daraus allerdings nicht ableiten.

## Warum solche Metadaten für gezielte Überwachung interessant sind

Für normale Smartphone-Nutzer dürfte das unmittelbare Risiko begrenzt sein. Interessanter werden solche Informationen bei gezielten Angriffen auf einzelne Personen.

Der BR testete die Methode unter anderem am Smartphone des CDU-Bundestagsabgeordneten Roderich Kiesewetter. Dabei konnte dessen IMEI ermittelt werden.

Das deutsche Bundesamt für Verfassungsschutz stuft die Schwachstelle als sicherheitsrelevant ein. Nach Einschätzung der Behörde können solche Informationen staatlichen und kriminellen Angreifern helfen, weitere Angriffe vorzubereiten.

Gerade bei Personen aus [Politik](https://oliverjessner.at/category/politik/), Militär, Sicherheitsbehörden oder Journalismus können dauerhaft zuordenbare Gerätekennungen interessant sein.

Auch hier gilt aber: Die Kenntnis einer IMEI bedeutet nicht automatisch, dass jemand den Standort eines Smartphones sehen oder auf dessen Daten zugreifen kann.

Die Kennung ist vielmehr ein zusätzliches Puzzleteil. In Kombination mit anderen technischen oder nachrichtendienstlichen Möglichkeiten kann dieses Puzzleteil relevant werden.

## Was Smartphone-Nutzer selbst tun können

Die unangenehme Antwort lautet: Gegen diese konkrete Sicherheitslücke können Nutzer nur wenig direkt unternehmen.

Das Problem liegt hauptsächlich in den Mobilfunknetzen und muss dort behoben werden.

Ein aktuelles Betriebssystem bleibt trotzdem wichtig. Wenn Angreifer Modell und Softwareversion eines Geräts kennen, sind ungepatchte bekannte Schwachstellen besonders interessant.

Updates reduzieren deshalb zumindest die Möglichkeiten für mögliche Folgeangriffe.

Wer ein erhöhtes Schutzbedürfnis hat, kann für sensible Kommunikation außerdem internetbasierte Messenger mit Ende-zu-Ende-Verschlüsselung verwenden. Diese nutzen einen anderen Verbindungsaufbau als ein klassischer Mobilfunkanruf. Die hier beschriebene Schwachstelle betrifft den Rufaufbau innerhalb des Telefonnetzes.

Ein Grund, unbekannte Anrufe grundsätzlich nicht mehr anzunehmen, ergibt sich aus der Lücke dagegen nicht. Die problematischen Informationen konnten bereits übertragen werden, bevor die Zielperson überhaupt reagierte.

## Das eigentliche Problem liegt im Netz

Die Mobilfunk-Sicherheitslücke ist weniger ein klassischer Smartphone-Bug als ein Beispiel dafür, wie entscheidend die Umsetzung technischer Standards in realen Netzen ist.

Die notwendigen Regeln existieren teilweise bereits. Trotzdem wurden Informationen weitergereicht, die beim Empfänger eines normalen Telefonanrufs nichts zu suchen haben.

Genau darin liegt die interessantere Erkenntnis.

Sicherheit hängt nicht nur davon ab, ob ein Protokoll kryptografisch sauber entworfen wurde. Sie hängt ebenso davon ab, welche Metadaten Systeme tatsächlich austauschen, welche Informationen an Netzgrenzen gefiltert werden und wie konsequent Provider ihre Infrastruktur testen.

Für Nutzer bleibt davon im Alltag wenig sichtbar.

Bis ein einfacher Anruf plötzlich mehr über das eigene Smartphone verrät, als er sollte.
