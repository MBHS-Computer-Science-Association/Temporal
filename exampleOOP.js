/**
 * Temporal
 * exampleOOP.js
 * Authentication module
*/
var auth = {};

var things = [];

var db = require('./database');

auth.create = function(thing) {
  things.unshift(thing);
};

auth.destroy = function(thing) {
  things.unshift(thing);
};

module.exports = auth;




/// client code


var myObjectOfAuth = require('./auth');

myObjectOfAuth.create("lol");
myObjectOfAuth.destroy("lel");
