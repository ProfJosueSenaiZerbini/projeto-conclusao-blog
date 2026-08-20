const Usuario = require('../models/login.models');

// --- TELA DE LOGIN (GET) ---
exports.exibirLogin = (req, res) => {
  res.render('login', { erro: null });
};

// --- PROCESSAR LOGIN (POST) ---
exports.processarLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario || usuario.senha !== senha) {
      return res.render('login', { erro: 'E-mail ou senha incorretos!' });
    }

    // Sucesso no login -> redireciona para a home
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('login', { erro: 'Erro ao tentar fazer login.' });
  }
};

// --- TELA DE CADASTRO (GET) ---
exports.exibirCadastro = (req, res) => {
  res.render('cadastra.usuario', { erro: null });
};

// --- PROCESSAR CADASTRO (POST) ---
exports.processarCadastro = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.render('cadastra.usuario', { erro: 'Este e-mail já está em uso.' });
    }

    await Usuario.create({ nome, email, senha });

    // Redireciona para o login do usuário
    res.redirect('/usuario/login');
  } catch (error) {
    console.error(error);
    res.render('cadastra.usuario', { erro: 'Erro ao cadastrar usuário.' });
  }
};

// --- LOGOUT (GET) ---
exports.logout = (req, res) => {
  res.redirect('/usuario/login');
};