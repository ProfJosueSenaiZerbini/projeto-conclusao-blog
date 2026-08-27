const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  senha: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Método para verificar se a senha informada corresponde ao hash no banco
usuarioSchema.methods.compararSenha = async function(senhaDigitada) {
  return await bcrypt.compare(senhaDigitada, this.senha);
};

module.exports = mongoose.model('Usuario', usuarioSchema);