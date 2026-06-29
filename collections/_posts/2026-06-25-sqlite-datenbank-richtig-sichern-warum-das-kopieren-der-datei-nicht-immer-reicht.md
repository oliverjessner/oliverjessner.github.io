---
layout: post
title: 'SQLite-Datenbank richtig sichern: Warum das Kopieren der Datei nicht immer reicht'
date: 2026-06-25 09:04:01 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - software-engineering
    - in-eigener-sache
    - sqlite-hub
    - sqlite
description: 'SQLite Hub erstellt geprüfte Backups, warnt vor riskanten Änderungen und macht Wiederherstellungen lokaler SQLite-Datenbanken nachvollziehbar'
thumbnail: '/assets/images/gen/blog/sqlite-datenbank-richtig-sichern-warum-das-kopieren-der-datei-nicht-immer-reicht/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-datenbank-richtig-sichern-warum-das-kopieren-der-datei-nicht-immer-reicht/header.webp'
faq:
    - question: 'Wie erstellt SQLite Hub ein Backup?'
      answer: 'SQLite Hub verwendet die Backup API von SQLite, berechnet anschließend eine SHA-256-Prüfsumme und kontrolliert die Sicherung mit PRAGMA quick_check.'
    - question: 'Wann schlägt SQLite Hub automatisch ein Backup vor?'
      answer: 'SQLite Hub warnt unter anderem vor Schemaänderungen, größeren SQL-Importen, Migrationen und dem Wiederherstellen eines älteren Backups.'
    - question: 'Speichert SQLite Hub Backups in der Cloud?'
      answer: 'Nein. SQLite Hub arbeitet local-first und legt die verwalteten Backups im lokalen Anwendungsverzeichnis ab.'
socialmedia:
    - 'Ich habe SQLite Hub um einen Backup Manager erweitert. Er erstellt Sicherungen über SQLite selbst, prüft sie mit SHA-256 und PRAGMA quick_check und warnt vor riskanten Änderungen.'
    - 'Eine SQLite-Datenbank zu kopieren ist einfach. Sicher zu wissen, ob die Kopie vollständig und wiederherstellbar ist, ist schwieriger. Genau dafür gibt es den Backup Manager in SQLite Hub.'
    - 'Vor DROP TABLE, Migrationen oder größeren SQL-Importen fragt SQLite Hub nach einem Sicherheitsbackup. Die Entscheidung bleibt beim Nutzer, aber das Risiko wird sichtbar.'
---

SQLite-Datenbanken wirken unkompliziert: Eine Datei, ein Kopiervorgang, ein Backup. Beim Entwickeln von SQLite Hub wurde mir jedoch schnell klar, dass dieser Ablauf für ein Datenbankwerkzeug nicht ausreicht. Deshalb habe ich einen Backup Manager gebaut, der Sicherungen nicht nur erstellt, sondern auch prüft und verwaltet.

## Warum SQLite Hub einen Backup Manager braucht

