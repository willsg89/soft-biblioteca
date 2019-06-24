const express = require('express');

const app = express();

const ufRoutes = require('./uf');

app.use('/uf', ufRoutes);

module.exports = app;
