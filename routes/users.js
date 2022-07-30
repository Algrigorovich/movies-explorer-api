const router = require('express').Router();
const { userValidator } = require('../middlewares/joi-schemas');

const {
  updateUserInfo,
  getUserInfo,
} = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', userValidator, updateUserInfo);

module.exports = router;
