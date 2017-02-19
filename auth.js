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
  var userFound = db.query('SELECT COUNT(*) FROM users WHERE username->>($1) AND password->>($2);', ['username'], passwordhash(password) );
  if ( userFound !== 1 ) {
    // user already exists
    return false; // error
  }
  return true;
};

auth.signup = (username, password, email) => {
  // ensure username is unique
  var count = 0;
  var query = db.query('SELECT COUNT(*) FROM users WHERE username->>($1);', ['username']);
  query.on('row', (row, res) => {
    count++;
    console.log(res.rows[0]);
  });
  query.on('end', (res) => {
    if ( count > 0 ) {
      return false;
    }
  });
  // SQL: , row_number() OVER as rnum FROM users
  //var uniqueCheck = JSON.parse(uniqueCheckQuery);
  // otherwise, proceed
  // ensure email is valid

  // make a JSON object to pass into database
  //var jsonobj = JSON.parse('{"username":"' + username + '", "password":"' + passwordhash(password) + '", "email":"' + email + '"}');
  var jsonobj = {
    "username": username,
    "password": passwordhash(password),
    "email": email
  };
  console.log("Adding to DB");
  // add to database
  db.query('INSERT INTO users(data) VALUES ($1)', JSON.stringify(jsonobj), (err, result) => {
    if (err) throw err;
    console.log("Success");
    return true;
  });
  console.log("Failure");
  return false;
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
