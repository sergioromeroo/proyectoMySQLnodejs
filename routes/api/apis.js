var express = require('express');
var router = express.Router();



const {productListApis, addApi, adminProduct} = require('../../controllers/api/apisController')

/* Apis la ruta para entrar es http://localhost:3000/apis/products/*/
router.get('/products', productListApis ),
router.get('/admin-products',adminProduct)//http://localhost:3000/apis/admin-products
router.post('/',addApi)

module.exports = router;