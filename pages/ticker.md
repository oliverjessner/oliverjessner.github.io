---
layout: default
body_classes: page-blog page-blog-ticker
title: 'Ticker'
description: 'Blogposts chronologisch nach Datum sortiert.'
meta_title: 'Ticker | Oliver Jessner Blog'
meta_description: 'Chronologischer Ticker der letzten 31 Tage.'
permalink: /ticker/
---

{% assign ticker_posts = site.posts %}
{% assign latest_golem_articles = site.data.links.golem | sort: "id" | reverse | slice: 0, 10 %}

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
                    </section>
                    {% if latest_golem_articles and latest_golem_articles.size > 0 %}
                    <section class="blog-ticker-row">
                        <h2 class="blog-ticker-column-title">Golem</h2>
                        <div class="blog-ticker blog-ticker-external" aria-label="Letzte Golem-Artikel">
                            <ul class="blog-ticker-list">
                                {% for article in latest_golem_articles %}
                                <li class="blog-ticker-item">
                                    <a
                                        class="blog-ticker-link"
                                        href="{{ article.link }}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <time class="blog-ticker-date-inline" datetime="{{ article.date | date_to_xmlschema }}">
                                            {{ article.date | date: "%d.%m.%Y" }}
                                        </time>
                                        <span class="blog-ticker-title">{{ article.title }}</span>
                                    </a>
                                </li>
                                {% endfor %}
                            </ul>
                        </div>
                    </section>
                    {% endif %}
                </div>
                <div class="blog-ticker-actions">
                    <a class="button" href="{{ '/blog/' | relative_url }}">Zum Blog</a>
                </div>
            </div>
        </div>
    </div>
</div>
