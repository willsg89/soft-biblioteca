const Uf = require('../model/uf');
const logger = require('../config/logger');

const findAll = () => new Promise((resolve, reject) => {
  Uf.findAll().then((ufs) => {
    logger.debug('ufService:findAll: ', ufs);
    resolve(ufs);
  }).catch((e) => {
    reject(e);
  });
});

const findOne = id => Uf.findOne({
  where: {
    id,
  },
}).then((uf) => {
  logger.debug('ufService:findOne: ', uf);
  return uf;
}).catch((e) => {
  logger.error('ufService:findOne:error: ', e);
  throw e;
});

const deleteOne = id => Uf.destroy({
  where: {
    id,
  },
}).then((countRows) => {
  logger.debug('ufService:deleteOne: ', countRows);
  return countRows > 0;
}).catch((e) => {
  logger.error('ufService:deleteOne:error: ', e);
  throw e;
});

const validadeCreate = (ufToInsert) => {
  const errors = [];
  if (!ufToInsert.nome) {
    errors.push('Uf.name.is.empty');
  }
  if (!ufToInsert.sigla) {
    errors.push('Uf.owner.is.empty');
  }
  return errors;
};

const create = (ufRequest = {}) => new Promise((resolve, reject) => {
  const ufToInsert = {
    siglauf: ufRequest.sigla,
    nomeif: ufRequest.nome,
  };
  const errors = validadeCreate(ufToInsert);
  if (errors && errors.length) {
    return reject(new Error(errors.join(', ')));
  }
  Uf.create(ufToInsert).then((newUf) => {
    resolve({ id: newUf.iduf });
  }).catch((e) => {
    reject(e);
  });
  return undefined;
});

const buildUpdateObject = (ufRequest) => {
  const ufToUpdate = {};
  if (ufRequest.nome) {
    ufToUpdate.nomeuf = ufRequest.nome;
  }
  if (ufRequest.sigla) {
    ufToUpdate.siglauf = ufRequest.sigla;
  }
  return ufToUpdate;
};

const updateOne = (id, ufRequest) => new Promise((resolve, reject) => {
  if (!id) {
    return reject(new Error('id.empty'));
  }
  const ufToUpdate = buildUpdateObject(ufRequest);
  return Uf.update(ufToUpdate, {
    where: {
      id,
    },
  }).then(() => {
    logger.debug('ufService:updateOne:ok');
    resolve();
  }).catch((e) => {
    logger.debug('ufService:updateOne:error: ', e);
    reject(e);
  });
});

module.exports.findAll = findAll;
module.exports.findOne = findOne;
module.exports.create = create;
module.exports.deleteOne = deleteOne;
module.exports.updateOne = updateOne;
