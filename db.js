//import do sequelize
const { Sequelize } = require('sequelize');
//criando a constante sequelize e passando as informações
const sequelize = new Sequelize('tarefa', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

const seequelize =
    new seequelize(process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
 {
    host: process.env.DB_HOST,
    dialect: 'mysql'
 });

module.exports = sequelize;