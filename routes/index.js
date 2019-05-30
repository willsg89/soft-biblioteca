const express = require('express');

const app = express();

const userRoutes = require('./user');
const bookRoutes = require('./book');

app.use('/books', bookRoutes);
app.use('/user', userRoutes);
// app.use('/', heathCehck);

module.exports = app;
