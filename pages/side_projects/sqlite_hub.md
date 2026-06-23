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
description: 'SQLite Hub is a local-first SQLite manager with a SQL editor, data and row editing, schema inspection, Generate Types, charts, Markdown documents, media tagging, a backup manager, exports, a JSON API, and a built-in CLI.'
meta_description: 'Local-first SQLite manager with SQL editor, row editing, schema graph, Generate Types, charts, Markdown documents, media tagging, backup manager, exports, JSON API, and CLI.'
meta_title: 'SQLite Hub | Local-first SQLite Manager and CLI'
image: '/assets/images/side_projects/slqlite_hub/og/sqlithub_website.webp'
software_application:
    provider_id: 'oliver_jessner'
    application_category: 'DeveloperApplication'
    operating_system: 'macOS, Linux, Windows'
    software_version: '1.3.0'
    download_url: '/sqlite-hub/#install'
    price: '0'
    price_currency: 'EUR'
    is_accessible_for_free: true
    feature_list:
        - 'SQL editor with formatting, history, metrics, messages, and full result exports'
        - 'Filtered data browsing, typed row editing, CSV, TSV, Markdown, and JSON exports'
        - 'Database-scoped Markdown documents with autosave and saved-query inserts'
        - 'Bar, line, pie, donut, and scatter charts with PNG export'
        - 'Schema inspection, DDL access, table relationship graph, and Generate Types workflow'
        - 'Table designer with live SQL preview, foreign keys, and CHECK constraints'
        - 'Media tagging setup, queues, previews, and keyboard workflows'
        - 'Versioned local JSON API with database-scoped bearer tokens'
        - 'Backup manager plus connection management, database health overview, and CLI access'
hero:
    eyebrow: 'Local-first SQLite manager'
    heading: 'Local database work, focused in SQLite Hub.'
    lead: 'Browse, edit, query, visualize, document, and export SQLite data without a cloud layer or a heavyweight database client.'
    primary_cta_label: 'Install SQLite Hub'
    primary_cta_href: '#install'
    secondary_cta_label: 'Explore the features'
    secondary_cta_href: '#features'
hero_visual:
    badge: 'Database overview'
    caption: 'Health, storage, schema connectivity, and database details in one overview.'
    image_600: '/assets/images/side_projects/slqlite_hub/mockups/overview_1_600.webp'
    image_1200: '/assets/images/side_projects/slqlite_hub/mockups/overview_1_1200.webp'
    image_1920: '/assets/images/side_projects/slqlite_hub/mockups/overview_1_1920.webp'
    alt: 'SQLite Hub database overview with size, table counts, table list, schema details, and connection information'
featured_in:
    eyebrow: 'Featured in'
    heading: 'SQLite Hub around the web.'
    text: 'Launch pages and review badges for SQLite Hub.'
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
          href: 'https://fazier.com'
          image: 'https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=dark'
          alt: 'Fazier badge'
          width: 182
          height: 43
          display_width: 250
install_options:
    - id: 'homebrew'
      label: 'Homebrew'
      hint: 'macOS and Linux'
      commands:
          - 'brew tap oliverjessner/tap'
          - 'brew install sqlite-hub'
    - id: 'npm'
      label: 'npm'
      hint: 'Global package'
      commands:
          - 'npm install -g sqlite-hub'
feature_intro:
    eyebrow: 'Product tour'
    heading: 'Explore the core SQLite Hub workflows.'
    text: 'Each workspace stays close to the active local database and keeps the next practical action within reach.'
