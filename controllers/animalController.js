// Importa os models (usa o index.js da pasta models)
const { Animal, Solicitacao } = require('../models');

// Só aceita links que começam com http:// ou https:// (senão, guarda vazio)
function limparFoto(foto) {
  const link = (foto || '').trim();
  if ((link.startsWith('http://') || link.startsWith('https://')) && link.length <= 500) {
    return link;
  }
  return null;
}

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
    const { nome, especie, idade, sexo, descricao, foto } = req.body;
    await Animal.create({
      nome, especie, idade, sexo, descricao,
      foto: limparFoto(foto)
    });
    res.redirect('/animais');
  } catch (erro) {
    res.status(500).send('Erro ao cadastrar o animal.');
  }
};

// Mostra o formulário de edição já preenchido com os dados do animal
exports.formularioEditar = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);

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

    const { nome, especie, idade, sexo, descricao, situacao, foto } = req.body;
    await animal.update({
      nome, especie, idade, sexo, descricao, situacao,
      foto: limparFoto(foto)
    });

    res.redirect('/animais');
  } catch (erro) {
    res.status(500).send('Erro ao atualizar o animal.');
  }
};

// Exclui o animal do banco (e as solicitações dele)
exports.excluir = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);

    if (!animal) {
      return res.status(404).send('Animal não encontrado.');
    }

    // Primeiro apaga as solicitações desse animal,
    // para não sobrar solicitação sem animal
    await Solicitacao.destroy({ where: { AnimalId: animal.id } });

    // Depois apaga o animal
    await animal.destroy();

    res.redirect('/animais');
  } catch (erro) {
    res.status(500).send('Erro ao excluir o animal.');
  }
};