---
layout: side_projects/sqlite_hub
title: 'SQLite Hub'
permalink: '/sqlite-hub/'
lang: en
open_source: true
body_classes: sqlite-hub-page
favicon: '/assets/images/side_projects/slqlite_hub/logo_extrasmall.webp'
logo_image: '/assets/images/side_projects/slqlite_hub/logo_small.webp'
mockup_directory: '/assets/images/side_projects/slqlite_hub/mockups/'
description: 'SQLite Hub is a local-first SQLite workspace for browsing, editing, querying, analyzing schemas, generating synthetic data, backing up, visualizing, exporting, automating, and generating types from SQLite databases.'
meta_description: 'Local-first SQLite workspace with GUI, CLI, local API, MCP, Table Advisor, row editing, synthetic data generation, SQL editor, verified backups, type generation, and open exports.'
meta_title: 'SQLite Hub | Local-first SQLite Workspace'
image: '/assets/images/side_projects/slqlite_hub/og/sqlithub_website.webp'
github_url: 'https://github.com/oliverjessner/sqlite-hub'
docs:
    cli_url: 'https://github.com/oliverjessner/sqlite-hub/blob/main/docs/CLI.md'
    api_url: 'https://github.com/oliverjessner/sqlite-hub/blob/main/docs/API.md'
software_application:
    provider_id: 'oliver_jessner'
    application_category: 'DeveloperApplication'
    operating_system: 'macOS, Linux, Windows'
    software_version: '2.3.1'
    download_url: '/sqlite-hub/#install'
    price: '0'
    price_currency: 'EUR'
    is_accessible_for_free: true
    feature_list:
        - 'Local-first SQLite workspace with GUI, CLI, local JSON API, and MCP server'
        - 'Table browsing, filtering, sorting, search, safe row editing, and synthetic data generation'
        - 'SQL editor with formatting, query history, execution details, charts, and full result exports'
        - 'Schema inspection, local Table Advisor, DDL access, table design, relationships, and Generate Types for TypeScript, Rust, Kotlin, and Swift'
        - 'Verified local backups, restore workflow, and safety prompts before risky changes'
        - 'Portable exports as CSV, TSV, JSON, Markdown, and Parquet'
        - 'Markdown documents, media tagging, database overview, health checks, and connection management'
        - 'MCP tools for Codex and agents to inspect schemas, run read-only queries, explain query plans, and use controlled SQLite Hub actions'
hero:
    eyebrow: 'Local-first SQLite workspace'
    heading: 'The local-first workspace for SQLite.'
    lead: 'Browse, edit, query, generate test data, back up, visualize, and export SQLite databases through a focused GUI, built-in CLI, local API, and MCP server.'
    primary_cta_label: 'Install SQLite Hub'
    primary_cta_href: '#install'
    secondary_cta_label: 'View on GitHub'
    secondary_cta_href: 'https://github.com/oliverjessner/sqlite-hub'
    blog_cta_label: 'German blog posts'
    blog_cta_href: 'https://oliverjessner.at/category/sqlite-hub/'
hero_install:
    label: 'Install with Homebrew'
    commands:
        - 'brew tap oliverjessner/tap'
        - 'brew install sqlite-hub'
    secondary_label: 'npm alternative'
    secondary_commands:
        - 'npm install -g sqlite-hub'
hero_visual:
    badge: 'Database overview'
    caption: 'Your SQLite database stays a file—not a platform.'
    image_600: '/assets/images/side_projects/slqlite_hub/mockups/overview_1_600.webp'
    image_1200: '/assets/images/side_projects/slqlite_hub/mockups/overview_1_1200.webp'
    image_1920: '/assets/images/side_projects/slqlite_hub/mockups/overview_1_1920.webp'
    alt: 'SQLite Hub database overview with storage, schema connectivity, integrity, runtime, and database details'
capability_strip:
    - 'LOCAL-FIRST'
    - 'OPEN SOURCE'
    - 'GUI + CLI + API + MCP'
    - 'SYNTHETIC DATA'
    - 'BACKUPS'
    - 'TABLE ADVISOR'
    - 'TYPE GENERATION'
    - 'CSV'
    - 'TSV'
    - 'JSON'
    - 'Markdown'
    - 'PARQUET'
