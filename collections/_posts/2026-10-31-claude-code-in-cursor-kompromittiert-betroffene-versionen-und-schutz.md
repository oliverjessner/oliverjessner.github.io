---
layout: post
title: 'Claude Code in Cursor kompromittiert: Betroffene Versionen und Schutz'
date: 2026-10-31 19:12:19 +0100
authors:
  - oliver_jessner
meta_og_type: article
categories:
  - anthropic
  - vscode
  - software-development
  - macos
description: 'Manipulierte Claude-Code-Erweiterungen im Cursor Marketplace: Welche Versionen betroffen sind und warum ein Update allein nicht genügt'
thumbnail: /assets/images/gen/blog/claude-code-in-cursor-kompromittiert-betroffene-versionen-und-schutz/header_thumbnail.webp
image: /assets/images/gen/blog/claude-code-in-cursor-kompromittiert-betroffene-versionen-und-schutz/header.webp
faq:
  - question: Welche Claude-Code-Versionen sind betroffen?
    answer: Cursor nennt manipulierte Pakete der Erweiterung Anthropic.claude-code in den Versionen 2.1.312 und 2.1.313 für macOS und Windows aus seinem Marketplace.
  - question: War auch der Microsoft Visual Studio Marketplace betroffen?
    answer: Laut Microsoft wurden die untersuchten Schadpakete nicht über den Visual Studio Marketplace verteilt. Nach aktuellem Kenntnisstand beschränkt sich der Vorfall auf den Cursor Marketplace.
  - question: Reicht ein Update der Claude-Code-Erweiterung aus?
    answer: Bei einer betroffenen Installation reicht ein Update allein nicht aus. Die Schadsoftware kann zusätzliche SSH-Schlüssel und automatisch gestartete Skripte hinterlassen.
socialmedia:
  - 'Claude Code in Cursor: Manipulierte Erweiterungen sollten eine SSH-Backdoor einrichten. Betroffen sind laut Cursor die Versionen 2.1.312 und 2.1.313 für macOS und Windows aus dem eigenen Marketplace.'
  - 'Der Vertriebsweg zählt: Microsoft bestätigt, dass die untersuchten Claude-Code-Schadpakete nicht im Visual Studio Marketplace erschienen sind. Die hohe Gesamtzahl der Installationen belegt keine entsprechende Zahl infizierter Geräte.'
  - Eine manipulierte Erweiterung zu aktualisieren, beseitigt nicht automatisch ihre Spuren. Beim Claude-Code-Vorfall in Cursor gehören auch SSH-Schlüssel, Autostart-Einträge und möglicherweise betroffene Zugangsdaten zur Prüfung.
news: true
pinned: false
ads: true
image_width: 1280
image_height: 720
---

Im Cursor Marketplace wurden manipulierte Claude-Code-Erweiterungen verteilt. Entscheidend sind Version, Plattform und Installationsquelle. Ein Update allein kann bei betroffenen Geräten zu wenig sein.

## Claude Code kompromittiert: Was bisher bestätigt ist

