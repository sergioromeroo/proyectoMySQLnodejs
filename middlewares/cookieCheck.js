module.exports = (req,res,next)=>{
    if(req.cookies.ropanodejs){
        req.session.userLogin = req.cookies.ropanodejs
    }
    next()

}