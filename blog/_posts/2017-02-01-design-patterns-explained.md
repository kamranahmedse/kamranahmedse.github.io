---
title: Design Patterns for Humans
comments: true
series:
  index: 1
  name: design-patterns-for-humans
  title: "Design Patterns for Humans"
---

I have never found any *quick explanation to GOF design patterns* towards which I could point the beginner programmers and say, "it explains them all without confusing you". This series is my take on explaining them in a way that could make it tick.

# Introduction

Design patterns are solutions to recurring problems; **guidelines on how to tackle certain problems**. They are not classes, packages or libraries that you can plug into your application and wait for the magic to happen. These are, rather, guidelines on how to tackle certain problems in certain situations.

> Design patterns are solutions to recurring problems; guidelines on how to tackle certain problems

Wikipedia describes them as

> In software engineering, a software design pattern is a general reusable solution to a commonly occurring problem within a given context in software design. It is not a finished design that can be transformed directly into source or machine code. It is a description or template for how to solve a problem that can be used in many different situations.

Be Careful
-----------------
- Design patterns are not a silver bullet to all your problems.
- Do not try to force them; bad things are supposed to happen, if done so. Keep in mind that design patterns are solutions **to** problems, not solutions **finding** problems; so don't overthink.
- If used in a correct place in a correct manner, they can prove to be a savior; or else they can result in a horrible mess of a code.

> Also note that the code samples in this series are written in PHP-7, however this shouldn't stop you because the concepts are same anyways.

Types of Design Patterns
-----------------

There are mainly three types of design patterns, namely:

<dl>
  <dt>Creational</dt>
  <dd>Creational patterns are focused towards how to instantiate an object or group of related objects.</dd>
  
  <dt>Structural</dt>
  <dd>Structural patterns are mostly concerned with object composition or in other words how the entities can use each other. Or yet another explanation would be, they help in answering "How to build a software component?"</dd>
  
  <dt>Behavioral</dt>
  <dd>It is concerned with assignment of responsibilities between the objects. What makes them different from structural patterns is they don't just specify the structure but also outline the patterns for message passing/communication between them. Or in other words, they assist in answering "How to run a behavior in software component?"</dd>
</dl>

And that wraps it up. In the next article, we will be discussing about the creational patterns.
