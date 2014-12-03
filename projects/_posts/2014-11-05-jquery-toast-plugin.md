---
layout: project
title: Jquery Toast Plugin
---

A plugin to show highly customizable notifications to the user. 

<img src="http://i.imgur.com/fuwtO7j.png" />

#How to use

- Include the CSS and JS files
- Simply do ```$.toast('Toast message to be shown')``` Of course it would be the world's simplest toast message but believe me **you can do a lot more** with the options.

To learn more about how to use and customize it, head to [the demo page](http://kamranahmedse.github.io/jquery-toast-plugin)

You can simply download the repo or if you are in rush the [minified CSS](https://raw.githubusercontent.com/kamranahmedse/jquery-toast-plugin/master/jquery.toast.min.css) or [non minified CSS](https://raw.githubusercontent.com/kamranahmedse/jquery-toast-plugin/master/jquery.toast.css) can be found and [minified JS](https://raw.githubusercontent.com/kamranahmedse/jquery-toast-plugin/master/jquery.toast.min.js) and [non minified JS](https://raw.githubusercontent.com/kamranahmedse/jquery-toast-plugin/master/jquery.toast.js) can also be found.

#Demo
You can visit [http://kamranahmedse.github.io/jquery-toast-plugin](http://kamranahmedse.github.io/jquery-toast-plugin) to view a number of demos, you can see how to use and also you can customize the plugin to match your needs.

#Features

* Custom **toast background color** and **text color**
* Ability to **hack the CSS** to add your own thing

  * **Text can be** provided in the form of
    * **Array** (It's elements will be changed to an un ordered list)
    * **Simple text**
    * **HTML**
  
* **Events support** i.e. `beforeHide`, `afterHidden`, `beforeShow`, `afterShown`
* `Fade` and `Slide` show/hide transitions support (More to come)
* You can **position the toast, wherever you want** there is support for `top-left`, `top-right` `bottom-left` and **bottom-right**, `top-center`, `bottom-center` and `mid-center` ...sighs! That's a whole lot of options, isn't it? No, you say. Ok then here is the most exciting thing, you can also introduce **your own positioning** just **by passing a simple js object** containing `{ top: - , bottom: -, left: -, right: - }` 
* Ability to add **sticky toast**
* Optional **stack length can be defined** (i.e. maximum number of toasts that can be shown at once)

##Further Detail

* [Visit the demo page ](http://kamranahmedse.github.io/jquery-toast-plugin/)
* [Visit the Git Repository](https://github.com/kamranahmedse/jquery-toast-plugin/)
* *Skills used* Javascript, jQuery