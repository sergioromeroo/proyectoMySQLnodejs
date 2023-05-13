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
                avatar : 'defaultPerfil.png',
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
        return res.render('users/login')
        
    },
    processLogin : (req,res) => {
        let errors = validationResult(req); 
        //return res.send(errors)
        const {email,recordar} = req.body
        if(errors.isEmpty()){
            database.User.findOne({
                where: {
                    email
                }

            }).then(user => {
                req.session.userLogin = {
                    id :user.id,
                    name: user.name,
                    rol : user.rolId,
                    avatar: user.avatar
                }
                    /* giardar cookie */

            if(recordar){
                res.cookie('ropanodejs',req.session.userLogin,{maxAge: 5000 * 60 })
            }
            return res.redirect('/')
            })


        }else{
            return res.render('users/login',{
                errores : errors.mapped()
            })
        }

    },

    logout : (req,res) => {
        req.session.destroy();
        res.cookie('ropanodejs',null,{maxAge:-1})
        return res.redirect('/')
    },

    profile : (req,res) => {
        database.User.findByPk(req.session.userLogin.id)
        .then(user => res.render('users/profile', {
            user
        })).catch(error => console.log(error))
    },

    updateProfile: (req, res) => {
        const { name, password } = req.body;
        database.User.update(
            {
                name: name.trim(),
                avatar: req.file && req.file.filename,
            },
            {
                where: {
                    id: req.params.id
                }
            }).then(() => {
                if (password) {
                    database.User.update(
                        { password: bcrypt.hashSync(password.trim(), 10) },
                        { where: { id: req.params.id } }
                    )
                        .then(() => {
                            req.session.destroy();
                            res.cookie('craftsyForEver', null, { maxAge: -1 })
                            return res.redirect('/users/login')
                        })
                }
                return res.redirect('/')
            })
    },

}