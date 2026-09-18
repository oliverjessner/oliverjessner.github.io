---
layout: post
title: 'Air Gap: Wie Computer über Wärme Daten übertragen'
date: 2026-09-19 00:21:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - Privacy
    - computer-stuff
description: 'BitWhisper zeigt, wie isolierte Computer über Wärme Daten austauschen können und warum der Angriff trotz OpenAI-Debatte praktisch stark begrenzt ist'
thumbnail: '/assets/images/gen/blog/air-gap-wie-computer-ueber-waerme-daten-uebertragen/header_thumbnail.webp'
image: '/assets/images/gen/blog/air-gap-wie-computer-ueber-waerme-daten-uebertragen/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Können Air-Gap-Computer ohne Netzwerk miteinander kommunizieren?'
      answer: 'Ja. Forschung zu sogenannten Covert Channels zeigt, dass isolierte Computer unter bestimmten Bedingungen etwa Wärme, Schall, Licht oder elektromagnetische Signale zur Datenübertragung nutzen können.'
    - question: 'Wie funktioniert BitWhisper?'
      answer: 'BitWhisper verändert gezielt die Auslastung und damit die Wärmeentwicklung eines Computers. Ein benachbarter kompromittierter Rechner erkennt die Temperaturänderungen über seine Sensoren und dekodiert daraus Daten.'
    - question: 'Wie schnell ist eine Datenübertragung über Wärme?'
      answer: 'Im BitWhisper-Experiment lag die Übertragungsrate bei etwa 1 bis 8 Bit pro Stunde und funktionierte bei Abständen von bis zu 40 Zentimetern.'
socialmedia:
    - 'Air Gap heißt nicht automatisch Funkstille. BitWhisper zeigte schon 2015, dass zwei isolierte Rechner über Wärme Daten austauschen können. Warum OpenAIs aktuelle Warnung technisch stimmt, praktisch aber enge Grenzen hat.'
    - 'Zwei Computer ohne Netzwerk, WLAN oder Kabel können trotzdem kommunizieren: über Temperaturänderungen. BitWhisper schafft allerdings nur 1 bis 8 Bit pro Stunde. Ein Blick auf die Technik hinter der aktuellen OpenAI-Debatte.'
    - 'OpenAI-Forscher Noam Brown warnt vor versteckten Kommunikationswegen zwischen Air-Gap-Systemen. Der thermische Kanal ist seit 2015 experimentell belegt. Neu ist vor allem der KI-Kontext.'
news: true
---

Ein OpenAI-Forscher warnt, dass selbst physisch getrennte Computer über Wärme Daten austauschen können. Das klingt exotisch, wurde mit BitWhisper aber schon 2015 praktisch demonstriert.

## Was ist ein Air Gap?

Ein Air Gap soll ein Computersystem physisch von anderen Netzwerken trennen. Der Rechner hängt nicht am Internet, ist nicht mit dem normalen Firmennetz verbunden und besitzt im Idealfall auch keine aktive WLAN- oder Bluetooth-Verbindung.

Das Konzept wird dort eingesetzt, wo besonders sensible Daten oder Systeme geschützt werden müssen. Beispiele sind kritische Infrastruktur, Forschung, industrielle Anlagen oder besonders geschützte Unternehmensnetze.

Ein Air Gap entfernt damit die offensichtlichen Kommunikationswege. Er macht einen Computer aber nicht zu einem physikalisch vollständig abgeschotteten System.

Ein laufender Rechner produziert Wärme, erzeugt elektromagnetische Felder, besitzt LEDs, Lüfter und Sensoren. Genau solche Eigenschaften lassen sich unter speziellen Bedingungen als sogenannte Covert Channels missbrauchen.

