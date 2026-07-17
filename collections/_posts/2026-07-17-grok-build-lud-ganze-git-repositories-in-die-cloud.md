---
layout: post
title: 'Grok Build lud ganze Git-Repositories in die Cloud'
date: 2026-07-17 11:20:38 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - git
    - Privacy
description: 'Grok Build von xAI lud vollständige Git-Repositories samt Historie in die Cloud. Was geändert wurde und welche Schritte Entwickler prüfen sollten'
thumbnail: '/assets/images/gen/blog/grok-build-lud-ganze-git-repositories-in-die-cloud/header_thumbnail.webp'
image: '/assets/images/gen/blog/grok-build-lud-ganze-git-repositories-in-die-cloud/header.webp'
image_width: 1280
image_height: 854
faq:
    - question: 'Hat Grok Build den gesamten Quellcode hochgeladen?'
      answer: 'In reproduzierten Tests übertrug Grok Build 0.2.93 ein Git-Bundle mit allen getrackten Dateien und der vollständigen Git-Historie. Nicht getrackte Dateien waren nicht automatisch Teil dieses Bundles.'
    - question: 'Ist der Repository-Upload inzwischen gestoppt?'
      answer: 'Ja. Der Sicherheitsforscher Cereblab beobachtete eine serverseitige Einstellung, die den vollständigen Repository-Upload deaktivierte. Bei einem erneuten Test mit Grok Build 0.2.99 trat der Upload nicht mehr auf.'
    - question: 'Was sollten Nutzer von Grok Build jetzt tun?'
      answer: 'Nutzer sollten Grok Build aktualisieren, möglicherweise betroffene Zugangsdaten erneuern, ihre Git-Historie auf Secrets prüfen und die Datenfreigabe sowie Aufbewahrungseinstellungen kontrollieren.'
socialmedia:
    - 'Grok Build übertrug in Tests komplette Git-Repositories samt Historie in die Cloud. Der Upload ist gestoppt. Ich erkläre, was wirklich betroffen war und was Nutzer jetzt prüfen sollten.'
    - 'Nicht nur geöffnete Dateien: Grok Build packte getrackte Dateien und die Git-Historie als Bundle. Warum alte Secrets dadurch relevant werden und warum /privacy nicht der eigentliche Fix war.'
    - 'Der Grok-Build-Vorfall zeigt, warum KI-Coding-Tools wie externe Dienstleister behandelt werden sollten: minimale Zugriffe, keine produktiven Secrets und klare Datenflüsse.'
---

Grok Build übertrug in Tests vollständige Git-Repositories samt Historie in einen Cloud-Speicher. Der Upload ist inzwischen gestoppt, doch für Nutzer bleiben konkrete Prüfungen sinnvoll.

## Grok Build und der Repository-Upload

Grok Build ist ein terminalbasierter Coding-Agent von SpaceXAI. Das Werkzeug kann Quellcode analysieren, Dateien verändern, Befehle ausführen und Aufgaben innerhalb eines Projekts weitgehend selbstständig bearbeiten.

