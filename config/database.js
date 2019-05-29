const Sequelize = require('sequelize');

const sequelize = new Sequelize('biblioteca', 'root', '1q2w3e4r', {
  host: 'localhost',
  dialect: 'mysql',
});

const initDB = () => new Promise((resolve, reject) => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
      resolve();
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
      reject(err);
    });
});

module.exports.connection = sequelize;
module.exports.initDB = initDB;
