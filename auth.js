/**
 * Temporal
 * auth.js
 * Authentication module
*/
var auth = {}; // create an empty object
var db = require('./database');

auth.login = function(username, password) {

};

auth.signup = function(username, password, email) {

};

module.exports = auth;




/// client code


var myObjectOfAuth = require('./auth');

myObjectOfAuth.create("lol");
myObjectOfAuth.destroy("lel");
