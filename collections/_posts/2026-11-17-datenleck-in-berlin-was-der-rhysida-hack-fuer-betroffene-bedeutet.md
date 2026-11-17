---
layout: post
title: 'Datenleck in Berlin: Was der Rhysida-Hack für Betroffene bedeutet'
date: 2026-11-17 08:12:03 +0100
authors:
  - oliver_jessner
meta_og_type: article
categories:
  - Privacy
  - computer-stuff
  - Gesellschaft
description: 'Beim Berliner Datenleck geht es um mehr als gestohlene Dateien: Warum die Auswertung dauert und worauf Betroffene jetzt achten sollten'
thumbnail: /assets/images/gen/blog/datenleck-in-berlin-was-der-rhysida-hack-fuer-betroffene-bedeutet/header_thumbnail.webp
image: /assets/images/gen/blog/datenleck-in-berlin-was-der-rhysida-hack-fuer-betroffene-bedeutet/header.webp
faq:
  - question: Was ist beim Rhysida-Hack in Berlin passiert?
    answer: Angreifer kopierten im August 2026 Daten aus der Berliner Verwaltung. Nach einer erfolglosen Erpressung wurden gestohlene Dateien am 4. September im Darknet veröffentlicht.
  - question: Wer kann vom Berliner Datenleck betroffen sein?
    answer: Neben Beschäftigten der betroffenen Verwaltungen können auch Bürger, Unternehmen und andere Organisationen betroffen sein, deren Informationen in den gestohlenen Dateien enthalten sind.
  - question: Wo erhalten mögliche Betroffene Informationen?
    answer: Das Land Berlin bündelt Informationen und Kontaktstellen auf berlin.de/cyberangriff. Für Datenschutzanliegen gibt es eigene Anlaufstellen der beiden betroffenen Senatsverwaltungen.
socialmedia:
  - Der Rhysida-Hack in Berlin betrifft mehr als die Verwaltung. Auch frühere E-Mails und ausgetauschte Dokumente können für Bürger und Unternehmen zum Risiko werden. Was bisher bekannt ist und wo Betroffene Informationen finden.
  - Mehr als fünf Terabyte gestohlene Daten lassen sich nicht einfach durchsuchen und abhaken. Der Berliner Rhysida-Leak zeigt, warum Dateiformate, Archive und fehlender Kontext die Auswertung erschweren.
  - Ein beendeter Cyberangriff beendet nicht die Folgen eines Datenlecks. Beim Berliner Rhysida-Hack bleiben veröffentlichte Informationen ein Risiko, etwa für gezieltes Phishing.
news: true
pinned: false
ads: true
image_width: 1280
image_height: 720
---

Nach dem Rhysida-Hack liegen Millionen Dateien aus der Berliner Verwaltung im Darknet. Die Folgen reichen über Behörden hinaus: Auch Bürger und Unternehmen müssen mit dem Missbrauch ihrer Daten rechnen.

## Was beim Datenleck in Berlin passiert ist

Im August 2026 wurden Daten aus zwei Berliner Senatsverwaltungen gestohlen: aus der Verwaltung für Mobilität, Verkehr, Klimaschutz und Umwelt sowie aus der Verwaltung für Stadtentwicklung, Bauen und Wohnen.

