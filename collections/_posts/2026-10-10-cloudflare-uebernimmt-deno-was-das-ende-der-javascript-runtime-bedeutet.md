---
layout: post
title: 'Cloudflare übernimmt Deno: Was das Ende der JavaScript-Runtime bedeutet'
date: 2026-10-10 19:23:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - javascript
    - software-development
    - web-development
    - cloud
    - startups
description: 'Cloudflare übernimmt Deno. Die JavaScript-Runtime wird eingestellt, Deno Deploy abgeschaltet. Was Entwickler jetzt wissen müssen'
thumbnail: '/assets/images/gen/blog/cloudflare-uebernimmt-deno-was-das-ende-der-javascript-runtime-bedeutet/header_thumbnail.webp'
image: '/assets/images/gen/blog/cloudflare-uebernimmt-deno-was-das-ende-der-javascript-runtime-bedeutet/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Hat Cloudflare Deno übernommen?'
      answer: 'Ja. Am 9. Oktober 2026 haben Cloudflare und Deno bekannt gegeben, dass das gesamte Deno-Team zu Cloudflare wechselt. Die finanziellen Bedingungen wurden nicht veröffentlicht.'
    - question: 'Wird die JavaScript-Runtime Deno eingestellt?'
      answer: 'Ja. Die Deno-Entwickler planen, die Runtime noch ein Jahr mit monatlichen Fehlerbehebungen und Sicherheitsupdates zu unterstützen. Danach endet die Entwicklung durch das bisherige Team. Deno bleibt Open Source und kann von der Community weiterentwickelt werden.'
    - question: 'Was passiert mit Deno Deploy und JSR?'
      answer: 'Deno Deploy wird nach einer Übergangszeit von sechs Monaten abgeschaltet. Zahlende Kunden erhalten Unterstützung bei der Migration zu Cloudflare Workers. Die JavaScript-Registry JSR bleibt bestehen und zieht auf die Infrastruktur von Cloudflare um.'
socialmedia:
    - 'Cloudflare übernimmt Deno. Für die JavaScript-Runtime bedeutet das langfristig das Ende der bisherigen Entwicklung. Deno Deploy wird bereits nach sechs Monaten abgeschaltet. Was hinter der Übernahme steckt und welche Folgen sie hat.'
    - 'Deno sollte vieles besser machen als Node.js. Jetzt wechselt das gesamte Team zu Cloudflare. Spannend ist weniger die Übernahme selbst als der Plan dahinter: Cloudflare Workers sollen künftig auch auf eigener Infrastruktur einfacher laufen.'
    - 'Ein Jahr Support für Deno, sechs Monate für Deno Deploy. Danach konzentriert sich das Team auf Cloudflare Workers und Durable Objects. Für Entwickler stellt sich damit vor allem die Frage, wie es mit bestehenden Projekten weitergeht.'
news: true
---

Cloudflare übernimmt Deno und beendet langfristig die Entwicklung der JavaScript-Runtime. Hinter dem Schritt steckt ein größerer Plan für Cloudflare Workers, selbst gehostete Anwendungen und die Zukunft serverseitiger JavaScript-Entwicklung.

## Cloudflare übernimmt Deno: Was wurde angekündigt?

