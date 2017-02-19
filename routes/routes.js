var express = require('express');
var router = express.Router();

router.use(express.static('public'));

express.set('views', path.join(__dirname, 'public'));
express.set('view engine', 'ejs');

module.exports = router;
