---
layout: post
title: 'Warum ich BulkPixel gebaut habe: Bilder für das Web automatisiert verarbeiten'
date: 2026-11-19 11:16:08 +0100
authors:
  - oliver_jessner
meta_og_type: article
categories:
  - macos
  - web-development
  - software-development
  - terminal
description: Bilder für das Web vorbereiten kostet Zeit. Warum ich dafür BulkPixel gebaut habe und wie Presets, CLI und überwachte Ordner helfen
thumbnail: /assets/images/gen/blog/warum-ich-bulkpixel-gebaut-habe-bilder-fuer-das-web-automatisiert-verarbeiten/header_thumbnail.webp
image: /assets/images/gen/blog/warum-ich-bulkpixel-gebaut-habe-bilder-fuer-das-web-automatisiert-verarbeiten/header.webp
faq:
  - question: Was ist BulkPixel?
    answer: BulkPixel ist eine Open-Source-App für macOS, mit der sich mehrere Bilder lokal konvertieren, skalieren und exportieren lassen.
  - question: Wie automatisiert BulkPixel die Bildverarbeitung?
    answer: Gespeicherte Presets lassen sich über die App, die Kommandozeile und überwachte Ordner verwenden. Neue passende Bilder können so automatisch verarbeitet werden.
  - question: Ist BulkPixel kostenlos und Open Source?
    answer: Ja. BulkPixel ist kostenlos nutzbar und der Quellcode steht unter der MIT-Lizenz auf GitHub zur Verfügung.
socialmedia:
  - 'Warum ich BulkPixel gebaut habe: Ich wollte wiederkehrende Bildaufgaben für meine Website automatisieren. Mit Presets, CLI und überwachten Ordnern. Der Quellcode ist offen.'
  - Bilder einzeln für das Web vorbereiten? BulkPixel verarbeitet ganze Stapel lokal auf dem Mac. Im Blog erkläre ich, warum ich das Tool gebaut habe.
  - 'Ein Ordner für neue Bilder, ein gespeichertes Preset und weniger wiederkehrende Handarbeit: So fügt sich BulkPixel in meinen Web-Workflow ein.'
news: true
pinned: false
ads: true
image_width: 1280
image_height: 720
---

Bilder für das Web vorzubereiten ist selten schwierig, wiederholt sich aber ständig. Deshalb habe ich BulkPixel gebaut: ein Open-Source-Werkzeug für automatisierte Bildverarbeitung auf dem Mac.

## Warum ich Bilder für das Web automatisieren wollte

Für einen Blogpost oder ein anderes Webprojekt reicht es oft nicht, ein Bild einfach zu übernehmen. Es muss zum vorgesehenen Platz passen, in einem geeigneten Format vorliegen und unter einem passenden Namen im richtigen Ordner landen. Bei einem einzelnen Bild ist das schnell erledigt. Kommen regelmäßig neue Bilder dazu, wiederholen sich dieselben Handgriffe.

