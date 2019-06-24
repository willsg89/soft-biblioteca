const express = require('express');
const logger = require('../config/logger');

const router = express.Router();
const {
  findAll, create, findOne, deleteOne, updateOne,
} = require('../services/ufService');

router.get('/', (req, res) => {
  findAll().then((ufs) => {
    res.send(ufs);
  }).catch((e) => {
    logger.error('uf-route: ', e);
    res.sendStatus(500);
  });
});

router.get('/:id', (req, res) => {
  findOne(req.params.id).then((ufs) => {
    if (!ufs) {
      res.sendStatus(404);
    } else {
      res.send(ufs);
    }
  }).catch((e) => {
    logger.error('uf-route: ', e);
    res.status(500).send({
      error: e.message,
    });
  });
});

router.delete('/:id', (req, res) => {
  deleteOne(req.params.id).then(() => {
    res.sendStatus(200);
  }).catch((e) => {
    logger.error('uf-route: ', e);
    res.sendStatus(500);
  });
});

router.post('/', (req, res) => {
  create(req.body).then((uf) => {
    res.send(uf);
  }).catch((e) => {
    logger.error('uf-route: ', e.message);
    res.status(500).send({
      error: e.message,
    });
  });
});

router.put('/:id', (req, res) => {
  updateOne(req.params.id, req.body).then(() => {
    res.sendStatus(200);
  }).catch((e) => {
    logger.error('uf-route: ', e.message);
    res.status(500).send({
      error: e.message,
    });
  });
});


module.exports = router;
