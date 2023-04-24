import {users} from '../routes/signin.js'
import {productos, carrito} from '../index.js'


export const index = (req, res)=>{
   
    if(req.session && req.session.passport){ 
        let products = []
        let user = {}
        let cart = {}
        productos.getAll()
            .then(productos=>{
                products = productos
                return users.getByUserName(req.session.username)
            .then(data=>{
                user=data                
                return carrito.getByName(req.session.username)
            .then(data=>{
                cart=data     
                console.log(cart, user)                         
                res.render('index', {array:products , user: user, cart: cart })
                })
            })
        })     
   
    
    } else {
        res.redirect('/login')
    }

}


