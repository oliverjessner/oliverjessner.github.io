---
layout: post
title: 'Intel GPU D270: bis zu 480 GB und Xeon-Racks mit 46.080 Kernen'
date: 2026-10-13 09:29:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - cloud
    - computer-stuff
    - software-engineering
description: 'Intel zeigt die GPU D270 für KI-Inferenz und Xeon-Racks mit 46.080 Kernen. Bei den 480 GB Speicher steckt ein wichtiges Detail im Kleingedruckten'
thumbnail: '/assets/images/gen/blog/intel-gpu-d270-bis-zu-480-gb-und-xeon-racks-mit-46080-kernen/header_thumbnail.webp'
image: '/assets/images/gen/blog/intel-gpu-d270-bis-zu-480-gb-und-xeon-racks-mit-46080-kernen/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Wie viel Speicher besitzt die Intel GPU D270?'
      answer: 'Intels eigene GPU D270 verfügt über 160 GB LPDDR5X-Speicher. Partner können auf Basis des Designs eigene Karten mit bis zu 480 GB Speicher entwickeln. Die Speicherbandbreite gibt Intel mit 1,5 TB/s an.'
    - question: 'Wie viele CPU-Kerne passen in ein Intel Xeon 6+ Rack?'
      answer: 'Intel nennt Konfigurationen mit mehr als 46.000 CPU-Kernen pro Rack. Rechnerisch ergeben 160 Xeon 6+ Prozessoren mit jeweils 288 E-Kernen insgesamt 46.080 Kerne. Die angegebene Rack-Leistungsaufnahme beträgt 133,45 kW.'
    - question: 'Wann erscheint die Intel GPU D270?'
      answer: 'Intel hat am 12. Oktober 2026 technische Details veröffentlicht und bestätigt, dass ausgewählte Kunden bereits Muster erhalten. Ein allgemeiner Verkaufsstart und konkrete Preise wurden noch nicht bekannt gegeben.'
socialmedia:
    - 'Intel D270 mit 480 GB Speicher? Nicht ganz. Intels eigene Karte bietet 160 GB. Die 480 GB sind für Partnerdesigns vorgesehen. Ein wichtiger Unterschied bei der neuen KI-GPU.'
    - '46.080 CPU-Kerne in einem Rack: Intel zeigt neue Xeon-6+-Systeme für KI-Infrastruktur. Die Leistungsaufnahme liegt laut Hersteller bei 133,45 kW pro Rack.'
    - '1,3 Petaflops FP8, 1,5 TB/s Bandbreite und 350 Watt: Die Intel GPU D270 bekommt konkrete technische Daten. Ob sie wirtschaftlich überzeugt, müssen reale Benchmarks zeigen.'
news: true
---

Intel stellt mit der GPU D270 einen neuen Beschleuniger für KI-Inferenz vor und zeigt Xeon-Racks mit mehr als 46.000 CPU-Kernen. Die technischen Daten sind beachtlich, allerdings lohnt sich ein genauer Blick auf Speicher, Stromverbrauch und Verfügbarkeit.

## Intel GPU D270 – Crescent Island wird zur D-Serie

