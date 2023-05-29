
import UsersDaoMongoDb from '../daos/users/UsersDaoMongoDb.js';
import UsersDaoMemoria from '../daos/users/UsersDaoMemoria.js';
import CarritosDaoMongoDb from '../daos/carritos/CarritosDaoMongoDb.js';
import CarritosDaoMemoria from '../daos/carritos/CarritosDaoMemoria.js';
import User from '../model/userSchema.js'
import Carrito from '../model/carritoSchema.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {jwtSecret} from '../config/enviroment.js'
import {carritos} from '../index.js'

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};






import {persistencia} from '../config/enviroment.js'

//Creo una instancia de contenedor de Productos

export const users = persistencia==="mongoDb"? new UsersDaoMongoDb({name: "users", model: User}): new UsersDaoMemoria({name: "users"});


export const signin = async (req, res, next) => {
    const { username, name, address, password } = req.body;
  
    try {
      // Verificar si el usuario ya existe en la base de datos
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(409).json({ message: 'El nombre de usuario ya está en uso' });
      }
  
      // Crear un nuevo usuario
      const hashedPassword = await hashPassword(password);
      const newUser = new User({ username, name, address, password: hashedPassword });
      
      await newUser.save();
      await carritos.save({name: username, productos: []})
      // Iniciar sesión en Express Session
      req.login(newUser, async (err) => {
        if (err) {
          return next(err);
        }
  
        // Generar un token JWT con la información del usuario
        const token = jwt.sign({ sub: newUser._id }, jwtSecret);
  
        // Devolver la respuesta con el token
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  };



// export const signin = async (req, res) => {
//     const { username, name, address, password } = req.body;
  
//     try {
//       // Verificar si el usuario ya existe en la base de datos
//       const existingUser = await User.findOne({ username });
  
//       if (existingUser) {
//         return res.status(400).json({ message: 'El usuario ya existe' });
//       }
  
//       // Encriptar la contraseña antes de guardarla en la base de datos
//       const hashedPassword = await hashPassword(password); 
    
  
//      // Crear un nuevo usuario con la contraseña encriptada
//      const newUser = new User({ username, name, address, password: hashedPassword });

//      // Guardar el usuario en la base de datos
//      await newUser.save();
  
//       res.status(201).json({ message: 'Usuario registrado exitosamente' });
//     } catch (error) {
//       res.status(500).json({ message: 'Error al registrar el usuario' });
//     }
//   };
    
    
   
