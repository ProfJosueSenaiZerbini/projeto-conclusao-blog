const express = require('express');
const router = express.Router();

// 1. GET /login - Carrega a página com o formulário
router.get('/login', (req, res) => {
  res.render('login', { erro: null });
});

// 2. POST /login - Recebe o formulário e faz a verificação
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Exemplo simples de validação (substitua depois pela busca no banco de dados)
  if (email === "admin@lumina.com" && senha === "123456") {
    // Se estiver correto, redireciona para a página inicial
    return res.redirect('/');
  }

  // Se estiver incorreto, recarrega a tela exibindo a mensagem de erro
  res.render('login', { erro: 'E-mail ou senha incorretos!' });
});

// 3. GET /logout - Encerra a sessão e volta para o login
router.get('/logout', (req, res) => {
  res.redirect('/login');
});

module.exports = router;