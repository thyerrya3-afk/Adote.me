const express = require('express');
const router = express.Router();

// Importa o controller de animais
const animalController = require('../controllers/animalController');

// Quando alguém acessar /animais, chama a função listar
router.get('/', animalController.listar);

// Exporta as rotas
module.exports = router;