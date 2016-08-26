# ES6

## Arrow functions

```javascript
var imaFunc = function(param1, param2) {
  return param1 * param2;
}

// this syntax isn't much shorter...
var imaArrowFunc = (param1, param2) => {
  return param1 * param2;  
}

// we can shorten it more. Remove the braces, move the return to the same line and no need for the return keyword
var imaArrowFunc = (param1, param2) => param1 * param2;  
}

// if there is only one param, you don't even need parens around them!
var squared = x => x * x;
```

A big use case for arrow functions is the whole whack-ass issue of not having access to the correct 'this' inside a click handler (the that workaround):

```javascript
var that = this;

this.handleSomething(function(message) {
  console.log(message + that.name);
  // we don't have access to the correct this in the outer scope
});

// refactored to use arrow function - it helps solve this(pun?) issue
this.handleSomething((message) => {
  console.log(message + this.name);
  // this works! this refers to the outer scope now

  // also, can be refactored to be even more concise
  this.handleSomething(message => console.log(message + this.name));
```

## let
A long standing gotcha is how var behaves with blocks:

```javascript
var message = 'whassup';

{
  var message = 'yo I ain\'t for that'
}

console.log(message); // yo I ain't for that
```
Javascript does have function scope, so making that block into a function does lock in the other message var into a new scope, but this doesn't work for other blocks like a For loop for example.

Let keyword to the rescue

```javascript
let message = 'whassup';

{
  let message = 'yo I ain\'t for that'
}

console.log(message); // whassup
```

```javascript
var fs = [];

for(var i=0; i<10; i++) {
	fs.push(function () {
		console.log(i);
	});
}

fs.forEach(function (f) {
	f();
});

/*
10
10
10
10
10
10
10
10
10
10
*/
```
The results are a bit unexpected... the reason is that it's using the same i at the time the function that's created in the loop actually runs.

```javascript
var fs = [];

for(let i=0; i<10; i++) {
	fs.push(function () {
		console.log(i);
	});
}

fs.forEach(function (f) {
	f();
});
/*
0
1
2
3
4
5
6
7
8
9
*/
```
This creates a new i each time through the loop.

So if you're used to bringing all var declarations to the top of a scope because of hoisting, you can now just declare inline using let and not worry so much. Eg:

```javascript
function varFunc() {
  var prevoius = 0,
    current = 1,
    i, temp;

  for (i = 0; i < n; i++) {
    temp = previous;
    previous = current;
    current = temp + current;
  }
}

function letFunc() {
  let previous = 0;
  let current = 1;

  for (let i = 0; i < n; i++) {
    let temp = previous;
    previous = current;
    current = temp + current;
  }
}
```
## Default Values for Parameters

Now you can set defaults right in the parameter list:
```javascript
function greet(greeting, name = 'John') {
  console.log(greeting + ', ' + name);
}

greeting('Hello');
// Hello, John
```
Shit gets crazier when you assign a function as a default:
```javascript
function receive(complete) {
  complete();
}

receive(function() {
  console.log("you did it");
});
// you did it
// can use defaults like so:
function receive(complete = function() {
  console.log("you did it");
}){
  complete();
}

receive();
// you did it
// or use the arrow syntax
function receive(complete = () => console.log("you did it")) {
  complete();
}

receive();
```
## Constants
Javascript convention is to use all caps for variable names that are supposed to remain constant. ES02015 now supports constants with the 'const' keyword. Attempting to change the value will result in a read only error.

It gets a bit weird with objects. Properties of the object can be mutated even if the object itself is assigned with const. However if you tried to reassign the referent to the top level object, it would throw the read only error.

Use cases:
- API keys
- Port assignments
- PI (math)
- margin (profit margin should be used consistently throughout the app)
- etc

Const uses block scope just like let. eg:
```Javascript
if (true) {
  const foo = 'bar';
  console.log('inside: ' + bar); // inside bar
}

console.log('outside: ' + bar); // fail -> undefined
```

## Shorthand Properties
So now you can totally use a shorter notation to make an object:
```javascript
let firstName = 'John';
let lastName = "Lindquist";

let person = {firstName, lastName};

console.log(person); // { firstName: 'John', lastName: 'Lindquist' }

let mascot = 'Moose';

let team = {person, mascot};
console.log(team);

/*
{ person: { firstName: 'John', lastName: 'Lindquist' },
  mascot: 'Moose' }
*/
```

## Object Enhancements

This is totally valid and kick ass in ES6
```javascript
var color = 'red';
var speed = 10;

var car = {
  color,
  speed,
  go() {
    console.log("vroom");
  }
};

console.log(car.color);
car.go();
```

