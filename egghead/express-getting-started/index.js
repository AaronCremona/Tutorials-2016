var express = require('express');
var app = express();

var fs = require('fs');  // node file service
var _ = require('lodash');
var users = [];

var engines = require('consolidate');
app.engine('hbs', engines.handlebars);

// read the json file and populate the users array
fs.readFile('users.json', {encoding: 'utf8'}, function (err, data) {
  if (err) throw err;

  JSON.parse(data).forEach(function (user) {
    user.name.full = _.startCase(user.name.first + ' ' + user.name.last);
    users.push(user);
  });
});

app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
  res.render('index', {users: users});
});

app.get(/big.*/, function (req, res, next) {
  console.log('big user access');
  next();
});

app.get('/:username', function (req, res) {
  var username = req.params.username;
  res.send(username);
});

var server = app.listen(3000, function() {
  console.log('Server running at http://localhost:' + server.address().port);
});
