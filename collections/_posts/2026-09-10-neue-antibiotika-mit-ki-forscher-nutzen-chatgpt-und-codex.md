---
layout: post
title: 'Neue Antibiotika mit KI: Forscher nutzen ChatGPT und Codex'
date: 2026-09-10 18:32:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - openai
    - software-development
description: 'Ein Forschungsteam nutzt ChatGPT, Codex und Deep Learning, um Millionen biologischer Sequenzen nach neuen Antibiotika-Kandidaten zu durchsuchen'
thumbnail: '/assets/images/gen/blog/neue-antibiotika-mit-ki-forscher-nutzen-chatgpt-und-codex/header_thumbnail.webp'
image: '/assets/images/gen/blog/neue-antibiotika-mit-ki-forscher-nutzen-chatgpt-und-codex/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Kann ChatGPT neue Antibiotika entdecken?'
      answer: 'ChatGPT entdeckt nicht selbstständig fertige Antibiotika. Im Labor von César de la Fuente unterstützt es unter anderem bei Hypothesen, Recherche und der Verbindung verschiedener Fachgebiete. Spezialisierte Deep-Learning-Modelle übernehmen die Suche nach Wirkstoffkandidaten.'
    - question: 'Welche Rolle spielt Codex bei der Antibiotika-Forschung?'
      answer: 'Codex hilft Forschenden beim Schreiben und Überarbeiten von Code, bei der Verarbeitung großer biologischer Datensätze und beim Aufbau reproduzierbarer Analyseabläufe.'
    - question: 'Warum müssen KI-Vorhersagen im Labor überprüft werden?'
      answer: 'Eine rechnerisch vielversprechende Molekülstruktur ist noch kein Medikament. Kandidaten müssen experimentell auf Wirksamkeit, Toxizität, Stabilität und weitere Eigenschaften geprüft werden.'
socialmedia:
    - 'Neue Antibiotika mit KI: Das Labor von César de la Fuente nutzt Deep Learning, ChatGPT und Codex, um riesige biologische Datensätze nach Wirkstoffkandidaten zu durchsuchen. Entscheidend bleibt die Validierung im Labor.'
    - 'ChatGPT entdeckt keine Antibiotika im Alleingang. Spannend ist die Arbeitsteilung: Deep-Learning-Modelle filtern Kandidaten, Codex hilft beim Code, ChatGPT beim Denken über Fachgrenzen hinweg. Ein Blick auf den realen Forschungsworkflow.'
    - 'Vom Mammut bis zu Archaeen: Forschende suchen mit KI nach antimikrobiellen Peptiden in kaum erschlossenen Sequenzräumen. OpenAI zeigt, wie ChatGPT und Codex diesen Workflow unterstützen. Die eigentliche Evidenz entsteht weiterhin im Labor.'
news: true
---

Ein Forschungsteam durchsucht mit Deep Learning Millionen biologischer Sequenzen nach neuen Antibiotika. ChatGPT und Codex helfen dabei vor allem beim Denken, Programmieren und Auswerten.

## Neue Antibiotika mit KI suchen

Antibiotikaresistenzen gehören zu den großen Problemen der modernen Medizin. Bakterien entwickeln Resistenzen gegen Wirkstoffe, die bisher zur Behandlung von Infektionen eingesetzt wurden. Gleichzeitig ist die Suche nach neuen Wirkstoffen langsam und aufwendig.

2021 waren weltweit rund 4,71 Millionen Todesfälle mit bakteriellen antimikrobiellen Resistenzen verbunden. Rund 1,14 Millionen Todesfälle wurden direkt darauf zurückgeführt. Für 2050 gehen aktuelle Modellierungen von 8,22 Millionen jährlich mit Resistenzen verbundenen Todesfällen aus.

