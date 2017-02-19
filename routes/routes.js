var express = require('express');
var router = express.Router();

router.use(express.static('public'));

router.get('/card', (req, res) => {
  res.render('card');
});

router.get('/edit', (req, res) => {
  res.render('edit');
});

router.get('/menu', (req, res) => {
  res.render('menu');
});

router.get('/sets', (req, res) => {
  res.render('sets');
});

router.get('/graph', (req,res) => {
  res.render('graph', {
    edit: true,
    definition: "definition",
    term: "term"
  });
});

module.exports = router;
