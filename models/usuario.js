const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require ('../db');

const usuario = sequelize.define('usuario', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    // allowNull defaults to true
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Other model options go here
});
module.exports = usuario

// `sequelize.define` also returns the model
//console.log(Tarefa === sequelize.models.Tarefa); // true