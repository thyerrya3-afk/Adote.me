// Importa os tipos de dados do Sequelize (texto, número, etc.)
const { DataTypes } = require('sequelize');

// Importa a conexão com o banco
const sequelize = require('../config/database');

// Define o model Usuario (vira a tabela "usuarios" no banco)
const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false          // obrigatório
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true              // não permite dois usuários com o mesmo e-mail
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('administrador', 'adotante'),
    allowNull: false,
    defaultValue: 'adotante'  // se não informar, vira adotante
  }
}, {
  tableName: 'usuarios'       // nome da tabela no banco
});

// Exporta o model para outros arquivos usarem
module.exports = Usuario;