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

const findOne = id => Book.findOne({
  where: {
    id,
  },
}).then((book) => {
  logger.debug('bookService:findOne: ', book);
  return book;
}).catch((e) => {
  logger.error('bookService:findOne:error: ', e);
  throw e;
});

const deleteOne = id => Book.destroy({
  where: {
    id,
  },
}).then((countRows) => {
  logger.debug('bookService:deleteOne: ', countRows);
  return countRows > 0;
}).catch((e) => {
  logger.error('bookService:deleteOne:error: ', e);
  throw e;
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

const buildUpdateObject = (bookRequest) => {
  const bookToUpdate = {};
  if (bookRequest.name) {
    bookToUpdate.nome = bookRequest.name;
  }
  if (bookRequest.year) {
    bookToUpdate.ano = Number(bookRequest.year);
  }
  if (bookRequest.isbn13) {
    bookToUpdate.isbn13 = bookRequest.isbn13;
  }
  if (bookRequest.isbn10) {
    bookToUpdate.isbn10 = bookRequest.isbn10;
  }
  if (bookRequest.owner) {
    bookToUpdate.dono = bookRequest.owner;
  }
  if (bookRequest.description) {
    bookToUpdate.descricao = bookRequest.description;
  }
  if (bookRequest.type) {
    bookToUpdate.tipo = bookRequest.type;
  }
  bookToUpdate.ultimaAtualizacao = moment().valueOf();
  return bookToUpdate;
};

const updateOne = (id, bookRequest) => new Promise((resolve, reject) => {
  if (!id) {
    return reject(new Error('id.empty'));
  }
  const bookToUpdate = buildUpdateObject(bookRequest);
  if (bookToUpdate.ano <= 0 || Number.isNaN(bookToUpdate.ano)) {
    return reject(new Error('book.year.is.empty'));
  }
  if (bookToUpdate.tipo && !bookTypes.includes(bookToUpdate.tipo)) {
    return reject(new Error('book.type.empty'));
  }
  return Book.update(bookToUpdate, {
    where: {
      id,
    },
  }).then(() => {
    logger.debug('bookService:updateOne:ok');
    resolve();
  }).catch((e) => {
    logger.debug('bookService:updateOne:error: ', e);
    reject(e);
  });
});

module.exports.findAll = findAll;
module.exports.findOne = findOne;
module.exports.create = create;
module.exports.deleteOne = deleteOne;
module.exports.updateOne = updateOne;
