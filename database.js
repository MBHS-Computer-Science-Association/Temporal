/**
 * Temporal
 * database.js
 * Handles PostgreSQL
*/

var pg = require('pg');
var db = new pg.Client(process.env.DATABASE_URL);
