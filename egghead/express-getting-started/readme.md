# Getting Started with Express.js

$ npm init -y
$ npm i -S express

## Basic setup - Lesson 1

### Most Basic request / response
```
app.get('/', function(req, res) {
  res.send('imma response yo')
  })
```
says - hey express, when you get a request to the path there (in this case root), execute this here callback

### Start the app and tell it where to listen

```
app.listen(3000)
```

Listen on port 3000

### Start the server
$ node index.js

go to localhost:3000

That works but it's a little weird not having and feedback on the cl
```
var server = app.listen(3000, function() {
  console.log('Server running at http://localhost:' + server.address().port);
  })
```

#### Start Script
When dealing with a server app, it's convention to make a start script, so people don't have to know the command / parameters / etc.

Add to package.json scripts
"start": "node index.js"

#### File watch
Stopping and restarting the server every time a change is made is super annoying. the nodemon package can watch for changes and automatically restart the server

$ npm i -D nodemon

package.json script:
"dev": "nodemon index.js"

### Adding another path

```
app.get('/yo', function(req, res) {
  res.send('Yo!');
  })
```

## Routing Basics - Lesson 2

### Basic Parameters
In the route, you can use variables and then access them in the callback for that route:
```
app.get('/:username', function (req, res) {
  var username = req.params.username;
  });
```
The colon is the key. That tells express, hey dude, this is a route parameter.

### Regex in the route
```
app.get(/holla.*/, function (req, res) {
  console.log('holla back yo');
  });
```
This route will trigger for any route that starts with holla!

*Important note:*  Order matters for routes. I.e... express will grab the first one that matches, so if there is an existing route above the regex one in the code that works, it will pull that first

### next()

next can be passed into the callback for a route and when it is executed, it says "hey I'm done with this one, pass control over to the next appropriate route"

## Templating Engines

### Setting up Jade - Lesson 3

```
app.set('views', './views')
app.set('view engine', 'jade')
```
This tells express, whenever you render a view, look in the views folder, and to look for jade files

Now, change the response to render a view instead of directly returning something:
```
app.get('/', function (req, res) {
  res.render('index, { users: users }');
});
```
This tells express, hey, go to the views folder, find the one for index and render it.
The second parameter is a context object. We can pass all sorts of stuff.

*This doesn't seem to work with current version of express - but I don't care. Screw jade*

### Setting up handlebars

Similar to jade, but change views engine to hbs and install dependencies for the templating engine
```
app.set('view engine', 'hbs')

npm i -S handlebars consolidate
// then require the dependencies

var engines = require(consolidate)

app.engine('hbs', engines.handlebars)
```

## Static files - Lesson 4

Tell express where to find static files:
```
// index.js
app.use(express.static('images'));

// index.hbs
<img src="{{user.username}}_sm.jpg" >
```
This tells express, hey, anytime you get a request for a static file, look in the images pathnames

Or, you can use better pathnames:
```
app.use('/profilepics', express.static('images'));

<img src="/profilepics/{{user.username}}_sm.jpg" >
```
Anytime you get an express to the profilepics path, look in this folder
