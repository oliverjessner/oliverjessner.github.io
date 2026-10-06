---
layout: post
title: 'OpenAI API: Build, Launch und Grow ersetzen die alten Usage Tiers'
date: 2026-10-06 23:40:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - openai
    - KI
    - software-development
    - software-engineering
description: 'OpenAI vereinfacht seine API Usage Tiers: Build, Launch und Grow ersetzen Tier 1 bis 5 und bringen teils deutlich höhere Rate Limits'
thumbnail: '/assets/images/gen/blog/openai-api-build-launch-grow-ersetzen-die-alten-usage-tiers/header_thumbnail.webp'
image: '/assets/images/gen/blog/openai-api-build-launch-grow-ersetzen-die-alten-usage-tiers/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Welche OpenAI API Usage Tiers gibt es jetzt?'
      answer: 'OpenAI ersetzt die bisherigen fünf bezahlten Usage Tiers durch drei Stufen: Build, Launch und Grow.'
    - question: 'Ändern sich durch die neuen OpenAI API Tiers die Preise?'
      answer: 'Nein. Laut OpenAI hat die Umstellung keinen Einfluss auf die API-Preise und erfordert für bestehende Organisationen keine zusätzliche Zahlung.'
    - question: 'Welche Rate Limits gelten bei Build, Launch und Grow?'
      answer: 'Je nach Tier und Modell reichen die Standard-Limits von 5.000 bis 30.000 Requests pro Minute und von 1 Million bis 180 Millionen Tokens pro Minute.'
socialmedia:
    - 'OpenAI vereinfacht die API Usage Tiers: Aus fünf bezahlten Stufen werden Build, Launch und Grow. Für einige Nutzer steigen dabei auch die Rate Limits. Ein Überblick über RPM, TPM und die neuen Grenzen.'
    - 'Tier 1 bis 5 verschwinden bei der OpenAI API. Künftig gibt es Build, Launch und Grow. Was sich bei den Rate Limits ändert und welche Organisationen automatisch höhere Limits erhalten.'
    - 'OpenAI baut seine API Usage Tiers um: drei statt fünf Stufen, automatische Migration und bis zu 180 Millionen TPM bei Luna. Die neuen Rate Limits im Überblick.'
news: true
---

OpenAI vereinfacht die Usage Tiers seiner API. Aus fünf bezahlten Stufen werden drei: Build, Launch und Grow. Für bestehende Organisationen erfolgt die Umstellung automatisch, teilweise mit höheren Rate Limits.

## Aus fünf OpenAI API Usage Tiers werden drei

