---
layout: post
title: 'Billly für Freelancer – warum ich meine eigene Mac-App gegen SaaS und Vendor Lock-in gebaut habe'
date: 2026-03-25 13:33:26 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - macos
    - software-development
    - personal
    - vibecoding
    - ki
description: 'Billly ist meine Mac-App gegen SaaS-Stapel und Datenpflege und zieht fast alles aus den Rechnungen, die ohnehin schon im Dateisystem liegen'
thumbnail: '/assets/images/gen/blog/billly-fuer-freelancer-warum-ich-meine-eigene-mac-app-gegen-saas-und-vendor-lock-in-gebaut-habe/header_thumbnail.webp'
image: '/assets/images/gen/blog/billly-fuer-freelancer-warum-ich-meine-eigene-mac-app-gegen-saas-und-vendor-lock-in-gebaut-habe/header.webp'
faq:
    - question: 'Für wen ist Billly gedacht?'
      answer: 'Billly ist vor allem für Freelancer interessant, die unter 100.000 Euro Umsatz machen, keine komplexen Kundenstrukturen haben und ihre Rechnungen bereits als PDFs im Dateisystem organisieren.'
    - question: 'Was braucht Billly, um zu starten?'
      answer: 'Im Kern nur die OpenAI API und die Angabe der Ordner, in denen Ein- und Ausgangsrechnungen liegen. Daraus baut die App automatisch ein Dashboard und ein CRM.'
    - question: 'Was soll Billly künftig noch können?'
      answer: 'Geplant sind Funktionen zum Erstellen von Rechnungen und zum Import von Bankdaten, damit die App noch mehr automatisch erfassen und zuordnen kann.'
---

Ich war genervt davon, für einfache Freelancer-Aufgaben mehrere SaaS-Produkte offen zu haben. Genau daraus ist Billly entstanden: eine Mac-App, die nicht fremde Prozesse nachbaut, sondern meinen eigenen möglichst konsequent aus Rechnungen ableitet.

## Warum ich Billly überhaupt gebaut habe

Ich hatte keine Lust mehr, für meine tägliche Arbeit verschiedene Software- und SaaS-Produkte zu kombinieren. Für Kontakte gab es ein Tool, für Rechnungen ein anderes, für Follow-ups noch eins und für Übersicht oder Auswertungen wieder eine eigene Oberfläche.

Fast alles war als SaaS gebaut, fast alles wollte meine Daten in ein eigenes Modell zwingen und fast alles führte am Ende in denselben Effekt: Vendor Lock-in.

Was mich daran gestört hat, war nicht nur der Preis. Es war vor allem das Gefühl, meine Zeit in die Pflege von Systemen zu stecken, die für mich nur Mittel zum Zweck sind. Ich wollte nicht meine Arbeit an eine Sammlung aus Webformularen und Tabellen anpassen. Ich wollte, dass die Software sich an meinen tatsächlichen Ablauf anpasst.

## Der kleine gemeinsame Nenner bei vielen Freelancern

Irgendwann habe ich mir die Frage gestellt, was für Freelancer mit eher überschaubarem Setup eigentlich wirklich der gemeinsame Nenner ist. Nicht für große Agenturen, nicht für Teams mit komplexen Kundenstrukturen, sondern für Leute, die unter 100.000 Euro Umsatz machen und schlicht ihren Laden ordentlich führen wollen.

Für mich war die Antwort überraschend einfach: Rechnungen als PDFs, die irgendwo im Dateisystem herumliegen. Ein- und Ausgangsrechnungen liegen bei den meisten nicht in einem ausgefeilten System, sondern in Ordnern auf dem Mac. Genau dort steckt aber schon fast alles, was ich im Alltag wirklich wissen muss.

Das war der Ausgangspunkt für Billly. Wenn 99% der für mich wichtigen Daten ohnehin schon in den Rechnungen enthalten sind, warum sollte ich sie dann noch einmal von Hand in irgendein SaaS kippen, nur damit am Ende ein halb gepflegtes Dashboard oder CRM entsteht?

## Was Billly heute automatisiert

Billly ist deshalb bewusst schlicht gestartet. Die App braucht im Kern nur die OpenAI API und die Angabe der Ordner, in denen meine Ein- und Ausgangsrechnungen liegen. Daraus baut sie automatisch ein Dashboard, zieht die relevanten Informationen aus den PDFs und erzeugt nebenbei auch ein CRM, ohne dass ich Kontakte, Firmen oder Vorgänge manuell anlegen muss.

Der Punkt ist nicht, alles maximal komplex abzubilden. Billly versucht nicht, jede denkbare Freelancer-Realität zu modellieren. Die App nimmt die Dokumente, die ohnehin da sind, und macht daraus so viel Struktur wie möglich. Genau das wollte ich: nicht noch ein System pflegen, sondern aus vorhandenen Daten automatisch nutzbare Übersicht gewinnen.

Seit Version 0.3.0 kann Billly außerdem Templates anlegen, um mithilfe der Gmail API E-Mails zu senden. Auch das folgt derselben Idee. Wenn Informationen aus Rechnungen und bisherigen Vorgängen schon vorhanden sind, sollte daraus nicht nur eine Übersicht entstehen, sondern im besten Fall auch direkt ein brauchbarer nächster Schritt.

## Warum Billly ein egoistisches Projekt ist

Billly ist ein völlig egoistisches Projekt. Ich baue damit nicht den Workflow von irgendwem nach, sondern meinen eigenen. Das ist kein falscher Stolz, sondern die eigentliche Produktentscheidung. Ich glaube nicht, dass ich für alle Freelancer ein perfektes System definieren kann. Ich weiß aber ziemlich genau, was mich an meinem eigenen Setup stört.

Mein Ziel ist deshalb nicht, möglichst viele Datenfelder anzubieten oder jeden Sonderfall zu modellieren. Mein Ziel ist, keine Zeit in das Pflegen von Daten zu stecken. Wenn ich eine Rechnung ohnehin erhalten oder verschickt habe, dann ist der wichtigste Teil der Arbeit schon dokumentiert. Für meinen Alltag reicht das erstaunlich oft aus.

Genau deshalb fühlt sich Billly für mich richtiger an als viele SaaS-Produkte. Die App beginnt nicht bei Formularen, sondern bei dem Material, das in meinem Workflow real existiert.

## Was ich als Nächstes bauen möchte

Der nächste logische Schritt ist für mich, mit Billly auch direkt Rechnungen erstellen zu können. Wenn die App Ein- und Ausgangsrechnungen schon versteht, liegt es nahe, diesen Kreislauf nicht nur auszuwerten, sondern auch am Anfang zu erzeugen.

Danach möchte ich Bankdaten importieren. Nicht, weil ich daraus ein riesiges Buchhaltungssystem machen will, sondern weil Billly dann automatisch noch mehr Zusammenhänge erfassen kann. Rechnungen, Zahlungseingänge und Kommunikation würden damit Stück für Stück in denselben Ablauf fallen, ohne dass ich sie mehrfach pflegen muss.

Am Ende bleibt der Anspruch bewusst klein. Billly soll nicht alles für alle sein. Billly soll meinen Workflow so gut abbilden, dass ich möglichst wenig Zeit mit Verwaltung verbringe und mehr Zeit für die eigentliche Arbeit habe.
