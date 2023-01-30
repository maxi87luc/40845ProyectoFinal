import { getFirestore, collection, doc, setDoc, addDoc , getDoc, getDocs, deleteDoc } from "firebase/firestore";



class ContainerFirebase {
    constructor(name, app){    
        this.db = getFirestore(app)    
        this.name = name   

    }

    async save(object){
        // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        
        
        try{            
            
            let doc = await addDoc(collection(this.db, this.name), object)
                .then((doc)=>{
                    return doc.id
                } )


            
        }
        catch (err){
            console.log(err)
        }
        

       

        
    }
    async getById(id){
        // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
        
       let object
        try{
            const docRef = doc(this.db, this.name, id)
            object = await getDoc(docRef)             

        }
        catch (err){
            console.log(err)
        }
       
        return object.data()


        
                        
    }
    async getAll(){
        // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
        let listado = []
        
        try{
            
            const querySnapshot = await getDocs(collection(this.db, this.name));
            
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                listado.push({id: doc.id, product: doc.data()})
              });
              
                   
            
        }
        catch (err){
            console.log(err)
        }
        return listado
       
               
    }
    async deleteById(id){
        // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
        try {
            await deleteDoc(doc(this.db, this.name, id));
        }
        catch (err){
            console.log(err)
        }
       
        
                    
       
    }
    async deleteAll(){
        // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
        try{
            const querySnapshot = await getDocs(collection(this.db, this.name));
            
            
            querySnapshot.forEach(async (data) => {
                // doc.data() is never undefined for query doc snapshots
                await deleteDoc(doc(this.db, this.name, data.id))
              });
        }
        catch (err){
            console.log(err)
        }
        
     
    }
};

export default ContainerFirebase;


