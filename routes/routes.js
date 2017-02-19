/**
 * Temporal
 * routes/routes.js
 * Routing for main website
*/

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
      description: "Life! There is nothing better than life.",
      id: 2341098
    },
    {
      title: "AP Chemistry Ions",
      description: "I'm reacting to this.",
      id: 2122348
    },
    {
      title: "AP Calculus BC Derivatives",
      description: "Taking the derivative sucks.",
      id: 2342301
    }
  ];

  res.render('sets', {
    sets: mock_sets,
    edit: false
  });
});

router.get('/sets/edit',(req, res) => {
  var mock_sets = [
    {
      title: "AP Biology Part I",
      description: "Life! There is nothing better than life.",
      id: 2341098
    },
    {
      title: "AP Chemistry Ions",
      description: "I'm reacting to this.",
      id: 2122348
    },
    {
      title: "AP Calculus BC Derivatives",
      description: "Taking the derivative sucks.",
      id: 2342301
    }
  ];

  res.render('sets', {
    sets: mock_sets,
    edit: true
  });
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
    cards: mock_cards
  });
});

router.get('/graph/edit', (req,res) => {
  res.render('graph', {
    edit: true,
    cards: mock_cards
  });
});

router.get('/graph/real', (req,res) => {
  graphdb.getAllNodes((response) => {
    res.render('graph', {
      edit: false,
      cards: response
    });
  });
});

module.exports = router;
