import {carritos, orders} from '../index.js'
import {users} from './signin.js'
import {enviarCorreoCompra} from '../helpers/nodemailer.js'


export const finalizarCompra = async (req, res) => {
    //agregar productos
    if(req.isAuthenticated()){
        const idCart = req.params.id_Cart  
         
         const cart = await carritos.getById(idCart)
         enviarCorreoCompra(cart)
         const LastOrder = await orders.count()
         
         orders.save({
            username: req.user.username,
            address: req.user.address,
            productos: cart.productos,
            orderNumber: LastOrder + 1,
            timestamp: Date.now(),
            estado: "generada"
        })  
        carritos.emptyListById(idCart)
        res.redirect('../../../')                     
                
                
            
    } else {
        res.send("No estas autenticado")
    }
 
            
       
    
    

    
    
}