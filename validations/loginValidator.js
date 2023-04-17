const {body} = require('express-validator');
const database = require('../database/models')
const bcrypt = require('bcryptjs');


module.exports = [
    body('email')
    .custom((value,{req}) => {
        return database.User.findOne({
            where : {
                email : value
            }
        }).then(usuario => {
            
        })

    }).withMessage('credenciales inválidas')
]