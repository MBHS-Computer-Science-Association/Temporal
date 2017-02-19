var express = require('express');
var router = express.Router();

var graphdb = require('../graphdb');

router.use(express.static('public'));

//for debugging
router.get('/card', (req, res) => {
  res.render('card');
});

router.get('/sets', (req, res) => {
  var mock_sets = [
    {
      title: "AP Biology Part I",
      description: "Life! There is nothing better than life."
    },
    {
      title: "AP Chemistry Ions",
      description: "I'm reacting to this."
    },
    {
      title: "AP Calculus BC Derivatives",
      description: "Taking the derivative sucks."
    }
  ];

  res.render('sets', mock_sets);
});


// Get rid of this later and link to real database.
var mock_cards = [
  {
    title: "Civil War",
    description: "This had involved of the bloodiest days in US History."
  },
  {
    title: "Russian Revolution",
    description: "This was a precursor to the USSR."
  },
  {
    title: "Indian Independence",
    description: "This caused religious discord."
  }
];

router.get('/graph', (req,res) => {
  res.render('graph', {
    edit: false,
    mock_cards,
    definition: "definition",
    term: "term"
  });
});

router.get('/graph/edit', (req,res) => {
  res.render('graph', {
    edit: true,
    mock_cards,
    definition: "definition",
    term: "term"
  });
});

router.get('/graph/real', (req,res) => {
  graphdb.getAllNodes((cards) => {
    res.render('graph', {
      edit: true,
      cards
    });
  });
});

module.exports = router;
