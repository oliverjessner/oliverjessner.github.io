---
layout: post
title: 'Vibecoding – fünf einfache Regeln für mehr Sicherheit'
date: 2026-05-13 10:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - vibecoding
    - software-development
    - Privacy
description: 'Vibe-Coding macht Prototypen schnell, aber nicht automatisch sicher. Fünf praktische Regeln für weniger Risiko beim Bauen mit KI'
thumbnail: '/assets/images/gen/blog/vibecoding-fuenf-einfache-regeln-fuer-mehr-sicherheit/header_thumbnail.webp'
image: '/assets/images/gen/blog/vibecoding-fuenf-einfache-regeln-fuer-mehr-sicherheit/header.webp'
faq:
    - question: 'Was bedeutet Vibe-Coding?'
      answer: 'Vibe-Coding beschreibt eine Arbeitsweise, bei der Nutzer ihre Software-Idee in natürlicher Sprache formulieren und KI-Systeme daraus Code, Datenmodelle oder Deployments erzeugen.'
    - question: 'Warum ist Vibe-Coding ein Sicherheitsrisiko?'
      answer: 'Das Risiko liegt weniger im KI-Werkzeug selbst, sondern darin, dass funktionierende Oberflächen schnell mit produktionsreifer Software verwechselt werden.'
    - question: 'Welche Regel ist beim Vibe-Coding am wichtigsten?'
      answer: 'Eine App sollte nie als sicher gelten, nur weil sie im Browser funktioniert. Zugriffsschutz, Secrets, Datenmodell und Deployment müssen separat geprüft werden.'
---

Vibe-Coding macht Softwareentwicklung zugänglicher. Genau deshalb lohnt sich ein ruhiger Blick auf Sicherheit. Fünf einfache Regeln helfen, typische Fehler früher zu erkennen.

## Warum ich über Vibecoding und Sicherheit schreibe

