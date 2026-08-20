const http = require("http");
const express = require("express");
const morgan = require("morgan");
const app = express();

// Importação de rotas
const usuarioRoutes = require("./routes/usuario.routes");

// Variáveis de ambiente
require('dotenv').config();

// Conexão com o banco
require('./libs/dbConnect');

// Configurações iniciais
app.use(morgan('dev'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));

// Middlewares para leitura de JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uso das rotas
app.use("/usuario", usuarioRoutes);

const porta = Number(process.env.PORTA) || 3000;

app.listen(porta, () => {
    console.log('Servidor rodando');
    console.log('Endereco: http://localhost:' + porta);
});