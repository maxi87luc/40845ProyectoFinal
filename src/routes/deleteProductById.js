
import {carritos, productos} from '../index.js'

export const deleteProductById = (req, res) => {
    
    const idCart = req.params.id_cart
    const idProd = req.params.id_prod
    carritos.deleteByIdbyId(idCart, idProd, productos)
        .then(()=>res.send("Producto "+idProd+" Borrado de carrito "+idCart))
     

}