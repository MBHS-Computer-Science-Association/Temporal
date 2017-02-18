/**
 * Temporal
 * database.js
 * Handles PostgreSQL
*/

var pg = require('pg');
var db = new pg.Client(process.env.DATABASE_URL);

db.connect(function(err) {
  if ( err ) {
    throw err;
  }
  db.query('CREATE TABLE IF NOT EXISTS users ( id SERIAL, data JSON )');
});
