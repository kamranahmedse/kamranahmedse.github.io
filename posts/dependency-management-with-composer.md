---
title: Dependency management with Composer
date: 2014-11-03
permalink: /blog/2014/11/03/dependency-management-with-composer/
---

Composer is an application level dependency manager for PHP and it must be a part of the toolkit of a modern PHP Developer, I would say. Projects these days are not developed in isolation. There are many incredibly intelligent developers out there constantly developing awesome “things” to solve the common problems, so whenever you are going to develop something there is fair chance that it might have been developed by someone out there already, so why reinventing the wheel? Right? Why not use that already developed library or whatever?

# The Need

Let’s say you agreed with me on this not-reinventing-the-wheel thing and you are ready to use some library already developed by someone out there. Now if you use any external library, it would become a dependency of your project. Dependencies can be a great asset, yet at the same time a great source of confusion and frustration and it requires a lot of thinking to get them all play together nicely. And here is more, if that dependency that you are going to use has any further dependencies, it might become a nightmare to manage all of them. Not only that but also when you are working in a team of people working upon the same project, making sure that each of the team member has the right development that is right set of dependencies and their required versions. “Ehhh… I am going to reinvent the wheel..” Don’t rush to the decision right away. Brace yourself for what I am going to introduce to you in this article.

# The Solution

Meet [Composer](http://getcomposer.org/) - a dependency manager that will revolutionize the way how you code. You just have to specify your dependencies and composer will automatically download them (and the dependencies of the dependencies) and automatically place them at a specific location where they can easily be accessed.At [packagist.org](http://packagist.org) you can find thousands of packages (~40,000 at the time of this writing) to assist you in your development. Massively popular projects such as [Laravel](https://packagist.org/packages/laravel/laravel), [Symfony](https://packagist.org/packages/symfony/symfony), [PHP Unit](https://packagist.org/packages/phpunit/phpunit), [PHP Geocode](https://packagist.org/packages/kamranahmedse/php-geocode) (ok ok.. this one is not that popular, it’s here because it’s mine ;) ) are using composer as their dependency manager and can be found on [packagist.org](http://packagist.org). Also, you can use packagist to search the package of your need, find the one that you want, introduce it in your project using composer and use it.

# Getting Started with Composer

Enough theory, let’s discuss how can we harness the power of composer in our projects. Firstly, you need to [install composer](https://getcomposer.org/download/), you can visit the site or follow the instructions as given below, if you are using any linux based system.

```bash
curl -sS https://getcomposer.org/installer | php
```

This command downloads the composer and if all is good then composer is perfectly usable now except you’ll have to specify the path to composer.phar whenever you are going to use it. So to ease our sufferings, let’s move it to **/usr/local/bin** so that we may easily access it. You can do that by

```bash
sudo mv composer.phar /usr/local/bin
```

Now go to the command line and type `composer` and press enter and see if you are able to see the screen similar to the following

![Composer](http://i.imgur.com/rKBQpDS.png)

If you see that, we are all good to go. If not, go check and see where you went wrong.

# Introducing your dependencies

Now that we are all set up, let’s see how can we harness the power of composer now to install our dependencies. I am going to explain the use of composer by using one of my own packages available at [packagist.org](http://packagist.org/) (also on [github](https://github.com/kamranahmedse/php-geocode)) called [PHP Geocode](https://packagist.org/packages/kamranahmedse/php-geocode).

First step is to create a really simple file called `composer.json` having the following content in it

```json
{
    "require": {
        "kamranahmedse/php-geocode": "*"
    }
}
```

Before moving on to the next step, let me explain what we have here in composer.json. The above json will require php-geocode package created by kamranahmedse (my user name at packagist) in this project as a dependency. The * here means that we have no restrictions over the version of the package and this dependency can be resolved by any version of the package. To specify some specific version, you can instead do the following

```json
"kamranahmedse/php-geocode": "1.0"
```

Also, you can combine the above two i.e.

```json
"kamranahmedse/php-geocode": "1.*"
```

And this would now require any version having 1 as a major version number i.e. it can be 1.1, 1.2, 1.3 or whatever.

# Installing them

Now that you have specified the dependencies in `composer.json` of your project, you can run the following command to get the dependencies downloaded and be placed in **vendor** directory

```bash
composer install
```

You’ll notice that all of the dependencies will now be placed inside the vendor folder. Also, you can see, a few new files have been created in our project folder

* `composer.lock` is the file that contains the exact descriptions of dependencies of our project. It is generated whenever you run `composer install` for the first time. It basically states that your project is locked to those specific versions of the libs you are using. And if `composer.lock` is present in your project it will be used instead of `composer.json` whenever you run `composer install` or `composer update`
* `vendor` folder contains all the dependencies of your project. All the dependencies go inside this folder in subdirectories of their own
* Also there are `vendor/composer` and `vendor/autoload.php`. You only need to know about `vendor/autoload.php` here. You have to include the `vendor/autoload.php` file in your scripts and it will automatically take care of the autoloading of your dependencies in your project and you will not need any require/include statements.

If for some reason, you want to change the name of `vendor` folder, you can modify your `composer.json` file to look like the following:

```json
{
    "require": {
        "kamranahmedse/php-geocode": "*"
    },
    "config": {
        "vendor-dir": "whatever"
    }
}
```

and now instead of naming the folder `vendor`, composer will now name it as `whatever` as specified in this case.

# Autoloading the dependencies

Now that we have installed our dependencies using `composer install`, it’s time for us to use them. Composer automatically generates an autoloader file at `vendor/autoload.php` (considering that you didn’t chose any other name for directory `vendor`). Let’s see how can we use this autoloader to autoload our dependencies.

In the same web root as `composer.json`, create a new file and place the following code in it

```php
// Include the autloader
require_once('vendor/autoload.php');
 
// Introduce the class into your scope
use kamranahmedse\Geocode;
 
$address = "1600 Amphitheatre Parkway, Mountain View, CA";
 
$geocode = new Geocode( $address );
 
echo "Latitude of the address is : " . $geocode->getLatitude() . "&lt;br&gt;";
echo "Longitude of the address is : " . $geocode->getLongitude() . "&lt;br&gt;";
echo "Country : " . $geocode->getCountry() . "&lt;br&gt;";
echo "City : " . $geocode->getLocality() . "&lt;br&gt;";
echo "District : " . $geocode->getDistrict() . "&lt;br&gt;";
echo "Postal Code : " . $geocode->getPostcode() . "&lt;br&gt;";
echo "Town : " . $geocode->getTown() . "&lt;br&gt;";
echo "Street # : " . $geocode->getStreetNumber() . "&lt;br&gt;";
```

In the above code, we are including the composer generated autoloader, then we introduce the namespace containing our class so that we can use it. We don’t need to include that, composer’s autoloader will automatically handle the inclusion. After that, I am simply using the functionality provided by our dependency i.e. Geocode class.

And that’s all there is to it. If you are curious about the Geocode class that I used to describe composer, you can find more about it through the [git repository of it](https://github.com/kamranahmedse/php-geocode).

# Note

If you are using any version control system, the best practice is ignore the vendor directory and only commit `composer.json` and `composer.lock` files. And the other person working upon your project can simply do `composer install` or `composer update` to get these dependencies.
