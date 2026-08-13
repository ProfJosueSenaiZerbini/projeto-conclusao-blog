const express = require("express");
const usuarioController = require("../controller/usuario.controller");
const router = express.Router();
const app = express();

router.get("/", usuarioController.obterUsuario);
router.get("/criar", usuarioController.criarUsuario);
router.get("/alterar", usuarioController.alterarUsuario);
router.get("/deletar", usuarioController.deletarUsuario);

module.exports = router;
router.get("/", (req, res) => {
  res.render("index", { mensagem: "get /usuario" });
});

router.get("/criar", (req, res) => {
  res.render("index", { mensagem: "get /usuario/criar" });
});
router.get("/deletar", (req, res) => {
  res.render("index", { mensagem: "get /usuario/deletar" });
});

module.exports = router;

//rotas de usuario
app.use("/usuario", usuarioRoutes); // linha adicionada

// Rota de erro
app.use((req, res) => {
  res.status(404).render("erro404");
});

router.get("/", usuarioController.obterUsuario);

// router.get('/', (req, res) => {
//     res.render('index',{mensagem:'get /usuario'})
// });  
