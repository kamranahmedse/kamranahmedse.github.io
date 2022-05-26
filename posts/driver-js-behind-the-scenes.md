---
title: Driver.js – Behind the Scenes
date: 2018-03-18
permalink: /blog/2018/03/18/driver-js-behind-the-scenes/
---

I launched [Driver.js](http://kamranahmed.info/driver) last week which apparently went big. This post is going to be a quick "behind the scenes" towards how I came up with the idea and what went into writing it and then rewriting in two days after the launch and also to give you a little perspective on how I approach the ideas that I have.

## Ideas, Ideas and Ideas

If you ask me about the applications that I use the most, "Notes" would definitely be among the ones at the top of the list. Whenever I have some silly idea or a feeling about something that could help me or the others or just something pointless but interesting, I write it down. Not to toot my own horn, but over the time I have developed this habit of looking at things a little differently; never a day goes by when I am working on something and the inner me pops up saying "How about an app/utility/product that does XYZ" and most often than not I have to shut him down and put whatever it was in the ever growing list of ideas in my notes.

![](https://imgur.com/vgdDkj2.png)

It is a good habit to get yourself into and if you don't do it already, I would recommend you to start doing. For me, I do it mainly because I have this habit of having some sort of side-project all the time where I could experiment and try the things that I might not get to do at work and to keep those brain cogs oiled.  

## Driver.js – An Idea

Driver.js had been there in my list of ideas for ages, titled as "Vanilla JS library for the Overlays".

About a few months ago, I was working on an application, where we had to implement this "fancy" component highlighting where it would dim the webpage except for the component with which user is interacting; similar to [what facebook does](https://i.imgur.com/Q3PzaKk.png) when you try to submit a post. Since there weren't any, I thought it would be useful to have a little drop-in utility that would allow highlighting any parts of the webpage.

<blockquote class="twitter-tweet" data-lang="en"><p lang="it" dir="ltr">Current status - Infinite Boredom <a href="https://t.co/q8oaswUJNc">pic.twitter.com/q8oaswUJNc</a></p>&mdash; Kamran Ahmed 🦀 (@kamranahmedse) <a href="https://twitter.com/kamranahmedse/status/972188766604492802?ref_src=twsrc%5Etfw">March 9, 2018</a></blockquote>

Last week, I finally had some time to spare and I was bored, so I decided to pick something from the list; and since this seemed to be the quickest one, I decided to work on it. But I got carried away during the development and ended up making it much more than what I was planning. It was supposed to be just about highlighting an element and then making it fade away when needed but once I was done with it I started thinking about making it more usable and the other possible usecases. For example, when the user highlights one element and then decides to highlight another one, instead of just doing that in a boring way I decided to animate it from the highlighted element towards the other one. Which also helped make it more pleasant when used on the form fields i.e. let's say if the user decides to use it to highlight input fields when they are focused so switching between the fields using `tab` key with the animation made it a little more pleasant. It started looking good and I was planning to work on the readme. But wait! how about we add the functionality to show the popover alongside the highlighted element, that would be useful to show some additional details alongside the element ..ummm yeah makes sense, let's do it. Okay we are done with that, let's work on the demo/readme and publish it now. But hey, we have everything that one may need to add "feature tours" to an application, how about we polish it a little and add that also since there are no complete solutions out there? ..and now we have the tours functionality also. After I was done with the necessary functionality, I decided to polish it a little and make it more customizable so that it can be used in any usecase where one might need overlays without having to modify the library and so I added the hooks and a bunch of options making it more customizable and powerful – making it much more than "yet another tour plugin".

## Technical Implementation

From the technical implementation, in the beginning it was just supposed to be a "highlighter" so I decided to do it with `canvas` because then I did not have to worry about the `z-index` and the issues like that. It was quite a simple implementation where when you initialize the driver, it would put a dark canvas on top of the whole page, then find out the co-ordinates of the required element and drew a transparent rectangle on top of that element leaving only that element visible and rest of the page dimmed. And when the user changes the element, it would fill the existing transparent patch back again and cut it out from the next portion. 

![](https://imgur.com/aT9dxqw.png)

Canvas was a good match for the initial implementation (as there was no CSS and only a minimal JavaScript) but as I kept extending it, canvas started to become weary. The implementation for the tours and animations would have been quite simpler and more browser compatible, if I had used HTML/CSS. But then it was too late to rewrite at that time, so I decided to push it forward, complete it and leave the re-write for later. As they say, "He who ships, wins" (do they? or did I just make it up).

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Rewrote Driver.js from the ground up to drop canvas and use HTML/CSS. Feedback, bug reports and contributions welcomed 🤗 <a href="https://t.co/SjDZfqbUj5">pic.twitter.com/SjDZfqbUj5</a></p>&mdash; Kamran Ahmed 🦀 (@kamranahmedse) <a href="https://twitter.com/kamranahmedse/status/973722773355925504?ref_src=twsrc%5Etfw">March 14, 2018</a></blockquote>

I wasn't happy with the canvas implementation so the next night after the launch, I started working on the rewrite using HTML/CSS and it felt so good to delete so much code and those hacky solutions that I had to implement to make it work with canvas. The things that I had to do with canvas just to position the canvas on top of the overlay were just horrible; I had to listen to the scroll event and redraw the whole thing on each scroll. However, after the new implementation, there was just one rendering and then CSS positioning did all the heavy lifting for me.
 
![](https://i.imgur.com/0LCBV82.png)
 
The image above shows how the new implementation looks like in its simplest. All the scroll listeners to redraw and computations to find out the path from active element to the next active element were all gone now.

## Naming It – Sholo, Spotlight or Driver

Then came the naming part; it is funny that I changed the name three times. Initially I named it **Sholo** – play of letters with the word "Solo", since it let's you focus a "solo" element, but that did not seem good enough so I dropped it. Then I decided to call it **Spotlight** but that was too many characters plus I could not come up with a catchy tagline for that. 

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Then – Couldn&#39;t sleep so started this experiment<br>Now – Want to sleep but hooked to finish it. Aaaargh! <a href="https://t.co/H4qVf3wgMg">pic.twitter.com/H4qVf3wgMg</a></p>&mdash; Kamran Ahmed 🦀 (@kamranahmedse) <a href="https://twitter.com/kamranahmedse/status/971156531508137989?ref_src=twsrc%5Etfw">March 6, 2018</a></blockquote>

And finally, I came up with the name **Driver** accompanied by a fancy tagline **Drive your user's focus across the page**.

## Documentation and Demos

After that was the most important part – the documentation. No matter how great your project is, if you are not able to catch the user's attention in the first few seconds, it really doesn't matter how good it is or how much time and effort you have put into it. 

![](https://i.imgur.com/ExdsoOg.png)

The first thing I decided to do was work on the demo page and to make sure that even if it is not that catchy, I lay it down in a way that it focuses on all the key aspects of it, especially those that one might need in a real world application. And I focused mainly on putting lots of examples and massive "Run Demo" buttons to make sure that even if the visitor somehow landed the page, they just run it once before they leave the page. 

## Fancy Header

For the logo, I jolted the inner graphics designer in me out of his sleep. But then I found out that I did not renew the license for Illustrator so I put him back to sleep and reached the final resort ..drum rolls, use some emoji. 

![](https://i.imgur.com/qwOYN8h.jpg)

But since there is no emoji for driver, I put the emoji for the car and decided to launch with it and then during the final moments, I changed it to be a mechanic emoji because it looked comparatively cuter in the header.

## Announcement

There were still many things that could have been polished or improved but I decided to launch it as is, and improve it later on. I posted it on newshacker, reddit and producthunt and started waiting for the initial surge. Fifteen minutes passed by and there were still crickets. 

I was about call it a day but as it turned out I was missing the analytics code on the demo page. As soon as I pushed the analytics, I was presented by around a 100 users on the site. 

## The Thrill

As it happens when you launch something – the thrill and that adrenaline rush, I could sit all night and watch analytics as that visit counter went up and down but hey I am a sane person. So I fired up the browser console, wrote this little snippet that would log the visitor count as it exceeds the maximum count at any time, left my laptop running for the night and went to bed

![](https://imgur.com/IgSfbFQ.png)

<sub>Feel free to steal it and use it on your launch next time</sub>

## The Next Day

I can't remember for sure now but when I checked the browser console the next morning the maximum consecutive users at any time went up till 250 during the night and also the badges and the star button on the demo page were not working; apparently because they had exceeded the maximum API rate limits. 

Then it was time to look at the [trending page on github](http://github.com/trending) and there it was, Driver.js was sitting at the top of the trending list of repositories and I was at the top of the list of the trending developers.

![](https://i.imgur.com/g95dsUc.png)

And the repository is still there in the [daily](https://github.com/trending), [weekly](https://github.com/trending?since=weekly) and [monthly](https://github.com/trending?since=monthly) trending lists and currently sitting at ~4360 stars at the time of this writing. 

And for the producthunt, it got 943 upvotes and ended up becoming the 2nd Product of the day. 

![](https://i.imgur.com/B1rIKUx.png)

It did not get much love on newshacker but apart from this it also ended up hitting the frontpage on several sub-reddits. 

## What's the point?

So has it all been about the stars and getting props? Honestly, I never even think about this stuff while I am working on something. I am a strong believer of the fact that if YOU think you are doing a good job then you don't need to look for approval from others. I [already have them in abundance](http://github.com/kamranahmedse) and for this project specifically I didn't even think that it would get that big or to show up in the "popular projects" section in my profile. I started working on it mainly because it seemed interesting and seemed to be something that had a real use for me and maybe for others. I couldn't care less about the stars; I will still make things when nobody is watching. Plus, it has been quite some time since [I last played](https://github.com/kamranahmedse/jumper-bot) with `canvas` and wanted to make something interesting. And I did learn a couple of things, so stars were just a positive side-effect that I wasn't aiming for.

And that about wraps it up. Until next time, keep making!
