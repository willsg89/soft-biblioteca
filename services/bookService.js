const moment = require('moment');
const Book = require('../model/livro');
const logger = require('../config/logger');
const bookTypes = require('../model/bookTypes');

const findAll = () => new Promise((resolve, reject) => {
  Book.findAll().then((books) => {
    logger.debug('bookService:findAll: ', books);
    resolve(books);
  }).catch((e) => {
    reject(e);
  });
});

const findOne = id => new Promise((resolve, reject) => {
  Book.findOne({
    where: {
      id,
    },
  }).then((book) => {
    logger.debug('bookService:findOne: ', book);
    resolve(book);
  }).catch((e) => {
    reject(e);
  });
});

const deleteOne = id => new Promise((resolve, reject) => {
  Book.destroy({
    where: {
      id,
    },
  }).then((countRows) => {
    logger.debug('bookService:deleteOne: ', countRows);
    resolve(countRows);
  }).catch((e) => {
    reject(e);
  });
});

const validadeCreate = (bookToInsert) => {
  const errors = [];
  if (!bookToInsert.nome) {
    errors.push('book.name.is.empty');
  }
  if (!bookToInsert.ano || Number.isNaN(Number(bookToInsert.ano))) {
    errors.push('book.year.is.empty');
  }
  if (!bookToInsert.dono) {
    errors.push('book.owner.is.empty');
  }
  if (!bookToInsert.descricao) {
    errors.push('book.description.is.empty');
  }
  if (!bookToInsert.dataInclusao) {
    errors.push('book.created.at.is.empty');
  }
  if (!bookToInsert.ultimaAtualizacao) {
    errors.push('book.updated.at.is.empty');
  }
  if (!bookToInsert.tipo || !bookTypes.includes(bookToInsert.tipo)) {
    errors.push('book.type.empty');
  }
  return errors;
};

const create = (bookRequest = {}) => new Promise((resolve, reject) => {
  const bookToInsert = {
    nome: bookRequest.name,
    ano: bookRequest.year,
    isbn13: bookRequest.isbn13,
    isbn10: bookRequest.isbn10,
    dono: bookRequest.owner,
    descricao: bookRequest.description,
    dataInclusao: moment().valueOf(),
    ultimaAtualizacao: moment().valueOf(),
    tipo: bookRequest.type,
  };
  const errors = validadeCreate(bookToInsert);
  if (errors && errors.length) {
    return reject(new Error(errors.join(', ')));
  }
  Book.create(bookToInsert).then((newBook) => {
    resolve({ id: newBook.id });
  }).catch((e) => {
    reject(e);
  });
  return undefined;
});

const update = () => new Promise((resolve, reject) => {
  Book.update({ lastName: 'Doe' }, {
    where: {
      lastName: null,
    },
  }).then(() => {
    logger.log('Done');
    resolve();
  }).catch((e) => {
    reject(e);
  });
});

module.exports.findAll = findAll;
module.exports.findOne = findOne;
module.exports.create = create;
module.exports.deleteOne = deleteOne;
module.exports.update = update;
