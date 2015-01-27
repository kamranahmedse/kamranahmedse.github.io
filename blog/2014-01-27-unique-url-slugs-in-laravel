---
layout: post
title: Unique URL slugs in Laravel
comments: true
---
In one of the projeccts I have been working upon, I decided to use slugs for URLs, instead of IDs because it allowed me to generate user-friendly URLs and to improve the SEO of the content. 

In my case, there were two places where I decided to use this function that I wrote i.e. 

- When a user registers himself through social registration process, I decided to generate a temporary username off of the user's first and last names using this method, sort of like they do on SoundCloud.

- After a user creates a *Tip*, use that tip's title to generate unique slugs.

Below is the super simple function that you can adapt to your own needs.

<pre><code class="php">
function generateSlug( $tipTitle ) {

    $slug = Str::slug( $tipTitle );
    $slugs = $this->whereRaw("slug REGEXP '^{$slug}(-[0-9]*)?$'");

    if ($slugs->count() === 0) {
        return $slug;
    }

    // Get the last matching slug
    $lastSlug = $slugs->orderBy('slug', 'desc')->first()->slug;

    // Strip the number off of the last slug, if any
    $lastSlugNumber = intval(str_replace($slug . '-', '', $lastSlug));

    // Increment/append the counter and return the slug we generated
    return $slug . '-' . ($lastSlugNumber + 1);
}
</code></php
