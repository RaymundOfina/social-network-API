const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');


// adding users & thoughts with routes

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
