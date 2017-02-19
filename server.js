/**
 * Temporal
 * server.js
 * Main server startup file
*/
var express = require('express');
var app = express();

var python = require('python-shell');

var routes = require('./routes/routes');

var routesauth = require('./routes/auth');
var routessets = require('./routes/sets');

// session handling
//var pg = require('pg')
var session = require('express-session');
//var pgSession = require('connect-pg-simple')(session);

app.set('port', process.env.PORT || 3000);
app.set('views', "./views");
app.set('view engine', 'ejs');

app.use(session({
  secret: 'l30nard0daVichyFrance',
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  saveUninitialized: false
}));

app.use('/', routes);
app.use('/auth', routesauth);
app.use('/sets', routessets);
app.use(function(req, res) {
  res.send('404 Error.');
});

console.log("Hi. We're starting our python-shell tests.");
python.run("machine-learning/main.py", function(err, results) {
  if (err) throw err;
  console.log(results);
});

var server = app.listen(app.get('port'), function() {
  console.log('Node server started on port ' + app.get('port'));
});

var io = require('./socket')(server);
