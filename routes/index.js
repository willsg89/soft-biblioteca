const express = require('express');
// const ldap = require('ldapjs');

const app = express();

const userRoutes = require('./user');
const bookRoutes = require('./book');
const authorRoutes = require('./author');

app.use('/books', bookRoutes);
app.use('/user', userRoutes);
app.use('/authors', authorRoutes);

module.exports = app;
