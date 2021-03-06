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

#### CommonJS Format
Conceptually very similar to AMD format

```javascript
var player = require('./player.js');
// this is how you declare a dependency
// the loader will make sure dependencies are loaded
function kickAssFunc () {
  // kick ass and chew gum here
}

exports.kickAssFunc = kickAssFunc;
```

We don't have to wrap the module in anything. The whole file is the module.

module.exports === exports
i.e...
```javascript
exports.kickAssFunc = kickAssFunc;
// is the exact same as
module.exports.kickAssFunc = kickAssFunc;

// but don't do this
exports = {};
// or this
exports = function () {};
// both will totally reassign the exports object and you'll lose your mojo
// you can do these though:
module.exports = {};
module.exports = function() {};
```
Install SystemJS
```
$ npm install systemjs --save
```

## ES2015 Modules

- Real "native" support built into javascript
- similar to other formats
  - supports dependency management
  - encapsulates implementation details
  - explicitly expose public API
- no libraries required
- must transpile to ensure browser support
- workflow
  - written in ES2015
  - transpiled to a supported format
  - a loader is used (like requireJS or systemJS)

### Importing and Exporting
Imported items are dependencies.
You may import the entire module or just part of it and choose any alias.

Exporting is how you expose the api of the module. You can export items or everything. May specify a default export.

#### Export Syntax

```javascript
export function thisIsPubliclyExposed() {}

export function soIsThis() {}

function butThisIsNot() {}

export var publicVar = 'right on';
```
OR
```javascript
function thisIsPubliclyExposed() {}

function soIsThis() {}

function butThisIsNot() {}

var publicVar = 'right on';

export { thisIsPubliclyExposed, soIsThis as so, publicVar};
```
The two versions are mostly a matter of personal preference, but the second version is often easier with bigger modules

```javascript
export default function thisIsPubliclyExposed() {}
```

It is also possible to set the default so that it doesn't have to be named during import and is particularly helpful if you're only going to export one item anyway.

#### Import Syntax


```javascript
import * as scoreboard from './scoreboard.js';
// import everything
scoreboard.updateScoreboard();

import { addResult, updateScoreboard } from './scoreboard.js';
// import only the selected

import { updateScoreboard as update } from './scoreboard.js';
// import using an alias

import newResult from './scoreboard.js';
// if there is a default export you can use this syntax
```
## babel

Transpiler that supports most 2015 features and produces clean readable javascript of a previous version. It's executed as a build step.

```
$ npm install babel-cli --save-dev
$ npm install babel-preset-es2015 --save-dev
# to run
$ ./node_modules/.bin/bable js --presets es2015 --out-dir build
```

## Browserify

Allows the use of node modules and module syntax on the front end, mainly focused on the commonJS syntax. E.g. using the commonJS version of the app:

```
$ npm install browserify --save-dev
$ mkdir build
$ ./node_modules/.bin/browserify js/app.js --outfile build/bundle.js
```

This will start in the main file, app.js and then follow all the dependencies and generate one "built" js file (bundle.js)

In index.html: remove all the module loader scripts and just use one script tag pointing to bundle.js

### A warning about bundling:

Most of the time bundling improves site performance by reducing the number of requests and responses that hit the server, however sometimes when an app grows too large it can actually be slower to download one monolithic file.

## Webpack

While browswerify focuses only on bundling commonJS, webpack has a shit ton of features.

- bundles AMD, CommonJS, and ES2015
- code splitting features - you can choose how the code is split into files for download from server to client
- processes more than just JS (CSS and other files too)
- uses "loaders" to pre-process and transform before the build step (e.g. transpile 2015 before bundling)

```
$ npm install webpack --save-dev

# example build command
$ ./node_modules/.bin/webpack js/app.js build/bundle.js
```
Change html file to reference build/bundle.js in a script tag

### Using webpack with babel and es2015 module syntax

The process of transpiling before building is called loading, so we need to install a loader. There are preconfigured loaders available:
```
# if not already done
$ npm install webpack --save-dev
$ npm install babel-loader babel-core --save-dev
# also depends on babel-preset-es2015 which was already installed
```

Webpack is about to get very real (more complicated that is). To help manage that, a config file can/should be used: webpack.config.js in the root of the project.
```javascript
module.exports = {
  entry: './js/app.js',
  output: {
    path: './build',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  }
};
```
The config file itself is a CommonJS module. It assigns an object literal to modules.export with all the config info.

- entry: this is set to the module that is the entry point (where the js starts)
- output: path and file name for the bundled output
- options for normal modules are set on module
  - loaders: an array of loaders used to transform the project
    - test: set to a regular expression - webpack will look for files matching the pattern and run the loader on them. in this case, it's looking for js extensions
  - exclude: don't bother with these
  - loader: which loader webpack should use
  - query: parameters to pass to the loader (in this case es2015)

To run webpack:
```
$ ./node_modules/.bin/webpack
# we don't need to provide anything else because it is set in the config
```