Auf dem OCP Global Summit 2026 in San José hat Intel am 12. Oktober neue Hardware für [KI](https://oliverjessner.at/category/ki/)-Rechenzentren vorgestellt. Im Mittelpunkt stehen die Intel GPU D270, bisher unter dem Codenamen "Crescent Island" bekannt, und neue Serversysteme auf Basis der Xeon-6+-Prozessoren.

Beide Entwicklungen verfolgen unterschiedliche Ansätze. Während die D270 große KI-Modelle möglichst effizient ausführen soll, setzt Intel bei seinen Xeon-Racks auf eine hohe Anzahl von CPU-Kernen für parallele Aufgaben.

Die GPU D270 basiert auf der Xe3P-Architektur und ist ausdrücklich für KI-Inferenz optimiert. Gemeint ist damit die Ausführung bereits trainierter Modelle, beispielsweise für Sprachmodelle, KI-Assistenten oder automatisierte Anwendungen.

### Intel GPU D270: Technische Daten im Überblick

| Eigenschaft        | Intel GPU D270                               |
| ------------------ | -------------------------------------------- |
| Architektur        | Intel Xe3P                                   |
| Xe-Kerne           | 32                                           |
| XMX-Matrix-Engines | 256                                          |
| Speicher           | 160 GB, bei Partnerkarten bis 480 GB LPDDR5X |
| Speicherbandbreite | 1,5 TB/s                                     |
| FP8-Rechenleistung | 1,3 Petaflops                                |
| Leistungsbudget    | 350 Watt                                     |
| Schnittstelle      | PCIe 5.0                                     |
| Kühlung            | Luftkühlung                                  |

Die Werte stammen aus der [offiziellen Intel-Produktvorstellung](https://www.intel.com/content/www/us/en/newsroom/news/artificial-intelligence/intel-accelerates-open-infrastructure-agentic-ai-era.html) und der [Produktseite zur Intel GPU D270](https://www.intel.com/content/www/us/en/products/details/discrete-gpus/data-center-gpu/d-series.html).

Besonders interessant ist die Kombination aus vergleichsweise großer Speicherkapazität und einem Leistungsbudget von 350 Watt.

## 480 GB GPU-Speicher – aber nicht bei jeder D270

Eine wichtige Einschränkung findet sich im Kleingedruckten der Intel-Ankündigung.

Die von Intel selbst angebotene PCIe-Karte verfügt über 160 GB LPDDR5X-Speicher. Die häufig genannten 480 GB beziehen sich auf mögliche Ausführungen von Hardwarepartnern, die eigene Karten auf Basis des Designs entwickeln können.

Das ist ein wesentlicher Unterschied, denn gerade bei großen Sprachmodellen entscheidet die verfügbare Speicherkapazität darüber, welche Modelle vollständig auf einer GPU ausgeführt werden können.

Intel verzichtet bei der D-Serie auf den im KI-Bereich verbreiteten High Bandwidth Memory (HBM) und setzt stattdessen auf LPDDR5X. Damit verfolgt das Unternehmen einen anderen Ansatz bei Speicherarchitektur, Energieverbrauch und potenziellen Herstellungskosten.

Die Speicherbandbreite von 1,5 TB/s dürfte für viele Inferenzaufgaben interessant sein. Ob die Architektur wirtschaftliche Vorteile gegenüber konkurrierenden Beschleunigern bietet, lässt sich daraus allein aber noch nicht ableiten.

## Welche KI-Modelle kann die Intel GPU D270 ausführen?

Laut Intel sollen sich Modelle mit bis zu 300 Milliarden Parametern auf einer einzelnen Karte betreiben lassen. Ein System mit acht GPUs soll sogar Modelle mit mehr als einer Billion Parametern unterstützen.

Solche Angaben hängen allerdings stark von der verwendeten Zahlenpräzision, der Modellarchitektur und dem tatsächlichen Speicherbedarf ab.

Ein dichtes Modell mit 300 Milliarden Parametern benötigt bei einer Speicherung mit einem Byte pro Parameter bereits ungefähr 300 GB für seine Modellgewichte. Hinzu kommen weitere Speicherbereiche, beispielsweise für den KV-Cache und die Verarbeitung der Eingaben.

Die 480-GB-Konfiguration ist deshalb für solche Anwendungen deutlich interessanter als Intels eigene 160-GB-Karte.

Die D270 richtet sich nicht an Spieler oder klassische Desktop-Anwendungen. Intel hat die Architektur auf Rechenoperationen ausgelegt und dafür Teile der traditionellen Grafik- und Raytracing-Funktionen zugunsten zusätzlicher Rechenkapazität zurückgenommen.

Für Unternehmen, die eigene Sprachmodelle betreiben oder umfangreiche Anfragen parallel verarbeiten möchten, könnte eine solche Speicherausstattung relevant werden.

Entscheidend sind aber nicht nur die theoretischen Petaflops. Auch Treiber, die Integration in Software wie PyTorch und vLLM sowie die tatsächlich erreichte Anzahl verarbeiteter Tokens pro Sekunde beeinflussen die Wirtschaftlichkeit.

## Intel Xeon 6+ – bis zu 46.080 CPU-Kerne in einem Rack

Neben der GPU D270 präsentiert Intel neue Serverarchitekturen mit Xeon-6+-Prozessoren. Die unter dem Codenamen "Clearwater Forest" entwickelten CPUs besitzen bis zu 288 Efficiency-Kerne pro Prozessor.

Intel spricht von Rack-Konfigurationen mit mehr als 46.000 CPU-Kernen. Bei einer Bestückung mit 160 Prozessoren und jeweils 288 Kernen ergibt sich rechnerisch eine Gesamtzahl von 46.080 Kernen.

In klassischen Dual-Socket-Systemen wären dafür 80 Prozessorsockelpaare erforderlich. Die genaue physische Bestückung des präsentierten Racks ist damit allerdings noch nicht bestätigt.

Interessanter als die reine Kernzahl ist die elektrische Leistungsaufnahme.

Intel nennt für eine entsprechende Rack-Konfiguration insgesamt 133,45 Kilowatt. Würde ein solches System dauerhaft mit dieser Leistungsaufnahme betrieben, ergäbe sich ein Strombedarf von rund 3,2 Megawattstunden innerhalb von 24 Stunden.

Zusätzliche Aufwendungen für die Kühlung und Stromversorgung auf Rechenzentrumsebene sind dabei noch nicht berücksichtigt.

Das verdeutlicht, dass solche Systeme eine entsprechend ausgelegte Infrastruktur voraussetzen. Sie sind nicht für gewöhnliche Serverräume vorgesehen, sondern für Rechenzentren mit hoher Leistungsdichte.

## Warum Intel bei KI weiterhin auf CPUs setzt

Moderne KI-Infrastruktur besteht nicht ausschließlich aus GPUs.

Während spezialisierte Beschleuniger die rechenintensiven Operationen großer Modelle übernehmen, bleiben CPUs für zahlreiche begleitende Aufgaben zuständig.

Dazu gehören die Verarbeitung von Daten, Netzwerkkommunikation, die Koordination von Anwendungen und die Ausführung externer Werkzeuge.

Gerade bei KI-Agenten können solche Aufgaben einen erheblichen Teil des Gesamtsystems ausmachen. Ein Agent ruft beispielsweise ein Sprachmodell auf, durchsucht anschließend Dokumente, führt Programmcode aus und verarbeitet die Ergebnisse erneut.

Intel positioniert seine Xeon-6+-Racks deshalb als Infrastruktur für eine große Anzahl gleichzeitig arbeitender KI-Agenten.

Viele der neuen Rack-Designs orientieren sich am Open-Rack-v3-Standard des Open Compute Project. Damit sollen sich unterschiedliche Serverkomponenten innerhalb standardisierter Rechenzentrumsinfrastrukturen kombinieren lassen.

Für [Cloud](https://oliverjessner.at/category/cloud/)-Anbieter ist das insbesondere bei der Skalierung großer Systeme relevant.

Die Xeon-Racks und die GPU D270 sind dabei keine zwei Komponenten eines einzigen angekündigten Racks, sondern unterschiedliche Bausteine von Intels Infrastrukturstrategie.

## Wann erscheint die Intel GPU D270?

Intel bestätigt, dass bereits erste Kundenmuster der GPU D-Serie ausgeliefert werden. Zu den angesprochenen Partnern gehören Serverhersteller, Cloud-Anbieter und Softwareunternehmen.

Ein konkreter Termin für die allgemeine Verfügbarkeit oder offizielle Verkaufspreise wurden bisher nicht veröffentlicht.

Ebenso fehlen noch unabhängige Benchmarks, die zeigen, wie sich die D270 unter realistischen Bedingungen gegenüber anderen KI-Beschleunigern verhält.

Besonders interessant wären Messungen zur tatsächlichen Inferenzgeschwindigkeit, zur Latenz bei langen Kontextfenstern und zu den Kosten pro verarbeitetem Token.

Denn weder eine große Speicherkapazität noch eine hohe theoretische FP8-Rechenleistung garantieren automatisch eine wirtschaftlichere Ausführung von KI-Modellen.

## Fazit – Speicher und Effizienz werden wichtiger

Mit der GPU D270 und den neuen Xeon-6+-Racks zeigt Intel zwei unterschiedliche Ansätze für die wachsenden Anforderungen an KI-Rechenzentren.

Die D270 setzt auf möglichst viel Speicher innerhalb eines luftgekühlten PCIe-Designs. Die Xeon-Racks wiederum zeigen, wie viele allgemeine Rechenkerne sich inzwischen in einem einzelnen Serverschrank unterbringen lassen.

Aus technischer Sicht ist vor allem die Speicherstrategie der D270 interessant. Bis zu 480 GB LPDDR5X bei einem Leistungsbudget von 350 Watt könnten für bestimmte Inferenzanwendungen eine sinnvolle Alternative zu anderen Beschleunigerarchitekturen darstellen.

Allerdings bleibt abzuwarten, welche Partnerkonfigurationen tatsächlich auf den Markt kommen, wie teuer die Hardware wird und welche Leistung sie in produktiven Umgebungen erreicht.

Die technischen Eckdaten sind damit zunächst eine Grundlage für weitere Vergleiche. Ob Intel damit auch wirtschaftlich überzeugen kann, werden erst unabhängige Messungen zeigen.

Weitere Informationen finden sich in der [Pressemitteilung von Intel](https://www.intel.com/content/www/us/en/newsroom/news/artificial-intelligence/intel-accelerates-open-infrastructure-agentic-ai-era.html) sowie in der Berichterstattung von [ComputerBase zum OCP Global Summit 2026](https://www.computerbase.de/news/grafikkarten/ocp-global-summit-2026-intel-gpu-d270-und-ai-racks-mit-46-080-cpu-kernen-starten.99782/).
