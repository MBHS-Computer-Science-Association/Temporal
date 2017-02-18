/**
 * Temporal
 * database.js
 * Handles PostgreSQL
*/

var pg = require('pg');
var db = new pg.Client(process.env.DATABASE_URL);

var dbf = {};

dbf.connect = function() {
  db.connect(function(err) {
    if ( err ) {
      throw err;
    }
  });
};

modules.export = dbf;
