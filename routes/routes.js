var express = require('express');
var router = express.Router();

router.use(express.static('public'));

//for debugging
router.get('/card', (req, res) => {
  res.render('card');
});

router.get('/sets', (req, res) => {
  res.render('sets');
});

router.get('/graph', (req,res) => {
  res.render('graph', {
    edit: false,
    definition: "definition",
    term: "term"
  });
});

module.exports = router;
