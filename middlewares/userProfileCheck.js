/* para saber si el usuario levanto session si se encuentra */

module.exports = (req,res,next) => req.session.userLogin ? next() : res.redirect('/')
