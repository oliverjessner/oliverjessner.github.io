---
layout: post
title: 'SQLite Hub 2.1.0: Virtual und Shadow Tables jetzt visuell sichtbar'
date: 2026-07-08 21:45:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - sqlite
    - sqlite-hub
description: 'SQLite Hub 2.1.0 kennzeichnet Virtual und Shadow Tables visuell und schützt interne Shadow Tables im Row Editor vor Änderungen'
thumbnail: '/assets/images/gen/blog/sqlite-hub-2-1-0-virtual-und-shadow-tables-jetzt-visuell-sichtbar/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-hub-2-1-0-virtual-und-shadow-tables-jetzt-visuell-sichtbar/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Was ist neu in SQLite Hub 2.1.0?'
      answer: 'SQLite Hub kennzeichnet Virtual Tables und Shadow Tables jetzt visuell in den relevanten Datenbankansichten.'
    - question: 'Kann ich Shadow Tables im Row Editor bearbeiten?'
      answer: 'Nein. Der Row Editor ist bei erkannten Shadow Tables bewusst schreibgeschützt.'
    - question: 'Wo kann ich mehr über Virtual Tables, Shadow Tables und FTS5 lernen?'
      answer: 'Ein eigener Artikel erklärt die Zusammenhänge zwischen SQLite Virtual Tables, Shadow Tables und FTS5 ausführlicher.'
socialmedia:
    - 'SQLite Hub 2.1.0 zeigt Virtual und Shadow Tables jetzt visuell an. Eine kleine Änderung, die mir bei anderen SQLite-Managern lange gefehlt hat.'
    - 'Mich hat genervt, dass viele SQLite-Manager Virtual und Shadow Tables wie gewöhnliche Tabellen darstellen. SQLite Hub 2.1.0 macht den Unterschied sichtbar.'
    - 'Neu in SQLite Hub 2.1.0: visuelle Kennzeichnung für Virtual und Shadow Tables. Shadow Tables bleiben im Row Editor zusätzlich read-only.'
---

SQLite Hub 2.1.0 kennzeichnet Virtual und Shadow Tables jetzt direkt in der Oberfläche. Der Auslöser war simpel: Mich hat bei anderen SQLite-Managern genervt, dass dieser Unterschied häufig unsichtbar bleibt.

## Warum ich Virtual und Shadow Tables sichtbar machen wollte

Wer eine SQLite-Datenbank öffnet, sieht in vielen Datenbankmanagern zunächst eine Liste von Tabellen. Das funktioniert gut, solange jede Tabelle auch tatsächlich dieselbe Rolle innerhalb der Datenbank spielt.

In der Praxis ist das nicht immer der Fall.

Gerade bei Datenbanken mit FTS5 können neben einer Virtual Table weitere Shadow Tables auftauchen. Viele SQLite-Manager stellen diese Einträge jedoch praktisch genauso dar wie normale Anwendungstabellen.

Mich hat das schon länger gestört.

Nicht, weil die Tabellen nicht sichtbar wären. Das eigentliche Problem ist, dass ihre Rolle in der Oberfläche kaum erkennbar ist. Wer eine fremde Datenbank untersucht oder nach längerer Zeit in ein eigenes Projekt zurückkehrt, muss sich den Zusammenhang selbst erschließen.

Ab SQLite Hub 2.1.0 wird dieser Unterschied deshalb visuell dargestellt.

## Kennzeichnung direkt in der Structure-Ansicht

In der Structure-Ansicht erkennt SQLite Hub nun, ob es sich bei einem Eintrag um eine Virtual Table oder eine Shadow Table handelt.

![SQLite Hub Structure-Ansicht mit visueller Kennzeichnung einer Virtual Table und der zugehörigen Shadow Tables.](/assets/images/gen/blog/sqlite-hub-2-1-0-virtual-und-shadow-tables-jetzt-visuell-sichtbar/structure.webp)

