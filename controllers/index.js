const router = require('express').Router();

const apiRoutes = require('./api');
const homepageRoutes = require('./homepage-routes.js');
const accountRoutes = require('./account-routes.js');
const actionRoutes = require('./action-routes.js');

router.use('/', homepageRoutes);
router.use('/', accountRoutes);
router.use('/', actionRoutes);
router.use('/api', apiRoutes);

module.exports = router;