Ich wollte diese Arbeitsschritte für meine Webaufgaben vollständig automatisieren und dabei selbst bestimmen, wie sich das Werkzeug in meinen Ablauf einfügt. Daraus ist [BulkPixel](https://oliverjessner.at/bulkpixel/) entstanden: eine Anwendung für [macOS](https://oliverjessner.at/category/macos/), die mehrere Bilder lokal konvertiert, skaliert und exportiert.

Entscheidend war für mich, dass ich die Einstellungen nicht bei jedem Durchlauf neu zusammensuchen muss. Außerdem wollte ich die Verarbeitung sowohl über eine Oberfläche als auch aus Skripten und über überwachte Ordner starten können.

## Wiederkehrende Bildaufgaben mit Presets erledigen

Beim Vorbereiten von Bildern für einen Blog wiederholen sich häufig dieselben Entscheidungen:

- Welches Ausgabeformat soll verwendet werden?
- Wie groß soll das Bild sein?
- Welche Qualität ist für den jeweiligen Einsatz sinnvoll?
- Wie soll die exportierte Datei heißen und wo soll sie liegen?

In BulkPixel lassen sich diese Einstellungen als Preset speichern. Ein Preset kann etwa Format, Bildgröße, Qualität, Dateinamen und Ausgabeordner enthalten. Es lässt sich später in der App oder über die Kommandozeile erneut verwenden.

Für einen Blog kann das zum Beispiel bedeuten, ein Preset für Artikelbilder und ein weiteres für Vorschaubilder anzulegen. Ändern sich die Anforderungen, lässt sich das jeweilige Preset anpassen. Die Entscheidung über Größe und Qualität bleibt dabei bewusst beim Nutzer: Eine Einstellung, die für ein Motiv gut funktioniert, muss nicht für jedes andere Bild passen.

BulkPixel kann mehrere Bilder in einem Durchgang verarbeiten und unter anderem als JPEG, PNG, WebP oder AVIF exportieren. Die Breite oder Höhe lässt sich vorgeben, während das Seitenverhältnis erhalten bleibt. Die unterstützten Formate und den aktuellen Funktionsumfang beschreibt das [GitHub-Repository](https://github.com/oliverjessner/BulkPixel).

## Bilder über das Terminal und Skripte verarbeiten

Eine grafische Oberfläche ist praktisch, wenn ich Bilder auswähle und Einstellungen prüfen möchte. Für wiederkehrende Abläufe in der [Webentwicklung](https://oliverjessner.at/category/web-development/) brauche ich aber auch einen Weg über das [Terminal](https://oliverjessner.at/category/terminal/). Deshalb gehört zu BulkPixel eine Kommandozeilenschnittstelle, kurz CLI.

Damit kann ich Bilder mit ausdrücklich angegebenen Einstellungen verarbeiten. Dieses Beispiel exportiert zwei Dateien als WebP:

```bash
bulkpixel convert \
  --input ./photo.jpg ./screenshot.png \
  --output-dir ./exports \
  --format webp --width 1200 --quality 85
```

Die Breite beträgt hier 1200 Pixel, der Qualitätswert 85. Beides sind Beispiele, keine allgemeingültigen Empfehlungen. Das Ergebnis sollte zum Motiv und zum Einsatz auf der Website passen.

Alternativ lässt sich ein zuvor angelegtes Preset aufrufen:

```bash
bulkpixel convert \
  --preset "Blog Header" \
  --input ./image-1.png ./image-2.png
```

Der Vorteil für meine Skripte: Die Exporteinstellungen können als Preset gepflegt werden, während das Skript die Verarbeitung an der passenden Stelle anstößt. Die verfügbaren Befehle und Optionen stehen in der [CLI-Dokumentation](https://github.com/oliverjessner/BulkPixel).

## Überwachte Ordner für automatische Exporte

Noch weniger Handarbeit brauche ich bei Aufgaben, die immer nach demselben Muster ablaufen. Dafür gibt es in BulkPixel überwachte Ordner, auch "Watched Folders" genannt.

Für einen solchen Ordner lege ich fest, welche Dateitypen berücksichtigt und welche Presets angewendet werden sollen. Kommt ein passendes Bild hinzu, verarbeitet BulkPixel es automatisch. Auch mehrere Presets für einen Ordner sind möglich.

So lässt sich beispielsweise ein Eingangsordner für Blogbilder einrichten. Ein Preset könnte eine Version für den Artikel erzeugen, ein weiteres eine kleinere Vorschau. Welche Dateien tatsächlich entstehen und wo sie landen, hängt von den jeweiligen Preset-Einstellungen ab.

Wichtig für die Planung: Die Ordnerüberwachung verarbeitet neue passende Bilder, während BulkPixel läuft. Wer einen solchen Ablauf einrichtet, sollte ihn zunächst mit Kopien testen und die erzeugten Bilder auf Größe und Qualität prüfen.

## Lokal und Open Source

BulkPixel verarbeitet Bilder lokal auf dem Mac. Für die Konvertierung sind weder ein Konto noch der Upload der Bilddateien zu einem Cloud-Dienst erforderlich. Das passt zu meinem Ziel, den Ablauf auf meinem eigenen Rechner in bestehende Werkzeuge einzubinden.

Der [Quellcode von BulkPixel](https://github.com/oliverjessner/BulkPixel) ist öffentlich und steht unter der MIT-Lizenz. Wer möchte, kann sich ansehen, wie die Anwendung funktioniert, sie an eigene Bedürfnisse anpassen oder zum Projekt beitragen.

## BulkPixel installieren und ausprobieren

BulkPixel ist laut Projekt-Repository für Macs mit Apple Silicon verfügbar. Die App und die CLI lassen sich über Homebrew installieren:

```bash
brew tap oliverjessner/tap
brew install --cask bulkpixel
```

Alternativ steht im [GitHub-Repository](https://github.com/oliverjessner/BulkPixel) ein Download bereit.

Ein guter Einstieg ist ein kleiner Stapel Testbilder: Ausgabeformat und Größe wählen, das Ergebnis prüfen und die Einstellungen anschließend als Preset speichern. Wenn der Export passt, kann dasselbe Preset für weitere Bilder, in einem Skript oder für einen überwachten Ordner verwendet werden.

Für mich liegt der Nutzen genau darin: Die Vorbereitung von Webbildern ist einmal eingerichtet und lässt sich danach dort ausführen, wo sie in meinen Arbeitsablauf passt.