Die Information wird nicht in einem separaten Diagnosefenster versteckt. Sie erscheint dort, wo ich sie selbst beim Arbeiten brauche: direkt in der Datenbankstruktur.

Das war für mich der wichtigste Punkt an der Umsetzung.

Eine Datenbankstruktur ist nicht nur eine Liste von Namen. Sie sollte möglichst schnell vermitteln, welche Elemente zusammengehören und welche Rolle sie innerhalb des Schemas spielen.

Gerade bei einer FTS5-Konfiguration kann das einen deutlichen Unterschied machen. Statt mehrere ähnlich benannte Tabellen manuell einordnen zu müssen, zeigt SQLite Hub den Typ direkt in der Oberfläche.

Wer tiefer in das Thema einsteigen möchte, findet in meinem Artikel [SQLite FTS5: Volltextsuche mit CREATE VIRTUAL TABLE verstehen](https://oliverjessner.at/blog/2026-07-08-sqlite-fts5-volltextsuche-mit-create-virtual-table-verstehen/) eine ausführlichere Erklärung zu Virtual Tables, Shadow Tables und FTS5.

## Auch die Data-Ansicht zeigt den Unterschied

Die Kennzeichnung beschränkt sich nicht auf die Structure-Ansicht.

Auch in der Data-Ansicht berücksichtigt SQLite Hub ab Version 2.1.0, ob gerade mit einer normalen Tabelle, einer Virtual Table oder einer Shadow Table gearbeitet wird.

Das ist für mich vor allem eine Frage der Konsistenz.

Es wäre wenig hilfreich, den Unterschied an einer Stelle sichtbar zu machen und ihn beim eigentlichen Arbeiten mit den Daten wieder zu verlieren. Deshalb soll die Information dort erhalten bleiben, wo Nutzer Daten durchsuchen und Datensätze öffnen.

## Shadow Tables sind im Row Editor read-only

Eine weitere Änderung betrifft den Row Editor.

Wird eine erkannte Shadow Table geöffnet, ist der Row Editor in SQLite Hub read-only. Die Daten können angesehen werden, aber nicht über die normale Bearbeitungsoberfläche verändert werden.

![SQLite Hub Data-Ansicht mit geöffneter Shadow Table; der Row Editor ist sichtbar als read-only gekennzeichnet und lässt keine Bearbeitung zu.](/assets/images/gen/blog/sqlite-hub-2-1-0-virtual-und-shadow-tables-jetzt-visuell-sichtbar/data_row_inspector.webp)

Das ist eine bewusste Entscheidung.

Ich wollte Shadow Tables nicht komplett verstecken. Gerade bei Analyse, Debugging oder beim Lernen über SQLite kann es interessant sein, ihre Inhalte überhaupt sehen zu können.

Gleichzeitig wollte ich nicht so tun, als wären sie gewöhnliche Anwendungstabellen, die bedenkenlos mit einem visuellen Row Editor bearbeitet werden sollten.

Deshalb gilt ab Version 2.1.0:

```text
Normale Tabelle -> Row Editor kann bearbeiten
Shadow Table    -> Row Editor ist read-only
```

Die Oberfläche bleibt damit transparent, setzt aber eine klare Grenze bei visuellen Schreiboperationen.

## Sichtbarkeit statt zusätzlicher Abstraktion

Bei SQLite Hub versuche ich generell, Datenbankfunktionen nicht hinter unnötigen Abstraktionen zu verstecken.

Das gilt für SQL ebenso wie für Schemaänderungen oder interne Strukturen. Nutzer sollen sehen können, womit sie gerade arbeiten.

Die neue Darstellung von Virtual und Shadow Tables folgt demselben Gedanken.

Ich wollte keine eigene Spezialansicht bauen, die man erst öffnen muss. Ebenso wenig wollte ich Shadow Tables standardmäßig ausblenden. Beides hätte aus meiner Sicht neue Fragen geschaffen.

Stattdessen zeigt SQLite Hub die vorhandene Struktur und ergänzt den Kontext direkt in der Oberfläche.
