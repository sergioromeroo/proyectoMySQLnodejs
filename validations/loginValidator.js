const {body} = require('express-validator');
const {usuariosdb} = require('../data/usersdb');
const bcrypt = require('bcryptjs');


module.exports = [
    body('email')
    .custom((value,{req}) => {
        let usuario = usuariosdb.find(usuario => usuario.email === value && bcrypt.compareSync(req.body.contrasenia,usuario.contrasenia));
        if (usuario){
            return true
        }else{
            return false
        }
    }).withMessage('credenciales inválidas')
]