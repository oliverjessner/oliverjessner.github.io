---
layout: post
title: 'Claude Fable 5.1 und Mythos 5.1: Preise und Unterschiede'
date: 2026-09-02 10:54:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - anthropic
    - KI
    - software-development
description: 'Claude Fable 5.1 und Mythos 5.1 im Vergleich: Preise, Verfügbarkeit, Coding, Forschung und die wichtigsten Unterschiede'
thumbnail: '/assets/images/gen/blog/claude-fable-5-1-und-mythos-5-1-preise-und-unterschiede/header_thumbnail.webp'
image: '/assets/images/gen/blog/claude-fable-5-1-und-mythos-5-1-preise-und-unterschiede/header.webp'
image_width: 1280
image_height: 853
faq:
    - question: 'Was ist Claude Fable 5.1?'
      answer: 'Claude Fable 5.1 ist Anthropics neues leistungsstarkes KI-Modell für Coding, Wissensarbeit, Forschung und langfristige agentische Aufgaben. Es ist für reguläre Claude-Nutzer und über die API verfügbar.'
    - question: 'Was ist der Unterschied zwischen Claude Fable 5.1 und Mythos 5.1?'
      answer: 'Fable 5.1 und Mythos 5.1 basieren auf demselben Modell. Mythos 5.1 bietet ausgewählten Organisationen weniger eingeschränkten Zugriff auf Fähigkeiten in Bereichen wie Cybersicherheit und Biowissenschaften.'
    - question: 'Wie viel kostet Claude Fable 5.1?'
      answer: 'Über die Claude API kostet Fable 5.1 10 US-Dollar pro Million Input-Token und 50 US-Dollar pro Million Output-Token. Cache Reads kosten 0,25 US-Dollar pro Million Token.'
socialmedia:
    - 'Anthropic veröffentlicht Claude Fable 5.1 und Mythos 5.1. Technisch steckt dahinter dasselbe Modell, doch Zugriff und Sicherheitsregeln unterscheiden sich deutlich. Dazu sinken die Kosten für Cache Reads.'
    - 'Claude Fable 5.1 kostet weiterhin 10 Dollar pro Million Input-Token und 50 Dollar für Output. Trotzdem sollen typische Workloads günstiger werden. Der entscheidende Hebel sind deutlich billigere Cache Reads.'
    - 'Claude Mythos 5.1 ist kein normales Claude-Modell für jeden. Anthropic beschränkt den Zugang auf geprüfte Organisationen aus Cybersicherheit und Forschung. Fable 5.1 bringt dieselbe Modellbasis mit strengeren Schutzmechanismen.'
---

Anthropic erweitert Claude um Fable 5.1 und Mythos 5.1. Hinter beiden Namen steckt dasselbe Grundmodell, doch Verfügbarkeit und Sicherheitsregeln unterscheiden sich deutlich. Gleichzeitig sollen Coding, Forschung und lange agentische Aufgaben besser und teilweise günstiger werden.

## Claude Fable 5.1 und Mythos 5.1 sind eigentlich dasselbe Modell

