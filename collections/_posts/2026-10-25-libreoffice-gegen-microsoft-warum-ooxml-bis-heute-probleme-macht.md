---
layout: post
title: 'LibreOffice gegen Microsoft: Warum OOXML bis heute Probleme macht'
date: 2026-10-25 14:07:00 +0200
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - microsoft
    - software-engineering
    - computer-stuff
    - Gesellschaft
description: 'LibreOffice kritisiert Microsofts OOXML-Standardisierung. Der Streit zeigt, warum DOCX, XLSX und PPTX bis heute nicht ganz unkompliziert sind'
thumbnail: '/assets/images/gen/blog/libreoffice-gegen-microsoft-warum-ooxml-bis-heute-probleme-macht/header_thumbnail.webp'
image: '/assets/images/gen/blog/libreoffice-gegen-microsoft-warum-ooxml-bis-heute-probleme-macht/header.webp'
image_width: 1280
image_height: 720
faq:
    - question: 'Was ist OOXML?'
      answer: 'Office Open XML, kurz OOXML, ist eine Familie von Dateiformaten für Textdokumente, Tabellen und Präsentationen. Dazu gehören unter anderem DOCX, XLSX und PPTX. OOXML ist als ISO/IEC 29500 standardisiert.'
    - question: 'Was kritisiert LibreOffice an Microsoft und OOXML?'
      answer: 'The Document Foundation kritisiert unter anderem den Standardisierungsprozess von OOXML und die starke Verbreitung der Transitional-Variante. Sie sieht darin ein Hindernis für echte Interoperabilität zwischen Office-Programmen.'
    - question: 'Was ist der Unterschied zwischen OOXML und ODF?'
      answer: 'OOXML stammt ursprünglich von Microsoft und wird vor allem mit Microsoft Office verbunden. ODF ist ein offener Dokumentenstandard, der unter anderem das Standardformat von LibreOffice bildet.'
socialmedia:
    - 'DOCX, XLSX und PPTX wirken wie normale Dateiformate. Hinter OOXML steckt jedoch ein fast 20 Jahre alter Streit über Standards, Kompatibilität und Microsoft Office.'
    - 'Warum funktionieren DOCX-Dateien außerhalb von Microsoft Office manchmal nicht perfekt? Ein Teil der Antwort steckt in der komplizierten Geschichte des OOXML-Standards.'
    - 'LibreOffice kritisiert erneut Microsofts OOXML-Standardisierung. Interessanter als der alte Streit ist, was er heute über offene Standards und digitale Abhängigkeiten zeigt.'
news: true
---

DOCX, XLSX und PPTX sind heute selbstverständlich. Doch hinter Microsofts Office-Formaten steckt ein fast 20 Jahre alter Streit über offene Standards, Interoperabilität und die Frage, wie offen ein Dateiformat wirklich sein kann.

## LibreOffice kritisiert Microsofts OOXML-Standardisierung

Wer heute ein Word-Dokument speichert, denkt vermutlich nicht lange über das Dateiformat nach. DOCX ist ebenso selbstverständlich geworden wie XLSX für Excel oder PPTX für PowerPoint.

Technisch gehören diese Formate zu Office Open XML, kurz OOXML. OOXML ist inzwischen ein internationaler Standard unter der Bezeichnung ISO/IEC 29500.

Genau diese Standardisierung kritisiert The Document Foundation, die Organisation hinter LibreOffice, erneut deutlich. In einem aktuellen Beitrag zeichnet sie die Geschichte von OOXML zwischen 2006 und 2008 nach und erhebt schwere Vorwürfe gegen den damaligen Prozess.