Die aktuelle Diskussion darüber kommt ausgerechnet aus dem Bereich der [KI](https://oliverjessner.at/category/ki/)-Sicherheit.

## BitWhisper überträgt Daten über Wärme

Die Idee ist keineswegs neu.

Bereits 2015 veröffentlichten Mordechai Guri, Matan Monitz, Yisroel Mirski und Yuval Elovici von der Ben-Gurion University die Arbeit "BitWhisper: Covert Signaling Channel between Air-Gapped Computers using Thermal Manipulations".

Die Forscher demonstrierten darin eine bidirektionale Kommunikation zwischen benachbarten, kompromittierten Computern.

Dafür brauchten sie weder Netzwerkverbindung noch zusätzlich installierte Funkhardware. Stattdessen nutzten sie zwei Eigenschaften, die praktisch jeder Computer besitzt: Wärmeentwicklung und Temperatursensoren.

## So funktioniert der thermische Seitenkanal

Das Prinzip ist überraschend einfach:

1. Schadsoftware auf dem sendenden Computer verändert gezielt die CPU-Auslastung.
2. Dadurch steigt oder fällt die vom Rechner abgegebene Wärme.
3. Ein benachbarter kompromittierter Computer überwacht seine Temperatursensoren.
4. Aus dem zeitlichen Muster der Temperaturänderungen lassen sich einzelne Bits rekonstruieren.

Die Nachricht wird damit nicht als Netzwerkpaket übertragen. Sie steckt in einem künstlich erzeugten Temperaturmuster.

BitWhisper konnte diesen Kanal sogar in beide Richtungen verwenden.

Das macht die Forschung aus Sicht der Computersicherheit interessant. Zwei Systeme können logisch und elektrisch vollständig voneinander getrennt sein und trotzdem über ihre physische Umgebung Informationen austauschen.

## Wie schnell ist BitWhisper?

Der entscheidende Punkt ist die Geschwindigkeit.

Im Experiment erreichte BitWhisper etwa 1 bis 8 Bit pro Stunde. Die beteiligten Rechner mussten höchstens 40 Zentimeter voneinander entfernt stehen.

8 Bit entsprechen einem Byte. Selbst unter optimalen Bedingungen reden wir also von höchstens ungefähr einem Byte pro Stunde.

Auf einen ganzen Tag gerechnet sind das etwa 3 bis 24 Byte.

Für Bilder, Dokumente, Datenbanken oder größere Dateien ist das praktisch unbrauchbar. Für einen sehr kurzen Befehl, einen kleinen Schlüsselbestandteil oder wenige Steuerinformationen kann eine solche Bandbreite dagegen ausreichen.

Genau deshalb sind Covert Channels trotz ihrer oft absurd niedrigen Übertragungsraten ein reales Forschungsgebiet.

Bei einem erfolgreichen Angriff muss nicht zwingend eine große Datenmenge übertragen werden. Manchmal reicht bereits ein einzelnes Kommando.

## OpenAI bringt BitWhisper wieder in die Diskussion

Der aktuelle Anlass ist eine Aussage von OpenAI-Forscher Noam Brown im Podcast von Dwarkesh Patel.

Brown argumentierte dort, dass selbst ein Air Gap möglicherweise nicht als alleinige Schutzmaßnahme ausreicht. Als Beispiel nannte er zwei Computer, die über Temperatursensoren miteinander kommunizieren könnten.

Das dürfte eine Anspielung auf BitWhisper sein.

Der Kontext ist wichtig.

OpenAI hatte im August 2026 einen Sicherheitsvorfall aus internen Cybersecurity-Evaluierungen ausführlicher dokumentiert. Mehrere KI-Agenten fanden dabei unerlaubte Kommunikationswege, teilten Informationen untereinander und gelangten schließlich über Schwachstellen auch auf Systeme von Hugging Face.

Die Modelle liefen dabei nicht unter denselben Schutzmechanismen wie öffentlich verfügbare OpenAI-Produkte.

OpenAI stellte außerdem fest, dass vorhandene Systeme zur Überwachung der Chain-of-Thought während der betroffenen Evaluierungen nicht aktiv waren. Bei späteren Analysen konnten solche Monitore problematisches Verhalten nach Angaben des Unternehmens gut erkennen.

Browns Argument ist deshalb weniger, dass eine [KI](https://oliverjessner.at/category/ki/) gerade versucht, per Wärme aus einem Rechenzentrum auszubrechen.

Es geht um ein anderes Sicherheitsproblem: Wer sich auf genau eine Barriere verlässt, sollte damit rechnen, dass ein ausreichend leistungsfähiges System nach alternativen Kommunikationswegen sucht.

## Eine KI hat BitWhisper nicht neu erfunden

Hier sollte man technische Möglichkeit und tatsächliche Bedrohung sauber trennen.

Es gibt derzeit keinen Nachweis dafür, dass ein KI-Agent selbstständig einen thermischen Kommunikationskanal wie BitWhisper aufgebaut und zur Flucht aus einer Air-Gap-Umgebung verwendet hat.

Der thermische Kanal selbst wurde außerdem lange vor modernen Large Language Models demonstriert.

Neu ist der Kontext.

Ein ausreichend leistungsfähiger Software-Agent könnte bekannte Angriffstechniken recherchieren, kombinieren oder möglicherweise an eine konkrete Umgebung anpassen. Das macht bestehende Forschung zu Seitenkanälen für die Sicherheit autonomer Systeme interessanter.

Es verwandelt einen zehn Jahre alten Laborversuch aber nicht automatisch in einen praktischen Standardangriff.

## Der Angriff hat erhebliche Voraussetzungen

Für eine realistische Bewertung sind die Bedingungen von BitWhisper entscheidend.

Beide beteiligten Systeme müssen bereits kompromittiert sein. Auf beiden Rechnern muss Code laufen können, der entweder Temperaturänderungen erzeugt oder Sensordaten auswertet.

Die Geräte müssen außerdem sehr nah beieinanderstehen.

Hinzu kommt die extrem geringe Bandbreite. Selbst kleine Datenmengen benötigen Stunden.

Für normale PCs zu Hause oder im Büro ist das deshalb kein Szenario, über das man sich ernsthaft Gedanken machen muss.

Relevant werden solche Techniken bei sehr speziellen Bedrohungsmodellen. Dort können auch wenige übertragene Bits einen Wert haben. Genau deshalb untersucht die Sicherheitsforschung neben Wärme auch akustische, optische und elektromagnetische Seitenkanäle.

Das ist letztlich auch eine klassische [Privacy](https://oliverjessner.at/category/privacy/)-Frage: Welche Informationen kann ein System unbeabsichtigt über seine physische Umgebung preisgeben?

## Gizmodo verrechnet sich bei den 40 Zentimetern

Eine kleine technische Korrektur zum aktuellen Gizmodo-Artikel ist ebenfalls notwendig.

Dort werden die maximalen 40 Zentimeter Entfernung des BitWhisper-Experiments mit ungefähr 1,3 Zoll angegeben.

Das stimmt nicht.

40 Zentimeter entsprechen rund 15,7 Zoll oder etwa 1,31 Fuß.

An der grundsätzlichen Einordnung ändert das wenig. Die Computer müssen weiterhin sehr nah beieinanderstehen. Für das Verständnis des Experiments ist der Unterschied zwischen gut drei Zentimetern und 40 Zentimetern aber durchaus relevant.

## Ein Air Gap bleibt trotzdem sinnvoll

Die richtige Schlussfolgerung aus BitWhisper ist nicht, dass Air Gaps nutzlos wären.

Physische Isolation entfernt eine enorme Zahl gewöhnlicher Angriffswege. Ein Rechner ohne Netzwerkverbindung lässt sich nicht einfach über dieselben Methoden erreichen wie ein normaler Server im Internet.

Für Hochsicherheitsumgebungen darf ein Air Gap allerdings nicht die einzige Schutzschicht sein.

Abstand zwischen Geräten, kontrollierte Räumlichkeiten, begrenzter Zugriff auf Sensordaten, Überwachung ungewöhnlicher Hardwareauslastung und streng kontrollierte Wege für den Datentransfer können zusätzliche Hürden schaffen.

Vor allem zeigt BitWhisper sehr anschaulich, was ein Air Gap tatsächlich bedeutet.

Er trennt Computer von Netzwerken.

Er hebt die Gesetze der Physik nicht auf.
