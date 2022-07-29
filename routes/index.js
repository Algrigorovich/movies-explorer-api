const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const authRouter = require('./auth');

const auth = require('../middlewares/auth');

router.use('/', authRouter);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

module.exports = router;
