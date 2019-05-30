const express = require('express');
const logger = require('../config/logger');

const router = express.Router();
const {
  findAll, create, findOne, deleteOne,
} = require('../services/bookService');

router.get('/', (req, res) => {
  findAll().then((books) => {
    res.send(books);
  }).catch((e) => {
    logger.error('books-routes: ', e);
    res.sendStatus(500);
  });
});

router.get('/:id', (req, res) => {
  findOne(req.params.id).then((books) => {
    if (!books) {
      res.sendStatus(404);
    } else {
      res.send(books);
    }
  }).catch((e) => {
    logger.error('books-routes: ', e);
    res.sendStatus(500);
  });
});

router.delete('/:id', (req, res) => {
  deleteOne(req.params.id).then(() => {
    res.sendStatus(200);
  }).catch((e) => {
    logger.error('books-routes: ', e);
    res.sendStatus(500);
  });
});

router.post('/', (req, res) => {
  create(req.body).then((book) => {
    res.send(book);
  }).catch((e) => {
    logger.error('books-routes: ', e.message);
    res.status(500).send({
      error: e.message,
    });
  });
});

router.put('/', (req, res) => {
  res.send({});
});


module.exports = router;
