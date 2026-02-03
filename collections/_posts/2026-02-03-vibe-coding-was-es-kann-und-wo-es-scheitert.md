---
layout: post
title: 'Was ist Vibe Coding? Was es kann und wo es scheitert'
date: 2026-02-03 10:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - software-development
    - vibecoding
description: 'Vibe Coding verspricht schnelle Prototypen mit KI, aber nicht jede Abkürzung führt zum Ziel'
thumbnail: '/assets/images/gen/blog/vibe-coding-was-es-kann-und-wo-es-scheitert/header_thumbnail.webp'
image: '/assets/images/gen/blog/vibe-coding-was-es-kann-und-wo-es-scheitert/header.webp'
---

Ich hab in den letzten Wochen [drei Apps](https://oliverjessner.at/blog/2026-02-01-pinefetch-mal-anders-yt-dlp-als-lokale-macos-app/) per Vibe Coding gebaut, und online lautete die häufigste Frage: "was ist vibe coding".

## Was ist Vibe Coding?

Gemeint ist ein Arbeitsstil, bei dem du Software weniger über einen sauberen Plan baust, sondern über schnelle Iterationen, Prompting und Experimentieren. Du formst Verhalten, statt es von Anfang an präzise zu konstruieren.

Typisch ist dabei:

- Du startest mit einer groben Idee und lässt dir von einer KI Code, UI oder Tests vorschlagen
- Du klickst, probierst, wirfst weg, passt an, wiederholst
- Du erstellst einen Prototyp

Das ist kein neuer Skill, sondern eine neue Gewichtung. Planung und Spezifikation rücken nach hinten. Feedback, Geschwindigkeit und Gefühl rücken nach vorn. Gerade in [KI](https://oliverjessner.at/category/KI/) geprägten Workflows wirkt das attraktiv, weil die Einstiegshürde sinkt und die Exploration belohnt wird.

## Warum es gerade so gut funktioniert

Vibe Coding profitiert von zwei Faktoren, die in vielen Projekten ohnehin dominieren:

Erstens: Viele Anforderungen sind am Anfang unklar. In der Praxis wissen Teams oft erst nach dem ersten Klickpfad, welche Daten fehlen, welche Texte unverständlich sind oder welche Edge Cases real auftreten.

Zweitens: Ein großer Teil moderner Arbeit ist Integration. APIs anbinden, Daten parsen, UI zusammenstecken, Build Pipeline anpassen. In genau diesen Bereichen liefert KI häufig brauchbare Vorschläge, weil es bekannte Muster gibt.

Wenn du also ein kleines Tool baust, eine Idee validierst oder einen Prototypen brauchst, kann Vibe Coding erstaunlich effizient sein.

## Vor- und Nachteile

Vibe Coding ist nicht "gut" oder "schlecht". Es ist ein Trade-off. Der lohnt sich in manchen Situationen und ist in anderen gefährlich.

Vorteile:

- Sehr schnelle Prototypen und Demos
- Gute Unterstützung bei Boilerplate, UI-Gerüsten, Datenmodellen, API-Clients
- Schnellere Exploration von Alternativen, weil Wechselkosten sinken
- Niedrigere Einstiegshürde für Leute, die noch nicht tief im Stack sind

Nachteile:

- Architektur entsteht oft zufällig statt absichtlich
- Komplexität wird verschoben, statt gelöst, und taucht später auf
- Sicherheitsprobleme und Lizenzrisiken werden leicht übersehen
- Tests wirken optional, bis sie plötzlich dringend sind
- Wartbarkeit leidet, wenn niemand versteht, warum etwas so gebaut ist

Für [Software Development](https://oliverjessner.at/category/software-development/) ist das der Kern: Geschwindigkeit ist nur dann ein Gewinn, wenn sie nicht zu teurem Nacharbeiten führt.

## Was Vibe Coding wirklich kann – und wo es scheitert

Damit Vibe Coding nicht zum Synonym für "Chaos" wird, hilft eine klare Grenze: Es ist stark bei Veränderung, schwach bei Verlässlichkeit.

Vibe Coding kann sehr gut:

- ein UI skizzieren, das sich "richtig" anfühlt
- einen Prototypen bauen, um eine Hypothese zu testen
- wiederkehrende Muster implementieren, die du ohnehin reviewen würdest
- Datenformate, Parsing und kleine Automationen erstellen
- kleine interne Tools, die du selbst betreibst und verstehst

Vibe Coding scheitert typischerweise, wenn:

- du Compliance, Security oder Datenschutz korrekt umsetzen musst
- das System langfristig wachsen und stabil bleiben soll
- mehrere Leute parallel arbeiten und klare Schnittstellen brauchen
- du in Performance, Nebenläufigkeit oder Low-Level Details landest
- du nicht mehr weißt, welche Teile du eigentlich überprüft hast

Ein praktischer Hinweis aus dem Alltag: Sobald ein Projekt Nutzer hat, wird jede Abkürzung sichtbar. Nicht sofort, aber zuverlässig.

## Kann jetzt jeder programmieren?

Ja, mit einem kleinen Aber: Je mehr man von Softwareentwicklung versteht, desto besser. So gut Vibe Coding heute funktioniert, im Vergleich zu 2024/Anfang 2025 –, kommt irgendwann der Punkt, an dem die Software einen Bug hat. Das kann schon früh passieren, wenn der Prompt groß und komplex ist. Es kann aber auch erst beim Implementieren des dritten Features passieren.

Das Problem ist dann, den Fehler sauber zu beschreiben, Terminal-Errors richtig zu interpretieren und der KI eine sinnvolle Lösung bzw. einen Lösungsansatz vorzuschlagen.

Ein weiteres Thema ist UX: Ich war schon immer ein großer Vertreter davon, dass 99% der Applikationen nur dann Erfolg haben, wenn sie auch UX-technisch passen. Beim Vibe Coding klappt das nicht immer. Manchmal werden UX-Praktiken von etablierten Apps kopiert, aber gerade wenn man etwas "Neueres" baut, kommt es schnell zu kleinen Komplikationen.

## Ein Workflow, der Vibe Coding erwachsen macht

Du kannst [Vibe Coding](https://oliverjessner.at/category/vibecoding/) so einsetzen, dass es nicht gegen dich arbeitet. Dazu braucht es ein paar harte Regeln, die du dir nicht wegprompten kannst.

1. Definiere den Rahmen vor dem ersten Prompt

- Welche Plattform, welche Sprache, welche Libraries
- Was ist in Scope und was nicht
- Welche Daten sind sensibel

2. Arbeite in kleinen Schritten
   Wenn du der KI große, vage Aufgaben gibst, bekommst du große, vage Antworten. Kleine Aufgaben erhöhen die Chance, dass du wirklich verstehst, was du übernimmst.

3. Review wie bei einem fremden Pull Request
   Behandle KI-Code wie Code eines neuen Teammitglieds, das schnell ist, aber Kontext nicht kennt. Das ist kein Misstrauen, das ist Prozess.

4. Schalte Tests früh dazu
   Nicht als perfekte Test Suite, sondern als Sicherheitsnetz. Schon ein paar smoke tests helfen, wenn du iterierst.

Hier ist ein Beispiel, wie du aus "vibe" einen kontrollierten Schritt machst, ohne den Flow zu verlieren:

```text
Ziel: Implementiere eine Funktion parsePrice(input: string) -> number | null.
Regeln:
- Akzeptiere "12,99", "12.99", "€ 12,99", "12,99 €"
- Leere Strings oder unklare Inputs -> null
- Keine Exceptions werfen
- Schreibe 8 Tests, inklusive Edge Cases
Kontext: TypeScript, Node 20, Vitest
Bitte zuerst nur die Tests, dann die Implementierung.
```

Das wirkt banal, aber es zwingt dich in eine Reihenfolge: erst Erwartungen, dann Code. Genau hier wird Vibe Coding stabil.
