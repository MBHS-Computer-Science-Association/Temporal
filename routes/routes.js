var express = require('express');
var router = express.Router();
var path = require('path');

router.use(express.static('public'));

router.set('views', path.join(__dirname, 'public'));
router.set('view engine', 'ejs');

module.exports = router;