You can also evaluate directly inside the object keys. It has to evaluate to a valid string, but variables, string concatenation etc are fair game.
```javascript
var color = 'red';
var speed = 10;
var drive = "go";

var car = {
  color,
  speed,
  [drive] = function() {
    console.log("vroom");
  }
};

console.log(car.color);
car.go();
```
## Spread operator
```javascript
console.log([1,2,3]); // [1, 2, 3] ldo
console.log(..[1,2,3]); // 1, 2, 3 ldo

// spread operator is useful when trying to push an array into an array, but want each element to be pushed, not the array itself

let first = [1, 2, 3];
let second = [4, 5, 6];

first.push(second);

console.log(first); // [ 1, 2, 3, [ 4, 5, 6 ] ]

// starting over...
let first = [1, 2, 3];
let second = [4, 5, 6];

first.push(...second);

console.log(first); // [ 1, 2, 3, 4, 5, 6 ]
```

The spread operator also works when you want to send an array as individual paremeters to a function call:

```javascript
let first = [1, 2, 3];
let second = [4, 5, 6];

function addThree (a, b, c) {
  let result = a + b + c;
  console.log(result);
}

addThree(...first); // 6
addThree(...second); // 15
```
## String Templates

concatenation is so over
String templates are the new jam. They even respect whitespace even across lines.

```javascript
var salutation = "Good day sir!";
var greeting = `${ salutation }

    [World!]`;

console.log(greeting);
```
You can do expressions inside the braces too

```javascript
var x = 1;
var y = 2;
var equation = `${ x } + ${ y } = ${ x + y }`;

console.log(equation); // 1 + 2 = 3
```
Shit can get really crazy with tags and values.
```javascript
function tag (strings, ...values) {
  console.log(strings);
  console.log(values);

  if (values[0] < 20) {
    values[1] = "awake";
  } else {
    values[1] = "sleepy";
  }

  return `${strings[0]}${values[0]}${strings[1]}${values[1]}`
}

var message = tag`It's ${new Date().getHours()} I'm ${""}`;

console.log(message);
```

It can get even crazier with html parsing and using regex.

## Destructuring assignments

If you have an object with a property and a value, you usually do some sort of assignment:

```javascript
var obj = {
  color: 'blue'
}

console.log(obj.color); // blue

// can do this:
var {color} = {
  color: "blue"
}

// says find the property in the braces and assign it, so now you can just do this:
console.log(color); // blue

// works with multiple props too:
var {color, position} = {
  color: 'blue',
  name: 'john',
  state: 'ny',
  position: 'sitting'
}

console.log(color);
console.log(position);
```
A common use case is a function that returns an object, but you only want some props of the return.

```javascript
function generateObj() {
  return {
    color: 'blue',
    name: 'john',
    state: 'ny',
    position: 'sitting'
  }
}

var {name, state} = generateObj();
console.log(name);
console.log(state);

// it's also possible to alias the props:
var {name:firstName, state:location} = generateObj();
console.log(firstName);
console.log(location);
```

Shit gets really crazy with arrays
```javascript
var [first,,,,fifth] = ['red', 'yellow', 'green', 'blue', 'orange'];

console.log(first);
console.log(fifth);
```
You can also use this in functional cases. For example, iterating over a collection, when you really use want to send some props to the iterator:
```javascript
var people = [{
  // tons of people with tons of props, one being firstName
}]

people.forEach(({firstName}) => console.log(firstName));
```
## Modules!

Simple addition function:

main.js
```javascript
function sumTwo(a, b) {
  return a + b;
}

console.log(
  '2 + 3',
  sumTwo(2, 3);
)
```
### Extract the addition function to a module.

./math/addition.js
```javascript
function sumTwo(a, b) {
  return a + b;
}

function sumThree(a, b, c) {
  return a + b + c;
}

// need a way to expose it
export { sumTwo, sumThree };
```

main.js
```javascript
import { sumTwo, sumThree } from "math/addition"

console.log(
  '2 + 3',
  sumTwo(2, 3);
)

console.log(
  '2 + 3 + 4',
  sumThree(2, 3, 4);
)
```
### Variations:
```javascript
// export direction on the function declarations
export function sumThree(a, b, c) {
  return a + b + c;
}

// alias the import

import {
  sumTwo as addTwoNumbers,
  sumThree
} from 'math/addition';

// import everything
import * as addition from 'math.addition';
// then you need to call functions as methods on the imported object
addition.sumTwo(1, 3);
```

### Importing a 3rd party Modules
Install (ldo)
$ npm install --save lodash

```javascript
import * as _ from 'lodash';

// imagine a user array
_.where(blah blah);
```

