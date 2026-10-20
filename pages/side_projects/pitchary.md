---
layout: side_projects/pitchary
title: 'Pitchary'
permalink: '/pitchary/'
lang: de
ads: false
body_classes: pitchary-page
project_types: ['desktop-app']
open_source: true
favicon: '/assets/images/side_projects/pitchary/logo_small.webp'
description: 'Pitchary ist ein lokales CRM für Kunden, Angebote und Rechnungen auf dem Mac.'
meta_title: 'Pitchary – Lokales CRM für Kunden, Angebote und Rechnungen'
meta_description: 'Kunden verwalten, Angebote verfolgen und PDF-Rechnungen auswerten: Pitchary bündelt CRM und Finanzen lokal auf deinem Mac. Open Source für Apple Silicon.'
image: '/assets/images/side_projects/pitchary/mockups/dashboard_1200.webp'
image_alt: 'Pitchary-Dashboard mit Einnahmen, Ausgaben, offenen Rechnungen und Angebotskennzahlen anhand von Demodaten'
software_application:
    provider_id: 'oliver_jessner'
    application_category: 'BusinessApplication'
    operating_system: 'macOS 26.4+ · Apple Silicon'
    software_version: '0.6.2'
    release_url: 'https://github.com/oliverjessner/pitchary/releases/tag/v0.6.2'
    download_url: 'https://github.com/oliverjessner/pitchary/releases/download/v0.6.2/Pitchary_0.6.2_aarch64.dmg'
    code_repository: 'https://github.com/oliverjessner/pitchary'
    homebrew_command: 'brew install --cask oliverjessner/tap/pitchary'
    price: '0'
    price_currency: 'EUR'
    is_accessible_for_free: true
    feature_list:
        - 'Leads, Kunden und Ansprechpartner verwalten'
        - 'Dienstleistungen und Preise hinterlegen'
        - 'Angebote, Kontakte und Preisverhandlungen in einer Pipeline verfolgen'
        - 'PDF-Rechnungen importieren und per OCR oder optional mit KI auslesen'
        - 'Zahlungsstatus, Umsatz, Ausgaben und Abschlussquoten auswerten'
workflows:
    - id: kunden
      eyebrow: 'Kunden & Dienstleistungen'
      title: 'Alle Kontakte. Ein gemeinsamer Kontext.'
      description: 'Halte Leads, Kunden und Ansprechpartner zusammen. Hinterlege deine Dienstleistungen und Preise, damit aus dem nächsten Gespräch ein konkretes Angebot werden kann.'
      image: 'customers'
      image_alt: 'Pitchary-Kundenübersicht mit Firmenlogos, Ansprechpartnern und Kundenstatus'
      points:
          - 'Leads und bestehende Kunden im Blick behalten'
          - 'Ansprechpartner den passenden Unternehmen zuordnen'
          - 'Dienstleistungen und Preise wiederverwenden'
    - id: angebote
      eyebrow: 'Pipeline & Angebote'
      title: 'Vom ersten Pitch bis zum Abschluss.'
      description: 'Verfolge Angebote durch ihre Vertriebsphasen. Protokolliere Kontakte und Preisverhandlungen und behalte im Blick, was offen, gepitcht oder bereits angenommen ist.'
      image: 'pipeline'
      image_alt: 'Pitchary-Pipeline mit Angeboten, Status und Vertriebsphasen'
      points:
          - 'Angebote mit Kunde und Dienstleistung verknüpfen'
          - 'Kontakte und verhandelte Preise festhalten'
          - 'Abschlussquoten und Auftragswerte auswerten'
    - id: rechnungen
      eyebrow: 'Rechnungen & Finanzen'
      title: 'Von der PDF zu übersichtlichen Zahlen.'
      description: 'Importiere deine PDF-Rechnungen, lies sie per OCR oder optional mit KI aus und verwalte den Zahlungsstatus. Einnahmen, Ausgaben und offene Beträge laufen im Dashboard zusammen.'
      image: 'invoices'
      image_alt: 'Pitchary-Einnahmenrechnungen mit Beträgen, Fälligkeit und Zahlungsstatus'
      points:
          - 'Einnahmen- und Ausgabenrechnungen verwalten'
          - 'Rechnungserkennung und Ordnerüberwachung konfigurieren'
          - 'Umsatz und Ausgaben nachverfolgen'
gallery:
    - image: 'services'
      caption: 'Dienstleistungen & Preise'
      alt: 'Hinterlegte Dienstleistungen und Preise in Pitchary'
    - image: 'analytics'
      caption: 'Angebotsanalyse'
      alt: 'Pitchary-Analytics mit Abschlussquoten und Auftragswerten'
    - image: 'invoices-payable'
      caption: 'Ausgabenrechnungen'
      alt: 'Pitchary-Ausgabenrechnungen mit Zahlungsstatus'
    - image: 'finance-customers'
      caption: 'Umsatz nach Kunden'
      alt: 'Pitchary-Umsatzübersicht nach Kunden'
    - image: 'finance-settings'
      caption: 'Firmeneinstellungen'
      alt: 'Firmeneinstellungen für die Rechnungsverwaltung in Pitchary'
    - image: 'finance-settings-recognition'
      caption: 'Rechnungserkennung'
      alt: 'Pitchary-Einstellungen für OCR und optionale KI-Erkennung'
    - image: 'finance-settings-watcher'
      caption: 'Ordnerüberwachung'
      alt: 'Pitchary-Einstellungen für überwachte Rechnungsordner'
faq:
    - question: 'Auf welchen Macs läuft Pitchary?'
      answer: 'Pitchary unterstützt Macs mit Apple Silicon ab macOS 26.4. Du kannst die App per Homebrew oder als DMG installieren.'
    - question: 'Ist Pitchary Open Source?'
      answer: 'Ja. Der Quellcode ist auf GitHub verfügbar und steht unter der MIT-Lizenz.'
    - question: 'Brauche ich KI für meine Rechnungen?'
      answer: 'Nein. PDF-Rechnungen lassen sich per OCR auslesen. KI ist eine optionale Möglichkeit für die Rechnungserkennung.'
    - question: 'Warum blockiert macOS möglicherweise den ersten Start?'
      answer: 'Die App ist derzeit nicht notarisiert. Falls macOS den ersten Start blockiert, kannst du sie unter Systemeinstellungen → Datenschutz & Sicherheit → Dennoch öffnen freigeben.'
---
