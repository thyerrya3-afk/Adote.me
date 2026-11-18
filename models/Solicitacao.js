// Importa os tipos de dados do Sequelize
const { DataTypes } = require('sequelize');

// Importa a conexão com o banco
const sequelize = require('../config/database');

// Define o model Solicitacao (vira a tabela "solicitacoes" no banco)
const Solicitacao = sequelize.define('Solicitacao', {
  status: {
    type: DataTypes.ENUM('pendente', 'aprovada', 'recusada'),
    allowNull: false,
    defaultValue: 'pendente'   // toda solicitação nova começa pendente
  }
}, {
  tableName: 'solicitacoes'    // nome da tabela no banco
});

// Exporta o model para outros arquivos usarem
module.exports = Solicitacao;