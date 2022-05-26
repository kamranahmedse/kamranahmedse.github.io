---
title: Event Bubbling - Dealing with the child’s parent
date: 2014-08-18
permalink: /blog/2014/08/18/event-bubbling-and-how-can-it-be-prevented/
---

There are **two ways of event propagation in DOM** i.e. Event Capturing and Event Bubbling. In this article, we’ll talk about **Event Bubbling** and leave Event Capturing for some other article.

Let’s just take a simple analogy, you might have played with bubbles in your childhood …it’s ok if you haven’t. If you have played, you must have noticed that the bubbles go upward when created (might not be the case always but let’s just agree; the bubbles always rise upward ;-)). Same is the case with the events in Javascript.

# Event Bubbling
Javascript events are propagated towards the upward direction from the point of DOM where they are triggered/created. This phenomenon is called Event Bubbling.

>Javascript events are propagated towards the upward direction from the point of DOM where they are triggered/created. This phenomenon is called Event Bubbling.

Event bubbling makes sure that an event that is triggered for some DOM element (target element), it will be triggered for all the parent elements of that target as well, in an outward direction i.e. the target first then it’s immediate parent and then it’s grand parent and so on.

# Explaining it through example
So, in JavaScript, events *bubble*. That is, an event propagates through the ancestors of the element upon which the event is fired. Lets show what this means using the HTML markup below:

```html
&lt;div class="grandParent"&gt;
      C
    &lt;div class="parent"&gt;
         B
       &lt;div class="child"&gt;
           A
       &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
```

It’s  a simple markup above, we have three `div`s, one inside another.  Let’s attach a click event to `div.child` element, so that it may cry when we hit it:

```javascript
// make the child cry, when we hit him.
$('.child').on('click', function(){
    alert('Child : waaaaaa waaaa waa huh huh waaa waaaa!');
});
```

As you might have guessed, upon clicking `.child` div it would alert the content `waaaaaa waaaa waa huh huh waaa waaaa` nothing revolutionary so far. Now let’s attach the events to the `.parent` and `.grandParent` as well so that we have got the following:

```javascript
// make the .parent react
$('.grandParent').on('click', function(){
    alert('Grand Parent: You hit me, my child or my grand child, now deal with me!');
});
 
// make the .parent react
$('.parent').on('click', function(){
    alert('Parent : Don\'t you dare hitting me or my child, again!');
});
 
// make the child cry, when we hit him.
$('.child').on('click', function(){
 alert('Child : waaaaaa waaaa waa huh huh waaa waaaa!');
});
```

According to `Event Bubbling`, now if we click the `.child` element, this `click` event will be first triggered for the `.child` then it will be triggered for `.parent` and finally `.grandParent` and so on till the `document` is reached. If we click the `.parent`, it’ll be triggered for the `.parent` and then `.grandParent` and so on till the document is reached. In the same fashion, an event triggered on any child will be triggered for it’s ancestors as well. Don’t believe me?  Go [have a look at this demo](http://jsfiddle.net/5as880n8/). Want a more visual demo, [check this one](http://jsfiddle.net/b2eckozL/).

So, if we follow our analogy, we might say:

>If you hit any child, his parent would definitely notice that and if they can react to your action, they would definitely do so.

That’s *all* event bubbling is; an event fired on an element bubbles through its ancestor chain (i.e. the event is also fired on those elements). Although, I have used jQuery examples in this article, it’s important to note that this isn’t a jQuery feature, nor is it something that a developer must turn on; it’s a **fundamental** part of JavaScript that has always existed.

# How to stop event from bubbling?

Now there might be the case when you don’t want the event to be triggered for the ancestor elements and be triggered for the target element only. To stop the event from bubbling, you use `e.stopPropagation();` i.e.

```javascript
$('someElement').on('click', function(e){
    // stop the event from bubbling.
    e.stopPropagation();
});
```

If we follow our analogy, it’ll be like hitting the child and then putting a hand over his mouth so that his ancestors may not listen him but he would still be crying. To better understand the concept, have a look at [this modified demo](http://jsfiddle.net/5as880n8/1/)

Also, don’t confuse `e.stopPropagation()` with `e.preventDefault()` which prevents the browser from executing the default action of the DOM element.

**Note:** There were some points in this article, where I got harsh in my examples but still I quoted them because I think the example best suited the phenomenon. Though, no childrens were beaten to to test the phenomenon described in this article, I promise.
