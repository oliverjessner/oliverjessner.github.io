---
layout: side_projects/hub
title: 'Product Lab'
body_classes: side-projects-hub
lang: de
permalink: '/product-lab/'
description: 'Product Lab von Oliver Jessner: eigenständige Produkte, Tools und Software mit klaren Workflows, ruhigen Interfaces und klarer Produktlogik.'
meta_description: 'Entdecke das Product Lab von Oliver Jessner: SkipTheVoice, ItWorksBut, Billly, PineFetch, BulkPixel, KnotenWerk und weitere eigenständige Softwareprojekte.'
meta_title: 'Product Lab | Produkte, Tools und Software von Oliver Jessner'
hero:
    eyebrow: 'Product Lab'
    heading: 'Eigenständige Produkte für klare Jobs.'
    lead: 'Hier entstehen Produkte, Tools und Software für konkrete Workflows, ruhige Interfaces und praktische Anwendungsfälle.'
    primary_cta_label: 'Produkte ansehen'
    secondary_cta_label: 'Über Oliver'
    secondary_cta_href: '/about/'
section_nav:
    - label: 'Produkte'
      href: '#projects'
    - label: 'Zusammengearbeitet mit'
      href: '#partners'
    - label: 'Nächster Schritt'
      href: '#next-step'
    - label: 'Kontakt'
      href: '#kontakt'
projects_intro:
    eyebrow: 'Produktübersicht'
    heading: 'Die Produkte.'
    text: 'Diese Seiten sind keine Varianten eines Templates. Jedes Produkt hat seine eigene Oberfläche, seinen eigenen Fokus und seine eigene Produktlogik. Diese Übersicht gibt ihnen einen gemeinsamen Einstiegspunkt.'
filters:
    - label: 'Alle'
      value: 'all'
    - label: 'Business'
      value: 'business'
    - label: 'Grafik'
      value: 'graphics'
    - label: 'Medien'
      value: 'media'
    - label: 'Nachrichten'
      value: 'news'
    - label: 'Produktivität'
      value: 'productivity'
    - label: 'Entwicklung'
      value: 'developer'
project_urls:
    - '/sqlite-hub/'
    - '/bulkpixel/'
    - '/pinefetch/'
    - '/skipthevoice/'
    - '/billly/'
    - '/no-bullshit-rss/'
    - '/knotenwerk/'
external_projects:
    - slug: 'VoiceByte'
      title: 'VoiceByte'
      href: 'https://voicebyte.netlify.app/'
      logo: '/assets/images/about/side_projects/voicebyte.webp'
      image: '/assets/images/side_projects/voicebyte/mockups/overview_361.webp'
      description: 'VoiceByte wandelt Texte direkt im Browser in Sprache um und bietet flexible Einstellungen für Stimme und Wiedergabe.'
      operating_system: 'Web'
      application_category: 'media'
      open_source: true
      feature_list:
          - 'Texte direkt im Browser in Sprache umwandeln'
          - 'Stimme, Geschwindigkeit, Tonhöhe und Lautstärke flexibel anpassen'
          - 'Gesprochene Texte im Verlauf speichern und Favoriten markieren'
