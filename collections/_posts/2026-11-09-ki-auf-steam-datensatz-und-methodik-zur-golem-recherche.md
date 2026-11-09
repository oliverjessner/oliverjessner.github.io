---
layout: post
title: 'KI auf Steam: Daten und Methodik zu 2.803 Spielen'
date: 2026-11-09 00:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: article
categories:
    - KI
    - gaming
    - recherche
description: 'Alle Auswertungstabellen zu meiner Golem-Recherche über KI auf Steam: Einsatzbereiche, Werkzeuge, Genres, Preise und Reviews von 2.803 Spielen'
thumbnail: '/assets/images/gen/blog/ki-auf-steam-datensatz-und-methodik-zur-golem-recherche/header_thumbnail.webp'
image: '/assets/images/gen/blog/ki-auf-steam-datensatz-und-methodik-zur-golem-recherche/header.webp'
image_width: 1280
image_height: 720
image_alt: 'Datengrafik: Von 2.803 erfassten Steam-Spielen haben 1.168 eine KI-Offenlegung, entsprechend 41,67 Prozent'
companion_article:
    from: golem.json
    id: 54
faq:
    - question: 'Welche Daten zur Steam-KI-Recherche stehen hier?'
      answer: 'Der Artikel enthält die vollständigen aggregierten Auswertungstabellen: KI-Offenlegung, Preise, Reviews, Einsatzbereiche, genannte Werkzeuge und Genres einschließlich der 140 Genre-Kategorie-Kombinationen. Die Methodik und Bezugsgrößen stehen direkt bei den Tabellen.'
    - question: 'Bedeutet eine fehlende KI-Offenlegung, dass ein Spiel ohne KI entwickelt wurde?'
      answer: 'Nein. Erfasst wurde, ob sich auf der untersuchten Steam-Seite eine öffentliche KI-Offenlegung finden ließ. Daraus lässt sich weder KI-Freiheit noch der genaue Umfang eines KI-Einsatzes ableiten.'
    - question: 'Sind die Daten ein aktueller Überblick über den gesamten Steam-Katalog?'
      answer: 'Nein. Es handelt sich um eine begrenzte Stichprobe mit einem Erhebungsstand vom 31. August 2026. Preise, Bewertungen und Offenlegungen können sich inzwischen verändert haben.'
socialmedia:
    - 'Alle Auswertungstabellen zu meiner Golem-Recherche über KI auf Steam stehen jetzt direkt im Artikel: Einsatzbereiche, Werkzeuge, Genres, Preise und Reviews. Dazu die Methodik hinter den 41,67 Prozent KI-Offenlegungen.'
    - '1.168 von 2.803 untersuchten Steam-Spielen haben eine KI-Offenlegung. Ich veröffentliche die vollständige aggregierte Auswertung samt Methodik und den jeweiligen Bezugsgrößen.'
    - 'KI-Offenlegung, Preise und Reviews: Die Daten hinter meiner Steam-Recherche stehen als Tabellen im Artikel. Mit sämtlichen erkannten Werkzeugen, Genre-Auswertungen und den Grenzen der Stichprobe.'
news: false
pinned: false
ads: true
---

