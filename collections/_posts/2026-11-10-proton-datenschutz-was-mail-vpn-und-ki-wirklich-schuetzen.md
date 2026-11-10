---
layout: post
title: 'Proton Datenschutz: Was Mail, VPN und KI wirklich schützen'
date: 2026-11-10 09:51:41 +0100
authors:
  - oliver_jessner
meta_og_type: article
categories:
  - Privacy
  - cloud
  - KI
  - software-engineering
description: Wie privat ist Proton? Was Behörden erhalten können, warum Mail und VPN unterschiedliche Grenzen haben und was hinter dem KI-Streit steckt
thumbnail: /assets/images/gen/blog/proton-datenschutz-was-mail-vpn-und-ki-wirklich-schuetzen/header_thumbnail.webp
image: /assets/images/gen/blog/proton-datenschutz-was-mail-vpn-und-ki-wirklich-schuetzen/header.webp
faq:
  - question: Gibt Proton Nutzerdaten an Behörden weiter?
    answer: Proton kann durch verbindliche Anordnungen zuständiger Schweizer Behörden zur Herausgabe vorhandener Nutzerdaten verpflichtet werden. Daraus folgt kein Zugriff auf Ende-zu-Ende-verschlüsselte Inhalte.
  - question: Gilt die No-Logs-Richtlinie von Proton VPN auch für Proton Mail?
    answer: Die Datenschutzbedingungen unterscheiden sich je nach Dienst. Die No-Logs-Richtlinie von Proton VPN lässt sich nicht pauschal auf Proton Mail oder das gesamte Proton-Konto übertragen.
  - question: Nutzt Lumo meine Chats zum KI-Training?
    answer: Laut Proton werden Lumo-Chats grundsätzlich nicht für das Modelltraining verwendet. Eine ausdrücklich bestätigte Ausnahme besteht für anonymisiertes Feedback zum Modell Apertus 1.5.
socialmedia:
  - Wie privat ist Proton? Verschlüsselte Inhalte, Kontodaten und Zahlungsinformationen brauchen eine getrennte Betrachtung. Ein Blick auf Behördenanfragen, US-Dienstleister und die Unterschiede zwischen Mail und VPN.
  - Proton Mail und Proton VPN haben unterschiedliche Datenschutzgrenzen. Warum eine No-Logs-Richtlinie kein Versprechen für das gesamte Konto ist und was der Transparenzbericht tatsächlich zeigt.
  - Der KI-Streit bei Proton wirft Fragen zur Entwicklung von Sicherheitssoftware auf. Für Nutzer zählt, welche Prüfungen stattfinden und wie nachvollziehbar das Unternehmen seine Zusagen belegt.
news: true
pinned: false
ads: true
image_width: 1280
image_height: 720
---

Proton steht für verschlüsselte E-Mails und digitale Privatsphäre. Die aktuelle Kritik zeigt, warum sich ein genauer Blick auf Behördenanfragen, externe Dienstleister und den KI-Einsatz lohnt.

## Wie privat ist Proton wirklich?

