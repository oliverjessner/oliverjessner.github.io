---
layout: post
title: 'SQLite-Datenbank richtig sichern: Warum das Kopieren der Datei nicht immer reicht'
date: 2026-06-25 09:04:01 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - software-engineering
    - terminal
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

Aus diesen Fragen ist der Backup Manager entstanden.

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

![](/assets/images/side_projects/slqlite_hub/mockups/backups_1_1920.webp)

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

![](/assets/images/gen/blog/sqlite-datenbank-richtig-sichern-warum-das-kopieren-der-datei-nicht-immer-reicht/create_backup)

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

````markdown
---
layout: post
title: 'SQLite Backup mit SQLite Hub: Datenbanken zuverlässig sichern'
date: 2026-06-25 11:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - software-engineering
    - terminal
description: 'SQLite Hub erstellt verifizierte Backups, warnt vor riskanten SQL-Änderungen und stellt lokale SQLite-Datenbanken kontrolliert wieder her'
thumbnail: '/assets/images/gen/blog/sqlite-backup-mit-sqlite-hub-datenbanken-zuverlaessig-sichern/header_thumbnail.webp'
image: '/assets/images/gen/blog/sqlite-backup-mit-sqlite-hub-datenbanken-zuverlaessig-sichern/header.webp'
faq:
    - question: 'Wie erstellt SQLite Hub ein SQLite Backup?'
      answer: 'SQLite Hub nutzt die Backup API von SQLite, berechnet eine SHA-256-Prüfsumme und kontrolliert die Sicherung anschließend mit PRAGMA quick_check.'
    - question: 'Wann schlägt SQLite Hub ein Sicherheitsbackup vor?'
      answer: 'SQLite Hub warnt vor riskanten SQL-Befehlen, Migrationen, großen SQL-Importen und dem Wiederherstellen eines älteren Datenbankstands.'
    - question: 'Kann SQLite Hub ein Backup wiederherstellen?'
      answer: 'Ja. Verifizierte Backups lassen sich direkt im Backup Manager wiederherstellen. Vor dem Restore kann SQLite Hub zusätzlich den aktuellen Stand sichern.'
socialmedia:
    - 'SQLite Hub kann lokale SQLite-Datenbanken nicht nur sichern. Jedes Backup wird über die SQLite Backup API erstellt, mit SHA-256 versehen und per PRAGMA quick_check geprüft.'
    - 'Vor DROP TABLE, Migrationen oder großen SQL-Importen erinnert SQLite Hub an ein Sicherheitsbackup. Die Entscheidung bleibt beim Nutzer, der letzte funktionierende Stand aber erreichbar.'
    - 'Ich habe den Backup Manager von SQLite Hub direkt mit SQL Editor, Import und Restore verbunden. So entsteht das Backup dort, wo ein Fehler tatsächlich passieren kann.'
---

SQLite Hub sichert lokale SQLite-Datenbanken über die Backup API, prüft jeden Snapshot und warnt vor riskanten Änderungen. So bleibt der letzte funktionierende Stand erreichbar.

## SQLite Backup direkt im Arbeitsablauf

