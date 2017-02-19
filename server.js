var express = require('express');
var app = express();

var routes = require('./routes/routes');
var python = require('python-shell');

app.set('port', process.env.PORT || 3000);
app.set('views', "./views");
app.set('view engine', 'ejs');

app.use('/', routes);
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

io.emit('data', [["Russian Revolution"],["Vietnam War"],["both are wars"], ["Thai", "Trevor", "both are the same person"],["Renaissance","Scientific Revolution","both changed the world"],["Donald Trump", "Vladimir Putin", "both are working for Russia"]]);
