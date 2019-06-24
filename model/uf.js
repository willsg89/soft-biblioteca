const Sequelize = require('sequelize');
const { connection } = require('../config/database');

const { Model } = Sequelize;

class Uf extends Model {}
Uf.init({
  iduf: {
    type: Sequelize.NUMBER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomeuf: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  siglauf: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  sequelize: connection,
  tableName: 'uf',
  timestamps: false,
});

module.exports = Uf;
