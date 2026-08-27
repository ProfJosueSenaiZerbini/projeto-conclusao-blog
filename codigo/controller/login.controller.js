const Usuario = require('../models/usuario.model');

const renderLogin = (req, res) => {
  res.render('login', { erro: null });
};

const postLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    if (!email || !senha) {
      return res.render('login', { erro: 'Informe o e-mail e a senha.' });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.render('login', { erro: 'E-mail ou senha incorretos.' });
    }

    const senhaCorreta = await usuario.compararSenha(senha);
    if (!senhaCorreta) {
      return res.render('login', { erro: 'E-mail ou senha incorretos.' });
    }

    return res.redirect('/usuario');
  } catch (error) {
    console.error(error);
    return res.render('login', { erro: 'Erro ao tentar realizar o login.' });
  }
};

const logout = (req, res) => {
  res.redirect('/login');
};

module.exports = {
  renderLogin,
  postLogin,
  logout
};