Am 9. Oktober 2026 haben [Cloudflare](https://blog.cloudflare.com/deno-joins-cloudflare/) und [Deno](https://deno.com/blog/cloudflare) bekannt gegeben, dass das gesamte Deno-Team zu Cloudflare wechselt. Damit übernimmt das US-Unternehmen die Entwickler hinter einer der bekanntesten Alternativen zu Node.js.

Die finanziellen Bedingungen der Übernahme wurden nicht veröffentlicht. Laut [TechCrunch](https://techcrunch.com/2026/10/10/cloudflare-acquires-deno-to-improve-its-workers-programming-model/) hatte Deno zuvor insgesamt 26 Millionen US-Dollar an Finanzierung eingesammelt, unter anderem von Sequoia Capital.

Hinter Deno steht Ryan Dahl, der bereits Node.js entwickelt hatte. Gemeinsam mit Bert Belder und weiteren Entwicklern arbeitete er an einer moderneren Umgebung für serverseitiges JavaScript und TypeScript.

Der Wechsel zu Cloudflare ist allerdings mehr als eine gewöhnliche Übernahme eines Entwicklerteams. Er bedeutet auch, dass die bisherige Entwicklung von Deno in ihrer bekannten Form auslaufen wird.

**Die wichtigsten angekündigten Änderungen im Überblick:**

- **Deno Runtime:** Noch ein Jahr Support mit monatlichen Bugfixes und Sicherheitsupdates. Danach stellt das bisherige Team die Entwicklung ein.
- **Deno Deploy:** Der Hosting-Dienst wird nach sechs Monaten abgeschaltet.
- **JSR:** Die JavaScript-Paketregistry bleibt erhalten und wechselt auf die Infrastruktur von Cloudflare.
- **Cloudflare Workers:** Die Teams wollen die selbst gehostete Nutzung von Workers und Durable Objects vereinfachen.
- **Open Source:** Deno bleibt quelloffen und kann grundsätzlich von anderen Entwicklern weitergeführt werden.

Damit erhält die Übernahme vor allem für bestehende Deno-Projekte eine unmittelbare Bedeutung.

## Was ist Deno und warum wurde es entwickelt?

Um die Entscheidung einzuordnen, lohnt sich ein Blick auf die Geschichte von Deno.

Ryan Dahl hatte 2009 mit Node.js eine Laufzeitumgebung geschaffen, mit der sich JavaScript außerhalb des Browsers ausführen lässt. Damit wurde die Sprache auch für Serveranwendungen, APIs und Backend-Systeme interessant.

Node.js entwickelte sich zu einem zentralen Bestandteil der modernen [Webentwicklung](https://oliverjessner.at/web-development/).

Mit der Zeit sah Dahl allerdings einige grundlegende Designentscheidungen kritisch. Dazu gehörten insbesondere der Umgang mit Sicherheit, das Modulsystem und die zunehmende Komplexität des Entwicklungsökosystems.

2018 stellte er deshalb Deno vor.

Die neue Runtime sollte mehrere Probleme von Anfang an anders lösen. Deno setzte unter anderem auf TypeScript-Unterstützung, Webstandards, integrierte Entwicklungswerkzeuge und ein Berechtigungsmodell, das beispielsweise den Zugriff auf Dateien oder das Netzwerk einschränken kann.

Anders als bei klassischen Node.js-Anwendungen sollten viele Funktionen bereits Bestandteil der Runtime sein.

Deno entwickelte sich anschließend weiter und verbesserte insbesondere die Kompatibilität zu Node.js und dem npm-Ökosystem.

Trotz dieser Fortschritte blieb Node.js eine dominierende Plattform für serverseitiges JavaScript. Deno positionierte sich als Alternative, ohne den etablierten Standard vollständig verdrängen zu können.

## Warum kauft Cloudflare ausgerechnet Deno?

Der interessanteste Teil der Übernahme betrifft nicht die bisherige JavaScript-Runtime, sondern ein anderes Projekt des Deno-Teams: **celld**.

Celld ist eine in Rust entwickelte Open-Source-Technologie, mit der sich Anwendungen nach dem Programmiermodell von Cloudflare Workers auf eigener Infrastruktur betreiben lassen sollen.

Das ist für Cloudflare strategisch relevant.

### Cloudflare Workers und das Problem mit der eigenen Infrastruktur

Cloudflare Workers ermöglicht es, JavaScript und andere unterstützte Anwendungen auf der Infrastruktur von Cloudflare auszuführen.

Anders als bei einem klassischen Server müssen Entwickler dabei nicht zwingend eigene virtuelle Maschinen oder Container verwalten.

Die Anwendungen laufen in einer serverlosen Umgebung, die Cloudflare betreibt und skaliert.

Das Modell hat allerdings eine Besonderheit: Wer eine Anwendung gezielt für Cloudflare Workers entwickelt, verwendet teilweise Schnittstellen und Architekturkonzepte, die sich von klassischen Serverumgebungen unterscheiden.

Dazu gehören beispielsweise Durable Objects.

Durable Objects ermöglichen es, einer Anwendung dauerhaft verfügbaren Zustand und koordinierte Verarbeitung zu geben. Das ist etwa für kollaborative Anwendungen, Echtzeitkommunikation oder bestimmte verteilte Systeme interessant.

Cloudflare hatte seine Workers-Runtime namens `workerd` bereits als Open Source veröffentlicht.

Die Software ließ sich damit grundsätzlich auch außerhalb der Cloudflare-Infrastruktur verwenden. Allerdings fehlten bisher wichtige Komponenten, um komplexere Anwendungen mit Durable Objects auf mehreren selbst betriebenen Servern zuverlässig zu skalieren.

Genau an dieser Stelle setzt celld an.

### Was Cloudflare mit celld erreichen will

Das Deno-Team hatte celld mit dem Ziel entwickelt, die Bereitstellung verteilter Anwendungen zu vereinfachen.

Statt zahlreiche einzelne Infrastrukturkomponenten kombinieren zu müssen, soll ein möglichst kompakter Aufbau genügen.

Laut Ryan Dahl basiert der Ansatz auf einer in Rust geschriebenen ausführbaren Komponente, die als externe Dienstabhängigkeit lediglich Objektspeicher benötigt. Für einen verteilten Betrieb werden mehrere celld-Instanzen eingesetzt.

Cloudflare möchte nun die Arbeit an celld und workerd zusammenführen.

Das Ziel besteht darin, Cloudflare Workers und Durable Objects einfacher auf eigener Infrastruktur betreiben zu können.

Für Entwickler wäre das eine interessante Veränderung: Anwendungen könnten künftig stärker nach demselben Programmiermodell entwickelt werden, unabhängig davon, ob sie direkt bei Cloudflare oder in einer selbst betriebenen Umgebung laufen.

Allerdings handelt es sich dabei zunächst um eine Entwicklungsrichtung. Eine vollständig integrierte und produktionsreife Lösung wurde mit der Übernahme noch nicht veröffentlicht.

## Wird Deno eingestellt?

Ja, zumindest die Entwicklung durch das bisherige Deno-Team wird eingestellt.

In seiner offiziellen Ankündigung erklärt Ryan Dahl, dass die Entwicklung künftig auf die gemeinsame Plattform mit Cloudflare konzentriert wird.

Für die Deno-Runtime gibt es noch ein Jahr Unterstützung. Während dieses Zeitraums sollen monatlich neue Versionen mit Fehlerbehebungen und Sicherheitsupdates erscheinen.

Anschließend endet die Entwicklung durch das bisherige Team.

Das bedeutet nicht, dass bestehende Deno-Anwendungen automatisch aufhören zu funktionieren.

Die Runtime bleibt Open Source. Entwickler können den Code weiterhin verwenden, verändern und grundsätzlich auch unabhängig weiterentwickeln.

Ob sich eine ausreichend große Community findet, um Deno dauerhaft zu pflegen und neue Funktionen zu entwickeln, ist derzeit offen.

Für Unternehmen, die Deno produktiv einsetzen, stellt sich damit insbesondere die Frage nach der langfristigen Wartung.

Eine Runtime ohne verlässliche Sicherheitsupdates kann auf Dauer problematisch werden, selbst wenn bestehende Anwendungen weiterhin funktionieren.

## Deno Deploy wird nach sechs Monaten abgeschaltet

Deutlich kurzfristiger sind die Auswirkungen auf Deno Deploy.

Der Hosting-Dienst, mit dem Entwickler JavaScript- und TypeScript-Anwendungen bereitstellen können, wird laut offizieller Ankündigung noch sechs Monate betrieben.

Danach soll der Dienst eingestellt werden.

Cloudflare und Deno haben angekündigt, zahlende Kunden bei der Migration zu Cloudflare Workers zu unterstützen.

Eine solche Migration ist allerdings nicht zwangsläufig nur ein Wechsel des Hosting-Anbieters.

Je nachdem, welche Funktionen eine Anwendung verwendet, können Anpassungen an Schnittstellen, Konfiguration, Datenhaltung und Bereitstellung notwendig werden.

Wer Deno Deploy produktiv verwendet, sollte deshalb rechtzeitig prüfen, welche Abhängigkeiten bestehen und welche Alternativen infrage kommen.

### Was passiert mit JSR?

Nicht alle Projekte aus dem Deno-Ökosystem werden eingestellt.

Die Paketregistry JSR soll bestehen bleiben.

JSR ist eine Registry für JavaScript- und TypeScript-Pakete und wurde unter anderem entwickelt, um die Veröffentlichung und Nutzung moderner TypeScript-Bibliotheken zu vereinfachen.

Die Infrastruktur soll künftig bei Cloudflare betrieben werden.

Auch die Arbeit an `rusty_v8`, den Rust-Bindings für die JavaScript-Engine V8, wird fortgesetzt. Zusätzlich ist eine Integration in `workerd` geplant.

## Cloudflare, Deno und Node.js: Was bedeutet die Übernahme für Entwickler?

Für Entwickler hängt die Bedeutung der Übernahme stark davon ab, welche Technologien sie bisher verwenden.

Wer ausschließlich mit Node.js arbeitet, muss aufgrund dieser Nachricht zunächst nichts ändern.

Node.js ist ein eigenständiges Open-Source-Projekt und nicht Bestandteil der Übernahme.

Auch Cloudflare Workers wird dadurch nicht automatisch zu Deno. Vielmehr soll die bisherige Arbeit des Deno-Teams in die Workers-Plattform einfließen.

Für bestehende Deno-Projekte sieht die Situation anders aus.

| Technologie        | Angekündigte Zukunft                                                   | Bedeutung                              |
| ------------------ | ---------------------------------------------------------------------- | -------------------------------------- |
| Node.js            | Unverändert                                                            | Keine unmittelbare Auswirkung          |
| Deno Runtime       | Ein Jahr Support, danach Ende der Entwicklung durch das bisherige Team | Langfristige Wartung prüfen            |
| Deno Deploy        | Abschaltung nach sechs Monaten                                         | Migration vorbereiten                  |
| JSR                | Weiterbetrieb bei Cloudflare                                           | Registry bleibt verfügbar              |
| Cloudflare Workers | Ausbau der Self-Hosting-Möglichkeiten geplant                          | Neue Einsatzmöglichkeiten denkbar      |
| celld und workerd  | Zusammenführung vorgesehen                                             | Grundlage für selbst gehostete Workers |

Gerade bei neuen Projekten dürfte die Entscheidung für Deno als eigenständige Runtime damit schwieriger werden.

Bisher war Deno eine aktiv entwickelte Alternative zu Node.js und anderen JavaScript-Runtimes wie Bun.

Mit dem angekündigten Ende der bisherigen Entwicklung verändert sich diese Ausgangslage.

Das bedeutet nicht, dass jede bestehende Anwendung sofort migriert werden muss. Es spricht allerdings dafür, langfristige Projekte stärker unter dem Gesichtspunkt von Wartbarkeit, Sicherheitsupdates und Plattformabhängigkeiten zu betrachten.

## Cloudflare will das Vendor-Lock-in bei Workers reduzieren

Ein weiterer bemerkenswerter Aspekt ist Cloudflares Argumentation rund um Vendor-Lock-in.

Damit ist die Abhängigkeit von einem bestimmten Anbieter gemeint, die einen späteren Wechsel technisch oder wirtschaftlich erschweren kann.

Gerade bei Cloud-Plattformen ist das ein bekanntes Problem.

Je stärker Anwendungen auf proprietäre Schnittstellen und Dienste setzen, desto aufwendiger kann eine Migration werden.

Cloudflare argumentiert in seiner Ankündigung, dass die Möglichkeit zum Wechsel für Kunden ein wichtiger Faktor bei der Entscheidung für die Plattform sei.

Das Unternehmen verweist darauf, dass workerd bereits Open Source ist und auch außerhalb des eigenen Netzwerks eingesetzt werden kann.

Die Zusammenarbeit mit Deno soll diese Möglichkeit weiter ausbauen.

Das ist aus meiner Sicht der strategisch spannendste Punkt der Übernahme.

Cloudflare versucht damit, sein eigenes Programmiermodell über die Grenzen der eigenen Infrastruktur hinaus zu etablieren.

Wenn Anwendungen auf Basis von Workers und Durable Objects künftig einfacher selbst betrieben werden können, könnte das die Attraktivität der Plattform erhöhen.

Gleichzeitig sollte man zwischen einem quelloffenen Laufzeitsystem und tatsächlicher Portabilität unterscheiden.

Ob Anwendungen ohne größere Anpassungen auf unterschiedlichen Infrastrukturen laufen, hängt auch von den verwendeten Diensten, der Datenhaltung und der Betriebsumgebung ab.

Open Source allein beseitigt nicht jede Form von Plattformabhängigkeit.

## Welche Rolle spielt KI bei der Übernahme?

Cloudflare und Deno nennen auch KI-Anwendungen als Einsatzgebiet für die geplante Plattform.

Im Mittelpunkt stehen dabei sogenannte AI Agents, also Softwaresysteme, die mithilfe von KI-Modellen Aufgaben bearbeiten und dafür beispielsweise Werkzeuge oder externe Dienste verwenden.

Solche Anwendungen benötigen häufig mehr als die reine Ausführung eines Sprachmodells.

Sie müssen Zustände verwalten, mit anderen Systemen kommunizieren und teilweise über längere Zeiträume hinweg verfügbar sein.

Durable Objects können dafür bestimmte technische Bausteine liefern, etwa persistente Zustände, WebSockets und koordinierte Verarbeitung.

Ryan Dahl sieht darin einen wichtigen Anwendungsfall für celld und die zukünftige Workers-Plattform.

Ob sich dieses Programmiermodell tatsächlich als verbreitete Grundlage für KI-Agenten etabliert, lässt sich derzeit nicht beurteilen.

Die technische Richtung ist dennoch nachvollziehbar: Cloudflare möchte nicht nur einzelne Funktionen ausführen, sondern eine einheitliche Umgebung für komplexere, verteilte Anwendungen anbieten.

## Meine Einschätzung: Deno endet, aber seine Ideen bleiben

Ich finde die Übernahme vor allem deshalb interessant, weil sie zeigt, wie sich die Prioritäten in der [Softwareentwicklung](https://oliverjessner.at/software-development/) verschieben.

Deno begann als Versuch, grundlegende Entscheidungen von Node.js zu überdenken.

Es ging um Sicherheit, TypeScript, Entwicklerwerkzeuge und eine einfachere Nutzung von JavaScript außerhalb des Browsers.

Viele dieser Ideen haben inzwischen auch andere Werkzeuge und Laufzeitumgebungen beeinflusst.

Jetzt konzentriert sich das Team hinter Deno auf eine andere Herausforderung: die Infrastruktur, auf der moderne Anwendungen betrieben werden.

Das ist durchaus konsequent.

Denn eine gute Runtime allein löst noch nicht die Schwierigkeiten, die beim Betrieb verteilter Anwendungen entstehen.

Für Cloudflare könnte die Übernahme deshalb weit mehr wert sein als eine zusätzliche JavaScript-Technologie.

Das Unternehmen gewinnt erfahrene Entwickler und mit celld einen Ansatz, um das eigene Workers-Modell auf weitere Infrastrukturen auszuweiten.

Für Deno-Nutzer ist die Nachricht dagegen weniger erfreulich. Besonders die Abschaltung von Deno Deploy und das angekündigte Ende der Runtime-Entwicklung schaffen neue Unsicherheit.

**Deno verschwindet nicht sofort. Aber die Zukunft, für die das Projekt ursprünglich entwickelt wurde, wird künftig unter dem Dach von Cloudflare weiterverfolgt.**

## Quellen und weiterführende Informationen

- [Cloudflare: Deno is joining Cloudflare](https://blog.cloudflare.com/deno-joins-cloudflare/)
- [Deno: Offizielle Ankündigung von Ryan Dahl](https://deno.com/blog/cloudflare)
- [TechCrunch: Cloudflare acquires Deno to improve its Workers programming model](https://techcrunch.com/2026/10/10/cloudflare-acquires-deno-to-improve-its-workers-programming-model/)
- [Cloudflare Workers Dokumentation](https://developers.cloudflare.com/workers/)
- [Deno Dokumentation](https://docs.deno.com/)
- [workerd auf GitHub](https://github.com/cloudflare/workerd)
