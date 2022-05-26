---
title: Check if sent email has been read
date: 2015-11-06
permalink: /blog/2015/11/06/check-if-sent-email-has-been-read/
---
Recently while working upon a project, I was asked to implement the functionality to notify the user whenever the email sent is read.

What I did was, embedded an html image tag with the source set to a URL upon hitting which the email status would change to "Read" and a tiny *invisible* image would be returned in order to prevent it from showing the broken image i.e. something along the lines of following

```html
<img src="http://foobar.com/email/read/{Record Id}" />;
```

How would have you gone about doing this? Do share it in the comments section below.
