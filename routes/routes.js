/**
 * Temporal
 * routes/routes.js
 * Routing for main website
*/

var express = require('express');
var router = express.Router();

router.use(express.static('public'));

module.exports = router;
