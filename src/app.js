
'use strict';

require('dotenv').config();
const router = require('../src/router/router');
const express = require('express');
const cors = require('cors');
const errorHandlingMiddleware = require("../src/middleware/ErrorHandlingMiddleware");
const swagger = require("swagger-ui-express");
const docs = require("../docs/swagger");

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandlingMiddleware);
app.use('/swagger-docs', swagger.serve, swagger.setup(docs));

module.exports = app;