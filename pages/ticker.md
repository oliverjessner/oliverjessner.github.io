---
layout: default
body_classes: page-blog page-blog-ticker
title: 'Tech-Ticker'
image: '/assets/images/og/ticker.webp'
description: 'Alle neuen Artikel von Oliver Jessner chronologisch sortiert: Softwareentwicklung, Git, macOS, Künstliche Intelligenz, digitale Tools, Webentwicklung und Retro-Gaming.'
meta_title: 'Tech-Ticker von Oliver Jessner: Neue Artikel zu KI, Git, macOS und Softwareentwicklung'
meta_description: 'Der Tech-Ticker zeigt neue Beiträge zu KI, Git, macOS, Softwareentwicklung, Webentwicklung, digitalen Tools und Retro-Gaming chronologisch im Überblick.'
permalink: /ticker/
section_nav:
    - label: 'Blogposts'
      href: '#blogposts'
    - label: 'Golem'
      href: '#golem'
    - label: 'IGN'
      href: '#ign'
    - label: 'Neueste Updates'
      href: '#updates'
---

{% assign ticker_posts = site.posts %}
{% assign latest_golem_articles = site.data.links.golem | sort: "id" | reverse | slice: 0, 10 %}
{% assign latest_ign_articles = site.data.links.ign | sort: "date" | reverse | slice: 0, 10 %}

<div class="section">
    <div class="container">
        <div class="row">
            <div class="col-12">
                {% include framework/blocks/sections/title.html title=page.title description=page.description %}
            </div>
        </div>
    </div>
</div>

{% assign ticker_section_nav = page.section_nav %}
{% unless latest_golem_articles and latest_golem_articles.size > 0 %}
    {% assign ticker_section_nav = ticker_section_nav | where_exp: 'item', "item.href != '#golem'" %}
{% endunless %}
{% unless latest_ign_articles and latest_ign_articles.size > 0 %}
    {% assign ticker_section_nav = ticker_section_nav | where_exp: 'item', "item.href != '#ign'" %}
{% endunless %}
{% include framework/blocks/components/section-nav.html items=ticker_section_nav %}

<div class="section pt-0">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-12">
                <div class="blog-ticker-layout">
                    <section class="blog-ticker-row" id="blogposts">
                        <h2 class="blog-ticker-column-title">Blogposts</h2>
                        {% include framework/blocks/sections/blog-ticker.html posts=ticker_posts %}

                        <div class="blog-ticker-actions">
                            <a class="button" href="{{ '/blog/' | relative_url }}">Zum Blog</a>
                        </div>
                    </section>
                    {% include framework/blocks/sections/external-ticker.html articles=latest_golem_articles
                    section_id="golem" heading="Golem" button_url="https://www.golem.de/search/?q=oliver+jessner"
                    button_text="Zum Profil bei Golem.de" %}
                    {% include framework/blocks/sections/external-ticker.html articles=latest_ign_articles
                    section_id="ign" heading="IGN" button_url="https://de.ign.com/u/oliver-jessner"
                    button_text="Zum Profil bei IGN" %}
                    <section class="blog-ticker-row" id="updates">
                        <h2 class="blog-ticker-column-title">Neueste Updates</h2>
                        {% include framework/blocks/sections/blog-ticker.html posts=site.posts
                        date_field="last_modified_at" limit=10 aria_label="Die zehn zuletzt aktualisierten Blogposts" %}
                    </section>
                </div>


            </div>
        </div>
    </div>

</div>
