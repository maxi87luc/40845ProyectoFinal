import {carrito} from '../index.js'
import Producto from '../model/productSchema.js'
export const addProductToCart = (req, res) => {
    //agregar productos
    const idCart = req.params.id_Cart
    const idProd = req.params.id_Prod
    carrito.add(idCart, idProd, Producto)
    res.redirect('../../../../')    
}