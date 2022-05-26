---
title: Creating a Modular Application in Laravel 5.1
date: 2015-12-03
permalink: /blog/2015/12/03/creating-a-modular-application-in-laravel/
---

Instead of having a giant mammoth of code, having your application divided into small meaningful modules can make the development of a giant site more manageable and enjoyable. 

I have just started working upon a new project in Laravel 5.1 that is going to be huge in terms of functionality. Considering the scale of application, the different modules that it was going to have, instead of jumbling every thing up (controllers, models and views etc) in the existing directories that Laravel provides, I decided to implement modules such that each of the modules will have everything, (it's controllers, models, views, middlewares, any helpers etc) separated. Now there might be several ways to approach this, but here is how I structured it.

```php
config\
    module.php
    ...
    ...
app\
    ...
    ...
    Modules\
        ModuleOne\
            Controllers\
            Models\
            Views\
            routes.php
        ModuleTwo\
            Controllers\
            Models\
            Views\
            routes.php
        ModulesServiceProvider.php
    ...
```

You can follow the steps stated below to achieve a similar structure:

## Setting up the Structure

Create a file called `module.php` inside the `config` directory. This file is going to hold the module names that we want to load and other configuration related to the modules. For now, lets keep it simple and just have the module names that we want to load. The file might look like below. (Note that the `User`, `Employee` are the module names that we want to load. And for every new module that you would want to create, you will have to add the name for it in this `modules` array.)

```php<?php
# config/module.php

return  [
    'modules' => [
       'User',
       'Employee',
    ]
]
```

Create a directory called `Modules` inside the `app` directory. This directory is going to have a separate folder for each of the modules. For example, there can be a folder called `User`, one called `Employee` so on and so forth.

Let's say that we want to create an `Employee` module. In that case, create an `Employee` directory at `app\Modules\`. And in this new directory create three directories namely `Controllers`, `Models` and `Views` and a file called `routes.php`. There is nothing special with the module, I mean the `routes.php` file is going to be used exactly how we use the outer `routes.php` file, controllers and models will be same as well. The only thing that you will have to take care about is the namespacing. You will have to make sure that you give proper namespaces to each controller/model that you create. In this case, the controllers will be having the namespace of `App\Modules\Employee\Controllers` and for any model, it would be `App\Modules\Employee\Models`. The final directory structure may look like the following:

```bash
app\
    Modules\
        Employee\
            Controllers\
            Models\
            Views\
            routes.php
        User\
            Controllers\
            Models\
            Views\
            routes.php
```

Please note that you are not bound to have only the above stated directory structure, you are free to structure it however you want (but you have to make sure that you use proper namespacing). Without any doubt, you can add anything related to your module here as well for example form requests, helpers etc.

## Creating the Service Provider

Now again, head to the `Modules` directory and add a file called `ModulesServiceProvider`. What we are going to do is make this Service provider inform Laravel that we are going to use these modules and you have to load each of the module's `routes` and `views` from these modules as well. So that when a `route` or `view` will be looked up, Laravel will look into these folders as well. Below is how the service provider might look like: 

```php
<?php namespace App\Modules;
 
/**
* ServiceProvider
*
* The service provider for the modules. After being registered
* it will make sure that each of the modules are properly loaded
* i.e. with their routes, views etc.
*
* @author Kamran Ahmed <kamranahmed.se@gmail.com>
* @package App\Modules
*/
class ModulesServiceProvider extends \Illuminate\Support\ServiceProvider
{
    /**
     * Will make sure that the required modules have been fully loaded
     * @return void
     */
    public function boot()
    {
        // For each of the registered modules, include their routes and Views
        $modules = config("module.modules");

        while (list(,$module) = each($modules)) {

            // Load the routes for each of the modules
            if(file_exists(__DIR__.'/'.$module.'/routes.php')) {
                include __DIR__.'/'.$module.'/routes.php';
            }

            // Load the views
            if(is_dir(__DIR__.'/'.$module.'/Views')) {
                $this->loadViewsFrom(__DIR__.'/'.$module.'/Views', $module);
            }
        }
    }

    public function register() {}

}
```

Now the next thing is registering this service provider with the Laravel. And for that, open up the file `config/app.php` and add 'App\Modules\ModulesServiceProvider' to the end of the providers array.

```php
#config/app.php

'providers' => [
    ...
    ...
    App\Modules\ModulesServiceProvider::class,
]
```

## Adding Modules

Everything is setup now. In order to add a new module, all you have to do is create a folder for the module inside the `App\Modules\` directory, place your controllers, models, views and routes in this directory, register this module name in the `config\module.php` and your module has been registered with Laravel. Using the controllers and models is the same that is how you use any outer controller or model i.e. by specifying the correct namespace. But for loading views, what you have to do is call a view like: `ModuleName::viewname` e.g.

```php
return view('Employee::dummy');
```

And that sums it up. Do you have any techniques of your own? How do you structure your modules in Laravel? Do not forget to share it with everyone in the comments section below.

**Note:** Please note that, during the process, if you come across any **Class not found** exceptions and you haven't done anything wrong, just run `composer dump-autoload`.

Source code can be found through this [Github repository](https://github.com/kamranahmedse/laravel-modular-boilerplate)
