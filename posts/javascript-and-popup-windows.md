---
title: Javascript - Dealing with popup windows
date: 2014-12-03
permalink: /blog/2014/12/03/javascript-and-popup-windows/
---

Firstly to be clear, this is not going to be a complete guide on working with popups, I am just going to explain a few problems that I had to face today and how I tackled them.

The code below can be used to open a simple popup window

```javascript
window.open('http://kamranahmed.info', '@kamran')
```

First parameter to the function is the URL that is to be opened, second is the title of the window. Also a third parameter can be passed i.e. a string consisting of a [set of parameters](https://developer.mozilla.org/en-US/docs/Web/API/Window.open) that you can pass to modify the look and feel of the popup window. 

What I wanted, was to **make the popup window appear in full screen**. To do so, here is what I did

```javascript
// To make things tidy
var params = [
    'height = '	+ window.screen.height,
    'width = '	+ window.screen.width
].join(',');

var popup = window.open('http://kamranahmed.info', '@kamran', params);
popup.moveTo(0, 0);
```

What's happening here is, firstly I open the window having the width and height equal to that of the screen. And after the window has been opened, I move it to the top left corner of the screen ..why do I move it? Because *some* of the browsers out there, do not do this by default.

Another problem that I faced was that the content of the popup window was exceeding the visible screen, and I was expecting it to show the scrollbars so that a user may scroll and view the whole page instead of just the visible screen. But in Firefox, scrollbars were not being shown default so I had to modify the code like following

```javascript
// To make things tidy
var params = [
    'height = '	+ window.screen.height,
    'width = '	+ window.screen.width,
    'scrollbars = 1'
].join(',');

var popup = window.open('http://kamranahmed.info', '@kamran', params);
popup.moveTo(0, 0);
```

That's pretty much it.
