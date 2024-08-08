const router = require('express').Router();
const { User, Provider, Ticket } = require('../models');
const auth = require('../utils/auth');

// account view
router.get('/account', auth, async (req, res) => {
  try {
    res.render('accounts');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;