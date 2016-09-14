---
layout: post
title: Art of getting better as a Programmer
comments: true
---

I first titled this article to be "Don't immitate; Understand" and the main theme was to focus on how important looking under the hood is, but then I thought of a few more things that I could add in order to depict the things that a programmer can do to get better.

Why exactly should you even care about getting better? I don't think it really needs an answer; no one is perfect and everybody needs to chase the perfection. Anyone who thinks that they are perfect, are doomed. Let me make it a little more dramatic by adding a self-cooked metaphor; even the stationary water, which is fine in the beginning, starts to stink after a while, that's how dangerous the monotony is. If one does not face challenges for a while, tries not to get out of their comfort zone, keep doing what they are used to doing, repel the change and try not to get better, same happens to them that happens to the stationary water.

So what exactly can you do to get better? Here is the list of a few things that I think any one can do in order to get better:

## Don't be an Immitator

While solving some problem, it must have occured to you that you faced some issue and without thinking anything else you immediately headed to that *brilliant* guy in your team who happens to know it all and poked him for the solution or you quickly Googled the problem, found some piece of code on Stackoverflow or some forum, copy pasted the code and voilla you got the whole thing working. That is all fine and dandy till you face the similar issue again and you have to do the same; poke that guy or Google for the solution, you keep following the same loop and you never get better. 

When you face some issue, do not let asking anyone for the solution be the first thing you do, give yourself some time to do the research; if you find the solution, try not to let find-copy/paste-mould-done be your mantra to get the thing done. Try to find out the reasoning behind the solution; do not take anyone's word for it. If you don't have the time to do it momentarily then don't do it immediately, save it in [your todo list](http://todoist.com) or [in your pocket](http://getpocket.com/) and make sure to visit that later.

Apart from that, the other issue i.e. the biggest dilemma of the most of us is that the technology around is changing/evolving all the time and we cannot survive if we stop learning and when it comes to learning something we either follow some programming books, watch some online tutorials or read some articles. The major problem with most of the resources out there is that they don't go behind the curtains and the main focus is on immitation i.e. the instructor writes some code, you write the same code and then the supposition is that you understand what you are doing. Then you get out to the real world and face problems that are different than the ones you saw in the course and you fall down; Why? Because much more important than immitating someone else's code is to understand what it is actually doing. Let the documentation be the source of truth for you instead of that resource that you used to learn and do not forget to tinker with it yourself.

## Know thy craft

Go behind the curtains and try to understand why is something working the way it is working. Do not just blindly follow the stream; try to understand the inner workings of your tools. It can help you solve the problems in a better way than you normally do.

For example, if you are a Node JS developer did you ever try to see how the modules in Node JS work while javascript doesn't have any *modules* support natively; how `require`ing a module gives you only the stuff that you `module.export` or `export` in the module and the scope doesn't get all messed up? What is the difference between the both (`module.export` and `export`)? If you code in Laravel, did you ever try to follow the request life cycle to see all the magic happening behind the scenes? How the facades magically let you access a normal class's methods as static methods while they aren't actually static?

## Focus on productivity

