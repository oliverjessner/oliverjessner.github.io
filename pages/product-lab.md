---
layout: side_projects/hub
title: 'Open Source Portfolio'
body_classes: side-projects-hub
lang: de
permalink: '/product-lab/'
description: 'Open Source Portfolio von Oliver Jessner: offene Werkzeuge und ausgewählte eigenständige Produkte – ergänzend zu unseren proprietären Lösungen bei dynamiq.'
meta_description: 'Das Open Source Portfolio von Oliver Jessner mit LinkYard, Fetchary, SQLite Hub, SkipTheVoice, PineFetch, BulkPixel, Pitchary und weiteren Projekten.'
meta_title: 'Open Source Portfolio | Oliver Jessner'
image: '/assets/images/og/product-lab.webp'
image_alt: 'Product Lab von Oliver Jessner – Software, Open Source und eigene Werkzeuge'
hero:
    eyebrow: 'Open Source Portfolio'
    heading: 'Software für reale Probleme.'
    lead: 'Neben unseren proprietären Lösungen bei dynamiq. für Unternehmen wächst hier mein Softwareportfolio. Open Source steht im Mittelpunkt; ausgewählte eigenständige Produkte ergänzen die Übersicht.'
    primary_cta_label: 'Projekte ansehen'
    secondary_cta_label: 'Proprietäre Lösungen bei dynamiq.'
    secondary_cta_href: 'https://dynamiq.agency/'
projects_intro:
    eyebrow: 'Projektübersicht'
    heading: 'Alle Projekte im Portfolio.'
    text: 'Offener Quellcode steht im Mittelpunkt. Ergänzt wird das Portfolio durch ausgewählte eigenständige Produkte mit klaren Anwendungsfällen.'
filters:
    - label: 'Alle'
      value: 'all'
    - label: 'Native Desktop-App'
      value: 'desktop-app'
    - label: 'SaaS (Webapp)'
      value: 'saas'
    - label: 'CLI'
      value: 'cli'
    - label: 'Browser-Erweiterung'
      value: 'browser-extension'
project_urls:
    - '/sqlite-hub/'
    - '/openemperor/'
    - '/bulkpixel/'
    - '/no-bullshit-rss/'
    - '/pinefetch/'
    - '/skipthevoice/'
    - '/pitchary/'
external_projects:
    - slug: 'linkyard'
      title: 'LinkYard'
      project_types: ['browser-extension']
      href: 'https://chromewebstore.google.com/detail/linkyard/gjiooiibelbfndjihhkppkflbflopnpp'
      cta_label: 'Chrome Web Store öffnen'
      github_url: 'https://github.com/oliverjessner/LinkYard'
      logo: '/assets/images/side_projects/linkyard/logo.webp'
      image: '/assets/images/side_projects/linkyard/overview.webp'
      description: 'LinkYard sammelt Links per Rechtsklick in projektbezogenen Sammlungen und hält sie in der Chrome-Seitenleiste griffbereit. Alle Links bleiben lokal im Browser – ohne Konto oder Tracking.'
      operating_system: 'Chrome · Browser-Erweiterung'
      application_category: 'productivity'
      open_source: true
      feature_list:
          - 'Links per Rechtsklick speichern und in Projekten organisieren'
          - 'Sammlungen durchsuchen und doppelte Links automatisch vermeiden'
          - 'Einzelne Projekte oder alle Sammlungen als JSON oder TXT exportieren'
    - slug: 'fetchary'
      title: 'Fetchary'
      project_types: ['cli']
      href: 'https://github.com/oliverjessner/fetchary'
      cta_label: 'GitHub öffnen'
      logo: '/assets/images/side_projects/fetchary/logo.webp'
      image: '/assets/images/side_projects/fetchary/fetchary.webp'
      description: 'Semantic web extraction. The smarter way to fetch the web. Fetchary extrahiert gezielt Web-Inhalte für Automatisierungen, Recherchen und Node.js-Anwendungen.'
      operating_system: 'CLI · Node.js-Library · Node.js 26+'
      application_category: 'developer'
      open_source: true
      feature_list:
          - 'Texte, Bilder, Links und Kontaktdaten gezielt aus Webseiten extrahieren'
          - 'Metadaten, strukturierte Daten und öffentliche Social-Media-Kennzahlen auslesen'
          - 'Webseiten per HTTP abrufen und bei Bedarf mit Chromium rendern'
