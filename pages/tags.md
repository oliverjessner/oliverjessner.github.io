---
layout: default
header: false
title: Tags
description: Tags
permalink: /tag/
---

<section class="flex flex-column mw7 center ph3 ph4-ns f5 f4-ns fw3 lh-copy mb0">
  <h1 class="f5 fw4 lh-title mb0 pb2 bb b--light-gray">Tags</h1>
  {% for tag in site.tags %}
  <article class="f5 lh-copy fw3 bb b--light-gray">
    <a class="link black-80 hover-silver" href="{{ "/tag/" | absolute_url }}{{ tag[0] | slugify }}/">
      <h3 class="f3 fw6 lh-title">{{ tag | first }} <span class="silver f6 f5-ns fw2">&#40;{{ tag[1].size }}&#41;</span></h3>
    </a>
  </article>
  {% endfor %}
</section>
