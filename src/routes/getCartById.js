import {carrito} from '../index.js'

export const getCartById = (req, res)=>{
    const idCart = req.params.id_Cart
    carrito.getById(idCart)
        .then(data=>{
            console.log(data)
            res.render('cart', {data: data});
        })
    
}