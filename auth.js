/**
 * Temporal
 * auth.js
 * Authentication module
*/
var auth = {}; // create an empty object
var app = require('express');
var db = require('./database');
var crypto = require('crypto');
var session = require('express-session');

passwordhash = (password) => {
  return crypto.pbkdf2(password, 'thet3mp3r3dglass$#ATT3RZwhenUsh00tGUNZthruIT#REPEALtheSECONDamendmentNOW', 100000, 512, 'sha512');
  // password, salt, iterations, keylen, digest, callback (not used here)
};

auth.login = (username, password) => {
  // search for user/pass combo
  // if found, return true
  // if not found, return false
  var userFound = db.query('SELECT * FROM users WHERE username->>($1) AND password->>($2);', username, passwordhash(password) );
  if ( userFound !== 1 ) {
    // user already exists
    return false; // error
  }
  return true;
};

auth.signup = (username, password, email) => {
  // ensure username is unique
  var uniqueCheck = db.query('SELECT * FROM users WHERE username->>($1), row_number() OVER as rnum FROM users;', username );
  //var uniqueCheck = JSON.parse(uniqueCheckQuery);
  if ( uniqueCheck !== 0 ) {
    // user already exists
    return uniqueCheck; // error
  }
  // otherwise, proceed
  // ensure email is valid

  // make a JSON object to pass into database
  //var jsonobj = JSON.parse('{"username":"' + username + '", "password":"' + passwordhash(password) + '", "email":"' + email + '"}');
  var jsonobj = {
    "username": username,
    "password": passwordhash(password),
    "email": email
  };
  // add to database
  db.query('INSERT INTO users(data) VALUES ($1)', JSON.stringify(jsonobj));
  return true;
};

auth.createSession = (req, res, username) => {
  // create a session
  var usess = req.session;
  usess.username = username;
  return usess.username;
};

auth.destroySession = (session) => {
  // destroy the session
  session.destroy( usersession.username );
};

module.exports = auth;
