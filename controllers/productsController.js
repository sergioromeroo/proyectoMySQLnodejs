const fs = require('fs') //necesito el fs para guardar lo de save en mi json
const path = require('path')

const { productosdb, guardar } = require('../data/productsdb')

const categorias = require('../data/categoriasdb')
const { validationResult } = require('express-validator')

const database = require('../database/models')
const { sequelize } = require('../database/models')
const {Op} = require('sequelize')



module.exports = {

    products: (req, res) => {
        var datos = database.Product.findAll({
            include: [
                {
                    
                    association: 'images'
                }
                
            ]
            
        })

        Promise.all([datos])
            .then(([datos]) => {

                return res.render('productos', {
                    datos,
                })
            })

    },



    admin : (req,res) => res.render('admin/indexAdmin'),



    add : (req, res) => {
        database.Category.findAll()
        .then(categorias =>{
            return res.render('admin/agregarProduct',{
                categorias
            })

        }).catch(error => console.log(error))

    },
    save: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const { name, description, price, categoryId } = req.body;

            database.Product.create({ //creo el producto
                
                name: name.trim(),
                description: description.trim(),
                price,
                categoryId

            }).then(product => {

                //if si viene imagenes capturo esas imagenes la guardo en array cuando le hago map y lo recorro y le creo objeto file y productId
                if (req.files) {//si hay imagenes que haga lo siguiente 
                    var ima = [];
                    var imagenes = req.files.map(imagen => imagen.filename);
                    imagenes.forEach(img => {
                        var image = {
                            file: img,
                            productId: product.id
                        }
                        ima.push(image)
                        database.Image.create({...image})
                        .then((image) => console.log(image))
                    });

                   /*  database.Image.bulkCreate(images, { validate: true })
                        .then(() => console.log('imagenes agregadas con exito')) */
                }

                return res.redirect('/products/admin')
            }).catch(error => console.log(error))

        } else {
            database.Category.findAll()
                .then(categorias => {
                    return res.render('admin/agregarProduct', {
                        categorias,
                        errores: errors.mapped(),
                        old: req.body
                    })
                }).catch(error => console.log(error))
        }
    },



    detail: (req, res) => {

        database.Product.findOne({
            where: {
                id: req.params.id
            },
            include: [
                { association: 'images' },
                { association: 'category' }
            ]
        }).then(producto => {
            database.Category.findOne({
                where : {
                    id : producto.categoryId
                },

                include: [
                    {
                        association: 'products',
                        include: [{ association: 'images' }],
                        limit : 4

                    }
                ]
            }).then(category => {
                    //return res.send(category)
                    return res.render('productDetail', {
                        producto,
                        relacionados: category.products
                    })
                })
        }).catch(error => console.log(error))



        //cuando va la ruta un dato es un PARAMS
        //let producto = productosdb.find(producto => producto.id === req.params.id) //asi si el id q esta en mi data es un string 
        // +req.params.id asi si el id de mi data es un number 01 02 03 sin comillas
    },





    edit: (req, res) => {
        let categorias = database.Category.findAll();
        let producto = database.Product.findByPk(req.params.id);
        Promise.all([categorias, producto])
            .then(([categorias, producto]) => {
                return res.render('admin/editProductAdmin', {
                    categorias,
                    producto
                })
            })

    },
    update: (req, res) => {
        const { name,description,price,categoryId } = req.body;


        database.Product.update(
            {
                name : name.trim(),
                description: description.trim(),
                price,
                categoryId
            },
            {
                where : {//que producto quiero cambiar el id que corresponda al que venga por parametro
                    id : req.params.id
                }
            }
        ).then(()=>res.redirect('/products/admin')) //then luego que ocurra lo de arriba puedo mandar un msj swift alert puedo poner si quiero
            .catch(error => console.log(error))
    
        },




        search: (req, res) => {
            //res.send(req.query)

            let resultados = database.Product.findAll({
                where : {
                    [Op.or]:[
                        {
                            name : {
                                [Op.substring] : req.query.keywords
                            }
                        }
                    ]
                },
                include : [
                    {association : 'images'},
                    {association : 'category'}
                ]
            })
            let categoriasResultado = database.Category.findAll();
            Promise.all([resultados,categoriasResultado])
            .then(([resultados,categoriasResultado]) => res.render('search',{
                resultados,
                categoriasResultado,
                busqueda : req.query.keywords
            })).catch(error => console.log(error))
        },



    destroy: (req, res) => {

        database.Product.destroy({
            where : {
                id : req.params.id
            }
        }).then(()=>res.redirect('/products/admin'))
        .catch(error => console.log(error))
    },


}