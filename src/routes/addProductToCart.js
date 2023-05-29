import {carritos, productos} from '../index.js'

export const addProductToCart = (req, res) => {
    //agregar productos
    const idCart = req.params.id_Cart
    const idProd = req.params.id_Prod

    carritos.add(idCart, idProd, productos)
        .then(()=>res.redirect('../../../../'))

    
       
}