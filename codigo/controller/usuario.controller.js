const obterUsuario = (req, res) => {
  res.render("index", { mensagem: "UsuarioController get /usuario" });
};
const criarUsuario = (req, res) => {
  res.render("index", { mensagem: "UsuarioController get /usuario/criar" });
};
const alterarUsuario = (req, res) => {
  res.render("index", { mensagem: "UsuarioController get /usuario/alterar" });
};
const deletarUsuario = (req, res) => {
  res.render("index", { mensagem: "UsuarioController get /usuario/deletar" });
};

//Permite usar as funções fora deste modulo
module.exports = {
  obterUsuario,
  criarUsuario,
  alterarUsuario,
  deletarUsuario,
};
const Usuario = require("../models/usuario.model");