Am 29. Oktober 2026 wurden manipulierte Kopien der Claude-Code-Erweiterung über den Cursor Marketplace ausgeliefert. Microsoft bestätigt nach eigener Untersuchung, dass die Schadpakete weder über den Microsoft Visual Studio Marketplace noch über das offizielle npm-Paket verteilt wurden. Nach aktuellem Kenntnisstand ist der Vorfall auf den Cursor Marketplace begrenzt. Laut Microsoft erklärte [Anthropic](https://oliverjessner.at/category/anthropic/), dass seine Systeme nicht kompromittiert worden seien. [Quelle: Microsoft Security](https://www.microsoft.com/en-us/security/blog/2026/10/30/inside-malicious-claude-code-branded-cursor-extension-persistent-ssh-backdoor/)

Diese Einordnung ist wichtig: Eine Erweiterung für einen auf [VS Code](https://oliverjessner.at/category/vscode/) basierenden Editor kann über unterschiedliche Marktplätze verteilt werden. Derselbe Name bedeutet deshalb nicht automatisch dasselbe ausgelieferte Paket.

Auch der verlinkte [Golem-Artikel](https://www.golem.de/news/claude-code-millionenfach-installierte-vs-code-erweiterung-kompromittiert-2610-214680.html) beschreibt inzwischen ausdrücklich den Cursor Marketplace. Die Gesamtzahl der Claude-Code-Installationen lässt sich nicht mit der Zahl betroffener Rechner gleichsetzen.

## Welche Claude-Code-Versionen sind betroffen?

Die aktuelle Sicherheitsmeldung von Cursor nennt:

- **Erweiterung:** `Anthropic.claude-code`
- **Versionen:** `2.1.312` und `2.1.313`
- **Plattformen:** macOS und Windows
- **Bezugsquelle:** Cursor VS Code Extension Marketplace
- **Zeitraum:** 29. Oktober 2026, ungefähr 02:27 bis 13:35 Uhr Pacific Time

Für Österreich entspricht das am selben Tag ungefähr **10:27 bis 21:35 Uhr**. Cursor beschreibt ausdrücklich manipulierte Pakete. Die Versionsnummer allein genügt deshalb nicht zur Einordnung einer Installation. [Quelle: Cursor-Sicherheitsmeldung](https://cursor.com/blog/claude-code-extension-security-notice)

## Was die manipulierte Erweiterung versucht hat

Der eingeschleuste JavaScript-Code sollte einen fremden SSH-Schlüssel hinterlegen, den lokalen SSH-Dienst aktivieren und eine ausgehende Tunnelverbindung aufbauen. Zusätzlich waren Autostart-Mechanismen vorgesehen, um die Verbindung erneut herzustellen.

SSH ermöglicht normalerweise die Fernanmeldung an einem Rechner. Ein fremder autorisierter Schlüssel kann diesen Zugang für Angreifer öffnen, sofern Dienst und Konfiguration das zulassen.

Microsoft unterscheidet zwischen diesen Fähigkeiten und einem tatsächlich erfolgreichen Fernzugriff. Dessen Erfolg hing unter anderem von Berechtigungen und SSH-Konfiguration ab. Selbst bei gescheitertem Tunnel konnten jedoch Schlüssel und Autostart-Dateien zurückbleiben.

Der Code sammelte außerdem Systeminformationen und ausgewählte Namen von Umgebungsvariablen. Das belegt für sich genommen keinen Diebstahl der darin gespeicherten Geheimnisse. [Quelle: technische Analyse von Microsoft](https://www.microsoft.com/en-us/security/blog/2026/10/30/inside-malicious-claude-code-branded-cursor-extension-persistent-ssh-backdoor/)

## Was Nutzer von Cursor jetzt prüfen sollten

Prüfe in der Erweiterungsverwaltung die installierte Version und, soweit nachvollziehbar, ihre Herkunft. Eine inzwischen aktualisierte Installation beantwortet noch nicht, welche Version zuvor automatisch eingespielt wurde.

**Sicherheitshinweis:** Bei einer betroffenen Installation genügt es nicht, lediglich die Erweiterung zu aktualisieren oder zu entfernen.

Cursor empfiehlt, betroffene Geräte anhand der veröffentlichten Erkennungsmerkmale zu untersuchen. Dazu gehört der SSH-Schlüsselkommentar `svc-telemetry`. Bei Hinweisen auf ausgeführten Schadcode sollen Geräte isoliert, unerlaubte Schlüssel und Autostart-Mechanismen entfernt und eine Neuinstallation des Systems geprüft werden. Zugängliche Zugangsdaten und Sitzungen sollen von einem vertrauenswürdigen Gerät aus erneuert beziehungsweise widerrufen werden. Die Plattform stellt dafür eigene Bereinigungsskripte bereit. [Quelle: Prüfung und Bereinigung bei Cursor](https://cursor.com/blog/claude-code-extension-security-notice)

Bei einem Firmenrechner sollte die zuständige IT eingebunden werden, bevor Spuren durch eigenständige Bereinigung verloren gehen.

## Warum die Installationsquelle zur Prüfung gehört

Für den Alltag in der [Softwareentwicklung](https://oliverjessner.at/category/software-development/) zeigt der Vorfall eine konkrete Abhängigkeit: Zum Vertrauen in eine Erweiterung gehört auch ihr Vertriebsweg.

Bei einer Sicherheitsmeldung sind deshalb drei Fragen hilfreich: Welches Paket wurde installiert, aus welcher Quelle kam es und wann wurde es aktualisiert? Diese Angaben machen aus einer allgemeinen Warnung eine nachvollziehbare Prüfung des eigenen Rechners.
