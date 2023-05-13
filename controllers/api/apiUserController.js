const database = require('../../database/models')

/*  aca como se mostrarian con el res.send en la ruta api/emails mostraria mis usuarios con su atributo de solo mostrar email 
si quiero ver todo saco ese atributo
module.exports ={
    getEmail : (req,res) =>{
        database.User.findAll({
            attributes : ['email'] //traeme de los usuarios solo la columna email
        })
        .then(usuariosEmail =>{
            return res.send(usuariosEmail)
        })
    }
} */

//mapeo los usuarios quiero un array de todos los emails para usarlo en mi validacion de usuarios en register
// validator van a consultar esta api que arme
module.exports ={
    getEmail : (req,res) =>{
        database.User.findAll({
            attributes : ['email'] //traeme de los usuarios solo la columna email
        })
        .then(usuariosEmail =>{
            let emailAll = usuariosEmail.map(e => e.email)

            return res.status(200).json({
                emailAll
            })
        }).catch(error => console.log(error))
    }
}