const express = require('express');
const router = express.Router();

// Importa o controller de autenticação
const authController = require('../controllers/authController');

// GET /cadastro - mostra o formulário
router.get('/cadastro', authController.formularioCadastro);

// POST /cadastro - recebe o formulário e cria o usuário
router.post('/cadastro', authController.cadastrar);

// Exporta as rotas
module.exports = router;