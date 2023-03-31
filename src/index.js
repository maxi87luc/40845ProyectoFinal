import express from 'express';
import mongoose from "mongoose";
import CarritosDaoMongoDb from './daos/carritos/CarritosDaoMongoDb.js';
import ProductosDaoMongoDb from './daos/productos/ProductosDaoMongoDb.js';
import Producto from './model/productSchema.js'
import Carrito from './model/carritoSchema.js'


//Creo una instancia de contenedor de Productos
export const productos = new ProductosDaoMongoDb({name: "productos", model: Producto})

//Creo una instancia de un carrito
export const carrito = new CarritosDaoMongoDb({name: "carrito", model: Carrito})



import connectToDb from './config/mongoDbConfig.js';

import User from './model/userSchema.js'
import path from 'path'
import passport from 'passport'
import './config/passport.js'
import {signin, signinPassport} from './routes/signin.js'
import {loginPassport, login} from './routes/login.js'
import expressSession from 'express-session'
import MongoStore from 'connect-mongo'
import {mongoURL, mongoSecret} from './config/enviroment.js'
import {users} from './routes/signin.js'
import {index} from './routes/index.js'

const { Router } = express;


connectToDb().then(()=>console.log("OK"))



const app = express();
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.json())

app.use(expressSession({
    store: MongoStore.create({ mongoUrl: mongoURL }),
    secret: mongoSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}));

const productosRouter = Router();
const carritoRouter = Router();
const rootRouter = Router();






//Root Router --------------------------------

rootRouter.get('/', index)

rootRouter.get('/login', (req, res)=>{

    const filePath = path.resolve('./public/login.html');
    res.sendFile(filePath);
})

rootRouter.post('/login', loginPassport, login)

rootRouter.get('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('../login')
})

rootRouter.get('/signin', (req, res)=>{

    const filePath = path.resolve('./public/signin.html');
    res.sendFile(filePath);
})


rootRouter.post('/signin', signinPassport, signin)

rootRouter.get('/addproduct', (req, res)=>{
    const filePath = path.resolve('./public/api/addProduct/index.html');
    res.sendFile(filePath);
})






//Carrito Router------------------------------

carritoRouter.get('/',(req, res)=>{
    const filePath = path.resolve('./public/api/carritos/index.html');
    res.sendFile(filePath);
})




//Agrega un carrito y retorna el id
carritoRouter.post('/', (req, res) => {
    //agregar productos
    const user = req.session.
    carrito.save({name: "carrito", productos: []})
        .then((value)=>{res.send("carrito "+ value.id +" creado con exito")})  

    res.redirect('../../')
    
})

//agrega un producto al carrito por su id

carritoRouter.post('/:id_Cart/productos/:id_Prod', (req, res) => {
    //agregar productos
    const idCart = req.params.id_Cart
    const idProd = req.params.id_Prod
    carrito.add(idCart, idProd, Producto)
    res.redirect('../../../../')
   

    
    
})

//Trae un producto determinado por un id enviado por url param.
carritoRouter.get('/:id/producto', (req, res) => {
    const id = req.params.id
    carrito.getById(id).then((data) => res.send(data.productos))
    
   
})



//Borra un elemento segun su id de un carrito segun su id
carritoRouter.delete('/:id_cart/producto/:id_prod', (req, res) => {
    
    const idCart = req.params.id_cart
    const idProd = req.params.id_prod
    carrito.deleteByIdbyId(idCart, idProd, Producto)
        .then(()=>res.send("Producto "+idProd+" Borrado de carrito "+idCart))
        

    
       
    
        

})

carritoRouter.delete('/all', (req, res) => {
    carrito.deleteAll()
    res.send("coleccion vacia")
})

//Productos Router--------------------------------------------
productosRouter.get('/', (req, res)=>{
    const filePath = path.resolve('./public/api/productos/index.html');
    res.sendFile(filePath);
})


//Agrega un producto al listado de productos
productosRouter.post('/', (req, res) => {
    //agregar productos
    const productToAdd = req.body;    
    console.log(productToAdd)
    productos.save(productToAdd)
        .then(() => {
            const filePath = path.resolve('./public/api/productos/index.html');
            res.sendFile(filePath);
        })

    
    
})

//Trae un producto determinado por un id enviado por url param.
productosRouter.get('/producto/:id', (req, res) => {
    const id = req.params.id
    
    productos.getById(id).then((data) => {
        console.log(data)
        res.send(data)
    })
    
   
})

//Trae todos los productos 
productosRouter.get('/all', (req, res) => {
    productos.getAll()
    .then((data) => {
        
        res.send(data)
    })
   
    
})

//Borra un elemento segun su id
productosRouter.delete('/producto/:id', (req, res) => {
    const id = req.params.id
    productos.deleteById(id)
        .then(()=>res.send("elemento borrado"))
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

