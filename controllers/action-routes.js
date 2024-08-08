const router = require('express').Router();
const { User, Provider, Ticket } = require('../models');
const auth = require('../utils/auth');

router.get('/', auth, async (req, res) => {
  const providerData = await Provider.findAll().catch((err) => {
    res.json(err);
  });
  const providers = providerData.map((provider) => provider.get({ plain: true }));
  res.render('all', { providers });
});

router.get('/user/:id', auth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: 'No provider with this id!' });
      return;
    }
    const user = userData.get({ plain: true });
    res.render('profile', user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/provider/:id', auth, async (req, res) => {
  try {
    const providerData = await Provider.findByPk(req.params.id);
    if (!providerData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    const provider = providerData.get({ plain: true });
    res.render('profile', provider);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/ticket/', auth, async (req, res) => {
  // check userTYpe = "user", then proceed.  otherwise, redirect back to /provider.
  try {
    const ticketData = await Ticket.findByPk(req.params.id);
    res.render('ticket'); 
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/ticket/:id', auth, async (req, res) => {
  // check ticket.user_id = session.uid and userType is user, if false, bounce back to /user.
  try {
    const ticketData = await Ticket.findByPk(req.params.id);
    if (!ticketData) {
      res.status(404).json({ message: 'No ticket with this id!' });
      return;
    }
    const ticket = ticketData.get({ plain: true });
    res.render('ticket', ticket); //req.session.userType amd req.session.uid
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
