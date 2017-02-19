/**
 * Temporal
 * database.js
 * Handles PostgreSQL
*/

var pg = require('pg');
var db = new pg.Client(process.env.DATABASE_URL | 'postgres://postgres@localhost/travis_ci_test');

db.connect(function(err) {
  if ( err ) {
    throw err;
  }
  db.query('CREATE TABLE IF NOT EXISTS users ( id SERIAL, data JSON )');
  var sessionsql = `CREATE TABLE IF NOT EXISTS "session" (
    "sid" varchar NOT NULL COLLATE "default",
  	"sess" json NOT NULL,
  	"expire" timestamp(6) NOT NULL
  )
  WITH (OIDS=FALSE);
  ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;`;
  db.query(sessionsql);
});
