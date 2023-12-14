const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require ('../sequelize');

const Tarefa = sequelize.define('Tarefa', {
  // Model attributes are defined here
  idtarefas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    // allowNull defaults to true
  },

  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  data_criacao: {
    type: DataTypes.DATE,
    allowNull: false,
    // allowNull defaults to true
  },

  data_limite: {
    type: DataTypes.DATE,
    allowNull: false,
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});
module.exports = Tarefa

// `sequelize.define` also returns the model
//console.log(Tarefa === sequelize.models.Tarefa); // true