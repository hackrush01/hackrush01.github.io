---
layout: page
title: Blogs
description: ""
# image: assets/images/pic11.jpg
nav-menu: true
---

<!-- Main -->
<div id="main" class="alt">

<!-- One -->
<section id="one">
	<div class="inner">
        <header class="major">
			<h1>Blogs</h1>
		</header>

<!-- Lists -->
<h3>Lists</h3>
<div>
    <h4>Alternate</h4>
    <ul class="alt">
	    {% for post in site.posts %}
            <li><a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endfor %}
    </ul>
</div>

</div>
</section>
</div>
