---
title: Laravel 5 - Sending data from route to middleware
date: 2015-03-15
permalin: /blog/2015/03/15/laravel-5-sending-data-from-route-to-middleware/
---
> **Update** [Laravel 5.1 and onwards has a support for this by default now now](https://laravel.com/docs/5.1/middleware#middleware-parameters)

Middlewares in Laravel 5 come real handy when you want to perform some actions before or after the route is accessed. I have been working upon a Laravel 5 project in which I recently came across this code in which some session variables were being set in almost every controller's constructor to keep track of the module for which the route was called. And from the looks of it, it would have made a perfect usecase for the middleware, so I set myself to refactor that and port that stuff to a common place i.e. middleware. Now what I thought was to pass the module name to the middleware from route and do all that session stuff in there, but Laravel 5.0 doesn't provide any functionality to send data from the route to middleware out of the box and so I ended up implementing the following work around.

In my route, I stated the middleware as well as a key through which I wanted to send the data to middleware `moduleName` for example. Below is the route group that I created:

```php
// User related route group
Route::group([ 'prefix' => 'user', 'middleware' => 'tracker', 'moduleName' => 'users' ], function () {
    // User routes
});
```

As you can see, I have middleware called `tracker` attached to this route group and I have specified the data that I wanted to send to my middleware in the `moduleName` key, you may name it whatever you want. And then in my middleware's `handle` function, I did something like the following to access the `moduleName` property of the route. Below is what I mean:

```php
// The middleware `PerformerMiddleware`
public function handle($request, Closure $next)
{
    // Access the route
    $currAction = $request->route()->getAction();
	   
    // Access the key, I wanted to access
    $currModule = $currAction['moduleName'];
	   
    // You may add as many keys onto the route and access them 
    // the same way I accessed `moduleName`
	   
    //...
}
```

So to sum it up, in order to pass data from route to the middleware you have to do the following:
- In the route, specify the middleware as well as the key/value pair of the data that you want to send to middleware
- Then in the middleware, access the route by using `getAction` method which will return an associative array consisting of the route's properties by which, you may access any route property you want.
