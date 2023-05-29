import {users} from '../routes/signin.js'
import {productos, carritos} from '../index.js'


export const index = async (req, res)=>{
    if (req.isAuthenticated()) {
        console.log(req.user)     
        let products =  await productos.getAll()
        console.log(products)
        let user = await users.getByUserName(req.user.username)
        console.log(user)
        let cart = await carritos.getByName(req.user.username)
        console.log(cart)
                            
        res.render('index', {array:products , user: req.user.name, cart: cart })
    }else {
        res.status(401).send('No estás autenticado');
      }

    if(req.session && req.session.passport){ 
            
   
    
    } else {
        res.redirect('/login')
    }

}


