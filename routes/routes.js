var express = require('express');
var router = express.Router();

router.use(express.static('public'));

module.exports = router;
