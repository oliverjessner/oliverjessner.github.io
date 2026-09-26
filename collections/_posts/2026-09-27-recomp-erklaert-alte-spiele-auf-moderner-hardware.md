---
layout: post
title: 'Recomp erklärt – alte Spiele auf moderner Hardware'
date: 2026-09-27 00:04:07 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - recomp
    - gaming
    - emulation
    - macos
    - linux
description: 'Alte Spiele starten trotz schneller Hardware nicht mehr? Wie Recompilation neue Zugänge schafft und was sie von Emulation unterscheidet'
thumbnail: '/assets/images/gen/blog/recomp-erklaert-alte-spiele-auf-moderner-hardware/header_thumbnail.webp'
image: '/assets/images/gen/blog/recomp-erklaert-alte-spiele-auf-moderner-hardware/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Was bedeutet Recomp bei Spielen?'
      answer: 'Recomp steht für Recompilation, auf Deutsch Rekompilierung. Im Retro-Gaming ist damit häufig statische Binär-Recompilation gemeint: Bereits kompilierter Spielcode wird für eine neue Zielplattform übersetzt. Daraus kann mit weiteren Anpassungen ein nativer Port entstehen.'
    - question: 'Was ist der Unterschied zwischen Recomp und Emulation?'
      answer: 'Ein Emulator bildet Funktionen der ursprünglichen Plattform nach, damit deren Software darauf laufen kann. Statische Recompilation übersetzt Spielcode im Voraus für die Zielplattform. Auch ein solcher Port kann nachgebildete Systemfunktionen benötigen. Emulatoren können wiederum dynamische Recompilation verwenden.'
    - question: 'Laufen Recomp-Spiele auf macOS und Linux?'
      answer: 'Das hängt vom jeweiligen Projekt ab. Zelda 64: Recompiled und Banjo: Recompiled unterstützen Windows, Linux und macOS. Prüfe die Anforderungen an Betriebssystem und Hardware sowie die benötigte Originalversion des Spiels. Recompilation allein garantiert keine Unterstützung aller Plattformen.'
socialmedia:
    - 'Das Spiel ist noch da, aber der Rechner von damals nicht mehr. Recompilation kann Klassiker auf heutige Hardware bringen. Wie das funktioniert, was Emulation anders macht und warum das für den Erhalt alter Spiele relevant ist.'
    - 'Recomp, Emulation, Decompilation: Die Begriffe hängen zusammen, beschreiben aber unterschiedliche Dinge. Eine verständliche Einordnung mit Beispielen für Windows, macOS und Linux.'
    - 'Alte Spiele erhalten heißt auch, sie spielbar zu halten. Recomp-Projekte können dabei helfen. Originaldaten, funktionierende Werkzeuge und weitere Pflege bleiben trotzdem nötig.'
news: true
---

Das Spiel liegt noch im Regal, doch der Rechner von damals ist längst weg. Recompilation kann Klassiker auf heutige Hardware bringen. Was steckt dahinter und wie unterscheidet sie sich von Emulation?

## Was ist Recomp bei alten Spielen?

**Recomp steht für Recompilation, auf Deutsch Rekompilierung. Im Retro-Gaming meint der Begriff häufig, dass bereits kompilierter Spielcode für eine neue Zielplattform übersetzt wird. Mit zusätzlichen Anpassungen kann daraus eine native Version für heutige Computer entstehen.**