project_overrides:
    sqlite-hub:
        description: 'SQLite Hub ist ein lokal ausgerichteter SQLite-Arbeitsbereich zum Durchsuchen, Bearbeiten, Abfragen, Analysieren, Visualisieren und Exportieren von Datenbanken.'
        feature_list:
            - 'Lokaler SQLite-Arbeitsbereich mit GUI, CLI, JSON-API und MCP-Server'
            - 'Tabellen durchsuchen, filtern, sortieren und sicher bearbeiten'
            - 'SQL-Editor mit Abfrageverlauf, Ausführungsdetails, Diagrammen und vollständigen Exporten'
    itworksbut:
        description: 'ItWorksBut ist ein CI-Scanner für Node.js-Projekte, der versteckte Risiken in KI-gestütztem JavaScript-, Web-, Tauri- und Electron-Code findet.'
        feature_list:
            - 'Statische Prüfungen für JavaScript-, Node.js-, Web-, Tauri- und Electron-Projekte'
            - 'Erkennt typische Risiken wie versionierte Umgebungsdateien und lückenhafte CI-Prüfungen'
            - 'Erstellt Berichte für Konsole, JSON und SARIF'
    skipthevoice:
        logo: '/assets/images/side_projects/skipthevoice/logo.webp'
        image: '/assets/images/side_projects/skipthevoice/mockups/webapp_1200.webp'
        description: 'SkipTheVoice verwandelt empfangene WhatsApp-Sprachnachrichten lokal in durchsuchbare Transkripte für Webapp, Markdown, KI-Tools und die Kommandozeile.'
        operating_system: 'macOS, Windows, Linux'
        feature_list:
            - 'Lokale Transkription empfangener WhatsApp-Sprachnachrichten'
            - 'Durchsuchbare Transkriptverwaltung in der Webapp'
            - 'Markdown-Export und CLI-Zugriff für KI- und Automations-Workflows'
    billly:
        logo: '/assets/images/side_projects/billly/logo_small.webp'
        image: '/assets/images/side_projects/billly/mockups/dashboard_361.webp'
        description: 'Billly ist eine macOS-App für Freelancer, die Rechnungen in strukturierte Daten, CRM-Einträge und Gmail-Nachfass-Mails verwandelt.'
        operating_system: 'macOS'
        feature_list:
            - 'OCR- und KI-Extraktion für Rechnungen'
            - 'Automatische Rechnungsdatenbank und CRM-Erstellung'
            - 'Gmail-Versand mit Vorlagen und Platzhaltern'
    no-bullshit-rss:
        logo: '/assets/images/side_projects/no-bullshit-rss/logo_small.png'
        image: '/assets/images/side_projects/no-bullshit-rss/mockups/dashboard_361.webp'
        description: 'No Bullshit RSS ist ein aufgeräumter RSS-Reader mit eigenen Themen, smarten Filtern, täglichen Zusammenfassungen und ohne Werbelayer.'
        operating_system: 'macOS, Windows, Linux'
        feature_list:
            - 'Eigene Themen und automatische Artikel-Klassifizierung'
            - 'Tägliche, wöchentliche und monatliche Zusammenfassungen'
            - 'Selbst gehostetes Setup mit voller Datenhoheit'
    pinefetch:
        logo: '/assets/images/side_projects/pinefetch/logo_small.webp'
        image: '/assets/images/side_projects/pinefetch/mockups/download_361.webp'
        description: 'PineFetch ist eine minimalistische Desktop-App, mit der du eigene Videos per Magic Import, Warteschlange, History und optionaler Audio-Extraktion herunterladen kannst.'
        operating_system: 'macOS'
        feature_list:
            - 'Magic Import für schnellere Übernahme unterstützter Links'
            - 'History für frühere Downloads und schnellen Wiederzugriff'
            - 'Warteschlange, Presets und optionale Audio-Extraktion'
    bulkpixel:
        logo: '/assets/images/side_projects/bulkpixel/logo.webp'
        image: '/assets/images/side_projects/bulkpixel/mockups/main_361.webp'
        description: 'BulkPixel ist eine Desktop-App mit offenem Quellcode zum Konvertieren und Skalieren vieler Bilder in einem Durchgang.'
        operating_system: 'macOS'
        feature_list:
            - 'Bildkonvertierung in großen Mengen'
            - 'Batch-Änderung von Auflösungen'
            - 'Export als PNG, JPEG und WEBP'
    knotenwerk:
        logo: '/assets/images/side_projects/knotenwerk/logo.webp'
        image: '/assets/images/side_projects/knotenwerk/mockups/tree_361.webp'
        description: 'KnotenWerk ist eine lokal ausgerichtete App für Entscheidungsbäume und Graphen mit Demo-Modus sowie Export nach JSON, SVG und Markdown.'
        operating_system: 'macOS'
        feature_list:
            - 'Bearbeitungsmodus für Knoten und beschriftete Pfade'
            - 'Ansichts- und Demo-Modus für sichere Präsentationen'
            - 'Export nach JSON, SVG und Markdown'
cta:
    eyebrow: 'Nächster Schritt'
    heading: 'Ein Produkt öffnen und tiefer einsteigen.'
    text: 'Wenn eines dieser Produkte zu deinem Workflow passt, geh direkt auf die jeweilige Produktseite. Dort liegt die komplette Produktstory inklusive Screenshots und Download-Kontext.'
    primary_label: 'Zum Blog'
    primary_href: '/blog/'
    secondary_label: 'Über Oliver'
    secondary_href: '/about/'
---