Entsprechend interessant ist die Frage, ob [KI](https://oliverjessner.at/category/ki/) die Suche nach neuen Wirkstoffen beschleunigen kann.

Das Labor des Bioingenieurs César de la Fuente an der University of Pennsylvania arbeitet seit Jahren genau daran. Statt ausschließlich bekannte chemische Bibliotheken oder klassische natürliche Quellen zu untersuchen, behandelt das Team biologische Informationen selbst als Suchraum.

Eine neue [Fallstudie von OpenAI](https://openai.com/index/using-codex-chatgpt-to-search-for-new-antimicrobials/) zeigt nun, wie das Labor neben eigenen Deep-Learning-Modellen auch ChatGPT und Codex in diesen Forschungsprozess integriert.

Dabei ist eine Unterscheidung wichtig: ChatGPT oder Codex entdecken nicht selbstständig ein neues Medikament. Die eigentliche Suche nach antimikrobiellen Kandidaten erfolgt mit spezialisierten Modellen. Die OpenAI-Werkzeuge unterstützen den wissenschaftlichen Workflow rundherum.

## Biologie wird zum durchsuchbaren Datensatz

Die Grundidee hinter der Arbeit ist vergleichsweise einfach: DNA, Proteine und Peptide lassen sich als Information darstellen.

Proteine bestehen aus Sequenzen von Aminosäuren. Bestimmte kurze Abschnitte dieser Sequenzen können biologische Eigenschaften besitzen, darunter auch eine antimikrobielle Wirkung.

Die Herausforderung liegt in der Größe des möglichen Suchraums.

Digitale Datenbanken enthalten heute enorme Mengen an Genom- und Proteindaten von Menschen, Tieren, Mikroorganismen und sogar ausgestorbenen Arten. Diese Daten lassen sich automatisiert analysieren. Nur ein sehr kleiner Teil der darin enthaltenen Sequenzen ist allerdings für die Suche nach neuen Wirkstoffen interessant.

Genau hier kommen Machine Learning und Deep Learning zum Einsatz.

Modelle können anhand bekannter Beispiele lernen, welche Eigenschaften mit antimikrobieller Aktivität zusammenhängen. Anschließend lassen sich Millionen möglicher Peptide bewerten und priorisieren.

Aus einem praktisch unüberschaubaren Datensatz entsteht damit eine wesentlich kleinere Auswahl an Kandidaten, die anschließend im Labor untersucht werden kann.

## Vom Mammut zum Antibiotika-Kandidaten

Wie ungewöhnlich diese Suche werden kann, zeigte das Team bereits 2024 in einer Arbeit in Nature Biomedical Engineering.

Für das Projekt untersuchten die Forschenden Proteindaten ausgestorbener Organismen. Ihr Deep-Learning-System APEX analysierte dabei mehr als 10,3 Millionen Peptidsequenzen.

Das Modell identifizierte 37.176 Sequenzen mit vorhergesagter antimikrobieller Aktivität. 11.035 davon waren nach Angaben der Forschenden nicht in heute lebenden Organismen zu finden.

69 ausgewählte Peptide wurden anschließend synthetisiert und experimentell getestet. Darunter befanden sich Moleküle, deren Sequenzen aus Proteinen von ausgestorbenen Arten wie Wollhaarmammuts, Riesenfaultieren und urzeitlichen Elefanten abgeleitet wurden.

Einige Kandidaten zeigten nicht nur im Reagenzglas antimikrobielle Aktivität. Ausgewählte Peptide wurden zusätzlich in Mausmodellen untersucht.

Das ist ein wichtiger Unterschied zur Vorstellung einer rein virtuellen Wirkstoffsuche. Das KI-Modell liefert zunächst Kandidaten. Ob ein vorhergesagtes Molekül tatsächlich biologisch funktioniert, entscheidet sich weiterhin experimentell.

## Auch Archaeen werden zum Suchraum

Das gleiche Prinzip lässt sich auf andere biologische Datensätze übertragen.

2025 veröffentlichte das Team eine weitere Arbeit in Nature Microbiology. Diesmal untersuchten die Forschenden Archaeen, eine eigene Domäne einzelliger Organismen, die bei der klassischen Antibiotika-Suche bisher deutlich weniger Aufmerksamkeit erhalten hatte als Bakterien oder Pilze.

Das aktualisierte Modell APEX 1.1 durchsuchte rund 193 Millionen Peptidsequenzen aus 233 Archaeen.

12.623 Sequenzen wurden als mögliche antimikrobielle Kandidaten eingestuft. 80 davon ließ das Team synthetisieren. 75 zeigten im Labor Aktivität gegen mindestens einen der getesteten Krankheitserreger.

Solche Zahlen zeigen den eigentlichen Vorteil des Ansatzes. KI ersetzt nicht die Experimente. Sie reduziert zunächst einen extrem großen Suchraum auf Kandidaten, deren experimentelle Untersuchung sinnvoll erscheint.

## Welche Rolle ChatGPT dabei spielt

Neben diesen spezialisierten Modellen verwendet das Labor inzwischen auch [OpenAI](https://oliverjessner.at/category/openai/)-Werkzeuge.

ChatGPT dient laut de la Fuente unter anderem als Werkzeug zur Ideenentwicklung. Forschende können Hypothesen diskutieren, unbekannte Fachgebiete erschließen, Begriffe klären oder unterschiedliche methodische Ansätze miteinander vergleichen.

Das ist für das Labor besonders relevant, weil dort Biologie, Chemie, Informatik und Ingenieurwissenschaften zusammenkommen.

Ein Biologe versteht beispielsweise die experimentelle Bedeutung eines Datensatzes, muss aber nicht automatisch Erfahrung mit der Verarbeitung großer Sequenzdateien besitzen. Ein Informatiker kann dagegen hervorragend Daten analysieren, ohne jedes biologische Detail seines Untersuchungsgegenstandes zu kennen.

Sprachmodelle können einen Teil dieser Verständigungsarbeit übernehmen.

Interessant ist dabei weniger eine einzelne spektakuläre Antwort als die alltägliche Beschleunigung vieler kleiner Arbeitsschritte.

## Codex hilft beim Programmieren der Forschung

Codex übernimmt eine etwas andere Rolle.

Moderne biologische Forschung produziert große Mengen digitaler Daten. Diese müssen heruntergeladen, bereinigt, transformiert, verglichen und visualisiert werden. Dafür ist regelmäßig eigene [Softwareentwicklung](https://oliverjessner.at/category/software-development/) notwendig.

Genau hier kann ein Coding-Agent helfen.

Mit Codex können Wissenschaftler Skripte erzeugen oder bestehenden Code anpassen, ohne jeden technischen Schritt selbst implementieren zu müssen. Für Forschende mit wenig Programmiererfahrung sinkt damit die Einstiegshürde für computergestützte Analysen.

Das verändert vor allem die Geschwindigkeit, mit der Ideen ausprobiert werden können.

Eine Wissenschaftlerin muss nicht zwangsläufig darauf warten, dass ein Entwickler ein kleines Analysewerkzeug baut. Sie kann einen ersten Ansatz selbst umsetzen, testen und gemeinsam mit technisch erfahreneren Kollegen überprüfen.

Für interdisziplinäre Forschung kann das wichtiger sein als die reine Geschwindigkeit beim Schreiben von Code.

## ChatGPT ist nicht das Modell, das die Antibiotika findet

Bei der Einordnung der OpenAI-Fallstudie sollte man allerdings genau bleiben.

Der aktuelle Beitrag ist zunächst eine Darstellung von OpenAI über die Nutzung der eigenen Produkte. Die wissenschaftlichen Ergebnisse des Labors stammen nicht einfach aus ChatGPT.

Für die eigentliche Vorhersage antimikrobieller Eigenschaften entwickelt die Forschungsgruppe spezialisierte Systeme wie APEX. Diese Modelle wurden für biologische Sequenzen und konkrete experimentelle Zielgrößen entwickelt.

ChatGPT und Codex sitzen eher eine Ebene darüber.

Sie helfen bei Hypothesen, Programmierung, Datenverarbeitung und beim Austausch zwischen unterschiedlichen Fachrichtungen.

Diese Trennung ist wichtig, weil sonst schnell der Eindruck entsteht, ein allgemeines Sprachmodell könne auf Zuruf ein neues Antibiotikum ausgeben.

So funktioniert der Prozess nicht.

## Eine KI-Vorhersage ist noch kein Medikament

Auch ein sehr guter Treffer eines Modells ist zunächst nur ein Kandidat.

Anschließend muss experimentell überprüft werden, ob das Molekül den gewünschten Erreger tatsächlich hemmt oder abtötet. Danach folgen weitere Fragen.

Wie hoch muss die Konzentration sein? Schädigt das Molekül menschliche Zellen? Wie stabil ist es? Wie schnell entstehen Resistenzen? Wie verhält es sich im Körper? Kann es zuverlässig hergestellt werden?

Erst deutlich später würden bei einem erfolgreichen Kandidaten präklinische Untersuchungen, regulatorische Verfahren und klinische Studien folgen.

Zwischen "KI findet eine interessante Sequenz" und "neues Antibiotikum" liegt deshalb weiterhin ein langer Entwicklungsprozess.

Auch de la Fuente weist ausdrücklich darauf hin, dass KI-Ergebnisse überprüft werden müssen.

Gerade in der Biologie bleibt experimentelle Validierung damit nicht das Gegenstück zur KI, sondern ein zentraler Bestandteil des gesamten Verfahrens.

## Der eigentliche Fortschritt liegt in der Vorauswahl

Der interessanteste Aspekt der Arbeit ist deshalb nicht, dass ChatGPT plötzlich Medikamente entwickelt.

Spannender ist die Veränderung des Suchprozesses.

Traditionell müssen Forschende entscheiden, welche Organismen, Moleküle oder Stoffklassen überhaupt untersucht werden. Digitale biologische Daten und spezialisierte KI-Modelle erweitern diesen Suchraum erheblich.

Millionen oder sogar hunderte Millionen Sequenzen können zunächst rechnerisch bewertet werden.

Damit werden Datenquellen interessant, die experimentell kaum systematisch untersucht werden könnten. Dazu gehören die Proteine ausgestorbener Tiere ebenso wie bislang wenig erforschte Mikroorganismen.

ChatGPT und Codex ergänzen diesen Ansatz auf einer anderen Ebene. Sie senken die technische Hürde zwischen einer wissenschaftlichen Idee und ihrer computergestützten Umsetzung.

## KI beschleunigt die Suche, nicht die Zulassung

Die Arbeit des de-la-Fuente-Labors zeigt ziemlich gut, wo KI in der Wissenschaft bereits praktisch eingesetzt werden kann.

Spezialisierte Modelle durchsuchen enorme biologische Datenbestände und priorisieren mögliche Wirkstoffe. ChatGPT unterstützt beim Entwickeln und Verbinden von Ideen. Codex hilft dabei, Analysecode und Datenpipelines schneller umzusetzen.

Der entscheidende Schritt bleibt trotzdem außerhalb des Sprachmodells.

Ein vorhergesagtes Molekül muss hergestellt und im Labor getestet werden. Danach beginnt erst der lange Weg von einem interessanten Kandidaten zu einem möglicherweise nutzbaren Medikament.

Gerade deshalb ist der Ansatz interessant. KI muss nicht die gesamte Medikamentenentwicklung automatisieren, um einen relevanten Unterschied zu machen. Es kann bereits reichen, einen Suchprozess, der früher Jahre beanspruchte, an entscheidenden Stellen erheblich zu beschleunigen.
