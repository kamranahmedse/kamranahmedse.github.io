---
layout: post
title: CSS - Yellow Fade Technique
comments: true
---
I just wrote this little CSS snippet implementing [Yello Fade Technique](https://signalvnoise.com/archives/000558.php) for a project that I have been working upon in which I had to highlight the newly added items to catch the attention of the user. 

I could just as well write a little jquery animation snippet but couldn't fathom writing Javascript for this simple CSS task. So the CSS snippet is given below:

<pre><code class="css">
@keyframes yellowfade {
	from { background: yellow; }
	to { background: transparent; }
}

.new-item {
	animation-name: yellowfade;
	animation-duration: 1.5s;
}</code></pre>

**Note** For the sake of brevity I haven't used any prefixes, but real world usage should use the vendor prefixes.

For just a vague idea of how I used it, check the demo at [JSFiddle](http://jsfiddle.net/Q8KVC/528/)
