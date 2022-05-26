---
title: ES6 Succinctly
date: 2016-04-04
permalink: /blog/2016/04/04/es6-in-depth/
---

ES6, ES2015 or Harmony has brought a number of interesting features to the table and this article is going to be a drill-down in *all* those new features that it has to offer. 

Agreed, ES6 is out since June 2015 and a lot has been written about the new features since then and you are better off without another article ..but it isn't going to stop me from writing it. Why? Because, one, it has been laying around incomplete in my disk for quite some time now, second, although I read a few articles about the topic, writing one myself will help better implant the idea into my brain. So the article is not only going to be *for you* but for me too. Seems fair? Alright, let's get started then.

## Strict mode by default

- **ES5** &ndash; Manually enable it using `use strict`
- **ES6** &ndash; Enabled in modules by default

ES5 introduced strict mode in Javascript that let's you make your javascript execute in a "strict" operating environment where *more* exceptions are thrown when you try to write sloppy code. For example, in strict mode you can't use a variable without declaration i.e. `foo = "bar";`, where `foo` is not declared will fail etc. I won't get into the detail of `strict` mode and instead refer you to [this wonderful article on the topic](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/).

ES6 has the `strict` mode enabled by default in it's modules i.e. you donot have to explicitly write `use strict` to enable it.

## Block Scope

- **ES5** &ndash; Variables declared using `var` and having `function` scope
- **ES6** &ndash; Declare block scoped variables using `let/const`

In ES5 we could declare variables only via `var` and these variables had the scope of function and the other way was to use it without even adding `var` which will put it in the global scope.

Now we have two more constructs i.e. `let` and `const` which we can use to declare variables having the block level scope i.e. within the curly braces `{}`. The only difference between `let` and `const` is that `const` value cannot be changed once initialized also you have to initialize the `const` variable at the time of declaration.

```javascript
// Example: 
// `let` and `const` declared variables will not be accessible
// outside the if block
function scopeExample() {

    if (true) {
        // `action` and `act` will only be accessible inside this `if` block
	let action = 'Some action';
	const act = 'Some act';

	console.log('Doing: ' + action);		// Doing: Some Action
	console.log('Now doing:' + act);		// Now doing: Some act
    }

    console.log(act);  // Uncaught ReferenceError: "act" is not defined
    console.log(action);  // Uncaught ReferenceError: "action" is not defined
}

// Example:
// Value of the `const` variable cant be changed once assigned
function constExample() {
    const action = 'something';
    action = 'Updated action';	// Uncaught TypeError: Assignment to constant variable.
}
```

You may no longer need [IIFEs](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression), and use a block `{}` with `let` and `const` variables inside

## Template Literals

Previously, when you had a variable and you wanted to populate it's value in a string, you had to use concatenation operator to do that i.e.

```javascript
var name = 'John';
console.log('Hello ' + name);
```

In ES6, there are template literals i.e. you can simply do:

```javascript
var name = 'John';
console.log(`Hello ${name}`);
```

A few things to note here; for template literals, you must use backticks and the variables used in the template literal must be declared before the use of template literals.

## Arrow functions

Arrow functions are an abbreviated syntax for anonymous functions where there is no `function` keyword and has implied `return` statement. Confused yet? Here are the examples:

```javascript
// ES5 example
var sayHello = function(name) {
    return 'Hello ' + name + '!';
};

// Using ES6: 
// Arrow function (The one liner)
var sayHello = name => `Hello ${name}!`;	
sayHello('World'); // Hello World

// With block in case multiple statements are involved
var sayHello = name => {
    // Say hello to world in case no name provided
    name = name || 'World';
    return `Hello ${name}!`;
};

sayHello();	// Hello World!
sayHello('Jim'); // Hello Jim!

// Without parameters
var sayHello = () => {
    return 'Hello World!';
};
sayHello(); // Hello World!

// With multiple parameters
var greet = (greeting, name) => `${greeting} ${name}!`;
// or with block
var greet = (greeting, name) => {
    return `${greeting} ${name}!`;
};

greet('Hello', 'World');	// Hello World
```

## Destructuring

If you are coming from PHP, you might be aware of a language construct called `list` the similar can be achieved in Javascript now. Here are a few examples to demonstrate it better.

You can apply it on arrays

