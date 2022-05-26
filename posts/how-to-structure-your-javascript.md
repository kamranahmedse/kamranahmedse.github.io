---
title: How to structure your Javascript
date: 2014-08-07
permalink: /blog/2014/08/07/how-to-structure-your-javascript/
---

Being a full stack web developer, I have been toying around with pretty intensive jquery and ajax based web applications since the time I first started in web development. At Digitalsofts I developed a web based ERP system, along with it’s several versions for different domains, that made a heavy use of Javascript and Ajax and now at Strategic Systems International, I have been working upon an intensive health care application that again makes an intensive use of Javascript/Jquery and Ajax. Apart from the above mentioned projects, I have developed several other Javascript heavy applications e.g. [GCUF News Caster](http://goo.gl/5zfLa2) and [Toodloo](https://github.com/kamranahmedse/angularjs-todo) etc.

From my experience in Javascript, I have come to the point that it gives you a free hand and doesn’t enforce a particular structure on you. Now it is up to you to either make a unmanageable mess out of it, maintaining which would be a nightmare, or you can write a well structured code, maintaining which would be a breeze. It is important that you structure your Javascript, because:

* It’ll make your code clean and consistent, so you’ll know where to find what.
* Done right, it would make your code easier to understand for others and of course for yourself as well when you’ll revisit it later.
* It will make your code testable.
* Later on it’ll make you feel proud ;-) …and you’ll feel compelled to use the best practices.

So, let me start with how I structured my Javascript in ther ERP system that we talked about.

>Please note that, there are several patterns to structure your Javascript, but I use Modular Pattern most of the time and that’s what I am going to explain in this article.

# Javascript Modules
In layman terms, I would explain the Javascript module as:

>A chunk of related code having it’s own distinct meaning.

For now, let’s keep it to that and I’d explain it a bit more later in the article. Now you may disagree with me, but that’s what I think of a Javascript module. Though, I’d love to hear your conflicting thoughts regarding Javascript Modules, if any, through your comments.

# Decision of Modules
While developing the ERP system. The first step, that I took was the **Decision of Modules.** There were several usecases that were related to each other. Let’s take the example of **Sale Transaction,** for sale transaction there was a single voucher on which the **New Transaction, Update Transaction, Remove Sale Transaction** were being handled, So I thought to create a *module* called **Sale**. Another example would be, there was **Sale Report** that allowed the user to check the sales in some given date range and view the results that are grouped by **item**, **voucher number**, **customer** or **date** etc. Also in each grouping, a user can check a specific **item**, **voucher** or **customer**’s sale record and there was a search filter as well to allow the user to do a fuzzy search through the sales in each grouping etc. This all was to be handled on a single page, so I thought to create a *module* called **SaleReport**. In the same way, there were other modules in the application. You may say that Javascript modules that I decided were based upon the idea that related functionalities were to be kep in a single module, as I gave the examples of **Sale** and **SaleReport** module above.

# Modular Pattern Explained
Enough of the theory, let’s just dive into some Javascript to understand what exactly is the Modular Pattern and how can we use it to structure our code. A modular pattern can be implemented using many different variations, let’s get ourselves familiar with a really basic one.

It would be better, if we use some real world example in our explanation. So I’m going to use the example of a simple feed reader that reads and parses XML feed of some site. A module looks like the following:

```javascript
var FeedReader = {
 
};
```

Just a simple Javascript object, which you are probably already familiar with. For consistency in my code, I follow some conventions i.e. name of module to be written in Pascal Case and for variables etc, I prefer camel case. Now that we have a module to work with, the next is some settings that we’ll define for this module.

```javascript
var FeedReader = {
 
    settings: {
        feedItemsCount: 10,
        url: 'http://someurl.com/news/feed/',
        feedListing: $('div#feedListing'),
        loadFeedButton: $('a.loadFeed')
    }
};
```

We usually define `settings` property in each of our modules that holds some common settings for our module so that we can use them to modify some certain behavior of our module actions. For example, as you can see from the settings that I have defined, `feedItemsCount` holds the number of feed items that we want to fetch in a single Ajax request. `url` is the url from which we want to read the feed. `feedListing` is the reference to DOM element to which the fetched feeds will be appended and `loadFeedButton` is the button which will fetch feed from the url.

The next most commong thing for a module is `init` function.

```javascript
var FeedReader = {
 
    settings: {
        feedItemsCount: 10,
        url: 'http://someurl.com/news/feed/',
        feedListing: $('div#feedListing'),
        loadFeedButton: $('a.loadFeed')
    },
 
    init: function () {
        FeedReader.showErrorIfSourceDead();
    },
 
    showErrorIfSourceDead : function () {
        if ( FeedReader.isSourceAlive( FeedReader.settings.url ) === false ) {
            alert("The URL provided can't be used to fetch feed.");
        }
    },
 
    isSourceAlive: function () {
        // ...
    }
};
```

