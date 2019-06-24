const Sequelize = require('sequelize');
const logger = require('../config/logger');

const sequelize = new Sequelize('SCA_2019', 'SCA_2019', 'SCA_2019', {
  host: '192.168.1.89',
  port: 5432,
  dialect: 'postgres',
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
