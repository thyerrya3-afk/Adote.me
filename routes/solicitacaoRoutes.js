const express = require('express');
const router = express.Router();

// Importa o controller de solicitações
const solicitacaoController = require('../controllers/solicitacaoController');

// Importa o middleware que só deixa passar quem está logado
const { estaLogado } = require('../middlewares/auth');

// GET /solicitacoes - lista as solicitações (precisa estar logado)
router.get('/', estaLogado, solicitacaoController.listar);

// POST /solicitacoes - cria uma solicitação (precisa estar logado)
router.post('/', estaLogado, solicitacaoController.criar);

// Exporta as rotas
module.exports = router;