Eine [Recomp](https://oliverjessner.at/category/recomp/) ist also eine technische Grundlage, um ein vorhandenes Spiel auf einem anderen System ausführbar zu machen. Das kann den Zugang zu einem Klassiker erleichtern, auch wenn dessen ursprüngliche Hardware nicht mehr verfügbar ist.

Der Begriff ist allerdings weiter gefasst: Vorhandenen Quellcode erneut zu kompilieren ist ebenfalls eine Rekompilierung. Bei Projekten wie N64Recomp geht es speziell um **statische Binär-Recompilation**. Dafür muss der ursprüngliche Quellcode des Spiels nicht vorliegen.

## Warum laufen alte Spiele auf neuer Hardware nicht mehr?

Ob ein Spiel startet, hängt von mehr als der Rechenleistung ab. Es erwartet bestimmte Prozessorbefehle, Betriebssystemfunktionen und Schnittstellen für Grafik, Ton oder Eingabegeräte. Diese Voraussetzungen können sich über die Jahre verändern.

Ein konkretes Beispiel ist [macOS](https://oliverjessner.at/category/macos/): Seit macOS Catalina 10.15 lassen sich 32-Bit-Mac-Anwendungen nicht mehr direkt ausführen. Das betrifft auch entsprechend alte Spiele, selbst wenn der Rechner ihre damaligen Leistungsanforderungen deutlich übertrifft. Apple dokumentiert diese Einschränkung in seinen [Hinweisen zur 32-Bit-Kompatibilität](https://support.apple.com/en-us/103076).

Bei Konsolenspielen kommt die Bindung an eine eigene Plattform hinzu. Die Konsole wird vielleicht nicht mehr hergestellt, das vorhandene Gerät ist defekt oder passende Anschlüsse fehlen. Das Spiel kann weiterhin interessant sein, während der Zugang dazu aufwendiger wird.

Außerdem muss ein Spiel nicht erst kaputtgehen, damit eine Portierung sinnvoll ist. Wer einen Mac oder Linux-Rechner nutzt, möchte möglicherweise einen Titel spielen, für den es dort ursprünglich keine Version gab.

## Wie funktioniert statische Recompilation?

Das Projekt [N64Recomp](https://github.com/N64Recomp/N64Recomp) zeigt den Ablauf an Spielen für das Nintendo 64:

1. **Programmcode zuordnen:** Das Werkzeug erhält den ursprünglichen Maschinencode und zusätzliche Informationen zu dessen Aufbau, etwa zu einzelnen Funktionen.
2. **Befehle übertragen:** Es übersetzt die Maschinenbefehle in entsprechenden C-Code.
3. **Für das Zielsystem kompilieren:** Ein Compiler erzeugt daraus ausführbaren Code für die neue Plattform.

"Statisch" bedeutet hier, dass diese Übersetzung im Voraus erfolgt. Wer einen fertigen Port herunterlädt, muss diese Arbeit normalerweise nicht selbst erledigen.

Damit ist allerdings erst ein Teil der Portierung geschafft. Das Spiel braucht weiterhin Grafik, Ton, Steuerung und die erwarteten Systemfunktionen. Bei N64-Projekten übernimmt beispielsweise [N64ModernRuntime](https://github.com/N64Recomp/N64ModernRuntime) verschiedene Aufgaben der ursprünglichen Systembibliothek. Grafikdarstellung und plattformspezifische Ein- und Ausgabe müssen zusätzlich angebunden werden.

Deshalb kann ein Port nativ auf dem neuen Rechner laufen und zugleich Funktionen der alten Plattform nachbilden.

## Recomp und Emulation – was ist der Unterschied?

Bei der [Emulation](https://oliverjessner.at/category/emulation/) bildet Software die benötigten Eigenschaften einer anderen Plattform nach. Ein Konsolenemulator soll dadurch verschiedene Spiele der jeweiligen Konsole ausführen können. Ein Recomp-Port ist dagegen auf das konkret übertragene Spiel zugeschnitten.

Die Verfahren überschneiden sich technisch. Emulatoren können **dynamische Recompilation** einsetzen: Sie übersetzen Code während der Ausführung und verwenden bereits übersetzte Abschnitte erneut. Dieses Prinzip beschreibt beispielsweise die [Dokumentation des Emulators QEMU](https://www.qemu.org/docs/master/devel/tcg.html).

Der Unterschied zwischen statischer und dynamischer Recompilation liegt damit vor allem im Zeitpunkt der Übersetzung. Daraus allein lässt sich noch nicht ableiten, welche Lösung schneller, genauer oder im Alltag bequemer ist. Dafür zählen die konkrete Umsetzung, das Spiel und die verwendete Hardware.

### Und was bedeutet Decompilation?

Bei der Decompilation wird aus Maschinencode wieder eine Darstellung in einer höheren Programmiersprache rekonstruiert. Gut aufbereiteter Code kann helfen, ein Spiel zu verstehen, zu verändern und zu portieren. Die ursprünglichen Kommentare oder Variablennamen entstehen dabei nicht automatisch wieder.

Eine statische Recompilation kann die Maschinenbefehle dagegen sehr direkt übertragen. Das Ergebnis muss nicht besonders gut lesbar sein. [XenonRecomp](https://github.com/hedge-dev/XenonRecomp), ein Werkzeug für Xbox-360-Spiele, beschreibt genau diesen Ansatz. Erkenntnisse aus Decompilation-Projekten können trotzdem bei Anpassungen und Erweiterungen helfen.

Ein Remake verfolgt wiederum einen anderen Ansatz: Es setzt ein vorhandenes Spiel neu um. Eine Recompilation allein erneuert weder die Grafik noch das Spieldesign.

## Welche Vorteile bringen Recomp-Ports im Alltag?

Der unmittelbare Nutzen ist eine zusätzliche Möglichkeit, ein Spiel auf verfügbarer Hardware zu spielen. Darüber hinaus können Projektteams die Bedienung und Darstellung an heutige Geräte anpassen.

Zwei Beispiele zeigen, wie das aussehen kann:

- **[Zelda 64: Recompiled](https://github.com/Zelda64Recomp/Zelda64Recomp)** überträgt The Legend of Zelda: Majora's Mask auf Windows, Linux und macOS. Das Projekt unterstützt unter anderem hohe Bildraten, breite Bildschirmformate, Mods und eine optionale Kamerasteuerung über den rechten Analogstick.
- **[Banjo: Recompiled](https://github.com/BanjoRecomp/BanjoRecomp)** macht Banjo-Kazooie ebenfalls auf diesen drei Betriebssystemen spielbar. Neben Anpassungen an Darstellung und Steuerung gibt es beispielsweise eine Option, gesammelte Noten beim Verlassen eines Levels oder nach einem Tod zu behalten.

Solche Funktionen entstehen durch zusätzliche Entwicklungsarbeit. Das bloße Übersetzen des Codes garantiert weder höhere Auflösungen noch beliebig hohe Bildraten oder Unterstützung für jeden Controller.

## Kann ich jede Recomp auf macOS oder Linux spielen?

**Entscheidend ist die Unterstützung durch das jeweilige Projekt.** Dass sich erzeugter C- oder C++-Code für unterschiedliche Prozessoren kompilieren lässt, bedeutet noch nicht, dass alle benötigten Bibliotheken und Grafikfunktionen auf jedem Betriebssystem verfügbar sind.

Vor dem Download helfen deshalb drei Fragen:

1. Gibt es eine fertige Version für mein Betriebssystem und meinen Prozessor?
2. Erfüllt mein Rechner die genannten Anforderungen, insbesondere an Grafik und Betriebssystemversion?
3. Welche Originaldateien und welche Ausgabe des Spiels werden benötigt?

**Hinweis zu den Spieldaten:** Die genannten Zelda- und Banjo-Projekte enthalten keine Original-Spieldaten. Sie verlangen eine passende eigene Spielkopie. Laut Projektdokumentation benötigt Zelda 64: Recompiled die nordamerikanische N64-Version von Majora's Mask, Banjo: Recompiled die nordamerikanische Version 1.0 von Banjo-Kazooie. Ein anderer Regionalstand kann deshalb bereits die falsche Grundlage sein.

## Warum Recomp für den Erhalt alter Spiele wichtig ist

Ein Spiel besteht aus mehr als Dateien, die irgendwo gespeichert sind. Zu seinem Erhalt gehört auch die Möglichkeit, seine Regeln, Steuerung und Gestaltung tatsächlich zu erleben. Eine archivierte Kopie hilft dabei nur begrenzt, wenn die passende Umgebung fehlt.

Recompilation kann die Abhängigkeit von einer bestimmten Hardwaregeneration verringern. Ein öffentlich dokumentiertes Projekt schafft außerdem eine Grundlage, auf der andere weiterarbeiten können. Dafür müssen neben dem Code auch Werkzeuge, Bauanleitungen und benötigte Spieldaten erhalten bleiben.

Eine Garantie für dauerhafte Spielbarkeit ist das nicht. Betriebssysteme verändern sich weiter, Bibliotheken altern und auch ein Port braucht Pflege. Für die Bewahrung des ursprünglichen Spielerlebnisses bleiben Originalhardware, Emulation und dokumentierte Originalfassungen ebenfalls wertvoll. Zusätzliche Funktionen sollten als Änderungen erkennbar bleiben.

Das Thema beschäftigt mich auch praktisch: Mit [OpenEmperor](https://github.com/oliverjessner/OpenEmperor) arbeite ich selbst an einer Recompilation von **Emperor: Rise of the Middle Kingdom**. Mein Ziel ist, den Städtebauklassiker langfristig auf moderner Hardware zugänglich zu machen und damit einen eigenen Beitrag zum Erhalt alter Spiele zu leisten. Das Projekt ist noch **Work in Progress**.

Ein Spiel sollte auch dann noch ausprobiert und verstanden werden können, wenn der Computer von damals längst nicht mehr auf dem Schreibtisch steht.
