

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema({
  
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  stock: { type: Number, required: true },
});

const Producto = model('Producto', productSchema);

export default Producto;