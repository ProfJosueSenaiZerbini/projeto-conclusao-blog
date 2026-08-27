const Usuario = require('../models/usuario.model');

exports.obterUsuario = (req, res) => {
    Usuario.obterTodos((err, resultados) => {
        if (err) {
            return res.status(500).send('Erro ao buscar usuários do banco.');
        }
        res.render('index', { 
            mensagem: 'Lista de Usuários carregada!', 
            usuarios: resultados 
        });
    });
};

exports.criarUsuario = (req, res) => {
    res.render('index', { mensagem: 'Formulário ou rota de criação' });
};

exports.alterarUsuario = (req, res) => {
    res.render('index', { mensagem: 'Rota de alteração' });
};

exports.deletarUsuario = (req, res) => {
    res.render('index', { mensagem: 'Rota de exclusão' });
};