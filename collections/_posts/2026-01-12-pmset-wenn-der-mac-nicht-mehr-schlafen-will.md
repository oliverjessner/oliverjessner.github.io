---
layout: post
title: 'pmset – wenn der Mac nicht mehr schlafen will'
date: 2026-01-12 11:31:59 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - macos
    - terminal
    - computer-stuff
description: 'Warum dein Mac nicht einschläft und wie du mit pmset den Übeltäter in wenigen Minuten identifizierst'
thumbnail: '/assets/images/gen/blog/pmset-wenn-der-mac-nicht-mehr-schlafen-will/header_thumbnail.webp'
image: '/assets/images/gen/blog/pmset-wenn-der-mac-nicht-mehr-schlafen-will/header.webp'
---

Nach der Arbeit klappe ich meinen Mac zu und er schläft sonst sofort ein. Plötzlich bleibt er wach. Mit pmset findest du heraus, welcher Prozess oder welches Gerät den Sleep verhindert.

## pmset verstehen statt raten

Wenn ein Mac nicht schlafen will, ist das fast nie Zufall. Sleep wird in macOS bewusst verhindert, sobald ein Prozess, ein Gerät oder eine Systemfunktion signalisiert: Bitte wach bleiben. Für die Praxis heißt das: Du musst nicht wahllos Einstellungen umstellen, du musst den Blocker identifizieren.

Genau dafür ist `pmset` da. Das Tool gehört zu macOS und liefert dir den Blick auf Power-Management: aktuelle Energie-Einstellungen, aktive Sleep-Blocker (Assertions) und Einträge zu Sleep und Wake Events.

**Hinweis:** In diesem Artikel nutzen wir `pmset` primär zur Diagnose. Änderungen an Energie-Parametern können das Verhalten deines Macs spürbar verändern und erfordern oft `sudo`.

## Was pmset dir zeigt

`pmset` kann zwei Dinge besonders gut:

1. Es zeigt, welche Energie-Settings aktuell aktiv sind (separat für Akku und Netzbetrieb).
2. Es zeigt, warum der Mac gerade nicht schläft, inklusive des verantwortlichen Prozesses.

Das ist für Mac-User praktisch, weil Sleep-Probleme selten nur ein Komfortthema sind: Sie kosten Akku, können Wärme und Lüfterlaufzeiten erhöhen und sorgen im Alltag für unnötigen Reibungsverlust.

## Schritt 1: Überblick holen

Starte mit einem schnellen Status, um ein Gefühl für die aktuelle Konfiguration zu bekommen.

```bash
pmset -g
```

Wenn du es detaillierter willst, frage die aktiven Profile ab. Das ist hilfreich, weil macOS je nach Stromquelle unterschiedliche Werte nutzt.

```bash
pmset -g custom
```

Achte dabei weniger auf einzelne Zahlen, sondern auf Muster: Gibt es auf Akku andere Sleep-Werte als am Netz? Sind Optionen aktiv, die im Hintergrund Aufgaben erlauben? Das ist keine Bewertung, sondern ein Kontext, der später beim Einordnen hilft.

## Schritt 2: Wer blockiert den Sleep? Assertions lesen

Der wichtigste Befehl, wenn der Mac nicht einschläft:

```bash
pmset -g assertions
```

Die Ausgabe wirkt auf den ersten Blick lang, aber du brauchst im Alltag meist nur zwei Bereiche:

-   **Assertion status system-wide:** Welche Arten von Blockern sind gerade aktiv (z. B. System-Sleep, Display-Sleep, User Activity).
-   **Listed by owning process:** Welcher Prozess ist konkret verantwortlich.

Typische Felder, die du sehen kannst:

-   `PreventUserIdleSystemSleep`: Etwas verhindert, dass der Mac im Leerlauf einschläft
-   `PreventSystemSleep`: Etwas verhindert System-Sleep generell
-   `PreventUserIdleDisplaySleep`: Etwas hält das Display wach
-   `ExternalMedia`: Ein externes Medium (z. B. Laufwerk) verhindert Sleep
-   `UserIsActive`: macOS glaubt, dass Eingaben stattfinden (auch das kann von Software simuliert werden)

Was du daraus ableitest, ist meist erstaunlich direkt:

### Wenn ein Prozess genannt wird

Unter „Listed by owning process“ steht häufig etwas wie Browser, Backup-Tools, Audio- oder Video-Software, Cloud-Sync, Remote-Desktop oder eine Konferenz-App. Dann hast du den Ansatzpunkt: App schließen, Tab/Stream beenden, Sync pausieren oder prüfen, ob ein Update der App das Verhalten verändert hat.

Ein Klassiker ist auch `caffeinate`. Das kann absichtlich laufen, wird aber gerne vergessen.

```bash
pgrep -fl caffeinate
```

### Wenn ExternalMedia aktiv ist

