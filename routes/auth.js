/**
 * Temporal
 * routes/auth.js
 * Routing for authentication module
*/

var express = require('express');
var router = express.Router();
var auth = require('../auth');

router.get('/', (req, res) => {
  var loginSessionExists = false;
  if ( loginSessionExists ) {
    res.redirect('/sets');
  }
});
router.get('/login', (req, res) => {
  // initial login stuff
  res.render('login.html');
});
router.post('/login', (req, res) => {
  // authenticate login
  if ( auth.login( req.query.username, req.query.password ) ) {
    // Session stored in sess
    // TODO: do something with sess
    sess = auth.createSession(req, res, req.query.username);
    res.render('login.html');
  }
});
router.get('/signup', (req, res) => {
  // create an account
  res.render('signup.html');
});
router.post('/signup', (req, res) => {
  auth.signup( req.query.username, req.query.password, req.query.email );
  res.render('signup.html');
});
router.get('/logout', (req, res) => {
  // TODO: need to get session
  auth.destroySession( sess );
  res.render('logout.html');
});

module.exports = router;
