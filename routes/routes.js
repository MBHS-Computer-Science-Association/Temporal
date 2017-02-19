var express = require('express');
var router = express.Router();

router.use(express.static('public'));

 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');

module.exports = router;