[SQLite Hub](https://oliverjessner.at/sqlite-hub/) ist als lokale Arbeitsoberfläche für SQLite-Datenbanken entstanden. Mit dem Werkzeug lassen sich Tabellen untersuchen, Datensätze bearbeiten, SQL-Abfragen ausführen, Schemas verändern und Ergebnisse exportieren.

Sobald ein Datenbankwerkzeug Schreibzugriffe erlaubt, reicht ein guter SQL Editor allein jedoch nicht mehr aus. Eine fehlerhafte Abfrage kann Datensätze verändern. Ein Import kann Tausende Statements ausführen. Eine Migration kann ein Schema nur teilweise umbauen. Ein Restore kann einen neueren Datenbestand durch einen älteren ersetzen.

Deshalb habe ich SQLite Hub um einen Backup Manager erweitert. Er soll Sicherungen nicht nur erzeugen, sondern direkt mit den Arbeitsschritten verbinden, bei denen sie gebraucht werden.

Mein Ziel war kein zusätzlicher "Backup erstellen"-Button. SQLite Hub sollte drei konkrete Fragen beantworten:

1. Wird das SQLite Backup auf einem konsistenten Weg erstellt?
2. Ist die Sicherungsdatei technisch lesbar und unverändert?
3. Wird vor schwer rückgängig zu machenden Änderungen rechtzeitig gewarnt?

Aus diesen Anforderungen ist die Backup-Funktion von SQLite Hub entstanden.

## Warum das Kopieren einer SQLite-Datei nicht immer reicht

SQLite speichert eine Datenbank meistens in einer einzelnen Datei. Dadurch wirkt ein Backup zunächst unkompliziert:

```bash
cp application.db application-backup.db
```

Wenn die Datenbank vollständig geschlossen ist und kein Prozess mehr darauf zugreift, kann eine solche Kopie ausreichen.

Bei einer geöffneten Datenbank ist die Situation schwieriger. SQLite kann während des Kopiervorgangs weitere Änderungen schreiben. Im WAL-Modus können bestätigte Transaktionen außerdem noch in einer zusätzlichen `-wal`-Datei liegen.

Die sichtbare Datenbankdatei muss deshalb nicht in jedem Moment den vollständigen aktuellen Zustand enthalten.

Für SQLite Hub war das eine wichtige technische Grenze. Ein Datenbank-Manager sollte nicht darauf vertrauen, dass sich die Datei beim Kopieren zufällig in einem geeigneten Zustand befindet.

SQLite Hub verwendet deshalb die offizielle [SQLite Backup API](https://www.sqlite.org/backup.html). SQLite selbst koordiniert den Snapshot und berücksichtigt den Zustand der geöffneten Datenbank.

Nutzer müssen dadurch nicht vor jedem Backup prüfen, ob der WAL-Modus aktiv ist, welche zusätzlichen Dateien vorhanden sind oder ob gerade ein Checkpoint stattfindet.

## SQLite Backup erstellen: So funktioniert es in SQLite Hub

Der Backup Manager befindet sich als eigener Bereich in SQLite Hub. Dort lassen sich Sicherungen der aktuell geöffneten Datenbank erstellen, prüfen, beschriften, herunterladen und wiederherstellen.

Jedes Backup besteht aus der eigentlichen SQLite-Datei und zusätzlichen Metadaten.

| Funktion                   | Zweck                                      |
| -------------------------- | ------------------------------------------ |
| SQLite Backup API          | Erstellt einen konsistenten Snapshot       |
| SHA-256-Prüfsumme          | Erkennt spätere Veränderungen der Datei    |
| `PRAGMA quick_check`       | Prüft grundlegende Datenbankstrukturen     |
| Zeitstempel und Dateigröße | Erleichtern die Einordnung                 |
| Notizen                    | Dokumentieren den Zweck des Backups        |
| Verifizierungsstatus       | Zeigt das Ergebnis der technischen Prüfung |

Die Sicherungen werden nach Datenbankverbindung getrennt im lokalen Anwendungsverzeichnis von SQLite Hub gespeichert. Eine `manifest.json` enthält die zugehörigen Metadaten.

Das ist für mich ein wichtiger Unterschied zu einem Ordner mit Dateien wie:

```text
backup.db
backup-neu.db
backup-final.db
backup-final-2.db
```

Solche Kopien können technisch funktionieren. Nach einigen Wochen ist aber oft nicht mehr erkennbar, warum sie angelegt wurden und welcher Datenbankstand darin enthalten ist.

Der Backup Manager soll deshalb nicht nur Dateien sammeln. Er soll den Kontext einer Sicherung erhalten.

## Drei Prüfungen für jedes SQLite Backup

SQLite Hub markiert ein Backup nicht unmittelbar nach dem Kopiervorgang als verifiziert. Die Sicherung durchläuft mehrere getrennte Schritte.

### 1. Konsistenten Snapshot erstellen

Zuerst erzeugt SQLite über seine Backup API eine neue Datenbankdatei.

Die Daten werden nicht ohne Datenbankkontext aus dem Dateisystem kopiert. SQLite kennt die Transaktionsgrenzen und koordiniert den Snapshot selbst.

### 2. SHA-256-Prüfsumme berechnen

Nach der Erstellung berechnet SQLite Hub eine SHA-256-Prüfsumme.

Sie dient als Fingerabdruck der Datei. Wird das Backup später verändert oder beschädigt, stimmt die neu berechnete Prüfsumme nicht mehr mit dem gespeicherten Wert überein.

Eine Prüfsumme allein bestätigt allerdings nicht, dass die Datenbank inhaltlich oder strukturell korrekt ist. Auch für eine bereits beschädigte Datei lässt sich ein gültiger Hash erzeugen.

### 3. Datenbankstruktur kontrollieren

Deshalb führt SQLite Hub zusätzlich folgenden SQLite-Befehl aus:

```sql
PRAGMA quick_check;
```

SQLite prüft damit zentrale Strukturen der Sicherungsdatei. Nur wenn die Prüfung erfolgreich abgeschlossen wird, erhält das Backup den Status "Verified".

Die drei Schritte erfüllen unterschiedliche Aufgaben:

1. Die Backup API erstellt den Snapshot.
2. SHA-256 erkennt spätere Dateiänderungen.
3. `PRAGMA quick_check` kontrolliert die grundlegende Struktur.

Ein verifiziertes Backup garantiert trotzdem nicht, dass fachlich alle erwarteten Daten enthalten sind. Wurde vor der Sicherung bereits ein Datensatz gelöscht, kann das Backup nur diesen Zustand abbilden.

SQLite Hub prüft die technische Integrität. Die fachliche Bewertung bleibt beim Nutzer.

## Sicherheitsbackup vor riskanten SQL-Befehlen

Ein Backup Manager ist nur begrenzt hilfreich, wenn Nutzer selbst daran denken müssen, ihn vor jeder kritischen Änderung zu öffnen.

SQLite Hub analysiert deshalb bestimmte Aktionen und schlägt direkt vor der Ausführung ein Sicherheitsbackup vor.

Das betrifft beispielsweise folgende SQL-Befehle:

```sql
DROP TABLE users;
```

```sql
ALTER TABLE users ADD COLUMN status TEXT;
```

```sql
VACUUM;
```

Der SQL Editor erkennt unter anderem diese schemarelevanten Statements:

```text
DROP TABLE
ALTER TABLE
CREATE TABLE
CREATE INDEX
CREATE VIEW
CREATE TRIGGER
DROP INDEX
DROP VIEW
DROP TRIGGER
REINDEX
VACUUM
```

Nicht jeder dieser Befehle löscht Daten. Ein neuer Index ist normalerweise weniger riskant als `DROP TABLE`. Trotzdem verändern die Befehle das Schema oder den physischen Zustand der Datenbank.

SQLite Hub zeigt deshalb vor der Ausführung drei Möglichkeiten:

1. Backup erstellen und fortfahren
2. Ohne Backup fortfahren
3. Vorgang abbrechen

Das Werkzeug erzwingt keine Sicherung und blockiert keine legitime Abfrage. Es macht lediglich sichtbar, dass sich die folgende Änderung nur schwer oder gar nicht rückgängig machen lässt.

Gerade bei lokaler [Softwareentwicklung](https://oliverjessner.at/category/software-development/) entstehen viele Änderungen während des Experimentierens. Eine Tabelle wird umgebaut, ein Index getestet oder eine alte Struktur entfernt. Der Backup-Hinweis erscheint genau in diesem Moment.

## SQLite Migrationen mit Rückfallebene

Ein einzelnes SQL-Statement lässt sich oft noch gut überblicken. Bei mehreren zusammenhängenden Schemaänderungen steigt das Risiko, dass nur ein Teil der geplanten Migration erfolgreich ausgeführt wird.

Ein vereinfachtes Beispiel:

```sql
ALTER TABLE users
ADD COLUMN status TEXT DEFAULT 'active';

CREATE INDEX idx_users_status
ON users(status);

CREATE TABLE user_events (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  event_type TEXT NOT NULL,
  created_at TEXT NOT NULL
);
```

SQLite Hub erkennt mehrere schemarelevante Statements als Migration und schlägt vor der Ausführung ein passendes Backup vor.

Die Sicherung ersetzt keine Transaktion und keine sauber entwickelte Migrationslogik. Sie schafft aber einen nachvollziehbaren Ausgangspunkt, falls der resultierende Datenbankzustand nicht dem geplanten Ergebnis entspricht.

Aus Sicht des [Software Engineering](https://oliverjessner.at/category/software-engineering/) ist das eine zusätzliche Rückfallebene. Die Migration bleibt weiterhin verantwortlich für ihre eigene Konsistenz.

## Backup vor großen SQL-Importen

Auch SQL-Importe können eine Datenbank in kurzer Zeit stark verändern.

Ein Dump kann:

- neue Tabellen anlegen
- vorhandene Tabellen löschen
- bestehende Datensätze überschreiben
- große Mengen neuer Daten einfügen
- Trigger, Views und Indizes verändern

SQLite Hub schlägt ein Sicherheitsbackup vor, wenn ein Import mindestens eines dieser Kriterien erfüllt:

- Die SQL-Datei ist größer als 5 MB.
- Der Import enthält mehr als 1.000 erkannte SQL-Statements.

Diese Grenzwerte sind bewusst pragmatisch. Auch eine kleine SQL-Datei kann problematische Befehle enthalten. Bei großen Dateien und vielen Statements wird es jedoch schwieriger, sämtliche Auswirkungen vor der Ausführung manuell zu prüfen.

Das Backup hält den Datenbankstand unmittelbar vor dem Import fest.

## SQLite Backup wiederherstellen

Ein Backup ist nur dann praktisch nutzbar, wenn es sich kontrolliert wiederherstellen lässt.

Im Backup Manager können verifizierte Sicherungen direkt ausgewählt und als aktive Datenbank wiederhergestellt werden.

Ein Restore ist selbst eine riskante Operation. Der aktuelle Datenbestand wird durch einen älteren Stand ersetzt. Deshalb bietet SQLite Hub vor der Wiederherstellung an, zunächst ein weiteres Sicherheitsbackup der aktuellen Datenbank anzulegen.

Der Ablauf sieht so aus:

1. Ein verifiziertes Backup wird ausgewählt.
2. SQLite Hub weist auf das Ersetzen der aktuellen Datenbank hin.
3. Optional wird der aktuelle Stand gesichert.
4. Das ausgewählte SQLite Backup wird wiederhergestellt.

Dadurch bleibt auch der Zustand vor dem Restore erreichbar.

Das ist besonders hilfreich, wenn sich erst nach der Wiederherstellung zeigt, dass im neueren Datenbestand noch einzelne relevante Änderungen enthalten waren.

## Notizen machen Backups nachvollziehbar

Zeitstempel und Dateigröße helfen bei der technischen Einordnung. Sie erklären aber nicht, warum ein Backup erstellt wurde.

Deshalb können Sicherungen in SQLite Hub mit Notizen versehen werden.

Beispiele sind:

- "Vor dem Import der Kundendaten"
- "Vor Migration auf Schema-Version 12"
- "Vor dem Entfernen der Tracking-Tabellen"
- "Funktionierender Stand vor dem Performance-Test"

Damit wird ein Backup zu einem dokumentierten Arbeitspunkt.

Diese Funktion wirkt zunächst weniger wichtig als die Backup API oder die Integritätsprüfung. Im Alltag erleichtert sie jedoch die Entscheidung, welcher Stand tatsächlich wiederhergestellt werden soll.

## Local-first: Backups bleiben auf dem eigenen Rechner

SQLite Hub ist als Local-first-Werkzeug gebaut. Datenbanken werden für die Bearbeitung nicht auf einen externen Dienst hochgeladen.

Das gilt auch für die verwalteten SQLite Backups.

Die Sicherungen bleiben im lokalen Anwendungsverzeichnis und können über den Backup Manager heruntergeladen oder auf einen anderen Datenträger kopiert werden.

Dafür sind weder ein Benutzerkonto noch ein Cloud-Speicher oder ein Abonnement erforderlich.

Die lokale Speicherung hat allerdings eine Grenze: Liegen Datenbank und sämtliche Backups auf demselben Rechner, schützt das nicht vor einem Defekt, Verlust oder einer vollständigen Beschädigung des Geräts.

SQLite Hub ersetzt deshalb keine externe Backup-Strategie. Der Backup Manager schützt vor allem vor:

- fehlerhaften SQL-Abfragen
- misslungenen Migrationen
- problematischen Importen
- versehentlichen Schemaänderungen
- unerwünschten Wiederherstellungen

Wichtige Sicherungen sollten zusätzlich auf einem anderen Datenträger oder in einem getrennten, geschützten Speicher abgelegt werden.

## Ein praktisches Beispiel im SQL Editor

Angenommen, ich möchte eine nicht mehr benötigte Tabelle entfernen:

```sql
DROP TABLE legacy_events;
```

SQLite Hub erkennt das destruktive Statement und zeigt vor der Ausführung den Sicherheitsdialog an.

Ich wähle "Backup erstellen und fortfahren".

SQLite Hub:

1. erstellt den Snapshot über die Backup API
2. berechnet die SHA-256-Prüfsumme
3. führt `PRAGMA quick_check` aus
4. markiert das Backup bei erfolgreicher Prüfung als verifiziert
5. führt anschließend das SQL-Statement aus

Stelle ich später fest, dass die Tabelle doch noch benötigt wird, kann ich den Backup Manager öffnen und den vorherigen Stand wiederherstellen.

Ein ähnliches Backup ließe sich auch über das [Terminal](https://oliverjessner.at/category/terminal/) erstellen. Der Unterschied liegt in der Integration: SQLite Hub verbindet die Sicherung direkt mit dem Arbeitsschritt, der das Risiko auslöst.

## Warum Backups zum Kern von SQLite Hub gehören

SQLite Hub soll kein universeller Client für jede denkbare Datenbank sein. Das Werkzeug konzentriert sich auf lokale SQLite-Dateien und die typischen Aufgaben rund um diese Dateien.

Dazu gehören:

- Daten untersuchen und bearbeiten
- SQL-Abfragen ausführen
- Tabellen und Schemas verändern
- große Datenmengen importieren
- Ergebnisse exportieren
- Datenbankstände sichern und wiederherstellen

Der Backup Manager ist deshalb keine isolierte Zusatzfunktion.

Der SQL Editor erkennt riskante Statements. Der Import bewertet Größe und Umfang einer SQL-Datei. Der Restore berücksichtigt den aktuellen Datenbestand. Der Backup Manager erstellt, prüft und dokumentiert die Sicherungen.

Ein Datenbankwerkzeug wird dadurch nicht automatisch fehlerfrei. Es kann aber gute Entscheidungen erleichtern und riskante Änderungen sichtbar machen.

Genau das war mein Ziel bei der Entwicklung des Backup Managers.

## SQLite Hub installieren

SQLite Hub ist kostenlos, Open Source und kann unter macOS und Linux über Homebrew installiert werden:

```bash
brew tap oliverjessner/tap
brew install sqlite-hub
```

Alternativ ist die Installation über npm möglich:

```bash
npm install -g sqlite-hub
```

Nach dem Start lässt sich eine vorhandene SQLite-Datei öffnen. Der Backup Manager steht anschließend für die aktive Datenbank zur Verfügung.

Weitere Informationen zur Benutzeroberfläche, zum SQL Editor, zur CLI und zur lokalen API gibt es auf der [Produktseite von SQLite Hub](https://oliverjessner.at/sqlite-hub/).
````
