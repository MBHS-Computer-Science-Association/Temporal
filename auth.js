/**
 * Temporal
 * auth.js
 * Authentication module
*/
var auth = {}; // create an empty object
var db = require('./database');

function passwordhash( pwd ) {
  return 'something';
}

auth.login = function(username, password) {
  // search for user/pass combo

  // if found, return true

  // if not found, return false

};

auth.signup = function(username, password, email) {
  // ensure username is unique
  var uniqueCheck = db.query('SELECT * FROM users WHERE username->>($1), row_number() OVER as rnum FROM users;', username );
  if ( uniqueCheck !== 0 ) {
    // user already exists
    return false; // error
  }
  // otherwise, proceed
  // ensure email is valid

  var jsonstring = JSON.parse('{"username":"' + username + '", "password":"' + password + '", "email":"' + email + '"}');

  // add to database
  db.query('INSERT INTO users(id,data) VALUES ($1)', jsonstring);
};

auth.createSession = function() {
  // create a session

};

auth.destroySession = function() {
  // destroy the session

};

module.exports = auth;
