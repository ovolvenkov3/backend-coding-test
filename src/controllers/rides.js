const RidesServices = require('../services/rides');
const ApiError = require('../error/ApiError');
const {ridesNotFound} = require("../error/messages");
const rideSchema = require("../utils/validation/rides");
const rideModel = require("../models/ride");

class RidesController {
  async getRides(req, res, next) {
    try {
      const rides = await RidesServices.getRides();
      if (!rides.length) {
        next(ApiError.badRequest(ridesNotFound));
      }
      if (rides.length === 0) {
        res.send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides'
        });
      }
      res.json(rides);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getRide(req, res, next) {
    try {
      const id = req.params.id;
      const ride = await RidesServices.getRide(id);
      if (!ride.length) {
        next(ApiError.badRequest(ridesNotFound));
      }
      if (ride.length === 0) {
        return res.send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides'
        });
      }
      res.json(ride);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async createRide(req, res, next) {
    try {
      const errors = rideSchema.validate(rideModel(req, res));

      if (errors.length) {
        ApiError.badRequest(errors[0].message);
      }

      const result = await RidesServices.createRide(req.body);
      res.status(201).json(result);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new RidesController();