---
layout: post
title: 'Bash-Anfuehrungszeichen: Single Quotes vs. Double Quotes'
date: 2026-01-16 20:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
description: 'Warum Leerzeichen Skripte brechen und wie du mit ''...'' und "..." in Bash zuverlässig quotest'
thumbnail: '/assets/images/gen/blog/bash-anfuehrungszeichen-single-quotes-vs-double-quotes/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-anfuehrungszeichen-single-quotes-vs-double-quotes/header.webp'
---

Ein Leerzeichen im Pfad und dein Script macht plötzlich etwas anderes. Der Unterschied zwischen '...' und "..." ist weniger Style als Sicherheitsgurt im Shell-Alltag.

## Was Bash beim Parsen wirklich macht

In Bash ist "Quoting" kein kosmetisches Detail, sondern ein Mechanismus, der festlegt, was die Shell als ein Argument sieht und was sie vorher noch umschreibt. Das ist der Kern: Die Shell zerlegt eine Zeile nicht einfach nur an Leerzeichen, sie wendet davor und danach mehrere Regeln an.

Drei Effekte sind im Alltag entscheidend:

-   Wortaufspaltung: Aus einem Wert können mehrere Argumente werden, wenn er unquoted ist
-   Glob-Expansion: Sternchen und Fragezeichen werden zu Dateinamen erweitert, wenn sie unquoted sind
-   Expansionen: Variablen, Kommandoersetzungen und Arithmetik werden ersetzt, abhängig von der Quote-Art

Quoting steuert diese Effekte. Und damit, ob ein Script robust ist oder beim ersten "My Files" scheitert.

## Single Quotes: Alles bleibt wörtlich

Single Quotes in Bash sind "starkes" Quoting. Zwischen ' und ' wird nichts interpretiert. Keine Variablen, keine Kommandoersetzung, keine Backslash-Escapes.

```bash
name="Oliver"
echo 'Hallo $name'
```

Ausgabe:

```text
Hallo $name
```

Das ist genau dann hilfreich, wenn du wirklich einen Literal-String willst, etwa für Regex-Fragmente, JSON-Snippets oder wenn ein Dollarzeichen nicht als Variable verstanden werden darf.

Wichtig: In Single Quotes kannst du kein einzelnes ' unterbringen. Es beendet den String. Typische Workarounds:

```bash
echo 'It'\''s fine'
```

Oder, oft lesbarer, mit printf und passendem Quoting:

```bash
printf "%s\n" "It's fine"
```

## Double Quotes: Inhalt bleibt ein Argument, aber Expansionen passieren

Double Quotes sind "schwaches" Quoting. Sie verhindern in der Regel Wortaufspaltung und Glob-Expansion, lassen aber bestimmte Expansionen zu:

-   Parameter-Expansion: $var, ${var}
-   Kommandoersetzung: $(cmd) und `cmd`
-   Arithmetik: $((...))

```bash
name="Oliver"
echo "Hallo $name"
```

Ausgabe:

```text
Hallo Oliver
```

Der wichtigste Effekt ist aber oft nicht die Variable, sondern die Argument-Grenze:

```bash
path="/Users/oliver/My Files/report.txt"

# Unquoted: kann in mehrere Argumente zerfallen
ls $path

# Quoted: bleibt genau ein Argument
ls "$path"
```

Wenn du in double quotes ein wörtliches $ oder " brauchst, kannst du escapen:

```bash
echo "Preis: \$10"
echo "Er sagte: \"Hallo\""
```

