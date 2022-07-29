const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const AuthError = require('../errors/auth-err');
const { authRequired } = require('../constants/messages');
const { jwtDevKey } = require('../constants/config');

const auth = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    throw new AuthError(authRequired);
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : jwtDevKey);
  } catch (err) {
    throw new AuthError(authRequired);
  }

  req.user = payload;

  next();
};

module.exports = auth;
