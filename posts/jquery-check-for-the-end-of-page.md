---
title: Jquery - Check for the end of page
date: 2014-05-15
permalink: /blog/2014/05/15/jquery-check-for-the-end-of-page/
---

In the ERP system, I was asked to add a page that showed the feed of the daily actions as they are performed. I was given a free hand, on whatever design and method I may prefer. I decided to involve infinite scroll i.e. show some feed data to the user and whenever user reached the end of page while scrolling, show more feed. Here is the jquery event that I used to pull the data from the server on reaching the end of the page:

```javascript
$(window).on('scroll', function() {
    if( $(window).scrollTop() + $(window).height() == $(document).height() ) {
        // Send an ajax request
    }
});
```
