---
layout: side_projects/hub
title: 'Open Source Portfolio'
body_classes: side-projects-hub
lang: de
permalink: '/product-lab/'
description: 'Open Source Portfolio von Oliver Jessner: offene Werkzeuge und ausgewählte eigenständige Produkte – ergänzend zu unseren proprietären Lösungen bei dynamiq.'
meta_description: 'Das Open Source Portfolio von Oliver Jessner mit LinkYard, Fetchary, RedactionResearch, SQLite Hub, SkipTheVoice, PineFetch, BulkPixel, Billly, Interviewed und weiteren Projekten.'
meta_title: 'Open Source Portfolio | Oliver Jessner'
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
    - '/redaction-research/'
    - '/skipthevoice/'
    - '/billly/'
    - '/knotenwerk/'
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
      tags: ['Recherche', 'Local-first', 'Chrome']
      feature_list:
          - 'Links per Rechtsklick speichern und in Projekten organisieren'
          - 'Sammlungen durchsuchen und doppelte Links automatisch vermeiden'
          - 'Einzelne Projekte oder alle Sammlungen als JSON oder TXT exportieren'
    - slug: 'fetchary'
      title: 'Fetchary'
      project_types: ['cli']
      href: 'https://github.com/oliverjessner/fetchary'
      cta_label: 'GitHub öffnen'
      logo: '/assets/images/about/side_projects/fetchary.webp'
      image: '/assets/images/side_projects/fetchary/fetchary.webp'
      description: 'Fetchary ist ein lokaler Evidence-Layer für das öffentliche Web: Das Tool überwacht Web-Ressourcen und archiviert Serverantworten unverändert, versioniert und überprüfbar.'
      operating_system: 'CLI · Node.js 22.5+'
      application_category: 'developer'
      open_source: true
      tags: ['Web Monitoring', 'Local-first', 'SHA-256']
      feature_list:
          - 'Serverantworten bytegenau speichern und mit SHA-256 verifizieren'
          - 'Neue Versionen nur bei tatsächlichen Inhaltsänderungen anlegen'
          - 'Archive durchsuchen, vergleichen, exportieren und unabhängig prüfen'
    - slug: 'interviewed'
      title: 'Interviewed'
      project_types: ['saas']
      href: 'https://interviewed.review/'
      logo: '/assets/images/about/side_projects/interviewed-logo.webp'
      image: '/assets/images/about/side_projects/interviewed.webp'
      description: 'Interviewed macht Bewerbungsprozesse transparent und zeigt, wie Bewerber Kommunikation, Fairness, Prozessqualität und Wertschätzung erleben.'
      operating_system: 'Web'
      application_category: 'business'
      tags: ['Recruiting', 'Bewertungen', 'Web']
      feature_list:
          - 'Bewerbungsprozesse strukturiert und auf Wunsch anonym bewerten'
          - 'Unternehmen anhand aktueller Erfahrungen und unabhängiger Scores vergleichen'
          - 'Nachvollziehbare Verifikationsstufen für veröffentlichte Bewertungen'
    - slug: 'VoiceByte'
      title: 'VoiceByte'
      project_types: ['saas']
      href: 'https://voicebyte.netlify.app/'
      logo: '/assets/images/about/side_projects/voicebyte.webp'
      image: '/assets/images/side_projects/voicebyte/mockups/overview.webp'
      description: 'VoiceByte wandelt Texte direkt im Browser in Sprache um und bietet flexible Einstellungen für Stimme und Wiedergabe.'
      operating_system: 'Web'
      application_category: 'media'
      open_source: true
      tags: ['Text-to-Speech', 'Browser', 'Open Source']
      feature_list:
          - 'Texte direkt im Browser in Sprache umwandeln'
          - 'Stimme, Geschwindigkeit, Tonhöhe und Lautstärke flexibel anpassen'
          - 'Gesprochene Texte im Verlauf speichern und Favoriten markieren'