In Double Quotes hat der Backslash nur in bestimmten Fällen eine Sonderrolle, typischerweise vor $, `, " und \ sowie vor einem Zeilenumbruch. Alles andere bleibt meist als Backslash im String erhalten, was in Debugging-Situationen überraschend sein kann.

## Der Klassiker: Warum "$var" so oft die richtige Default-Wahl ist

Viele Bash-Bugs entstehen nicht durch Logik, sondern durch fehlende Quotes an Variablen. Das Muster ist immer ähnlich: Ein Wert enthält Leerzeichen, Tabs, Newlines oder Globbing-Zeichen.

```bash
query="foo bar"
grep $query file.txt
```

Hier sieht grep zwei Suchmuster, nicht eins. Korrekt ist:

```bash
grep "$query" file.txt
```

Auch das hier ist ein typischer Stolperstein:

```bash
pattern="*.log"
echo $pattern
```

Wenn passende Dateien existieren, wird daraus eine Dateiliste. Wenn nicht, bleibt "\*.log" stehen. Beides ist im Script-Kontext selten das, was man "aus Versehen" möchte. Mit Quotes wird es eindeutig:

```bash
echo "$pattern"
```

## Wann unquoted sinnvoll ist

Es gibt Fälle, in denen du Expansionen und Aufspaltung bewusst willst. Dann solltest du das aber explizit gestalten, statt zufällig zuzulassen.

Beispiel: Du willst ein Pattern an ls geben, das wirklich expandiert:

```bash
ls *.log
```

Oder du willst mehrere Argumente aus einer kontrollierten Quelle erzeugen. Dann ist ein Array fast immer die bessere Wahl als "magische" Wortaufspaltung:

```bash
args=(--color=auto --ignore-case)
grep "${args[@]}" "needle" file.txt
```

Merksatz: Wenn du mehrere Argumente meinst, nutze Arrays. Wenn du genau ein Argument meinst, quote es.

## Sonderformen, die oft verwechselt werden

Neben '...' und "..." gibt es in Bash noch Quoting-Varianten, die in Diskussionen oft mit Double Quotes vermischt werden:

-   $'...': ANSI-C Quoting, erlaubt Escapes wie \n, \t, \xNN
-   $"...": Locale-abhängige Übersetzungsstrings, im Alltag selten relevant
-   \ ohne Quotes: Escape für das nächste Zeichen, aber schnell unübersichtlich

Beispiel für $'...' als bewusste Entscheidung:

```bash
printf "%s\n" $'Zeile 1\nZeile 2'
```

Wenn du dagegen schlicht Variablen interpolieren willst, ist "..." das passende Werkzeug. Wenn du einen Literal-Block brauchst, ist '...' meistens klarer.

## Spickzettel: Unterschied in einem Blick

| Verhalten                     | 'single quotes' | "double quotes" |
| ----------------------------- | --------------- | --------------- |
| Variablen ($var)              | nein            | ja              |
| Kommandoersetzung ($(cmd))    | nein            | ja              |
| Arithmetik ($((...)))         | nein            | ja              |
| Wortaufspaltung (Leerzeichen) | verhindert      | verhindert      |
| Glob-Expansion (\*, ?)        | verhindert      | verhindert      |
| Backslash-Escapes             | nein            | eingeschränkt   |

## Praxisregeln, die in echten Skripten tragen

1. Quote Variablen fast immer: "$var", "${var}"
2. Nutze Single Quotes für Literale, insbesondere wenn $ oder \ im Text steht
3. Nutze Double Quotes, wenn du Expansionen willst, aber die Argument-Grenze stabil bleiben soll
4. Nutze Arrays statt "Argument-Strings", wenn du mehrere Parameter zusammensetzen musst
5. Wenn du unsicher bist, lass dir die Shell-Wirklichkeit anzeigen:

```bash
printf "%q\n" "$value"
```

Das ist kein Magie-Button, aber ein schneller Reality-Check, wie Bash einen Wert tatsächlich sieht.

## Fazit

Der Unterschied zwischen '...' und "..." ist kein Detailwissen, sondern eine der wenigen Bash-Regeln, die sich fast immer auszahlen. Single Quotes sind der wörtliche Schutzraum. Double Quotes sind der Alltag: Expansionen ja, aber bitte ohne Nebenwirkungen durch Aufspaltung oder Globs. Wer das sauber trennt, schreibt deutlich weniger fragile Scripts.

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
