const ApiError = require('../error/ApiError');
const logger = require('../utils/logger');
const {unexpectedError} = require("../error/messages");
const {INTERNAL_SERVER_ERROR} = require("../error/errorCodes");

const errorHandlingMiddleware = (err, req, res, next) => {
  if (err instanceof ApiError) {
    logger.error(err.message, { status: err.status });
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(INTERNAL_SERVER_ERROR).json({ message: unexpectedError });
};

module.exports = errorHandlingMiddleware;