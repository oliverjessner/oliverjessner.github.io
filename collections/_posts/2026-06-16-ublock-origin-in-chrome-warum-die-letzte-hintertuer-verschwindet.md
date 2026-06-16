---
layout: post
title: 'uBlock Origin funktioniert nicht mehr in Chrome: Das kannst du tun'
date: 2026-06-16 07:53:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - browser
    - Privacy
    - software-development
    - news
description: 'uBlock Origin funktioniert in Chrome nicht mehr: Google sperrt Manifest V2 endgültig. Was du jetzt tun kannst – uBlock Origin Lite, Firefox oder Browserwechsel.'
thumbnail: '/assets/images/gen/blog/ublock-origin-in-chrome-warum-die-letzte-hintertuer-verschwindet/header_thumbnail.webp'
image: '/assets/images/gen/blog/ublock-origin-in-chrome-warum-die-letzte-hintertuer-verschwindet/header.webp'
image_alt: 'uBlock Origin Werbeblocker in Chrome nicht mehr verfügbar - Manifest V3 Ende: UO Shield vor durchgestrichenem Chrome-Logo'
faq:
    - question: 'Funktioniert uBlock Origin weiterhin in Google Chrome?'
      answer: 'Die klassische Version von uBlock Origin basiert auf Manifest V2 und funktioniert in aktuellen Chrome-Versionen nicht mehr regulär. Für Chrome bleibt vor allem uBlock Origin Lite als Manifest-V3-kompatible Alternative.'
    - question: 'Ist uBlock Origin Lite dasselbe wie uBlock Origin?'
      answer: 'Nein. uBlock Origin Lite ist eine eigenständige Manifest-V3-Version mit anderem technischen Ansatz. Sie ist effizient, bietet aber nicht dieselbe Flexibilität wie die klassische Version.'
    - question: 'Welcher Browser unterstützt uBlock Origin weiterhin vollständig?'
      answer: 'Firefox unterstützt Manifest V2 weiterhin neben Manifest V3 und bleibt damit eine naheliegende Option für Nutzer, die die klassische Version von uBlock Origin verwenden möchten.'
    - question: 'Was ist die beste Alternative zu uBlock Origin in Chrome?'
      answer: 'Für Chrome ist uBlock Origin Lite die naheliegende Manifest-V3-kompatible Alternative. Wer die klassische Version von uBlock Origin weiter nutzen möchte, sollte Firefox prüfen.'
socialmedia:
    - 'Chrome macht die letzte Manifest-V2-Hintertür dicht. Für uBlock Origin ist das weniger ein plötzlicher Bruch als der letzte Schritt einer langen Umstellung.'
    - 'uBlock Origin Lite ist nicht einfach uBlock Origin mit neuem Namen. Manifest V3 verändert, wie Werbeblocker im Browser arbeiten dürfen.'
    - 'Die Chrome-Debatte zeigt: Browser sind längst nicht nur Fenster ins Web. Sie entscheiden mit, welche Kontrolle Nutzer über Werbung, Tracking und Erweiterungen behalten.'
---

uBlock Origin funktioniert in Google Chrome nicht mehr regulär, weil die klassische Version auf Manifest V2 basiert. Google entfernt diese alte Erweiterungsarchitektur nun endgültig aus Chrome. Für Chrome bleibt vor allem uBlock Origin Lite, während Firefox die klassische Version weiterhin besser unterstützt.

> **Kurzfassung:** uBlock Origin (klassisch) funktioniert in Chrome nicht mehr, weil Google Manifest V2 endgültig entfernt hat. Du hast drei Optionen: zu **uBlock Origin Lite** wechseln, auf **Firefox** umsteigen oder den eigenen Bedarf prüfen.

## Warum uBlock Origin in Chrome nicht mehr funktioniert (und was das mit Manifest V2 zu tun hat)

