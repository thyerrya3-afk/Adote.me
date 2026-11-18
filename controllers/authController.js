// Importa o bcryptjs, que transforma a senha em hash
const bcrypt = require('bcryptjs');

// Importa o model Usuario
const { Usuario } = require('../models');

// Mostra a página com o formulário de cadastro
exports.formularioCadastro = (req, res) => {
  res.render('auth/cadastro', { erro: null });
};

// Recebe os dados do formulário e cria o usuário
exports.cadastrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verifica se já existe um usuário com esse e-mail
    const existente = await Usuario.findOne({ where: { email } });
    if (existente) {
      return res.render('auth/cadastro', { erro: 'Este e-mail já está cadastrado.' });
    }

    // Transforma a senha em hash (o 10 é o nível de embaralhamento)
    const hash = await bcrypt.hash(senha, 10);

    // Salva o usuário. O tipo é sempre "adotante" no cadastro
    await Usuario.create({ nome, email, senha: hash, tipo: 'adotante' });

    // Por enquanto volta para a página inicial (o login vem no próximo passo)
    res.redirect('/');
  } catch (erro) {
    res.status(500).send('Erro ao cadastrar o usuário.');
  }
};