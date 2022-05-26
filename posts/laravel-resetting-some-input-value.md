---
title: Laravel - Resetting some `Input` value
date: 2014-07-25
permalink: /blog/2014/07/25/laravel-resetting-some-input-value/
---

I have recently started working in Laravel 4.2 and I must say it is really well [documented](http://laravel.com/docs). At [Strategic Systems International](http://ssidecisions.com), currently I am a part of the team working at a Large scale Health Care System built on top of Laravel.

Today, I faced an issue in which some wasn't working as required. I looked through the code and sooner, I found out that the problem was due to some unnecessary hidden field that was being submitted along with the form when saving the data. `Input` class was being used throughout the action of controller. Now, I had to reset this unnessary hidden field from the `Input`. Now there were several ways to do so. First option was to reset this hidden field value through Javascript before form submission, but JS might be turned off in user’s browser. Other option was to handle this in the action (function) that was handling the saving process. At first, I thought to do it this way:

```php
// Get all the form data except the hidden field
$data = Input::except('foobar')
// Now use $data instead of Input
```

Considering the size of that action that was handling the saving process, sooner I realized that it would be a bad bad idea to adopt this approach. 

I headed to the [Laravel docs for `Input`](http://laravel.com/docs/requests) but strangely there was nothing that I could find regarding resetting values from the `Input`. I searched through the google and finally found it in the [Laravel 3 docs](http://three.laravel.com/docs/input). Here is how I implemented this:

```php
// Merge the Input array with my custom array.
Input::merge(array( 'foobar' => null ));
```

and that did the trick.