Für meine [Golem-Analyse „Wie viel AI Slop steckt in 2.803 Neuerscheinungen?“](https://www.golem.de/news/ki-spiele-auf-steam-wie-viel-ai-slop-steckt-in-2-803-neuerscheinungen-2610-214633.html) habe ich Steam-Spiele und ihre öffentlichen Angaben zum Einsatz generativer KI untersucht. Hier veröffentliche ich die vollständige aggregierte Auswertung als Tabellen, zusammen mit der Methodik und den Grenzen der Stichprobe.

Die Zahlen bilden den damaligen Erhebungsstand ab. Die folgenden Tabellen zeigen, wie häufig KI-Offenlegungen gefunden wurden, welche Einsatzbereiche und Werkzeuge darin vorkommen und wie sich Preise, Reviews und Genre-Zuordnungen verteilen.

## Was wurde untersucht?

Ausgangspunkt war eine Steam-Suche nach Neuerscheinungen mit einem Sprachfilter für Englisch und Deutsch. Der im Golem-Artikel beschriebene Auswahlzeitraum reicht vom **31. Juli bis zum 30. August 2026**. Das ist eine abgegrenzte Suchauswahl und keine Vollerhebung des Steam-Katalogs.

Die gespeicherte Suchliste enthält zunächst **2.807 Einträge**. Drei davon sind wiederholte AppIDs. Ein weiterer Eintrag enthält mehrere AppIDs in einem gemeinsamen Feld und wurde nicht als einzelnes Spiel übernommen. Übrig bleiben **2.803 eindeutige AppIDs** in der ausgewerteten Datenbank.

Zu diesen Spielen wurden Store-Metadaten, Review-Zusammenfassungen und die öffentlich sichtbaren KI-Offenlegungen erfasst. Der Erhebungsstand ist der **31. August 2026**; die gespeicherte Klassifizierung stammt vom **1. September 2026**. Store-Abfragen nutzten die Region Deutschland und die englische Sprache.

Die ergänzten API-Angaben zum Veröffentlichungsdatum stimmen nicht vollständig mit dem beschriebenen Suchzeitraum überein: **35 Spiele tragen dort den 30. Juli 2026**, weitere **159 den 31. Juli** und **2.596 ein Datum im August**. Bei **13 AppIDs fehlen API-Metadaten**; deren Store- und Reviewdaten bleiben enthalten. Die Auswertung bewahrt die ursprüngliche Suchauswahl und wurde nicht nachträglich anhand der API-Daten auf einen engeren Zeitraum gefiltert.

Preise, Reviews und Store-Texte können sich später verändern. Wer heute dieselbe Store-Seite aufruft, muss deshalb nicht dieselben Angaben vorfinden.

## Was die 41,67 Prozent bedeuten

Die grundlegende Auswertung unterscheidet danach, ob eine KI-Offenlegung gefunden wurde:

| Öffentliche KI-Offenlegung | Spiele | Anteil der Stichprobe |
| --- | ---: | ---: |
| Gefunden | 1.168 | 41,67 % |
| Nicht gefunden | 1.635 | 58,33 % |
| Insgesamt | 2.803 | 100 % |

Die zweite Gruppe sollte deshalb als **„ohne gefundene KI-Offenlegung“** bezeichnet werden. Eine fehlende Erklärung belegt nicht, dass während der Entwicklung keinerlei KI-Werkzeug verwendet wurde.

Auch ein vorhandener Hinweis beziffert nicht den KI-Anteil am fertigen Spiel. Er kann sich auf einzelne Illustrationen, Übersetzungen, Musik oder andere Bestandteile beziehen. Die [Steamworks-Dokumentation zum Content Survey](https://partner.steamgames.com/doc/gettingstarted/contentsurvey?l=english) beschreibt den Schwerpunkt auf generierten Inhalten, die Spieler konsumieren; reine Effizienzgewinne durch Entwicklungswerkzeuge stehen dabei nicht im Mittelpunkt.

Die Erhebung enthält entsprechend keinen Messwert dafür, wie viel eines Spiels generiert wurde, und keine eigenständige Bewertung seiner Qualität.

## Wie die Einsatzbereiche zugeordnet wurden

Die Offenlegungstexte wurden regelbasiert ausgewertet. Suchmuster ordnen Angaben etwa Bildmaterial, Musik, Programmierung oder Lokalisierung zu und erfassen ausdrücklich genannte Werkzeuge. Diese automatische Einordnung kann unvollständige, mehrdeutige oder ungewöhnlich formulierte Beschreibungen falsch erfassen.

Der Klassifizierer unterscheidet positive Angaben (`yes`), als negativ erkannte Aussagen (`no`) und keine eindeutige erkannte Angabe (`unknown`). Die Tabelle zählt jeweils die positiven Zuordnungen. Ein Spiel kann mehrere Bereiche nennen; die Kategorien überschneiden sich und addieren sich nicht auf 100 Prozent.

| Einsatzbereich / Generierungsart | Spiele | Anteil der 1.168 Spiele mit Offenlegung |
| --- | ---: | ---: |
| Bildmaterial | 832 | 71,23 % |
| Vorab generierte Inhalte | 320 | 27,40 % |
| Marketing | 277 | 23,72 % |
| Musik | 212 | 18,15 % |
| Text | 209 | 17,89 % |
| Programmierung | 206 | 17,64 % |
| Lokalisierung | 187 | 16,01 % |
| Sound | 128 | 10,96 % |
| Stimmen | 75 | 6,42 % |
| Narrative Inhalte | 75 | 6,42 % |
| Animation | 39 | 3,34 % |
| 3D-Assets | 35 | 3,00 % |
| Game Design | 29 | 2,48 % |
| Live generierte Inhalte | 8 | 0,68 % |

**Vorab generierte Inhalte** entstehen während der Entwicklung und werden anschließend als feste Inhalte ausgeliefert. **Live generierte Inhalte** entstehen während des Spielens. Diese beiden zusätzlichen Zuordnungen beschreiben den Zeitpunkt der Generierung und können mit den übrigen Einsatzbereichen überlappen. Sie sind weder vollständig noch gegenseitig ausschließend; nicht eingeordnete Spiele dürfen nicht automatisch einer dieser Gruppen zugerechnet werden.

Alle 1.168 Offenlegungen wurden anhand von 14 Kategorien ausgewertet, insgesamt also 16.352 Kategorieeinträge. Bei 98 Spielen wurde keine konkrete positive Nutzungskategorie erkannt. 157 Kategorieeinträge in 108 Spielen haben einen heuristischen Regelwert unter 0,8. Diese Werte sind keine kalibrierten Wahrscheinlichkeiten; eine vollständige manuelle Validierung ist nicht dokumentiert.

## Welche KI-Werkzeuge genannt wurden

Die folgende Tabelle enthält sämtliche automatisch erkannten Werkzeugnamen der Auswertung. Es zählen ausdrückliche Nennungen in den Offenlegungstexten. Ein Spiel kann mehrere Werkzeuge nennen.

| Werkzeug | Spiele mit Nennung |
| --- | ---: |
| Claude | 26 |
| Suno | 18 |
| Codex | 12 |
| ElevenLabs | 11 |
| ChatGPT | 10 |
| Gemini | 9 |
| Midjourney | 6 |
| Meshy | 5 |
| Stable Diffusion | 5 |
| PixelLab | 4 |
| Nano Banana | 3 |
| Copilot | 2 |
| DALL-E | 2 |
| Grok | 2 |
| Mureka | 2 |
| Udio | 2 |
| fal.ai | 2 |
| Animagine XL | 1 |
| Canva AI | 1 |
| Codex ImageGen | 1 |
| ComfyUI | 1 |
| Cursor AI | 1 |
| DeepL | 1 |
| Gemma | 1 |
| Kling | 1 |
| Leonardo AI | 1 |
| Ollama | 1 |
| Runware | 1 |
| Stable Audio Open | 1 |
| TTSMaker | 1 |
| Veo | 1 |
| Vidu | 1 |

Insgesamt sind das **136 Spiel-Werkzeug-Zuordnungen in 82 Spielen**. Die Zahlen zeigen, welche Namen in den erfassten Erklärungen auftauchen. Daraus lassen sich keine vollständigen Marktanteile von Entwicklungswerkzeugen ableiten.

## KI-Offenlegungen nach Genre

Die ursprüngliche Auswertung betrachtet zwei unterschiedliche Mengen: alle Spiele mit Offenlegung und die engere Gruppe mit mindestens einer konkret positiv erkannten Nutzungskategorie. Die beiden rein zeitlichen Kategorien „vorab generiert“ und „live generiert“ zählen für diese engere Gruppe nicht. Insgesamt umfasst sie **1.070 Spiele**.

Die folgende Tabelle führt beide Zählweisen zusammen. Der Prozentwert bezieht sich auf **Spiele mit Offenlegung geteilt durch alle Spiele mit demselben Genrelabel**. Die letzte Spalte zeigt zusätzlich die engere Gruppe mit konkret erkannter Nutzung.

| Steam-Genrelabel | Spiele insgesamt | Mit Offenlegung | Anteil mit Offenlegung | Konkrete Nutzung erkannt |
| --- | ---: | ---: | ---: | ---: |
| Sports | 98 | 54 | 55,10 % | 46 |
| Early Access | 418 | 215 | 51,44 % | 200 |
| RPG | 480 | 237 | 49,38 % | 215 |
| Strategy | 738 | 364 | 49,32 % | 335 |
| Simulation | 753 | 356 | 47,28 % | 317 |
| Casual | 1.373 | 612 | 44,57 % | 574 |
| Massively Multiplayer | 48 | 21 | 43,75 % | 19 |
| Indie | 2.082 | 881 | 42,32 % | 809 |
| Free To Play | 280 | 110 | 39,29 % | 106 |
| Adventure | 808 | 293 | 36,26 % | 276 |
| Action | 1.033 | 370 | 35,82 % | 342 |
| Racing | 76 | 27 | 35,53 % | 22 |

Ein Titel kann gleichzeitig als Indie, Casual und Adventure geführt werden. Die Genrezeilen lassen sich deshalb nicht zu einer Gesamtzahl von Spielen addieren. Auch Steam-Labels wie Early Access und Free To Play sind hier unverändert unter den Genreangaben aufgeführt.

Die unterschiedliche Definition erklärt beispielsweise die **881 Indie-Spiele mit Offenlegung** gegenüber **809 mit konkret erkannter Nutzung**. Bei Sports sind es entsprechend **54 gegenüber 46**. Beide Zahlenpaare beschreiben unterschiedliche Teilmengen derselben Stichprobe.

## Einsatzbereiche nach Genre

Diese vollständige Kreuztabelle enthält die **140 Genre-Kategorie-Kombinationen** der ursprünglichen Auswertung. Gezählt werden positive Zuordnungen zum jeweiligen Einsatzbereich. Wegen der mehrfachen Genre- und Kategoriezuordnungen kann ein Spiel in mehreren Zeilen vorkommen.

| Steam-Genrelabel | Einsatzbereich | Spiele |
| --- | ---: | ---: |
| Indie | Bildmaterial | 624 |
| Casual | Bildmaterial | 452 |
| Strategy | Bildmaterial | 266 |
| Simulation | Bildmaterial | 253 |
| Action | Bildmaterial | 246 |
| Indie | Marketing | 212 |
| Adventure | Bildmaterial | 210 |
| RPG | Bildmaterial | 176 |
| Indie | Text | 173 |
| Indie | Musik | 169 |
| Early Access | Bildmaterial | 156 |
| Indie | Programmierung | 155 |
| Indie | Lokalisierung | 150 |
| Casual | Marketing | 145 |
| Casual | Musik | 123 |
| Casual | Programmierung | 113 |
| Casual | Text | 107 |
| Action | Marketing | 105 |
| Indie | Sound | 97 |
| Casual | Lokalisierung | 95 |
| Simulation | Marketing | 89 |
| Free To Play | Bildmaterial | 84 |
| Strategy | Marketing | 83 |
| Action | Musik | 80 |
| Strategy | Text | 79 |
| Strategy | Programmierung | 73 |
| Adventure | Marketing | 71 |
| Casual | Sound | 68 |
| Simulation | Text | 68 |
| Action | Programmierung | 66 |
| Action | Text | 63 |
| Adventure | Text | 62 |
| Indie | Narrative Inhalte | 62 |
| Simulation | Programmierung | 62 |
| Early Access | Marketing | 59 |
| Indie | Stimmen | 59 |
| Strategy | Lokalisierung | 59 |
| Simulation | Lokalisierung | 58 |
| Simulation | Musik | 54 |
| Action | Lokalisierung | 53 |
| Adventure | Musik | 51 |
| Adventure | Lokalisierung | 48 |
| RPG | Programmierung | 47 |
| Strategy | Musik | 47 |
| Early Access | Text | 46 |
| Early Access | Programmierung | 45 |
| Action | Sound | 44 |
| Adventure | Sound | 44 |
| RPG | Text | 42 |
| Early Access | Musik | 41 |
| Strategy | Sound | 41 |
| RPG | Musik | 40 |
| Adventure | Programmierung | 38 |
| RPG | Marketing | 38 |
| Adventure | Narrative Inhalte | 37 |
| Casual | Narrative Inhalte | 37 |
| Simulation | Sound | 37 |
| Sports | Bildmaterial | 36 |
| Casual | Stimmen | 31 |
| Early Access | Lokalisierung | 31 |
| Adventure | Stimmen | 30 |
| Simulation | Stimmen | 30 |
| Strategy | Narrative Inhalte | 29 |
| Simulation | Narrative Inhalte | 28 |
| Indie | 3D-Assets | 27 |
| RPG | Narrative Inhalte | 27 |
| Early Access | Sound | 26 |
| Free To Play | Marketing | 26 |
| RPG | Lokalisierung | 26 |
| Indie | Animation | 25 |
| RPG | Sound | 25 |
| Action | Stimmen | 23 |
| Indie | Game Design | 23 |
| Early Access | Narrative Inhalte | 22 |
| Strategy | Stimmen | 22 |
| Early Access | Stimmen | 21 |
| Free To Play | Programmierung | 21 |
| Action | Narrative Inhalte | 19 |
| Free To Play | Lokalisierung | 19 |
| Casual | Game Design | 18 |
| Free To Play | Text | 18 |
| Massively Multiplayer | Bildmaterial | 18 |
| RPG | Stimmen | 18 |
| Action | Animation | 17 |
| Action | 3D-Assets | 16 |
| Racing | Bildmaterial | 16 |
| Casual | 3D-Assets | 13 |
| Casual | Animation | 13 |
| Free To Play | Musik | 13 |
| Sports | Marketing | 13 |
| Action | Game Design | 12 |
| Adventure | 3D-Assets | 12 |
| Adventure | Animation | 12 |
| Strategy | Animation | 12 |
| Free To Play | Sound | 11 |
| Early Access | 3D-Assets | 10 |
| Early Access | Animation | 10 |
| Free To Play | Stimmen | 10 |
| Simulation | Game Design | 10 |
| Free To Play | Narrative Inhalte | 9 |
| Sports | Programmierung | 9 |
| Sports | Text | 9 |
| RPG | Animation | 8 |
| Racing | Musik | 8 |
| Sports | Musik | 8 |
| Strategy | 3D-Assets | 8 |
| Strategy | Game Design | 8 |
| Simulation | 3D-Assets | 7 |
| Simulation | Animation | 7 |
| Early Access | Game Design | 6 |
| Massively Multiplayer | Musik | 6 |
| RPG | 3D-Assets | 6 |
| Racing | Programmierung | 6 |
| Racing | Marketing | 6 |
| Free To Play | 3D-Assets | 5 |
| Massively Multiplayer | Sound | 5 |
| RPG | Game Design | 5 |
| Sports | Sound | 5 |
| Adventure | Game Design | 4 |
| Massively Multiplayer | Text | 4 |
| Racing | Lokalisierung | 4 |
| Racing | Sound | 4 |
| Sports | Lokalisierung | 4 |
| Free To Play | Animation | 3 |
| Massively Multiplayer | Lokalisierung | 3 |
| Massively Multiplayer | Marketing | 3 |
| Racing | Animation | 3 |
| Racing | Narrative Inhalte | 3 |
| Racing | Text | 3 |
| Racing | Stimmen | 3 |
| Sports | Narrative Inhalte | 3 |
| Free To Play | Game Design | 2 |
| Massively Multiplayer | 3D-Assets | 2 |
| Sports | 3D-Assets | 2 |
| Sports | Game Design | 2 |
| Sports | Stimmen | 2 |
| Massively Multiplayer | Programmierung | 1 |
| Racing | 3D-Assets | 1 |
| Racing | Game Design | 1 |
| Sports | Animation | 1 |

## Welche Spiele in den Preisvergleich eingehen

Für den Preisvergleich wurden Spiele berücksichtigt, die in den API-Daten als kostenpflichtig markiert sind und einen vorhandenen Endpreis in Euro haben. Die Filter lauten `is_free = false`, `price_currency = EUR` und vorhandener `price_final_cents`.

Gemeint ist der zum Erhebungszeitpunkt erfasste Endpreis, einschließlich eines gegebenenfalls aktiven Rabatts. Kostenlose Spiele und fehlende Preise werden nicht als null Euro eingesetzt. Ein als kostenlos markierter Titel enthält im API-Snapshot trotzdem einen Preis; er bleibt wegen seines Free-Flags ausgeschlossen.

| Gruppe | Berücksichtigte Spiele | Durchschnittlicher Preis |
| --- | ---: | ---: |
| Mit KI-Offenlegung | 1.059 | 7,12 Euro |
| Ohne gefundene KI-Offenlegung | 1.450 | 8,66 Euro |

## Wie die Reviewwerte berechnet wurden

Der Reviewvergleich berücksichtigt nur Spiele mit **mindestens zehn erfassten Reviews**. Zunächst wird der positive Anteil je Spiel aus den ursprünglichen Reviewzählern berechnet. Anschließend wird daraus ein ungewichteter Mittelwert gebildet: Jedes berücksichtigte Spiel zählt gleich viel, unabhängig von seiner Zahl an Reviews.

| Gruppe | Berücksichtigte Spiele | Mittlerer positiver Reviewanteil |
| --- | ---: | ---: |
| Mit KI-Offenlegung | 275 | 77,04 % |
| Ohne gefundene KI-Offenlegung | 693 | 85,10 % |

Die Review-Abfrage berücksichtigt alle Sprachen und Kaufarten. 669 Spiele hatten zum Erhebungszeitpunkt keine Reviews und gehen nicht in diesen Vergleich ein. Der Mittelwert über Spiele ist kein über sämtliche Einzelreviews gepoolter positiver Anteil.

Diese Gruppenunterschiede belegen keine Ursache. Genres, Preisniveau, Veröffentlichungszeitpunkt und weitere Eigenschaften können sich ebenfalls unterscheiden. Aus der Auswertung lässt sich daher nicht ableiten, dass KI den niedrigeren Preis oder die schlechtere Bewertung verursacht hat.

Wer die Tabellen weiterverwendet, sollte den Datenstand, die verwendeten Filter und den Nenner einer Prozentangabe mit angeben. Die journalistische Einordnung und die untersuchten Spielbeispiele stehen im [Originalartikel bei Golem](https://www.golem.de/news/ki-spiele-auf-steam-wie-viel-ai-slop-steckt-in-2-803-neuerscheinungen-2610-214633.html).