project_overrides:
    sqlite-hub:
        project_types: ['saas', 'cli']
        description: 'SQLite Hub ist ein lokal ausgerichteter SQLite-Arbeitsbereich zum Durchsuchen, Bearbeiten, Abfragen, Analysieren, Visualisieren und Exportieren von Datenbanken.'
        highlights:
            - 'Tabellen durchsuchen, filtern, bearbeiten und mit Testdaten befüllen'
            - 'SQL-Abfragen ausführen, visualisieren und vollständig exportieren'
            - 'Backups, Typgenerierung und kontrollierte MCP-Werkzeuge nutzen'
    openemperor:
        project_types: ['desktop-app']
        logo: '/assets/images/side_projects/openemperor/icon.png'
        image: '/assets/images/side_projects/openemperor/screenshots/walker.webp'
        image_alt: 'OpenEmperor-Sandbox mit Straßen, Gebäuden und Walkern im aktuellen Entwicklungsstand'
        description: 'OpenEmperor ist eine unabhängige Clean-Room-Neuimplementierung von Emperor: Rise of the Middle Kingdom in C++20 und SDL3. Die wachsende Stadtbau-Sandbox unterstützt Widescreen sowie macOS und Linux.'
        operating_system: 'macOS · Linux'
        open_source: true
        highlights:
            - 'Stadt-Sandbox mit Produktion, Haushalten und Walkern spielen'
            - 'Straßen bauen und Lieferketten mit Live-Rerouting beobachten'
            - 'Eigene installierte oder entpackte Originalspieldaten verwenden'
    bulkpixel:
        project_types: ['desktop-app', 'cli']
        logo: '/assets/images/side_projects/bulkpixel/logo_small.webp'
        image: '/assets/images/side_projects/bulkpixel/mockups/bulkpixel_1200.webp'
        description: 'BulkPixel ist eine Desktop-App mit offenem Quellcode zum Konvertieren und Skalieren vieler Bilder in einem Durchgang.'
        operating_system: 'macOS'
        highlights:
            - 'Viele Bilder gemeinsam konvertieren, skalieren und umbenennen'
            - 'Export-Einstellungen als wiederverwendbare Presets speichern'
            - 'Ordner automatisch überwachen oder Abläufe per CLI starten'
    itworksbut:
        project_types: ['cli']
        description: 'ItWorksBut ist ein CI-Scanner für Node.js-Projekte, der versteckte Risiken in KI-gestütztem JavaScript-, Web-, Tauri- und Electron-Code findet.'
        highlights:
            - 'JavaScript-, Node.js-, Web-, Tauri- und Electron-Projekte prüfen'
            - 'Unsichere APIs, schwache CI und versehentlich eingecheckte Secrets finden'
            - 'Berichte als Konsole, JSON oder SARIF inklusive Fix-Prompts ausgeben'
    skipthevoice:
        project_types: ['saas', 'cli']
        logo: '/assets/images/side_projects/skipthevoice/logo.webp'
        image: '/assets/images/side_projects/skipthevoice/mockups/webapp_1200.webp'
        description: 'SkipTheVoice verwandelt empfangene WhatsApp-Sprachnachrichten lokal in durchsuchbare Transkripte für Webapp, Markdown, KI-Tools und die Kommandozeile.'
        operating_system: 'macOS, Windows, Linux'
        highlights:
            - 'Empfangene WhatsApp-Sprachnachrichten lokal transkribieren'
            - 'Gespräche und Transkripte in einer Bibliothek durchsuchen'
            - 'Inhalte als Markdown exportieren oder über die CLI weiterverwenden'
    pitchary:
        project_types: ['desktop-app']
        logo: '/assets/images/side_projects/pitchary/logo_small.webp'
        image: '/assets/images/side_projects/pitchary/mockups/dashboard_1200.webp'
        description: 'Pitchary bündelt Kunden, Angebote und Rechnungen in einem lokalen CRM für den Mac – vom ersten Pitch bis zur Auswertung von Umsatz und Ausgaben.'
        operating_system: 'macOS 26.4+ · Apple Silicon'
        highlights:
            - 'Kunden, Ansprechpartner und Dienstleistungen verwalten'
            - 'Angebote, Kontakte und Preisverhandlungen verfolgen'
            - 'PDF-Rechnungen auslesen und Einnahmen sowie Ausgaben auswerten'
    no-bullshit-rss:
        project_types: ['desktop-app', 'cli']
        logo: '/assets/images/side_projects/no-bullshit-rss/logo_small.webp'
        image: '/assets/images/side_projects/no-bullshit-rss/mockups/feed_cards_1200.webp'
        description: 'No Bullshit RSS ist ein aufgeräumter RSS-Reader mit eigenen Themen, smarten Filtern, täglichen Zusammenfassungen und ohne Werbelayer.'
        operating_system: 'macOS (Apple Silicon)'
        highlights:
            - 'Eigene Themen definieren und Artikel automatisch zuordnen'
            - 'Berichterstattung in täglichen, wöchentlichen oder monatlichen Digests bündeln'
            - 'Feeds lokal und ohne Konto, Werbung oder Abo verwalten'
    pinefetch:
        project_types: ['desktop-app', 'cli']
        logo: '/assets/images/side_projects/pinefetch/logo_small.webp'
        image: '/assets/images/side_projects/pinefetch/mockups/download_1200.webp'
        description: 'PineFetch lädt Videos und Audio auf deinen Mac, erstellt durchsuchbare Transkripte und erkennt mit OCR Text in Videoframes. Magic Import, Warteschlange und History halten deine Sammlung übersichtlich.'
        operating_system: 'macOS'
        highlights:
            - 'Erlaubte Downloads per Magic Import oder TXT-Liste einreihen'
            - 'Links einzeln oder gesammelt aus Chrome an PineFetch senden'
            - 'Transkripte durchsuchen und Text in Videoframes mit OCR erkennen'
github:
    eyebrow: 'GitHub'
    heading: 'Alle meine Projekte auf GitHub.'
    text: 'Die vollständige Übersicht meiner Projekte findest du auf meinem GitHub-Profil. Entdecke die Repositories, lies die Dokumentation und verfolge die Weiterentwicklung.'
    cta_label: 'Projekte auf GitHub ansehen'
    href: 'https://github.com/oliverjessner'
cta:
    eyebrow: 'Nächster Schritt'
    heading: 'Ein Projekt öffnen und tiefer einsteigen.'
    text: 'Wenn eines dieser Projekte zu deinem Workflow passt, findest du auf der jeweiligen Projektseite Details, Screenshots und den Weg zum Produkt oder Quellcode.'
    primary_label: 'Proprietäre Lösungen bei dynamiq.'
    primary_href: 'https://dynamiq.agency/'
    secondary_label: 'Über Oliver'
    secondary_href: '/about/'
---
