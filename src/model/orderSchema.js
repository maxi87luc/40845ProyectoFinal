
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const orderSchema = new Schema({
  username: { type: String, required: true },
  productos: { type: Array, required: true },  
  address: { type: String, required: true},
  orderNumber: { type: Number, required: true, unique: true },
  timestamp: { type: Number, required: true},
  estada: { type: String, required: true},
});

const Order = model('Order', orderSchema);

export default Order;