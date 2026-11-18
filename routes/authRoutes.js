const express = require('express');
const router = express.Router();

// Importa o controller de autenticação
const authController = require('../controllers/authController');

// GET /cadastro - mostra o formulário de cadastro
router.get('/cadastro', authController.formularioCadastro);

// POST /cadastro - recebe o formulário e cria o usuário
router.post('/cadastro', authController.cadastrar);

// GET /login - mostra o formulário de login
router.get('/login', authController.formularioLogin);

// POST /login - recebe o formulário e faz o login
router.post('/login', authController.login);

// POST /logout - encerra a sessão
router.post('/logout', authController.logout);

// Exporta as rotas
module.exports = router;