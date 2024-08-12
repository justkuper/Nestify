const router = require('express').Router();
const zipCodeData = require('zipcode-city-distance-more-zipcodes');
const { User, Provider, Ticket } = require('../models');
const {auth} = require('../utils/auth');
const { compareDate, getMostRecentTicket } = require('../utils/sortDate');

// this is the user's dashboard view
// get the user's tickets, find the most upcoming/recent ticket and render then via users.handlebars
router.get('/user', auth, async (req, res) => {
  try {
    const ticketData = (await Ticket.findAll({
      where: {
        user_id: req.session.uid,
      },
      include : [{ model: User, attributes: ['zipcode']}, {model: Provider, attributes: ['email']}],
      limit: 15,
      order: [['date', 'DESC']]
    }));

    const tickets = ticketData.map((ticket) => ticket.toJSON());
    tickets.sort(compareDate);
    const recentTicket = getMostRecentTicket(tickets);
    console.log(recentTicket);
    const isUser = (req.session.userType === 'user') ? true : false;
    console.log(isUser);
    res.render('users', {tickets, uid: req.session.uid, recentTicket, isUser: isUser});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// this is the provider's dashboard view
// get the available and provider's tickets, find the most upcoming/recent ticket and render then via users.handlebars
router.get('/provider', auth, async (req, res) => {
  try {
    const ticketData = (await Ticket.findAll({
      where: {
        provider_id: null,
      },
      include : [{ model: User, attributes: ['zipcode']}],
      limit: 15,
      order: [['date', 'DESC']]
    }));

    const providerZipcode = (await Provider.findByPk(req.session.uid, {
      attributes: ['zipcode'],
    })).toJSON().zipcode;

    console.log(providerZipcode);

    const tickets = ticketData.map((ticket) => {
      const ticketJSON = ticket.toJSON();
      return {
        ...ticketJSON,
        distance: (Math.round(zipCodeData.zipCodeDistance(ticketJSON.User.zipcode, providerZipcode,'M') * 100) / 100) + " miles"
      } 
    });

    tickets.sort(compareDate);
    const recentTicket = getMostRecentTicket(tickets);

    res.render('users', {tickets, uid: req.session.uid, recentTicket});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;