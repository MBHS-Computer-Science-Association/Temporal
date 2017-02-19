var express = require('express');
var router = express.Router();

router.use(express.static('public'));

router.set('views', path.join(__dirname, 'views'));
router.set('view engine', 'ejs');

module.exports = router;
