---
layout: post
title: 'OpenAI Jalapeño: KI-Chip schlägt Nvidia bei Inferenz-Benchmarks'
date: 2026-08-28 09:43:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - openai
    - KI
    - nvidia
description: 'OpenAIs Jalapeño-Chip schlägt Nvidia GB200 und GB300 bei Inferenz-Benchmarks. Was hinter Leistung, Latenz und Effizienz steckt'
thumbnail: '/assets/images/gen/blog/openai-jalapeno-ki-chip-schlaegt-nvidia-bei-inferenz-benchmarks/header_thumbnail.webp'
image: '/assets/images/gen/blog/openai-jalapeno-ki-chip-schlaegt-nvidia-bei-inferenz-benchmarks/header.webp'
image_width: 1280
image_height: 853
faq:
    - question: 'Was ist OpenAI Jalapeño?'
      answer: 'Jalapeño ist der erste von OpenAI entwickelte KI-Beschleuniger. Der gemeinsam mit Broadcom entwickelte ASIC wurde speziell für die Inferenz großer Sprachmodelle optimiert.'
    - question: 'Ist OpenAI Jalapeño schneller als Nvidia GB300?'
      answer: 'In den veröffentlichten InferenceX-Benchmarks erreicht Jalapeño je nach Modell eine höhere Leistung pro Watt und deutlich niedrigere Latenzen als die verglichenen Nvidia-Systeme mit GB200 und GB300.'
    - question: 'Will OpenAI mit Jalapeño Nvidia ersetzen?'
      answer: 'Nein. OpenAI will Jalapeño ab Ende 2026 in der eigenen Infrastruktur einsetzen, plant aber weiterhin umfangreich Nvidia-Beschleuniger und Hardware anderer Partner für Training und Inferenz zu verwenden.'
socialmedia:
    - 'OpenAI zeigt erstmals Benchmarks seines eigenen Jalapeño-KI-Chips. Gegen Nvidia GB200 und GB300 liefert der Inferenzbeschleuniger mehr Leistung pro Watt und teilweise deutlich niedrigere Latenzen.'
    - 'Jalapeño ist weniger wegen eines einzelnen Benchmark-Siegs interessant. Spannender ist, dass OpenAI inzwischen Modelle, Serving-Software, Netzwerk und eigene KI-Chips gemeinsam optimiert.'
    - '1,5 bis 1,9-mal mehr KI-Arbeit pro Watt und bis zu 3,6-mal niedrigere End-to-End-Latenz: OpenAI veröffentlicht erste Zahlen zu Jalapeño. Ein genauer Blick zeigt, was die Benchmarks wirklich aussagen.'
---

OpenAI veröffentlicht erstmals detaillierte Benchmarks seines eigenen Jalapeño-KI-Chips. Besonders bei Inferenz, Energieeffizienz und Latenz kann der spezialisierte Beschleuniger mit Nvidia GB200 und GB300 mithalten oder sie übertreffen.

## OpenAI Jalapeño soll KI-Inferenz effizienter machen

