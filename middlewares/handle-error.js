const { SERVER_ERROR } = require('../constants/error-codes');
const { serverError } = require('../constants/messages');

const handleError = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;

  res.status(statusCode)
    .send({ message: statusCode === SERVER_ERROR ? serverError : message });
  next();
};

module.exports = handleError;