feature_sections:
    - id: 'sql-editor'
      nav_label: 'SQL Editor'
      eyebrow: '01 / SQL Editor'
      title: 'Write, format, run, and reuse SQL.'
      text: 'The syntax-highlighted editor keeps drafts, query history, saved queries, results, performance metrics, messages, and export actions in one workspace.'
      points:
          - 'Run with Shift + Enter, format SQL, search history, and attach titles or notes to saved queries.'
          - 'Inspect execution time, statement counts, returned or affected rows, errors, and serialized result size.'
          - 'Copy full columns, headers, or first-10 previews; export TXT, Markdown todos, CSV, TSV, Markdown, or a duplicate table.'
          - 'Interactive results stay bounded at 5,000 rows while full exports keep complete rows and BLOB values.'
          - 'Edit or delete direct single-table SELECT results when a stable row identity is available; destructive and multi-statement SQL stays visible in history and Messages.'
      tags:
          - 'Syntax highlighting'
          - 'Query details'
          - 'Column export'
          - 'Result export'
      groups:
          - menu: 'sql_editor'
            label: 'SQL Editor'
            slides:
                - index: 1
                  slug: 'workspace'
                  label: 'Editor and results'
                  caption: 'Run and format SQL, inspect results, and switch between Results, Performance, and Messages.'
                  alt: 'SQLite Hub SQL editor with a syntax-highlighted query, saved queries, table references, and query results'
                - index: 2
                  slug: 'query_details'
                  label: 'Query details'
                  caption: 'Search database-scoped history, save useful queries, and maintain titles and notes.'
                  alt: 'SQLite Hub SQL editor showing details for a saved query'
                - index: 3
                  slug: 'query_export_modal'
                  label: 'Export query results'
                  caption: 'Export the complete query as CSV, TSV, or Markdown, or duplicate the result as a table.'
                  alt: 'SQLite Hub export query dialog with CSV, TSV, Markdown, and duplicate options'
    - id: 'data'
      nav_label: 'Data'
      eyebrow: '02 / Data'
      title: 'Filter, export, and safely edit table data.'
      text: 'Browse up to 250 rows per page, search tables, combine column/operator/value filters, sort wide grids without losing scroll position, and export complete table data.'
      points:
          - 'Export tables as CSV, TSV, or Markdown, or duplicate an export into a new table.'
          - 'Compact cell previews handle long values, BLOBs, and file paths while exports retain complete content.'
          - 'The Row Editor previews SQL changes, JSON, URLs, file paths, timestamps, text lengths, NULL states, and supported CHECK values; full-row JSON can be copied or exported.'
          - 'Updates and deletes are enabled only when SQLite Hub has a stable primary-key or rowid identity.'
      tags:
          - 'Table browser'
          - 'Row editor'
          - 'CSV export'
          - 'Typed previews'
      reverse: true
      groups:
          - menu: 'data'
            label: 'Data'
            slides:
                - index: 1
                  slug: 'browser'
                  label: 'Browse table data'
                  caption: 'Filter, sort, paginate, and export full tables while keeping dense datasets manageable.'
                  alt: 'SQLite Hub data browser showing rows from a SQLite table'
                - index: 2
                  slug: 'row_editor'
                  label: 'Edit a row'
                  caption: 'Preview typed values and generated SQL before updating or deleting a safely identifiable row.'
                  alt: 'SQLite Hub row editor open beside a table of SQLite records'
                - index: 3
                  slug: 'data_export_modal'
                  label: 'Export table data'
                  caption: 'Export complete table data as CSV, TSV, or Markdown, or duplicate it into a new table.'
                  alt: 'SQLite Hub data export dialog with CSV, TSV, Markdown, and duplicate table options'
    - id: 'backups'
      nav_label: 'Backups'
      eyebrow: '03 / Backup Manager'
      title: 'Create, label, restore, and clean up database backups.'
      text: 'The Backup Manager keeps database copies visible inside SQLite Hub, so recovery work stays close to the local file instead of disappearing into manual filesystem steps.'
      points:
          - 'Create timestamped backups with names and notes before risky data or schema work.'
          - 'Edit backup metadata so important recovery points stay understandable later.'
          - 'Restore from a selected backup with an explicit confirmation step, or delete stale backups when they are no longer needed.'
          - 'Review backup file paths, sizes, creation dates, and the database each backup belongs to.'
      tags:
          - 'Backup manager'
          - 'Restore workflow'
          - 'Backup notes'
          - 'Local files'
      groups:
          - menu: 'backups'
            label: 'Backups'
            slides:
                - index: 1
                  slug: 'manager'
                  label: 'Backup manager'
                  caption: 'Review database backups with names, notes, file details, and available recovery actions.'
                  alt: 'SQLite Hub backup manager showing a list of local database backups'
                - index: 2
                  slug: 'create_backup_modal'
                  label: 'Create a backup'
                  caption: 'Create a named local backup and add context before making risky changes.'
                  alt: 'SQLite Hub create backup dialog with name and notes fields'
                - index: 3
                  slug: 'edit_backup_modal'
                  label: 'Edit backup details'
                  caption: 'Rename a backup or update its notes so the recovery point remains recognizable.'
                  alt: 'SQLite Hub edit backup dialog for changing backup metadata'
                - index: 4
                  slug: 'restore_backup_modal'
                  label: 'Restore a backup'
                  caption: 'Confirm the selected backup before replacing the active database file.'
                  alt: 'SQLite Hub restore backup confirmation dialog'
                - index: 5
                  slug: 'delete_backup_modal'
                  label: 'Delete a backup'
                  caption: 'Remove stale backup files with an explicit confirmation step.'
                  alt: 'SQLite Hub delete backup confirmation dialog'
    - id: 'documents'
      nav_label: 'Documents'
      eyebrow: '04 / Documents'
      title: 'Keep Markdown notes beside each database.'
      text: 'Documents are local Markdown files scoped to the active database, with autosave, independent editor and preview scrolling, imports, exports, and flexible pane visibility.'
      points:
          - 'Create, rename, delete, import, and export Markdown documents without leaving SQLite Hub.'
          - 'Preview lists, tables, code blocks, links, and clickable task-list checkboxes.'
          - 'Insert saved-query result tables or saved notes, and create documents from Markdown todo column exports.'
      tags:
          - 'Markdown notes'
          - 'Autosave'
          - 'Query inserts'
          - 'Import and export'
      groups:
          - menu: 'documents'
            label: 'Documents'
            slides:
                - index: 1
                  slug: 'documents'
                  label: 'Markdown documents'
                  caption: 'Edit and preview database-scoped Markdown with autosave and saved-query inserts.'
                  alt: 'SQLite Hub Documents workspace with Markdown editor, preview, and database-scoped document list'
                - index: 2
                  slug: 'document_insert_table_modal'
                  label: 'Insert a query table'
                  caption: 'Insert saved-query results into Markdown documents without leaving the document workspace.'
                  alt: 'SQLite Hub Documents dialog for inserting a saved-query result table'
                - index: 3
                  slug: 'document_insert_note_modal'
                  label: 'Insert saved notes'
                  caption: 'Reuse saved query notes inside a database-scoped Markdown document.'
                  alt: 'SQLite Hub Documents dialog for inserting saved query notes'
    - id: 'charts'
      nav_label: 'Charts'
      eyebrow: '05 / Charts'
      title: 'Turn saved query results into local charts.'
      text: 'Create charts from chartable SELECT entries in query history, render them from live query results, and save multiple chart configurations per query.'
      points:
          - 'Build bar, line, pie, donut, and scatter charts with compatible column controls.'
          - 'Configure sorting, labels, legends, line smoothing, scatter series, and optional point sizing.'
          - 'Resize, edit, reopen, delete, and export charts as PNG.'
      tags:
          - 'Bar charts'
          - 'Line and pie'
          - 'Scatter plots'
          - 'PNG export'
      reverse: true
      groups:
          - menu: 'charts'
            label: 'Charts'
            slides:
                - index: 1
                  slug: 'workspace'
                  label: 'Charts workspace'
                  caption: 'Review saved charts, inspect chartable query results, and reopen configurations.'
                  alt: 'SQLite Hub Charts workspace showing saved charts and query-backed visualization controls'
                - index: 2
                  slug: 'query_detail'
                  label: 'Chart query details'
                  caption: 'Open the saved query behind a chart and inspect the data source before editing.'
                  alt: 'SQLite Hub Charts query detail view for a saved chart source'
                - index: 3
                  slug: 'create_query_chart_modal'
                  label: 'Create a chart'
                  caption: 'Choose chart type, columns, sorting, labels, and display options from a query result.'
                  alt: 'SQLite Hub create query chart dialog with chart type and column controls'
                - index: 4
                  slug: 'edit_query_chart_modal'
                  label: 'Edit a chart'
                  caption: 'Adjust an existing chart configuration without recreating the saved query.'
                  alt: 'SQLite Hub edit query chart dialog with visualization settings'
                - index: 5
                  slug: 'delete_query_chart_modal'
                  label: 'Delete a chart'
                  caption: 'Remove a saved chart through an explicit confirmation dialog.'
                  alt: 'SQLite Hub delete query chart confirmation dialog'
                - index: 6
                  slug: 'copy_column_modal'
                  label: 'Copy chart data'
                  caption: 'Copy result columns from chart data when a visualization needs to feed another workflow.'
                  alt: 'SQLite Hub copy column dialog opened from chart data'
    - id: 'structure'
      nav_label: 'Structure'
      eyebrow: '06 / Structure'
      title: 'Inspect schema objects, relationships, and generated types.'
      text: 'Search tables, views, indexes, and triggers, inspect columns and DDL, generate application types from the schema, and move through a relationship graph that keeps the current table selected between views.'
      points:
          - 'Review declared types, primary keys, nullability, foreign keys, indexes, triggers, views, and copied DDL.'
          - 'Generate TypeScript definitions from the current database schema and copy or export the result for application code.'
          - 'Fit or relayout the graph, clear selections, hide panels, and jump directly to table data.'
          - 'Keep the last selected table while moving between Structure, Data, and related workflows.'
      tags:
          - 'Relationship graph'
          - 'Table inspector'
          - 'Generate Types'
          - 'Columns and types'
      groups:
          - menu: 'structure'
            label: 'Structure'
            slides:
                - index: 1
                  slug: 'graph'
                  label: 'Table relationship graph'
                  caption: 'See tables and their links in one navigable schema graph.'
                  alt: 'SQLite Hub structure view showing a graph of related database tables'
                - index: 2
                  slug: 'generate_types_modal'
                  label: 'Generate Types setup'
                  caption: 'Choose schema scope and output settings before generating application-ready TypeScript.'
                  alt: 'SQLite Hub Generate Types dialog with schema and output options'
                - index: 3
                  slug: 'generate_types_modal_preview'
                  label: 'Copy generated types'
                  caption: 'Review the generated definitions and copy or export them for application code.'
                  alt: 'SQLite Hub Generate Types dialog showing generated TypeScript definitions'
    - id: 'table-designer'
      nav_label: 'Table Designer'
      eyebrow: '07 / Table Designer'
      title: 'Create and migrate tables with a live SQL preview.'
      text: 'Build new tables or edit existing ones with validation, migration warnings, a searchable table list, and copyable SQL that updates before the operation is applied.'
      points:
          - 'Configure names, SQLite types, NOT NULL, UNIQUE, primary keys, SQL defaults, foreign keys, and CHECK constraints.'
          - 'Surface existing composite unique constraints as schema metadata.'
          - 'Seed a new table draft from CSV and optionally import its rows after creation.'
      tags:
          - 'Column editor'
          - 'Primary keys'
          - 'Defaults'
          - 'CHECK constraints'
      reverse: true
      groups:
          - menu: 'table_designer'
            label: 'Table Designer'
            slides:
                - index: 1
                  slug: 'columns'
                  label: 'Design table columns'
                  caption: 'Configure column names, SQLite types, nullability, defaults, and key options in one form.'
                  alt: 'SQLite Hub table designer with editable database columns and type controls'
                - index: 2
                  slug: 'checks'
                  label: 'Add CHECK constraints'
                  caption: 'Create and review named CHECK expressions as part of the table definition.'
                  alt: 'SQLite Hub table designer dialog for adding CHECK constraints'
    - id: 'media-tagging'
      nav_label: 'Media Tagging'
      eyebrow: '08 / Media Tagging'
      title: 'Tag local media through a database-driven queue.'
      text: 'Configure media, path, status, tag, and mapping tables plus the queries that drive tagged and untagged queues. Preview image, video, and audio paths relative to the active database.'
      points:
          - 'Create default tag structures, validate setup, reset queries, search tags, and manage parent tags.'
          - 'Apply tags, copy tags from the previous item, skip or reset items, and advance with Shift + Enter.'
          - 'Rotate visual media, toggle details, and open the current record directly in Data or Structure.'
      tags:
          - 'Source setup'
          - 'Tagging queue'
          - 'Media viewer'
          - 'Metadata fields'
      groups:
          - menu: 'media_tagging_setup'
            label: 'Media Tagging Setup'
            slides:
                - index: 1
                  slug: 'setup'
                  label: 'Configure the data source'
                  caption: 'Choose the media table, path column, join table, and tag columns that power the workflow.'
                  alt: 'SQLite Hub media tagging setup with media source and join table configuration'
                - index: 2
                  slug: 'create_media_tagging_tag_table_modal'
                  label: 'Create a tag table'
                  caption: 'Create the tag table structure needed for a database-driven media workflow.'
                  alt: 'SQLite Hub dialog for creating a media tagging tag table'
                - index: 3
                  slug: 'create_media_tagging_mapping_table_modal'
                  label: 'Create a mapping table'
                  caption: 'Create the join table that links media records and tags.'
                  alt: 'SQLite Hub dialog for creating a media tagging mapping table'
          - menu: 'media_tagging_queue'
            label: 'Tagging Queue'
            slides:
                - index: 1
                  slug: 'tagging_queue'
                  label: 'Work through the queue'
                  caption: 'Review queued media records and their existing metadata in a dedicated tagging workspace.'
                  alt: 'SQLite Hub media tagging queue with a media preview, metadata, and tag controls'
    - id: 'overview-connections'
      nav_label: 'Overview / Connections'
      eyebrow: '09 / Overview and Connections'
      title: 'Manage local files and understand database health.'
      text: 'Open or create SQLite files, customize recent connections, and use the overview to inspect storage, schema connectivity, integrity, runtime, and access details for the active database.'
      points:
          - 'Relabel or move connections, add custom icons, open read-only, and remove recent entries without deleting their files.'
          - 'Review file and page metrics, object counts, largest tables, foreign-key clusters, isolated tables, integrity checks, and schema versions.'
          - 'Use sidebar quick picks for the five most recent databases and keep the active file context visible.'
          - 'Remember hidden panels, selected tabs, query drafts, chart panels, table row size, and Table Designer preview visibility locally.'
      tags:
          - 'Database summary'
          - 'Table counts'
          - 'Local connections'
          - 'Recent files'
      reverse: true
      groups:
          - menu: 'overview'
            label: 'Overview'
            slides:
                - index: 1
                  slug: 'overview'
                  label: 'Database overview'
                  caption: 'Review health, storage, schema connectivity, integrity, runtime, and access information.'
                  alt: 'SQLite Hub overview showing database metrics, table list, schema details, and connection information'
          - menu: 'connections'
            label: 'Connections'
            slides:
                - index: 1
                  slug: 'connections'
                  label: 'Local database connections'
                  caption: 'Open or create local files, manage labels and icons, move paths, and control read-only access.'
                  alt: 'SQLite Hub connections screen with cards for imported local SQLite databases'
                - index: 2
                  slug: 'create_connection_modal'
                  label: 'Create a connection'
                  caption: 'Add a local SQLite file and define how it should appear in the connection list.'
                  alt: 'SQLite Hub create connection dialog for adding a local SQLite database'
                - index: 3
                  slug: 'open_connection_modal'
                  label: 'Open a connection'
                  caption: 'Choose how to open an existing local database, including read-only access.'
                  alt: 'SQLite Hub open connection dialog with database access options'
