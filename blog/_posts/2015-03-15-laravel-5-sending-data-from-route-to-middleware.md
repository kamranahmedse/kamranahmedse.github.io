---
layout: post
title: Laravel 5 Sending data from route to middleware
comments: true
---
Middlewares in Laravel 5 come real handy when you want to perform some actions before or after the route is accessed. I have been working on a Laravel 5 project in which I recently came across this code in which some session variables were being set in almost every controller's constructor. Now, since the variables were same but the values being set were being set keeping in view the controller in which the variables are being set. I am into this habbit that whenever I notice something that can be improved, I make sure that I do improve it. So, I decided to refactor this i.e. to remove this repetitive code from each of the controllers and take it to a Middleware so that it is easily maintainable and so I created a common middleware for that piece of code and put that session code there. Now the next thing was, to make sure that session values are being set correctly and to do that I had to keep track of the thing that on which route the middleware is being called.

To keep track of the route type in middleware, I had to pass the data to the middleware pointing out the route upon which the middleware was being called. I looked and found out that Laravel 5 doesn't provide any functionality to send data from the route to middleware out of the box and so I ended up implemented the following work around.

In my route, I stated the middleware as well as a key through which I wanted to send the data to middleware `moduleName` for example. Below is the route group that I created:

<pre><code class="php">
// User related route group
Route::group([ 'prefix' => 'user', 'middleware' => 'tracker', 'moduleName' => 'users' ], function () {
    // User routes
});
</code></pre>

As you can see, I have middleware called `tracker` attached to this route group and I have specified the data that I wanted to send to my middleware in the `moduleName` key, you may name it whatever you want. And then in my middleware's `handle` function, I did something like the following to access the `moduleName` property of the route. Below is what I mean:

<pre><code class="php">
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
</code></pre>

So to sum it up, in order to pass data from route to the middleware you have to do the following:
- In the route, specify the middleware as well as the key/value pair of the data that you want to send to middleware
- Then in the middleware, access the route by using `getAction` method which will return an associative array consisting of the route's properties by which, you may access any route property you want.
