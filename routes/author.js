const express = require('express');
const logger = require('../config/logger');

const router = express.Router();
const db = [];

router.get('/', (req, res) => {
  res.send(db);
});

router.get('/:id', (req, res) => {
  if (!db) {
    res.sendStatus(404);
  } else {
    res.send(db[0]);
  }
});

router.delete('/:id', (req, res) => {
  logger.info('delete', req, res);
});

router.post('/', (req, res) => {
  db.push(req.body);
  res.sendStatus(200);
});

router.put('/:id', (req, res) => {
  logger.info('put', req, res);
});


module.exports = router;
