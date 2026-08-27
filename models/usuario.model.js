const db = require('../libs/dbConnect');

const Usuario = {
    obterTodos: (callback) => {
        const sql = 'SELECT * FROM usuario';
        db.query(sql, callback);
    },

    obterPorId: (id, callback) => {
        const sql = 'SELECT * FROM usuarios WHERE id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Usuario;