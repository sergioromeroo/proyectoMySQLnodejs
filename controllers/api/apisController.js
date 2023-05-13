const database = require('../../database/models')
const getURL = req => `${req.protocol}://${req.get('host')}${req.originalUrl}`//es para mostrar mi url q estoy pisando

module.exports = {
    productListApis: async(req,res)=>{ //async=indica que la funcion sea asyncronica y await=espera que tenga un resultado 
        try {
            const productApi = await database.Product.findAll({
                include: [
                    { association: 'category' },
                    { association: 'images' }
                ]
            })
            let respuesta = {
                meta: {
                    //aca pongo los metodos de array que quiera
                    status:200,
                    cantidad: productApi.length,
                    miURl: getURL(req),//es para mostrar mi url q estoy pisando
                    sumo: productApi.push(['id', 'name']),
                    eliminoprimero: productApi.shift(),
                    eliminoultimo: productApi.pop(),
                },
                all: productApi
            }
            return res.status(200).json(respuesta)
            
        } catch (error) {
            return res.status(error.status || 500).json({
                status : error.status || 500, //si no viene error del estado mandale 500 asi me manda error de servidor 
                message : error.message
            })
        }
    },
    
    
    
    //*********** el then y el Catch funciona peroo no me da el error preciso para saber que hize mal en cambio try catch si  */
   /*  productListApis: (req, res) => {
        database.Product.findAll({
            include: [
                { association: 'category' },
                { association: 'images' }
            ]
        }).then(productApi => {
            let respuesta = {
                meta: {
                    //aca pongo los metodos de array que quiera
                    status:200,
                    cantidad: productApi.length,
                    miURl: getURL(req),//es para mostrar mi url q estoy pisando
                    sumo: productApi.push(['id', 'name']),
                    eliminoprimero: productApi.shift(),
                    eliminoultimo: productApi.pop(),

                },

                all: productApi
            }
            return res.status(200).json(respuesta)
        }).catch(error => res.status(500).json({
            meta :{
                status :500
            },
            all : error
        }))
    } */


    addApi : async (req,res) => {
        try {
            
                const { name, description, price, categoryId } = req.body;

                const productApi = await database.Product.create({ //creo el producto
                
                name: name.trim(),
                description: description.trim(),
                price,
                categoryId
            })
            let respuesta = {
                meta: {
                    //aca pongo los metodos de array que quiera
                    status:200,
                    cantidad: productApi.length,
                    miURl: getURL(req),//es para mostrar mi url q estoy pisando
                    sumo: productApi.push(['id', 'name']),
                    eliminoprimero: productApi.shift(),
                    eliminoultimo: productApi.pop(),
                },
                message : 'producto agregado con exito'
            }
            return res.status(200).json(respuesta)
        } catch (error) {
            return res.status(400).json({
                status : 400,
                messages : error.errors.map(error => error.message)
            })
        }
    },


    /* esta api es  http://localhost:3000/apis/admin-products   y la estoy consumiendo de adminjs para mostrarlo en vista de admin*/
    
    adminProduct: async(req,res)=>{ //async=indica que la funcion sea asyncronica y await=espera que tenga un resultado 
        let offset = +req.query.limit * (+req.query.actual - 1) // multiplico el limite con el numero actual q pongo en el paginador 
        try {
            const productApiAll = await database.Product.findAll()
            const productApi = await database.Product.findAll({
                limit : +req.query.limit || 15,
                offset : offset || 0, //que no me saltee ningun producto
                include: [
                    { association: 'category' },
                ]
            })
            let respuesta = {
                meta: {
                    //aca pongo los metodos de array que quiera
                    status:200,
                    cantidad: productApiAll.length,
                    miURl: getURL(req),//es para mostrar mi url q estoy pisando
                    sumo: productApi.push(['id', 'name']),
                    eliminoultimo: productApi.pop(),
                },
                all: productApi
            }
            return res.status(200).json(respuesta)
            
        } catch (error) {
            return res.status(error.status || 500).json({
                status : error.status || 500, //si no viene error del estado mandale 500 asi me manda error de servidor 
                message : error.message
            })
        }
    },
}