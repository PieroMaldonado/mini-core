const mongoose = require('mongoose')
const Contrato = require('../models/contrato')

const findAllContratos = (req, res) =>{
    Contrato.find((err, contratos) =>{
        err && res.status(500).send(err.message)
        res.status(200).json(contratos)
    })
}

const addContrato = (req, res) => {
    let contrato = new Contrato({
        id: req.body.id,
        id_cliente: req.body.id_cliente,
        name: req.body.name,
        amount: req.body.amount,
        date: req.body.date
    })

    contrato.save((err, cntt) =>{
        err && res.status(500).send(err.message)
        res.status(200).json(cntt)
    })
}

module.exports = { findAllContratos, addContrato }