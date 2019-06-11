const express = require('express');

const router = express.Router();

router.get('/home', (req, res) => {
  res.send({
    itensASeremDevolvidos: 0,
    itensDoSeuAcervoEmprestados: 0,
    ItensEmAtraso: 0,
    ReservasAguardnadoRetorno: 0,
    ItemREservadoDisponive: 0,
  });
});

// router.post('/login', (req, res) => {

// })

module.exports = router;
