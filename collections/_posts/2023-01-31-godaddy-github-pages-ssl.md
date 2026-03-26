---
layout: post
title: 'GoDaddy Domain with GitHub Pages'
date: 2023-02-07
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - web-development
    - computer-stuff
    - cloud
    - git
description: "Set up GitHub Pages with a GoDaddy domain, SSL and the right DNS records for a small personal website."
thumbnail: '/assets/images/gen/blog/godaddy-github-pages-ssl/header_thumbnail.webp'
image: '/assets/images/gen/blog/godaddy-github-pages-ssl/header.webp'
---

## GoDaddy plus GitHub Pages plus SSL = Easy Website?

Wer mich kennt, weiß, dass ich meine Dinge gerne plain und simple mag. Daher wollte ich keine Hosting-Kosten für meine Website bezahlen. Darum habe ich mich für - Trommelwirbel - Github Pages entschieden.

Unser "Stack":

-   Github Pages
-   GoDaddy
-   Jekyll Theme

Der erste Schritt ist, einen kostenlosen Github-Account sowie ein kostenloses Repository zu erstellen.
Wir nennen das Repository "username.github.io". Natürlich musst du deinen eigenen Benutzernamen anstelle von "username" eingeben. Wir dürfen nicht vergessen, dass unser Repository auf öffentlich (public) gestellt werden muss.

![Github Pages repo erstellen](/assets/images/gen/blog/godaddy-github-pages-ssl/new_repo.webp)

Im nächsten Schritt clonen wir das Repository, damit wir es lokal haben. Auch hier müssen wir username mit unserem eigenen Benutzernamen ersetzen 😇.

```bash
git clone https://github.com/username/username.github.io
```

## Content

Jetzt können wir ganz einfach eine "index.html" erstellen und diese auf den Server pushen. Schon wäre unsere Webseite online unter "https://username.github.io".

```bash
cd username.github.io
echo "My Website" > index.html
```

Wer sich mit Jekyll auskennt, könnte jetzt einen eigenen Jekyll-Blog aufsetzen. Da ich aber eher faul bin, habe ich mir ein Theme auf [jekyllthemes.io](https://jekyllthemes.io/github-pages-themes) gekauft und dieses auf mein Repository gepusht.

## Domain

Im letzten Schritt erstellen wir DNS-Einträge für unsere Github-Page. In meinem Fall habe ich dafür GoDaddy genutzt. Ich weiß, dass es viele Kritiken an GoDaddy gibt, aber das macht den ganzen Blogpost vielleicht interessanter 🙃.

![DNS auf godaddy domainss](/assets/images/gen/blog/godaddy-github-pages-ssl/godaddy_dns.png)

In GoDaddy gehen wir zu unseren Produkten und wählen dort bei unserer Domain den DNS-Menüpunkt aus.
Dort tragen wir folgende A Records ein:

-   185.199.108.153
-   185.199.109.153
-   185.199.110.153
-   185.199.111.153

Sowie folgenden CNAME Eintrag:

-   CNAME www username.github.io.

![DNS Einträge verändern](/assets/images/gen/blog/godaddy-github-pages-ssl/godaddy_dns_entries.png)

Im Anschluss wechseln wir zurück in unser Repository und erstellen die folgende Datei:

```bash
echo "oliverjessner.io" > CNAME
```

Vergessen Sie nicht, das Repository zu pushen, und wechseln Sie zu Ihrer Github.io-Seite für Ihr Repository.
Um genauer zu sein in die [pages](https://github.com/oliverjessner/oliverjessner.github.io/settings/pages)
Einstellungen des Repos.

![Github Pages Einstellungen](/assets/images/gen/blog/godaddy-github-pages-ssl/gh_enforce_ssl.png)

Hier müssen wir noch die Domain eintragen und Enforce HTTPS aktivieren. Achtung: Es kann leicht
bis zu 24 Stunden dauern, bis die Änderungen wirksam werden. Bei mir hat es sogar mehr als 24 Stunden gedauert.

## Überprüfen

Zum überprüfen ob alles funktioniert, können wir die folgende Kommandozeile ausführen:

```bash
dig username.github.io
```

![DNS überprüfen mit dig](/assets/images/gen/blog/godaddy-github-pages-ssl/dig.png)

Hier sollten wir in der ;; ANSWER SECTION: die richtigen IP-Adressen sehen.

## Fazit

Insgesamt ist es sehr einfach, Github Pages einzurichten und sie mit GoDaddy zu verknüpfen. Natürlich haben wir kein CMS, Rollensystem oder eine vergleichbar komplexe Lösung. Aber gerade für Entwickler, die eine kleine persönliche Homepage benötigen, finde ich die Lösung annehmbar und schnell. Würde ich diese Lösung unseren Kunden verkaufen? Nein. Würde ich aber meinen Entwicklern empfehlen, diese Lösung für ihre kleinen persönlichen Seiten zu verwenden? Ja.
