import passport from 'passport'
import UsersDaoMongoDb from '../daos/users/UsersDaoMongoDb.js';
import User from '../model/userSchema.js'

console.log("it´s alive")
//Creo una instancia de contenedor de Productos
const users = new UsersDaoMongoDb({name: "productos", model: User})

export const signinPassport = passport.authenticate('signup', { failureRedirect: '../signin-error' })


export const signin = (req, res, next)=>{ 
    console.log(req.file)

    req.session.username = req.user.username
    const user = {
        username: req.body.username,
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        phone: req.body.codPais + req.body.codArea + req.body.number,
        
    }
    users.save(user)
    res.redirect('../')
    next()

}
