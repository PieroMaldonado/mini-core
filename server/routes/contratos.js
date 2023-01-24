var express = require('express');
var router = express.Router();
const ContratoController = require('../controllers/contratoController')

router.get('/all', ContratoController.findAllContratos)

router.post("/add", ContratoController.addContrato)

module.exports = router