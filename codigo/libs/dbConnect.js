const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error('MONGODB_URI esta faltando');
mongoose.connect(MONGODB_URI, {
    dbName: process.env.DBNAME,
    bufferCommands: false,
});
console.log('Conectado ao MongoDB');