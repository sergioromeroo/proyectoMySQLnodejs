const {check, body} = require('express-validator');
const database = require('../database/models')

module.exports = [
    check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({
        min : 2,
        max : 50
    }).withMessage('El nombre tiene que tener como mínimo 2 caracteres').bail()
    .isAlpha().withMessage('El nombre debe contener solo letras'),

    check('email')
    .isEmail().withMessage('Debes ingresar un email válido'),

    body('email')
    .custom(value => {//consulto a la base datos si esta registrado
        database.User.findOne({
            where : {
                email : value
            }
        }).then(user =>{
            if(user){
                return Promise.reject()
            }
        }).catch(() => Promise.reject('el email ya esta registrado'))
    }),

    check('contrasenia')
    .isLength({
        min : 6,
        max : 12
    }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

    body('contrasenia2')
    .custom((value,{req}) => {
        if(value !== req.body.contrasenia){
            return false
        }
        return true
    }).withMessage('Las contraseñas no coinciden'),

/*     check('acepta')
    .isString('on').withMessage('Debes aceptar los términos y condiciones') */
]