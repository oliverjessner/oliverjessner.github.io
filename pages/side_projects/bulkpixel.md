---
layout: side_projects/bulkpixel
title: 'BulkPixel'
permalink: '/bulkpixel/'
lang: en
body_classes: bulkpixel-page
favicon: '/assets/images/side_projects/bulkpixel/logo.png'
open_source: true
description: 'BulkPixel is an open-source desktop app and CLI for converting, resizing, and exporting image batches without the clutter.'
meta_description: 'BulkPixel is an open-source desktop app and CLI for batch image conversion, resizing, export presets, AVIF, PNG, JPEG, WEBP, EXIF removal, and naming controls.'
meta_title: 'BulkPixel | Bulk Image Conversion, Without the Clutter'
image: '/assets/images/side_projects/bulkpixel/mockups/bulkpixel_1920.webp'
image_small: '/assets/images/side_projects/bulkpixel/mockups/bulkpixel_361.webp'
repo_url: 'https://github.com/oliverjessner/BulkPixel'
download_url: 'https://github.com/oliverjessner/BulkPixel/releases/download/v2.1.0/BulkPixel_2.1.0_aarch64_adhoc.dmg'
software_application:
    provider_id: 'oliver_jessner'
    application_category: 'GraphicsApplication'
    operating_system: 'macOS'
    software_version: '2.1.0'
    download_url: 'https://github.com/oliverjessner/BulkPixel/releases/download/v2.1.0/BulkPixel_2.1.0_aarch64_adhoc.dmg'
    price: '0'
    price_currency: 'EUR'
    is_accessible_for_free: true
    feature_list:
        - 'Bulk image conversion and batch resizing'
        - 'Saved export presets'
        - 'Command line interface for terminal workflows'
        - 'AVIF, PNG, JPEG, and WEBP import and export'
        - 'Automatic EXIF metadata removal'
        - 'Prefix and postfix naming toggles'
        - 'Simple drag-and-drop desktop workflow'
hero:
    eyebrow: 'Open-source desktop app'
    heading: 'Convert and resize images in bulk.'
    lead: 'BulkPixel handles repetitive image work locally. Convert, resize, save presets, or run the same jobs from the terminal.'
    button_label: 'Download for macOS'
    secondary_button_label: 'GitHub'
    image_alt: 'BulkPixel desktop app interface for batch image conversion and resizing'
    caption: 'A quiet desktop workflow for conversion, resizing, naming, and export.'
presets_section:
    eyebrow: 'Presets'
    heading: 'Repeatable exports without rebuilding the setup.'
    text: 'Save format, size, quality, naming, and output folder once. Reuse the preset from the app or CLI.'
    image: '/assets/images/side_projects/bulkpixel/mockups/presets_1920.webp'
    image_small: '/assets/images/side_projects/bulkpixel/mockups/presets_361.webp'
    image_alt: 'BulkPixel presets interface with saved export settings'
    caption: 'Saved settings for repeated image export jobs.'
features_intro:
    eyebrow: 'Core workflow'
    heading: 'Small surface. Useful controls.'
    text: 'The pieces that matter for batch image work.'
features:
    - title: 'Convert in bulk'
      description: 'Process multiple images in one run.'
    - title: 'Resize in bulk'
      description: 'Set width or height and keep proportions.'
    - title: 'Presets'
      description: 'Reuse export settings for recurring jobs.'
    - title: 'CLI'
      description: 'Run conversions and presets from the terminal.'
    - title: 'Clean output'
      description: 'Strip EXIF metadata automatically.'
    - title: 'Naming control'
      description: 'Add prefixes or postfixes before export.'
cli:
    eyebrow: 'CLI'
    heading: 'The same workflow in the terminal.'
    text: 'Use explicit settings for one-off jobs or call saved presets in scripts.'
    docs_url: 'https://github.com/oliverjessner/BulkPixel/blob/main/docs/CLI.md'
    docs_label: 'Read CLI docs'
    command: |-
        bulkpixel convert \
          --preset "Blog Header" \
          --input ./image-1.png ./image-2.png
faq:
    - question: 'Can BulkPixel convert images in bulk?'
      answer: 'Yes. BulkPixel processes multiple images in one run instead of one file at a time.'
    - question: 'Can BulkPixel resize images in bulk?'
      answer: 'Yes. BulkPixel can change resolution across an entire set without leaving the workflow.'
    - question: 'Which formats can BulkPixel export?'
      answer: 'BulkPixel supports PNG, JPEG, WEBP, and AVIF workflows depending on the job.'
    - question: 'Can BulkPixel remove EXIF data automatically?'
      answer: 'Yes. BulkPixel can remove EXIF metadata automatically during export, so output files stay cleaner by default.'
    - question: 'Can I control output naming?'
      answer: 'Yes. BulkPixel lets you add a prefix or postfix to output names and toggle those naming modes on only when needed.'
    - question: 'Does BulkPixel support presets?'
      answer: 'Yes. BulkPixel can save export presets for repeated app and CLI workflows.'
    - question: 'Does BulkPixel include a CLI?'
      answer: 'Yes. The DMG includes a bulkpixel CLI for terminal-based conversions, preset management, and statistics.'
philosophy:
    eyebrow: 'Why it exists'
    heading: 'Built to stay focused.'
    lead: 'BulkPixel exists for one kind of work: the repetitive image jobs that should take minutes, not attention.'
    paragraphs:
        - 'The app stays local, direct, and calm. No dashboards. No marketing layer.'
        - 'Just a desktop tool and CLI for converting, resizing, renaming, and exporting images in bulk.'
open_source_section:
    eyebrow: 'Open source'
    heading: 'Transparent by design.'
    lead: 'BulkPixel lives on GitHub.'
    body: 'Inspect the code, use it as-is, or shape it to your workflow.'
    points:
        - 'Inspect the code'
        - 'Adapt the workflow'
        - 'Use it without lock-in'
cta:
    eyebrow: 'BulkPixel'
    heading: 'A focused desktop app for batch image work.'
    text: 'Download the app, inspect the code, or run image batches from the CLI.'
    button_label: 'Download BulkPixel'
    homebrew_heading: 'Install BulkPixel and the CLI with Homebrew:'
    homebrew_commands:
        - 'brew tap oliverjessner/tap'
        - 'brew install --cask bulkpixel'
---
