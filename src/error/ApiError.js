const {NOT_FOUND, INTERNAL_SERVER_ERROR,FORBIDDEN} = require('./errorCodes');

class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(NOT_FOUND, message);
  }

  static internal(message) {
    return new ApiError(INTERNAL_SERVER_ERROR, message);
  }

  static forbidden(message) {
    return new ApiError(FORBIDDEN, message);
  }
}

module.exports = ApiError;