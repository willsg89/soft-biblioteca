const Book = require('../model/livro');

// const bd = [
//   {
//     name: 'sdsd',
//     ano: 2011,
//     isbn13: '3213313',
//     isbn10: '3313',
//     dono: 'soft',
//     disponivel: true,
//     autores: ['ddd', 'sdsds'],
//     descricao: 'dkkdkdkd',
//     dataInclusao: 54664654,
//     ultimaAtualizacao: 65465465456,
//     tipo: 'Livro',
//     tags: ['ssdsd', 'sdsdsdsd'],
//   },
// ];
// console.log('All books:', JSON.stringify(books));

const findAll = () => new Promise((resolve, reject) => {
  Book.findAll().then((books) => {
    resolve(books);
  }).catch((e) => {
    reject(e);
  });
});

const create = () => new Promise((resolve, reject) => {
  Book.create({ firstName: 'Jane', lastName: 'Doe' }).then((newBook) => {
    resolve({ id: newBook.id });
  }).catch((e) => {
    reject(e);
  });
});

const update = () => new Promise((resolve, reject) => {
  Book.update({ lastName: 'Doe' }, {
    where: {
      lastName: null,
    },
  }).then(() => {
    console.log('Done');
    resolve();
  }).catch((e) => {
    reject(e);
  });
});

module.exports.findAll = findAll;
module.exports.create = create;
module.exports.update = update;
