---
layout: post
title: 'GPT-5.6 Sol, Terra und Luna im Vergleich: Unterschiede und Preise'
date: 2026-07-09 21:56:50 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - openai
    - KI
    - software-development
description: 'GPT-5.6 Sol, Terra und Luna im Vergleich: Unterschiede bei Leistung, Tempo, API-Preis und ChatGPT-Zugriff. Welches Modell passt zu wem?'
thumbnail: '/assets/images/gen/blog/gpt-56-sol-terra-und-luna-was-ist-der-unterschied/header_thumbnail.webp'
image: '/assets/images/gen/blog/gpt-56-sol-terra-und-luna-was-ist-der-unterschied/header.webp'
faq:
    - question: 'Was ist der Unterschied zwischen GPT-5.6 Sol, Terra und Luna?'
      answer: 'Sol ist das leistungsstärkste Modell für komplexe Aufgaben. Terra balanciert Leistung und Kosten. Luna ist auf schnelle und günstige Verarbeitung großer Mengen optimiert.'
    - question: 'Welches GPT-5.6-Modell sollte ich verwenden?'
      answer: 'Für schwierige Analysen und komplexe agentische Aufgaben eignet sich Sol. Terra ist für viele produktive Anwendungen der vernünftige Standard. Luna passt zu einfachen, klar begrenzten und hochvolumigen Aufgaben.'
    - question: 'Kann ich GPT-5.6 Terra und Luna in ChatGPT auswählen?'
      answer: 'Nicht in normalen ChatGPT-Unterhaltungen. Dort steht GPT-5.6 Sol je nach Tarif über verschiedene Reasoning-Stufen zur Verfügung. Terra und Luna sind abhängig von Tarif und Produkt in Work, Codex und über die API verfügbar.'
    - question: 'Wie viel kosten GPT-5.6 Sol, Terra und Luna?'
      answer: 'In der API kostet Sol 5 US-Dollar pro eine Million Input-Token und 30 US-Dollar pro eine Million Output-Token. Terra kostet 2,50 beziehungsweise 15 US-Dollar, Luna 1 beziehungsweise 6 US-Dollar.'
    - question: 'Welche Modell-ID hat GPT-5.6 in der API?'
      answer: 'Die Modell-IDs lauten gpt-5.6-sol, gpt-5.6-terra und gpt-5.6-luna. Zusätzlich gibt es den Alias gpt-5.6, der laut OpenAI derzeit auf gpt-5.6-sol routet.'
socialmedia:
    - 'GPT-5.6 Sol, Terra oder Luna? Ich habe mir angesehen, worin sich die drei OpenAI-Modelle unterscheiden und wann das teuerste Modell schlicht unnötig ist.'
    - 'GPT-5.6 besteht aus drei Modellen: Sol für komplexe Aufgaben, Terra als Mittelweg und Luna für schnelle, günstige Workloads. Mein Vergleich mit Preisen und Einsatzgebieten.'
    - 'Wer nach "GPT-5.6 Soul" sucht, meint vermutlich Sol. Dazu kommen Terra und Luna. Was die drei Modelle unterscheidet und welches sich für welchen Einsatz lohnt.'
---

GPT-5.6 Sol, Terra und Luna unterscheiden sich vor allem bei Leistung, Geschwindigkeit und Preis. Sol ist das leistungsstärkste Modell für komplexe Aufgaben, Terra balanciert Fähigkeiten und Kosten, Luna ist die schnellste und günstigste Variante für hohe Anfragezahlen. Welche Version passt also zu welchem Einsatz?

## GPT-5.6 Sol, Terra und Luna – der schnelle Überblick

