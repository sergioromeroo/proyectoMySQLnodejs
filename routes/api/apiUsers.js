var express = require('express');
var router = express.Router();



const {getEmail} = require('../../controllers/api/apiUserController')

/* Apis la ruta para entrar es http://localhost:3000/apis/emails*/
router.get('/emails', getEmail ),


module.exports = router;