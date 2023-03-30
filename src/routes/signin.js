import passport from 'passport'
import UsersDaoMongoDb from '../daos/users/UsersDaoMongoDb.js';
import User from '../model/userSchema.js'
import {enviarMensajeWhatsapp} from '../helpers/sendMessages.js'
import {enviarCorreo} from '../helpers/nodemailer.js'

//Creo una instancia de contenedor de Productos
export const users = new UsersDaoMongoDb({name: "productos", model: User})

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
    // enviarMensajeWhatsapp(user.phone)
    enviarCorreo(user)
    users.save(user)
    res.redirect('../')
    next()

}
