





class ContainerMongoDb {
    constructor(object){    
        
        this.name = object.name
        this.model = object.model  
        
    

    }

    async save(object){
        // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        
        
            try{            
            
                const newItem = new this.model(object)
                
                return newItem.save()
    
                
            }
            catch (err){
                console.log(err)
            }
        }
        
                

       

        
    
        async add(idCart, idProd, model){
            // add(Object): Number - Recibe un objeto, lo guarda en la base de datos enviada
            
            
                try{       
                    console.log("id Cart: " + idCart)
                    console.log("id Prod: " + idProd)     
                    const productToAdd= await model.findOne({_id: idProd})
                        .then((product)=>{
                            return product
                            

                            
                        })
                    await this.model.updateOne({_id: idCart}, {$addToSet: {productos: productToAdd}})
                    
                    
                    
        
                    
                }
                catch (err){
                    console.log(err)
                }
            }
            
                    
    
           
    
            
        
    async getById(id){
        // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
     
       let ItemToSend
        try{
            
            ItemToSend  = await this.model.findOne({_id: id})
                .then((value)=> {
                    
                    if(value){
                        return value
                    } else {
                        return null
                    }
                    
                })   
                
            return ItemToSend
            
           
           
                     

        }
        catch (err){
            console.log(err)
        }
       
       


        
                        
    }
    async getAll(){
        // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
        let listado = []
        
        
        try{
            listado = await this.model.find()
            
            return listado
                     

        }
        catch (err){
            console.log(err)
        }
       
       


        
                        
    }
    async deleteByIdbyId(idCart, idProd, model){
        // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
        try{
            const productToDelete = await model.findOne({id: idProd})
                .then((value)=>this.model.findOneAndUpdate({id: idCart}, {$pull: {productos: value}}))
            
            

            
        }
    
        catch (err){
            console.log(err)
    
        }
    }
    async deleteById(id){
        // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
        try{
            await this.model.findOneAndDelete({_id: id})              
             
        
        }
    
        catch (err){
            console.log(err)
    
        }
    }
    async deleteAll(){
        // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
        try{
            await this.model.deleteMany({})
        }
        catch (err){
            console.log(err)
        }
        
     
    }
};

export default ContainerMongoDb;


