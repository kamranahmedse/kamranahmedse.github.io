---
layout: project
title: PHP Geocode - A wrapper around Google Geocoding API
---

A wrapper around the Google Geocoding API to get different details regarding an address such as

* Latitude/longitude
* Country
* City
* District
* Postcode
* Town
* Street number

#Requirements
PHP >= 5.3.0 and `curl` enabled server.

#How to install?
You can install the library using the following ways

##Composer – Recommended way
The recommended installation method is through [Composer](http://getcomposer.org/), a dependency manager for PHP. Just add `kamranahmedse/php-geocode` to your project’s `composer.json` file:

<pre><code class="json">
{
    "require": {
        "kamranahmedse/php-geocode": "*"
    }
}
</code></pre>

and then run `composer install`. For further details you can find the package at [Packagist](https://packagist.org/packages/kamranahmedse/php-geocode).

##Manual Way
Or you can install the package manually by:
* Copy `src/php-geocode.php` to your codebase, perhaps to the `vendor` directory.
* Add the `Geocode` class to your autoloader or require the file directly.

#How to use?
I’m going to use the following address to explain the use of library

>1600 Amphitheatre Parkway, Mountain View, CA

Firstly, you have to instantiate the `Geocode` class and pass the address, so your code will look like

<pre><code class="php">
// Introduce the class into your scope
use kamranahmedse\Geocode;

$address = "1600 Amphitheatre Parkway, Mountain View, CA";

$geocode = new Geocode( $address );
// Optionally you can pass a second parameter set to true if you want to use https instead of http
// $geocode = new Geocode( $address, true );

// Note: All the functions below accept a parameter as a default value that will be return if the reuqired value isn't found
$geocode->getAddress( 'default value' );
$geocode->getLatitude(); // returns the latitude of the address
$geocode->getLongitude(); // returns the longitude of the address
$geocode->getCountry(); // returns the country of the address
$geocode->getLocality(); // returns the locality/city of the address
$geocode->getDistrict(); // returns the district of the address
$geocode->getPostcode(); // returns the postal code of the address
$geocode->getTown(); // returns the town of the address
$geocode->getStreetNumber(); // returns the street number of the address
</code></pre>

#Note
It should be noted that, the Google Geocoding API has the following limits in place and you should keep them in mind before using this wrapper:

* 2,500 requests per 24 hour period.
* 5 requests per second.


#Further details
* You can find the [project at github](https://github.com/kamranahmedse/php-geocode)
* Skills used were * PHP * PHP Unit * Travis CI