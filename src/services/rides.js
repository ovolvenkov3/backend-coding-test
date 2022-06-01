const db = require('../dataBase/dataBase');

class RidesServices {
  constructor() {
    this.sql = {
      getRides: 'SELECT * FROM Rides',
      getRide: `SELECT * FROM Rides WHERE rideID=?`,
      createRide: 'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)'
    };
  }

  getRides() {
    return new Promise((resolve, reject) => {
      db.all(this.sql.getRides, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }

  getRide(id) {
    return new Promise((resolve, reject) => {
      db.all(this.sql.getRide, id, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }

  createRide(ride) {
    return new Promise((resolve, reject) => {
      const values = Object.values(ride);
      const context = this;
      db.run(this.sql.createRide, values, function (err) {
        err ? reject(err) : resolve(db.getAsync(context.sql.getRide, this.lastID));
      });
    });
  }

}

module.exports = new RidesServices();
