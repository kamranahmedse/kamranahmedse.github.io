---
layout: post
title: Request based Caching in Laravel/Lumen
comments: true
---

There might be times, when you would want to persist some data for the lifetime of a specific request and be destroyed as soon as the request completes. Now you might be tempted to use Laravel's caching for that but it doesn't support request based caching and there is no default way to achieve that, atleast not that I know of.

There might be multiple ways of achieving it e.g. you can use either session or cache i.e. put some values against some specifically formatted keys and then write some middleware that unsets those cache/session values at the end of each request or you can use Laravel's [Service Container](https://laravel.com/docs/5.2/container), for example. 

I had this specific scenario in which I needed the same i.e. generate some data and persist to make it available throughout the application for the current request. I decided to go with using Laravel's service container. Below is how to achieve that.

First things first, create a holder class in which, we'll be putting our logic for the *caching*

```php
<?php

use Illuminate\Support\Facades\App;

/**
 * Class CacheHelper
 *
 * Helper to assist in caching related tasks
 */
class CacheHelper
{
    /**
     * An associative array that will be housing all the cached 
     * items for the current request
     *
     * @var array
     */
    public $cachedItems = [];

    /**
     * Caches the data for current request only
     *
     * @param $cacheKey
     * @param $callback
     *
     * @return mixed
     */
    public static function persist($cacheKey, $callback)
    {
        $cache = App::make('CacheHelper');

        // Return the cached item if it is already there
        if (!empty($cache->cachedItems[$cacheKey])) {
            return $cache->cachedItems[$cacheKey];
        }

        $result = $callback();

        $cache->cachedItems[$cacheKey] = $result;

        return $result;
    }
}
```

As you can notice from the method `persist` it expects a key against which the data is to be cached and the second parameter which would be a callback returning the data to be persisted. Inside the method, we are using `App` to instantiate `CacheHelper` which is a singleton and then we have some logic to set the data in singleton or return it if it is already set. 

Okay now we are more than half way through. Now all you need to do is register this `CacheHelper` singleton in any of your applications service providers. For example, you can use the `AppServiceProvider` that Laravel ships with. Open the provider class and put the following binding in the `register` method of the provider:


```php
App::singleton('CacheHelper', function () {
    return new CacheHelper();
});
```

Voilla, you are all set to use the request based caching.

## Usage

Just call the method `CacheHelper::persist` with a key and a callback returning the data that you need to cache. For example:

```php
CacheHelper::persist('top_visitors', function () {
    return Visitors::orderBy('visit_count', 'DESC')
                ->take(10)
                ->get()
});
```

For any request, wherever you will make this call, it will only query the database once and for any calls made afterwards will return the same data from the first request and not query the database again.
