---
layout: side_projects/hub
title: 'Product Lab'
body_classes: side-projects-hub
lang: de
permalink: '/product-lab/'
description: 'Product Lab von Oliver Jessner: eigenständige Produkte, Tools und Software mit klaren Workflows, ruhigen Interfaces und klarer Produktlogik.'
meta_description: 'Entdecke das Product Lab von Oliver Jessner: RedactionResearch, SQLite Hub, SkipTheVoice, Billly, PineFetch, BulkPixel und weitere Softwareprojekte.'
meta_title: 'Product Lab | Produkte, Tools und Software von Oliver Jessner'
hero:
    eyebrow: 'Product Lab'
    heading: 'Eigenständige Produkte für klare Jobs.'
    lead: 'Hier entstehen Produkte, Tools und Software für konkrete Workflows, ruhige Interfaces und praktische Anwendungsfälle.'
    primary_cta_label: 'Produkte ansehen'
    secondary_cta_label: 'Mit mir arbeiten'
    secondary_cta_href: '#kontakt'
projects_intro:
    eyebrow: 'Produktübersicht'
    heading: 'Alle Produkte.'
    text: 'Schnell erfassbar, nach Produkttyp filterbar und mit direktem Weg zur Website, Produktseite oder zum Quellcode.'
filters:
    - label: 'Alle'
      value: 'all'
    - label: 'Developer Tools'
      value: 'developer'
    - label: 'Produktivität'
      value: 'productivity'
    - label: 'Medien'
      value: 'media'
    - label: 'Business'
      value: 'business'
    - label: 'Grafik'
      value: 'graphics'
    - label: 'Nachrichten'
      value: 'news'
    - label: 'Sicherheit'
      value: 'security'
    - label: 'macOS'
      value: 'macos'
    - label: 'Open Source'
      value: 'open-source'
project_urls:
    - '/sqlite-hub/'
    - '/bulkpixel/'
    - '/no-bullshit-rss/'
    - '/pinefetch/'
    - '/redaction-research/'
    - '/skipthevoice/'
    - '/billly/'
    - '/knotenwerk/'
external_projects:
    - slug: 'interviewed'
      title: 'Interviewed'
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
        description: 'SQLite Hub ist ein lokal ausgerichteter SQLite-Arbeitsbereich zum Durchsuchen, Bearbeiten, Abfragen, Analysieren, Visualisieren und Exportieren von Datenbanken.'
        tags: ['SQLite', 'Local-first', 'MCP']
        highlights:
            - 'Tabellen durchsuchen, filtern, bearbeiten und mit Testdaten befüllen'
            - 'SQL-Abfragen ausführen, visualisieren und vollständig exportieren'
            - 'Backups, Typgenerierung und kontrollierte MCP-Werkzeuge nutzen'
    bulkpixel:
        logo: '/assets/images/side_projects/bulkpixel/logo.webp'
        image: '/assets/images/side_projects/bulkpixel/mockups/bulkpixel_1920_1200.webp'
        description: 'BulkPixel ist eine Desktop-App mit offenem Quellcode zum Konvertieren und Skalieren vieler Bilder in einem Durchgang.'
        operating_system: 'macOS'
        tags: ['Batch', 'Images', 'CLI']
        highlights:
            - 'Viele Bilder gemeinsam konvertieren, skalieren und umbenennen'
            - 'Export-Einstellungen als wiederverwendbare Presets speichern'
            - 'Ordner automatisch überwachen oder Abläufe per CLI starten'
    redaction-research:
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
        description: 'ItWorksBut ist ein CI-Scanner für Node.js-Projekte, der versteckte Risiken in KI-gestütztem JavaScript-, Web-, Tauri- und Electron-Code findet.'
        tags: ['Node.js', 'CI', 'SARIF']
        highlights:
            - 'JavaScript-, Node.js-, Web-, Tauri- und Electron-Projekte prüfen'
            - 'Unsichere APIs, schwache CI und versehentlich eingecheckte Secrets finden'
            - 'Berichte als Konsole, JSON oder SARIF inklusive Fix-Prompts ausgeben'
    skipthevoice:
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
        logo: '/assets/images/side_projects/no-bullshit-rss/logo_small.png'
        image: '/assets/images/side_projects/no-bullshit-rss/mockups/feed_cards_1200.webp'
        description: 'No Bullshit RSS ist ein aufgeräumter RSS-Reader mit eigenen Themen, smarten Filtern, täglichen Zusammenfassungen und ohne Werbelayer.'
        operating_system: 'macOS, Windows, Linux'
        tags: ['RSS', 'Local-first', 'Digest']
        highlights:
            - 'Eigene Themen definieren und Artikel automatisch zuordnen'
            - 'Berichterstattung in täglichen, wöchentlichen oder monatlichen Digests bündeln'
            - 'Feeds lokal und ohne Konto, Werbung oder Abo verwalten'
    pinefetch:
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
        logo: '/assets/images/side_projects/knotenwerk/logo.webp'
        image: '/assets/images/side_projects/knotenwerk/mockups/tree.webp'
        description: 'KnotenWerk ist eine lokal ausgerichtete App für Entscheidungsbäume und Graphen mit Demo-Modus sowie Export nach JSON, SVG und Markdown.'
        operating_system: 'macOS'
        tags: ['Graphen', 'Local-first', 'Markdown']
        highlights:
            - 'Knoten und beschriftete Pfade im Edit-Modus aufbauen'
            - 'Entscheidungswege im sicheren Demo-Modus durchspielen'
            - 'Graphen lokal speichern und als JSON, SVG oder Markdown exportieren'
cta:
    eyebrow: 'Nächster Schritt'
    heading: 'Ein Produkt öffnen und tiefer einsteigen.'
    text: 'Wenn eines dieser Produkte zu deinem Workflow passt, geh direkt auf die jeweilige Produktseite. Dort liegt die komplette Produktstory inklusive Screenshots und Download-Kontext.'
    primary_label: 'Zum Blog'
    primary_href: '/blog/'
    secondary_label: 'Über Oliver'
    secondary_href: '/about/'
---
