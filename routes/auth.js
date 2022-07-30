const router = require('express').Router();
const { login, createUser, logout } = require('../controllers/users');
const { userCreatingValidator, authValidator } = require('../middlewares/joi-schemas');

router.post('/signin', authValidator, login);
router.post('/signup', userCreatingValidator, createUser);
router.post('/signout', logout);

module.exports = router;
