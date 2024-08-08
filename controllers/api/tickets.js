const router = require('express').Router();
const { Ticket } = require('../../models');

// CREATE new Ticket
router.post('/', async (req, res) => {
  try {
    const dbTicketData = (await Ticket.create({
      description: req.body.description,
      pay: req.body.pay,
      date: req.body.date,
      user_id: req.body.user_id
    })).toJSON();
    // console.log(dbTicketData.toJSON().id);
    res.status(200).json(dbTicketData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  Ticket.update({
      provider_id: req.body.provider_id,
    },
    {
      where: {
        id: req.params.id,
      },
    })
    .then((updatedTicket) => {
      if (updatedTicket[0] === 0) {
        res.status(404).json({ message: 'No Ticket found with that id!' });
        return;
      }
      res.json(updatedTicket);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});


module.exports = router;
