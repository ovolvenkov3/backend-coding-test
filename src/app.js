'use strict';

const express = require('express');
const app = express();

const db = require("./dataBase/dataBase");
const logger = require("./utils/logger");
const { PORT } = process.env;

const init = async () => {
    await db.createTables();

    app.listen(PORT, () => {
        logger.info(`App started on port ${PORT}`);
        console.log('Server started on port ', PORT);
    });

    return app;
};

init();

module.exports = app;
