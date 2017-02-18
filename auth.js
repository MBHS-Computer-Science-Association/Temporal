/**
 * Temporal
 * auth.js
 * Authentication module
*/
var auth = {}; // create an empty object
var db = require('./database');

auth.login = function(username, password) {
  // search for user/pass combo

  // if found, return true

  // if not found, return false

};

auth.signup = function(username, password, email) {
  // ensure username is unique
  
  // ensure email is valid

  // add to database

};

auth.createSession = function() {
  // create a session

};

auth.destroySession = function() {
  // destroy the session

};

module.exports = auth;
