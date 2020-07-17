---
title: Tags
image: /images/pages/tags/background.jpg
excerpt: All tags from all articles on my page.
---
<div class="post-content" itemprop="articleBody">
  <div class="post__tags">

    {% for tagItem in site.tags %}

      <a class="big-tag" href="{{ tagItem | first | prepend: '/tag/' | prepend: site.baseurl }}" style="text-decoration: none;">{{ tagItem | first }}</a>

    {% endfor %}
  </div>
</div>
