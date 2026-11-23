// Importa os tipos de dados do Sequelize
const { DataTypes } = require('sequelize');

// Importa a conexão com o banco
const sequelize = require('../config/database');

// Define o model Animal (vira a tabela "animais" no banco)
const Animal = sequelize.define('Animal', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especie: {
    type: DataTypes.STRING,    // exemplo: Cachorro, Gato
    allowNull: false
  },
  idade: {
    type: DataTypes.INTEGER,   // idade em anos (número inteiro)
    allowNull: false
  },
  sexo: {
    type: DataTypes.ENUM('macho', 'fêmea'),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,      // texto longo
    allowNull: true            // pode ficar vazio
  },
  foto: {
    type: DataTypes.STRING(500), // link (URL) da foto
    allowNull: true              // a foto é opcional
  },
  situacao: {
    type: DataTypes.ENUM('disponivel', 'adotado'),
    allowNull: false,
    defaultValue: 'disponivel' // todo animal novo começa disponível
  }
}, {
  tableName: 'animais'         // nome da tabela no banco
});

// Exporta o model para outros arquivos usarem
module.exports = Animal;