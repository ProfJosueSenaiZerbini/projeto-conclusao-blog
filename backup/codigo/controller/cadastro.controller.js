const Usuario = require('../models/usuario.model');

const renderCadastro = (req, res) => {
  res.render('cadastro', { erro: null });
};

const postCadastro = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    if (!nome || !email || !senha) {
      return res.render('cadastro', { erro: 'Preencha todos os campos!' });
    }

    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.render('cadastro', { erro: 'Este e-mail já está cadastrado.' });
    }

    await Usuario.create({ nome, email, senha });
    res.redirect('/login');

  } catch (error) {
    console.error(error);
    res.render('cadastro', { erro: 'Erro ao criar conta. Tente novamente.' });
  }
};

module.exports = {
  renderCadastro,
  postCadastro
};