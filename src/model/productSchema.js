

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema({
  
 
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  
});

const Producto = model('Producto', productSchema);

export default Producto;