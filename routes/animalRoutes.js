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

// Exporta as rotas
module.exports = router;