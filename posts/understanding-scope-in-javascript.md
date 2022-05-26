---
title: Understanding scope in Javascript
date: 2015-01-02
---
In this article ..and a few upcoming articles, I am going to explain everything that you need to know about scope in Javascript.

## What is Scope?

Scope is the context in which a variable/function can be accessed. Unlike other programming languages such as C++ or Java, which have block level scope i.e. defined by `{}`, Javascript has a function level scope. Scope in Javascript is lexical, more to that in a moment.

## Global Scope
Anything defined in the global scope can be accessed anywhere in your code. Or to put it the other way, anything that you'll declare outside any function will be in the global scope. Take the following as an example

```javascript
var name = 'Foobar';
function sayHello() {
    // Hello Foobar
    alert('Hello ' + name);
}
```

Here `name` since declared outside any function is a global variable and can be accessed anywhere in your Javascript. On a sidenote anything that you declare in the global scope is attached to the `window` object and can be accessed by `window.*` e.g. borrowing it from the above example `window`.`name` when used anywhere will make sure that the `name` declared in the global scope is being accessed.

## Local Scope
Anything that you declare inside a `function` exists in a Local scope and is available only inside that function. Let me explain it with an example:

```javascript
function sayHello() {
    var name = 'Foobar';

    // Hello Foobar!
    alert( 'Hello ' + name );
}
// Uncaught ReferenceError: name is not defined
alert( 'Hello ' + name );
```

That being said, it is safer to say that all the scopes in Javascript are created by the functions. 

In Javascript, there exists Lexical scope meaning that there is a concept of parent and child scopes. Each of the child scopes can access the *anything* defined in the parent scope. For example lets say you have a function inside a function, in that case you have a child scope and a parent scope now the variables defined in the parent function can be accessed through the child scope. To make it further clear, have a look at the example below:

```javascript
function parent() {
    // Scope A
    var name = 'Foobar';
    
    function child() {
        // Scope B
        
        function grandChild() {
            // Scope C
            
            // My father is Foobar
            alert('My father is ' + name);
        }
    }
}
```

You can have as much nesting as you want and any variables or functions defined in any of the parent scopes will be accessible by each of it's child scopes. However you should know that the reverse is not correct. That is, althought the child can access the variables and functions from the parent scope, parent can not access anything from it's child scope i.e. 

```javascript
var parentScope = function () {
    
    var scopedName = 'ScopeTest';
    
    // Output: ScopeTest
    alert( scopedName );

    var childScope = function () {

        // Output: ScopeTest
        alert( scopedName );

        var grandChildScope = function () {

            // Output: ScopeTest
            alert( scopedName );            
        }
    }
}
```

As you can see all the scopes were able to access the variable from the parent scope. Now let's test the reverse i.e. try to access the variable defined in the child scope, in parent scope
```javascript
var parentScope = function () {
    
    // Uncaught ReferenceError: grandChild is not defined
    alert( grandChild );

    var childScope = function () {

        // Uncaught ReferenceError: grandChild is not defined
        alert( grandChild );

        var grandChildScope = function () {
            var grandChild = 'Secret from all my parents but my scope and any of my children scopes can access me.'

            var superChild = function () {
                // Output: Secret from all my parents but my scope and any of my children scopes can access me.
                alert( grandChild );
            }
        }
    }
}
```

See, the parent scopes were not able to access the variable `grandChild` from their child scope however `superChild` which was the child of `grandChildScope` was able to access the variable because it was defined in one of its parent scopes.

## A few Gotchas

You might be wondering, what if a variable was declared in both a child as well as it's parent, what in that case? In that case the variable in their current scope will be preferred and not the one from the parent scope. Parent scope is checked only if a variable being used is not found in the current scope. To make it more clear, have a look at the following example:

```javascript
var parent = function () {
    var name = 'Parent';
    // 2 => Look for the variable name in this scope
    //      ..Found?! Use it. If not found, go to the next
    //      ..immediate parent scope and keep going up unless
    //      ..the variable is found or the global scope
    //      ..is reached.
    var child = function () {
        // 1 => Look for the variable name in the current scope
        //      ..Not found?! Move to the immediate parent scope
        alert( name ); // Output : Parent
    }
}
```

Now lets test the same example with a variable named `name` declared in the child as well

```javascript
var parent = function () {
    var name = 'Parent';
    var child = function () {
        var name = 'Child'
        // Output: Child
        alert( name );
    }
}
```

Really simple, isn't it? You must have guessed the output in a glance. But lets see how smart are you. Have a look at the following code and guess what will the output be:

```javascript
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
```

You have 30 seconds to guess.

OK, your 30 seconds are up! You are completely wrong, if your guess was following:

```javascript
// Parent
// Child
```

The correct output will be the following

```javascript
// Undefined
// Child
```

The reasons why is it so is because, in Javascript, the variable declarations are automatically taken to the top of the function ([Hoisting](http://code.tutsplus.com/tutorials/javascript-hoisting-explained--net-15092)) no matter what the position of their declaration is. We can say that above written snippet is equivalent to the following:

```javascript
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
```

Notice how the variable declaration has moved to the top of the function while the definition has stayed at the sam place. Here is another example for this. Guess the output for following:

```javascript
var i = 0;
function foobar() {
    if ( i === 0 ) {
        var message = 'i was 0';
    }
    // Output: i was 0
    console.log( message );
}
```

In this snippet, the output was `i was 0` and not `undefined` because the declaration was taken to the top of the function because of [hoisting](http://code.tutsplus.com/tutorials/javascript-hoisting-explained--net-15092). Another proof that there is no block level scopes in javascript.

And that takes the article to an end. In this article you learned about what is scope in Javascript, what is the difference between local and global scopes and a very little about hoisting. There is a lot more to cover regarding scope that I will be writing about in upcoming articles. Sooner than you expect, there are upcoming articles about how to achieve private, public and static variables in Javascript, how to change the context using `call` and `apply` methods, IIFEs, use of `this` etc. Stay tuned!
