---
layout: post
title: 'Ubuntu 26.10: GNU Coreutils werden vollständig durch Rust ersetzt'
date: 2026-09-17 13:21:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - linux
    - terminal
    - software-engineering
description: 'Ubuntu 26.10 vollendet den Wechsel zu Rust Coreutils: Selbst cp, mv und rm stammen künftig aus dem uutils-Projekt'
thumbnail: '/assets/images/gen/blog/ubuntu-26-10-gnu-coreutils-werden-vollstaendig-durch-rust-ersetzt/header_thumbnail.webp'
image: '/assets/images/gen/blog/ubuntu-26-10-gnu-coreutils-werden-vollstaendig-durch-rust-ersetzt/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Verwendet Ubuntu 26.10 noch GNU Coreutils?'
      answer: 'Ubuntu 26.10 verwendet standardmäßig vollständig die in Rust entwickelten uutils Coreutils. Auch cp, mv und rm werden auf die Rust-Implementierungen umgestellt.'
    - question: 'Was sind die Rust Coreutils beziehungsweise uutils?'
      answer: 'uutils Coreutils ist eine in Rust entwickelte, plattformübergreifende Neuimplementierung der bekannten GNU Coreutils wie ls, cp, mv, rm, chmod oder cat.'
    - question: 'Warum ersetzt Ubuntu die GNU Coreutils durch Rust?'
      answer: 'Rust verhindert mehrere Klassen typischer Speicherfehler bereits durch sein Sprach- und Typsystem. Entscheidend für Ubuntu sind zusätzlich Kompatibilität, Sicherheitstests und die praktische Zuverlässigkeit der Werkzeuge.'
socialmedia:
    - 'Ubuntu 26.10 geht den nächsten Schritt bei Rust: Auch cp, mv und rm wechseln von GNU Coreutils zu uutils. Damit läuft der Standardsatz der Coreutils erstmals vollständig auf der Rust-Implementierung.'
    - 'ls, cat, chmod und bald auch cp, mv und rm: Ubuntu 26.10 setzt vollständig auf Rust Coreutils. Was sich dadurch ändert und warum Canonical bei drei Befehlen länger gewartet hat.'
    - 'Ubuntu ersetzt die GNU Coreutils nicht auf einmal, sondern nach mehreren Jahren Arbeit. Mit Ubuntu 26.10 soll der Wechsel zu den Rust-basierten uutils vollständig sein.'
news: true
---

Ubuntu baut einen der ältesten Bestandteile eines klassischen Linux-Systems um. Mit Ubuntu 26.10 sollen die standardmäßig verwendeten Coreutils vollständig aus dem in Rust entwickelten uutils-Projekt stammen.

## Ubuntu 26.10 setzt vollständig auf Rust Coreutils

