const router = require('express').Router();
const { User, Provider, Ticket } = require('../models');
const zipCodeData = require('zipcode-city-distance-more-zipcodes');
const {auth} = require('../utils/auth');

// Look into the user's proile and load the the user data from db and pass it to profile.handlebar
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
    res.render('profile', {user, isUser : true, uid: req.session.uid, viewProfile: true});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Look into the provider's proile and load the the provider data from db and pass it to profile.handlebar
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
    res.render('profile', {provider, isUser: false, uid: req.session.uid, viewProfile: true});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// /ticket to create a ticket page
router.get('/ticket/', auth, async (req, res) => {
  try {
    // Perform logic based on the user type
    if (req.session.userType === 'provider') {
      res.redirect(307, '/provider');
      return;
    }
    res.render('ticket', { createATicket: true, uid: req.session.uid, viewProfile: true, today: new Date().toISOString().slice(0, 10) });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// /ticket/:id user view the specifc ticket. provider view the ticket and can accept an open ticket.
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
    
    if (req.session.userType === 'user') {
      if (ticket.user_id != req.session.uid) {
        res.redirect(307, '/user');
        return;
      }
      if (ticket.provider_id) {
        const provider = (await Provider.findByPk(ticket.provider_id, {
          attributes: {exclude: ['password']}})).toJSON();
          console.log(provider);
          res.render('ticket', {ticket, provider, uid: req.session.uid, viewProfile: true});
        } else {
        res.render('ticket', {ticket, uid: req.session.uid, viewProfile: true});
      };
    } else {
      const providerZipcode = (await Provider.findByPk(req.session.uid, {
        attributes: ['zipcode'],
      })).toJSON().zipcode;

      const distance = (Math.round(zipCodeData.zipCodeDistance(ticket.User.zipcode, providerZipcode,'M') * 100) / 100) + " miles"
      
      const noProvider = (!ticket.provider_id) ? true : false; 
      const iAmProvider = (ticket.provider_id === req.session.uid) ? true : false;
      
      res.render('ticket', {ticket, distance, isProvider: true, noProvider: noProvider, uid: req.session.uid, viewProfile: true, iAmProvider: iAmProvider});
    }

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
