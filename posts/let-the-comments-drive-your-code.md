---
title: Let the comments drive your code
date: 2016-01-21
permalink: /blog/2016/01/21/let-the-comments-drive-your-code/
---

Whenever, I am coding some large or complicated usecase or something where things might escalate quickly out of the hand, I tend to sketch out the steps or pseudo-code *everything* using comments. Of course, we are talking about coding the simple usecases here and not about the designing and architecturing of the system, for which of course you are going to need much more than comments.

I was doing the same thing when a friend of mine noticed and pointed out that what I was actually doing is called Comment Driven development. That's when I found that this "Comment First" thing actually is a practice and is termed as [Comment Driven Development or Comment Programming](https://en.wikipedia.org/wiki/Comment_programming); where you think the task through and write down the steps in the form of code comments and when everything is clear, you start turning those steps in comments to the actual code.

You might even be doing the same thing without noticing the fact that what you are actually doing is CDD. Let me explain it with an example of how I go about coding some thing, or in other words what Comment Driven Development is, by using an example.

>**Disclaimer:** Nothing to take seriously here. <u>Ignore the fact that there is anything such as OOP</u>. <u>Ignore all those SOLID principles</u>. Let the <u>architect inside you sleep for a bit</u> and take this example only as the means to understand Comment Driven Development ;)


```php
// Sell an item

// Check the availability
// Validate the Payment information
// Update the items repository
// Process the Payment
// Trigger the confirmation email
// Show the confirmation View

```

As you can see, the steps to sell an item are clear now and so we can go about transforming it to the actual code and I might turn it to something like following.

```php
function sellItem( $item ) {
    // Check the availability
    if( !$item->isAvailable() ) {
        throw new ItemOutOfStockException('Item is not available');
    }
    
    // Validate the Payment information
    if ( !$this->payment->validate() ) {
        throw new InvalidPaymentException( $this->payment->getError() );
    }

    // Update the items repository
    $item->updateRepository();
    
    // Process the Payment
    $this->payment->process();
    
    // Trigger the confirmation email
    $this->event->trigger('email.send', [
        'type' => 'sale', 
        'item' => $item->detail, 
        'buyer' => $this->buyer
    ]);
    
    // Show the confirmation view
    return $this->url->to('/item-sold');
}
```

Now that we have the code ready, we can go about removing the comments which may deem unnecessary. 

Also you should note that, I have used a single `function` only for the sake of demonstration, neither do I intend to promote the procedural way of doing things nor am I suggesting to create a single method/function and stuff it with everything or ignore the SOLID design principles and Design Patterns for that matter. Also, I am not suggesting that you should only rely upon these inline comments and not [think through](http://www.uml.org/) the architecture of the application first. It is upto you to decide how you want to structure everything and what is better for your application. For me, I think CDD is helpful when coding certain inner usecases of the application where certain sub-steps are involved e.g. `sellItem` where there are certain other tasks that need to be done with it.

For me the purpose of CDD is just to understand and document the steps involved in a usecase and after I have written the functionality and I am completely satisfied with the functionality that I have written and the architecture that I have laid, I remove any unnecessary comments.

That is all there is to **C**omment **D**riven **D**evelopment. And now to answer, why I use this approach and why you should too:

- It enables me to make sure that everything is clear to me before I start coding and thus it results in keeping me on the track.
- You can sketch out the steps this way to, maybe, instruct someone about the functionality that you want them to write.
- Documentation! the comments might be too abstract but they may definitely prove helpful later on.

And that wraps it up. Do you have any tips of your own? How do you go about coding something? I would love to hear from you in the comments section below.

