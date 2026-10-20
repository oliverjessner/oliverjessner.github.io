---
layout: side_projects/nobullshitrss
title: 'NO BULLSHIT RSS'
body_classes: nobullshitrss
favicon: '/assets/images/side_projects/no-bullshit-rss/logo_small.webp'
lang: en
open_source: true
permalink: '/no-bullshit-rss/'
description: 'No Bullshit RSS is a clean RSS reader with keyword watchdogs, custom topics, grouped digests and no ads or subscriptions.'
image: '/assets/images/side_projects/no-bullshit-rss/mockups/feed_cards_1920.webp'
image_alt: 'NO-BULLSHIT-RSS desktop reader showing a chronological card feed'
meta_description: 'Free, open-source RSS reader for macOS with keyword watchdogs, optional notifications, local topics, grouped digests and a read-only CLI.'
meta_title: 'NO-BULLSHIT-RSS | Open-Source Desktop RSS Reader'
software_application:
    provider_id: 'oliver_jessner'
    application_category: 'NewsApplication'
    operating_system: 'macOS'
    software_version: '1.5.0'
    release_url: 'https://github.com/oliverjessner/NO-BULLSHIT-RSS/releases/tag/v1.5.0'
    download_url: 'https://github.com/oliverjessner/NO-BULLSHIT-RSS/releases/tag/v1.5.0'
    homebrew_command: 'brew install --cask oliverjessner/tap/no-bullshit-rss'
    compatibility_note: 'For Apple Silicon (M1 or newer), running macOS 13 Ventura or later.'
    price: '0'
    price_currency: 'EUR'
    is_accessible_for_free: true
    feature_list:
        - 'Custom topics and automatic article classification'
        - 'Daily, weekly, and monthly digests'
        - 'Local keyword watchdogs with an inbox and optional macOS notifications'
        - 'Self-hosted setup with full data ownership'
faq:
    - question: 'Is NO-BULLSHIT-RSS free?'
      answer: 'Yes. It is open-source software with no subscription, ads, account or paid tier.'
    - question: 'Is it open source?'
      answer: 'Yes. The complete source is available under the MIT License on GitHub.'
      button_label: 'Open repository'
      button_href: 'https://github.com/oliverjessner/NO-BULLSHIT-RSS'
    - question: 'Where is my data stored?'
      answer: 'Feeds and articles live in the app’s local SQLite database. The data stays on your machine and under your control.'
    - question: 'Does topic detection send articles to an AI API?'
      answer: 'No. Topic detection is local and rule-based, using strong, medium and weak keywords that you can edit.'
    - question: 'What does the Digest do?'
      answer: 'It groups related coverage already in your reader into story clusters for daily, weekly or monthly review. It does not generate AI summaries.'
    - question: 'How does Watchdog work?'
      answer: 'Watchdog matches keyword rules against article titles, teasers and stored content, then collects matches in a local inbox. Enable optional notifications in Settings → Notifications and grant macOS permission. Monitoring runs with RSS refreshes while the app is running, including with its window closed; quitting the app stops it.'
    - question: 'Can I use it from the terminal?'
      answer: 'Yes. The read-only CLI finds the existing app database and returns articles or digests as plain text or JSON. Homebrew installs the app and makes the bundled no-bullshit-rss command available in your terminal.'
    - question: 'Can I install it with Homebrew?'
      answer: 'Yes. Run brew install --cask oliverjessner/tap/no-bullshit-rss to install the desktop app and its bundled CLI.'
    - question: 'Which operating systems are supported?'
      answer: 'The current release supports macOS on Apple Silicon (M1 or newer). Homebrew requires macOS 13 Ventura or later.'
---
