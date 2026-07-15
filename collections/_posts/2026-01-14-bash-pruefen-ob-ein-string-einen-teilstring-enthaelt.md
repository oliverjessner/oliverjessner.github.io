---
layout: post
title: 'Bash: Prüfen, ob ein String einen Teilstring enthält'
date: 2026-01-14 13:03:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
    - software-development
description: 'So prüfst du in Bash zuverlässig, ob ein String einen Teilstring enthält, inklusive sicherem Quoting und typischen Stolperfallen mit Pattern und Regex'
thumbnail: '/assets/images/gen/blog/bash-pruefen-ob-ein-string-einen-teilstring-enthaelt/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-pruefen-ob-ein-string-einen-teilstring-enthaelt/header.webp'
image_width: 1280
image_height: 720
---

Substring-Checks wirken banal, werden in Bash aber schnell unklar, weil Pattern-Matching, Quoting und Regex ähnlich aussehen. Mit zwei, drei sauberen Mustern bekommst du robuste Checks für den Skript-Alltag.

## Der pragmatische Standard: Pattern-Matching mit [[]]

Wenn du einfach nur wissen willst, ob ein String einen Teilstring enthält, ist `[[ ... ]]` mit Wildcards meist die beste Wahl.

```bash
text="Hallo Oliver, willkommen im Terminal"
needle="Oliver"

if [[ "$text" == *"$needle"* ]]; then
  echo "Treffer"
else
  echo "Kein Treffer"
fi
```

Das ist lesbar, schnell und braucht keine externen Tools. Wichtig sind die Anführungszeichen um `"$text"` und `"$needle"`, damit Leerzeichen nicht zu unerwartetem Verhalten führen.

## Was hier wirklich passiert und warum es wichtig ist

In `[[ "$text" == *"$needle"* ]]` ist `*...*` Pattern-Matching, kein Regex. Das heißt:

-   `*` steht für "beliebige Zeichenfolge"
-   das Matching ist shell-intern
-   es ist nicht automatisch "wörtlich", wenn `needle` Sonderzeichen enthält

Damit sind wir beim häufigsten Stolperstein.

## Stolperstein: Wenn der Teilstring Sonderzeichen enthält

Wenn `needle` Zeichen wie `*`, `?` oder `[` enthält, wird es im Pattern-Kontext besonders. Beispiel: `needle="a*b"`.

Je nach Ziel gibt es zwei sinnvolle Wege:

### Weg 1: Du willst Pattern bewusst nutzen

Dann ist das Verhalten sogar nützlich, weil du mit Wildcards flexible Matches bauen kannst.

```bash
text="aaab"
if [[ "$text" == a*b ]]; then
  echo "Match"
fi
```

### Weg 2: Du willst literal suchen, ohne Pattern-Effekte

Dann ist `case` oft die robustere Wahl, weil du die Variable in einer Position hast, in der Bash sie nicht noch einmal als Pattern interpretiert.

```bash
text="a*b ist hier wörtlich gemeint"
needle="a*b"

case "$text" in
  *"$needle"*)
    echo "Treffer (literal genug für die Praxis)"
    ;;
  *)
    echo "Kein Treffer"
    ;;
esac
```

Das löst nicht jedes theoretische Edge-Case, ist aber in vielen Skripten stabiler als ein unbewusstes Pattern-Match mit Sonderzeichen.

Wenn du wirklich garantiert literal matchen musst, führt oft kein Weg an einem Tool vorbei, das Plain-String-Suche explizit anbietet.

## Literal und robust: grep -F als Option, wenn Input heikel ist

Wenn die Inputs potenziell "wild" sind, ist `grep -F` (Fixed String) eine pragmatische Lösung. Du gibst den String per `printf` rein, um Edge-Cases mit `echo` zu vermeiden.

```bash
text="a*b [test] ?"
needle="a*b"

if printf '%s' "$text" | grep -Fq -- "$needle"; then
  echo "Treffer"
else
  echo "Kein Treffer"
fi
```

Das ist nicht "reine Bash", aber sehr verlässlich, wenn du keine Pattern-Interpretation willst.

## Regex: Nur wenn du wirklich Muster brauchst

Bash kann Regex mit `=~` in `[[ ... ]]`. Das ist sinnvoll, wenn du nicht nach einem festen Teilstring suchst, sondern nach einem Muster.

```bash
text="Order-12345 abgeschlossen"

if [[ "$text" =~ Order-[0-9]+ ]]; then
  echo "Order-ID gefunden"
fi
```

Warnhinweis: Bei `=~` ist das Quoting anders als bei `==`. Wenn du die Regex in einer Variable hältst, solltest du vorsichtig sein, weil Quoting das Verhalten verändern kann. Für einfache Substring-Checks ist `=~` meist überdimensioniert.

## Mini-Skript: Substring-Check als wiederverwendbare Funktion

Dieses Beispiel zeigt zwei Varianten: Pattern-Matching und Fixed-String über `grep -F`. Du kannst je nach Bedarf entscheiden.

```bash
#!/usr/bin/env bash
set -u

contains() {
  local text="$1"
  local needle="$2"

  [[ "$text" == *"$needle"* ]]
}

contains_fixed() {
  local text="$1"
  local needle="$2"

  printf '%s' "$text" | grep -Fq -- "$needle"
}

text="${1:-}"
needle="${2:-}"

if [[ -z "$text" || -z "$needle" ]]; then
  echo "Usage: $0 <text> <needle>" >&2
  exit 1
fi

if contains "$text" "$needle"; then
  echo "Pattern-Check: Treffer"
else
  echo "Pattern-Check: Kein Treffer"
fi

if contains_fixed "$text" "$needle"; then
  echo "Fixed-Check: Treffer"
else
  echo "Fixed-Check: Kein Treffer"
fi
```

Aufruf:

```bash
./contains.sh "a*b [test]" "a*b"
```

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