Wie bei anderen cloudbasierten [KI](https://oliverjessner.at/category/KI/)-Werkzeugen muss Grok Build bestimmte Inhalte an einen Server übertragen, damit ein Modell sie verarbeiten kann. Bei einer Untersuchung des Sicherheitsforschers Cereblab zeigte sich jedoch ein deutlich umfangreicherer Datenfluss.

Die untersuchte Version Grok Build 0.2.93 übertrug nicht nur Dateien, die der Agent für eine konkrete Aufgabe geöffnet hatte. Sie erstellte zusätzlich ein Git-Bundle des gesamten Repositorys und sendete dieses an einen Cloud-Speicher.

Der Forscher gab Grok Build dabei lediglich die Anweisung, mit "OK" zu antworten und keine Dateien zu öffnen. Trotzdem wurde ein vollständiges Repository-Bundle über den Endpunkt `/v1/storage` übertragen.

Die Antwort des Servers hatte den Statuscode 200. Der aufgezeichnete Inhalt begann mit der für Git-Bundles typischen Kennzeichnung `# v2 git bundle`. Das Bundle ließ sich anschließend klonen. Darin befand sich auch eine Testdatei, die Grok ausdrücklich nicht öffnen sollte.

Die Untersuchung und ein reproduzierbarer Testaufbau wurden von [Cereblab auf GitHub veröffentlicht](https://github.com/cereblab/grok-build-exfil-repro).

## Was genau übertragen wurde

Der problematische Upload bestand aus zwei voneinander zu unterscheidenden Datenwegen.

Wenn Grok Build eine Datei tatsächlich öffnete, wurde ihr Inhalt als Kontext an den Modellserver übertragen. In den Tests galt das auch für eine `.env`-Datei mit absichtlich eingefügten Testzugangsdaten. Die Inhalte erschienen ungekürzt in der Anfrage an den Modellendpunkt.

Daneben erstellte Grok Build unabhängig von den geöffneten Dateien ein Git-Bundle des Repositorys. Dieses Bundle enthielt alle von [Git](https://oliverjessner.at/category/git/) verwalteten Dateien sowie die vollständige Commit-Historie.

Der Upload wurde einem Google-Cloud-Storage-Bucket mit dem Namen `grok-code-session-traces` zugeordnet. Der Name war sowohl in der untersuchten Programmdatei als auch in Metadaten des Uploads enthalten.

Cereblab reproduzierte das Verhalten mit einem zweiten, unabhängigen Repository. Damit handelte es sich nach den veröffentlichten Tests nicht nur um einen einzelnen fehlerhaften Durchlauf.

## Warum die Git-Historie das Risiko vergrößert

Ein aktuelles Repository enthält häufig keine sichtbaren Zugangsdaten mehr. Das bedeutet jedoch nicht automatisch, dass diese Daten auch aus der Git-Historie verschwunden sind.

Wurde ein API-Schlüssel beispielsweise vor mehreren Monaten eingecheckt und später wieder aus der Datei entfernt, bleibt der frühere Inhalt normalerweise in den alten Commits erhalten. Ein vollständiges Git-Bundle kann diese alten Versionen weiterhin enthalten.

Das gilt unter anderem für:

- API-Schlüssel
- Datenbank-Zugangsdaten
- Cloud-Credentials
- interne Endpunkte
- Konfigurationsdateien
- private Zertifikate
- frühere Sicherheitslücken im Quellcode

Eine Datei zu löschen oder nachträglich in `.gitignore` einzutragen, entfernt sie nicht aus bereits vorhandenen Commits. Dafür muss die Git-Historie gezielt bereinigt werden. Anschließend müssen alle betroffenen Zugangsdaten trotzdem erneuert werden, da alte Klone und Backups weiterhin existieren können.

## Nicht jede lokale Datei war automatisch betroffen

Die Formulierung "gesamtes Repository" bedeutet nicht, dass automatisch jede Datei auf dem Computer hochgeladen wurde.

Das aufgezeichnete Git-Bundle enthielt die von Git getrackten Dateien und die dazugehörige Historie. Nicht getrackte oder korrekt ignorierte Dateien waren laut dem reproduzierbaren Test nicht automatisch Teil dieses Bundles.

Es gibt jedoch eine wichtige Einschränkung: Öffnete Grok Build eine nicht getrackte oder ignorierte Datei aktiv, konnte deren Inhalt weiterhin als Modellkontext übertragen werden.

Eine `.gitignore` schützt daher vor der Aufnahme in ein Git-Bundle, aber nicht zwangsläufig vor einer Übertragung, wenn ein Coding-Agent die Datei während seiner Arbeit liest.

Gerade bei `.env`-Dateien, lokalen Datenbanken, SSH-Schlüsseln oder Konfigurationsdateien sollte der Zugriff eines Coding-Agenten deshalb unabhängig von Git beschränkt werden.

## Der Upload ist gestoppt – aber nicht durch `/privacy`

Nach Veröffentlichung der Untersuchung änderte SpaceXAI eine serverseitige Einstellung. Der Grok-Client erhielt anschließend die Werte:

```text
trace_upload_enabled: false
disable_codebase_upload: true
```

Bei einem erneuten Test mit Grok Build 0.2.99 wurde das vollständige Repository nicht mehr übertragen.

Entscheidend ist dabei, dass der Upload offenbar durch die globale Einstellung `disable_codebase_upload` gestoppt wurde. Der in Grok Build verfügbare Befehl `/privacy` war nach den Tests nicht der eigentliche technische Schalter für den Repository-Upload.

Die [offizielle Dokumentation](https://docs.x.ai/build/modes-and-commands) beschreibt `/privacy` als Befehl zum Anzeigen oder Ändern des Datenschutz- und Aufbewahrungsstatus. Das betrifft vor allem die Frage, wie übertragene Daten gespeichert oder für bestimmte Zwecke verwendet werden dürfen.

Eine Aufbewahrungseinstellung ist jedoch nicht dasselbe wie eine lokale Netzwerksperre. Daten können zunächst an einen Server übertragen und dort anschließend verworfen werden. Wer verhindern möchte, dass Inhalte den eigenen Rechner verlassen, benötigt eine technische Kontrolle des Datenflusses und nicht nur eine Zusage zur Löschung.

## Was SpaceXAI zu dem Vorfall sagt

SpaceXAI erklärte, dass Einstellungen zur sogenannten Zero Data Retention respektiert würden. Nutzer ohne diese Einstellung könnten über `/privacy` ihre Aufbewahrungseinstellungen ändern und zuvor synchronisierte Daten löschen lassen.

Elon Musk kündigte zusätzlich an, dass alle vor der Änderung hochgeladenen Nutzerdaten vollständig gelöscht würden.

Ob diese Löschung vollständig erfolgt ist, lässt sich von außen nicht unabhängig überprüfen. Der öffentlich dokumentierte Test belegt die Übertragung und Speicherung der Daten. Er belegt nicht, dass SpaceXAI den Quellcode zum Training eines Modells verwendet hat.

Diese Unterscheidung ist wichtig. Ein problematischer oder unerwarteter Upload ist nicht automatisch ein Beweis für Modelltraining.

## Was Nutzer von Grok Build jetzt prüfen sollten

### Grok Build aktualisieren

Nutzer sollten zunächst prüfen, welche Version installiert ist.

```bash
grok --version
```

Über den integrierten Update-Befehl lässt sich die aktuelle Version installieren:

```bash
grok update
```

Der [offizielle Grok-Build-Changelog](https://x.ai/build/changelog) führte zum Zeitpunkt dieses Artikels Version 0.2.101 als aktuelle Veröffentlichung.

Da der vollständige Repository-Upload serverseitig deaktiviert wurde, hängt der Schutz nicht ausschließlich von einem Client-Update ab. Eine aktuelle Version reduziert dennoch das Risiko, bekannte Fehler oder veraltete Einstellungen weiterzuverwenden.

### Zugangsdaten erneuern

Wer Grok Build 0.2.93 oder eine möglicherweise betroffene frühere Version in einem sensiblen Repository verwendet hat, sollte prüfen, ob Zugangsdaten im aktuellen Projekt oder in früheren Commits enthalten waren.

Möglicherweise betroffene Zugangsdaten sollten vorsorglich erneuert werden. Dazu zählen insbesondere:

- API-Tokens
- Datenbank-Passwörter
- SSH-Schlüssel
- Cloud-Zugangsdaten
- OAuth-Secrets
- Signatur- und Deployment-Schlüssel

Das Entfernen eines Schlüssels aus dem Repository reicht nicht aus. Der Schlüssel muss beim jeweiligen Anbieter deaktiviert und durch einen neuen ersetzt werden.

### Git-Historie durchsuchen

Für bekannte Dateinamen kann die Historie direkt mit Git geprüft werden:

```bash
git log --all --full-history -- .env
```

Nach einem bekannten Wert oder einem eindeutigen Teil davon lässt sich ebenfalls suchen:

```bash
git log -S "EINDEUTIGER_TEIL_DES_ALTEN_KEYS" --all
```

Dabei sollte kein noch aktives Secret verwendet werden, da Befehle je nach Shell in der lokalen Historie gespeichert werden können.

Bei größeren Projekten sind spezialisierte Secret-Scanner sinnvoll. Wichtig ist, nicht nur den aktuellen Stand des Repositorys, sondern alle Branches, Tags und historischen Commits einzubeziehen.

### Zugriffsprotokolle kontrollieren

Bei Cloud-Diensten und Entwicklerplattformen sollte geprüft werden, ob es ungewöhnliche Anmeldungen oder Zugriffe gab. Viele Anbieter zeigen an, wann ein Token zuletzt verwendet wurde und von welcher IP-Adresse eine Anfrage kam.

Ein Upload bedeutet nicht automatisch, dass Zugangsdaten missbraucht wurden. Protokolle können jedoch dabei helfen, das tatsächliche Risiko besser einzugrenzen.

### Coding-Agenten nur in begrenzten Arbeitsbereichen starten

Ein Coding-Agent sollte nicht aus dem persönlichen Home-Verzeichnis oder aus einem übergeordneten Ordner mit mehreren Projekten gestartet werden.

Sinnvoller sind:

- separate Arbeitskopien
- bereinigte Test-Repositories
- temporäre Worktrees
- eingeschränkte Benutzerkonten
- Container oder virtuelle Entwicklungsumgebungen
- Projekte ohne produktive Zugangsdaten

Der Agent sollte nur auf die Dateien zugreifen können, die für die konkrete Aufgabe erforderlich sind.

## Was der Vorfall für KI-Coding-Tools bedeutet

Der Fall ist kein Argument dafür, grundsätzlich auf Coding-Agenten zu verzichten. Er zeigt jedoch, dass ihre Datenflüsse ähnlich sorgfältig geprüft werden müssen wie bei anderen externen Entwicklungsdiensten.

Ein KI-Coding-Agent kann Quellcode lesen, Dateien verändern, Programme ausführen und Netzwerkverbindungen aufbauen. Damit besitzt er in vielen Entwicklungsumgebungen weiterreichende Rechte als klassische Editoren oder Autovervollständigungen.

Aus Sicht der [Privacy](https://oliverjessner.at/category/Privacy/) und Informationssicherheit sollten solche Werkzeuge deshalb wie externe Dienstleister behandelt werden.

Entscheidend sind vier Fragen:

1. Welche Dateien kann das Werkzeug lesen?
2. Welche Daten verlassen den Computer?
3. Wie lange werden diese Daten gespeichert?
4. Welche Einstellungen verhindern die Übertragung tatsächlich?

Eine Schaltfläche mit der Bezeichnung "Nicht für Training verwenden" beantwortet nur einen Teil dieser Fragen. Sie sagt nicht automatisch aus, welche Inhalte übertragen, zwischengespeichert oder für Fehleranalysen aufbewahrt werden.

Für Unternehmen reicht es daher nicht, nur Nutzungsbedingungen zu lesen. Netzwerkverkehr, Berechtigungen, lokale Zwischenspeicher und Aufbewahrungseinstellungen sollten technisch überprüft werden.

## Fazit

Grok Build übertrug in den dokumentierten Tests nicht nur benötigte Dateien, sondern ein vollständiges Git-Bundle mit getrackten Dateien und der gesamten Commit-Historie.

Der Repository-Upload wurde inzwischen serverseitig deaktiviert. SpaceXAI versprach außerdem, zuvor hochgeladene Daten zu löschen. Unabhängig davon sollten frühere Nutzer prüfen, ob Secrets im Repository oder in seiner Historie enthalten waren.

Der wichtigste praktische Grundsatz bleibt einfach: Produktive Zugangsdaten gehören weder in den aktuellen Quellcode noch in die Git-Historie. Coding-Agenten sollten nur die Zugriffe erhalten, die sie für eine konkrete Aufgabe tatsächlich benötigen.
