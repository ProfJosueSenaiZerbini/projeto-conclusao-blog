const express = require('express');
const router = express.Router();
const cadastroController = require('../controllers/cadastro.controller');

router.get('/cadastro', cadastroController.renderCadastro);
router.post('/cadastro', cadastroController.postCadastro);

module.exports = router;