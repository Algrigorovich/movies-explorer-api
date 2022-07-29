const usersRouter = require('express').Router();
const { userValidator } = require('../middlewares/joi-schemas');

const {
  updateUserInfo,
  getUserInfo,
} = require('../controllers/users');

usersRouter.get('/me', getUserInfo);
usersRouter.patch('/me', userValidator, updateUserInfo);

module.exports = usersRouter;
