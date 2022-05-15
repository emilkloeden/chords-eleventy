---
eleventyExcludeFromCollections: true
---


<script src="/js/index.js"></script>

<ul>
{% for page in collections.chords %}
<li>
    <a href="{{ page.url }}">{{ page.data.artist}} - {{ page.data.title}}</a>
</li>
{% endfor %}
</ul>