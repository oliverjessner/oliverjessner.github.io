---
layout: post
title: 'Bash-Funktionen: warum Bash kein return in der Funktion hat'
date: 2026-01-16 20:00:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
    - software-development
description: 'Warum return nur Exit-Codes liefert und wie du in Bash echte Werte sauber uebergibst, ohne fragile Tricks'
thumbnail: '/assets/images/gen/blog/bash-funktionen-rueckgabewert-ist-nicht-return/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-funktionen-rueckgabewert-ist-nicht-return/header.webp'
---

Viele scheitern in Bash an einem Detail, das sich wie eine Kleinigkeit anfühlt: return gibt keinen "Wert" zurück, sondern nur einen Status. Wer das trennt, schreibt deutlich stabilere Funktionen.

## Was return in Bash wirklich macht

Bash kennt return, aber es ist kein Rückgabewert wie in Python, JavaScript oder Go. return setzt nur den Exit-Status der Funktion. Der ist auf 0 bis 255 begrenzt, wobei 0 üblicherweise "Erfolg" bedeutet und alles andere als Fehler oder spezieller Status interpretiert wird.

```bash
is_even() {
  local n="$1"
  (( n % 2 == 0 ))
  return $?
}

is_even 10
echo "status=$?"
```

Hier ist $? das Ergebnis. Es ist ein Statuscode, kein beliebiger Wert.

Zwei Konsequenzen sind wichtig:

-   Zahlen größer als 255 werden abgeschnitten, weil Bash nur ein Byte für Statuscodes nutzt
-   Ein Statuscode ist semantisch gut für Ja/Nein oder Erfolg/Fehlschlag, aber nicht für Daten

## Der Standardweg für "echte" Rückgabewerte: stdout

Wenn du aus einer Funktion einen Wert "zurückgeben" willst, schreibst du ihn auf stdout und fängst ihn beim Aufruf ein. Das ist der Shell-typische Mechanismus.

```bash
get_port() {
  echo "8080"
}

port="$(get_port)"
echo "port=$port"
```

Der Punkt ist nicht echo an sich, sondern die Ausgabe auf stdout plus Command Substitution $().

### Wichtig: echo ist nicht immer ideal

echo ist bequem, aber nicht in jedem Fall robust, zum Beispiel bei Strings, die mit -n anfangen oder Backslashes enthalten. In solchen Fällen ist printf die bessere Default-Wahl.

```bash
get_value() {
  printf "%s" "$1"
}

value="$(get_value "$input")"
```

Wenn du nur einen String ausgeben willst, ist printf "%s\n" oft der pragmatischste Standard.

## Statuscode und Wert kombinieren

In guten Bash-Funktionen ist die Trennung klar:

-   Der Rückgabestatus sagt, ob die Funktion erfolgreich war
-   Der Wert kommt über stdout
-   Fehler und Diagnose gehen nach stderr

```bash
read_config_value() {
  local key="$1"

  if [[ -z "$key" ]]; then
    echo "Error: key missing" >&2
    return 2
  fi

  if [[ "$key" == "port" ]]; then
    printf "%s\n" "8080"
    return 0
  fi

  echo "Error: unknown key: $key" >&2
  return 1
}

if value="$(read_config_value "port")"; then
  echo "value=$value"
else
  echo "failed with status=$?" >&2
fi
```

Dieses Pattern fühlt sich nach "CLI-Tool" an, nicht nach Script-Hack.

## Alternativen, wenn stdout nicht passt

Manchmal willst du nicht über stdout gehen, etwa weil die Funktion gleichzeitig Dinge ausgibt oder weil du mehrere Werte liefern willst. Dann gibt es praktikable Alternativen.

### 1) Global variable setzen

```bash
result=""

compute() {
  result="$1"
}

compute "hello"
echo "$result"
```

Das ist simpel, aber schnell fehleranfällig, weil es Seiteneffekte erzeugt. Wenn du das machst, nutze klare Variablennamen und dokumentiere das Verhalten.

### 2) "Output parameter" per Nameref

Ab Bash 4.3 gibt es nameref (declare -n). Damit kannst du einen Variablennamen übergeben und in der Funktion setzen, ohne globale Variablen zu brauchen.

```bash
compute() {
  local input="$1"
  local out_var="$2"
  declare -n out="$out_var"
  out="$input"
}

compute "hello" result
echo "$result"
```

Das ist in größeren Scripts oft die sauberste Lösung, wenn stdout nicht möglich ist. Auf macOS ist zu beachten, dass das System-Bash oft alt ist. In solchen Fällen ist /usr/bin/env bash nicht automatisch "neu genug", je nachdem, welche Bash installiert ist.

### 3) Mehrere Werte über Arrays oder strukturierte Ausgabe

Wenn du mehrere Werte liefern willst, ist eine strukturierte Ausgabe, die du kontrolliert parsebar hältst, oft besser als mehrere echo-Zeilen ohne Format.

Beispiel als key=value:

```bash
get_settings() {
  printf "%s\n" "port=8080" "mode=prod"
}

while IFS="=" read -r k v; do
  case "$k" in
    port) port="$v" ;;
    mode) mode="$v" ;;
  esac
done < <(get_settings)
```

Das ist mehr Code, aber dafür stabil, weil du das Format definierst.

## Warum return trotzdem wichtig bleibt

return ist in Bash nicht nutzlos. Es ist das richtige Werkzeug für:

-   Erfolg oder Fehler signalisieren
-   Bedingungen prüfen
-   Branching in if, while, until nutzen

```bash
file_exists() {
  [[ -f "$1" ]]
}

if file_exists "/etc/hosts"; then
  echo "ok"
fi
```

Hier ist der Statuscode genau die Information, die du brauchst.

## Häufige Stolpersteine in der Praxis

1. "Ich gebe etwas aus und will es speichern"  
   Wenn du debug prints auf stdout schreibst, zerstörst du deinen Rückgabewert. Schreibe Debug-Ausgaben nach stderr.

```bash
debug() { echo "DBG: $*" >&2; }
```

2. "Ich nutze $? zu spät"  
$? gilt nur für den letzten Befehl. Speichere es, wenn du es brauchst.

```bash
cmd
status=$?
```

3. "Meine Funktion liefert Leerzeichen und Zeilenumbrüche"  
   Command Substitution trimmt trailing Newlines. Wenn du exakt formatierte Daten brauchst, ist stdout trotzdem möglich, aber du musst das Format bewusst wählen oder mit printf arbeiten.

## Fazit

In Bash ist return ein Statuscode, nicht der Transportkanal für Daten. Für echte Rückgabewerte ist stdout mit $(...) der Standard, idealerweise mit printf. Der Statuscode bleibt dafür da, um Erfolg und Fehler sauber zu signalisieren. Wenn du beides kombinierst und Diagnosen nach stderr schiebst, werden deine Funktionen deutl

🤫 Pssst: Du möchtest lernen, wie Bash funktioniert? Dann schau dir doch mein [Bash-Tutorial für Anfänger an](https://oliverjessner.at/blog/2026-01-14-bash-mal-anders-einstieg-ins-scripting-ohne-overkill/).
