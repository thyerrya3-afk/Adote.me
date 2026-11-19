const express = require('express');
const router = express.Router();

// Importa o controller de animais
const animalController = require('../controllers/animalController');

// Importa o middleware que só deixa passar administradores
const { ehAdmin } = require('../middlewares/auth');

// GET /animais - lista (qualquer pessoa pode ver)
router.get('/', animalController.listar);

// Rotas abaixo: só administrador (ehAdmin roda antes do controller)
router.get('/novo', ehAdmin, animalController.formulario);
router.post('/', ehAdmin, animalController.criar);
router.get('/:id/editar', ehAdmin, animalController.formularioEditar);
router.post('/:id/editar', ehAdmin, animalController.atualizar);
router.post('/:id/excluir', ehAdmin, animalController.excluir);

// Exporta as rotas
module.exports = router;