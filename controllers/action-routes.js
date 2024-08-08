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
  try {
    // Check if the user type is available in the session
    const userType = req.session.user.type;

    // Perform logic based on the user type
    if (userType === 'user') {
      // user-specific logic
      const ticketData = await Ticket.findAll(); // Example: user might fetch all tickets
      res.render('user-tickets', { tickets: ticketData });
    } else {
      // Non-user logic
      const ticketData = await Ticket.findByPk(req.params.id); // Example: other user fetches their own ticket
      if (!ticketData) {
        return res.status(404).json({ message: 'No ticket with this id!' });
      }
      res.render('ticket', { ticket: ticketData.get({ plain: true }) });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/ticket/:id', auth, async (req, res) => {
  try {
    const ticketData = await Ticket.findByPk(req.params.id);
    if (!ticketData) {
      res.status(404).json({ message: 'No ticket with this id!' });
      return;
    }
    const ticket = ticketData.get({ plain: true });
    const userId = req.session.user.id;
    const userType = req.session.user.type;

    // Pass the ticket data and user type to the template
    res.render('ticket', { ticket, userId, userType });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
