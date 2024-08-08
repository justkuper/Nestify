const router = require('express').Router();
const { User, Provider, Ticket } = require('../models');
const auth = require('../utils/auth');

router.get('/profile/:id', auth, async (req, res) => {
  try {
    res.render('profile');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/ticket/', auth, async (req, res) => {
  try {
    res.render('ticket');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/ticket/:id', auth, async (req, res) => {
  try {
    res.render('ticket');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/account', auth, async (req, res) => {
  try {
    const ticket = await getLatestTicket();
    res.render('accounts', { ticket });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;