[SQLite Hub](https://oliverjessner.at/sqlite-hub/) ist als lokale Arbeitsoberfläche für SQLite-Datenbanken entstanden. Ich wollte ein Werkzeug bauen, mit dem ich Tabellen untersuchen, Datensätze bearbeiten, SQL-Abfragen ausführen, Schemas verändern und Ergebnisse exportieren kann, ohne die Datenbank in eine Cloud-Plattform hochladen zu müssen.

Sobald ein Werkzeug Daten verändern kann, entsteht allerdings auch Verantwortung. Ein SQL Editor kann eine fehlerhafte Abfrage ausführen. Ein Table Designer kann eine Tabelle neu aufbauen. Ein Import kann Tausende Statements enthalten. Ein Restore kann den aktuellen Datenbestand ersetzen.

Bei einem reinen Viewer wäre ein Backup Manager nur eine zusätzliche Funktion. Bei einem Werkzeug, das bewusst auch Schreibzugriffe erlaubt, gehört er für mich zum Kern des Produkts.

Mein Ziel war deshalb nicht, lediglich einen weiteren "Backup erstellen"-Button einzubauen. SQLite Hub sollte drei Fragen beantworten:

1. Wurde die Sicherung auf einem technisch sinnvollen Weg erstellt?
2. Ist die entstandene Datei lesbar und unverändert?
3. Wird vor riskanten Änderungen rechtzeitig an ein Backup erinnert?

Aus diesen Fragen ist der Backup Manager entstanden. Der Backup Manager ist Teil eines größeren lokalen Datenbank-Workflows. Welche Funktionen SQLite Hub darüber hinaus als [SQLite Database Manager](/blog/2026-06-25-warum-sqlite-hub-fuer-mich-der-beste-sqlite-database-manager-ist/) verbindet, beschreibe ich in einem eigenen Überblick.

## Warum ich die Datenbankdatei nicht einfach kopiere

SQLite speichert eine Datenbank meistens in einer einzelnen Datei. Dadurch liegt die Annahme nahe, dass ein gewöhnlicher Kopiervorgang ausreicht:

```bash
cp application.db application-backup.db
```

Wenn eine Datenbank vollständig geschlossen ist, kann das durchaus funktionieren. Problematisch wird es, wenn eine Anwendung noch auf die Datei zugreift oder SQLite den WAL-Modus verwendet.

Im WAL-Modus können bereits bestätigte Änderungen noch in einer zusätzlichen `-wal`-Datei liegen. Die Hauptdatei allein muss deshalb nicht den vollständigen aktuellen Zustand enthalten. Auch ein Kopiervorgang während laufender Schreibzugriffe kann eine Datei erzeugen, deren Seiten aus unterschiedlichen Zeitpunkten stammen.

Für SQLite Hub war das ein wichtiges Detail. Ein Datenbank-Manager darf nicht davon ausgehen, dass die aktive Datei gerade zufällig in einem günstigen Zustand ist. Er muss SQLite selbst mit der Erstellung des Backups beauftragen.

Deshalb verwendet SQLite Hub die offizielle Backup API von SQLite. Die Datenbank-Engine koordiniert den Snapshot und kennt den Zustand der geöffneten Datenbank. Der Backup Manager kopiert nicht blind eine Datei aus dem Dateisystem.

Diese technische Entscheidung ist im Alltag weitgehend unsichtbar. Genau das ist beabsichtigt. Nutzer sollen ein Backup anlegen können, ohne zuvor prüfen zu müssen, welcher Journal-Modus aktiv ist oder ob SQLite gerade zusätzliche Dateien verwendet.

## So funktioniert der Backup Manager in SQLite Hub

Der Backup Manager befindet sich als eigener Bereich innerhalb von SQLite Hub. Dort lassen sich Sicherungen der aktuell geöffneten Datenbank erstellen und verwalten.

Ein Backup enthält nicht nur die eigentliche SQLite-Datei. SQLite Hub speichert zusätzlich Metadaten, durch die sich einzelne Sicherungen später besser einordnen lassen.

![Der Backup Manager von SQLite Hub](/assets/images/side_projects/slqlite_hub/mockups/backups_1_1920.webp)

Dazu gehören unter anderem:

- der Zeitpunkt der Erstellung
- der Name der zugehörigen Datenbankverbindung
- die Größe der Sicherungsdatei
- der Prüfstatus
- eine SHA-256-Prüfsumme
- optionale Notizen

Die Sicherungen werden nach Datenbankverbindung getrennt im lokalen Anwendungsverzeichnis von SQLite Hub abgelegt. Neben den Backup-Dateien befindet sich eine `manifest.json`, in der SQLite Hub die zugehörigen Metadaten verwaltet.

Das ist für mich ein wichtiger Unterschied zu einem Ordner voller Dateien wie `backup-final.db`, `backup-final-2.db` oder `backup-neu.db`. Solche Kopien können technisch brauchbar sein, aber nach einigen Wochen lässt sich oft kaum noch nachvollziehen, aus welchem Zustand sie stammen.

Der Backup Manager soll nicht nur Dateien sammeln. Er soll Kontext erhalten.

## Ein Backup wird erst nach der Prüfung als verifiziert markiert

Nach der Erstellung berechnet SQLite Hub für jede Sicherung eine SHA-256-Prüfsumme. Damit lässt sich später feststellen, ob sich die Datei seit dem Backup verändert hat.

Eine Prüfsumme bestätigt allerdings noch nicht, dass die Datenbank selbst konsistent ist. Sie kann auch für eine bereits beschädigte Datei berechnet werden.

Deshalb führt SQLite Hub zusätzlich folgenden SQLite-Befehl aus:

```sql
PRAGMA quick_check;
```

SQLite prüft damit zentrale Strukturen der Datenbank. Nur wenn die Prüfung erfolgreich abgeschlossen wird, markiert SQLite Hub das Backup als verifiziert.

Der Ablauf besteht damit aus drei getrennten Schritten:

1. SQLite erstellt über seine Backup API einen konsistenten Snapshot.
2. SQLite Hub berechnet eine SHA-256-Prüfsumme der neuen Datei.
3. `PRAGMA quick_check` kontrolliert die grundlegende Datenbankstruktur.

Diese Trennung ist wichtig. Die Backup API kümmert sich um die Erstellung. Die Prüfsumme erkennt spätere Dateiänderungen. `PRAGMA quick_check` prüft, ob SQLite die Sicherung strukturell als konsistent bewertet.

Ein grüner Prüfstatus ist trotzdem keine Garantie dafür, dass das Backup alle fachlich erwarteten Daten enthält. Wurde die falsche Datenbank geöffnet oder war der gewünschte Datensatz bereits vorher gelöscht, kann auch eine technisch fehlerfreie Sicherung diesen Zustand nur abbilden.

SQLite Hub prüft deshalb die technische Integrität. Die fachliche Bewertung bleibt beim Nutzer.

## Sicherheitsbackups vor riskanten Änderungen

Der Backup Manager wäre für mich nur halb so nützlich, wenn Nutzer selbst daran denken müssten, ihn vor jeder kritischen Änderung zu öffnen.

Deshalb analysiert SQLite Hub bestimmte Aktionen und schlägt an passenden Stellen ein Sicherheitsbackup vor.

Das betrifft beispielsweise Schemaoperationen wie:

```sql
DROP TABLE users;
```

```sql
ALTER TABLE users ADD COLUMN status TEXT;
```

```sql
CREATE INDEX idx_users_email ON users(email);
```

SQLite Hub erkennt im SQL Editor unter anderem folgende Statements als potenziell schwer rückgängig zu machen:

- `DROP TABLE`
- `ALTER TABLE`
- `CREATE TABLE`
- `CREATE INDEX`
- `CREATE VIEW`
- `CREATE TRIGGER`
- `DROP INDEX`
- `DROP VIEW`
- `DROP TRIGGER`
- `REINDEX`
- `VACUUM`

Nicht jeder dieser Befehle zerstört Daten. Ein neuer Index ist normalerweise weniger riskant als `DROP TABLE`. Trotzdem verändern diese Befehle die Struktur oder den physischen Zustand der Datenbank. Eine Sicherung kann deshalb sinnvoll sein.

SQLite Hub zeigt vor der Ausführung einen Dialog mit drei Möglichkeiten:

1. Backup erstellen und anschließend fortfahren
2. Ohne Backup fortfahren
3. Vorgang abbrechen

Mir war wichtig, dass SQLite Hub hier nicht bevormundet. Das Werkzeug blockiert keine legitimen Änderungen und erzwingt auch kein Backup. Es macht lediglich sichtbar, dass die folgende Aktion schwer oder gar nicht rückgängig zu machen sein könnte.

Gerade bei lokaler [Softwareentwicklung](https://oliverjessner.at/category/software-development/) ist das praktisch. Viele Änderungen entstehen während des Experimentierens. Eine Abfrage wird angepasst, ein Import getestet oder eine Tabelle kurzfristig umgebaut. Der Backup-Hinweis setzt genau an dem Moment an, in dem ein zusätzlicher Sicherungsstand hilfreich sein kann.

## Migrationen werden gesondert behandelt

Ein einzelnes SQL-Statement lässt sich vergleichsweise leicht einschätzen. Schwieriger wird es bei mehreren Schemaänderungen, die gemeinsam ausgeführt werden.

SQLite Hub behandelt eine Ausführung mit mehreren schemarelevanten Statements deshalb als Migration. Vor der Ausführung schlägt das Werkzeug ein Backup mit einem passenden Kontext wie "Before migration" vor.

Ein vereinfachtes Beispiel wäre:

```sql
ALTER TABLE users ADD COLUMN status TEXT DEFAULT 'active';

CREATE INDEX idx_users_status
ON users(status);

CREATE TABLE user_events (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  event_type TEXT NOT NULL,
  created_at TEXT NOT NULL
);
```

![Der Prompt in SQLite Hub um ein automatisches Backup aus einem Query zu generieren](/assets/images/gen/blog/sqlite-datenbank-richtig-sichern-warum-das-kopieren-der-datei-nicht-immer-reicht/create_backup.webp)

Alle drei Statements können für sich korrekt sein. Tritt beim zweiten oder dritten Schritt ein Problem auf, kann der resultierende Datenbankzustand trotzdem von der ursprünglichen Planung abweichen.

Das Sicherheitsbackup schafft hier einen klaren Ausgangspunkt. Es ersetzt keine sauber entworfene Migration und keine Transaktion. Es bietet aber eine zusätzliche Rückfallebene, bevor SQLite Hub mehrere Strukturänderungen ausführt.

## Auch größere SQL-Importe lösen eine Warnung aus

SQL-Importe sind ein weiterer Bereich, in dem sich Fehler schnell vervielfachen können. Ein Dump kann Tabellen anlegen, bestehende Daten überschreiben oder große Mengen neuer Datensätze einfügen.

SQLite Hub schlägt deshalb ein Sicherheitsbackup vor, wenn ein Import mindestens eines dieser Kriterien erfüllt:

- Die SQL-Datei ist größer als 5 MB.
- Der Import enthält mehr als 1.000 erkannte SQL-Statements.

Die Grenzwerte sind bewusst pragmatisch gewählt. Eine kleine Datei kann ebenfalls problematische Statements enthalten. Mit zunehmender Größe und Anzahl der Anweisungen wird es jedoch schwieriger, den gesamten Import vorab manuell zu überblicken.

Der Hinweis soll verhindern, dass ein großer Import beiläufig in die aktive Datenbank geschrieben wird, ohne den vorherigen Zustand zu sichern.

## Wiederherstellen mit Sicherheitsnetz

Ein Backup ist nur dann nützlich, wenn es sich wiederherstellen lässt. Im Backup Manager können verifizierte Sicherungen deshalb direkt ausgewählt und als aktuelle Datenbank wiederhergestellt werden.

Ein Restore ersetzt allerdings den momentanen Stand der aktiven Datei. Damit ist die Wiederherstellung selbst eine riskante Operation.

SQLite Hub schlägt deshalb vor einem Restore erneut ein Sicherheitsbackup vor. Dadurch entsteht auf Wunsch eine Kopie des aktuellen Zustands, bevor dieser durch eine ältere Version ersetzt wird.

Der Ablauf sieht damit folgendermaßen aus:

1. Ein vorhandenes und verifiziertes Backup wird ausgewählt.
2. SQLite Hub weist darauf hin, dass die aktive Datenbank ersetzt wird.
3. Optional wird eine Sicherung des aktuellen Zustands erstellt.
4. Das ausgewählte Backup wird wiederhergestellt.

Dieser zusätzliche Schritt mag zunächst redundant wirken. In der Praxis verhindert er jedoch eine unangenehme Situation: Ein Nutzer stellt einen älteren Stand wieder her und bemerkt erst danach, dass im aktuellen Stand noch Daten enthalten waren, die ebenfalls benötigt werden.

## Notizen statt anonymer Sicherungsdateien

Zu jedem Backup lassen sich in SQLite Hub Notizen hinterlegen und später bearbeiten.

Das wirkt im Vergleich zur technischen Backup API wie eine kleine Funktion. Für die tatsächliche Nutzung ist sie jedoch wichtig.

Ein Zeitstempel sagt nur, wann eine Sicherung entstanden ist. Er erklärt nicht, warum sie erstellt wurde.

Eine Notiz kann beispielsweise festhalten:

- "Vor dem Import der Kundendaten"
- "Stand vor der Migration auf Schema-Version 12"
- "Vor dem Entfernen der alten Tracking-Tabellen"
- "Funktionierender Stand vor dem Performance-Test"

Damit wird aus einer anonymen Datei ein nachvollziehbarer Arbeitspunkt. Gerade bei Datenbanken, an denen über mehrere Tage oder Wochen gearbeitet wird, ist dieser Kontext oft wertvoller als der reine Dateiname.

## Backups bleiben lokal

SQLite Hub ist als Local-first-Werkzeug gebaut. Datenbanken werden nicht für die Bearbeitung auf einen externen Dienst hochgeladen. Das gilt auch für die verwalteten Backups.

Die Sicherungsdateien bleiben auf dem lokalen Rechner und werden im Anwendungsverzeichnis von SQLite Hub organisiert. Nutzer können sie aus dem Backup Manager herunterladen und anschließend selbst archivieren oder auf einen anderen Datenträger übertragen.

Diese lokale Speicherung hat einen Vorteil: Der Backup Manager benötigt kein Konto, kein Abonnement und keinen Cloud-Speicher.

Sie hat aber auch eine klare Grenze. Befinden sich die Datenbank und alle Backups auf demselben Rechner, schützt das nicht vor einem Defekt oder Verlust dieses Geräts.

SQLite Hub ersetzt deshalb keine vollständige externe Backup-Strategie. Der Backup Manager schützt vor allem vor fehlerhaften Änderungen, misslungenen Importen und versehentlichen Eingriffen während der Arbeit.

Wichtige Daten sollten zusätzlich auf einem anderen Datenträger oder in einem getrennten, geschützten Speicher gesichert werden.

## Ein praktischer Ablauf im SQL Editor

Ein typischer Ablauf in SQLite Hub kann so aussehen:

Ich öffne eine lokale Datenbank und möchte eine nicht mehr benötigte Tabelle entfernen.

```sql
DROP TABLE legacy_events;
```

SQLite Hub erkennt das destruktive Statement und zeigt vor der Ausführung den Sicherheitsdialog an.

Ich entscheide mich für "Backup erstellen und fortfahren". SQLite Hub erstellt den Snapshot über die Backup API, berechnet den Hash und führt `PRAGMA quick_check` aus.

Erst danach wird das eigentliche Statement ausgeführt.

Falls ich später feststelle, dass die Tabelle doch noch benötigt wird, kann ich den Backup Manager öffnen, die passende Sicherung anhand des Zeitpunkts und der Notiz auswählen und sie wiederherstellen.

Der entscheidende Punkt ist nicht, dass ein Backup technisch möglich ist. Das wäre auch über das [Terminal](https://oliverjessner.at/category/terminal/) möglich. SQLite Hub verbindet die Sicherung direkt mit dem Arbeitsschritt, bei dem sie gebraucht wird.

Wie der Editor Abfragen, Ergebnisse, Verlauf und Ausführungsinformationen darstellt, zeige ich ausführlicher im Beitrag über den [SQLite SQL-Editor von SQLite Hub](/blog/2026-06-25-sqlite-abfragen-komfortabler-schreiben-was-ein-guter-sql-editor-koennen-muss/).

## Warum die Backup-Funktion zu SQLite Hub passt

SQLite Hub soll kein universeller Datenbank-Client für jede denkbare Datenbank sein. Das Werkzeug konzentriert sich bewusst auf lokale SQLite-Dateien und die typischen Aufgaben rund um diese Dateien.

Dazu gehören:

- Daten untersuchen
- einzelne Datensätze korrigieren
- SQL-Abfragen ausführen
- Tabellen und Schemas verändern
- Ergebnisse exportieren
- Änderungen nachvollziehbar absichern

Der Backup Manager passt deshalb nicht nur als zusätzliche Funktion in das Produkt. Er verbindet mehrere Bereiche miteinander.

Der SQL Editor erkennt riskante Statements. Der Import analysiert die Größe und Anzahl der Anweisungen. Der Restore berücksichtigt den aktuellen Datenbestand. Der Backup Manager prüft und verwaltet die entstandenen Sicherungen.

Aus meiner Sicht wird ein Datenbankwerkzeug dadurch nicht automatisch sicher. Es kann aber gute Entscheidungen leichter und riskante Entscheidungen sichtbarer machen.

Genau das war mein Ziel bei der Entwicklung dieser Funktion.

## SQLite Hub installieren

SQLite Hub ist kostenlos, Open Source und kann unter macOS und Linux über Homebrew installiert werden:

```bash
brew tap oliverjessner/tap
brew install sqlite-hub
```

Alternativ ist eine globale Installation über npm möglich:

```bash
npm install -g sqlite-hub
```

Nach dem Start lässt sich eine vorhandene SQLite-Datei öffnen. Der Backup Manager steht anschließend für die aktive Datenbank zur Verfügung.

Weitere Informationen zu SQLite Hub, den unterstützten Funktionen sowie der GUI, CLI und lokalen API gibt es auf der [Produktseite von SQLite Hub](https://oliverjessner.at/sqlite-hub/).

## Weitere SQLite-Hub-Guides

Weitere Anleitungen zu SQL-Editor, CLI, API, Backups, Dokumentation, Typgenerierung und Visualisierung findest du in der Übersicht [SQLite Hub: Guides, Funktionen und Updates](/category/sqlite-hub/).
