---
layout: post
title: Smooth Scroll in jQuery
---

Following lets you perform a smooth scroll to an anchor on the same page.

<pre><code class="javascript">
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
</code></pre>


[Source](http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links/)
