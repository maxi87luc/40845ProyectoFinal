import express from 'express';
import mongoose from "mongoose";
import CarritosDaoMongoDb from './daos/carritos/CarritosDaoMongoDb.js';
import ProductosDaoMongoDb from './daos/productos/ProductosDaoMongoDb.js';
import connectToDb from './config/mongoDbConfig.js';
import Producto from './model/productSchema.js'
import Carrito from './model/carritoSchema.js'

const { Router } = express;


connectToDb().then(()=>console.log("OK"))



const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json())
const productosRouter = Router();
const carritoRouter = Router();
const rootRouter = Router();


//Creo una instancia de un carrito
const carrito = new CarritosDaoMongoDb("carrito")

//Creo una instancia de contenedor de Productos
const productos = new ProductosDaoMongoDb("productos")

//Carrito Router------------------------------

//Agrega un producto al carrito por un id de producto enviado por el body
carritoRouter.post('/', (req, res) => {
    //agregar productos
    const id = req.body.id
    const productToAdd = productos.getById(id)
        .then((producto)=>carrito.save({producto: producto, name:"carrito"})) 
        .then(() => res.json("Agregado con exito"))

    
    
})

//Trae un producto determinado por un id enviado por url param.
carritoRouter.get('/producto/:id', (req, res) => {
    const id = req.params.id
    carrito.getById(id).then((data) => res.send(data))
    
   
})

//Trae todos los productos del carrito 
carritoRouter.get('/all', (req, res) => {
    carrito.getAll().then((data) => res.send(data))
   
    
})

//Borra un elemento segun su id
carritoRouter.delete('/producto/:id', (req, res) => {
    const id = req.params.id
    carrito.deleteById(id).then(()=>res.send("elemento borrado"))
})

carritoRouter.delete('/all', (req, res) => {
    carrito.deleteAll()
    res.send("coleccion vacia")
})

//Productos Router--------------------------------------------

//Agrega un producto al listado de productos
productosRouter.post('/', (req, res) => {
    //agregar productos
    const productToAdd = req.body;    
    console.log(productToAdd)
    productos.save(productToAdd)
        .then(() => res.json("Agregado con exito"))

    
    
})

//Trae un producto determinado por un id enviado por url param.
productosRouter.get('/producto/:id', (req, res) => {
    const id = req.params.id
    productos.getById(id).then((data) => res.send(data))
    
   
})

//Trae todos los productos 
productosRouter.get('/all', (req, res) => {
    productos.getAll().then((data) => res.send(data))
   
    
})

//Borra un elemento segun su id
productosRouter.delete('/producto/:id', (req, res) => {
    const id = req.params.id
    productos.deleteById(id).then(()=>res.send("elemento borrado"))
})

productosRouter.delete('/all', (req, res) => {
    productos.deleteAll()
    res.send("coleccion vacia")
})










app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)
app.use('/', rootRouter)






const PORT = 8080;

app.listen(PORT, ()=> console.log(`Listening in PORT ${PORT}`))
