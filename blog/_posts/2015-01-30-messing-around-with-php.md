---
layout: post
title: Messing around with PHP
comments: true
---
When it comes to variables, you might be aware of the fact that in PHP, variable names can only start with an underscore `_` or a character and there cannot be anything else but yet there is *nothing* wrong with the code below and it would work just fine.

<pre><code class="php">
${'*put whatever you w@nt + in here'} =  'Gotcha!!';
echo ${'*put whatever you w@nt + in here'}; // prints `Gotcha!!`
</code></pre>

The reason why it didn't cause any problems is because the afore mentioned rules do not apply to variable variables. However, **I would never recommend adopting this approach** as it would result in ugly and unmaintainable code.

Another gotcha; while using ternary operators, if you avoid the truthy part of the ternary operator it will return the result of the expression on the left side i.e.

<pre><code class="php">
$lang = 'PHP';

// Instead of the following
// $lang = ( $lang == 'PHP' ) ? $lang : 'Javascript';

// ..you can use the following
$lang = ( $lang == 'PHP' ) ?: 'Javascript';

echo $lang; // prints `PHP`
</code></pre>