Ich habe gemeinsam mit [Christopher Helm](https://christopher-helm.com/) an einem Golem-Artikel zum Thema Vibe-Coding gearbeitet. Dabei ging es nicht um die Frage, ob KI beim Programmieren hilfreich ist. Das ist sie längst. Interessanter ist eine andere Frage: Was passiert, wenn Menschen sehr schnell Anwendungen bauen, aber die sicherheitsrelevanten Entscheidungen im Hintergrund nicht mehr wirklich nachvollziehen?

Genau hier liegt für mich der spannendste Punkt. [Vibecoding](https://oliverjessner.at/category/vibecoding/) senkt die Einstiegshürde. Eine Idee wird beschrieben, ein KI-System erzeugt daraus Code, Datenmodelle, Login-Flows oder Deployment-Anweisungen. Nach kurzer Zeit gibt es eine Oberfläche, die nach fertiger Software aussieht.

Das ist praktisch. Es kann produktiv sein. Aber es verändert auch, wie wir über Verantwortung im Bereich des [software development](https://oliverjessner.at/category/software-development/)s nachdenken müssen.

Denn eine App kann funktionieren und trotzdem unsicher sein.

## Regel 1: `.gitignore` sauber konfigurieren

Der erste Sicherheitsfehler passiert oft, bevor die App überhaupt online ist: sensible Dateien landen im Git-Repository. Dazu gehören API-Keys, Tokens, Datenbankzugänge, Session-Secrets oder lokale Konfigurationsdateien.
Lege im Projekt eine `.gitignore` an oder prüfe die bestehende Datei:

```bash
touch .gitignore
```

Typische Einträge für Webprojekte:

```gitignore
.env
.env.local
.env.production
.env.development

node_modules/
dist/
build/

.DS_Store

*.log

config/secrets.*
```

Danach prüfen, was Git aktuell tracken würde:

```bash
git status
```

Wenn eine sensible Datei bereits versehentlich getrackt wurde, reicht `.gitignore` allein nicht. Dann musst du sie aus dem Git-Tracking entfernen:

```bash
git rm --cached .env
git commit -m "Remove env file from repository"
```

**Wichtig**: Wenn ein Token bereits gepusht wurde, sollte er ersetzt werden. Ein gelöschter Commit bedeutet nicht automatisch, dass der Secret wirklich sicher verschwunden ist.

## Regel 2: Umgebungsvariablen statt harte Zugangsdaten verwenden

KI-generierter Code enthält manchmal Platzhalter direkt im Code. Aus Platzhaltern werden später schnell echte Zugangsdaten. Genau das sollte vermieden werden.

**Nicht so:**

```js
const apiKey = 'sk_live_123456';
```

**Besser so:**

```js
const apiKey = process.env.API_KEY;
```

In der lokalen `.env` steht dann:

```env
API_KEY=dein-api-key
DATABASE_URL=deine-datenbank-url
```

Beim Deployment werden diese Werte nicht ins Repository gelegt, sondern im Hosting-Dashboard gesetzt, etwa bei Render, Netlify, Vercel oder Railway.

Der praktische Check lautet: Im Code dürfen keine echten Tokens, Passwörter oder privaten URLs stehen.

## Regel 3: Zugriffsschutz nicht nur im Frontend bauen

Ein ausgeblendeter Button ist keine Sicherheitsmaßnahme. Das Frontend entscheidet nur, was Nutzer sehen. Es darf aber nicht allein entscheiden, was Nutzer dürfen.

**So testest du es:**

Wenn deine App URLs oder IDs verwendet, ändere sie manuell:

```txt
/app/projects/123
/app/projects/124
```

Dann prüfe:

Kannst du fremde Daten sehen?  
Kannst du fremde Daten bearbeiten?  
Bekommst du API-Antworten, obwohl du nicht berechtigt bist?

Der Schutz muss im Backend, in der API oder direkt in der Datenbank passieren. Bei Supabase heißt das zum Beispiel: Row Level Security aktivieren und Policies definieren.

Ein einfacher Grundsatz:

```txt
Jede Datenabfrage muss prüfen, ob der aktuelle Nutzer diese Daten wirklich sehen darf.
```

## Regel 4: Datenmodell vor dem Bauen kurz durchdenken

Vibe-Coding verleitet dazu, sofort Oberflächen zu bauen. Bei Apps mit Nutzerdaten sollte aber zuerst klar sein, wem ein Datensatz gehört.

**Kurzer Vorab-Check:**

Für jede wichtige Tabelle oder Collection sollte klar sein:

```txt
Wer erstellt diesen Datensatz?
Wer darf ihn lesen?
Wer darf ihn ändern?
Wer darf ihn löschen?
Gehört er zu einem Nutzer, einem Team oder einer Organisation?
```

Beispiel:

```txt
tasks
- id
- title
- user_id
- created_at
```

Bei einer einfachen Todo-App reicht `user_id` oft. Bei Team-Apps braucht es eher zusätzliche Tabellen wie `organizations`, `memberships` und `roles`.

Wenn diese Zuordnung fehlt, wird Zugriffsschutz später unsauber.

## Regel 5: Vor dem Deployment einen kleinen Sicherheitstest machen

Bevor eine Vibe-Coding-App öffentlich online geht, sollte sie nicht nur normal benutzt werden. Sie sollte bewusst falsch benutzt werden.

**Mini-Test vor Veröffentlichung:**

Prüfe mindestens:

```txt
Kann ich ohne Login Daten abrufen?
Kann ich fremde IDs ausprobieren?
Kann ich Admin-Routen öffnen?
Werden Fehlermeldungen mit internen Details angezeigt?
Stehen Tokens oder Passwörter im Browser?
Werden sensible Daten in Logs gespeichert?
Sind Testdaten klar von echten Daten getrennt?
```

Auch die Browser-Devtools helfen:

```txt
Rechtsklick -> Untersuchen -> Network
```

Dort sieht man, welche API-Anfragen wirklich gesendet werden und welche Daten zurückkommen.
Der wichtigste Blick ist dabei nicht: "Sieht die App fertig aus?"

Sondern:

```txt
Welche Daten verlassen gerade den Server und warum?
```

## Mein Fazit

Vibe-Coding ist kein Spielzeug und auch keine automatische Gefahr. Es ist eine neue Abkürzung im Entwicklungsprozess. Abkürzungen sind nützlich, solange man weiß, welche Kontrollpunkte man dadurch überspringt.

Wer mit KI Anwendungen baut, muss nicht alles selbst schreiben. Aber man sollte verstehen, wo Daten liegen, wer darauf zugreifen darf und welche Annahmen die generierte App trifft.

Für mich ist das die wichtigste Lehre aus der Arbeit an diesem Thema: Die Oberfläche ist nur der sichtbare Teil der Anwendung. Sicherheit entsteht in den Regeln darunter.
