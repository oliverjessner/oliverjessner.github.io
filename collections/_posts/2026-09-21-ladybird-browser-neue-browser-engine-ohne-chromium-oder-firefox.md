---
layout: post
title: 'Ladybird Browser – neue Browser-Engine ohne Chromium oder Firefox'
date: 2026-09-21 11:40:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - browser
    - macos
    - software-development
    - terminal
description: 'Ladybird entwickelt eine eigene Browser-Engine ohne Chromium, WebKit oder Gecko. So lässt sich der Pre-Alpha-Browser auf macOS selbst bauen'
thumbnail: '/assets/images/gen/blog/ladybird-browser-neue-browser-engine-ohne-chromium-oder-firefox/header_thumbnail.webp'
image: '/assets/images/gen/blog/ladybird-browser-neue-browser-engine-ohne-chromium-oder-firefox/header.webp'
image_width: 1280
image_height: 853
faq:
    - question: 'Was ist der Ladybird Browser?'
      answer: 'Ladybird ist ein Open-Source-Browser mit einer eigenständig entwickelten Browser-Engine. Das Projekt basiert weder auf Chromium beziehungsweise Blink noch auf WebKit oder Gecko.'
    - question: 'Kann ich Ladybird bereits herunterladen?'
      answer: 'Noch nicht als reguläre fertige Desktop-App. Ladybird befindet sich im Pre-Alpha-Stadium und muss derzeit für Linux oder macOS aus dem Quellcode gebaut werden.'
    - question: 'Wie installiere ich Ladybird auf macOS?'
      answer: 'Für macOS werden unter anderem Xcode beziehungsweise Clang, CMake, Ninja, weitere Build-Werkzeuge und eine Rust-Toolchain benötigt. Anschließend kann Ladybird aus dem GitHub-Repository gebaut und gestartet werden.'
socialmedia:
    - 'Ladybird baut eine eigene Browser-Engine, ohne Chromium, WebKit oder Gecko. Ich habe mir angesehen, wie weit das Projekt 2026 ist und wie man den Browser auf macOS selbst kompiliert.'
    - 'Chrome, Edge, Brave und viele andere Browser teilen sich Chromium. Ladybird versucht einen anderen Weg: eine eigenständige Web-Engine. Noch Pre-Alpha, technisch aber spannend.'
    - 'Ladybird Browser auf macOS ausprobieren: Noch gibt es keinen normalen Download. Der Browser wird direkt aus dem Quellcode gebaut. Was dahinter steckt und welche Voraussetzungen ihr braucht.'
---

Ladybird will nicht nur eine weitere Oberfläche für Chromium sein. Das Open-Source-Projekt entwickelt eine eigene Browser-Engine und soll langfristig eine echte zusätzliche technische Basis für das Web schaffen. Noch ist der Browser allerdings klar ein Entwicklerprojekt.

## Ladybird Browser – was ist das eigentlich?

