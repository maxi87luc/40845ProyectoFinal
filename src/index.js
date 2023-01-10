


const express = require('express');

const {Router} = express;
const { engine } = require('express-handlebars');
const app = express();
const fs = require('fs');

const productosRouter = Router();
const carritoRouter = Router();
const rootRouter = Router();


app.use(express.urlencoded({ extended: true }));

app.use(express.json())

app.set('view engine', 'handlebars');
app.set('views', './views');

app.engine('handlebars', engine());

let productos = []


let carritos = []

const actualizar = async (file)=>{
    let data 
    try{
        await fs.promises.readFile(`${file}.txt`, 'utf-8')
        .then(value=>{
            data = JSON.parse(value)
        })

        .catch(err=>console.log(err))
    }
    catch (err){
        console.log(err)
    }
    return data
}
actualizar("productos")
    .then(data=> {
        productos = data;
        
    })

actualizar("carritos")
    .then(data=> {
        carritos=data;
        
    })





let administrador = true;

// Constructor --------------------------------------------

class Carrito {
    constructor() {   
         

        let id = 1
        let ids = []
        if(carritos.length>0){
            carritos.forEach((o)=>{
                ids.push(o.id)
            });
            id = Math.max(...ids) + 1             
        }           
        this.id = id;
        this.timestamp = new Date();
        
        carritos.push({id: this.id, timestamp: this.timestamp, productos: []})
        fs.writeFileSync(`./carritos.txt`, JSON.stringify(carritos)); 
        
    }
 
    
}


// rootRouter -------------------------------------------

rootRouter.get('/', (req, res) => {
    res.render('form')
})





// productosRouter ---------------------------------------

productosRouter.get('/:id?', (req, res)=>{
    
    let id = parseInt(req.params.id)
    
    if (id){
        const ids = productos.map(producto=> producto.id)
        
               
        console.log(ids.includes(id))
        if (ids.includes(id)){  
           
            const producto = productos.filter(producto=> producto.id == id)  
                  
            res.render('product', {producto})

        } else {
            res.render('products', null)
        }

    } else {
        res.render('products', {productos})
    }
    

} )


productosRouter.post('/', (req, res)=>{
    if (administrador) {
        const productToAdd = req.body;
    
    

        let id = 1
        let ids = []
        if(productos.length>0){
            productos.forEach((o)=>{
                ids.push(o.id)
            });
            id = Math.max(...ids) + 1             
        }
                    
        productToAdd.id = id;
        productToAdd.timestamp = new Date();
    

        productos.push(productToAdd)

        fs.writeFileSync(`./productos.txt`, JSON.stringify(productos));

        

        res.redirect('back')
    } else {
        const error = {tipo: "-1", ruta: '"/"', metodo: "POST"}
        res.render('error', {error})
        
    }
   

    

})

productosRouter.put('/:id', (req, res)=>{
    /*PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)*/
    const id = parseInt(req.params.id);
    const body = req.body
   
    

    if (administrador) {
        
     
  
            
        productos = productos.map(producto =>
          producto.id === id ? body : producto
        );
        
        fs.writeFileSync(`./productos.txt`, JSON.stringify(productos))
        res.render('products', {productos})

        
    } else {
        const error = {tipo: "-1", ruta: '"/:id"', metodo: "PUT"}
        res.render('error', {error})
  
    }
})

productosRouter.delete('/:id', (req, res)=>{
    
    
    const id = parseInt(req.params.id);
    if (administrador) {
        productos = productos.filter(producto=> producto.id !== id)

       
       
        fs.writeFileSync(`./productos.txt`, JSON.stringify(productos))
        res.render('products', {productos})
    } else {
        const error = {tipo: "-1", ruta: '"/:id"', metodo: "DELETE"}
        res.render('error', {error})
 
    }
})

// carritoRouter --------------------------------


carritoRouter.post('/', (req, res)=>{
    /* POST: '/' - Crea un carrito y devuelve su id. */
    const carrito = new Carrito;
   
    
    res.render('carritos', {carritos})

})

carritoRouter.get('/', (req, res)=>{
    /* POST: '/' - Crea un carrito y devuelve su id. */
    
    res.render('carritos', {carritos})

})


carritoRouter.delete('/:id', (req, res)=>{
    /* DELETE: '/:id' - Vacía un carrito y lo elimina. */
    const id = parseInt(req.params.id);
    const carritoFiltrado = carritos.filter(carrito => carrito.id!==id)
    
    carritos = carritoFiltrado

    res.render('carritos', {carritos})
    fs.writeFileSync(`./carritos.txt`, JSON.stringify(carritos));
    

})

carritoRouter.get('/:id/productos', (req, res)=>{
    /* GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito */
    const idCarrito = parseInt(req.params.id);
    
    const [carrito] = carritos.filter(carrito=> carrito.id == idCarrito) 

    const productos = carrito.productos
   
    res.render('carrito', {productos, idCarrito})
})

carritoRouter.post('/:id/productos', (req, res)=>{
    /* POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto */
    const idCarrito = parseInt(req.params.id);
    const idProducto = parseInt(req.body.id);
    
    const index = carritos.map((carrito)=>carrito.id).indexOf(idCarrito)
    
    
    const [producto] = productos.filter(producto=> producto.id == idProducto) 
    
       
    carritos[index].productos.push(producto)
    const carrito = carritos[index].productos
    
    
    fs.writeFileSync(`./carritos.txt`, JSON.stringify(carritos))
    res.render('carrito', {carrito, idCarrito })



})

carritoRouter.delete('/:id/productos/:id_prod', (req, res)=>{
    /* DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto */
    const idCarrito = parseInt(req.params.id);
    const idProducto = parseInt(req.params.id_prod)
    const index = carritos.map((carrito)=>carrito.id).indexOf(idCarrito)
    let productos = carritos[index].productos
    const productosFiltrados = productos.filter(producto => producto.id!==idProducto)
    carritos[index].productos = productosFiltrados
    productos = carritos[index].productos
    
   
    res.render('carrito', {productos, idCarrito })
    fs.writeFileSync(`./carritos.txt`, JSON.stringify(carritos))

})







app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)
app.use('/', rootRouter)


const PORT = 8080;

app.listen(PORT, ()=> console.log(`Listening in PORT ${PORT}`))
