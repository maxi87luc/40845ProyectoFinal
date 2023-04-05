import {carrito} from '../index.js'
import {users} from './signin.js'
import {enviarCorreoCompra} from '../helpers/nodemailer.js'
import {enviarMensajeWhatsapp} from '../helpers/sendMessages.js'

export const finalizarCompra = (req, res) => {
    //agregar productos
    const idCart = req.params.id_Cart  
    let cart = {}  
    carrito.getById(idCart)
        .then(data=>{     
            cart=data       
            enviarCorreoCompra(cart)
            return users.getByUserName(cart.name)
        })
        .then(user=>{
            console.log("index")
            console.log(cart)
            enviarMensajeWhatsapp(user.phone, cart)
            carrito.emptyListById(idCart)
        })
            
       
    
    res.redirect('../../../')

    
    
}