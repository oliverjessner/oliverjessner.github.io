---
layout: post
title: 'Fünf Erkenntnisse aus 4.500 White-House-Erwähnungen und ihren Börsenreaktionen'
date: 2026-09-22 10:14:54 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - aktien
    - Politik
    - KI
    - Kolumne
    - Wirtschaft
    - nvidia
    - openai
    - meta
    - recherche
description: 'Was nach White-House-Erwähnungen mit Aktien passiert: fünf Muster zeigen, warum Tonfall und Börsenreaktion oft auseinanderliegen'
thumbnail: '/assets/images/gen/blog/fuenf-erkenntnisse-aus-4500-white-house-erwaehnungen-und-ihren-boersenreaktionen/header_thumbnail.webp'
image: '/assets/images/gen/blog/fuenf-erkenntnisse-aus-4500-white-house-erwaehnungen-und-ihren-boersenreaktionen/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Steigen Aktien nach positiven Erwähnungen durch Donald Trump?'
      answer: 'Nicht zwangsläufig. Die Analyse zeigt zahlreiche Fälle, in denen positiv formulierte Erwähnungen von einer späteren Underperformance gegenüber dem Benchmark begleitet wurden.'
    - question: 'Warum werden die Kursreaktionen bis zu fünf Handelstage nach einer Erwähnung untersucht?'
      answer: 'Einige Aktien reagieren unmittelbar, andere erst nach mehreren Handelstagen. Der Vergleich von EOD, T1, T3 und T5 macht diese unterschiedlichen Reaktionsmuster sichtbar.'
    - question: 'Beweist die Analyse, dass politische Aussagen die Kursbewegungen verursacht haben?'
      answer: 'Nein. Die Daten zeigen zeitliche Zusammenhänge und auffällige Abweichungen vom Benchmark. Gerade über mehrere Handelstage können zusätzliche Unternehmens-, Branchen- und Marktnachrichten den Kurs beeinflussen.'
socialmedia:
    - 'Eine positive Erwähnung aus dem Weißen Haus und die Aktie steigt? So einfach ist es nicht. Ich habe fünf Muster in den Daten untersucht: von Hype-Reversals bis zu Aktien, die erst Tage später auffällig werden.'
    - 'Micron lag am Event-Tag 0,95 Prozentpunkte hinter dem Nasdaq. Fünf Handelstage später waren es +36,06 Prozentpunkte. Warum der Zeitpunkt bei politischen Börsenreaktionen entscheidend ist.'
    - 'Politisches Lob ist kein verlässliches Börsensignal. In meinen Daten finden sich positive Erwähnungen mit zweistelliger Underperformance und negative Erwähnungen mit deutlicher Outperformance.'
companion_article:
    from: golem.json
    id: 49
---

Wenn ein Unternehmen in einem offiziellen White-House-Stream positiv erwähnt wird, müsste die Aktie danach steigen. Negative Aussagen müssten entsprechend belasten.

So einfach ist es nicht.

Für meine Analyse bei Golem habe ich mehr als 400 offizielle White-House-Streams und rund 4.500 Nennungen von Unternehmen untersucht. Dabei habe ich die Kursentwicklung nicht nur am jeweiligen Event-Tag betrachtet, sondern auch nach einem, drei und fünf Handelstagen.

Gerade dieser längere Blick verändert das Bild deutlich.

