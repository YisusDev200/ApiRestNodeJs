//CRUD PARA PRODUCTOS :)
const express = require("express");
const productSchema = require("../models/productoYss");
const routes = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: El nombre del producto
 *              price:
 *                  type: string
 *                  description: El precio del producto
 *              img:
 *                  type: string
 *                  description: La cantidad de productos
 *          required:
 *              -name
 *              -price
 *              -img
 *          example:
 *              name: Chetos
 *              price: 13.5
 *              img: https://img.icons8.com/color/256/kawaii-french-fries.png
 */

/**
 * @swagger
 * /api-yisus/product:
 *  post:
 *      summary: Almacena un nuevo producto en la base de datos
 *      tags: [Product]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          201:
 *              description: Nuevo Producto Almacenado
 *          
 * 
 */
//POST
routes.post('/product', (req,res)=>{
    const product = productSchema(req.body);
    product
    .save()
    .then((data)=> res.status(201).send(data))
    .catch((error)=> {
        res.status(500).send('Error interno del servidor');
    });
})
/**
 * @swagger
 * /api-yisus/product:
 *  get:
 *      summary: Obtiene todos los productos almacenados en la base de datos
 *      tags: [Product]
 *      responses:
 *          201:
 *              description: Todos los productos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 */

//GET

routes.get('/product', (req,res)=>{
    productSchema
    .find()
    .then((data)=> {
        res.status(201).send(data);
    })
    .catch((error)=> {
        res.status(500).send('Error interno del servidor');
    });
})


/**
 * @swagger
 * /api-yisus/product/{id}:
 *  get:
 *      summary: Obtiene un producto de la base de datos tomando como referencia la id 
 *      tags: [Product]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *                 type: string
 *            required: true
 *            description: La id del producto
 *      responses:
 *          201:
 *             description: ProductoUno encontrado
 *             content:
 *              application/json:
 *                 schema:
 *                    type: object
 *                    $ref: '#/components/schemas/Product'
 *          500: 
 *              description: El producto no fue encontrado
 */

//GET
routes.get('/product/:id', (req,res)=>{
    const { id } = req.params;

    productSchema
    .findById(id)
    .then((data)=> {
        res.status(201).send(data);
    })
    .catch((error)=> {
        res.status(500).send('Error interno del servidor');
    });
})

/**
 * @swagger
 * /api-yisus/product/{id}:
 *  put:
 *      summary: Actualiza un producto de la base de datos tomando como referencia la id
 *      tags: [Product]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *                 type: string
 *            required: true
 *            description: La id del producto
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          200:
 *             description: Producto actualizado 
 *          500: 
 *              description: El producto no fue encontrado
 */
//UPDATE
routes.put('/product/:id', (req,res)=>{
    const { id } = req.params;
    const { name, price, quantity } = req.body;

    productSchema
    .updateOne({ _id: id}, {$set: { name, price, quantity}})
    .then((data)=> {
        res.status(201).send(data);
    })
    .catch((error)=> {
        res.status(500).send('Error interno del servidor');
    });
})

/**
 * @swagger
 * /api-yisus/product/{id}:
 *  delete:
 *      summary: Elimina un producto de la base de datos tomando como referencia la id 
 *      tags: [Product]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *                 type: string
 *            required: true
 *            description: La id del producto
 *      responses:
 *          201:
 *             description: Producto eliminado
 *          500: 
 *              description: El producto no fue encontrado
 */
//DELETE
routes.delete('/product/:id', (req,res)=>{
    const { id } = req.params;
    productSchema
    .deleteOne({ _id: id})
    .then((data)=> {
        res.status(201).send(data);
    })
    .catch((error)=> {
        res.status(500).send('Error interno del servidor');
    });
})


module.exports = routes;