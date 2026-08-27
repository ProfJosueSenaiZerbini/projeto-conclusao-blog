const Usuario = require('../models/usuario.model'); // Mantido um único Model
const bcrypt = require('bcrypt');

// --- TELA DE LOGIN (GET) ---
exports.exibirLogin = (req, res) => {
  res.render('login', { erro: null });
};

// --- PROCESSAR LOGIN (POST) ---
exports.processarLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    // 1. Verifica se o usuário existe
    if (!usuario) {
      return res.render('login', { erro: 'E-mail ou senha incorretos!' });
    }

    // 2. Compara a senha informada com o hash salvo no banco
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.render('login', { erro: 'E-mail ou senha incorretos!' });
    }

    // 3. Salva os dados na sessão (se estiver usando express-session)
    // req.session.usuario = { id: usuario._id, nome: usuario.nome, email: usuario.email };

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
    // 1. Validação de campos obrigatórios
    if (!nome || !email || !senha) {
      return res.render('cadastra.usuario', { erro: 'Preencha todos os campos!' });
    }

    // 2. Verifica se o e-mail já existe
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.render('cadastra.usuario', { erro: 'Este e-mail já está em uso.' });
    }

    // 3. Gera o hash da senha
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // 4. Salva o usuário com a senha criptografada
    await Usuario.create({ nome, email, senha: senhaHash });

    res.redirect('/usuario/login');
  } catch (error) {
    console.error(error);
    res.render('cadastra.usuario', { erro: 'Erro ao cadastrar usuário.' });
  }
};

// --- LOGOUT (GET) ---
exports.logout = (req, res) => {
  // Se usar express-session, destrua a sessão antes do redirecionamento:
  // req.session.destroy();
  res.redirect('/usuario/login');
};