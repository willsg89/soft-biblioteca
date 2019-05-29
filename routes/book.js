const express = require('express');

const router = express.Router();
const { findAll } = require('../services/bookService');

router.get('/', (req, res) => {
  findAll().then((books) => {
    res.send(books);
  }).catch((e) => {
    console.error('books-routes: ', e);
    res.sendStatus(500);
  });
});

router.post('/', (req, res) => {
  res.send({});
});

router.put('/', (req, res) => {
  res.send({});
});


module.exports = router;
