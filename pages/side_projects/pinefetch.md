---
layout: side_projects/pinefetch
title: 'PineFetch'
body_classes: pinefetch
favicon: '/assets/images/side_projects/pinefetch/logo_small.webp'
lang: en
open_source: true
product_landing: true
image: '/assets/images/side_projects/pinefetch/mockups/download_1200.webp'
permalink: '/pinefetch/'
description: 'A free Mac app for video downloads, local transcripts and video OCR. Search saved text, organize media with tags and send links from your browser or terminal.'
meta_description: 'Download videos and audio on your Mac. Search local transcripts and extract text from video frames with OCR. Free, open-source PineFetch.'
meta_title: 'PineFetch: Video Downloader, Transcripts & OCR for Mac'
software_application:
    provider_id: 'oliver_jessner'
    application_category: 'MultimediaApplication'
    operating_system: 'macOS 11+ on Apple Silicon; local transcription requires macOS 14+; online Social Insights require macOS 13.5+'
    software_version: '3.0.0'
    release_url: 'https://github.com/oliverjessner/PineFetch/releases/tag/v3.0.0'
    download_url: 'https://github.com/oliverjessner/PineFetch/releases/download/v3.0.0/PineFetch_3.0.0_aarch64_adhoc.dmg'
    download_label: 'Download for Mac'
    compatibility_note: 'Apple Silicon. Downloads: macOS 11+. Local transcription: macOS 14+.'
    software_help: 'https://github.com/oliverjessner/PineFetch/blob/v3.0.0/README.md'
    code_repository: 'https://github.com/oliverjessner/PineFetch'
    price: '0'
    price_currency: 'EUR'
    is_accessible_for_free: true
    feature_list:
        - 'yt-dlp video downloads with Best and Max 1080p presets, timestamp starts, and MP3 or Opus export'
        - 'Optional post captions and available original creator subtitle tracks saved beside downloads'
        - 'Local faster-whisper TXT transcripts with optional segment timestamps and video retention on macOS 14+'
        - 'Search local History by saved text, title, description or creator, with Source and Tag filters'
        - 'Local colored tags with saved content and creator account collections'
        - 'Keywords and source occurrences across saved transcripts, subtitles, captions and OCR text'
        - 'Creator account view with saved downloads, on-demand public Social Insights and profile browsing'
        - 'Local video OCR with searchable, timestamped frame results and text copying'
        - 'YouTube playlists and TXT import for YouTube, TikTok and Instagram links'
        - 'Persistent waiting queue with automatic or manual start and Queue again for interrupted jobs'
        - 'Clipboard Magic Import and local History with download, size and runtime totals'
        - 'Chrome Link Dump extension, local link API, and desktop-connected CLI for queue, History and statistics'
faq:
    - question: 'Which Macs and macOS versions does PineFetch support?'
      answer: 'The current download is for Apple Silicon Macs. The app and downloads require macOS 11 or later. Local transcription requires macOS 14 or later; loading online Social Insights requires macOS 13.5 or later. The current release does not offer an Intel Mac, Windows or Linux installer.'
    - question: 'What do I need to install separately?'
      answer: 'Install yt-dlp separately. PineFetch bundles ffmpeg/ffprobe, Deno and its Python/Whisper runtime. A transcription model may need an initial internet download. If yt-dlp is not detected, set its executable path in Settings → Diagnostics.'
    - question: 'Are transcription and OCR processed locally?'
      answer: 'Yes. Speech recognition uses local faster-whisper; video OCR uses Apple Vision on your Mac. Downloads, initial model setup and requested public profile or Social Insights lookups need a network connection. Saved media, text and insight snapshots remain available locally.'
    - question: 'Do I need an account or browser cookies?'
      answer: 'No PineFetch account is needed. Optional browser authentication reads fresh cookies for YouTube requests. Public access checked confirms a public metadata check, not a verified YouTube sign-in or access to private, age-restricted or members-only videos. Platform restrictions and rate limits may still apply.'
    - question: 'What is the difference between captions, subtitles and transcripts?'
      answer: 'Post captions are the description supplied with a post. Creator subtitles are available original timed tracks. A transcript is speech recognized locally by PineFetch. OCR is separate: it recognizes text visible inside saved video frames.'
    - question: 'Can I use OCR after downloading only a transcript?'
      answer: 'OCR needs a readable local video file. Enable Keep video with transcript before downloading. If you only kept the TXT file, download again with that option enabled. Audio, images and transcript files cannot be analyzed as videos.'
    - question: 'How can I download several videos?'
      answer: 'Paste a YouTube playlist or import a TXT file of YouTube, TikTok and Instagram links. Waiting jobs, order and queue settings survive restarts. Interrupted jobs stay stopped until you choose Queue again; this does not promise resuming a partially downloaded file.'
    - question: 'Does the CLI work without the desktop app?'
      answer: 'No. Queue, History and statistics commands connect to PineFetch and start the desktop app when needed. Configure the output folder and yt-dlp first. CLI History is read-only and shows the latest 25 successful downloads.'
---
