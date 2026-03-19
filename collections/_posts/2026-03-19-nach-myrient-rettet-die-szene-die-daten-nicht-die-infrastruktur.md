---
layout: post
title: 'Nach Myrient rettet die Szene die Daten, nicht die Infrastruktur'
date: 2026-03-19 08:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - gaming
    - emulation
    - Gesellschaft
description: 'Die Szene spiegelt Myrient vollständig, doch Torrents machen das gerettete Archiv sichtbar, störbar und rechtlich fragil'
thumbnail: '/assets/images/gen/blog/nach-myrient-rettet-die-szene-die-daten-nicht-die-infrastruktur/header_thumbnail.webp'
image: '/assets/images/gen/blog/nach-myrient-rettet-die-szene-die-daten-nicht-die-infrastruktur/header.webp'
faq:
    - question: 'Warum sind Torrents keine stabile Lösung für digitale Bewahrung?'
      answer: 'Weil BitTorrent zwar Last verteilt, aber weder Sichtbarkeit noch Störbarkeit oder rechtliche Risiken beseitigt. Gerade seltene Inhalte können in öffentlichen Schwärmen schnell an Verfügbarkeit verlieren.'
    - question: 'Was machte Myrient für die Retrospiel-Szene so besonders?'
      answer: 'Myrient verband breite Abdeckung mit verifizierten Dateien und einem vergleichsweise direkten Zugang ohne Werbemüll, Kontozwang oder künstliche Wartezeiten. Genau diese kuratierte Zugriffsschicht ist schwer zu ersetzen.'
    - question: 'Ist ein geretteter Datenbestand schon ein dauerhaftes Archiv?'
      answer: 'Nein. Ein gespiegelter Bestand sichert zunächst nur die Daten. Für ein stabiles Archiv braucht es zusätzlich verlässliche Finanzierung, dokumentierte Kuratierung, dauerhafte Zugänge und eine tragfähige Infrastruktur.'
---

Mit Myrient verschwindet zum 31. März 2026 ein zentrales Archiv für Retrospiele aus dem offenen Netz. Der Betreiber nennt ausbleibende Finanzierung, steigende Infrastrukturkosten und missbräuchliche Download-Manager als Gründe. Nach eigenen Angaben lagen die Ausgaben zuletzt bei mehr als 6.000 US-Dollar im Monat.

Gleichzeitig meldet die SaveMyrient-Community, das Archiv sei vollständig gespiegelt und validiert, Torrents würden vorbereitet. Das klingt nach Rettung. Tatsächlich ist es nur eine Verschiebung des Problems.

Die Daten sind damit nicht verloren, aber sie landen in einer Infrastruktur mit anderen Schwächen. BitTorrent verteilt Last und Verantwortung. Es beseitigt weder Überwachung noch Störung noch die rechtlichen Risiken öffentlicher Verbreitung. https://t.me/s/myrient/107

## Warum Myrient mehr war als nur ein Mirror

Myrient war nicht nur irgendeine ROM-Sammlung. Der Dienst kombinierte Eigenschaften, die in dieser Szene selten zusammenfallen: breite Abdeckung, verifizierte Dateien und einen Zugang ohne Werbemüll, Kontozwang oder künstliche Wartezeiten.

Nach eigener Darstellung wurden Inhalte vor der Aufnahme gegen Prüfsummen bekannter Referenzprojekte wie No-Intro, Redump oder TOSEC abgeglichen. Diese Kombination machte die Seite für Sammler, Modder und Forschende interessant.

Wer eine obskure Revision oder eine kaum noch erhältliche Diskettenversion suchte, bekam nicht nur irgendeine Kopie, sondern meist eine einordenbare, reproduzierbare Fassung. Das ist der eigentliche Verlust.

Fällt ein solcher Knoten weg, verschwindet nicht bloß Bequemlichkeit. Es verschwindet eine kuratierte Zugriffsschicht auf Material, das andernorts oft verstreut, langsam oder gar nicht mehr verfügbar ist. Damit stellt sich sofort die Frage, wer diese Funktion überhaupt ersetzen kann.

## Rettung aus der Community

Die Rettungsaktion zeigt zugleich die Stärke und die Schwäche informeller Bewahrung. Freiwillige organisierten verteilte Downloads, teilten Sammlungen auf, kontrollierten Prüfsummen und bauten mit Minerva bereits eine neue Oberfläche für Suche und Dateizugriff.

Aus den öffentlichen Angaben lässt sich ablesen, dass die Gruppe nicht nur möglichst viel kopieren wollte. Sie versucht, Integrität nachzuweisen und die spätere Verteilung planbar zu machen. Das ist mehr als blinder Datensog.

Aber es bleibt eine Ad-hoc-Operation. Es gibt keine belastbare Institution im Hintergrund, keine gesicherte Finanzierung, keine öffentliche Rechenschaft und bislang auch keine Garantie, wie dauerhaft die neuen Zugänge sein werden.

Wer digitale Erhaltung ernst nimmt, sollte diesen Unterschied nicht kleinreden. Ein geretteter Datenbestand ist noch kein stabiles Archiv. Genau deshalb führt der nächste Schritt fast zwangsläufig zu der Frage, warum ausgerechnet Torrents nun als Ausweg gelten.

## Warum jetzt Torrents

Die Wahl von BitTorrent ist technisch naheliegend. Ein zentraler Server trägt Bandbreite, Caching, Storage und Missbrauchsschutz allein. Ein Schwarm verteilt diese Last auf die Teilnehmenden.

Wer herunterlädt, kann zugleich hochladen. Mit trackerlosen Torrents lässt sich die Peer-Suche zudem über die verteilte Hash-Tabelle organisieren; im Standard wird jeder Peer damit ein kleines Stück Infrastruktur.

