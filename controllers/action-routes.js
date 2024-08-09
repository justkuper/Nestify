const router = require('express').Router();
const { User, Provider, Ticket } = require('../models');
const zipCodeData = require('zipcode-city-distance-more-zipcodes');
const auth = require('../utils/auth');

// get Provider or User data by GET /api/users/:id or /api/providers/:id
// router.get('/', auth, async (req, res) => {
//   const providerData = await Provider.findAll().catch((err) => {
//     res.json(err);
//   });
//   const providers = providerData.map((provider) => provider.get({ plain: true }));
//   res.render('all', { providers });
// });

router.get('/user/:id', auth, async (req, res) => {
  // check whether the atttemp is from the correct user type and matching user id.  Otherwise redirect back to /login.  
  if (req.session.userType !== "user" || req.session.uid != req.params.id) {
    res.redirect(307, '/login');
    return;
  }

  try {
        // exclude password from the query result
    const userData = await User.findByPk(req.params.id, {
      attributes: {exclude: ['password']}
    });

    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }

    const user = userData.get({ plain: true });
    console.log(user);

    // hardcoded isUser so the handlebars know which user type it is
    res.render('profile', {user, isUser : true});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/provider/:id', auth, async (req, res) => {


  try {
    // check whether the atttemp is from the correct user type and matching user id.  Otherwise redirect back to /login.  
    if (req.session.userType !== "provider" || req.session.uid != req.params.id) {
      res.redirect(307, '/login');
      return;
    }

    // exclude password from the query result
    const providerData = await Provider.findByPk(req.params.id, {
      attributes: {exclude: ['password']}
    });

    if (!providerData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }

    const provider = providerData.get({ plain: true });

        // hardcoded isUser so the handlebars know which user type it is
    res.render('profile', {provider, isUser : false});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/ticket/', auth, async (req, res) => {
  try {
    // check userTYpe = "user", then proceed.  otherwise, redirect back to /provider.
    // Check if the user type is available in the session
    // Perform logic based on the user type
    if (req.session.userType === 'provider') {
      res.redirect(307, '/provider');
      return;
    }
    res.render('ticket', { createATicket: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/ticket/:id', auth, async (req, res) => {
  // check ticket.user_id = session.uid and userType is user, if false, bounce back to /user.
  try {
    const ticketData = await Ticket.findByPk(req.params.id, {
      include : [{ model: User, attributes: {exclude: ['password']}}],
    });

    if (!ticketData) {
      res.status(404).json({ message: 'No ticket with this id!' });
      return;
    }

    const ticket = ticketData.toJSON();
    console.log(ticket);
    console.log(typeof ticket.provider_id);
    if (req.session.userType === 'user') {
      if (ticket.user_id != req.session.uid) {
        res.redirect(307, '/user');
        return;
      }
      res.render('ticket', {ticket});
    } else {
      const providerZipcode = (await Provider.findByPk(req.session.uid, {
        attributes: ['zipcode'],
      })).toJSON().zipcode;

      const distance = (Math.round(zipCodeData.zipCodeDistance(ticket.User.zipcode, providerZipcode,'M') * 100) / 100) + " miles"
      
      const noProvider = (!ticket.provider_id) ? true : false; 

      res.render('ticket', {ticket, distance, isProvider: true, noProvider: noProvider});
    }

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
