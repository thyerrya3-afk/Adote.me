const express = require('express');
const router = express.Router();

// Importa o controller de animais
const animalController = require('../controllers/animalController');

// GET /animais - mostra a lista
router.get('/', animalController.listar);

// GET /animais/novo - mostra o formulário de cadastro
router.get('/novo', animalController.formulario);

// POST /animais - recebe o formulário e salva o animal
router.post('/', animalController.criar);

// GET /animais/3/editar - mostra o formulário de edição
router.get('/:id/editar', animalController.formularioEditar);

// POST /animais/3/editar - recebe o formulário e atualiza o animal
router.post('/:id/editar', animalController.atualizar);

// Exporta as rotas
module.exports = router;