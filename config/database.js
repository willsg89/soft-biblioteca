const Sequelize = require('sequelize');
const logger = require('../config/logger');

const sequelize = new Sequelize('biblioteca', 'root', '1q2w3e4r', {
  host: 'localhost',
  dialect: 'mysql',
});

const initDB = () => new Promise((resolve, reject) => {
  sequelize
    .authenticate()
    .then(() => {
      logger.info('Connection has been established successfully.');
      resolve();
    })
    .catch((err) => {
      logger.error('Unable to connect to the database:', err);
      reject(err);
    });
});

module.exports.connection = sequelize;
module.exports.initDB = initDB;
