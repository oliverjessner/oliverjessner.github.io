---
layout: post
title: 'Bash: Primäre IP-Adresse auf macOS und Linux auslesen'
date: 2026-01-14 11:15:00 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - terminal
    - linux
description: 'So liest du die primäre lokale IP-Adresse in Bash aus: Linux per ip route, macOS per route get und ipconfig, inklusive IPv4/IPv6 und robustem Fallback'
thumbnail: '/assets/images/gen/blog/bash-primaere-ip-adresse-auf-macos-und-linux-auslesen/header_thumbnail.webp'
image: '/assets/images/gen/blog/bash-primaere-ip-adresse-auf-macos-und-linux-auslesen/header.webp'
---

"Welche IP hat mein Rechner?" klingt trivial, ist es aber nur, wenn du genau weißt, welche IP du meinst. Auf Laptops und Dev-Maschinen gibt es oft mehrere Interfaces: Wi-Fi, Ethernet, VPN, Docker, VM-Bridges. In Skripten ist deshalb meist mit “primär” gemeint: die IP des Interfaces, das die Default-Route nach außen nutzt.

## Was "primär" in der Praxis bedeutet

Die robusteste Definition für Skripte ist:

-   primäres Interface = Interface der Default-Route
-   primäre IP = die IP-Adresse dieses Interfaces

Damit landest du im Normalfall bei Wi-Fi oder Ethernet, nicht bei Loopback oder Docker-Interfaces.

## Linux: Default-Route finden und daraus die IP holen

Auf Linux ist `ip` (iproute2) der moderne Standard. Mit `ip route get` kannst du direkt abfragen, welches Interface für “nach draußen” genutzt würde.

```bash
ip route get 1.1.1.1
```

Das liefert eine Zeile, in der unter anderem `dev <iface>` steht. Daraus kannst du Interface und IP ziehen. Ein pragmatisches Muster ist:

```bash
ip -4 route get 1.1.1.1 2>/dev/null | awk '{for(i=1;i<=NF;i++) if($i=="src") {print $(i+1); exit}}'
```

Das gibt die IPv4-Quelle aus, die der Kernel für diese Route wählen würde. In vielen Fällen ist das genau die “primäre” lokale IPv4.

Wenn du das Interface zusätzlich brauchst:

```bash
ip route get 1.1.1.1 2>/dev/null | awk '{for(i=1;i<=NF;i++) if($i=="dev") {print $(i+1); exit}}'
```

## macOS: Interface über route get, IP über ipconfig

Auf macOS ist `ip` nicht der Standard. Hier ist `route get` der verlässliche Weg, um das Interface der Default-Route zu finden.

Interface bestimmen:

```bash
route -n get default | awk '/interface:/{print $2}'
```

Die IP des Interfaces bekommst du dann über `ipconfig`:

```bash
iface="$(route -n get default | awk '/interface:/{print $2}')"
ipconfig getifaddr "$iface"
```

Das ist in der Praxis oft stabiler als `ifconfig`-Parsing, weil `ipconfig getifaddr` direkt die Adresse liefert.

Warnhinweis: Wenn kein IPv4 konfiguriert ist (zum Beispiel reines IPv6 oder ein kaputtes Netz), kann `ipconfig getifaddr` leer zurückgeben. Dann brauchst du einen Fallback.

## IPv6: wenn du es bewusst brauchst

Wenn du IPv6 als “primär” behandeln willst, musst du das explizit so entscheiden.

Linux IPv6 Source für eine Route:

```bash
ip -6 route get 2606:4700:4700::1111 2>/dev/null | awk '{for(i=1;i<=NF;i++) if($i=="src") {print $(i+1); exit}}'
```

macOS IPv6 ist je nach Setup etwas uneinheitlicher. Wenn du primär IPv6 brauchst, ist der zuverlässigste Weg oft: Interface ermitteln und dann gezielt die inet6-Adresse aus `ifconfig` ziehen. Das ist jedoch Parsing-lastiger und deshalb fragiler.

## Ein Bash Snippet für macOS und Linux (IPv4, Default-Route)

Dieses Beispiel versucht zuerst den “Default-Route” Weg und gibt die primäre IPv4 zurück. Es ist bewusst konservativ, weil es für Skripte meist reicht.

```bash
#!/usr/bin/env bash
set -u

os="$(uname -s)"

get_primary_ipv4_linux() {
  if command -v ip >/dev/null 2>&1; then
    ip -4 route get 1.1.1.1 2>/dev/null |
      awk '{for(i=1;i<=NF;i++) if($i=="src") {print $(i+1); exit}}'
  fi
}

get_primary_ipv4_macos() {
  local iface
  iface="$(route -n get default 2>/dev/null | awk '/interface:/{print $2}')"
  if [[ -n "$iface" ]]; then
    ipconfig getifaddr "$iface" 2>/dev/null || true
  fi
}

ip4=""

case "$os" in
  Linux)
    ip4="$(get_primary_ipv4_linux || true)"
    ;;
  Darwin)
    ip4="$(get_primary_ipv4_macos || true)"
    ;;
esac

if [[ -z "$ip4" ]]; then
  echo "Konnte keine primäre IPv4 ermitteln" >&2
  exit 1
fi

echo "$ip4"
```

## Typische Stolpersteine

-   VPNs ändern die Default-Route. Das ist aus Skript-Sicht oft korrekt, kann aber “überraschend” wirken.
-   In Containern ist die “primäre IP” häufig eine interne Bridge-IP, nicht die Host-IP.
-   “Primär” kann je nach Zweck etwas anderes bedeuten: lokale LAN-IP, öffentliche IP, Interface-IP, Hostname-IP. Für öffentliche IP brauchst du einen externen Dienst, das ist ein anderes Problem.

## Kurzfazit

Wenn du in Bash die primäre lokale IP brauchst, definiere “primär” als IP des Default-Route-Interfaces. Auf Linux ist `ip -4 route get` der saubere Weg, auf macOS kombinierst du `route -n get default` mit `ipconfig getifaddr`. Damit bekommst du in den meisten Skript-Alltagen eine verlässliche Antwort ohne fragiles `ifconfig`-Parsing.
