/**
 * Temporal
 * routes/auth.js
 * Routing for authentication module
*/

var express = require('express');
var router = express.Router();
var auth = require('../auth');

router.get('/', function(req, res) {
  var loginSessionExists = false;
  if ( loginSessionExists ) {
    res.redirect('/sets');
  }
});
router.get('/login', function(req, res) {
  // initial login stuff
  res.sendFile('login.html');
});
router.post('/login', function(req, res) {
  // authenticate login
  auth.login( req.query.username, req.query.password );
});
router.get('/signup', function(req, res) {
  // create an account
  res.sendFile('signup.html');
});
router.post('/signup', function(req, res) {
  auth.signup( req.query.username, req.query.password, req.query.email );
});
router.get('/logout', function(req, res) {
  // TODO: session needs to be changed
  auth.logout( session );
});

module.exports = router;