```javascript
var parts = '2010-11-11'.split('-'),
    year = parts[0],
    month = parts[1],
    day = parts[2];

console.log()
```
Here is a one liner in ES6

```javascript
var [year, month, day] = '2010-10-11'.split('-');
console.log(year);	// 2010
console.log(month);	// 10
console.log(day);	// 11
```

You can leave some values as well if you want i.e. from the above example

```javascript
// Only take the month and day
var [, month, day] = '2010-10-11'.split('-');
console.log(month);	// 10
console.log(day);	// 11

// Only take the year and day
var [year, , day] = '2010-10-11'.split('-');
console.log(year);	// 2010
console.log(day);	// 11
```

Also, you can set default values i.e. if some variable wasn't able to get filled the default value will be used i.e.

```javascript
// Assume that date is going to be optional and if it is not found, we would like to use `1` then
var [year, month, date=1] = '2010-10'.split('-');
console.log(year);  // 2010
console.log(month); // 10
console.log(date);  // 1

var [year, month, date=1] = '2010-10-11'.split('-');
console.log(year);  // 2010
console.log(month); // 10
console.log(date);  // 11
```

It works for the objectcs as well

```javascript
var person = { name: 'John Doe', age: 23, gender: 'male' };
var {name, age, gender} = person;
console.log(name); // John Doe
console.log(age);	// 23
console.log(gender); // male
```

**Aliasing** From the above example, you must have noticed that I have used the same variable names for the properties i.e. `name`, `age` and `gender` in `var {name, age, gender}`. But what if, I want to store the `person.name` in `tag` and `person.gender` in `sex`?! Well in that case you can easily use the aliases:

```javascript
var person = { name: 'John Doe', age: 23, gender: 'male' };
var {name:tag, age, gender:sex} = person;
console.log(tag); // John Doe
console.log(age); // 23
console.log(sex); // male
```

Also, you can have default values as well i.e. for example if you we wanted to get the default gender for `male` i.e. if the `gender` isn't there use `male`, you can do that by following:

```javascript
var person = { name: 'John Doe', age: 23};
var {name, age, gender = 'male'} = person;
console.log(name); // John Doe
console.log(age); // 23
console.log(gender); // male

// Alias and default value at the same time
var person = { name: 'John Doe', age: 23};
var {name, age, gender:sex = 'male'} = person;
console.log(name); // John Doe
console.log(age); // 23
console.log(sex); // male
```

And here is another example

```javascript
// Returning object/multiple values from a function call
function getLocation() {
    return {
        latitude: 23.4125,
	longitude: 45.128
    };
}

var {latitude:lat, longitude:long} = getLocation();
console.log(lat);  //23.4125
console.log(long); //45.128
```

