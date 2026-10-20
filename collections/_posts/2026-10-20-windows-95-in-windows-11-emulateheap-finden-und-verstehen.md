---
layout: post
title: 'Windows 95 in Windows 11: EmulateHeap finden und verstehen'
date: 2026-10-20 09:46:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - computer-stuff
    - gaming
    - emulation
    - software-development
description: 'Windows 11 enthält noch Speicherverwaltungs-Code aus Windows 95. So findest du EmulateHeap und erfährst, was der Kompatibilitätsfix wirklich kann'
thumbnail: '/assets/images/gen/blog/windows-95-in-windows-11-emulateheap-finden-und-verstehen/header_thumbnail.webp'
image: '/assets/images/gen/blog/windows-95-in-windows-11-emulateheap-finden-und-verstehen/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Ist die Speicherverwaltung von Windows 95 noch in Windows 11 enthalten?'
      answer: 'Ja. Windows 11 enthält mit EmulateHeap einen Kompatibilitätsfix, der auf Code des Windows-95-Heap-Managers basiert. Er wird nur bei entsprechend konfigurierten Anwendungen geladen und ersetzt nicht die reguläre Speicherverwaltung von Windows 11.'
    - question: 'Wie finde ich EmulateHeap unter Windows 11?'
      answer: 'EmulateHeap lässt sich über den Compatibility Administrator anzeigen. Das Werkzeug ist Bestandteil der Application Compatibility Tools im kostenlosen Windows Assessment and Deployment Kit (ADK) von Microsoft.'
    - question: 'Kann ich mit EmulateHeap alte Windows-95-Spiele unter Windows 11 starten?'
      answer: 'EmulateHeap kann bestimmte Speicherverwaltungsfehler älterer 32-Bit-Anwendungen umgehen. Es garantiert jedoch keine Kompatibilität. Insbesondere 16-Bit-Windows-Programme lassen sich unter Windows 11 nicht nativ ausführen.'
socialmedia:
    - 'Windows 95 steckt noch in Windows 11. Der Kompatibilitätsfix EmulateHeap zeigt, wie weit Microsoft bei der Abwärtskompatibilität geht. Ich zeige, wo er zu finden ist und was er leistet.'
    - 'Ein Fehler in SimCity hat die Windows-Geschichte mitgeprägt. Noch heute enthält Windows 11 einen Baustein, der altes Speicherverhalten nachbilden kann. Der technische Hintergrund zu EmulateHeap.'
    - 'Alte Windows-Spiele unter Windows 11? EmulateHeap kann bestimmte Speicherprobleme umgehen. Ein Allheilmittel ist der Fix nicht. Entscheidend ist unter anderem, ob ein Spiel 16 oder 32 Bit verwendet.'
news: true
---

Windows 11 enthält noch Code aus der Speicherverwaltung von Windows 95. Der Kompatibilitätsfix EmulateHeap ist auch nach über 30 Jahren vorhanden. So lässt er sich finden und technisch einordnen.

## EmulateHeap – Windows 95 steckt noch in Windows 11

Windows 95 erschien im August 1995. Mehr als drei Jahrzehnte später enthält Windows 11 noch immer einen Teil seiner Speicherverwaltung. Dahinter steckt eine Kompatibilitätsfunktion namens **EmulateHeap**, mit der bestimmte ältere Anwendungen das Speicherverhalten von Windows 95 nutzen können.

