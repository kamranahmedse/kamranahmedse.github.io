---
title: Internal Application Configuration
date: 2016-04-02
permalink: /blog/2016/04/02/configuration-management-in-your-applications/
---

Before you go about reading this article, note that I am not going to write a full-blown configuration loader in this article and the point of this article is just to give you a gist of how you can make one or about the pattern you can use for the application configuration. 

You might have noticed this configuration management pattern in some popular frameworks such as Laravel or Lumen where they have a bunch of [configuration files](https://github.com/laravel/laravel/tree/master/config) placed in a directory and each of the files is doing nothing but returning an array consisting of configuration variables. And then they expose some magical functions to retrieve any of the configuration.

I recently created an SDK for an API where I used the similar approach for the configuration management and the take away is if you `return` some *variable* from a file and include the file on the right side of the assignment operator, the variable will get assigned with the content of what you returned from the file.

For example if you have a file that looks like below

```php
// config/app.php

return [
    'appName' => 'Witchcraft',
    'version' => '1.0',
    'baseUrl' => 'http://witch-craft.dev',

    'leaderWitch' => [
        'witchName' 	=> 'Jane Doe',
	'spellsCount' 	=> 20,

	'favorite_spell' => [
             'name' => 'Voodoo',
	     'spell' => 'Aagra bagra boo, bagra agra shoo'
	],
	'spells' => [
	    // ...
	]
    ]
];

```

You can get the above configuration array in a variable simply by doing

```php
$appConfig = include 'config/app.php';
var_dump($appConfig);	// The array from config/app.php file above
```

And then you can mould this array however you want to get the configuration. [Laravel](https://github.com/laravel/framework/blob/master/src/Illuminate/Foundation/Bootstrap/LoadConfiguration.php#L57) and [Lumen](https://github.com/laravel/lumen-framework/blob/5.2/src/Application.php#L569) are both using the same technique for loading configuration data. 

As far as the configuration loader is concerned, you can create a helper, for example, that loads the configuration data for you i.e. maybe something like

```php
/**
 * Loads the data from configuration files
 * @param  string $fileName
 * @return array
 */
public function load($fileName)
{
    $filePath = basePath() . '/config/' . $fileName . '.php';

    if (is_file($filePath)) {
        return include $filePath; // Will return the array from file
    }

    return [];
}
```

and then use [something like this](https://github.com/maciejczyzewski/bottomline/blob/master/src/__/collections/get.php) to access the configuration by dot notation. 

And that wraps it up folks, do you have better way to suggest? How do you manage configuration of your application? Do share it with me in the comments section below.


