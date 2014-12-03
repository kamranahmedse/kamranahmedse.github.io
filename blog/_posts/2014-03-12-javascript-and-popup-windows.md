---
layout: post
title: Javascript - Dealing with popup windows
---
Firstly to be clear, this is not going to be a complete guide on working with popups, I am just going to explain a few problems that I had to face today and how I tackled them.

The code below can be used to open a simple popup window, positioned at whatever the default location is set.

<pre><code class="javascript">
window.open('http://kamranahmed.info', '@kamran', params)
</code></pre>

First parameter to the function is the URL that is to be opened, second is the title of the window and third one is a string consisting of a [set of parameters](https://developer.mozilla.org/en-US/docs/Web/API/Window.open) that you can pass to modify the look and feel of the popup window. 

What I wanted was to **make the popup window appear in full screen**. To do so, here is what I did

<pre><code class="javascript">
// To make things tidy
var params = [
    'height = '	+ window.screen.height,
    'width = '	+ window.screen.width
].join(',');

var popup = window.open('http://kamranahmed.info', '@kamran', params);
popup.moveTo(0, 0);
</code></pre>

What's happening here is, firstly, I open the window having the width and height equal to that of the screen. And after the window has been opened, I move it to the top left corner of the screen ..why I move it? Because *some* of the browsers out there, don't do this by default.

Another problem that I faced was that the content of the popup window was exceeding the visible screen so what I was expecting it to do was to show the scrollbars but in Firefox, it wasn't showing them by default so I manually had to pass a third parameter for `scrollbars` so my code looked like

<pre><code class="javascript">
// To make things tidy
var params = [
    'height = '	+ window.screen.height,
    'width = '	+ window.screen.width,
    'scrollbars = 1'
].join(',');

var popup = window.open('http://kamranahmed.info', '@kamran', params);
popup.moveTo(0, 0);
</code></pre>
