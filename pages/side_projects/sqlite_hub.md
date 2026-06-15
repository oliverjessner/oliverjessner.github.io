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
description: 'SQLite Hub is a local-first SQLite manager with a SQL editor, data and row editing, schema inspection, charts, Markdown documents, media tagging, backups, exports, and a built-in CLI.'
meta_description: 'Local-first SQLite manager with SQL editor, row editing, schema graph, charts, Markdown documents, media tagging, exports, backups, and CLI.'
meta_title: 'SQLite Hub | Local-first SQLite Manager and CLI'
image: '/assets/images/side_projects/slqlite_hub/mockups/overview_1200.webp'
software_application:
    provider_id: 'oliver_jessner'
    application_category: 'DeveloperApplication'
    operating_system: 'macOS, Linux, Windows'
    software_version: '1.0.0'
    download_url: '/sqlite-hub/#install'
    price: '0'
    price_currency: 'EUR'
    is_accessible_for_free: true
    feature_list:
        - 'SQL editor with formatting, history, metrics, messages, and full result exports'
        - 'Filtered data browsing, typed row editing, CSV, TSV, Markdown, and JSON exports'
        - 'Database-scoped Markdown documents with autosave and saved-query inserts'
        - 'Bar, line, pie, donut, and scatter charts with PNG export'
        - 'Schema inspection, DDL access, and table relationship graph'
        - 'Table designer with live SQL preview, foreign keys, and CHECK constraints'
        - 'Media tagging setup, queues, previews, and keyboard workflows'
        - 'Connection management, database health overview, backups, and CLI access'
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
    image_600: '/assets/images/side_projects/slqlite_hub/mockups/overview_600.webp'
    image_1200: '/assets/images/side_projects/slqlite_hub/mockups/overview_1200.webp'
    image_1920: '/assets/images/side_projects/slqlite_hub/mockups/overview_1920.webp'
    alt: 'SQLite Hub database overview with size, table counts, table list, schema details, and connection information'
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
          - menu: 'sqleditor'
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
                  slug: 'export_column'
                  label: 'Export a column'
                  caption: 'Copy a complete column, include its header, preview the first values, or export it as TXT.'
                  alt: 'SQLite Hub dialog for exporting a selected query result column'
                - index: 4
                  slug: 'export_column_as_markdown'
                  label: 'Format a column as Markdown'
                  caption: 'Turn a selected result column into Markdown todo items or a new database-scoped document.'
                  alt: 'SQLite Hub dialog previewing a query result column as Markdown'
                - index: 5
                  slug: 'export_query_result'
                  label: 'Export the complete result'
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
          - 'Simple backups'
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
    - id: 'documents'
      nav_label: 'Documents'
      eyebrow: '03 / Documents'
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
                - slug: 'documents'
                  label: 'Markdown documents'
                  caption: 'Edit and preview database-scoped Markdown with autosave and saved-query inserts.'
                  alt: 'SQLite Hub Documents workspace with Markdown editor, preview, and database-scoped document list'
    - id: 'charts'
      nav_label: 'Charts'
      eyebrow: '04 / Charts'
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
                  slug: 'bars'
                  label: 'Bar chart'
                  caption: 'Compare grouped counts or values across categories with a saved bar chart.'
                  alt: 'SQLite Hub Charts workspace displaying a yellow bar chart'
                - index: 2
                  slug: 'pie'
                  label: 'Pie chart'
                  caption: 'Inspect the relative share of categories in a compact pie chart.'
                  alt: 'SQLite Hub Charts workspace displaying a multi-color pie chart'
                - index: 3
                  slug: 'scatter_plot'
                  label: 'Scatter plot'
                  caption: 'Compare two numeric dimensions and inspect distribution or clustering in a scatter plot.'
                  alt: 'SQLite Hub Charts workspace displaying a multi-color scatter plot'
    - id: 'structure'
      nav_label: 'Structure'
      eyebrow: '05 / Structure'
      title: 'Inspect schema objects and relationships.'
      text: 'Search tables, views, indexes, and triggers, inspect columns and DDL, and move through a relationship graph that keeps the current table selected between views.'
      points:
          - 'Review declared types, primary keys, nullability, foreign keys, indexes, triggers, views, and copied DDL.'
          - 'Fit or relayout the graph, clear selections, hide panels, and jump directly to table data.'
          - 'Keep the last selected table while moving between Structure, Data, and related workflows.'
      tags:
          - 'Relationship graph'
          - 'Table inspector'
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
                  slug: 'inspector'
                  label: 'Structure inspector'
                  caption: 'Select a table and inspect its columns, types, and schema metadata.'
                  alt: 'SQLite Hub structure inspector showing details for a selected database table'
    - id: 'table-designer'
      nav_label: 'Table Designer'
      eyebrow: '06 / Table Designer'
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
          - menu: 'tabledesigner'
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
      eyebrow: '07 / Media Tagging'
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
          - menu: 'mediataging'
            large_menu: 'media_taging'
            label: 'Media Tagging'
            slides:
                - index: 1
                  slug: 'setup'
                  label: 'Configure the data source'
                  caption: 'Choose the media table, path column, join table, and tag columns that power the workflow.'
                  alt: 'SQLite Hub media tagging setup with media source and join table configuration'
                - index: 2
                  slug: 'tagging_queue'
                  label: 'Work through the queue'
                  caption: 'Review queued media records and their existing metadata in a dedicated tagging workspace.'
                  alt: 'SQLite Hub media tagging queue with a media preview, metadata, and tag controls'
                - index: 3
                  slug: 'media_viewer'
                  label: 'Inspect and tag media'
                  caption: 'Open one file in the media viewer and apply or remove tags beside its preview and metadata.'
                  alt: 'SQLite Hub media viewer showing an image with database metadata and tag controls'
    - id: 'overview-connections'
      nav_label: 'Overview / Connections'
      eyebrow: '08 / Overview and Connections'
      title: 'Manage local files and understand database health.'
      text: 'Open or create SQLite files, customize recent connections, and use the overview to inspect storage, schema connectivity, integrity, runtime, and access details for the active database.'
      points:
          - 'Relabel or move connections, add custom icons, open read-only, and remove recent entries without deleting their files.'
          - 'Review file and page metrics, object counts, largest tables, foreign-key clusters, isolated tables, integrity checks, and schema versions.'
          - 'Use sidebar quick picks for the five most recent databases and create timestamped backups beside the active file.'
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
                - slug: 'overview'
                  label: 'Database overview'
                  caption: 'Review health, storage, schema connectivity, integrity, runtime, and access information.'
                  alt: 'SQLite Hub overview showing database metrics, table list, schema details, and connection information'
          - menu: 'connections'
            label: 'Connections'
            slides:
                - slug: 'connections'
                  label: 'Local database connections'
                  caption: 'Open or create local files, manage labels and icons, move paths, and control read-only access.'
                  alt: 'SQLite Hub connections screen with cards for imported local SQLite databases'