Wer die [OpenAI](https://oliverjessner.at/openai/) API produktiv nutzt, begegnet früher oder später den Usage Tiers. Sie bestimmen unter anderem, wie viele Requests und Tokens eine Organisation innerhalb eines bestimmten Zeitraums verarbeiten kann.

OpenAI reduziert das bisherige System aus fünf bezahlten Tiers nun auf drei Stufen:

| Bisheriger Tier | Neuer Tier |
| --------------- | ---------- |
| Tier 1          | Build      |
| Tier 2          | Build      |
| Tier 3          | Launch     |
| Tier 4          | Launch     |
| Tier 5          | Grow       |

Die Migration erfolgt automatisch. Bestehende Organisationen müssen ihre Konfiguration nicht ändern und auch keine zusätzliche Zahlung leisten, nur um in den entsprechenden neuen Tier übernommen zu werden.

Auch die regulären API-Preise ändern sich durch die neue Einteilung nicht.

Für Entwickler ist deshalb vor allem eine andere Frage interessant: Welche Rate Limits gelten künftig?

## OpenAI API Rate Limits für Build, Launch und Grow

Die neuen Standard-Limits unterscheiden sich nach Usage Tier und Modellgruppe.

| Usage Tier | Modelle           | Requests pro Minute | Tokens pro Minute |
| ---------- | ----------------- | ------------------: | ----------------: |
| Build      | Astra, Sol, Terra |           5.000 RPM |     1.000.000 TPM |
| Build      | Luna              |           5.000 RPM |     2.000.000 TPM |
| Launch     | Astra, Sol, Terra |          10.000 RPM |     4.000.000 TPM |
| Launch     | Luna              |          10.000 RPM |    10.000.000 TPM |
| Grow       | Astra, Sol, Terra |          15.000 RPM |    40.000.000 TPM |
| Grow       | Luna              |          30.000 RPM |   180.000.000 TPM |

Gerade zwischen Launch und Grow steigt damit nicht nur die Zahl möglicher Requests. Besonders deutlich wächst die verfügbare Token-Kapazität.

Bei Astra, Sol und Terra erhöht sich das TPM-Limit von 4 Millionen in Launch auf 40 Millionen in Grow. Bei Luna steigt es von 10 Millionen auf 180 Millionen Tokens pro Minute.

## Was bedeuten RPM und TPM?

Bei den Rate Limits der OpenAI API sind vor allem zwei Werte wichtig.

**RPM** steht für "Requests per Minute". Der Wert gibt an, wie viele API-Anfragen innerhalb einer Minute verarbeitet werden dürfen.

**TPM** steht für "Tokens per Minute". Dieses Limit betrifft die Menge der Tokens, die innerhalb einer Minute verarbeitet werden kann.

Beide Grenzen sind unabhängig voneinander relevant. Eine Anwendung kann deshalb beispielsweise noch ausreichend freie Requests haben, aber trotzdem an das Token-Limit stoßen.

Das spielt besonders bei Anwendungen eine Rolle, die große Kontexte, lange Ausgaben oder viele parallele AI-Workloads verarbeiten. Für die praktische [Softwareentwicklung](https://oliverjessner.at/software-development/) ist ein hohes RPM-Limit allein daher nicht automatisch ausreichend.

## Tier 1 und Tier 3 erhalten höhere Limits

Nicht jede Organisation bekommt durch die Umstellung tatsächlich mehr Kapazität.

OpenAI unterscheidet hier nach dem bisherigen Usage Tier:

- Organisationen aus Tier 1 wechseln zu Build und erhalten höhere Rate Limits.
- Organisationen aus Tier 2 wechseln ebenfalls zu Build, behalten aber ihre bisherigen Limits.
- Organisationen aus Tier 3 wechseln zu Launch und erhalten höhere Rate Limits.
- Organisationen aus Tier 4 wechseln zu Launch und behalten ihre bisherigen Limits.
- Organisationen aus Tier 5 wechseln zu Grow und behalten ihre bisherigen Limits.

Die neue Bezeichnung bedeutet also nicht automatisch, dass sich das verfügbare Kontingent einer bestehenden Organisation verändert.

Für Nutzer aus Tier 1 und Tier 3 ist die Umstellung dagegen unmittelbar interessant, weil OpenAI ihre Limits anhebt.

## Grow wird für größere API-Workloads interessant

Besonders auffällig ist Grow bei Luna.

Mit bis zu 30.000 Requests und 180 Millionen Tokens pro Minute liegt das Limit deutlich über den anderen Standard-Tiers. Das kann bei Anwendungen relevant werden, die sehr viele parallele, vergleichsweise kleine Modellaufrufe verarbeiten.

Bei Astra, Sol und Terra liegt Grow bei 15.000 RPM und 40 Millionen TPM.

Solche Limits sind beispielsweise für größere [KI](https://oliverjessner.at/ki/) Pipelines, Agentensysteme, Batch-Verarbeitung oder stark frequentierte SaaS-Anwendungen relevanter als für klassische Einzelanfragen.

Trotzdem sollte die Architektur einer Anwendung nicht einfach davon ausgehen, dass ein höherer Tier jedes Skalierungsproblem löst. Queues, Backoff-Strategien und eine saubere Behandlung von Rate-Limit-Fehlern bleiben sinnvoll.

## Die neuen Tiers ändern nicht die API-Preise

Die Umstellung von Tier 1 bis 5 auf Build, Launch und Grow sollte nicht mit einem neuen Preismodell verwechselt werden.

Die Usage Tiers definieren in erster Linie, welche Nutzungs- und Rate-Limits für eine Organisation gelten. Die eigentlichen Kosten der API-Nutzung werden dadurch laut OpenAI nicht verändert.

Auch für die automatische Migration in einen der neuen Tiers verlangt OpenAI keine zusätzliche Zahlung.

Das macht die Änderung vor allem zu einer Vereinfachung des bisherigen Systems und nicht zu einer grundlegenden Änderung der API-Abrechnung.

## Eigene OpenAI API Limits prüfen

Welche Limits tatsächlich für eine Organisation gelten, lässt sich in den Organisationseinstellungen der OpenAI API Platform überprüfen.

Dort zeigt OpenAI sowohl den aktuellen Usage Tier als auch die jeweiligen modellabhängigen Rate Limits an.

Das ist wichtiger als die allgemeinen Tabellenwerte, weil konkrete Limits vom Modell und von der jeweiligen Organisation abhängen können.

OpenAI bietet dort außerdem Möglichkeiten zur Kostenkontrolle. Dazu gehören Spend Alerts, mit denen sich bei bestimmten Ausgaben Benachrichtigungen auslösen lassen, sowie ein optionales Hard Spend Limit.

Gerade bei produktiven Anwendungen lohnt es sich, diese Einstellungen nach der Umstellung kurz zu kontrollieren.

## Was Entwickler jetzt tun müssen

Für bestehende API-Nutzer gibt es zunächst wenig zu tun. OpenAI verschiebt Organisationen automatisch auf Build, Launch oder Grow.

Sinnvoll ist trotzdem ein Blick in die eigenen Limits. Besonders Organisationen aus den bisherigen Tiers 1 und 3 sollten prüfen, wie viel zusätzliche Kapazität ihnen nun zur Verfügung steht.

Wer bereits eigene Rate-Limit-Werte in Monitoring, Capacity Planning oder interner Dokumentation hinterlegt hat, sollte außerdem kontrollieren, ob diese Werte noch aktuell sind.

An der eigentlichen Integration der OpenAI API ändert sich durch die neuen Usage Tiers nichts.

Die wichtigste Veränderung liegt damit weniger in der API selbst als in ihrer administrativen Struktur: Statt fünf abstrakter Nummern gibt es mit Build, Launch und Grow künftig drei klarer abgegrenzte Stufen.
