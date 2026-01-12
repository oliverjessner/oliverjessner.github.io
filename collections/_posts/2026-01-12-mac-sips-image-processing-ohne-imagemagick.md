---
layout: post
title: 'ImageMagick mal anders: Bilder mit sips unter macOS bearbeiten'
date: 2026-01-12 09:30:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - macos
    - terminal
    - workflow
description: 'Tutorial: Mit dem macOS-Terminal-Tool sips Bilder konvertieren, skalieren, formatieren und für Web oder Automatisierung vorbereiten, ohne zusätzliche Software.'
thumbnail: '/assets/images/gen/blog/mac-sips-image-processing-ohne-imagemagick/header_thumbnail.webp'
image: '/assets/images/gen/blog/mac-sips-image-processing-ohne-imagemagick/header.webp'
---

macOS bringt mit jedem System seit OS X ein kleines, aber mächtiges Terminal-Tool mit: `sips` steht für **Scriptable Image Processing System**.  
Damit kannst du aus dem Terminal heraus Bilder konvertieren, skalieren, drehen, Metadaten abfragen und vieles mehr, ganz ohne zusätzliche Software.

Während viele Nutzer für solche Aufgaben externe Programme wie ImageMagick installieren, ist `sips` **bereits auf jedem Mac vorinstalliert** und eignet sich besonders dann, wenn du schnell und skriptbar Bilddateien bearbeiten willst.

## Bilder konvertieren – Schritt für Schritt

### Einzelne Datei in ein anderes Format umwandeln

Der häufigste Anwendungsfall ist die Konvertierung eines Bildes, z. B. von PNG oder TIFF nach JPEG:

```bash
sips -s format jpeg input.png --out output.jpg
```

Dabei bedeutet:

-   `-s format jpeg`: Ziel-Format ist JPEG
-   `input.png`: die Quelldatei
-   `--out output.jpg`: der Name der neuen Datei

So wandelst du zum Beispiel eine PNG-Datei in eine JPEG-Datei um.

## Dateien für Web und Performance vorbereiten

Viele Webseiten benötigen kleinere, komprimierte Bilder. `sips` kann das ebenfalls:

```bash
sips -s format jpeg -s formatOptions best input.tif --out output.jpg
```

Mit `formatOptions` kannst du z. B. die Qualität steuern („low“, „normal“, „high“, „best“).

## Mehrere Bilder gleichzeitig konvertieren

Willst du alle Bilder in einem Ordner umwandeln, kannst du das mit einer einfachen Schleife erledigen:

```bash
for file in *.png; do
  sips -s format jpeg "$file" --out "${file%.png}.jpg"
done
```

Dieser Befehl geht durch alle `.png`-Dateien im aktuellen Ordner und speichert entsprechende `.jpg`-Dateien.

## Bilder skalieren

Auch das Skalieren funktioniert ganz ohne GUI-Tools:

```bash
sips -Z 800 *.jpg
```

Das reduziert Bilder so, dass sie maximal **800 Pixel Breite oder Höhe** haben, wobei das Seitenverhältnis erhalten bleibt.

Wenn du das Ergebnis in separaten Dateien speichern möchtest:

```bash
sips --resampleWidth 1024 "$file" --out "Resized/${file}"
```

Damit werden die Bilder in den Ordner `Resized` exportiert und auf 1024 Pixel Breite skaliert.

## Weitere praktische Möglichkeiten

Mit `sips` kannst du noch mehr machen, zum Beispiel:

-   **Rotation** von Bildern:
    ```bash
    sips --rotate 90 image.jpg --out rotated.jpg
    ```
-   **Metadaten auslesen**:
    ```bash
    sips -g dpiHeight -g dpiWidth image.jpg
    ```

Das Tool arbeitet nicht nur mit JPEG und PNG, sondern auch mit vielen anderen Formaten wie TIFF oder BMP.

## Vorteile von `sips` auf dem Mac

1. **Vorinstalliert** – keine Installation nötig
2. **Skriptbar** – ideal für wiederkehrende Aufgaben oder Automatisierungen
3. **Batch-Fähig** – mehrere Dateien gleichzeitig bearbeiten
4. **Datenschutzfreundlich** – alles lokal auf deinem Mac, keine Upload-Konverter nötig

Damit ist `sips` besonders dann sinnvoll, wenn du viele Bilder schnell umwandeln oder z. B. für Webseiten optimieren willst – ohne zusätzliche Apps oder externen Upload-Service.

## Fazit

`Sips` ist ein kleines, aber vielseitiges Terminal-Tool, das macOS-Nutzern eine einfache Möglichkeit gibt, Bilder in vielen Situationen zu bearbeiten:

-   **Formatkonvertierung**
-   **Batch-Processing**
-   **Skalierung und Anpassung**
-   **Metadaten-Abfragen**

Wenn du Bilder regelmäßig in Scripts, Workflows oder Terminal-Automatisierungen einbinden musst, lohnt es sich, `sips` kennenzulernen, es ist schnell, zuverlässig und liegt ohne Zusatzinstallation bereits auf deinem Mac.
