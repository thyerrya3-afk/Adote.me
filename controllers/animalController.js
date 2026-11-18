// Importa o model Animal (usa o index.js da pasta models)
const { Animal } = require('../models');

// Lista todos os animais
exports.listar = async (req, res) => {
  try {
    const animais = await Animal.findAll();
    res.render('animais/index', { animais });
  } catch (erro) {
    res.status(500).send('Erro ao buscar os animais.');
  }
};

// Mostra a página com o formulário de cadastro
exports.formulario = (req, res) => {
  res.render('animais/novo');
};

// Recebe os dados do formulário e salva o animal no banco
exports.criar = async (req, res) => {
  try {
    // Pega os campos que vieram do formulário
    const { nome, especie, idade, sexo, descricao } = req.body;

    // Cria o animal na tabela (é o INSERT do banco)
    await Animal.create({ nome, especie, idade, sexo, descricao });

    // Depois de salvar, volta para a lista de animais
    res.redirect('/animais');
  } catch (erro) {
    res.status(500).send('Erro ao cadastrar o animal.');
  }
};