use_cases:
    eyebrow: 'Practical use cases'
    heading: 'Useful when a SQLite file is the product, the source, or the evidence.'
    text: 'SQLite Hub is designed for direct work on local files rather than a hosted database platform.'
    items:
        - title: 'Explore an unfamiliar database'
          text: 'Start with the overview and relationship graph, inspect table structures, then sample rows before writing a query.'
        - title: 'Clean or correct records'
          text: 'Find the affected rows in Data, create a backup, and edit individual records with the surrounding table still visible.'
        - title: 'Analyze content datasets'
          text: 'Keep database-scoped research notes in Documents, chart saved query results, and tag image, video, or audio records linked through mapping tables.'
        - title: 'Share a result outside the app'
          text: 'Export table data as CSV or move a SQL result into CSV, TSV, or Markdown for reports, scripts, and documentation.'
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
            - slug: 'settings'
              label: 'Runtime settings'
              caption: 'Review app and SQLite runtime versions, custom-port guidance, and project links.'
              alt: 'SQLite Hub settings screen showing app, SQLite, Node.js, and npm versions plus API port configuration'
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
      answer: 'Export tables and complete SQL results as CSV, TSV, or Markdown, duplicate results as tables, export result columns as TXT or Markdown todos, save charts as PNG, export documents as Markdown, and export rows as JSON from the CLI.'
    - question: 'Can I edit data and schema?'
      answer: 'Yes. The Data workspace includes a row editor, while Table Designer handles columns, keys, defaults, nullability, and CHECK constraints.'
    - question: 'What visualization tools are included?'
      answer: 'SQLite Hub includes a table relationship graph plus saved bar, line, pie, donut, and scatter charts built from live saved-query results.'
    - question: 'How do I install SQLite Hub?'
      answer: 'Use Homebrew with `brew tap oliverjessner/tap` and `brew install sqlite-hub`, or install globally with `npm install -g sqlite-hub`.'
    - question: 'What can the built-in CLI do?'
      answer: 'It can start and configure the app, list imported databases, inspect tables, run or export saved queries, print or export Markdown documents, and export a row as JSON.'
    - question: 'Can I use a port other than 4173?'
      answer: 'Yes. Start SQLite Hub with a command such as `sqlite-hub --port:4174`.'
cta:
    eyebrow: 'Open source'
    heading: 'Work directly with the SQLite file in front of you.'
    text: 'Install SQLite Hub, open a local database, and move from schema context to records, queries, exports, and specialized content views.'
    button_label: 'View the source code'
    button_href: 'https://github.com/oliverjessner/sqlite-hub'
---