project_overrides:
    sqlite-hub:
        project_types: ['saas', 'cli']
        description: 'SQLite Hub ist ein lokal ausgerichteter SQLite-Arbeitsbereich zum Durchsuchen, Bearbeiten, Abfragen, Analysieren, Visualisieren und Exportieren von Datenbanken.'
        tags: ['SQLite', 'Local-first', 'MCP']
        highlights:
            - 'Tabellen durchsuchen, filtern, bearbeiten und mit Testdaten befüllen'
            - 'SQL-Abfragen ausführen, visualisieren und vollständig exportieren'
            - 'Backups, Typgenerierung und kontrollierte MCP-Werkzeuge nutzen'
    openemperor:
        project_types: ['desktop-app']
        logo: '/assets/images/side_projects/openemperor/icon.png'
        image: '/assets/images/side_projects/openemperor/emperor-landscape.webp'
        image_alt: 'Chinesische Stadt- und Berglandschaft in Tuschemalerei für OpenEmperor'
        description: 'OpenEmperor ist eine unabhängige Clean-Room-Neuimplementierung von Emperor: Rise of the Middle Kingdom in C++20 und SDL3. Die erste öffentliche Alpha bietet eine experimentelle Sandbox für Apple-Silicon-Macs.'
        operating_system: 'macOS · Apple Silicon'
        open_source: true
        tags: ['Clean Room', 'C++20', 'SDL3']
        highlights:
            - 'Eine erste Sandbox auf unterstützten Karten spielen'
            - 'Straßen bauen und Lieferketten mit Live-Rerouting beobachten'
            - 'Eigene installierte oder entpackte Originalspieldaten verwenden'
    bulkpixel:
        project_types: ['desktop-app', 'cli']
        logo: '/assets/images/side_projects/bulkpixel/logo.webp'
        image: '/assets/images/side_projects/bulkpixel/mockups/bulkpixel_1200.webp'
        description: 'BulkPixel ist eine Desktop-App mit offenem Quellcode zum Konvertieren und Skalieren vieler Bilder in einem Durchgang.'
        operating_system: 'macOS'
        tags: ['Batch', 'Images', 'CLI']
        highlights:
            - 'Viele Bilder gemeinsam konvertieren, skalieren und umbenennen'
            - 'Export-Einstellungen als wiederverwendbare Presets speichern'
            - 'Ordner automatisch überwachen oder Abläufe per CLI starten'
    redaction-research:
        project_types: ['saas']
        logo: '/assets/images/side_projects/redactionresearch/logo_small.webp'
        image: '/assets/images/side_projects/redactionresearch/mockups/found_wrong_redacted.webp'
        description: 'RedactionResearch ist ein lokaler PDF-Redaktionsprüfer, der versteckten Text, unsichere Schwärzungen, Metadatenlecks und weitere sensible PDF-Inhalte zur manuellen Prüfung sichtbar macht.'
        operating_system: 'Lokal · npm oder Homebrew'
        tags: ['PDF', 'Local-first', 'Security']
        highlights:
            - 'Verbliebenen Live-Text unter verdächtigen Schwärzungen erkennen'
            - 'Metadaten, Formularfelder und weitere PDF-Leaks prüfen'
            - 'Technische Funde einzeln sichten, akzeptieren oder überspringen'
    itworksbut:
        project_types: ['cli']
        description: 'ItWorksBut ist ein CI-Scanner für Node.js-Projekte, der versteckte Risiken in KI-gestütztem JavaScript-, Web-, Tauri- und Electron-Code findet.'
        tags: ['Node.js', 'CI', 'SARIF']
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
        tags: ['WhatsApp', 'Local-first', 'CLI']
        highlights:
            - 'Empfangene WhatsApp-Sprachnachrichten lokal transkribieren'
            - 'Gespräche und Transkripte in einer Bibliothek durchsuchen'
            - 'Inhalte als Markdown exportieren oder über die CLI weiterverwenden'
    billly:
        project_types: ['desktop-app']
        logo: '/assets/images/side_projects/billly/logo_small.webp'
        image: '/assets/images/side_projects/billly/mockups/dashboard.webp'
        description: 'Billly ist eine macOS-App für Freelancer, die Rechnungen in strukturierte Daten, CRM-Einträge und Gmail-Nachfass-Mails verwandelt.'
        operating_system: 'macOS'
        tags: ['OCR', 'CRM', 'Gmail']
        highlights:
            - 'Rechnungen mit OCR und KI strukturiert erfassen'
            - 'Aus Rechnungsdaten automatisch Kundenprofile und CRM-Einträge aufbauen'
            - 'Gmail-Nachrichten mit eigenen Vorlagen und Platzhaltern versenden'
    no-bullshit-rss:
        project_types: ['desktop-app', 'cli']
        logo: '/assets/images/side_projects/no-bullshit-rss/logo_small.png'
        image: '/assets/images/side_projects/no-bullshit-rss/mockups/feed_cards_1200.webp'
        description: 'No Bullshit RSS ist ein aufgeräumter RSS-Reader mit eigenen Themen, smarten Filtern, täglichen Zusammenfassungen und ohne Werbelayer.'
        operating_system: 'macOS (Apple Silicon)'
        tags: ['RSS', 'Local-first', 'Digest']
        highlights:
            - 'Eigene Themen definieren und Artikel automatisch zuordnen'
            - 'Berichterstattung in täglichen, wöchentlichen oder monatlichen Digests bündeln'
            - 'Feeds lokal und ohne Konto, Werbung oder Abo verwalten'
    pinefetch:
        project_types: ['desktop-app', 'cli']
        logo: '/assets/images/side_projects/pinefetch/logo_small.webp'
        image: '/assets/images/side_projects/pinefetch/mockups/download_1200.webp'
        description: 'PineFetch ist eine minimalistische Desktop-App, mit der du eigene Videos per Magic Import, Warteschlange, History und optionaler Audio-Extraktion herunterladen kannst.'
        operating_system: 'macOS'
        tags: ['yt-dlp', 'macOS', 'Local-first']
        highlights:
            - 'Erlaubte Downloads per Magic Import oder TXT-Liste einreihen'
            - 'Links einzeln oder gesammelt aus Chrome an PineFetch senden'
            - 'Presets, Verlauf und optionale Audio-Extraktion lokal nutzen'
    knotenwerk:
        project_types: ['desktop-app']
        logo: '/assets/images/side_projects/knotenwerk/logo.webp'
        image: '/assets/images/side_projects/knotenwerk/mockups/tree.webp'
        description: 'KnotenWerk ist eine lokal ausgerichtete App für Entscheidungsbäume und Graphen mit Demo-Modus sowie Export nach JSON, SVG und Markdown.'
        operating_system: 'macOS'
        tags: ['Graphen', 'Local-first', 'Markdown']
        highlights:
            - 'Knoten und beschriftete Pfade im Edit-Modus aufbauen'
            - 'Entscheidungswege im sicheren Demo-Modus durchspielen'
            - 'Graphen lokal speichern und als JSON, SVG oder Markdown exportieren'
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
