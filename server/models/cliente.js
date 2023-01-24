const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clienteSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true }
})

module.exports = cliente = mongoose.model('cliente', clienteSchema)