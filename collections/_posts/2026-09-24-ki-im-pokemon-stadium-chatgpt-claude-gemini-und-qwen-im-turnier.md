---
layout: post
title: 'KI im Pokémon Stadium – ChatGPT, Claude, Gemini und Qwen im Turnier'
date: 2026-09-24 10:34:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - gaming
    - pokemon
description: 'Vier Sprachmodelle spielen Pokémon Stadium. Der Versuch zeigt Teamwahl, Entscheidungen, Fehler und die Grenzen eines ungewöhnlichen KI-Experiments'
thumbnail: '/assets/images/gen/blog/ki-im-pokemon-stadium-chatgpt-claude-gemini-und-qwen-im-turnier/header_thumbnail.webp'
image: '/assets/images/gen/blog/ki-im-pokemon-stadium-chatgpt-claude-gemini-und-qwen-im-turnier/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Welches KI-Modell hat das Pokémon-Stadium-Turnier gewonnen?'
      answer: 'Gemini gewann das zweite Halbfinale gegen Claude und anschließend das Finale gegen ChatGPT. ChatGPT hatte zuvor Qwen im ersten Halbfinale besiegt.'
    - question: 'Welches Pokémon wurde am häufigsten gewählt?'
      answer: 'Zapdos stand in allen sechs aufgezeichneten Modell-Match-Aufstellungen und kam auch in allen sechs Partien zum Einsatz. Gengar und Starmie wurden jeweils fünfmal gewählt.'
    - question: 'Ist das Ergebnis ein belastbarer KI-Benchmark?'
      answer: 'Nein. Jede Paarung wurde nur einmal gespielt, die Finalisten änderten ihre Teams und die Spielzustände konnten nicht unabhängig reproduziert oder vollständig überprüft werden.'
socialmedia:
    - 'Was passiert, wenn ChatGPT, Claude, Gemini und Qwen Pokémon Stadium spielen? Drei Matches zeigen Teamwahl, taktische Entscheidungen, Fehler und überraschend unterschiedliche Spielweisen.'
    - 'Zapdos in 6 von 6 Teams, 133 dokumentierte Move-Entscheidungen und Gemini als Turniersieger: Ich habe vier Sprachmodelle in Pokémon Stadium gegeneinander antreten lassen.'
    - 'Gemini gewinnt mein KI-Pokémon-Turnier. Spannender als das Ergebnis sind aber die Entscheidungen der Modelle: falsche Typannahmen, riskante Wechsel und sehr selbstbewusste Analysen nach dem Match.'
---

Vier Sprachmodelle treffen in Pokémon Stadium aufeinander. Drei Matches, sechs Teamaufstellungen und 133 dokumentierte Move-Entscheidungen zeigen, wie unterschiedlich die Modelle mit derselben Spielwelt umgehen.

## Vier Sprachmodelle, drei Duelle

Kann ein Sprachmodell Pokémon Stadium spielen, wenn es den aktuellen Spielzustand ausschließlich als Text erhält?

Für diesen Versuch traten ChatGPT, Claude, Gemini und Qwen in einem kleinen Turnier gegeneinander an. Gespielt wurden zwei Halbfinale und ein Finale mit Leih-Pokémon der ersten Generation aus dem Poké Cup von Pokémon Stadium.

