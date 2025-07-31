const express = require('express');
const songRouter = require('./Routes/Song.Route');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', songRouter);




module.exports = app;