Mit Jalapeño baut [OpenAI](https://oliverjessner.at/category/openai/) erstmals einen eigenen Beschleuniger für den Betrieb großer Sprachmodelle. Anders als klassische GPUs soll der Chip nicht möglichst viele unterschiedliche Rechenaufgaben übernehmen. Seine Architektur wurde gezielt auf die Inferenz von Large Language Models ausgerichtet.

Inferenz bezeichnet den Teil des Betriebs, bei dem ein bereits trainiertes Modell Eingaben verarbeitet und Antworten erzeugt. Wenn ChatGPT eine Antwort schreibt, ein Coding-Agent mehrere Arbeitsschritte ausführt oder ein Modell über eine API angesprochen wird, findet Inferenz statt.

Gerade bei stark genutzten KI-Diensten wird sie zu einem erheblichen Kostenfaktor. Geschwindigkeit allein reicht dabei nicht. Entscheidend sind auch Stromverbrauch, Speicherdurchsatz und die Frage, wie viele Anfragen gleichzeitig verarbeitet werden können.

Hier setzt Jalapeño an.

OpenAI veröffentlichte am 25. August 2026 erste ausführliche Messergebnisse. Demnach erreicht der Chip bei drei großen Sprachmodellen zwischen 1,5 und 1,9-mal mehr Rechenarbeit pro Watt als die jeweils verglichenen Systeme. Gleichzeitig soll die End-to-End-Latenz zwischen 1,7 und 3,6-mal niedriger liegen.

Getestet wurden:

- GPT-OSS 120B
- DeepSeek R1 670B
- Kimi K2.5 1T

Damit beschränkt sich OpenAI bewusst nicht auf ein eigenes Modell. Jalapeño soll auch zeigen, dass die Architektur mit unterschiedlichen Modellfamilien funktioniert.

## OpenAI Jalapeño gegen Nvidia GB200 und GB300

Besonders interessant sind die Vergleiche mit aktueller [Nvidia](https://oliverjessner.at/category/nvidia/)-Hardware.

Beim GPT-OSS-120B-Test wurde Jalapeño mit einem Nvidia-GB200-System verglichen. OpenAI gibt einen Spitzenwert von 85.448 Mixed Tokens pro Sekunde und Kilowatt an. Das Vergleichssystem mit GB200 kommt auf 44.960.

Damit liegt Jalapeño in dieser Messung ungefähr beim 1,9-Fachen der Leistung pro Kilowatt.

Auch die gemessene End-to-End-Latenz fällt niedriger aus:

- Jalapeño: 1,03 Sekunden
- Nvidia GB200: 1,80 Sekunden

Noch deutlicher wird der Unterschied bei der minimalen Zeit zwischen zwei erzeugten Tokens, häufig als Time Between Tokens oder TBT bezeichnet.

Hier nennt OpenAI:

- Jalapeño: 0,69 Millisekunden
- Nvidia GB200: 1,87 Millisekunden

Das entspricht ungefähr 1.459 Tokens pro Sekunde und Nutzer bei Jalapeño gegenüber 535 Tokens beim Vergleichssystem.

## Bei DeepSeek R1 fällt der Latenzunterschied noch größer aus

Für DeepSeek R1 670B vergleicht OpenAI Jalapeño mit Nvidia GB300.

Beim maximalen Durchsatz pro Kilowatt liegt Jalapeño laut den veröffentlichten Ergebnissen rund 1,7-mal vorne:

- Jalapeño: 19.641 Mixed Tokens pro Sekunde und Kilowatt
- Nvidia GB300: 11.781

Interessanter ist erneut die Latenz.

OpenAI misst für eine vollständige Anfrage:

- Jalapeño: 1,65 Sekunden
- Nvidia GB300: 5,99 Sekunden

Damit liegt die End-to-End-Latenz in diesem Test um etwa den Faktor 3,6 auseinander.

Bei der minimalen TBT nennt OpenAI 1,43 Millisekunden für Jalapeño und 5,90 Millisekunden für GB300.

Für interaktive Anwendungen kann genau dieser Bereich entscheidend sein. Ein einzelner Unterschied von einigen Millisekunden fällt beim Lesen einer Antwort kaum auf. Bei Agenten, die nacheinander zahlreiche Modellaufrufe durchführen, können sich solche Verzögerungen jedoch addieren.

## Auch Kimi K2.5 mit einer Billion Parametern läuft auf Jalapeño

Der dritte öffentliche Test verwendet Kimi K2.5 1T. Das Modell besitzt rund eine Billion Parameter und gehört damit zu den größten Modellen im Benchmark.

Auch hier wurde gegen Nvidia GB300 verglichen.

Beim maximalen Durchsatz pro Kilowatt erreicht Jalapeño laut OpenAI ungefähr den Faktor 1,5. Bei der End-to-End-Latenz beträgt der Unterschied rund Faktor 3,4.

Gemessen wurden:

- Jalapeño: 1,56 Sekunden
- Nvidia GB300: 5,31 Sekunden

Die minimale TBT liegt bei 1,44 gegenüber 5,48 Millisekunden.

Dass Jalapeño auch bei einem Modell dieser Größenordnung funktioniert, ist für OpenAI besonders relevant. Das Unternehmen argumentiert, dass die Vorteile der Architektur bei größeren und anspruchsvolleren Workloads eher zunehmen könnten.

Für diese Aussage gibt es allerdings bisher hauptsächlich interne Messungen von OpenAI.

## Warum Leistung pro Watt wichtiger wird

Bei KI-Chips wird häufig über die maximale Rechenleistung gesprochen. Für Betreiber großer Rechenzentren ist diese Kennzahl allein jedoch nur begrenzt hilfreich.

Ein Rechenzentrum besitzt nicht unbegrenzt Strom.

Wenn ein Chip pro Kilowatt mehr Anfragen beantworten kann, lassen sich mit derselben elektrischen Infrastruktur mehr Nutzer bedienen. Deshalb betrachtet OpenAI in seinen Benchmarks vor allem den Durchsatz pro Leistungseinheit.

Jalapeño besitzt eine angegebene Leistungsaufnahme von 700 Watt. OpenAI zufolge lag der dauerhaft gemessene Verbrauch bei den getesteten Workloads allerdings bei höchstens 550 Watt.

Zum Vergleich werden in den Benchmarktabellen für Nvidia GB200 1.200 Watt und für GB300 1.400 Watt als Package Power angesetzt.

Für die eigentliche Berechnung normalisierte OpenAI die Resultate allerdings anhand der veröffentlichten Leistungswerte der jeweiligen Beschleuniger.

Das ist ein wichtiges Detail. Die Zahlen zeigen nicht einfach, dass ein einzelner Jalapeño-Chip pauschal schneller als ein einzelner Nvidia-Chip ist. Verglichen wird das Verhältnis aus Leistung, Durchsatz und Energieverbrauch bei bestimmten Betriebsbedingungen.

## Prefill und Decode stellen unterschiedliche Anforderungen

Die Architektur eines modernen LLM-Inferenzsystems muss zwei sehr unterschiedliche Aufgaben effizient lösen.

Beim sogenannten Prefill verarbeitet das Modell zunächst den Prompt und den vorhandenen Kontext. Diese Phase benötigt vor allem Rechenleistung.

Danach folgt das Decode. Hier erzeugt das Modell Schritt für Schritt neue Tokens. Dabei wird unter anderem der Zugriff auf den Speicher zum Flaschenhals.

Zusätzlich müssen Daten zwischen Recheneinheiten und Chips übertragen werden. Genau diese Transfers können dazu führen, dass leistungsfähige Recheneinheiten auf Daten warten.

OpenAI entwickelte Jalapeño deshalb als zusammenhängendes System aus:

- Recheneinheiten
- Speicher
- Netzwerk
- Software
- Scheduling
- Rack-Infrastruktur

Unter anderem soll der für die Generierung wichtige KV-Cache möglichst lokal gehalten werden können. Weniger Datenbewegungen bedeuten im Idealfall weniger Wartezeit und einen geringeren Energieverbrauch.

Das Prinzip dahinter ist nicht neu. Interessant ist vielmehr, wie konsequent OpenAI Hardware und Modellbetrieb gemeinsam entwickelt.

## Jalapeño ist ein ASIC statt einer klassischen GPU

Nvidia-GPUs sind sehr flexibel. Sie werden für Training, Inferenz, wissenschaftliches Rechnen und zahlreiche weitere Aufgaben verwendet.

Jalapeño verfolgt einen anderen Ansatz.

Der Chip ist ein ASIC, also ein Application-Specific Integrated Circuit. Er wurde für einen wesentlich enger definierten Einsatzzweck entwickelt: moderne Sprachmodelle effizient auszuführen.

Diese Spezialisierung kann Vorteile bringen. OpenAI kennt die eigenen Modelle, Serving-Systeme und Nutzungsmuster sehr genau und kann die Hardware entsprechend auslegen.

Gleichzeitig entsteht damit eine stärkere Abhängigkeit zwischen Hardware und Software.

Neue Modellarchitekturen benötigen weiterhin angepasste Kernel und Optimierungen. Ein spezialisierter Chip bleibt nur dann nützlich, wenn sein Software-Stack mit der Entwicklung der Modelle Schritt halten kann.

## OpenAI hat KI für die Entwicklung des KI-Chips eingesetzt

Ein weiterer interessanter Aspekt von Jalapeño betrifft die Entwicklung selbst.

OpenAI gibt an, von der ersten Entwicklung bis zum Tape-out nur neun Monate benötigt zu haben. Modelle des Unternehmens wurden dabei unter anderem eingesetzt, um Implementierungen zu untersuchen, Schaltungen zu optimieren und Entwicklungs- sowie Verifikationsschleifen zu verkürzen.

Noch interessanter ist der Softwarebereich.

Jalapeño wurde laut OpenAI bewusst so entworfen, dass seine Programmierung möglichst vorhersehbar bleibt. Entwickler definieren lokale Tensoren, Kommunikation und Synchronisation. Anschließend kann ein Modell versuchen, Berechnungen möglichst effizient auf die vorhandene Hardware zu verteilen.

Mit Codex und GPT-Astra habe das Team drei Open-Weight-Modelle innerhalb von zwei Monaten auf Jalapeño optimiert, obwohl diese ursprünglich nicht Teil des Produktionsplans gewesen seien.

Bei ausgewählten Attention- und Mixture-of-Experts-Blöcken von GPT-OSS waren automatisch erzeugte Implementierungen laut OpenAI zwischen 1,5 und 1,8-mal schneller als zuvor von menschlichen Experten geschriebene Varianten.

Diese Werte gelten ausdrücklich nur für bestimmte Kernel und nicht für das gesamte Modell.

Trotzdem ist der Ansatz bemerkenswert. [KI](https://oliverjessner.at/category/KI/) optimiert hier nicht nur Anwendungen, sondern zunehmend die Infrastruktur, auf der spätere KI-Systeme selbst ausgeführt werden.

## Wie unabhängig sind die Jalapeño-Benchmarks?

Bei Herstellerbenchmarks lohnt sich grundsätzlich ein genauer Blick auf die Testbedingungen.

OpenAI verwendet mit InferenceX einen öffentlich dokumentierten Benchmark von SemiAnalysis. Das Unternehmen lud SemiAnalysis nach eigenen Angaben außerdem in seine Labore ein, damit die Hardware begutachtet und mit der InferenceX-Suite getestet werden konnte.

SemiAnalysis kommt zu einer ähnlich positiven Einschätzung und bezeichnet Jalapeño als ungewöhnlich konkurrenzfähigen Chip der ersten Generation.

Trotzdem ist die Hardware noch kein frei verfügbares Produkt, das beliebige Labore kaufen und unter unterschiedlichen Bedingungen testen können.

Auch die Wahl des Betriebspunktes spielt bei Inferenz eine große Rolle. Maximale Tokenrate, niedrige Latenz und maximaler Gesamtdurchsatz sind unterschiedliche Ziele.

Besonders große Faktoren wie der von OpenAI genannte mehr als 100-fache Durchsatz bei einer bestimmten vorherigen TBT sollten deshalb nicht als Aussage verstanden werden, Jalapeño sei generell hundertmal schneller als Nvidia.

Hier werden konkrete Punkte auf der jeweiligen Performance-Kurve miteinander verglichen.

Die wesentlich belastbarere Aussage ist derzeit: In den veröffentlichten InferenceX-Messungen erreicht Jalapeño bei mehreren großen Sprachmodellen eine ungewöhnlich gute Kombination aus niedriger Latenz und hohem Durchsatz pro Watt.

## OpenAI baut einen eigenen Full-Stack für KI

Strategisch ist Jalapeño möglicherweise wichtiger als einzelne Benchmarkwerte.

OpenAI kontrolliert inzwischen immer mehr Ebenen seiner technischen Infrastruktur:

- Modelle
- Inferenzsoftware
- Kernel
- Scheduling
- Netzwerkarchitektur
- Chips
- Rack-Systeme
- Anwendungen wie ChatGPT und Codex

Damit nähert sich OpenAI einem Modell, das Unternehmen wie Apple oder Google in anderen Bereichen bereits verfolgen. Hardware und Software werden nicht unabhängig voneinander optimiert, sondern als zusammenhängendes System betrachtet.

Für OpenAI geht es dabei vor allem um die Kosten der Inferenz.

Je mehr Nutzer ChatGPT, APIs und autonome Agenten verwenden, desto größer wird der laufende Rechenaufwand. Ein effizienterer Chip kann deshalb direkten Einfluss darauf haben, wie teuer ein einzelner Modellaufruf für OpenAI ist.

Das Unternehmen spricht selbst von einer besseren "operating leverage": Die Menge der bereitgestellten KI-Leistung und damit mögliche Umsätze sollen schneller wachsen können als die dafür notwendigen Infrastrukturkosten.

## Jalapeño ersetzt Nvidia vorerst nicht

Aus den Benchmarkwerten lässt sich trotzdem kein unmittelbar bevorstehendes Ende von Nvidia bei OpenAI ableiten.

OpenAI erklärt ausdrücklich, weiterhin Beschleuniger von Nvidia und anderen Partnern in großem Umfang einsetzen zu wollen.

Das ist schon deshalb notwendig, weil Jalapeño auf Inferenz ausgerichtet ist. Für das Training großer Modelle bleiben andere Beschleuniger wichtig.

Außerdem benötigt OpenAI schlicht enorme Mengen an Rechenleistung. Eigene ASICs können einen Teil dieser Nachfrage abdecken, ohne sämtliche anderen Plattformen ersetzen zu müssen.

Jalapeño ist deshalb eher eine zusätzliche Infrastrukturplattform als ein vollständiger Ersatz für GPUs.

## Wann wird OpenAI Jalapeño einsetzen?

OpenAI plant, Jalapeño bis Ende 2026 erstmals innerhalb der eigenen Compute-Infrastruktur einzusetzen.

Dabei handelt es sich nicht um ein einzelnes Chipprojekt.

Eine zweite Generation befindet sich laut OpenAI bereits weit in der Entwicklung. Eine dritte Generation wird ebenfalls vorbereitet.

Zusammen mit Broadcom verfolgt OpenAI eine mehrjährige Infrastrukturstrategie. Bereits 2025 kündigten beide Unternehmen eine Zusammenarbeit für bis zu zehn Gigawatt OpenAI-designter Beschleuniger und entsprechender Netzwerksysteme an.

Jalapeño ist damit vor allem der erste konkrete Beleg dafür, dass diese Strategie technisch funktioniert.

## Warum Jalapeño interessanter als ein weiterer schneller KI-Chip ist

Ob Jalapeño Nvidia dauerhaft bei Leistung oder Effizienz übertreffen kann, lässt sich nach den ersten Benchmarks noch nicht beurteilen. Nvidia entwickelt seine Plattform ebenfalls schnell weiter und kann Hardware, CUDA, Netzwerke und komplette Rack-Systeme gemeinsam optimieren.

Interessant ist deshalb weniger die Frage, welcher Chip einen einzelnen Benchmark gewinnt.

Jalapeño zeigt vielmehr, wie sich der Markt für KI-Infrastruktur verändert.

Die Unternehmen mit den größten Modell-Workloads beginnen, ihre Hardware immer stärker an genau diese Workloads anzupassen. Google macht dies seit Jahren mit TPUs. Amazon entwickelt Trainium und Inferentia. Auch Microsoft arbeitet an eigenen Beschleunigern.

Nun hat OpenAI erstmals einen eigenen funktionierenden Inferenzchip mit öffentlich nachvollziehbaren Performance-Messungen.

Sollten sich die bisherigen Werte beim großflächigen Betrieb bestätigen, könnte das für OpenAI vor allem einen Vorteil bringen, der für Nutzer kaum sichtbar ist: mehr verfügbare Rechenleistung aus derselben Menge an Strom und Infrastruktur.

Und genau das dürfte bei der nächsten Phase des KI-Ausbaus mindestens so wichtig werden wie die maximale Rechenleistung eines einzelnen Chips.

## Quellen

- [OpenAI: Jalapeño’s first results show industry-leading speed and efficiency in AI inference](https://openai.com/index/jalapeno-first-results/)
- [OpenAI: OpenAI and Broadcom unveil LLM-optimized inference chip](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)
- [SemiAnalysis: OpenAI Jalapeño: Better Than Nvidia Blackwell](https://newsletter.semianalysis.com/p/openai-jalapeno-better-than-nvidia)
