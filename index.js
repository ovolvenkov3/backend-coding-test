
'use strict';

const app = require('./src/app');

const db = require("./src/dataBase/dataBase");
const logger = require("./src/utils/logger");
const { PORT } = process.env;

const init = async () => {
  await db.createTables();

  app.listen(PORT, () => {
    logger.info(`App started on port ${PORT}`);
    console.log('Server started on port ', PORT);
  });
};

init();

module.exports = app;