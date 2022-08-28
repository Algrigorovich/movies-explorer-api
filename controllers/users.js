const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request');
const AuthError = require('../errors/auth-err');
const DuplicateError = require('../errors/duplicate');
const { jwtDevKey } = require('../constants/config');
const { MONGO_ERROR } = require('../constants/error-codes');
const {
  wrongData,
  emailDuplicate,
  notFound,
  wrongCredentials,
  clearCookie,
  successLogin,
} = require('../constants/messages');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(wrongData);
      } else if (err.code === MONGO_ERROR) {
        throw new DuplicateError(emailDuplicate);
      } else {
        next(err);
      }
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь ${notFound}`);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(wrongData);
      } else if (err.code === MONGO_ERROR) {
        throw new DuplicateError(emailDuplicate);
      } else {
        next(err);
      }
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then(((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь ${notFound}`);
      }
      return res.send(user);
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(wrongData);
      } else {
        next(err);
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : jwtDevKey, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .send({ message: successLogin });
    })
    .catch(() => {
      throw new AuthError(wrongCredentials);
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt')
    .send({ message: clearCookie });
};

module.exports = {
  createUser,
  updateUserInfo,
  getUserInfo,
  login,
  logout,
};