use_cases:
    eyebrow: 'Practical use cases'
    heading: 'Useful when a SQLite file is the product, the source, or the evidence.'
    text: 'SQLite Hub is designed for direct work on local files rather than a hosted database platform.'
    items:
        - title: 'Explore an unfamiliar database'
          text: 'Start with the overview and relationship graph, inspect table structures, then sample rows before writing a query.'
        - title: 'Clean or correct records'
          text: 'Find the affected rows in Data, create a named backup in Backup Manager, and edit individual records with the surrounding table still visible.'
        - title: 'Analyze content datasets'
          text: 'Keep database-scoped research notes in Documents, chart saved query results, and tag image, video, or audio records linked through mapping tables.'
        - title: 'Share a result outside the app'
          text: 'Export table data as CSV, move a SQL result into CSV, TSV, or Markdown, or generate schema types for application code.'
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
install:
    eyebrow: 'Install and run'
    heading: 'Install once, then work locally.'
    lead: 'Install SQLite Hub with Homebrew or npm. Start the local app on port 4173, open it directly in the browser, or choose another port.'
    note: 'The server binds to the IPv4 loopback interface and protects local API mutations from foreign hosts and origins.'
    run_options:
        - label: 'Start and open'
          hint: 'localhost:4173'
          commands:
              - 'sqlite-hub'
              - 'sqlite-hub --open'
        - label: 'Configure and inspect'
          hint: 'CLI basics'
          commands:
              - 'sqlite-hub --port:4174'
              - 'sqlite-hub --config'
              - 'sqlite-hub --version'
    settings_group:
        menu: 'settings'
        label: 'Settings'
        description: 'Check the installed app and SQLite runtime versions, find the custom-port command, and open project links.'
        slides:
            - index: 1
              slug: 'settings'
              label: 'Runtime settings'
              caption: 'Review app and SQLite runtime versions, custom-port guidance, and project links.'
              alt: 'SQLite Hub settings screen showing app, SQLite, Node.js, and npm versions plus API port configuration'
