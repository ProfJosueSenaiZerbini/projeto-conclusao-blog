const database = require("../DATABASE/connection");

async function listarPublicos(req,res) {
    try{
        const [posts] = await database.query(
            `
            SELECT
            id,titulo,resumo,imagem,criando_em FROM posts WHERE publicado = 1 ORDER BY criando_em DESC
            `
        );

        return res.json(posts);
    } catch (e) {
        console.error(e);

        return res.status(500).json({
            mensagem: "Erro ao carregar posts."
        })
    }
    
}

async function buscarPublicos(req,res) {
    try{
        const {id} = req.params;

        const [posts] = await database.query(`
            SELECT
            p.id, p.titulo,p.conteudo,p.imagem,p.criando_em, u.nome a autor FROM posts p INNER JOIN usuario u ON u.id = p.usuario_id
             WHERE p.id = ? AND p.id = ? AND p.publicado = 1`,[id]);
             if(posts.length === 0) {
                return res.status(404).json({
                    mensegem: " Posts nao encontrado"
                })
             }

             return res.json(posts[0]);
    } catch (e) {
        console.error(e);

        return res.status(500).json({
            mensagem: "erro ao buscar"
        });
    }
    
}
async function criar(req,res) {
    try{
        const {
            titulo, resumo, conteudo, imagem, publicado
        } = req.body;

        if(!titulo || !conteudo){
            return res.status(400).json({mensagem:"titulo e conteudo sao obrigatorios"})
        }

        const [resultado] = await database.query(`
            INSERT INTO posts(
            titulo, resumo, conteudo, imagem, publicado, usuario_id)
            VALUES(?, ?, ?, ?, ?, ?)`,
        [titulo, resumo || null, conteudo, imagem || null, publicado ? 1: 0, req.usuario.id]
        )

        return res.status(201).json({
        mensagem: "Post criado com sucesso",
        id: resultado.insertId
        });

    } catch(e) {
        console.error(e);

        return res.status(500).json({
            mensagem:"Erro ao criar post"
        });
    }
}

module.exports = {
    listarPublicos,
    buscarPublicos,
    criar
}