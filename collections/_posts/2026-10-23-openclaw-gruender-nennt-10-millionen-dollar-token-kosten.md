---
layout: post
title: 'OpenClaw-Gründer nennt 10 Millionen Dollar Token-Kosten'
date: 2026-10-23 14:42:29 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - openai
    - software-development
    - cloud
description: '10 Millionen Dollar für KI-Token: Was hinter Peter Steinbergers Aussage steckt und wie sich OpenClaw-Kosten nachvollziehen lassen'
thumbnail: '/assets/images/gen/blog/openclaw-gruender-nennt-10-millionen-dollar-token-kosten/header_thumbnail.webp'
image: '/assets/images/gen/blog/openclaw-gruender-nennt-10-millionen-dollar-token-kosten/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Wie hoch sind die monatlichen Kosten von OpenClaw?'
      answer: 'Es gibt keinen einheitlichen Betrag. Modellpreise, Kontextumfang und Anzahl der Aufrufe bestimmen die Kosten. Steinbergers Zehn-Millionen-Schätzung ist kein allgemeiner Monatspreis für OpenClaw.'
    - question: 'Warum verbrauchen KI-Agenten viele Token?'
      answer: 'Agenten bearbeiten Aufgaben oft in mehreren Schritten. Dabei können Anweisungen, Gesprächsverlauf und Werkzeugergebnisse wiederholt verarbeitet werden. Zusätzlich entstehen Ausgabetoken.'
    - question: 'Kann OpenClaw ohne kostenpflichtige Modell-API laufen?'
      answer: 'Ja, mit einem geeigneten lokalen Modell. Für diese Aufrufe entfallen externe API-Gebühren. Hardware, Strom, Betriebsaufwand und gegebenenfalls weitere angebundene Dienste bleiben Kostenfaktoren.'
socialmedia:
    - 'OpenClaw-Gründer Peter Steinberger nennt rund zehn Millionen Dollar für einen Monat KI-Nutzung. Warum diese Schätzung keine allgemeine Aussage über OpenClaw-Kosten erlaubt und welche Angaben zur Einordnung fehlen.'
    - 'Bei KI-Agenten zählt mehr als die Länge der Antwort. Verlauf, Anweisungen und Werkzeugergebnisse können bei vielen Modellaufrufen erneut Kosten verursachen. So lässt sich der Tokenverbrauch von OpenClaw nachvollziehen.'
    - 'OpenClaw lokal auszuführen bedeutet noch nicht, dass auch das KI-Modell lokal läuft. Was das für API-Kosten bedeutet und warum der Preis pro brauchbarem Ergebnis die interessantere Kennzahl ist.'
news: true
---

OpenClaw-Gründer Peter Steinberger schätzt seinen Tokenverbrauch für September auf rund zehn Millionen Dollar. Was die Angabe bedeutet und wie sich die Kosten von KI-Agenten einordnen lassen.

## Peter Steinberger und die zehn Millionen Dollar für KI-Token

