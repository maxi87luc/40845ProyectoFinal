import passport from 'passport'
import UsersDaoMongoDb from '../daos/users/UsersDaoMongoDb.js';
import UsersDaoMemoria from '../daos/users/UsersDaoMemoria.js';
import User from '../model/userSchema.js'
import {enviarMensajeWhatsapp} from '../helpers/sendMessages.js'
import {enviarCorreo} from '../helpers/nodemailer.js'
import {carrito} from '../index.js'
import upload from '../config/multer.js'
import {persistencia} from '../config/enviroment.js'

//Creo una instancia de contenedor de Productos

export const users = persistencia==="mongoDb"? new UsersDaoMongoDb({name: "users", model: User}): new UsersDaoMemoria({name: "users"});



export const signinPassport = passport.authenticate('signup', { failureRedirect: '../signin-error' })


export const signin = (req, res, next)=>{ 
    
    
   
    req.session.username = req.user.username
    
    const user = {
        username: req.body.username,
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        phone: req.body.codPais + req.body.codArea + req.body.number,
        password: req.user.password        
    }
    
    enviarCorreo(user)
    users.save(user)
    console.log(users)
    carrito.save({name: user.username, productos: []})
    res.status(201).json(user, null, 2)
    
    next()

}
