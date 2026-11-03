---
layout: post
title: Cyberangriffe auf Supermärkte – wenn Hacker die Kühlung abschalten
date: 2026-11-03 17:18:27 +0100
authors:
  - oliver_jessner
meta_og_type: article
categories:
  - computer-stuff
  - software-engineering
  - Gesellschaft
description: Manipulierte Kühlanlagen treffen europäische Supermärkte. Was über die Vorfälle bekannt ist und warum die technischen Details entscheidend sind
thumbnail: /assets/images/gen/blog/cyberangriffe-auf-supermaerkte-wenn-hacker-die-kuehlung-abschalten/header_thumbnail.webp
image: /assets/images/gen/blog/cyberangriffe-auf-supermaerkte-wenn-hacker-die-kuehlung-abschalten/header.webp
faq:
  - question: Welche Supermärkte sind von den Kühlungsproblemen betroffen?
    answer: Berichtet wurden unter anderem Vorfälle bei Delhaize, Carrefour und Spar in Belgien sowie bei einzelnen ICA- und Coop-Märkten in Schweden. Die Angaben betreffen unterschiedliche Betreiber und Erhebungsstände.
  - question: Wie wurden die Kühlanlagen manipuliert?
    answer: Nach Angaben des Kühltechnik-Dienstleisters Sabcobel wurden betroffene Anlagen in Belgien aus der Ferne in den Abtaumodus versetzt. Der genaue Zugangsweg geht aus dem zugrunde liegenden Bericht nicht hervor.
  - question: Haben alle betroffenen Unternehmen einen Cyberangriff bestätigt?
    answer: Nein. Sveriges Radio berichtete am 2. November, dass ICA Störungen bestätigte, deren Ursache nach Angaben der Pressestelle aber noch unbekannt war.
socialmedia:
  - 'Cyberangriffe können bis in die Kühltruhe reichen: In europäischen Supermärkten wurden Kühlanlagen manipuliert. Was über Belgien und Schweden bekannt ist und welche Fragen offenbleiben.'
  - 'Abtaumodus aus der Ferne: Die Vorfälle in europäischen Supermärkten zeigen, wie unmittelbar digitale Steuerungen den Betrieb beeinflussen können. Entscheidend ist auch, was bisher nicht bestätigt wurde.'
  - 50 Grad im Tiefkühler? Berichte aus Schweden sorgen für Aufmerksamkeit. Für die Einordnung zählt die Unterscheidung zwischen eingestellter Temperatur, gemessener Temperatur und bestätigter Ursache.
news: true
pinned: false
ads: true
image_width: 1280
image_height: 720
---

Manipulierte Kühlanlagen bringen europäische Supermärkte in Schwierigkeiten. Die Vorfälle zeigen, wie direkt digitale Eingriffe den Alltag treffen können. Einige technische Fragen bleiben offen.

## Cyberangriffe auf Kühlanlagen in Belgien und Schweden

Ein Cyberangriff muss keine Daten stehlen, um Schaden anzurichten. Wenn sich die Steuerung einer Kühlanlage verändert, kann das unmittelbar die gelagerte Ware betreffen.

Am 2. November 2026 berichtete [t3n unter Berufung auf dpa](https://t3n.de/news/hacker-drehen-die-kuehlung-ab-nach-frankreich-trifft-es-jetzt-auch-supermaerkte-in-belgien-und-schweden-1771109/) über manipulierte Kühlanlagen in Belgien und Störungen in Schweden. Zuvor hatte es bereits einen ähnlichen Vorfall in Frankreich gegeben.

In Belgien nennt der Bericht unter anderem Delhaize, Carrefour und Spar. Der Kühltechnik-Dienstleister Sabcobel sprach von rund 20 betroffenen Anlagen. Nach dessen Angaben wurden Systeme aus der Ferne in den Abtaumodus versetzt.

Diese Zahl beschreibt die von Sabcobel gemeldeten Anlagen. Sie ist keine abschließende Gesamtzahl aller betroffenen Supermärkte.

## Was der Abtaumodus mit dem Angriff zu tun hat

Ein Abtauprogramm gehört grundsätzlich zum regulären Betrieb einer Kühlanlage: Es dient dazu, angesammeltes Eis zu entfernen. Entscheidend ist, wann und unter welchen Bedingungen es läuft.

Wird eine solche Funktion unbefugt aktiviert, kann eine vorgesehene Betriebsfunktion zum Problem werden. Dafür muss eine Anlage nicht dauerhaft ausgeschaltet werden. Schon eine manipulierte Steuerung kann die Kühlung beeinträchtigen.

Welchen Zugangsweg die Angreifer nutzten, erklärt der t3n-Bericht nicht. Daraus lassen sich weder ein bestimmtes Passwortproblem noch eine konkrete Sicherheitslücke ableiten.

## Schweden: Störungen bestätigt, Ursache teilweise offen

Für Schweden ist die Quellenlage differenzierter. [Sveriges Radio berichtete am 2. November](https://www.sverigesradio.se/artikel/frysarna-i-matbutik-installda-pa-50-grader-blivit-hackade) über betroffene ICA-Märkte und ähnliche Vorfälle in sechs Coop-Filialen. Lebensmittel mussten entsorgt werden.

ICA bestätigte gegenüber dem Sender eine begrenzte Zahl betroffener Geschäfte. Die Pressestelle erklärte zugleich, die Ursache noch nicht zu kennen. Laut einer Korrektur des Senders war das zentrale Netzwerksystem von ICA nicht betroffen.

Auch die häufig genannte Temperatur von 50 Grad braucht Einordnung: Ein eingestellter Sollwert, die tatsächlich gemessene Temperatur im Gerät und die Temperatur der Lebensmittel sind unterschiedliche Angaben. Die [Nachrichtenagentur AP](https://apnews.com/article/a8ea5b30d67da47957769f29101fe686) berichtete, der ICA-Markt in Sjöbo habe von auf 50 Grad eingestellten Geräten gesprochen.

Aus dieser Aussage allein folgt nicht, dass sämtliche Waren diese Temperatur erreicht haben.

## Warum digitale Steuerungen zum Betriebsrisiko werden

Der Fall berührt eine praktische Frage des [Software-Engineerings](https://oliverjessner.at/category/software-engineering/): Was passiert, wenn jemand eine erlaubte Funktion unbefugt ausführt?

Bei technischen Anlagen reichen die Folgen über den Bildschirm hinaus. Eine veränderte Einstellung kann Arbeitsabläufe unterbrechen und Waren unbrauchbar machen. Digitale Sicherheit betrifft damit auch alltägliche Versorgung und [Gesellschaft](https://oliverjessner.at/category/Gesellschaft/).

Für Betreiber ergeben sich daraus konkrete Prüffragen:

- Wer darf Betriebsarten und Temperaturvorgaben verändern?
- Wie werden ungewöhnliche Änderungen erkannt?
- Lässt sich nachvollziehen, welcher Zugang eine Änderung ausgelöst hat?
- Können Verantwortliche bei einer Störung vor Ort eingreifen?

Das sind allgemeine Prüfpunkte, keine nachgewiesenen Versäumnisse der betroffenen Unternehmen.

Die bisherigen Berichte zeigen die möglichen Folgen manipulierter Kühltechnik deutlich. Für eine belastbare technische Erklärung braucht es jedoch mehr als auffällige Temperaturangaben: den bestätigten Zugangsweg, den Ablauf des Eingriffs und eine klare Zuordnung der betroffenen Systeme.
