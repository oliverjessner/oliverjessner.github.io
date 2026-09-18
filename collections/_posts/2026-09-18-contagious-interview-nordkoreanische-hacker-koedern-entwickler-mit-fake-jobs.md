---
layout: post
title: 'Contagious Interview: Nordkoreanische Hacker ködern Entwickler mit Fake-Jobs'
date: 2026-09-18 12:49:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - software-development
    - software-engineering
    - git
    - Privacy
    - terminal
description: 'Nordkoreanische Hacker nutzen Fake-Jobs und Coding-Tests gegen Entwickler. So funktioniert Contagious Interview und so schützt du deinen Rechner'
thumbnail: '/assets/images/gen/blog/contagious-interview-nordkoreanische-hacker-koedern-entwickler-mit-fake-jobs/header_thumbnail.webp'
image: '/assets/images/gen/blog/contagious-interview-nordkoreanische-hacker-koedern-entwickler-mit-fake-jobs/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Was ist Contagious Interview?'
      answer: 'Contagious Interview ist eine Nordkorea zugeschriebene Cyberkampagne, bei der Angreifer Entwickler mit gefälschten Stellenangeboten und manipulierten Coding-Aufgaben dazu bringen, Schadsoftware auszuführen.'
    - question: 'Wie erkenne ich ein gefälschtes Jobangebot für Entwickler?'
      answer: 'Warnzeichen sind unter anderem ungewöhnliche Kommunikationswege, schwer überprüfbare Unternehmen, Zeitdruck und Coding-Aufgaben, die unbekannten Code oder Abhängigkeiten auf dem eigenen Rechner ausführen sollen.'
    - question: 'Wie kann ich Coding-Challenges bei Bewerbungen sicher ausführen?'
      answer: 'Unbekannten Code sollte man nicht auf dem normalen Arbeitsrechner starten. Sinnvoll sind eine isolierte virtuelle Maschine oder ein Container ohne persönliche Zugangsdaten, Wallets, SSH-Schlüssel oder produktive Entwicklungszugänge.'
socialmedia:
    - 'Ein Jobangebot, ein Coding-Test und plötzlich läuft Schadsoftware auf dem Entwickler-PC: Hinter "Contagious Interview" steckt eine Nordkorea zugeschriebene Kampagne, die gezielt IT-Fachleute auf Jobsuche angreift.'
    - 'Nordkoreanische Angreifer ködern Entwickler mit Fake-Jobs und manipulierten Coding-Challenges. Warum gerade Entwickler attraktive Ziele sind und wie sich unbekannter Interview-Code sicher testen lässt.'
    - 'Coding-Challenge im Bewerbungsgespräch? Unbekannten Code besser nicht direkt auf dem eigenen Entwickler-Rechner starten. Die Kampagne "Contagious Interview" zeigt ziemlich deutlich, warum.'
news: true
---

Ein vermeintliches Jobangebot, ein technisches Interview und eine Coding-Aufgabe reichen aus: Bei "Contagious Interview" versuchen nordkoreanische Angreifer, Entwickler dazu zu bringen, Schadsoftware selbst auf ihrem Rechner auszuführen.

## Was ist Contagious Interview?

Deutsche und internationale Sicherheitsbehörden warnen vor einer Cyberkampagne, die gezielt Softwareentwickler und andere IT-Fachleute anspricht. Die Gruppe wird unter anderem als "WaterPlum", "Contagious Interview" oder "Deceptive Development" bezeichnet und Nordkorea zugerechnet. <!-- -->

Das Besondere an der Methode ist weniger eine neuartige technische Schwachstelle als der Weg auf den Rechner des Opfers. Die Angreifer versuchen nicht zuerst, eine Sicherheitslücke auszunutzen. Stattdessen bringen sie Entwickler dazu, vermeintlich legitimen Code selbst auszuführen.

