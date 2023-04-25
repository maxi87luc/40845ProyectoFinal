import axios from 'axios'


export const testAddProduct = async () =>{
    axios.post('http://localhost:8080/api/productos', {
        name: "item de prueba",
        description: "descripcion del item de prueba",
        code: "abc-test",
        price: "1500",
        thumbnail: "thumbnail",
        stock: "500"
    })
    .then((response) => {
        console.log(response.status)
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    });
}
    
  export const testSignin = async ()=>{
    axios.post('http://localhost:8080/signin', {
        username: "testUser",
        name: "John",
        address: "Calle falsa 123",
        age: "100",
        codPais: "54", 
        codArea: "11",
        number: "55555555",
        password: "1234"        
    })
    .then((response)=>{
        console.log(response.status)
        console.log(response.data)
        return response
    })
    .catch((error) => {
        console.error(error);
    });
  } 


