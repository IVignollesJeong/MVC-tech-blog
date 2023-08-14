const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-route.js');
const dashboardRoutes = require('./dash-route.js');


router.use('/', homeRoutes);
router.use('/dash', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;