testimonials:
    eyebrow: 'Developer feedback'
    heading: 'What developers say about SQLite Hub.'
    text: 'Feedback from developers working with SQLite and local data.'
    items:
        - quote: 'SQLite is widely used in every smartphone, browser, and OS. Yet we never had a clean tool like this to work with it. This fills a real gap.'
          author: 'saloniiio'
          platform: 'on X'
          avatar: '/assets/images/side_projects/slqlite_hub/testimonails/saloniiio.webp'
          avatar_alt: 'Profile picture of saloniiio'
        - quote: 'I love the chart function its like a mini bi combined with the documents feature'
          author: 'Berni'
          author_url: 'https://peerpush.com/u/Berni'
          platform: 'on PeerPush'
          avatar: '/assets/images/side_projects/slqlite_hub/testimonails/berni.webp'
          avatar_alt: 'Profile picture of Berni'
why:
    eyebrow: 'Why'
    heading: 'Why SQLite Hub?'
    items:
        - title: 'Focused on SQLite'
          text: 'No generic multi-database complexity. SQLite Hub is designed around local SQLite workflows.'
        - title: 'Local by design'
          text: 'Work directly with database files on your machine without uploading them to a hosted platform.'
        - title: 'Safer changes'
          text: 'Inspect generated SQL, create backups, and keep control when editing data or changing schemas.'
        - title: 'Built for automation'
          text: 'Use the same databases through the graphical interface, command-line tools, local JSON API, or MCP tools for agents.'
feature_intro:
    eyebrow: 'Product tour'
    heading: 'Four core workflows.'
    text: 'SQLite Hub keeps the common SQLite work loop short: understand the file, make careful changes, automate repeatable work, and export without lock-in.'