Für Menschen aus der [Softwareentwicklung](https://oliverjessner.at/category/software-development/) ist das ein ziemlich plausibles Szenario. Repositories klonen, Abhängigkeiten installieren und fremde Projekte lokal starten gehören schließlich zum Alltag.

Genau diese Routine wird hier ausgenutzt.

## Fake-Jobs sollen Entwickler zum Ausführen von Malware bringen

Die Kontaktaufnahme kann über soziale Netzwerke, Jobplattformen, Freelancer-Portale oder Messenger erfolgen. Die Angreifer präsentieren sich beispielsweise als Recruiter oder Mitarbeiter von Unternehmen aus der KI-, Software- oder Kryptobranche.

Darauf folgt ein vermeintlich normaler Bewerbungsprozess. Irgendwann bekommt der Kandidat eine technische Aufgabe. Dafür soll er beispielsweise ein Projekt herunterladen, ein Repository auschecken oder eine Anwendung lokal starten. <!-- -->

Genau hier beginnt der eigentliche Angriff.

Das Projekt enthält manipulierten Code oder lädt beim Ausführen weitere Komponenten nach. Sicherheitsforscher haben im Zusammenhang mit Contagious Interview unter anderem Infostealer, Backdoors und Remote-Access-Trojaner beobachtet.

Das Ziel kann darin bestehen, Zugangsdaten, Dateien, Browserdaten oder Kryptowährungen zu stehlen. Ein kompromittierter Entwicklungsrechner kann außerdem Zugang zu weiteren Systemen bieten.

## Warum Entwickler besonders interessante Ziele sind

Auf einem typischen Rechner eines Entwicklers befinden sich deutlich mehr interessante Zugangsdaten als auf einem durchschnittlichen Privat-PC.

Dazu können gehören:

- SSH-Schlüssel
- GitHub- oder GitLab-Zugänge
- Cloud-Credentials
- API-Schlüssel
- npm-, PyPI- oder andere Registry-Tokens
- gespeicherte Browser-Passwörter
- Kryptowährungs-Wallets
- interne Repositories
- VPN-Zugänge
- Entwicklungs- und Produktionssysteme

Damit wird aus einem kompromittierten Laptop im schlimmsten Fall ein Ausgangspunkt für weitere Angriffe.

Sicherheitsforscher von Elastic analysierten 2026 beispielsweise eine Variante von Contagious Interview, bei der Schadcode innerhalb von SVG-Dateien eines vermeintlichen Coding-Projekts versteckt wurde. Nach dem Start des Projekts wurden mehrere Schadkomponenten ausgeführt, darunter Funktionen zum Auslesen von Browser-Zugangsdaten, Wallets, Dateien und Zwischenablage. <!-- -->

Der Angriff zeigt ein grundsätzliches Problem: Bei einer Coding-Challenge erwartet man ausdrücklich, Code eines fremden Unternehmens auf dem eigenen System auszuführen.

## GitHub macht ein Projekt nicht automatisch vertrauenswürdig

Ein Repository auf GitHub kann professionell aussehen und trotzdem schädlichen Code enthalten.

README, Commit-Historie, Verzeichnisstruktur und Benutzeroberfläche erzeugen schnell den Eindruck eines normalen Entwicklungsprojekts. Für die Sicherheit des Codes sagt das allein wenig aus.

Gerade bei JavaScript- und Node.js-Projekten können bereits Installationsskripte oder Abhängigkeiten Code ausführen. Auch ein scheinbar harmloses `npm install` sollte bei einem unbekannten Repository deshalb nicht automatisch als risikofrei betrachtet werden.

Ähnliches gilt für andere Ökosysteme und Package Manager.

Wer regelmäßig mit [Git](https://oliverjessner.at/category/git/) arbeitet, sollte deshalb zwischen "Repository herunterladen" und "Repository ausführen" unterscheiden. Der Quellcode kann zunächst statisch untersucht werden, ohne die Anwendung direkt zu starten.

## So würde ich eine unbekannte Coding-Challenge behandeln

Eine technische Bewerbungsaufgabe würde ich grundsätzlich wie unbekannten Code aus dem Internet behandeln.

Nicht deshalb, weil Coding-Challenges generell verdächtig sind. Sondern weil auf meinem normalen Entwicklungsrechner zu viele Zugangsdaten liegen, um einem fremden Repository automatisch zu vertrauen.

### 1. Unternehmen und Recruiter überprüfen

Bevor ich überhaupt Code ausführe, würde ich prüfen, ob das Unternehmen tatsächlich existiert und ob die betreffende Stelle über offizielle Kanäle auffindbar ist.

Auch das Profil des Recruiters sollte plausibel sein.

Ein professionell aussehendes LinkedIn-Profil allein reicht dafür nicht.

### 2. Repository zunächst nur ansehen

Nach dem Klonen würde ich nicht sofort Installationsbefehle ausführen.

Interessant sind beispielsweise:

```bash
package.json
requirements.txt
pyproject.toml
Dockerfile
Makefile
install.sh
setup.py
```

Bei Node.js-Projekten lohnt sich insbesondere ein Blick auf Skripte wie:

```json
{
    "scripts": {
        "preinstall": "...",
        "install": "...",
        "postinstall": "...",
        "prepare": "..."
    }
}
```

Solche Hooks können automatisch ausgeführt werden.

Auch ungewöhnliche externe Downloads, stark verschleierter Code, Base64-Blöcke oder Verbindungen zu unbekannten Servern verdienen Aufmerksamkeit.

## 3. Unbekannten Code isolieren

Wenn ich das Projekt wirklich ausführen muss, würde ich dafür nicht meine normale Entwicklungsumgebung verwenden.

Eine temporäre virtuelle Maschine ist für solche Aufgaben oft die sauberste Variante.

Sie sollte möglichst keine persönlichen Daten enthalten und keinen Zugriff auf produktive Systeme haben.

Insbesondere gehören dort keine:

```text
SSH-Schlüssel
Cloud-Credentials
Browser-Profile
Krypto-Wallets
Produktionszugänge
API-Schlüssel
GitHub-Tokens
```

hinein.

Container können ebenfalls helfen, sind aber nicht automatisch eine vollständige Sicherheitsgrenze. Für wirklich unbekannten Code bevorzuge ich eine isolierte VM.

## 4. Zugangsdaten aus der Umgebung entfernen

Viele Entwickler haben Secrets bequem in ihrer Shell oder lokalen Konfiguration hinterlegt.

Ein einfacher Blick ins [Terminal](https://oliverjessner.at/category/terminal/) zeigt häufig bereits zahlreiche Umgebungsvariablen:

```bash
env
```

Genau solche Informationen sollte eine Umgebung für fremden Code möglichst nicht besitzen.

Auch Dateien wie `.env`, `.npmrc`, `.pypirc`, Cloud-Konfigurationen und SSH-Verzeichnisse können sensible Daten enthalten.

## 5. Bei merkwürdigen Anforderungen abbrechen

Nicht jede ungewöhnliche Coding-Aufgabe ist ein Angriff. Bestimmte Kombinationen sollten aber zumindest Fragen auslösen.

Dazu gehören etwa Aufforderungen, Sicherheitssoftware abzuschalten, unbekannte Binärdateien zu starten, zusätzliche Programme außerhalb des eigentlichen Projekts herunterzuladen oder Befehle ohne nachvollziehbare Erklärung auszuführen.

Ein seriöses technisches Interview sollte erklären können, warum bestimmte Komponenten benötigt werden.

## Contagious Interview ist kein völlig neues Problem

Angriffe über gefälschte Bewerbungsprozesse werden bereits seit mehreren Jahren beobachtet. Sicherheitsforscher dokumentierten ähnliche Kampagnen schon vor der aktuellen Warnung.

Neu sind eher einzelne Varianten und die kontinuierliche Weiterentwicklung der Angriffsketten.

Ossprey berichtete im Juli 2026 beispielsweise von fast 300 aktiven Payload-URLs, die der Contagious-Interview-Kampagne zugeordnet wurden. Socket dokumentiert außerdem zahlreiche schädliche Pakete und wechselnde Accounts innerhalb verschiedener Open-Source-Ökosysteme. <!-- -->

Das spricht dafür, nicht nach einer einzelnen Datei, Domain oder einem bestimmten GitHub-Account zu suchen.

Die Methode ist das eigentlich relevante Muster.

## Gleichzeitig gibt es die umgekehrte Variante

Nordkorea zugerechnete Aktivitäten rund um den internationalen IT-Arbeitsmarkt funktionieren auch in die andere Richtung.

Dabei bewirbt sich nicht ein Opfer bei einem falschen Unternehmen. Stattdessen versuchen nordkoreanische IT-Arbeiter selbst, unter falscher Identität Remote-Stellen bei ausländischen Unternehmen zu bekommen.

Teilweise kommen sogenannte Laptop-Farmen zum Einsatz. Rechner befinden sich dabei physisch in einem anderen Land und werden aus der Ferne genutzt, damit der tatsächliche Standort des Mitarbeiters schwerer zu erkennen ist. <!-- -->

Diese Kampagne ist technisch und organisatorisch nicht dasselbe wie ein manipulierter Coding-Test. Beide Ansätze zeigen aber, wie relevant normale Recruiting-Prozesse inzwischen für IT-Sicherheit geworden sind.

## Coding-Challenges brauchen eine eigene Sicherheitsroutine

Die wichtigste Konsequenz aus Contagious Interview ist für mich deshalb ziemlich unspektakulär:

Code aus einem Bewerbungsgespräch sollte nicht automatisch mehr Vertrauen bekommen als anderer unbekannter Code aus dem Internet.

Gerade Entwickler sind daran gewöhnt, schnell ein Repository zu klonen, ein paar Abhängigkeiten zu installieren und das Projekt zu starten.

Normalerweise spart das Zeit.

Bei einem unbekannten Arbeitgeber kann genau diese Routine aber zum Problem werden.

Eine separate VM für Coding-Challenges kostet ein paar Minuten zusätzliche Arbeit. Dafür muss ein fremdes Repository nicht auf einem Rechner laufen, auf dem gleichzeitig SSH-Schlüssel, Browser-Sessions, API-Tokens und Zugang zu produktiven Systemen liegen.

Das ist keine besondere Vorsichtsmaßnahme für nordkoreanische Hacker.

Es ist schlicht eine sinnvolle Sicherheitsgrenze für fremden Code.