Dabei geht es nicht nur um einen beinahe 20 Jahre alten Streit zwischen LibreOffice und [Microsoft](https://oliverjessner.at/category/microsoft/). Die Geschichte ist auch deshalb interessant, weil ihre technischen Folgen bis heute beim Austausch von Office-Dokumenten sichtbar werden können.

## Was ist OOXML überhaupt?

OOXML steht für "Office Open XML".

Das Format wurde von Microsoft entwickelt, um die älteren binären Office-Formate DOC, XLS und PPT abzulösen. Statt eines einzigen proprietären Binärformats bestehen moderne Office-Dateien im Kern aus mehreren XML-Dateien und weiteren Ressourcen, die gemeinsam in einem ZIP-Container gespeichert werden.

Deshalb lässt sich beispielsweise eine DOCX-Datei technisch auch als ZIP-Archiv öffnen.

Zu OOXML gehören unter anderem:

- `.docx` für Word-Dokumente
- `.xlsx` für Excel-Tabellen
- `.pptx` für PowerPoint-Präsentationen

Das grundlegende Konzept ist nicht ungewöhnlich. Auch andere Dokumentenformate arbeiten mit strukturierten Dateien innerhalb eines Containers.

Problematisch wurde weniger die technische Grundidee als die Frage, wie aus Microsofts Format ein internationaler Standard wurde und welche Variante dieses Standards Microsoft Office anschließend tatsächlich verwendete.

## Der Konflikt begann mit einem anderen offenen Standard

Eine wichtige Rolle spielt dabei das OpenDocument Format, kurz ODF.

ODF wurde als offener Standard für Textdokumente, Tabellen und Präsentationen entwickelt und 2006 als ISO/IEC 26300 standardisiert. LibreOffice verwendet ODF bis heute als natives Dateiformat.

Dazu gehören beispielsweise:

- `.odt` für Textdokumente
- `.ods` für Tabellen
- `.odp` für Präsentationen

Microsoft setzte dagegen auf das eigene OOXML.

Besondere politische Bedeutung bekam die Frage 2006. Der US-Bundesstaat Massachusetts wollte für öffentliche Dokumente auf ODF setzen, unter anderem um langfristig unabhängiger von einzelnen Softwareanbietern zu werden.

Microsofts OOXML-Spezifikation wurde anschließend über Ecma International bei ISO/IEC eingereicht.

Und genau hier beginnt der Teil der Geschichte, den The Document Foundation heute erneut kritisiert.

## 6.000 Seiten im Fast-Track-Verfahren

Ecma International reichte OOXML im Dezember 2006 über das sogenannte Fast-Track-Verfahren bei ISO/IEC ein.

Das Verfahren ermöglicht es, bereits außerhalb von ISO entwickelte Spezifikationen vergleichsweise schnell als internationalen Standard prüfen zu lassen.

OOXML war allerdings alles andere als klein.

Die damals eingereichte Spezifikation umfasste rund 6.000 Seiten.

Im September 2007 erreichte der Entwurf zunächst nicht die notwendigen Mehrheiten. ISO dokumentierte damals 3.500 eingegangene Kommentare zum Standard.

Es folgte ein sogenanntes Ballot Resolution Meeting im Februar 2008 in Genf. Dabei sollten technische Einwände gegen den Entwurf behandelt werden.

Nach weiteren Abstimmungen erhielt OOXML schließlich die erforderliche Zustimmung. Am 2. April 2008 teilte ISO mit, dass die Kriterien für die Annahme erfüllt worden waren.

75 Prozent der abstimmenden Mitglieder des zuständigen JTC-1-Gremiums votierten zu diesem Zeitpunkt dafür. 14 Prozent der abgegebenen Stimmen der nationalen Mitgliedsorganisationen waren negativ.

OOXML wurde anschließend als ISO/IEC 29500 veröffentlicht.

## Die Document Foundation erhebt schwere Vorwürfe

Über diese offiziellen Eckdaten hinaus beschreibt The Document Foundation den damaligen Prozess deutlich kritischer.

Nach ihrer Darstellung kam es in mehreren nationalen Normungsgremien während des Verfahrens zu einem ungewöhnlich starken Zuwachs an Mitgliedern.

Für Italien nennt die Organisation beispielsweise einen Anstieg von fünf auf mehr als 80 Teilnehmer. Darunter seien Microsoft-Geschäftspartner sowie eine PR-Agentur und eine Anwaltskanzlei gewesen, die für Microsoft gearbeitet hätten.

Auch aus Portugal und anderen Ländern wurden damals Konflikte rund um die Zusammensetzung und Abstimmungen der zuständigen Gremien berichtet.

The Document Foundation bezeichnet den Standardisierungsprozess deshalb als grundlegend fehlerhaft und spricht ausdrücklich von Manipulation.

Das ist eine weitreichende Bewertung und sollte auch als solche eingeordnet werden. Dass der OOXML-Prozess kontrovers verlief, ist dokumentiert. Die Aussage, Microsoft habe den Standardisierungsprozess manipuliert, ist dagegen die Schlussfolgerung der Document Foundation und nicht einfach gleichbedeutend mit der offiziellen Position von ISO.

## Der technische Knackpunkt heißt "Transitional"

Für heutige Nutzer ist ein anderer Aspekt wahrscheinlich wichtiger als die damaligen Abstimmungen.

ISO/IEC 29500 unterscheidet zwischen unterschiedlichen Konformitätsvarianten von OOXML.

Besonders relevant sind "Strict" und "Transitional".

Die Transitional-Variante enthält Funktionen, die vor allem dazu dienen, ältere Microsoft-Office-Dokumente möglichst originalgetreu in das neue Format zu übertragen.

ISO beschreibt diese Funktionen ausdrücklich als Übergangsmechanismen zur Migration bestehender Dokumente.

Neue Dokumente sollten diese Funktionen laut der Beschreibung des Standards grundsätzlich nicht benötigen.

Microsoft Office 2010 verwendete trotzdem standardmäßig OOXML Transitional zum Lesen und Schreiben. Strict konnte Office 2010 lediglich lesen.

Erst Office 2013 unterstützte auch das Schreiben der Strict-Variante.

Damit entstand eine interessante Situation: Es gab einen standardisierten, strengeren OOXML-Kern, während im praktischen Office-Alltag lange eine stark auf Abwärtskompatibilität ausgerichtete Variante dominierte.

## Warum DOCX in LibreOffice manchmal anders aussieht

Genau hier wird der historische Streit plötzlich praktisch.

Eine DOCX-Datei ist nicht automatisch trivial zu reproduzieren, nur weil ihre grundlegende Struktur dokumentiert ist.

Ein Dokument kann Funktionen, Layoutinformationen, Schriften, ältere Kompatibilitätsmechanismen und programmspezifisches Verhalten enthalten.

Alternative Office-Suiten müssen dieses Verhalten möglichst genau nachbilden.

Das betrifft etwa:

- Seitenumbrüche
- Schriftmetriken
- Tabellen
- Formeln
- Diagramme
- eingebettete Objekte
- komplexe Formatvorlagen
- ältere Office-Kompatibilitätsfunktionen

Deshalb kann ein Dokument in Microsoft Word anders aussehen als in LibreOffice, obwohl beide Programme grundsätzlich DOCX unterstützen.

Das bedeutet allerdings nicht automatisch, dass jede Abweichung auf OOXML Transitional zurückzuführen ist.

Auch unterschiedliche Schriftarten, Rendering-Engines oder nicht vollständig unterstützte Office-Funktionen können eine Rolle spielen.

Gerade aus Sicht des [Software Engineering](https://oliverjessner.at/category/software-engineering/) zeigt OOXML damit ein grundsätzliches Problem bei Standards: Eine veröffentlichte Spezifikation allein garantiert noch keine perfekte Interoperabilität.

## OOXML ist trotzdem ein ISO-Standard

Bei der Diskussion sollte ein wichtiger Punkt nicht verloren gehen.

OOXML ist heute tatsächlich ein internationaler Standard.

ISO/IEC 29500 definiert XML-basierte Formate für Textverarbeitung, Tabellen und Präsentationen. Die aktuelle ISO-Dokumentation beschreibt ausdrücklich das Ziel, Implementierungen durch verschiedene Hersteller und auf unterschiedlichen Plattformen zu ermöglichen.

Auch Transitional ist nicht einfach eine proprietäre Microsoft-Erweiterung außerhalb des Standards.

ISO/IEC 29500-4 definiert weiterhin Transitional Migration Features. Sie sollen insbesondere die möglichst verlustfreie Migration älterer Office-Dokumente ermöglichen.

Die Kritik der Document Foundation richtet sich daher weniger gegen die Behauptung, OOXML besitze überhaupt keinen Standardstatus.

Im Kern geht es um die Entstehung dieses Standards, seine Komplexität und darum, welche Teile davon in der Praxis dominieren.

## ODF und OOXML verfolgen unterschiedliche historische Ziele

Der Vergleich zwischen ODF und OOXML ist deshalb ebenfalls komplizierter als "offen gegen geschlossen".

OOXML musste eine enorme Menge bestehender Microsoft-Office-Dokumente und historischer Funktionen berücksichtigen.

Genau das nennt ISO bis heute als eines der Ziele des Standards: Dokumente aus älteren Microsoft-Office-Versionen möglichst originalgetreu darstellen zu können.

Diese Abwärtskompatibilität hat einen Preis.

Ein Format, das Jahrzehnte historischer Softwareentscheidungen berücksichtigen muss, wird zwangsläufig komplexer.

ODF konnte stärker von einem einheitlichen, herstellerübergreifenden Dokumentenmodell ausgehen.

Damit verfolgen beide Standards teilweise unterschiedliche Prioritäten.

Für Nutzer ist das zunächst wenig relevant. Für Softwarehersteller, Behörden und Organisationen, die Dokumente über Jahrzehnte archivieren müssen, kann dieser Unterschied dagegen entscheidend sein.

## Warum der Streit heute noch relevant ist

Man könnte die Diskussion als historischen Browserkrieg für Bürosoftware betrachten.

Ganz so einfach ist es aber nicht.

Dokumentenformate gehören zu jener technischen Infrastruktur, die man meistens erst bemerkt, wenn sie nicht funktioniert.

Millionen Unternehmen, Behörden, Schulen und Privatpersonen speichern Informationen in DOCX-, XLSX- und PPTX-Dateien.

Damit bekommt die Frage nach Standards eine gesellschaftliche Dimension.

Wer Dokumente über Jahrzehnte speichern möchte, ist darauf angewiesen, dass zukünftige Programme diese Dateien noch zuverlässig lesen können.

Wer Office-Software wechseln möchte, braucht Formate, die auch außerhalb der ursprünglichen Anwendung funktionieren.

Und öffentliche Verwaltungen müssen sich zusätzlich fragen, wie stark ihre Dokumenteninfrastruktur von einzelnen Herstellern abhängig sein soll.

Genau deshalb taucht in dieser Debatte häufig der Begriff digitale Souveränität auf.

## Ein offener Standard löst nicht automatisch alle Probleme

Die Geschichte von OOXML zeigt aber auch, dass die Bezeichnung "offener Standard" allein wenig darüber aussagt, wie interoperabel ein Format in der Praxis tatsächlich ist.

Entscheidend sind mehrere Ebenen:

1. Ist die Spezifikation öffentlich dokumentiert?
2. Können andere Hersteller sie ohne besondere Einschränkungen implementieren?
3. Ist die Spezifikation technisch realistisch vollständig umsetzbar?
4. Verwenden dominante Anwendungen tatsächlich die standardisierten Funktionen?
5. Verhalten sich verschiedene Implementierungen bei denselben Dokumenten identisch?

Gerade der letzte Punkt ist schwierig.

Ein Dateiformat kann formal offen sein und trotzdem so komplex werden, dass vollständige Kompatibilität für kleinere Projekte enorm aufwendig ist.

Umgekehrt garantiert auch ein technisch eleganter Standard nicht automatisch, dass er sich am Markt durchsetzt.

Standards sind deshalb nie ausschließlich technische Dokumente. Sie sind auch das Ergebnis wirtschaftlicher Interessen, bestehender Software, historischer Entscheidungen und Marktmacht.

## Für Nutzer bleibt DOCX trotzdem der praktische Standard

Aus praktischer Sicht ändert die aktuelle Kritik der Document Foundation zunächst wenig.

Wer regelmäßig Dokumente mit Microsoft-Office-Nutzern austauscht, wird häufig weiterhin DOCX, XLSX oder PPTX verwenden müssen.

LibreOffice unterstützt diese Formate inzwischen umfangreich. Bei komplexen Dokumenten können Unterschiede jedoch weiterhin auftreten.

Wer dagegen Dokumente langfristig archivieren oder innerhalb einer vollständig kontrollierten Infrastruktur austauschen möchte, kann ODF als Alternative in Betracht ziehen.

Es gibt deshalb nicht für jeden Anwendungsfall das eine richtige Dokumentenformat.

Für den Alltag zählt oft Kompatibilität mit anderen Menschen.

Für Archive zählt langfristige Lesbarkeit.

Für Behörden kann Herstellerunabhängigkeit wichtig sein.

Und für Softwareentwickler zählt eine möglichst eindeutig implementierbare Spezifikation.

## OOXML ist mehr als nur DOCX

Der erneute Angriff der Document Foundation auf Microsoft wirkt auf den ersten Blick wie die Fortsetzung eines sehr alten Konflikts.

Interessant daran ist aber weniger die Frage, welche Seite nach fast 20 Jahren noch recht behalten möchte.

Die Geschichte von OOXML zeigt vielmehr, wie technische Standards entstehen und warum ihre Entstehung später reale Konsequenzen haben kann.

Microsofts Office-Formate wurden zum weltweiten De-facto-Standard für Bürodokumente. Gleichzeitig existiert mit ISO/IEC 29500 eine umfangreiche formale Standardisierung dieser Formate.

Beides bedeutet aber nicht automatisch, dass jedes DOCX-Dokument überall identisch dargestellt wird.

Genau darin steckt die eigentlich interessante Lektion des OOXML-Streits.

Ein Standard kann offen dokumentiert, international normiert und weltweit verbreitet sein und trotzdem weiterhin erhebliche Komplexität mit sich bringen.

Für die meisten Nutzer bleibt diese Geschichte unsichtbar.

Bis sie ein DOCX mit LibreOffice öffnen und plötzlich eine Tabelle an der falschen Stelle steht.
