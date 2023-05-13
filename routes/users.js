var express = require('express');
var router = express.Router();

//validaciones para register y login
const registerValidator = require('../validations/registerValidator')
const loginValidator = require('../validations/loginValidator')

//para saber si estoy logeado y mostrarlo
const userProfileCheck = require('../middlewares/userProfileCheck')

//traer el multer para subir img del avatar
const subirImagenAvatar = require('../middlewares/subirImagenAvatar')


const {register,login,processRegister,processLogin, logout, profile, updateProfile} = require('../controllers/usersController')

/* en los ancors tengo q poner /users/login  o  /register ese users esta en app.js*/
router.get('/register',register)
router.post('/register',registerValidator,processRegister)

router.get('/login',login)
router.post('/login',loginValidator,processLogin)

router.get('/logout',logout);

router.get('/profile',userProfileCheck,profile)
router.put('/update/:id',subirImagenAvatar.single('avatar'),updateProfile)


module.exports = router;
