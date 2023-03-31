const database = require('../database/models')

module.exports = {
    index : (req,res) => {
        var datos = database.User.findAll() 
        Promise.all([datos])
        .then(([datos]) => {
            return res.send(datos)
        })
        //res.send(productosdb) con esto lo veo en chrome
/*         return res.render('index',{
            productos : productosdb, //le cambio nombre a mi array
            abrigos : productosdb.filter(producto => producto.categoria === "abrigos"),
            camisetas : productosdb.filter(producto => producto.categoria === "camisetas"),
            pantalones : productosdb.filter(producto => producto.categoria === "pantalon"),
        }) */
    },
    products : (req,res) => {
        return res.render('productos')
    }

}