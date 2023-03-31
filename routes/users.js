var express = require('express');
var router = express.Router();

const registerValidator = require('../validations/registerValidator')
const loginValidator = require('../validations/loginValidator')

const {register,login,processRegister,processLogin, logout, admin, cart} = require('../controllers/usersController')

/* en los ancors tengo q poner /users/login  o  /register ese users esta en app.js*/
router.get('/register',register)
router.post('/register',registerValidator,processRegister)
router.get('/login',login)
router.post('/login',loginValidator,processLogin)
router.get('/logout',logout);
router.get('/adminDashboard', admin)
router.get('/cart',cart)


module.exports = router;
