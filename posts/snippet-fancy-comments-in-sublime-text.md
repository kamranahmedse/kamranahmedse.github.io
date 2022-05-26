---
title: Snippet - Fancy comments in Sublime Text
date: 2015-08-15
permalink: /blog/2015/08/15/snippet-fancy-comments-in-sublime-text/
---

Here is a little sublime snippet that I recently created in order to automate the process of adding fancy comments in my PHP code, of course I am well aware of [DockBlockr](https://packagecontrol.io/packages/DocBlockr) and use it in order to leave dockblock comments, this one just creates a fancy comment like the ones that you might have seen in some Framework or Project files like below.

```php
/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| The first thing we will do is create a new Laravel application instance
| which serves as the "glue" for all the components of Laravel, and is
| the IoC container for the system binding all of the various parts.
|
*/
```

In order to create the snippet, head to `Tools > New Snippet` and paste the following code in the new window that will open

```xml
&lt;snippet&gt;
&lt;content&gt;&lt;![CDATA[
/*
|----------------------------------------------
| ${1:${2:Title} - ${3:Heading for the comment}}
|----------------------------------------------
|
| ${4:Description for the comment}
|
*/
]]&gt;&lt;/content&gt;
&lt;tabTrigger&gt;fcom&lt;/tabTrigger&gt;
&lt;/snippet&gt;
```

Save the file with the name `fancy-comment.sublime-snippet` in the user packages folder. That's it. Now head to any PHP file and enter `fcom` and perss tab, bam! The fancy comment will appear. You may use "Tab" key to navigate through the sections of the comment and provide your comment.
