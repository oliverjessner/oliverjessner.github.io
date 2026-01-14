---
layout: post
title: 'Bash: Strings vergleichen ohne Überraschungen'
date: 2026-01-14 16:03:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
description: 'So vergleichst du Strings in Bash korrekt: = vs ==, lexikografisch mit < und >, leer prüfen, Case-Insensitivity, Pattern-Matching und warum Quotes entscheidend sind'
thumbnail: '/assets/images/gen/blog/bash-strings-vergleichen-ohne-ueberraschungen/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-strings-vergleichen-ohne-ueberraschungen/header.webp'
---

Strings zu vergleichen wirkt trivial, bis Leerzeichen, leere Variablen oder Pattern-Matching ins Spiel kommen. In Bash gibt es mehrere Test-Varianten, und der wichtigste Unterschied ist, ob du POSIX-kompatibel bleiben willst oder bewusst Bash-Features nutzt.

## Die wichtigste Regel: Variablen immer quoten

Viele “komische” Bugs beim Stringvergleich kommen von fehlenden Quotes. Sobald ein String Leerzeichen enthält oder leer ist, kann Bash deinen Test anders parsen als gedacht.

Das ist robust:

```bash
if [[ "$a" == "$b" ]]; then
  echo "gleich"
fi
```

Das ist fehleranfälliger:

```bash
if [[ $a == $b ]]; then
  echo "gleich"
fi
```

In `[[ ... ]]` ist unquoted oft weniger gefährlich als in `[ ... ]`, aber als Standard im Skript-Alltag ist `"$var"` die sichere Gewohnheit.

## Gleichheit und Ungleichheit: =, == und !=

In Bash kannst du Strings so vergleichen:

```bash
a="hello"
b="hello"

if [[ "$a" == "$b" ]]; then
  echo "gleich"
fi
```

Ungleich:

```bash
if [[ "$a" != "$b" ]]; then
  echo "ungleich"
fi
```

In `[[ ... ]]` sind `=` und `==` für String-Gleichheit praktisch gleichwertig. In POSIX `[ ... ]` ist `=` der portable Operator, `==` ist dort nicht garantiert.

Portabel (sh-kompatibel):

```bash
if [ "$a" = "$b" ]; then
  echo "gleich"
fi
```

## Leere Strings prüfen: -z und -n

Sehr häufig willst du nicht “gleich”, sondern “leer oder nicht”.

Leer:

```bash
if [[ -z "$a" ]]; then
  echo "leer"
fi
```

Nicht leer:

```bash
if [[ -n "$a" ]]; then
  echo "nicht leer"
fi
```

Das ist klarer und robuster als `[[ "$a" == "" ]]`.

## Lexikografisch vergleichen: < und >

Wenn du Strings alphabetisch vergleichen willst, geht das in `[[ ... ]]` mit `<` und `>`.

```bash
if [[ "$a" < "$b" ]]; then
  echo "$a kommt vor $b"
fi
```

Wichtig: In `[ ... ]` müssen `<` und `>` oft escaped werden, weil sie sonst als Umleitung interpretiert werden.

```bash
if [ "$a" \< "$b" ]; then
  echo "a ist kleiner"
fi
```

Praktischer ist hier meist einfach `[[ ... ]]`.

Hinweis: Das ist ein lexikografischer Vergleich nach Locale-Regeln. In unterschiedlichen Locales kann die Sortierung anders sein. Für “reproduzierbare Sortierung” ist das ein eigenes Thema.

## Pattern-Matching: Wildcards statt exaktem Vergleich

In `[[ ... ]]` ist `==` nicht nur “gleich”, sondern kann auch Pattern-Matching. Das ist sehr nützlich, wenn du prüfen willst, ob ein String mit etwas beginnt oder etwas enthält.

Beginnt mit:

```bash
if [[ "$name" == dev-* ]]; then
  echo "dev branch"
fi
```

Enthält:

```bash
if [[ "$text" == *"error"* ]]; then
  echo "enthält error"
fi
```

Wichtig: Wenn du den rechten Teil quotest, wird das Pattern zu einem literal String. Das ist oft genau das, was du willst, wenn der Vergleichswert aus User-Input kommt.

Literal vergleichen, auch wenn `b` Sonderzeichen enthält:

```bash
if [[ "$a" == "$b" ]]; then
  echo "gleich"
fi
```

Pattern bewusst anwenden:

```bash
pattern="dev-*"
if [[ "$name" == $pattern ]]; then
  echo "match"
fi
```

## Case-insensitiver Vergleich

Wenn du Groß/Kleinschreibung ignorieren willst, ist es meist am einfachsten, beide Seiten zu normalisieren. In Bash geht das mit Parameter Expansion.

```bash
a="Hello"
b="hello"

if [[ "${a,,}" == "${b,,}" ]]; then
  echo "gleich (case-insensitive)"
fi
```

`${var,,}` ist Bash-spezifisch. Für POSIX würde man eher über externe Tools gehen, was für viele Skripte unnötig ist.

## Mini-Funktion: Strings robust vergleichen

Wenn du oft denselben Vergleich brauchst, kapsel ihn als Funktion:

```bash
equals() {
  [[ "$1" == "$2" ]]
}

if equals "$a" "$b"; then
  echo "gleich"
fi
```

Das macht Aufrufer klarer und reduziert Copy-Paste-Fehler.

## Typische Stolpersteine aus der Praxis

-   `[ ... ]` ist ein Kommando, `[[ ... ]]` ist Bash-Syntax. Sie verhalten sich unterschiedlich, vor allem bei Pattern-Matching.
-   In `[ ... ]` können unquoted Variablen schnell zu “too many arguments” führen.
-   `<` und `>` sind in `[ ... ]` ohne Escaping oft Umleitungen, nicht Vergleiche.
-   In `[[ ... ]]` kann `==` Pattern sein. Das ist Feature und Risiko zugleich.

## Kurzfazit

Für Bash-Skripte ist `[[ ... ]]` die beste Standardwahl: `==` oder `=` für Gleichheit, `!=` für Ungleichheit, `-z` und `-n` für leer/nicht leer, sowie `<` und `>` für lexikografische Vergleiche. Wenn du Patterns nutzt, tu das bewusst, und quote Variablen konsequent, damit Tests nicht bei Leerzeichen oder leeren Strings auseinanderfallen.
