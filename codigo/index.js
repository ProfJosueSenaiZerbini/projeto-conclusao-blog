const express = require("express");
const morgan = require("morgan");
const app = express();

require('dotenv').config();

const usuarioRoutes = require("./routes/usuario.routes");
const authRoutes = require("./routes/auth.routes");

app.use(morgan('dev'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Alterado o prefixo de authRoutes para "/" para mapear rotas como /login diretamente
app.use("/", authRoutes);
app.use("/usuario", usuarioRoutes);

app.get("/", (req, res) => {
    res.render("index", { mensagem: "Bem-vindo ao Blog!" });
});

app.use((req, res) => {
    res.status(404).render("erro404");
});

const porta = Number(process.env.PORTA) || 3000;

app.listen(porta, () => {
    console.log('Servidor rodando em http://localhost:' + porta);
});