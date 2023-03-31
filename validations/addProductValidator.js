const {check} = require('express-validator')

module.exports = [
    check('titulo')
    .notEmpty().withMessage('el titulo es obligatorio'),

    check('precio')
    .notEmpty().withMessage('el precio es obligatorio'),

    check('categoria')
    .notEmpty().withMessage('la categoria es obligatorio')
]