Mit Claude Fable 5.1 und Claude Mythos 5.1 führt [Anthropic](https://oliverjessner.at/category/anthropic/) zwei neue Varianten seiner aktuellen Modellgeneration ein. Die Namensgebung lässt zunächst zwei unterschiedliche KI-Modelle vermuten. Technisch ist die Trennung allerdings kleiner.

Nach Angaben von Anthropic basieren Fable 5.1 und Mythos 5.1 auf demselben Modell. Der wesentliche Unterschied liegt in den Sicherheitsmechanismen und darin, wer auf welche Fähigkeiten zugreifen darf.

Claude Fable 5.1 ist die allgemein verfügbare Variante. Sie richtet sich an Nutzer, Entwickler und Unternehmen, die besonders anspruchsvolle Aufgaben in den Bereichen Coding, Recherche und Wissensarbeit bearbeiten wollen.

Claude Mythos 5.1 ist dagegen nur für ausgewählte und geprüfte Organisationen zugänglich. Der Schwerpunkt liegt auf Bereichen wie Cybersicherheit und Biowissenschaften, in denen Anthropic bei Fable zusätzliche Einschränkungen einsetzt.

Damit entsteht eine ungewöhnliche Modellstrategie: Statt die leistungsfähigeren Fähigkeiten ausschließlich in ein komplett separates Modell zu verlagern, kombiniert Anthropic dieselbe technische Basis mit unterschiedlichen Zugriffsstufen.

## Was Claude Fable 5.1 können soll

Anthropic positioniert Fable 5.1 nicht primär als Modell für kurze Fragen oder alltägliche Chats. Der Fokus liegt auf umfangreichen Aufgaben, die viele Arbeitsschritte benötigen und teilweise über Stunden laufen können.

Dazu gehören beispielsweise:

- größere Änderungen an einer Codebasis
- Code Reviews und Performance-Optimierungen
- umfangreiche Recherchen
- Analyse großer Dokumentenmengen
- Arbeit mit Tabellen und Präsentationen
- mehrstufige Aufgaben über verschiedene Anwendungen hinweg
- langfristig arbeitende KI-Agenten

Gerade für die [Softwareentwicklung](https://oliverjessner.at/category/software-development/) ist interessant, dass Anthropic Fable 5.1 stärker auf komplette Arbeitsabläufe statt einzelne Code-Snippets ausrichtet.

Das Modell soll beispielsweise selbst Tests schreiben, Fehler analysieren und anschließend überprüfen können, ob eine Änderung das gewünschte Ergebnis erreicht. Zusätzlich kann die visuelle Verarbeitung genutzt werden, um Benutzeroberflächen oder andere Ergebnisse mit ursprünglichen Vorgaben abzugleichen.

Anthropic nennt Fable 5.1 deshalb sein leistungsfähigstes allgemein verfügbares Modell für anspruchsvolle Coding- und Wissensaufgaben.

Diese Aussagen stammen allerdings überwiegend aus internen Benchmarks sowie Tests von Anthropic und dessen Partnerunternehmen. Wie groß die Unterschiede im normalen Entwicklungsalltag tatsächlich ausfallen, hängt stark vom jeweiligen Workflow ab.

## Fable 5.1 soll bei langen Aufgaben deutlich besser werden

Ein wichtiger Schwerpunkt liegt auf sogenannten agentischen Workflows.

Dabei beantwortet ein Sprachmodell nicht nur eine einzelne Anfrage. Es plant mehrere Arbeitsschritte, nutzt Werkzeuge, verarbeitet deren Ergebnisse und entscheidet anschließend selbstständig über die nächsten Schritte.

Ein Beispiel wäre eine größere Änderung an einer Software:

1. Repository untersuchen
2. relevante Komponenten identifizieren
3. Implementierung planen
4. Code verändern
5. Tests erstellen
6. Tests ausführen
7. Fehler analysieren
8. Implementierung korrigieren
9. Ergebnis dokumentieren

Solche Abläufe stellen andere Anforderungen an ein Modell als klassische Chat-Anfragen. Ein Fehler in einem frühen Arbeitsschritt kann sich durch den gesamten Prozess ziehen.

Anthropic will Fable 5.1 deshalb unter anderem beim Planen langer Aufgaben, beim Umgang mit fehlgeschlagenen Zwischenschritten und bei der eigenständigen Fehlerkorrektur verbessert haben.

Das ist für die aktuelle Entwicklung rund um [KI](https://oliverjessner.at/category/KI/) relevanter als ein kleiner Vorsprung in einzelnen klassischen Benchmarks. Immer mehr KI-Werkzeuge versuchen nicht nur Antworten zu liefern, sondern vollständige Aufgaben zu übernehmen.

## Claude Fable 5.1 Preis: 10 Dollar für Input, 50 Dollar für Output

Die regulären API-Preise von Claude Fable 5.1 bleiben gegenüber Fable 5 unverändert.

| Nutzung    | Preis pro Million Token |
| ---------- | ----------------------: |
| Input      |            10 US-Dollar |
| Output     |            50 US-Dollar |
| Cache Read |          0,25 US-Dollar |

Der entscheidende Unterschied steckt im Prompt Caching.

Cache Reads kosten bei Fable 5.1 nur noch 0,25 US-Dollar pro Million Token. Gegenüber Fable 5 entspricht das laut Anthropic einer Reduktion um 75 Prozent.

Das ist insbesondere bei agentischen Anwendungen relevant. Solche Systeme schicken häufig dieselben umfangreichen Informationen immer wieder an das Modell. Dazu können Systemanweisungen, Dokumentationen, Teile einer Codebasis oder andere Kontextinformationen gehören.

Werden diese Daten aus einem Cache gelesen, müssen sie nicht jedes Mal zum normalen Input-Preis verarbeitet werden.

Anthropic schätzt deshalb, dass typische Workloads rund 25 Prozent günstiger werden könnten. Bei besonders agentischen Aufgaben sollen Einsparungen von bis zu ungefähr 45 Prozent möglich sein.

Das bedeutet allerdings nicht, dass jede Anfrage mit Fable 5.1 automatisch 25 oder 45 Prozent weniger kostet. Die tatsächliche Ersparnis hängt davon ab, wie stark ein Workflow von wiederverwendbarem Kontext und Cache Reads profitiert.

## Claude Mythos 5.1 richtet sich an Forschung und Cybersicherheit

Claude Mythos 5.1 verwendet dieselbe Modellbasis wie Fable 5.1, bietet in bestimmten sensiblen Bereichen jedoch weitergehende Fähigkeiten.

Der Zugang ist deshalb eingeschränkt.

Anthropic stellt Mythos 5.1 über spezielle Programme unter anderem geprüften Cybersicherheitsorganisationen und Forschern aus den Biowissenschaften zur Verfügung.

Hintergrund ist das sogenannte Dual-Use-Problem leistungsfähiger KI-Modelle. Fähigkeiten, die bei legitimer Forschung hilfreich sind, können gleichzeitig für schädliche Anwendungen verwendet werden.

Ein leistungsfähiges Modell kann beispielsweise Sicherheitslücken in Software untersuchen. Dieselben Fähigkeiten könnten theoretisch aber auch zur Entwicklung eines Exploits verwendet werden.

Ähnliches gilt für Teile der biologischen Forschung.

Bei Fable 5.1 versucht Anthropic deshalb, bestimmte Anfragen einzuschränken oder an andere Claude-Modelle weiterzuleiten. Mythos 5.1 erlaubt ausgewählten Organisationen einen weitergehenden Zugriff.

## Fable darf jetzt Software-Schwachstellen untersuchen

Interessant ist dabei, dass Anthropic die Sicherheitsregeln gegenüber Fable 5 gelockert beziehungsweise präzisiert hat.

Fable 5.1 darf nun Quellcode defensiv nach Software-Schwachstellen untersuchen.

Weiterhin eingeschränkt bleiben laut Anthropic unter anderem Aufgaben wie:

- Entwicklung von Exploits
- bestimmte Penetrationstests
- binärbasierte Schwachstellensuche
- bestimmte Dual-Use-Anfragen aus Biologie und Chemie

Anthropic spricht dabei nicht von generell schwächeren Sicherheitsmaßnahmen. Stattdessen sollen die Filter genauer unterscheiden, ob eine Anfrage legitim oder problematisch ist.

Bei Cybersecurity-Anfragen sollen die neuen Schutzmechanismen laut Unternehmen rund 60 Prozent weniger Fehlalarme produzieren. Bei harmlosen biologischen Anfragen sollen entsprechende Eingriffe gegenüber den ursprünglich mit Fable 5 eingeführten Mechanismen um 85 Prozent zurückgegangen sein.

Auch diese Werte stammen von Anthropic selbst und sollten entsprechend als Herstellerangaben verstanden werden.

## Forschung wird zum wichtigen Anwendungsfall

Besonders stark bewirbt Anthropic die wissenschaftlichen Fähigkeiten der neuen Modellgeneration.

In einem Experiment erhielt Mythos 5.1 Zugriff auf Open-Source-Werkzeuge für Proteindesign und Proteinfaltung. Das Modell sollte mögliche Moleküle entwickeln, die besonders gut an vorgegebene biologische Zielstrukturen binden.

Nach Angaben von Anthropic erreichte das System über zwölf Zielstrukturen hinweg bei fast der Hälfte geeignete Ergebnisse. Das Unternehmen stellt diese Werte deutlich über typische Erfolgsquoten klassischer Proteindesign-Verfahren.

Ein weiteres Experiment beschäftigte sich mit der Optimierung von Deep-Learning-Modellen aus der computergestützten Biologie. Mythos 5.1 soll unter anderem eigene GPU-Kernel erstellt und Berechnungen besser zwischengespeichert haben.

Anthropic berichtet von Beschleunigungen bis zum Faktor 2,5. Bei sehr häufig ausgeführten Modellen könnten dadurch auch die benötigten GPU-Ressourcen sinken.

Die Ergebnisse sind interessant, sollten aber nicht mit einer unabhängigen wissenschaftlichen Validierung verwechselt werden. Es handelt sich zunächst um von Anthropic veröffentlichte Versuche mit dem eigenen Modell.

## Fable 5.1 analysierte alte Venus-Daten der NASA

Auch für Fable 5.1 demonstriert Anthropic einen wissenschaftlichen Anwendungsfall.

Das Modell wurde dem Unternehmen zufolge für die Analyse von Radardaten der NASA-Mission Magellan eingesetzt. Die Raumsonde untersuchte Anfang der 1990er-Jahre die Venus.

Fable 5.1 trainierte laut Anthropic auf Basis dieser Daten ein neuronales Netz und half dabei, eine neue Höhenkarte für ungefähr ein Drittel der Venusoberfläche zu erstellen.

Die räumliche Auflösung soll sich dabei von ursprünglich ungefähr 10 bis 20 Kilometern auf zwei bis drei Kilometer verbessert haben. Auch die Genauigkeit der Höhenangaben soll gestiegen sein.

Die Karte soll unter einer Creative-Commons-Lizenz veröffentlicht werden. Sie könnte damit unter anderem für zukünftige Venusmissionen wie VERITAS der NASA und EnVision der ESA interessant werden.

Das Beispiel zeigt gleichzeitig, wohin Anthropic mit Fable und Mythos strategisch will. Claude soll nicht nur Texte generieren oder Programmcode schreiben, sondern selbstständig mit wissenschaftlichen Werkzeugen, Daten und komplexen Workflows arbeiten.

## Datenschutz bleibt bei Fable 5.1 ein Thema

Mit Fable 5.1 führt Anthropic außerdem die sogenannten "Enterprise Frontier Safeguards" ein.

Standardmäßig gilt bei Fable eine Aufbewahrungszeit von 30 Tagen für Daten, die Anthropic zur Sicherheitsüberwachung verwenden kann.

Für geeignete Unternehmenskunden soll sich das ändern. Mit den Enterprise Frontier Safeguards können Daten vollständig innerhalb einer vom Kunden kontrollierten Cloud-Infrastruktur gespeichert werden.

Auch menschliche Prüfungen sollen dort standardmäßig vom jeweiligen Kunden durchgeführt werden und nicht bei Anthropic.

Bis das System vollständig verfügbar ist, sollen berechtigte Unternehmenskunden Fable 5.1 mit Zero Data Retention nutzen können.

Für Unternehmen mit sensiblen Daten ist dieser Punkt mindestens ebenso relevant wie bessere Benchmark-Ergebnisse. Leistungsfähigere Modelle werden zunehmend direkt mit internen Dokumenten, Quellcode und Geschäftsdaten verbunden.

## Wo Claude Fable 5.1 verfügbar ist

Claude Fable 5.1 steht laut Anthropic für Pro-, Max-, Team- und Enterprise-Nutzer zur Verfügung.

Entwickler können das Modell außerdem über mehrere Plattformen verwenden:

- Claude API
- Amazon Web Services
- Google Cloud
- Microsoft Foundry

Die Modell-ID für die Claude API lautet:

```text
claude-fable-5-1
```

Claude Mythos 5.1 ist dagegen nicht frei über die normale API verfügbar. Der Zugriff erfolgt ausschließlich über Anthropics Programme für geprüfte Organisationen.

## Was an Fable 5.1 wichtiger ist als die Benchmarks

Anthropic veröffentlicht auch für Fable 5.1 eine Reihe neuer Benchmark-Ergebnisse. In mehreren Tests liegt das Modell vor Fable 5 und teilweise auch vor anderen aktuellen Modellen.

Solche Tabellen sind für eine erste technische Einordnung hilfreich. Für die Praxis dürfte eine andere Entwicklung jedoch wichtiger sein.

KI-Modelle werden zunehmend darauf optimiert, länger selbstständig zu arbeiten.

Die entscheidende Frage lautet damit nicht mehr nur, ob ein Modell eine einzelne Programmieraufgabe lösen oder eine schwierige Frage beantworten kann. Relevant wird, ob es über viele Schritte hinweg zuverlässig arbeitet, Fehler erkennt und komplexen Kontext behält.

Genau dort setzt Anthropic mit Fable 5.1 an.

Gleichzeitig versucht das Unternehmen, drei Probleme leistungsfähiger Modelle zu adressieren: hohe Kosten bei langen Workflows, Datenschutz bei sensiblen Unternehmensdaten und Sicherheitsmechanismen, die legitime Aufgaben unnötig blockieren.

Ob Fable 5.1 diese Probleme im Alltag tatsächlich deutlich besser löst, werden unabhängige Tests zeigen müssen. Die Richtung ist dennoch interessant: Das Rennen um leistungsfähige KI verschiebt sich zunehmend von einzelnen Antworten hin zu Systemen, die komplette Arbeitsprozesse übernehmen können.

## Quellen

- [Anthropic: Claude Fable 5.1 und Claude Mythos 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1)
- [Anthropic: Claude Fable](https://www.anthropic.com/claude/fable)
- [Anthropic: Claude Mythos](https://www.anthropic.com/claude/mythos)
