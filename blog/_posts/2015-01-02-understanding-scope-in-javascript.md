---
layout: post
title: Understanding scope in Javascript
comments: true
---
In this article, I am going to explain what scope is, the difference between local and global scopes and a few things that you should keep in mind while writing your Javascript.

##What is Scope?

Scope is the context in which a variable/function can be accessed. Unlike other programming languages such as C++ or Java, which have block level scope i.e. defined by `{}`, Javascript has a function level scope. Scope in Javascript is lexical, more to that in a moment.

##Global Scope
Anything defined in the global scope can be accessed anywhere in your code. Or to put it the other way, anything that you'll declare outside any function will be in the global scope. Take the following as an example

<pre><code class="javascript">
var name = 'Foobar';
function sayHello() {
    // Hello Foobar
    alert('Hello ' + name);
}
</code></pre>

Here `name` since declared outside any function is a global variable and can be accessed anywhere in your Javascript. On a sidenote anything that you declare in the global scope is attached to the `window` object and can be accessed by `window.*` e.g. borrowing it from the above example `window`.`name` when used anywhere will make sure that the `name` declared in the global scope is being accessed.

##Local Scope
Anything that you declare inside a `function` exists in a Local scope and is available only inside that function. Let me explain it with an example:

<pre><code class="javascript">
function sayHello() {
    var name = 'Foobar';

    // Hello Foobar!
    alert( 'Hello ' + name );
}
// Uncaught ReferenceError: name is not defined
alert( 'Hello ' + name );
</code></pre>

That being said, it is safer to say that all the scopes in Javascript are created by the functions. 

In Javascript, there exists Lexical scope meaning that there is a concept of parent and child scopes each of the child scopes can access the *anything* defined in the parent scope. For example lets say you have a function inside a function, in that case you have a child scope and a parent scope now the variables defined in the parent function can be accessed through the child scope. To make it further clear, have a look at the example below:

<pre><code class="javascript">
function parent() {
    // Scope A
    var name = 'Foobar';
    
    function child() {
        // Scope B

        // My father is Foobar
        alert('My father is ' + name);
    }
}
</code></pre>

You can have as much nesting as you want and any variables or functions defined in the parent scope will be accessible by each of it's child scopes. However you should note that even though any variable or function can be accessed in the child scope, any variables or functions defined in the child scope can't be accessed in the parent scope i.e. 

<pre><code class="javascript">
var name = 'Test';
var parentScope = function () {
    
    var scopedName = 'ScopeTest';
    
    // Output: Test
    alert( name );
    // Output: ScopeTest
    alert( scopedName );

    var childScope = function () {
        // Output: Test
        alert( name );
        // Output: ScopeTest
        alert( scopedName );

        var grandChildScope = function () {
            // Output: Test
            alert( name );
            // Output: ScopeTest
            alert( scopedName );            
        }
    }
}
</code></pre>

As you can see all the scopes were able to access the variable from the global scope as well as from any parent scopes. You should also keep it in mind that although the child scopes can access the variables/functions from the parent scope, the reverse can't happen that is anything defined in the child scopes can't be accessed in any of the parent scopes. Let's see what I mean by an example;

<pre><code class="javascript">

// Uncaught ReferenceError: grandChild is not defined
alert( grandChild );

var parentScope = function () {
    
    // Uncaught ReferenceError: grandChild is not defined
    alert( grandChild );

    var childScope = function () {

        // Uncaught ReferenceError: grandChild is not defined
        alert( grandChild );

        var grandChildScope = function () {
            var grandChild = 'Secret from all my parents but my scope and any of my children scopes can access me.'

            var superChild = function () {
                // Secret from all my parents but my scope and any of my children scopes can access me.
                alert( grandChild );
            }
        }
    }
}
</code></pre>

See, the parent scopes were not able to access the variable from the `grandChildScope` which lied in their children scopes however `superChild` which was the child of `grandChildScope` was able to access the variable because it was defined in one of its parent scopes.

##A few Gotchas

You might be wondering, what if a variable was declared in both a child as well as it's parent, what in that case? In that case the variable in thie current scope i.e. the child scope will be preferred and not the one from the parent scope. Parent scope is checked only if a variable being used is not found in the current scope. To make it more clear, have a look at the following example:

<pre><code class="javascript">
var parent = function () {
    var name = 'Parent';
    // 2 => Look for the variable name in this scope
    //      ..Found?! Use it. If not found, go to the next
    //      ..immediate parent scope and keep going unless
    //      ..the variable is found or the global scope
    //      ..is reached.
    var child = function () {
        // 1 => Look for the variable name in the current scope
        //      ..Not found?! Move to the immediate parent scope
        alert( name );
    }
}
</code></pre>

Now lets test the same example with a variable named `name` declared in the child as well

<pre><code class="javascript">
var parent = function () {
    var name = 'Parent';
    var child = function () {
        var name = 'Child'
        // Output: Child
        alert( name );
    }
}
</code></pre>

Really simple and you might have guessed the output in a glance, but lets see how smart are you. Have a look at the following code and guess what will the output be:

<pre><code class="javascript">
var parent = function () {
    var name = 'Parent';
    var child = function () {
        // What will be the output here?
        alert( name );
        var name = 'Child'
        // What will be the output here?
        alert( name );
    }
}
</code></pre>

You have 30 seconds to guess. Go!

OK, your 30 seconds are over, are they? You are completely wrong, if your guess was following:

<pre><code class="javascript">
// Output:
// Parent
// Child
</code></pre>

The output will be the following

<pre><code class="javascript">
// Output:
// Undefined
// Child
</code></pre>

The reasons why is it so is because, in Javascript, the declarations are automatically taken to the top of the function ([Hoisting](http://code.tutsplus.com/tutorials/javascript-hoisting-explained--net-15092)) no matter what the position of their declaration is. We can say that above written snippet is equivalent to the following:

<pre><code class="javascript">
var parent = function () {
    var name = 'Parent';
    var child = function () {
        var name;
        // Output: Undefined
        alert( name );
        name = 'Child'
        //Output: Child
        alert( name );
    }
}
</code></pre>

Here is another example for this, guess the output for following:

<pre><code class="javascript">
var i = 0;
function foobar() {
    if ( i === 0 ) {
        var message = 'i was 0';
    }
    // Output: i was 0
    console.log( message );
}
</code></pre>

In this snippet, the output was again not `undefined` because the declaration was taken to the top of the function because of [hoisting](http://code.tutsplus.com/tutorials/javascript-hoisting-explained--net-15092). Another proof that there is no block level scopes in javascript.

And that takes the article to an end. In this article you learned about what is scope in Javascript, what is the difference between local and global scopes and a very little about hoisting. There is a lot more to cover regarding scope that I will be writing about in upcoming articles. Sooner than you expect, there is an upcoming article about how to achieve private, public and static variables in Javascript using the power of scope. Stay tuned!