Google räumt in Chrome die letzten Reste von Manifest V2 aus dem Weg. Konkret geht es laut [Golem.de](https://www.golem.de/news/browser-erweiterungen-endgueltiges-aus-fuer-ublock-origin-google-sperrt-letzte-chrome-hintertuer-2606-209804.html) um eine Entwickler-Flag im Chromium-Code, mit der technisch versierte Nutzer alte Erweiterungen noch länger am Leben halten konnten.

Für die meisten Chrome-Nutzer ist das Thema allerdings schon länger praktisch entschieden. Google hatte den Ausstieg aus Manifest V2 schrittweise vorbereitet. Der offizielle [Manifest-V2-Zeitplan von Chrome](https://developer.chrome.com/docs/extensions/develop/migrate/mv2-deprecation-timeline) beschreibt, dass Manifest-V2-Erweiterungen in Chrome Stable bereits deaktiviert wurden und Nutzer sie später nicht mehr erneut aktivieren konnten.

Der aktuelle Schritt ist deshalb weniger der Anfang des Endes, sondern eher das Aufräumen nach dem Ende. Was bisher noch als Restschalter, Flag oder technische Ausnahme existierte, verschwindet nun ebenfalls.

Für uBlock Origin ist das relevant, weil die klassische Version des beliebten Werbeblockers auf Manifest V2 basiert. Chrome unterstützt diese alte Erweiterungsarchitektur nicht mehr regulär. Damit bleibt im Chrome-Ökosystem vor allem uBlock Origin Lite.

## Warum Manifest V2 für uBlock Origin so wichtig war

Um den Konflikt zu verstehen, muss man nicht tief in Browser-Interna einsteigen. Entscheidend ist die Frage, wann und wie eine Erweiterung in den Datenverkehr eingreifen darf.

Die klassische Version von uBlock Origin konnte unter Manifest V2 sehr flexibel auf Netzwerk-Anfragen reagieren. Ein Werbeblocker konnte prüfen, filtern und blockieren, bevor bestimmte Inhalte überhaupt geladen wurden. Genau diese Flexibilität machte uBlock Origin für viele Nutzer so wirksam.

Manifest V3 verschiebt dieses Modell. Erweiterungen sollen weniger direkt in laufende Netzwerkprozesse eingreifen. Stattdessen setzen sie stärker auf deklarative Regeln. Vereinfacht gesagt: Die Erweiterung übergibt dem Browser vorab Regeln, und der Browser entscheidet dann anhand dieser Regeln, was blockiert wird.

Google begründet diesen Wechsel seit Jahren mit Sicherheit, Datenschutz, Performance und Wartbarkeit. Im offiziellen Chromium-Blog heißt es, Manifest V3 solle das Erweiterungs-Ökosystem sicherer, privater und zuverlässiger machen. Gleichzeitig verweist Google darauf, dass viele aktiv gepflegte Erweiterungen bereits auf Manifest V3 migriert seien und große Content-Filter ebenfalls Manifest-V3-Versionen anbieten.

Das ist die eine Seite. Die andere Seite ist, dass genau diese Einschränkungen für besonders mächtige Content-Blocker spürbar sind. Werbeblocker funktionieren weiterhin, aber nicht zwingend mit denselben Möglichkeiten wie vorher.

## Manifest V3 ist nicht automatisch schlechter, aber anders

Es wäre zu einfach, Manifest V3 nur als Anti-Adblock-Maßnahme zu beschreiben. Browser-Erweiterungen sind ein reales Sicherheitsrisiko. Sie können Seiteninhalte lesen, verändern, Anfragen auswerten und teilweise sehr tiefe Einblicke in das Surfverhalten bekommen.

Aus Sicht eines Browser-Herstellers ist es nachvollziehbar, diese Fähigkeiten stärker zu begrenzen. Weniger direkte Eingriffsmöglichkeiten bedeuten auch weniger Angriffsfläche. Gerade bei Erweiterungen, die Millionen Nutzer installiert haben, ist das ein legitimes Argument.

Trotzdem bleibt ein strukturelles Problem: Wenn der Browser selbst stärker kontrolliert, was Erweiterungen dürfen, verschiebt sich Macht vom Nutzer und vom Erweiterungsentwickler zum Browseranbieter. Bei Chrome ist dieser Browseranbieter gleichzeitig Teil eines der größten Werbeunternehmen der Welt.

Das bedeutet nicht automatisch, dass jede technische Entscheidung nur aus Werbeinteresse getroffen wird. Aber es erklärt, warum die Debatte so emotional geführt wird. Es geht nicht nur um nervige Banner oder YouTube-Anzeigen. Es geht um Kontrolle im [Browser](https://oliverjessner.at/category/browser/), um Tracking-Schutz und um die Frage, wie weit Nutzer ihre eigene Web-Erfahrung anpassen dürfen.

## Die besten Alternativen zu uBlock Origin in Chrome (2026)

uBlock Origin Lite ist die naheliegende Alternative für Chrome. Das Projekt ist auf Manifest V3 ausgelegt und wird vom uBlock-Origin-Umfeld gepflegt. Im [GitHub-Repository von uBO Lite](https://github.com/uBlockOrigin/uBOL-home) wird der Ansatz als deklarativ beschrieben: Die Erweiterung arbeitet mit Regeln, die der Browser verarbeitet, statt dauerhaft selbst im Hintergrund aktiv zu filtern.

Das hat Vorteile. uBlock Origin Lite kann effizient sein und weniger Ressourcen verbrauchen. Für viele Nutzer reicht das im Alltag vermutlich aus, vor allem wenn es primär um klassische Werbung und bekannte Tracking-Listen geht.

Aber es ist nicht dieselbe Erweiterung. Raymond Hill beschreibt in der [uBlock-Origin-Wiki](https://github.com/gorhill/uBlock/wiki/About-Google-Chrome%27s-%E2%80%9CThis-extension-may-soon-no-longer-be-supported%E2%80%9D), dass uBO Lite eine abgespeckte Variante sei und die klassische Version nicht automatisch ersetzen könne. Nutzer sollen bewusst entscheiden, ob uBO Lite für sie reicht.

## Firefox, Brave und die Frage nach Kontrolle

Die offensichtliche Alternative ist Firefox. Mozilla verfolgt bei Manifest V3 einen anderen Weg. In einem Beitrag zu [Firefox und Manifest V3](https://blog.mozilla.org/en/firefox/firefox-manifest-v3-adblockers/) erklärt Mozilla, dass Firefox Manifest V2 weiterhin neben Manifest V3 unterstützt. Damit bleibt die klassische Version von uBlock Origin dort weiterhin eine realistische Option.

Das ist nicht nur eine technische Abweichung, sondern eine Produktentscheidung. Firefox positioniert sich stärker über Nutzerkontrolle, offene Standards und [Privacy](https://oliverjessner.at/category/privacy/). Genau deshalb passt die Unterstützung mächtiger Erweiterungen zur eigenen Erzählung.

Brave ist ein anderer Fall. Der Browser basiert zwar auf Chromium, setzt aber stark auf einen eingebauten Werbe- und Tracking-Schutz. Dieser Schutz ist nicht einfach eine normale Chrome-Erweiterung, die denselben Manifest-V3-Regeln unterliegt. Für Nutzer kann das praktisch attraktiv sein, weil der Schutz direkt im Browser steckt.

Wer ohnehin über einen Browserwechsel nachdenkt, findet in meiner Übersicht zu [Browsern aus Europa](https://oliverjessner.at/blog/2026-01-23-browser-aus-europa-alternativen-zwischen-privacy-nachhaltigkeit-und-power-user-features/) weitere Alternativen zwischen Privacy, Nachhaltigkeit und Power-User-Features.

## Was Chrome-Nutzer jetzt sinnvoll tun können

Wer Chrome weiter nutzen möchte, sollte keine Wunder von alten Flags oder Workarounds erwarten. Solche Umgehungen waren schon bisher fragil. Wenn Google den entsprechenden Code entfernt, werden sie noch unzuverlässiger.

Warnhinweis: Skripte, inoffizielle Builds oder dubiose Erweiterungspakete, die angeblich das alte uBlock Origin in Chrome zurückbringen, sollte man kritisch prüfen. Gerade bei Browser-Erweiterungen ist das Risiko hoch, sich ein Sicherheitsproblem einzubauen, während man eigentlich mehr Schutz wollte.

Praktisch gibt es drei vernünftige Wege.

1. uBlock Origin Lite ausprobieren. Für viele alltägliche Szenarien reicht die Erweiterung aus. Sie ist nicht identisch mit uBlock Origin, aber sie ist die offizielle Manifest-V3-nahe Variante.
1. den Browser wechseln. Wer die klassische Version von uBlock Origin behalten möchte, landet derzeit vor allem bei Firefox.
1. den eigenen Bedarf ehrlich prüfen. Nicht jeder braucht maximale Filterkontrolle. Aber wer bewusst mit eigenen Regeln, striktem Tracking-Schutz und angepassten Filterlisten arbeitet, sollte Chrome nicht mehr als neutralen Standard betrachten.

## Fazit

Wer die Entwicklung bei Chrome zum Anlass nimmt, den eigenen Browser grundsätzlich zu hinterfragen, findet hier eine passende Übersicht: In meinem Beitrag zu [Browsern aus Europa](https://oliverjessner.at/blog/2026-01-23-browser-aus-europa-alternativen-zwischen-privacy-nachhaltigkeit-und-power-user-features/) geht es um Alternativen zwischen Privacy, Nachhaltigkeit und Power-User-Features.
