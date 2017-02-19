/**
 * Temporal
 * server.js
 * Main server startup file
*/
var express = require('express');
var app = express();

var routes = require('./routes/routes');
var routesauth = require('./routes/auth');
var routessets = require('./routes/sets');

// session handling
var pg = require('pg'), session = require('express-session'), pgSession = require('connect-pg-simple')(session);

app.set('port', process.env.PORT || 3000);

app.use(session({
  store: new pgSession(),
  secret: 'l30nard0daVichyFrance',
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

app.use('/', routes);
app.use('/auth', routesauth);
app.use('/sets', routessets);
app.use(function(req, res) {
  res.send('404 Error.');
});

var server = app.listen(app.get('port'), function() {
  console.log('Node server started on port ' + app.get('port'));
});
