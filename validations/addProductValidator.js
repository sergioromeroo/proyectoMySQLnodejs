const {check} = require('express-validator')

module.exports = [
    check('name')
    .notEmpty().withMessage('el titulo es obligatorio'),

    check('price')
    .notEmpty().withMessage('el precio es obligatorio'),

    check('categoryId')
    .notEmpty().withMessage('la categoria es obligatorio')
]