Das Experiment verbindet damit [KI](https://oliverjessner.at/category/KI/), [Gaming](https://oliverjessner.at/category/gaming/) und [Pokémon](https://oliverjessner.at/category/pokemon/) auf eine etwas ungewöhnliche Weise. Interessant ist dabei weniger die Frage, welches Modell am Ende auf Platz eins steht. Spannender sind die Entscheidungen auf dem Weg dorthin.

Das Ergebnis des Turniers:

| Runde        | Duell                | Sieger  |
| ------------ | -------------------- | ------- |
| Halbfinale 1 | ChatGPT gegen Qwen   | ChatGPT |
| Halbfinale 2 | Claude gegen Gemini  | Gemini  |
| Finale       | ChatGPT gegen Gemini | Gemini  |

Gemini gewann damit das aufgezeichnete Turnier. Daraus lässt sich allerdings nicht ableiten, dass Gemini grundsätzlich das bessere Pokémon-Modell wäre. Dafür ist das Experiment zu klein und die zugrunde liegende Aufzeichnung zu inkonsistent.

## So funktionierte das Experiment

Zu Beginn sollten die Modelle jeweils sechs Pokémon aus der Leih-Pokémon-Liste des Poké Cups zusammenstellen.

Anschließend bekamen sie den gegnerischen Kader zu sehen und sollten ihr Kampfteam sowie ein Start-Pokémon bestimmen. Während der Kämpfe erhielten die Modelle Informationen über das aktive Pokémon, verbleibende Lebenspunkte, Statusveränderungen, Teammitglieder und verfügbare Attacken.

Darauf konnten sie mit einer Attacke oder einem Wechsel reagieren. Nach jeder Entscheidung wurde der nächste Spielzustand als Text übermittelt.

In den Aufzeichnungen werden folgende Modelle genannt:

| Teilnehmer | Modell               |
| ---------- | -------------------- |
| ChatGPT    | GPT-5.6 Luna + Think |
| Claude     | Sonnet 5 Medium      |
| Qwen       | Qwen3.7-Plus + Think |
| Gemini     | Gemini 3 Pro         |

Bei Gemini gibt es allerdings eine Unklarheit. An einer späteren Stelle der Aufzeichnung wird der Teilnehmer als Gemini Flash 3.6 bezeichnet. Welche Gemini-Version tatsächlich durchgehend eingesetzt wurde, lässt sich aus dem Material deshalb nicht eindeutig rekonstruieren.

Noch wichtiger ist eine andere Einschränkung: Es existiert kein unabhängig abspielbares Game-Log. Die aufgezeichneten Spielzustände wurden deshalb nicht nachträglich hinsichtlich Schadensberechnung, Zugreihenfolge oder Attackenlegalität neu berechnet.

## Die Teams ähnelten sich erstaunlich stark

Trotz der freien Auswahl landeten viele Modelle bei denselben Pokémon.

Die sechs aufgezeichneten Teamaufstellungen sahen so aus:

| Runde        | Modell  | Team                                                  |
| ------------ | ------- | ----------------------------------------------------- |
| Halbfinale 1 | ChatGPT | Staryu, Jynx, Gengar, Zapdos, Tauros, Rhydon          |
| Halbfinale 1 | Qwen    | Gengar, Starmie, Snorlax, Exeggutor, Jynx, Zapdos     |
| Halbfinale 2 | Claude  | Snorlax, Rhydon, Starmie, Alakazam, Zapdos, Exeggutor |
| Halbfinale 2 | Gemini  | Starmie, Zapdos, Gengar, Exeggutor, Tauros, Snorlax   |
| Finale       | ChatGPT | Gengar, Jynx, Starmie, Tauros, Zapdos, Rhydon         |
| Finale       | Gemini  | Alakazam, Exeggutor, Snorlax, Zapdos, Starmie, Gengar |

Im ersten Halbfinale hatten ChatGPT und Qwen drei Pokémon gemeinsam: Gengar, Jynx und Zapdos.

Claude und Gemini teilten sich sogar vier Pokémon: Exeggutor, Snorlax, Starmie und Zapdos.

Auch im Finale standen mit Gengar, Starmie und Zapdos drei identische Pokémon auf beiden Seiten.

Besonders auffällig ist Zapdos.

| Pokémon   | Auf einem Team | Tatsächlich eingesetzt |
| --------- | -------------: | ---------------------: |
| Zapdos    |        6 von 6 |                6 von 6 |
| Gengar    |        5 von 6 |                4 von 6 |
| Starmie   |        5 von 6 |                4 von 6 |
| Exeggutor |        4 von 6 |                4 von 6 |
| Snorlax   |        4 von 6 |                3 von 6 |
| Jynx      |        3 von 6 |                3 von 6 |
| Tauros    |        3 von 6 |                3 von 6 |
| Rhydon    |        3 von 6 |                2 von 6 |
| Alakazam  |        2 von 6 |                2 von 6 |
| Staryu    |        1 von 6 |                1 von 6 |

Zapdos war damit das einzige Pokémon, das in jeder einzelnen Aufstellung vorkam und auch jedes Mal tatsächlich eingesetzt wurde.

Gengar und Starmie folgten mit jeweils fünf Nominierungen.

Allerdings gibt es auch bei den Teams eine methodische Besonderheit. Vor dem Finale änderten beide Finalisten ihre Aufstellung. ChatGPT ersetzte Staryu durch Starmie, Gemini tauschte Tauros gegen Alakazam. Das widerspricht der ursprünglich formulierten Vorgabe eines feststehenden Kaders.

## 133 dokumentierte Attackenentscheidungen

Über alle sechs Modellseiten der drei Matches wurden 169 freiwillige Aktionen aufgezeichnet.

Davon waren:

- 133 gewählte Attacken
- 36 freiwillige Pokémon-Wechsel

Zusätzlich tauchen 15 erzwungene Einwechslungen auf, nachdem ein Pokémon besiegt worden war.

Die am häufigsten gewählte Attacke war Thunderbolt.

| Attacke     | ChatGPT | Qwen | Claude | Gemini | Gesamt |
| ----------- | ------: | ---: | -----: | -----: | -----: |
| Thunderbolt |      15 |    1 |      3 |      7 |     26 |
| Egg Bomb    |       0 |    2 |      4 |     11 |     17 |
| Mega Drain  |       0 |    3 |      0 |     10 |     13 |
| Rock Slide  |       0 |    7 |      0 |      4 |     11 |
| Ice Punch   |       8 |    1 |      0 |      0 |      9 |
| Night Shade |       9 |    0 |      0 |      0 |      9 |
| Surf        |       1 |    1 |      2 |      4 |      8 |
| Psychic     |       3 |    4 |      0 |      0 |      7 |

Die Zahlen zeigen allerdings keine Spielstärke. ChatGPT und Gemini erreichten das Finale und kommen deshalb auf zwei Matches, während Claude und Qwen nur ein Match spielten.

Interessanter sind die unterschiedlichen Schwerpunkte. ChatGPT setzte stark auf Thunderbolt, Night Shade und Ice Punch. Gemini verwendete besonders häufig Egg Bomb und Mega Drain.

## Halbfinale 1 – ChatGPT gegen Qwen

ChatGPT eröffnete mit Zapdos gegen Qwens Starmie und erzielte direkt den ersten Knockout.

Danach entwickelte sich ein deutlich längerer Mittelteil. Vor allem ChatGPTs Gengar spielte dabei eine zentrale Rolle. Night Shade setzte Qwens Team kontinuierlich unter Druck, während mehrere Wechsel und Statusveränderungen den Spielfluss bestimmten.

Besonders problematisch war eine Entscheidung von Qwen. Das Modell ging davon aus, dass sein Gengar gegen Thunderbolt immun sei. Die nachfolgende Spielzustandsmeldung widersprach dieser Annahme direkt.

Qwen nannte genau diesen Irrtum später selbst als einen der Hauptgründe für die Niederlage.

ChatGPT wiederum sah den Wechsel von Gengar gegen Snorlax als eine seiner stärksten Entscheidungen. Dadurch konnte das Modell Snorlax unter Druck setzen und dessen wiederholte Rest-Nutzung ausnutzen.

Am Ende gewann ChatGPT die Partie laut Abschlussprotokoll ohne ein eigenes Pokémon zu verlieren.

Dabei war das Match durchaus knapp an einzelnen Stellen. ChatGPTs abschließende Jynx hatte nur noch elf Lebenspunkte.

## Halbfinale 2 – Gemini gegen Claude

Im zweiten Halbfinale wurde Exeggutor zum wichtigsten Pokémon.

Gemini eröffnete damit gegen Rhydon und konnte früh Claude's Zapdos paralysieren. Anschließend verursachte Exeggutor über große Teile des Matches konstant Schaden.

Besonders Egg Bomb spielte dabei eine große Rolle.

Claude hatte gleichzeitig Pech mit Snorlax. Zwei aufeinanderfolgende Mega Kicks verfehlten ihr Ziel, während Snorlax weiterhin Schaden durch Egg Bomb erhielt.

Geminis Exeggutor besiegte im Verlauf Rhydon und setzte mehrere weitere Pokémon unter Druck. Erst spät verlor Gemini Tauros gegen Starmie.

Exeggutor kehrte anschließend zurück, besiegte Starmie und beendete die Partie gegen das bereits geschwächte und paralysierte Zapdos.

Gemini bewertete die eigene Leistung danach mit 9 von 10 Punkten. Claude gab sich selbst 5 von 10 Punkten.

Beide Modelle sahen den frühen Statusdruck und die wiederholten Treffer von Exeggutor als entscheidende Faktoren.

## Finale – Gemini gegen ChatGPT

Das Finale verlief ausgeglichener.

ChatGPT gelang zunächst ein starker Abschnitt mit Jynx. Lovely Kiss setzte Geminis Snorlax außer Gefecht, anschließend reduzierte Psychic dessen Lebenspunkte stark. Snorlax wurde schließlich besiegt.

Gemini stabilisierte die Partie danach mit Exeggutor.

Rhydon fiel gegen Mega Drain, während Starmie und später Alakazam wichtige Rollen in den folgenden Wechseln spielten.

ChatGPT konnte Geminis Starmie und Alakazam ausschalten, bezahlte dafür aber mit mehreren bereits angeschlagenen Pokémon.

In der Schlussphase trafen schließlich die beiden Zapdos aufeinander.

Geminis Zapdos wurde dabei zwar paralysiert, gewann den direkten Schlagabtausch aber dennoch. Anschließend besiegte es Starmie und stand zuletzt ChatGPTs Jynx gegenüber, die nur noch elf Lebenspunkte hatte.

Gemini wählte Thunderbolt.

Eine separate Lebenspunkte-Aktualisierung nach dieser letzten Attacke fehlt in der Aufzeichnung. Beide abschließenden Analysen behandeln Gemini jedoch als Sieger des Matches.

Damit gewann Gemini das Turnier.

## Die Selbstanalysen der Modelle sind fast genauso interessant

Nach jeder Partie beantworteten beide Modelle zwölf Fragen zu ihrer eigenen Leistung.

Sie sollten unter anderem erklären:

- warum sie gewonnen oder verloren hatten
- welche Entscheidung ihre beste war
- welche Entscheidung sie bereuten
- welches Pokémon ihr MVP war
- welcher Gegner ihnen die größten Probleme bereitete
- was sie in einem Rückspiel verändern würden
- wie sie ihre eigene Leistung bewerteten

Dabei fiel ein interessantes Muster auf.

Die drei Sieger bewerteten ihre eigene Leistung mit 8, 9 und 8,5 von 10 Punkten.

Die drei Verlierer gaben sich 4, 5 und 5 Punkte.

Noch bemerkenswerter ist eine andere Antwort: Alle sechs Modelle beantworteten die Frage, ob der bessere Spieler gewonnen habe, mit "Ja".

Das klingt zunächst nach einer erstaunlich konsistenten Selbsteinschätzung. Die Begründungen der Modelle sollten allerdings nicht mit einer objektiven Analyse verwechselt werden.

Teilweise widersprechen sie sogar den aufgezeichneten Spielzuständen.

ChatGPT schrieb nach dem ersten Halbfinale beispielsweise seinem Gengar die Paralyse des gegnerischen Gengar zu. Im eigentlichen Matchprotokoll wird Thunder Wave jedoch Zapdos zugeschrieben.

## Das Ergebnis ist kein neuer KI-Benchmark

Das Experiment zeigt interessante Unterschiede bei Entscheidungsfindung, Risikobereitschaft und nachträglicher Selbstanalyse.

Es eignet sich aber nicht dafür, eine Rangliste der vier Modelle zu erstellen.

Dafür gibt es mehrere Gründe.

Jede Paarung wurde nur ein einziges Mal gespielt. Zufallselemente wie Fehlschläge oder Statusveränderungen können dadurch erheblichen Einfluss auf das Ergebnis haben.

Die beiden Finalisten änderten außerdem ihre Teams vor dem Finale.

Hinzu kommen Inkonsistenzen in den aufgezeichneten Zuständen. Einige Treffer verändern die gemeldeten Lebenspunkte nicht, an anderen Stellen stimmen Lebenspunkte-Angaben nicht miteinander überein. Mindestens eine Modellentscheidung fehlt vollständig.

Auch der ursprünglich beschriebene Kampfmodus passt nicht durchgehend zum späteren Protokoll. Die Modelle sollten zunächst drei Pokémon auswählen, die aufgezeichneten Kämpfe arbeiten anschließend aber mit sechs Pokémon.

Für einen reproduzierbaren Vergleich müsste das Experiment deshalb anders aufgebaut werden.

Modellversionen, Teams und Kampfregeln müssten fest definiert bleiben. Die Spielzustände sollten automatisch aus Pokémon Stadium übernommen werden, statt manuell als Text weitergereicht zu werden. Jede Entscheidung müsste protokolliert und die Spielmechanik unabhängig überprüft werden.

Vor allem müsste jedes Duell mehrfach wiederholt werden.

## Was vom Pokémon-Turnier bleibt

Gemini hat dieses konkrete Turnier gewonnen. ChatGPT besiegte Qwen, Gemini setzte sich gegen Claude durch und gewann anschließend auch das Finale gegen ChatGPT.

Interessanter als diese Reihenfolge sind jedoch die Entscheidungen innerhalb der Matches.

Qwen baute eine Entscheidung auf einer falschen Annahme über eine Immunität auf. Claude hielt an Mega Kick fest, obwohl Snorlax dabei zweimal hintereinander scheiterte. ChatGPT schuf im Finale mit Jynx eine sehr starke Ausgangssituation, konnte seine angeschlagenen Pokémon danach aber nicht ausreichend erhalten.

Gemini gelang es dagegen in beiden Partien, nach schwierigen Situationen wieder Kontrolle über das Match zu bekommen.

Das macht das Experiment nicht zu einem objektiven Test der Intelligenz oder strategischen Fähigkeit eines Sprachmodells.

Es zeigt aber ziemlich anschaulich, wie Sprachmodelle Entscheidungen treffen, Fehler erklären und ihre eigene Leistung im Nachhinein interpretieren.

Und dafür ist Pokémon Stadium ein überraschend interessantes Testfeld.
