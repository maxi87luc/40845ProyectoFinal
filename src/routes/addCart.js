import {carrito} from '../index.js'

export const addCart = (req, res) => {
    //agregar productos
    const user = req.session.
    carrito.save({name: "carrito", productos: []})
        .then((value)=>{res.send("carrito "+ value.id +" creado con exito")})  
        .then(()=>res.redirect('../../'))

    
    
}