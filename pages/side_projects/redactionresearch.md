---
layout: side_projects/redactionresearch
title: 'RedactionResearch'
meta_title: 'PDF Redaction Checker for Hidden Text | RedactionResearch'
description: 'RedactionResearch is a local PDF redaction checker that detects hidden text, unsafe black-box redactions, metadata leaks and other sensitive data.'
meta_description: 'RedactionResearch is a local PDF redaction checker that detects hidden text, unsafe black-box redactions, metadata leaks and other sensitive data.'
permalink: '/redaction-research/'
lang: en
body_classes: redaction-research-page
favicon: '/assets/images/side_projects/redactionresearch/logo_small.webp'
image: '/assets/images/side_projects/redactionresearch/mockups/found_wrong_redacted.webp'
image_alt: 'RedactionResearch reviewing a PDF with suspicious redaction regions and machine-readable text'
open_source: true
software_application:
    name: 'RedactionResearch'
    description: 'Local web app for detecting and reviewing potentially incomplete PDF redactions'
    provider_id: 'oliver_jessner'
    application_category: 'SecurityApplication'
    software_version: '0.1.0'
    download_url: 'https://github.com/oliverjessner/RedactionResearch'
    is_accessible_for_free: true
    price: '0'
    price_currency: 'EUR'
    feature_list:
        - 'Local PDF redaction review'
        - 'Detection of live text beneath suspicious redactions'
        - 'PDF metadata and form-field checks'
        - 'Human review with Accept and Skip decisions'
faq:
    - question: 'How do I check if a PDF is properly redacted?'
      answer: 'Do not rely on visual inspection alone. Check the file for remaining live text, annotation overlays, metadata, form values, attachments, bookmarks and revision history, then review every technical finding in context.'
    - question: 'Can text remain underneath a black box in a PDF?'
      answer: 'Yes. A rectangle or annotation can visually cover text while leaving the original text object selectable, searchable or extractable inside the PDF.'
    - question: 'Can RedactionResearch recover properly deleted text?'
      answer: 'No. If the original information was genuinely removed from the PDF, there is nothing to recover. RedactionResearch only exposes or flags information that remains technically present in the file.'
    - question: 'Does RedactionResearch upload my PDFs?'
      answer: 'No hosted upload is part of the application. PDFs, analysis data and review decisions stay on the machine where RedactionResearch is running.'
    - question: 'Does it only detect black rectangles?'
      answer: 'No. It also examines redaction and overlay annotations, visually hidden text, metadata, form fields, bookmark outlines, embedded attachments and incremental PDF revisions.'
    - question: 'Does every finding mean sensitive information was leaked?'
      answer: 'No. Findings are forensic indicators, not automatic breach declarations. A human should inspect the PDF, the affected region and the supporting evidence before accepting or skipping a finding.'
    - question: 'Can it scan multiple PDFs?'
      answer: 'Yes. Create a project, import a local folder of PDFs and run the forensic scan across documents that have not already been scanned successfully.'
    - question: 'Is RedactionResearch a PDF redaction editor?'
      answer: 'No. It is an open-source PDF redaction tool for detecting and reviewing potentially incomplete redactions, not for authoring or sanitizing redactions.'
---
