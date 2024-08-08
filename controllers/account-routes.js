const router = require('express').Router();
const zipCodeData = require('zipcode-city-distance-more-zipcodes');
const { User, Provider, Ticket } = require('../models');
const auth = require('../utils/auth');

router.get('/user/', auth, async (req, res) => {
  try {
    const ticketData = (await Ticket.findAll({
      where: {
        user_id: req.session.uid,
      },
      include : [{ model: User, attributes: ['zipcode']}],
      limit: 7,
      order: [['created_at', 'DESC']]
    }));

    const tickets = ticketData.map((ticket) => ticket.toJSON());
    console.log(tickets);
    const latestTicket = tickets[0];
    const recentTicket = tickets.reduce((recent, test) => { 
      if ((new Date(test.date) - new Date()) < 0) {
        return recent;
      } else {
        if ((new Date(test.date) < new Date(recent.date))) {
          return test;
        } else{
          return recent;
        }
      }
    });

    res.render('users', {tickets, uid: req.session.uid, latestTicket, recentTicket});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/provider', auth, async (req, res) => {
  try {
    const ticketData = (await Ticket.findAll({
      where: {
        provider_id: null,
      },
      include : [{ model: User, attributes: ['zipcode']}],
      limit: 7,
      order: [['created_at', 'DESC']]
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

    console.log(tickets);
    const recentTicket = tickets.reduce((recent, test) => { 
      if ((new Date(test.date) - new Date()) < 0) {
        return recent;
      } else {
        if ((new Date(test.date) < new Date(recent.date))) {
          return test;
        } else{
          return recent;
        }
      }
    });
    console.log(recentTicket);
    const latestTicket = tickets[0];

    res.render('users', {tickets, uid: req.session.uid, latestTicket,});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get('/account', auth, async (req, res) => {
//   try {
//     const ticket = await getLatestTicket();
//     res.render('ticket', { ticket });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// async function getLatestTicket() {
//   return await Ticket.findOne({
//       order: [['createdAt', 'DESC']]
//   });
// }


module.exports = router;