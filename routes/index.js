var express = require('express');
var router = express.Router();

//traigo el structuring de la ruta de controller y por ahora traigo el metodo index q es la unica 
//vista que hay por ahora

const {index, products} = require('../controllers/indexController')

/* GET home page. */
router.get('/', index),
router.get('/productos', products),

module.exports = router;
