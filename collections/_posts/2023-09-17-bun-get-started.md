---
layout: post
title: 'Ungewollter Artikel'
date: 2023-09-17 00:00:00
authors: ['oliver_jessner']
categories:
    - web-development
description: 'Irgendwann bekomme ich noch meinen Gastartikel veröffentlicht. Dieser hier wird es auf jeden fall nicht mehr.'
thumbnail: '/assets/images/gen/blog/bun_article/header_thumbnail.webp'
image: '/assets/images/gen/blog/bun_article/header.webp'
published: true
---

# Vorwort

Vor dem Bun hype habe ich bereits einen Artikel über Bun geschrieben und habe versucht diesen in verschiedenen Magazinen zu veröffentlichen. Leider hat es nicht geklappt, deshalb veröffentliche ich ihn hier. Viel Spaß beim Lesen! PS: Da ich ihn vor dem Bun hype geschrieben habe, ist er nicht mehr ganz aktuell 🌝.

## Bun 1.0 in den Startlöchern: Warum es jetzt der ideale Zeitpunkt ist, einen erneuten Blick auf Bun zu werfen

In den letzten Jahren ist das JavaScript-Ökosystem, insbesondere im Zusammenhang mit Node.js, zunehmend komplexer geworden, vor allem hinsichtlich der Werkzeuge. Angesichts dieser wachsenden Komplexität suchten zahlreiche Entwickler nach einer unkomplizierteren All-in-One-Lösung für den Bereich der serverseitigen JavaScript-Entwicklung. Die Antwort auf diese Bedürfnisse kommt nun in Form von Bun!

## Welche vorteile bietet Bun gegenüber Node.js?

Gleich vorweg: Mit Bun muss niemand eine dritte oder vierte transpilierte (transpiled) Sprache erlernen. Denn Bun bietet nativen "Drop-in Node.js-Support" sowie integrierte Unterstützung für TypeScript.
Das bedeutet, wenn wir also ein Backend in TypeScript schreiben, können wir dies alles mit Bun erledigen, ohne zusätzliche Tools installieren zu müssen. Gleiches gilt auch für JSX. Neben einem Watch-Mode, einer integrierten Unit Testing Suite und einer hochwertigen Standardbibliothek kann Bun mit einer Leistungsfähigkeit glänzen, die sowohl Node.js als auch Deno übertrifft.

## Wie bekomme ich Bun auf mein System?

Es genügt eine klassische Bash-Zeile, um Bun unter Linux und macOS (einschließlich Apple Silicon) zu installieren. Leider wird derzeit noch keine Windows-Version unterstützt. Natürlich stehen auch für diejenigen, die Homebrew oder Docker bevorzugen, entsprechende Möglichkeiten zur Verfügung.

```bash
curl -fsSL https://bun.sh/install | bash
```

```bash
brew tap oven-sh/bun
brew install bun
```

```bash
docker pull oven/bun
docker run --rm --init --ulimit memlock=-1:-1 oven/bun
```

Wenn wir uns nun zusätzlich für TypeScript entscheiden, müssen wir lediglich eine Zeile hinzufügen.

```bash
bun add -d bun-types
```

## Jetzt geht es ans Eingemachte – Wie legen wir los?

Mit nur einem simplen Befehlen generiert uns Bun ein Readme, eine Package.json, eine .gitignore-Datei und entscheidet anhand unserer Einstiegsdatei, ob wir JavaScript oder TypeScript verwenden. Im Fall von TypeScript wird auch eine tsconfig.json für uns erstellt.

```bash
bun init
```

Wie wir uns bereits denken können, unterstützt Bun package.json-Dateien und ermöglicht es uns so, Node.js-Projekte mühelos zu portieren. Der einzige Unterschied besteht darin, dass wir nun bun install anstelle von npm install verwenden. Wenn wir nun einen simplen Webserver schreiben möchten, können wir das in gewohnter Manier tun. Das globale Schlüsselwort 'bun' bietet eine äußerst einfache Funktion namens 'serve', die uns stark an Express oder Hapi erinnert.

```typescript
const server = Bun.serve({
    port: 3000,
    fetch(req) {
        return new Response('Bun!');
    },
});

console.log(`Wir sind on auf http://localhost:${server.port}...`);
```

Um das Ganze nun auszuführen, geben wir einfach 'bun' zusammen mit dem Dateinamen in unsere Bash ein und drücken Enter. Natürlich könnten wir auch npm-Skripte verwenden, wie wir es aus Node.js gewohnt sind.

```bash
bun index.ts
```

Das Aufsetzen eines Bun-Projekts gestaltet sich also äußerst einfach. Ein nativer Support für ES-Module ist selbstverständlich enthalten, und mit 'bun add' können wir problemlos alle benötigten npm-Module einbinden.

### Fazit

Die Frage, warum ich von Node.js zu Bun wechseln sollte, habe ich mir anfangs gestellt. Schnell wurde mir klar, dass der Boilerplate-Aufwand enorm reduziert wird. Gerade bei kleinen und mittelgroßen Projekten benötige ich praktisch nur noch Bun anstelle einer Vielzahl von unterschiedlichen Tools. Hinzu kommt die Geschwindigkeit: Besonders in Zeiten von Home Office und Workation steht nicht immer Highspeed-Internet zur Verfügung, und hier fiel mir besonders die reduzierte Installationszeit von Bun auf. Laut Bun selbst ist pnpm 17x langsamer, npm 29x langsamer und Yarn 33x langsamer als bun install. Gefühlt kann ich das definitiv bestätigen. Auch bei der Ausführung von Code sowie bei der Geschwindigkeit von Tests ist Bun schneller als die bekannten Tools. Zusammengefasst lässt sich sagen, dass Bun das ist, was Node für mich immer hätte sein sollen: eine schnelle und vielseitige Laufzeitumgebung für JavaScript/TypeScript.
