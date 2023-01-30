import mongoose from "mongoose";

import Producto from '../model/productSchema.js';



class ContainerMongoDb {
    constructor(name){    
        
        this.name = name  
        
        
        

    }

    async save(object){
        // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        
        
            try{            
            
                const newProducto = new Producto(object)
                console.log(newProducto)
                return newProducto.save()
    
                
            }
            catch (err){
                console.log(err)
            }
        }
        
                

       

        
    
    async getById(id){
        // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
     
       let productToSend
        try{
            if(this.type==="productos"){
                productToSend  = await Producto.find({_id: id})
                
            }
            if(this.type==="carritos"){
                
                const carrito = await Carrito.find({name: this.name})                        
                    .then((value)=>{
                        
                       productToSend =  value[0].productos.find(element => element._id == id)
                       
                       
                    })
      
            }
            return productToSend
                     

        }
        catch (err){
            console.log(err)
        }
       
       


        
                        
    }
    async getAll(){
        // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
        let listado = []
        
        
        try{
            if(this.type==="productos"){
                listado  = await Producto.find()
                
            }
            if(this.type==="carritos"){
                
                const carrito = await Carrito.find({name: this.name})                        
                    .then((value)=>{
                        
                       listado =  value[0].productos
                       
                       
                    })
      
            }
            return listado
                     

        }
        catch (err){
            console.log(err)
        }
       
       


        
                        
    }
    async deleteById(id){
        // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
        try{
            if(this.type==="productos"){
                productToDelete  = await Producto.deleteOne({_id: id})
                
            }
            if(this.type==="carritos"){
                let productosFiltrados
                const carrito = await Carrito.find({name: this.name})                       
                    .then((value)=>{
                        console.log(value)
                       return value
                       
                       
                    })
                    
                    .then((value)=>{
                        const idLiteral = `new ObjectId("${id}")`
                        
                        const productos = value[0].productos
                        console.log(productos)
                        productosFiltrados = productos.filter(element => element._id != id)
                        
    
                        
                    })
                    
                 Carrito.updateOne({name: this.name}, {$set: {productos: value}})
                    
                
                
    
            }
       
        }
       
            
            
  
        catch (err){
            console.log(err)
    
        }
    }
    async deleteAll(){
        // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
        try{
            if(this.type==="productos"){
                listado  = await Producto.deleteMany({})
                
            } 
        }
        catch (err){
            console.log(err)
        }
        
     
    }
};

export default ContainerMongoDb;


