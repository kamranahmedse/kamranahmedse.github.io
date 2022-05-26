---
title: Behavior of links created using Javascript
date: 2014-09-03
permalink: /blog/2014/09/03/behavior-of-links-created-using-javascript/
---

Most of the times, I find my self binding the anchor elements such that when they are clicked I open some window using Javascript i.e. some thing like the following:

```javascript
// &lt;a href="#" class="someLink">Some Link&lt;/a&gt;
 
$('.someLink').on('click', function () {
    window.location = 'http://somelink.com/';
});
```

Of course it works, but the problem with this approach is, `CTRL + click` which is normally used to open the link in the the new tab/window turns out opening the link in the same window and thus poor user experience. So to avoid this i.e. forcing it to open the link in the new tab instead of the current tab, you may want to modify your event as following:

```javascript
$('.someLink').on('click', function(e) {
 
    if(e.metaKey || e.ctrlKey || e.button === 1) {
        window.open('http://somelink.com/');
    }
    else {
        window.location = 'http://somelink.com/';
    }
 
});
```

It’s a little check and can greatly improve the user experience.