Time is something that you will never want to lose. Always focus on your productivity, learn the shortcuts of your IDE. Avoid all those distractions (twitter, facebook, whatsapp) and try not to [get interrupted](http://blog.ninlabs.com/2013/01/programmer-interrupted/).

## Write bad code, but..

You might find yourself in times when you have reasons to write bad code, sometimes maybe valid; you have to meet that deadline and have no time to think it through and the other times maybe completely frail; you are feeling lazy or are working on a legacy project or something that is already poorly written and you think leaving gems in the mud isn't the right thing to do. 

Most importantly, you should try to avoid writing the bad code unless you have an iron-solid reason to back it up but when you do write bad code, make sure that it is still refactorable (leave `@todo`s, proper variable/function names, comments on some tangled logic that you might be leaving behind at the very least) and take the baby steps such as the ones stated below to refactor it when you have time

- Write/Refactor tests
- Refactor into smaller understandable chunks
- Untangle overly-complicated logic
- Rooting out the dead code

## Contribute to Opensource

Go through the source code of the opensource stuff that you use most of the time to see how it works and what is it that makes it tick; you will be astounded to find some hidden gems in there. Apart from looking under the hood, find the ways to contribute to them it may be some minor refactoring in code like [this one](https://github.com/composer/composer/pull/5669/commits/6990454e567a860411931135a838cf1f838cb49c) that I did for the soul purpose of this article, propose a patch for [some locked issue](https://github.com/composer/composer/issues), fix some typos in the documentation etc.

Apart from that you may find some time to hack on those foolish [little](https://github.com/kamranahmedse/beetle) [ideas](https://github.com/kamranahmedse/jumper-bot) to brush up your knowlege a little and get some input/critique from the community.

## Do you even read bruhh!

Do not let yourself be like that guy in your team who reads one article in the beginning of the year and this article moulds the decisions that he makes the whole year. Use some RSS reader e.g. [Feedly](http://feedly.com) and follow the blogs that you may find interesting or at-least the feeds of the known faces of your craft.

## Be informative

Find the time to go through the top stories at [hacker news](http://news.ycombinator.com/) or the relevant subreddits (e.g. [/r/programming](http://reddit.com/r/programming), [/r/php](http://reddit.com/r/php), [/r/javascript](http://reddit.com/r/php) etc) on [reddit](http://reddit.com), [trending projects on Github](http://github.com/trending) (may be using [some browser extension](http://github.com/kamranahmedse/githunt)). Once again, follow the known-faces of your craft on twitter and on Github.

## Have some side project

Side projects are great when it comes to experimenting the new stuff or the stuff that you don't know about. Keep some little time reserved for your side projects, either over the weekend or on daily basis. It could be anything i.e. something opensource or start that foolish idea that you have always wanted to start using the tools that you may never have worked with. This will help you get two-fold benefits; if it works, well in good, if it doesn't; never mind you learnt something new.

## Don't lose your sanity

The interesting thing about the web is, it is changing all the time and the bad thing about is, it is changing all the frigging time. All that frustration that is caused whenever something new pops up; you haven't settled yet and lo and behold there is something new that you have to deal with. It is not difficult to lose sanity with all that is happening around so how do you stay sane? Well the key idea is to ignore all that fuss and focus the stuff at hand. Do not try to be a know-it-all guy, although it won't hurt to be informed about what is new in the market and a little bit about how it compares with the tools that you are using currently; do not jump right in, learn as you need. Most of them won't really see the light of the day.

While I say that, do not let this be your excuse when it comes to the updates to your current stack, for example if you are a PHP developer and you come to know that PHP-7 has been released and you ignore it by saying "Step aside, I am staying sane, PHP-5.6 is all good".

## Write if you can

Stop thinking that writing for programmers is the wastage of time and doesn't add much to your belt, it does and does that without you noticing much. For example, A; it It helps you get better at writing, obviously, B; knowing that you are going to put something in the public for others to see, you are forced to thoroughly understand the topic that you are about to write so it not only helps others but yourself also, C; self-marketing, a potential employer can get a much better idea about you from your blog than from your CV, D; blogging about the personal experiences and about how you solved a specific issue not only help others but may also help you down the road when you might face the same issue again to name a few. 

But be sure to keep in mind that, if done badly, blogging can be a negative thing for you and could potentially leave you open to criticism and hold you up as an object or ridicule. So if you plan on doing it, you better do it right.

## See where you are going

Focus on the long term goals, do a self reflection from time to time in order to see where you are headed to and what can you do to improve. If you don't see yourself improving and see nothing much ahead of the road, there is something seriously wrong and you definitely need to juggle a few things around for your own betterment.

And that about wraps it up. What are your thoughts for the self-improvement, do not forget to share them using the comments section below. Until next time, stay tuned.