feature_sections:
    - id: 'explore-edit-data'
      nav_label: 'Explore, edit, and generate'
      eyebrow: '01 / Data'
      title: 'Explore, edit, and generate data'
      text: 'Browse tables, inspect complete records, filter large datasets, safely edit individual rows, and generate synthetic rows for testing.'
      points:
          - 'Search, sort, filter, and page through dense local tables without turning SQLite into a hosted system.'
          - 'Open full records, preview typed values, review generated SQL, and update or delete only safely identifiable rows.'
          - 'Generate synthetic records directly from the Data menu when you need realistic local test data without touching production data.'
      tags:
          - 'Data Viewer'
          - 'Row Editor'
          - 'Synthetic Data'
          - 'Filtering'
          - 'Safe editing'
      groups:
          - menu: 'data'
            label: 'Data'
            slides:
                - index: 1
                  slug: 'browser'
                  label: 'Browse table data'
                  caption: 'Filter, sort, search, paginate, and export table data from a focused local workspace.'
                  alt: 'SQLite Hub data browser showing filtered rows from a local SQLite table'
                - index: 2
                  slug: 'row_editor'
                  label: 'Edit a row'
                  caption: 'Preview typed values and generated SQL before applying a precise row change.'
                  alt: 'SQLite Hub row editor beside a table of SQLite records'
                - index: 3
                  slug: 'generate_data_modal'
                  label: 'Generate synthetic data'
                  caption: 'Create realistic sample rows for local testing, demos, and development databases.'
                  alt: 'SQLite Hub Generate Data dialog for creating synthetic table records'
    - id: 'query-analyze'
      nav_label: 'Query and analyze'
      eyebrow: '02 / SQL'
      title: 'Query and analyze'
      text: 'Write and run SQL, inspect execution details, reuse query history, and export complete result sets.'
      points:
          - 'Format SQL, run with keyboard shortcuts, inspect execution details, and keep query history scoped to the database.'
          - 'Export full result sets as CSV, TSV, JSON, Markdown, or Parquet, or turn query results into charts.'
      tags:
          - 'SQL Editor'
          - 'Query History'
          - 'Execution details'
          - 'Result export'
      reverse: true
      groups:
          - menu: 'sql_editor'
            label: 'SQL Editor'
            slides:
                - index: 1
                  slug: 'workspace'
                  label: 'Editor and results'
                  caption: 'Run SQL, inspect results, and switch between Results, Performance, and Messages.'
                  alt: 'SQLite Hub SQL editor with query history, result grid, performance details, and messages'
                - index: 3
                  slug: 'query_export_modal'
                  label: 'Export query results'
                  caption: 'Export complete query results into portable formats instead of copying partial grids.'
                  alt: 'SQLite Hub query export dialog with CSV, TSV, Markdown, JSON, Parquet, and duplicate options'
    - id: 'schema-types'
      nav_label: 'Schema and types'
      eyebrow: '03 / Schema'
      title: 'Understand, improve, and change the schema'
      text: 'Inspect tables, indexes, relationships, and DDL. Analyze individual tables with the local Table Advisor, design schema changes, and generate application types from your database.'
      points:
          - 'Review primary keys, foreign keys, indexes, triggers, views, table relationships, and copyable DDL.'
          - 'Get a deterministic table health score with findings by severity, supporting evidence, and recommendations derived entirely from your local database.'
          - 'Open schema-validated SQL suggestions in a dedicated editor tab. Advisor fixes are never executed automatically, and critical changes can start with a safety backup.'
          - 'Design table changes with live SQL preview and generate TypeScript, Rust, Kotlin, or Swift types from the schema.'
      tags:
          - 'Structure'
          - 'Table Advisor'
          - 'Table Designer'
          - 'Generate Types'
          - 'DDL'
      groups:
          - menu: 'structure'
            label: 'Structure'
            slides:
                - index: 1
                  slug: 'graph'
                  label: 'Relationship graph'
                  caption: 'Understand how tables connect before changing schema or data.'
                  alt: 'SQLite Hub structure view showing a graph of related database tables'
                - index: 3
                  slug: 'generate_types_modal_preview'
                  label: 'Generate application types'
                  caption: 'Generate TypeScript, Rust, Kotlin, or Swift definitions from the active schema.'
                  alt: 'SQLite Hub Generate Types dialog showing generated TypeScript definitions'
          - menu: 'table_designer'
            label: 'Table Designer'
            slides:
                - index: 1
                  slug: 'columns'
                  label: 'Design table changes'
                  caption: 'Configure columns, keys, defaults, constraints, and preview SQL before applying schema changes.'
                  alt: 'SQLite Hub table designer with editable database columns and live SQL preview'
    - id: 'protect-move-data'
      nav_label: 'Backups and exports'
      eyebrow: '04 / Backups and exports'
      title: 'Protect and move your data'
      text: 'Create verified backups before risky changes and export complete tables or query results into portable formats.'
      points:
          - 'Backups are created through SQLite, hashed with SHA-256, and verified before restore.'
          - 'Export complete tables or query results as CSV, TSV, JSON, Markdown, or Parquet.'
      tags:
          - 'Verified backups'
          - 'Restore'
          - 'Open exports'
          - 'No lock-in'
      reverse: true
      groups:
          - menu: 'backups'
            label: 'Backups'
            slides:
                - index: 1
                  slug: 'manager'
                  label: 'Backup manager'
                  caption: 'Create, review, verify, restore, download, and delete managed local backups.'
                  alt: 'SQLite Hub backup manager showing verified local database backups'
          - menu: 'data'
            label: 'Exports'
            slides:
                - index: 4
                  slug: 'data_export_modal'
                  label: 'Export table data'
                  caption: 'Move complete data sets out of SQLite Hub as portable files.'
                  alt: 'SQLite Hub data export dialog with CSV, TSV, Markdown, JSON, Parquet, and duplicate table options'
more_features:
    eyebrow: 'Beyond browsing'
    heading: 'More than a database browser'
    text: 'Secondary tools stay available without taking over the main workflow.'
    items:
        - icon: 'DOC'
          title: 'Markdown Documents'
          text: 'Keep database-scoped notes beside the data. Insert saved-query tables or notes when you need context.'
        - icon: 'CHART'
          title: 'Charts'
          text: 'Turn saved query results into bar, line, pie, donut, or scatter charts. Export charts as PNG.'
        - icon: 'TAG'
          title: 'Media Tagging'
          text: 'Configure media and tag tables, then work through image, video, or audio queues.'
        - icon: 'CONN'
          title: 'Connection Management'
          text: 'Open local files, label connections, use custom icons, and keep recent databases close.'
        - icon: 'VIEW'
          title: 'Database Overview'
          text: 'Review storage, schema connectivity, runtime, and access details in one place.'
        - icon: 'OK'
          title: 'Database Health'
          text: 'Check integrity, object counts, foreign-key clusters, isolated tables, and largest tables.'
        - icon: 'ADV'
          title: 'Table Advisor'
          text: 'Analyze one table at a time for schema, constraint, performance, data-quality, and documentation issues—deterministically and without an external service.'
        - icon: 'SAVE'
          title: 'Saved Queries'
          text: 'Name useful queries, add notes, reopen them, and use them from the GUI, CLI, or API.'
        - icon: 'HIST'
          title: 'Query History'
          text: 'Keep database-scoped query history for repeated analysis and safer iteration.'
        - icon: 'MCP'
          title: 'MCP Server'
          text: 'Connect Codex and other agents to structured SQLite Hub tools for schema inspection, read-only queries, query plans, backups, and type generation.'
