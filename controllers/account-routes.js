const router = require('express').Router();
const { User, Provider, Ticket } = require('../models');
const auth = require('../utils/auth');

// account views
// for both users and providers
router.get('/users', auth, async (req, res) => {
  try {
    res.render('users');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;