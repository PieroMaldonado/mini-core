const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contratoSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    id_cliente: { type: Number, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true }
});

module.exports = contrato = mongoose.model('contrato', contratoSchema)