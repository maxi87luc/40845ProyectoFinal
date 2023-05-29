
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const messageSchema = new Schema({
  username: { type: String, required: true },
  type: { type: String, required: true },  
  timestamp: { type: Number, required: true},
  message: { type: String, required: true},
});

const Message = model('Message', messageSchema);

export default Message;