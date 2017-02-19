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

passwordhash = (password, res) => {
  crypto.pbkdf2(Buffer.from(password, 'utf-8'), 'thet3mp3r3dglass$#ATT3RZwhenUsh00tGUNZthruIT#REPEALtheSECONDamendmentNOW', 100000, 512, 'sha512', (err, key) => {
    if (err) throw err;
    res = key;
  });
  // password, salt, iterations, keylen, digest, callback (not used here)
};

auth.login = (username, password) => {
  // search for user/pass combo
  // if found, return true
  // if not found, return false
  var count = 0;
  // COUNT(*) vs *
  var pwhres;
  passwordhash(password, pwhres);
  var query = db.query('SELECT * FROM users WHERE data->>\'username\' = ($1) AND data->>\'password\' = ($2);', ['username'], pwhres );
  query.on('row', (row, res) => {
    count++;
    console.log(res.rows[0]);
  });
  query.on('end', (res) => {
    if ( count !== 1 ) {
      // doesn't exist
      console.log("Count not 1: " + count);
      return false;
    }
    console.log("Count is one, successfully authenticated.");
    return true;
  });
};

auth.signup = (username, password, email) => {
  // ensure username is unique
  var count = 0;
  var query = db.query('SELECT * FROM users WHERE data->>\'username\' = ($1);', ['username']);
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
  var pwhres;
  passwordhash(password,pwhres);
  var jsonobj = {
    "username": username,
    "password": pwhres,
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
