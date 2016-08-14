# Module Fundamentals

## Module Patterns in ES5

### Immediately-invoked function expressions (IIFE)

Polluting the global space is bad mmmkay. So we use IIFEs. They provide some encapsulation and reduces pollution of the global scope.

### Reducing global scope pollution using IIFEs

An IFFE is:
- anonymous function
- invoked at the same time it is declared
- provides encapsulation
- reduces global scope pollution (it doesn't have a name - duh)

They don't have any dependency management, so that becomes a challenge, but they are all es5, so if that's the only option, then get'erdone

#### Implementing an IIFE
```javascript
(function () {
  // Code definitely goes here
}());
```
### Revealing module Patterns

Probably the most popular modular patter for developers working purely in ES5. This pattern provides encapsulation, private members, and a way to expose a public api. There are two flavors:

- Singletons - Only ever one instance of the module.
- Constructor - Using a constructor pattern so you can create as many as needed in memory
- Advantages
  - adds only one value to global scope per module
  - clear deliniation between private implementation and public api
  - pure JS

#### Implementing a Singleton Revealing Module Pattern
```javascript
var mySingleton = function () {
  var totallyaVar = 'woah';
  function doSomethingCrazy() {
    // maybe not that crazy
  }

  return {
    doSomethingCrazy: doSomethingCrazy
    // these don't have to be the same name but usually are
  }
}();
```
Since the single is immediately executed, it is the singleton pattern and the return value is stored in the variable. The return value is an object (the only instance created in the app) with any of the returned methods attached (publicly);

#### Implementing a Constructor Type Revealing Module Pattern
```javascript
// javascript convention is to capitalize constructor
var MyConstructor = function () {
  var totallyaVar = 'woah';
  function doSomethingCrazy() {
    // maybe not that crazy
  }

  return {
    doSomethingCrazy: doSomethingCrazy
    // these don't have to be the same name but usually are
  }
};
// remove IIFE parens

var MyConstructor = new MyConstructor();
// since it's not Immediately-invoked, it must be invoked later with the new keyword
```
## Module Formats and Module Loaders

### Module Formats

There are two big module formats in JS and one combo format.
- AMD
  - Asynchronous module definition (AMD)
  - primarily used in the browser (not node)
  - supports asynch loading which is good for browser
- CommonJS
  - more commonly used in server side uses
  - node includes a built in loader for this format
  - still possible to use in browser with a Loaders
- UMD
  - Universal module definition
  - tries to comply with both AMD and CommonJS
  - can be shared across server and browser
  - usually we don't write in this directly
    - more commonly used when transpiling or compiling - eg. babel or typescript
- System.register
  - works with the popular systemJS Loader

All these formats are non-native. They are not built into JS. They were developed independent of the language

- ES2015 includes a built in module pattern - native
  - in 2016 - most browsers still don't actually support

#### Module Loaders

Not all module loaders support all formats
- RequireJS
  - supports AMD
- SystemJS
  - supports AMD, CommonJS, UMD, and System.register

#### AMD Format

```javascript
define(['./player'], function (player) {
  // module stuff goes here

  return {
    publicFunc: publicFunc
  };
})
```
Define is a function that comes with the loader. The first argument are dependencies, which are js files (the js extension is not required)

To install requireJS using npm
```
$ npm install requirejs --save
```
