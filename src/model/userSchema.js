import  mongoose from 'mongoose' ;

const { Schema, model } = mongoose;

const userSchema = new Schema({
  
  username: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: String, required: true },
  phone: { type: String, required: true },
  
});

const User = model('User', userSchema);

export default User;