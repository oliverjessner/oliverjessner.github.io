---
layout: post
title: 'SQLite Hub – warum ich einen SQLite Editor gebaut habe'
date: 2026-06-19 21:30:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - software-engineering
    - terminal
    - in-eigener-sache
    - sqlite
description: 'Warum SQLite Hub ein lokaler SQLite Editor ist, der SQL, Datenansicht, Exporte, Charts und Dokumentation zusammenführt'
thumbnail: '/assets/images/gen/blog/sqlite-hub-warum-ich-einen-sqlite-editor-gebaut-habe/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-hub-warum-ich-einen-sqlite-editor-gebaut-habe/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Was ist SQLite Hub?'
      answer: 'SQLite Hub ist ein lokaler SQLite Editor als Web-App. Das Tool bündelt SQL-Editor, Datenansicht, Strukturansicht, Exporte, Charts und Markdown-Dokumentation.'
    - question: 'Warum wurde SQLite Hub gebaut?'
      answer: 'SQLite Hub entstand, weil viele SQLite-Workflows in der Praxis über mehrere Tools verteilt sind. Für einfache Abfragen reicht ein Viewer oft aus, für reale Arbeitsschritte aber nicht immer.'
    - question: 'Ist SQLite Hub eine SQLite Browser Alternative?'
      answer: 'SQLite Hub kann für manche Workflows eine SQLite Browser Alternative sein. Der Fokus liegt aber weniger auf Ersatz, sondern auf einem zusammenhängenden lokalen Workflow.'
socialmedia:
    - 'Ich war mit meinen SQLite-Workflows nicht zufrieden. Zu viele Tools, zu viele Wechsel, zu wenig Zusammenhang. Deshalb habe ich SQLite Hub gebaut.'
    - 'SQLite ist einfach. Der Alltag mit SQLite-Datenbanken ist es oft nicht. SQLite Hub bündelt SQL-Editor, Datenansicht, Exporte, Charts und Dokumentation lokal in einer Oberfläche.'
    - 'Warum ich einen eigenen SQLite Editor gebaut habe: Nicht, weil SQLite kompliziert ist, sondern weil viele bestehende Workflows im Alltag zu zersplittert waren.'
---

SQLite ist klein, schnell und praktisch. Genau deshalb nutze ich es gerne. Aber die Arbeit rund um SQLite-Datenbanken hat sich für mich oft unnötig zersplittert angefühlt.

## Warum ich SQLite Hub als lokalen SQLite Editor gebaut habe

SQLite selbst war nie mein Problem. Das Problem war der Workflow drumherum.

Ich wollte eine lokale SQLite-Datenbank öffnen, Daten prüfen, SQL-Abfragen schreiben, Ergebnisse exportieren, Tabellenstrukturen verstehen und manchmal auch eine kurze Notiz dazu festhalten.

Dafür hatte ich oft mehrere Werkzeuge offen. Ein SQLite Viewer für die Daten. Ein SQL-Editor für Abfragen. Ein Script für Exporte. Eine Tabelle für Auswertungen. Eine Markdown-Datei für Notizen.

Genau deshalb habe ich [SQLite Hub](https://oliverjessner.at/sqlite-hub/) gebaut. Nicht, weil es keine SQLite-Tools gibt. Sondern weil ich mit den vorhandenen Alternativen für meinen Alltag nicht wirklich zufrieden war.

## SQL Editor: Abfragen, Query History und Exporte an einem Ort

![Screenshot des SQL Editors in SQLite Hub mit Query History, gespeicherten Abfragen und Ergebnisansicht](/assets/images/side_projects/slqlite_hub/mockups/sqleditor_1_1200.webp)

Der SQL Editor ist der Kern von SQLite Hub. Hier geht es nicht nur darum, eine Abfrage auszuführen. Ich wollte gespeicherte Queries, Query History, Formatierung, Exporte und Ergebnisse an einem Ort haben. Gerade bei längeren Analysen wird es schnell mühsam, wenn SQL, Ergebnis und Kontext auseinanderfallen.

## Data Viewer: SQLite Tabellen schneller prüfen und verstehen

![Screenshot des Data Viewers in SQLite Hub mit Tabellenansicht einer lokalen SQLite-Datenbank](/assets/images/side_projects/slqlite_hub/mockups/data_1_1200.webp)

Der Data Viewer ist für die schnelle Arbeit mit Tabellen gedacht. Man öffnet eine SQLite-Datenbank, klickt sich durch Tabellen, prüft Datensätze und versteht schneller, was tatsächlich in der Datei steckt. Für mich war wichtig, dass dieser Teil nicht wie ein reiner Rohdaten-Dump wirkt, sondern wie ein praktischer Einstieg in die Datenbank.

## Charts: SQLite Daten direkt visualisieren

![Screenshot der Chart-Funktion in SQLite Hub mit Scatter Plot zur Visualisierung von SQLite-Daten](/assets/images/side_projects/slqlite_hub/mockups/charts_3_scatter_plot_1200.webp)

Charts sind in SQLite-Tools oft gar nicht oder nur sehr eingeschränkt vorhanden. Dabei reicht manchmal schon eine einfache Visualisierung, um Muster in Daten schneller zu erkennen. [SQLite Hub](https://oliverjessner.at/sqlite-hub/) soll keine BI-Plattform ersetzen. Aber wenn ich eine Abfrage ausführe, möchte ich bestimmte Ergebnisse direkt als Chart sehen können, ohne dafür sofort ein weiteres Tool zu öffnen.

## Markdown Documents: Datenbank-Notizen direkt im Projektkontext

![Screenshot der Markdown Documents in SQLite Hub für Projektnotizen und Datenbank-Dokumentation](/assets/images/side_projects/slqlite_hub/mockups/documents_1200.webp)

Die Markdown Documents sind aus einem sehr praktischen Problem entstanden. Bei der Arbeit mit Datenbanken entstehen ständig Notizen: Was bedeutet diese Tabelle? Welche Query war wichtig? Welche Annahme steckt hinter einem Export? Statt diese Informationen in einer externen Datei abzulegen, kann man sie direkt im Projektkontext dokumentieren.
