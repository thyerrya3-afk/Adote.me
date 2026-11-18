// Importa o model Animal (usa o index.js da pasta models)
const { Animal } = require('../models');

// Função que lista todos os animais
exports.listar = async (req, res) => {
  try {
    // Busca todos os animais no banco
    const animais = await Animal.findAll();

    // Abre a página views/animais/index.ejs e envia a lista para ela
    res.render('animais/index', { animais });
  } catch (erro) {
    res.status(500).send('Erro ao buscar os animais.');
  }
};