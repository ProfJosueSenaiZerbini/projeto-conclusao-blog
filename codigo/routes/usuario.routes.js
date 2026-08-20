const express = require("express");
const router = express.Router();
const usuarioController = require("../controller/usuario.controller");

// Rotas do Usuário vinculadas ao Controller
router.get("/", usuarioController.obterUsuario);
router.get("/criar", usuarioController.criarUsuario);
router.get("/alterar", usuarioController.alterarUsuario);
router.get("/deletar", usuarioController.deletarUsuario);

module.exports = router;