// Importa o bcryptjs, que transforma a senha em hash e também compara
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
    const { nome, email, telefone, senha } = req.body;

    // Telefone: só números, espaços e os símbolos ( ) + - , de 8 a 20 caracteres
    const telefoneLimpo = String(telefone || '').trim();
    if (!/^[0-9()+\-\s]{8,20}$/.test(telefoneLimpo)) {
      return res.render('auth/cadastro', { erro: 'Informe um telefone válido, com DDD.' });
    }

    // Verifica se já existe um usuário com esse e-mail
    const existente = await Usuario.findOne({ where: { email } });
    if (existente) {
      return res.render('auth/cadastro', { erro: 'Este e-mail já está cadastrado.' });
    }

    // Transforma a senha em hash (o 10 é o nível de embaralhamento)
    const hash = await bcrypt.hash(senha, 10);

    // Salva o usuário. O tipo é sempre "adotante" no cadastro
    await Usuario.create({
      nome,
      email,
      telefone: telefoneLimpo,
      senha: hash,
      tipo: 'adotante'
    });

    // Depois de cadastrar, vai para a página de login
    res.redirect('/login');
  } catch (erro) {
    res.status(500).send('Erro ao cadastrar o usuário.');
  }
};

// Mostra a página com o formulário de login
exports.formularioLogin = (req, res) => {
  res.render('auth/login', { erro: null });
};

// Recebe e-mail e senha e faz o login
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Procura o usuário pelo e-mail
    const usuario = await Usuario.findOne({ where: { email } });

    // Compara a senha digitada com o hash guardado no banco
    // Se o usuário não existir, ou a senha não bater, mostra a mesma mensagem
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.render('auth/login', { erro: 'E-mail ou senha incorretos.' });
    }

    // Guarda na sessão quem está logado (nunca guardamos a senha)
    req.session.usuario = {
      id: usuario.id,
      nome: usuario.nome,
      tipo: usuario.tipo
    };

    res.redirect('/');
  } catch (erro) {
    res.status(500).send('Erro ao fazer login.');
  }
};

// Faz o logout: destrói a sessão
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};