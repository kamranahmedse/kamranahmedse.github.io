---
layout: post
title: Check if sent email has been read
comments: true
---
Recently while working upon a project, I was asked to implement the functionality to notify the user whenever the email sent is read.

What I did was, embedded an html image tag with the source set to a URL by hitting which the email status would change to "Read" and a tiny *invisible* image would be returned i.e. something along the lines of following

<pre><code class="html>
<img src="http://foobar.com/email/read/{Record Id}">
</html></pre>
