---
layout: side_projects/pinefetch
title: 'PineFetch'
body_classes: pinefetch
favicon: '/assets/images/side_projects/pinefetch/logo_small.webp'
lang: en
open_source: true
image: '/assets/images/games/duckdeep/duckdepp.webp'
permalink: '/pinefetch/'
description: 'PineFetch is a local-first macOS app for queueing permitted video downloads with yt-dlp, TXT imports, presets, audio export, history, and no cloud uploads.'
meta_description: 'PineFetch is a local-first macOS app for queueing permitted video downloads with yt-dlp, TXT imports, presets, audio export, and history.'
meta_title: 'PineFetch | Local yt-dlp Video Queue for Mac'
software_application:
    provider_id: 'oliver_jessner'
    application_category: 'MultimediaApplication'
    operating_system: 'macOS'
    software_version: '1.5.1'
    release_url: 'https://github.com/oliverjessner/PineFetch/releases/latest'
    download_url: 'https://github.com/oliverjessner/PineFetch/releases/latest/download/PineFetch_1.5.1_aarch64_adhoc.dmg'
    download_label: 'Download for macOS &mdash; Apple Silicon'
    compatibility_note: 'Apple Silicon build. Intel Mac support coming later.'
    price: '0'
    price_currency: 'EUR'
    is_accessible_for_free: true
    feature_list:
        - 'Queue-based video downloads with Magic Import'
        - 'TXT file import for YouTube link lists'
        - 'PineFetch Link Dump Chrome companion for single and bulk link sends'
        - 'History for quick access to recent downloads'
        - 'Reusable presets for output handling'
        - 'Optional audio extraction powered by yt-dlp'
faq:
    - question: 'Is it legal?'
      answer: 'PineFetch is for content you own or have explicit permission to download. Always follow platform terms and local laws.'
    - question: 'What is yt-dlp?'
      answer: 'yt-dlp is a trusted open-source CLI tool. PineFetch uses it as the download engine.'
    - question: 'Do I need ffmpeg?'
      answer: 'Install yt-dlp and ffmpeg with Homebrew. yt-dlp is the required download engine; ffmpeg and ffprobe are recommended for audio and video processing.'
    - question: 'Does PineFetch support Intel Macs?'
      answer: 'The current downloadable DMG is an Apple Silicon build. Intel Mac support is not available in the current release.'
    - question: 'What does Magic Import do?'
      answer: 'Magic Import helps you pull a supported link into PineFetch faster, so queueing starts with less copy-paste overhead.'
    - question: 'Can I import a TXT file of YouTube links?'
      answer: 'Yes. PineFetch can read a plain text file with YouTube links and add the valid URLs to the queue.'
    - question: 'Can I send links from Chrome?'
      answer: 'Yes. PineFetch Link Dump is a companion Chrome extension for sending individual links or bulk link collections directly to PineFetch.'
    - question: 'Does PineFetch keep a history?'
      answer: 'Yes. PineFetch keeps a history of recent downloads so you can revisit finished items and reopen output files faster.'
    - question: 'Where are files saved?'
      answer: 'Downloads go to a local folder you choose. No cloud uploads.'
    - question: 'Can I see logs?'
      answer: 'Yes. Toggle the terminal log panel whenever you need it.'
---
