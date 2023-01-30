

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema({
  
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  codigo: { type: String, required: true },
  precio: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  stock: { type: Number, required: true },
});

const Producto = model('Producto', productSchema);

export default Producto;