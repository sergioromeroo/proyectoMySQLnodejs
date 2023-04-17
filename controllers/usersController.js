const {usuariosdb,guardar} = require('../data/usersdb')
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const database = require('../database/models')

module.exports = {
    register : (req,res) => {
        return res.render('users/register')
    },
    processRegister: (req,res) =>{

        let errors = validationResult(req);
        let {name,email,password} = req.body;
      if(errors.isEmpty()){

            database.User.create({
                name : name.trim(),
                email : email.trim(),
                password : bcrypt.hashSync(password,10),
                avatar : 'default.png',
                rolId : 1
            }).then(user => {
                req.session.userLogin = {
                    id : user.id,
                    name : user.name,
                    rol : user.rol
                }
                return res.redirect('/')
            }).catch(error => console.log(error))
        }else{
            return res.render('users/register',{
                old : req.body,
                errores : errors.mapped()
            })
        }

    },

    login : (req,res) => {
        return res.render('login')
    },
    processLogin : (req,res) => {


    },
    logout : (req,res) => {
        req.session.destroy();
        res.cookie('aireacondicionado',null,{maxAge:-1})
        return res.redirect('/')
    },
    admin : (req,res) => {
        return res.render('adminView')
    },
    cart: (req,res) => {
        return res.render('cart')
    }
}