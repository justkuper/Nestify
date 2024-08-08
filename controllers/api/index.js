const router = require('express').Router();

const userRoutes = require('./users');
const providerRoutes = require('./providers');
const ticketRoutes = require('./tickets');

router.use('/users', userRoutes);
router.use('/tickets', ticketRoutes);
router.use('/providers', providerRoutes);

module.exports = router;
