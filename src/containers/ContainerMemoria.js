





class ContainerMemoria {
    constructor(object){    
        
        this.name = object.name
        this.array = []           

    }

    async save(object){
        // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        
        
            try{            
                
                object._id = this.array.length + 1
                
                return this.array.push(object)
    
                
            }
            catch (err){
                console.log(err)
            }

        }
        
                

       

        
    
        async add(idCart, idProd, array){
            // add(Object): Number - Recibe un objeto, lo guarda en la base de datos enviada
            
            
                try{       
                       
                    const CartToAdd= await this.array.filter(object=>object._id==idCart)
                 
                    const ProductToAdd = await array.array.filter(object=>object._id==idProd)
                    CartToAdd[0].productos.push(ProductToAdd[0])
                    return ProductToAdd[0]
                    
                        
                }
                catch (err){
                    console.log(err)
                }
            }
            
                    
    
           
    
            
        
    async getById(id){
        // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
     
       let ItemToSend

        try{
            
            ItemToSend  = await this.array.filter(object=> object._id==id)

            if(ItemToSend[0]){
                return ItemToSend[0]
            } else {
                return null
            }
            
        }
        catch (err){
            console.log(err)
        }
       
       


        
                        
    }
    async getByName(name){
        // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.

       let ItemToSend
        try{
            
            ItemToSend  = await this.array.filter(object=> object.name=name)            
                
            if(ItemToSend[0]){
                return ItemToSend[0]
            } else {                        
                return null
            }     
              
                    
        }
        catch (err){
            console.log(err)
        }
       
       


        
                        
    }
    async getAll(){
        // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
        let listado = []
        
        
        try{
            // listado = await this.model.find()
            
            return listado
                     

        }
        catch (err){
            console.log(err)
        }
       
       


        
                        
    }
    async getByUserName(username){
        // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
     
       let ItemToSend
        try{
            
            ItemToSend  = await this.array.filter(user=> user.username==username)
          
                
            return ItemToSend[0]
            
           
           
                     

        }
        catch (err){
            console.log(err)
        }
       
       


        
                        
    }
    async getAll(){
        // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
        
        
        
        try{
            
            
            return this.array
                     

        }
        catch (err){
            console.log(err)
        }
       
       


        
                        
    }
    async deleteByIdbyId(idCart, idProd, array){
        // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
        try{
            const cart= await this.array.filter(object=>object._id==idCart)
            
            cart.array.filter((object)=>object._id!==idProd)
            console.log(this.array)
            console.log(cart.array)
         
            
            return 

            
            // const productToDelete = await model.findOne({id: idProd})
            //     .then((value)=>this.model.findOneAndUpdate({id: idCart}, {$pull: {productos: value}}))
            
            

            
        }
    
        catch (err){
            console.log(err)
    
        }
    }
    async deleteById(id){
        // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
        try{
            // await this.model.findOneAndDelete({_id: id})              
             
        
        }
    
        catch (err){
            console.log(err)
    
        }
    }
    async deleteAll(){
        // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
        try{
            // await this.model.deleteMany({})
        }
        catch (err){
            console.log(err)
        }
        
     
    }
    async emptyListById(id){
        // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
        try{

                const cart = await this.array.filter((object)=>{
                    object._id==id
                })
                console.log(cart)
                cart.array = []
             
        }
        catch (err){
            console.log(err)
        }
        
     
    }
};

export default ContainerMemoria;


