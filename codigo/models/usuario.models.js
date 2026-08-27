const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'O e-mail é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true
  },
  senha: {
    type: String,
    required: [true, 'A senha é obrigatória'],
    minlength: [6, 'A senha deve ter no mínimo 6 caracteres']
  },
  perfil: {
    type: String,
    enum: ['usuario', 'admin'],
    default: 'usuario'
  }
}, { timestamps: true });

// Criptografar senha se for alterada
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

module.exports = mongoose.model('Usuario', usuarioSchema);