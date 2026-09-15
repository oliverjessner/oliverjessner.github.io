---
layout: post
title: 'ChatGPT-Datenschutz: Menschen lesen Prompts für das KI-Training'
date: 2026-09-15 09:19:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - Privacy
    - openai
description: 'OpenAI lässt ChatGPT-Prompts von Menschen prüfen. Was Project Lily bedeutet und wie du die Nutzung deiner Chats für das KI-Training deaktivierst'
thumbnail: '/assets/images/gen/blog/chatgpt-datenschutz-menschen-lesen-prompts-fuer-das-ki-training/header_thumbnail.webp'
image: '/assets/images/gen/blog/chatgpt-datenschutz-menschen-lesen-prompts-fuer-das-ki-training/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Können Menschen meine ChatGPT-Prompts lesen?'
      answer: 'Ja. ChatGPT-Inhalte können unter bestimmten Voraussetzungen von autorisierten Mitarbeitern oder externen Prüfern eingesehen werden, etwa zur Modellverbesserung oder bei Sicherheitsprüfungen.'
    - question: 'Wie verhindere ich, dass meine ChatGPT-Chats für das Training verwendet werden?'
      answer: 'Unter Einstellungen > Datenkontrollen lässt sich "Das Modell für alle verbessern" deaktivieren. Neue Gespräche werden dann nicht mehr für das Training der Modelle verwendet.'
    - question: 'Werden temporäre ChatGPT-Chats von Menschen gelesen?'
      answer: 'Temporäre Chats werden nicht für das Modelltraining verwendet. OpenAI weist jedoch darauf hin, dass sie zur Überwachung von Missbrauch geprüft und für eine begrenzte Zeit gespeichert werden können.'
socialmedia:
    - 'ChatGPT-Prompts können von Menschen geprüft werden, wenn sie zur Modellverbesserung genutzt werden. Ich zeige, was hinter Project Lily steckt und wie du das Training mit deinen Chats deaktivierst.'
    - 'Wer liest eigentlich ChatGPT-Chats? Ein Bericht über Project Lily zeigt, wie externe Prüfer reale Prompts bewerten. Wichtig: Die Nutzung für das KI-Training lässt sich in den Datenkontrollen abschalten.'
    - 'ChatGPT ist kein vertrauliches Notizbuch. Wer sensible Daten eingibt, sollte wissen, wie Modelltraining, menschliche Prüfung und temporäre Chats funktionieren. Die wichtigsten Datenschutz-Einstellungen im Überblick.'
news: true
---

ChatGPT wirkt wie ein privates Gespräch mit einer Maschine. Tatsächlich können Prompts unter bestimmten Voraussetzungen auch von Menschen geprüft werden. Entscheidend ist, wofür ein Chat verarbeitet wird und welche Einstellungen im eigenen Konto aktiv sind.

## Menschen können echte ChatGPT-Prompts lesen

