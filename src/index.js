import cluster from 'cluster';
import express from 'express';
import mongoose from "mongoose";
import CarritosDaoMongoDb from './daos/carritos/CarritosDaoMongoDb.js';
import CarritosDaoMemoria from './daos/carritos/CarritosDaoMemoria.js';
import ProductosDaoMongoDb from './daos/productos/ProductosDaoMongoDb.js';
import ProductosDaoMemoria from './daos/productos/ProductosDaoMemoria.js';
import OrdersDaoMongoDb from './daos/orders/OrdersDaoMongoDb.js';
import MessagesDaoMongoDb from "./daos/messages/MessagesDaoMongoDb.js"
import Message from "./model/messageSchema.js"
import Producto from './model/productSchema.js'
import Carrito from './model/carritoSchema.js'
import Order from './model/orderSchema.js'
import os from 'os';
import log4js from 'log4js'
import {persistencia} from './config/enviroment.js'
import http from 'http';
import { Server } from 'socket.io';




//Creo una instancia de contenedor de Productos

export const productos = new ProductosDaoMongoDb({name: "productos", model: Producto})

//Creo una instancia de un contenedor de carritos

export const carritos = new CarritosDaoMongoDb({name: "carrito", model: Carrito})

//Creo una instancia de un contenedor de ordenes

export const orders = new OrdersDaoMongoDb({name: "order", model: Order})

//Creo una instancia de un contenedor de mensajes

export const messages = new MessagesDaoMongoDb({name: "Message", model: Message})

import './helpers/log4js.js'


import connectToDb from './config/mongoDbConfig.js';

import User from './model/userSchema.js';
import path from 'path';
import passport from 'passport';
import './config/passport.js';
import {signin} from './routes/signin.js';
import {login} from './routes/login.js';
import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
import {mongoURL, mongoSecret, PORT} from './config/enviroment.js';
import {users} from './routes/signin.js';
import {index} from './routes/index.js';
import {enviarCorreoCompra} from './helpers/nodemailer.js'
import {enviarMensajeWhatsapp} from './helpers/sendMessages.js'

import {getCartById} from './routes/getCartById.js'
import {addCart} from './routes/addCart.js'
import {addProductToCart} from './routes/addProductToCart.js'
import {finalizarCompra} from './routes/finalizarCompra.js'
import {deleteProductById} from './routes/deleteProductById.js'
import {addProduct} from './routes/addProduct.js'
import {chat} from './routes/chat.js'



const { Router } = express;


connectToDb().then(()=>console.log("OK"))



const app = express();


const server = http.createServer(app);

// Configura el servidor WebSocket después de crear el servidor HTTP
export const io = new Server(server);

io.on('connection',async socket => {
    
    
    const mensajes = await messages.getAll()
        
    socket.emit('messages-update',mensajes)
   
       
    socket.on('message',async data =>{
        console.log(data)
        await messages.save(data)

        io.sockets.emit('messages-update', mensajes);


    })
    
  })  


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
app.use(passport.initialize());
app.use(passport.session());

const productosRouter = Router();
const carritoRouter = Router();
const rootRouter = Router();






//Root Router --------------------------------

app.use('*', (req, res, next)=>{
    const { url, method } = req
    const logger = log4js.getLogger();
    logger.level = "info";
    logger.info(`path: ${url}, method: ${method}`);
    next()
})

rootRouter.get('/', index)

rootRouter.get('/login', (req, res)=>{

    const filePath = path.resolve('./public/login.html');
    res.sendFile(filePath);
})
rootRouter.get('/chat', chat)



rootRouter.post('/login', login)

rootRouter.get('/login-error', (req, res)=>{

    const filePath = path.resolve('./public/login/login-error.html');
    
    res.sendFile(filePath);

})

rootRouter.get('/signin-error', (req, res)=>{

    const filePath = path.resolve('./public/signin/signin-error.html');
    
    res.sendFile(filePath);

})


rootRouter.get('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('../login')
})

rootRouter.get('/signin', (req, res)=>{

    const filePath = path.resolve('./public/signin.html');
  
    res.sendFile(filePath);

})


rootRouter.post('/signin', signin)



rootRouter.get('*', (req, res, next) => {

    if(req.url==="/"){
        res.end()
    } else {
        
        const { url, method } = req
        const logger = log4js.getLogger("warn");
        logger.level = "warn";
        logger.warn(`Ruta ${method} ${url} no implementada`)
    }
    next()
    
})






//Carrito Router------------------------------

carritoRouter.get('/:id_Cart',getCartById)

//Agrega un carrito y retorna el id
carritoRouter.post('/', addCart)

//agrega un producto al carrito por su id

carritoRouter.post('/:id_Cart/productos/:id_Prod', addProductToCart)

carritoRouter.post('/:id_Cart/finalizarcompra', finalizarCompra)

//Trae un producto determinado por un id enviado por url param.
carritoRouter.get('/:id/producto', (req, res) => {

    const id = req.params.id
    carritos.getById(id).then((data) => res.send(data.productos))  
   
})



//Borra un elemento segun su id de un carrito segun su id
carritoRouter.delete('/:id_cart/producto/:id_prod', deleteProductById)

carritoRouter.delete('/all', (req, res) => {
    carritos.deleteAll()
    res.send("coleccion vacia")
})

//Productos Router--------------------------------------------
productosRouter.get('/', (req, res)=>{
    const filePath = path.resolve('./public/api/productos/index.html');
    res.sendFile(filePath);
})


//Agrega un producto al listado de productos
productosRouter.post('/', addProduct)

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







if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  } else {
 
        server.listen(PORT, ()=> console.log(`Listening in PORT ${PORT}`))
 
    
  }




export default app


