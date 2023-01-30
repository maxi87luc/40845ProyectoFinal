
class ContainerArchivo {
    constructor(name){

        
        
        this.arr =  [];
        this.name = name        

    }
    async save(object){
        // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        
        let id = 1
        let ids = []
        if(this.arr.length>0){
            this.arr.forEach((o)=>{
                ids.push(o.id)
            });
            id = Math.max(...ids) + 1             
        }
                  
        object.id = id
        this.arr.push(object)
       
        
        return id

        
    }
    async getById(id){
        // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
        let object = {}
        object = arr.find(o=>o.id == id)
       
        return object



        
                        
    }
    async getAll(){
        // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
        
        return listado;
       
               
    }
    async deleteById(id){
        // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
        const arrFiltrado = this.arr.filter((o)=>o.id !== id)
        listado = arrFiltrado

        
                    
       
    }
    async deleteAll(){
        // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
        listado = []
        
     
    }
};

export default ContainerArchivo;