Mit GPT-5.6 verfolgt [OpenAI](https://oliverjessner.at/category/openai/) ein klareres Modellprinzip als bei manchen früheren Generationen. Statt nur eines Modells gibt es drei Varianten für unterschiedliche Anforderungen:

- **GPT-5.6 Sol** ist das Flaggschiff der Familie.
- **GPT-5.6 Terra** balanciert Fähigkeiten und Kosten.
- **GPT-5.6 Luna** ist für schnelle und kostensensitive Workloads gedacht.

Der praktische Unterschied lässt sich vereinfacht so zusammenfassen: Sol maximiert die Fähigkeiten, Terra sucht den vernünftigen Mittelweg und Luna minimiert Kosten und Latenz.

| Modell        | Schwerpunkt                         | API Input pro 1 Mio. Token | API Output pro 1 Mio. Token | Typischer Einsatz                                                     |
| ------------- | ----------------------------------- | -------------------------: | --------------------------: | --------------------------------------------------------------------- |
| GPT-5.6 Sol   | maximale Fähigkeiten                |                5 US-Dollar |                30 US-Dollar | komplexe Analysen, Coding, Forschung, agentische Workflows            |
| GPT-5.6 Terra | Balance aus Leistung und Kosten     |             2,50 US-Dollar |                15 US-Dollar | produktive Anwendungen, Wissensarbeit, Automatisierung                |
| GPT-5.6 Luna  | Geschwindigkeit und niedrige Kosten |                1 US-Dollar |                 6 US-Dollar | hohe Anfragezahlen, Extraktion, Klassifikation, einfache Verarbeitung |

Die Preise stammen aus der [offiziellen Modellübersicht von OpenAI](https://developers.openai.com/api/docs/models/compare) und gelten für die API. Abrechnung und Verfügbarkeit in ChatGPT funktionieren anders.

Wichtig ist auch der Zeitpunkt: OpenAI hatte GPT-5.6 zunächst als begrenzte Vorschau vorgestellt. Am 9. Juli 2026 wurde die Modellfamilie laut [API-Changelog](https://developers.openai.com/api/docs/changelog) mit `gpt-5.6-sol`, `gpt-5.6-terra` und `gpt-5.6-luna` veröffentlicht.

## Heißt das Modell GPT-5.6 Sol oder GPT-5.6 Soul?

**Offiziell heißt das Modell GPT-5.6 Sol.**

Wer nach "GPT-5.6 Soul", "GPT 5.6 Soul" oder "GPT-5.6 Soul vs Terra vs Luna" sucht, meint vermutlich das Spitzenmodell der neuen Modellfamilie. In der offiziellen Dokumentation von OpenAI lautet der Name jedoch **Sol**.

Auch die API-ID lautet:

```text
gpt-5.6-sol
```

Nicht:

```text
gpt-5.6-soul
```

Für Entwickler ist die richtige Schreibweise entsprechend relevant. Im Code führt ein erfundener Modellname nicht zum gewünschten Modell.

## Was ist GPT-5.6 Sol?

GPT-5.6 Sol ist das Flaggschiff der Modellfamilie. OpenAI positioniert es für komplexe professionelle Arbeit und Aufgaben, bei denen hohe Modellfähigkeit wichtiger ist als minimale Kosten.

Dazu gehören beispielsweise:

- komplexe Softwareentwicklung
- Arbeit mit mehreren Werkzeugen
- anspruchsvolle Recherche
- wissenschaftliche Aufgaben
- längere agentische Workflows
- Computersteuerung
- Sicherheitsanalysen
- Aufgaben mit vielen voneinander abhängigen Schritten

OpenAI beschreibt Sol in der [offiziellen Vorstellung von GPT-5.6](https://openai.com/index/gpt-5-6/) als Flaggschiff der Familie.

Für die Praxis bedeutet das nicht, dass jede Antwort automatisch besser sein muss. Ein kurzer Text, eine einfache Klassifikation oder das Extrahieren einer Rechnungsnummer benötigt selten das leistungsstärkste Modell.

Sol wird vor allem dann interessant, wenn die Aufgabe tatsächlich schwierig ist, mehrere Schritte voneinander abhängen oder zusätzliche Modellfähigkeit einen messbaren Vorteil bringt.

### Sol ist nicht automatisch der richtige Standard

Die Versuchung ist naheliegend: Wenn Sol das leistungsstärkste Modell ist, könnte man einfach jede Anfrage damit verarbeiten.

In produktiven Anwendungen ist das selten die wirtschaftlichste Entscheidung.

Mehr Modellfähigkeit kann bei schwierigen Aufgaben helfen. Gleichzeitig steigen die regulären API-Kosten deutlich. Sol kostet pro einer Million Output-Token fünfmal so viel wie Luna und doppelt so viel wie Terra.

Genau deshalb sollte Sol nicht automatisch der Standard für jeden API-Aufruf sein.

## Was ist GPT-5.6 Terra?

GPT-5.6 Terra ist die mittlere Variante der Familie. OpenAI beschreibt Terra als Modell, das Fähigkeiten und Kosten ausbalancieren soll.

Für viele reale Anwendungen dürfte genau diese Position interessant sein.

Ein Produktteam benötigt beispielsweise nicht zwingend das stärkste verfügbare Modell für:

- interne Assistenten
- Dokumentenzusammenfassungen
- strukturierte Datenextraktion
- Support-Automatisierung
- Content-Workflows
- normale Coding-Aufgaben
- Recherche mit begrenzter Komplexität
- mehrstufige Automatisierungen

OpenAI schreibt in der [offiziellen Vorstellung der GPT-5.6-Familie](https://openai.com/index/gpt-5-6/), Terra erreiche eine mit GPT-5.5 konkurrenzfähige Leistung bei niedrigeren Kosten.

Diese Herstellerangabe sollte nicht mit einer Garantie für jeden individuellen Use Case verwechselt werden. Eigene Tests bleiben notwendig.

### Terra ist für mich der interessanteste Ausgangspunkt

Aus praktischer Sicht würde ich bei einer neuen, noch nicht klar begrenzten Anwendung nicht automatisch mit Sol beginnen. Terra wirkt für viele Workloads wie der sinnvollere Ausgangspunkt.

Der Grund ist einfach: In produktiven Systemen zählt nicht nur die maximale Qualität eines einzelnen Outputs. Relevant sind auch:

- Antwortzeit
- Kosten pro Anfrage
- Fehlerrate
- Durchsatz
- Wiederholbarkeit
- Qualität bei den eigenen Daten

Ein Modell kann in einem allgemeinen Benchmark stärker sein und für einen eng definierten Workflow trotzdem wirtschaftlich schlechter abschneiden.

Gerade bei [Softwareentwicklung](https://oliverjessner.at/category/software-development/) und automatisierten Workflows sollte deshalb nicht die Modellhierarchie allein entscheiden. Ein kleines Eval-Set mit echten Aufgaben aus dem eigenen Produkt ist meist aussagekräftiger.

## Was ist GPT-5.6 Luna?

GPT-5.6 Luna ist die schnellste und günstigste Variante der Modellfamilie. OpenAI positioniert das Modell für kostensensitive und hochvolumige Workloads.

Das klingt zunächst nach einem Modell für einfache Chatbots. Der interessantere Einsatz liegt aber häufig im Hintergrund eines Systems.

Beispiele sind:

- Texte klassifizieren
- Informationen aus Dokumenten extrahieren
- Inhalte vorsortieren
- Metadaten erzeugen
- große Datenmengen verarbeiten
- einfache Zusammenfassungen erstellen
- Anfragen an andere Modelle routen
- standardisierte Antworten vorbereiten

Nehmen wir ein System, das täglich 500.000 kurze Texte einer Kategorie zuordnet. Hier kann der Preisunterschied zwischen Luna und Sol entscheidender sein als ein kleiner Qualitätsvorteil des größeren Modells.

Beim regulären API-Preis für Output ist Sol laut offizieller OpenAI-Übersicht fünfmal so teuer wie Luna. Beim Input liegt der Faktor ebenfalls bei fünf.

Für einen einzelnen Prompt fällt das kaum auf. Bei Millionen Anfragen wird daraus eine Architekturentscheidung.

## GPT-5.6 vs. GPT-5.5 – was ist neu?

GPT-5.6 ist nicht nur ein einzelnes Nachfolgemodell zu GPT-5.5. OpenAI führt mit Sol, Terra und Luna drei dauerhafte Leistungsstufen ein.

Die Zahl steht für die Modellgeneration. Die Namen Sol, Terra und Luna beschreiben unterschiedliche Capability-Tiers, die sich laut OpenAI künftig in eigenem Tempo weiterentwickeln können.

Praktisch bedeutet das:

- Sol ist auf maximale Fähigkeiten ausgerichtet.
- Terra balanciert Fähigkeiten und Kosten.
- Luna priorisiert Geschwindigkeit und niedrige Kosten.

Besonders interessant ist Terra. OpenAI positioniert das Modell als günstigere Alternative mit einer zu GPT-5.5 konkurrenzfähigen Leistung.

Ob das für einen konkreten Workflow tatsächlich gilt, lässt sich aber nicht aus der allgemeinen Positionierung ableiten. Ein Coding-Agent, ein Support-System und eine Extraktionspipeline können völlig unterschiedliche Ergebnisse liefern.

Wer bereits GPT-5.5 produktiv einsetzt, sollte deshalb nicht nur Sol testen. Gerade Terra kann wirtschaftlich der interessantere Vergleich sein.

## Sol vs. Terra vs. Luna – welches GPT-5.6-Modell ist besser?

Die Frage nach dem "besten" GPT-5.6-Modell greift zu kurz. Sol ist das leistungsstärkste Modell der Familie. Daraus folgt aber nicht, dass Sol für jeden Einsatz die beste Wahl ist.

### Nimm GPT-5.6 Sol, wenn

- die Aufgabe komplex und schwer vorhersehbar ist
- mehrere Schritte voneinander abhängen
- anspruchsvolle Analyse wichtiger als minimale Kosten ist
- ein Agent selbstständig planen und Werkzeuge koordinieren muss
- komplexe Coding-Aufgaben bearbeitet werden
- Forschung oder tiefere technische Analyse im Mittelpunkt steht

### Nimm GPT-5.6 Terra, wenn

- du ein produktives Standardmodell suchst
- Qualität wichtig ist, aber Kosten ebenfalls zählen
- viele Aufgaben mittlere Komplexität haben
- du einen KI-Workflow wirtschaftlich skalieren möchtest
- Sol in deinen Tests keinen ausreichenden Mehrwert bringt

### Nimm GPT-5.6 Luna, wenn

- sehr viele Anfragen verarbeitet werden
- geringe Latenz wichtig ist
- die Aufgaben klar begrenzt sind
- Daten extrahiert oder klassifiziert werden
- Kosten pro Anfrage eine zentrale Kennzahl sind

Die Entscheidung sollte am Ende nicht anhand einer Modellbeschreibung fallen. Sie sollte anhand echter Aufgaben getroffen werden.

## Mein praktisches Entscheidungsmodell

Für eine neue [KI](https://oliverjessner.at/category/KI/)-Anwendung würde ich nicht automatisch das größte Modell wählen.

Bei einem offenen Produkt-Use-Case wäre Terra für mich häufig der erste Testkandidat. Bei klar begrenzten und hochvolumigen Aufgaben würde ich dagegen mit Luna beginnen.

Ein mögliches Vorgehen:

1. Echte Aufgaben aus dem späteren Produkt sammeln.
2. Luna bei klar begrenzten Aufgaben testen.
3. Fehlerhafte oder komplexere Fälle mit Terra vergleichen.
4. Sol nur dort einsetzen, wo Terra messbar nicht ausreicht.
5. Qualität, Kosten und Laufzeit gemeinsam auswerten.

Ein solches Routing kann wirtschaftlicher sein, als jede Anfrage direkt an Sol zu senden.

Ein vereinfachtes Beispiel:

```text
Einfache Anfrage
    |
    v
GPT-5.6 Luna
    |
    +--> Ergebnis ausreichend --> Antwort
    |
    +--> Unsicher oder komplex
              |
              v
        GPT-5.6 Terra
              |
              +--> Ergebnis ausreichend --> Antwort
              |
              +--> schwieriger Spezialfall
                        |
                        v
                  GPT-5.6 Sol
```

Das ist kein universelles Rezept. Es zeigt aber, warum drei Modellstufen für Entwickler sinnvoll sein können. Ein System muss nicht für jede Aufgabe denselben Rechenaufwand und dieselben Kosten akzeptieren.

## GPT-5.6 Preise im direkten Vergleich

Die offiziellen API-Preise machen die Positionierung besonders deutlich:

| Modell        |          Input |   Cached Input |       Output |
| ------------- | -------------: | -------------: | -----------: |
| GPT-5.6 Sol   |    5 US-Dollar | 0,50 US-Dollar | 30 US-Dollar |
| GPT-5.6 Terra | 2,50 US-Dollar | 0,25 US-Dollar | 15 US-Dollar |
| GPT-5.6 Luna  |    1 US-Dollar | 0,10 US-Dollar |  6 US-Dollar |

Alle Angaben gelten pro einer Million Token und stammen aus der [offiziellen Modellübersicht von OpenAI](https://developers.openai.com/api/docs/models/compare).

Damit ist Terra bei den regulären Tokenpreisen halb so teuer wie Sol. Luna kostet ein Fünftel von Sol.

Das macht die Auswahl auch zu einer Frage der Systemarchitektur. Wer einen einfachen Extraktionsjob unnötig mit Sol ausführt, zahlt für Fähigkeiten, die der konkrete Workflow möglicherweise nicht nutzt.

## Haben Sol, Terra und Luna unterschiedliche Kontextfenster?

In der OpenAI API dokumentiert OpenAI für alle drei GPT-5.6-Modelle derzeit ein Kontextfenster von **1.050.000 Token** und maximal **128.000 Output-Token**.

| Modell        |  Kontextfenster | Maximale Output-Token |
| ------------- | --------------: | --------------------: |
| GPT-5.6 Sol   | 1.050.000 Token |         128.000 Token |
| GPT-5.6 Terra | 1.050.000 Token |         128.000 Token |
| GPT-5.6 Luna  | 1.050.000 Token |         128.000 Token |

Das ist ein wichtiger Punkt: Luna ist nicht einfach nur deshalb günstiger, weil OpenAI ein kleines Kontextfenster anbietet. Alle drei Varianten können laut API-Dokumentation sehr große Kontexte verarbeiten.

Trotzdem folgt daraus nicht, dass man ständig eine Million Token an ein Modell senden sollte. Große Kontexte verursachen Kosten und können eine Architektur unnötig schwerfällig machen.

Für produktive Systeme bleiben Retrieval, gezielte Auswahl relevanter Inhalte und sauberes Context Management sinnvoll.

## Kann ich GPT-5.6 Sol, Terra und Luna in ChatGPT auswählen?

Nicht alle drei Modelle stehen in normalen ChatGPT-Unterhaltungen als direkt auswählbare Modelle bereit.

Laut dem [aktuellen OpenAI-Hilfeartikel zu GPT-5.6 in ChatGPT](https://help.openai.com/en/articles/20001354-gpt-56-in-chatgpt) wird GPT-5.6 Sol für die Reasoning-Stufen berechtigter Tarife verwendet.

Derzeit gilt für normale ChatGPT-Unterhaltungen:

| Tarif       | Medium und High | Extra High | Pro  |
| ----------- | --------------- | ---------- | ---- |
| Plus        | ja              | nein       | nein |
| Pro         | ja              | ja         | ja   |
| Business    | ja              | ja         | ja   |
| Enterprise  | ja              | ja         | ja   |
| Free und Go | nein            | nein       | nein |

Dabei werden Medium, High und Extra High von GPT-5.6 Sol angetrieben. Die Pro-Option verwendet GPT-5.6 Sol Pro.

GPT-5.5 Instant bleibt gleichzeitig das Standardmodell für schnelle alltägliche Antworten.

Terra und Luna sind in normalen ChatGPT-Unterhaltungen nicht direkt auswählbar. Je nach Produkt und Tarif sieht die Verfügbarkeit anders aus:

- **Work in ChatGPT:** Sol, Terra und Luna für Plus, Pro, Business und Enterprise
- **Codex:** Terra für Free und Go; Sol, Terra und Luna für Plus, Pro, Business und Enterprise
- **OpenAI API:** Sol, Terra und Luna

Da der Rollout schrittweise erfolgt, kann GPT-5.6 bei einem grundsätzlich berechtigten Konto noch fehlen.

## Wie verwende ich GPT-5.6 Sol, Terra oder Luna über die API?

Die drei offiziellen Modell-IDs lauten:

```text
gpt-5.6-sol
gpt-5.6-terra
gpt-5.6-luna
```

Ein stark vereinfachtes Beispiel für einen API-Request sieht so aus:

```bash
curl https://api.openai.com/v1/responses \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5.6-terra",
    "input": "Fasse den folgenden Text in drei Sätzen zusammen."
  }'
```

Für die meisten Anwendungen würde ich den Modellnamen nicht an dutzenden Stellen im Code fest einbauen. Eine zentrale Konfiguration erleichtert spätere Tests:

```javascript
const models = {
    complex: 'gpt-5.6-sol',
    default: 'gpt-5.6-terra',
    fast: 'gpt-5.6-luna',
};
```

Damit lässt sich ein Workflow später leichter anpassen, ohne die gesamte Anwendung umzubauen.

### Was ist der Unterschied zwischen gpt-5.6 und gpt-5.6-sol?

OpenAI bietet zusätzlich die Modell-ID:

```text
gpt-5.6
```

an.

Laut [API-Changelog vom 9. Juli 2026](https://developers.openai.com/api/docs/changelog) routet dieser Alias derzeit auf:

```text
gpt-5.6-sol
```

Wer eine konkrete Leistungsstufe explizit festlegen möchte, kann direkt eine der drei Modell-IDs verwenden:

```text
gpt-5.6-sol
gpt-5.6-terra
gpt-5.6-luna
```

Der Alias `gpt-5.6` ist damit nicht einfach ein viertes Modell neben Sol, Terra und Luna.

## Ist GPT-5.6 Sol automatisch besser als Terra und Luna?

Bei maximaler Modellfähigkeit ist Sol die Spitze der Familie. Für einen konkreten Workflow kann trotzdem Terra oder Luna die bessere Wahl sein.

Ein Beispiel: Ein System soll aus Support-E-Mails drei Felder extrahieren:

- Kundennummer
- Produkt
- Problemkategorie

Angenommen, Luna liefert bei 99,2 Prozent eines eigenen Testsets korrekte strukturierte Ergebnisse und Sol erreicht 99,4 Prozent. Dann kann Luna trotz schwächerer Gesamtpositionierung wirtschaftlich attraktiver sein.

Bei einer komplexen Codebasis mit mehreren Repositories, Werkzeugaufrufen und langfristiger Planung kann sich das Verhältnis umkehren.

Deshalb ist die entscheidende Frage nicht:

"Welches Modell ist generell am besten?"

Sondern:

"Welches Modell erreicht für meine Aufgabe die notwendige Qualität zu akzeptablen Kosten und mit akzeptabler Laufzeit?"

## Was ich an Sol, Terra und Luna sinnvoll finde

Die drei Namen lösen nicht automatisch das Problem komplizierter Modellfamilien. Sie machen die grundlegende Entscheidung aber leichter verständlich.

Sol steht für maximale Fähigkeiten. Terra besetzt die Mitte. Luna optimiert stärker auf Tempo und Kosten.

Für Entwickler entsteht daraus ein relativ klares Muster:

- Sol für schwierige Grenzfälle
- Terra für den produktiven Standard
- Luna für günstige Masse

Besonders interessant finde ich nicht die Frage, welches Modell gewinnt. Spannender ist die Möglichkeit, mehrere Modelle innerhalb eines Workflows zu kombinieren.

Ein System könnte Luna für die erste Verarbeitung verwenden, Terra für schwierigere Fälle und Sol nur dann aufrufen, wenn zusätzliche Tiefe tatsächlich notwendig ist.

Das dürfte in vielen Anwendungen sinnvoller sein, als jedes Problem grundsätzlich mit dem größten Modell zu bearbeiten.

## Fazit: Der Unterschied zwischen GPT-5.6 Sol, Terra und Luna

Der Unterschied zwischen GPT-5.6 Sol, Terra und Luna liegt vor allem in der Positionierung zwischen maximaler Fähigkeit, Kosten und Geschwindigkeit.

**GPT-5.6 Sol** ist das Flaggschiff für komplexe Aufgaben, anspruchsvolle Analysen und schwierige Workflows.

**GPT-5.6 Terra** ist die ausgewogene Variante für produktive Anwendungen, bei denen Leistung und Kosten gemeinsam zählen.

**GPT-5.6 Luna** ist das günstigste und schnellste Modell für hohe Anfragezahlen und klar begrenzte Aufgaben.

Für mich ist Terra der naheliegende Startpunkt für viele allgemeine Anwendungen. Luna sollte man früh testen, sobald Kosten oder Durchsatz relevant werden. Sol ergibt dort Sinn, wo die zusätzliche Modellleistung einen messbaren Vorteil bringt.

Und noch einmal für die Suche: Das offizielle Modell heißt **GPT-5.6 Sol**, nicht "GPT-5.6 Soul".
