const fs = require('fs') //necesito el fs para guardar lo de save en mi json
const path = require('path')

const { productosdb, guardar } = require('../data/productsdb')

const categorias = require('../data/categoriasdb')
const { validationResult } = require('express-validator')

const database = require('../database/models')


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


    add: (req, res) => {
        //res.send(categorias)
        return res.render('addProducts', {
            categorias
        })
    },

    //ruta post el save para el formulario de addproduct
    save: (req, res) => {
        //res.send(req.body) la info de POST que recibo del formulario va por BODY
        let errors = validationResult(req);
        //return res.send(errors)
        if (errors.isEmpty()) {
            const { titulo, categoria, precio } = req.body

            //mi objeto literal q capturo los datos del formulario
            let producto = {
                id: productosdb[productosdb.length - 1].id + 1,
                titulo,
                imagen: req.file ? req.file.filename : ['default-image.png'],
                categoria,
                precio
            }
            productosdb.push(producto)
            //return res.send(productosdb) //para verlo como json en el navegador lo nuevo q mando

            guardar(productosdb)
            return res.redirect('/')
        } else {
            return res.render('addProducts', {
                categorias,
                productosdb,
                errores: errors.mapped(),//quiero mapear el errors para poder usarlo como span y dejar el msg de error
                old: req.body//old para que me recuerde lo que escribio el usuario y no este volviendo a poner su titulo o precio o cate en el formulario
            })
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
    search: (req, res) => {
        //res.send(req.query)
        let result = productosdb.filter(producto => producto.titulo.toLowerCase().includes(req.query.search.toLowerCase().trim()))//la info que recibo por GET es QUERY
        return res.render('searchResult', {
            result,
            productosdb,
            busqueda: req.query.search
        })
    },

    edit: (req, res) => {
        let producto = productosdb.find(producto => producto.id === req.params.id)
        return res.render('editProduct', {
            producto,
            productosdb,
            categorias
        })
    },
    update: (req, res) => {
        const { titulo, categoria, precio } = req.body;

        let producto = productosdb.find(producto => producto.id === req.params.id)
        let productoEditado = {
            id: req.params.id,
            titulo,
            categoria,
            precio,
            imagen: req.file ? req.file.filename : producto.imagen
        }
        productoModificados = productosdb.map(producto => producto.id === req.params.id ? productoEditado : producto)

        guardar(productoModificados)
        return res.redirect('/')


    },
    destroy: (req, res) => {
        productosdb.forEach(producto => {
            if (producto.id === req.params.id) {
                let productoEliminar = productosdb.indexOf(producto)
                productosdb.splice(productoEliminar, 1)
            }
        });
/*         productoEliminar = productosdb.filter(producto=>producto.id !== req.params.id)
 */        guardar(productosdb)
        return res.redirect('/')
    },


}