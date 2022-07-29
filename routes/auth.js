const authRouter = require('express').Router();
const { login, createUser, logout } = require('../controllers/users');
const { userCreatingValidator, authValidator } = require('../middlewares/joi-schemas');

authRouter.post('/signin', authValidator, login);
authRouter.post('/signup', userCreatingValidator, createUser);
authRouter.post('/signout', logout);

module.exports = authRouter;