interfaces:
    eyebrow: 'Interfaces'
    heading: 'One database. Four interfaces.'
    text: 'Work interactively in the GUI, automate repeatable workflows from the terminal, connect development tools through the local API, or give agents structured access through MCP.'
    cards:
        - title: 'GUI'
          icon: 'GUI'
          text: 'Browse, edit, query, visualize, document, and manage SQLite databases interactively.'
        - title: 'CLI'
          icon: '>_'
          text: 'Inspect schemas, execute SQL, export results, create backups, and generate types from the terminal.'
          code_label: 'CLI example'
          code: 'sqlite-hub --database:Unit-00 --table:users --types:typescript'
          docs_label: 'Read the CLI documentation'
          docs_href: 'https://github.com/oliverjessner/sqlite-hub/blob/main/docs/CLI.md'
        - title: 'Local API'
          icon: '/v1'
          text: 'Connect scripts and development tools through a versioned, database-scoped JSON API.'
          code_label: 'API example'
          code: |
              curl -H "Authorization: Bearer shub_..." \
                http://127.0.0.1:4173/api/v1/databases/DATABASE_ID/tables
          docs_label: 'Read the API documentation'
          docs_href: 'https://github.com/oliverjessner/sqlite-hub/blob/main/docs/API.md'
        - title: 'MCP'
          icon: 'MCP'
          text: 'Let Codex and other agents inspect local SQLite databases through defined tools instead of unrestricted file access.'
          code_label: 'Codex MCP config'
          code: |
              [mcp_servers.sqlitehub]
              url = "http://127.0.0.1:4173/mcp"
          docs_label: 'Read the MCP setup guide'
          docs_href: '/blog/2026-06-28-sqlite-hub-mcp-server-codex-mit-lokaler-sqlite-datenbank-verbinden/'
export_section:
    eyebrow: 'Data ownership'
    claim: 'Your SQLite database stays a file—not a platform.'
    heading: 'Export without lock-in.'
    text: 'Your database remains a standard SQLite file. Export complete tables and query results as CSV, TSV, JSON, Markdown, or Parquet—and continue using them in scripts, notebooks, reports, and other database tools.'
    note: 'No proprietary project format. No hosted database layer. Your data stays portable.'
use_cases:
    eyebrow: 'Use cases'
    heading: 'When SQLite Hub helps.'
    text: 'Common jobs where a focused SQLite workspace is faster than switching between tools.'
    items:
        - title: 'Explore an unfamiliar database'
          text: 'Understand tables, relationships, indexes, and sample data before changing anything.'
        - title: 'Improve a table schema'
          text: 'Use the local Table Advisor to review a health score, inspect evidence, and open safe SQL suggestions without executing changes automatically.'
        - title: 'Clean or correct records'
          text: 'Find problematic rows, create a backup, preview the generated SQL, and apply precise changes.'
        - title: 'Generate realistic test data'
          text: 'Create synthetic rows for demos, local development, and test databases without copying sensitive production data.'
        - title: 'Automate and share results'
          text: 'Run saved queries through the CLI or API and export complete datasets into open formats.'
install_options:
    - id: 'homebrew'
      label: 'Homebrew'
      hint: 'Primary install path for macOS and Linux'
      commands:
          - 'brew tap oliverjessner/tap'
          - 'brew install sqlite-hub'
    - id: 'npm'
      label: 'npm'
      hint: 'Global package for Node.js environments'
      commands:
          - 'npm install -g sqlite-hub'
install:
    eyebrow: 'Install'
    heading: 'Install SQLite Hub.'
    lead: 'Homebrew is the primary path on macOS and Linux. npm is available for global installs, and GitHub Releases remain linked for release notes and artifacts.'
    platforms:
        - 'macOS'
        - 'Linux'
        - 'Windows'
    release_label: 'View GitHub Releases'
    release_href: 'https://github.com/oliverjessner/sqlite-hub/releases'
