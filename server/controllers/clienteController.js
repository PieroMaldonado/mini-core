const mongoose = require('mongoose')
const Cliente = require('../models/cliente')

const findAllClientes = (req, res) =>{
    Cliente.find((err, clientes) =>{
        err && res.status(500).send(err.message)
        res.status(200).json(clientes)
    })
}

const addCliente = (req, res) => {
    let cliente = new Cliente({
        id: req.body.id,
        name: req.body.name
    })

    cliente.save((err, clnt) =>{
        err && res.status(500).send(err.message)
        res.status(200).json(clnt)
    })
}

module.exports = { findAllClientes, addCliente }