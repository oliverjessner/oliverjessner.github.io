---
layout: post
title: 'Motorola Smart Feed – wenn der Launcher beim Amazon-Kauf mitverdient'
date: 2026-05-26 12:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - Privacy
    - software-development
    - computer-stuff
description: 'Motorola-Smartphones sollen Amazon-Starts umgeleitet haben. Der Fall zeigt, wie unsichtbar vorinstallierte Apps werden können'
thumbnail: '/assets/images/gen/blog/motorola-smart-feed-wenn-der-launcher-beim-amazon-kauf-mitverdient/header_thumbnail.webp'
image: '/assets/images/gen/blog/motorola-smart-feed-wenn-der-launcher-beim-amazon-kauf-mitverdient/header.webp'
faq:
    - question: 'Was ist bei Motorola Smart Feed passiert?'
      answer: 'Berichten zufolge öffneten manche Motorola-Geräte beim Start der Amazon-App kurz den Browser und leiteten über eine URL mit Affiliate-Code weiter.'
    - question: 'Sind alle Motorola-Smartphones betroffen?'
      answer: 'Nach aktuellem Stand offenbar nicht. 9to5Google konnte das Verhalten auf einem Razr Fold nachvollziehen, aber nicht auf jedem getesteten Motorola-Gerät.'
    - question: 'Wie lässt sich das Verhalten stoppen?'
      answer: 'Laut 9to5Google kann Smart Feed über Einstellungen > Apps > Smart Feed deaktiviert werden. Auf dem getesteten Gerät stoppte das die Weiterleitung.'
---

Ein vorinstallierter Feed, ein kurzer Browser-Flash und plötzlich steht ein Affiliate-Code zwischen Nutzer und Amazon-App. Der Motorola-Fall zeigt, warum vorinstallierte Smartphone-Software mehr Aufmerksamkeit verdient.

## Motorola Smart Feed – wenn der Launcher nicht nur Apps startet

Normalerweise ist ein App-Icon eine ziemlich klare Sache. Man tippt auf Amazon und erwartet, dass sich Amazon öffnet. Genau dieser scheinbar einfache Vorgang steht nun bei manchen Motorola-Smartphones im Mittelpunkt einer merkwürdigen Beobachtung.

