const express = require("express");
const morgan = require("morgan");
const app = express();

// Variáveis de ambiente
require('dotenv').config();

// Importação de rotas
const usuarioRoutes = require("./routes/usuario.routes");

// Configurações e Middlewares
app.use(morgan('dev'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uso das rotas
app.use("/usuario", usuarioRoutes);

// Rota raiz opcional (para testar a página inicial)
app.get("/", (req, res) => {
    res.render("index", { mensagem: "Bem-vindo ao Blog!" });
});

// Middleware para tratamento de erro 404 (Rota não encontrada)
app.use((req, res) => {
    res.status(404).render("erro404");
});

const porta = Number(process.env.PORTA) || 3000;

app.listen(porta, () => {
    console.log('Servidor rodando');
    console.log('Endereço: http://localhost:' + porta);
});