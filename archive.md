---
layout: page
title: Archive
---

<div class="archive">
    {% for post in site.categories.blog %}
        <div class="archive-item">
            <span class="post-date archive-date">{{ post.date | date_to_string }}</span>
            <a href="{{ post.url }}" class="archive-title">
                {{ post.title }}
            </a>
        </div>
    {% endfor %}
</div>