Der wesentliche Datenabfluss fand nach bisherigen Erkenntnissen vom 7. bis 12. August statt. Die Angreifergruppe Rhysida verlangte anschließend Lösegeld. Berlin zahlte nicht. Am 4. September 2026 veröffentlichten die Täter gestohlene Daten im Darknet. Diese Eckpunkte bestätigt die [offizielle Informationsseite des Landes Berlin](https://www.berlin.de/cyberangriff/informationen-fuer-buergerinnen-und-buerger/).

Bei der Größenordnung muss man zwischen Täterangaben und unabhängiger Sichtung unterscheiden. Rhysida nennt 5,79 Terabyte und rund 1,44 Millionen Dateien. Der Sicherheitsdienstleister NSIDE ATTACK LOGIC berichtet nach eigener Auswertung von 5,25 Terabyte und etwa 1,431 Millionen Dateien. Abweichungen können laut dem Unternehmen durch unvollständige Downloads oder Änderungen am bereitgestellten Bestand entstehen.

Diese Zahlen stammen aus einem [iX-Interview mit dem Sicherheitsexperten Sascha Herzog](https://www.heise.de/news/Berliner-Daten-GAU-Wie-man-einen-Leak-seziert-11524771.html). Sie beschreiben den untersuchten Datenbestand, nicht die Zahl betroffener Menschen.

## Welche Daten betroffen sind

Laut Berlin handelt es sich überwiegend um unstrukturierte Dateien aus persönlichen und gemeinsam genutzten Verzeichnissen. Gemeint sind beispielsweise abgelegte Dokumente und Korrespondenz, nicht die Datenbestände bestimmter Fachanwendungen. Betroffen sein können auch Informationen über Bürger und Unternehmen. Die Behörden verweisen weiterhin auf die laufende Prüfung einzelner Inhalte. [Quelle: Land Berlin](https://www.berlin.de/cyberangriff/informationen-fuer-buergerinnen-und-buerger/)

Herzog berichtet im iX-Interview von sensiblen Unterlagen und Informationen zu kritischer Infrastruktur. Zugleich warnt er davor, die Beschreibungen der Täter ungeprüft zu übernehmen. Ob ein Dokument tatsächlich sicherheitsrelevant ist, lässt sich häufig erst mit Fachwissen und Kenntnis des jeweiligen Vorgangs beurteilen.

Für den [Datenschutz](https://oliverjessner.at/category/Privacy/) reicht der Blick auf die unmittelbar angegriffenen Behörden deshalb nicht aus. Wer Dokumente an eine Verwaltung geschickt hat oder in deren E-Mail-Verkehr vorkommt, kann ebenfalls betroffen sein.

## Warum die Analyse des Rhysida-Leaks so lange dauert

Ein Datenleck dieser Größe besteht aus vielen unterschiedlichen Formaten. Eine Textsuche allein erfasst weder sämtliche gescannten Dokumente noch automatisch den Inhalt jedes Archivs.

NSIDE ATTACK LOGIC sucht nach eigener Darstellung unter anderem nach E-Mail-Domains, Projektnamen und kundenspezifischen Begriffen. Passende Dateien werden priorisiert und anschließend zur weiteren Bewertung zusammengestellt.

Dabei bleiben Lücken: Texterkennung kommt nur bei ausgewählten gescannten PDFs zum Einsatz. Auch Archive werden nicht vollständig entpackt und untersucht. Ein erfolgloser Suchlauf belegt deshalb nicht, dass keine relevanten Informationen vorhanden sind.

Die technische Suche beantwortet außerdem nur einen Teil der Fragen. Ein Treffer zeigt zunächst, dass ein Begriff vorkommt. Ob daraus ein konkretes Risiko entsteht, müssen Menschen mit dem nötigen Kontext prüfen.

### KI hilft beim Sortieren, braucht aber Kontrolle

Der Dienstleister nutzt lokal betriebene Sprachmodelle zur Vorbewertung. Laut Herzog sind deren Ergebnisse nur teilweise hilfreich. Im Interview nennt er ein Dokument, das wegen des Wortes "geheim" als geheimschutzrelevant eingestuft wurde. Der Begriff allein belegt eine solche Einstufung jedoch nicht.

Das Beispiel zeigt die Grenze automatischer Bewertungen: Auffällige Wörter können eine Prüfung anstoßen. Die Bedeutung eines Dokuments ergibt sich erst aus seinem Inhalt, seiner Herkunft und seinem Verwendungszweck.

## Warum alte E-Mails neue Angriffe ermöglichen

Für gezieltes Phishing sind nicht nur Passwörter interessant. Auch frühere Nachrichten, bekannte Ansprechpartner und echte Projektnamen können helfen, betrügerische E-Mails glaubwürdig erscheinen zu lassen.

Eine Nachricht kann dadurch zu einem laufenden Vorgang passen und vertraute Details enthalten. Das macht eine ungewöhnliche Zahlungsaufforderung oder einen zugesandten Link noch nicht vertrauenswürdig.

**Wichtig:** Vertraute Inhalte sind kein verlässlicher Echtheitsnachweis. Ungewöhnliche Anfragen sollten über einen bereits bekannten Kontaktweg geprüft werden, beispielsweise telefonisch über eine gespeicherte Nummer.

Herzog empfiehlt Unternehmen im Interview außerdem, offengelegte Informationen über ihre IT-Infrastruktur zu prüfen und gegebenenfalls weitere Beteiligte eines betroffenen E-Mail-Austauschs zu informieren.

## Was Betroffene jetzt tun können

Eine eigene Suche im veröffentlichten Datenbestand ist kein sinnvoller erster Schritt. Sie würde sensible Informationen weiterverarbeiten und kann zusätzliche technische Risiken mit sich bringen. Herzog empfiehlt selbst für die professionelle Sichtung eine isolierte Analyseumgebung.

Praktischer sind diese Schritte:

1. **Offizielle Informationen prüfen:** Das [Informationsportal zum Cyberangriff](https://www.berlin.de/cyberangriff/informationen-fuer-buergerinnen-und-buerger/) bündelt Hinweise und zuständige Kontaktstellen.
2. **Frühere Behördenkontakte einordnen:** Unternehmen können intern klären, welche Projekte, Ansprechpartner und Dokumente mit den betroffenen Verwaltungen verbunden waren.
3. **Beschäftigte gezielt informieren:** Besonders relevant sind unerwartete Nachrichten, die sich auf echte Vorgänge beziehen.
4. **Bei bestätigten Funden reagieren:** Welche Maßnahmen nötig sind, hängt vom Inhalt ab. Offengelegte Zugangsdaten erfordern andere Schritte als veröffentlichte Vertragsunterlagen.

Für Datenschutzanliegen nennt Berlin folgende Adressen:

- Stadtentwicklung, Bauen und Wohnen: [datenschutzvorfall@senstadt.berlin.de](mailto:datenschutzvorfall@senstadt.berlin.de)
- Mobilität, Verkehr, Klimaschutz und Umwelt: [datenschutzvorfall@senmvku.berlin.de](mailto:datenschutzvorfall@senmvku.berlin.de)

Bei konkreten Hinweisen auf Betrug oder Identitätsmissbrauch empfiehlt das Land eine Strafanzeige. Die Kontaktangaben und Hinweise stehen auf der [offiziellen Informationsseite](https://www.berlin.de/cyberangriff/informationen-fuer-buergerinnen-und-buerger/).

## Beendeter Angriff, anhaltende Folgen

Am 16. Oktober 2026 meldete Berlin, dass die akute Gefahrenabwehr beendet sei. Laut Senatskanzlei gab es seit dem 13. August keine weiteren Angriffe auf die untersuchten Bereiche; eine nachhaltige Infiltration sei nicht gelungen. Die Auswertung der gestohlenen Daten läuft dennoch weiter. [Quelle: Berlin.de](https://www.berlin.de/aktuelles/10700588-958090-nach-hackerangriff-akute-gefaehrdung-fue.html)

Für Betroffene sind das zwei unterschiedliche Zeithorizonte. Die angegriffenen Systeme lassen sich absichern. Bereits veröffentlichte Informationen können dagegen auch später für Täuschungsversuche verwendet werden.

Entscheidend bleibt deshalb, konkrete Funde verständlich einzuordnen und Betroffene gezielt zu informieren. Die Größe des Leaks beschreibt den Umfang der Aufgabe. Was er für einzelne Menschen oder Unternehmen bedeutet, zeigt sich erst bei der sorgfältigen Prüfung ihrer Daten.
