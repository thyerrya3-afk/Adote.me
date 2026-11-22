const express = require('express');
const router = express.Router();

// Importa o controller de solicitações
const solicitacaoController = require('../controllers/solicitacaoController');

// Importa os middlewares de proteção
const { estaLogado, ehAdmin } = require('../middlewares/auth');

// GET /solicitacoes - lista as solicitações (precisa estar logado)
router.get('/', estaLogado, solicitacaoController.listar);

// POST /solicitacoes - cria uma solicitação (precisa estar logado)
router.post('/', estaLogado, solicitacaoController.criar);

// PATCH /solicitacoes/3/status - atualiza o status (só administrador)
router.patch('/:id/status', ehAdmin, solicitacaoController.atualizarStatus);

// Exporta as rotas
module.exports = router;