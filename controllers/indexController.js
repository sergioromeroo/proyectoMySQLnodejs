const database = require('../database/models')

module.exports = {
    index : (req,res) => {
        var datos = database.Product.findAll() 
        let buzos = database.Category.findOne({
            where : {
                name : 'buzos'
            },
            include : [
                {
                    association : 'products',
                    include : [
                        {association : 'images'}
                    ]
                }
            ]
        });

        let camperas = database.Category.findOne({
            where : {
                name : 'camperas'
            },
            include : [
                {
                    limit : 8,
                    association : 'products',
                    include : [{association : 'images'}]
                     
                }
            ]
        });

        let pantalones = database.Category.findOne({
            where : {
                name : 'pantalones'
            },
            include : [
                {
                    association : 'products',
                    include : [
                        {association : 'images'}
                    ]
                }
            ]
        });

        let calzados = database.Category.findOne({
            where : {
                name : 'calzados'
            },
            include : [
                {
                    association : 'products',
                    include : [
                        {association : 'images'}
                    ]
                }
            ]
        });

        let remeras = database.Category.findOne({
            where : {
                name : 'remeras'
            },
            include : [
                {
                    association : 'products',
                    include : [
                        {association : 'images'}
                    ]
                }
            ]
        });

        let camisas = database.Category.findOne({
            where : {
                name : 'camisas'
            },
            include : [
                {
                    association : 'products',
                    include : [
                        {association : 'images'}
                    ]
                }
            ]
        });
        Promise.all([buzos,camperas,pantalones,calzados,remeras,camisas])
        .then(([buzos,camperas,pantalones,calzados,remeras,camisas]) => {

            return res.render('index',{
                datos,
                buzos : buzos.products,
                camperas : camperas.products,
                pantalones : pantalones.products,
                calzados : calzados.products,
                remeras : remeras.products,
                camisas : camisas.products
                //return res.send(buzos)
            })

        })

    },

}