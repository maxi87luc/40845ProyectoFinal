import fs from 'fs' 



class ContainerArchivo {
    constructor(name){

        fs.writeFileSync(`./db/files/${name}.txt`, JSON.stringify([]));
        this.fileJSON = fs.readFileSync(`./db/files/${name}.txt`, 'utf-8')
        this.file = JSON.parse(this.fileJSON)
        this.arr = this.file.length > 0 ? this.file : [];
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
        const arrJSON = JSON.stringify(this.arr)
        try{

            await fs.promises.writeFile(`./db/files/${this.name}.txt`, `${arrJSON}`)   
            
        }
        catch (err){
            console.log(err)
        }
        return id

        
    }
    async getById(id){
        // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
        let object = {}
        
        try{
            await fs.promises.readFile(`./db/files/${this.name}.txt`, 'utf-8')
                .then(value => {
                    
                    const arr = JSON.parse(value)
                    console.log(arr)
                    object = arr.find(o=>o.id == id)
                    console.log(object)

                
            })                  
             
            
          

        }
        catch (err){
            console.log(err)
        }
        console.log(object)
        return object



        
                        
    }
    async getAll(){
        // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
        let listado = []
        try{
            await fs.promises.readFile(`./db/files/${this.name}.txt`, 'utf-8')
            .then(value=>{
                listado = JSON.parse(value);                
                
            })
            .catch(err=>console.log(err))
        }
        catch (err){
            console.log(err)
        }
        return listado;
       
               
    }
    async deleteById(id){
        // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
        try {
            await fs.promises.readFile(`./db/files/${this.name}.txt`, 'utf-8')
            .then(value=>{
                const arr = JSON.parse(value)
                const arrFiltrado = this.arr.filter((o)=>o.id !== id)
                const arrJSON = JSON.stringify(arrFiltrado)
                return fs.promises.writeFile(`./db/files/${this.name}.txt`, `${arrJSON}`)
            })
        }
        catch (err){
            console.log(err)
        }
       
        
                    
       
    }
    async deleteAll(){
        // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
        try{
            await fs.promises.writeFile(`./db/files/${this.name}.txt`, `${[]}`)
        }
        catch (err){
            console.log(err)
        }
        
     
    }
};

export default ContainerArchivo;
