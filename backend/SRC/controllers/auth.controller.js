const database = require("../DATABASE/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {

    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ mensagem: "Email e senha são obrigatorios" })
        }

        const [usuario] = await database.query(
            `
            SELECT id, nome, senha
            FROM usuario
            WHERE email = ?
            `,
            [email]
        );

        const user = usuario[0];

        const senhaCorreta = await bcrypt.compare(senha, user.senha)

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: "Email ou senha invalidos." })
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            })

        return res.json({
            mensagem: "login realizado com sucesso",
            token,
            usuario: {
                id: user.id,
                nome: user.nome,
                email: user.email
            }
        })
    } catch (e) {
        console.error(e);

        return res.status(500).json({ mensagem:"Erro interno do servido"})

    }
}

module.exports = {
    login
};