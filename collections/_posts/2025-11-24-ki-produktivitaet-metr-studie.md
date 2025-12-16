---
layout: post
title: 'Wenn KI beim Coden bremst: Was die METR-Studie über Produktivität verrät'
date: 2025-11-24 12:00:10 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - Softwareentwicklung
    - Arbeitswelt
description: 'Eine neue METR-Studie zeigt: Erfahrene Entwickler arbeiten mit generativer KI langsamer statt schneller – und offenbart eine Lücke zwischen Erwartung und Realität beim KI-Hype.'
thumbnail: '/assets/images/gen/blog/ki-produktivitaet-metr-studie/header_thumbnail.webp'
image: '/assets/images/gen/blog/ki-produktivitaet-metr-studie/header.webp'
---

Eine neue Studie der Non-Profit-Organisation [METR](https://metr.org/) sorgt für Aufsehen: Erfahrene Softwareentwickler arbeiteten mit Unterstützung einer generativen KI **langsamer** statt schneller. Sie brauchten im Schnitt **19 Prozent mehr Zeit** als ohne KI – obwohl sie zuvor fest mit einer Beschleunigung von rund **24 Prozent** gerechnet hatten. Selbst das Forscherteam hatte eigentlich ein gegenteiliges Resultat erwartet.

Dieses überraschende Ergebnis widerspricht dem verbreiteten Glauben, KI-Tools würden die Produktivität erhöhen, und zeigt eine klaffende Lücke zwischen Erwartung und Realität – nun stellt sich die Frage nach den Ursachen und möglichen Optimierungen.

## Entwickler arbeiten langsamer

Das im Juli 2025 durchgeführte Experiment mit 16 erfahrenen Open-Source-Entwicklern ordnete Programmieraufgaben zufällig entweder mit oder ohne generative KI-Unterstützung zu.

Das Ergebnis war verblüffend: Mit KI-Assistenz benötigten die Profis im Schnitt **19 Prozent mehr Zeit** für die Umsetzung – statt der erwarteten Zeiteinsparung. Vor dem Experiment gingen alle von einer Beschleunigung um rund **24 Prozent** aus, und auch nach Abschluss glaubten sie noch, etwa **20 Prozent Zeit gespart** zu haben – ein eklatanter Irrtum laut Messdaten.

Entsprechend überrascht reagierten die Studienautoren; Co-Autor Nate Rush hatte im Vorfeld sogar mit einer **Verdoppelung der Geschwindigkeit** gerechnet.

## KI-Hype auf dem Prüfstand

Das Ergebnis stellt damit gängige Erwartungen infrage. In der Tech-Branche gilt Künstliche Intelligenz als Hebel, um teure Fachkräfte erheblich produktiver zu machen – was bereits zu milliardenschweren Investitionen in KI-gestützte Entwickler-Tools geführt hat.

Manche Experten prognostizieren sogar die Verdrängung vieler Programmierjobs durch Coding-KIs: So erwartet etwa Anthropic-Chef **Dario Amodei**, dass bis zu **50 % aller einfachen Entwicklerstellen** in den nächsten fünf Jahren wegfallen könnten. Auch Fachleute aus Wirtschaft und KI-Forschung rechneten hier eigentlich mit drastisch kürzeren Entwicklungszeiten (um ≈ **40 % schneller**).

Vor diesem Hintergrund wirken die Befunde der METR-Studie besonders ernüchternd. Die Annahme, dass generative KI die Softwareentwicklung automatisch beschleunigt, hält einem Realitätscheck nicht stand – zumindest nicht in diesem Szenario.

**Warum blieb der erhoffte Produktivitätsschub aus?**

## Warum KI das Coding bremst

### Gründe für den KI-Rückschritt – wo die KI schwächelt

Die Studienautoren führen mehrere Gründe für den unerwarteten Malus an:

-   **Überoptimismus:** Die Teilnehmenden gingen vor und selbst nach dem Versuch irrtümlich von einer Beschleunigung aus und überschätzten so die tatsächliche Nützlichkeit der KI.
-   **Fehlendes projektspezifisches Vorwissen:** Die generativen Modelle kannten die umfangreichen Open-Source-Codebasen und deren Besonderheiten nicht gut genug, um auf Anhieb brauchbare Lösungen vorzuschlagen.
-   **Hohe Komplexität der Aufgaben und Repositories:** Die Komplexität der Codebases bremste den Prozess zusätzlich aus.
-   **Zeitaufwand durch Nachbesserungen:** Entwickler\*innen mussten KI-Vorschläge häufig prüfen, anpassen oder verwerfen – die KI verzettelte sich bei anspruchsvollen Problemen und lieferte nur bedingt verwertbare Ergebnisse.

Anders ausgedrückt: Bei komplexen Aufgaben wurde die KI eher zum Bremsklotz – am Ende mussten die Entwickler\*innen vieles selbst nachbessern.

## Nicht überall ein Zeitverlust

### Wenn KI doch schneller macht

Die Verlangsamung durch KI ist kein Naturgesetz – entscheidend sind der Kontext und die Anwender. Andere Untersuchungen finden durchaus Produktivitätsgewinne durch KI, allerdings unter anderen Bedingungen.

-   In einem Programmierexperiment mit **GitHub Copilot** lösten Entwickler eine Aufgabe **55,8 % schneller** als ohne Assistenz.
-   Eine unternehmensweite Feldstudie mit rund **4.900 Entwickler\*innen** zeigte, dass mittels KI **26 % mehr Aufgaben** in gleicher Zeit bewältigt wurden – vor allem weniger erfahrene Programmierende erzielten hier überdurchschnittliche Zugewinne.

### Produktivitätseffekt hängt vom Kontext ab

Entsprechend mahnen die METR-Autoren, ihre Ergebnisse nicht zu verallgemeinern. Sie erwarten in anderen Szenarien durchaus positive Effekte – etwa bei Junior-Entwicklern oder wenn man mit fremden Codebasen arbeitet.

Die zentrale Frage lautet nun, wie sich KI-Werkzeuge und ihre Nutzung so optimieren lassen, dass sie vom **Bremsklotz zum Beschleuniger** werden.

## Wie KI-Tools doch noch helfen können

### Schlüssel: Schulung und Feintuning

Als ein Hebel gilt die effizientere Nutzung und Weiterentwicklung der KI-Werkzeuge. Möglicherweise schöpften die Entwickler im Versuch nicht alle Optionen aus.

Einige Ansatzpunkte:

-   **Geschickteres Prompting:** Durch gezieltere Prompts und klarere Anweisungen könnten relevantere Vorschläge entstehen.
-   **Ausführlichere KI-Vorschläge:** Längere, kontextreichere Antworten der KI können nachvollziehbarer und damit hilfreicher sein.
-   **Projektspezifisches Fine-Tuning:** Eine Anpassung der Modelle auf den konkreten Codebestand könnte die Qualität der Vorschläge deutlich steigern.
-   **Lernprozesse bei den Nutzenden:** Je versierter Entwickler\*innen im Umgang mit KI-Assistenten werden, desto gezielter setzen sie diese für Routineaufgaben ein und prüfen KI-Vorschläge kritisch.

Ebenso dürften künftige KI-Generationen mit größeren Kontextfenstern und besserem Verständnis komplexer Codebasen die erhoffte Wende bringen. Die Entwicklung bleibt dynamisch – das METR-Team plant bereits weitere Untersuchungen, um den Effekt neuer KI-Versionen auf die Produktivität zu testen.

## Fazit

Die METR-Studie ist ein ernüchternder Realitätstest. Statt die Produktivität erfahrener Entwickler*innen zu steigern, bremste der KI-Assistent ihre Arbeit aus – entgegen aller Erwartungen. Allerdings ist dies nur eine Momentaufnahme der aktuellen KI-Generation. Schon in naher Zukunft könnten bessere Modelle und geübtere Nutzer*innen die Bilanz drehen.

Trotzdem setzen viele Beteiligte ihren KI-Helfer weiterhin ein – denn er nimmt monotone Tipparbeit ab und macht das Coden angenehmer. Die KI liefert erste Entwürfe, deren Überarbeitung weniger Mühe kostet, als bei Null zu beginnen. Produktivität bemisst sich nicht nur in Zeit, auch **Entlastung** und **Komfort** spielen eine Rolle.

Letztlich zündet der „KI-Turbo“ in der Softwareentwicklung nicht von selbst. Generative Coding-Tools ersetzen keine erfahrenen Profis und verbessern nicht automatisch die Ergebnisse. Ihr Potenzial entfaltet sich nur bei passendem Kontext und kompetenter Nutzung. Die Herausforderung für Unternehmen und Entwickler\*innen besteht nun darin, KI sinnvoll in Prozesse zu integrieren – und zugleich zu erkennen, wo menschliche Expertise unersetzlich bleibt.