Peter Steinberger, Gründer des KI-Assistenten OpenClaw und Entwickler bei [OpenAI](https://oliverjessner.at/category/openai/), hat seinen Tokenverbrauch für September 2026 auf rund zehn Millionen US-Dollar geschätzt. Das berichtet [The Register](https://www.theregister.com/ai-and-ml/2026/10/21/openclaw-creator-says-he-spent-10-million-in-tokens-last-month/5304573) über ein Gespräch mit Cloudflare-CTO Dane Knecht auf der Cloudflare Connect. [Golem griff die Meldung am 22. Oktober auf](https://www.golem.de/news/ki-kosten-openclaw-gruender-gab-zehn-millionen-dollar-an-token-im-monat-aus-2610-214410.html).

Für die Einordnung fehlen allerdings wesentliche Angaben: Welche Modelle wurden verwendet? Welche Preise liegen der Schätzung zugrunde? Welche Projekte sind enthalten? Der Bericht liefert dazu keine Aufschlüsselung. Ob der Betrag öffentlichen API-Preisen oder einer anderen Bewertung entspricht, bleibt offen.

**Die Angabe belegt weder eine private Zahlung von zehn Millionen Dollar noch entsprechende monatliche Betriebskosten für OpenClaw.** Auch welcher Anteil der Nutzung auf das Projekt entfiel, lässt sich daraus nicht ableiten.

## Was OpenClaw ist und wo Kosten entstehen

[OpenClaw](https://docs.openclaw.ai/help/faq/what-is-openclaw) ist ein quelloffener KI-Assistent, der auf eigener Infrastruktur läuft. Er verbindet Sprachmodelle mit Werkzeugen und Kommunikationskanälen. Dadurch kann er etwa Dateien bearbeiten oder Aufgaben über einen Messenger entgegennehmen.

Die Software und das verwendete Modell sind dabei getrennte Komponenten. Ein lokal gestartetes OpenClaw kann weiterhin einen kostenpflichtigen Modelldienst im Internet aufrufen. Für die Kosten ist deshalb entscheidend, welches Modell arbeitet und wie es abgerechnet wird.

## Warum KI-Agenten so viele Token verbrauchen können

Token sind die Verarbeitungseinheiten eines Sprachmodells. Bei Text können das Wörter, Wortteile oder Satzzeichen sein. Ein Token entspricht deshalb nicht automatisch einem Wort.

Bei [KI-Agenten](https://oliverjessner.at/category/ki/) bleibt es häufig nicht bei einer Anfrage und einer Antwort. Ein Auftrag kann mehrere Schritte auslösen: Informationen lesen, eine Änderung planen, ein Werkzeug aufrufen und das Ergebnis prüfen.

Zum verarbeiteten Kontext gehören neben der aktuellen Frage auch Anweisungen, Gesprächsverlauf und Werkzeugergebnisse. Die [OpenClaw-Dokumentation zum Kontext](https://docs.openclaw.ai/concepts/context) beschreibt diese Bestandteile. Werden sie in mehreren Modellaufrufen erneut verarbeitet, wächst die insgesamt gezählte Tokenmenge.

Ein vereinfachtes Beispiel: 20 Modellaufrufe mit jeweils 15.000 Eingabetoken ergeben zusammen 300.000 Eingabetoken. Dazu kommen die erzeugten Ausgaben. Das ist eine Beispielrechnung, keine Rekonstruktion von Steinbergers Nutzung.

Welche Kosten daraus entstehen, hängt von Modell und Tarif ab. Eingabe, Ausgabe und zwischengespeicherter Kontext können unterschiedliche Preise haben. Die [Dokumentation zu Token-Kosten](https://docs.openclaw.ai/reference/token-use) unterscheidet deshalb auch diese Abrechnungskategorien. Wiederholt verwendeter Kontext muss nicht jedes Mal zum vollen Eingabepreis abgerechnet werden.

## OpenClaw-Kosten und Tokenverbrauch prüfen

Wer OpenClaw nutzt, kann den Verbrauch direkt im Chat nachvollziehen. Die [dokumentierten Befehle](https://docs.openclaw.ai/reference/token-use) bieten unterschiedliche Perspektiven:

- `/status` zeigt unter anderem das aktive Modell, die Kontextauslastung und Angaben zum letzten Tokenverbrauch.
- `/usage full` ergänzt Antworten um Angaben zu Modell, Kontext und Kosten, soweit die nötigen Informationen vorliegen.
- `/usage cost` fasst Kosten aus den lokalen Sitzungsprotokollen zusammen.
- `/context detail` schlüsselt auf, welche Bestandteile den Kontext belegen.

**Hinweis:** Diese Anzeigen helfen beim Beobachten. Sie setzen keine automatische Ausgabengrenze. Laut [OpenClaws Dokumentation zur Kostenerfassung](https://docs.openclaw.ai/reference/api-usage-costs) bilden lokale Auswertungen die verfügbaren Sitzungsdaten ab und ersetzen keine Anbieterrechnung. Fehlende Preise oder unvollständige Protokolle begrenzen ihre Aussagekraft.

Für den Alltag empfiehlt sich ein klar begrenzter Test mit repräsentativen Aufgaben. Dabei lassen sich unnötig große Eingaben, wiederholte Fehlversuche und aufwendige Abläufe erkennen. Eine Kostenwarnung sollte außerdem nicht mit einem harten Ausgabenlimit verwechselt werden. Ob und wie ein Anbieter weitere Aufrufe tatsächlich stoppt, muss separat geprüft werden.

## Senkt ein lokales KI-Modell die Kosten?

OpenClaw unterstützt auch [lokale Modelle](https://docs.openclaw.ai/gateway/local-models), etwa über Ollama oder LM Studio. Werden die Modellaufrufe vollständig auf eigener Hardware verarbeitet, entfallen dafür externe API-Gebühren. Hardware, Strom und Betriebsaufwand bleiben Kostenfaktoren. Angebundene externe Dienste können zusätzlich Geld kosten.

Die vorhandene Hardware muss außerdem zur Aufgabe passen. Laut Dokumentation hängen die Anforderungen unter anderem von Modellgröße und Kontextumfang ab. Dass ein Modell geladen werden kann, garantiert noch keinen zuverlässigen Agentenbetrieb.

Für einen sinnvollen Vergleich sollten lokale und gehostete Modelle dieselben Aufgaben bearbeiten. Neben dem Preis zählen Bearbeitungszeit, Ergebnisqualität und notwendige Nacharbeit.

## Entscheidend sind die Kosten pro brauchbarem Ergebnis

Steinberger räumte laut The Register ein, dass nicht die gesamte Nutzung nützlich gewesen sei. Wie groß der unproduktive Anteil war, bleibt unbeziffert.

Für die Praxis ergibt sich daraus ein sinnvoller Maßstab: Was kostet eine erfolgreich erledigte und überprüfte Aufgabe? Dazu gehören Modellgebühren, weitere Betriebskosten sowie menschliche Prüfung und Nacharbeit.

Ein günstiger Aufruf kann teuer werden, wenn er viele Korrekturen erfordert. Ein aufwendigerer Ablauf kann sich rechnen, wenn er verlässlich Arbeit spart. Ob das gelingt, lässt sich an konkreten Ergebnissen beurteilen. Die reine Tokenmenge reicht dafür nicht aus.
