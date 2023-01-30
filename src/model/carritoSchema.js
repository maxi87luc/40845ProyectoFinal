import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const carritoSchema = new Schema({
  name: { type: String, required: true },
  productos: { type: Array, required: true },  
});

const Carrito = model('Carrito', carritoSchema);

export default Carrito;