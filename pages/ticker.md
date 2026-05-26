---
layout: default
body_classes: page-blog page-blog-ticker
title: 'Ticker'
description: 'Alle neuen Artikel auf einem Blick: Der Ticker listet aktuelle Beiträge zu Softwareentwicklung, macOS, Git, Künstlicher Intelligenz, digitalen Tools und Tech-Themen chronologisch nach Datum.'
meta_title: 'Ticker | Oliver Jessner Blog'
meta_description: 'Der Ticker zeigt neue Blogposts von Oliver Jessner zu Softwareentwicklung, macOS, Git, Retro-Gaming, KI und digitalen Tools'
permalink: /ticker/
---

{% assign ticker_posts = site.posts %}
{% assign latest_golem_articles = site.data.links.golem | sort: "id" | reverse | slice: 0, 10 %}
{% assign latest_golem_articles_by_date = latest_golem_articles | group_by_exp: "article", "article.date | date: '%Y-%m-%d'" | sort: "name" | reverse %}

<div class="section">
    <div class="container">
        <div class="row">
            <div class="col-12">
                {% include framework/blocks/sections/title.html title=page.title description=page.description %}
            </div>
        </div>
    </div>
</div>

<div class="section pt-0">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-12">
                <div class="blog-ticker-layout">
                    <section class="blog-ticker-row">
                        <h2 class="blog-ticker-column-title">Blogposts</h2>
                        {% include framework/blocks/sections/blog-ticker.html posts=ticker_posts %}

                        <div class="blog-ticker-actions">
                            <a class="button" href="{{ '/blog/' | relative_url }}">Zum Blog</a>
                        </div>
                    </section>
                    {% if latest_golem_articles and latest_golem_articles.size > 0 %}
                    <section class="blog-ticker-row">
                        <h2 class="blog-ticker-column-title">Golem</h2>
                        <div class="blog-ticker blog-ticker-external" aria-label="Letzte Golem-Artikel">
                            <ul class="blog-ticker-list">
                                {% for day in latest_golem_articles_by_date %}
                                {% assign day_articles = day.items %}
                                {% assign first_article = day_articles | first %}
                                <li class="blog-ticker-item">
                                    <div class="blog-ticker-group">
                                        <time class="blog-ticker-date-inline" datetime="{{ first_article.date | date_to_xmlschema }}">
                                            {{ first_article.date | date: "%d.%m.%Y" }}
                                        </time>
                                        <div class="blog-ticker-links">
                                            {% for article in day_articles %}
                                            <a
                                                class="blog-ticker-link"
                                                href="{{ article.link }}"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span class="blog-ticker-title">{{ article.title }}</span>
                                            </a>
                                            {% endfor %}
                                        </div>
                                    </div>
                                </li>
                                {% endfor %}
                            </ul>

                            <div class="blog-ticker-actions">
                                <a class="button" href="https://www.golem.de/search/?q=oliver+jessner">Zum Profil bei Golem.de</a>
                            </div>
                        </div>
                    </section>
                    {% endif %}
                </div>


            </div>
        </div>
    </div>

</div>
