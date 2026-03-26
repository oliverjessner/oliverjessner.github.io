---
layout: side_projects/billly
title: 'Billly'
permalink: '/billly/'
lang: en
description: "Billly is a macOS app for freelancers that turns invoices into structured data, CRM entries and Gmail follow-ups."
image: '/assets/images/side_projects/billly/mockups/dashboard.webp'
meta_description: 'Billly v0.3.0 is a macOS invoice intelligence app for freelancers. It reads invoices with OCR and AI, auto-tags payables and bills, generates a CRM from invoice data, and sends Gmail emails from custom placeholder templates.'
meta_title: 'Billly v0.3.0 | Invoice Intelligence + Gmail Templates'
software_application:
    provider_id: 'oliver_jessner'
    application_category: 'BusinessApplication'
    operating_system: 'macOS'
    software_version: '0.3.0'
    download_url: 'https://github.com/oliverjessner/Billly-Release/releases'
    price: '0'
    price_currency: 'EUR'
    is_accessible_for_free: true
    feature_list:
        - 'OCR and AI extraction for invoices'
        - 'Automatic invoice database and CRM generation'
        - 'Gmail sending with custom templates and placeholders'
faq:
    - question: 'Is Billly macOS-only?'
      answer: 'Yes. Billly currently runs on macOS only.'
    - question: 'Where does my data go?'
      answer: 'Your PDFs stay on your machine. Billly processes them locally and only sends text to OpenAI for extraction and placeholder filling. Gmail is only involved when you connect it for sending.'
    - question: 'What does the generated CRM include?'
      answer: 'Billly creates customer records from revenue invoices and can derive fields like relationship age, latest invoice, LTV, billing details, main email, and other invoice-based contact context.'
    - question: 'Can Billly send emails through Gmail?'
      answer: 'Yes. In v0.3.0, Billly can send emails from your connected Gmail account using the customer and invoice context it already parsed.'
    - question: 'Can I create my own templates and placeholders?'
      answer: 'Yes. You can create custom templates and reuse placeholders that map to invoice, customer, and sender data.'
    - question: 'Is this tax or legal advice?'
      answer: 'No. Billly is a bookkeeping tool, not a tax or legal advisor. Always consult a professional.'
    - question: 'Do I need to tag bills manually?'
      answer: 'No. The current workflow is designed to tag payables and bills automatically after OCR and AI extraction.'
---
