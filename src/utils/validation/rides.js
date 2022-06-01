const Schema = require('validate');
const {endCoordinatesError, startCoordinatesError, riderError} = require('../../error/messages');

const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;
const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;

const rideSchema = new Schema({
  start_lat: {
    type: Number,
    required: true,
    size: {
      min: MIN_LATITUDE,
      max: MAX_LATITUDE,
    },
    message: startCoordinatesError,
  },
  start_long: {
    type: Number,
    required: true,
    size: {
      min: MIN_LONGITUDE,
      max: MAX_LONGITUDE,
    },
    message: startCoordinatesError,
  },
  end_lat: {
    type: Number,
    required: true,
    size: {
      min: MIN_LATITUDE,
      max: MAX_LATITUDE,
    },
    message: endCoordinatesError,
  },
  end_long: {
    type: Number,
    required: true,
    size: {
      min: MIN_LONGITUDE,
      max: MAX_LONGITUDE,
    },
    message: endCoordinatesError,
  },
  rider_name: {
    type: String,
    required: true,
    length: {
      min: 1,
    },
    message: riderError,
  },
  driver_name: {
    type: String,
    required: true,
    length: {
      min: 1,
    },
    message: riderError,
  },
  driver_vehicle: {
    type: String,
    required: true,
    length: {
      min: 1,
    },
    message: riderError,
  },
});

module.exports = rideSchema;