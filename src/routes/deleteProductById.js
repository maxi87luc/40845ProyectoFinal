import Producto from '../model/productSchema.js'
import {carrito} from '../index.js'

export const deleteProductById = (req, res) => {
    
    const idCart = req.params.id_cart
    const idProd = req.params.id_prod
    carrito.deleteByIdbyId(idCart, idProd, Producto)
        .then(()=>res.send("Producto "+idProd+" Borrado de carrito "+idCart))
     

}