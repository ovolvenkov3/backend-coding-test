const ApiError = require('../error/ApiError');
const logger = require('../utils/logger');
const {unexpectedError} = require("../error/messages");

const errorHandlingMiddleware = (err, req, res, next) => {
  if (err instanceof ApiError) {
    logger.error(err.message, { status: err.status });
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: unexpectedError });
};

module.exports = errorHandlingMiddleware;