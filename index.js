const http = require("http");
const express = require("express");
const router = express.Router();
const morgan = require("morgan");
const app = express();

//importação de rotas
const usuarioRoutes = require("./routes/usuario.routes"); //linha adicionada



//variáveis de ambiente
require('dotenv').config();

//Conexao com o banco
require('./libs/dbConnect');

// configurações iniciais
app.use(morgan('dev'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));
const porta = Number(process.env.PORTA) //adicionar



app.listen(porta, () => {
    console.log('Servidor rodando');
    console.log('Endereco: http://localhost:'+porta);
    // console.log(process.env.variavel); //excluir esta linha
});

