---
title: Chords - Eleventy!
layout: base.njk
---

<header class="header">
    <span style="box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; opacity: 1; border: 0px none; margin: 0px; padding: 0px; position: relative; max-width: 100%;">
        <span style="box-sizing: border-box; display: block; width: initial; height: initial; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; opacity: 1; border: 0px none; margin: 0px; padding: 0px; max-width: 100%;">
            <img style="display: block; max-width: 100%; width: initial; height: initial; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; opacity: 1; border: 0px none; margin: 0px; padding: 0px;" alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27144%27%20height=%27144%27/%3e">
        </span>
        <img class="borderCircle" alt="{{ title }}" src="/chords-eleventy/images/logo.jpg" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: medium none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;">
    </span>
    <h1 class="heading2Xl">
        {{ title }}
    </h1>
    </header>
<section class="headingMd">
    <p>A demo app displaying guitar chords</p>
</section>
<section class="headingMd padding1px">
    <h2 class="headingLg">Chords</h2>
    <ul class="list">
{% for page in collections.chords %}
<li class="listItem">
    <a href="{{ page.url | url }}">{{ page.data.artist}} - {{ page.data.title}}</a>
</li>
{% endfor %}
</ul>
</section>