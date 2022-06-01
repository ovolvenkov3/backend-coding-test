const ApiError = require('../error/ApiError');

class HealthController {
  async getHealth(req, res, next) {
    try {
      res.send('Healthy');
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new HealthController();