TechRadar berichtet unter Berufung auf 9to5Google und einen Reddit-Nutzer, dass Motorolas vorinstallierte Smart-Feed-App bei bestimmten Geräten offenbar in den Start der Amazon-App eingreift. Statt die App direkt zu öffnen, soll kurz der Browser erscheinen. Danach wird zu Amazon weitergeleitet. Im Hintergrund landet dabei ein [Affiliate-Code in der Kette.](https://www.techradar.com/phones/motorola-phones/is-this-the-honey-scandal-all-over-again-motorola-phones-caught-adding-affiliate-codes-to-amazon-orders)

Die technische Beobachtung stammt ursprünglich aus der Android-Community. Ein Reddit-Nutzer mit einem Razr 60 Ultra bemerkte, dass beim Öffnen der Amazon-App eine verdächtige URL aufgerufen wurde. In Logs tauchte Smart Feed auf. 9to5Google konnte das Verhalten anschließend auf einem
[Razr Fold nachvollziehen.](https://9to5google.com/2026/05/25/motorola-amazon-app-hijacking-behavior/)

## Was genau passiert sein soll

Nach der Beschreibung ist der Ablauf nicht besonders sichtbar. Wer die Amazon-App aus dem App-Drawer öffnet, sieht für einen kurzen Moment den Browser. Danach erscheint Amazon. Genau dieser kurze Moment ist entscheidend. Laut 9to5Google wird dabei eine URL geöffnet, die anschließend zur Amazon-App weiterleitet.

Besonders auffällig: Das Verhalten soll nicht auftreten, wenn Amazon über ein Icon auf dem Homescreen gestartet wird. Betroffen ist nach den bisherigen Berichten also nicht zwingend die Amazon-App selbst, sondern der Weg, über den sie gestartet wird.

Es geht nicht nur um Werbung in einer App. Es geht um einen Eingriff in die Nutzerintention. Die Nutzerin oder der Nutzer tippt auf eine bekannte App. Das System macht dazwischen aber offenbar noch etwas anderes.

## Warum der Affiliate-Code so heikel ist

Affiliate-Links sind an sich nichts Ungewöhnliches. Websites, Creator und Vergleichsportale verdienen damit Geld, wenn ein Kauf über ihren Link zustande kommt. Problematisch wird es, wenn ein solcher Code ohne klaren Anlass oder ohne erkennbare Zustimmung in eine Kaufstrecke eingebaut wird.

Denn dann verschiebt sich die Frage. Es geht nicht mehr nur darum, wer eine Provision bekommt. Es geht darum, ob eine vorinstallierte App heimlich an einer Handlung beteiligt ist, die eigentlich zwischen Nutzer und Händler stattfinden sollte.

TechRadar zieht deshalb den Vergleich zum [Honey-Skandal (Blogartikel)](https://oliverjessner.at/blog/2024-12-08-der-honey-scam/). Honey ist eine Browser-Erweiterung, die Rabatte finden sollte, aber in der Kritik stand, Affiliate-Attributionen zu beeinflussen. Der Vergleich ist nicht perfekt. Bei Motorola ist nach aktuellem Stand noch unklar, ob Absicht, Fehlkonfiguration oder ein externer Dienst dahintersteht. Aber das Grundmuster wirkt ähnlich: Eine Software steht unsichtbar zwischen Nutzer und Kaufvorgang.

## Der merkwürdige Teil: Kira Abboud und devicenative.com

9to5Google fand bei der Analyse eine Weiterleitung über "kira-abboud.com". Der Name verweist offenbar auf die Fashion-Influencerin Kira Abboud. Gleichzeitig schreibt 9to5Google, dass die beobachteten Affiliate-Codes nicht zu den öffentlich auffindbaren Codes der Influencerin passen würden.

Zusätzlich tauchte in Netzwerk-Logs "devicenative.com" auf. Laut 9to5Google handelt es sich dabei um einen Dienst, der Werbung auf Smartphones platziert und eine Integration mit Motorola beschreibt.

Das ist der Punkt, an dem man vorsichtig bleiben muss. Der Fall sieht seltsam aus. Er sieht auch nicht gut aus. Aber aus den bisherigen Informationen lässt sich noch nicht sauber ableiten, wer genau dieses Verhalten veranlasst hat. Es könnte eine bewusste Monetarisierung sein. Es könnte aber auch eine fehlerhafte Kampagne, eine externe Integration oder eine schlecht konfigurierte Weiterleitung sein.

Für einen belastbaren Vorwurf reicht das noch nicht. Für Kritik am Design reicht es sehr wohl.

## Nicht jedes Gerät scheint betroffen zu sein

Wichtig ist auch: Nach den bisherigen Tests betrifft das Verhalten offenbar nicht jedes Motorola-Smartphone. 9to5Google konnte es auf einem Razr Fold mit einer neueren Smart-Feed-Version beobachten. Auf einem Moto G Stylus mit derselben Smart-Feed-Version ließ es sich laut Bericht nicht reproduzieren. Eine ältere Smart-Feed-Version auf einem Razr zeigte das Verhalten ebenfalls nicht.

Das macht die Sache nicht harmlos. Es verhindert aber eine zu einfache Aussage wie "Motorola-Smartphones manipulieren Amazon-Käufe". Der aktuelle Stand ist enger: Bestimmte Motorola-Geräte scheinen unter bestimmten Bedingungen beim Öffnen der Amazon-App eine Affiliate-Weiterleitung auszulösen.

Gerade solche Einschränkungen sind wichtig. In der Technikberichterstattung klingt eine zugespitzte Überschrift oft klarer als die Wirklichkeit. Die Wirklichkeit ist hier aber fragmentiert. Unterschiedliche Geräte, unterschiedliche App-Versionen, unterschiedliche Startwege.

## Warum vorinstallierte Apps ein grundsätzliches Problem bleiben

Bloatware und vorinstallierte Dienste sind nicht nur nervig. Sie können Teil der Geschäftslogik eines Geräts sein. Viele Nutzer kaufen ein Smartphone und denken an Display, Kamera, Akku und Prozessor. Weniger sichtbar ist die Software-Schicht, die Hersteller zusätzlich ausliefern. Dazu gehören Feeds, Assistenten, Empfehlungen, App-Stores, Werbedienste und Partnerintegrationen.

Diese Schicht wirkt oft harmlos. Ein Newsfeed hier, eine Empfehlung dort. Doch sobald sie App-Starts, Links oder Kaufstrecken beeinflusst, ist sie nicht mehr nur Dekoration. Dann wird sie Infrastruktur.

## Was Nutzer tun können

Laut 9to5Google lässt sich das Verhalten stoppen, indem Smart Feed deaktiviert wird. Der Pfad ist relativ einfach: Einstellungen öffnen, zu Apps wechseln, nach "Smart Feed" suchen und die App deaktivieren.

Wer ein Motorola-Smartphone nutzt und prüfen möchte, ob das eigene Gerät betroffen ist, kann auf den kurzen Browser-Flash achten, wenn Amazon aus dem App-Drawer gestartet wird. Das ist kein perfekter Test, aber ein einfacher Hinweis. Technisch versiertere Nutzer können zusätzlich Logs prüfen. Für die meisten dürfte aber gelten: Wenn Smart Feed nicht gebraucht wird, spricht wenig dagegen, die App zu deaktivieren.

## Was Motorola erklären sollte

Motorola sollte den Fall sauber erklären. Nicht nur mit einem knappen Hinweis, dass man die Sache prüfe. Sondern mit Antworten auf konkrete Fragen.

Welche Geräte sind betroffen? Welche Smart-Feed-Versionen sind betroffen? Welche Rolle spielt devicenative.com? Warum wurde beim Öffnen der Amazon-App überhaupt eine externe Weiterleitung ausgelöst? Wer profitiert von dem Affiliate-Code? Und warum war das Verhalten für Nutzer nicht klar sichtbar?

Diese Fragen sind wichtig, weil sie über den Einzelfall hinausgehen. Wenn Hersteller vorinstallierte Software zur Monetarisierung verwenden, braucht es klare Grenzen. App-Starts dürfen nicht zu einer versteckten Werbefläche werden. Kaufvorgänge dürfen nicht durch unsichtbare Zwischenstationen laufen, nur weil ein Hersteller technisch dazu in der Lage ist.