Wer heute einen neuen [Browser](https://oliverjessner.at/category/browser/) installiert, bekommt nicht automatisch eine neue Browser-Engine.

Google Chrome und viele andere Browser verwenden Chromium und dessen Rendering-Engine Blink. Safari basiert auf WebKit. Firefox verwendet Gecko. Andere Browser können eigene Oberflächen, Funktionen und Datenschutzkonzepte entwickeln, darunter arbeitet aber häufig eine dieser etablierten Engines.

[Ladybird](https://github.com/LadybirdBrowser/ladybird) verfolgt einen anderen Ansatz.

Das Projekt implementiert die Webplattform selbst und beschreibt sich ausdrücklich nicht als Chromium-Oberfläche, WebKit-Port oder Firefox-Fork. Ladybird verwendet keinen Code aus Blink, WebKit oder Gecko für seine Browser-Engine.

Das bedeutet allerdings nicht, dass sämtliche Komponenten selbst geschrieben werden. Das Projekt verwendet auch externe Bibliotheken für allgemeine Aufgaben. "Unabhängig" bezieht sich hier vor allem darauf, dass die eigentliche Implementierung der Webplattform nicht auf einer bestehenden Browser-Engine aufsetzt.

Genau das macht Ladybird interessant. Eine moderne Browser-Engine von Grund auf zu entwickeln, ist ein ungewöhnlich großes Softwareprojekt.

## Ladybird vs. Chrome, Firefox und Safari

Ladybird ist derzeit keine Alternative zu Chrome oder Firefox im Sinne eines fertigen Browsers, den man einfach installieren und im Alltag verwenden sollte.

Der Unterschied liegt momentan vor allem auf technischer Ebene.

| Browser        | Browser-Engine   |
| -------------- | ---------------- |
| Google Chrome  | Blink / Chromium |
| Microsoft Edge | Blink / Chromium |
| Brave          | Blink / Chromium |
| Safari         | WebKit           |
| Firefox        | Gecko            |
| Ladybird       | eigene Engine    |

Für das Web ist dieser Unterschied relevant.

Browser-Engines müssen HTML, CSS, JavaScript, WebAssembly und eine große Zahl weiterer Webstandards implementieren. Dazu kommen Rendering, Netzwerkzugriffe, Audio und Video, Sicherheit, Sandboxing, Speicherverwaltung und zahlreiche Web-APIs.

Ladybird versucht, diese Plattform unabhängig von den bestehenden großen Engines umzusetzen.

Das Projekt orientiert sich dabei an Webstandards und testet die Kompatibilität unter anderem mit den Web Platform Tests, kurz WPT. Der aktuelle Stand lässt sich über [WPT.fyi](https://wpt.fyi/results/?product=ladybird) verfolgen.

## Ladybird Download – warum es noch keinen normalen Download gibt

Wer nach "Ladybird Browser Download" sucht, stößt aktuell auf ein wichtiges Problem: Es gibt noch keinen normalen Release für Endnutzer.

Das GitHub-Repository bezeichnet Ladybird weiterhin ausdrücklich als "pre-alpha". Der Browser ist derzeit für Entwickler gedacht und muss aus dem Quellcode gebaut werden.

Auch der Release-Bereich des Projekts enthält aktuell keine fertigen GitHub-Releases.

Die [Roadmap im Ladybird-Repository](https://github.com/LadybirdBrowser/ladybird/blob/master/Documentation/FAQ.md) sieht derzeit folgende Schritte vor:

- 2026: Alpha für Linux und macOS, vorgesehen für Entwickler und Early Adopter
- 2027: Beta mit herunterladbarer Anwendung für Linux und macOS
- 2028: stabile Version für die allgemeine Nutzung

Diese Planung sollte nicht mit einem bereits erschienenen Alpha-Release verwechselt werden. Wer Ladybird heute ausprobieren möchte, baut den Browser selbst.

## Ladybird Browser auf macOS installieren

Für Entwickler auf [macOS](https://oliverjessner.at/category/macos/) ist der Einstieg vergleichsweise überschaubar, aber deutlich aufwendiger als die Installation eines normalen Browsers.

Die offiziellen Build-Anweisungen verlangen unter anderem:

- Xcode 15 oder einen geeigneten Clang-Compiler
- einen C++23-fähigen Compiler
- CMake 3.30 oder neuer
- Ninja
- NASM
- eine Rust-Toolchain
- verschiedene Build-Werkzeuge

Zunächst lassen sich Apples Command Line Tools installieren:

```bash
xcode-select --install
```

Die benötigten Pakete können anschließend mit Homebrew installiert werden:

```bash
brew install autoconf autoconf-archive automake ccache cmake libtool nasm ninja pkg-config
```

Zusätzlich wird eine Rust-Toolchain benötigt. Das Projekt verweist dafür auf [rustup](https://rustup.rs/).

Danach kann das Repository geklont werden:

```bash
git clone https://github.com/LadybirdBrowser/ladybird.git
cd ladybird
```

Der einfachste offizielle Weg zum Bauen und Starten führt über das mitgelieferte Python-Skript:

```bash
./Meta/ladybird.py run
```

Beim ersten Durchlauf werden Abhängigkeiten vorbereitet und Ladybird kompiliert. Entsprechend sollte man nicht erwarten, dass der Browser nach wenigen Sekunden startet.

Die vollständigen und jeweils aktuellen Voraussetzungen stehen in den [offiziellen Build-Anweisungen](https://github.com/LadybirdBrowser/ladybird/blob/master/Documentation/BuildInstructionsLadybird.md).

## Ladybird auf macOS mit nativer Oberfläche

Ein interessantes Detail für macOS-Nutzer ist die Benutzeroberfläche.

Ladybird verwendet nicht auf jedem Betriebssystem dasselbe GUI-Framework. Auf macOS kommt standardmäßig eine native AppKit-Oberfläche zum Einsatz. Auf anderen Desktop-Plattformen wird Qt verwendet.

Wer unter macOS ausdrücklich die Qt-Oberfläche ausprobieren möchte, kann Qt über Homebrew installieren:

```bash
brew install qt
```

Ladybird lässt sich dann beispielsweise mit der Qt-Oberfläche starten:

```bash
./Meta/ladybird.py run --gui=Qt
```

Für die normale Entwicklung unter macOS ist das allerdings nicht erforderlich.

## Unter der Oberfläche – so ist Ladybird aufgebaut

Technisch ist Ladybird als Multi-Prozess-Browser aufgebaut.

Neben dem eigentlichen UI-Prozess existieren separate Prozesse für verschiedene Aufgaben. Das Repository nennt unter anderem:

- WebContent-Prozesse für Webseiten
- einen ImageDecoder-Prozess
- einen RequestServer-Prozess
- den eigentlichen UI-Prozess

Jeder Tab besitzt einen eigenen Renderer-Prozess, der vom Rest des Systems isoliert wird. Auch Bilddekodierung und Netzwerkverbindungen laufen außerhalb des eigentlichen Seitenprozesses.

Dieses Modell soll die Auswirkungen fehlerhafter oder bösartiger Inhalte begrenzen.

Viele Kernkomponenten stammen historisch aus dem SerenityOS-Projekt. Dazu gehören unter anderem LibWeb für die Webdarstellung, LibJS für JavaScript, LibWasm für WebAssembly und verschiedene Bibliotheken für Grafik, Unicode und Interprozesskommunikation.

Ladybird entstand ursprünglich aus Arbeiten an einem HTML-Viewer für SerenityOS und entwickelte sich daraus schrittweise zu einem eigenständigen Browserprojekt.

## C++ und Rust statt fertiger Browser-Engine

Ladybird ist auch aus Sicht der [Softwareentwicklung](https://oliverjessner.at/category/software-development/) interessant.

Große Teile des Projekts wurden in C++ entwickelt. Gleichzeitig gehört Rust inzwischen zur notwendigen Build-Umgebung und wird bereits für verschiedene Komponenten eingesetzt.

Im Repository finden sich beispielsweise Rust-Implementierungen rund um HTML-Verarbeitung, reguläre Ausdrücke, URLs, Grafik und weitere Bibliotheken.

Das Projekt versucht damit nicht nur eine neue Browser-Engine aufzubauen. Gleichzeitig verändert sich auch die technische Basis, auf der diese Engine entwickelt wird.

Für Entwickler macht das Ladybird zu einem ungewöhnlich offenen Einblick in Browser-Engineering. HTML-Parsing, CSS, JavaScript, Rendering und Web-APIs sind hier keine Bibliothek, die einfach eingebunden wird. Sie sind Teil des eigentlichen Projekts.

## Ist Ladybird schon eine Chrome-Alternative?

Für normale Nutzer derzeit nicht.

Wer einen stabilen Browser für Banking, Webanwendungen, Streaming, Passwortmanager, Erweiterungen und den täglichen Einsatz sucht, sollte Ladybird aktuell nicht als Ersatz für Chrome, Safari oder Firefox betrachten.

Das Projekt kommuniziert diesen Zustand selbst sehr deutlich.

Pre-Alpha bedeutet hier auch tatsächlich Pre-Alpha. Einzelne Webseiten können bereits funktionieren, andere können Fehler zeigen oder überhaupt nicht korrekt laufen.

Für Entwickler, Browser-Enthusiasten und Menschen, die sich mit Webstandards beschäftigen, sieht die Sache anders aus.

Gerade weil Ladybird keine etablierte Browser-Engine übernimmt, kann man vergleichsweise direkt beobachten, welche Arbeit hinter Funktionen steckt, die in fertigen Browsern selbstverständlich wirken.

Ein `<div>` anzuzeigen ist einfach. Eine moderne Website mit CSS, JavaScript, WebAssembly, Audio, Video, Canvas, WebGL, Netzwerkzugriffen, Caching und Sicherheitsmechanismen korrekt auszuführen, ist eine völlig andere Größenordnung.

## Warum eine weitere Browser-Engine interessant ist

Ladybird muss Chrome nicht ersetzen, damit das Projekt technisch relevant wird.

Eine zusätzliche Browser-Engine bedeutet eine weitere unabhängige Implementierung von Webstandards. Dadurch können Unterschiede zwischen Spezifikation und realem Verhalten sichtbarer werden.

Das ist auch für Webentwickler interessant.

Wenn eine Website nur deshalb funktioniert, weil mehrere Browser dieselbe Engine verwenden, fällt eine ungewollte Abhängigkeit möglicherweise lange nicht auf. Eine weitere Implementierung kann solche Annahmen offenlegen.

Gleichzeitig sollte man daraus keine größere Bedeutung ableiten, als der aktuelle Entwicklungsstand hergibt. Eine funktionierende Browser-Engine zu bauen ist nur ein Teil des Problems. Sie über Jahre mit der Entwicklung des Webs synchron zu halten, Sicherheitslücken zu schließen und ausreichende Kompatibilität zu erreichen, ist mindestens genauso anspruchsvoll.

## Ladybird ausprobieren – für wen sich das heute lohnt

Ladybird lohnt sich momentan vor allem dann, wenn man bewusst mit unfertiger Software arbeiten möchte.

Interessant ist das Projekt beispielsweise für:

- Webentwickler, die Browser-Kompatibilität untersuchen möchten
- C++- und Rust-Entwickler
- Menschen, die Browser-Engines besser verstehen möchten
- Entwickler, die an Webstandards arbeiten
- Open-Source-Contributor
- Nutzer, die die Entwicklung alternativer Browser-Technologien verfolgen

Wer dagegen nur nach einer möglichst problemlosen Chrome-Alternative sucht, sollte die weitere Entwicklung abwarten.

Ladybird ist 2026 weniger ein fertiges Produkt als ein öffentlich entwickelter Versuch, wieder eine eigenständige Browser-Engine aufzubauen.

Gerade deshalb ist das Projekt einen Blick wert.
