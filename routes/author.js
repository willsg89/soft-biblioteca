const express = require('express');
const logger = require('../config/logger');

const router = express.Router();
const db = [];

router.get('/', (req, res) => {
  res.send(db);
});

router.get('/qqq', (req, res) => {
  if (!db) {
    res.sendStatus(404);
  } else {
    res.send({ id: req.query.name });
  }
});

router.delete('/:id', (req, res) => {
  logger.info('delete', req, res);
});

router.post('/', (req, res) => {
  const reqBody = req.body;
  if (reqBody.name) {
    db.push({
      nome: reqBody.name,
      id: 2,
    });
    res.status(201).send({ id: 2 });
  } else {
    res.status(500).send({ erro: 'nome é obrigatorio' });
  }
});

router.put('/:id', (req, res) => {
  logger.info('put', req, res);
});


module.exports = router; // commons-js
module.exports.funcaoSoma = router;
// export default router;
