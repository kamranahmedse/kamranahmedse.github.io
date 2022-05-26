---
title: Laravel 5.1 - Showing progress bars in commands
date: 2015-11-29
permalink: /blog/2015/11/29/laravel-5.1-progress-bar-in-commands/
---
Among the *numerous* other wonderful things that Laravel 5.1 has introduced, it has introduced the progress bar component which allows you to show the progress of Commands. For me, since I use Commands very often for certain kinds of tasks, this addition of the progress bars is going to help me add more personality to the commands I write.

From the documentation:

> For long running tasks, it could be helpful to show a progress indicator. Using the output object, we can start, advance and stop the Progress Bar. You have to define the number of steps when you start the progress, then advance the Progress Bar after each step:

```php
$users = App\User::all();

$bar = $this->output->createProgressBar(count($users));

foreach ($users as $user) {
    $this->performTask($user);

    $bar->advance();
}

$bar->finish();
```

[Link to the documentation](http://laravel.com/docs/5.1/artisan#writing-output)