Das hat das Technikmagazin [Windows Latest](https://www.windowslatest.com/2026/10/19/why-windows-11-still-ships-with-windows-95s-memory-manager-hidden-inside-it/) im Oktober 2026 anhand von Windows 11 Version 26H2 nachvollzogen. Der entsprechende Code ist nicht nur ein historisches Überbleibsel, sondern kann bei Bedarf tatsächlich ausgeführt werden.

Allerdings bedeutet das nicht, dass Windows 11 grundsätzlich den Speichermanager von Windows 95 verwendet. EmulateHeap ist Bestandteil der Anwendungskompatibilität und wird nur für entsprechend konfigurierte Programme geladen.

Die Funktion ist damit ein interessantes Beispiel dafür, wie Microsoft über Jahrzehnte versucht hat, ältere Software auf neueren Windows-Versionen lauffähig zu halten.

## EmulateHeap in Windows 11 finden

Wer sich die Funktion selbst ansehen möchte, benötigt den **Compatibility Administrator**. Das Werkzeug gehört zum kostenlosen Windows Assessment and Deployment Kit (ADK) von Microsoft.

Die folgenden Schritte zeigen, wie sich EmulateHeap unter Windows 11 finden lässt:

1. Lade das [Windows ADK von Microsoft](https://learn.microsoft.com/en-us/windows-hardware/get-started/adk-install) herunter.
2. Starte die Installation und wähle die Komponente "Application Compatibility Tools" aus. Die übrigen Komponenten werden für diesen Zweck nicht benötigt.
3. Öffne nach der Installation über das Startmenü den "Compatibility Administrator (32-bit)".
4. Klicke im linken Bereich unter "Custom Databases" mit der rechten Maustaste auf "New Database".
5. Wähle "Create New" und anschließend "Compatibility Mode".
6. Suche in der Liste der verfügbaren Kompatibilitätskorrekturen nach "EmulateHeap".

Microsofts ADK-Version vom September 2026 unterstützt Windows 11 26H2 offiziell. Windows Latest konnte den Eintrag mit dieser Version nachweisen.

**Wichtig:** Das Anzeigen von EmulateHeap aktiviert die Funktion nicht automatisch. Der Compatibility Administrator ist ein Verwaltungswerkzeug für anwendungsspezifische Kompatibilitätskorrekturen. Es handelt sich nicht um eine gewöhnliche Windows-Einstellung zur Speicherverwaltung.

Wer lediglich überprüfen möchte, ob der Eintrag vorhanden ist, muss keine eigene Kompatibilitätsdatenbank installieren.

## Warum SimCity für die Windows-Speicherverwaltung wichtig war

Die Geschichte hinter EmulateHeap führt zu einem der bekanntesten Computerspiele der späten 1980er- und frühen 1990er-Jahre: SimCity.

Der ehemalige Microsoft-Entwickler Joel Spolsky beschrieb bereits im Mai 2000 in seinem Artikel [Strategy Letter II: Chicken and Egg Problems](https://www.joelonsoftware.com/2000/05/24/strategy-letter-ii-chicken-and-egg-problems/), wie Microsoft bei der Entwicklung von Windows 95 mit einem Fehler in der Windows-3.x-Version von SimCity umging.

Laut Spolsky hatte ihm der Entwickler Jon Ross erzählt, dass SimCity auf einen bereits freigegebenen Speicherbereich zugriff.

Unter Windows 3.x blieb dieser Fehler unbemerkt, weil sich der Inhalt des betroffenen Speicherbereichs nicht unmittelbar änderte. Während der Entwicklung von Windows 95 führte dasselbe Verhalten jedoch zu Problemen.

Microsoft entschied sich für eine ungewöhnliche Lösung: Statt auf eine korrigierte Version des Spiels zu warten, wurde eine spezielle Behandlung in Windows 95 eingebaut.

Erkannte das Betriebssystem SimCity, wurde die Speicherfreigabe so angepasst, dass das Spiel weiterhin funktionierte.

Für Microsoft war das eine pragmatische Entscheidung. Ein neues Betriebssystem sollte möglichst viele bestehende Anwendungen unterstützen. Gerade populäre Spiele waren ein wichtiger Bestandteil dieser Abwärtskompatibilität.

Die damalige SimCity-Sonderbehandlung ist allerdings nicht mit EmulateHeap gleichzusetzen. Sie steht vielmehr beispielhaft für ein Problem, das Microsoft später mit allgemeineren Kompatibilitätskorrekturen lösen wollte.

## Was macht EmulateHeap technisch?

Um die Funktion zu verstehen, muss man zwischen der gewöhnlichen Speicherverwaltung eines Betriebssystems und dem sogenannten Heap unterscheiden.

Der Heap ist ein Speicherbereich, aus dem Programme während ihrer Laufzeit dynamisch Speicher anfordern können. Wird dieser Speicher nicht mehr benötigt, sollte er wieder freigegeben werden.

Problematisch wird es, wenn Anwendungen nach dieser Freigabe weiterhin auf den Speicher zugreifen.

Ein solcher Programmierfehler wird als **Use-after-free** bezeichnet.

In der [Softwareentwicklung](https://oliverjessner.at/category/software-development/) können daraus Abstürze, beschädigte Daten oder Sicherheitsprobleme entstehen.

Ältere Anwendungen verließen sich teilweise unbeabsichtigt auf bestimmte Eigenschaften der damaligen Speicherverwaltung. Beispielsweise darauf, dass ein freigegebener Speicherbereich noch seinen ursprünglichen Inhalt enthielt oder bei einer späteren Speicheranforderung dieselbe Adresse zurückgegeben wurde.

Unter neueren Windows-Versionen konnten solche Annahmen plötzlich zu Abstürzen führen.

Genau hier setzt EmulateHeap an.

Der Microsoft-Entwickler Raymond Chen erklärte bereits 2010 in seinem Beitrag [A Trip Down Memory Lane with EmulateHeap](<https://learn.microsoft.com/en-us/previous-versions/technet-magazine/ff625273(v=msdn.10)>), dass der Kompatibilitätsfix Funktionen wie `HeapCreate`, `LocalLock` oder `GlobalReAlloc` auf Implementierungen umleitet, die das Verhalten der Windows-95-Speicherverwaltung nachbilden.

Besonders bemerkenswert ist die technische Umsetzung: Microsoft verwendete dafür tatsächlich den Quellcode des ursprünglichen Windows-95-Heap-Managers, kompilierte ihn neu und integrierte ihn in das Framework für Anwendungskompatibilität.

Es handelt sich also nicht ausschließlich um eine moderne Nachbildung des damaligen Verhaltens. Ein erheblicher Teil des historischen Codes wurde direkt wiederverwendet.

EmulateHeap macht Windows 11 dadurch jedoch nicht zu Windows 95. Die Komponente wird nur für Anwendungen geladen, denen diese Korrektur zugewiesen wurde.

## Können Windows-95-Spiele damit unter Windows 11 laufen?

Gerade im [Gaming](https://oliverjessner.at/category/gaming/) ist Abwärtskompatibilität ein interessantes Thema. Viele ältere Spiele wurden für eine Betriebssystemumgebung entwickelt, die sich erheblich von heutigen Windows-Versionen unterscheidet.

EmulateHeap kann bei bestimmten Problemen helfen, löst aber nicht sämtliche Kompatibilitätsprobleme.

Entscheidend ist unter anderem die Architektur der Anwendung:

- **32-Bit-Programme:** Windows 11 kann viele ältere 32-Bit-Anwendungen weiterhin ausführen. EmulateHeap kann dabei bestimmte Fehler im Umgang mit Speicher umgehen.
- **16-Bit-Programme:** Windows 11 unterstützt die direkte Ausführung von 16-Bit-Windows-Anwendungen nicht. Daran ändert auch EmulateHeap nichts.
- **Alte DOS-Spiele:** Diese benötigen häufig eine passende Laufzeitumgebung wie DOSBox.
- **Spiele mit alten Treibern oder Kopierschutzverfahren:** Hier können zusätzliche Inkompatibilitäten auftreten, die nichts mit der Heap-Verwaltung zu tun haben.

Auch bei einem grundsätzlich kompatiblen 32-Bit-Spiel ist EmulateHeap keine Garantie für einen erfolgreichen Start.

Hinzu kommt, dass die Aktivierung von Kompatibilitätskorrekturen das Verhalten einer Anwendung verändert. Solche Eingriffe sollten deshalb gezielt erfolgen und nicht wahllos als allgemeine Problemlösung eingesetzt werden.

Wer alte Windows-Spiele unter Windows 11 verwenden möchte, sollte zunächst nach offiziellen Updates, modernen Neuveröffentlichungen oder einer geeigneten virtuellen Maschine suchen.

## Warum Microsoft alten Code weiterhin mitliefert

Aus technischer Sicht lässt sich die Existenz von EmulateHeap leicht als Altlast interpretieren. Tatsächlich steckt dahinter jedoch eine grundlegende Herausforderung der Betriebssystementwicklung.

Neue Windows-Versionen müssen nicht nur neue Funktionen bereitstellen. Sie sollen nach Möglichkeit auch Software unterstützen, die für deutlich ältere Versionen entwickelt wurde.

Dabei sind nicht ausschließlich dokumentierte Programmierschnittstellen relevant. Manche Anwendungen sind unbeabsichtigt von Implementierungsdetails abhängig, die eigentlich nie als feste Eigenschaften vorgesehen waren.

Ändert Microsoft dieses Verhalten, kann eine Anwendung plötzlich nicht mehr funktionieren, obwohl sie unter ihrem ursprünglichen Betriebssystem jahrelang problemlos lief.

Kompatibilitätskorrekturen schaffen hier einen Mittelweg. Windows kann seine reguläre Speicherverwaltung weiterentwickeln und bei Bedarf gezielt ältere Verhaltensweisen für einzelne Programme bereitstellen.

EmulateHeap ist deshalb mehr als eine technische Kuriosität.

Dass ein Bestandteil der Speicherverwaltung von Windows 95 noch in Windows 11 vorhanden ist, zeigt vor allem, wie langfristig Entscheidungen bei der Entwicklung weitverbreiteter Betriebssysteme wirken können.

Ein Programmierfehler aus den frühen 1990er-Jahren kann damit noch mehr als 30 Jahre später erklären, warum moderner Betriebssystemcode eine historische Ausnahme enthält.