api:
    eyebrow: 'Local JSON API'
    heading: 'Automate SQLite Hub from scripts and tools.'
    lead: 'SQLite Hub exposes a versioned JSON API at `/api/v1` on the local loopback server. Tokens are created per database, so scripts can read tables, execute saved queries, export results, and fetch database-scoped documents without opening the full UI.'
    note: 'Create a token in Settings > API Tokens. The token is shown once, stored only as a SHA-256 hash plus metadata, and must match the database used in the request URL.'
    facts:
        - label: 'Base URL'
          value: 'http://127.0.0.1:4173/api/v1'
          text: 'Use the active SQLite Hub port, or your custom port if you started the app with `--port`.'
        - label: 'Auth'
          value: 'Bearer shub_...'
          text: 'Every database request needs a bearer token created for that exact database.'
        - label: 'Responses'
          value: 'JSON envelope'
          text: 'Successful and failed responses share a structured envelope with `success`, `data`, `metadata`, `warnings`, and errors.'
    endpoint_groups:
        - title: 'Databases and tables'
          hint: 'Inspect local data'
          endpoints:
              - 'GET  /api/v1/databases/:databaseId'
              - 'GET  /api/v1/databases/:databaseId/tables'
              - 'GET  /api/v1/databases/:databaseId/tables/:tableName'
              - 'POST /api/v1/databases/:databaseId/tables/:tableName/row'
        - title: 'Saved queries'
          hint: 'Read, run, export'
          endpoints:
              - 'GET  /api/v1/databases/:databaseId/queries'
              - 'GET  /api/v1/databases/:databaseId/queries/:queryName'
              - 'GET  /api/v1/databases/:databaseId/queries/:queryName/notes'
              - 'GET  /api/v1/databases/:databaseId/queries/:queryName/export?format=csv|tsv|md|json'
              - 'POST /api/v1/databases/:databaseId/queries/:queryName/execute'
        - title: 'Documents'
          hint: 'Markdown beside data'
          endpoints:
              - 'GET  /api/v1/databases/:databaseId/documents'
              - 'GET  /api/v1/databases/:databaseId/documents/:documentName'
              - 'GET  /api/v1/databases/:databaseId/documents/:documentName/export'
    example:
        title: 'Run a saved query from Node.js'
        hint: 'Adapted from examples/api/queries.js'
        description: 'Fetch saved query names, read one query, then execute it with POST because execution changes server state.'
        code: |
            const SQLITE_HUB_URL = 'http://127.0.0.1:4173';
            const apiToken = process.env.SQLITE_HUB_API_TOKEN;
            const DATABASE_ID = 'conn_ae9b5e54ae8eca1d';
            const path = `${SQLITE_HUB_URL}/api/v1/databases/${DATABASE_ID}`;

            async function api(path, { method = 'GET' } = {}) {
                const response = await fetch(path, {
                    method,
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${apiToken}`,
                    },
                });

                return await response.json();
            }

            const queries = await api(`${path}/queries`);
            const queryName = encodeURIComponent(queries.data.items[0].displayTitle);
            const query = await api(`${path}/queries/${queryName}`);
            const exec = await api(`${path}/queries/${queryName}/execute`, { method: 'POST' });

            console.log(query.data, exec.data);
cli:
    eyebrow: 'Built-in CLI'
    heading: 'Use the same local data from the terminal.'
    lead: 'Start SQLite Hub, inspect imported databases and tables, run saved queries, export results, work with Markdown documents, or export one row as JSON.'
    note: 'Database names are matched case-insensitively. Query exports use the same CSV, TSV, and Markdown logic as the graphical SQL Editor. Legacy database and SQL Editor aliases remain available.'
    groups:
        - title: 'Start and configure'
          hint: 'App lifecycle'
          description: 'Start the server, open the browser, inspect runtime configuration, or print help and version information.'
          commands:
              - 'sqlite-hub'
              - 'sqlite-hub --port:4174'
              - 'sqlite-hub --open'
              - 'sqlite-hub --config'
              - 'sqlite-hub --help'
              - 'sqlite-hub --version'
        - title: 'Databases and tables'
          hint: 'Inspect local files'
          description: 'List imported databases, retrieve file details, list tables, or print table metadata without opening a full workspace.'
          commands:
              - 'sqlite-hub --database'
              - 'sqlite-hub -d'
              - 'sqlite-hub --database:Billly --path'
              - 'sqlite-hub --database:Billly --size'
              - 'sqlite-hub --database:Billly --lastopened'
              - 'sqlite-hub --database:Billly --tables'
              - 'sqlite-hub --database:Billly --table:companies'
        - title: 'Saved SQL queries'
          hint: 'Run and export'
          description: 'List saved queries, print SQL or notes, execute a query by title, and export the complete result into the current directory.'
          commands:
              - 'sqlite-hub --database:Unit-00 --queries'
              - 'sqlite-hub --database:Unit-00 --execute:"Stock Winners"'
              - 'sqlite-hub --database:Unit-00 --query:"Stock Winners"'
              - 'sqlite-hub --database:Unit-00 --notes:"Stock Winners"'
              - 'sqlite-hub --database:Unit-00 --export:"Stock Winners" --format:csv'
              - 'sqlite-hub --database:Unit-00 --export:"Stock Winners" --format:tsv'
              - 'sqlite-hub --database:Unit-00 --export:"Stock Winners" --format:md'
        - title: 'Markdown documents'
          hint: 'List, print, export'
          description: 'Find database-scoped documents by id, filename, title, or partial match, then print or export their Markdown.'
          commands:
              - 'sqlite-hub --database:Unit-00 --documents'
              - 'sqlite-hub --database:Unit-00 --documents:"Research Notes"'
              - 'sqlite-hub --database:Unit-00 --documents:"Research Notes" --export'
              - 'sqlite-hub --database:Unit-00 --documents:"Research Notes--export"'
        - title: 'Row JSON export'
          hint: 'Primary key or rowid'
          description: 'Export one safely addressable row using the same JSON shaping used by the graphical Row Editor.'
          commands:
              - 'sqlite-hub --database:Unit-00 --table:companies --export:0a754aba373d34972998792a0be4333c'
faq:
    - question: 'Does SQLite Hub send my database to a hosted service?'
      answer: 'No. SQLite Hub is built for local SQLite files and runs its interface locally in your browser.'
    - question: 'What can I export?'
      answer: 'Export tables and complete SQL results as CSV, TSV, or Markdown, duplicate results as tables, export result columns as TXT or Markdown todos, save charts as PNG, export documents as Markdown, generate schema types, and export rows as JSON from the CLI.'
    - question: 'Can I edit data and schema?'
      answer: 'Yes. The Data workspace includes a row editor, Table Designer handles columns, keys, defaults, nullability, and CHECK constraints, and Structure can generate types from the schema.'
    - question: 'Can I manage backups?'
      answer: 'Yes. Backup Manager can create named local backups, edit backup notes, restore a selected backup, and delete stale backup files.'
    - question: 'What visualization tools are included?'
      answer: 'SQLite Hub includes a table relationship graph plus saved bar, line, pie, donut, and scatter charts built from live saved-query results.'
    - question: 'How do I install SQLite Hub?'
      answer: 'Use Homebrew with `brew tap oliverjessner/tap` and `brew install sqlite-hub`, or install globally with `npm install -g sqlite-hub`.'
    - question: 'What can the built-in CLI do?'
      answer: 'It can start and configure the app, list imported databases, inspect tables, run or export saved queries, print or export Markdown documents, and export a row as JSON.'
    - question: 'Does SQLite Hub have an API?'
      answer: 'Yes. SQLite Hub exposes a local JSON API at `/api/v1` with database-scoped bearer tokens for tables, saved queries, exports, and documents.'
    - question: 'Can I use a port other than 4173?'
      answer: 'Yes. Start SQLite Hub with a command such as `sqlite-hub --port:4174`.'
cta:
    eyebrow: 'Open source'
    heading: 'Work directly with the SQLite file in front of you.'
    text: 'Install SQLite Hub, open a local database, and move from schema context to records, queries, exports, and specialized content views.'
    button_label: 'View the source code'
    button_href: 'https://github.com/oliverjessner/sqlite-hub'
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
