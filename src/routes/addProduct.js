import {productos} from '../index.js'
import path from 'path'

export const addProduct = (req, res) => {
    //agregar productos
    
    const productToAdd = req.body;    
    console.log(productToAdd)
    console.log(productToAdd)
    productos.save(productToAdd)
        .then(() => {
            // const filePath = path.resolve('./public/api/productos/index.html');
            res.status(201).json(productToAdd, null, 2)
            // res.sendFile(filePath);
        })

    
    
}