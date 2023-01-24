var express = require('express');
var router = express.Router();
const ClienteController = require('../controllers/clienteController')

router.get('/all', ClienteController.findAllClientes)

router.post("/add", ClienteController.addCliente)

module.exports = router