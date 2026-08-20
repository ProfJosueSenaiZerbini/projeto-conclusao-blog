const mongoose = require('mongoose');

// 1. Definição do Schema (Estrutura da coleção)
const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'O e-mail é obrigatório'],
    unique: true, // Garante que não existirão dois usuários com o mesmo e-mail
    lowercase: true,
    trim: true
  },
  senha: {
    type: String,
    required: [true, 'A senha é obrigatória'],
    minlength: [6, 'A senha deve ter no mínimo 6 caracteres']
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

// 2. Criação do Modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;