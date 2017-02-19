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

// passwordhash = (password) => {
//   const pwd = Buffer.from(password);
//   crypto.pbkdf2(pwd, 'thet3mp3r3dglass$#ATT3RZwhenUsh00tGUNZthruIT#REPEALtheSECONDamendmentNOW', 100000, 512, 'sha512', (err, key) => {
//     if (err) throw err;
//     return key;
//   });
//   // password, salt, iterations, keylen, digest, callback (not used here)
// };

auth.login = (username, password) => {
  // search for user/pass combo
  // if found, return true
  // if not found, return false
  var count = 0;
  var rows = [];
  // COUNT(*) vs *
  // var pwhres = passwordhash(password);
  db.query('SELECT * FROM users WHERE data->>\'username\' = ($1) AND data->>\'password\' = ($2);', [username], [password], ( err, res ) => {
    if (err) {
      console.log("Error with DB query");
      throw err;
    }
    count++;
    rows.unshift(row.data);
    db.end((err) => {
      if (err) {
        console.log("Error with ending");
        throw err;
      } else {
        console.log("COUNT: " + count);
        return true;
      }
    });
  });
  // query.on('row', (row, res) => {
  //   count++;
  //   console.log(res.rows[0]);
  // });
  // query.on('end', (res) => {
  //   if ( count !== 1 ) {
  //     // doesn't exist
  //     console.log("Count not 1: " + count);
  //     return false;
  //   }
  //   console.log("Count is one, successfully authenticated.");
  //   return true;
  // });
};

auth.signup = (username, password, email) => {
  // ensure username is unique
  var count = 0;
  var query = db.query('SELECT * FROM users WHERE data->>\'username\' = ($1);', [username]);
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
  // bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in password DB.
    var jsonobj = {
      "username": username,
      "password": password,
      "email": email
    };
    console.log("Adding to DB");
    // add to database
    db.query('INSERT INTO users(data) VALUES ($1)', [JSON.stringify(jsonobj)], (err, result) => {
      if (err) {
        console.log("Error");
        throw err;
      }
      console.log("Success");
      return true;
    });
    console.log("Failure");
    return false;
  // });
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
