const router = require('express').Router();
const zipCodeData = require('zipcode-city-distance-more-zipcodes');
const { User, Provider, Ticket } = require('../models');
const auth = require('../utils/auth');

router.get('/user/', auth, async (req, res) => {
  try {
    // const userData = (await User.findByPk(req.params.id)).toJSON();
    const ticketData = (await Ticket.findAll({
      where: {
        user_id: req.session.uid,
      },
      limit: 7,
      order: [['created_at', 'DESC']]
    }));

    const tickets = ticketData.map((ticket) => ticket.toJSON());
    console.log(tickets);
    const latestTicket = tickets[0];

    res.render('users', {tickets, uid: req.session.uid, latestTicket});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/provider', auth, async (req, res) => {
  try {
    const providerData = await Provider.findByPk(req.params.id);
    res.render('providers');
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