Für eine Community, die gerade erlebt hat, wie teuer zentrale Auslieferung wird, wirkt das wie die logische Korrektur des alten Modells. Auch Minerva begründet den Schritt offen mit geringeren Bandbreitenkosten.

Der Haken steht allerdings schon im Material des früheren Betreibers selbst: Direkte Downloads garantierten Vollständigkeit gerade für obskure Inhalte, während bei Torrents meist nur das lebt, was genug Leute aktiv seeden.

Die Notlösung passt also zur Kostenlage, aber nicht automatisch zur Archivlogik. Und damit beginnt der eigentliche Denkfehler.

## DHT ist kein Schutzraum

Der Denkfehler lautet: dezentral gleich unangreifbar. Das stimmt bei öffentlichen Torrents nicht. Schon das Protokoll macht Teilnehmende sichtbar, weil Peers sich finden müssen.

In trackerlosen Schwärmen übernimmt die DHT genau diese Vermittlung. Wer nach einem Infohash sucht oder ihn bekannt macht, hinterlässt also technische Spuren, die andere Knoten abfragen können.

Forschende beschrieben solche Beobachtung und Durchsetzung schon früh für BitTorrent-Netze. Neu ist nur, wie niedrig die Eintrittsschwelle heute ist. Genau darauf bauen heute Werkzeuge und Suchdienste auf, die DHT-Daten fortlaufend crawlen, Metadaten ziehen und lokale oder öffentliche Indizes daraus bauen.

Wer ein Torrent-Backup als Schutzschirm versteht, verwechselt Lastverteilung mit Vertraulichkeit. Sichtbarkeit allein ist noch kein Angriff. Sie erleichtert aber die nächste Frage: wie robust ein solcher Schwarm unter Druck bleibt.

## Das Backup kann auch leise kippen

Noch wichtiger ist die Frage nach der Verfügbarkeit unter Druck. Ein Torrent-Schwarm kann gestört werden, ohne dass jemand das gesamte Archiv löschen muss.

In der Forschung sind dafür mehrere Muster beschrieben: falsche oder beschädigte Inhalte, manipulierte Indexdaten, aggressive Leeching-Strategien und gezielte Störung einzelner Verteilungen. Dazu kommt das Alltagsproblem öffentlicher Archive: der lange Schwanz des Interesses. https://people.ischool.berkeley.edu/~chuang/pubs/CWC-EC05.pdf

Populäre Sets finden Seedende. Randständige Fassungen, regionale Varianten oder kaum bekannte Demos fallen leichter aus dem Schwarm. Vor diesem Problem hatte Myrient selbst gewarnt, als der Betreiber erklärte, Torrents eigneten sich schlecht für obskures Material und für laufend aktualisierte Sets.

Ein Backup ist deshalb nicht nur dann angreifbar, wenn Rechteinhaber, Provider oder Ermittler hinschauen. Es ist schon dann fragil, wenn die Community ihre Aufmerksamkeit ungleich verteilt. Damit landet der Fall bei der rechtlichen und politischen Grundfrage.

## Archivierung oder Grauzone

Die Rettung eines Bestands ist juristisch nicht dasselbe wie seine offene Neuverteilung. In den USA stellt das Urheberrecht das Umgehen technischer Schutzmaßnahmen grundsätzlich unter Verbot und erlaubt nur eng begrenzte, zeitlich befristete Ausnahmen. https://www.copyright.gov/1201/2024/

Die aktuellen Regeln nennen Bibliotheken, Archive und Museen, wenn es um Erhaltung und Ersatzkopien geht. Die EU hat Kulturinstitutionen für Bewahrungszwecke ebenfalls Ausnahmen eröffnet. https://digital-strategy.ec.europa.eu/en/faqs/copyright-reform-questions-and-answers

Daraus folgt aber nicht, dass Fans ein globales Download- oder Torrent-Angebot ohne Weiteres in denselben Schutzraum verschieben könnten. Myrient und seine Nachfolger bewegen sich damit in einer Zone, in der kulturelles Interesse, praktische Forschung und Urheberrecht gegeneinanderstehen.

Wer das schlicht als Piraterie abtut, blendet den Erhaltungszweck aus. Wer es umgekehrt als saubere Archivierung etikettiert, unterschlägt die Reichweite öffentlicher Verbreitung. Genau diese Spannung erklärt, warum der Fall über eine Szene-Nachricht hinausweist.

Der Fall Myrient zeigt, wie brüchig digitale Bewahrung bleibt, wenn sie an Einzelpersonen, Spendenlaune und improvisierte Infrastruktur delegiert wird. Die Community hat schnell reagiert.

Das verdient Anerkennung. Aber sie ersetzt damit öffentliche Aufgaben, für die es weiterhin keine tragfähige Antwort gibt: verlässliche Finanzierung, rechtsklare Zugänge, dokumentierte Kuratierung und dauerhafte Redundanz.

Die Video Game History Foundation kommt in ihrer Verfügbarkeitsstudie zu dem Ergebnis, dass 87 Prozent der klassischen Spiele in den USA kommerziell nicht mehr erhältlich sind. https://gamehistory.org/87percent/

Gerade deshalb reicht es nicht, Archive nur zu retten, wenn sie bereits abstürzen. Nötig wären Modelle, die Erhalt von öffentlicher Verbreitung trennen, Forschung erlauben und dennoch Missbrauch begrenzen.

Sonst pendelt das Kulturgut zwischen zwei schlechten Zuständen: teurer Zentralisierung und prekärer Schwarmromantik. Myrient ist damit kein Ausreißer. Es ist ein Lehrstück.
