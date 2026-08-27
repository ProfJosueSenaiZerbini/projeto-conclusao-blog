const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// GET /usuario -> Lista todos os usuários
router.get('/', usuarioController.listarUsuarios);

// GET /usuario/editar/:id -> Renderiza tela de edição
router.get('/editar/:id', usuarioController.renderEditarUsuario);

// POST /usuario/editar/:id -> Processa a alteração (ou PUT via override)
router.post('/editar/:id', usuarioController.atualizarUsuario);

// POST /usuario/deletar/:id -> Remove um usuário (ou DELETE via override)
router.post('/deletar/:id', usuarioController.deletarUsuario);

module.exports = router;