const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const authRouter = require('./auth');
const NotFoundError = require('../errors/not-found-err');
const { urlNotFound } = require('../constants/messages');
const auth = require('../middlewares/auth');

router.use('/', authRouter);
router.use('/', auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use((req, res, next) => {
  next(new NotFoundError(urlNotFound));
});

module.exports = router;
