---
layout: post
title: Let the comments drive your code
comments: true
---

Whenever, I am coding something large or complicated or something where things might escalate quickly out of the hand, I tend to sketch out the steps or pseudo-code everything using *comments*. I was doing the same thing when a friend of mine noticed and pointed out that what I was actually doing is called Comment Driven development. That's when I found that this "Comment First" thing actually is a practice and is termed as [Comment Driven Development or Comment Programming](https://en.wikipedia.org/wiki/Comment_programming); where you think the task through and write down the steps in the form of code comments and when everything is clear, you start turning those steps in comments to the actual code.

You might even be doing the same thing without noticing the fact that what you are actually doing is CDD. Let me explain it with an example of how I go about coding some thing, or in other words what Comment Driven Development is, by using an example.

>**Disclaimer:** Nothing to take seriously here. <u>Ignore the fact that there is anything such as OOP</u>. <u>Ignore all those SOLID principles</u>. Let the <u>architect inside you sleep for a bit</u> and take this example only as the means to understand Comment Driven Development ;)


<pre><code class="php">

function notifications( $filters ) {
    // Prepare parameters for any default values
    // Fetch notifications
    // Parse the notifications
    // Return the collection
}
</code></pre>

As you can see, the steps to retrieve the notifications are clear now and so we can go about transforming it to the actual code and I might turn it to something like following.

<pre><code class="php">

function notifications( $filters ) {

    // Prepare parameters for any default values
    $filters = array_merge([
        'limit' => 1,
        'userId' => $this->userId
    ], $filters);

    // Fetch notifications
    $notificationRepository = new NotificationRepository();
    $notifications = $notificationRepository->get($filters);

    // Parse them
    $parsedNotifications = [];
    foreach($notifications as &$notification) {
        $notification = 'Processing the ' . $notification;
    }

    // Return the collection
    return $notifications;
}
</code></pre>


That is all there is to **C**omment **D**riven **D**evelopment. And now to answer, why I use this approach and why you should too:

- It enables me to make sure that everything is clear to me before I start coding and thus it results in keeping me on the track.
- You can sketch out the steps this way to, maybe, instruct someone about the functionality that you want them to write.
- Documentation! the comments might be too abstract but they may definitely prove helpful later on.

And that wraps it up. Do you have any tips of your own? How do you go about coding something? I would love to hear from you in the comments section below.
