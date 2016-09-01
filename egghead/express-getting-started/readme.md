# Getting Started with Express.js

$ npm init -y
$ npm i -S express

## Basic setup

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