Dann lohnt sich ein Blick auf angeschlossene Datenträger. Auch ein USB-Stick oder eine SD-Karte kann Sleep blockieren, je nachdem wie sie eingebunden sind.

Pragmatischer Test: Medium sauber auswerfen und erneut prüfen, ob die Assertion verschwindet.

### Wenn UserIsActive aktiv bleibt

Dann kann ein Eingabegerät oder eine Software ständig Aktivität auslösen. Häufige Kandidaten sind USB-Hubs, Controller, manche Mäuse/Tastaturen, aber auch Tools, die virtuelle Eingaben erzeugen.

Hier hilft ein einfacher A/B-Test: Externe Geräte abziehen, Assertions erneut prüfen und den Verursacher eingrenzen.

## Schritt 3: Sleep und Wake im Log nachvollziehen

Wenn dein Mac zwar schläft, aber sofort wieder aufwacht, oder wenn du wissen willst, wann genau etwas passiert ist, hilft das Power-Log.

```bash
pmset -g log | grep -E " Sleep  | Wake  | Wake reason"
```

Du suchst nach zwei Dingen:

-   Zeitstempel: passiert es immer nach einem festen Muster?
-   Wake reason: gibt es einen Hinweis auf Netzwerk, Gerät, Timer oder ähnliches?

Das ist kein gerichtsfester Beweis, aber eine sehr solide Spur. In Kombination mit `pmset -g assertions` bekommst du meist ein klares Bild.

## Häufige Ursachen im Alltag

Hier sind typische Gründe, die ich in der Praxis am häufigsten sehe, inklusive schneller Checks, ohne direkt tief in Systemeinstellungen zu versinken.

### Externe Displays und Clamshell-Setup

Wenn ein MacBook zugeklappt und an Monitor plus Strom hängt, kann es absichtlich wach bleiben (Clamshell-Betrieb). Das ist kein Bug, sondern ein gewünschter Modus. Wenn du ihn nicht willst, teste kurz ohne externen Monitor oder ohne Netzteil und beobachte die Assertions.

### Netzwerk und Freigaben

Dateifreigaben, Netzwerkzugriffe oder Remote-Verbindungen können Sleep verhindern oder Wake triggern. Wenn du regelmäßig im Heimnetz auf den Mac zugreifst, lohnt ein Blick, ob gerade Verbindungen aktiv sind.

### Backups und Indizierung

Time Machine, Spotlight-Indizierung oder große Sync-Jobs (Cloud-Drive) können den Mac länger wach halten, besonders nach Updates oder wenn ein neues Laufwerk angeschlossen wurde. Das muss nicht „falsch“ sein, es erklärt aber das Verhalten.

### Browser und Medien

Livestreams, Videoplayer, Meetings im Browser, Web-Apps mit Audio oder Bildschirmfreigabe sind häufige Sleep-Blocker. `pmset -g assertions` nennt dann oft den verursachenden Prozess, auch wenn du „nur“ einen Tab offen hast.

### Bluetooth und Peripherie

Manchmal triggert ein Gerät wiederholte Aktivität. Wenn `UserIsActive` auffällig ist, ist das der Moment für systematisches Abstecken statt Ratespiel.

## Optional: Änderungen nur gezielt und nachvollziehbar

Manchmal willst du nicht nur diagnostizieren, sondern ein Verhalten anpassen. Dann gilt: immer klein anfangen, dokumentieren, testen.

Aktuelle Settings sichern:

```bash
pmset -g custom
```

Wenn du wirklich einen Parameter setzen willst, mache das bewusst und mit Bedacht. Beispielhaft (nur wenn du genau weißt, warum):

```bash
sudo pmset -a powernap 0
```

Danach: testen, und vor allem prüfen, ob sich die ursprüngliche Ursache dadurch nur versteckt oder tatsächlich gelöst ist. In vielen Fällen ist der bessere Fix: den auslösenden Prozess oder das Gerät zu identifizieren und dort anzusetzen.

## Ein kurzer Debug-Workflow, der im Alltag funktioniert

1. Prüfe den Ist-Zustand: `pmset -g`
2. Finde den Blocker: `pmset -g assertions`
3. Wenn nötig, verfolge Sleep/Wake: `pmset -g log | grep -E " Sleep  | Wake  | Wake reason"`
4. Mache A/B-Tests: App schließen, Medien stoppen, externe Geräte abziehen, Datenträger auswerfen
5. Erst danach: gezielte Settings-Anpassung, wenn es wirklich ein Konfig-Thema ist

## Fazit

Sleep-Probleme wirken oft wie ein diffuser macOS-Fehler, sind aber in der Regel nachvollziehbar. Sobald du `pmset` nutzt, wechselst du von Vermutung zu Diagnose und kommst schneller zu einer Lösung, die im Alltag stabil bleibt.