Der Schweizer Anbieter Proton steht wegen Datenherausgaben, US-Dienstleistern und seines internen KI-Kurses in der Diskussion. Eine [Analyse von Golem vom 9. November 2026](https://www.golem.de/news/behoerdendaten-us-dienste-ki-streit-der-schweizer-mythos-proton-wird-entzaubert-2611-214978.html) bündelt diese Kritik.

Für die Einordnung hilft es, drei Fragen getrennt zu beantworten: Welche Inhalte sind verschlüsselt? Welche weiteren Daten fallen an? Und welche Zusagen gelten für welchen Dienst?

Wer sich mit [Privacy](https://oliverjessner.at/category/Privacy/) beschäftigt, sollte genau dort ansetzen. Ein Unternehmenssitz allein beschreibt noch kein vollständiges Schutzkonzept.

## Welche Daten gibt Proton an Behörden weiter?

Proton erklärt in seinen [Informationen für Strafverfolgungsbehörden](https://proton.me/legal/law-enforcement), bei strafrechtlichen Ermittlungen im Rahmen des Schweizer Rechts kooperieren zu müssen.

Laut [Transparenzbericht](https://proton.me/legal/transparency) lehnt das Unternehmen direkte Anfragen ausländischer Behörden ab. Internationale Rechtshilfe kann jedoch dazu führen, dass Schweizer Behörden eine verbindliche Anordnung erlassen.

Für Proton Mail nennt der Bericht für 2025:

- 9.301 rechtliche Anordnungen
- 988 angefochtene Anordnungen
- 8.313 befolgte Anordnungen

Diese Zahlen zeigen, dass Datenherausgaben zum Betrieb des Dienstes gehören. Sie verraten für sich genommen weder, welche Daten jeweils betroffen waren, noch wie viele unterschiedliche Personen dahinterstehen. Insbesondere belegen sie keine Entschlüsselung von Nachrichten.

Proton hält in seiner [Datenschutzerklärung](https://proton.me/legal/privacy) fest, Ende-zu-Ende-verschlüsselte Inhalte nicht entschlüsseln und als Klartext herausgeben zu können. Vorhandene Konto-, Support- oder Zahlungsdaten müssen davon getrennt betrachtet werden.

## Proton Mail und Proton VPN haben unterschiedliche Grenzen

Eine No-Logs-Richtlinie lässt sich nicht von einem Produkt auf das gesamte Unternehmen übertragen.

Für Proton VPN führt der Transparenzbericht 2025 insgesamt 59 Anordnungen auf, die sämtlich abgelehnt wurden. Nach Darstellung des Anbieters zielten die Anfragen darauf ab, anhand einer Server-IP-Adresse und eines Zeitpunkts einzelne Nutzer zu identifizieren. Diese Zuordnung könne Proton nicht vornehmen. Auch diese Angaben stammen aus dem [eigenen Transparenzbericht](https://proton.me/legal/transparency).

Die unterschiedlichen Ergebnisse bei Mail und VPN sind deshalb kein ausreichender Beleg für einen Widerspruch. Die Dienste erfüllen verschiedene Aufgaben und verarbeiten unterschiedliche Daten.

**Wichtig:** Verschlüsselung und Anonymität sind unterschiedliche Eigenschaften. Geschützte Nachrichteninhalte sagen allein wenig darüber aus, ob andere Angaben ein Konto einer Person zuordnen können.

## Warum Proton mit US-Dienstleistern arbeitet

Die Datenschutzerklärung nennt mehrere externe Auftragsverarbeiter. Dazu gehören Zendesk für Supportdaten sowie Stripe, PayPal und Chargebee für Zahlungsdaten. Bei mehreren dieser Anbieter werden die USA als Verarbeitungsort aufgeführt. Proton nennt dafür unter anderem Standardvertragsklauseln und weitere vertragliche Garantien. Die Zuordnung steht in der [Liste der Auftragsverarbeiter](https://proton.me/legal/privacy).

Daraus lässt sich kein pauschaler Zugriff dieser Unternehmen auf verschlüsselte Postfächer ableiten. Gleichzeitig bleibt die Verarbeitung von Support- und Zahlungsinformationen für den Datenschutz relevant.

Für den Alltag ergibt sich eine einfache Konsequenz: Auch eine Supportanfrage ist eine Datenweitergabe. Screenshots, Anhänge und Fehlerbeschreibungen sollten nur enthalten, was zur Lösung tatsächlich gebraucht wird.

## Was hinter dem KI-Streit bei Proton steckt

Neben dem Datenschutz steht Protons Umgang mit Beschäftigten beim Einsatz von [KI](https://oliverjessner.at/category/KI/) in der Kritik.

Nach Berichten über geplante Mitarbeitergespräche zur KI-Nutzung erklärte Proton, solche erneuten Befragungen nicht durchzuführen und keine mit der KI-Nutzung verbundenen Stellenverluste vorzusehen. Das Unternehmen kündigte außerdem mehr Transparenz über interne Werkzeuge sowie Code- und Sicherheitsprüfungen an. [TechRadar dokumentiert die Reaktion vom 2. November 2026](https://www.techradar.com/vpn/vpn-services/proton-apologizes-to-community-after-internal-memo-shows-force-behind-proposed-ai-use-in-building-its-privacy-products).

Für Sicherheitssoftware ist entscheidend, wie Änderungen geprüft werden. Der Einsatz eines KI-Werkzeugs allein belegt weder eine Sicherheitslücke noch ausreichende Qualität. Aussagekräftig sind nachvollziehbare Prüfverfahren und deren Umsetzung.

## Verwendet Lumo private Chats zum Training?

Die interne KI-Debatte sollte außerdem von den Datenschutzbedingungen des Chatbots Lumo unterschieden werden.

Laut [Protons Lumo-Dokumentation](https://proton.me/support/lumo-privacy) werden Chats grundsätzlich nicht zum Modelltraining verwendet. Eine ausdrücklich bestätigte Ausnahme betrifft anonymisiertes Feedback für Apertus 1.5. Gespeicherte Gesprächsverläufe sollen durch Zero-Access-Verschlüsselung geschützt sein.

Die Dokumentation beschreibt zugleich, dass Lumo-Anfragen auf den GPU-Servern entschlüsselt werden können. Verschlüsselte Speicherung bedeutet also nicht, dass die KI ausschließlich auf dem eigenen Gerät arbeitet. Diese Angaben beschreiben Protons zugesagtes Schutzmodell; sie ersetzen keine unabhängige technische Überprüfung.

## Worauf Proton-Nutzer achten sollten

Für eine sachliche Entscheidung helfen konkrete Fragen:

- Geht es um den Schutz von Inhalten, der Identität oder beidem?
- Welche Daten verarbeitet der tatsächlich genutzte Dienst?
- Welche Informationen stehen zusätzlich in Zahlungsangaben und Supportanfragen?
- Welche Sicherheitszusagen sind technisch dokumentiert und überprüft?

Meine Einschätzung: Proton sollte an präzisen, überprüfbaren Zusagen gemessen werden. Die Kritik macht deutlich, wie schnell aus einzelnen Schutzfunktionen eine umfassendere Erwartung entsteht. Wer Mail, VPN und Lumo getrennt betrachtet, kann ihren Nutzen und ihre Grenzen wesentlich besser einschätzen.
