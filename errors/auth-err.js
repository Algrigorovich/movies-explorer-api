const { AUTH_ERROR } = require('../constants/error-codes');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTH_ERROR;
  }
}

module.exports = AuthError;
