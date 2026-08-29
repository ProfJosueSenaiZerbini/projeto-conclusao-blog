const Usuario = require('../models/usuario.model');

// Listar todos os usuários
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-senha'); // Não traz o hash da senha
    res.render('usuarios/index', { usuarios, erro: null });
  } catch (error) {
    console.error(error);
    res.status(500).render('erro404', { mensagem: 'Erro ao carregar lista de usuários.' });
  }
};

// Exibir formulário de edição de usuário
const renderEditarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findById(id).select('-senha');
    if (!usuario) {
      return res.status(404).render('erro404');
    }
    res.render('usuarios/editar', { usuario, erro: null });
  } catch (error) {
    console.error(error);
    res.status(500).render('erro404');
  }
};

// Atualizar dados do usuário
const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  try {
    await Usuario.findByIdAndUpdate(id, { nome, email }, { runValidators: true });
    res.redirect('/usuario');
  } catch (error) {
    console.error(error);
    const usuario = { _id: id, nome, email };
    res.render('usuarios/editar', { 
      usuario, 
      erro: 'Erro ao atualizar usuário. Certifique-se de que os dados estão corretos.' 
    });
  }
};

// Excluir usuário
const deletarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await Usuario.findByIdAndDelete(id);
    res.redirect('/usuario');
  } catch (error) {
    console.error(error);
    res.status(500).redirect('/usuario');
  }
};

module.exports = {
  listarUsuarios,
  renderEditarUsuario,
  atualizarUsuario,
  deletarUsuario
};