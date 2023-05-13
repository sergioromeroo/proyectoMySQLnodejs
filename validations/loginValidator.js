const {body} = require('express-validator');
const bcrypt = require('bcryptjs');
const database = require('../database/models');


module.exports = [
    body('email')
    .custom((value,{req}) => {
        console.log(req.body)
        return database.User.findOne({
            where :{
                email : value
            }
        }).then(user => {
            if(!user || !bcrypt.compareSync(req.body.password,user.password)){//compara si el password coincide con el password q tengo en mi base datos
                return Promise.reject()
            }
        }).catch( () => Promise.reject('Credenciales inválidas'))
    })
]