const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
const userRouter = require('./src/router/user.router');


app.use('/api/v1/user', userRouter);

module.exports = app;