faq:
    - question: 'Does SQLite Hub upload my database?'
      answer: 'No. SQLite Hub is built for local SQLite files and runs against the database on your machine. It does not require a hosted database layer.'
    - question: 'Which platforms and installation methods are supported?'
      answer: 'SQLite Hub lists macOS, Linux, and Windows support. Install with Homebrew on macOS/Linux or npm globally; release notes and artifacts are available on GitHub.'
    - question: 'Is SQLite Hub free and open source?'
      answer: 'Yes. SQLite Hub is free, open source, MIT licensed, and available on GitHub.'
    - question: 'Can I use SQLite Hub without the GUI?'
      answer: 'Yes. Use the built-in CLI for terminal workflows, the local JSON API for scripts and development tools, or MCP for Codex and other agents.'
    - question: 'Can SQLite Hub generate synthetic data?'
      answer: 'Yes. The Data menu includes synthetic data generation for creating local sample rows for testing, demos, and development workflows.'
    - question: 'What does the Table Advisor analyze?'
      answer: 'The Table Advisor analyzes one table at a time using local schema metadata, indexes, foreign keys, row counts, and column profiles. It reports a health score, evidence-backed findings, and recommendations. Schema-validated SQL suggestions open in the SQL Editor and are never executed automatically.'
    - question: 'Does the MCP server give agents unrestricted database access?'
      answer: 'No. MCP exposes defined SQLite Hub tools such as schema inspection, read-only queries, query-plan analysis, backups, and type generation instead of unrestricted file access.'
cta:
    eyebrow: 'Get started'
    heading: 'Open your SQLite database and start working.'
    text: 'Install SQLite Hub, open a local file, and use the GUI, CLI, local API, or MCP without moving your database into a hosted platform.'
    primary_label: 'Install SQLite Hub'
    primary_href: '#install'
    secondary_label: 'View on GitHub'
    secondary_href: 'https://github.com/oliverjessner/sqlite-hub'
featured_in:
    eyebrow: 'Listed on'
    heading: 'SQLite Hub is listed around the web.'
    text: 'Launch and directory badges are kept near the footer so product value stays first.'
    badges:
        - name: 'EarlyHunt'
          href: 'https://earlyhunt.com/project/sqlite-hub'
          image: 'https://earlyhunt.com/badges/earlyhunt-badge-dark.svg'
          alt: 'Featured on EarlyHunt'
          width: 265
          height: 58
        - name: 'Product Hunt'
          href: 'https://www.producthunt.com/products/sqlite-hub/reviews/new?utm_source=badge-product_review&utm_medium=badge&utm_source=badge-sqlite-hub'
          image: 'https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=1222945&theme=light'
          alt: 'SQLite Hub - A sharper way to work with SQLite. | Product Hunt'
          width: 250
          height: 54
        - name: 'OpenHunts Club'
          href: 'https://openhunts.com'
          image: 'https://cdn.openhunts.com/badges/club.webp'
          alt: 'OpenHunts Club Member'
          title: 'OpenHunts Club'
          width: 486
          height: 105
          display_width: 195
        - name: 'Aura++'
          href: 'https://auraplusplus.com/projects/sqlite-hub'
          image: 'https://auraplusplus.com/images/badges/featured-on-dark.svg'
          alt: 'Featured on Aura++'
          width: 265
          height: 58
        - name: 'Findly.tools'
          href: 'https://findly.tools/sqlite-hub?utm_source=sqlite-hub'
          image: 'https://findly.tools/badges/findly-tools-badge-dark.svg'
          alt: 'Featured on Findly.tools'
          width: 175
          height: 55
        - name: 'Fazier'
          href: 'https://fazier.com/launches/sqlite-hub'
          image: 'https://fazier.com/api/v1/public/badges/embed_image.svg?launch_id=9942&badge_type=daily&theme=dark'
          alt: 'Fazier badge'
          width: 136
          height: 44
          display_width: 270
launched:
    - https://www.producthunt.com/products/sqlite-hub
    - https://www.hot100.ai/builder/project/2078
    - https://earlyhunt.com/project/sqlite-hub
    - https://openhunts.com/dashboard
    - https://peerpush.com/p/sqlite-hub/plans
    - https://findly.tools/sqlite-hub
    - https://launchdach.com/land/deutschland/
    - https://saas-hub.de/listing/sqlite-hub-char
    - https://devhunt.org/tool/sqlite-hub
    - https://news.ycombinator.com/item?id=48585709
    - https://stackshare.io/sqlite-hub/
    - https://www.uneed.best/
    - https://fazier.com/launches/sqlite-hub
---