`init` is the function that gets everything started. You may call some setup functions here, for examples notice the function call `FeedReader.showErrorIfSourceDead();` that would show an error to the user stating that the website is not alive and to stop further processing. Now in the function `showErrorIfSourceDead();` notice the function call `FeedReader.isSourceAlive();`. As you can, see how managed the code is.

Next is, `bindUI` function to bind the user interface i.e. the place where all the event bindings take place.

```javascript
var FeedReader = {
 
    settings: {
        feedItemsCount: 10,
        url: 'http://someurl.com/news/feed/',
        feedListing: $('div#feedListing'),
        loadFeedButton: $('a.loadFeed')
    },
 
    init: function () {
        FeedReader.showErrorIfSourceDead();
        FeedReader.bindUI();
    },
 
    bindUI: function () {
        FeedReader.settings.loadFeedButton.on('click', function ( e ) {
            e.preventDefault();
            FeedReader.fetchFeed();
        });
    },
 
    showErrorIfSourceDead: function () {
        if ( FeedReader.isSourceAlive( FeedReader.settings.url ) === false ) {
            alert("The URL provided can't be used to fetch feed.");
        }
    },
 
    isSourceAlive: function () {
       // ...
    },
 
    fetchFeed: function () {
        // Fetch feed from the `FeedReader.settings.url`
        // Append the feed to the `FeedReader.settings.feedListing`
    }
};
```

You’ll most commonly see the `bindUI` called in the `init` function of the module, as it is one of the most important part of the application as it sets up the event bindings etc that lets us interact with our application. As you can see in this example, we have fetched the `FeedReader.settings.loadFeed` button from the settings of the module and attached the `event` to this button. And then in click event we have called the `fetchFeed` function of the module that fetches feed from the `FeedReader.settings.url` and attaches the returned feed to `FeedReader.settings.feedListing` container.

In the same way, you can put all your functionality in a module.

# Placement of Modules

Instead of putting your Javascript code mudded with the HTML, place each of your module in a seaparate Javascript file with the name of the file same as the name of the module that it contains. For example, the **Sale** module will be placed in **Sale.js** and in the same way, **SaleReport** module will be placed in the **SaleReport.js** file. And each of the script will be included only the page where it will be needed.

Now that you have got the idea that you should have only one module per file, next step is the placement of these files i.e. where should these module files be placed. What I prefer is put them in my assets folder of my project. For example, usually my assets folder looks like:

![File Structure](http://i.imgur.com/x6W43tn.png)

Notice the js folder. All the plain javascript files will be placed in the root of `js` folder. Plugins and frameworks etc for example, twitter bootstrap, jquery etc will be placed in the `js/lib` folder. And Modules will be placed in the `js/modules` folder. Now it should be noted that the modules in the `js/modules` folder are further organized into sub folders. For example all the `Sale` related modules will be placed in `js/modules/sale` folder i.e. there would be `js/modules/sale/Sale.js` and `js/modules/sale/SaleReport.js` etc. In the same way the `Purchase` related modules will be placed in `js/modules/purchase` folder.

Now, the examples regarding and `Sales` and `Purchases` etc might seem daunting to you, so let me just quote a simple Blog related examples. There would be two folders inside the module i.e. `js/modules/blog` folder to hold all the blog related javascript modules and `js/modules/user` to hold all the users related javascript modules. For Example there can be `js/modules/blog/Post.js`, `js/modules/blog/Comment.js` etc in the `js/modules/blog` folder and `js/modules/user/User.js` etc in the `js/modules/user` folder.

# Using the created Modules

Now that we have created our module, it’s time to understand how to use it in our application. It’s as simple as the following:

```html
&lt;html&gt;
    &lt;!--- All of your markup --&gt;
 
    &lt;!-- Include your modules in this HTML page. For Example --&gt;
    &lt;script src="js/modules/FeedReader.js"&gt;&lt;/script&gt;
    &lt;script src="js/modules/SomeOtherModule.js"&gt;&lt;/script&gt;
 
    &lt;!-- Fire your module --&gt;
 
    &lt;script&gt;
        (function ( ) {
            FeedReader.init();
            SomeOtherModule.init();
        }());
    &lt;/script&gt;
&lt;/html&gt;
```

# Conclusion

From our discussion above, I expect that you have understood how and why should we structure our Javascript. And as we discussed above:

* Our code is clean and consistent. All the settings are at a separate place, event bindings have their own place etc.
* Our code is easily understandable. As you can see, we can start through the init function and can easily see what’s happening.
* It will make your code testable. Well we haven’t discussed much regarding this but I promise to cover it in some article later.
* And for the last point “Later on it’ll make you feel proud …and compelled to use the best practices.”. Well, believe me, I am feeling proud right now ;-) Go build something great using what you have learnt and see if you feel proud of what you just wrote ;-)

And, as I already said.. We have just scratched the surface of it. For further detail of Modular Patter, I’ll refer you to [this topic of Addy Osmani's Book](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript) - [Essential JS Design Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/)
