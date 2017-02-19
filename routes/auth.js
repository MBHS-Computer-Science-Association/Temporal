/**
 * Temporal
 * routes/auth.js
 * Routing for authentication module
*/

var express = require('express');
var router = express.Router();
var auth = require('../auth');
var path = require('path');

router.get('/', (req, res) => {
  var loginSessionExists = false;
  if ( loginSessionExists ) {
    res.redirect('/sets');
  }
});
router.get('/login', (req, res) => {
  // initial login stuff
  res.sendFile(path.resolve(__dirname + '/../public/login.html'));
});
router.get('/loginsubmit', (req, res) => {
  // authenticate login
  if ( auth.login( req.query.username, req.query.password ) !== false ) {
    // Session stored in sess
    // TODO: do something with sess
    sess = auth.createSession(req, res, req.query.username);

    /*
    var params = {
      success: true
    };

    res.render('login', params); // TODO: change to render
    */
    res.send("Login success");
  } else {
    res.send("Login failure");
  }
});
router.get('/signup', (req, res) => {
  // create an account
  res.sendFile(path.resolve(__dirname + '/../public/signup.html'));
});
router.get('/signupsubmit', (req, res) => {
  res.send(req.query.username + " " + auth.signup(req.query.username, req.query.password, req.query.email));
  // if ( auth.signup( req.query.username, req.query.password, req.query.email ) ) {
  //   res.send("Creation failure not detected or success");
  // } else {
  //   res.send("Creation failure");
  // }
  // res.render('signup.html');
});
router.get('/logout', (req, res) => {
  // TODO: need to get session
  auth.destroySession( sess );
  res.send("Logout successful");
  // res.sendFile(path.resolve(__dirname + '/../public/logout.html'));
});

module.exports = router;