Einige [Aktien](https://oliverjessner.at/category/aktien/) reagieren sofort. Andere bewegen sich am ersten Tag praktisch überhaupt nicht und gehören fünf Handelstage später zu den auffälligsten Gewinnern. Wieder andere steigen zunächst deutlich und drehen wenige Tage später ins Minus.

Noch interessanter: Auch die Tonalität der politischen Aussage sagt erstaunlich wenig darüber aus, in welche Richtung sich die Aktie anschließend entwickelt.

Für die folgenden Auswertungen verwende ich deshalb vor allem den marktadjustierten Return. Dabei wird die Entwicklung der Aktie mit der Entwicklung des hinterlegten Vergleichsindex, in diesen Fällen überwiegend dem Nasdaq Composite, verglichen.

Ein Wert von `+5 Prozentpunkten` bedeutet also nicht automatisch, dass die Aktie um fünf Prozent gestiegen ist. Sie hat sich fünf Prozentpunkte besser entwickelt als der Benchmark.

## 1. Die extremsten Reaktionen werden erst über mehrere Tage sichtbar

Der erste auffällige Befund ist die Größe einzelner Ausschläge.

Schon am Event-Tag gibt es deutliche Abweichungen gegenüber dem Markt. Über drei oder fünf Handelstage werden die Unterschiede teilweise noch erheblich größer.

Einige ausgewählte Extremfälle:

| Zeitraum | Unternehmen       | Tonalität |    Aktie | Benchmark | Relativer Return |
| -------- | ----------------- | --------- | -------: | --------: | ---------------: |
| EOD      | Trilogy Metals    | positiv   | +37,29 % |   -0,82 % |    **+38,10 PP** |
| EOD      | Oracle            | positiv   |  -7,95 % |    0,00 % |     **-7,95 PP** |
| T1       | Micron Technology | positiv   | +19,45 % |   +0,43 % |    **+19,02 PP** |
| T1       | Eli Lilly         | positiv   | -13,31 % |   +1,16 % |    **-14,47 PP** |
| T3       | Dell Technologies | positiv   | +28,73 % |   -1,18 % |    **+29,91 PP** |
| T3       | Whirlpool         | positiv   | -21,05 % |   +1,27 % |    **-22,32 PP** |
| T5       | Micron Technology | positiv   | +38,06 % |   +2,01 % |    **+36,06 PP** |
| T5       | Whirlpool         | positiv   | -24,52 % |   +1,41 % |    **-25,93 PP** |

Dabei ist vor allem eines wichtig: Diese Tabelle beweist nicht, dass die jeweilige politische Erwähnung den Kursausschlag verursacht hat.

Sie zeigt zunächst nur, bei welchen Kombinationen aus Event und Unternehmen anschließend besonders starke Abweichungen vom Markt auftraten.

Genau deshalb sind solche Ranglisten vor allem ein Fallfinder.

Ein Ausschlag von 20 oder 30 Prozentpunkten ist ein guter Grund, sich das konkrete Ereignis genauer anzusehen. Er ist aber noch kein Nachweis für politische Kausalität.

Interessanter als die reine Größe der Ausschläge ist ohnehin die Frage, was zwischen der Aussage und dem Markt passiert.

## 2. Positives politisches Sentiment bedeutet nicht positive Börsenreaktion

Eine der naheliegendsten Hypothesen war, dass die Tonalität einer Erwähnung zumindest grob zur anschließenden Marktreaktion passen müsste.

Lob wäre positiv. Kritik negativ.

Auch das funktioniert erstaunlich schlecht.

Besonders sichtbar wird das bei den stärksten Widersprüchen zwischen sprachlichem Sentiment und marktadjustiertem Return.

| Unternehmen            | Zeitraum | Sentiment | Sentiment-Score | Relativer Return |
| ---------------------- | -------- | --------- | --------------: | ---------------: |
| Whirlpool              | T5       | positiv   |            +0,8 |    **-25,93 PP** |
| Robinhood              | T5       | positiv   |            +0,9 |    **-19,06 PP** |
| Tesla                  | T5       | positiv   |            +0,9 |    **-18,22 PP** |
| Oracle                 | T5       | positiv   |            +0,7 |    **-11,49 PP** |
| Tesla                  | T5       | negativ   |            -0,6 |    **+15,20 PP** |
| Mattel                 | T5       | negativ   |            -0,5 |    **+10,91 PP** |
| Warner Bros. Discovery | T5       | negativ   |            -0,7 |    **+10,59 PP** |
| Meta                   | T5       | negativ   |            -0,6 |    **+10,58 PP** |

Whirlpool ist eines der deutlichsten Beispiele. Die Erwähnung wurde vom Sentiment-Modell klar positiv bewertet. Fünf Handelstage später lag die Aktie trotzdem fast 26 Prozentpunkte hinter dem Vergleichsindex.

Bei Tesla findet sich auch die umgekehrte Konstellation: Eine negativ eingeordnete Erwähnung wurde von einer Outperformance von mehr als 15 Prozentpunkten innerhalb von fünf Handelstagen begleitet.

Das zeigt vor allem die Grenze klassischer Sentiment-Analysen.

Ein Sprachmodell kann erkennen, ob ein Satz freundlich, kritisch oder neutral formuliert ist. Daraus folgt aber noch nicht seine ökonomische Bedeutung.

Ein Politiker kann ein Unternehmen loben und gleichzeitig Maßnahmen ankündigen, die dessen Kosten erhöhen. Umgekehrt kann scharfe Kritik vom Markt als irrelevant, bereits eingepreist oder sogar als weniger problematisch als erwartet bewertet werden.

Und natürlich können in den folgenden Tagen völlig andere Unternehmens- oder Branchennachrichten den Kurs dominieren.

Der Tonfall allein ist deshalb kein zuverlässiger Börsenindikator.

## 3. Der gewählte Zeitraum verändert die Geschichte

Wer nur den Event-Tag betrachtet, sieht einen anderen Markt als jemand, der fünf Handelstage wartet.

Das klingt banal, hat für Event-Analysen aber erhebliche Konsequenzen.

Einige der auffälligsten Fälle sahen am ersten Tag nahezu bedeutungslos aus:

| Unternehmen              | Event-Tag relativ |    T5 relativ |   Veränderung |
| ------------------------ | ----------------: | ------------: | ------------: |
| Micron Technology        |          -0,95 PP | **+36,06 PP** | **+37,01 PP** |
| Trump Media & Technology |          +0,05 PP | **+36,05 PP** | **+36,00 PP** |
| Intel                    |          -0,06 PP | **+32,08 PP** | **+32,14 PP** |
| Dell Technologies        |          +0,36 PP | **+19,21 PP** | **+18,85 PP** |
| Tesla                    |          -0,64 PP | **+12,83 PP** | **+13,47 PP** |

Micron ist dafür das extremste Beispiel.

Am Event-Tag lag die Aktie 0,95 Prozentpunkte hinter dem Nasdaq Composite. Wer die Analyse dort beendet hätte, hätte den Fall vermutlich als weitgehend unauffällig abgelegt.

Fünf Handelstage später lag Micron 36,06 Prozentpunkte vor dem Index.

Aus einem scheinbaren Non-Event war einer der stärksten positiven Fälle im gesamten Datensatz geworden.

Ähnlich sieht es bei Intel aus. In einem der Fälle lag die Aktie am Event-Tag 0,06 Prozentpunkte hinter dem Benchmark. Nach fünf Handelstagen betrug die relative Outperformance 32,08 Prozentpunkte.

Das bedeutet nicht automatisch, dass der Markt mehrere Tage brauchte, um eine Äußerung aus dem Weißen Haus zu verstehen.

Aber es zeigt, warum eine Analyse ausschließlich auf Basis des Schlusskurses am Event-Tag einen wesentlichen Teil der Dynamik übersehen kann.

Grundsätzlich entstehen mindestens sechs unterschiedliche Muster:

| Event-Tag | Nach fünf Tagen | Mögliches Muster              |
| --------- | --------------- | ----------------------------- |
| positiv   | positiv         | nachhaltige positive Reaktion |
| positiv   | negativ         | Reversal                      |
| neutral   | positiv         | verzögerter Gewinner          |
| neutral   | negativ         | verzögerter Verlierer         |
| negativ   | positiv         | Korrektur der Erstreaktion    |
| negativ   | negativ         | anhaltende negative Reaktion  |

Damit wird der Zeitpunkt selbst zu einer wichtigen analytischen Variable.

Die Frage ist nicht nur, **ob** sich eine Aktie nach einer politischen Erwähnung bewegt.

Die Frage ist auch, **wann**.

## 4. Manche positiven Erstreaktionen drehen innerhalb weniger Tage komplett

Besonders interessant sind Fälle, in denen der Markt zunächst positiv reagiert und sich diese Bewegung anschließend vollständig umkehrt.

Ich habe diese Gruppe als "Hype-Reversals" bezeichnet.

Die Filterlogik ist bewusst einfach: Am Event-Tag muss die Aktie mindestens zwei Prozentpunkte besser als der Benchmark abschneiden. Nach fünf Handelstagen muss sie relativ zum Markt im Minus liegen.

Das liefert einige deutliche Fälle:

| Unternehmen              | EOD relativ |    T5 relativ |     Umschwung |
| ------------------------ | ----------: | ------------: | ------------: |
| Tesla                    |    +2,00 PP | **-14,62 PP** | **-16,62 PP** |
| Fannie Mae               |    +2,33 PP | **-13,06 PP** | **-15,39 PP** |
| Peabody Energy           |    +2,18 PP | **-10,69 PP** | **-12,87 PP** |
| Nvidia                   |    +7,64 PP |  **-3,93 PP** | **-11,57 PP** |
| GlobalFoundries          |    +2,22 PP |  **-7,14 PP** |  **-9,37 PP** |
| Trump Media & Technology |    +5,35 PP |  **-3,35 PP** |  **-8,71 PP** |
| Paramount                |    +4,43 PP |  **-2,48 PP** |  **-6,90 PP** |

[Nvidia](https://oliverjessner.at/category/nvidia/) ist ein gutes Beispiel dafür, wie irreführend eine Momentaufnahme sein kann.

Nach einer Erwähnung rund um ein Dinner mit dem saudischen Kronprinzen lag Nvidia am Event-Tag 7,64 Prozentpunkte vor dem Markt. Fünf Handelstage später lag die Aktie 3,93 Prozentpunkte dahinter.

Der relative Umschwung betrug damit 11,57 Prozentpunkte.

Noch stärker fällt die Bewegung bei Tesla aus. Aus einer anfänglichen Outperformance von zwei Prozentpunkten wurde innerhalb von fünf Handelstagen eine Underperformance von 14,62 Prozentpunkten.

Solche Bewegungen können zu der Interpretation verleiten, dass eine politische Erwähnung zunächst einen kurzfristigen Aufmerksamkeitseffekt erzeugt und dieser anschließend wieder verschwindet.

Das ist eine mögliche Erklärung, aber nicht die einzige.

Gewinnmitnahmen, neue Unternehmensmeldungen, Analystenreaktionen, makroökonomische Daten oder eine Rotation innerhalb einer Branche können zwischen Event und T5 ebenfalls entscheidend sein.

Genau deshalb sind Reversals journalistisch besonders interessant. Sie markieren Fälle, bei denen die erste Reaktion offensichtlich nicht die ganze Geschichte erzählt.

## 5. Einige der größten Gewinner reagieren am ersten Tag fast gar nicht

Das Gegenstück zum Hype-Reversal ist für mich noch interessanter: der "Delayed Winner".

Dabei suche ich gezielt nach Aktien, die am Event-Tag relativ zum Markt kaum reagieren und fünf Handelstage später deutlich outperformen.

Einige der stärksten Fälle:

| Unternehmen              | EOD relativ |    T5 relativ | Verzögerte Stärke |
| ------------------------ | ----------: | ------------: | ----------------: |
| Micron Technology        |    -0,95 PP | **+36,06 PP** |     **+37,01 PP** |
| Trump Media & Technology |    +0,05 PP | **+36,05 PP** |     **+36,00 PP** |
| Intel                    |    -0,06 PP | **+32,08 PP** |     **+32,14 PP** |
| Dell Technologies        |    +0,36 PP | **+19,21 PP** |     **+18,85 PP** |
| Intel                    |    +0,93 PP | **+19,28 PP** |     **+18,35 PP** |
| Paramount                |    +0,43 PP | **+16,40 PP** |     **+15,98 PP** |
| Tesla                    |    -0,64 PP | **+12,83 PP** |     **+13,47 PP** |
| Deere & Co.              |    +0,02 PP | **+12,02 PP** |     **+11,99 PP** |
| Nokia                    |    +0,41 PP | **+11,91 PP** |     **+11,49 PP** |
| Amazon                   |    -0,60 PP | **+10,55 PP** |     **+11,14 PP** |

Das Spannende daran ist nicht nur die spätere Outperformance.

Es ist die Abwesenheit einer deutlichen Erstreaktion.

Bei Micron, Intel, Deere oder Trump Media hätte ein Screener am Event-Tag kaum Anlass geliefert, von einem ungewöhnlichen Marktimpuls zu sprechen. Erst der Blick auf die folgenden Handelstage macht die Fälle sichtbar.

Dafür gibt es mehrere plausible Erklärungen.

Eine Aussage kann erst später größere mediale Aufmerksamkeit erhalten. Investoren können Folgen aus der [Politik](https://oliverjessner.at/category/Politik/) zeitversetzt bewerten. Analysten können die Bedeutung eines Ereignisses erst am nächsten Tag aufgreifen. Gleichzeitig können völlig unabhängige Nachrichten erscheinen.

Mit jedem zusätzlichen Handelstag wird deshalb auch die Kausalitätsfrage schwieriger.

Bei einer unmittelbaren Kursbewegung wenige Minuten nach einer konkreten Aussage lässt sich ein Zusammenhang vergleichsweise gut untersuchen. Bei einer Outperformance fünf Tage später liegen bereits zahlreiche mögliche Störfaktoren dazwischen.

"Delayed Winner" bedeutet deshalb nicht: Das Weiße Haus hat diese Aktie fünf Tage später nach oben geschickt.

Es bedeutet: Am Tag des untersuchten Events war fast nichts zu sehen, wenige Handelstage später war die relative Kursbewegung außergewöhnlich.

Und genau diese Fälle sind gute Ausgangspunkte für eine zweite, qualitative Recherche.

## Was ich aus den Daten mitnehme

Die Analyse macht politische Kommunikation an der Börse nicht einfacher. Eigentlich macht sie das Bild komplizierter.

Genau das ist aber die interessanteste Erkenntnis.

Eine positive Erwähnung ist kein verlässliches Kaufsignal. Eine negative Erwähnung bedeutet nicht automatisch fallende Kurse. Die stärkste Bewegung muss nicht am Event-Tag stattfinden. Und selbst eine zunächst deutliche Reaktion kann wenige Tage später vollständig verschwunden sein.

Für mich ergeben sich daraus fünf zentrale Punkte:

1. **Einzelne White-House-Events gehen mit sehr großen relativen Kursbewegungen einher.**
2. **Die sprachliche Tonalität und die spätere Börsenreaktion können deutlich auseinanderliegen.**
3. **EOD, T1, T3 und T5 erzählen teilweise völlig unterschiedliche Geschichten.**
4. **Starke positive Erstreaktionen können sich innerhalb weniger Handelstage komplett umkehren.**
5. **Einige der stärksten Outperformer sind am Event-Tag zunächst nahezu unsichtbar.**

Die wichtigste methodische Einschränkung bleibt dabei bestehen: Eine zeitliche Nähe ist kein Beweis für Kausalität.

Gerade bei T3- und T5-Bewegungen steigt die Wahrscheinlichkeit erheblich, dass zusätzliche Nachrichten, Branchenbewegungen und allgemeine Marktfaktoren eine Rolle spielen.

Die Daten eignen sich deshalb weniger dafür, eine einfache Regel wie "politisches Lob lässt Aktien steigen" abzuleiten.

Sie eignen sich besser als Suchmaschine für ungewöhnliche Fälle.

Und genau dort beginnt die eigentlich interessante Recherche.
