const database = require("../DATABASE/connection");

async function listarPublicos(req, res) {
    try {
        const [posts] = await database.query(
            `
            SELECT
            id, titulo, resumo, imagem, criando_em, publicado 
            FROM posts 
            WHERE publicado = 1 OR publicado = 0 
            ORDER BY criando_em DESC
            `
        );

        return res.json(posts);
    } catch (e) {
        console.error(e);

        return res.status(500).json({
            mensagem: "Erro ao carregar posts."
        });
    }
}

async function buscarPublicos(req, res) {
    try {
        const { id } = req.params;

        const [posts] = await database.query(`
            SELECT
            p.id, p.titulo, p.conteudo, p.imagem, p.criando_em, p.publicado, u.nome AS autor 
            FROM posts p 
            LEFT JOIN usuario u ON u.id = p.usuario_id
            WHERE p.id = ?`, [id]);

        if (posts.length === 0) {
            return res.status(404).json({
                mensagem: "Post não encontrado"
            });
        }

        return res.json(posts[0]);
    } catch (e) {
        console.error(e);

        return res.status(500).json({
            mensagem: "Erro ao buscar post"
        });
    }
}

async function criar(req, res) {
    try {
        const {
            titulo, resumo, conteudo, imagem, publicado, usuarioId
        } = req.body;

        if (!titulo || !conteudo) {
            return res.status(400).json({ mensagem: "Título e conteúdo são obrigatórios." });
        }

        // Obtém o ID do autor do token autenticado ou do corpo da requisição
        const autorId = req.usuario?.id || usuarioId;

        if (!autorId) {
            return res.status(400).json({ mensagem: "ID do autor não informado." });
        }

        // Se 'publicado' não for informado explicitamente, assume 1 (publicado) por padrão
        const statusPublicado = publicado !== undefined ? (publicado ? 1 : 0) : 1;

        // Se o resumo não for enviado, gera um resumo automático baseado no conteúdo
        const resumoFinal = resumo || (conteudo ? (conteudo.length > 150 ? conteudo.substring(0, 150) + '...' : conteudo) : null);

        // Imagem é totalmente opcional: se for vazia ou não informada, salva como null
        const imagemFinal = imagem && typeof imagem === 'string' && imagem.trim() ? imagem.trim() : null;

        const [resultado] = await database.query(`
            INSERT INTO posts(
            titulo, resumo, conteudo, imagem, publicado, usuario_id)
            VALUES(?, ?, ?, ?, ?, ?)`,
            [titulo, resumoFinal, conteudo, imagemFinal, statusPublicado, autorId]
        );

        return res.status(201).json({
            mensagem: "Post criado com sucesso",
            id: resultado.insertId
        });

    } catch (e) {
        console.error(e);

        return res.status(500).json({
            mensagem: "Erro ao criar post"
        });
    }
}

module.exports = {
    listarPublicos,
    buscarPublicos,
    criar
};