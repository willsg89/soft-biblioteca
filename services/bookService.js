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
  if (!bookToInsert.nome) {
    return reject(new Error('book.name.is.empty'));
  }
  if (!bookToInsert.ano || Number.isNaN(Number(bookToInsert.ano))) {
    return reject(new Error('book.year.is.empty'));
  }
  if (!bookToInsert.dono) {
    return reject(new Error('book.owner.is.empty'));
  }
  if (!bookToInsert.descricao) {
    return reject(new Error('book.description.is.empty'));
  }
  if (!bookToInsert.dataInclusao) {
    return reject(new Error('book.created.at.is.empty'));
  }
  if (!bookToInsert.ultimaAtualizacao) {
    return reject(new Error('book.updated.at.is.empty'));
  }
  if (!bookToInsert.tipo || !bookTypes.includes(bookToInsert.tipo)) {
    return reject(new Error('book.type.empty'));
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
module.exports.create = create;
module.exports.update = update;
