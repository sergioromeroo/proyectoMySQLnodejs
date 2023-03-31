//si existe una sesion levantada de login quiero q res locals userlogin sea igual a req y que siempre avanze
module.exports = (req,res,next) => {
    if(req.session.userLogin){
        res.locals.userLogin = req.session.userLogin
    }
    next()
}