### Further reading
[MDN Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
[Babel](http://babeljs.io/docs/learn-es2015/#module-loaders)

## Converting an Array-Like Object to a For Reals Array

For example, you grab an ordered list of the DOM like so:
```javascript
const products = document.querySelectorAll('.product');

console.log(products);
```
If we open up the products list in the console, we can see its __proto__ is NodeList, which means it kind of looks like an array, but it doesn't come with all the shit we normally get with an array (e.g. forEach). There were some really hacky ways to get it to be a real array when it grows up before, but now there is a native way:

```javascript
const products = Array.from(document.querySelectorAll('.product'));

console.log(products);
// __proto__ Array
```

## Promises - meant to be broken?

Promises are useful for a lot of stuff, but one of the biggest cases is programming asynchronous shit like it be synchronous.

Promises take two parameters: resolve or reject. The result of the promise is that it can either resolve or reject (work or fail). If it resolves, .then() will fire, if it rejects the .catch() will fire.

Usually, inside the promise there is some logic to determine if it resolves or rejects.

.then() and .catch() take a callback function as an argument and the data from resolve/reject are passed in as a param

A simple skeleton for making a promise the ES6 way:
```javascript
var d = new Promise((resolve, reject) => {
  // use setTimeout to simulate asynch call
  setTimeout(() => {
    if (true) {
      resolve('hello world');
    } else {
      reject('no bueno');
    }
  }, 2000);
});

d.then((data) => console.log('success: ', data));

d.catch((error) => console.error('error: ', error));
```

### Alternate to .then() .catch() pattern
You can supply a second callback to .then() to handle errors
```javascript
d.then((data) => console.log('success: ', data), (error) => {
  console.error('new error: ', error);
});
```
Tutorial author's preference is to keep them separate so there is no confusion that the code inside the .then() block is handling success.

They can also be chained together:
```javascript
d.then((data) => console.log('success: ', data)).
  catch((error) => console.error('error: ', error));
```
### Chaining .then()'s
Like the drive-through in dude where's my car.

```javascript
d.then((data) => console.log('success: ', data)).
  then((data) => console.log('success 2: ', data)).
  catch((error) => console.error('error: ', error));

  // success:  hello world
  // success 2:  undefined
```
**NB:** The argument to the subsequent .then()s is not the original data, but whatever the previous .then returns, so in the above example, success 2 is undefined.
```javascript
d.then((data) => {
    console.log('success: ', data);
    return 'foo bar';
  }).
  then((data) => console.log('success 2: ', data)).
  catch((error) => console.error('error: ', error));

  // success:  hello world
  // success 2:  foo bar
```

### Whenever an error or exception is thrown, it will automatically trigger .catch() regardless of when the error is thrown.
```javascript
var d = new Promise((resolve, reject) => {
  throw new Error('error thrown!');
  // use setTimeout to simulate asynch call
  setTimeout(() => {
    if (true) {
      resolve('hello world');
    } else {
      reject('no bueno');
    }
  }, 2000);
});

d.then((data) => console.log('success: ', data));

d.catch((error) => console.error('error: ', error));

// => error: [Error: error thrown!]
```

Wherever the error is in the process, it will trigger .catch(). So let's say there are several .then()s and the second or third triggers an error, it will still fire .catch() and any further success code will no longer run.

## Generators
Generators are made by putting an * after the function keyword:
```javascript
function* greet() {
  console.log('you called "next()"');
}

let greeter = greet();
console.log(greeter);
// an object with a next() method
let next = greeter.next();
console.log(next);
/*
you called "next()"
{ value: undefined, done: true }

the value is undefined because the generator didn't yield anything
it's done because it went through all the yield statements (none right now)
*/
function* greet() {
  console.log('you called "next()"');
  yield 'hello';
}
/*
you called "next()"
{ value: 'hello', done: false }

now it yields something all right, but it's not done because it has to work through the whole mess of yields. In this case that is just one, so th next call to .next() will be done
*/

let done = greeter.next();
console.log(done);

/*
you called "next()"
{ value: 'hello', done: false }
{ value: undefined, done: true }
*/
```
If there are a bunch of yields, the code after each one won't actually run until the next, um, *next()* is called:

```javascript
function* greet() {
  console.log('Generators are lazy');
  yield 'How';
  console.log('I\'m not called until the second next');
  yield 'Are';
  console.log('I\'m called before "you"');
  yield 'You';
  console.log('I\'m finally called when the generator is done');
}

let greeter = greet();
console.log(greeter.next());
/*
Generators are lazy
{ value: 'How', done: false }

That's it!
*/
console.log(greeter.next());
console.log(greeter.next());
console.log(greeter.next());
/*
Generators are lazy
{ value: 'How', done: false }
I'm not called until the second next
{ value: 'Are', done: false }
I'm called before "you"
{ value: 'You', done: false }
I'm finally called when the generator is done
{ value: undefined, done: true }
*/
```
Most important thing to get right there is that anything created in those next blocks won't exist until it actually runs.

```javascript
// can iterate
for (let word of greeter) {
  console.log(word);
}
// this grabs the value. Equivalent to running greeter.next().value



```
