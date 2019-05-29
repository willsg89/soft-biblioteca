const Sequelize = require('sequelize');
const { connection } = require('../config/database');
const bookTypes = require('./bookTypes');

const { Model } = Sequelize;

class Livro extends Model {}
Livro.init({
  id: {
    type: Sequelize.NUMBER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ano: {
    type: Sequelize.SMALLINT,
    allowNull: false,
  },
  isbn13: {
    type: Sequelize.STRING,
  },
  isbn10: {
    type: Sequelize.STRING,
  },
  dono: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dataInclusao: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  ultimaAtualizacao: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  tipo: {
    type: Sequelize.ENUM,
    values: bookTypes,
    allowNull: false,
  },
}, {
  sequelize: connection,
  modelName: 'livro',
  timestamps: false,
});

module.exports = Livro;
