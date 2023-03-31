const {usuariosdb,guardar} = require('../data/usersdb')
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

module.exports = {
    register : (req,res) => {
        return res.render('register')
    },
    processRegister: (req,res) =>{
        let errors = validationResult(req)
        let {nombre,email,contrasenia} = req.body;
        if(errors.isEmpty()){
            let usuario = {
                id : usuariosdb.length > 0 ? usuariosdb[usuariosdb.length - 1].id + 1 : 1,
                nombre,
                email,
                contrasenia: bcrypt.hashSync(contrasenia,10),
                rol : "user"
            }
            usuariosdb.push(usuario)
            guardar(usuariosdb)

            req.session.userLogin = {
                id : usuario.id,
                nombre : usuario.nombre,
                rol : usuario.rol
            }

            return res.redirect('/')
        }else{
            return res.render('register',{
                
                errores : errors.mapped(),
                old : req.body
            })
        }

    },

    login : (req,res) => {
        return res.render('login')
    },
    processLogin : (req,res) => {
        let errors = validationResult(req);
        const {email} = req.body;
        if(errors.isEmpty()){
            let usuario = usuariosdb.find(usuario => usuario.email === email)
            req.session.userLogin = {
                id : usuario.id,
                nombre : usuario.nombre,
                rol : usuario.rol
            }
/*             if(recordar){
                res.cookie('airesAcondicionado',req.session.userLogin,{maxAge: 1000 * 60})
            } */
            return res.redirect('/')
        }else{
            return res.render('login',{
                
                errores : errors.mapped()
            })
        }
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