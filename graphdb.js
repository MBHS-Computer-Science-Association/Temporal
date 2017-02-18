var seraph = require('seraph');
var url = require('url').parse(process.env.GRAPHENEDB_URL);

var db = seraph({
  server: url.protocol + '//' + url.host,
  user: url.auth.split(':')[0],
  pass: url.auth.split(':')[1]
});

module.exports = db;
