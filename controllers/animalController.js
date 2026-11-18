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
    const { nome, especie, idade, sexo, descricao } = req.body;
    await Animal.create({ nome, especie, idade, sexo, descricao });
    res.redirect('/animais');
  } catch (erro) {
    res.status(500).send('Erro ao cadastrar o animal.');
  }
};

// Mostra o formulário de edição já preenchido com os dados do animal
exports.formularioEditar = async (req, res) => {
  try {
    // req.params.id é o número que vem na URL (/animais/3/editar)
    const animal = await Animal.findByPk(req.params.id);

    // Se não existir animal com esse id, avisa
    if (!animal) {
      return res.status(404).send('Animal não encontrado.');
    }

    res.render('animais/editar', { animal });
  } catch (erro) {
    res.status(500).send('Erro ao buscar o animal.');
  }
};

// Recebe os dados do formulário de edição e atualiza o animal
exports.atualizar = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);

    if (!animal) {
      return res.status(404).send('Animal não encontrado.');
    }

    const { nome, especie, idade, sexo, descricao, situacao } = req.body;

    // Atualiza as colunas no banco (é o UPDATE)
    await animal.update({ nome, especie, idade, sexo, descricao, situacao });

    res.redirect('/animais');
  } catch (erro) {
    res.status(500).send('Erro ao atualizar o animal.');
  }
};