Wer ein [Linux](https://oliverjessner.at/category/)-System über das Terminal benutzt, arbeitet ständig mit den Coreutils. Befehle wie `ls`, `cat`, `cp`, `mv`, `rm`, `chmod`, `date` oder `sort` gehören zu den grundlegenden Werkzeugen eines Unix-artigen Betriebssystems.

Traditionell stammen diese Programme bei Ubuntu aus den GNU Coreutils. Canonical ersetzt sie jedoch schrittweise durch die Rust-basierte Neuimplementierung des Projekts [uutils Coreutils](https://github.com/uutils/coreutils).

Mit Ubuntu 26.10 erreicht diese Umstellung einen wichtigen Punkt. In den aktuellen [Release Notes für Ubuntu 26.10](https://documentation.ubuntu.com/release-notes/26.10/) führt Canonical die Änderung unter "100% Rust coreutils" auf.

Damit wechseln auch die letzten drei bisher zurückgehaltenen Werkzeuge:

- `cp` zum Kopieren von Dateien
- `mv` zum Verschieben und Umbenennen
- `rm` zum Löschen von Dateien

Ubuntu 26.10 befindet sich derzeit noch in Entwicklung und soll im Oktober 2026 erscheinen.

## Was sind die Coreutils überhaupt?

Die Coreutils wirken unspektakulär, sind für ein Linux-System aber fundamental. Viele Befehle, die man täglich im [Terminal](https://oliverjessner.at/category/) verwendet, gehören zu diesem Paket.

Dazu zählen beispielsweise:

```bash
ls
cat
cp
mv
rm
chmod
chown
date
sort
head
tail
```

Auch Shell-Skripte, Installationsprogramme, Build-Systeme und zahlreiche andere Programme verlassen sich auf ihr Verhalten.

Ein Ersatz der Coreutils ist deshalb wesentlich komplexer als der Austausch einer normalen Desktop-Anwendung. Schon kleine Unterschiede bei Parametern, Exit-Codes oder der Verarbeitung ungewöhnlicher Dateinamen können bestehende Skripte beeinflussen.

Genau deshalb versucht uutils nicht einfach, ähnliche Werkzeuge zu entwickeln. Das Projekt verfolgt ausdrücklich das Ziel, möglichst kompatibel zu den GNU Coreutils zu sein.

## Der Umstieg begann bereits mit Ubuntu 25.10

Ubuntu verwendet die Rust Coreutils nicht erst mit Version 26.10.

Bereits Ubuntu 25.10 machte `rust-coreutils` zum Standard. Canonical behielt die bisherigen GNU-Werkzeuge parallel im System, weil die Rust-Implementierungen noch nicht in allen Bereichen vollständig kompatibel waren.

Bei Ubuntu 26.04 LTS ging die Migration weiter. Drei besonders wichtige Befehle blieben allerdings vorerst bei GNU:

```bash
cp
mv
rm
```

Der Grund war nicht nur theoretische Vorsicht.

Canonical hatte zusammen mit dem uutils-Projekt und dem Sicherheitsunternehmen Zellic eine umfangreiche Sicherheitsprüfung durchgeführt. Dabei wurden laut Ubuntu insgesamt 113 Probleme unterschiedlicher Schweregrade gefunden.

Ein großer Teil davon wurde anschließend im Projekt behoben. Bei `cp`, `mv` und `rm` bestanden zum Zeitpunkt der Entscheidung für Ubuntu 26.04 jedoch noch offene Probleme rund um sogenannte TOCTOU-Race-Conditions.

Canonical entschied deshalb, diese drei Programme vorerst weiterhin aus den GNU Coreutils zu beziehen.

## Warum gerade cp, mv und rm heikel sind

Dass ausgerechnet `cp`, `mv` und `rm` länger bei den GNU-Versionen blieben, ist nachvollziehbar.

Diese Programme verändern unmittelbar das Dateisystem. Ein Fehler in `ls` kann beispielsweise zu einer falschen Darstellung führen. Ein Fehler beim rekursiven Löschen, Verschieben oder Kopieren kann wesentlich unangenehmere Folgen haben.

Bei einem Werkzeug wie `rm` reicht es deshalb nicht, dass typische Aufrufe funktionieren. Auch Sonderfälle mit symbolischen Links, Berechtigungen, parallelen Änderungen am Dateisystem und ungewöhnlichen Dateisystemstrukturen müssen möglichst identisch behandelt werden.

Ubuntu nutzte die Versionen 25.10 und 26.04 damit auch als schrittweise Einführung, bevor die letzten Coreutils auf Rust umgestellt wurden.

## Warum Ubuntu auf Rust setzt

Rust wird häufig mit Speichersicherheit verbunden. Die Sprache verhindert durch ihr Typsystem und ihr Ownership-Modell mehrere Fehlerklassen, die in C und C++ grundsätzlich möglich sind.

Dazu gehören beispielsweise bestimmte Formen von:

- Use-after-free
- ungültigen Speicherzugriffen
- Data Races
- Null-Pointer-Problemen

Das bedeutet allerdings nicht, dass Programme in Rust automatisch fehlerfrei oder sicher sind.

Die Sicherheitsprüfung der Rust Coreutils ist dafür selbst ein gutes Beispiel. Auch ohne klassische Speicherfehler können Fehler in der Programmlogik, beim Umgang mit Dateisystemen oder bei der Nachbildung des Verhaltens bestehender Programme entstehen.

Für eine Distribution wie Ubuntu ist deshalb nicht allein die verwendete Programmiersprache entscheidend. Mindestens genauso wichtig sind Kompatibilität, Tests und die tatsächliche Stabilität im Alltag.

## Rust Coreutils sind nicht sudo-rs

Rund um Ubuntus Rust-Umstellung werden zwei Projekte häufig zusammen genannt, die technisch voneinander getrennt sind.

Die Coreutils stammen aus dem Projekt uutils. `sudo` gehört dagegen nicht zu den GNU Coreutils.

Ubuntu 25.10 ersetzte auch die standardmäßige Implementierung von `sudo` durch das in Rust entwickelte `sudo-rs`. Das ist allerdings ein separates Projekt.

Canonical ersetzt damit mehrere zentrale Systemprogramme durch Rust-Implementierungen, die Projekte dahinter sollten aber nicht miteinander verwechselt werden.

## So lässt sich prüfen, welche Coreutils verwendet werden

Auf einem Ubuntu-System lässt sich bei vielen Befehlen direkt überprüfen, welche Implementierung ausgeführt wird.

Bei `cp` funktioniert beispielsweise:

```bash
cp --version
```

Bei GNU Coreutils beginnt die Ausgabe typischerweise mit:

```text
cp (GNU coreutils)
```

Die uutils-Version identifiziert sich dagegen entsprechend als Rust beziehungsweise uutils Coreutils.

Das gleiche Prinzip funktioniert auch mit anderen Programmen:

```bash
ls --version
mv --version
rm --version
```

Gerade bei Skripten, die sich auf spezielle Eigenheiten der GNU Coreutils verlassen, kann sich ein solcher Test während einer Migration lohnen.

## Was sich für Ubuntu-Nutzer ändert

Für die meisten Nutzer sollte sich zunächst möglichst wenig ändern. Genau das ist schließlich das Ziel einer kompatiblen Neuimplementierung.

Ein Aufruf wie:

```bash
cp foto.jpg backup.jpg
```

soll unabhängig davon funktionieren, ob dahinter GNU Coreutils oder uutils stehen.

Interessanter wird die Umstellung bei komplexeren Shell-Skripten, automatisierten Build-Prozessen und Software, die sich auf wenig genutzte Optionen oder sehr spezifisches Verhalten der GNU-Werkzeuge verlässt.

Das uutils-Projekt bezeichnet Unterschiede zum Verhalten der GNU Coreutils deshalb grundsätzlich als Fehler und arbeitet kontinuierlich an der Kompatibilität.

Die aktuelle Version 0.11.0 von uutils Coreutils konzentriert sich unter anderem auf bessere GNU-Kompatibilität, Performance und verständlichere Fehlermeldungen.

## Ein ungewöhnlich tiefgreifender Umbau

Der Wechsel fällt im Desktop-Alltag kaum auf. Technisch reicht er allerdings tief in das Betriebssystem hinein.

Coreutils gehören zu den Werkzeugen, auf denen unzählige Skripte und Programme aufbauen. Dass Ubuntu sie nicht in einem einzigen Release ersetzt hat, sondern die Migration über mehrere Versionen verteilt, zeigt die besondere Rolle dieser Software.

Ubuntu 25.10 führte die Rust Coreutils als Standard ein. Ubuntu 26.04 behielt mit `cp`, `mv` und `rm` noch drei GNU-Implementierungen. Ubuntu 26.10 soll nun auch diese letzten Ausnahmen beseitigen.

Damit wird aus einem Experiment ein neuer Standardbestandteil von Ubuntu.

## Quellen

- [Ubuntu 26.10 Release Notes](https://documentation.ubuntu.com/release-notes/26.10/)
- [Ubuntu: An update on rust-coreutils](https://discourse.ubuntu.com/t/an-update-on-rust-coreutils/80773)
- [uutils Coreutils auf GitHub](https://github.com/uutils/coreutils)
- [uutils Coreutils 0.11.0](https://github.com/uutils/coreutils/releases/tag/0.11.0)
