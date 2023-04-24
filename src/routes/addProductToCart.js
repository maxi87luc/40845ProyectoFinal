import {carrito, productos} from '../index.js'

export const addProductToCart = (req, res) => {
    //agregar productos
    const idCart = req.params.id_Cart
    const idProd = req.params.id_Prod

    carrito.add(idCart, idProd, productos)

    res.redirect('../../../')
       
}