Wer mit ChatGPT arbeitet, schickt längst nicht mehr nur harmlose Wissensfragen an eine [KI](https://oliverjessner.at/category/ki/). In Chats landen Quellcode, berufliche Dokumente, persönliche Probleme, Vertragsentwürfe, medizinische Fragen oder interne Informationen aus Unternehmen.

Umso wichtiger ist die Frage, wer diese Inhalte tatsächlich sehen kann.

Ein [Bericht von Golem](https://www.golem.de/news/datenschutz-bei-ki-openai-laesst-ki-prompts-von-menschen-lesen-2609-213015.html) zeigt unter Berufung auf Recherchen von 404 Media, dass OpenAI externe Mitarbeiter einsetzt, die reale ChatGPT-Unterhaltungen prüfen und bewerten.

Dabei geht es nicht primär darum, einzelne Nutzer zu überwachen. Die Prüfer sollen beurteilen, wie gut ChatGPT auf reale Anfragen reagiert. Diese Bewertungen können anschließend zur Verbesserung der Modelle und ihrer Antworten genutzt werden.

Für den [Datenschutz](https://oliverjessner.at/category/privacy/) ist trotzdem relevant, dass ein Prompt nicht zwangsläufig ausschließlich automatisiert verarbeitet wird.

## Was ist Project Lily?

Die von 404 Media beschriebenen Arbeiten laufen unter dem Namen "Project Lily".

Externe Prüfer erhalten dem Bericht zufolge über spezielle Oberflächen Zugriff auf ausgewählte reale Prompts. Teilweise kann dabei nicht nur eine einzelne Nachricht, sondern auch zusätzlicher Gesprächskontext sichtbar sein.

Die Mitarbeiter sollen unter anderem Anfragen zusammenfassen und verschiedene von ChatGPT erzeugte Antworten bewerten. Dabei wird beispielsweise beurteilt, welche Antwort hilfreicher, angemessener oder professioneller formuliert ist.

Solche menschlichen Bewertungen sind für die Entwicklung großer Sprachmodelle nichts Ungewöhnliches. Modelle lassen sich nicht ausschließlich anhand mathematischer Kennzahlen optimieren. Bei Eigenschaften wie Tonalität, Verständlichkeit oder Relevanz ist menschliches Feedback weiterhin wichtig.

Der entscheidende Punkt ist daher weniger, dass Menschen an der Verbesserung von KI-Modellen beteiligt sind. Relevant ist, dass dafür Inhalte aus realen Nutzerinteraktionen verwendet werden können.

## Welche Informationen können die Prüfer sehen?

OpenAI versucht, personenbezogene Informationen zu reduzieren, bevor Inhalte an Prüfer weitergegeben werden.

Dafür kommt unter anderem ein sogenannter Privacy Filter zum Einsatz. Er soll identifizierbare Informationen erkennen und aus den Daten entfernen beziehungsweise maskieren.

Eine perfekte Anonymisierung lässt sich dadurch allerdings nicht garantieren.

Ein Chat muss keine E-Mail-Adresse oder einen vollständigen Namen enthalten, um Rückschlüsse auf eine Person zu ermöglichen. Arbeitgeber, Wohnort, Projektname, berufliche Position oder andere Details können zusammengenommen ebenfalls eine Identifikation erleichtern.

Gerade längere Gespräche enthalten häufig Kontext, der einzeln betrachtet harmlos wirkt, in Kombination aber sehr spezifisch werden kann.

Das ist ein grundsätzliches Problem bei der Verarbeitung freier Texte: Personenbezogene Informationen bestehen nicht nur aus klar erkennbaren Feldern wie Name, Telefonnummer oder Adresse.

## Sind alle ChatGPT-Nutzer betroffen?

Nein. Entscheidend ist unter anderem, ob eigene Inhalte für die Verbesserung der Modelle verwendet werden dürfen.

Bei persönlichen ChatGPT-Konten kann die Nutzung von Gesprächen zur Modellverbesserung aktiviert sein. Dazu gehören persönliche Free-, Plus- und Pro-Konten.

Bei Angeboten für Unternehmen, Bildungseinrichtungen sowie bei der API gelten andere Voreinstellungen. Dort werden Ein- und Ausgaben laut OpenAI standardmäßig nicht zum Training der allgemeinen Modelle verwendet.

Damit gibt es einen wichtigen Unterschied zwischen der Nutzung von ChatGPT als privater Nutzer und dem Einsatz entsprechender Business-Produkte.

Für Unternehmen ist das besonders relevant. Wer interne Daten, Kundendaten oder vertrauliche Dokumente mit einem KI-Dienst verarbeitet, sollte sich nicht allein darauf verlassen, dass ein Chatfenster privat aussieht.

## ChatGPT-Training deaktivieren

Wer nicht möchte, dass neue ChatGPT-Unterhaltungen zur Verbesserung der Modelle verwendet werden, kann diese Nutzung deaktivieren.

Im Web funktioniert das aktuell über:

1. Profil öffnen
2. "Einstellungen" auswählen
3. "Datenkontrollen" öffnen
4. "Das Modell für alle verbessern" deaktivieren

Die Einstellung gilt für das Konto und wird zwischen den Geräten synchronisiert.

Bereits vorhandene Chats verschwinden dadurch nicht automatisch aus dem Verlauf. Neue Gespräche werden nach dem Deaktivieren jedoch nicht mehr für das Training der Modelle verwendet.

Das ist derzeit eine der wichtigsten Einstellungen für Nutzer, die ChatGPT regelmäßig mit beruflichen oder persönlichen Informationen verwenden.

## Training deaktivieren bedeutet nicht vollständige Unsichtbarkeit

Hier ist eine wichtige Unterscheidung notwendig.

Das Abschalten der Modellverbesserung bedeutet nicht, dass technisch niemals ein Mensch Zugriff auf Inhalte haben kann.

Neben dem Training gibt es weitere Gründe, warum ein Anbieter Inhalte prüfen kann. Dazu gehören beispielsweise Sicherheitsuntersuchungen, die Bearbeitung von Supportfällen, rechtliche Anforderungen oder die Prüfung möglicher Verstöße gegen Nutzungsregeln.

[OpenAI](https://oliverjessner.at/category/openai/) beschreibt selbst den Einsatz einer Kombination aus automatischen Systemen und menschlicher Prüfung zur Durchsetzung seiner Sicherheitsregeln.

Wer die Trainingsfreigabe deaktiviert, reduziert also einen konkreten Verwendungszweck seiner Chats. Daraus sollte aber nicht der Schluss gezogen werden, dass jede Unterhaltung technisch ausschließlich zwischen Nutzer und Modell verbleibt.

## Was bringen temporäre Chats?

ChatGPT bietet zusätzlich temporäre Chats an.

Diese Gespräche erscheinen nicht dauerhaft im normalen Chatverlauf und werden nicht zur Verbesserung der Modelle verwendet. Sie eignen sich deshalb besser für Unterhaltungen, die später nicht Teil der regulären Chat-Historie sein sollen.

Auch hier gibt es allerdings Einschränkungen.

OpenAI weist darauf hin, dass temporäre Chats aus Sicherheitsgründen für eine begrenzte Zeit gespeichert und zur Überwachung von Missbrauch überprüft werden können.

Ein temporärer Chat ist deshalb keine Ende-zu-Ende-verschlüsselte Unterhaltung und sollte auch nicht als digitaler Tresor verstanden werden.

## Welche Daten würde ich nicht in ChatGPT eingeben?

Die sinnvollste Datenschutzmaßnahme ist weiterhin, sensible Daten gar nicht erst unnötig an einen externen Dienst zu übertragen.

Dazu zählen für mich insbesondere Passwörter, API-Keys, private Schlüssel, vollständige Kreditkartendaten, nicht anonymisierte Kundendaten oder vertrauliche Geschäftsunterlagen, für deren Verarbeitung keine entsprechende Freigabe besteht.

Bei Quellcode oder technischen Logs kommt es auf den Kontext an. Ein isolierter Fehlerausschnitt ist etwas anderes als ein vollständiges proprietäres Repository inklusive Zugangsdaten und interner Infrastrukturinformationen.

Ähnliches gilt für persönliche Informationen. Eine allgemeine Frage zu einem Vertrag oder einer Erkrankung benötigt häufig keinen vollständigen Namen, keine Adresse und kein Geburtsdatum.

Oft lässt sich der für eine hilfreiche Antwort notwendige Kontext von den identifizierenden Informationen trennen.

## ChatGPT ist ein Dienst und kein privates Notizbuch

Der Bericht über Project Lily macht vor allem sichtbar, wie leicht bei generativer KI eine falsche Vorstellung von Privatheit entstehen kann.

Die Oberfläche vermittelt ein direktes Gespräch mit einem Modell. Hinter dieser Oberfläche steht jedoch eine technische Infrastruktur zur Speicherung, Verarbeitung, Sicherheitsprüfung und teilweise auch Verbesserung der Systeme.

Menschliche Bewertungen sind dabei nur ein Teil dieser Infrastruktur.

Für die praktische Nutzung folgt daraus keine Notwendigkeit, auf ChatGPT oder andere KI-Systeme zu verzichten. Es lohnt sich aber, bei jeder Eingabe dieselbe Frage zu stellen wie bei anderen Cloud-Diensten: Muss diese Information wirklich übertragen werden?

Wer persönliche oder vertrauliche Daten verarbeitet, sollte seine Datenkontrollen prüfen, die Trainingsfreigabe bewusst konfigurieren und Informationen vor der Eingabe soweit wie möglich anonymisieren.

Das ist weniger spektakulär als die Vorstellung, dass jemand "meine Chats liest". Für den tatsächlichen Datenschutz ist diese nüchterne Betrachtung aber deutlich hilfreicher.