Check [this gist for a whole lot of examples](https://gist.github.com/mikaelbr/9900818)


## The mighty `for...of`

Previously in order to iterate arrays, you might have used `for` or `forEach`. `for` allows you to break out of the loop but isn't concise, while `forEach` doesn't allow you to break out of the loop but is concise. Meet `for...of` which is both concise and supports breaking out of the loop. Here is how you can use it to iterate throught the arrays:

```javascript
var numbers = [10, 20, 30, 40, 50, 60, 70, 80, 90];
for(let number of numbers) {
    console.log(number)
}

// You can break out of it as well
var numbers = [10, 20, 30, 40, 50, 60, 70, 80, 90];
for(let number of numbers) {
    if (number === 50) {
        break;
    }

    console.log(number);
}
```

Let me put another example here using a mix of destructuring and `for...of`

```javascript
var guests = [{name: 'John Doe', title: 'Mr'}, {name: 'Jane Doe', title: 'Ms'}];
for(let {name} of guests) {
    console.log('Hello ' + name + '!');
}

// Hello John Doe!
// Hello Jane Doe!
```

## Default Parameter Values

In ES6, you can have the default parameter values for example previously you might have done the following to achieve that:

```javascript
function greet(greet, name) {
    greet = greet || 'Hi';
    name = name || 'John Doe';

    console.log(greet + ' ' + name);
}
```
Well, now you can do the following

```javascript
function greet(greet='Hi', name='John Doe') {
    console.log(greet + ' ' + name);
}
```

Plus unlike the first example, where the default value will get assigned on any falsy value, the latter one will work when there is an undefined value for some argument. Also the default values work for object arguments as well i.e.


## Spread operator `...`

Previously when you needed an unknown number of parameters, you would have used special variable called `arguments`. 

```javascript
function populateBucket() {
    var bucket = [];
    for (var itemCounter = 0; itemCounter < arguments.length; itemCounter++) {
        bucket.push(arguments[itemCounter]);
    }
}
```
And you might have noticed that it already has started to get messy. In ES-6 you can use spread operator i.e.

```javascript
function populateBucket(...items) {
    var bucket = [];
    for(item of items) {
        bucket.push(item);
    }
}
```
You can also use it to merge arrays e.g.

```javascript
var a = [1,2,3],
    b = [4,5,6],
    merged = [];

// What used to be the following for merging arrays
merged = a.concat(b);

// Can now be written as
merged = [...a, ...b];
```

## Classes

Remember how we used to create *classes* using constructor functions, ES-6 introduces some syntactic sugar to make it more pleasant. Now you can create classes like below:

```javascript
class Person {

    // Will be called when instnatiating person
    constructor(name) {
        this.name = name;
        console.log('A person named "' + name + '" is born');
    }

    // No need to write function keyword
    sayHello() {
        console.log(this.name + ' says hello');
    }
}
```

Also you can extend classes without having to touch `prototype` now

```javascript
class Employee extends Person {
    constructor(name) {
        super(name);
	console.log(this.name + ' has been employed');
    }
}
```

## Maps

A new data structure has been introduced called map which holds key value pairs.

```javascript
var map = new Map();
map.set('spec', '2015');
map.set('year', '2015');

// use `.get()` to retrieve items
console.log(map.get('spec')); // 2015
```
You can also iterate the maps

```javascript
for (var [key, value] of map) {
   console.log(key + ': ' + value);
}
```
Also there are some helper functions to manipulate maps

```javascript
map.entries(); 		 // Gives you all the entries in map
map.keys(); 		 // Gives you all the keys in map
map.values(); 		 // Gets you the values stored in map
map.has(keyName); 	 // Checks if a map has specified key or not
map.delete(keyName); // Replaces the value having the provided key
map.size;			 // Gives you the size of map
map.clear();		 // Clears all the collection
```

## WeakMaps

Like `Map`, `WeakMap` is a collection of key/value pairs where the keys must be objects or in other words they must be reference types and not value types like numbers, symbols or strings etc and the values can be arbitrary values. If there is no other reference to the key stored in the `WeakMap`, they can be garbage collected. It means they are good for keeping metadata around for the objects while they are still being used. Let's look at the example that I have [stolen from mozilla JS reference](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) to make it more clear

```javascript
var wm1 = new WeakMap(),
    wm2 = new WeakMap(),
    wm3 = new WeakMap();
var o1 = {},
    o2 = function(){},
    o3 = window;

wm1.set(o1, 37);
wm1.set(o2, "azerty");
wm2.set(o1, o2); // a value can be anything, including an object or a function
wm2.set(o3, undefined);
wm2.set(wm1, wm2); // keys and values can be any objects. Even WeakMaps!

wm1.get(o2); // "azerty"
wm2.get(o2); // undefined, because there is no value for o2 on wm2
wm2.get(o3); // undefined, because that is the set value

wm1.has(o2); // true
wm2.has(o2); // false
wm2.has(o3); // true (even if the value itself is 'undefined')

wm3.set(o1, 37);
wm3.get(o1); // 37

wm1.has(o1); // true
wm1.delete(o1);
wm1.has(o1); // false
```

## Sets

Sets are the collection of *unique* values. Any duplicate values will be ignored. The values could be also a primitives or object references.

```javascript
let set = new Set();
set.add(1);
set.add('1');
set.add({ key: 'value' });
console.log(set); // Set {1, '1', Object {key: 'value'}}

// Delete values
set.delete(2);

// Check size
console.log(set.size);
```

Like a map, set allows to create collection by passing an array to its constructor:

```javascript
let set = new Set([1, '1', { key: 'value' }]);
console.log(set); // Set {1, '1', Object {key: 'value'}}
```
To iterate over sets we have the same two options — built-in forEach function or for..of structure:

```javascript
// forEach
let set = new Set([1, '1', { key: 'value' }]);
set.forEach(function (value) {
  console.log(value);
  // 1
  // '1'
  // Object {key: 'value'}
});

// for..of
let set = new Set([1, '1', { key: 'value' }]);
for (let value of set) {
  console.log(value);
  // 1
  // '1'
  // Object {key: 'value'}
};
```

## Weaksets
In contrast to the `Set` which can be a collection of anything, `Weakset` is only a collection of objects and not of arbitrary values of any type. The `WeakSet` is weak: References to objects in the collection are held weakly. If there is no other reference to an object stored in the `WeakSet`, they can be garbage collected. Also, `WeakSets` are not enumerable and so you don’t get enumeration methods like `.forEach`, `.clear` etc.

```javascript
var ws = new WeakSet();
var obj = {};
var foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false, foo has not been added to the set

ws.delete(window); // removes window from the set
ws.has(window);    // false, window has been removed
```


## New String Functions

Several new String methods have been introduced to make our lives easy. Remember how we used to use `indexOf` to check the existence of a string inside another, or to check if a string starts/ends with a specific character, no more folks

```javascript
var message = 'Hello World';
message.startsWith('H'); // instead of message.indexOf('H') === 0
message.endsWith('d'); 	 // instead of whatever ¯\_(ツ)_/¯

message.includes('or');  // instead of message.indexOf('or') >= 0
```

Also, there is a helper for repeating character `n` times.

```javascript
// Previously you would have done
new Array(3+1) * '*'

// Now you can simply do
'*'.repeat(3); // Will generate ***
```

## New Array Functions

There are some new array functions. `Array.from` let's you create arrays from array like objects. For example:

```javascript
// Array-like object (arguments) to Array
function fooBar() {
  return Array.from(arguments);
}

fooBar(1, 2, 3, 5);	// [1, 2, 3, 5];

// Any iterable object...
// Set
var s = new Set(["foo", window]);
Array.from(s);   
// ["foo", window]

// Map
var m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m);                          
// [[1, 2], [2, 4], [4, 8]]  

// Using an arrow function as the map function to
// manipulate the elements
Array.from([1, 2, 3], x => x + x);      
// [2, 4, 6]
```

`Array.fill` allows you to replace all the elements of an array with the passed element

```javascript
var randomNumbers = [1, 5, 7, 77, 12, 3];
randomNumbers.fill('*');	// ['*', '*', '*', '*', '*', '*'];
```

`Array.find` receives a callback and returns the first element satisfying the condition in callback

```javascript
var users = [{name: 'John Doe', age: 23}, {name: 'Jane Doe', age: 25}, {name: 'Kane Doe', age: 30}];
users.find(user => user.age > 25); 	// {name: 'Kane Doe', age: 30}
```

Also a similar function is `Array.findIndex` which works the same but returns the index of the matching element instead.

## Modules

ES was missing native modules support for a long time. People came up with things like AMD, CommonJS or Modular pattern for that matter and other similar work arounds. ES6 finally has the support for modules natively now. Let's scratch the surface a bit.

By default anything that you declare in a file is not going to be visible outside, unless you `export` it. 

Take the example of a `User` module below

```javascript
// user.js

var localVariable = 123;  // not visible outside this file

export default function User(age) {
  this.age = age;
}; // can be imported by other files
```

And now if we want to use this

```javascript
// user-details.js

import User from 'user';

var user = new User(24);
```
There is a lot more to it. Please have a look at [this article for further details](https://ponyfoo.com/articles/es6-modules-in-depth)

## Final Words

Although ES6 has been finalized, there still is dangling support for it in the browsers. But, there are [tons of tools in the wild](https://github.com/addyosmani/es6-tools) to help us use ES6 today. The most popular one is [BabelJS](https://babeljs.io/) which can either be run as a standalone tool or be used with your build system. They have [plugins](http://babeljs.io/docs/setup/) available for Grunt, Gulp etc.

Okay folks, that about wraps it up. There are still some noteworthy and mind-bending features which haven't been mentioned here Generators, Promises, Proxy and Symbols to name a few. But, the things covered in this article are enough to get you up and started. However I would highly recommend [this series of articles](https://ponyfoo.com/articles/tagged/es6-in-depth) and [this book if you can](https://leanpub.com/understandinges6) ..and [the specs maybe](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts) for the overachievers. Until next time, stay tuned.
