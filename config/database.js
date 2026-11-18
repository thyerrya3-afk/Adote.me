// Importa o Sequelize, a ferramenta que conversa com o banco
const { Sequelize } = require('sequelize');

// Cria a conexão usando os dados que estão no arquivo .env
const sequelize = new Sequelize(
  process.env.DB_NAME,      // nome do banco (adote_me)
  process.env.DB_USER,      // usuário (root)
  process.env.DB_PASSWORD,  // senha
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',       // tipo de banco que estamos usando
    logging: false          // não mostra os comandos SQL no terminal
  }
);

// Exporta a conexão para outros arquivos poderem usar
module.exports = sequelize;