var express = require('express');
var app = express();
var path = require('path');

var routes = require('./routes/routes');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use('/', routes);
app.use(function(req, res) {
  res.send('404 Error.');
});

var server = app.listen(app.get('port'), function() {
  console.log('Node server started on port ' + app.get('port'));
});
